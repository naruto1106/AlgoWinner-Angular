agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.ComplexProductSelectorController",
    ['sWatchlistService', 'pChartStrategyOrderService',
            'sWatchlistUpdateManagerService', 'pChartFilterDescriptionService',
            'coreSignalRNotificationService', 'sChartService'],
        function (vm, dep, tool) {
            var sWatchlistService = dep.sWatchlistService,
                pChartStrategyOrderService = dep.pChartStrategyOrderService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                $filter = dep.$filter,
                coreDataStorageService = dep.coreDataStorageService,
                sWatchlistUpdateManagerService = dep.sWatchlistUpdateManagerService,
                coreSignalRNotificationService = dep.coreSignalRNotificationService,
                sChartService = dep.sChartService;

            var filterDescription = pChartFilterDescriptionService;
            tool.setVmProperties({
                loadProductsFromWatchlist: loadProductsFromWatchlist,
                loadProductsFromMarket: loadProductsFromMarket,
                loadProductsInStrategy: loadProductsInStrategy,

                filterDescription: filterDescription,
                isPrimaryProduct: isPrimaryProduct,
                setProduct: setProduct,
                hasAlphabet: false,
                pChartStrategyOrderService: pChartStrategyOrderService,
                selectedAlphabet: null,
                setAlphabet: setAlphabet,
                searchedKeyword: "",
                getDisplayedProduct: getDisplayedProduct,
                currentMarketProducts: [],
                loadRecentTempList: loadRecentTempList,
                markets: [
                    {
                        label: "US Market",
                        venue: 1,
                        asset: 1,
                        hasAlphabet: true,
                        TradeVenueLoc: 'US',
                        startingAlphabet: "0-9"
                    },
                    {
                        label: "Global Indices",
                        venue: 0,
                        asset: 5,
                        hasAlphabet: false,
                    }
                ],
                alphabets: [
                    '0-9',
                    'A',
                    'B',
                    'C',
                    'D',
                    'E',
                    'F',
                    'G',
                    'H',
                    'I',
                    'J',
                    'K',
                    'L',
                    'M',
                    'N',
                    'O',
                    'P',
                    'Q',
                    'R',
                    'S',
                    'T',
                    'U',
                    'V',
                    'W',
                    'X',
                    'Y',
                    'Z'
                ]
            });

            function loadRecentTempList() {
                var list = coreDataStorageService.getListInSession('chart-recently_added_stocks');
                vm.displayedProducts = list ? distinct(list) : [];
                vm.hasAlphabet = false;
                vm.displayedLabel = "Recent 10 Stocks";
                vm.isSelectingWatchlist = false;
            }

            function isPrimaryProduct(product) {
                if (filterDescription.primaryProduct) {
                    return product.ProductId === filterDescription.primaryProduct.ProductId;
                }
                return false;
            }

            function setAlphabet(alphabet) {
                vm.selectedAlphabet = alphabet;
                vm.displayedProducts = [];
                vm.searchedKeyword = null;
                var pattern = new RegExp('[' + vm.selectedAlphabet + ']', "i");
                vm.currentMarketProducts.forEach(function (i) {
                    var test = pattern.test(i.ProductName.toUpperCase()[0] + "");
                    if (test) {
                        vm.displayedProducts.push(i);
                    }
                });
            }

            function getDisplayedProduct() {
                if (!vm.searchedKeyword) {
                    return vm.displayedProducts;
                }
                var pattern = new RegExp(vm.searchedKeyword, "i");
                return vm.displayedProducts.filter(function (i) {
                    return pattern.test(i.ProductName);
                });
            }

            var promiseBuffer = {}

            function getProductInMarketPromise(market) {
                var key = market.asset + "_" + market.venue;
                if (!promiseBuffer[key]) {
                    promiseBuffer[key] = sChartService.GetProductsInMarket(market.asset, market.venue);
                }
                return promiseBuffer[key];
            }

            function loadProductsFromMarket(market) {
                vm.isSelectingWatchlist = false;
                vm.displayedProducts = [];
                vm.hasAlphabet = market.hasAlphabet;
                vm.displayedLabel = market.label;
                vm.searchedKeyword = null;

                getProductInMarketPromise(market).then(function (res) {
                    vm.currentMarketProducts = res.data;

                    if (vm.hasAlphabet) {
                        setAlphabet(market.startingAlphabet);
                    } else {
                        vm.displayedProducts = vm.currentMarketProducts;
                    }
                });
            }

            var currentWatchlist = null;

            function loadProductsFromWatchlist(watchlist) {
                currentWatchlist = watchlist;
                vm.displayedProducts = [];
                vm.hasAlphabet = false;
                vm.displayedLabel = watchlist.WatchlistName;
                vm.searchedKeyword = null;
                watchlist.WatchlistProducts.forEach(function (x) {
                    vm.displayedProducts.push(x);
                });
                vm.isSelectingWatchlist = true;
            }

            function loadProductsInStrategy(strategy) {
                vm.isSelectingWatchlist = false;
                vm.displayedProducts = [];
                vm.hasAlphabet = false;
                vm.displayedLabel = $filter('strategyName')(strategy.DisplayInfo);
                vm.searchedKeyword = null;
                sChartService.GetProductsInStrategy(strategy.DisplayInfo.BasicInfo.StrategyId).then(function (res) {
                    vm.currentMarketProducts = res.data;
                    res.data.forEach(function (i) {
                        if (!i.ProductName) {
                            i.ProductName = i.Name;
                        }
                    });
                    vm.displayedProducts = vm.currentMarketProducts;
                });
            }

            function setProduct(product) {
                vm.onProductSet({
                    product: product
                });
            }

            function distinct(list) {
                var dict = [];
                var newList = [];
                list.forEach(function (i) {
                    if (!dict[i.ProductId]) {
                        newList.push(i);
                        dict[i.ProductId] = true;
                    }
                });
                return newList;
            }

            function sortWatchlistProducts(watchlist, type) {
                switch (type) {
                    case "time-asc":
                        watchlist.WatchlistProducts.sort(function (a, b) {
                            if (a.CreatedTime && b.CreatedTime) {
                                return a.CreatedTime.localeCompare(b.CreatedTime);
                            }
                            return 0;
                        });
                        break;
                    case "A-Z":
                        watchlist.WatchlistProducts.sort(function (a, b) {
                            if (a.ProductModel.ProductName && b.ProductModel.ProductName) {
                                return a.ProductModel.ProductName.localeCompare(b.ProductModel.ProductName);
                            }
                            return 0;
                        });
                        break;
                    case "Z-A":
                        watchlist.WatchlistProducts.sort(function (a, b) {
                            if (a.ProductModel.ProductName && b.ProductModel.ProductName) {
                                return b.ProductModel.ProductName.localeCompare(a.ProductModel.ProductName);
                            }
                            return 0;
                        });
                        break;
                    default:
                        watchlist.WatchlistProducts.sort(function (a, b) {
                            if (a.CreatedTime && b.CreatedTime) {
                                return a.CreatedTime.localeCompare(b.CreatedTime);
                            }
                            return 0;
                        });
                        break;
                }
            }

            function sortWatchlist(type) {
                sortWatchlistProducts(currentWatchlist, type);
                loadProductsFromWatchlist(currentWatchlist);
            }

            function editNote(item) {
                tool.openModalByDefinition('s.watchlist.EditNotePopupController', {
                    watchlistProduct: item
                });
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    watchlistSelectedSotringType: "time-asc",
                    isSelectingWatchlist: false,
                    sortWatchlist: sortWatchlist,
                    editNote: editNote
                });

                sWatchlistService.getWatchlistsForUser().then(function (res) {
                    vm.watchlists = res.data;

                    //sort products ascending
                    vm.watchlists.forEach(function (list) {
                        sortWatchlistProducts(list, "time-asc");
                    });

                    sWatchlistUpdateManagerService.observeWatchlist(vm.watchlists, false, function (item, type) {
                        if (type === "deleted") {
                            vm.selectedWatchlist = item;
                            vm.currentWatchlist = item;
                        } else if (currentWatchlist) {
                            if (type === "product-inserted") {
                                sortWatchlistProducts(currentWatchlist, "time-asc");
                            }

                            loadProductsFromWatchlist(currentWatchlist);
                        }

                        if (type === "new") {
                            coreSignalRNotificationService.invoke('ListenToWatchlist', item.WatchlistId).then(
                                function () {
                                    tool.log("Listening to Watchlist " + item.WatchlistId);
                                }, function () {
                                    tool.logError("Error invoking listen to Watchlist");
                                });
                        }
                    });
                });
                
                getProductInMarketPromise(vm.markets[0]);
                getProductInMarketPromise(vm.markets[2]);
                loadProductsFromMarket(vm.markets[0]);

                tool.on('onPrimaryProductChanged', function (e, product) {
                    var list = coreDataStorageService.getListInSession('chart-recently_added_stocks');
                    list = list || [];
                    list.unshift(product);
                    var newList = distinct(list);
                    coreDataStorageService.setListInSession('chart-recently_added_stocks', newList.slice(0, 10));
                });
            });
        })
    .defineDirectiveForE('agmp-chart-complex-product-selector-optionpi', [],
        function () {
            return {
                controller: "p.chart.ComplexProductSelectorController",
                templateUrl: '/App/pages/chart/chart.complexProductSelector.html'
            };
        }, {
            onProductSet: '&'
        });