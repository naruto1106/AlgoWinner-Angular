agmNgModuleWrapper('agms.trading')
    .defineController('s.trading.CashAllocationController', ['sTradingItemService'],
        function(vm, dep, tool) {
            vm.coreConfigService = dep.coreConfigService;
            vm.capital = dep.sTradingItemService.capitalSummary;
        }
    )
    .defineDirectiveForE('agms-trading-cash-allocation', [],
        function() {
            return {
                controller: "s.trading.CashAllocationController",
                templateUrl: '/App/shared/trading/trading.cashAllocation.html'
            };
        }, {
            isLoading: '=?'
        });