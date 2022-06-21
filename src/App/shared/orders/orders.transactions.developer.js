agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.TransactionsDeveloperController', ["orderProcessing"],
        function (vm, dep, tool) {
            vm.orderType = 'mixed';
            tool.inheritVmController('s.orders.DeveloperBaseController');
            vm.orderFilter = function (order) {
                return (order.ParentOrderId == null && order.ParentPortfolioId == null) ||
                       (order.ParentOrderId !== null && order.LatestStatus === "Filled") ||
                       (order.ParentPortfolioId !== null && (order.LatestStatus === "Filled" || dep.orderProcessing.isActive(order)));
            }
        }
    )
    .defineDirectiveForE('agms-orders-transactions-developer', [],
        function() {
            return {
                controller: "s.orders.TransactionsDeveloperController",
                templateUrl: '/App/shared/orders/orders.transactions.html'
            };
        }, {
            selectedStrategy: '=',
            isByAccount: '=',
            showCancelButton: '=',
            isLoadingOrders: "=",
            viewMode: '='
        });