agmNgModuleWrapper('agms.chart')
    .defineService("sChartMarketDataService", ['pChartRenderingUtilsService', 
    'pChartFilterDescriptionService'],
        function (serviceObj, dep, tool) {
            var $rootScope = dep.$rootScope,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                coreUserStateService = dep.coreUserStateService,
                filterDescription = dep.pChartFilterDescriptionService;

            var marketDataUpdateBuffer = {};

            // Market data handling - MaRa: need to move to separate service
            $rootScope.$on('beginFetchHistoricalData', function (_, productId) {
                clearMarketDataUpdateBuffer(productId);
            });
            $rootScope.$on('endFetchHistoricalData', function (_, productId) {
                applyMarketDataUpdateBuffer(productId);
            });

            function isIntraday(barSize) {
                if (barSize) {
                    switch (barSize) {
                    case '1 Min':
                    case '5 Min':
                    case '10 Min':
                    case '15 Min':
                    case '30 Min':
                    case '1 H':
                    case '2 H':
                        return true;
                    default:
                        return false;
                    }
                }
                return false;
            }

            // Market data handling - MaRa: need to move to separate service
            function clearMarketDataUpdateBuffer(productId) {
                marketDataUpdateBuffer[productId] = [];
            }
            function addToMarketDataUpdateBuffer(marketData) {
                if (!marketDataUpdateBuffer[marketData.ProductId]) {
                    clearMarketDataUpdateBuffer(marketData.ProductId);
                }
                tool.log('Chart not ready. Buffering update ...');
                marketDataUpdateBuffer[marketData.ProductId].push(marketData);
            }
            function applyMarketDataUpdateBuffer(productId) {
                var buff = marketDataUpdateBuffer[productId];
                if (marketDataUpdateBuffer[productId]) {
                    for (var i = 0; i < buff.length; i++) {
                        tool.log('Applying buffered update...');
                        handleMarketDataUpdate(buff[i]);
                    }
                }
            }
            function handleMarketDataUpdate(marketData) {
                var primaryProductTimezone = filterDescription.primaryProduct.timeZone;
                var stxx = pChartRenderingUtilsService.stxx;
                var lastTradedTime = new Date(marketData.LastTradedTime);

                function getTimestampToForStreamTrade() {
                    return isIntraday(filterDescription.barSize) ?
                        lastTradedTime :
                            // when the bar is not intraday, the UTC traded time might be "ahead" of the native timezone of the daily bar
                            new Date(moment(lastTradedTime).tz(primaryProductTimezone).format('YYYY-MM-DD'));
                }

                // update chart main series

                if (stxx.chart.symbolObject.ProductId === marketData.ProductId) {
                    if (stxx.chart.masterData &&
                        stxx.chart.masterData.length > 0 && !stxx.quoteDriver.updatingChart) {
                        tool.log('Primary trade ' + marketData.LastTradedPrice + ' ' + marketData.LastTradedSize + ' ' + marketData.LastTradedTime);
                        var timestampToUsePrimary = getTimestampToForStreamTrade();

                        stxx.streamTrade({ last: marketData.LastTradedPrice, volume: marketData.LastTradedSize || 0 },
                            new Date(timestampToUsePrimary));
                        setTimeout(function () {
                            if (pChartRenderingUtilsService.lastEvent)
                                stxx.mousemove(pChartRenderingUtilsService.lastEvent);
                        }, 1000);
                    } else {
                        addToMarketDataUpdateBuffer(marketData);
                    }
                } else {
                    var symbol = null;
                    for (var s in stxx.chart.series) {
                        var series = stxx.chart.series[s];
                        if (series.parameters.symbolObject.ProductId === marketData.ProductId) {
                            symbol = series.parameters.symbolObject.Symbol;
                            break;
                        }
                    }
                    if (stxx.chart.masterData && stxx.chart.masterData.length > 0) {
                        var md = stxx.chart.masterData[stxx.chart.masterData.length - 1];
                        var nextInterval = stxx.getNextInterval(md.DT);
                        if (symbol && lastTradedTime < nextInterval) {
                            tool.log('Non-Primary Symbol', symbol, 'Stream trade', marketData.LastTradedPrice, marketData.LastTradedSize, marketData.LastTradedTime);
                            var timestampToUse = getTimestampToForStreamTrade();
                            stxx.streamTrade({ last: marketData.LastTradedPrice, volume: marketData.LastTradedSize || 0 }, timestampToUse, symbol);
                        }
                    }
                }
            }

            // Init sequence
            function init() {
                coreUserStateService.myPremiumItemSubscriptionsLoaded.then(function () {
                    if (coreUserStateService.hasSGRealTimeMarketData()) {
                        tool.signalRMarketData("SG", 'LastMarketDataUpdated', handleMarketDataUpdate);
                        pChartRenderingUtilsService.realTimeMode = true;
                    }
                    if (coreUserStateService.hasUSRealTimeMarketData()) {
                        tool.signalRMarketData("US", 'LastMarketDataUpdated', handleMarketDataUpdate);
                        pChartRenderingUtilsService.realTimeMode = true;
                    }
                    if (coreUserStateService.hasSGRealTimeMarketData() ||
                        coreUserStateService.hasUSRealTimeMarketData()) {
                        tool.signalRMarketData("HK", 'LastMarketDataUpdated', handleMarketDataUpdate);
                        tool.signalRMarketData("CHN", 'LastMarketDataUpdated', handleMarketDataUpdate);
                    }
                });
            }

            tool.setServiceObjectProperties({
                init: init,
                isIntraday: isIntraday
            });
        }
    );