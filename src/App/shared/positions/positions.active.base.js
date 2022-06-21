agmNgModuleWrapper('agms.positions')
    .defineController("s.positions.ActiveBaseController",
        ['sTradingItemService', 'coreConfigService'],
        function(vm, dep, tool) {
            var sTradingItemService = dep.sTradingItemService,
                coreConfigService = dep.coreConfigService;

            function isActive(position) {
                if (position.QuantityOnHold != null) {
                    return position.QuantityOnHold !== 0;
                } else {
                    var lastOrder = position.Orders[position.Orders.length - 1];
                    return (lastOrder && lastOrder.Intention !== 'Full Exit');
                }
            };

            tool.setVmProperties({
                marker: "open",
                positions: sTradingItemService.activePositions,
                positionFilter: isActive,
                coreConfigService: coreConfigService,
                positionChartColors: sTradingItemService.activePositionChartColors,
                quantityOnHoldChartValues: sTradingItemService.quantityOnHoldChartValues,
                exposureChartValues: sTradingItemService.exposureChartValues
            });
        });