agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.HistoricalSignalController', [],
        function(vm, dep, tool) {
            tool.inheritVmController('s.orders.HistoricalBaseController');
            tool.inheritVmController('BaseSignalOrderController');
            vm.historicalDisplayKind = 'Signal';

            if (vm.isPreview) {
                vm.noOrderMessage = "Your subscription level does not allow viewing historical orders";
            }
            vm.category = "MySubscriptions";
            vm.event = "TrackSubscribedStrategies";
        }
    )
    .defineDirectiveForE('agms-orders-historical-signal', [],
        function() {
            return {
                controller: "s.orders.HistoricalSignalController",
                templateUrl: '/App/shared/orders/orders.historical.html'
            };
        }, {
            currency: '=',
            isPreview: "=",
            levelOfDetail: "=",
            isLoadingOrders: "=",
            noOrderMessage: "="
        });