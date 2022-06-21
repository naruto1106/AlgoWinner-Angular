agmNgModuleWrapper('agms.positions')
    .defineController("s.positions.CurrentHoldingSignalController", [],
        function(vm, dep, tool) {
            if (vm.isPreview) {
                vm.noPositionMessage = "No position to display";
            }

            tool.inheritVmController('s.positions.CurrentHoldingBaseController');
            tool.inheritVmController('s.positions.SignalBaseController');

            vm.resolveHoldingSummary();
            vm.category = "MySubscriptions";
            vm.event = "TrackSubscribedStrategies";
        }
    )
    .defineDirectiveForE('agms-positions-current-holding-signal', [],
        function() {
            return {
                restrict: 'E',
                controller: "s.positions.CurrentHoldingSignalController",
                templateUrl: '/App/shared/positions/positions.currentHolding.html'
            };
        }, {
            isPreview: "=",
        });