agmNgModuleWrapper('agmp.backtester')
    .defineController('p.backtester.ResultController', ["pBacktesterService"],
        function (vm, dep, tool) {
            var pBacktesterService = dep.pBacktesterService;

            tool.initialize(function () {
                tool.setVmProperties({
                    pBacktesterService: pBacktesterService
                });

            });
        })
    .defineDirectiveForE('agmp-backtester-result', [],
        function () {
            return {
                controller: "p.backtester.ResultController",
                templateUrl: '/App/pages/backtester/backtester.result.html'
            };
        },
        {
        });