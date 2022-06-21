agmNgModuleWrapper('agmp.chart')
    .defineController('p.chart.TradePorfolioFilterController',
    ['pChartRenderingUtilsService',
        'pChartFilterDescriptionService',
        'pChartStrategyOrderService',
        'pChartEventVisibilityService'],
        function (vm, dep, tool) {
            var pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                pChartStrategyOrderService = dep.pChartStrategyOrderService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartEventVisibilityService = dep.pChartEventVisibilityService;
            var filterDescription = pChartFilterDescriptionService;
            tool.setVmProperties({
                tradeBackgroundColor: pChartStrategyOrderService.tradeBackgroundColor,
                pChartStrategyOrderService: pChartStrategyOrderService,
                filterDescription: filterDescription,
                allVisible: pChartStrategyOrderService.allVisible,
                onStrategyVisibilityChanged: pChartStrategyOrderService.onStrategyVisibilityChanged,
                strategyVisibility: pChartStrategyOrderService.strategyVisibility,
                pChartRenderingUtilsService: pChartRenderingUtilsService,
                onAllVisibilityChanged: pChartStrategyOrderService.onAllVisibilityChanged
            });

            tool.on('endFetchHistoricalData', function () {
                pChartEventVisibilityService.toggleEvent(pChartStrategyOrderService.tradesLabelKindBuy, true);
                pChartEventVisibilityService.toggleEvent(pChartStrategyOrderService.tradesLabelKindSell, true);
            });
        })
    .defineDirectiveForE('agmp-chart-trade-portfolio-filter', [], function () {
        return {
            controller: "p.chart.TradePorfolioFilterController",
            templateUrl: '/App/pages/chart/chart.tradePortfolioFilter.html'
        };
    }, {

    });
