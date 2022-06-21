agmNgModuleWrapper('agms.orders')
    .defineControllerAsPopup('s.orders.BracketCancelPopUpController', {
        templateUrl: '/App/shared/bracketOrders/orders.bracket.cancel.html',
        windowClass: 'smaller-modal'
    }, ["orderService", "sOrdersDetailService", 'order', 'bracketOrders', "level", "position"],
        function (vm, dep, tool) {
            
            var orderService = dep.orderService,
                sOrdersDetailService = dep.sOrdersDetailService;

            // --- SCOPE FUNC
            function submit() {
                vm.order.ForceToCancelBracketOrder = true;
                vm.isLoading = true;

                if (vm.level === "order") {
                    orderService.SendDeveloperOrder(vm.order).then(function (res) {
                        vm.uibClosePanel();
                        dep.coreNotificationService.notifySuccess("Send Order", "Your order has been successfully sent");
                    }, function (res) {
                        vm.uibClosePanel();
                        if (res && res.Message) {
                            coreNotificationService.notifyError("Error", res.Message);
                        } else {
                            dep.coreNotificationService.notifyError("Error", "An error occured, please try again later");
                        }
                    }).finally(function() {
                        vm.isLoading = false;
                    });
                }

                if (vm.level === "position") {
                    orderService.SendPositionBracketOrder(vm.order).then(function (res) {
                        dep.coreNotificationService.notifySuccess("Send Order", "Your order has been successfully sent");
                        vm.uibClosePanel();
                    }, function (res) {
                        vm.uibClosePanel();
                        if (res && res.Message) {
                            coreNotificationService.notifyError("Error", res.Message);
                        } else {
                            dep.coreNotificationService.notifyError("Error", "An error occured, please try again later");
                        }
                    }).finally(function () {
                        vm.isLoading = false;
                    });
                }
            }

            function getCurrency() {
                return vm.level === "position" ? vm.position.Product.Currency : vm.order.Product.Currency;
            }

            function getQuantity() {
                if (vm.level === "position") {
                    return vm.order.StopLossQuantity ? vm.order.StopLossQuantity : vm.order.TakeProfitQuantity;
                } else {
                    return vm.order.Quantity;
                }
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    isLoading: false,
                    order: dep.order,
                    level: dep.level,
                    position: dep.position,
                    bracketOrders: dep.bracketOrders,
                    submit: submit,
                    getCurrency: getCurrency,
                    getQuantity: getQuantity,
                    getTakeProfitOrder: sOrdersDetailService.getTakeProfitOrder,
                    getStopLossOrder: sOrdersDetailService.getStopLossOrder
                });

                vm.bracketOrders.forEach(function(b) {
                    b.LatestStatus = "Queued";
                });

                vm.bracketOrders = sOrdersDetailService.reorganizeOrderListForBracketOrders(vm.bracketOrders);

                vm.bracketOrders.forEach(function (b) {
                    if (b.BracketOrder) {
                        if (moment(b.BracketOrder.CreatedTime) > moment(b.CreatedTime)) {
                            b.CreatedTime = b.BracketOrder.CreatedTime;
                        }
                    }
                });
            });
        }
    );