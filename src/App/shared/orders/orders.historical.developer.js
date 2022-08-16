agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.HistoricalDeveloperController', ['orderProcessing', 'coreConfigService',
        'sProductService', 'sOrdersClientService', 'sOrdersDetailService', 'sTradingItemService'],
        function(vm, dep, tool) {
            // --- DEPENDENCY RESOLVER
            var sOrdersClientService = dep.sOrdersClientService;
            var sOrdersDetailService = dep.sOrdersDetailService;
            var sProductService = dep.sProductService;
            var orderProcessing = dep.orderProcessing;
            var sTradingItemService = dep.sTradingItemService;
            var coreConfigService = dep.coreConfigService;

            // --- LOCAL VAR DECLARATION
            var ordersPerPage = 10;
            var ordersLoadBatch = 30;

            var filteredOrders = [];
            var filledFilteredOrders = [];

            var previousSearchPromise = null;
            var productSearchMap = new Map();

            // --- EVENT HANDLERS
            function getCorrectOrders() {
                var productId = vm.models.searchProduct ? vm.models.searchProduct.ProductId : null;

                var historicalOrders = [];
                if (productId) {
                    var values = productSearchMap.get(productId);
                    if (values) {
                        historicalOrders = values;
                    } else {
                        vm.isLoadingOrders = true;
                        values = new Array();
                        sOrdersClientService.initializeHistoricalPagedOrders(
                            vm.selectedStrategy.DisplayInfo.BasicInfo.StrategyId,
                            productId,
                            values,
                            function () {
                                vm.isLoadingOrders = false;
                                productSearchMap.set(productId, values);
                            });
                        return [];
                    }
                } else {
                    historicalOrders = vm.historicalOrders;
                }

                return historicalOrders;
            }

            function refreshFilteredOrders() {
                filteredOrders = getCorrectOrders();
                filledFilteredOrders = [];

                //for bracket orders
                if (coreConfigService.Trading.ShowBracketOrder) {
                    filteredOrders = sOrdersDetailService.reorganizeOrderListForBracketOrders(filteredOrders);
                }
            }

            function handleStrategySelected() {
                vm.models.currentPage = 1;
                vm.models.searchProduct = null;
                productSearchMap = new Map();
                filteredOrders = [];
            }
            
            // --- SCOPE FUNC
            function getTotalItems() {
                return filteredOrders.length;
            }

            function getTotalFilledItems() {
                return filledFilteredOrders.length;
            }

            function getPagedOrders() {
                return _.take(_.drop(filteredOrders, (vm.models.currentPage - 1) * ordersPerPage), ordersPerPage);
            }

            function isPageLoaded() {
                return !vm.getPagedOrders().some(orderProcessing.isPlaceHolder);
            }

            function getPagedFilledOrders() {
                return _.take(_.drop(filledFilteredOrders, (vm.models.currentPage - 1) * ordersPerPage), ordersPerPage);
            }

            function hasOrders() {
                return filteredOrders.length > 0 || vm.models.searchProduct;
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

            function onProductSelected(product) {
                vm.models.searchProduct = product;
                refreshFilteredOrders();
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

            tool.on('orderResponseReceived', refreshFilteredOrders);
            tool.on("orderCreationReceived", refreshFilteredOrders);
            tool.on("orderUpdateHasHappened", refreshFilteredOrders);
            tool.on("orderCancellationHasHappened", refreshFilteredOrders);
            tool.on("singleStrategySelected", handleStrategySelected);
            
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
                    historicalDisplayKind: 'Developer',
                    historicalOrders: sTradingItemService.historicalOrders,
                    models: {
                        searchProduct: null,
                        currentPage: 1,
                        numPages: 1
                    },
                    onProductSelected: onProductSelected,
                    isPageLoaded: isPageLoaded,
                    isPlaceHolder: orderProcessing.isPlaceHolder,
                    hasOrders: hasOrders,
                    hasBracketOrder: hasBracketOrder,
                    viewBracketOrder: viewBracketOrder,
                    editBracketOrder: editBracketOrder,
                    getTotalItems: getTotalItems,
                    getPagedOrders: getPagedOrders,
                    showPagination: showPagination,
                    getPagedFilledOrders: getPagedFilledOrders,
                    getTotalFilledItems: getTotalFilledItems,
                    searchProducts: searchProducts
                });

                refreshFilteredOrders();
            });
        }
    )
    .defineDirectiveForE('agms-orders-historical-developer', [],
        function() {
            return {
                controller: "s.orders.HistoricalDeveloperController",
                templateUrl: '/App/shared/orders/orders.historical.html'
            };
        }, {
            selectedStrategy: '=',
            currency: '=',
            isLoadingOrders: "=",
            viewMode: "="
        });