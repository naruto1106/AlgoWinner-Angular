agmNgModuleWrapper('agms.trading')
    .defineService("sTradingClientPortfolioService",
    ['portfolioService', 'orderProcessing', 'orderService', 'sTradingItemService', 'commonItemUpdateService', "coreSignalRMarketDataService",
        "sPositionsCalculatorService", "sProductService", 'tradeDataService'],
    function (serviceObj, dep, tool) {
        // --- DEPENDENCY RESOLVER
        var $rootScope = dep.$rootScope,
            coreSignalRNotificationService = dep.coreSignalRNotificationService,
            portfolioService = dep.portfolioService,
            orderProcessing = dep.orderProcessing,
            orderService = dep.orderService,
            sTradingItemService = dep.sTradingItemService,
            commonItemUpdateService = dep.commonItemUpdateService,
            coreSignalRMarketDataService = dep.coreSignalRMarketDataService,
            sPositionsCalculatorService = dep.sPositionsCalculatorService,
            sProductService = dep.sProductService,
            tradeDataService = dep.tradeDataService;
        var previousGetActivePositionPromise = null;
        var previousGetPositionPromise = null;
        var selectedStrategyId = null;

        tool.setServiceObjectProperties({
            handleViewDeveloperPositionDetail: handleViewDeveloperPositionDetail,
            handleViewDeveloperHistoricalPositionDetail: handleViewDeveloperHistoricalPositionDetail,
            getDeveloperHistoricalPortfolios: getDeveloperHistoricalPortfolios,
            getDeveloperActivePortfolios: getDeveloperActivePortfolios,
            loadPositionsPage: loadPositionsPage
        });

        // --- SCOPE FUNC
        function handleViewDeveloperPositionDetail(position) {
            return orderService.GetDeveloperOrdersOfPortfolioId(position.PortfolioId)
                .then(function (res) {
                    var orders = [];
                    handleOrderResponse(res.data, orders);
                    showDetail(position, orders);
                }, function (res) {

                });
        }
        
        function handleViewDeveloperHistoricalPositionDetail(position) {
            return orderService.GetDeveloperOrdersOfPortfolioId(position.PortfolioId)
                .then(function (res) {
                    var orders = [];
                    handleOrderResponse(res.data, orders);
                    showHistoricalDetail(position, orders);
                }, function (res) {

                });
        }

        function getDeveloperActivePortfolios(selectedStrategy, activePositions, onActivePositionsUpdate) {
            selectedStrategyId = selectedStrategy.DisplayInfo.BasicInfo.StrategyId;
            activePositions.splice(0, activePositions.length);

            tool.signalRMarketData("RT", 'LastMarketDataUpdated', recalcPortfolioProperty);
            coreSignalRNotificationService.turnOn('DeveloperPortfolioUpdated', processDeveloperPortfolioUpdate);

            var promise = portfolioService.GetActivePortfolio({ StrategyIds: [selectedStrategy.DisplayInfo.BasicInfo.StrategyId]});

            getOpenPositions(promise, previousGetActivePositionPromise, activePositions, onActivePositionsUpdate);

            return function () {
                coreSignalRMarketDataService.unSubscribeRealTimeMarketDataMultiple(_.map(activePositions, "Product"));
                coreSignalRNotificationService.turnOff('DeveloperPortfolioUpdated', processDeveloperPortfolioUpdate);
            };

            function recalcPortfolioProperty(data) {
                //recalculate position values (UPL, exposure, exposure percent, margin used)
                calculateOpenPositionValues(activePositions, data, selectedStrategy.CapitalInfo.Currency);
                //recalculate sector capitals
                if (selectedStrategyId === selectedStrategy.DisplayInfo.BasicInfo.StrategyId) {
                    sPositionsCalculatorService.calculateSectorCapitals(activePositions, selectedStrategy.CapitalInfo.Currency).then(function (res) {
                        processSectorCapitalsUpdate(res, selectedStrategy.SectorCapitals, onActivePositionsUpdate);
                    });
                }
            }

            function processDeveloperPortfolioUpdate(updatedPosition) {
                if (selectedStrategy.DisplayInfo.BasicInfo.StrategyId === updatedPosition.StrategyId) {
                    processPortfolioUpdate(updatedPosition, activePositions, onActivePositionsUpdate, recalcPortfolioProperty);
                    $rootScope.$broadcast('portfolioUpdated');
                }
            }
        }

        function getDeveloperHistoricalPortfolios(selectedStrategyId, productId, positions, onPositionUpdate) {
            var historySize = null;

            portfolioService.GetHistoricalPortfoliosSize(selectedStrategyId, productId)
                .then(function (res) {
                    historySize = res.data;
                    positions.splice(0, positions.length);
                    if (historySize == 0) {
                        onPositionUpdate()
                    }
                    for (var i = 0; i < historySize; ++i) {
                        positions.push("placeholder" + i);
                    }

                    var pageNumber = 0;
                    var pageSize = 10;
                    var promise = portfolioService.GetHistoricalPortfolio(selectedStrategyId, pageNumber, pageSize, productId);

                    if (previousGetPositionPromise) {
                        previousGetPositionPromise.cancel();
                    }

                    previousGetPositionPromise = promise;

                    promise.then(function (res) {
                        var to = Math.min((pageNumber + 1) * pageSize, historySize);
                        for (var i = pageNumber * pageSize; i < to; ++i) {
                            positions[i] = res.data[i];
                        }
                        if (onPositionUpdate) {
                            onPositionUpdate({ type: "initial-list" });
                        }
                    }, function (res) {
                        tool.logError("Unable to get history portfolio", "Error! " + (res.data && res.data.Message));
                    });
                }, function (res) {
                    tool.logError("Unable to get historical portfolio size", "Error! " + (res.data && res.data.Message));
                });

        }

        function loadPositionsPage(selectedStrategy, page, itemsPerPage, product, callback) {
            var promise = portfolioService.GetHistoricalPortfolio(selectedStrategy, page, itemsPerPage, product);

            promise.then(function (res) {
                callback(res.data);
            }, function (res) {
                tool.logError("Unable to get history portfolio", "Error! " + (res.data && res.data.Message));
            });
        }


        // --- LOCAL SERVICE FUNC
        function processPortfolioUpdate(updatedPosition, positions, onPositionUpdate, recalcPortfolioPropertyFunc) {
            if (!positions) {
                return [];
            }
            var position = positions.filter(function (p) {
                return p.PortfolioId === updatedPosition.PortfolioId;
            })[0];

            if (position) {
                if (commonItemUpdateService.isLaterTimestamp(updatedPosition, position)) {
                    if (position.QuantityOnHold !== updatedPosition.QuantityOnHold) {
                        //recalculate when quantity change
                        sPositionsCalculatorService.updatePosition(position, updatedPosition);
                        if (position.MarketData) {
                            recalcPortfolioPropertyFunc(position.MarketData);
                        } else {
                            var requestObj = {
                                ProductId: position.Product.ProductId,
                                Symbol: position.Product.Symbol,
                                TradeVenueLoc: position.Product.TradeVenueLoc,
                                AssetType: position.Product.AssetType,
                                Currency: position.Product.Currency
                            };
                            tradeDataService.GetLast(requestObj).then(function(res) {
                                position.MarketData = res.data;
                                recalcPortfolioPropertyFunc(position.MarketData);
                            });
                        }
                    } else {
                        sPositionsCalculatorService.updatePosition(position, updatedPosition);
                    }
                }
            } else if (updatedPosition.Product) {
                positions.push(updatedPosition);
                //Subscribe new position to Market Data
                coreSignalRMarketDataService.subscribeRealTimeMarketDataMultiple([updatedPosition.Product]);

                if (onPositionUpdate) {
                    onPositionUpdate({ type: "update" });
                }
            }

            return positions.filter(function (p) {
                return p.QuantityOnHold > 0;
            });
        }

        function handleOrderResponse(data, orders) {
            if (!orders) {
                return;
            }
            data.forEach(function (d) {
                orderProcessing.aggregateOrderStatus(d);
                orders.push(d);
            });
        }

        function showDetail(position, orders) {
            tool.openModalByDefinition('s.trading.PortfolioDetailPopupController', {
                position: position,
                orders: orders
            });
        }

        function showHistoricalDetail(position, orders) {
            tool.openModalByDefinition('s.trading.HistoricalPortfolioDetailController', {
                position: position,
                orders: orders
            });
        }

        function getOpenPositions(promise, previousPromise, list, onPositionUpdate) {
            if (previousPromise) {
                previousPromise.cancel();
            }
            previousPromise = promise;
            tool.broadcast('portfolioCleared');
            list.splice(0, list.length);
            return promise.then(function (res) {
                res.data.forEach(function (pos) {
                    list.push(pos);
                });

                if (onPositionUpdate) {
                    onPositionUpdate({ type: "initial-list" });
                }

                var openPositions = subscribeMarketDataAndGetOpenPositions(list);
                var request = {
                    ProductIds: _.map(_.map(openPositions, "Product"), "ProductId"),
                    BrokerageType: "AM"
                }

                return sProductService.GetProductsLeverage(request).then(function (res) {
                    if (res && res.data) {
                        res.data.forEach(function (l) {
                            sPositionsCalculatorService.leverageDict[l.ProductId] = l;
                        });
                    }

                    tool.broadcast('portfolioUpdated');
                    return openPositions;
                });
            }, function (res) {
                tool.logError("Unable to get portfolio", "Error! " + (res.data && res.data.Message));
            });
        }

        function subscribeMarketDataAndGetOpenPositions(positions) {
            //Get open positions
            var openPositions = positions.filter(function (p) {
                return p.QuantityOnHold > 0;
            });

            //Subscribe to Market Data
            coreSignalRMarketDataService.subscribeRealTimeMarketDataMultiple(_.map(openPositions, "Product"));

            return openPositions;
        }

        function getMatchingSectorIndex(name, sectorCapitals) {
            for (var j = 0, lenj = sectorCapitals.length; j < lenj; j++) {
                if (name === sectorCapitals[j].SectorName) {
                    return sectorCapitals[j];
                }
            }
            return null;
        }

        function processCommonCapitalUpdate(incomingSectorCapitals, sectorCapitals) {
            for (var i = 0, len = incomingSectorCapitals.length; i < len; i++) {
                var obj = getMatchingSectorIndex(incomingSectorCapitals[i].SectorName, sectorCapitals);
                if (obj) {
                    // Turnover is null when it is broadcast through market data update
                    if (incomingSectorCapitals[i].Turnover !== null && incomingSectorCapitals[i].Turnover !== obj.Turnover) {
                        obj.Turnover = incomingSectorCapitals[i].Turnover;
                    }
                    if (incomingSectorCapitals[i].Exposure !== null && incomingSectorCapitals[i].Exposure !== obj.Exposure) {
                        obj.Exposure = incomingSectorCapitals[i].Exposure;
                    }
                    if (incomingSectorCapitals[i].ExposurePercentage !== null && incomingSectorCapitals[i].ExposurePercentage !== obj.ExposurePercentage) {
                        obj.ExposurePercentage = incomingSectorCapitals[i].ExposurePercentage;
                    }
                    if (incomingSectorCapitals[i].TurnoverPercentage !== null && incomingSectorCapitals[i].TurnoverPercentage !== obj.TurnoverPercentage) {
                        obj.TurnoverPercentage = incomingSectorCapitals[i].TurnoverPercentage;
                    }
                } else {
                    sectorCapitals.push(incomingSectorCapitals[i]);
                }
            }
        }

        function processSectorCapitalsUpdate(data, sectorCapitals, onPositionUpdate) {
            processCommonCapitalUpdate(data, sectorCapitals);
            sTradingItemService.populateSectorDirective(sectorCapitals);
            if (onPositionUpdate) {
                onPositionUpdate({ type: "update" });
            }
        }

        function calculateOpenPositionValues(openPositions, data, strategyCurrency) {
            openPositions.forEach(function (p) {
                if (p.Product && p.Product.ProductId === data.ProductId) {
                    p.MarketData = data;
                    sPositionsCalculatorService.calculateOpenPositionValues(p, true, openPositions, strategyCurrency);
                    $rootScope.$broadcast('portfolioUpdated');
                }
            });
        }
    });