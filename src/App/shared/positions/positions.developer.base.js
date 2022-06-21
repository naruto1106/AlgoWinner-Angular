agmNgModuleWrapper('agms.positions')
    .defineController('s.positions.DeveloperBaseController', [],
        function(vm, dep, tool) {
            vm.noPositionMessage = "You have no position to display";
            vm.noPositionMessageForGroupStrategy = "No position to display";
            vm.levelOfDetail = 'Premium';
            vm.copyPosition = null;

            tool.inheritVmController('s.positions.BaseController');
        });