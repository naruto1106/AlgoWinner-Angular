agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.TradedTransactionsSignalController', [],
        function(vm, dep, tool) {
            tool.inheritVmController('BaseTradedTransactionsController');
            tool.inheritVmController('BaseSignalOrderController');
            if (tool.isPreview) {
                tool.noOrderMessage = "Your subscription level does not allow viewing today's trades";
            } else {
                tool.noOrderMessage = "No trades to display";
            }
            tool.category = "MySubscriptions";
            tool.event = "TrackSubscribedStrategies";
        }
    )
    .defineDirectiveForE('agms-orders-traded-transactions-signal', [],
        function() {
            return {
                controller: "s.orders.TradedTransactionsSignalController",
                templateUrl: '/App/shared/orders/orders.tradedTransactions.html'
            };
        }, {
            isPreview: '=',
            isLoadingOrders: "=",
            noOrderMessage: "=",
            subscriberOrders: '='
        });