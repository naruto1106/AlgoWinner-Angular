agmNgModuleWrapper('agms.watchlist')
    .defineControllerAsPopup('s.watchlist.AddNewController',
    {
        templateUrl: '/App/shared/watchlist/watchlist.addNew.html',
        windowClass: 'mini-modal'
    },
    ['sWatchlistService'],
        function (vm, dep, tool) {
            var sWatchlistService = dep.sWatchlistService,
                coreNotificationService = dep.coreNotificationService;

            vm.isSubmitting = false;
            vm.watchlistName = '';

            var watchlists = null;
            sWatchlistService.getWatchlistsForUser().then(function(res) {
                watchlists = res.data;
            });

            vm.hasSameName = function () {
                if (!watchlists) {
                    return false;
                }
                return watchlists.filter(function(w) {
                    return w.WatchlistName === vm.watchlistName;
                }).length > 0;
            }

            vm.submit = function (watchlistName) {
                var request = {
                    WatchlistName: watchlistName
                };
                vm.isSubmitting = true;
                sWatchlistService.addNewWatchlist(request).then(function (res) {
                    vm.newWatchlistId = res.data;
                    vm.uibClosePanel(vm.newWatchlistId);
                }, function (res) {
                    if (res.data && res.data.Message) {
                        coreNotificationService.notifyError("Failed", "Failed due to: " + res.data.Message);
                    }
                    tool.log("Add watchlist Failed: " + res.data.Message);
                }).finally(function() {
                    vm.isSubmitting = false;
                });
            }
        });