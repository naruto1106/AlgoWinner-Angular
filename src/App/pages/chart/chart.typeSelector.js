agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.TypeSelectorController",
        ['pChartService', 'pChartRenderingUtilsService', "pChartTgpsService", 'pChartFilterDescriptionService'],
        function (vm, dep, tool) {
            var pChartService = dep.pChartService,
                pChartTgpsService = dep.pChartTgpsService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                filterDescription = dep.pChartFilterDescriptionService;

            function setChartType(chartType) {
                pChartRenderingUtilsService.stxx.setChartType(chartType.StxxType);
                if (filterDescription.isComparisonMode()) {
                    filterDescription.chartTypeDuringComparisonMode = chartType.StxxType;
                }
            }

            function getTypeSelectorSvg() {
                return pChartService.getChartType(pChartRenderingUtilsService.stxx.layout.chartType).Src;
            }

            function getTypeSelectorClass() {
                return { 'tgps-mode': pChartTgpsService.tradersGPSInPositionMode() };
            }

            function getChartTypes() {
                return pChartService.chartTypes;
            }

            tool.setVmProperties({
                getTypeSelectorSvg: getTypeSelectorSvg,
                getTypeSelectorClass: getTypeSelectorClass,
                getChartTypes: getChartTypes,
                setChartType: setChartType
            });

            tool.initialize(function () {
                pChartRenderingUtilsService.stxx.setChartType(pChartService.getChartType(pChartRenderingUtilsService.stxx.layout.chartType).StxxType);
            });
        }
    )
    .defineDirectiveForE('agmp-chart-type-selector',
        [],
        function () {
            return {
                controller: "p.chart.TypeSelectorController",
                templateUrl: '/App/pages/chart/chart.typeSelector.html'
            };
        },
        {});
