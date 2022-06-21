agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.BracketElementController',
        ["orderProcessing", "sOrdersDetailService"],
        function (vm, dep, tool) {
            var orderProcessing = dep.orderProcessing,
                sOrdersDetailService = dep.sOrdersDetailService,
                $filter = dep.$filter;
            
            function showCancelButtonFunc(order) {
                return vm.viewMode !== 'readonly' && !vm.isByAccount && vm.showCancelButton
                       && (vm.isCancellableOrder(vm.getStopLossOrder(order)) || vm.isCancellableOrder(vm.getTakeProfitOrder(order)));
            }

            function showCancelling(order) {
                return $filter('isCancellingOrder')(order) && order.LatestStatus !== 'Filled' && !vm.isByAccount;
            }

            function cancelFunc(order) {
                tool.openModalByDefinition('s.orders.PadCancelBracketController', {
                    takeProfitOrder: vm.getTakeProfitOrder(order),
                    stopLossOrder: vm.getStopLossOrder(order)
                });
            }

            function getFilledQuantity(order) {
                var fillQuantity = 0;
                if (order.LatestStatus === 'Partially Filled') {
                    fillQuantity = order.OrderUpdates[order.OrderUpdates.length - 1].FillQuantity;
                }
                if (order.LatestStatus === 'Filled') {
                    fillQuantity = order.Quantity;
                }
                return fillQuantity;
            }

            function showQueuedStatus() {
                return (vm.order.LatestStatus === 'Queued') || (vm.order.LatestStatus === 'Processed by Broker');
            }

            function showFilledStatus(order) {
                return (order.LatestStatus === 'Filled');
            }

            function sameOrderStatus() {
                return vm.getTakeProfitOrder(vm.order).LatestStatus === vm.getStopLossOrder(vm.order).LatestStatus;
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    getTakeProfitOrder: sOrdersDetailService.getTakeProfitOrder,
                    getStopLossOrder: sOrdersDetailService.getStopLossOrder,
                    showCancelButtonFunc: showCancelButtonFunc,
                    isCancellableOrder: orderProcessing.isCancellableOrder,
                    cancelFunc: cancelFunc,
                    showCancelling: showCancelling,
                    showQueuedStatus: showQueuedStatus,
                    showFilledStatus: showFilledStatus,
                    getFilledQuantity: getFilledQuantity,
                    sameOrderStatus: sameOrderStatus
                });
            });
        })
    .defineDirectiveForE('agms-orders-bracket-element', [], function () {
        return {
            controller: 's.orders.BracketElementController',
            templateUrl: '/App/shared/bracketOrders/orders.bracket.element.html'
        };
    }, {
        isByAccount: '=',
        showCancelButton: '=',
        order: '=',
        viewMode: '='
    })
    .defineDirectiveForE('agms-orders-bracket-active', [], function () {
        return {
            controller: 's.orders.BracketElementController',
            templateUrl: '/App/shared/bracketOrders/orders.bracket.active.html'
        };
    }, {
        isByAccount: '=',
        showCancelButton: '=',
        order: '=',
        viewMode: '='
    });