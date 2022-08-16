agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.TradedTransactionsDeveloperController', ['sTradingItemService', 'sTradingExchangeRateService', 'orderProcessing',
        'sOrdersClientService', 'sOrdersDetailService', 'orderByFilter'],
        function (vm, dep, tool) {
            // --- DEPENDENCY RESOLVER
            var sOrdersClientService = dep.sOrdersClientService;
            var sOrdersDetailService = dep.sOrdersDetailService;
            var orderByFilter = dep.orderByFilter;
            var orderProcessing = dep.orderProcessing;
            var sTradingItemService = dep.sTradingItemService;
            var coreConfigService = dep.coreConfigService;

            // --- LOCAL VAR DECLARATION
            var ordersPerPage = 10;
            var ordersLoadBatch = 30;

            var filteredOrders = [];

            var productSearchMap = new Map();

            // --- LOCAL SERVICE FUNC 
            function filterByProduct(order) {
                var keyword = vm.models.searchOrderText;
                if (!keyword) {
                    return true;
                }

                keyword = keyword.toLowerCase();
                return order.Product.ProductName.toLowerCase().indexOf(keyword) > -1 ||
                    order.Product.Symbol.toLowerCase().indexOf(keyword) > -1;
            }

            // --- EVENT HANDLERS
            function filterOrders(orders) {
                if (vm.models.todaysTradeFilter !== 'No Filter') {
                    orders = orders.filter(function (item) {
                        return item.Intention === vm.models.todaysTradeFilter;
                    });
                }

                orders = orders.filter(filterByProduct).filter(function isNotOrderCancel(order) {
                    return order.Action !== 'Cancel' && order.LatestStatus !== 'Cancelled';
                });

                return orderByFilter(orders, '-UpdateTime');
            }

            function getCorrectOrders() {
                var result = vm.historicalOrders.filter(function (item) {
                    return !orderProcessing.isPlaceHolder(item) && orderProcessing.isTodays(item);
                }).concat(sTradingItemService.activeOrders.filter(function (item) {
                    return !orderProcessing.isPlaceHolder(item) && orderProcessing.isTodays(item);
                }));
                return orderByFilter(result, '-CreatedTime');
            }

            function refreshFilteredOrders() {
                filteredOrders = filterOrders(getCorrectOrders());

                //for bracket orders
                if (coreConfigService.Trading.ShowBracketOrder) {
                    filteredOrders = sOrdersDetailService.reorganizeOrderListForBracketOrders(filteredOrders);
                }
            }

            function handleStrategySelected() {
                vm.models.currentPage = 1;
                vm.models.searchProduct = null;
                vm.models.searchOrderText = null;
                productSearchMap = new Map();
                filteredOrders = [];
            }
            
            // --- SCOPE FUNC
            function getTotalItems() {
                return filteredOrders.length;
            }
            
            function getPagedOrders() {
                return _.take(_.drop(filteredOrders, (vm.models.currentPage - 1) * ordersPerPage), ordersPerPage);
            }
            
            function isPageLoaded() {
                return !vm.getPagedOrders().some(orderProcessing.isPlaceHolder);
            }

            function hasOrders() {
                return filteredOrders.length > 0 || vm.models.searchOrderText || vm.models.searchProduct;
            }

            /** for bracket orders **/
            function hasBracketOrder(order) {
                if ((order.TakeProfitOrder != null && orderProcessing.isHistorical(order.TakeProfitOrder))
                    && (order.StopLossOrder != null && orderProcessing.isHistorical(order.StopLossOrder))) {
                    return false;
                }
                return (order.TakeProfitOrder || order.StopLossOrder) && coreConfigService.Trading.ShowBracketOrder;
            };

            function viewBracketOrder(order) {
                sOrdersDetailService.viewBracketOrder('/App/shared/bracketOrders/orders.bracket.html', order, vm.canReplicate, vm.replicateFunc);
            };

            function editBracketOrder(order, type, level) {
                sOrdersDetailService.editBracketOrder(order, type, level);
            };
            /** for bracket orders **/
            
            function showPagination() {
                return vm.models.numPages > 1;
            }
            
            tool.on('orderResponseReceived', refreshFilteredOrders);
            tool.on("orderCreationReceived", refreshFilteredOrders);
            tool.on("orderUpdateHasHappened", refreshFilteredOrders);
            tool.on("orderCancellationHasHappened", refreshFilteredOrders);
            tool.on("singleStrategySelected", handleStrategySelected);

            tool.watch('vm.models.searchOrderText', function () {
                refreshFilteredOrders();
            });

            tool.watch('vm.models.todaysTradeFilter', function () {
                refreshFilteredOrders();
            });
            
            tool.watch('vm.isLoadingOrders', function () {
                if (!vm.isLoadingOrders) {
                    refreshFilteredOrders();
                }
            });

            tool.watch('vm.models.currentPage', function () {
                if (!isPageLoaded()) {
                    skip = (vm.models.currentPage - 1) * ordersPerPage;

                    arrayToSet = vm.models.searchProduct
                        ? productSearchMap.get(vm.models.searchProduct.ProductId)
                        : vm.historicalOrders;

                    take = ordersLoadBatch;

                    sOrdersClientService.loadHistoricalOrdersPage(
                        vm.selectedStrategy.CapitalInfo.StrategyId,
                        skip,
                        take,
                        vm.models.searchProduct ? vm.models.searchProduct.ProductId : null,
                        function(loaded) {
                            to = Math.min(arrayToSet.length, skip + take);
                            for (var i = skip; i < to; ++i) {
                                arrayToSet[i] = loaded[i - skip];
                            }
                            refreshFilteredOrders();
                        }
                    );
                }
            });
            
            tool.initialize(function () {
                tool.setVmProperties({
                    noOrderMessage: "You have no order to display",
                    noOrderMessageForGroupStrategy: "No order to display",
                    todaysTradeFilters: ['No Filter', 'New', 'Increase', 'Partial Exit', 'Full Exit'],
                    category: "Trade",
                    event: "Orders",
                    historicalOrders: sTradingItemService.historicalOrders,
                    models: {
                        searchOrderText: null,
                        searchProduct: null,
                        todaysTradeFilter: "No Filter",
                        currentPage: 1,
                        numPages: 1
                    },
                    isPageLoaded: isPageLoaded,
                    hasOrders: hasOrders,
                    hasBracketOrder: hasBracketOrder,
                    viewBracketOrder: viewBracketOrder,
                    editBracketOrder: editBracketOrder,
                    getTotalItems: getTotalItems,
                    getPagedOrders: getPagedOrders,
                    showPagination: showPagination
                });

                refreshFilteredOrders();
            });
        }
    )
    .defineDirectiveForE('agms-orders-traded-transactions-developer', [],
        function() {
            return {
                restrict: 'E',
                controller: "s.orders.TradedTransactionsDeveloperController",
                templateUrl: '/App/shared/orders/orders.tradedTransactions.html'
            };
        }, {
            isLoadingOrders: "=",
            viewMode: "="
        });