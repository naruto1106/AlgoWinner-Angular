agmNgModuleWrapper('agmp.chart')
    .defineController('p.chart.FundamentalFilterController', [
            'pChartFilterDescriptionService',
            'pChartFundamentalHelperService',
            'pChartRenderingUtilsService'],
        function (vm, dep, tool) {
            var pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartFundamentalHelperService = dep.pChartFundamentalHelperService;

            var filterDescription = pChartFilterDescriptionService;

            tool.setVmProperties({
                filterDescription: filterDescription,
                pChartRenderingUtilsService: pChartRenderingUtilsService,
                openFundamentalPanel: openFundamentalPanel, 
                addToFundamentals: addToFundamentals,
                searchFundamentals: pChartFundamentalHelperService.searchFundamentals,
                toggleFundamentalActivation: pChartFundamentalHelperService.toggleFundamentalActivation,
                removeFromFundamentals: pChartFundamentalHelperService.removeFromFundamentals
            });

            function openFundamentalPanel() {
                return pChartFundamentalHelperService.openFundamentalPanel();
            }

            function addToFundamentals(f) {
                var res = pChartFundamentalHelperService.addToFundamentalWithChecks(f);
                if (res) {
                    vm.selectedFundamentals = null;
                }
            }

        })
    .defineDirectiveForE('agmp-chart-fundamental-filter', [],
        function () {
            return {
                controller: "p.chart.FundamentalFilterController",
                templateUrl: '/App/pages/chart/chart.fundamentalFilter.html'
            };
        }, {

        })
    // workaround for supporting typeahead-min-length="0"
    // http://stackoverflow.com/questions/24764802/angular-js-automatically-focus-input-and-show-typeahead-dropdown-ui-bootstra
    // the workaround will no longer be needed once this commit is released:
    // https://github.com/angular-ui/bootstrap/commit/d859f42cc022a5d8779f1c7b358486bbdd04ed57
    .defineDirectiveByTag('typeahead-focus', [], function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {

                //trigger the popup on 'click' because 'focus'
                //is also triggered after the item selection
                element.bind('click', function () {

                    var viewValue = ngModel.$viewValue;

                    //restore to null value so that the typeahead can detect a change
                    if (ngModel.$viewValue === ' ') {
                        ngModel.$setViewValue(null);
                    }

                    //force trigger the popup
                    ngModel.$setViewValue(' ');

                    //set the actual value in case there was already a value in the input
                    ngModel.$setViewValue(viewValue || ' ');
                });

                //compare function that treats the empty space as a match
                scope.emptyOrMatch = function (actual, expected) {
                    if (expected === ' ') {
                        return true;
                    }
                    return actual.indexOf(expected) > -1;
                };
            }
        };
    });
