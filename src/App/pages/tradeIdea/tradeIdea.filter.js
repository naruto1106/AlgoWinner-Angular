agmNgModuleWrapper('agmp.tradeIdea')
    .defineController('p.tradeIdea.FilterController', ['$scope'],
        function ($scope) {
            var vm = this;
            $scope.colSelected=[]; 
            $scope.tableData.forEach(element => {
                $scope.colSelected.push({id:element.id});
            });
            
            $scope.customTemplate = {};
            $scope.proprietaryFilter = {};
            $scope.universeFilter = {};
            $scope.eventsCallback = {
                onItemSelect: function (item) {
                    //console.log("Item Got Selected: ", item);
                }
            };
            
            $scope.displayCol = {
                onItemSelect: function (item) {
                    if(item){
                        $scope.showColumns({id:item.id,isActive:true});
                    }
                },
                onItemDeselect: function (item) {
                    if(item) {
                        $scope.showColumns({id:item.id,isActive:false});
                    }
                }
            };
            $scope.dropdownSetting = {
                smartButtonMaxItems: 1,
                smartButtonTextConverter: function (itemText, originalItem) { return itemText; },
                selectionLimit: 1,
                showUncheckAll: false,
                closeOnSelect: true,
                scrollable: false,
                displayProp: 'name'
            };
            $scope.dropdownCheckbox = {
                showUncheckAll: false,
                showCheckAll: false,
                displayProp: 'name'
            };
            $scope.editColCheckbox = {
                showUncheckAll: false,
                showCheckAll: false,
                displayProp: 'title'
            };
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
                    { id: '111', name: 'Market' },
                    { id: '112', name: 'Watchlist' },
                    { id: '113', name: 'Index' }
                ],
                countries: [
                    { name: "China", code: "CN", id: 44 },
                    { name: "Malaysia", code: "MY", id: 132 },                    
                    { name: "Singapore", code: "SG", id: 195 },
                    { name: "United States", code: "US", id: 229 },
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
            $scope.selectedCountry = {};
            $scope.selectedSector = [];
            $scope.selectedIndustry = [];
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
                console.log(option)
                console.log(value)
                switch (option) {

                    case 'Universe':
                        value ? $scope.showCountry = true : $scope.showCountry = false;
                        break;

                    case 'Country':
                        value ? $scope.showSector = true : $scope.showSector = false;
                        break;


                    case 'Sector':
                        value ? $scope.industryFilter = true : $scope.industryFilter = false;
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
            {   tableData:'<',
                showColumns:'<'
            });