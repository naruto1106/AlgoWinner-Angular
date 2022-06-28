agmNgModuleWrapper('agms.chart')
    .ngApp
    .factory('pChartQuoteFeedService', ['$rootScope', '$log', '$q', 'sProductHistoricalDataService', 'sDatamartFundamentalDataService', 'pChartFilterDescriptionService',
        'pChartTgpsService',
        function ($rootScope, $log, $q, sProductHistoricalDataService, sDatamartFundamentalDataService, pChartFilterDescriptionService, pChartTgpsService) {
            STX.QuoteFeed.AlgoMarketDataFeed = function () {
            };
            STX.QuoteFeed.AlgoMarketDataFeed.stxInheritsFrom(STX.QuoteFeed);
            window.product_cache_adj = {};
            window.product_cache_unadj = {};
            window.fundamental_cache = {};
            window.fundamental_validity_cache = {};
            window.volume_cache = {};

            STX.QuoteFeed.AlgoMarketDataFeed.prototype.fetch = function (params, cb) {

                if (!params.symbolObject || !params.symbolObject.symbol) {
                    return;
                }

                var shouldHaveMore = false;
                if (params.startDate && params.endDate) {
                    // This means the chart is asking for a specific data range, 
                    // probably to back fill MaterData for a comparison symbol for an existing chart.                                        
                } else if (params.startDate) {
                    // This means the chart is asking for refresh (stream) of most recent data according to the interval you have specified in behavior.refreshInterval when you attached the quote feed (attachQuoteFeed). 
                    // If you don't support streaming then just do nothing and return.                                        
                } else if (params.endDate) {
                    // This means the user has scrolled past the end of the chart. The chart needs older data, if it's available.
                    // If you don't support pagination just return and do nothing.
                    // set moreAvailable to true or false if you know that more, older, data is available for when the user scrolls back in time.                    
                    shouldHaveMore = true;
                } else {
                    // The chart needs an initial load. params.tick tells you how many bars are needed to fill up the chart
                    // but you can return as many as you want. We recommend always returning at least 1,000 bars on initial load                    
                    // set moreAvailable to true or false if you know that more, older, data is available for when the user scrolls back in time.                    
                    shouldHaveMore = true;
                }

                function loadProductQuotes() {
                    //TODO introduce caching?
                    var paramsToController = {
                        ProductId: params.symbolObject.ProductId,
                        BarSize: params.period + ' ' + params.interval,
                        StartTime: params.startDate,
                        EndTime: params.endDate,
                        StrictNumBars: false
                    };

                    //ticks can be negative
                    if (params.ticks && params.ticks > 0) {
                        paramsToController.NumBars = Math.min(3 * params.ticks, 5000);
                    } else {
                        paramsToController.NumBars = 500;
                    }

                    // for barsize 1 minute, the initial load will already cover 3 months. 
                    if (paramsToController.BarSize === '1 minute' && !paramsToController.StartTime) {
                        paramsToController.StartTime = moment().subtract(3, 'months').startOf('day').format();
                    }

                    // for barsize 30 minute, the initial load will already cover 5 years
                    if (paramsToController.BarSize === '30 minute' && !paramsToController.StartTime) {
                        paramsToController.StartTime = moment().subtract(5, 'years').startOf('day').format();
                    }

                    var key = JSON.stringify(paramsToController);
                    var product_cache = pChartFilterDescriptionService.showUnadjusted ? window.product_cache_unadj : window.product_cache_adj;
                    if (key in product_cache) {
                        setTimeout(function () {
                            cb(product_cache[key]);
                            $rootScope.$broadcast('endFetchHistoricalData', params.symbolObject.ProductId);
                        }, 0);
                        return;
                    }

                    $rootScope.$broadcast('beginFetchHistoricalData', params.symbolObject.ProductId, paramsToController);
                    var promise = $q.when();
                    if (pChartFilterDescriptionService.showUnadjusted) {
                        if (paramsToController.BarSize === "1 week") {
                            paramsToController.BarSize = "1 day";
                            promise = sProductHistoricalDataService.GetUnadjustedWeeklyHistoricalData(paramsToController);
                        } else {
                            promise = sProductHistoricalDataService.GetUnadjustedHistoricalData(paramsToController);
                        }
                    } else {
                        if (paramsToController.BarSize === "1 week") {
                            paramsToController.BarSize = "1 day";
                            promise = sProductHistoricalDataService.GetAdjustedWeeklyHistoricalData(paramsToController);
                        } else {
                            promise = sProductHistoricalDataService.GetAdjustedHistoricalData(paramsToController);
                        }
                    }

                    promise.then(function (res) {
                        if (res.data && res.data.length > 0) {
                            var newQuotes = [];
                            for (var i = 0; i < res.data.length; i++) {
                                var ts = res.data[i].Timestamp;
                                newQuotes[i] = {};
                                newQuotes[i].Date = paramsToController.BarSize === '1 day'
                                    ? ts.substring(0, ts.indexOf('T')) //moment(res.data[i].Timestamp).format('YYYY-MM-DD')
                                    : ts;
                                newQuotes[i].Open = res.data[i].Open;
                                newQuotes[i].High = res.data[i].High;
                                newQuotes[i].Low = res.data[i].Low;
                                newQuotes[i].Close = res.data[i].Close;
                                newQuotes[i].Volume = res.data[i].Volume;
                                newQuotes[i].Adj_Close = res.data[i].Close;
                                newQuotes[i].TradeVenueLoc = params.symbolObject.TradeVenueLoc;
                                newQuotes[i].Currency = params.symbolObject.Currency;
                            }
                            var moreAvailable = (shouldHaveMore || res.data.length === paramsToController.NumBars);
                            var cbParam = { quotes: newQuotes, moreAvailable: moreAvailable };
                            cb(cbParam);
                            product_cache[key] = cbParam;
                            $log.log("Market Data Loaded: " + params.symbolObject.Symbol + ". More available? "
                                + moreAvailable + ". Num ticks = " + paramsToController.NumBars + ". Params ticks = " +
                                params.ticks);
                        } else {
                            cb({ quotes: [], moreAvailable: false });
                        }
                    }, function (res) {
                        cb({ error: res.status });
                        return;
                    }).finally(function () {
                        $rootScope.$broadcast('endFetchHistoricalData', params.symbolObject.ProductId);
                    });
                }

                function loadFundamentals() {
                    //TODO introduce caching?
                    var productId = params.symbolObject.product.ProductId;
                    var fundamentalType = params.symbolObject.fundamental;

                    var key = JSON.stringify([productId, fundamentalType, params.startDate, params.endDate]);
                    var fundamental_cache = window.fundamental_cache;
                    if (key in fundamental_cache) {
                        setTimeout(function () {
                            cb(fundamental_cache[key]);
                        }, 0);
                        return;
                    }

                    var requestObj = {
                        ProductId: productId,
                        FundamentalType: fundamentalType,
                        StartDate: params.startDate,
                        EndDate: params.endDate
                    };

                    $rootScope.$broadcast('beginFetchHistoricalData', null);
                    return sDatamartFundamentalDataService.GetFundamentalsForPeriod(requestObj).then(function (res) {
                        if (res.data && res.data.length > 0) {
                            // for now, we only load single product - fundamental pair each time
                            var newData = res.data.map(function (d) {
                                var recordTimeInBrowserTimezone = d.Timestamp.substring(0, d.Timestamp.indexOf('T')); // moment(d.RecordTime).format('YYYY-MM-DD');                                
                                return {
                                    Date: recordTimeInBrowserTimezone,
                                    Close: d.Value
                                };
                            });
                            var cbParam = { quotes: newData, moreAvailable: newData.length > 0 };
                            cb(cbParam);
                            fundamental_cache[key] = cbParam;
                            $log.log("Loaded Fundamentals: " + params.symbolObject.product.Symbol +
                                " (" + params.startDate + " " + params.endDate + ") " + fundamentalType);
                        } else {
                            cb({ quotes: [], moreAvailable: false });
                        }
                    }).finally(function () {
                        $rootScope.$broadcast('endFetchHistoricalData', null);
                    });
                }

                if (params.symbolObject.fundamental) {
                    loadFundamentals();
                } else if (params.symbolObject.tgps) {
                    pChartTgpsService.loadTgpsData(params, cb);
                } else {
                    loadProductQuotes();
                }            
            };

            return STX.QuoteFeed.AlgoMarketDataFeed;
        }
    ]);