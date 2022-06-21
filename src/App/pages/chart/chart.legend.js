agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.LegendController",
        ['pChartFundamentalHelperService', 'pChartRenderingUtilsService', 'pChartFilterDescriptionService', 'pChartThemeService'],
        function (vm, dep, tool) {
            var coreNotificationService = dep.coreNotificationService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartFundamentalHelperService = dep.pChartFundamentalHelperService,
                pChartThemeService = dep.pChartThemeService;

            var filterDescription = pChartFilterDescriptionService;

            function getPrimaryColor() {
                return pChartRenderingUtilsService.stxx.getCanvasColor("stx_line_chart");
            }

            function isPrimaryProductInLineChart() {
                return pChartRenderingUtilsService.stxx.layout.chartType === "line";
            }

            function getRendererColor(pf) {
                if (pf.renderer.seriesParams) {
                    var seriesParams = pf.renderer.seriesParams.filter(function (u) {
                        return u.field === pf.legend;
                    })[0];
                    if (seriesParams) {
                        return seriesParams.color;
                    }
                }
            }

            function getProductRendererColor(product) {
                var productsRenderer = pChartRenderingUtilsService.stxx.chart.seriesRenderers.products;
                if (productsRenderer) {
                    var seriesParams = productsRenderer.seriesParams.filter(function (u) {
                        return u.field === product.Symbol;
                    })[0];
                    if (seriesParams) {
                        return seriesParams.color;
                    }
                }
            }

            function isPrimaryProductForFundamental(productFundamental) {
                return productFundamental.product.ProductId == filterDescription.primaryProduct.ProductId;
            }

            function removeProductFundamentalFromList(productFundamental) {

            }


            tool.setVmProperties({
                isPrimaryProductInLineChart: isPrimaryProductInLineChart,
                getPrimaryColor: getPrimaryColor,
                removeProductFundamentalFromList: removeProductFundamentalFromList,
                isPrimaryProductForFundamental: isPrimaryProductForFundamental,
                pChartRenderingUtilsService: pChartRenderingUtilsService,
                pChartThemeService: pChartThemeService,
                getRendererColor: getRendererColor,
                removeProductFromList: removeProductFromList,
                getProductRendererColor: getProductRendererColor,
                filterDescription: filterDescription,
                isBarSizeValid: isBarSizeValid,
                isEmptyList: isEmptyList,
                productFundamentalVisibilityChanged: productFundamentalVisibilityChanged,
                productVisibilityChanged: productVisibilityChanged,
                getLegendStyle: getLegendStyle,
                shouldShowFundamentalLabel: pChartFundamentalHelperService.shouldShowFundamentalLabel
            });

            function getLegendStyle() {
                var chartPanel = $$$(".stx-panel-chart");
                if (chartPanel) {
                    var topValue = parseInt(chartPanel.style.top);
                    return { top: topValue + 5, position: "relative" };
                }
                return { top: 20, position: "relative" };
            }

            function isEmptyList() {
                return !(vm.filterDescription.primaryProduct && vm.filterDescription.myProducts.length > 0);
            }

            function isBarSizeValid(pf) {
                return pChartFundamentalHelperService.checkBarSize(vm.filterDescription) &&
                    pChartFundamentalHelperService.checkCanIncludeNewFundamental(pf.fundamentalName, vm.filterDescription);
            }

            function productFundamentalVisibilityChanged() {
                pChartFundamentalHelperService.renderAllFundamentals();
            }

            function removeProductFromList(product) {
                product.included = false;
                tool.broadcast('onNonPrimaryProductVisibilityChanges');

                vm.filterDescription.myProducts = vm.filterDescription.myProducts.filter(function (p) {
                    return product != p;
                });
            }

            function productVisibilityChanged(product) {
                if (product && product.included) {
                    if (_.filter(vm.filterDescription.myProducts, function (o) { return o.included; }).length > 3) {
                        product.included = false;
                        coreNotificationService.notifyError("Number of Products Exceeded", "You can plot at most " + 3 + " products");
                        return;
                    }
                }

                tool.broadcast('onNonPrimaryProductVisibilityChanges');
            }
        }
    )
    .defineDirectiveForE('agmp-chart-legend',
        [],
        function () {
            return {
                controller: "p.chart.LegendController",
                templateUrl: '/App/pages/chart/chart.legend.html'
            };
        },
        {
            filterDescription: '=',
            displayedChartSelectedItemInfo: '='
        });