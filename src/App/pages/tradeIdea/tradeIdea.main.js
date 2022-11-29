agmNgModuleWrapper('agmp.tradeIdea')
    .defineController('p.tradeIdea.MainController',['$scope'],
        function ($scope) {
            var vm = this;
            $scope.selectedFilter = '';
            $scope.selectedTab = 'technical';
            $scope.selectedAccordin ='';
            $scope.techBarValue1 ={'id':'4'};
            $scope.selectedPeriod ={};
            $scope.lookbackPeriod ={};
            $scope.diverStrategyType ={};
            $scope.diverStrategyIndicator ={};
            $scope.isprocessing = false;
            $scope.selectedSector = [];
            $scope.SelectedText = { dynamicButtonTextSuffix:'Selected'}
            $scope.periodText = { buttonDefaultText: 'Choose Period'};
            $scope.StrategyTypeText = { buttonDefaultText: 'Choose Type'};
            $scope.StrategyIndicatorText = { buttonDefaultText: 'Choose Indicator'};
            $scope.loadingFilter=  function () {
                console.log("set processing True;")
                $scope.isprocessing = true;
            }
            $scope.changeTab=  function (tab) {
                console.log("Set Tab:",tab)
                $scope.selectedTab=tab;
            }
            $scope.changeTabAccordion=  function (accordion) {
                console.log("Selected Accordion:",accordion)
                $scope.selectedAccordin = accordion;
            }
            $scope.setTabFilter=  function (filter) {
                console.log("set Filter is:",filter)
                $scope.selectedFilter = filter;
            }

            $scope.data = {
                Periods: [
                    { id: '1', name: 'Annual' },
                    { id: '2', name: 'Quartal' },
                ],
                periodTypes: [
                    { id: '1', name: 'Days' },
                    { id: '2', name: 'Week' },
                ],
                barPatternValue1: [
                    { id: '1', name: 'Open' },
                    { id: '2', name: 'High' },
                    { id: '3', name: 'Low' },
                    { id: '4', name: 'Close' },
                    { id: '5', name: 'Volume' },
                ],
                normalizedAccumulation: [
                    { id: '1', name: '0 Percentile' },
                    { id: '2', name: '5th Percentile' },
                    { id: '3', name: '10th Percentile' },
                    { id: '4', name: '15th Percentile' },
                    { id: '5', name: '20th Percentile' },
                ],
                diverStrategyType: [
                    { id: '1', name: 'Bullish' },
                    { id: '2', name: 'Bearish' },
                ],
                diverStrategyIndicator: [
                    { id: '1', name: 'Volume' },
                    { id: '2', name: 'RSI [N] days' },
                    { id: '3', name: 'Accumulation & Distribution'},
                ],
                lookbackPeriod: [
                    { id: '1', name: '3M' },
                    { id: '2', name: '6M' },
                    { id: '3', name: '12M'},
                    { id: '4', name: '2Y'},
                    { id: '5', name: '3Y'},
                ],
            }

            $scope.dropdownCheckbox = {
                showUncheckAll: false,
                showCheckAll: false,
                displayProp: 'name'
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
        }) 