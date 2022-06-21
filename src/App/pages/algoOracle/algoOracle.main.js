agmNgModuleWrapper('agmp.algoOracle')
.defineController("p.algoOracle.MainController", ["pAlgoOracleService"],
    function (vm, dep, tool) {
        // --- DEPENDENCY RESOLVER
        var pAlgoOracleService = dep.pAlgoOracleService;

        function showRobot() {
            return dep.coreConfigService.AlgoOracle.ShowRobot && vm.pAlgoOracleService.isOracleOpen;
        }

        tool.initialize(function () {
            tool.setVmProperties({
                pAlgoOracleService: pAlgoOracleService,
                showRobot: showRobot
            });
        });
    })
.defineDirectiveForE("agms-algo-oracle", [],
    function () {
        return {
            controller: "p.algoOracle.MainController",
            templateUrl: '/App/pages/algoOracle/algoOracle.main.html'
        };
    },
    {});