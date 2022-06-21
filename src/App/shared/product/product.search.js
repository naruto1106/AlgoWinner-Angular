agmNgModuleWrapper('agms.product')
    .defineController('s.product.SearchController', [],
        function (vm, dep, tool) {

            vm.isEditingModel = false;
            vm.isLoading = false;
            
            var populatedDataDeferredInfo = null;
            var displayedItemDeferredInfo = null;
            var emptyState = function () {
                vm.model = null;
                displayedItemDeferredInfo = null;
                vm.onProductSelected(null);
            }
            vm.emptyState = emptyState;
            tool.onRendered(function () {
                var onStartEdit = function (e) {
                    tool.log("Start Editing");
                    e.stopPropagation();
                    tool.timeout(function() {
                        startEdit();
                    });
                };
                var onStopEdit = function(e) {
                    tool.log("Stop Editing");
                    e.stopPropagation();
                    tool.timeout(function() {
                        stopEdit();
                    });
                };
                vm.getTextBox().on('click', function (e) {
                    tool.log("Start click textbox");
                    onStartEdit(e);
                });
                vm.getTextBox().on('keypress', function (e) {
                    tool.log("Start keypress textbox");
                    onStartEdit(e);
                });                
                vm.getTextDesc().on('click', function (e) {
                    tool.log("Start click textdesc");
                    onStartEdit(e); 
                });

                vm.getTextBox().on('keydown', function (e) {
                    e.stopPropagation();
                    tool.timeout(function () {
                        tool.log("keypress");
                        handleEmptyText();
                        var val = vm.getTextBox().val();
                        vm.lastText = val;
                    });
                });
                vm.getTextBox().on('blur focusout', onStopEdit);
                vm.getTextDesc().on('blur focusout', onStopEdit);

                $(dep.$document).click(function (e) {
                    var container = vm.getEditor();
                    if (!container.is(e.target) && container.has(e.target).length === 0) {
                        tool.timeout(function () {
                            stopEdit();
                        });
                    }
                });
            });

            function handleEmptyText() {
                var val = vm.getTextBox().val();

                if (!val || !val.trim()) {
                    emptyState();
                }
            }

            function handlePopulatedProduct(promise) {
               
                promise.then(function (list) {
                    tool.log("new list " + list.length);
                    if (list.length === 1) {
                        tool.log("new selected " + list[0].Symbol);
                        handleOnProductSelected(list[0]);
                    } else {
                        emptyState();
                    }
                });
            }

            function stopEdit() {
                if (displayedItemDeferredInfo) {
                    displayedItemDeferredInfo.deferred.reject();
                }
                if (!vm.isEditingModel) {
                    return;
                }
                var val = vm.getTextBox().val();
                var isWaitingForTheLatestPromise = populatedDataDeferredInfo && populatedDataDeferredInfo.id === val;
                if (isWaitingForTheLatestPromise) {
                    handlePopulatedProduct(populatedDataDeferredInfo.deferred.promise);
                } else {
                    if (val) {
                        vm.searchProductsThen(val);
                    }
                }
                setStopEditFlag();
            }

            function setStopEditFlag() {
                vm.isEditingModel = false;
                vm.getTextBox().blur();
            }

            function startEdit() {
                if (vm.isEditingModel) {
                    return;
                }
                vm.isEditingModel = true;
                vm.getTextBox().focus();
                if (vm.model) {
                    vm.text = vm.model.ProductName;
                    vm.searchProductsThen(vm.text);
                }
            }

            vm.showSelectedModel = function () {
                return vm.model && !vm.isEditingModel;
            }

            vm.onProductSelectedThenExit = function (item) {
                handleOnProductSelected(item);
                setStopEditFlag();
            }

            function handleOnProductSelected(item) {
                if (!item) {
                    return;
                }
                vm.model = item;
                vm.onProductSelected(vm.model);
            };

            function generateDeferredIdentifier(id) {
                return {
                    id: id,
                    deferred: tool.defer()
                };
            };

            vm.searchProductsThen = function (val) {
                if (!val) {
                    return [];
                }
                val = val.trim();
                tool.log("SEARCHING PRODUCT");

                vm.isDirty = true;
                vm.isLoading = true;
                if (displayedItemDeferredInfo) {
                    displayedItemDeferredInfo.deferred.reject();
                }
                if (populatedDataDeferredInfo) {
                    populatedDataDeferredInfo.deferred.reject();
                }

                displayedItemDeferredInfo = generateDeferredIdentifier(val);
                populatedDataDeferredInfo = generateDeferredIdentifier(val);
                vm.searchProducts(val).then(function (list) {
                    populatedDataDeferredInfo.deferred.resolve(list);
                    tool.log("searching for keyword: '" + populatedDataDeferredInfo.id + "', EDIT? " + vm.isEditingModel);
                    if (vm.isEditingModel) {
                        vm.model = null;
                        displayedItemDeferredInfo.deferred.resolve(list);
                    } else {
                        handlePopulatedProduct(populatedDataDeferredInfo.deferred.promise);
                        displayedItemDeferredInfo.deferred.reject();
                    }
                }, function () {
                    displayedItemDeferredInfo.deferred.reject();
                    populatedDataDeferredInfo.deferred.reject();
                }).finally(function () {
                    vm.isLoading = false;
                });
                return displayedItemDeferredInfo.deferred.promise;
            }
        }
    )
    .defineDirectiveForE('agms-product-search', [],
        function () {
            return {
                controller: 's.product.SearchController',
                templateUrl: '/App/shared/product/product.search.html'
            };
        },
        {
            model: "=",
            searchProducts: '=',
            onProductSelected: '=',
            placeholder:"@?",
            autoSelectOnSingleSearchResult: '=?',
            listenOnResolve: '=?'
        },
        function (scope, element) {
            var vm = scope.vm;
            vm.getTextDesc = function () {
                return $(element).find('[text-desc]');
            }
            vm.getTextBox = function () {
                return $(element).find('[text-box]');
            }
            vm.getEditor = function () {
                return $(element).find('[editor]');
            }
            
            if (vm.listenOnResolve) {
                vm.listenOnResolve.resolve = function (item) {
                    vm.isLoading = false;
                    vm.isEditingModel = false;
                    if (item) {
                        vm.isDirty = true;
                        vm.onProductSelectedThenExit(item);
                    } else {
                        vm.isDirty = false;
                        vm.emptyState();
                        vm.text = "";
                        vm.isEditingModel = false;
                    }
                }
            }
        });