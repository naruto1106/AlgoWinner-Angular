agmNgModuleWrapper("agms.tgps")
    .defineControllerAsPopup("s.tgps.FundamentalFilterController",
        {
            templateUrl: '/App/shared/tgps/tgps.fundamentalFilter.html',
            windowClass: 'default-modal'
        },
        ['fundamentals', 'sMarketEntitlementService', 'sTgpsScreenerService'],
        function (vm, dep, tool) {
            var sTgpsScreenerService = dep.sTgpsScreenerService,
                sMarketEntitlementService = dep.sMarketEntitlementService;

            function closePanel() {
                var returnedFundamentals = {};
                vm.fundamentalList.forEach(function(f) {
                    returnedFundamentals[f.TradeVenue] = f;
                    f.tradeVenueDetail = null;
                });
                vm.uibClosePanel(returnedFundamentals);
            }

            function showMarketCap(mc) {
                return mc.name;
            }

            function generateFundamentalList(fundamentals) {
                var fundamentalList = [];
                for (var key in fundamentals) {
                    var fundamental = angular.copy(fundamentals[key]);
                    var hasTradeVenue = sMarketEntitlementService.tradeVenuesDict[key];
                    if (hasTradeVenue) {
                        fundamental.tradeVenueDetail = sMarketEntitlementService.tradeVenuesDict[key];
                        fundamental.TradeVenue = sMarketEntitlementService.tradeVenuesDict[key].TradeVenue;
                        fundamentalList.push(fundamental);
                    }
                }
                return fundamentalList;
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    closePanel:closePanel,
                    fundamentalList: generateFundamentalList(dep.fundamentals),
                    showRange: sTgpsScreenerService.showRange,
                    showMarketCap: showMarketCap
                });
            });
        });