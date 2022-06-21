agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.OpenDeveloperController', ["sOrdersDetailService"],
        function(vm, dep, tool) {
            tool.inheritVmController('s.orders.OpenBaseController');
            tool.inheritVmController('s.orders.DeveloperBaseController');

            var sOrdersDetailService = dep.sOrdersDetailService;

            tool.initialize(function() {
                tool.setVmProperties({
                    getTakeProfitOrder: sOrdersDetailService.getTakeProfitOrder,
                    getStopLossOrder: sOrdersDetailService.getStopLossOrder
                });
            });
        }
    )
    .defineDirectiveForE('agms-orders-open-developer', [],
        function() {
            return {
                controller: "s.orders.OpenDeveloperController",
                templateUrl: '/App/shared/orders/orders.open.html'
            };
        }, {
            isLoadingOrders: "=",
            viewMode: "="
        });