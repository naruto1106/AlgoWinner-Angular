agmNgModuleWrapper('agms.positions')
    .defineController("s.positions.HistoricalBaseController",
        ['sProductService', 'sTradingItemService', "sTradingClientPortfolioService", 'coreConfigService'],
        function (vm, dep, tool) {
            var sTradingItemService = dep.sTradingItemService,
                sProductService = dep.sProductService,
                sTradingClientPortfolioService = dep.sTradingClientPortfolioService,
                coreConfigService = dep.coreConfigService;

            var previousSearchPromise = null;
            var searchMap = new Map();
            var filteredItems = [];

            function getPagedItems() {
                return _.take(_.drop(filteredItems, (vm.models.currentPage - 1) * vm.itemsPerPage), vm.itemsPerPage);
            }

            function getTotalItems() {
                return filteredItems.length;
            }

            function isHistorical(position) {
                if (position.QuantityLiquidated != null) {
                    return position.QuantityLiquidated !== 0;
                } else {
                    var lastOrder = position.Orders[position.Orders.length - 1];
                    return (lastOrder && lastOrder.Intention === 'Full Exit');
                }
            };

            function isPageLoaded() {
                return !vm.getPagedItems().some(function (x) { return typeof (x) === 'string' && x.includes('placeholder'); });
            }

            function handlePortfolioUpdated() {
                var productId = vm.searchProduct ? vm.searchProduct.ProductId : null;
                if (productId) {
                    var values = searchMap.get(productId);
                    if (values) {
                        filteredItems = values;
                    } else {
                        vm.isLoadingPositions = true;
                        values = new Array();
                        sTradingClientPortfolioService.getDeveloperHistoricalPortfolios(
                            vm.selectedStrategy.CapitalInfo.StrategyId,
                            productId,
                            values,
                            function (evt) {
                                vm.isLoadingPositions = false;
                                filteredItems = values;
                                searchMap.set(productId, filteredItems);
                            });
                    }
                } else {
                    vm.positions = sTradingItemService.positions;
                    filteredItems = vm.positions;
                }
            }

            function onProductSelected(product) {
                vm.searchProduct = product;
                handlePortfolioUpdated();
            }

            function searchProducts(keyword) {
                if (previousSearchPromise) {
                    previousSearchPromise.cancel();
                }

                if (!vm.selectedStrategy) {
                    return tool.when(null);
                }
                previousSearchPromise = sProductService.SearchProductByMarket(keyword, vm.selectedStrategy.TradeVenue, 10, true);
                return previousSearchPromise.then(function (res) {
                    return res.data;
                });
            }

            function getTotalItems() {
                return filteredItems.length;
            }

            function hasPositions() {
                return getTotalItems() > 0;
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    searchProduct: null,
                    onProductSelected: onProductSelected,
                    searchProducts: searchProducts,
                    isPageLoaded: isPageLoaded,
                    hasPositions: hasPositions,
                    positionFilter: isHistorical,
                    customPortfolioHandler: handlePortfolioUpdated,
                    getTotalItems: getTotalItems,
                    getPagedItems: getPagedItems,
                    coreConfigService: coreConfigService,
                    handlePortfolioUpdated: handlePortfolioUpdated,
                    positionChartColors: sTradingItemService.historicalPositionChartColors,
                    positionChartValues: sTradingItemService.quantityLiquidatedChartValues,
                    groupedPositions: sTradingItemService.groupedPositions
                });

                tool.eventToObservable('portfolioCleared')
                    .subscribe(function (evt) {
                        tool.evalAsync(function () {
                            filteredItems = [];
                            searchMap = new Map();
                            vm.searchProduct = null;
                            vm.positions = [];
                        });
                    });

                tool.eventToObservable('portfolioUpdated')
                    .bufferWithTime(250)
                    .subscribe(function (evts) {
                        if (evts && evts.length > 0) {
                            tool.evalAsync(vm.handlePortfolioUpdated());
                        }
                    });

                tool.watch('vm.models.currentPage', function () {
                    if (!isPageLoaded()) {
                        sTradingClientPortfolioService.loadPositionsPage(
                            vm.selectedStrategy.CapitalInfo.StrategyId,
                            vm.models.currentPage - 1,
                            vm.itemsPerPage,
                            vm.searchProduct ? vm.searchProduct.ProductId : null,
                            function (loaded) {
                                var diff = (vm.models.currentPage - 1) * vm.itemsPerPage;
                                for (var i = 0; i < loaded.length; ++i) {
                                    filteredItems[diff + i] = loaded[i]
                                }
                                tool.broadcast('portfolioUpdated');
                            }
                        )
                    }
                });

                vm.handlePortfolioUpdated();
            });
        });