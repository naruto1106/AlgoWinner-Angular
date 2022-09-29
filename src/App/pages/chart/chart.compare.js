agmNgModuleWrapper('agmp.chart')
    .defineController('p.chart.CompareController',
        ['pChartFilterDescriptionService', 'pChartRenderingUtilsService', 'pChartTgpsService', 'pChartFundamentalHelperService', "sChartNormalizationService", 'pChartService',
            'sProductService',  'pChartProductLoaderService', 'commonTimeZoneService', 'tradeDataService', 'sMarketDataService'],
        function (vm, dep, tool) {
            var pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                sChartNormalizationService = dep.sChartNormalizationService;
            var pChartFilterDescriptionService = dep.pChartFilterDescriptionService;
            var pChartTgpsService = dep.pChartTgpsService;
            var pChartFundamentalHelperService = dep.pChartFundamentalHelperService;
            var filterDescription = pChartFilterDescriptionService;
            var pChartService = dep.pChartService;
            var pChartProductLoaderService = dep.pChartProductLoaderService;
            var sProductService = dep.sProductService,
                tradeDataService = dep.tradeDataService,
                sMarketDataService = dep.sMarketDataService;
            
            function searchProducts(keyword) {
                vm.keyword = keyword;
                vm.temporaryList = [];
                return sProductService.SearchPlottableProduct(keyword).then(function (res) {
                    var result = res.data.Data;
                    //sMarketEntitlementService.checkRealTimeForProducts(result);
                    vm.temporaryList = result.filter(function (product) {
                        return product.AssetType !== "Index Futures" && product.AssetType !== "Index Futures CFD";
                    });
                    return vm.temporaryList;
                });
            };

            function addToWatchlist(product) {
                tool.openModalByDefinition('s.watchlist.AddProductPopupController', {
                    product: product
                });
            }

            function removePrimaryProduct() {
                pChartProductLoaderService.removeFromProducts(filterDescription.primaryProduct);
            }

            function setPrimaryProduct(product) {
                vm.selectedProduct = null;
                if (filterDescription.primaryProduct && product.ProductId === filterDescription.primaryProduct.ProductId) {
                    return;
                }
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
                pChartProductLoaderService.renderPrimaryProduct(product).then(function () {
                    pChartFundamentalHelperService.renderAllFundamentals();
                    pChartTgpsService.tradersGPSChanged();
                });
            }

            function addProductToPriceAlert(product) {
                var item = {
                    PriceAlerts: [],
                    ProductModel: product,
                    MarketData: {}
                };
                var requestObj = {
                    ProductId: product.ProductId,
                    Symbol: product.Symbol,
                    TradeVenueLoc: product.TradeVenueLoc,
                    AssetType: product.AssetType,
                    Currency: product.Currency
                };
                tradeDataService.GetLast(requestObj).then(function (res) {
                    item.MarketData = res.data;
                    item.MarketData = angular.extend(item.MarketData, sMarketDataService.calculateLastTradedPricePct(res));
                    tool.openModalByDefinition('s.watchlist.PriceAlertPopupController', {
                        product: item,
                        alerts: item.PriceAlerts,
                        isEdit: false
                    });
                });
            }

            function isProductPageAllowed(product) {
                return !(product.Symbol == null || product.TradeVenueLoc == null
                    || product.TradeVenueLoc === "HK"
                    || product.TradeVenueLoc === "MY"
                    || product.TradeVenueLoc === "CHN"
                    || product.AssetType === "Indices");
            }
            
            tool.setVmProperties({
                pChartService: pChartService,
                setPrimaryProduct: setPrimaryProduct,
                removePrimaryProduct: removePrimaryProduct,
                removeFromProducts: pChartProductLoaderService.removeFromProducts,
                addToProducts: pChartProductLoaderService.addToProducts,
                searchProducts: searchProducts,
                filterDescription: filterDescription,
                addProductToPriceAlert: addProductToPriceAlert,
                addToWatchlist: addToWatchlist,
                goToProductPage: sProductService.goToProduct,
                isProductPageAllowed: isProductPageAllowed,
                showCompare: showCompare,
                openComparePanel: openComparePanel,
                isComparisonMode: isComparisonMode,
                cancelComparisonMode: cancelComparisonMode
            });

            function showCompare() {
                return filterDescription.primaryProduct && !pChartTgpsService.tradersGpsMode;
            }

            function cancelComparisonMode() {
                filterDescription.myProducts.forEach(function (p) {
                    if (p.ProductId === filterDescription.primaryProduct.ProductId) {
                        return;
                    }
                    vm.removeFromProducts(p);
                });
                filterDescription.primaryProduct.included = true;

                filterDescription.advanced = null;

                //turn off normalize Y axis
                if (filterDescription.normalizeToPercentage) {
                    sChartNormalizationService.setNormalization(!filterDescription.normalizeToPercentage);                    
                }

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

                if (!filterDescription.isComparisonMode() &&
                    filterDescription.chartTypeBeforeComparison &&
                    !filterDescription.chartTypeDuringComparisonMode) {
                    pChartRenderingUtilsService.stxx.setChartType(filterDescription.chartTypeBeforeComparison);
                }
            }
            function isComparisonMode() {
                return filterDescription.isComparisonMode();
            }

            function openComparePanel() {
                tool.openModalByDefinition('p.chart.ComparePanelController');
            }
        })
    .defineDirectiveForE('agmp-chart-compare', [], function () {
        return {
            templateUrl: '/App/pages/chart/chart.compare.html',
            controller: 'p.chart.CompareController'
        }
    }, {

    });