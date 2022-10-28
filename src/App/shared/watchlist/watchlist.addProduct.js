agmNgModuleWrapper('agms.watchlist')
    .defineDirectiveForE("agms-watchlist-add-product", [],
        function () {
            return {
                controller: "s.watchlist.AddProductController",
                templateUrl: '/App/shared/watchlist/watchlist.addProduct.html'
            };
        }, {
            product: '=',
            onDismissed: '&?',
            onProductAdded: '&?'
        })
    .defineControllerAsPopup("s.watchlist.AddProductPopupController",
        {
            templateUrl: '/App/shared/watchlist/watchlist.addProductPopup.html',
            windowClass: 'default-modal'
        },
        ['sWatchlistService', 'sWatchlistUpdateManagerService', 'product'],
        function (vm, dep, tool) {
            vm.product = dep.product;
            var coreSignalRNotificationService = dep.coreSignalRNotificationService,
                sWatchlistService = dep.sWatchlistService,
                sWatchlistUpdateManagerService = dep.sWatchlistUpdateManagerService;

            function addProductToWatchlist() {
                vm.isAddingProduct = true;
                return sWatchlistUpdateManagerService.addProductToWatchlist(vm.product, vm.selectedWatchlist).then(
                    function () {
                        if (vm.onProductAdded) {
                            vm.onProductAdded({ product: vm.product });
                        }
                    },
                    function (res) {
                        var message = "An error occurred, please try again later.";
                        if (res && res.data && res.data.Message) {
                            message = res.data.Message;
                        }
                        dep.coreNotificationService.notifyError("Error", message);
                    });
            }

            function updateWatchlist() {
                return sWatchlistService.getWatchlistsForUser().then(function (res) {
                    vm.myWatchlists = res.data;
                    setFilteredWatchlist(vm.product);
                });
            }

            function setFilteredWatchlist() {
                vm.myFilteredWatchlists = vm.myWatchlists.filter(function (wl) {
                    return !isAnyProductIdInWatchList(wl, vm.product.ProductId);
                });
                if (vm.myFilteredWatchlists.length > 0) {
                    vm.selectedWatchlist = vm.myFilteredWatchlists[0];
                }
            }

            function dismiss() {
                if (vm.onDismissed) {
                    vm.onDismissed();
                }
            }

            function disableSubmit() {
                return !vm.myFilteredWatchlists || vm.myFilteredWatchlists.length <= 0;
            }

            function createNewWatchlist() {
                var dialog = tool.openModalByDefinition('s.watchlist.AddNewController', {
                    beforeOpenCallback: null
                });
                return dialog.result.then(function (watchlistId) {
                    updateWatchlist().then(function () {
                        coreSignalRNotificationService.invoke('ListenToWatchlist', watchlistId).then(
                            function () {
                                tool.log("Listening to Watchlist " + watchlistId);
                            }, function () {
                                tool.logError("Error invoking listen to watchlist");
                            });
                        setFilteredWatchlist(vm.product);
                    });
                });
            }

            function isAnyProductIdInWatchList(watchlist, productId) {
                return watchlist.WatchlistProducts.filter(function (p) {
                    return productId === p.ProductModel.ProductId;
                }).length > 0;
            }

            tool.setVmProperties({
                myFilteredWatchlists: [],
                myWatchlists: [],
                selectedWatchlist: null,
                createNewWatchlist: createNewWatchlist,
                addProductToWatchlist: addProductToWatchlist,
                dismiss: dismiss,
                disableSubmit: disableSubmit
            });
            tool.onRendered(function () {
                updateWatchlist();
            });
            vm.onDismissed = function () {
                vm.uibDismissPanel();
            }
            vm.onProductAdded = function () {
                vm.uibClosePanel({
                    product: vm.product
                });
            }
        })
    .defineController("s.watchlist.AddProductController", ['sWatchlistService', 'sWatchlistUpdateManagerService'],
        function (vm, dep, tool) {

            var coreSignalRNotificationService = dep.coreSignalRNotificationService,
                sWatchlistService = dep.sWatchlistService,
                sWatchlistUpdateManagerService = dep.sWatchlistUpdateManagerService;

            function addProductToWatchlist() {
                vm.isAddingProduct = true;
                return sWatchlistUpdateManagerService.addProductToWatchlist(vm.product, vm.selectedWatchlist).then(
                    function () {
                        if (vm.onProductAdded) {
                            vm.onProductAdded({ product: vm.product });
                        }
                    },
                    function (res) {
                        var message = "An error occurred, please try again later.";
                        if (res && res.data && res.data.Message) {
                            message = res.data.Message;
                        }
                        dep.coreNotificationService.notifyError("Error", message);
                    });
            }

            function updateWatchlist() {
                return sWatchlistService.getWatchlistsForUser().then(function (res) {
                    vm.myWatchlists = res.data;
                    setFilteredWatchlist(vm.product);
                });
            }

            function setFilteredWatchlist() {
                vm.myFilteredWatchlists = vm.myWatchlists.filter(function (wl) {
                    return !isAnyProductIdInWatchList(wl, vm.product.ProductId);
                });
                if (vm.myFilteredWatchlists.length > 0) {
                    vm.selectedWatchlist = vm.myFilteredWatchlists[0];
                }
            }

            function dismiss() {
                if (vm.onDismissed) {
                    vm.onDismissed();
                }
            }

            function disableSubmit() {
                return !vm.myFilteredWatchlists || vm.myFilteredWatchlists.length <= 0;
            }

            tool.onRendered(function () {
                updateWatchlist();
            });

            function createNewWatchlist() {
                var dialog = tool.openModalByDefinition('s.watchlist.AddNewController', {
                    beforeOpenCallback: null
                });
                return dialog.result.then(function (watchlistId) {
                    updateWatchlist().then(function () {
                        coreSignalRNotificationService.invoke('ListenToWatchlist', watchlistId).then(
                            function () {
                                tool.log("Listening to Watchlist " + watchlistId);
                            }, function () {
                                tool.logError("Error invoking listen to watchlist");
                            });
                        setFilteredWatchlist(vm.product);
                    });
                });
            }

            tool.setVmProperties({
                myFilteredWatchlists: [],
                myWatchlists: [],
                selectedWatchlist: null,
                createNewWatchlist: createNewWatchlist,
                addProductToWatchlist: addProductToWatchlist,
                dismiss: dismiss,
                disableSubmit: disableSubmit
            });
        });