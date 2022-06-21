agmNgModuleWrapper('agms.orders')
    .defineController("BaseTradedTransactionsController", ['sTradingItemService', 'sTradingExchangeRateService', 'orderProcessing'],
    function (vm, dep, tool) {
        // --- DEPENDENCY RESOLVER
        var sTradingItemService = dep.sTradingItemService;
        var orderProcessing = dep.orderProcessing;

        vm.orderType = 'today';
        vm.orderFilter = orderFilter;
        vm.initialOrderFilter = showInTodayTransaction;
        vm.todayRealizedPnl = 0;
        
        // ensure date comparison is fast, make use of string matching. Assumes that "today" is static, for now.
        function showInTodayTransaction(order) {
            return isBrokerReady(order) && order.UpdateTime.substring(0, 10) === todayDate;
        }

        function orderFilter(order) {
            if (vm.models.todaysTradeFilter === 'No Filter') {
                return showInTodayTransaction(order);
            } else {
                return showInTodayTransaction(order) && order.Intention === vm.models.todaysTradeFilter;
            }
        };

        // calculate today's realized P/L
        vm.todayRealizedPnlCurrency = sTradingItemService.capitalSummary.Currency;
        
        function calculateTodayRealizedPnL() {
            var currencyDic = {};
            vm.currencies = [];
            vm.hasMultipleCurrency = false;

            var todayOrders = sTradingItemService.historicalOrders.filter(function (item) {
                return !orderProcessing.isPlaceHolder(item)
                    //&& orderProcessing.isTodays(item);
            });

            if (todayOrders.length > 0) {
                dep.sTradingExchangeRateService.GetAllExchangeRates().then(function (res) {
                    var rates = _.chain(res.data)
                        .indexBy("CurrencyPair")
                        .mapValues("Rate")
                        .value();
                    return rates;
                }).then(function (rates) {
                    vm.exchangeRates = rates;
                    vm.todayRealizedPnl = 0;
                    todayOrders.forEach(function (order) {
                        order.AverageEntryPrice = (order.LastOrderUpdate && order.LastOrderUpdate.AverageEntryPrice) ? order.LastOrderUpdate.AverageEntryPrice : order.AverageEntryPrice;
                        if ((order.Intention === "Full Exit" || order.Intention === "Partial Exit") && order.AverageEntryPrice) {
                            var priceDifferential = (order.Action === "Buy") ? (order.AverageEntryPrice - order.FillPrice) : (order.FillPrice - order.AverageEntryPrice);
                            vm.todayRealizedPnl += priceDifferential * order.Quantity * vm.exchangeRates[order.Product.Currency + "_" + vm.todayRealizedPnlCurrency];
                            currencyDic[order.Product.Currency + "_" + vm.todayRealizedPnlCurrency] = vm.exchangeRates[order.Product.Currency + "_" + vm.todayRealizedPnlCurrency];
                        }
                    });

                    if (Object.keys(currencyDic).length > 1) {
                        vm.hasMultipleCurrency = true;
                        for (var key in currencyDic) {
                            vm.currencies.push({
                                Name: key.replace("_SGD", ""),
                                Value: currencyDic[key]
                            });
                        }
                    }
                }, function (res) {
                    dep.coreNotificationService.notifyError("failed to retrieve exchange rate");
                });
            }
        }

        calculateTodayRealizedPnL();

        tool.eventToObservable('orderUpdateHasHappened')
            .bufferWithTime(250)
            .subscribe(function (evts) {
                if (evts && evts.length > 0) {
                    tool.evalAsync(calculateTodayRealizedPnL);
                }
            });

        tool.eventToObservable('portfolioUpdated')
            .bufferWithTime(250)
            .subscribe(function (evts) {
                if (evts && evts.length > 0) {
                    tool.evalAsync(calculateTodayRealizedPnL);
                }
            });

        tool.initialize(function () {
            tool.setVmProperties({
                todaysTradeFilters: ['No Filter', 'New', 'Increase', 'Partial Exit', 'Full Exit'],
            });
        });
    })