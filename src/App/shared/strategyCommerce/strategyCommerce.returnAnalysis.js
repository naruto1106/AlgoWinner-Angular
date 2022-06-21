agmNgModuleWrapper('agms.strategyCommerce')
    .defineController('s.strategyCommerce.ReturnAnalysisController', ['sStrategyCommercePerformanceService', 'sProductService', 'commonHighchartsHelperService', '$filter'],
        function(vm, dep, tool) {
            var $scope = dep.$scope;
            var coreUserStateService = dep.coreUserStateService;
            var sStrategyCommercePerformanceService = dep.sStrategyCommercePerformanceService;
            var sProductService = dep.sProductService;
            var commonHighchartsHelperService = dep.commonHighchartsHelperService;
            var getBenchmarkReturnDataPromise = null;

            tool.onRendered(function() {
                $(dep.$window).resize();
            });

            vm.selectedBenchmark = null;
            vm.benchmarkSelections = null;
            vm.onBenchmarkChanged = onBenchmarkChanged;
            vm.benchmarkData = null;
            vm.sufficientData = false;
            coreUserStateService.userInfoLoaded.then(function() {
                vm.userId = coreUserStateService.user.UserId;
            });

            vm.isBenchmarkLoading = false;

            function init() {
                return sProductService.GetBenchmarkProducts()
                    .then(function (res) {
                        vm.benchmarkSelections = res.data;

                        vm.selectedBenchmark = vm.benchmarkSelections.filter(function (benchmark) {
                            return benchmark.TradeVenueLoc === vm.myItem.StrategyVenue;
                        })[0];
                    }, function () {
                        tool.logError('Failed to get benchmark data for ' + vm.selectedBenchmark);
                        return tool.reject();
                    });
            }

            var itemSetDeferred = tool.defer();
            tool.watch('vm.myItem', function(newVal, oldVal) {
                if (!vm.myItem) {
                    return;
                }
                tool.timeout(function() {
                    $(dep.$window).resize();
                });
                if (!vm.myItem.TimeSeriesInfo.TimeSeries || vm.myItem.TimeSeriesInfo.TimeSeries.length <= 1) {
                    vm.sufficientData = false;
                } else {
                    vm.sufficientData = true;
                }

                coreUserStateService.userInfoLoaded.then(function(res) {
                    vm.userId = coreUserStateService.user.UserId;
                    vm.chartConfig.series[1].name = vm.myItem.SubscriptionId ? "Subscription" : dep.$filter('strategyOrTradePortfolio')(vm.myItem, vm.userId);
                    var data = [];
                    if (vm.sufficientData) {
                        vm.myItem.TimeSeriesInfo.TimeSeries.forEach(function(r) {
                            data.push([moment(r.Timestamp).valueOf(), +(r.Value * 100).toFixed(2)]);
                        });
                    }

                    vm.chartConfig.series[1].data = data;

                    // it's ok to resolve promise multiple times. subsequent ones are no-op
                    itemSetDeferred.resolve();
                    init().then(onBenchmarkChanged);
                });

            });

            vm.chartConfig = {
                options: {
                    navigator: {
                        enabled: true
                    },
                    rangeSelector: {
                        enabled: true,
                        selected: 5
                    },
                    legend: {
                        enabled: true
                    },
                    lang: {
                        invalidDate: '00:00:00'
                    }
                },
                chart: { type: 'line' },
                title: { text: 'Comparison with Benchmark' },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: '% Return'
                    }
                },

                series: [
                    {
                        id: 0,
                        name: 'Benchmark',
                        data: [],
                        tooltip: {
                            enabled: true,
                            valueSuffix: '%',
                            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f}</b><br/>'
                        }
                    }, {
                        id: 1,
                        name: 'Strategy',
                        data: [],
                        tooltip: {
                            enabled: true,
                            valueSuffix: '%',
                            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f}</b><br/>'
                        }
                    }
                ],
                useHighStocks: true
            };

            commonHighchartsHelperService.blockRangeSelectorInputMouseEvent(vm.chartConfig);
            $scope.$on('forceChartRedraw', function() {
                commonHighchartsHelperService.forceRedraw(vm.chartConfig);
            });

            function setReturnValue() {
                vm.returnValue = [];

                if (vm.myItem.Profitability.LatestAnnualReturnPct != null) {
                    vm.returnValue = [
                        {
                            Name: "1 MONTH",
                            Value: vm.myItem.Profitability.LatestMonthlyReturnPct,
                            Benchmark: vm.benchmarkData.Profitability.LatestMonthlyReturnPct
                        }, {
                            Name: "3 MONTHS",
                            Value: vm.myItem.Profitability.LatestQuarterlyReturnPct,
                            Benchmark: vm.benchmarkData.Profitability.LatestQuarterlyReturnPct
                        }, {
                            Name: "6 MONTHS",
                            Value: vm.myItem.Profitability.LatestSemiAnnualReturnPct,
                            Benchmark: vm.benchmarkData.Profitability.LatestSemiAnnualReturnPct
                        }, {
                            Name: "1 YEAR",
                            Value: vm.myItem.Profitability.LatestAnnualReturnPct,
                            Benchmark: vm.benchmarkData.Profitability.LatestAnnualReturnPct
                        }
                    ];
                } else if (vm.myItem.Profitability.LatestSemiAnnualReturnPct != null) {
                    vm.returnValue = [
                        {
                            Name: "2 WEEKS",
                            Value: vm.myItem.Profitability.LatestTwoWeekReturnPct,
                            Benchmark: vm.benchmarkData.Profitability.LatestTwoWeekReturnPct
                        }, {
                            Name: "1 MONTH",
                            Value: vm.myItem.Profitability.LatestMonthlyReturnPct,
                            Benchmark: vm.benchmarkData.Profitability.LatestMonthlyReturnPct
                        }, {
                            Name: "3 MONTHS",
                            Value: vm.myItem.Profitability.LatestQuarterlyReturnPct,
                            Benchmark: vm.benchmarkData.Profitability.LatestQuarterlyReturnPct
                        }, {
                            Name: "6 MONTHS",
                            Value: vm.myItem.Profitability.LatestSemiAnnualReturnPct,
                            Benchmark: vm.benchmarkData.Profitability.LatestSemiAnnualReturnPct
                        }
                    ];
                } else {
                    vm.returnValue = [
                        {
                            Name: "1 WEEK",
                            Value: vm.myItem.Profitability.LatestWeeklyReturnPct,
                            Benchmark: vm.benchmarkData.Profitability.LatestWeeklyReturnPct
                        }, {
                            Name: "2 WEEKS",
                            Value: vm.myItem.Profitability.LatestTwoWeekReturnPct,
                            Benchmark: vm.benchmarkData.Profitability.LatestTwoWeekReturnPct
                        }, {
                            Name: "1 MONTH",
                            Value: vm.myItem.Profitability.LatestMonthlyReturnPct,
                            Benchmark: vm.benchmarkData.Profitability.LatestMonthlyReturnPct
                        }, {
                            Name: "3 MONTHS",
                            Value: vm.myItem.Profitability.LatestQuarterlyReturnPct,
                            Benchmark: vm.benchmarkData.Profitability.LatestQuarterlyReturnPct
                        }
                    ];
                }
            }

            function onBenchmarkChanged() {
                if (!vm.selectedBenchmark) {
                    return;
                }

                vm.benchmarkData = {};
                if (getCreatedDate() != null) {
                    vm.isBenchmarkLoading = true;
                    if (getBenchmarkReturnDataPromise) {
                        getBenchmarkReturnDataPromise.cancel();
                    }
                    getBenchmarkReturnDataPromise = sStrategyCommercePerformanceService.GetBenchmarkReturnData(vm.selectedBenchmark.ProductId, getCreatedDate());
                    getBenchmarkReturnDataPromise.then(function(res) {
                            vm.benchmarkData = res.data;
                            setReturnValue();
                            var data = [];
                            vm.benchmarkData.TimeSeriesInfo.TimeSeries.forEach(function(r) {
                                if (r.Timestamp >= moment.utc(moment(getCreatedDateForChart()).startOf('day')).format()) {
                                    var valueToPush = [moment(r.Timestamp).valueOf(), +(r.Value * 100).toFixed(2)];
                                    data.push(valueToPush);
                                }
                            });
                            vm.chartConfig.series[0].data = data;
                            var chart = vm.chartConfig.getHighcharts();
                            if (chart != null) {
                                if (!chart.rangeSelector.buttons[5].state || chart.rangeSelector.buttons[5].state !== 2) {
                                    chart.rangeSelector.clickButton(5, chart.rangeSelector.buttonOptions[5], true);
                                    chart.rangeSelector.buttons[5].setState(2);
                                    chart.redraw();
                                }
                            }
                        }, function(res) {
                            tool.logError('Failed to get benchmark data for ' + vm.selectedBenchmark);
                        }).finally(function() {
                            vm.isBenchmarkLoading = false;
                        });
                }
            }

            function getCreatedDate() {
                if (vm.myItem.SubscriptionId) {
                    return (vm.myItem.TimeSeriesInfo.TimeSeries && vm.myItem.TimeSeriesInfo.TimeSeries[0]) ? vm.myItem.TimeSeriesInfo.TimeSeries[0].Timestamp : null;
                } else {
                    return vm.myItem.CreatedDate;
                }
            }

            function getCreatedDateForChart() {
                if (vm.myItem.SubscriptionId) {
                    return (vm.myItem.TimeSeriesInfo.TimeSeries && vm.myItem.TimeSeriesInfo.TimeSeries[0]) ? vm.myItem.TimeSeriesInfo.TimeSeries[0].Timestamp : null;
                } else {
                    return vm.myItem.CreatedDate;
                }
            }

            itemSetDeferred.promise.then(init);
        })
    .defineDirectiveForE('agms-strategy-commerce-return-analysis', [],
        function() {
            return {
                restrict: 'E',
                replace: true,
                controller: "s.strategyCommerce.ReturnAnalysisController",
                templateUrl: '/App/shared/strategyCommerce/strategyCommerce.returnAnalysis.html'
            };
        },
        {
            myItem: "="
        });