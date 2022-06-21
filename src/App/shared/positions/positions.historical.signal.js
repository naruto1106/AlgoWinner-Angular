agmNgModuleWrapper('agms.positions')
    .defineController('s.positions.HistoricalSignalController', [],
        function(vm, dep, tool) {
            tool.inheritVmController('s.positions.HistoricalBaseController');
            tool.inheritVmController('s.positions.SignalBaseController');
            if (vm.isPreview) {
                vm.noPositionMessage = "Your subscription level does not allow viewing realized positions";
            }
            vm.category = "MySubscriptions";
            vm.event = "TrackSubscribedStrategies";
        }
    )
    .defineDirectiveForE('agms-positions-historical-signal', [],
        function() {
            return {
                restrict: 'E',
                controller: "s.positions.HistoricalSignalController",
                templateUrl: '/App/shared/positions/positions.historical.html'
            };
        }, {
            isPreview: "=",
            levelOfDetail: "=",
            isLoadingPositions: "=",
            currency: "=",
            noPositionMessage: "="
        });