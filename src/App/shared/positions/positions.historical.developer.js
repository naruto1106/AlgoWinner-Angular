agmNgModuleWrapper('agms.positions')
    .defineController('s.positions.HistoricalDeveloperController', [],
        function (vm, dep, tool) {
            tool.inheritVmController('s.positions.DeveloperBaseController');
            tool.inheritVmController('s.positions.HistoricalBaseController');
            vm.category = "Trade";
            vm.event = "Orders";
        }
    )
    .defineDirectiveForE('agms-positions-historical-developer', [],
        function() {
            return {
                restrict: 'E',
                controller: "s.positions.HistoricalDeveloperController",
                templateUrl: '/App/shared/positions/positions.historical.html'
            };
        }, {
            selectedStrategy: '=',
            isByAccount: '=',
            currency: "=",
            isLoadingPositions: "=",
            viewMode: "="
        });