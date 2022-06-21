agmNgModuleWrapper('agms.watchlist')
    .defineControllerAsPopup('s.watchlist.EditPopupController', {
            templateUrl: '/App/shared/watchlist/watchlist.edit.html',
            windowClass: 'mini-modal',

        },
        ['watchlist', 'sWatchlistService'],
        function(vm, dep, tool) {

            var watchlist = dep.watchlist,
                sWatchlistService = dep.sWatchlistService;

            vm.isSubmitting = false;

            vm.watchlist = watchlist;
            vm.newName = angular.copy(watchlist.WatchlistName);

            var watchlists = null;
            sWatchlistService.getWatchlistsForUser().then(function(res) {
                watchlists = res.data;
            });

            vm.hasSameName = function() {
                if (!watchlists) {
                    return false;
                }
                return watchlists.filter(function(w) {
                    return w.WatchlistName === vm.newName && w.WatchlistId !== vm.watchlist.WatchlistId;
                }).length > 0;
            }

            vm.submit = function(watchlist) {
                var request = {
                    WatchlistId: watchlist.WatchlistId,
                    WatchlistName: vm.newName
                };

                vm.isSubmitting = true;
                sWatchlistService.modifyWatchlist(request).then(function(res) {
                    tool.log("Successfully edit watchlist");
                    vm.uibClosePanel();
                }, function(res) {
                    tool.log("Edit watchlist Failed");
                }).finally(function() {
                    vm.isSubmitting = false;
                });
            }
        });