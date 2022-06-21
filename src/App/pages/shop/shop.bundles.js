agmNgModuleWrapper('agmp.shop')
    .defineController('p.shop.BundleController',
    ["pShopService"],
    function (vm, dep, tool) {
        var pShopService = dep.pShopService;

        function subscribe(bundle) {
            tool.openModalByDefinition("p.shop.SubscribeController", {
                strategyId: 0,
                brokerSelections: [],
                allOffers: bundle.Offers,
                mode: "normal",
                showAddOn: false
            });
        }

        tool.initialize(function () {
            tool.setVmProperties({
                isLoading: false,
                availableBundles: [],

                subscribe: subscribe
            });

            vm.isLoading = true;
            pShopService.loadShopBundles();
            pShopService.loadShopStrategies();

            tool.onceAll([
                pShopService.shopBundlesLoaded,
                pShopService.shopStrategiesLoaded
            ]).then(function () {
                vm.availableBundles = pShopService.bundles;
                if (pShopService.strategySelections.length > 0) {
                    pShopService.showStrategy = true;
                }
            }).finally(function () {
                vm.isLoading = false;
            });
        });
    });