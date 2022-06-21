agmNgModuleWrapper('agmp.product')
    .defineController('p.product.MainController', ['commonHeaderModeService', 'commonScreenResizerService', 'pProductPageService', 'sProductService', 'symbol', 'venue',
    'sDroidHelperSbsFrameworkService'],
        function (vm, dep, tool) {
            var pProductPageService = dep.pProductPageService,
                sDroidHelperSbsFrameworkService = dep.sDroidHelperSbsFrameworkService;

            function hasHeader() {
                return pProductPageService.hasHeader;
            }

            function showRelatedCompanies() {
                return pProductPageService.showRelatedCompanies();
            }

            function showErrorMessage() {
                return pProductPageService.showErrorMessage;
            }

            function isLoading() {
                return pProductPageService.isLoading;
            }

            function isWarrants() {
                return pProductPageService.isWarrants;
            }

            tool.setVmProperties({
                hasHeader: hasHeader,
                showRelatedCompanies: showRelatedCompanies,
                showErrorMessage: showErrorMessage,
                isLoading: isLoading,
                isWarrants: isWarrants,
                symbol: dep.symbol
            });

            pProductPageService.loadProductWithParam(dep.venue, dep.symbol).then(function() {
                document.title = pProductPageService.currentProduct.ProductName + ' (' + vm.symbol + ') - ' + dep.venue + ' Product';
            });

            sDroidHelperSbsFrameworkService.defineFlow('ProductPage')
                .havingStep('1', function (flowControl) {
                    flowControl.highlightAndCommentItems([
                        {
                            itemId: 'productPage.sidebarMenu',
                            cssClassForBox:'    '
                        }
                    ]);
                    //flowControl.putRobotAtLocation('100px', '200px');
                    flowControl.sayAndStartStep("Navigate to the relevant sections the chart", null, '2');
                })
                .havingStep('2', function (flowControl) {
                    flowControl.highlightAndCommentItems([
                        {
                            itemId: 'productPage.chartPanel.highChart'
                        }
                    ]);
                    flowControl.scrollToAnItem('productPage.chartPanel.highChart');
                    flowControl.sayAndStartStep("Mouseover for price information", null, '3');
                    /*tool.timeout(function() {
                        flowControl.sayAndStartStep("Mouseover for price information", null, '3');
                        flowControl.putRobotNextToItem('productPage.chartPanel.highChart', 'S');
                    }, 1000);*/

                })
                .havingStep('3', function (flowControl) {
                    flowControl.highlightAndCommentItems([
                        {
                            itemId: 'productPage.chartPanel.detailedChart'
                        }
                    ]);
                    flowControl.scrollToAnItem('productPage.chartPanel.detailedChart');
                    flowControl.sayAndStartStep("Advanced charting mode", null, '4');
                })
                .havingStep('4', function (flowControl) {
                    flowControl.highlightAndCommentItems([
                        {
                            itemId: 'productPage.eventPanel'
                        }
                    ]);
                    flowControl.scrollToAnItem('productPage.eventPanel');
                    flowControl.sayAndStartStep("Filter events related to the stock.", null, '5');
                })
                .havingStep('5', function (flowControl) {
                    flowControl.sayAndFinish("Finish this tour");
                });

            sDroidHelperSbsFrameworkService.setCurrentFlowName('ProductPage', '1');
        });