agmNgModuleWrapper('agmp.chart')

    .defineController('p.chart.SignalFilterController',
    ['pChartRenderingUtilsService',
        'pChartFilterDescriptionService',
        'pChartStrategyOrderService'],
        function (vm, dep, tool) {
            var pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                pChartStrategyOrderService = dep.pChartStrategyOrderService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService;

            var filterDescription = pChartFilterDescriptionService;
            tool.setVmProperties({
                tradeBackgroundColor: pChartStrategyOrderService.tradeBackgroundColor,
                mySubscriptions: [],
                filterDescription: filterDescription,
                allVisible: pChartStrategyOrderService.allVisible,
                pChartStrategyOrderService:pChartStrategyOrderService,
                strategyVisibility: pChartStrategyOrderService.strategyVisibility,
                onStrategyVisibilityChanged: pChartStrategyOrderService.onStrategyVisibilityChanged,
                pChartRenderingUtilsService: pChartRenderingUtilsService,
                onAllVisibilityChanged: pChartStrategyOrderService.onAllVisibilityChanged
            });





        })
    .defineDirectiveForE('agmp-chart-signal-filter', [], function () {
        return {
            controller: "p.chart.SignalFilterController",
            templateUrl: '/App/pages/chart/chart.signalFilter.html'
        };
    }, {

    });
