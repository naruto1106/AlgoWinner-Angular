agmNgModuleWrapper('agms.orders')
    .defineControllerAsPopup("s.orders.CancellationPopupController",
        {
            templateUrl: '/App/shared/orders/orders.cancellation.html',
        },
        ['currentActiveOrder', 'doCancelOrder'],
        function(vm, dep, tool) {
            var coreNotificationService = dep.coreNotificationService;
            var currentActiveOrder = dep.currentActiveOrder;
            var doCancelOrder = dep.doCancelOrder;
            var productDetail = currentActiveOrder.Product.ProductName + " (" + currentActiveOrder.Product.Symbol + ")";

            function cancelOrder() {
                doCancelOrder().then(function(cancelledOrder) {
                    if (cancelledOrder.LatestStatus === 'Cancelled') {
                        coreNotificationService.notifySuccess("Order Cancelled Successfully", "<span class='glyphicon glyphicon-ok green-profit'> You may now place a new order on " + productDetail + ".").result.finally(function() {
                            vm.uibClosePanel();
                        });
                    } else {
                        coreNotificationService.notifySuccess("Order Pending Cancellation", "Your order cancellation has been successfully sent.").result.finally(function() {
                            vm.uibDismissPanel();
                        });
                    }
                }, function() {
                    vm.uibDismissPanel();
                });
            }

            tool.setVmProperties({
                cancelOrder: cancelOrder,
                order: currentActiveOrder
            });
        });
