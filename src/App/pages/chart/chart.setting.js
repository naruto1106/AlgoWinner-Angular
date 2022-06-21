agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.SettingController",
        ['pChartService', 'pChartFilterDescriptionService', 'pChartRenderingUtilsService', "sChartNormalizationService",
            'pChartThemeService', 'pChartTgpsService', 'pChartFundamentalHelperService', 'pChartProductLoaderService'],
        function (vm, dep, tool) {
            var pChartService = dep.pChartService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                filterDescription = dep.pChartFilterDescriptionService,
                pChartThemeService = dep.pChartThemeService,
                sChartNormalizationService = dep.sChartNormalizationService,
                pChartTgpsService = dep.pChartTgpsService,
                pChartFundamentalHelperService = dep.pChartFundamentalHelperService,
                pChartProductLoaderService = dep.pChartProductLoaderService;
            
            function hasAlgoChartBundle() {
                return pChartService.hasAlgoChartBundle;
            }

            function hasAlgoChartDarkTheme() {
                return pChartService.hasAlgoChartDarkTheme;
            }

            function isVerticalMoveEnabled() {
                return pChartRenderingUtilsService.enableVerticalMove;
            }

            function getDefaultTheme() {
                return pChartThemeService.getDefaultTheme();
            }

            function isNormalizedToPercentage() {
                return filterDescription.normalizeToPercentage;
            }

            function showLegendsOnChart() {
                return filterDescription.showLegendsOnChart;
            }

            function toggleFreeYAxis() {
                pChartRenderingUtilsService.enableVerticalMove = !pChartRenderingUtilsService.enableVerticalMove;
                if (!pChartRenderingUtilsService.enableVerticalMove) {
                    pChartRenderingUtilsService.stxx.chart.yAxis.scroll = 0;
                    pChartRenderingUtilsService.stxx.chart.yAxis.initialMarginTop = pChartRenderingUtilsService.standardPanelMargin.top;
                    pChartRenderingUtilsService.stxx.chart.yAxis.initialMarginBottom = pChartRenderingUtilsService.standardPanelMargin.bottom;
                    pChartRenderingUtilsService.stxx.draw();
                }
            }

            function toggleNormalization() {
                sChartNormalizationService.setNormalization(!filterDescription.normalizeToPercentage);
                setTimeout(function () {
                    if (pChartTgpsService.tradersGpsMode) {
                        if (pChartTgpsService.tradersGPSInPositionMode()) {
                            pChartService.chartType = pChartService.chartTypes.filter(function (i) {
                                return i.StxxType === 'candle';
                            })[0];
                        }

                        var includedProducts = filterDescription.getIncludedProducts();
                        includedProducts.forEach(function (i) {
                            if (i.ProductId !== filterDescription.primaryProduct.ProductId) {
                                pChartProductLoaderService.removeFromProducts(i);
                            }
                        });
                        filterDescription.productFundamentals.forEach(function (i) {
                            i.included = i.product.ProductId == filterDescription.primaryProduct.ProductId;
                        });
                        pChartFundamentalHelperService.renderAllFundamentals();
                        filterDescription.productFundamentals = filterDescription.productFundamentals.filter(function (i) {
                            return i.included;
                        });
                    }
                    pChartRenderingUtilsService.refreshChart().then(function () {
                        pChartFundamentalHelperService.renderAllFundamentals();
                        pChartTgpsService.tradersGPSChanged();
                    });
                }, 20);
            }

            function toggleDataLabel() {
                filterDescription.showLegendsOnChart = !filterDescription.showLegendsOnChart;
            }

            function changeTheme(themeName) {
                pChartThemeService.setCurrentTheme(pChartRenderingUtilsService.stxx, themeName);
                pChartTgpsService.tradersGPSPositionStudies.togglePeakLineColor();
                pChartTgpsService.tradersGPSPlusStudies.togglePeakLineColor();
                pChartThemeService.setDefaultTheme(themeName);

                vm.isThemeSettingOpen = false;
            }

            tool.setVmProperties({
                hasAlgoChartBundle: hasAlgoChartBundle,
                hasAlgoChartDarkTheme: hasAlgoChartDarkTheme,
                isVerticalMoveEnabled: isVerticalMoveEnabled,
                isNormalizedToPercentage: isNormalizedToPercentage,
                showLegendsOnChart: showLegendsOnChart,
                getDefaultTheme: getDefaultTheme,
                toggleFreeYAxis: toggleFreeYAxis,
                toggleNormalization: toggleNormalization,
                changeTheme: changeTheme,
                toggleDataLabel: toggleDataLabel
            });
        }
    )
    .defineDirectiveForE('agmp-chart-setting',
        [],
        function () {
            return {
                controller: "p.chart.SettingController",
                templateUrl: '/App/pages/chart/chart.setting.html'
            };
        },
        {
        });