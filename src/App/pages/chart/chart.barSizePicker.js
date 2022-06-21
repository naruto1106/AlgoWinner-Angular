agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.BarSizePickerController",
        ['pChartRenderingUtilsService', 'pChartTgpsService', 'pChartFilterDescriptionService', "coreDataStorageService", 'pChartThemeService'],
        function (vm, dep, tool) {
            var pChartTgpsService = dep.pChartTgpsService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                pChartThemeService = dep.pChartThemeService,
                coreDataStorageService = dep.coreDataStorageService;

            var filterDescription = pChartFilterDescriptionService;
            var tradersgpsBarSizes = [{ "Name": '1 Day', "Val": "1 D" }, { "Name": '1 Week', "Val": "1 W" }];

            pChartRenderingUtilsService.registerOnChartCreatedCallback("adjustScrollArea",
                function (stxx) {
                    if (pChartTgpsService.tradersGpsMode) {
                        stxx.setCandleWidth(5.0);
                    } else {
                        stxx.setCandleWidth(5.0);
                    }

                    stxx.chart.scroll = Math.floor((stxx.chart.width - 200) / stxx.layout.candleWidth);
                    stxx.draw();
                });

            function setBarSize(size) {
                vm.selectedBarSize = size.Val;
                pChartRenderingUtilsService.setBarSize(size.Val);
            }

            function isTgpsInPositionMode() {
                return pChartTgpsService.tradersGPSInPositionMode();
            }

            tool.setVmProperties({
                isTgpsInPositionMode: isTgpsInPositionMode,
                setBarSize: setBarSize,
                filterDescription: filterDescription,
                getBarSizes: function () {
                    if (pChartTgpsService.tradersGpsMode) {
                        if (filterDescription.barSize !== tradersgpsBarSizes[0].Val && filterDescription.barSize !== tradersgpsBarSizes[1].Val) {
                            setBarSize(tradersgpsBarSizes[0]);
                        }
                        return tradersgpsBarSizes;
                    } else {
                        return vm.barSizes;
                    }
                }
            });

            tool.initialize(function () {
                vm.barSizes = [
                    {
                        Val: "1 D",
                        Name: "1 Day"
                    }, {
                        Val: "1 W",
                        Name: "1 Week"
                    }, {
                        Val: "1 M",
                        Name: "1 Month"
                    }];

                dep.coreUserStateService.userInfoLoaded.then(function () {
                    var defaultSettings;
                    var serializedContent = coreDataStorageService.get("my-chart-settings" + dep.coreUserStateService.user.UserId);
                    if (serializedContent) {
                        defaultSettings = angular.fromJson(serializedContent);
                    } else {
                        var theme = pChartThemeService.getDefaultTheme();
                        var mySettings = {
                            barSize: "1 D",
                            tgps: "Off",
                            chartType: {
                                Name: "Bar Chart",
                                Src: '/App/assets/icons/chart/barchart.svg',
                                StxxType: 'colored_bar'
                            },
                            theme: theme,
                            dragVertically: false,
                            //normalizeY: false,
                            showDrawing: false,
                            showLegendsOnChart: false
                        };

                        if (dep.coreConfigService.TradersGPS.Enabled) {
                            mySettings.tgps = "Position";
                            mySettings.chartType = {
                                Name: "Candlestick",
                                Src: '/App/assets/icons/chart/candlestick.svg',
                                StxxType: 'hollow_candle'
                            };
                        }

                        if (!theme) {
                            mySettings.theme = "Light";
                        }

                        defaultSettings = mySettings;
                    }
                    
                    vm.selectedBarSize = defaultSettings.barSize;
                    pChartRenderingUtilsService.setBarSize(defaultSettings.barSize);
                });

                tool.watch('vm.filterDescription.barSize', function () {
                    if (vm.filterDescription.barSize !== vm.selectedBarSize) {
                        vm.selectedBarSize = vm.filterDescription.barSize;
                    }
                });
            });
        }
    )
    .defineDirectiveForE('agmp-chart-bar-size-picker',
        [],
        function () {
            return {
                controller: "p.chart.BarSizePickerController",
                templateUrl: '/App/pages/chart/chart.barSizePicker.html'
            };
        },
        {
        });