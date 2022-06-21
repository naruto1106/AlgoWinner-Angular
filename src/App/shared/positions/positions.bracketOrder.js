agmNgModuleWrapper('agms.positions')
    .defineControllerAsPopup('s.positions.BracketOrderController', {
        templateUrl: '/App/shared/positions/positions.bracketOrder.html',
        windowClass: 'full-size-modal'
    }, ["sOrdersPadHelperService", "orderService", "sOrdersDetailService", 'position', 'title', "level"],
        function (vm, dep, tool) {
            var sOrdersPadHelperService = dep.sOrdersPadHelperService,
                orderService = dep.orderService,
                sOrdersDetailService = dep.sOrdersDetailService;
            
            function editBracketOrder() {
                var request = {
                    ParentPortfolioId: vm.position.PortfolioId
                };

                if (vm.order.HasAttachedTP) {
                    request.TakeProfitPrice = vm.order.TakeProfitOrder.LimitPrice;
                    request.TakeProfitValidity = "GTC";
                    request.TakeProfitQuantity = vm.order.Quantity;
                }

                if (vm.order.HasAttachedSL) {
                    request.StopLossPrice = vm.order.StopLossOrder.StopPrice;
                    request.StopLossValidity = "GTC";
                    request.StopLossQuantity = vm.order.Quantity;
                }

                orderService.SendPositionBracketOrder(request).then(function () {
                    dep.coreNotificationService.notifySuccess("Success", "Order submitted successfully");
                    vm.uibDismissPanel();
                }, function (res) {
                    if (res.data && res.data.BracketOrders && res.data.BracketOrders.length > 0) {
                        vm.uibClosePanel();
                        sOrdersDetailService.launchCancelBracketOrderPopUp(request, 'position', res.data.BracketOrders, vm.position);
                    } else {
                        if (res.data.Message) {
                            dep.coreNotificationService.notifyError("Error", res.data.Message);
                        } else {
                            dep.coreNotificationService.notifyError("Error", "An error occured, please try again later");
                        }
                    }
                });
            }

            function submit() {
                tool.openModalByDefinition("s.orders.BracketConfirmPopUpController", {
                    order: vm.order,
                    submitFunc: editBracketOrder
                });
            }

            function disableSubmit() {
                return vm.errorMessage !== "" || (vm.order.HasAttachedSL && vm.order.StopLossOrder == null) || (vm.order.HasAttachedTP && vm.order.TakeProfitOrder == null)
                || (vm.order.DeveloperBracketOrderDetailModel == null && ((!vm.order.HasAttachedSL && !vm.order.HasAttachedTP) || (vm.order.HasAttachedSL && vm.order.StopLossOrder == null) || (vm.order.HasAttachedTP && vm.order.TakeProfitOrder == null)));
            }

            function getItem() {
                return [vm.position];
            }

            function getTakeProfitOrder(orders) {
                if (!orders) {
                    return null;
                }
                var order =  orders.filter(function(o) {
                    return o.OrderType === "Limit";
                })[0];
                return order ? order : null;
            }

            function getStopLossOrder(orders) {
                if (!orders) {
                    return null;
                }
                var order =  orders.filter(function (o) {
                    return o.OrderType === "Stop";
                })[0];
                return order ? order : null;
            }

            var offSetBracketOrderValue = dep.coreConfigService.Trading.OffSetBracketOrderValue;
            function setUpBracketOrder() {
                if (vm.position.BracketOrders && vm.position.BracketOrders.length > 0) {
                    vm.order.StopLossOrder = angular.copy(getStopLossOrder(vm.position.BracketOrders));
                    vm.order.TakeProfitOrder = angular.copy(getTakeProfitOrder(vm.position.BracketOrders));
                    if (vm.order.StopLossOrder !== null) {
                        vm.order.HasAttachedSL = true;
                    }
                    if (vm.order.TakeProfitOrder !== null) {
                        vm.order.HasAttachedTP = true;
                    }
                }

                sOrdersPadHelperService.getCurrentOrderPrice(vm.order, "position").then(function (res) {
                    var currentPrice = res;
                    var aep = vm.position.AverageEntryPrice;
                    vm.order.LimitPrice = currentPrice;

                    if (vm.position.PositionType === "Long") {
                        vm.order.Product.askPrice = vm.position.AverageEntryPrice;
                        vm.order.Product.bidPrice = vm.position.AverageEntryPrice;

                        if (aep > currentPrice) {
                            if (getTakeProfitOrder(vm.position.BracketOrders) === null) {
                                vm.order.TakeProfitOrder = {
                                    LimitPrice: aep * (1 + offSetBracketOrderValue/100),
                                    OrderType: "Limit"
                                }

                                vm.order.TakeProfitOrder.LimitPrice = sOrdersPadHelperService.getCeilPriceBasedOnTickSize(vm.order.TakeProfitOrder.LimitPrice, vm.order.Product);
                            }
                            if (getStopLossOrder(vm.position.BracketOrders) === null) {
                                vm.order.StopLossOrder = {
                                    StopPrice: _.min([currentPrice, aep * (1 - offSetBracketOrderValue / 100)]),
                                    OrderType: "Stop"
                                };

                                vm.order.StopLossOrder.StopPrice = sOrdersPadHelperService.getFloorPriceBasedOnTickSize(vm.order.StopLossOrder.StopPrice, vm.order.Product);
                            }
                        } else {
                            if (getTakeProfitOrder(vm.position.BracketOrders) === null) {
                                vm.order.TakeProfitOrder = {
                                    LimitPrice: _.max([currentPrice, aep * (1 + offSetBracketOrderValue / 100)]),
                                    OrderType: "Limit"
                                }

                                vm.order.TakeProfitOrder.LimitPrice = sOrdersPadHelperService.getCeilPriceBasedOnTickSize(vm.order.TakeProfitOrder.LimitPrice, vm.order.Product);
                            }
                            if (getStopLossOrder(vm.position.BracketOrders) === null) {
                                vm.order.StopLossOrder = {
                                    StopPrice: aep * (1 - offSetBracketOrderValue / 100),
                                    OrderType: "Stop"
                                };

                                vm.order.StopLossOrder.StopPrice = sOrdersPadHelperService.getFloorPriceBasedOnTickSize(vm.order.StopLossOrder.StopPrice, vm.order.Product);
                            }
                        }
                    } else {
                        vm.order.Product.bidPrice = vm.position.AverageEntryPrice;
                        vm.order.Product.askPrice = vm.position.AverageEntryPrice;

                        if (aep > currentPrice) {
                            if (getTakeProfitOrder(vm.position.BracketOrders) === null) {
                                vm.order.TakeProfitOrder = {
                                    LimitPrice: _.min([currentPrice, aep * (1 - offSetBracketOrderValue / 100)]),
                                    OrderType: "Limit"
                                }

                                vm.order.TakeProfitOrder.LimitPrice = sOrdersPadHelperService.getFloorPriceBasedOnTickSize(vm.order.TakeProfitOrder.LimitPrice, vm.order.Product);
                            }
                            if (getStopLossOrder(vm.position.BracketOrders) === null) {
                                vm.order.StopLossOrder = {
                                    StopPrice: aep * (1 + offSetBracketOrderValue / 100),
                                    OrderType: "Stop"
                                };

                                vm.order.StopLossOrder.StopPrice = sOrdersPadHelperService.getCeilPriceBasedOnTickSize(vm.order.StopLossOrder.StopPrice, vm.order.Product);
                            }
                        } else {
                            if (getTakeProfitOrder(vm.position.BracketOrders) === null) {
                                vm.order.TakeProfitOrder = {
                                    LimitPrice: aep * (1 - offSetBracketOrderValue / 100),
                                    OrderType: "Limit"
                                }

                                vm.order.TakeProfitOrder.LimitPrice = sOrdersPadHelperService.getFloorPriceBasedOnTickSize(vm.order.TakeProfitOrder.LimitPrice, vm.order.Product);
                            }
                            if (getStopLossOrder(vm.position.BracketOrders) === null) {
                                vm.order.StopLossOrder = {
                                    StopPrice: _.max([currentPrice, aep * (1 + offSetBracketOrderValue / 100)]),
                                    OrderType: "Stop"
                                };

                                vm.order.StopLossOrder.StopPrice = sOrdersPadHelperService.getCeilPriceBasedOnTickSize(vm.order.StopLossOrder.StopPrice, vm.order.Product);
                            }
                        }
                    }
                });
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    errorMessage: "",
                    position: dep.position,
                    title: dep.title,
                    getItem: getItem,
                    submit: submit,
                    disableSubmit: disableSubmit
                });

                vm.order = {
                    OrderType: "Market",
                    AverageEntryPrice: vm.position.AverageEntryPrice,
                    Product: vm.position.Product,
                    Quantity: vm.position.QuantityOnHold,
                    Action: vm.position.PositionType === "Long" ? "Buy" : "Sell",
                    PositionType: vm.position.PositionType
                }

                setUpBracketOrder();
            });
        }
    );
