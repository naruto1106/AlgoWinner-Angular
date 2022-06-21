agmNgModuleWrapper('agms.orders')
    .defineService("sOrdersClientService",
        ['orderProcessing', 'orderService', 'sOrdersDetailService'],
        function (serviceObj, dep, tool) {
            // --- DEPENDENCY RESOLVER
            var coreSignalRNotificationService = dep.coreSignalRNotificationService,
                orderProcessing = dep.orderProcessing,
                orderService = dep.orderService,
                sOrdersDetailService = dep.sOrdersDetailService;

            // --- LOCAL SERVICE FUNC 
            function matchingOrderId(order, data) {
                return order.OrderId === data.OrderId;
            }

            function matchingTakeProfitOrderId(order, data) {
                return order.TakeProfitOrder !== null && order.TakeProfitOrder.OrderId === data.OrderId;
            }

            function matchingStopLossOrderId(order, data) {
                return order.StopLossOrder !== null && order.StopLossOrder.OrderId === data.OrderId;
            }

            function handleViewRelatedDeveloperOrder(order) {
                if (!order) {
                    return tool.when(false);
                }
                return orderService.GetRelatedDeveloperOrders(order.OrderId)
                    .then(function (res) {
                        var relatedOrders = [];
                        orderProcessing.handleOrderResponse(res.data, relatedOrders);
                        sOrdersDetailService.viewRelatedOrders(order, relatedOrders);
                    }, function (res) {
                        tool.logError("error");
                    });
            }

            function processOrderMarkedForCancellation(data, list) {
                var cancelledOrder = list.filter(function (o) {
                    return o.OrderId === data.OrderId;
                })[0];

                if (cancelledOrder) {
                    cancelledOrder.MarkedForCancellation = data.MarkedForCancellation;
                    cancelledOrder.TraderRemark = data.TraderRemark;
                    tool.broadcast("orderCancellationHasHappened", cancelledOrder.OrderId);
                }
            }

            var previousGetOrdersForStrategyPromise = null;

            function getOrdersForStrategy(promise, list, onListUpdated) {
                if (previousGetOrdersForStrategyPromise) {
                    previousGetOrdersForStrategyPromise.cancel();
                }
                previousGetOrdersForStrategyPromise = promise;
                return promise.then(function (res) {
                    orderProcessing.handleOrderResponse(res.data, list);
                    // Parent order object contains Take Profit and Stop Loss order
                    // the list also contains Take Profit and Stop Loss
                    // Below code to link Take Profit and Stop Loss from parent order object or object in the list
                    list.forEach(function (order) {
                        linkBracketOrderToList(order, list);
                    });

                    if (onListUpdated) {
                        onListUpdated({ type: "initial-list" });
                    }
                    tool.broadcast('orderResponseReceived');
                }, function (res) {
                    tool.logError("Error in getOrdersForStrategy");
                });
            }

            function linkBracketOrderToList(order, list) {
                if (order.ParentOrderId) {
                    var parentArr = list.filter(function (item) {
                        return item.OrderId === order.ParentOrderId;
                    });
                    if (parentArr.length === 0) {
                        tool.log("The Array should not be empty, should contain 1 element is parent order!");
                        return;
                    }

                    if (order.OrderType === "Limit") {
                        parentArr[0].TakeProfitOrder = order;
                    } else {
                        parentArr[0].StopLossOrder = order;
                    }
                }
            }

            function processOrderCreation(data, list, onListUpdated) {
                orderProcessing.aggregateOrderStatus(data);
                var canAdd = true;
                list.forEach(function (order) {
                    if (matchingOrderId(order, data)) {
                        tool.broadcast("orderCreationHasHappened", order.OrderId);
                        canAdd = false;
                    }
                });

                if (canAdd) {
                    data.isLoadedFromSignalR = true;
                    // Once an order has been added via SignalR
                    // need to check that order is bracket order and do the linking with parent order in current list
                    linkBracketOrderToList(data, list);
                    list.push(data);
                    tool.broadcast("orderCreationReceived");
                };
                if (onListUpdated) {
                    onListUpdated({ type: "new" });
                }
            }

            function processOrderUpdate(data, list, onListUpdated) {
                list.forEach(function (order) {
                    if (matchingOrderId(order, data)) {
                        var orderUpdateIds = _.pluck(order.OrderUpdates, "OrderUpdateId");
                        if (!_.includes(orderUpdateIds, data.OrderUpdateId)) {
                            order.OrderUpdates.push(data);
                        }
                        orderProcessing.aggregateOrderStatus(order);
                        order.DeveloperBracketOrderDetailModel = data.DeveloperBracketOrderDetailModel;
                        tool.broadcast("orderUpdateHasHappened", order);
                        return;
                    } else if (matchingTakeProfitOrderId(order, data)) {
                        var tpOrderUpdateIds = _.pluck(order.TakeProfitOrder.OrderUpdates, "OrderUpdateId");
                        if (!_.includes(tpOrderUpdateIds, data.OrderUpdateId)) {
                            order.TakeProfitOrder.OrderUpdates.push(data);
                        }
                        orderProcessing.aggregateOrderStatus(order.TakeProfitOrder);
                        //order.UpdateTime = order.TakeProfitOrder.UpdateTime;
                        tool.broadcast("orderUpdateHasHappened", order);
                        return;
                    } else if (matchingStopLossOrderId(order, data)) {
                        var slOrderUpdateIds = _.pluck(order.StopLossOrder.OrderUpdates, "OrderUpdateId");
                        if (!_.includes(slOrderUpdateIds, data.OrderUpdateId)) {
                            order.StopLossOrder.OrderUpdates.push(data);
                        }
                        orderProcessing.aggregateOrderStatus(order.StopLossOrder);
                        //order.UpdateTime = order.StopLossOrder.UpdateTime;
                        tool.broadcast("orderUpdateHasHappened", order);
                        return;
                    }
                    if (onListUpdated) {
                        onListUpdated({ type: "update" });
                    }
                });
            }

            function loadHistoricalOrdersPage(selectedStrategyId, skip, take, productId, callback) {
                var promise = orderService
                    .GetPagedHistoricalOrders(selectedStrategyId, skip, take, productId);

                promise.then(function (res) {
                    var orders = [];
                    res.data.forEach(function (x) { orders.push(orderProcessing.aggregateOrderStatus(x)) });
                    callback(orders);
                }, function (res) {
                    tool.logError("Unable to get orders", "Error! " + (res.data && res.data.Message));
                });
            }

            function getHistoricalOrdersCount(selectedStrategyId, productId, onCountGot) {
                orderService
                    .GetHistoricalOrdersCount(selectedStrategyId, productId)
                    .then(function (res) {
                        if (onCountGot) {
                            onCountGot(res.data);
                        }
                    });
            }

            function initializeHistoricalPagedOrders(selectedStrategy, productId, list, onListUpdated) {
                list.splice(0, list.length);
                orderService
                    .GetHistoricalOrdersCount(selectedStrategy, productId)
                    .then(function (res) {
                        size = res.data;
                        list.splice(0, size);
                        if (size == 0) {
                            onListUpdated();
                            return;
                        }

                        for (var i = 0; i < size; ++i) {
                            list.push({ "OrderId": "placeholder" + i });
                        }

                        skip = 0;
                        take = 30;
                        var promise = orderService
                            .GetPagedHistoricalOrders(selectedStrategy, skip, take, productId);

                        promise.then(function (res) {
                            var orders = [];
                            res.data.forEach(function (x) { orders.push(orderProcessing.aggregateOrderStatus(x)) });

                            for (var i = skip; i < skip + Math.min(res.data.length, take); ++i) {
                                list[i] = orders[i];
                            }
                            if (onListUpdated) {
                                onListUpdated({ type: "initial-list" });
                            }
                        }, function (res) {
                            tool.logError("Error in count");
                        });
                    });
            }

            /*
                    Server Behavior of getting Order Information:
                    If you are listening on Order Updates via SignalR & try to get Orders via HTTP API call, and there is update: There are several possibilities:
                    Ideal:
                    1. Your http response contains the update, and signalR comes with the update after it.
                    2. Your http response contains the update, and signalR comes with the update before it.
                    3. Your http response doesn't contain the update, and signalR comes with the update after it.
            
                    Very rare:
                    4. Your http response doesn't contain the update, and signalR comes with the update before it.
                    */

            /*safe cleanup*/
            function getAllDeveloperOrdersNew(selectedStrategy, list, onListUpdated) {
                var hasDataBeenInitialized = false;
                var itemsInWaitingRoom = [];

                function storeInWaitingRoom(func, data) {
                    itemsInWaitingRoom.push({
                        func: func,
                        data: data
                    });
                }

                function resolveSignalRFromWaitingRoom() {
                    tool.log('resolveSignalRFromWaitingRoom');
                    itemsInWaitingRoom.forEach(function (item, idx) {
                        tool.log("\thandling count: " + idx + 1);
                        if (selectedStrategy.DisplayInfo.BasicInfo.StrategyId === item.data.StrategyId) {
                            item.func(item.data);
                        }
                    });
                    itemsInWaitingRoom = [];
                }
                
                function processDeveloperOrderCreation(data) {
                    tool.log("processDeveloperOrderCreation");
                    if (selectedStrategy.DisplayInfo.BasicInfo.StrategyId === data.StrategyId) {
                        if (hasDataBeenInitialized) {
                            processOrderCreation(data, list, onListUpdated);
                        } else {
                            storeInWaitingRoom(processDeveloperOrderCreation, data);
                        }
                    }
                }

                function processDeveloperOrderUpdate(data) {
                    tool.log("processDeveloperOrderUpdate");
                    if (selectedStrategy.DisplayInfo.BasicInfo.StrategyId === data.StrategyId) {
                        if (hasDataBeenInitialized) {
                            processOrderUpdate(data, list, onListUpdated);
                        } else {
                            storeInWaitingRoom(processDeveloperOrderUpdate, data);
                        }
                    }
                }

                function processDeveloperOrderMarkedForCancellation(data) {
                    tool.log("processDeveloperOrderMarkedForCancellation");
                    if (selectedStrategy.DisplayInfo.BasicInfo.StrategyId === data.StrategyId) {
                        if (hasDataBeenInitialized) {
                            processOrderMarkedForCancellation(data, list);
                        } else {
                            storeInWaitingRoom(processDeveloperOrderMarkedForCancellation, data);
                        }
                    }
                }

                function processOrderIntentionUpdate(data, list, onListUpdated) {
                    var updatedOrderIds = _.pluck(data, "OrderId");
                    list.forEach(function (order) {
                        if (_.includes(updatedOrderIds, order.OrderId)) {
                            var matchingData = data.filter(function(o) {
                                return o.OrderId === order.OrderId;
                            })[0];

                            order.Intention = matchingData.Intention;

                            if (onListUpdated) {
                                onListUpdated({ type: "update" });
                            }
                        }
                    });
                }

                function processDeveloperOrderIntentionUpdate(data) {
                    if (hasDataBeenInitialized) {
                        processOrderIntentionUpdate(data, list, onListUpdated);
                    } else {
                        storeInWaitingRoom(processDeveloperOrderIntentionUpdate, data);
                    }
                }

                coreSignalRNotificationService.turnOn('DeveloperOrderCreated', processDeveloperOrderCreation);
                coreSignalRNotificationService.turnOn('DeveloperOrderUpdated', processDeveloperOrderUpdate);
                coreSignalRNotificationService.turnOn('DeveloperOrderMarkedForCancellation', processDeveloperOrderMarkedForCancellation);
                coreSignalRNotificationService.turnOn('DeveloperActiveOrderIntentionUpdated', processDeveloperOrderIntentionUpdate);

                list.splice(0, list.length);

                var promise = orderService.GetActiveOrders(selectedStrategy.DisplayInfo.BasicInfo.StrategyId);
                getOrdersForStrategy(promise, list, onListUpdated).then(function () {
                    hasDataBeenInitialized = true;
                    resolveSignalRFromWaitingRoom();
                });

                return function () {
                    coreSignalRNotificationService.turnOff('DeveloperOrderCreated', processDeveloperOrderCreation);
                    coreSignalRNotificationService.turnOff('DeveloperOrderUpdated', processDeveloperOrderUpdate);
                    coreSignalRNotificationService.turnOff('DeveloperOrderMarkedForCancellation', processDeveloperOrderMarkedForCancellation);
                };
            }
            
            tool.setServiceObjectProperties({
                getHistoricalOrdersCount: getHistoricalOrdersCount,
                handleViewRelatedDeveloperOrder: handleViewRelatedDeveloperOrder,
                getAllDeveloperOrdersNew: getAllDeveloperOrdersNew,
                initializeHistoricalPagedOrders: initializeHistoricalPagedOrders,
                loadHistoricalOrdersPage: loadHistoricalOrdersPage
            });
        }
    );