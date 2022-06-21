agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.TableElementController', ['orderProcessing', 'notCancelledFilter'],
        function(vm, dep, tool) {
            var orderProcessing = dep.orderProcessing,
                notCancelledFilter = dep.notCancelledFilter,
                coreConfigService = dep.coreConfigService;

            vm.detailShown = false;
            vm.cancelFunc = cancelFunc;
            vm.isCancellableOrder = orderProcessing.isCancellableOrder;
            vm.showQueuedStatus = showQueuedStatus;
            vm.showPartialFilledStatus = showPartialFilledStatus;
            vm.showFilledStatus = showFilledStatus;
            vm.getFilledQuantity = getFilledQuantity;
            vm.getPartiallyFilledProportions = getPartiallyFilledProportions;
            vm.lastUpdate = lastUpdate;
            vm.hideOrderDetail = hideOrderDetail;
            vm.showOrderDetail = showOrderDetail;
            vm.showViewDetail = showViewDetail;
            vm.showCancel = showCancel;
            vm.averagePrice = averagePrice;
            vm.remainingQuantity = remainingQuantity;
            vm.showPositionDetail = showPositionDetail;
            vm.coreConfigService = coreConfigService;
            vm.viewOrderDetailFunc = viewOrderDetailFunc;

            function viewOrderDetailFunc(order) {
                return tool.promisedEmit('viewRelatedOrderEvent', order);
            }

            function cancelFunc(order) {
                return tool.promisedEmit('cancelOrderEvent', order);
            }

            function showQueuedStatus() {
                return (vm.order.LatestStatus === 'Queued') || (vm.order.LatestStatus === 'Processed by Broker');
            }

            function showPartialFilledStatus() {
                return (vm.order.LatestStatus === 'Partially Filled');
            }

            function showFilledStatus() {
                return (vm.order.LatestStatus === 'Filled');
            }

            function getFilledQuantity() {
                var fillQuantity = 0;
                if (vm.order.LatestStatus === 'Partially Filled') {
                    fillQuantity = vm.order.OrderUpdates[vm.order.OrderUpdates.length - 1].FillQuantity;
                }
                if (vm.order.LatestStatus === 'Filled') {
                    fillQuantity = vm.order.Quantity;
                }
                return fillQuantity;
            }

            function getPartiallyFilledProportions() {
                var filled = getFilledQuantity();
                var total = vm.order.Quantity;
                return [filled, total - filled];
            }

            function lastUpdate() {
                return vm.order.OrderUpdates[vm.order.OrderUpdates.length - 1];
            }

            function hideOrderDetail() {
                vm.detailShown = false;
            }

            function showOrderDetail() {
                vm.detailShown = true;
            }

            function showViewDetail() {
                return vm.isPreview ? false : vm.viewOrderDetailFunc && notCancelledFilter(vm.order) && vm.order.LatestStatus === "Filled";
            }

            function showPositionDetail() {
                return vm.isPreview ? false : true;
            }

            function showCancel() {
                return vm.showCancelButton && vm.isCancellableOrder(vm.order) && notCancelledFilter(vm.order);
            }

            function averagePrice() {
                var price = 0;
                var quantity = 0;
                vm.order.OrderUpdates.forEach(function(update) {
                    if (update.FillQuantity && update.FillPrice) {
                        price += update.FillPrice * update.FillQuantity;
                        quantity += update.FillQuantity;
                    }
                });
                if (quantity > 0) {
                    return +(price / quantity).toFixed(4);
                }
                return null;
            }

            function remainingQuantity(update) {
                update = update || lastUpdate();
                if (vm.order.Quantity) {
                    return vm.order.Quantity - update.FillQuantity;
                } else {
                    return null;
                }
            }
        })
    .defineDirectiveForE('agms-orders-table-element', [], function () {
        return {
            controller: 's.orders.TableElementController',
            templateUrl: '/App/shared/orders/orders.tableElement.html'
        };
    }, {
        isByAccount: '=',
        isRelatedOrderBrowsable: '=',
        showCancelButton: '=',
        order: '=',
        viewBracketOrderFunc: "=",
        hasBracketOrderFunc: "=",
        isPreview: "=",
        subscriberOrders: '=',
        viewMode: '='
    });