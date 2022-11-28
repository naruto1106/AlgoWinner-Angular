agmNgModuleWrapper('agmp.tradeIdea')
    .defineController('p.tradeIdea.MainController',['$scope'],
        function ($scope) {
            var vm = this;
            $scope.selectedTab = 'technical';
            $scope.selectedAccordin ='';
            $scope.selectedPeriod ={};
            $scope.isprocessing = false;
            $scope.periodText = { buttonDefaultText: 'Choose Period'};
            $scope.loadingFilter=  function () {
                console.log("set processing True;")
                $scope.isprocessing = true;
            }
            $scope.changeTab=  function (tab) {
                console.log("Selected Tab:",tab)
                $scope.selectedTab=tab;
            }
            $scope.changeTabAccordion=  function (tab,accordion) {
                console.log("Selected Accordion:",tab)
                $scope.selectedAccordin = accordion;
            }

            $scope.data = {
                Periods: [
                    { id: '1', name: 'Annual' },
                    { id: '2', name: 'Quartal' },
                ],
            }

            $scope.dropdownSetting = {
                smartButtonMaxItems: 1,
                smartButtonTextConverter: function (itemText, originalItem) { return itemText; },
                selectionLimit: 1,
                showUncheckAll: false,
                closeOnSelect: true,
                scrollable: false,
                displayProp: 'name'
            };
        }) 