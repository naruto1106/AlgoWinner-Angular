agmNgModuleWrapper('agms.datamart')
    .defineControllerAsPopup('s.datamart.AddAlertPopupController',
    {
        templateUrl: '/App/shared/datamart/datamart.addAlert.html',
        windowClass: 'mini-modal'
    },
    ["sDatamartAlertService", "sWatchlistService", "alertToBeEdited", "isEditing"],
    function (vm, dep, tool) {
        // --- DEPENDENCY RESOLVER
        var sDatamartAlertService = dep.sDatamartAlertService,
            sWatchlistService = dep.sWatchlistService;

        // --- LOCAL SERVICE FUNC
        function groupDatamartEventsByCategory(dataMart) {
            var categoryDict = {};
            dataMart.EventTypes.forEach(function (et) {
                if (et.Category == null) {
                    et.Category = dataMart.Name;
                }
                if (!categoryDict[et.Category]) {
                    categoryDict[et.Category] = [et];
                } else {
                    categoryDict[et.Category].push(et);
                }
            });

            dataMart.CategoryDict = categoryDict;

            return dataMart;
        }

        function getSelectedWatchlistids() {
            var watchlistIds = [];
            vm.watchlists.forEach(function (w) {
                if (w.Selected) {
                    watchlistIds.push(w.WatchlistId);
                }
            });
            return watchlistIds;
        }

        function getSelectedCategories() {
            var categories = [];
            vm.productCategories.forEach(function (c) {
                if (c.Selected) {
                    categories.push(c.Category);
                }
            });
            return categories;
        }

        function getSelectedProductIds() {
            var productIds = [];
            vm.selectedProducts.forEach(function (p) {
                productIds.push(p.ProductId);
            });
            return productIds;
        }


        // --- SCOPE FUNC
        function searchProducts(keyword) {
            var markets = [];
            vm.selectedDataMart.EventTypes.forEach(function (et) {
                if (et.Name === vm.selectedEventName) {
                    et.Markets.forEach(function (m) {
                        if (!_.includes(markets, m.TradeVenue)) {
                            markets.push(m.TradeVenue);
                        }
                    });
                }
            });

            var request = {
                Keyword: keyword,
                Markets: markets
            }

            return sDatamartAlertService.searchProductByMarket(request).then(function (res) {
                return res.data;
            });
        }

        function onProductSelected() {
            vm.selectedProducts.push(vm.searchedProduct);
            vm.searchedProduct = null;
        }

        function selectDataMart(dataMart) {
            if (!dataMart.IsPremium ||
                (dataMart.IsPremium && dataMart.IsAllowedForUser)) {
                vm.selectedDataMart = groupDatamartEventsByCategory(dataMart);
                vm.selectedEventName = dataMart.EventTypes[0].Name;
                getProductCategories();
            }
        }

        function goNext() {
            vm.step++;
        }

        function goBack() {
            vm.step--;
        }

        function showNext() {
            return vm.step !== 3 && vm.step !== 4;
        }

        function showBack() {
            return vm.step !== 1 && vm.step !== 4;
        }

        function disableSubmit() {
            if (vm.selectedAlertType === 'lists') {
                var watchlistIds = getSelectedWatchlistids();
                var categories = getSelectedCategories();

                if (watchlistIds.length === 0 && categories.length === 0) {
                    return true;
                }
            }

            if (vm.selectedAlertType === 'products') {
                var productIds = getSelectedProductIds();

                if (productIds.length === 0) {
                    return true;
                }
            }

            return false;
        }

        function removeProduct(product) {
            vm.selectedProducts = vm.selectedProducts.filter(function (p) {
                return p.ProductId !== product.ProductId;
            });
        }

        function getProductCategories() {
            var eventTypeIds = [];
            vm.selectedDataMart.EventTypes.forEach(function (et) {
                if (et.Name === vm.selectedEventName) {
                    et.Markets.forEach(function (m) {
                        eventTypeIds = eventTypeIds.concat(m.EventTypeIds);
                    });
                }
            });

            var request = {
                AlgoFeedEventTypeIds: eventTypeIds
            };
            sDatamartAlertService.getProductCategories(request).then(function (res) {
                vm.productCategories = res.data;
                vm.productCategories.forEach(function (pc) {
                    pc.Selected = false;
                });

                if (vm.isEditing && vm.alertToBeEdited.ProductCategories && vm.alertToBeEdited.ProductCategories.length > 0) {
                    vm.productCategories.forEach(function (pc) {
                        if (_.includes(vm.alertToBeEdited.ProductCategories, pc.Category)) {
                            pc.Selected = true;
                        }
                    });
                }
            });
        }

        function viewProducts(list) {
            tool.openModalByDefinition('s.datamart.ProductListController', {
                list: list
            });
        }

        function confirm() {
            var watchlistIds = [];
            var categories = [];
            var productIds = [];
            var eventTypeIds = [];
            vm.isLoading = true;

            vm.selectedDataMart.EventTypes.forEach(function (et) {
                if (et.Name === vm.selectedEventName) {
                    et.Markets.forEach(function (m) {
                        eventTypeIds = eventTypeIds.concat(m.EventTypeIds);
                    });
                }
            });

            if (vm.selectedAlertType === 'lists') {
                watchlistIds = getSelectedWatchlistids();
                categories = getSelectedCategories();
            }

            if (vm.selectedAlertType === 'products') {
                productIds = getSelectedProductIds();
            }

            var request = {
                AlgoFeedEventTypeIds: eventTypeIds,
                WatchlistIds: watchlistIds,
                ProductIds: productIds,
                ProductCategories: categories
            }

            if (vm.isEditing) {
                request.DataMartAlertRuleId = vm.alertToBeEdited.DataMartAlertRuleId;
                sDatamartAlertService.modifyDataMartAlert(request).then(function () {
                    vm.step++;
                }, function (res) {
                    if (res.data && res.data.Message) {
                        dep.coreNotificationService.notifyError("Error Editing Data Mart Alert", res.data.Message);
                    }
                }).finally(function () {
                    vm.isLoading = false;
                });
            } else {
                sDatamartAlertService.createDataMartAlert(request).then(function () {
                    vm.step++;
                }, function (res) {
                    if (res.data && res.data.Message) {
                        dep.coreNotificationService.notifyError("Error Creating Data Mart Alert", res.data.Message);
                    }
                }).finally(function () {
                    vm.isLoading = false;
                });
            }
        }

        tool.initialize(function () {
            tool.setVmProperties({
                step: 1,
                selectedDataMart: {},
                selectedEventName: "",
                selectedAlertType: "lists",
                datamartSelections: [],
                watchlists: [],
                selectedProducts: [],
                searchedProduct: null,
                productCategories: [],
                alertToBeEdited: dep.alertToBeEdited,
                isEditing: dep.isEditing,
                isLoading: false,

                goNext: goNext,
                goBack: goBack,
                showNext: showNext,
                showBack: showBack,
                confirm: confirm,
                searchProducts: searchProducts,
                onProductSelected: onProductSelected,
                selectDataMart: selectDataMart,
                disableSubmit: disableSubmit,
                removeProduct: removeProduct,
                getProductCategories: getProductCategories,
                viewProducts: viewProducts
            });

            vm.isLoading = true;
            tool.onceAll([
                sDatamartAlertService.getDataMartsForAlerts(),
                sWatchlistService.getWatchlistsForUser()
            ]).then(function (ress) {
                vm.datamartSelections = ress[0].data;
                if (vm.datamartSelections && vm.datamartSelections.length > 0) {
                    if (vm.isEditing) {
                        var datamartForEditing = vm.datamartSelections.filter(function (d) {
                            return d.Name === vm.alertToBeEdited.AlgoFeedName;
                        })[0];

                        vm.selectedDataMart = groupDatamartEventsByCategory(datamartForEditing);
                        vm.selectedEventName = vm.alertToBeEdited.EventName;
                    } else {
                        var defaultDatamart = vm.datamartSelections.filter(function (d) {
                            if (!d.IsAllowedForUser) {
                                return !d.IsPremium;
                            }
                            return true;
                        })[0];

                        vm.selectedDataMart = groupDatamartEventsByCategory(defaultDatamart);
                        vm.selectedEventName = vm.selectedDataMart.EventTypes[0].Name;
                    }

                    getProductCategories();
                }

                vm.watchlists = ress[1].data;
                vm.watchlists.forEach(function (w) {
                    w.Selected = false;
                });

                if (vm.isEditing) {
                    if (vm.alertToBeEdited.Products && vm.alertToBeEdited.Products.length > 0) {
                        vm.selectedAlertType = "products";
                    }

                    if (vm.alertToBeEdited.Watchlists && vm.alertToBeEdited.Watchlists.length > 0) {
                        var selectedWatchlistIds = _.pluck(vm.alertToBeEdited.Watchlists, "WatchlistId");
                        vm.watchlists.forEach(function (w) {
                            if (_.includes(selectedWatchlistIds, w.WatchlistId)) {
                                w.Selected = true;
                            }
                        });
                    }

                    if (vm.alertToBeEdited.Products && vm.alertToBeEdited.Products.length > 0) {
                        vm.alertToBeEdited.Products.forEach(function (p) {
                            vm.selectedProducts.push({
                                ProductIconURL: p.ImageUrl,
                                ProductName: p.Name,
                                ProductId: p.ProductId
                            });
                        });
                    }
                }
            }).finally(function () {
                vm.isLoading = false;
            });
        });
    });