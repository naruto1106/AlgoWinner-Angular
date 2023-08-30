﻿
agmNgModuleWrapper('agmp.chart')
    .defineController('p.chart.ProductListManagerOptionPiController',
        ['pChartProductLoaderService', 'pChartProductSearchLocatorService', 'pChartFilterDescriptionService',
            'sProductService',
            'pChartService', 'pChartTgpsService',
            'pChartFundamentalHelperService',
            'commonTimeZoneService', 'sMarketEntitlementService', 'tradeDataService', 'sMarketDataService',],
        function (vm, dep, tool) {
            var pChartProductSearchLocatorService = dep.pChartProductSearchLocatorService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService;
            var filterDescription = pChartFilterDescriptionService;

            var pChartProductLoaderService = dep.pChartProductLoaderService,
                pChartFundamentalHelperService = dep.pChartFundamentalHelperService,
                pChartTgpsService = dep.pChartTgpsService,
                sProductService = dep.sProductService,
                pChartService = dep.pChartService,
                tradeDataService = dep.tradeDataService,
                sMarketDataService = dep.sMarketDataService;
                venue = dep.$routeParams.venue;
                vm.selectedProduct = venue ;

            function searchProducts(keyword) {
                vm.keyword = keyword;
                vm.temporaryList = [];
                return sProductService.SearchPlottableProduct(keyword).then(function (res) {
                    var result = res.data.Data;
                    //sMarketEntitlementService.checkRealTimeForProducts(result);
                    vm.temporaryList = result.filter(function (product) {
                        return product.TradeVenueLoc === "US" && product.AssetType !== "Index Futures" && product.AssetType !== "Index Futures CFD";
                    });
                    console.log(vm.temporaryList,'vm.temporayList');
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
            
            var elementInputQuery = null;

            tool.onRendered(function () {
                elementInputQuery = $(vm._getDirectiveElement()).find('.search-product > input');
                pChartProductSearchLocatorService.initializeProductListManager(elementInputQuery);
            });


            function unfocusField() {
                console.log("unfocusField");
                if (vm.temporaryList && vm.temporaryList.length == 1) {
                    vm.selectedProduct = vm.temporaryList[0];
                    onItemSelected()
                }
            }
            function onItemSelected() {
                console.log("onItemSelected");
                vm.temporaryList = [];
                vm.setPrimaryProduct(vm.selectedProduct);
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
                unfocusField: unfocusField,
                onItemSelected: onItemSelected
            });
            tool.initialize(function () {
                tool.on('onPrimaryProductChanged', function (e, product) {
                    vm.selectedProduct = null;//filterDescription.primaryProduct;
                    $(document).ready(function () {
                        if (filterDescription.primaryProduct) {
                            document.title = filterDescription.primaryProduct.ProductName + " (" +
                                filterDescription.primaryProduct.Symbol + ") - " +
                                filterDescription.primaryProduct.TradeVenueLoc + " Chart";
                        }
                    });
                });
            });
        }
    )
    .defineDirectiveForE('agmp-chart-product-list-optionpi', [],
        function () {
            return {
                controller: "p.chart.ProductListManagerOptionPiController",
                templateUrl: '/App/pages/chart/chart.productListManager.optionpi.html'
            };
        }, {

        });