agmNgModuleWrapper('agms.product')
    .defineDirectiveForE('agms-tgps-product-list', [],
        function (dep) {
            return {
                transclude: true,
                controller: "s.product.TgpsListController",
                templateUrl: '/App/shared/product/tgps-product.list.html'
            };
        },
        {
            productContainerList: '=?',
            options: '=',
            headerOnly: "=?"
        })
    .defineService('sProductDefaultColumnService', ["coreUtil"], function (serviceObj, dep, tool) {
        var defaultColumns = {};
        var coreUtil = dep.coreUtil;

        defaultColumns.productInfo = {
            templateId: 'default-product-list/product-info',
            classNames: ['product-info'],
            title: "Product",
            sortingFunc: function (a, b) {
                if (a.ProductModel && b.ProductModel) {
                    return coreUtil.sortName(a.ProductModel.ProductName, b.ProductModel.ProductName);
                }
                return 0;
            },
            sortingDirection: -1
        };
        defaultColumns.productName = {
            templateId: 'default-product-list/product-name',
            classNames: ['product-name'],
            title: "PRODUCT",
            sortingFunc: function (a, b) {
                if (a.ProductModel && b.ProductModel) {
                    return coreUtil.sortName(a.ProductModel.ProductName, b.ProductModel.ProductName);
                }
                return 0;
            },
            sortingDirection: -1
        };
        defaultColumns.productSymbol = {
            templateId: 'default-product-list/product-symbol',
            classNames: ['product-symbol'],
            title: "SYMBOL",
            sortingFunc: function (a, b) {
                if (a.ProductModel && b.ProductModel) {
                    return coreUtil.sortName(a.ProductModel.Symbol, b.ProductModel.Symbol);
                }
                return 0;
            },
            sortingDirection: -1
        };
        defaultColumns.bidPrice = {
            templateId: 'default-product-list/bid-price',
            classNames: ['bid-price'],
            title: "Bid",
            sortingFunc: function (a, b) {
                if (a.MarketData.BidPrice != null && b.MarketData.BidPrice != null) {
                    return coreUtil.sortValue(a.MarketData.BidPrice, b.MarketData.BidPrice);
                }
                return 0;
            }
        };
        defaultColumns.askPrice = {
            templateId: 'default-product-list/ask-price',
            classNames: ['ask-price'],
            title: "Ask",
            sortingFunc: function (a, b) {
                if (a.MarketData.AskPrice != null && b.MarketData.AskPrice != null) {
                    return coreUtil.sortValue(a.MarketData.AskPrice, b.MarketData.AskPrice);
                }
                return 0;
            }
        };
        defaultColumns.bidVolume = {
            templateId: 'default-product-list/bid-volume',
            classNames: ['bid-volume'],
            title: "Bid Vol",
            sortingFunc: function (a, b) {
                if (a.MarketData.BidSize != null && b.MarketData.BidSize != null) {
                    return coreUtil.sortValue(a.MarketData.BidSize, b.MarketData.BidSize);
                }
                return 0;
            }
        };
        defaultColumns.askVolume = {
            templateId: 'default-product-list/ask-volume',
            classNames: ['ask-volume'],
            title: "Ask Vol",
            sortingFunc: function (a, b) {
                if (a.MarketData.AskSize != null && b.MarketData.AskSize != null) {
                    return coreUtil.sortValue(a.MarketData.AskSize, b.MarketData.AskSize);
                }
                return 0;
            }
        };
        defaultColumns.lastTradedPrice = {
            templateId: 'default-product-list/last-traded-price',
            classNames: ['last-traded-price'],
            title: "Last",
            sortingFunc: function (a, b) {
                if (a.MarketData.LastTradedPrice != null && b.MarketData.LastTradedPrice != null) {
                    return coreUtil.sortValue(a.MarketData.LastTradedPrice, b.MarketData.LastTradedPrice);
                }
                return 0;
            }
        };
        defaultColumns.priceChanges = {
            templateId: 'default-product-list/price-changes',
            classNames: ['price-changes'],
            title: "Change",
            sortingFunc: function (a, b) {
                if (a.MarketData.LastTradedPriceDiff != null && b.MarketData.LastTradedPriceDiff != null) {
                    return coreUtil.sortValue(a.MarketData.LastTradedPriceDiff, b.MarketData.LastTradedPriceDiff);
                }
                return 0;
            }
        };
        defaultColumns.compactPriceChanges = {
            templateId: 'default-product-list/compact-price-changes',
            classNames: ['compact-price-changes'],
            title: "Last",
            sortingFunc: function (a, b) {
                if (a.MarketData.LastTradedPrice != null && b.MarketData.LastTradedPrice != null) {
                    return coreUtil.sortValue(a.MarketData.LastTradedPrice, b.MarketData.LastTradedPrice);
                }
                return 0;
            }
        };
        defaultColumns.tradeVolume = {
            templateId: 'default-product-list/trade-volume',
            classNames: ['trade-volume'],
            title: "Volume",
            sortingFunc: function (a, b) {
                if (a.MarketData.CumulativeVolume != null && b.MarketData.CumulativeVolume != null) {
                    return coreUtil.sortValue(a.MarketData.CumulativeVolume, b.MarketData.CumulativeVolume);
                }
                return 0;
            }
        };

        serviceObj.defaultColumns = defaultColumns;
    })
    .defineController('s.product.TgpsListController', ['commonPixelPositioningSystemService'],
        function (vm, dep, tool) {
            var commonPixelPositioningSystemService = dep.commonPixelPositioningSystemService;
            var defaultVisibility = {
                hasNominalPriceChanges: false,
                readyToRender: false
            };

            function getPriceChangesCss(productContainer) {
                return {
                    'up': vm.getMarketData(productContainer).LastTradedPriceDiff >= 0
                };
            }

            function getBidPriceChangesCss(productContainer) {
                return {
                    'up': vm.getMarketData(productContainer).BidPriceChanges > 0,
                    'down': vm.getMarketData(productContainer).BidPriceChanges < 0
                };
            }

            function getAskPriceChangesCss(productContainer) {
                return {
                    'up': vm.getMarketData(productContainer).AskPriceChanges > 0,
                    'down': vm.getMarketData(productContainer).AskPriceChanges < 0
                };
            }

            var defaultProcessListFunc = function (list) {
                return list;
            }

            var defaultPagination = {
                maxSize: 10,
                itemsPerPage: 12
            }

            tool.onRendered(function () {
                if (vm.options.visibility) {
                    vm.visibility = vm.options.visibility;
                }
                if (vm.options.pagination) {
                    vm.pagination = vm.pagination;
                }

                if (vm.options.externalVm) {
                    dep.$scope.externalVm = vm.options.externalVm;
                }
                vm.options.columns.forEach(function (col) {
                    if (col.defaultSorting) {
                        sortByThisColumn(col, col.defaultSorting);
                    }
                    if (col.sortingDirection) {
                        sortByThisColumn(col, col.sortingDirection);
                    }
                });
                if (vm.visibility.enableVirtualization) {
                    vm.scrollOptions.mouseWheelPixels = vm.visibility.enableVirtualization.height + 1;

                }
                var tableBody = $(vm._getDirectiveElement()).find('.table-body');
                var tableRef = $(vm._getDirectiveElement()).find('.table-ref');
                window.setInterval(function () {
                    tableRef.width(tableBody.width());
                }, 100);

                vm.readyToRender = true;
            });

            function openPopup(productContainer, $event) {
                if (!vm.options.menuList) {
                    return true;
                }

                $event.stopPropagation();
                commonPixelPositioningSystemService.showPopup({
                    event: $event,
                    ref: 'pointer',
                    item: {
                        menuList: vm.options.menuList,
                        productContainer: productContainer
                    },
                    templateId: '/App/shared/templates/shared.dropdownMenu.template.html'
                });
                dep.$rootScope.$broadcast('productList.onRightClick', {
                    productContainer: productContainer
                });
                return false;
            }

            function closePopup() {
                commonPixelPositioningSystemService.closePopup();
            }

            function postprocessList(list) {
                if (!list)
                    return [];
                var portprocessor = vm.options.postprocessListFunc || defaultProcessListFunc;
                return portprocessor(list);
            }

            function preprocessList(list) {
                if (!list)
                    return [];
                var preprocessor = vm.options.preprocessListFunc || defaultProcessListFunc;
                return preprocessor(list);
            }

            function preprocessFilterList(list) {
                if (!list)
                    return [];
                var preprocessor = vm.options.preprocessFilterListFunc || defaultProcessListFunc;
                return preprocessor(list);
            }

            function defaultGetMarketData(productContainer) {
                return productContainer.MarketData;
            }

            function defaultGetProduct(productContainer) {
                return productContainer.ProductModel;
            }

            function test(item) {
                tool.log(defaultGetProduct(item).Symbol);
            }

            function showPagination() {
                return vm.paginationModel.numPages > 1;
            }

            var currentVirtualizationState = {
                top: 0,
                scrollTop: 0,

                buffer: {
                    from: 0,
                    to: 60
                },
                lastClippedList: [],
                list: []
            };


            function updateHeight(list) {
                currentVirtualizationState.itemCount = list.length;
                updateScrollHeight();
            }

            function onStateApplied() {
                return;
                var tableRef = $(vm._getDirectiveElement()).find('.table-ref');
                if (vm.visibility.enableVirtualization && currentVirtualizationState.itemCount > 0) {
                    var rowHeight = vm.visibility.enableVirtualization.height;
                    if (vm.visibility.enableVirtualization.fitOnTop) {
                        var negativeOffset = (currentVirtualizationState.topIndex - currentVirtualizationState.buffer.from) * rowHeight;
                        currentVirtualizationState.topIndex = Math.floor(currentVirtualizationState.scrollTop / rowHeight);
                        tableRef.css('margin-top', currentVirtualizationState.scrollTop - negativeOffset);
                    } else {
                        tableRef.css('margin-top', currentVirtualizationState.topIndex * rowHeight);
                    }
                }
            }

            function updateState() {

                if (vm.visibility.enableVirtualization && currentVirtualizationState.itemCount > 0) {

                    var topProgress = currentVirtualizationState.scrollTop / (currentVirtualizationState.tableHeight - currentVirtualizationState.containerHeight);

                    currentVirtualizationState.topIndex = Math.ceil(topProgress * (currentVirtualizationState.itemCount - currentVirtualizationState.itemPerView));
                    currentVirtualizationState.buffer.from = currentVirtualizationState.topIndex;
                    currentVirtualizationState.buffer.to = currentVirtualizationState.topIndex + currentVirtualizationState.itemPerView;
                    if (currentVirtualizationState.buffer.from < 0) {
                        currentVirtualizationState.buffer.from = 0;
                    }
                    currentVirtualizationState.lastClippedList = currentVirtualizationState.list.slice(currentVirtualizationState.buffer.from, currentVirtualizationState.buffer.to + 1);
                    var tableRef = $(vm._getDirectiveElement()).find('.table-ref');
                    tableRef.css('top', currentVirtualizationState.scrollTop);
                }
            }

            function updateScrollHeight() {
                if (vm.visibility.enableVirtualization) {
                    var rowHeight = vm.visibility.enableVirtualization.height;
                    var virtualizationContainer = $(vm._getDirectiveElement()).find('.virtual-table-scrollbox');
                    currentVirtualizationState.tableHeight = (currentVirtualizationState.itemCount + 1) * rowHeight;
                    virtualizationContainer.height(currentVirtualizationState.tableHeight);
                    var containerHeight = $(vm._getDirectiveElement()).find('.virtual-table-scrollbox-container').height();
                    currentVirtualizationState.itemPerView = Math.floor(containerHeight / rowHeight);
                    currentVirtualizationState.containerHeight = containerHeight;
                }
            }

            var hasUnsyncRender = false;

            window.setInterval(function () {
                if (hasUnsyncRender) {
                    tool.evalAsync();
                    hasUnsyncRender = false;
                }
            }, 500);
            var scrollOptions = {
                theme: 'inset-3-dark',
                callbacks: {
                    whileScrolling: function () {
                        currentVirtualizationState.scrollTop = -this.mcs.top;
                        updateState();
                        hasUnsyncRender = true;
                    },
                    onScrollStart: function () {
                        updateScrollHeight();
                    },
                    onScroll: function () {
                        currentVirtualizationState.scrollTop = -this.mcs.top;
                        updateState();
                        hasUnsyncRender = false;
                        tool.evalAsync();
                        tool.log("finish total scroll");
                    }
                }
            };

            function getListedStocks() {
                var newList = preprocessFilterList(vm.productContainerList);                
                if (vm.selectedColumnForSort && vm.selectedColumnForSort.sortingFunc && vm.selectedColumnForSort.sortingDirection !== 0) {
                    newList = [].concat(newList);
                    newList.sort(function (a, b) {
                        return vm.selectedColumnForSort.sortingDirection * vm.selectedColumnForSort.sortingFunc(a, b);
                    });
                } else {
                    newList = preprocessList(newList);
                }
                vm.preprocessListCount = newList.length;

                if (vm.visibility.hasPagination) {
                    var items = _.take(_.drop(newList, (vm.paginationModel.currentPage - 1) * vm.pagination.itemsPerPage), vm.pagination.itemsPerPage);
                    return postprocessList(items);
                } else if (vm.visibility.enableVirtualization) {

                    var list = postprocessList(newList);
                    updateHeight(list);
                    currentVirtualizationState.list = list;
                    updateState();
                    hasUnsyncRender = false;
                    onStateApplied();

                    return currentVirtualizationState.lastClippedList;
                } else {
                    return postprocessList(newList);
                }
            }

            function getRowClass(row) {
                if (vm.options.getRowClass) {
                    return vm.options.getRowClass(row);
                } else {
                    return [];
                }
            }

            function isSelectedColumnForSortDesc(col) {
                //return col.sortingDirection === -1 && vm.selectedColumnForSort === col;
                return col.sortingDirection === -1;
            };

            function isSelectedColumnForSortAsc(col) {
                //return col.sortingDirection === 1 && vm.selectedColumnForSort === col;
                return col.sortingDirection === 1;
            };

            function sortByThisColumn(col, direction) {

                if (col && col.sortingFunc) {

                    if (direction == undefined) {
                        if (col !== vm.selectedColumnForSort) {
                            col.sortingDirection = -1;
                            vm.selectedColumnForSort = col;
                        } else {
                            if (col.sortingDirection === -1) {
                                col.sortingDirection = 1;
                            } else if (col.sortingDirection === 1 && !vm.options.forceSorting) {
                            } else {
                                col.sortingDirection = -1;
                            }
                            vm.selectedColumnForSort = col;
                        }
                    } else {
                        col.sortingDirection = direction;
                        vm.selectedColumnForSort = col;
                    }

                    //direct user to the first page
                    vm.paginationModel.currentPage = 1;
                }
            };

            var eodTradeVenues = ['HK', 'MY', 'CN'];
            function isEodTradeVenue(tradeVenue) {
                return _.includes(eodTradeVenues, tradeVenue);
            }

            vm.isVisibleLeftArrow = false;
            vm.isVisibleRightArrow = true;
            vm.setScrollNumber = 0;
            function scrollLeft(){
                document.querySelector('.table-wrapper').scrollLeft -= 80;
                if(document.querySelector('.table-wrapper').scrollLeft > 0){
                    vm.isVisibleLeftArrow = true;
                    vm.isVisibleRightArrow = true;
                } else {
                    vm.isVisibleLeftArrow = false;
                }
                if(document.querySelector('.table-wrapper').scrollLeft == 0){
                    vm.isVisibleRightArrow = true;
                }
                vm.setScrollNumber = document.querySelector('.table-wrapper').scrollLeft;
            }
                        
            function scrollRight(){                
                document.querySelector('.table-wrapper').scrollLeft += 80;
                if(document.querySelector('.table-wrapper').scrollLeft > 0){
                    vm.isVisibleLeftArrow = true;
                } else {
                    vm.isVisibleLeftArrow = false;
                }
                if(vm.setScrollNumber == document.querySelector('.table-wrapper').scrollLeft){
                    vm.isVisibleRightArrow = false;
                } else {
                    vm.isVisibleRightArrow = true;
                }                
                vm.setScrollNumber = document.querySelector('.table-wrapper').scrollLeft;
            }

            tool.setVmProperties({
                scrollOptions: scrollOptions,
                getPriceChangesCss: getPriceChangesCss,
                getBidPriceChangesCss: getBidPriceChangesCss,
                getAskPriceChangesCss: getAskPriceChangesCss,
                selectedColumnForSort: null,
                sortByThisColumn: sortByThisColumn,
                isSelectedColumnForSortAsc: isSelectedColumnForSortAsc,
                isSelectedColumnForSortDesc: isSelectedColumnForSortDesc,
                getMarketData: defaultGetMarketData,
                getProduct: defaultGetProduct,
                test: test,
                getRowClass: getRowClass,
                paginationModel: {
                    currentPage: 1,
                    numPages: 0
                },
                openPopup: openPopup,
                closePopup: closePopup,
                visibility: defaultVisibility,
                pagination: defaultPagination,
                showPagination: showPagination,
                getListedStocks: getListedStocks,
                isEodTradeVenue: isEodTradeVenue,
                scrollLeft: scrollLeft,
                scrollRight: scrollRight
            });
        });