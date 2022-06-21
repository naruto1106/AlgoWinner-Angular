agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.ZoomController",
        ['pChartRenderingUtilsService', 'pChartFilterDescriptionService'],
        function (vm, dep, tool) {
            var pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService;

            function zoomIn() {
                var stxx = pChartRenderingUtilsService.stxx;
                stxx.zoomIn();                
            }

            function zoomOut() {
                var stxx = pChartRenderingUtilsService.stxx;
                stxx.zoomOut();
            }

            function isPrimaryProductSelected() {
                return (pChartFilterDescriptionService.primaryProduct &&
                    pChartFilterDescriptionService.myProducts.length > 0);
            }

            tool.setVmProperties({
                isPrimaryProductSelected: isPrimaryProductSelected,
                zoomIn: zoomIn,
                zoomOut: zoomOut
            });
        }
    )
    .defineDirectiveForE('agmp-chart-zoom',
        [],
        function () {
            return {
                controller: "p.chart.ZoomController",
                templateUrl: '/App/pages/chart/chart.zoom.html'
            };
        },
        {
        });
