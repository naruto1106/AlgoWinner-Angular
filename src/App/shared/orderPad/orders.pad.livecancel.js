agmNgModuleWrapper('agms.orders', [])
    .defineControllerAsPopup('s.orders.PadLiveCancelPopupController',
    {
        templateUrl: '/App/shared/orderPad/orders.pad.livecancel.html',
        windowClass: 'smaller-modal'
    },
    [
        'listOfCancellableOrders', 'orderService', 'accountId'
    ],
    function (vm, dep, tool) {
        // --- DEPENDENCY RESOLVER
        var orderService = dep.orderService,
            accountId = dep.accountId,
            coreNotificationService = dep.coreNotificationService;


        // --- LOCAL VAR DECLARATION
        var listOfCancellableOrders = dep.listOfCancellableOrders;


        // --- SCOPE FUNC
        function submit() {
            if (vm.order.Action === 'Cancel') {
                vm.isSubmitting = true;

                var cancelRequest = {
                    AccountId: accountId,
                    OrderId: vm.order.id
                };

                // TODO: MaRa IMPLEMENT LOGIN POPUP FORM FOR UNAUTHORIZED
                return orderService.CancelLiveOrder(cancelRequest)
                    .then(function (data) {
                        vm.order.id = data.id;
                        vm.uibClosePanel({
                            order: vm.order,
                            selectedStrategy: vm.selectedStrategy
                        });
                        coreNotificationService.notifySuccess("Cancel Order", "Your order cancellation has been successfully sent");
                    },function (res) {
                        if (res.status === 400) {
                            coreNotificationService.notifyError("Cancel Order", res.data);
                        } else {
                            coreNotificationService.notifyError("Cancel Order", "There was an error trying to approve this request. Please check your connection or try again later.");
                        }
                    });
            }
        }

        tool.initialize(function () {
            tool.setVmProperties({
                submit: submit,
                isSubmitting: false,
                order: null
            });

            if (listOfCancellableOrders && listOfCancellableOrders.length > 0) {
                vm.order = listOfCancellableOrders[0];
                vm.order.inputNominalQuantity = vm.order.dealSize;
                vm.order.OriginalAction = vm.order.direction;
                vm.order.Action = "Cancel";
            }
        });
    });