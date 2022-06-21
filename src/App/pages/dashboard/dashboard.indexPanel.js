agmNgModuleWrapper('agmp.dashboard')
    .defineController('p.dashboard.IndexPanelController', ["sProductService", "sWatchlistUpdateManagerService"],
    function (vm, dep, tool) {
        var sWatchlistUpdateManagerService = dep.sWatchlistUpdateManagerService;

        var asiaSymbols = ["SG30_SGD", "HK33_HKD", "AU200_AUD", "JP225_USD", "IN50_USD", "TWIX_USD"];
        var europeSymbols = ["EU50_EUR", "UK100_GBP"];
        var americaSymbols = ["SPX500_USD"];

        function getGlobalIndicesBySymbols(symbols) {
            return dep.sProductService.GetGlobalIndicesBySymbols({
                Symbols: symbols
            }).then(function (res) {
                var products = res.data.Data;
                var indicesList = [];

                products.forEach(function (p) {
                    indicesList.push({
                        ProductModel: p
                    });
                });

                sWatchlistUpdateManagerService.changeWatchlist([], { WatchlistProducts: indicesList });
                sWatchlistUpdateManagerService.setMarketDataUpdateHandlerOnListOfWatchlistProducts(function () {
                    return indicesList;
                }, tool);

                return indicesList;
            });
        }

        tool.initialize(function () {
            tool.setVmProperties({
                asiaIndices: [],
                europeIndices: [],
                americaIndices: [],
                isLoadingIndices: false
            });

            var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (timeZone) {
                vm.timeZone = moment().tz(timeZone).format("z");
            }

            vm.isLoadingIndices = true;
            tool.onceAll([
                getGlobalIndicesBySymbols(asiaSymbols),
                getGlobalIndicesBySymbols(europeSymbols),
                getGlobalIndicesBySymbols(americaSymbols)
            ]).then(function (ress) {
                vm.asiaIndices = ress[0];
                vm.europeIndices = ress[1];
                vm.americaIndices = ress[2];
            }).finally(function () {
                vm.isLoadingIndices = false;
            });
        });
    })
    .defineDirectiveForE('agmp-dashboard-index-panel', [],
    function () {
        return {
            controller: "p.dashboard.IndexPanelController",
            templateUrl: '/App/pages/dashboard/dashboard.indexPanel.html'
        };
    },
    {
    });