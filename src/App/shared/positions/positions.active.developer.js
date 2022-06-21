agmNgModuleWrapper('agms.positions')
    .defineController('s.positions.ActiveDeveloperController', [],
        function(vm, dep, tool) {
            tool.inheritVmController('s.positions.ActiveBaseController');
            tool.inheritVmController('s.positions.DeveloperBaseController');
            vm.activeDisplayKind = 'Developer';
            vm.category = "Trade";
            vm.event = "Orders";
        }
    )
    .defineDirectiveForE('agms-positions-active-developer', [],
        function() {
            return {
                controller: "s.positions.ActiveDeveloperController",
                templateUrl: '/App/shared/positions/positions.active.html'
            };
        }, {
            isByAccount: '=',
            canIncreaseDecrease: '=',
            currency: "=",
            isLoadingPositions: "=",
            viewMode: '=',
            selectedStrategy: "="
        });