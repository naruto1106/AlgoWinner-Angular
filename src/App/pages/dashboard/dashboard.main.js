agmNgModuleWrapper('agmp.dashboard')
    .defineController('p.dashboard.MainController', ['pDashboardPageService', "sHeaderService"],
        function (vm, dep, tool) {
            var pDashboardPageService = dep.pDashboardPageService,
                sHeaderService = dep.sHeaderService;

            tool.initialize(function () {
                tool.setVmProperties({
                    
                });

                pDashboardPageService.screenerSharedState.filter.mode = "Basic";
                sHeaderService.selectMenu("dashboard");
            });
        });