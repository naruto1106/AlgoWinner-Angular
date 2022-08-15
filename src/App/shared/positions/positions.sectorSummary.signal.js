agmNgModuleWrapper('agms.positions')
    .defineController("s.positions.SectorSummarySignalController", ['sTradingItemService'],
        function(vm, dep, tool) {
            var $scope = dep.$scope;
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
    )
    .defineDirectiveForE('agms-positions-sector-summary-signal', [],
        function() {
            return {
                restrict: 'E',
                controller: "s.positions.SectorSummarySignalController",
                templateUrl: '/App/shared/positions/positions.sectorSummary.html'
            };
        }, {
            isPreview: '=',
            currency: "=",
            showTurnover: "="
        });