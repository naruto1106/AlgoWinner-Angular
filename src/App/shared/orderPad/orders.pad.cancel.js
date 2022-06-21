agmNgModuleWrapper('agms.orders', [])
    .defineControllerAsPopup('s.orders.PadCancelDeveloperPopupController',
    {
        templateUrl: '/App/shared/orderPad/orders.pad.cancel.html',
        windowClass: 'smaller-modal'
    },
    [
        'myStrategies', 'myTradingAccounts', 'listOfCancellableOrders', 'sOrdersPadHelperService'
    ],
    function (vm, dep, tool) {
        // --- DEPENDENCY RESOLVER
        var sOrdersPadHelperService = dep.sOrdersPadHelperService,
            coreNotificationService = dep.coreNotificationService;


        // --- LOCAL VAR DECLARATION
        var allStrategies = dep.myStrategies,
            listOfCancellableOrders = dep.listOfCancellableOrders;


        // --- SCOPE FUNC
        function submit() {
            if (vm.order.Action === 'Cancel') {
                vm.Product = null;
                vm.isSubmitting = true;
                return sOrdersPadHelperService.sendOrder(vm.order, vm.selectedStrategy.BrokerageDetail.BrokerageType,
                    function (data) {
                        vm.order.OrderId = data.OrderId;
                        vm.uibClosePanel({
                            order: vm.order,
                            selectedStrategy: vm.selectedStrategy
                        });
                        coreNotificationService.notifySuccess("Cancel Order", "Your order cancellation has been successfully sent");
                    },
                    function (res) {
                        if (res && res.Message) {
                            coreNotificationService.notifyError("Cancel Order", res.Message);
                        } else {
                            coreNotificationService.notifyError("Cancel Order",
                                "There was an error trying to approve this request. Please check your connection or try again later.");
                        }
                    },
                    function () {
                        vm.isSubmitting = false;
                        vm.uibClosePanel({
                            order: vm.order,
                            selectedStrategy: vm.selectedStrategy
                        });
                    }).finally(function () {
                    vm.isSubmitting = false;
                });
            }
        }

        tool.initialize(function () {
            tool.setVmProperties({
                submit: submit,
                selectedStrategy: null,
                isSubmitting: false,
                order: null
            });

            sOrdersPadHelperService.clearCache();

            if (allStrategies && allStrategies.length > 0) {
                vm.selectedStrategy = allStrategies[0];
            }

            if (listOfCancellableOrders && listOfCancellableOrders.length > 0) {
                vm.order = listOfCancellableOrders[0];
                vm.order.inputNominalQuantity = vm.order.Quantity;
                vm.order.OriginalAction = vm.order.Action;
                vm.order.Action = "Cancel";
            }
        });
    });