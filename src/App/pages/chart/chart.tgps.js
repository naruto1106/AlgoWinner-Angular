agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.TgpsController",
        ['pChartRenderingUtilsService', 'pChartFilterDescriptionService',
            "pChartTgpsService", 'pChartFundamentalHelperService', 'pChartService', "coreUserStateService", 'pChartProductLoaderService'],
        function (vm, dep, tool) {
            var coreConfigService = dep.coreConfigService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                pChartTgpsService = dep.pChartTgpsService,
                pChartFundamentalHelperService = dep.pChartFundamentalHelperService,
                pChartService = dep.pChartService,
                coreUserStateService = dep.coreUserStateService,
                pChartProductLoaderService = dep.pChartProductLoaderService;

            var filterDescription = pChartFilterDescriptionService;

            function loadTradersGps() {
                tool.openModalByDefinition('s.tgps.MainPopupController', {
                    mode: vm.pChartTgpsService.tradersgps_swing.mode
                });
            }
            
            function loadRiskAnalyzer() {
                tool.openModalByDefinition('s.tgps.RiskAnalyzerController', {
                    mode: vm.pChartTgpsService.tradersgps_swing.mode,
                    mode: vm.pChartTgpsService.tradersgps_swing.mode,
                });
            }

            function toggleTradersGps() {
                if (filterDescription.myProducts.length > 0) {
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
                    pChartFundamentalHelperService.renderAllFundamentals(true);
                    pChartTgpsService.tradersGPSChanged();

                    if (pChartTgpsService.tradersGpsMode) {
                        pChartService.isStudyAccordionOpen = true;
                    }
                }
            }

            tool.setVmProperties({
                swingModeOptions: ["Position", "Swing"],
                coreConfigService: coreConfigService,
                filterDescription: filterDescription,
                pChartRenderingUtilsService: pChartRenderingUtilsService,
                pChartTgpsService: pChartTgpsService,
                toggleTradersGps: toggleTradersGps,
                loadTradersGps: loadTradersGps,
                loadRiskAnalyzer: loadRiskAnalyzer
            });
        })
    .defineDirectiveForE('agmp-chart-tgps',
        [],
        function () {
            return {
                controller: "p.chart.TgpsController",
                templateUrl: '/App/pages/chart/chart.tgps.html'
            };
        },
        {
        });