agmNgModuleWrapper('agms.market')
    .defineService('sMarketDataService', ['coreSignalRMarketDataService', 'commonEnumResolverService',
        'tradeDataService'],
    function (serviceObj, dep, tool) {
        var coreSignalRMarketDataService = dep.coreSignalRMarketDataService;
        var commonEnumResolverService = dep.commonEnumResolverService;
        var tradeDataService = dep.tradeDataService;

        var blinkingObjects = [];
        // do not trigger digest cycle if there is nothing to blink
        dep.$window.setInterval(function () {
            if (blinkingObjects.length === 0) {
                return;
            } else {
                tool.evalAsync(function () {
                    blinkingObjects.forEach(function (obj) {
                        if (obj.arr.length > obj.iterate) {
                            var animate = obj.arr[obj.iterate];
                            if (animate.time === obj.state) {
                                animate.run();
                                obj.iterate++;
                            }
                        } else {
                            obj.deleted = true;
                        }
                        obj.state++;
                    });

                    blinkingObjects = blinkingObjects.filter(function (obj) {
                        return !obj.deleted;
                    });
                });
            }
        }, 100);

        function doPeriodAnimation(arr) {
            blinkingObjects.push({
                state: 0,
                arr: arr,
                iterate: 0
            });
        };

        var subscribedMarketData = [];

        function getStocksFromProductChunk(products, tradeVenue) {
            return products.filter(function (p) {
                return p.TradeVenueLoc === tradeVenue;
            });
        }

        function registerMarketDataForOwner(productModel, resourceOwner) {
            var productId = productModel.ProductId;
            if (!subscribedMarketData[productId]) {
                subscribedMarketData[productId] = {
                    productModel: productModel,
                    resourceOwners: {}
                };
            }
            subscribedMarketData[productId].resourceOwners[resourceOwner] = true;
        }

        function unregisterMarketDataForOwner(productId, resourceOwner) {
            if (!subscribedMarketData[productId]) {
                return;
            }
            if (subscribedMarketData[productId].resourceOwners) {
                delete subscribedMarketData[productId].resourceOwners[resourceOwner];
            }
        }

        function hasResourceOwner(productId) {
            if (!subscribedMarketData[productId]) {
                return false;
            }
            if (subscribedMarketData[productId].resourceOwners) {
                var count = 0;
                for (var prop in subscribedMarketData[productId].resourceOwners) {
                    if (subscribedMarketData[productId].resourceOwners[prop]) {
                        count++;
                    }
                }
                return count > 0;
            }
            return false;
        }

        function removeResourceOwner(resourceOwner) {
            for (var prop in subscribedMarketData) {
                if (subscribedMarketData[prop]) {
                    if (subscribedMarketData[prop].resourceOwners) {
                        delete subscribedMarketData[prop].resourceOwners[resourceOwner];
                    }
                }
            }
        }

        function unSubscribeMarketData(productModel, resourceOwner) {
            tool.log("UNSUB: " + productModel.Symbol + " for " + resourceOwner);
            unregisterMarketDataForOwner(productModel.ProductId, resourceOwner);
            if (!hasResourceOwner(productModel.ProductId)) {
                tool.log("DELETING SUB: " + productModel.Symbol + " NO MORE Resource Owner");

                return coreSignalRMarketDataService.invoke(productModel.TradeVenueLoc, "UnSubscribeMarketData",
                    productModel.ProductId, productModel.Symbol).then(
                    function () {
                        delete subscribedMarketData[productModel.ProductId];
                        tool.log("Unsubscribe to Market Data " + productModel.Symbol);
                    }, function () {
                        tool.logError("Error invoking unsubscribe to Market Data");
                    });
            }
        }

        function unSubscribeMarketDataMultiple(productModels, resourceOwner) {
            var productsModelsToUnsubscribe = productModels.filter(function (productModel) {
                tool.log("UNSUB: " + productModel.Symbol + " for " + resourceOwner);
                unregisterMarketDataForOwner(productModel.ProductId, resourceOwner);
                return !hasResourceOwner(productModel.ProductId);
            });

            return tool.onceAll(_.map(_.chunk(productsModelsToUnsubscribe, 30),
                function (productsChunk) {
                    return tool.onceAll([
                        coreSignalRMarketDataService.invoke("SG", "UnsubscribeMarketDataMultiple", getStocksFromProductChunk(productsChunk, "SG")),
                        coreSignalRMarketDataService.invoke("US", "UnsubscribeMarketDataMultiple", getStocksFromProductChunk(productsChunk, "US")),
                        coreSignalRMarketDataService.invoke("HK", "UnsubscribeMarketDataMultiple", getStocksFromProductChunk(productsChunk, "HK")),
                        coreSignalRMarketDataService.invoke("MY", "UnsubscribeMarketDataMultiple", getStocksFromProductChunk(productsChunk, "MY")),
                        coreSignalRMarketDataService.invoke("CHN", "UnsubscribeMarketDataMultiple", getStocksFromProductChunk(productsChunk, "CHN")),
                        coreSignalRMarketDataService.invoke("OTC (Oanda)", "UnsubscribeMarketDataMultiple", getStocksFromProductChunk(productsChunk, "OTC (Oanda)"))
                    ]).then(function () {
                        productsChunk.forEach(function (productModel) {
                            delete subscribedMarketData[productModel.ProductId];
                            tool.log("Unsubscribe Multiple to Market Data: " + productModel.Symbol);
                        });
                    }, function () {
                        tool.logError("Error invoking unsubscribe multiple to Market Data");
                    });
                }));
        }

        function getMarketDataMultiple(watchlistProducts) {
            tool.log("Get Market Data Multiple on " + watchlistProducts.length + " products");

            return tool.onceAll(_.map(_.chunk(watchlistProducts, 30),
                function (productsChunk) {
                    return tool.onceAll([
                        tradeDataService.GetMultipleData({ Products: getStocksFromProductChunk(_.map(productsChunk, 'ProductModel'), "SG") }),
                        tradeDataService.GetMultipleData({ Products: getStocksFromProductChunk(_.map(productsChunk, 'ProductModel'), "US") }),
                        tradeDataService.GetMultipleData({ Products: getStocksFromProductChunk(_.map(productsChunk, 'ProductModel'), "HK") }),
                        tradeDataService.GetMultipleData({ Products: getStocksFromProductChunk(_.map(productsChunk, 'ProductModel'), "MY") }),
                        tradeDataService.GetMultipleData({ Products: getStocksFromProductChunk(_.map(productsChunk, 'ProductModel'), "CHN") }),
                        tradeDataService.GetMultipleDataCfd({ Products: getStocksFromProductChunk(_.map(productsChunk, 'ProductModel'), "OTC (Oanda)") })
                    ]).then(function (resultArr) {
                        var results = _.flatten(_.map(resultArr, function (r) { return r.data; }) );
                        for (var i = 0; i < results.length; i++) {
                            var watchlistProduct = productsChunk.filter(function (p) {
                                return p.ProductModel.ProductId === results[i].ProductId;
                            })[0];
                            var res = results[i];

                            if (!watchlistProduct.MarketData) {
                                watchlistProduct.MarketData = {};
                            }
                            watchlistProduct.MarketData = angular.extend(watchlistProduct.MarketData, calculateLastTradedPricePct(res));
                        }
                    }, function () {
                        tool.logError("Error invoking get Market Data Multiple");
                    });
                }));
        }

        function subscribeMarketData(productModel, resourceOwner) {
            tool.log("SUB: " + productModel.Symbol + " for " + resourceOwner);

            if (hasResourceOwner(productModel.ProductId)) {
                tool.log("Subscribe to Market Data " + productModel.Symbol + " has been subscribed before");
                registerMarketDataForOwner(productModel, resourceOwner);
                return tool.when(true);
            }
            return coreSignalRMarketDataService.invoke(productModel.TradeVenueLoc, "SubscribeMarketData",
                productModel.ProductId,
                commonEnumResolverService.getAssetTypeId(productModel.AssetType),
                productModel.Symbol,
                commonEnumResolverService.getTradeVenueLocId(productModel.TradeVenueLoc)
            ).then(
                function (res) {
                    registerMarketDataForOwner(productModel, resourceOwner);
                    tool.log("Subscribe to Market Data Multiple: " + productModel.Symbol);
                }, function (errorData) {
                    tool.logError("Error invoking subscribe to Market Data Multiple");
                });
        }

        function subscribeMarketDataMultiple(productModels, resourceOwner) {
            var productModelsToSubscribe = productModels.filter(function (pm) {
                //tool.log("SUB: " + pm.Symbol + " for " + resourceOwner);
                if (hasResourceOwner(pm.ProductId)) {
                    //tool.log("Subscribe to Market Data " + pm.Symbol + " has been subscribed before");
                    registerMarketDataForOwner(pm, resourceOwner);
                    return false;
                }
                return true;
            });

            return tool.onceAll(_.map(_.chunk(productModelsToSubscribe, 30),
                function (productChunks) {
                    return tool.onceAll([
                        coreSignalRMarketDataService.invoke("SG", "SubscribeMarketDataMultiple", getStocksFromProductChunk(productChunks, "SG")),
                        coreSignalRMarketDataService.invoke("US", "SubscribeMarketDataMultiple", getStocksFromProductChunk(productChunks, "US")),
                        coreSignalRMarketDataService.invoke("HK", "SubscribeMarketDataMultiple", getStocksFromProductChunk(productChunks, "HK")),
                        coreSignalRMarketDataService.invoke("MY", "SubscribeMarketDataMultiple", getStocksFromProductChunk(productChunks, "MY")),
                        coreSignalRMarketDataService.invoke("CHN", "SubscribeMarketDataMultiple", getStocksFromProductChunk(productChunks, "CHN")),
                        coreSignalRMarketDataService.invoke("OTC (Oanda)", "SubscribeMarketDataMultiple", getStocksFromProductChunk(productChunks, "OTC (Oanda)"))
                    ]).then(function () {
                        productChunks.forEach(function (productModel) {
                            registerMarketDataForOwner(productModel, resourceOwner);
                        });
                        tool.log("Subscribed to Market Data Multiple on " + productChunks.length + " products");
                    }, function () {
                        tool.logError("Error invoking subscribe to Market Data Multiple");
                    });
                }));
        }

        function handleBlinkAsk(product, newPrice) {
            if (product.MarketData) {
                var askChangesDiff = -product.MarketData.AskPrice + newPrice;
                if (askChangesDiff !== 0) {
                    doPeriodAnimation([
                        {
                            run: function () {
                                product.MarketData.AskPriceChanges = askChangesDiff;
                            },
                            time: 0
                        },
                        {
                            run: function () {
                                product.MarketData.AskPrice = newPrice;
                                product.MarketData.AskPriceChanges = 0;
                            },
                            time: 3
                        }
                    ]);
                }
            }
        }

        function handleBlinkBid(product, newPrice) {
            if (product.MarketData) {
                var bidChangesDiff = -product.MarketData.BidPrice + newPrice;
                if (bidChangesDiff !== 0) {
                    doPeriodAnimation([
                        {
                            run: function () {
                                product.MarketData.BidPriceChanges = bidChangesDiff;
                            },
                            time: 0
                        },
                        {
                            run: function () {
                                product.MarketData.BidPrice = newPrice;
                                product.MarketData.BidPriceChanges = 0;
                            },
                            time: 3
                        }
                    ]);
                }
            }
        }

        function calculateLastTradedPricePct(marketData) {
            if (!marketData.PrevClose) {
                return marketData;
            }
            marketData.LastTradedPriceDiff = parseFloat((marketData.LastTradedPrice - marketData.PrevClose).toFixed(4));
            marketData.LastTradedPriceDiffPct = marketData.LastTradedPriceDiff / marketData.PrevClose * 100;
            return marketData;
        }

        tool.setServiceObjectProperties({
            handleBlinkAsk: handleBlinkAsk,
            handleBlinkBid: handleBlinkBid,

            calculateLastTradedPricePct: calculateLastTradedPricePct,

            getMarketDataMultiple: getMarketDataMultiple,
            subscribeMarketDataMultiple: subscribeMarketDataMultiple,
            unSubscribeMarketDataMultiple: unSubscribeMarketDataMultiple,
            subscribeMarketData: subscribeMarketData,
            unSubscribeMarketData: unSubscribeMarketData,
            removeResourceOwner: removeResourceOwner
        });
    });