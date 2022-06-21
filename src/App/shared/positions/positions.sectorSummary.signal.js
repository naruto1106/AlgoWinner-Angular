agmNgModuleWrapper('agms.positions')
    .defineController("s.positions.SectorSummarySignalController", ['sTradingItemService'],
        function(vm, dep, tool) {
            tool.inheritVmController('s.positions.SectorSummaryBaseController', {
                $scope: dep.$scope,
                sTradingItemService: dep.sTradingItemService
            });
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