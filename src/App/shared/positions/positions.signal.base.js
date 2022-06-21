agmNgModuleWrapper('agms.positions')
    .defineController('s.positions.SignalBaseController', [],
        function(vm,dep,tool) {
            vm.noPositionMessage = "No position to display";
            vm.levelOfDetail = 'Premium';
            if (vm.isPreview) {
                vm.noPositionMessage = "Your subscription level does not allow viewing open positions";
            }
            tool.inheritVmController('s.positions.BaseController');
        });