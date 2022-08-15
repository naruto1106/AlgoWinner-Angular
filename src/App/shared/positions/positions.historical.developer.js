agmNgModuleWrapper('agms.positions')
    .defineController('s.positions.HistoricalDeveloperController', ['sProductService', 'sTradingItemService', "sTradingClientPortfolioService", 'coreConfigService',
            'orderByFilter'],
        function (vm, dep, tool) {
            // --- DEPENDENCY RESOLVER
            var sTradingItemService = dep.sTradingItemService,
                sProductService = dep.sProductService,
                sTradingClientPortfolioService = dep.sTradingClientPortfolioService,
                coreConfigService = dep.coreConfigService,
                orderByFilter = dep.orderByFilter;

            // --- LOCAL VAR DECLARATION
            var filteredItems = [];
            var previousSearchPromise = null;
            var searchMap = new Map();

            // --- LOCAL SERVICE FUNC 
            function filterByProduct(position) {
                var keyword = vm.models.searchStockText;
                if (!keyword) {
                    return true;
                }

                keyword = keyword.toLowerCase();
                return position.Product.ProductName.toLowerCase().indexOf(keyword) > -1 ||
                    position.Product.Symbol.toLowerCase().indexOf(keyword) > -1;
            }

            function handlePortfolioUpdated() {
                //vm.positions = sTradingItemService.activePositions;

                //filteredItems = orderByFilter(vm.positions.filter(filterByProduct), '-LastExitTime');
                //sTradingItemService.populatePositionDirective();

                //sortPositions(vm.models.overviewSorting);

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

            function findMatchingOrder(orders, order) {
                return orders.filter(function (o) {
                    return o.OrderId === order.OrderId;
                })[0];
            }

            // --- SCOPE FUNC
            function showPagination() {
                return vm.models.numPages > 1;
            }

            function showExposurePagination() {
                return vm.exposureModels.numPages > 1;
            }

            function setDefaultSortReverse() {
                vm.sortReverse = [{ "Product": false }, { "Allocated Exposure": false }, { "Margin Used": false }, { "Unrealized P/L (%)": false }, { "Position": false }, { "Holding Duration": false }];
            }

            function sortPositions(sortingType) {
                vm.models.overviewSorting = sortingType;
                if (filteredItems.length > 0) {
                    var activePositions = filteredItems;
                    switch (sortingType) {
                        case "Holding Duration":
                            if (vm.sortReverse[sortingType]) {
                                filteredItems = _.sortBy(activePositions, function (n) {
                                    return n.EntryTime;
                                });
                            } else {
                                filteredItems = _.sortBy(activePositions, function (n) {
                                    return n.EntryTime;
                                }).reverse();
                            }
                            break;
                        case "Product":
                            if (vm.sortReverse[sortingType]) {
                                filteredItems = _.sortBy(activePositions, function (n) {
                                    return n.Product.ProductName;
                                }).reverse();
                            } else {
                                filteredItems = _.sortBy(activePositions, function (n) {
                                    return n.Product.ProductName;
                                });
                            }
                            break;
                        case "Allocated Exposure":
                            if (vm.sortReverse[sortingType]) {
                                filteredItems = _.sortBy(activePositions, function (n) {
                                    return n.Exposure;
                                });
                            } else {
                                filteredItems = _.sortBy(activePositions, function (n) {
                                    return n.Exposure;
                                }).reverse();
                            }
                            break;
                        case "Unrealized P/L (%)":
                            if (vm.sortReverse[sortingType]) {
                                filteredItems = _.sortBy(activePositions, function (n) {
                                    return n.UnrealizedPL_Percent;
                                });
                            } else {
                                filteredItems = _.sortBy(activePositions, function (n) {
                                    return n.UnrealizedPL_Percent;
                                }).reverse();
                            }
                            break;
                        case "Position":
                            if (vm.sortReverse[sortingType]) {
                                filteredItems = _.sortBy(activePositions, function (n) {
                                    return n.PositionType;
                                }).reverse();
                            } else {
                                filteredItems = _.sortBy(activePositions, function (n) {
                                    return n.PositionType;
                                });
                            }
                            break;
                        case "Margin Used":
                            if (vm.sortReverse[sortingType]) {
                                filteredItems = _.sortBy(activePositions, function (n) {
                                    return n.MarginValue;
                                });
                            } else {
                                filteredItems = _.sortBy(activePositions, function (n) {
                                    return n.MarginValue;
                                }).reverse();
                            }
                            break;
                    }
                }
            }

            function getPagedItems() {
                return _.take(_.drop(filteredItems, (vm.models.currentPage - 1) * vm.itemsPerPage), vm.itemsPerPage);
            }

            function getExposurePagedItems() {
                return _.take(_.drop(filteredItems, (vm.exposureModels.currentPage - 1) * vm.itemsPerPage), vm.itemsPerPage);
            }

            function getTotalItems() {
                return filteredItems.length;
            }

            function hasPositions() {
                return getTotalItems() > 0;
            }

            function hasPositionsWithFilter(positions, filter) {
                return _.any(positions, filter);
            }

            // --- EVENT HANDLERS
            function processBracketOrder(data) {
                if (data.ParentPortfolioId != null) {
                    filteredItems.forEach(function (i) {
                        if (i.PortfolioId === data.ParentPortfolioId) {
                            //add bracket order for this position
                            if (i.BracketOrders == null) {
                                i.BracketOrders = [];
                                i.BracketOrders.push(data);
                            } else {
                                var matchingOrder = findMatchingOrder(i.BracketOrders, data);
                                if (matchingOrder == null) {
                                    i.BracketOrders.push(data);
                                } else {
                                    angular.extend(matchingOrder, data);
                                }
                            }
                        }
                    });
                }

                //handle terminal status
                var terminalStatuses = ["Cancelled", "Rejected by Broker", "Expired", "Rejected by OMS", "Rejected by Exchange"];

                if (terminalStatuses.indexOf(data.OrderStatus) !== -1) {
                    filteredItems.forEach(function (i) {
                        if (i.BracketOrders !== null && i.BracketOrders.length > 0) {
                            var existingOrder = findMatchingOrder(i.BracketOrders, data);

                            //remove bracket order for this position
                            if (existingOrder != null) {
                                var indexOf = i.BracketOrders.indexOf(existingOrder);
                                i.BracketOrders.splice(indexOf, 1);
                            }
                        }
                    });
                }
            }

            function handleStrategySelected() {
                vm.models.currentPage = 1;
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

            tool.initialize(function () {
                tool.setVmProperties({
                    category: "Trade",
                    event: "Orders",
                    noPositionMessage: "You have no position to display",
                    noPositionMessageForGroupStrategy: "No position to display",
                    levelOfDetail: 'Premium',
                    copyPosition: null,
                    positions: sTradingItemService.positions,
                    currentStrategy: sTradingItemService.currentStrategy,
                    holdingSummary: sTradingItemService.holdingSummary,
                    hasPositionsWithFilter: hasPositionsWithFilter,
                    models: {
                        currentPage: 1,
                        numPages: 0,
                        searchStockText: "",
                        overviewSorting: "Holding Duration"
                    },
                    sortReverse: [{ "Product": false }, { "Allocated Exposure": false }, { "Margin Used": false }, { "Unrealized P/L (%)": false }, { "Position": false }, { "Holding Duration": false }],
                    exposureModels: {
                        currentPage: 1,
                        numPages: 0
                    },

                    itemsPerPage: 10,
                    showPagination: showPagination,
                    showExposurePagination: showExposurePagination,
                    getExposurePagedItems: getExposurePagedItems,
                    sortPositions: sortPositions,
                    setDefaultSortReverse: setDefaultSortReverse,
                    goToProduct: sProductService.goToProduct,
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

                tool.on("singleStrategySelected", handleStrategySelected);

                tool.signalRNotification('DeveloperOrderCreated', processBracketOrder);
                tool.signalRNotification('DeveloperOrderUpdated', processBracketOrder);
                tool.signalRNotification('DeveloperOrderMarkedForCancellation', processBracketOrder);

                tool.watch('vm.models.searchStockText', function () {
                    vm.models.currentPage = 1;
                    vm.handlePortfolioUpdated();
                });

                tool.watch('vm.models.overviewSorting', function () {
                    sortPositions(vm.models.overviewSorting);
                });

                tool.eventToObservable('portfolioCleared')
                    .subscribe(function (evt) {
                        tool.evalAsync(function () {
                            filteredItems = [];
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
        }
    )
    .defineDirectiveForE('agms-positions-historical-developer', [],
        function() {
            return {
                restrict: 'E',
                controller: "s.positions.HistoricalDeveloperController",
                templateUrl: '/App/shared/positions/positions.historical.html'
            };
        }, {
            selectedStrategy: '=',
            isByAccount: '=',
            currency: "=",
            isLoadingPositions: "=",
            viewMode: "="
        });