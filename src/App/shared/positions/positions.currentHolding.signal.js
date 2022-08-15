agmNgModuleWrapper('agms.positions')
    .defineController("s.positions.CurrentHoldingSignalController", ['sTradingItemService', 'coreConfigService',
            'orderByFilter', 'sProductService'],
        function(vm, dep, tool) {
            // --- DEPENDENCY RESOLVER
            var orderByFilter = dep.orderByFilter,
                sTradingItemService = dep.sTradingItemService,
                sProductService = dep.sProductService,
                coreConfigService = dep.coreConfigService;

            // --- LOCAL VAR DECLARATION
            var filteredItems = [];

            function viewPositionDetailFunc(position) {
                return tool.promisedEmit('viewPositionDetailEvent', position);
            }

            function showPositionDetail() {
                return vm.isPreview ? false : true;
            }

            function resolveHoldingSummary(positions, isPreview) {
                if (positions) {
                    var totalLong = 0;
                    var totalShort = 0;

                    if (isPreview) {
                        positions.forEach(function (position) {
                            var idx = position.Orders.length - 1;
                            if (position.Orders[idx].Intention !== "Full Exit") {
                                if (position.PositionType === 'Long') {
                                    totalLong++;
                                }
                                if (position.PositionType === 'Short') {
                                    totalShort++;
                                }
                            }
                            position.PreviewExposure = position.Exposure_Percent;
                        });
                    } else {
                        positions.forEach(function (position) {
                            if (position.QuantityOnHold > 0) {
                                if (position.PositionType === 'Long') {
                                    totalLong++;
                                }
                                if (position.PositionType === 'Short') {
                                    totalShort++;
                                }
                            }
                        });
                    }
                    return {
                        totalLong: totalLong,
                        totalShort: totalShort
                    }
                }
            }
            
            function isActive(position) {
                if (position.QuantityOnHold != null) {
                    return position.QuantityOnHold !== 0;
                } else {
                    var lastOrder = position.Orders[position.Orders.length - 1];
                    return (lastOrder && lastOrder.Intention !== 'Full Exit');
                }
            };

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
                vm.positions = sTradingItemService.activePositions;

                filteredItems = orderByFilter(vm.positions.filter(filterByProduct), '-LastExitTime');
                sTradingItemService.populatePositionDirective();

                sortPositions(vm.models.overviewSorting);
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

            tool.on("singleStrategySelected", handleStrategySelected);

            tool.initialize(function () {
                tool.setVmProperties({
                    category: "MySubscriptions",
                    event: "TrackSubscribedStrategies",
                    noPositionMessage: "No position to display",
                    overviewSortings: ["Product", "Allocated Exposure", "Margin Used", "Unrealized P/L (%)", "Position", "Holding Duration"],
                    levelOfDetail: 'Premium',
                    marker: "open",
                    showPositionDetail: showPositionDetail,
                    viewPositionDetailFunc: viewPositionDetailFunc,
                    positionFilterFunc: vm.positionFilter,
                    capitals: sTradingItemService.capitalSummary,
                    positionFilter: isActive,
                    coreConfigService: coreConfigService,
                    positionChartColors: sTradingItemService.activePositionChartColors,
                    quantityOnHoldChartValues: sTradingItemService.quantityOnHoldChartValues,
                    exposureChartValues: sTradingItemService.exposureChartValues,
                    positions: sTradingItemService.positions,
                    currentStrategy: sTradingItemService.currentStrategy,
                    holdingSummary: sTradingItemService.holdingSummary,
                    hasPositionsWithFilter: hasPositionsWithFilter,
                    hasPositions: hasPositions,
                    handlePortfolioUpdated: handlePortfolioUpdated,
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
                    getTotalItems: getTotalItems,
                    getPagedItems: getPagedItems,
                    showPagination: showPagination,
                    showExposurePagination: showExposurePagination,
                    getExposurePagedItems: getExposurePagedItems,
                    sortPositions: sortPositions,
                    setDefaultSortReverse: setDefaultSortReverse,
                    goToProduct: sProductService.goToProduct
                });

                if (vm.isPreview) {
                    vm.noPositionMessage = "Your subscription level does not allow viewing open positions";
                }

                vm.resolveHoldingSummary = function () {
                    var holdingSummary = resolveHoldingSummary(vm.positions, vm.isPreview);
                    vm.holdingSummary.currentNumOfLong = holdingSummary.totalLong;
                    vm.holdingSummary.currentNumOfShort = holdingSummary.totalShort;
                }

                tool.eventToObservable('portfolioUpdated')
                    .bufferWithTime(250)
                    .subscribe(function (evts) {
                        if (evts && evts.length > 0) {
                            tool.evalAsync(vm.resolveHoldingSummary);
                        }
                    });

                vm.hasPositions = function () {
                    return vm.holdingSummary.currentNumOfLong + vm.holdingSummary.currentNumOfShort > 0;
                }
                
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

                vm.handlePortfolioUpdated();
                vm.resolveHoldingSummary();
            });
        }
    )
    .defineDirectiveForE('agms-positions-current-holding-signal', [],
        function() {
            return {
                restrict: 'E',
                controller: "s.positions.CurrentHoldingSignalController",
                templateUrl: '/App/shared/positions/positions.currentHolding.html'
            };
        }, {
            isPreview: "=",
        });