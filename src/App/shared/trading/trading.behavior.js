agmNgModuleWrapper('agms.trading')
    .defineController('s.trading.BehaviorController', ['sStrategyCommercePerformanceService', 'sProductSelectionService', 'commonHighchartsHelperService'],
        function (vm, dep, tool) {
            var sStrategyCommercePerformanceService = dep.sStrategyCommercePerformanceService;
            var sProductSelectionService = dep.sProductSelectionService;
            var commonHighchartsHelperService = dep.commonHighchartsHelperService;
            var coreUserStateService = dep.coreUserStateService;

            coreUserStateService.userInfoLoaded.then(function () {
                vm.userId = coreUserStateService.user.UserId;
            });

            vm.selectedParam = null;
            vm.selectedParamData = [];
            vm.isLoadingData = false;
            vm.onParameterChange = onParameterChange;
            vm.shouldDisplayData = shouldDisplayData;
            vm.showTurnover = showTurnover;
            vm.chartConfig = {
                options: {
                    navigator: {
                        enabled: true
                    },
                    rangeSelector: {
                        enabled: true,
                        inputStyle: {
                            'pointer-events': 'none'
                        }
                    },
                    tooltip:
                    {
                        dateTimeLabelFormats: {
                            millisecond: "%A, %b %e, %Y",
                            second: "%A, %b %e, %Y",
                            minute: "%A, %b %e, %Y",
                            hour: "%A, %b %e, %Y",
                            day: "%A, %b %e, %Y",
                            week: "Week from %A, %b %e, %Y",
                            month: "%B %Y",
                            year: "%Y"
                        },
                        pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:.2f}</b><br/>'
                    }
                },
                chart: { type: 'line' },
                title: { text: '' },
                xAxis: {
                    type: 'datetime',

                },

                useHighStocks: true,
                series: [
                    {
                        id: 0,
                        name: 'Performance',
                        data: []
                    }
                ]
            };
            var handlers = [
                sStrategyCommercePerformanceService.GetWinningPercentageBehavior,
                sStrategyCommercePerformanceService.GetTotalNumberOfTrades,
                sStrategyCommercePerformanceService.GetNumberOfPositionsHeld,
                sStrategyCommercePerformanceService.GetProfitFactor,
                sStrategyCommercePerformanceService.GetAverageProfitPerTrade,
                sStrategyCommercePerformanceService.GetAverageLossPerTrade
            ];

            commonHighchartsHelperService.blockRangeSelectorInputMouseEvent(vm.chartConfig);
            tool.on('forceChartRedraw', function () {
                commonHighchartsHelperService.forceRedraw(vm.chartConfig);
            });


            tool.watch('vm.myItem', function () {
                if (!vm.myItem) {
                    return;
                }
                tool.timeout(function () {
                    $(dep.$window).resize();
                });
                var dollarValue = 'S$';
                vm.sProductSelectionServices = sProductSelectionService.getParamStrings(dollarValue);
                if (!vm.selectedParam) {
                    vm.selectedParam = vm.sProductSelectionServices[0];
                }
                onParameterChange();
            });

            function showTurnover() {
                return vm.myItem && (!vm.myItem.SubscriptionId || vm.myItem.SubscriptionTier === 'Premium') && !vm.hideTurnover;
            }

            function isMeaningful(value) {
                return value !== null && value !== 0 && value !== undefined;
            }

            function shouldDisplayData() {
                if (!vm.selectedParamData || vm.selectedParamData.length < 3) {
                    return false;
                }

                var values = _.map(vm.selectedParamData, 'Value');
                for (var start = 0; start < values.length; start++) {
                    var threeRunningValues = _.slice(values, start, start + 3);
                    var meaningfulValues = _.filter(threeRunningValues, isMeaningful);
                    if (meaningfulValues.length === 3) {
                        return true;
                    }
                }
                return false;
            }

            function onParameterChange() {
                vm.isLoadingData = true;
                vm.selectedParamData = [];
                var strategyPerformancePromise;
                var idx = vm.sProductSelectionServices.indexOf(vm.selectedParam);
                if (idx >= 0) {
                    strategyPerformancePromise = sProductSelectionService.onParameterChange(idx, handlers, vm.myItem.DisplayInfo.BasicInfo.StrategyId);
                    vm.chartConfig.title.text = vm.selectedParam;
                    vm.chartConfig.series[0].name = vm.selectedParam;
                }
                if (strategyPerformancePromise) {
                    strategyPerformancePromise.then(function (res) {
                        vm.selectedParamData = res.data;
                        var data = [];
                        if (idx === 0) {
                            vm.selectedParamData.forEach(function (r) {
                                var valueToPush = [moment(r.Timestamp).valueOf(), r.Value * 100];
                                data.push(valueToPush);
                            });
                            vm.chartConfig.options.tooltip.valueDecimals = 2;
                            vm.chartConfig.options.tooltip.valueSuffix = "%";
                        } else if (idx === 7 || idx === 9) {
                            vm.selectedParamData.forEach(function (r) {
                                var valueToPush = [moment(r.Timestamp).valueOf(), Math.abs(r.Value)];
                                data.push(valueToPush);
                            });
                            vm.chartConfig.options.tooltip.valueDecimals = null;
                            vm.chartConfig.options.tooltip.valueSuffix = "";
                        } else {
                            vm.selectedParamData.forEach(function (r) {
                                var valueToPush = [moment(r.Timestamp).valueOf(), r.Value];
                                data.push(valueToPush);
                            });
                            vm.chartConfig.options.tooltip.valueDecimals = null;
                            vm.chartConfig.options.tooltip.valueSuffix = "";
                        }
                        vm.chartConfig.series[0].data = data;

                        vm.isLoadingData = false;
                    }, function (res) {
                        vm.isLoadingData = false;
                        tool.logError('Failed to get product data for ');
                    });
                }
            }
        }
    )
    .defineDirectiveForE('agms-trading-behavior', [],
        function () {
            return {
                controller: "s.trading.BehaviorController",
                templateUrl: '/App/shared/trading/trading.behavior.html'
            };
        },
        {
            myItem: '=',
            category: '=',
            hideTurnover: "=?"
        });