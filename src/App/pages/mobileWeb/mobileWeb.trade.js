agmNgModuleWrapper('agmp.mobileWeb')
    .defineController("p.mobileWeb.TradeController", ["pMobileWebService"],
    function (vm, dep, tool) {

        tool.initialize(function () {
            tool.setVmProperties({
                
            });

            dep.pMobileWebService.menuTitle = "My Portfolio";
        });
    })
    .defineDirectiveForE("agmp-mobile-trade", [],
    function () {
        return {
            controller: "p.mobileWeb.TradeController",
            templateUrl: '/App/pages/mobileWeb/mobileWeb.trade.html'
        };
    },
        {
            isLoadingData: "=",
            myStrategies: "=",
            selectedStrategy: "=",
            isLoadingPositions: "=",
            isLoadingOrders: "=",
            isByAccount: "=",
            viewMode: "=",

            selectStrategyFunc: "=",
            placeOrderFunc: "="
        });