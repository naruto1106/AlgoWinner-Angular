agmNgModuleWrapper('agms.positions')
    .defineController("s.positions.CurrentHoldingDeveloperController", [],
        function(vm, dep, tool) {
            tool.inheritVmController('s.positions.CurrentHoldingBaseController');
            tool.inheritVmController('s.positions.DeveloperBaseController');
            vm.resolveHoldingSummary();
            vm.category = "Trade";
            vm.event = "Orders";
        }
    )
    .defineDirectiveForE('agms-positions-current-holding-developer', [],
        function() {
            return {
                controller: "s.positions.CurrentHoldingDeveloperController",
                templateUrl: '/App/shared/positions/positions.currentHolding.html'
            };
        }, {
            isByAccount: '=',
            isLoadingPositions: "=",
            viewMode: "="
        });