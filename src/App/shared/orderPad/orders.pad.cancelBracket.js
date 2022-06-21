agmNgModuleWrapper('agms.orders')
    .defineControllerAsPopup('s.orders.PadCancelBracketController', {
        templateUrl: '/App/shared/orderPad/orders.pad.cancelBracket.html',
        windowClass: 'smaller-modal'
    }, ["takeProfitOrder", "stopLossOrder", "orderService", "orderProcessing"],
    function (vm, dep, tool) {
        var orderService = dep.orderService,
            orderProcessing = dep.orderProcessing;

        function submit() {
            if (vm.cancelTakeProfit && vm.cancelStopLoss) {
                var request = {
                    TakeProfitOrderIdToCancel: vm.takeProfitOrder.OrderId,
                    StopLossOrderIdToCancel: vm.stopLossOrder.OrderId
                }
                orderService.CancelBracketOrder(request).then(function () {
                    dep.coreNotificationService.notifySuccess("Success", "Request submitted successfully");
                    vm.uibDismissPanel();
                }, function(res) {
                    if (res.data && res.data.Message) {
                        dep.coreNotificationService.notifyError("Error", res.data.Message);
                    } else {
                        dep.coreNotificationService.notifyError("Error", "An error occured, please try again later");
                    }
                });
            } else if (vm.cancelTakeProfit) {
                var cancelTp = {
                    OrderIdToCancel: vm.takeProfitOrder.OrderId,
                    StrategyId: vm.takeProfitOrder.StrategyId
                }
                orderService.CancelDeveloperOrder(cancelTp).then(function () {
                    dep.coreNotificationService.notifySuccess("Cancel Order", "Your order cancellation has been successfully sent");
                    vm.uibDismissPanel();
                }, function (res) {
                    if (res.data && res.data.Message) {
                        dep.coreNotificationService.notifyError("Error", res.data.Message);
                    } else {
                        dep.coreNotificationService.notifyError("Error", "An error occured, please try again later");
                    }
                });
            } else if (vm.cancelStopLoss) {
                var cancelSl = {
                    OrderIdToCancel: vm.stopLossOrder.OrderId,
                    StrategyId: vm.stopLossOrder.StrategyId
                }
                orderService.CancelDeveloperOrder(cancelSl).then(function () {
                    dep.coreNotificationService.notifySuccess("Cancel Order", "Your order cancellation has been successfully sent");
                    vm.uibDismissPanel();
                }, function (res) {
                    if (res.data && res.data.Message) {
                        dep.coreNotificationService.notifyError("Error", res.data.Message);
                    } else {
                        dep.coreNotificationService.notifyError("Error", "An error occured, please try again later");
                    }
                });
            }
        }

        function disableSubmit() {
            return !vm.cancelTakeProfit && !vm.cancelStopLoss;
        }

        function showStopLoss() {
            return vm.stopLossOrder !== null && orderProcessing.isCancellableOrder(vm.stopLossOrder);
        }

        function showTakeProfit() {
            return vm.takeProfitOrder !== null && orderProcessing.isCancellableOrder(vm.takeProfitOrder);
        }

        tool.initialize(function () {
            tool.setVmProperties({
                cancelTakeProfit: false,
                cancelStopLoss: false,
                takeProfitOrder: dep.takeProfitOrder,
                stopLossOrder: dep.stopLossOrder,
                disableSubmit: disableSubmit,
                submit: submit,
                showTakeProfit: showTakeProfit,
                showStopLoss: showStopLoss
            });
        });
    });