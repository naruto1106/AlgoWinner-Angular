agmNgModuleWrapper('agms.watchlist')
    .defineControllerAsPopup('s.watchlist.DeleteController',
    {
        templateUrl: '/App/shared/watchlist/watchlist.delete.html',
        windowClass: 'mini-modal'
    },
    ['sWatchlistService', 'watchlistId'],
        function (vm, dep, tool) {
            var sWatchlistService = dep.sWatchlistService,
                watchlistId = dep.watchlistId;

            vm.isSubmitting = false;

            vm.delete = function () {
                var request = {
                    WatchlistId: watchlistId
                };
                vm.isSubmitting = true;
                sWatchlistService.deleteWatchlist(request).then(function (res) {
                    tool.log("Successfully delete watchlist");
                    vm.uibClosePanel();
                }, function (res) {
                    tool.log("Delete watchlist Failed");
                }).finally(function () {
                    vm.isSubmitting = false;
                });
            }
        });