agmNgModuleWrapper('agms.menu')
    .defineService('sMenuRightClickService', ['sTradingQuickTradeService', 'commonLocationHistoryService', "sHeaderService", "orderPadInitService", 'sLiveConnectService'],
    function (serviceObj, dep, tool) {

        var coreNotificationService = dep.coreNotificationService,
            sTradingQuickTradeService = dep.sTradingQuickTradeService,
            commonLocationHistoryService = dep.commonLocationHistoryService,
            sHeaderService = dep.sHeaderService,
            orderPadInitService = dep.orderPadInitService,
            sLiveConnectService = dep.sLiveConnectService;

        function addToPriceAlert(item) {
            if (!item.PriceAlerts) {
                item.PriceAlerts = [];
            }
            tool.openModalByDefinition('s.watchlist.PriceAlertPopupController', {
                product: item,
                alerts: item.PriceAlerts,
                isEdit: false
            });
        }

        function addToWatchlist(productContainer) {
            tool.openModalByDefinition('s.watchlist.AddProductPopupController', {
                product: productContainer.ProductModel
            }).result.then(function () {
            });
        }

        function gotoChart(product, mode, modeParam) {
            var tradeVenue = product.TradeVenueLoc;
            var symbol = product.Symbol;
            var link = '/Home/Inside#/charts/' + tradeVenue + '/' + symbol;

            if (sHeaderService.chartMenuType === "Partner") {
                link = '/Partners/Inside#/charts/' + tradeVenue + '/' + symbol;
            }
            
            if (mode) {
                link += "/" + mode;
                if (modeParam) {
                    link += "/" + modeParam;
                }
            }
            commonLocationHistoryService.goToNewTab(link);
        }

        var eodTradeVenues = ['HK', 'MY', 'CN'];
        function isEodTradeVenue(tradeVenue) {
            return _.includes(eodTradeVenues, tradeVenue);
        }

        function getRightClickMenu(hasWatchlist, tgpsMode) {
            var arr = [
                {
                    label: "Add Price Alert",
                    action: function (productContainer) {
                        if (isEodTradeVenue(productContainer.ProductModel.TradeVenueLoc)) {
                            coreNotificationService.notifyError("Not Supported", "Price alert is not supported for this product");
                        } else {
                            addToPriceAlert(productContainer);
                        }
                    }
                },
                {
                    label: "View Stock Info",
                    action: function (productContainer) {
                        if (isEodTradeVenue(productContainer.ProductModel.TradeVenueLoc)) {
                            coreNotificationService.notifyError("Not Supported", "Stock Info is not supported for this product");
                        } else {
                            commonLocationHistoryService.goToNewTab('/Home/Inside#/product-detail/' + productContainer.ProductModel.TradeVenueLoc
                                + '/' + productContainer.ProductModel.Symbol + "#chart-section");
                        }
                    }
                },
                {
                    label: "View Chart",
                    action: function (productContainer) {
                        gotoChart(productContainer.ProductModel, tgpsMode);
                    }
                },
                //{
                //    label: "Fundamental Analysis",
                //    action: function (productContainer) {
                //        if (isEodTradeVenue(productContainer.ProductModel.TradeVenueLoc)) {
                //            coreNotificationService.notifyError("Not Supported", "Fundamental analysis is not supported for this product");
                //        } else {
                //            commonLocationHistoryService.goToNewTab('/Home/Inside#/product-detail/' + productContainer.ProductModel.TradeVenueLoc
                //                + '/' + productContainer.ProductModel.Symbol + "#fundamental-section");
                //        }
                //    }
                //},
                {
                    label: "Buy",
                    action: function (productContainer) {
                        if (isEodTradeVenue(productContainer.ProductModel.TradeVenueLoc)) {
                            coreNotificationService.notifyError("Not Supported", "Trading is not supported for this product");
                        } else {
                            sTradingQuickTradeService.reinit().then(function () {
                                return sTradingQuickTradeService.placeOrder('Buy', productContainer.ProductModel);
                            });
                        }
                    }
                },
                {
                    label: "Sell",
                    action: function (productContainer) {
                        if (isEodTradeVenue(productContainer.ProductModel.TradeVenueLoc)) {
                            coreNotificationService.notifyError("Not Supported", "Trading is not supported for this product");
                        } else {
                            sTradingQuickTradeService.reinit().then(function () {
                                return sTradingQuickTradeService.placeOrder('Sell', productContainer.ProductModel);
                            });
                        }
                    }
                },
                // {
                //     label: "Live Buy",
                //     action: function (productContainer) {
                //         if (isEodTradeVenue(productContainer.ProductModel.TradeVenueLoc)) {
                //             coreNotificationService.notifyError("Not Supported", "Trading is not supported for this product");
                //         } else {
                //             sLiveConnectService.getTigerAccountCode().then(function (res) {
                //                 res.on('value', function (obj) {
                //                     var snap = obj.val();
                //                     var firstKey = Object.keys(snap)[0];

                //                     tool.openModalByDefinition('s.orders.PadLivePopupController', {
                //                         accountId: snap[firstKey],
                //                         beforeOpenCallback: function () {
                //                             orderPadInitService.setLiveOrder('Buy', productContainer.ProductModel);
                //                         }
                //                     });

                //                     res.off('value'); // Unsubscrible the event if possible
                //                     console.log('Unsubscribed from Firebase');
                //                 });
                //             });
                //         }
                //     }
                // },
                // {
                //     label: "Live Sell",
                //     action: function (productContainer) {
                //         if (isEodTradeVenue(productContainer.ProductModel.TradeVenueLoc)) {
                //             coreNotificationService.notifyError("Not Supported", "Trading is not supported for this product");
                //         } else {
                //             sLiveConnectService.getTigerAccountCode().then(function (res) {
                //                 res.on('value', function (obj) {
                //                     var snap = obj.val();
                //                     var firstKey = Object.keys(snap)[0];

                //                     tool.openModalByDefinition('s.orders.PadLivePopupController', {
                //                         accountId: snap[firstKey],
                //                         beforeOpenCallback: function () {
                //                             orderPadInitService.setLiveOrder('Sell', productContainer.ProductModel);
                //                         }
                //                     });

                //                     res.off('value'); // Unsubscrible the event if possible
                //                     console.log('Unsubscribed from Firebase');
                //                 });
                //             });
                //         }
                //     }
                // },
            ];

            if (hasWatchlist) {
                var watchlistMenu = {
                    label: "Add To Watchlist",
                    action: addToWatchlist
                };
                arr.splice(1, 0, watchlistMenu);
            }

            return arr;
        };

        tool.setServiceObjectProperties({
            addToPriceAlert: addToPriceAlert,
            addToWatchlist: addToWatchlist,
            getRightClickMenu: getRightClickMenu,
            gotoChart: gotoChart,
            menuListProvider: getRightClickMenu(true),
            menuListProviderForTGPSPosition: getRightClickMenu(true, "Position"),
            menuListProviderForTGPSSwing: getRightClickMenu(true, "Swing"),
            watchlistMenuListProvider: getRightClickMenu(false),
        });
    });