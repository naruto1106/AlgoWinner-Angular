agmNgModuleWrapper('agmp.shop')
    .defineController('p.shop.AnalyzeController',
    ["pShopService"],
    function (vm, dep, tool) {
        var pShopService = dep.pShopService;

        function subscribe(analyze) {
            tool.openModalByDefinition("p.shop.SubscribeController", {
                strategyId: 0,
                brokerSelections: [],
                allOffers: analyze.Offers,
                mode: "normal",
                showAddOn: false
            });
        }

        function goToDetail(name) {
            if (name === "AlgoOracle") {
                dep.$window.open("/" + "#/oracle", '_blank');
            }
            if (name === "AlgoMart") {
                dep.$window.open("/" + "#/datamart", '_blank');
            }
            if (name === "AlgoChart") {
                dep.$window.open("/" + "#/chart", '_blank');
            }
        }

        tool.initialize(function () {
            tool.setVmProperties({
                isLoading: false,
                availableTools: [],

                subscribe: subscribe,
                getMinMonthlyFee: pShopService.getMinMonthlyFee,
                goToDetail: goToDetail
            });

            //get analyze tools
            vm.isLoading = true;
            pShopService.loadShopTools();
            pShopService.loadShopStrategies();

            tool.onceAll([
                pShopService.shopSmartToolsLoaded,
                pShopService.shopStrategiesLoaded
            ]).then(function () {
                vm.availableTools = pShopService.smartTools;
                if (pShopService.strategySelections.length > 0) {
                    pShopService.showStrategy = true;
                }
            }).finally(function () {
                vm.isLoading = false;
            });
        });
    });