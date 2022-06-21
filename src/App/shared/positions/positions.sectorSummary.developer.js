agmNgModuleWrapper('agms.positions')
    .defineController("s.positions.SectorSummaryDeveloperController",
        ['sTradingItemService'],
        function(vm, dep, tool) {
            tool.inheritVmController('s.positions.SectorSummaryBaseController', {
                $scope: dep.$scope,
                sTradingItemService: dep.sTradingItemService
            });
        }
    )
    .defineDirectiveForE('agms-positions-sector-summary-developer', [],
        function() {
            return {
                restrict: 'E',
                controller: "s.positions.SectorSummaryDeveloperController",
                templateUrl: '/App/shared/positions/positions.sectorSummary.html'
            };
        }, {
            currency: "=",
            showTurnover: "=",
            isLoadingSectors: "="
        });