agmNgModuleWrapper('agmp.chart')
    .defineController('p.chart.CompareController',
    ['pChartFilterDescriptionService', 'pChartRenderingUtilsService', 'pChartTgpsService', 'pChartFundamentalHelperService', "sChartNormalizationService", 'pChartService',
        'pChartProductLoaderService'],
        function (vm, dep, tool) {
            var pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                sChartNormalizationService = dep.sChartNormalizationService;
            var pChartFilterDescriptionService = dep.pChartFilterDescriptionService;
            var pChartTgpsService = dep.pChartTgpsService;
            var pChartFundamentalHelperService = dep.pChartFundamentalHelperService;
            var filterDescription = pChartFilterDescriptionService;
            var pChartService = dep.pChartService;
            var pChartProductLoaderService = dep.pChartProductLoaderService;

            tool.inheritVmController('p.chart.SecurityControllerBase');

            tool.setVmProperties({
                showCompare: showCompare,
                openComparePanel: openComparePanel,
                isComparisonMode: isComparisonMode,
                cancelComparisonMode: cancelComparisonMode
            });

            function showCompare() {
                return filterDescription.primaryProduct && !pChartTgpsService.tradersGpsMode;
            }

            function cancelComparisonMode() {
                filterDescription.myProducts.forEach(function (p) {
                    if (p.ProductId === filterDescription.primaryProduct.ProductId) {
                        return;
                    }
                    vm.removeFromProducts(p);
                });
                filterDescription.primaryProduct.included = true;

                filterDescription.advanced = null;

                //turn off normalize Y axis
                if (filterDescription.normalizeToPercentage) {
                    sChartNormalizationService.setNormalization(!filterDescription.normalizeToPercentage);                    
                }

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

                if (!filterDescription.isComparisonMode() &&
                    filterDescription.chartTypeBeforeComparison &&
                    !filterDescription.chartTypeDuringComparisonMode) {
                    pChartRenderingUtilsService.stxx.setChartType(filterDescription.chartTypeBeforeComparison);
                }
            }
            function isComparisonMode() {
                return filterDescription.isComparisonMode();
            }

            function openComparePanel() {
                tool.openModalByDefinition('p.chart.ComparePanelController');
            }
        })
    .defineDirectiveForE('agmp-chart-compare', [], function () {
        return {
            templateUrl: '/App/pages/chart/chart.compare.html',
            controller: 'p.chart.CompareController'
        }
    }, {

    });