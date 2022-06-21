agmNgModuleWrapper('agmp.chart')
    .defineControllerAsPopup('p.chart.ComparePanelController',
        {
            templateUrl: '/App/pages/chart/chart.comparePanel.html',
            windowClass: 'tiny-modal'
        },
        ['pChartService', 'pChartProductLoaderService',
            'pChartRenderingUtilsService',
            'pChartFundamentalHelperService',
            'pChartFilterDescriptionService',
            'sProductService',
            'pChartTgpsService'
        ],
        function (vm, dep, tool) {
            tool.inheritVmController('p.chart.SecurityControllerBase');
            var coreNotificationService = dep.coreNotificationService,
                pChartFundamentalHelperService = dep.pChartFundamentalHelperService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                pChartService = dep.pChartService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartTgpsService = dep.pChartTgpsService,
                pChartProductLoaderService = dep.pChartProductLoaderService;

            var filterDescription = pChartFilterDescriptionService;

            var maxCount = 2;
            var advanced = {
                hasPrice: true,
                hasFundamentals: false,
                fundamentals: [],
                maxFundamentalCount: 2,
            };

            function addToComparisons(product) {
                if (hasReachedMaxCount()) {
                    coreNotificationService.notifyError("Reaching Limit", "You can only add up to " + maxCount + " products.");
                    return;
                }

                var hasBeenAddedOnTheChart = false;
                var hasBeenAddedForComparison = false;
                var isPrimary = filterDescription.primaryProduct.ProductId === product.ProductId;

                filterDescription.myProducts.forEach(function (p) {
                    if (p.ProductId === product.ProductId) {
                        hasBeenAddedOnTheChart = true;
                    }
                });
                vm.comparisons.forEach(function (p) {
                    if (p.ProductId === product.ProductId) {
                        hasBeenAddedForComparison = true;
                    }
                });
                if (isPrimary) {
                    coreNotificationService.notifyError("This product has been added", product.ProductName + " is already on the chart.");
                    return;
                } else {
                    if (hasBeenAddedOnTheChart && hasBeenAddedForComparison) {
                        coreNotificationService.notifyError("This product has been added", product.ProductName + " is already on the chart.");
                        return;
                    } else if (hasBeenAddedOnTheChart) {
                        // ok
                    } else if (hasBeenAddedForComparison) {
                        coreNotificationService.notifyError("This product has been added", product.ProductName + " has already been added for comparison.");
                        return;
                    }
                }

                var hasReachedMax = hasReachedMaxCount();
                if (!hasReachedMax) {
                    product.tobeIncluded = true;
                }
                vm.comparisons.push(product);
                vm.selectedProduct = null;
            }

            function fundamentalItemChanges() {
                var fundamentalItemCounts = advanced.fundamentals.filter(function (item) {
                    return item.tobeIncluded;
                }).length;

                advanced.hasFundamentals = fundamentalItemCounts > 0;
            }

            function hasReachedMaxCount() {
                var checkedCounts = vm.comparisons.filter(function (p) {
                    return p.tobeIncluded;
                }).length;
                return checkedCounts >= maxCount;
            }

            function setNormalization(flag) {
                var primaryProduct = filterDescription.primaryProduct;
                if (!primaryProduct) {
                    return;
                }
                filterDescription.normalizeToPercentage = flag;
                filterDescription.advanced.normalized = flag;
                pChartRenderingUtilsService.isComparisonMode = filterDescription.normalizeToPercentage;
            }

            function applyProductChanges() {

                var secondaryProductsDict = [];

                var secondaryComparisons = filterDescription.myProducts.filter(function (p) {
                    return p.ProductId !== filterDescription.primaryProduct.ProductId;
                });
                secondaryComparisons.forEach(function (p) {
                    secondaryProductsDict[p.ProductId] = p;
                });

                var includedComparisonsDict = [];
                var includedComparisons = vm.comparisons.filter(function (p) {
                    return p.tobeIncluded;
                });
                includedComparisons.forEach(function (p) {
                    includedComparisonsDict[p.ProductId] = p;
                });

                // in filter description but not in the candidate list: TO BE REMOVED
                secondaryComparisons.forEach(function (p) {
                    var id = p.ProductId;
                    if (!includedComparisonsDict[id]) {
                        vm.removeFromProducts(p);
                    }
                });
                // not in filter description but in the candidate list: TO BE ADDED
                includedComparisons.forEach(function (p) {
                    var id = p.ProductId;
                    if (!secondaryProductsDict[id]) {
                        vm.addToProducts(p);
                    }
                });

                filterDescription.myProducts.forEach(function (item) {
                    var id = item.ProductId;
                    if (includedComparisonsDict[id]) {
                        item.included = advanced.hasPrice && includedComparisonsDict[id].tobeIncluded;
                    }
                });

                if (filterDescription.isComparisonMode()) {
                    filterDescription.chartTypeBeforeComparison = stxx.layout.chartType;
                    filterDescription.chartTypeDuringComparisonMode = null;
                    pChartRenderingUtilsService.stxx.setChartType('line');
                }
            }


            function applyChanges() {
                filterDescription.advanced = advanced;
                setNormalization(vm.isNormalizedChart);                
                applyProductChanges();
                setTimeout(function () {
                    if (pChartTgpsService.tradersGpsMode) {
                        if (pChartTgpsService.tradersGPSInPositionMode()) {
                            pChartService.chartType = pChartService.chartTypes.filter(function (i) {
                                return i.StxxType === 'candle';
                            })[0];
                        }

                        var includedProducts = filterDescription.getIncludedProducts();
                        includedProducts.forEach(function (i) {
                            if (i.ProductId !== filterDescription.primaryProduct.ProductId) {
                                pChartProductLoaderService.removeFromProducts(i);
                            }
                        });
                        filterDescription.productFundamentals.forEach(function (i) {
                            i.included = i.product.ProductId == filterDescription.primaryProduct.ProductId;
                        });
                        pChartFundamentalHelperService.renderAllFundamentals();
                        filterDescription.productFundamentals = filterDescription.productFundamentals.filter(function (i) {
                            return i.included;
                        });
                    }
                    pChartRenderingUtilsService.refreshChart().then(function () {
                        pChartFundamentalHelperService.renderAllFundamentals();
                        pChartTgpsService.tradersGPSChanged();
                    });
                }, 20);
                vm.uibClosePanel();
            }

            function removeProductFromComparison(product) {
                vm.comparisons = vm.comparisons.filter(function (p) {
                    return p !== product;
                });
            }

            function errorMessage() {
                var message = null;
                if (vm.comparisons.length === 0) {
                    message = "Please select at least 1 product to compare";
                }
                return message;
            }

            function initializeProducts() {
                var secondaryComparisons = filterDescription.myProducts.filter(function (p) {
                    return p.ProductId !== filterDescription.primaryProduct.ProductId;
                });
                var dictionary = [filterDescription.primaryProduct.ProductId];

                vm.comparisons = [];
                secondaryComparisons.forEach(function (p) {
                    dictionary.push(p.ProductId);
                    p.tobeIncluded = true;//p.included;
                    vm.comparisons.push(p);
                });
            }

            function initializeFundamentals() {
                var dictionary = [];

                filterDescription.addedFundamentals.forEach(function (f) {
                    dictionary[f.name] = f;
                    f.tobeIncluded = f.included;
                    advanced.fundamentals.push(f);
                });

                if (filterDescription.advanced) {
                    vm.isNormalizedChart = filterDescription.advanced.normalized;
                    advanced.hasPrice = filterDescription.advanced.hasPrice || !pChartService.hasAlgoChartBundle;
                    advanced.hasFundamentals = filterDescription.advanced.hasFundamentals && pChartService.hasAlgoChartBundle;
                }
                fundamentalItemChanges();
            }

            tool.setVmProperties({
                errorMessage: errorMessage,
                hasReachedMaxCount: hasReachedMaxCount,
                comparisons: [],
                applyChanges: applyChanges,
                isNormalizedChart: true,
                addToComparisons: addToComparisons,
                removeProductFromComparison: removeProductFromComparison,
            });

            tool.initialize(function () {
                if (!vm.comparisons) {
                    vm.comparisons = [];
                }
                initializeProducts();
                initializeFundamentals();
            });
        });