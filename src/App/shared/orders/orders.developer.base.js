agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.DeveloperBaseController', [],
        function(vm, dep, tool) {
            tool.inheritVmController('s.orders.BaseController');
            vm.levelOfDetail = 'Premium';
            vm.noOrderMessage = "You have no order to display";
            vm.noOrderMessageForGroupStrategy = "No order to display";
            vm.viewDetail = viewDetail;

            function viewDetail(position) {
            };
        }
    );