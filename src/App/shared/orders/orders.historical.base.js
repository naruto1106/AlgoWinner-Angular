agmNgModuleWrapper('agms.orders')
    .defineController("s.orders.HistoricalBaseController", ['orderProcessing', 'coreConfigService'],
        function(vm, dep, tool) {
            var orderProcessing = dep.orderProcessing,
                coreConfigService = dep.coreConfigService;
            vm.orderFilter = orderProcessing.isHistorical;
            vm.coreConfigService = coreConfigService;
            vm.orderType = 'historical';
        });