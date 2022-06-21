agmNgModuleWrapper('agms.positions')
    .defineController("s.positions.HistoricalTableController", [],
        function(vm, dep, tool) {

            vm.showViewDetail = showViewDetail;
            vm.showPositionDetail = showPositionDetail;
            vm.viewPositionDetailFunc = viewPositionDetailFunc;

            function viewPositionDetailFunc(position) {
                return tool.promisedEmit('viewHistoricalPositionDetail', position);
            }

            function showPositionDetail() {
                return vm.isPreview ? false : true;
            }

            function showViewDetail() {
                return vm.isPreview ? false : vm.viewPositionDetailFunc;
            }
        })
    .defineDirectiveForE('agms-positions-historical-table', [],
        function() {
            return {
                restrict: 'E',
                controller: "s.positions.HistoricalTableController",
                templateUrl: '/App/shared/positions/positions.historical.table.html',
            };
        }, {
            isByAccount: '=',
            isPreview: '=',
            getPagedItems: '=',
            showDetail: '='
        });

