agmNgModuleWrapper('agmp.dashboard')
    .defineController('p.dashboard.PriceAlertController', [],
    function (vm, dep, tool) {

        tool.inheritVmController('p.dashboard.SimpleAlertController');

        tool.initialize(function () {
            tool.setVmProperties({

            });
        });
    })
    .defineDirectiveForE('agmp-dashboard-price-alert', [],
    function () {
        return {
            controller: "p.dashboard.PriceAlertController",
            templateUrl: '/App/pages/dashboard/dashboard.priceAlert.html'
        };
    },
    {

    });