agmNgModuleWrapper("agms.tgps")
    .defineControllerAsPopup("s.tgps.RiskAnalyzerController",
        {
            templateUrl: '/App/shared/tgps/tgps.riskAnalyzer.html',
            windowClass: 'default-modal tgps-fundamental-filter-popup tgps-fundamental-filter-risk-analyze-popup'
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
            
            tool.initialize(function () {
                tool.setVmProperties({
                    closePanel:closePanel,
                    currentTab: 'stock_risk',
                    setTab: setTab,                    
                    stock_risk: {
                        analysisDate: '',
                        dateOpened: false,
                        dateSelectionMode: 0,
                        setStockRiskAnalysisDateSelectionOpen: setStockRiskAnalysisDateSelectionOpen,
                    },
                    portfolio_risk: {
                        analysisDate: '',
                        dateOpened: false,
                        dateSelectionMode: 0,
                        setPortfolioRiskAnalysisDateSelectionOpen: setPortfolioRiskAnalysisDateSelectionOpen,
                    },
                    momentum_profiler: {
                        analysisDate: '',
                        dateOpened: false,
                        dateSelectionMode: 0,
                        setMomentumProfilerAnalysisDateSelectionOpen: setMomentumProfilerAnalysisDateSelectionOpen,
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