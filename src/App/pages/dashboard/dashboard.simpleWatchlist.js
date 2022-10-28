agmNgModuleWrapper('agmp.dashboard')
    .defineController('p.dashboard.SimpleWatchlistController', ['pDashboardPageService', "coreUtil", 'sMenuRightClickService', 'sWatchlistUpdateManagerService',
        'coreSignalRNotificationService', 'sProductService', 'sMarketEntitlementService'],
        function (vm, dep, tool) {
            var pDashboardPageService = dep.pDashboardPageService,
                sMenuRightClickService = dep.sMenuRightClickService,
                sWatchlistUpdateManagerService = dep.sWatchlistUpdateManagerService,
                coreSignalRNotificationService = dep.coreSignalRNotificationService,
                sProductService = dep.sProductService,
                sMarketEntitlementService = dep.sMarketEntitlementService;

            var previousProductSearchPromise = 0;

            // AHA!!
            var sharedState = dep.$scope.sharedState = sWatchlistUpdateManagerService.watchlistSharedState;

            function addProductToWatchlist(product, currentWatchlist) {
                return sWatchlistUpdateManagerService.addProductToWatchlist(product, currentWatchlist);
            }

            function onProductSelected() {
                addProductToWatchlist(vm.searchedProductOnWatchlist, sharedState.selectedWatchlist).then(function () {
                    vm.AddedProductName = vm.searchedProductOnWatchlist.ProductName;
                    vm.addingProductSucceed = true;
                    tool.timeout(function () {
                        vm.addingProductSucceed = false;
                    }, 2000);
                }, function (res) {
                    var message = "An error occurred, please try again later.";
                    if (res && res.data && res.data.Message) {
                        message = res.data.Message;
                    }
                    dep.coreNotificationService.notifyError("Error", message);
                });
            }

            var externalVmForWatchlist = {
                addToPriceAlert: addToPriceAlert,
                editNote: editNote,
                deleteProductOnWatchlist: deleteProductOnWatchlist,
                gotoChart: function (item) {
                    return sMenuRightClickService.gotoChart(item.ProductModel);
                }
            }

            function editNote(item) {
                tool.openModalByDefinition('s.watchlist.EditNotePopupController', {
                    watchlistProduct: item
                });
            }

            function addToPriceAlert(item) {
                return sMenuRightClickService.addToPriceAlert(item);
            }

            function deleteProductOnWatch(watchlist, product) {
                var request = {
                    WatchlistId: watchlist.WatchlistId,
                    ProductId: product.ProductModel.ProductId
                };
                return tool.openModalByDefinition('s.watchlist.DeleteProductPopupController', {
                    request: request,
                    beforeOpenCallback: null
                });
            }

            function deleteProductOnWatchlist(item) {
                return deleteProductOnWatch(sharedState.selectedWatchlist, item);
            }

            var lastWatchlist = [];
            function onWatchlistChanged() {
                sWatchlistUpdateManagerService.updateMarketDataForPanel("WATCHLIST", lastWatchlist ? lastWatchlist.WatchlistProducts : [], sharedState.selectedWatchlist ? sharedState.selectedWatchlist.WatchlistProducts : []);
                lastWatchlist = sharedState.selectedWatchlist;
            }

            function addWatchlist() {
                var dialog = tool.openModalByDefinition('s.watchlist.AddNewController', {
                    beforeOpenCallback: null
                });
                dialog.result.then(function (watchlistId) {
                    tool.log("Successfully added watchlist");
                    coreSignalRNotificationService.invoke('ListenToWatchlist', watchlistId).then(
                        function () {
                            tool.log("Listening to Watchlist " + watchlistId);
                        }, function () {
                            tool.logError("Error invoking listen to watchlist");
                        });
                });
            }

            function searchProducts(keyword) {
                if (previousProductSearchPromise) {
                    previousProductSearchPromise.cancel();
                }
                previousProductSearchPromise = sProductService.SearchProductForWatchlist(keyword);
                return previousProductSearchPromise.then(function (res) {
                    //sMarketEntitlementService.checkRealTimeForProducts(res.data);
                    return res.data;
                });
            }

            var eodTradeVenues = ['HK', 'MY', 'CN'];
            function isEodTradeVenue(tradeVenue) {
                return _.includes(eodTradeVenues, tradeVenue);
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    addingProductSucceed: false,
                    externalVmForWatchlist: externalVmForWatchlist,
                    searchedProductOnWatchlist: null,
                    searchProducts: searchProducts,
                    onProductSelected: onProductSelected,
                    addWatchlist: addWatchlist,
                    onWatchlistChanged: onWatchlistChanged,
                    sharedState: sharedState,
                    watchlistProductListOptions: {
                        preprocessListFunc: pDashboardPageService.sortProductByCreatedTime,
                        visibility: {
                            hasNominalPriceChanges: false,
                            squeezedHeight: true,
                            showHeader: true
                        },
                        columns: [
                            {
                                templateId: 'simpleWatchlist/product-info',
                                classNames: ['product-info'],
                                title: "Product",
                                sortingFunc: function (a, b) {
                                    if (a.ProductModel && b.ProductModel) {
                                        return dep.coreUtil.sortName(a.ProductModel.ProductName, b.ProductModel.ProductName);
                                    }
                                    return 0;
                                }
                            },
                            {
                                templateId: 'simpleScreener/product-symbol',
                                classNames: ["symbol"],
                                title: "Symbol",
                                sortingFunc: function (a, b) {
                                    if (a.ProductModel && b.ProductModel) {
                                        return dep.coreUtil.sortName(a.ProductModel.Symbol, b.ProductModel.Symbol);
                                    }
                                    return 0;
                                }
                            },
                            {
                                templateId: 'default-product-list/compact-price-changes',
                                classNames: ['compact-price-changes'],
                                title: "Last",
                                sortingFunc: function (a, b) {
                                    if (a.MarketData.LastTradedPrice && b.MarketData.LastTradedPrice) {
                                        var lastTradedPriceA = a.MarketData.LastTradedPrice;
                                        var lastTradedPriceB = b.MarketData.LastTradedPrice;
                                        return lastTradedPriceA - lastTradedPriceB;
                                    }
                                    return 0;
                                }
                            },
                            {
                                templateId: 'default-product-list/trade-volume',
                                classNames: ['trade-volume', 'volume'],
                                title: "Volume",
                                sortingFunc: function (a, b) {
                                    if (a.MarketData.CumulativeVolume && b.MarketData.CumulativeVolume) {
                                        var volumeA = a.MarketData.CumulativeVolume;
                                        var volumeB = b.MarketData.CumulativeVolume;
                                        return volumeA - volumeB;
                                    }
                                    return 0;
                                }
                            },
                            {
                                templateId: 'watchlist/simple-watchlist',
                                classNames: ['simple-watchlist', "buttons"]
                            }
                        ],
                        forceSorting: true,
                        menuList: sMenuRightClickService.watchlistMenuListProvider,
                        externalVm: externalVmForWatchlist
                    },
                    isEodTradeVenue: isEodTradeVenue
                });

                vm.isLoading = true;
                sWatchlistUpdateManagerService.getWatchlists(true).then(function (watchlists) {
                    sharedState.watchlists = watchlists;
                    sharedState.selectedWatchlist = watchlists[0];
                    onWatchlistChanged();
                }).finally(function () {
                    vm.isLoading = false;
                });

                sWatchlistUpdateManagerService.setMarketDataUpdateHandlerOnListOfWatchlistProducts(function () {
                    return sharedState.selectedWatchlist ? sharedState.selectedWatchlist.WatchlistProducts : [];
                }, tool);
                tool.onRoot('dashboard.watchlistChanged', function (event, args) {
                    vm.searchedProductOnWatchlist = null;

                    if (args.type === 'deleted') {
                        sharedState.selectedWatchlist = sharedState.watchlists[0];
                    }
                    if (args.type === 'new') {
                        sharedState.selectedWatchlist = args.watchlist;
                    }
                });
            });
        })
    .defineDirectiveForE('agmp-dashboard-simple-watchlist', [],
        function () {
            return {
                controller: "p.dashboard.SimpleWatchlistController",
                templateUrl: '/App/pages/dashboard/dashboard.simpleWatchlist.html'
            };
        },
        {

        });