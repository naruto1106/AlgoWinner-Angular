agmNgModuleWrapper("agms.tgps")
    .defineControllerAsPopup("s.tgps.RiskAnalyzerController",
        {
            templateUrl: '/App/shared/tgps/tgps.riskAnalyzer.html',
            windowClass: 'default-modal tgps-risk-analyze-popup'
        }, ['mode'],
        function (vm, dep, tool) {
            
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

            }
            
            tool.initialize(function () {
                tool.setVmProperties({
                    closePanel:closePanel,
                    currentTab: 'stock_risk',
                    setTab: setTab, 
                    submitStockRisk: submitStockRisk,
                    loadConstructPortfolio: loadConstructPortfolio,
                    submitPortfolioRisk: submitPortfolioRisk,
                    submitMomentumProfiler: submitMomentumProfiler,
                    submitTradeSizing: submitTradeSizing,
                    stock_risk: {
                        symbol: '',
                        benchmark: '',
                        analysisDate: '',
                        lookback_horizon: '',
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
                        volacity: 27
                    },
                    portfolio_risk: {
                        benchmark: '',
                        analysisDate: '',
                        lookback_horizon: '',
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
                        symbol: '',
                        direction: '',
                        analysisDate: '',
                        lookback_horizon: '',
                        dateOpened: false,
                        dateSelectionMode: 0,
                        setMomentumProfilerAnalysisDateSelectionOpen: setMomentumProfilerAnalysisDateSelectionOpen,
                        momentum: 25,
                        contrarian: 75
                    },
                    trade_sizing: {
                        symbol: '',
                        regular_size: '',
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
            });
        });