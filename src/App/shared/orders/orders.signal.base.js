agmNgModuleWrapper('agms.orders')
    .defineController('BaseSignalOrderController', [],
        function(vm, dep, tool) {
            tool.inheritVmController('s.orders.BaseController');
            vm.isSignal = true;

            vm.noOrderMessage = "No orders to display";
            vm.levelOfDetail = 'Premium';
            vm.viewDetail = viewDetail;

            function viewDetail(position) {
            };
        });