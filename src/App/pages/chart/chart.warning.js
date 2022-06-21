agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.WarningController",
        [],
        function (vm, dep, tool) {
            vm.toggleWarning=function() {
                vm.showFlag = !vm.showFlag;
            }
        }
    )
    .defineDirectiveForE('agmp-chart-warning',
        [],
        function () {
            return {
                controller: "p.chart.WarningController",
                templateUrl: '/App/pages/chart/chart.warning.html'
            };
        },
        {
            showFlag:'=',
            warningCount:"="
        });
