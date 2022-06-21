agmNgModuleWrapper('agmp.chart')
    .defineService('pChartProductLoaderService',
        ['sProductService',
         'pChartRenderingUtilsService',
         'pChartFilterDescriptionService',
         'pChartService',
         'commonTimeZoneService',
         'pChartThemeService',
         'pChartTgpsService',
         'pChartFundamentalHelperService',
         'pChartColoringService'],
        function (serviceObj, dep, tool) {

            var pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                sProductService = dep.sProductService,
                pChartTgpsService = dep.pChartTgpsService,
                coreNotificationService = dep.coreNotificationService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                coreUserStateService = dep.coreUserStateService,
                pChartThemeService = dep.pChartThemeService,
                pChartFundamentalHelperService = dep.pChartFundamentalHelperService,
                pChartColoringService = dep.pChartColoringService,
                commonTimeZoneService = dep.commonTimeZoneService;

            var maxPlottedProduct = 3;

            var filterDescription = pChartFilterDescriptionService;

            function renderPrimaryProduct(product) {
                var isSameProduct = false;
                if (filterDescription.primaryProduct && product) {
                    isSameProduct = filterDescription.primaryProduct.ProductId == product.ProductId;
                }

                var drawings = pChartRenderingUtilsService.stxx.drawingObjects;
                setToPrimary(product);
                return pChartRenderingUtilsService.refreshChart().then(function () {
                    if (isSameProduct) {
                        pChartRenderingUtilsService.stxx.drawingObjects = drawings;
                    }
                });
            }

            function setToPrimary(product) {
                var hasBeenInList = _.find(filterDescription.myProducts, function (p) {
                    return p.ProductId === product.ProductId;
                });

                var oldPrimaryProduct = filterDescription.primaryProduct;
                if (hasBeenInList) {
                    removeFromProducts(product);
                    setToPrimary(product);
                    addToProducts(oldPrimaryProduct);
                    return;
                }

                if (oldPrimaryProduct) {
                    removeFromProducts(oldPrimaryProduct);
                }
                product.symbol = product.Symbol;
                product.included = true;
                product.timeZone = commonTimeZoneService.getTimeZoneMapping(product.TradeVenueLoc);

                filterDescription.myProducts.push(product);
                filterDescription.primaryProduct = product;

                if (pChartTgpsService.tradersGpsMode) {
                    filterDescription.getIncludedProducts().forEach(function (p) {
                        if (p !== product) {
                            hideProduct(p);
                        }
                    });
                }

                if (!_.includes(['1 D', '1 W', '1 M'], filterDescription.barSize)) {
                    filterDescription.getIncludedProducts().forEach(function (p) {
                        if (p.TradeVenueLoc !== product.TradeVenueLoc) {
                            hideProduct(p);
                        }
                    });
                }


                pChartRenderingUtilsService.stxx.setTimeZone(null, product.timeZone);
            }

            function rerenderNonPrimaryProducts() {
                var stxx = pChartRenderingUtilsService.stxx;
                var myProducts = filterDescription.myProducts;
                var primaryProduct = filterDescription.primaryProduct;
                // set the renderer
                serviceObj.isChartRendering = false;
                var renderer = pChartRenderingUtilsService.getChartLineRendererOrNew("products");

                var renderCalled = false;
                myProducts.forEach(function (product, i) {
                    if (product === primaryProduct) {
                        if (renderer.removeSeries)
                            renderer.removeSeries(product.symbol, true);
                        return;
                    }
                    var hasBeenRendered = renderer.seriesParams.filter(function (u) {
                        return u.field === product.symbol;
                    }).length > 0;
                    if (product.included && hasBeenRendered) {
                        if (stxx.chart.series[product.symbol]) {
                            stxx.chart.series[product.symbol].parameters.isComparison = filterDescription.normalizeToPercentage;
                        }
                        return;
                    }
                    if (!product.included && !hasBeenRendered) {
                        return;
                    }

                    if (product.included) {
                        if (stxx.chart && stxx.chart.series && product.symbol in stxx.chart.series) {
                            renderer.attachSeries(product.symbol, product.color);
                            renderer.ready();
                            renderCalled = true;
                        } else {
                            pChartRenderingUtilsService.subscribeRealTimeData(product);
                            if (stxx.chart.masterData && stxx.chart.masterData.length > 0) {
                                stxx.addSeries(product.symbol, {
                                    display: product.symbol + ' (' + product.ProductName + ')',
                                    data: {
                                        useDefaultQuoteFeed: true
                                    },
                                    symbolObject: product,
                                    width: 3,
                                    isComparison: filterDescription.normalizeToPercentage,
                                    shareYAxis: true
                                }, function () {
                                    renderer.attachSeries(product.symbol, product.color);
                                    renderer.ready();
                                    renderCalled = true;
                                });
                            }
                        }
                    } else {
                        renderer.removeSeries(product.symbol, true);
                    }
                    if (!renderCalled)
                        renderer.ready();
                });
                renderer.ready();
            };

            function removeFromProducts(productToRemove) {
                pChartColoringService.releaseReservedColor(productToRemove.color);
                hideProduct(productToRemove);
                filterDescription.myProducts = filterDescription.myProducts.filter(function (p) {
                    return p.ProductId !== productToRemove.ProductId;
                });
                if (filterDescription.primaryProduct.ProductId == productToRemove.ProductId) {
                    filterDescription.primaryProduct = null;
                }
            }

            function addToProducts(product) {                
                var isProductAlreadyAdded = filterDescription.myProducts.filter(function (p) {
                    return p.ProductId === product.ProductId;
                })[0];

                if (isProductAlreadyAdded) {
                    coreNotificationService.notifyError("Product Already Added", "You have already added " + product.Symbol + ".");
                    return;
                }

                if (filterDescription.getIncludedProducts().length < maxPlottedProduct) {
                    product.included = true;
                }
                if (pChartTgpsService.tradersGpsMode && filterDescription.getIncludedProducts().length > 0) {
                    product.included = false;
                }

                product.symbol = product.Symbol;
                product.color = pChartColoringService.getNextColorAndReserve();
                filterDescription.myProducts.push(product);

                rerenderNonPrimaryProducts();
                broadcastProductChanges(product);
            }

            function hideProduct(product) {
                product.included = false;
                rerenderNonPrimaryProducts();
                broadcastProductChanges(product);
                return true;
            }

            function broadcastProductChanges(product) {
                pChartFundamentalHelperService.onProductChanged(product);
            }
            
            function loadProductWithParam(venue, symbol) {
                return coreUserStateService.myPremiumItemSubscriptionsLoaded.then(function () {
                    return sProductService.GetProductBySymbolAndVenue(venue, symbol, true).then(function (res) {
                        return renderPrimaryProduct(res.data.Data);
                    });
                });
            }

            function unselectProductIfHighlighted() {
                var productsRenderer = pChartRenderingUtilsService.getChartLineRendererOrNew("products");
                if (productsRenderer) {
                    var highlighted = pChartRenderingUtilsService.getHighlightedSeries(productsRenderer);
                    if (highlighted) {
                        filterDescription.myProducts.forEach(function (p) {
                            if (p.Symbol === highlighted.field) {
                                p.included = false;
                            }
                        });
                        rerenderNonPrimaryProducts();
                    }
                }
            }

            function registerChartWithCallback(cru) {
                // TODO: honestly I don't think this piece of code belong to this service. 
                cru.registerOnChartCreatedCallback("renderVolume", function (stxx) {
                    var volumeColor = (pChartThemeService.getCurrentTheme() === "Dark") ? "#9302ff" : "#006da6";
                    var isTgps = pChartTgpsService.tradersGpsMode;
                    var isIndexProduct = !!(filterDescription.primaryProduct && filterDescription.primaryProduct.AssetType === "Indices");
                   
                    var instance = {
                        propName: 'vchart',
                        stxxStudy: 'vchart',
                        sd: {
                            inputs: {
                                isIndexProduct: isIndexProduct
                            },
                            outputs: {
                                "Up Volume": volumeColor,
                                "Down Volume": volumeColor
                            },
                            parameters: {}
                        },
                        included: !isTgps
                    };

                    // Add volume study if no volume study available
                    var volumeStudy = _.find(filterDescription.addedStudies, (function (study) { return study.propName === "vchart"; }));
                    if (!volumeStudy) {     
                        filterDescription.addedStudies.push(instance);
                        if (!isTgps) {
                            STX.Studies.quickAddStudy(stxx, "vchart", instance.sd.inputs, instance.sd.outputs, instance.sd.parameters);
                        }
                    } else if (volumeStudy.sd.inputs.isIndexProduct !== isIndexProduct) {
                        // If isIndexProduct changed, that means product type changed
                        // The study will be rendered differently
                        volumeStudy.sd.inputs.isIndexProduct = isIndexProduct;
                    }
                });

                cru.registerOnChartCreatedCallback("renderComparisonProducts", function (stxx) {
                    rerenderNonPrimaryProducts();
                });

                tool.on('onStxDeleteHighlighted', unselectProductIfHighlighted);
                tool.on('onNonPrimaryProductVisibilityChanges', function () {
                    rerenderNonPrimaryProducts();
                });
            }

            tool.setServiceObjectProperties({
                registerChartWithCallback: registerChartWithCallback,
                loadProductWithParam: loadProductWithParam,

                renderPrimaryProduct: renderPrimaryProduct,

                addToProducts: addToProducts,
                removeFromProducts: removeFromProducts
            });
        })