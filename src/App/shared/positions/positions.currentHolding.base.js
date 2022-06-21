agmNgModuleWrapper('agms.positions')
    .defineController("s.positions.CurrentHoldingBaseController", ['sTradingItemService'],
        function(vm, dep, tool) {
            var sTradingItemService = dep.sTradingItemService;

            vm.showPositionDetail = showPositionDetail;
            vm.viewPositionDetailFunc = viewPositionDetailFunc;

            function viewPositionDetailFunc(position) {
                return tool.promisedEmit('viewPositionDetailEvent', position);
            }

            function showPositionDetail() {
                return vm.isPreview ? false : true;
            }

            vm.holdingSummary = sTradingItemService.holdingSummary;
            vm.capitals = sTradingItemService.capitalSummary;

            vm.resolveHoldingSummary = function () {
                var holdingSummary = sTradingItemService.resolveHoldingSummary(vm.positions, vm.isPreview);
                vm.holdingSummary.currentNumOfLong = holdingSummary.totalLong;
                vm.holdingSummary.currentNumOfShort = holdingSummary.totalShort;
            }

            tool.eventToObservable('portfolioUpdated')
                .bufferWithTime(250)
                .subscribe(function(evts) {
                    if (evts && evts.length > 0) {
                        tool.evalAsync(vm.resolveHoldingSummary);
                    }
                });


            vm.positionFilterFunc = vm.positionFilter;
            vm.hasPositions = function () {
                return vm.holdingSummary.currentNumOfLong + vm.holdingSummary.currentNumOfShort > 0;
            }

            tool.inheritVmController('s.positions.ActiveBaseController');

            tool.initialize(function () {
                tool.setVmProperties({
                    overviewSortings: ["Product", "Allocated Exposure", "Margin Used", "Unrealized P/L (%)", "Position", "Holding Duration"],
                });
            });
        }
    );