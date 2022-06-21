agmNgModuleWrapper('agmp.dashboard')
    .defineController('p.dashboard.BigAlertController', ["sHeaderService"],
    function (vm, dep, tool) {
        var sHeaderService = dep.sHeaderService;
            
            tool.initialize(function () {
                tool.setVmProperties({

                });

                sHeaderService.selectMenu("dashboard");
            });
        })
    .defineDirectiveForE('agmp-dashboard-big-alert', [],
        function () {
            return {
                controller: "p.dashboard.BigAlertController",
                templateUrl: '/App/pages/dashboard/dashboard.bigAlert.html'
            };
        },
        {

        });