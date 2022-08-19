agmNgModuleWrapper("agms.tgps")
    .defineControllerAsPopup("s.tgps.RiskAnalyzerController",
        {
            templateUrl: '/App/shared/tgps/tgps.riskAnalyzer.html',
            windowClass: 'default-modal tgps-fundamental-filter-popup tgps-fundamental-filter-risk-analyze-popup'
        }, [],
        function (vm, dep, tool) {
            
            function closePanel() {
                vm.uibClosePanel();
            }
            
            function setTab(tabName) {
                vm.currentTab = tabName;
            }
            
            tool.initialize(function () {
                tool.setVmProperties({
                    closePanel:closePanel,
                    currentTab: 'stock_risk',
                    setTab: setTab
                });
            });
        });