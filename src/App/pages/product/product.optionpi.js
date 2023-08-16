agmNgModuleWrapper('agmp.product')
    .defineController('p.product.MainController', ['commonHeaderModeService', 'commonScreenResizerService', 'pProductPageService', 'sProductService', 'symbol', 'venue',
        'sDroidHelperSbsFrameworkService','$anchorScroll', '$location'],
        function (vm, dep, tool) {
            var pProductPageService = dep.pProductPageService,
                sDroidHelperSbsFrameworkService = dep.sDroidHelperSbsFrameworkService;
                $location = dep.$location,
                $anchorScroll = dep.$anchorScroll;
                Duplicate_location = $location.$$absUrl;

                // console.log($location,'location');
            function hasHeader() {
                return pProductPageService.hasHeader;
            }

            function showRelatedCompanies() {
                return pProductPageService.showRelatedCompanies();
            }

            function isLoading() {
                return pProductPageService.isLoading;
            }

            function isWarrants() {
                return pProductPageService.isWarrants;
            }

            function showErrorMessage() {
                return false;
            }

            function gotoSection(sectionId) {
                $location.hash(sectionId);
                $anchorScroll();
            }
            function Duplicate_hidden(){
                value =Duplicate_location.search('optionpi#/product/US/') ;
                if( value > 0){
                    return false;
                } else{
                    return true;
                }
            }

            console.log("initialize-first");
            const url = window.location.href;
            const token_pos = url.search('data=');
            if(token_pos>0){
                const token = url.slice(token_pos + 5);
                localStorage.setItem('token', token);
                console.log(token,'new-token1245')
                 var urlWithoutParameters = url.split('?')[0];
                if (url != urlWithoutParameters) {
                    window.location.href = urlWithoutParameters;
                }
                console.log("initial-third");
            }
            console.log("initialize-second");
            
            function addToWatchlist() {
                tool.openModalByDefinition('s.watchlist.AddProductPopupController', {
                    product: pProductPageService.currentProduct
                }).result.then(function () {
                });
            }

            tool.setVmProperties({
                showErrorMessage: showErrorMessage,
                hasHeader: hasHeader,
                showRelatedCompanies: showRelatedCompanies,
                isLoading: isLoading,
                isWarrants: isWarrants,
                gotoSection: gotoSection,
                addToWatchlist: addToWatchlist,
                Duplicate_hidden: Duplicate_hidden,
                symbol: dep.symbol
            });

            pProductPageService.loadProductWithParam(dep.venue, dep.symbol).then(function () {
                vm.TradeVenueLoc = pProductPageService.currentProduct.TradeVenueLoc;
                document.title = pProductPageService.currentProduct.ProductName + ' (' + vm.symbol + ') - ' + dep.venue + ' Product';
                vm.ProductName = pProductPageService.currentProduct.ProductName;
                vm.ProductIconUrl = pProductPageService.currentProduct.ProductIconURL;
            });

            sDroidHelperSbsFrameworkService.defineFlow('ProductPage')
                .havingStep('1', function (flowControl) {
                    flowControl.highlightAndCommentItems([
                        {
                            itemId: 'productPage.sidebarMenuoptionpi',
                            cssClassForBox: '    '
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
