agmNgModuleWrapper('agms.orders')
    .defineController("s.orders.ActiveBaseController", ['orderProcessing', 'coreConfigService'],
        function(vm, dep, tool) {
            var orderProcessing = dep.orderProcessing,
                coreConfigService = dep.coreConfigService;

            vm.coreConfigService = coreConfigService;
            vm.initialOrderFilter = orderProcessing.isActive;
            vm.orderType = 'active';

            tool.initialize(function () {
                tool.setVmProperties({
                    activeOrderViewFilters: ['No Filter', 'Processed by Broker', 'Queued', 'Partially Filled'],
                });
            });
        });