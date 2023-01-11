agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.GuppyController",
        ['pChartRenderingUtilsService', 'pChartFilterDescriptionService',
            "pChartGuppyService", 'pChartFundamentalHelperService', 'pChartService', "coreUserStateService", 'pChartProductLoaderService',
            'sChartService'],
        function (vm, dep, tool) {
            var coreConfigService = dep.coreConfigService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                pChartGuppyService = dep.pChartGuppyService,
                pChartFundamentalHelperService = dep.pChartFundamentalHelperService,
                pChartService = dep.pChartService,
                sChartService = dep.sChartService,
                coreUserStateService = dep.coreUserStateService,
                pChartProductLoaderService = dep.pChartProductLoaderService;
            var filterDescription = pChartFilterDescriptionService;
            
            function loadRiskAnalyzer() {
  
            }

            function toggleGuppy() {
                if (filterDescription.myProducts.length > 0) {
                    if (pChartGuppyService.guppyMode) {
                        pChartService.chartType = pChartService.chartTypes.filter(function (i) {
                            return i.ExtendedChartType === 'high_line';
                        })[0];
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
                    pChartGuppyService.guppyChanged();

                    if (pChartGuppyService.guppyMode) {
                        pChartService.isStudyAccordionOpen = true;
                    }
                }
            }

            function renderTrendLine(product) {
                sChartService.GetAlgoCoordinates(product.Symbol).then(function (res) {
                    pChartRenderingUtilsService.drawAlgoTrendline(res.data);
                });
            }

            tool.setVmProperties({
                coreConfigService: coreConfigService,
                filterDescription: filterDescription,
                pChartRenderingUtilsService: pChartRenderingUtilsService,
                pChartGuppyService: pChartGuppyService,
                toggleGuppy: toggleGuppy,
                loadRiskAnalyzer: loadRiskAnalyzer,
                renderTrendLine: renderTrendLine
            });
        })
    .defineDirectiveForE('agmp-chart-guppy',
        [],
        function () {
            return {
                controller: "p.chart.GuppyController",
                templateUrl: '/App/pages/chart/chart.guppy.html'
            };
        },
        {
        });