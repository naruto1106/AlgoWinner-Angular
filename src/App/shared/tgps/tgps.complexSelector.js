agmNgModuleWrapper("agms.tgps")
    .defineController("s.tgps.ComplexSelectorController", [],
    function (vm, dep, tool) {

        function selectWatchlist(watchlist) {
            vm.displayedLabel = watchlist.WatchlistName;
            vm.updateSelection({
                param: {
                    type: "Watchlist",
                    value: watchlist
                }
            });
        }

        function selectVenue(venue) {
            vm.displayedLabel = venue.label;
            vm.updateSelection({
                param: {
                    type: "TradeVenue",
                    value: venue
                }
            });
        }

        tool.initialize(function () {
            tool.setVmProperties({
                displayedLabel: vm.tradeVenueLocList[0].label,
                selectWatchlist: selectWatchlist,
                selectVenue: selectVenue
            });
        });
    })
.defineDirectiveForE('agms-tgps-complex-selector', [],
        function () {
            return {
                controller: "s.tgps.ComplexSelectorController",
                templateUrl: '/App/shared/tgps/tgps.complexSelector.html'
            };
        }, {
            watchlists: "=",
            tradeVenueLocList: "=",
            updateSelection: "&"
        });