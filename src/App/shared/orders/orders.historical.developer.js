agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.HistoricalDeveloperController', [],
        function(vm, dep, tool) {
            vm.historicalDisplayKind = 'Developer';

            tool.inheritVmController('s.orders.HistoricalBaseController');
            tool.inheritVmController('s.orders.DeveloperBaseController');
            vm.category = "Trade";
            vm.event = "Orders";
        }
    )
    .defineDirectiveForE('agms-orders-historical-developer', [],
        function() {
            return {
                controller: "s.orders.HistoricalDeveloperController",
                templateUrl: '/App/shared/orders/orders.historical.html'
            };
        }, {
            selectedStrategy: '=',
            currency: '=',
            isLoadingOrders: "=",
            viewMode: "="
        });