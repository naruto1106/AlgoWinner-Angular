agmNgModuleWrapper('agmp.tradeIdea')
    .defineController('p.tradeIdea.MainController',['$scope'],
        function ($scope) {
            var vm = this;
            $scope.yearListing=[];
            $scope.tableColumns=[];
            $scope.normalizedAccumulation=[];
            // var myEl = angular.element(document.querySelector('body'));
            // myEl.addClass('tradeIdeapageContent');
            $scope.backTestProfit = 40
            $scope.backTestCutLoss=80
            $scope.getSelectionBarColor = function () {
                return '#184376';
            }
            
            $scope.getPointerColor = function () {
                return '#184376';
            }
            $scope.disTableCol = function (data) {
               $scope.tableColumns.forEach(element => {
                       if(element.id == data.id) {
                            element.isActive = data.isActive;
                       }
               });
            }
            var today = new Date();
            var currentYear = today.getFullYear();
            for(let i=1980;i<=currentYear;i++) {
                 $scope.yearListing.push({id:i,name:i})
            }
            var quarter = Math.floor((today.getMonth() + 3) / 3);
            $scope.priceToEarnQuar={id:quarter};
            $scope.priceToEarnYear={id:currentYear};

            $scope.slider = {
                options: {
                  floor: 0,
                  ceil: 100,
                }
            };

            for(let i=0;i<=100;i+=5) {
                if(i==0) {
                    $scope.normalizedAccumulation.push({id:0,name:'0 Percentile'})
                } else {
                        $scope.normalizedAccumulation.push({id:i,name:i+'thPercentile'})
                }
            }
            $scope.quarterList=[
                {id:1,name:'Quarter 1'},
                {id:2,name:'Quarter 2'},
                {id:3,name:'Quarter 3'},
                {id:4,name:'Quarter 4'},
            ]

            $scope.tableData = [
                {id:1,Symbol:'Symbol',Name:'PEPG',Sector:'Healthcare',Industry:'Biotechnology',Market_Cap:'25.56M',Last_Close:'10.90',Open:'9.22',Last:'10.93',Chg:'110.91%'},
                {id:2,Symbol:'Symbol',Name:'PEPG',Sector:'Healthcare',Industry:'Biotechnology',Market_Cap:'25.56M',Last_Close:'10.90',Open:'9.22',Last:'10.93',Chg:'110.91%'},
            ]
            
            if($scope.tableData.length>0) {
                let x =  Object.keys($scope.tableData[0])
                x.forEach((element,index)=>{
                    if(element!='id') {
                        $scope.tableColumns.push({id:index,name:element,isActive:true, disabled: true })
                    }
                })
            }
           
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
            $scope.priceToMinValue=0;
            $scope.priceToMaxValue=9;
            $scope.fundOper ={};
            $scope.fundPeriod ={};
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
            $scope.eventNewsTrigger ={};

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
                    { id: '2', name: 'Quarter' },
                ],
                operatorVal: [
                    { id: 1, name: 'Below' },
                    { id: 2, name: 'Greater' },
                    { id: 3, name: 'Between ' },
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
                targetPriceP1: [
                    { id: 1, name: 'Above Current Price' },
                    { id: 2, name: 'Below Current Price' }
                ],
                breakoutMulti: [
                    { id: 1, name: '< 25%' },
                    { id: 2, name: '< 50%' },
                    { id: 3, name: '50% to 75%' },
                    { id: 4, name: '>100%' }
                ],
                newsTrigger: [
                    { id: 1, name: 'Mentioned in Headline within the past 24 hours' },
                    { id: 2, name: 'Price moves more than usual'},
                    { id: 3, name: 'Headline has either Positive or Negative Headline'}
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