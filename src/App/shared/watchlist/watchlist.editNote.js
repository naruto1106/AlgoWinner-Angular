agmNgModuleWrapper('agms.watchlist')
    .defineControllerAsPopup("s.watchlist.EditNotePopupController",
    {
        templateUrl: '/App/shared/watchlist/watchlist.editNote.html',
        windowClass: 'mini-modal'
    },
    ['sWatchlistService', "watchlistProduct"],
    function (vm, dep, tool) {

        var sWatchlistService = dep.sWatchlistService;

        function saveNotes() {
            vm.watchlistProduct.Notes = vm.watchlistProduct.TemporaryNotes;
            vm.isLoadingNotesData = true;
            return sWatchlistService.addOrUpdateNotesToWatchlistProduct({
                WatchlistProductId: vm.watchlistProduct.WatchlistProductId,
                Notes: vm.watchlistProduct.Notes
            }).finally(function () {
                vm.isLoadingNotesData = false;
                vm.uibDismissPanel();
            });
        }

        function deleteNotes() {
            vm.watchlistProduct.TemporaryNotes = "";
            return saveNotes(vm.watchlistProduct);
        }

        tool.initialize(function () {
            tool.setVmProperties({
                watchlistProduct: dep.watchlistProduct,
                isLoadingNotesData: false,

                saveNotes: saveNotes,
                deleteNotes: deleteNotes
            });

            vm.watchlistProduct.TemporaryNotes = vm.watchlistProduct.Notes;

            tool.on("closeWatchlistProductNotes", function (evt, args) {
                if (args) {
                    if (args.WatchlistId === vm.watchlistProduct.WatchlistId && args.ProductModel &&
                        args.ProductModel.ProductId === vm.watchlistProduct.ProductModel.ProductId) {
                        vm.uibDismissPanel();
                    } else if (args.WatchlistId === vm.watchlistProduct.WatchlistId && !args.ProductModel) {
                        vm.uibDismissPanel();
                    }
                } else {
                    vm.uibDismissPanel();
                }
            });
        });
    });