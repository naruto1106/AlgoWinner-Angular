agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.ActiveDeveloperController', ["orderProcessing", 'coreConfigService',
        'sOrdersClientService', 'sOrdersDetailService', 'orderByFilter', 'sTradingItemService'],
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
                orders = orders.filter(function notFilled(order) {
                    return order.LatestStatus !== "Filled";
                });
                if (vm.models.activeOrderViewFilter !== 'No Filter') {
                    orders = orders.filter(function (item) {
                        return item.LatestStatus === vm.models.activeOrderViewFilter;
                    });
                }

                orders = orders.filter(filterByProduct).filter(function isNotOrderCancel(order) {
                    return order.Action !== 'Cancel' && order.LatestStatus !== 'Cancelled';
                });

                return orderByFilter(orders, '-UpdateTime');
            }
            
            function refreshFilteredOrders() {
                var correctOrders = orderByFilter(vm.activeOrders.filter(orderProcessing.isActive), '-CreatedTime');
                filteredOrders = filterOrders(correctOrders);

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

            tool.watch('vm.models.activeOrderViewFilter', function () {
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
                    levelOfDetail: 'Premium',
                    category: "Trade",
                    event: "Orders",
                    initialOrderFilter: orderProcessing.isActive,
                    activeOrderViewFilters: ['No Filter', 'Processed by Broker', 'Queued', 'Partially Filled'],
                    activeOrders: sTradingItemService.activeOrders,
                    historicalOrders: sTradingItemService.historicalOrders,
                    models: {
                        searchOrderText: null,
                        searchProduct: null,
                        activeOrderViewFilter: 'No Filter',
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

                vm.orderFilter = function (order) {
                    if (vm.models.activeOrderViewFilter === 'No Filter') {
                        return orderProcessing.isActive(order);
                    } else {
                        return order.LatestStatus === vm.models.activeOrderViewFilter;
                    }
                };
            });
        }
    )
    .defineDirectiveForE('agms-orders-active-developer', [],
        function() {
            return {
                controller: "s.orders.ActiveDeveloperController",
                templateUrl: '/App/shared/orders/orders.active.html'
            };
        },{
            isByAccount: '=',
            showCancelButton: '=',
            isLoadingOrders: "=",
            viewMode: '='
        });