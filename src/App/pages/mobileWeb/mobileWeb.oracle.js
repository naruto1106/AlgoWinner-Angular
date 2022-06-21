agmNgModuleWrapper('agmp.mobileWeb')
    .defineController("p.mobileWeb.OracleController", ["commonScreenResizerService", "pAlgoOracleService", "pMobileWebService"],
    function (vm, dep, tool) {
        var pMobileWebService = dep.pMobileWebService;

        tool.initialize(function () {
            tool.setVmProperties({
                pMobileWebService: pMobileWebService
            });

            dep.commonScreenResizerService.setFooterVisibility(false);
            dep.pAlgoOracleService.isOracleOpen = true;
            pMobileWebService.menuTitle = "AlgoOracle";

            tool.onDestroy(function () {
                dep.commonScreenResizerService.setFooterVisibility(true);
            });
        });
    })
    .defineDirectiveForE("agmp-mobile-oracle", [],
    function () {
        return {
            controller: "p.mobileWeb.OracleController",
            templateUrl: '/App/pages/mobileWeb/mobileWeb.oracle.html'
        };
    },
    {});