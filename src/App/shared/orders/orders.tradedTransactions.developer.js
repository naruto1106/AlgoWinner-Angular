agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.TradedTransactionsDeveloperController', [],
        function(vm, dep, tool) {
            tool.inheritVmController('BaseTradedTransactionsController');
            tool.inheritVmController('s.orders.DeveloperBaseController');
            vm.category = "Trade";
            vm.event = "Orders";
        }
    )
    .defineDirectiveForE('agms-orders-traded-transactions-developer', [],
        function() {
            return {
                restrict: 'E',
                controller: "s.orders.TradedTransactionsDeveloperController",
                templateUrl: '/App/shared/orders/orders.tradedTransactions.html'
            };
        }, {
            isLoadingOrders: "=",
            viewMode: "="
        });