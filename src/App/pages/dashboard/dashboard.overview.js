agmNgModuleWrapper('agmp.dashboard')
    .defineController('p.dashboard.OverviewController', ["sHeaderService"],
        function (vm, dep, tool) {

            tool.setVmProperties({
                sHeaderService: dep.sHeaderService
            });
        })
    .defineDirectiveForE('agmp-dashboard-overview', [],
        function () {
            return {
                controller: "p.dashboard.OverviewController",
                templateUrl: '/App/pages/dashboard/dashboard.overview.html'
            };
        },
        {
        });