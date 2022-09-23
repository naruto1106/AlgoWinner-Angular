agmNgModuleWrapper('agms.positions')
    .defineController('s.positions.HistoricalDeveloperController', ['sProductService', 'sTradingItemService', "sTradingClientPortfolioService", 
            'orderByFilter'],
        function (vm, dep, tool) {
            // --- DEPENDENCY RESOLVER
            var sTradingItemService = dep.sTradingItemService,
                sProductService = dep.sProductService,
                sTradingClientPortfolioService = dep.sTradingClientPortfolioService,
                orderByFilter = dep.orderByFilter;

            // --- LOCAL VAR DECLARATION
            var filteredItems = [];
            var previousSearchPromise = null;
            var searchMap = new Map();

            // --- LOCAL SERVICE FUNC 
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

            function findMatchingOrder(orders, order) {
                return orders.filter(function (o) {
                    return o.OrderId === order.OrderId;
                })[0];
            }

            // --- SCOPE FUNC
            function showPagination() {
                return vm.models.numPages > 1;
            }
            
            function getPagedItems() {
                return _.take(_.drop(filteredItems, (vm.models.currentPage - 1) * vm.itemsPerPage), vm.itemsPerPage);
            }
            
            function getTotalItems() {
                return filteredItems.length;
            }

            function hasPositions() {
                return getTotalItems() > 0;
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
                    positions: sTradingItemService.positions,
                    models: {
                        currentPage: 1,
                        numPages: 0
                    },
                    itemsPerPage: 10,
                    showPagination: showPagination,
                    searchProduct: null,
                    onProductSelected: onProductSelected,
                    searchProducts: searchProducts,
                    isPageLoaded: isPageLoaded,
                    hasPositions: hasPositions,
                    getTotalItems: getTotalItems,
                    getPagedItems: getPagedItems,
                    handlePortfolioUpdated: handlePortfolioUpdated
                });

                tool.on("singleStrategySelected", handleStrategySelected);

                tool.signalRNotification('DeveloperOrderCreated', processBracketOrder);
                tool.signalRNotification('DeveloperOrderUpdated', processBracketOrder);
                tool.signalRNotification('DeveloperOrderMarkedForCancellation', processBracketOrder);
                
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
                            function(loaded) {
                                var diff = (vm.models.currentPage - 1) * vm.itemsPerPage;
                                for (var i = 0; i < loaded.length; ++i) {
                                    filteredItems[diff + i] = loaded[i];
                                }
                                tool.broadcast('portfolioUpdated');
                            }
                        );
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