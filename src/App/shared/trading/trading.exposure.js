agmNgModuleWrapper('agms.trading')
    .defineController('s.trading.ExposureController', [
            'orderProcessing', 'orderService', 'sTradingExchangeRateService', 'dateTimeSyncService',
            'sTradingCorporateActionsService', 'sTradingExitAggregatorService'
        ],
        function(vm, dep, tool) {
            var orderProcessing = dep.orderProcessing,
                orderService = dep.orderService,
                sTradingExchangeRateService = dep.sTradingExchangeRateService,
                dateTimeSyncService = dep.dateTimeSyncService,
                sTradingCorporateActionsService = dep.sTradingCorporateActionsService,
                sTradingExitAggregatorService = dep.sTradingExitAggregatorService;

            function getOrders() {
                vm.exposureList = [];

                var tradeList = [];
                var filterData = {
                    StrategyId: vm.strategyId,
                    CreatedFrom: moment.utc(moment().subtract(10, 'years').startOf('day')).format(),
                    CreatedTo: dateTimeSyncService.getCurrentServerTime()
                };
                var totalTurnover = 0;
                var orders = [];

                sTradingExchangeRateService.GetExchangeRatesForBaseCurrency(vm.currency).then(function(res) {
                    vm.strategyCurrency = res.data.filter(function(o) {
                        return o.Rate == 1;
                    })[0].CurrencyPair;
                    var rates = _.chain(res.data)
                        .indexBy("CurrencyPair")
                        .mapValues("Rate")
                        .value();
                    return rates;
                }).then(function(rates) {
                    orderService.GetDeveloperAllOrdersForTradeReview(filterData).then(function(res) {
                        vm.overallModel = {
                            cumulativePL: 0,
                            numWinningStocks: 0,
                            numLosingStocks: 0,
                            turnover: 0,
                            totalTrades: 0,
                            winningPercentage: 0,
                            cumulativePLPct: 0
                        };
                        vm.productListWithTrades = [];
                        tradeList = [];
                        orderProcessing.handleOrderResponse(res.data, orders);
                        orders = _.sortBy(orders, function(order) {
                            return new Date(order.UpdateTime);
                        });
                        if (orders && orders[0]) {
                            var productList = _.groupBy(orders, "ProductId");
                            vm.exposureList = _.map(productList, function(value, key) {
                                return value[0].Product;
                            });

                            var request = {
                                ProductIds: _.map(vm.exposureList, 'ProductId'),
                                CorporateActionTypes: ["Stock Split"]
                            }

                            sTradingCorporateActionsService
                                .GetCorporateActionsForProducts(request)
                                .then(function(res) {
                                    var splits = res.data;
                                    sTradingExitAggregatorService.adjustTradesUsingStockSplitAndConsolidation(orders, splits);

                                    //Group the orders by product level
                                    var portfolioListGroup = _.groupBy(orders, "PortfolioId");

                                    var portfolioList = sTradingExitAggregatorService.groupPortfolioIntoTradeList(tradeList, portfolioListGroup);

                                    var totalWinningTrades = 0;
                                    var overallEntryPosition = 0;

                                    vm.exposureList.forEach(function(product) {
                                        var exchangeRate = rates[product.Currency];
                                        var totalShort = 0;
                                        var totalLong = 0;
                                        var totalWin = 0;
                                        var cumulativePL = 0;
                                        var turnover = 0;
                                        var totalEntryPosition = 0;
                                        var trades = tradeList.filter(function(t) {
                                            if (product.ProductId === t.Exit.ProductId) {
                                                if (t.Exit.Action === "Sell") totalLong++;
                                                else totalShort++;
                                                if (t.RealizedPL > 0) totalWin++;
                                                cumulativePL += t.RealizedPL;
                                                turnover += t.Turnover;
                                                totalEntryPosition += t.TotalEntryPosition;
                                                return true;
                                            }
                                            return false;
                                        });
                                        product.Trades = trades;
                                        product.TotalShortTrades = totalShort;
                                        product.TotalLongTrades = totalLong;
                                        product.TotalWinningTrades = totalWin;
                                        product.CumulativeReturn = cumulativePL / exchangeRate;
                                        totalWinningTrades += totalWin;
                                        vm.overallModel.cumulativePL += product.CumulativeReturn;
                                        product.CumulativeReturnPct = cumulativePL / totalEntryPosition * 100;
                                        if (cumulativePL > 0) vm.overallModel.numWinningStocks++;
                                        else vm.overallModel.numLosingStocks++;
                                        product.Turnover = turnover / exchangeRate;
                                        vm.overallModel.turnover += product.Turnover;
                                        totalTurnover += product.Turnover;
                                        overallEntryPosition += totalEntryPosition;
                                    });

                                    vm.overallModel.totalTrades = tradeList.length;
                                    vm.overallModel.winningPercentage = totalWinningTrades / vm.overallModel.totalTrades * 100;
                                    vm.overallModel.cumulativePLPct = vm.overallModel.cumulativePL / overallEntryPosition * 100;
                                    vm.exposureList.forEach(function(exposure) {
                                        exposure.Proportion = exposure.Turnover / totalTurnover * 100;
                                        exposure.TotalLosingTrades = exposure.Trades.length - exposure.TotalWinningTrades;
                                        exposure.LosePercentage = 100 * (exposure.Trades.length - exposure.TotalWinningTrades) / exposure.Trades.length;
                                    });
                                });
                        } else {
                            vm.overallModel = {
                                cumulativePL: 0,
                                numWinningStocks: 0,
                                numLosingStocks: 0,
                                turnover: 0,
                                totalTrades: 0,
                                winningPercentage: 0,
                                cumulativePLPct: 0
                            };
                            vm.exposureList = [];
                        }
                    }, function(res) {
                        tool.logError("Error in getOrdersForStrategy");
                    });
                });
            }

            tool.watch('vm.strategyId', function() {
                if (!vm.strategyId) {
                    return;
                }
                getOrders();
            });

        })
    .defineDirectiveForE('agms-trading-exposure', [],
        function() {
            return {
                controller: "s.trading.ExposureController",
                templateUrl: '/App/shared/trading/trading.exposure.html'
            };
        }, {
            strategyId: "=",
            currency: "=",
            hideIfNoTurnovers: "=",
            isStrategy: "="
        });