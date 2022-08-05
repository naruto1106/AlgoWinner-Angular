agmNgModuleWrapper('agms.watchlist')
    .defineService('sWatchlistUpdateManagerService', ['$log', 'coreSignalRNotificationService', 'sWatchlistService', 
        'tradeDataService', 'sMarketDataService'],
    function (serviceObject, dep, tool) {

        var $location = dep.$location,
            coreSignalRNotificationService = dep.coreSignalRNotificationService,
            coreNotificationService = dep.coreNotificationService,
            sWatchlistService = dep.sWatchlistService,
            tradeDataService = dep.tradeDataService,
            sMarketDataService = dep.sMarketDataService;

        var myWatchLists = null;
        var unsubscribeWatchlistChanges = null;

        tool.onDestroy(function () {
            if (unsubscribeWatchlistChanges) {
                unsubscribeWatchlistChanges();
            }
        });
        
        function getDiffOfWatchlistProductList(oldList, newList) {
            function getItemId(item) {
                return item.ProductModel.Symbol + "-" + item.ProductModel.TradeVenueLoc;
            }

            var toBeRemoved = {};
            var toBeAdded = {};
            if (oldList && oldList.forEach) {
                oldList.forEach(function (item) {
                    toBeRemoved[getItemId(item)] = item;
                });
            }
            if (newList && newList.forEach) {
                newList.forEach(function (item) {
                    var key = getItemId(item);
                    if (toBeRemoved[key]) {
                        delete toBeRemoved[key];
                    } else {
                        toBeAdded[key] = item;
                    }
                });
            }
            var toBeAddedList = [];
            var toBeRemovedList = [];
            for (var prop in toBeAdded) {
                toBeAddedList.push(toBeAdded[prop]);
            }
            for (var prop in toBeRemoved) {
                toBeRemovedList.push(toBeRemoved[prop]);
            }
            return {
                toBeAdded: toBeAddedList,
                toBeRemoved: toBeRemovedList
            };
        }

        function updateMarketDataForPanel(viewName, oldList, newList) {
            var diff = getDiffOfWatchlistProductList(oldList, newList);
            if (oldList && newList) {
                newList.forEach(function (i) {
                    var itemRow = oldList.filter(function (j) {
                        return j.ProductModel.ProductId === i.ProductModel.ProductId;
                    })[0];
                    if (itemRow != null) i.MarketData = itemRow.MarketData;
                });
            }

            sMarketDataService.unSubscribeMarketDataMultiple(_.map(diff.toBeRemoved, 'ProductModel'), viewName);

            //if there are more than one items for the same product, only one item has market data, so fix here
            var tempDict = {};
            if (oldList) {
                oldList.forEach(function (i) {
                    if (i.MarketData && i.MarketData.ProductId) {
                        tempDict[i.MarketData.ProductId] = i.MarketData;
                    }
                });
            }

            diff.toBeAdded.forEach(function (item) {
                if (!item.MarketData) {
                    item.MarketData = {};
                }
            });

            return sMarketDataService.getMarketDataMultiple(diff.toBeAdded).then(function () {
                sMarketDataService.subscribeMarketDataMultiple(_.map(diff.toBeAdded, 'ProductModel'), viewName);
                diff.toBeAdded.forEach(function (i) {
                    if (i.MarketData && i.MarketData.ProductId) {
                        tempDict[i.MarketData.ProductId] = i.MarketData;
                    }
                });
                if (newList) {
                    newList.forEach(function (i) {
                        if (i.ProductModel && tempDict[i.ProductModel.ProductId] && (!i.MarketData || _.isEmpty(i.MarketData))) {
                            i.MarketData = tempDict[i.ProductModel.ProductId];
                        }
                    });
                }
            });
        }
        
        function addProductToWatchlist(selectedProduct, currentWatchlist) {
            return sWatchlistService.getWatchlistProductModelFromWatchlist(currentWatchlist.WatchlistId, selectedProduct.ProductId)
                .then(function (res) {
                    if (res.data) {
                        coreNotificationService.notifyError("Error", selectedProduct.ProductName + " has already been added to the watchlist.");
                        return tool.reject();
                    } else {
                        var request = {
                            WatchlistId: currentWatchlist.WatchlistId,
                            ProductId: selectedProduct.ProductId
                        };
                        return sWatchlistService.addProductToWatchlist(request);
                    }
                }, function () {
                    tool.log("Get product Failed");
                });
        }

        function isAnyProductIdInWatchList(watchlist, productId) {
            return watchlist.WatchlistProducts.filter(function (p) {
                return productId === p.ProductModel.ProductId;
            }).length > 0;
        }

        function refineWatchlists(list) {
            var promiseArray = [];
            list.forEach(function (watchlist) {
                var promise = refineSingleWatchlist(watchlist);
                promiseArray.push(promise);
            });
            return tool.onceAll(promiseArray);
        }

        function refineSingleWatchlist(watchlist) {
            if (watchlist.WatchlistProducts && watchlist.WatchlistProducts.length > 0) {
                watchlist.WatchlistProducts.forEach(function (product) {
                    product.MarketData = {
                        isLoading: true
                    };
                });
                return resolveListOfWatchlistProduct(watchlist.WatchlistProducts);
            }
            return tool.when();
        }
        
        function handleNewWatchlistProduct(watchlistProduct, isMarketDataObserved, item, resourceOwner) {
            if (!_.includes(item.WatchlistProducts, watchlistProduct)) {
                item.WatchlistProducts.unshift(watchlistProduct);
            }

            if (isMarketDataObserved) {
                watchlistProduct.MarketData = {
                    isLoading: true
                };

                return resolveWatchlistProduct(watchlistProduct, resourceOwner);                
            }
        }

        function resolveWatchlistProduct(watchlistProduct, resourceOwner) {
            var requestObj = {
                ProductId: watchlistProduct.ProductModel.ProductId,
                Symbol: watchlistProduct.ProductModel.Symbol,
                TradeVenueLoc: watchlistProduct.ProductModel.TradeVenueLoc,
                AssetType: watchlistProduct.ProductModel.AssetType,
                Currency: watchlistProduct.ProductModel.Currency
            };

            tool.onceAll([
                tradeDataService.GetBid(requestObj),
                tradeDataService.GetAsk(requestObj),
                tradeDataService.GetLast(requestObj)
            ]).then(function (ress) {
                watchlistProduct.MarketData.BidPrice = ress[0].data.BidPrice;
                watchlistProduct.MarketData.BidSize = ress[0].data.BidSize;
                watchlistProduct.MarketData.BidTime = ress[0].data.BidTime;
                watchlistProduct.MarketData.AskPrice = ress[1].data.AskPrice;
                watchlistProduct.MarketData.AskSize = ress[1].data.AskSize;
                watchlistProduct.MarketData.AskTime = ress[1].data.AskTime;
                watchlistProduct.MarketData.LastTradedPrice = ress[2].data.LastTradedPrice;
                watchlistProduct.MarketData.LastTradedSize = ress[2].data.LastTradedSize;
                watchlistProduct.MarketData.LastTradedTime = ress[2].data.Timestamp;
                watchlistProduct.MarketData.PrevClose = ress[2].data.PrevClose;                   
                watchlistProduct.MarketData.CumulativeVolume = ress[2].data.CumulativeVolume;                   

                return tool.onceAll([
                    sMarketDataService.subscribeMarketData(watchlistProduct.ProductModel, resourceOwner)
                ]).finally(function () {
                    watchlistProduct.MarketData.isLoading = false;
                });
            }, function (ress) {
                tool.logError("Error invoking get Market Data for Watchlist Addition");
            });
        }

        function resolveListOfWatchlistProduct(listOfWatchlistProduct, resourceOwner) {
            listOfWatchlistProduct.forEach(function(p) {
                p.MarketData = sMarketDataService.calculateLastTradedPricePct(p.MarketData);
            });

            return sMarketDataService.subscribeMarketDataMultiple(_.map(listOfWatchlistProduct, 'ProductModel'), resourceOwner)
                .finally(function () {
                listOfWatchlistProduct.forEach(function (watchlistProduct) {
                    watchlistProduct.MarketData.isLoading = false;
                });
            });
        }

        function observeWatchlist(list, isMarketDataObserved, onCurrentWatchlistChanged) {
            function handleNewWatchlist(newWatchlist) {
                list.unshift(newWatchlist);
                tool.broadcast('closeWatchlistProductNotes');
                onCurrentWatchlistChanged(newWatchlist, "new");
            }

            function handleModifiedWatchlist(watchlist) {
                list.forEach(function (u) {
                    if (u.WatchlistId === watchlist.WatchlistId) {
                        u.WatchlistName = watchlist.WatchlistName;
                        onCurrentWatchlistChanged(u, "modified");
                    }
                });
            }

            function handleDeletedWatchlist(watchlist) {
                tool.broadcast('closeWatchlistProductNotes', watchlist);
                var item = list.filter(function (u) {
                    return u.WatchlistId === watchlist.WatchlistId;
                })[0];
                var indexOf = list.indexOf(item);
                list.splice(indexOf, 1);
                if (list.length > 0) {
                    onCurrentWatchlistChanged(list[0], "deleted");
                } else {
                    onCurrentWatchlistChanged(null, "deleted");
                }
                return item;
            }

            function handleNewFilteredWatchlistProductWithMarketData(watchlistProduct) {
                var item = list.filter(function (u) {
                    return u.WatchlistId === watchlistProduct.WatchlistId;
                })[0];
                handleNewWatchlistProduct(watchlistProduct, true, item);
                onCurrentWatchlistChanged(item, "product-inserted");
            }

            function handleNewFilteredWatchlistProductWithoutMarketData(watchlistProduct) {
                var item = list.filter(function (u) {
                    return u.WatchlistId === watchlistProduct.WatchlistId;
                })[0];
                handleNewWatchlistProduct(watchlistProduct, false, item);
                onCurrentWatchlistChanged(item, "product-inserted");
            }

            function handleDeletedWatchlistProduct(watchlistProduct) {
                var item = list.filter(function (u) {
                    return u.WatchlistId === watchlistProduct.WatchlistId;
                })[0];
                var productModel = item.WatchlistProducts.filter(function (u) {
                    return u.ProductModel.ProductId === watchlistProduct.ProductModel.ProductId;
                })[0];
                var indexOf = item.WatchlistProducts.indexOf(productModel);

                item.WatchlistProducts.splice(indexOf, 1);
                onCurrentWatchlistChanged(item, "product-deleted");
                tool.broadcast('closeWatchlistProductNotes', productModel);
            }

            function handleAddOrUpdateWatchlistProductNotes(watchlistProduct) {
                var item = list.filter(function (u) {
                    return u.WatchlistId === watchlistProduct.WatchlistId;
                })[0];
                var productModel = item.WatchlistProducts.filter(function (u) {
                    return u.ProductModel.ProductId === watchlistProduct.ProductModel.ProductId;
                })[0];
                productModel.Notes = watchlistProduct.Notes;
            }

            coreSignalRNotificationService.turnOn('AddedWatchlist', handleNewWatchlist);
            coreSignalRNotificationService.turnOn('ModifiedWatchlist', handleModifiedWatchlist);
            coreSignalRNotificationService.turnOn('DeletedWatchlist', handleDeletedWatchlist);
            if (isMarketDataObserved) {
                coreSignalRNotificationService.turnOn('AddedWatchlistProduct',
                    handleNewFilteredWatchlistProductWithMarketData);
            } else {
                coreSignalRNotificationService.turnOn('AddedWatchlistProduct',
                    handleNewFilteredWatchlistProductWithoutMarketData);
            }
            coreSignalRNotificationService.turnOn('DeletedWatchlistProduct', handleDeletedWatchlistProduct);
            coreSignalRNotificationService.turnOn('AddOrUpdateWatchlistProductNotes', handleAddOrUpdateWatchlistProductNotes);

            return function () {
                coreSignalRNotificationService.turnOff('AddedWatchlist', handleNewWatchlist);
                coreSignalRNotificationService.turnOff('ModifiedWatchlist', handleModifiedWatchlist);
                coreSignalRNotificationService.turnOff('DeletedWatchlist', handleDeletedWatchlist);
                if (isMarketDataObserved) {
                    coreSignalRNotificationService.turnOff('AddedWatchlistProduct',
                        handleNewFilteredWatchlistProductWithMarketData);
                } else {
                    coreSignalRNotificationService.turnOn('AddedWatchlistProduct',
                        handleNewFilteredWatchlistProductWithoutMarketData);
                }
                coreSignalRNotificationService.turnOff('DeletedWatchlistProduct', handleDeletedWatchlistProduct);
                coreSignalRNotificationService.turnOff('AddOrUpdateWatchlistProductNotes', handleAddOrUpdateWatchlistProductNotes);
            }
        }

        function changeWatchlist(oldWatchlist, newWatchlist) {
            var promise1 = updateMarketDataForPanel('WATCHLIST', oldWatchlist ? oldWatchlist.WatchlistProducts : [], newWatchlist ? newWatchlist.WatchlistProducts : []);
            var promise2 = tool.when(true);
            if (newWatchlist) {
                promise2 = refineSingleWatchlist(newWatchlist);
            }
            return tool.onceAll([promise1, promise2]);
        }

        function setMarketDataUpdateHandlerOnListOfWatchlistProducts(getListOfWatchlistProducts) {
            var updateList = function (listOfWatchlistProduct) {
                var watchlistProductsToBeUpdated = listOfWatchlistProduct.filter(function (p) {
                    return !p.MarketData || !p.MarketData.ProductId;
                });
                sMarketDataService.getMarketDataMultiple(watchlistProductsToBeUpdated);
            }

            var handleQuoteUpdated = function (marketData) {
                var listOfWatchlistProduct = getListOfWatchlistProducts();
                if (listOfWatchlistProduct) {
                    //updateList(listOfWatchlistProduct);
                    listOfWatchlistProduct.forEach(function (product) {
                        if (product.ProductModel && product.ProductModel.ProductId === marketData.ProductId) {
                            sMarketDataService.handleBlinkAsk(product, marketData.AskPrice, tool);
                            sMarketDataService.handleBlinkBid(product, marketData.BidPrice, tool);
                            if (!product.MarketData) {
                                product.MarketData = {};
                            }
                            marketData = angular.merge(product.MarketData, marketData);
                            product.MarketData = angular.extend(product.MarketData || {}, sMarketDataService.calculateLastTradedPricePct(marketData));
                        }
                    });
                }
            }

            var handleMarketDataUpdated = function (marketData) {

                var listOfWatchlistProduct = getListOfWatchlistProducts();
                if (listOfWatchlistProduct) {
                    //updateList(listOfWatchlistProduct);
                    listOfWatchlistProduct.forEach(function (product) {
                        if (product.ProductModel && product.ProductModel.ProductId === marketData.ProductId) {
                            if (!product.MarketData) {
                                product.MarketData = {};
                            }
                            marketData = angular.merge(product.MarketData, marketData);
                            product.MarketData = angular.extend(product.MarketData || {}, sMarketDataService.calculateLastTradedPricePct(marketData));
                        }
                    });
                }
            }

            var initialList = getListOfWatchlistProducts();
            if (initialList) {
                updateList(initialList);
            }

            tool.signalRMarketData("SG", 'QuoteUpdated', handleQuoteUpdated);
            tool.signalRMarketData("SG", 'LastMarketDataUpdated', handleMarketDataUpdated);
            tool.signalRMarketData("US", 'QuoteUpdated', handleQuoteUpdated);
            tool.signalRMarketData("US", 'LastMarketDataUpdated', handleMarketDataUpdated);
            //Oanda
            tool.signalRMarketData("OTC (Oanda)", 'LastMarketDataUpdated', handleMarketDataUpdated);
        }

        function deleteWatchlist(watchlist) {
            tool.openModalByDefinition('s.watchlist.DeleteController', {
                watchlistId: watchlist.WatchlistId,
                beforeOpenCallback: null
            });
        }

        function addWatchlist() {
            var dialog = tool.openModalByDefinition('s.watchlist.AddNewController', {
                beforeOpenCallback: null
            });
            return dialog.result;
        }

        function addWatchlistAndRedirect() {
            return addWatchlist().then(function (watchlistId) {
                $location.search({ watchlistId: watchlistId });
                tool.log("Successfully added watchlist");
                coreSignalRNotificationService.invoke('ListenToWatchlist', watchlistId).then(
                    function (result) {
                        tool.log("Listening to Watchlist " + watchlistId);
                    }, function (errorData) {
                        tool.logError("Error invoking listen to watchlist");
                    });
            });
        }

        function editWatchlist(watchlist) {
            tool.openModalByDefinition('s.watchlist.EditPopupController', {
                watchlist: watchlist,
                beforeOpenCallback: null
            });
        }

        function deleteProductOnWatchlist(watchlist, stock) {
            var request = {
                WatchlistId: watchlist.WatchlistId,
                ProductId: stock.ProductModel.ProductId
            };
            tool.openModalByDefinition('s.watchlist.DeleteProductPopupController', {
                request: request,
                beforeOpenCallback: null
            });
        }

        function getWatchlists(isMarketDataObserved) {
            if (myWatchLists) {
                return tool.when(myWatchLists);
            }
            myWatchLists = [];
            return sWatchlistService.getWatchlistsForUser().then(function (res) {

                if (res.data.length > 0) {
                    myWatchLists = res.data;
                } else {
                    myWatchLists = [];
                }
                unsubscribeWatchlistChanges = observeWatchlist(myWatchLists, isMarketDataObserved, function (item, type) {
                    if (type === "deleted") {
                        watchlistSharedState.selectedWatchlist = item;
                    }
                    if (type === "new") {
                        coreSignalRNotificationService.invoke('ListenToWatchlist', item.WatchlistId).then(
                            function () {
                                tool.log("Listening to Watchlist " + item.WatchlistId);
                            }, function () {
                                tool.logError("Error invoking listen to Watchlist");
                            });
                    }
                    tool.broadcast('dashboard.watchlistChanged', {
                        watchlist: item,
                        type: type
                    });
                });
                return myWatchLists;
            }, function () {
                tool.log("Get watchlists for user Failed");
            });
        }

        tool.setServiceObjectProperties({
            watchlistSharedState: {
                watchlists: [],
                selectedWatchlist: null
            },
            getWatchlists: getWatchlists,

            setMarketDataUpdateHandlerOnListOfWatchlistProducts: setMarketDataUpdateHandlerOnListOfWatchlistProducts,

            addProductToWatchlist: addProductToWatchlist,
            isAnyProductIdInWatchList: isAnyProductIdInWatchList,
            changeWatchlist: changeWatchlist,
            refineWatchlists: refineWatchlists,

            refineSingleWatchlist: refineSingleWatchlist,            
            observeWatchlist: observeWatchlist,

            resolveWatchlistProduct: resolveWatchlistProduct,
            resolveListOfWatchlistProduct: resolveListOfWatchlistProduct,
            deleteWatchlist: deleteWatchlist,
            addWatchlist: addWatchlist,
            addWatchlistAndRedirect: addWatchlistAndRedirect,
            editWatchlist: editWatchlist,
            deleteProductOnWatchlist: deleteProductOnWatchlist,
            updateMarketDataForPanel: updateMarketDataForPanel
        });
    }
    );