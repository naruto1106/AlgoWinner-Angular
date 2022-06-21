agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.YAxisLegendController",
    ['pChartRenderingUtilsService', 'pChartThemeService'],
        function (vm, dep, tool) {
            
            var pChartThemeService = dep.pChartThemeService;
            var pChartRenderingUtilsService = dep.pChartRenderingUtilsService;

            vm.legends = [];
            tool.on('onStxChartDrawn', syncLegends);
            
            function syncLegends() {
                vm.legends = [];
                var panels = pChartRenderingUtilsService.stxx.panels;
                for (var panelName in panels) {
                    var actualPanel = panels[panelName];
                    _.forEach(actualPanel.yaxisRHS,
                        function (yAxis) {
                            vm.legends.push({
                                top: yAxis.top,
                                left: yAxis.left,
                                text: yAxis.legend
                            });
                        });

                }
            }

            function getYAxisLegendClass() {
                return pChartThemeService.getCurrentTheme() == 'Dark' ? ['y-axis-dark'] : ['y-axis-light'];
            }

            tool.setVmProperties({
                getYAxisLegendClass: getYAxisLegendClass
            });
        })
    .defineDirectiveForE('agmp-chart-yaxis-legend',
        [],
        function () {
            return {
                controller: "p.chart.YAxisLegendController",
                templateUrl: '/App/pages/chart/chart.yAxisLegend.html'
            };
        },
        {});