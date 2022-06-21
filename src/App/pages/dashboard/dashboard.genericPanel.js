agmNgModuleWrapper('agmp.dashboard')
    .defineController('p.dashboard.GenericPanelController', ['pDashboardPageService'],
        function (vm, dep, tool) {
            var pDashboardPageService = dep.pDashboardPageService;
            tool.setVmProperties({
                pDashboardPageService: pDashboardPageService
            });
        })
    .defineDirectiveForE('agmp-dashboard-generic-panel', [],
        function () {
            return {
                transclude:true,
                controller: "p.dashboard.GenericPanelController",
                templateUrl: '/App/pages/dashboard/dashboard.genericPanel.html'
            };
        },
        {
            heading: '@',
            getPanelClass: "&?"
        });