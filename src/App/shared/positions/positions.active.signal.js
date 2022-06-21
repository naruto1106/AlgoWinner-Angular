agmNgModuleWrapper('agms.positions')
    .defineController('s.positions.ActiveSignalController', [],
        function(vm, dep, tool) {
            vm.isSignal = true;

            vm.activeDisplayKind = 'Signal';

            tool.inheritVmController('s.positions.ActiveBaseController');
            tool.inheritVmController('s.positions.SignalBaseController');

            vm.viewMode = "readonly";
            if (vm.isPreview) {
                vm.noPositionMessage = "Your subscription level does not allow viewing open positions";
                vm.noPositionMessageForGroupStrategy = "Your subscription level does not allow viewing open positions";
            } else {
                vm.noPositionMessage = "You have no position to display";
                vm.noPositionMessageForGroupStrategy = "No position to display";
            }
            vm.category = "MySubscriptions";
            vm.event = "TrackSubscribedStrategies";
        }
    )
    .defineDirectiveForE('agms-positions-active-signal', [],
        function() {
            return {
                controller: "s.positions.ActiveSignalController",
                templateUrl: '/App/shared/positions/positions.active.html'
            };
        }, {
            isPreview: "=",
            levelOfDetail: "=",
            noPositionMessage: "=",
            isLoadingPositions: "=",
            signalActivePositions: "=",
            currency: "=",
            selectedStrategy:"="
        });