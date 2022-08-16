agmNgModuleWrapper('agms.positions')
    .defineController("DeveloperPositionSummaryController",
        ['sTradingItemService', 'sProductService', 'orderByFilter'],
        function (vm, dep, tool) {
            // --- DEPENDENCY RESOLVER
            var orderByFilter = dep.orderByFilter,
                sTradingItemService = dep.sTradingItemService,
                sProductService = dep.sProductService;

            // --- LOCAL VAR DECLARATION
            var filteredItems = [];

            function increasePosition(position) {
                tool.emit('increasePositionEvent', position);
            }

            function decreasePosition(position) {
                tool.emit('decreasePositionEvent', position);
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
            function handlePortfolioUpdated() {
                vm.positions = sTradingItemService.activePositions;

                filteredItems = orderByFilter(vm.positions, '-LastExitTime');
                filteredItems = filteredItems.filter(function(x) { return x.QuantityOnHold > 0; });
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
            
            function getTotalItems() {
                return filteredItems.length;
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
                    category: "Trade",
                    event: "Orders",
                    noPositionMessage: "You have no position to display",
                    noPositionMessageForGroupStrategy: "No position to display",
                    increasePosition: increasePosition,
                    decreasePosition: decreasePosition,
                    marker: "open",
                    positionFilter: isActive,
                    positions: sTradingItemService.positions,
                    handlePortfolioUpdated: handlePortfolioUpdated,
                    models: {
                        currentPage: 1,
                        numPages: 0,
                        overviewSorting: "Holding Duration"
                    },
                    sortReverse: [{ "Product": false }, { "Allocated Exposure": false }, { "Margin Used": false }, { "Unrealized P/L (%)": false }, { "Position": false }, { "Holding Duration": false }],
                    itemsPerPage: 10,
                    getTotalItems: getTotalItems,
                    getPagedItems: getPagedItems,
                    showPagination: showPagination,
                    goToProduct: sProductService.goToProduct
                });

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

                vm.handlePortfolioUpdated();
            });
        }
    )
    .defineDirectiveForE('agms-positions-summary', [],
        function() {
            return {
                restrict: 'E',
                controller: "DeveloperPositionSummaryController",
                templateUrl: '/App/shared/positions/positions.summary.html'
            };
        }, {
            isByAccount: '=',
            isLoadingPositions: '=',
            viewMode: '='
        });