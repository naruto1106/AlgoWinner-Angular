agmNgModuleWrapper('agmp.shop')
    .defineService('pShopService',
        ["pAlgoleaderService", "sHeaderService", "coreConfigService", "sCommunityService", "sRoboStrategiesService"],
        function (serviceObj, dep, tool) {
            var pAlgoleaderService = dep.pAlgoleaderService,
                sHeaderService = dep.sHeaderService,
                coreUserStateService = dep.coreUserStateService,
                $window = dep.$window,
                coreConfigService = dep.coreConfigService,
                sCommunityService = dep.sCommunityService;

            // --- LOCAL VAR DECLARATION
            var shopStrategiesLoadedDeferred = tool.defer();
            var shopSmartToolsLoadedDeferred = tool.defer();
            var shopBundlesLoadedDeferred = tool.defer();
            var backtesterOffersLoadedDeferred = tool.defer();


            // --- LOCAL FUNC
            function getNumberOfMonth(period) {
                switch (period) {
                    case "Monthly":
                        return 1;
                    case "Quarterly":
                        return 3;
                    case "Semiannually":
                        return 6;
                    case "Annually":
                        return 12;
                    default:
                        return 1;
                }
            }

            function getMonthlyPrice(offer) {
                return offer.Bundle.PricingPlanModel.PerPeriodFee / getNumberOfMonth(offer.Bundle.PricingPlanModel.PeriodType);
            }

            function isStrategyPackageContainingAutoInvest(strategyPackage) {
                var hasAutoInvest = false;
                if (strategyPackage && strategyPackage.allOffers) {
                    strategyPackage.allOffers.forEach(function (offer) {
                        offer.Bundle.AMPremiumItems.forEach(function (item) {
                            if (item.Name.toLowerCase().indexOf("autoinvest") > -1) {
                                hasAutoInvest = true;
                            }
                        });
                    });
                }

                var subscribedAutoInvest = false;
                if (strategyPackage && strategyPackage.availableBundles) {
                    strategyPackage.availableBundles.forEach(function (offer) {
                        if (offer.IsSubscribed) {
                            offer.AMPremiumItems.forEach(function (item) {
                                if (item.Name.toLowerCase().indexOf("autoinvest") > -1) {
                                    subscribedAutoInvest = true;
                                }
                            });
                        }
                    });
                }

                var hasVM = false;
                if (strategyPackage && strategyPackage.allOffers) {
                    strategyPackage.allOffers.forEach(function (offer) {
                        offer.Bundle.AMPremiumItems.forEach(function (item) {
                            if (item.Name.toLowerCase().indexOf("vm ") > -1) {
                                hasVM = true;
                            }
                        });
                    });
                }

                var subscribedVM = false;
                if (strategyPackage && strategyPackage.availableBundles) {
                    strategyPackage.availableBundles.forEach(function (offer) {
                        if (offer.IsSubscribed) {
                            offer.AMPremiumItems.forEach(function (item) {
                                if (item.Name.toLowerCase().indexOf("vm ") > -1) {
                                    subscribedVM = true;
                                }
                            });
                        }
                    });
                }

                return (hasAutoInvest && !subscribedAutoInvest) || (hasVM && !subscribedVM);
            }

            // --- SCOPE FUNC
            function loadShopStrategies() {
                sHeaderService.selectMenu("store");

                tool.onceAll([
                    sCommunityService.IsInTradingImpossibleGroup(),
                    pAlgoleaderService.resolveAllAlgoLeaderContents(true),
                    dep.sRoboStrategiesService.getRoboStrategyIds()
                ]).then(function (ress) {
                    // [J&J] Hide Smart Tools for Joey's group members 
                    // https://jira.algomerchant.com/jira/browse/PD-1644
                    var isInPtiGroup = ress[0].data;
                    serviceObj.showSmartTools = !isInPtiGroup;

                    if (pAlgoleaderService.bundlesWithInfo.strategies.length > 0) {
                        var allSelections = pAlgoleaderService.bundlesWithInfo.strategies;

                        //disable some strategies in config
                        var disabledStrategyIds = coreConfigService.Shop.DisabledStrategyIds.split(',');
                        allSelections.forEach(function (i) {
                            if (_.includes(disabledStrategyIds, i.StrategyId.toString())) {
                                i.Disabled = true;
                            }
                        });

                        var availableSelections = allSelections.filter(function (i) {
                            return !i.Disabled;
                        });

                        var disabledSelections = allSelections.filter(function (i) {
                            return i.Disabled;
                        });

                        serviceObj.strategySelections = availableSelections.concat(disabledSelections).filter(function (x) {
                            return !_.includes(ress[2], x.StrategyId);
                        });
                    }

                    shopStrategiesLoadedDeferred.resolve();
                }, function () {
                    shopStrategiesLoadedDeferred.reject();
                });
            }

            function loadBacktesterOffers() {
                tool.onceAll([
                    coreUserStateService.myPremiumItemSubscriptionsLoaded,
                    sHeaderService.strategyBundleLoaded
                ]).then(function () {
                    var tools = sHeaderService.strategyBundles.filter(function (bundle) {
                        return bundle.Type === "Tool";
                    });

                    serviceObj.backtesterOffers = [];

                    tools.forEach(function (t) {
                        if (_.includes(t.Name, "Momentum Analyzer")) {
                            serviceObj.backtesterOffers.push({
                                Action: {
                                    Action: "FollowNormally"
                                },
                                Bundle: t,
                                PriceDifference: t.PricingPlanModel.PerPeriodFee,
                                Name: "Momentum Analyzer"
                            });
                        }
                    });

                    backtesterOffersLoadedDeferred.resolve();
                }, function () {
                    backtesterOffersLoadedDeferred.reject();
                });
            }

            function loadShopTools() {
                tool.onceAll([
                    coreUserStateService.myPremiumItemSubscriptionsLoaded,
                    sHeaderService.strategyBundleLoaded
                ]).then(function () {
                    var tools = sHeaderService.strategyBundles.filter(function (bundle) {
                        return bundle.Type === "Tool";
                    });

                    //hardcode smart tools first to make this easy
                    serviceObj.smartTools.forEach(function (tool) {
                        tool.Offers = [];
                        tools.forEach(function (t) {
                            if (tool.Name === t.Name || _.includes(t.Name, tool.Name)) {
                                if (t.IsSubscribed) {
                                    tool.IsSubscribed = true;
                                }

                                tool.Offers.push({
                                    Action: {
                                        Action: "FollowNormally"
                                    },
                                    Bundle: t,
                                    PriceDifference: t.PricingPlanModel.PerPeriodFee,
                                    Name: tool.Name
                                });

                                t.AMPremiumItems.forEach(function (item) {
                                    if (item.Name === tool.Name || _.includes(tool.Name, item.Name)) {
                                        tool.ImageUrl = item.ImageUrl;
                                        tool.Description = item.Description;
                                    }
                                });

                                if (tool.Name === "AlgoOracle" && coreUserStateService.hasAlgoOracle()) {
                                    tool.IsSubscribed = true;
                                }
                                if (tool.Name === "AlgoMart" && coreUserStateService.hasAlgoMartBundle()) {
                                    tool.IsSubscribed = true;
                                }
                                if (tool.Name === "AlgoChart" && coreUserStateService.hasAlgoChartBundle()) {
                                    tool.IsSubscribed = true;
                                }
                                if (tool.Name === "Momentum Analyzer" && coreUserStateService.hasBacktester()) {
                                    tool.IsSubscribed = true;
                                }
                            }
                        });
                    });

                    shopSmartToolsLoadedDeferred.resolve();
                }, function () {
                    shopSmartToolsLoadedDeferred.reject();
                });
            }

            function loadShopBundles() {
                serviceObj.bundles = [];
                sHeaderService.strategyBundleLoaded.then(function () {
                    var bundles = sHeaderService.strategyBundles.filter(function (bundle) {
                        return bundle.Type === "Bundle";
                    });

                    bundles.forEach(function (b) {
                        var bundle = {
                            Name: b.Name,
                            Description: b.Description,
                            IsSubscribed: b.IsSubscribed,
                            AMPremiumItems: b.AMPremiumItems,
                            Strategies: b.Strategies,
                            PerPeriodFee: b.PricingPlanModel.PerPeriodFee,
                            Currency: b.PricingPlanModel.Currency,
                            PeriodType: b.PricingPlanModel.PeriodType,
                            Offers: []
                        };

                        bundle.Offers.push({
                            Action: {
                                Action: "FollowNormally"
                            },
                            Bundle: b,
                            PriceDifference: b.PricingPlanModel.PerPeriodFee,
                            Name: b.Name
                        });

                        serviceObj.bundles.push(bundle);
                    });

                    shopBundlesLoadedDeferred.resolve();
                }, function () {
                    shopBundlesLoadedDeferred.reject();
                });
            }

            function getMinMonthlyFee(offers) {
                if (offers && offers.length > 0) {
                    var min = getMonthlyPrice(offers[0]);
                    offers.forEach(function (o) {
                        if (getMonthlyPrice(o) < min) {
                            min = getMonthlyPrice(o);
                        }
                    });
                    return min;
                }
                return 0;
            }

            function goToStrategyPerformance(strategyId) {
                $window.open("/Home/Inside#/strategies?strategyId=" + strategyId, '_blank');
            }

            function showAddAutoInvest(strategyPackage) {
                return strategyPackage &&
                    isStrategyPackageContainingAutoInvest(strategyPackage) &&
                    strategyPackage.recommendedOffer &&
                    strategyPackage.recommendedOffer.Action.Action === "Upgrade" &&
                    pAlgoleaderService.isStrategySubscribed(strategyPackage.detail.StrategyId);
            }

            function showSwitchPlan(strategyPackage) {
                return strategyPackage &&
                    strategyPackage.recommendedOffer &&
                    strategyPackage.recommendedOffer.Action.Action === "Switch" &&
                    pAlgoleaderService.isStrategySubscribed(strategyPackage.detail.StrategyId);
            }

            tool.setServiceObjectProperties({
                strategySelections: [],
                marketDataItems: [],
                backtesterOffers: [],
                smartTools: [
                    {
                        Name: "AlgoOracle",
                        DescriptionUrl: "//am708403.azureedge.net/images/bundleicon/algooracle_desc.jpg",
                        IsSubscribed: false,
                        Offers: []
                    },
                    {
                        Name: "Momentum Analyzer",
                        DescriptionUrl: "//am708403.azureedge.net/images/bundleicon/backtester_desc.png",
                        IsSubscribed: false,
                        Offers: []
                    },
                    //{
                    //    Name: "AlgoMart",
                    //    DescriptionUrl: "//am708403.azureedge.net/images/bundleicon/algomart_desc.jpg",
                    //    IsSubscribed: false,
                    //    Offers: []
                    //}, {
                    //    Name: "AlgoChart",
                    //    DescriptionUrl: "//am708403.azureedge.net/images/bundleicon/algochart_desc.jpg",
                    //    IsSubscribed: false,
                    //    Offers: []
                    //}
                ],
                bundles: [],
                showStrategy: false,
                showSmartTools: false,

                shopStrategiesLoaded: shopStrategiesLoadedDeferred.promise,
                shopSmartToolsLoaded: shopSmartToolsLoadedDeferred.promise,
                shopBundlesLoaded: shopBundlesLoadedDeferred.promise,
                backtesterOffersLoaded: backtesterOffersLoadedDeferred.promise,

                loadShopStrategies: loadShopStrategies,
                loadShopTools: loadShopTools,
                loadShopBundles: loadShopBundles,
                getMinMonthlyFee: getMinMonthlyFee,
                goToStrategyPerformance: goToStrategyPerformance,
                showAddAutoInvest: showAddAutoInvest,
                showSwitchPlan: showSwitchPlan,
                loadBacktesterOffers: loadBacktesterOffers
            });
        });