agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.OpenDeveloperController', ["sOrdersDetailService", 'orderProcessing',
        'sProductService', 'sOrdersClientService', 'sOrdersDetailService', 'orderByFilter', 'sTradingItemService'],
        function(vm, dep, tool) {
            // --- DEPENDENCY RESOLVER
            var sOrdersClientService = dep.sOrdersClientService;
            var sOrdersDetailService = dep.sOrdersDetailService;
            var sProductService = dep.sProductService;
            var orderByFilter = dep.orderByFilter;
            var orderProcessing = dep.orderProcessing;
            var sTradingItemService = dep.sTradingItemService;
            var coreConfigService = dep.coreConfigService;

            // --- LOCAL VAR DECLARATION
            var ordersPerPage = 10;
            var ordersLoadBatch = 30;

            var filteredOrders = [];
            var filledFilteredOrders = [];
            var activeInMixed = 0;

            var previousSearchPromise = null;
            var productSearchMap = new Map();

            function orderFilter(order) {
                if (vm.models.activeOrderViewFilter === 'No Filter') {
                    return orderProcessing.isActive(order);
                } else {
                    return order.LatestStatus === vm.models.activeOrderViewFilter;
                }
            };

            // --- LOCAL SERVICE FUNC 
            function isNotOrderCancel(order) {
                return order.Action !== 'Cancel' && order.LatestStatus !== 'Cancelled';
            }

            function notFilled(order) {
                return order.LatestStatus !== "Filled";
            }

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
            function activeBasedFiltering(orders, viewFilter) {
                if (viewFilter !== 'No Filter') {
                    orders = orders.filter(function (item) {
                        return (vm.orderType === 'active' ? item.LatestStatus : item.Intention) === viewFilter;
                    });
                }

                orders = orders.filter(filterByProduct).filter(isNotOrderCancel);

                return orderByFilter(orders, '-UpdateTime')
            }

            function filterOrders(orders) {
                if (vm.orderType === 'active') {
                    orders = orders.filter(notFilled);
                    return activeBasedFiltering(orders, vm.models.activeOrderViewFilter);
                }
                if (vm.orderType === 'today') {
                    return activeBasedFiltering(orders, vm.models.todaysTradeFilter);
                }
                return orders;
            }

            function getCorrectOrders() {
                if (vm.orderType === 'active') {
                    return orderByFilter(vm.activeOrders.filter(orderProcessing.isActive), '-CreatedTime');
                }

                if (vm.orderType === 'today') {
                    var result = vm.historicalOrders.filter(function (item) {
                        return !orderProcessing.isPlaceHolder(item) && orderProcessing.isTodays(item);
                    }).concat(vm.activeOrders.filter(function (item) {
                        return !orderProcessing.isPlaceHolder(item) && orderProcessing.isTodays(item);
                    }));
                    return orderByFilter(result, '-CreatedTime');
                }

                var productId = vm.models.searchProduct ? vm.models.searchProduct.ProductId : null;

                var historicalOrders = [];
                var activeOrders = [];
                if (productId) {
                    var values = productSearchMap.get(productId);
                    if (values) {
                        historicalOrders = values;
                        activeOrders = vm.activeOrders.filter(function (item) {
                            return item.ProductId === productId;
                        })
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
                    activeOrders = orderByFilter(vm.activeOrders, '-CreatedTime');
                }


                if (vm.orderType === 'historical') {
                    return historicalOrders;
                }

                if (vm.orderType === 'mixed') {
                    activeInMixed = activeOrders.length;
                    return orderProcessing.mergeActiveAndHistorical(activeOrders, historicalOrders);
                }

            }

            function refreshFilteredOrders() {
                filteredOrders = filterOrders(getCorrectOrders());
                filledFilteredOrders = [];

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

            function getTotalFilledItems() {
                return filledFilteredOrders.length;
            }

            function getPagedOrders() {
                return _.take(_.drop(filteredOrders, (vm.models.currentPage - 1) * ordersPerPage), ordersPerPage);
            }

            function getDisplayedOrders() {
                return filteredOrders;
            }

            function isPageLoaded() {
                return !vm.getPagedOrders().some(orderProcessing.isPlaceHolder);
            }

            function getPagedFilledOrders() {
                return _.take(_.drop(filledFilteredOrders, (vm.models.currentPage - 1) * ordersPerPage), ordersPerPage);
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

            tool.watch('vm.models.searchOrderText', function () {
                refreshFilteredOrders();
            });

            tool.watch('vm.models.todaysTradeFilter', function () {
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

                    if (vm.orderType === 'mixed') {
                        skip -= activeInMixed;
                    }

                    arrayToSet = vm.models.searchProduct
                        ? productSearchMap.get(vm.models.searchProduct.ProductId)
                        : vm.historicalOrders;

                    take = ordersLoadBatch;

                    sOrdersClientService.loadHistoricalOrdersPage(
                        vm.selectedStrategy.CapitalInfo.StrategyId,
                        skip,
                        take,
                        vm.models.searchProduct ? vm.models.searchProduct.ProductId : null,
                        function (loaded) {
                            to = Math.min(arrayToSet.length, skip + take);
                            for (var i = skip; i < to; ++i) {
                                arrayToSet[i] = loaded[i - skip]
                            }
                            refreshFilteredOrders();
                        }
                    )
                }
            });

            function viewDetail(position) {
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    noOrderMessage: "You have no order to display",
                    noOrderMessageForGroupStrategy: "No order to display",
                    levelOfDetail: 'Premium',
                    orderFilter: orderFilter,
                    activeOrders: sTradingItemService.activeOrders,
                    historicalOrders: sTradingItemService.historicalOrders,
                    historicalOrdersAmount: sTradingItemService.historicalOrdersAmount,
                    historicalPagesLoaded: sTradingItemService.historicalPagesLoaded,
                    models: {
                        searchOrderText: null,
                        searchProduct: null,
                        activeOrderViewFilter: 'No Filter',
                        todaysTradeFilter: "No Filter",
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
                    viewDetail: viewDetail,
                    getTotalItems: getTotalItems,
                    getDisplayedOrders: getDisplayedOrders,
                    getPagedOrders: getPagedOrders,
                    showPagination: showPagination,
                    getPagedFilledOrders: getPagedFilledOrders,
                    getTotalFilledItems: getTotalFilledItems,
                    currentHistoricalLoaded: 1,
                    searchProducts: searchProducts,
                    getTakeProfitOrder: sOrdersDetailService.getTakeProfitOrder,
                    getStopLossOrder: sOrdersDetailService.getStopLossOrder
                });

                refreshFilteredOrders();
            });
        }
    )
    .defineDirectiveForE('agms-orders-open-developer', [],
        function() {
            return {
                controller: "s.orders.OpenDeveloperController",
                templateUrl: '/App/shared/orders/orders.open.html'
            };
        }, {
            isLoadingOrders: "=",
            viewMode: "="
        });