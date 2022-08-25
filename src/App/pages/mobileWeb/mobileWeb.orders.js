agmNgModuleWrapper('agmp.mobileWeb')
    .defineController("p.mobileWeb.OrdersController", ["pMobileWebService", "orderProcessing",
            'sProductService', 'sOrdersClientService', 'sOrdersDetailService', 'orderByFilter', 'sTradingItemService'],
    function (vm, dep, tool) {
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
        var activeInMixed = 0;

        var previousSearchPromise = null;
        var productSearchMap = new Map();

        // --- EVENT HANDLERS
        function mergeActiveAndHistorical(active, historical) {
            var result = [];

            var activeHead = 0;
            var historicalHead = 0;
            var fillWithPlaceHolders = false;

            while (result.length !== active.length + historical.length && activeHead < active.length && historicalHead < historical.length) {
                if (orderProcessing.isPlaceHolder(historical[historicalHead])) {
                    fillWithPlaceHolders = true;
                    break;
                }
                if (Date.parse(active[activeHead].CreatedTime) > Date.parse(historical[historicalHead].CreatedTime)) {
                    result.push(active[activeHead++]);
                } else {
                    result.push(historical[historicalHead++]);
                }
            }

            if (fillWithPlaceHolders) {
                i = 0;
                while (result.length !== active.length + historical.length) {
                    result.push({ "OrderId": "placeholder" + i });
                    i += 1;
                }
            } else {
                for (var i = activeHead; i < active.length; ++i) {
                    result.push(active[i]);
                }
                for (var i = historicalHead; i < historical.length; ++i) {
                    result.push(historical[i]);
                }
            }

            return result;
        }

        function getCorrectOrders() {
            var productId = vm.models.searchProduct ? vm.models.searchProduct.ProductId : null;

            var historicalOrders = [];
            var activeOrders = [];
            if (productId) {
                var values = productSearchMap.get(productId);
                if (values) {
                    historicalOrders = values;
                    activeOrders = sTradingItemService.activeOrders.filter(function (item) {
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
                activeOrders = orderByFilter(sTradingItemService.activeOrders, '-CreatedTime');
            }

            activeInMixed = activeOrders.length;
            return mergeActiveAndHistorical(activeOrders, historicalOrders);
        }

        function refreshFilteredOrders() {
            filteredOrders = getCorrectOrders();

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

        function getPagedOrders() {
            return _.take(_.drop(filteredOrders, (vm.models.currentPage - 1) * ordersPerPage), ordersPerPage);
        }

        function isPageLoaded() {
            return !vm.getPagedOrders().some(orderProcessing.isPlaceHolder);
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
                skip -= activeInMixed;

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
                historicalOrders: sTradingItemService.historicalOrders,
                models: {
                    searchProduct: null,
                    currentPage: 1,
                    numPages: 1
                },
                onProductSelected: onProductSelected,
                isPageLoaded: isPageLoaded,
                hasOrders: hasOrders,
                hasBracketOrder: hasBracketOrder,
                viewBracketOrder: viewBracketOrder,
                editBracketOrder: editBracketOrder,
                getTotalItems: getTotalItems,
                getPagedOrders: getPagedOrders,
                showPagination: showPagination,
                searchProducts: searchProducts
            });

            refreshFilteredOrders();
        });
    })
    .defineDirectiveForE("agmp-mobile-orders", [],
    function () {
        return {
            controller: "p.mobileWeb.OrdersController",
            templateUrl: '/App/pages/mobileWeb/mobileWeb.orders.html'
        };
    },
    {
        isLoadingOrders: "="
    });