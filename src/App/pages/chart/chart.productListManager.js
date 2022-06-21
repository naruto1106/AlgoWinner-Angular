
agmNgModuleWrapper('agmp.chart')
    .defineService('pChartProductSearchLocatorService',
    [],
    function (serviceObj, dep, tool) {
        tool.setServiceObjectProperties({
            getCurrentOffset: getCurrentOffset,
            initializeProductListManager: initializeProductListManager
        });

        function getCurrentOffset() {
            return $(serviceObj.element).offset();
        }

        function initializeProductListManager(element) {
            serviceObj.element = element;
        }
    })
    .defineController('p.chart.ProductListManagerController',
        ['pChartProductLoaderService', 'pChartProductSearchLocatorService', 'pChartFilterDescriptionService'],
        function (vm, dep, tool) {
            var pChartProductSearchLocatorService = dep.pChartProductSearchLocatorService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService;
            var filterDescription = pChartFilterDescriptionService;

            tool.inheritVmController('p.chart.SecurityControllerBase');

            var elementInputQuery = null;

            tool.onRendered(function () {
                elementInputQuery = $(vm._getDirectiveElement()).find('.search-product > input');
                pChartProductSearchLocatorService.initializeProductListManager(elementInputQuery);
            });


            function unfocusField() {
                if (vm.temporaryList && vm.temporaryList.length == 1) {
                    vm.selectedProduct = vm.temporaryList[0];
                    onItemSelected()
                }
            }
            function onItemSelected() {
                vm.temporaryList = [];
                vm.setPrimaryProduct(vm.selectedProduct);
            }


            tool.setVmProperties({
                unfocusField: unfocusField,
                onItemSelected: onItemSelected
            });
            
            tool.initialize(function () {
                tool.on('onPrimaryProductChanged', function (e, product) {
                    vm.selectedProduct = null;//filterDescription.primaryProduct;
                    $(document).ready(function () {
                        if (filterDescription.primaryProduct) {
                            document.title = filterDescription.primaryProduct.ProductName + " (" +
                                filterDescription.primaryProduct.Symbol + ") - " +
                                filterDescription.primaryProduct.TradeVenueLoc + " Chart";
                        }
                    });
                });
            });
        }
    )
    .defineController('p.chart.ProductFirstDialogController',
        ['pChartProductLoaderService', 'pChartProductSearchLocatorService', 'pChartFilterDescriptionService'],
        function (vm, dep, tool) {
            var pChartProductSearchLocatorService = dep.pChartProductSearchLocatorService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService;

            var filterDescription = pChartFilterDescriptionService;

            function shrink() {
                var deferred = tool.defer();
                tool.onRendered(function () {
                    var element = vm._getDirectiveElement();
                    $(element).addClass('transition-fast');
                    function adjustOffset() {
                        var offset = pChartProductSearchLocatorService.getCurrentOffset();
                        console.log(offset);
                        $(element).offset(offset);
                    }
                    adjustOffset();
                    window.setTimeout(function () {
                        $(element).addClass('shrunk');
                    }, 250);
                    window.setTimeout(function() {
                        deferred.resolve();
                    }, 500);

                });
                return deferred.promise;
            }
            function hideImmediately() {
                tool.onRendered(function() {
                    var element = vm._getDirectiveElement();
                    $(element).addClass('hidden');
                });
            }
            tool.inheritVmController('p.chart.SecurityControllerBase');
            function onItemSelected() {
                shrink().then(function () {
                    vm.setPrimaryProduct(vm.selectedProduct);
                });
            }
            tool.initialize(function () {
                tool.on('onPrimaryProductChanged', function (e, product) {
                    hideImmediately();
                });
            });

            tool.setVmProperties({
                filterDescription: filterDescription,
                onItemSelected: onItemSelected
            });
        })
    .defineDirectiveForE('agmp-chart-product-list-manager', [],
        function () {
            return {
                controller: "p.chart.ProductListManagerController",
                templateUrl: '/App/pages/chart/chart.productListManager.html'
            };
        }, {

        })
    .defineDirectiveForE('agmp-chart-product-first-dialog', [],
        function () {
            return {
                controller: "p.chart.ProductFirstDialogController",
                templateUrl: '/App/pages/chart/chart.productFirstDialog.html'
            };
        }, {

        });