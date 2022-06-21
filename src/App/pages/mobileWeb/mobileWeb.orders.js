agmNgModuleWrapper('agmp.mobileWeb')
    .defineController("p.mobileWeb.OrdersController", ["pMobileWebService"],
    function (vm, dep, tool) {
        tool.inheritVmController('s.orders.TransactionsDeveloperController');

        tool.initialize(function () {
            tool.setVmProperties({

            });
        });
    })
    .defineDirectiveForE("agmp-mobile-orders", [],
    function () {
        return {
            controller: "p.mobileWeb.OrdersController",
            templateUrl: '/App/pages/mobileWeb/mobileWeb.orders.html'
        };
    },
    {
        isLoadingOrders: "="
    });