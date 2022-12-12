agmNgModuleWrapper('agmp.tradeIdea')
    .defineController('p.tradeIdea.MainController',['$scope'],
        function ($scope) {
            var vm = this;
            var myEl = angular.element(document.querySelector('body'));
            myEl.addClass('tradeIdeapageContent');
            $scope.corSymbol =[
                {id:1,shorName:'AA',value:'Alcoa Corporation'},
                {id:2,shorName:'AAPL',value:'Apple Inc.'},
                {id:3,shorName:'AAL',value:'American Airlines Group Inc.'},
                {id:4,shorName:'AABB',value:'Asia Broadband, Inc.'},
                {id:5,shorName:'AAP',value:'Advance Auto Part, Inc.'},
            ]
            
            $scope.searchSymbol = function(string) {
                $scope.hidethis = false;
                var output = [];
                angular.forEach($scope.corSymbol, function(element) {
                if (element.value.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(element);
                } 
                });
                $scope.filterSymbols = output;
            };

            $scope.fillInputBox = function(string) {
                $scope.corrSymbol = string.value;
                $scope.hidethis = true;
            };

            $scope.selectedFilter = '';
            $scope.selectedTab = 'technical';
            $scope.selectedAccordin ='';
            $scope.techBarValue1 ={'id':'4'};
            $scope.barPatternPeriod ={};
            $scope.barPatternValue1 ={};
            $scope.barPatternValue2 ={};
            $scope.barPatternComparator ={};
            $scope.smaPeriodType={};
            $scope.smaValueType={};
            $scope.smaValue1={};
            $scope.smaComparator={};
            $scope.benchmark={};
            $scope.parabolicSarPeriod={};
            $scope.parabolicSarComp={};
            $scope.priceTrendbarType={};
            $scope.priceTrendValueType={};
            $scope.priceTrendValue1={};
            $scope.priceTrendDirection={};
            $scope.volumeTrendbarType={};
            $scope.volumeTrendValue1={};
            $scope.volumeTrendDirec={};
            $scope.RSITrendBarType={};
            $scope.rsiTrendDirection={};
            $scope.trianglePatternType={};
            $scope.normalizedAccumPer=[];
            $scope.diverStrategyIndicator={};
            $scope.RSIComparator={};
            $scope.normOBValue=[];
            $scope.normOBValueB={};
            $scope.majorPriceBrktPrd={};
            $scope.peakTroughType ={};
            $scope.fundPeriod ={};
            $scope.fGMPeriod ={};
            $scope.fEGPeriod ={};
            $scope.benchmarkRPValue =[];
            $scope.benchmarkRPPeriod ={};
            $scope.benchmarkREarnperiod ={};
            $scope.benchmarkREarnVal =[];
            $scope.catMarketCapVal ={};
            $scope.analystRating ={};
            $scope.latestNewsSentiment ={};
            $scope.latestNewsRange ={};
            $scope.analystTargetP1 ={};
            $scope.analystTargetP2 ={};
            $scope.analystActionType ={};
            $scope.breakoutMulti ={};
            $scope.unusualGapType ={};

            $scope.selectedPeriod ={};
            $scope.lookbackPeriod ={};
            $scope.diverStrategyType ={};
            $scope.diverStrategyType ={};
            $scope.MACDValue1 ={};
            $scope.selectedComparator ={};
            $scope.stochasticComparator ={};
            $scope.normalizedComparator ={};
            $scope.selectedbreakoutDirection ={};
            $scope.lineBreakout ={};
            $scope.isElliotWave ={};
            $scope.isprocessing = false;
            $scope.selectedSector = [];
            $scope.periodText = { buttonDefaultText: 'Choose Period'};
            $scope.loadingFilter=  function () {
                console.log("set processing True;")
                $scope.isprocessing = true;
            }
            $scope.changeTab=  function (tab) {
                $scope.selectedTab=tab;
                $scope.selectedFilter = '';
            }
            $scope.changeTabAccordion=  function (accordion) {
                console.log("Selected Accordion:",accordion)
                $scope.selectedAccordin = accordion;
                $scope.selectedFilter = '';
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
                yearPeriods: [
                    { id: 1, name: '1Y' },
                    { id: 2, name: '3Y' },
                    { id: 3, name: '5Y' },
                ],
                periodTypes: [
                    { id: '1', name: 'Days' },
                    { id: '2', name: 'Week' },
                ],
                barTypes: [
                    { id: '1', name: 'Daily' },
                    { id: '2', name: 'Weekly' },
                ],
                smaValue1: [
                    { id: '1', name: 'Price' },
                    { id: '2', name: 'SMA' },
                ],
                volumeTrendValue1: [
                    { id: '1', name: 'Volume' },
                    { id: '2', name: 'SMA' },
                ],
                barPatternValue1: [
                    { id: '1', name: 'Open' },
                    { id: '2', name: 'High' },
                    { id: '3', name: 'Low' },
                    { id: '4', name: 'Close' },
                    { id: '5', name: 'Volume' },
                ],
                priceTrendValueTypes: [
                    { id: '1', name: 'Open' },
                    { id: '2', name: 'High' },
                    { id: '3', name: 'Low' },
                    { id: '4', name: 'Close' },
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
                benchmark: [
                    { id: '1', name: 'SP500' },
                ],
                priceTrendDirection: [
                    { id: '1', name: 'Uptrend' },
                    { id: '2', name: 'Downtrend' },
                    { id: '3', name: 'Sideways' },
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
                MACDValue1: [
                    { id: '1', name: 'Turned Positive' },
                    { id: '2', name: 'Turned Negative' },
                    { id: '3', name: 'Positive'},
                    { id: '4', name: 'Negative'},
                ],
                Comparator: [
                    { id: '1', name: 'Greator' },
                    { id: '2', name: 'Smaller' },
                    { id: '3', name: 'Between' },
                    { id: '4', name: 'Cross Above'},
                    { id: '5', name: 'Cross Below'},
                ],
                smaComparator: [
                    { id: '1', name: 'Cross Above' },
                    { id: '2', name: 'Cross Below' },
                    { id: '3', name: 'Between' },
                    { id: '4', name: 'Higher'},
                    { id: '5', name: 'Lower'},
                ],
                barPatternComparator: [
                    { id: '1', name: 'Greator' },
                    { id: '2', name: 'Smaller' },
                    { id: '3', name: 'Equal' },
                ],
                breakoutDirection: [
                    { id: '1', name: 'Break Above' },
                    { id: '2', name: 'Break Below' },
                ],
                peakTrough: [
                    { id: '1', name: 'Peak' },
                    { id: '2', name: 'Trough' },
                ],
                lineBreakout: [
                    { id: '1', name: '23.6%' },
                    { id: '2', name: '38.2%' },
                    { id: '3', name: '61.8%' },
                    { id: '4', name: '78.6%'},
                ],
                confirmation: [
                    { id: 1, name: 'Yes' },
                    { id: 2, name: 'No' },
                ],
                trianglePatternType: [
                    { id: 1, name: 'Symmetrical' },
                    { id: 2, name: 'Ascending' },
                    { id: 3, name: 'Descending' },
                ],
                catMarketCapVal: [
                    { id: 1, name: '< 500M' },
                    { id: 2, name: '500M - 1B' },
                    { id: 3, name: '1B - 5B' },
                    { id: 4, name: '> 5B' },
                ],
                analystRatingVal: [
                    { id: 1, name: '1 to 1.5 (strong buy)' },
                    { id: 2, name: '1.5 to 2 (buy)' },
                    { id: 3, name: '2 to 2.5 (buy)' },
                    { id: 4, name: '3 to 3.5 (hold)' },
                    { id: 5, name: '3.5 to 4 (sell)' },
                    { id: 6, name: '4 to 4(sell)' },
                    { id: 7, name: '4.5 to 5 (strong sell)' },
                ],
                latestNewsSentiment: [
                    { id: 1, name: 'Positive' },
                    { id: 2, name: 'Negative' },
                    { id: 3, name: 'Neutral' }
                ],
                latestNewsRange: [
                    { id: 1, name: '1 day' },
                    { id: 2, name: '2 days' },
                    { id: 3, name: '3 days' }
                ],
                analystTargetP2: [
                    { id: 1, name: '< 10%' },
                    { id: 2, name: '< 20%' },
                    { id: 3, name: '20% to 50%' },
                    { id: 4, name: '> 50%' }
                ],
                analystActionType: [
                    { id: 1, name: 'Upgrade Rating' },
                    { id: 2, name: 'Downgrade Rating' },
                    { id: 3, name: 'Upgrade Earning Forecast' },
                    { id: 4, name: 'Downgrade Earning Forecast' }
                ],
                breakoutMulti: [
                    { id: 1, name: '< 25%' },
                    { id: 2, name: '< 50%' },
                    { id: 3, name: '50% to 75%' },
                    { id: 4, name: '>100%' }
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