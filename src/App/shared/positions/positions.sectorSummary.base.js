agmNgModuleWrapper('agms.positions')
    .defineController("s.positions.SectorSummaryBaseController", ['sTradingItemService'],
        function(vm, dep, tool) {
            var sTradingItemService = dep.sTradingItemService;

            tool.setVmProperties({
                sectorCapitals: sTradingItemService.sectorCapitals,
                colors: sTradingItemService.sectorCapitalDonutColors,
                exposureDonutValues: sTradingItemService.exposureDonutValues,
                turnoverDonutValues: sTradingItemService.turnoverDonutValues,
                checkVisibility: checkVisibility,
                showRow: showRow,
            });

            function checkVisibilityOld() {
                return sTradingItemService.positions && sTradingItemService.positions.length > 0;
            }

            function checkVisibility() {
                return sTradingItemService.activePositions && sTradingItemService.activePositions.length > 0;
            }

            function showRow(sector) {
                return vm.showTurnover && sector.Turnover !== 0 ||
                    !vm.showTurnover && sector.Exposure !== 0;
            }
        }
    );