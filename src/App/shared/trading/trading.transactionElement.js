agmNgModuleWrapper('agms.trading')
    .defineController('s.trading.TransactionElementController', ["orderProcessing"],
        function (vm, dep, tool) {
            var orderProcessing = dep.orderProcessing,
                coreConfigService = dep.coreConfigService;

            vm.isCancellableOrder = orderProcessing.isCancellableOrder;
            vm.coreConfigService = coreConfigService;
            vm.viewOrderDetailFunc = viewOrderDetailFunc;

            function viewOrderDetailFunc(order) {
                return tool.promisedEmit('viewRelatedOrderEvent', order);
            }
        })
    .defineDirectiveForE('agms-trading-transaction-element', [], function () {
        return {
            controller: 's.trading.TransactionElementController',
            templateUrl: '/App/shared/trading/trading.transactionElement.html'
        };
    }, {
        order: '=',
        viewBracketOrderFunc: "=",
        hasBracketOrderFunc: "=",
        subscriberOrders: '='
    });