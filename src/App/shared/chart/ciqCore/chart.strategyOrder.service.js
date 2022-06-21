agmNgModuleWrapper('agms.chart')
    .defineService('pChartStrategyOrderService', [        
        'orderService',
        'pChartTimeBoundEventFuncLibrary',
        'pChartColoringService',
        'pChartFilterDescriptionService',
        'sSubscriptionBundleService',
        'sStrategyCommerceService',
        'pChartPopupService',
        'pChartEventVisibilityService',
        "sHeaderService","sRoboStrategiesService","$q"
    ], function (serviceObj, dep, tool) {
        var sSubscriptionBundleService = dep.sSubscriptionBundleService,
            sStrategyCommerceService = dep.sStrategyCommerceService,
            pChartColoringService = dep.pChartColoringService,
            pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
            pChartTimeBoundEventFuncLibrary = dep.pChartTimeBoundEventFuncLibrary,
            orderService = dep.orderService,
            pChartPopupService = dep.pChartPopupService,
            pChartEventVisibilityService = dep.pChartEventVisibilityService,
            sHeaderService = dep.sHeaderService,
            coreConfigService = dep.coreConfigService;

        var filterDescription = pChartFilterDescriptionService;

        var strategyTradesBuffer = {};
        var temporaryTradeBasketBuy = [];
        var temporaryTradeBasketSell = [];

        function getTradeProperty(object, clonedElement, scope) {
            scope.trades = object;
        }

        function getDateProperty(object) {
            return object.date;
        }

        function getPlacementBelow(object) {
            return 'below';
        }

        function getPlacementAbove(object) {
            return 'above';
        }

        function strategyVisibility(s, openedfilterDescription) {
            openedfilterDescription = openedfilterDescription || filterDescription;
            var strategyLabel = getStrategyLabelName(s);
            return openedfilterDescription.eventVisibility[strategyLabel];
        }

        function allVisible(collections) {
            return _.every(collections, function (element) {
                return strategyVisibility(element);
            });
        }

        function roundDownDateToTick(date) {
            if (!date) {
                return null;
            }
            var oneMinuteTick = 60 * 1000;
            var roundDownMultiplier = oneMinuteTick;
            switch (filterDescription.barSize) {
                case '1 Min':
                    roundDownMultiplier = oneMinuteTick;
                    break;
                case '5 Min':
                    roundDownMultiplier = oneMinuteTick * 5;
                    break;
                case '10 Min':
                    roundDownMultiplier = oneMinuteTick * 10;
                    break;
                case '15 Min':
                    roundDownMultiplier = oneMinuteTick * 15;
                    break;
                case '30 Min':
                    roundDownMultiplier = oneMinuteTick * 30;
                    break;
                case '1 H':
                    roundDownMultiplier = oneMinuteTick * 60;
                    break;
                case '2 H':
                    roundDownMultiplier = oneMinuteTick * 120;
                    break;
                case '1 D':
                    roundDownMultiplier = oneMinuteTick * 60 * 24;
                    break;
                case '1 W':
                    roundDownMultiplier = oneMinuteTick * 60 * 24 * 7;
                    break;
                case '1 M':
                    roundDownMultiplier = oneMinuteTick * 60 * 24 * 30;
                    break;
            };
            var roundedTimeTick = Math.floor(date.getTime() / roundDownMultiplier) * roundDownMultiplier;
            return roundedTimeTick;
        }

        function getTradesOnPrimaryProduct(trades) {
            if (!filterDescription.primaryProduct) {
                return [];
            }
            return trades.filter(function (t) {
                return t.Product.ProductId === filterDescription.primaryProduct.ProductId;
            });
        }

        function getTradesPromise(strategy) {
            var strategyLabel = getStrategyLabelName(strategy);

            if (strategyTradesBuffer[strategyLabel]) {
                return tool.when(getTradesOnPrimaryProduct(strategyTradesBuffer[strategyLabel]));
            }

            return orderService.GetTradesForChart(strategy.DisplayInfo.BasicInfo.StrategyId).then(function (res) {
                var trades = [];
                res.data.forEach(function (order) {
                    order.color = strategy.color;
                    order.date = new Date(order.LastUpdateTime);
                    order.Strategy = strategy;
                    trades.push(order);
                });
                strategyTradesBuffer[strategyLabel] = trades;
                return getTradesOnPrimaryProduct(trades);
            });
        }

        function getAllTradePromise(filterFunc) {
            var promises = [];
            var tradeBasket = [];

            if (serviceObj.myStrategies) {
                serviceObj.myStrategies.forEach(function (strategy) {
                    if (strategyVisibility(strategy)) {
                        var promise = getTradesPromise(strategy).then(function (u) {
                            tradeBasket[strategy.DisplayInfo.BasicInfo.StrategyId] = u.filter(filterFunc);
                        });
                        promises.push(promise);
                    }
                });

            }
            if (serviceObj.mySubscriptions) {
                serviceObj.mySubscriptions.forEach(function (subscription) {
                    if (strategyVisibility(subscription)) {
                        var promise = getTradesPromise(subscription).then(function (u) {
                            tradeBasket[subscription.DisplayInfo.BasicInfo.StrategyId] = u.filter(filterFunc);
                        });
                        promises.push(promise);
                    }
                });
            }
            return tool.onceAll(promises).then(function () {
                return groupAllStrategies(tradeBasket);
            });
        }

        function getStrategyLabelName(s) {
            return 'strategy' + s.DisplayInfo.BasicInfo.StrategyId;
        }

        function groupAllStrategies(tradeBasket) {
            var groupByDateTickArray = [];
            var dateSorterDesc = function (a, b) {
                return a.date.getTime() < b.date.getTime();
            };

            for (var prop in tradeBasket) {
                tradeBasket[prop].forEach(function (u) {
                    var dateTick = roundDownDateToTick(u.date);
                    if (!groupByDateTickArray[dateTick]) {
                        groupByDateTickArray[dateTick] = {
                            arr: [],
                            date: new Date(dateTick)
                        };
                    }
                    groupByDateTickArray[dateTick].arr.push(u);
                });
            }
            var groupByDateArray = [];
            for (var prop in groupByDateTickArray) {
                var item = groupByDateTickArray[prop];
                item.showDetail = function () {
                    hideAllTradeBaskets(this);
                    this.detailShown = true;
                    pChartPopupService.showChartPopupDetail(this);
                };
                item.hideDetail = function () {
                    this.detailShown = false;
                    pChartPopupService.hideChartPopupDetail(this);
                };
                item.arr = item.arr.sort(dateSorterDesc);

                groupByDateArray.push(groupByDateTickArray[prop]);
            }

            return groupByDateArray.sort(function (a, b) {
                return a.date.getTime() > b.date.getTime();
            });
        }

        function hideAllTradeBaskets(currentBasket) {
            temporaryTradeBasketBuy.forEach(function (u) {
                u.hideDetail();
            });
            temporaryTradeBasketSell.forEach(function (u) {
                u.hideDetail();
            });
        }

        function onStrategyVisibilityChanged(s) {
            var strategyLabel = getStrategyLabelName(s);
            pChartEventVisibilityService.toggleEvent(strategyLabel);
            pChartEventVisibilityService.toggleEvent(serviceObj.tradesLabelKindBuy, true);
            pChartEventVisibilityService.toggleEvent(serviceObj.tradesLabelKindSell, true);
        }

        function onAllVisibilityChanged(collections) {
            var currentlyVisible = allVisible(collections);
            _.each(collections, function (element) {
                var strategyLabel = getStrategyLabelName(element);
                pChartEventVisibilityService.toggleEvent(strategyLabel, !currentlyVisible);
            });
            pChartEventVisibilityService.toggleEvent(serviceObj.tradesLabelKindBuy, true);
            pChartEventVisibilityService.toggleEvent(serviceObj.tradesLabelKindSell, true);
        }

        function getConsolidatedTradesBuy() {
            var filterFunc = function (u) {
                return u.Action === 'Buy';
            };
            return getAllTradePromise(filterFunc).then(function (tradeBasket) {
                temporaryTradeBasketBuy = tradeBasket;
                return tradeBasket;
            });
        }

        function getConsolidatedTradesSell() {
            var filterFunc = function (u) {
                return u.Action === 'Sell';
            };
            return getAllTradePromise(filterFunc).then(function (tradeBasket) {
                temporaryTradeBasketSell = tradeBasket;
                return tradeBasket;
            });
        }

        function initStrategiesAndSubscriptions() {
            sStrategyCommerceService.GetManagedStrategies().then(function (res) {
                serviceObj.myStrategies = res.data;
                serviceObj.myStrategies.forEach(function (strategy) {
                    strategy.included = false;
                    strategy.tradesLoaded = false;
                    strategy.trades = [];
                    strategy.color = pChartColoringService.getNextColor("trade");
                });
                pChartEventVisibilityService.toggleEvent(serviceObj.tradesLabelKindBuy, true);
                pChartEventVisibilityService.toggleEvent(serviceObj.tradesLabelKindSell, true);
            });

            sSubscriptionBundleService.GetSubscriptionsForChart().then(function (res) {
                serviceObj.mySubscriptions = res.data;
                //hide strategies for AlgoLeader web
                if (coreConfigService.AlgoLeader.HideForAlgoLeader) {
                    serviceObj.mySubscriptions = serviceObj.mySubscriptions.filter(function (s) {
                        return _.includes(sHeaderService.StrategyWhiteList, s.DisplayInfo.BasicInfo.StrategyId);
                    });
                }

                serviceObj.mySubscriptions.forEach(function (subscription) {
                    subscription.included = false;
                    subscription.tradesLoaded = false;
                    subscription.trades = [];
                    subscription.color = pChartColoringService.getNextColor("trade");
                });
                pChartEventVisibilityService.toggleEvent(serviceObj.tradesLabelKindBuy, true);
                pChartEventVisibilityService.toggleEvent(serviceObj.tradesLabelKindSell, true);
            });

            pChartTimeBoundEventFuncLibrary.generateTimeBoundEventFunc({
                pChartPopupService: pChartPopupService
            }, serviceObj.tradesLabelKindBuy, "template[tradesBuy]",
                getConsolidatedTradesBuy,
                getTradeProperty, getDateProperty, getPlacementBelow);
            pChartTimeBoundEventFuncLibrary.generateTimeBoundEventFunc({
                pChartPopupService: pChartPopupService
            }, serviceObj.tradesLabelKindSell, "template[tradesSell]",
                getConsolidatedTradesSell,
                getTradeProperty, getDateProperty, getPlacementAbove);

            dep.coreUserStateService.myPremiumItemSubscriptionsLoaded.then(function () {
                if (dep.coreUserStateService.hasSGRealTimeMarketData() || dep.coreUserStateService.hasUSRealTimeMarketData()) {
                    tool.signalRNotification('TradeCreated', handleNewTrade);
                }
            });

        }

        function handleNewTrade(newTrade) {
            var matchingStrategy = _.filter(serviceObj.myStrategies,
                function (s) {
                    return s.DisplayInfo.BasicInfo.StrategyId === newTrade.StrategyId;
                })[0];
            var matchingSubscription = _.filter(serviceObj.mySubscriptions,
                function (s) {
                    return s.DisplayInfo.BasicInfo.StrategyId === newTrade.StrategyId;
                })[0];

            newTrade.date = new Date(newTrade.LastUpdateTime);
            if (matchingStrategy) {
                newTrade.color = matchingStrategy.color;
                newTrade.Strategy = matchingStrategy;
            }

            if (matchingSubscription) {
                newTrade.color = matchingSubscription.color;
                newTrade.Strategy = matchingSubscription;
            }

            if (newTrade.Strategy) {
                // insert straight to the buffer, and re-trigger the grouping and drawing by toggling the hide/show
                var label = getStrategyLabelName(newTrade.Strategy);
                if (strategyTradesBuffer[label]) {
                    strategyTradesBuffer[label].push(newTrade);
                }
                if (newTrade.Action === 'Buy') {
                    pChartEventVisibilityService.toggleEvent(serviceObj.tradesLabelKindBuy);
                    pChartEventVisibilityService.toggleEvent(serviceObj.tradesLabelKindBuy);
                } else {
                    pChartEventVisibilityService.toggleEvent(serviceObj.tradesLabelKindSell);
                    pChartEventVisibilityService.toggleEvent(serviceObj.tradesLabelKindSell);
                }
            }
        }

        function tradeBackgroundColor(color) {
            return pChartPopupService.tradeBackgroundColor(color);
        }


        function initialize() {            
            sSubscriptionBundleService.GetSubscriptionsForChart().then(function (res) {
                serviceObj.mySubscriptions = res.data;
                serviceObj.mySubscriptions.forEach(function (subscription) {
                    subscription.included = false;
                    subscription.tradesLoaded = false;
                    subscription.trades = [];
                    subscription.color = pChartColoringService.getNextColor("trade");
                });
                pChartEventVisibilityService.toggleEvent(serviceObj.tradesLabelKindBuy, true);
                pChartEventVisibilityService.toggleEvent(serviceObj.tradesLabelKindSell, true);
            });
            initStrategiesAndSubscriptions();
        }

        tool.setServiceObjectProperties({
            tradesLabelKindBuy: "tradesLabelKindBuy",
            tradesLabelKindSell: "tradesLabelKindSell",
            tradeBackgroundColor: tradeBackgroundColor,
            onAllVisibilityChanged: onAllVisibilityChanged,
            onStrategyVisibilityChanged: onStrategyVisibilityChanged,
            strategyVisibility: strategyVisibility,
            allVisible: allVisible,
            getStrategyLabelName: getStrategyLabelName,
            roundDownDateToTick: roundDownDateToTick
        });

        initialize();
    });