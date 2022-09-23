agmNgModuleWrapper('agms.trading')
    .ngApp
    .service('sTradingExitAggregatorService', [
        '$log', '$q', 'sTradingExchangeRateService', 'orderService', 'orderProcessing', 'dateTimeSyncService', 'sTradingCorporateActionsService',
        function($log, $q, sTradingExchangeRateService, orderService, orderProcessing, dateTimeSyncService, sTradingCorporateActionsService) {
            this.adjustTradesUsingStockSplitAndConsolidation = adjustTradesUsingStockSplitAndConsolidation;
            this.groupPortfolioIntoTradeList = groupPortfolioIntoTradeList;

            function adjustTradesUsingStockSplitAndConsolidation(orders, corporateActions) {
                var stockSplitsByProduct = _.groupBy(corporateActions, 'ProductId');
                for (var productId in stockSplitsByProduct) {
                    if (stockSplitsByProduct.hasOwnProperty(productId)) {
                        stockSplitsByProduct[productId].forEach(function(ss) {
                            ss.ExDateAsMoment = moment(ss.ExDate);
                        });
                        stockSplitsByProduct[productId].sort(function(ss1, ss2) {
                            return ss1.ExDateAsMoment - ss2.ExDateAsMoment;
                        });
                    }
                }
                orders.forEach(function(order) {
                    order.AdjQuantity = order.Quantity;
                    order.AdjFillPrice = order.FillPrice;

                    var ssForProduct = stockSplitsByProduct[order.ProductId];
                    if (ssForProduct && ssForProduct.length > 0) {
                        ssForProduct.forEach(function(ss) {
                            if (moment(order.LastUpdateTime) < ss.ExDateAsMoment) {
                                order.AdjQuantity = order.AdjQuantity * ss.NewValue / ss.OldValue;
                                order.AdjFillPrice = order.AdjFillPrice * ss.OldValue / ss.NewValue;
                            }
                        });
                    }
                });
            }

            function groupPortfolioIntoTradeList(tradeList, portfolioListGroup) {
                return _.map(portfolioListGroup, function(value, key) {
                    //Sort into two arrays - one for entry and one for exit
                    var entryArray = value.filter(function(o) {
                        if (o.Intention === "New" || o.Intention === "Increase") return true;
                        return false;
                    });
                    var exitArray = value.filter(function(o) {
                        if (o.Intention === "Partial Exit" || o.Intention === "Full Exit") return true;
                        return false;
                    });
                    var remainingQuantity = entryArray[0].AdjQuantity;

                    while (exitArray.length > 0) {
                        var totalEntryValue = 0;
                        var totalEntryTransactionCost = 0;
                        var tradeObj = {
                            Exit: exitArray.shift(),
                            Entries: []
                        };
                        var x = tradeObj.Exit.AdjQuantity;
                        while (x > 0) {
                            if (x >= remainingQuantity) {
                                x -= remainingQuantity;
                                totalEntryValue += remainingQuantity * entryArray[0].AdjFillPrice;
                                totalEntryTransactionCost +=
                                    remainingQuantity /
                                    entryArray[0].AdjQuantity *
                                    entryArray[0].TransactionCost;
                                tradeObj.Entries.push(entryArray.shift());
                                if (entryArray[0]) {
                                    remainingQuantity = entryArray[0].AdjQuantity;
                                } else {
                                    x = 0;
                                }
                            } else {
                                remainingQuantity -= x;
                                totalEntryValue += x * entryArray[0].AdjFillPrice;
                                totalEntryTransactionCost +=
                                    x / entryArray[0].AdjQuantity * entryArray[0].TransactionCost;
                                tradeObj.Entries.push(entryArray[0]);
                                x = 0;
                            }
                        }
                        var totalExitValue = tradeObj.Exit.AdjQuantity * tradeObj.Exit.AdjFillPrice;
                        tradeObj.WeightedEntryPrice = totalEntryValue / tradeObj.Exit.AdjQuantity;
                        tradeObj.WeightedEntryTransaction = totalEntryTransactionCost;
                        tradeObj.TotalEntryPosition = totalEntryValue;
                        tradeObj
                            .TotalTransactionCost =
                            totalEntryTransactionCost + tradeObj.Exit.TransactionCost;
                        tradeObj.RealizedPL = tradeObj.Exit.Action === "Sell"
                            ? totalExitValue - totalEntryValue - tradeObj.TotalTransactionCost
                            : totalEntryValue - totalExitValue - tradeObj.TotalTransactionCost;
                        tradeObj
                            .RealizedPLPercentage = tradeObj.RealizedPL / tradeObj.TotalEntryPosition * 100;
                        tradeObj.Turnover = totalEntryValue + totalExitValue;
                        tradeList.push(tradeObj);
                    }
                    return;
                });
            }


            this.getTradeExitDataForStrategy = function(strategyId, currency) {
                var tradeExitDataPromise = $q.defer();
                var tradeExitData = {
                    cumulativePL: 0,
                    numWinningStocks: 0,
                    numLosingStocks: 0,
                    turnover: 0,
                    totalTrades: 0,
                    totalWinningTrades: 0,
                    totalLosingTrades: 0,
                    winningPercentage: 0,
                    cumulativePLPct: 0
                };
                var req = {
                    StrategyId: strategyId,
                    CreatedFrom: moment.utc(moment().subtract(10, 'years').startOf('day')).format(),
                    CreatedTo: dateTimeSyncService.getCurrentServerTime()
                }
                sTradingExchangeRateService.GetExchangeRatesForBaseCurrency(currency).then(function(res) {
                    var rates = _.chain(res.data)
                        .indexBy("CurrencyPair")
                        .mapValues("Rate")
                        .value();
                    return rates;
                }).then(function(rates) {
                    orderService.GetDeveloperAllOrdersForTradeReview(req).then(function(res) {
                        var orders = [];
                        var tradeList = [];
                        var productListWithTrades = [];
                        orderProcessing.handleOrderResponse(res.data, orders);
                        orders = _.sortBy(orders, function(order) {
                            return new Date(order.UpdateTime);
                        });
                        if (orders && orders[0]) {
                            var productList = _.groupBy(orders, "ProductId");
                            productListWithTrades = _.map(productList, function(value, key) {
                                return value[0].Product;
                            });

                            var request = {
                                ProductIds: _.map(productListWithTrades, 'ProductId')
                            }

                            sTradingCorporateActionsService
                                .GetSplitsForProducts(request)
                                .then(function(res) {
                                    var splits = res.data;
                                    adjustTradesUsingStockSplitAndConsolidation(orders, splits);

                                    //Group the orders by product level
                                    var portfolioListGroup = _.groupBy(orders, "PortfolioId");

                                    groupPortfolioIntoTradeList(tradeList, portfolioListGroup);

                                    var overallEntryPosition = 0;

                                    productListWithTrades.forEach(function(product) {
                                        var exchangeRate = rates[product.Currency];
                                        var totalShort = 0;
                                        var totalLong = 0;
                                        var totalWin = 0;
                                        var cumulativePL = 0;
                                        var turnover = 0;
                                        var totalEntryPosition = 0;
                                        tradeList.filter(function(t) {
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
                                        tradeExitData.totalWinningTrades += totalWin;
                                        tradeExitData.cumulativePL += (cumulativePL / exchangeRate);
                                        product.CumulativePLPct = cumulativePL / totalEntryPosition * 100;
                                        if (cumulativePL > 0) tradeExitData.numWinningStocks++;
                                        else tradeExitData.numLosingStocks++;
                                        tradeExitData.turnover += turnover / exchangeRate;
                                        overallEntryPosition += totalEntryPosition / exchangeRate;
                                    });

                                    tradeExitData.totalTrades = tradeList.length;
                                    tradeExitData.winningPercentage = tradeExitData.totalWinningTrades /
                                        tradeExitData.totalTrades *
                                        100;
                                    tradeExitData.totalLosingTrades = tradeExitData.totalTrades - tradeExitData.totalWinningTrades;
                                    tradeExitData.cumulativePLPct = tradeExitData.cumulativePL / overallEntryPosition * 100;

                                    tradeExitDataPromise.resolve(tradeExitData);
                                });
                        } else {
                            tradeExitDataPromise.resolve(tradeExitData);
                        }
                    }, function(res) {
                        $log.error("Error in getOrdersForStrategy");
                        tradeExitDataPromise.reject();
                    });
                }, function() {
                    $log.error("Error in getExchangeRates");
                    tradeExitDataPromise.reject();
                });
                return tradeExitDataPromise.promise;
            }
        }
    ]);