agmNgModuleWrapper('agms.trading')
    .defineController('s.trading.TradedProductsReviewController', ["sStrategyCommercePerformanceService", "orderByFilter"],
    function (vm, dep, tool) {
        var orderByFilter = dep.orderByFilter;

        function getOrders() {
            var request = {
                StrategyId: vm.strategyId
                //FromDate: vm.models.fromDate,
                //ToDate: vm.models.toDate
            };

            vm.isLoading = true;
            return dep.sStrategyCommercePerformanceService.GetProductReview(request.StrategyId).then(function (res) {
                vm.tradesReview = res.data;
            }).finally(function () {
                vm.isLoading = false;
            });
        }

        tool.watch('vm.strategyId', function () {
            if (!vm.strategyId) {
                return;
            }
            getOrders();
        });

        tool.watch('vm.models', onDateFilterChanged, true);

        function onDateFilterChanged(newValue, oldValue) {
            if (oldValue && newValue) {
                if (newValue.fromDate.toString() !== oldValue.fromDate.toString() || newValue.toDate.toString() !== oldValue.toDate.toString()) {
                    //Adjust to UTC values                        
                    getOrders();
                }
            }
        }

        function getTotalLosingTrade(productItem) {
            var width = productItem.LosingTrades / (productItem.WinningTrades + productItem.LosingTrades) * 100;
            return {
                width: width + "%"
            };
        }

        function openDetailPopUp(trades) {
            tool.openModalByDefinition('s.trading.TradedProductReviewPopUpController', {
                trades: trades
            });
        }

        function filterByProduct(trade) {
            var keyword = vm.filter.searchProductText;
            if (!keyword) {
                return true;
            }

            keyword = keyword.toLowerCase();
            return trade.ProductModel.ProductName.toLowerCase().indexOf(keyword) > -1 ||
                trade.ProductModel.Symbol.toLowerCase().indexOf(keyword) > -1;
        }

        function getFilteredTrades() {
            var result = vm.tradesReview.TradesPerProduct.filter(filterByProduct);

            result.forEach(function (t) {
                t.TotalTrades = t.LongTrades + t.ShortTrades;
            });

            switch (vm.filter.sortingType) {
                case "No Sorting":
                    break;
                case "ROI":
                    result = orderByFilter(result, "-Roi");
                    break;
                case "Win Rate":
                    result = orderByFilter(result, "-WinningRatePerProduct");
                    break;
                case "Exited Trades":
                    result = orderByFilter(result, "-TotalTrades");
                    break;
            }

            if (vm.filter.enableTradeFilter && vm.filter.tradeFilterNumber) {
                result = result.filter(function(r) {
                    return r.TotalTrades >= parseInt(vm.filter.tradeFilterNumber);
                });
            }

            return result;
        }

        tool.setVmProperties({
            models: {
                fromDate: new Date(moment.utc(moment().subtract(300, 'days').startOf('day')).format()),
                toDate: new Date(moment().endOf('day').format())
            },
            tradesReview: {},
            filter: {
                searchProductText: "",
                sortingType: "No Sorting",
                enableTradeFilter: false,
                tradeFilterNumber: 0
            },
            sortingSelections: ["No Sorting", "ROI", "Win Rate", "Exited Trades"],

            openDetailPopUp: openDetailPopUp,
            getTotalLosingTrade: getTotalLosingTrade,
            getFilteredTrades: getFilteredTrades
        });
    })
    .defineDirectiveForE('agms-trading-traded-product-review', [],
    function () {
        return {
            controller: "s.trading.TradedProductsReviewController",
            templateUrl: '/App/shared/trading/trading.tradedProductReview.html'
        };
    }, {
        strategyId: "="
    });