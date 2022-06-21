agmNgModuleWrapper('agms.watchlist')
    .defineControllerAsPopup('s.watchlist.DeleteProductPopupController',
    {
        templateUrl: '/App/shared/watchlist/watchlist.deleteProduct.html',
        windowClass: 'default-modal'
    },
    ['sWatchlistService', 'request'],
        function (vm,dep,tool) {

            var sWatchlistService = dep.sWatchlistService,
                request = dep.request;

            vm.isSubmitting = false;

            vm.delete = function () {
                vm.isSubmitting = true;
                sWatchlistService.deleteProductFromWatchlist(request).then(function (res) {
                    tool.log("Successfully delete product");
                    vm.uibClosePanel();
                }, function (res) {
                    tool.log("Delete product Failed");
                }).finally(function () {
                    vm.isSubmitting = false;
                });
            }
        });