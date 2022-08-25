agmNgModuleWrapper("agms.tgps")
    .defineControllerAsPopup("s.tgps.RiskAnalyzerController",
        {
            templateUrl: '/App/shared/tgps/tgps.riskAnalyzer.html',
            windowClass: 'default-modal tgps-risk-analyze-popup'
        }, ['mode', 'sProductService', 'sTradingHolidayService'],
        function (vm, dep, tool) {
            var sProductService = dep.sProductService, 
            sTradingHolidayService = dep.sTradingHolidayService;
            
            vm.mode = dep.mode;

            function closePanel() {
                vm.uibClosePanel();
            }
            
            function setTab(tabName) {
                vm.currentTab = tabName;
            }

            function setStockRiskAnalysisDateSelectionOpen() {
                vm.stock_risk.dateSelectionMode = 1;
                vm.stock_risk.dateOpened = true;
            }
            
            function setPortfolioRiskAnalysisDateSelectionOpen() {
                vm.portfolio_risk.dateSelectionMode = 1;
                vm.portfolio_risk.dateOpened = true;
            }
            
            function setMomentumProfilerAnalysisDateSelectionOpen() {
                vm.momentum_profiler.dateSelectionMode = 1;
                vm.momentum_profiler.dateOpened = true;
            }

            function disabled(param) {
                return (param.mode === 'day' && (param.date.getDay() === 0 || param.date.getDay() === 6));
            }

            function getTradeVenueString(tradeVenueLoc){
                var tradeVenueString = null;
                switch (tradeVenueLoc) {
                    case "SG":
                        tradeVenueString = "Singapore";
                        break;
                    case "HK":
                        tradeVenueString = "Hongkong";
                        break;
                    case "MY":
                        tradeVenueString = "Malaysia";
                        break;
                    case "CHN":
                        tradeVenueString = "China";
                        break;
                    case "US":
                    case "Global Indices":
                        tradeVenueString = "UnitedStates";
                        break;
                }

                return tradeVenueString;
            }

            function getLatestEndTradingDate(tradeVenue) {
                return sTradingHolidayService.GetLatestMarketEndTime(tradeVenue).then(function (res) {
                    return res.data;
                });
            }

            function submitStockRisk(){                
            }
            function loadConstructPortfolio() {
                tool.openModalByDefinition('s.tgps.riskAnalyzerConstructPortfolioController', {
                    mode: vm.mode
                });
            }
            function submitPortfolioRisk(){

            }
            function submitMomentumProfiler(){

            }
            function submitTradeSizing(){
                var tradeVenueString = getTradeVenueString(vm.trade_sizing.tradeVenueLoc);
                getLatestEndTradingDate(tradeVenueString).then(function (date) {
                    if (date) {
                        vm.trade_sizing.Today = new Date(date.substring(0, date.indexOf("T")));
                    }
                });
            }
            
            function searchProducts(keyword) {
                return sProductService.SearchPlottableProduct(keyword).then(function (res) {
                    return res.data.Data;
                });
            }

            function showProduct(item, type) {
                vm[type].tradeVenueLoc = item.TradeVenueLoc;                
            }            
            
            tool.initialize(function () {
                tool.setVmProperties({
                    closePanel:closePanel,
                    currentTab: 'stock_risk',
                    setTab: setTab, 
                    submitStockRisk: submitStockRisk,
                    direction: ['Long', 'Short'],
                    loadConstructPortfolio: loadConstructPortfolio,
                    submitPortfolioRisk: submitPortfolioRisk,
                    submitMomentumProfiler: submitMomentumProfiler,
                    submitTradeSizing: submitTradeSizing,
                    showProduct: showProduct,
                    searchProducts: searchProducts,
                    stock_risk: {
                        symbol: 'AAPL',
                        tradeVenueLoc: 'US',
                        benchmark: 'SPY',
                        analysisDate: new Date(),
                        lookback_horizon: '500',
                        dateOpened: false,
                        dateSelectionMode: 0,
                        setStockRiskAnalysisDateSelectionOpen: setStockRiskAnalysisDateSelectionOpen,
                        table: [
                            {
                                name: 'Correlation',
                                apple: '0.2',
                                spy: '-',
                            },
                            {
                                name: 'Beta',
                                apple: '1.1',
                                spy: '-',
                            },
                            {
                                name: 'Sharpe Ratio',
                                apple: '0.8	',
                                spy: '0.4',
                            },
                            {
                                name: 'Return',
                                apple: '25%',
                                spy: '16%',
                            }
                        ],
                        volatility: 0
                    },
                    portfolio_risk: {
                        benchmark: 'SPY',
                        analysisDate: new Date(),
                        lookback_horizon: '500',
                        dateOpened: false,
                        dateSelectionMode: 0,
                        setPortfolioRiskAnalysisDateSelectionOpen: setPortfolioRiskAnalysisDateSelectionOpen,
                        table: [
                            {
                                name: 'Correlation',
                                apple: '0.2',
                                spy: '-',
                            },
                            {
                                name: 'Beta',
                                apple: '1.1',
                                spy: '-',
                            },
                            {
                                name: 'Sharpe Ratio',
                                apple: '0.8	',
                                spy: '0.4',
                            },
                            {
                                name: 'Return',
                                apple: '25%',
                                spy: '16%',
                            }
                        ],
                        volacity: 27
                    },
                    momentum_profiler: {
                        symbol: 'AAPL',
                        tradeVenueLoc: 'US',
                        direction: '',
                        analysisDate: new Date(),
                        lookback_horizon: '500',
                        dateOpened: false,
                        dateSelectionMode: 0,
                        setMomentumProfilerAnalysisDateSelectionOpen: setMomentumProfilerAnalysisDateSelectionOpen,
                        momentum: 25,
                        contrarian: 75
                    },
                    trade_sizing: {
                        symbol: 'AAPL',
                        tradeVenueLoc: 'US',
                        Today: '',
                        regular_size: '0.05',
                        trade_size: 2
                    },
                    dateOptions: {
                        formatYear: 'yyyy',
                        startingDay: 1,
                        showWeeks: false,
                        dateDisabled: disabled,
                        maxDate: new Date(moment().endOf('day').format())
                    }
                });

                vm.momentum_profiler.direction = vm.direction[0];
            });
        });