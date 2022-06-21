agmNgModuleWrapper('agms.orders')
    .defineControllerAsPopup('s.orders.BracketEditController', {
        templateUrl: '/App/shared/bracketOrders/orders.bracket.edit.html',
        windowClass: 'smaller-modal'
    }, ["sOrdersPadHelperService", "orderService", "sOrdersDetailService", 'order', 'title', "level"],
        function (vm, dep, tool) {
            var sOrdersPadHelperService = dep.sOrdersPadHelperService,
                orderService = dep.orderService,
                sOrdersDetailService = dep.sOrdersDetailService;

            function editBracketOrder() {
                var request = {
                    DeveloperOrderId: vm.order.OrderId
                };

                if (vm.order.HasAttachedTP) {
                    request.TakeProfitOrderType = "Limit";
                    request.TakeProfitPrice = vm.order.TakeProfitOrder.LimitPrice;
                    request.TakeProfitValidity = "GTC";
                    request.TakeProfitQuantity = vm.order.Quantity;
                }

                if (vm.order.HasAttachedSL) {
                    request.CutLossOrderType = "Stop";
                    request.CutLossPrice = vm.order.StopLossOrder.StopPrice;
                    request.CutLossValidity = "GTC";
                    request.CutLossQuantity = vm.order.Quantity;
                }

                orderService.AddOrUpdateBracketOrderDetail(request).then(function () {
                    dep.coreNotificationService.notifySuccess("Success", "Order submitted successfully");
                    vm.uibDismissPanel();
                }, function (res) {
                    if (res.data && res.data.BracketOrders && res.data.BracketOrders.length > 0) {
                        vm.uibClosePanel();
                        sOrdersDetailService.launchCancelBracketOrderPopUp(request, 'order', res.data.BracketOrders, null);
                    } else {
                        if (res.data.Message) {
                            dep.coreNotificationService.notifyError("Error", res.data.Message);
                        } else {
                            dep.coreNotificationService.notifyError("Error", "An error occured, please try again later");
                        }
                    }
                });
            }

            function removeBrackOrder() {
                var request = {
                    ParentOrderId: vm.order.OrderId
                };

                orderService.RemoveBracketOrderDetail(request).then(function () {
                    dep.coreNotificationService.notifySuccess("Success", "Order removed successfully");
                    vm.uibDismissPanel();
                }, function (res) {
                    if (res.data && res.data.Message) {
                        dep.coreNotificationService.notifyError("Error", res.data.Message);
                    } else {
                        dep.coreNotificationService.notifyError("Error", "An error occured, please try again later");
                    }
                });
            }

            function submit() {
                if (!vm.order.HasAttachedSL && !vm.order.HasAttachedTP && vm.order.DeveloperBracketOrderDetailModel) {
                    dep.coreNotificationService.notifyYesNo("Removing Bracket Order", "Are you sure to remove bracket orders?", function(id) {
                        if (id === 0) {
                            removeBrackOrder();
                        }
                    });
                } else {
                    tool.openModalByDefinition("s.orders.BracketConfirmPopUpController", {
                        order: vm.order,
                        submitFunc: editBracketOrder
                    });
                }
            }

            function disableSubmit() {
                return vm.errorMessage !== "" || (vm.order.HasAttachedSL && vm.order.StopLossOrder == null) || (vm.order.HasAttachedTP && vm.order.TakeProfitOrder == null)
                || (vm.order.DeveloperBracketOrderDetailModel == null && ((!vm.order.HasAttachedSL && !vm.order.HasAttachedTP) || (vm.order.HasAttachedSL && vm.order.StopLossOrder == null) || (vm.order.HasAttachedTP && vm.order.TakeProfitOrder == null)));
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    errorMessage: "",
                    order: angular.copy(dep.order),
                    title: dep.title,
                    submit: submit,
                    disableSubmit: disableSubmit
                });

                vm.order.StopLossOrder = {
                    StopPrice: 0
                };
                vm.order.TakeProfitOrder = {
                    LimitPrice: 0
                }
                sOrdersPadHelperService.reevaluateBracketOrder(vm.order);

                if (vm.order && vm.order.DeveloperBracketOrderDetailModel) {

                    if (vm.order.DeveloperBracketOrderDetailModel.CutLossPrice != null) {
                        vm.order.HasAttachedSL = true;
                        vm.order.StopLossOrder = {
                            StopPrice: vm.order.DeveloperBracketOrderDetailModel.CutLossPrice
                        };
                    }

                    if (vm.order.DeveloperBracketOrderDetailModel.TakeProfitPrice != null) {
                        vm.order.HasAttachedTP = true;
                        vm.order.TakeProfitOrder = {
                            LimitPrice: vm.order.DeveloperBracketOrderDetailModel.TakeProfitPrice
                        }
                    }
                }
            });
        }
    );
