agmNgModuleWrapper('agmp.algoOracle')
    .defineController("p.algoOracle.BoxController", ["pAlgoOracleService"],
        function (vm, dep, tool) {
            var pAlgoOracleService = dep.pAlgoOracleService;
            
            tool.initialize(function () {
                tool.setVmProperties({
                    pAlgoOracleService: pAlgoOracleService,
                    
                    closeOracleBox: pAlgoOracleService.closeOracleBox,
                    restart: pAlgoOracleService.tryAgain
                });
            });
        })
    .defineDirectiveForE("agms-algo-oracle-box", [],
        function () {
            return {
                controller: "p.algoOracle.BoxController",
                templateUrl: '/App/pages/algoOracle/algoOracle.box.html'
            };
        },
        {});