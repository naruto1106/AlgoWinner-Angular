agmNgModuleWrapper('agmp.dashboard')
    .defineController('p.dashboard.BigWatchlistController', ['pDashboardPageService', 'sProductDefaultColumnService', 'sMenuRightClickService',
        'sWatchlistUpdateManagerService', "sHeaderService"],
    function (vm, dep, tool) {
        var pDashboardPageService = dep.pDashboardPageService,
            sProductDefaultColumnService = dep.sProductDefaultColumnService,
            sMenuRightClickService = dep.sMenuRightClickService,
            sWatchlistUpdateManagerService = dep.sWatchlistUpdateManagerService,
            sHeaderService = dep.sHeaderService;

        tool.inheritVmController('p.dashboard.SimpleWatchlistController');

        var sharedState = sWatchlistUpdateManagerService.watchlistSharedState;

        var defaultProductListOption = {
            visibility: {
                hasNominalPriceChanges: true,
                showHeader: true
            },
            menuList: sMenuRightClickService.watchlistMenuListProvider
        };

        tool.setVmProperties({
            sharedState: sharedState,
            watchlistProductListOptions: angular.extend({
                preprocessListFunc: pDashboardPageService.sortProductByCreatedTime,
                forceSorting: true,
                columns: [
                    sProductDefaultColumnService.defaultColumns.productInfo,
                    //sProductDefaultColumnService.defaultColumns.bidPrice,
                    //sProductDefaultColumnService.defaultColumns.askPrice,
                    //sProductDefaultColumnService.defaultColumns.bidVolume,
                    //sProductDefaultColumnService.defaultColumns.askVolume,
                    sProductDefaultColumnService.defaultColumns.lastTradedPrice,
                    sProductDefaultColumnService.defaultColumns.priceChanges,
                    sProductDefaultColumnService.defaultColumns.tradeVolume,
                    {
                        templateId: 'bigscreener/watchlist',
                        classNames: ['watchlist-column'],
                        title: ""
                    }
                ],
                externalVm: vm.externalVmForWatchlist
            }, defaultProductListOption)
        });

        sHeaderService.selectMenu("dashboard");
    })
    .defineDirectiveForE('agmp-dashboard-big-watchlist', [],
    function () {
        return {
            controller: "p.dashboard.BigWatchlistController",
            templateUrl: '/App/pages/dashboard/dashboard.bigWatchlist.html'
        };
    },
    {

    });