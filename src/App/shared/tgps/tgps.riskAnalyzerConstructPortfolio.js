agmNgModuleWrapper("agms.tgps")
    .defineControllerAsPopup("s.tgps.riskAnalyzerConstructPortfolioController",
        {
            templateUrl: '/App/shared/tgps/tgps.riskAnalyzerConstructPortfolio.html',
            windowClass: 'default-modal tgps-risk-analyze-popup tgps-risk-analyze-construct-portfolio-popup'
        }, ['mode'],
        function (vm, dep, tool) {
            
            vm.mode = dep.mode;            

            function closePanel() {
                vm.uibClosePanel();
            }
            
            
            function addRow(){

            }
            function removeRow(index){

            }
            
            tool.initialize(function () {
                tool.setVmProperties({
                    closePanel:closePanel,
                    constructPortfolios: [
                        {
                            id: 1,
                            data: [
                                {
                                    
                                }
                            ]
                        }
                    ]
                });
            });
        });