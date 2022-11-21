agmNgModuleWrapper('agmp.tradeIdea')
    .defineController('p.tradeIdea.FilterController', ['$scope'],
        function ($scope) {
            var vm = this;
            $scope.data = {
                Templates: [
                    { id: '1', name: 'User Template 1' },
                    { id: '2', name: 'User Template 2' },
                    { id: '3', name: 'User Template 3' }
                ],
                Filters: [
                    { id: '1', name: 'Properietary Filter 1' },
                    { id: '2', name: 'Properietary Filter 2' },
                    { id: '3', name: 'Properietary Filter 3' }
                ],
                uninverse: [
                    { id: '1', name: 'Market' },
                    { id: '2', name: 'Watchlist' },
                    { id: '3', name: 'Index' }
                ],
                countries: [
                    { id: '1', name: 'Afghanistan' },
                    { id: '2', name: 'Albania' },
                    { id: '3', name: 'Algeria' },
                    { id: '4', name: 'Andorra' },
                    { id: '5', name: 'Angola' },
                    { id: '6', name: 'Andigua and Barbuda' },
                ],
                sectors: [
                    { id: '1', name: 'Healthcare' },
                    { id: '2', name: 'Energy' },
                    { id: '3', name: 'Communication' }
                ],
                industries: [
                    { id: '1', name: 'Biotechnology' },
                    { id: '2', name: 'Software Application' },
                    { id: '3', name: 'Oil & Gas' }
                ],
            }
            $scope.toggleTableView = toggleTableView;
            $scope.getOption = getOption;
            $scope.showPagination = showPagination;
            $scope.viewType = "table";
            $scope.templateType = "standard";
            $scope.selectedUniverse;
            $scope.selectedCountry;
            $scope.selectedSector;
            $scope.selectedIndustry;
            $scope.showCountry = false;
            $scope.showSector = false;
            $scope.industryFilter = false;
            $scope.currentPage = 1;
            
            function getTotalItems() {
                return 50;
            }

            function showPagination() {
                // return vm.models.numPages > 1;
                return true;
            }

            function getOption(option, value) {

                switch (option) {

                    case 'Universe':
                        value.selectedUniverse ? $scope.showCountry = true : $scope.showCountry = false;
                        break;

                    case 'Country':
                        value.selectedCountry ? $scope.showSector = true : $scope.showSector = false;
                        break;


                    case 'Sector':
                        value.selectedSector ? $scope.industryFilter = true : $scope.industryFilter = false;
                        break;
                    default:
                    // code block
                }
            };

            function toggleTableView(viewType) {
                $scope.viewType = viewType;
            };


        }).defineDirectiveForE('agmp-tradeidea-filter', [],
            function () {
                return {
                    controller: "p.tradeIdea.FilterController",
                    templateUrl: '/App/pages/tradeIdea/tradeIdea.filter.html'
                };
            },
            {
            });