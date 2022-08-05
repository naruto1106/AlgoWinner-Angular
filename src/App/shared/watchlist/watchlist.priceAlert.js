agmNgModuleWrapper('agms.watchlist')
    .defineControllerAsPopup('s.watchlist.PriceAlertPopupController',
        {
            templateUrl: '/App/shared/watchlist/watchlist.priceAlert.html',
            windowClass: 'mini-modal'
        },
        [
            'product', 'alerts', 'isEdit', 'sProductService', 'tradeDataService', "ticksizeService", 'sPriceAlertService'
        ],
        function (vm, dep, tool) {

            var coreNotificationService = dep.coreNotificationService,
                sProductService = dep.sProductService,
                tradeDataService = dep.tradeDataService,
                sPriceAlertService = dep.sPriceAlertService;

            var tickSize = 0.01;

            if (dep.product) {
                sProductService.updateProductTickSizeValueIfBelongToGroup(dep.product);
            }

            vm.verifyPrice = function () {
                verifyPriceRange();

                //adjust displayed price
                if (vm.alertPrice !== null) {
                    if (tickSize !== null) {
                        if (tickSize === 0.0001) {
                            vm.alertPrice = Math.floor((vm.alertPrice * 10000).toFixed(4)) / 10000;
                        } else if (tickSize === 0.001 || tickSize === 0.005) {
                            vm.alertPrice = Math.floor((vm.alertPrice * 1000).toFixed(3)) / 1000;
                        } else {
                            vm.alertPrice = Math.floor((vm.alertPrice * 100).toFixed(2)) / 100;
                        }
                    }
                }

                vm.priceDifference = vm.alertPrice - vm.currentPrice;
                if (vm.currentPrice !== 0) {
                    vm.priceDifferencePct = vm.priceDifference / vm.currentPrice;
                }
            };

            vm.addAlert = function () {
                if (vm.alertPrice === null) {
                    vm.alertPrice = 0;
                }
                var newAlert = {
                    ProductId: vm.product.ProductId,
                    AlertPrice: vm.alertPrice,
                    Direction: ((vm.alertPrice - vm.currentPrice) < 0) ? "Bear" : "Bull"
                };
                vm.isAddingAlert = true;
                sPriceAlertService.createPriceAlert(newAlert).then(function (res) {
                    coreNotificationService.notifySuccess("Success", "Added Price Alert at " + newAlert.AlertPrice);
                },
                    function (res) {
                        if (res.data && res.data.Message) {
                            coreNotificationService.notifyError("Error", res.data.Message);
                        } else {
                            coreNotificationService.notifyError("Error",
                                "An error occurred trying to add this price alert. Please check your connection settings and try again.");
                        }
                    }).finally(function () {
                        vm.isAddingAlert = false;
                    });
            };

            vm.editAlert = function () {
                if (vm.alertPrice === null) {
                    vm.alertPrice = 0;
                }
                var newAlert = {
                    PriceAlertId: dep.product.PriceAlertId,
                    AlertPrice: vm.alertPrice,
                    Direction: ((vm.alertPrice - vm.currentPrice) < 0) ? "Bear" : "Bull"
                };
                vm.isAddingAlert = true;
                sPriceAlertService.modifyPriceAlert(newAlert).then(function () {
                    coreNotificationService.notifySuccess("Success",
                        "Modified Price Alert at " + newAlert.AlertPrice);
                },
                    function (res) {
                        if (res.data && res.data.Message) {
                            coreNotificationService.notifyError("Error", res.data.Message);
                        } else {
                            coreNotificationService.notifyError("Error",
                                "An error occurred trying to add this price alert. Please check your connection settings and try again.");
                        }
                    }).finally(function () {
                        vm.isAddingAlert = false;
                    });
            };

            vm.deleteAlert = function (alert) {
                var deleteAlert = {
                    PriceAlertId: alert.PriceAlertId
                };
                sPriceAlertService.deletePriceAlert(deleteAlert).then(function () {
                    coreNotificationService.notifySuccess("Success", "Deleted Alert at " + alert.AlertPrice);
                    vm.alerts = vm.alerts.filter(function (a) {
                        return a.PriceAlertId !== alert.PriceAlertId;
                    });
                },
                    function () {
                        coreNotificationService.notifyError("Error",
                            "Failed to delete alert. Please check your connection settings and try again.");
                    });
            };

            vm.increasePrice = function () {
                tickSize = dep.ticksizeService.getTickSize(vm.alertPrice,
                    vm.product.Currency,
                    vm.product.TradeVenueLoc,
                    vm.product.ProductTickSizeValueIfBelongToGroup,
                    true,
                    vm.product.AssetClass);
                if (tickSize === 0.0001) {
                    vm.alertPrice = Math.round((vm.alertPrice + tickSize) * 10000) / 10000;
                } else if (tickSize === 0.001 || tickSize === 0.005) {
                    vm.alertPrice = Math.round((vm.alertPrice + tickSize) * 1000) / 1000;
                } else {
                    vm.alertPrice = Math.round((vm.alertPrice + tickSize) * 100) / 100;
                }
                vm.priceDifference = vm.alertPrice - vm.currentPrice;
                if (vm.currentPrice !== 0) {
                    vm.priceDifferencePct = (vm.alertPrice - vm.currentPrice) / vm.currentPrice;
                }

                verifyPriceRange();
            };

            vm.decreasePrice = function () {
                tickSize = dep.ticksizeService.getTickSize(vm.alertPrice,
                    vm.product.Currency,
                    vm.product.TradeVenueLoc,
                    vm.product.ProductTickSizeValueIfBelongToGroup,
                    false,
                    vm.product.AssetClass);
                if (tickSize === 0.0001) {
                    vm.alertPrice = Math.round((vm.alertPrice - tickSize) * 10000) / 10000;
                } else if (tickSize === 0.001 || tickSize === 0.005) {
                    vm.alertPrice = Math.round((vm.alertPrice - tickSize) * 1000) / 1000;
                } else {
                    vm.alertPrice = Math.round((vm.alertPrice - tickSize) * 100) / 100;
                }
                vm.priceDifference = vm.alertPrice - vm.currentPrice;
                if (vm.currentPrice !== 0) {
                    vm.priceDifferencePct = (vm.alertPrice - vm.currentPrice) / vm.currentPrice;
                }

                verifyPriceRange();
            };

            vm.searchProducts = function (keyword) {
                return sProductService.SearchProduct(keyword).then(function (res) {
                    return res.data;
                });
            };

            vm.getPrice = function (product) {
                vm.invalidPrice = false;
                sProductService.updateProductTickSizeValueIfBelongToGroup(product);
                vm.product = product;
                var requestObj = {
                    ProductId: product.ProductId,
                    Symbol: product.Symbol,
                    TradeVenueLoc: product.TradeVenueLoc,
                    AssetType: product.AssetType,
                    Currency: product.Currency
                };
                tradeDataService.GetLast(requestObj).then(function (res) {
                    vm.currentPrice = res.data.LastTradedPrice;
                    vm.alertPrice = vm.currentPrice;
                    tickSize = dep.ticksizeService.getTickSize(vm.alertPrice,
                        product.Currency,
                        product.TradeVenueLoc,
                        product.ProductTickSizeValueIfBelongToGroup,
                        product.AssetClass);
                    vm.priceDifference = vm.alertPrice - vm.currentPrice;
                },
                    function () {
                        vm.currentPrice = 0;
                        vm.alertPrice = 0;
                    });
            };

            function disableAdd() {
                if (!vm.alertPrice || vm.invalidPrice) {
                    return true;
                }
                return (vm.priceDifference === 0 && vm.currentPrice && vm.alertPrice) || vm.isAddingAlert;
            }

            function disableEdit() {
                if (!vm.alertPrice || vm.invalidPrice) {
                    return true;
                }
                return (vm.priceDifference === 0) || vm.isAddingAlert;
            }

            function getRoundUpPrice(price, tickSize) {
                var tickRatio = 1 / tickSize;
                price = Math.ceil(price * tickRatio) / tickRatio;
                return price;
            }

            function getRoundDownPrice(price, tickSize) {
                var tickRatio = 1 / tickSize;
                price = Math.floor(price * tickRatio) / tickRatio;
                return price;
            }

            function getMinPrice() {
                tickSize = dep.ticksizeService.getTickSize(vm.currentPrice, vm.product.Currency, vm.product.TradeVenueLoc,
                    vm.product.ProductTickSizeValueIfBelongToGroup, false);
                vm.minPrice = _.max([_.min([getRoundDownPrice(vm.currentPrice * 0.5, tickSize), getRoundDownPrice(vm.currentPrice - 10 * tickSize)]), tickSize]);

                return vm.minPrice;
            }

            function getMaxPrice() {
                tickSize = dep.ticksizeService.getTickSize(vm.currentPrice, vm.product.Currency, vm.product.TradeVenueLoc,
                    vm.product.ProductTickSizeValueIfBelongToGroup, true);
                vm.maxPrice = _.max([getRoundUpPrice(vm.currentPrice * 1.5, tickSize), getRoundUpPrice(vm.currentPrice + tickSize * 10, tickSize)]);

                return vm.maxPrice;
            }

            function verifyPriceRange() {
                if (vm.alertPrice > getMaxPrice() || vm.alertPrice < getMinPrice()) {
                    vm.invalidPrice = true;
                } else {
                    vm.invalidPrice = false;
                }
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    invalidPrice: false,
                    product: dep.product ? (!dep.isEdit ? dep.product.ProductModel : dep.product.Product) : null,
                    currentPrice: null,
                    alertPrice: null,
                    alerts: dep.alerts,
                    isEdit: dep.isEdit,
                    priceDifference: 0.00,
                    priceDifferencePct: 0.00,
                    isAddingAlert: false,
                    selectedProduct: null,
                    disableAdd: disableAdd,
                    disableEdit: disableEdit
                });

                if (vm.product) {
                    vm.getPrice(vm.product);
                }
            });
        });