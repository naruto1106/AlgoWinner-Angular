agmNgModuleWrapper('agms.positions')
    .defineController("DeveloperPositionSummaryController",
        ['sTradingItemService', 'sProductService'],
        function(vm, dep, tool) {
            var sTradingItemService = dep.sTradingItemService,
                sProductService = dep.sProductService;

            tool.setVmProperties({
                activePositions: sTradingItemService.activePositions,
                positions: sTradingItemService.positions,
                increasePosition: increasePosition,
                decreasePosition: decreasePosition,
                goToProduct: sProductService.goToProduct
            });

            function increasePosition(position) {
                tool.emit('increasePositionEvent', position);
            }

            function decreasePosition(position) {
                tool.emit('decreasePositionEvent', position);
            }

            tool.inheritVmController('s.positions.ActiveDeveloperController');
        }
    )
    .defineDirectiveForE('agms-positions-summary', [],
        function() {
            return {
                restrict: 'E',
                controller: "DeveloperPositionSummaryController",
                templateUrl: '/App/shared/positions/positions.summary.html'
            };
        }, {
            isByAccount: '=',
            isLoadingPositions: '=',
            viewMode: '='
        });