agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.TransactionElementController',
        ['orderProcessing'],
        function (vm, dep, tool) {
            var orderProcessing = dep.orderProcessing,
                agmCoreConfigService = dep.coreConfigService,
                $filter = dep.$filter;

            function cancelFunc(order) {
                return tool.promisedEmit('cancelOrderEvent', order);
            }

            function blink() {
                tool.timeout(function () {
                    vm.isBlinking = false;
                }, 3000);
                vm.isBlinking = true;
            }

            tool.timeout(function () {
                if (vm.order.isLoadedFromSignalR) {
                    delete vm.order.isLoadedFromSignalR;
                    blink();
                }
            });

            tool.on("orderCreationHasHappened", function (src, orderId) {
                if (orderId === vm.order.OrderId) {
                    blink();
                }
            });

            tool.on("orderUpdateHasHappened", function (src, order) {
                if (order.OrderId === vm.order.OrderId) {
                    blink();
                }
            });

            tool.on("orderCancellationHasHappened", function (src, orderId) {
                if (orderId === vm.order.OrderId) {
                    blink();
                }
            });

            function showCancelling(order) {
                return $filter('isCancellingOrder')(order) && order.LatestStatus !== 'Filled' && !vm.isByAccount;
            }

            function showCancelButtonFunc(order) {
                return vm.viewMode !== 'readonly' && !vm.isByAccount && vm.showCancelButton && vm.isCancellableOrder(order);
            }

            function showViewBracketOrder(order) {
                return order.DeveloperBracketOrderDetailModel != null && (order.StopLossOrder != null || order.TakeProfitOrder != null);
            }

            function showEditBracketOrder(order) {
                return (order.DeveloperBracketOrderDetailModel != null && (order.DeveloperBracketOrderDetailModel.CutLossPrice != null || order.DeveloperBracketOrderDetailModel.TakeProfitPrice != null))
                    && order.StopLossOrder == null && order.TakeProfitOrder == null && order.LatestStatus !== "Rejected by Broker" && order.LatestStatus !== "Cancelled"
                    && order.LatestStatus !== "Rejected by OMS";
            }

            function showAddBracketOrder(order) {
                return ((order.DeveloperBracketOrderDetailModel == null) || (order.DeveloperBracketOrderDetailModel != null && (order.DeveloperBracketOrderDetailModel.CutLossPrice == null && order.DeveloperBracketOrderDetailModel.TakeProfitPrice == null)))
                    && order.StopLossOrder == null && order.TakeProfitOrder == null
                    && !orderProcessing.isHistorical(order) && order.ParentOrderId == null && order.ParentPortfolioId == null
                    && order.Intention !== "Full Exit" && order.ReplicationIntention !== "Partial Exit";
            }

            function showBracketOrderDetail(order) {
                if ((order.TakeProfitOrder != null && orderProcessing.isHistorical(order.TakeProfitOrder))
                    && (order.StopLossOrder != null && orderProcessing.isHistorical(order.StopLossOrder))) {
                    return false;
                }
                return ((order.DeveloperBracketOrderDetailModel != null && (order.DeveloperBracketOrderDetailModel.CutLossPrice != null || order.DeveloperBracketOrderDetailModel.TakeProfitPrice != null))
                       || (order.TakeProfitOrder != null || order.StopLossOrder != null)) && agmCoreConfigService.Trading.ShowBracketOrder;
            }

            function showTakeProfit(order) {
                return order.TakeProfitOrder != null || (order.TakeProfitOrder === null && order.DeveloperBracketOrderDetailModel.TakeProfitPrice != null);
            }

            function showStopLoss(order) {
                return order.StopLossOrder != null || (order.StopLossOrder === null && order.DeveloperBracketOrderDetailModel.CutLossPrice != null);
            }

            function showBracketCancelButtonFunc(order) {
                return vm.viewMode !== 'readonly' && !vm.isByAccount && vm.showCancelButton
                       && ((order.TakeProfitOrder && vm.isCancellableOrder(order.TakeProfitOrder)) || (order.StopLossOrder && vm.isCancellableOrder(order.StopLossOrder)));
            }

            function cancelBracketFunc(order) {
                tool.openModalByDefinition('s.orders.PadCancelBracketController', {
                    takeProfitOrder: order.TakeProfitOrder,
                    stopLossOrder: order.StopLossOrder
                });
            }

            tool.initialize(function() {
                tool.setVmProperties({
                    isBlinking: false,
                    agmCoreConfigService: agmCoreConfigService,
                    isCancellableOrder: orderProcessing.isCancellableOrder,
                    showCancelButtonFunc: showCancelButtonFunc,
                    cancelBracketFunc: cancelBracketFunc,
                    showBracketCancelButtonFunc: showBracketCancelButtonFunc,
                    cancelFunc: cancelFunc,
                    showViewBracketOrder: showViewBracketOrder,
                    showEditBracketOrder: showEditBracketOrder,
                    showAddBracketOrder: showAddBracketOrder,
                    showCancelling: showCancelling,
                    showBracketOrderDetail: showBracketOrderDetail,
                    showTakeProfit: showTakeProfit,
                    showStopLoss: showStopLoss
                });
            });
        })
	    .defineDirectiveForE('agms-orders-transaction-element', [], function () {
	        return {
	            controller: 's.orders.TransactionElementController',
	            templateUrl: '/App/shared/orders/orders.transactionElement.html'
	        };
	    }, {
	        isByAccount: '=',
	        showCancelButton: '=',
	        order: '=',
	        viewBracketOrderFunc: "=",
	        editBracketOrderFunc: "=",
	        viewMode: '='
	    });