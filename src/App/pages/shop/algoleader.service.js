agmNgModuleWrapper('agmp.shop')
    .defineService('pAlgoleaderService',
    ["sSubscriptionBundleService", "sPaymentStripeService", "sHeaderService"],
    function (serviceObj, dep, tool) {
        var sPaymentStripeService = dep.sPaymentStripeService,
            coreConfigService = dep.coreConfigService,
            sSubscriptionBundleService = dep.sSubscriptionBundleService,
            sHeaderService = dep.sHeaderService;

        var initialBundleForPremium = null;
        var premiumBundleList = [];
        var mySubscriptionPromise = null;
        var getAllPlanSwitchingSchemesPromise = null;
        var getBundlesWithInfoPromise = null;
        var fromSwitchingSchemesDict = null;
        var toSwitchingSchemesDict = null;
        var subscribedPricingPlansDict = null;

        function resolveMySubscription() {
            return sSubscriptionBundleService.GetAllBundleSubscriptionsWithoutCoupon().then(function (res) {
                var data = res.data;
                subscribedPricingPlansDict = {};
                serviceObj.subscribedBundlesByIdDict = {};
                serviceObj.subscribedStrategiesByIdDict = {};
                serviceObj.subscribedBundleSubscriptionsDict = {};
                serviceObj.subscribedBundleSubscriptionsGroupByPricingPlanDict = {};
                data.forEach(function (i) {
                    var pricingPlanModel = i.PricingPlanModel;
                    if (!serviceObj.subscribedBundlesByIdDict[i.PricingPlanModel.BundleId]) {
                        serviceObj.subscribedBundlesByIdDict[i.PricingPlanModel.BundleId] = [];
                    }
                    i.Strategies.forEach(function (str) {
                        if (!serviceObj.subscribedStrategiesByIdDict[str.StrategyId]) {
                            serviceObj.subscribedStrategiesByIdDict[str.StrategyId] = {};
                        }
                        serviceObj.subscribedStrategiesByIdDict[str.StrategyId][i.PricingPlanModel.BundleId] = i;
                    });

                    serviceObj.subscribedBundlesByIdDict[i.PricingPlanModel.BundleId].push(i);
                    subscribedPricingPlansDict[pricingPlanModel.BundlePricingPlanId] = pricingPlanModel;
                    serviceObj.subscribedBundleSubscriptionsDict[i.BundleSubscriptionId] = i;
                    if (!serviceObj.subscribedBundleSubscriptionsGroupByPricingPlanDict[pricingPlanModel.BundlePricingPlanId]) {
                        serviceObj.subscribedBundleSubscriptionsGroupByPricingPlanDict[pricingPlanModel.BundlePricingPlanId] = [];
                    }
                    serviceObj.subscribedBundleSubscriptionsGroupByPricingPlanDict[pricingPlanModel.BundlePricingPlanId].push(i);
                });
            });
        }

        function resolvePlanSwitchingSchemes() {
            return sSubscriptionBundleService.GetAllPlanSwitchingSchemes().then(function (res) {
                var data = res.data;
                fromSwitchingSchemesDict = {};
                toSwitchingSchemesDict = {};
                data.forEach(function (x) {
                    if (!fromSwitchingSchemesDict[x.FromPricingPlanId]) {
                        fromSwitchingSchemesDict[x.FromPricingPlanId] = [];
                    }
                    fromSwitchingSchemesDict[x.FromPricingPlanId].push(x);

                    if (!toSwitchingSchemesDict[x.ToPricingPlanId]) {
                        toSwitchingSchemesDict[x.ToPricingPlanId] = [];
                    }
                    toSwitchingSchemesDict[x.ToPricingPlanId].push(x);
                });
            });
        }

        function isSubscribingPremium() {

            if (!premiumBundleList || !serviceObj.subscribedBundlesByIdDict) {
                return false;
            }
            return premiumBundleList.filter(function (bundle) {
                return serviceObj.subscribedBundlesByIdDict[bundle.BundleId];
            }).length > 0;
        }

        function getAllPossibleActionsFromSwitchingScheme(bundle) {

            var toPlanId = bundle.PricingPlanModel.BundlePricingPlanId;
            var actions = [];
            var forbidden = false;

            if (isBundleSubscribed(bundle)) {
                return [];
            }

            if (toSwitchingSchemesDict[toPlanId] != null) {
                toSwitchingSchemesDict[toPlanId].forEach(function (scheme) {
                    if (scheme.Status === 'Forbidden') {
                        forbidden = subscribedPricingPlansDict[scheme.FromPricingPlanId] != null;
                    }
                });

            }
            if (forbidden) {
                return [];
            }
            if (toSwitchingSchemesDict[toPlanId] != null) {
                toSwitchingSchemesDict[toPlanId].forEach(function (scheme) {
                    if (serviceObj.subscribedBundleSubscriptionsGroupByPricingPlanDict[scheme.FromPricingPlanId] != null) {
                        var schemeStatus = scheme.Status;
                        if (initialBundleForPremium && schemeStatus === "Upgrade"
                            && initialBundleForPremium.PricingPlanModel.BundlePricingPlanId === scheme.FromPricingPlanId) {
                            schemeStatus = "FollowDirectly";
                        }
                        serviceObj.subscribedBundleSubscriptionsGroupByPricingPlanDict[scheme.FromPricingPlanId].forEach(function (sub) {
                            actions.push({
                                Action: schemeStatus,
                                FromPricingPlan: sub.PricingPlanModel,
                                BundleSubscription: sub
                            });
                        });
                    }
                });
            }
            if (actions.length === 0) {
                actions.push({
                    Action: "FollowNormally",
                    FromPricingPlan: null
                });
            }

            return actions;
        }

        function isBundleSubscribed(bundle) {
            return serviceObj.subscribedBundlesByIdDict[bundle.BundleId] != null;
        }

        function isStrategySubscribed(strategyId) {
            return serviceObj.subscribedStrategiesByIdDict && serviceObj.subscribedStrategiesByIdDict[strategyId] != null;
        }

        function getDetailedStrategyPackagesById(strategyId) {
            if (getBundlesWithInfoPromise) {
                return getBundlesWithInfoPromise.then(function (bundlesWithInfo) {
                    if (bundlesWithInfo && bundlesWithInfo.strategies) {
                        var strategyPackages = bundlesWithInfo.strategies.filter(function (s) {
                            return s.StrategyId === strategyId;
                        });

                        var newStrategyPackages = [];
                        strategyPackages.forEach(function (sp) {
                            var availableBundles = bundlesWithInfo.bundlesByStrategies[sp.StrategyId];
                            // Get only active pricing plans
                            availableBundles = availableBundles.filter(function (x) {
                                return x.PricingPlanModel.SubscriptionTier !== 'Preview';
                            });
                            var offersInfo = getOffersAndRecommendedOfferFromAvailableBundles(availableBundles);

                            var strategyPackage = {
                                detail: sp,
                                allOffers: offersInfo.allOffers,
                                recommendedOffer: offersInfo.recommendedOffer,
                                availableBundles: availableBundles
                            };
                            newStrategyPackages.push(strategyPackage);
                        });

                        return newStrategyPackages;
                    } else {
                        return [];
                    }
                });
            }
        }

        function addIfNotExist(list, item, func) {
            var existingItem = list.filter(function (x) {
                return func(x) === func(item);
            });
            if (existingItem.length === 0) {
                list.push(item);
            }
        }

        function isBundlePremium(bundle) {
            return coreConfigService.AlgoLeader.PremiumBundleName === bundle.Name;
        }
        
        function getBundlesWithInfo() {
            var bundlesByStrategiesDict = {};
            var strategies = [];
            var bundles = [];

            var allBundlesWithAddOnsPromise = sHeaderService.strategyBundleLoaded.then(function () {
                bundles = sHeaderService.strategyBundles.filter(function(bundle) {
                    return bundle.Type === "Strategy";
                });
                return bundles;
            });

            return allBundlesWithAddOnsPromise.then(function (bundles) {
                var premiumBundleList = [];
                bundles.forEach(function (bundle) {
                    if (isBundlePremium(bundle)) {
                        premiumBundleList.push(bundle);
                        if (bundle.Strategies.length === 0) {
                            initialBundleForPremium = bundle;
                        }
                    }

                    if (!bundle.Strategies) {
                        return;
                    }
                    bundle.Strategies.forEach(function (str1) {
                        var str = {
                            StrategyName: str1.StrategyName,
                            StrategyId: str1.StrategyId,
                            Categories: str1.Categories
                        };

                        var strategyId = str.StrategyId;
                        if (!bundlesByStrategiesDict[strategyId]) {
                            bundlesByStrategiesDict[strategyId] = [];
                        }

                        bundlesByStrategiesDict[strategyId].push(bundle);

                        addIfNotExist(strategies, str1, function (i) {
                            return i.StrategyId;
                        });
                    });
                });

                serviceObj.bundlesWithInfo = {
                    bundlesByStrategies: bundlesByStrategiesDict,
                    bundles: bundles,
                    strategies: strategies
                };
                return serviceObj.bundlesWithInfo;
            });
        }

        function getOffersAndRecommendedOfferFromAvailableBundles(availableBundles) {
            var allOffers = [];
            var recommendedOffer = null;
            if (availableBundles) {
                var followDirectlyOffers = getOffersFromAvailableBundles(availableBundles, 'FollowDirectly', function () {
                    return 0;
                });
                allOffers = allOffers.concat(followDirectlyOffers);

                var upgradeOffers = getOffersFromAvailableBundles(availableBundles, 'Upgrade', function (from, to) {
                    return to.PerPeriodFee - from.PerPeriodFee;
                });
                allOffers = allOffers.concat(upgradeOffers);

                var switchOffers = getOffersFromAvailableBundles(availableBundles, 'Switch', function (from, to) {
                    return to.PerPeriodFee - from.PerPeriodFee;
                });
                allOffers = allOffers.concat(switchOffers);

                var followNormallyOffers = getOffersFromAvailableBundles(availableBundles, 'FollowNormally', function (from, to) {
                    return to.PerPeriodFee;
                });
                allOffers = allOffers.concat(followNormallyOffers);

                if (followDirectlyOffers.length > 0) {
                    recommendedOffer = findTheBestOffer(followDirectlyOffers);
                } else if (upgradeOffers.length > 0) {
                    recommendedOffer = findTheBestOffer(upgradeOffers);
                } else if (switchOffers.length > 0) {
                    recommendedOffer = findTheBestOffer(switchOffers);
                }else {
                    recommendedOffer = findTheBestOffer(followNormallyOffers);
                }
            }
            return {
                recommendedOffer: recommendedOffer,
                allOffers: allOffers
            };
        }

        function findTheBestOffer(offers) {
            var maxPrice = 9999;
            var hasPremiumBundle = isSubscribingPremium();

            var recommendedOffer = null;
            var selectedOffers = offers;
            if (!hasPremiumBundle) {
                selectedOffers = selectedOffers.filter(function (offer) {
                    return isBundlePremium(offer.Bundle);
                });
                // back to normal offer
                if (selectedOffers.length === 0) {
                    selectedOffers = offers;
                }
            }
            selectedOffers.forEach(function (offer) {
                // find the cheapest
                if (offer.PriceDifference < maxPrice) {
                    maxPrice = offer.PriceDifference;
                    recommendedOffer = offer;
                }
            });
            return recommendedOffer;
        }

        function getOffersFromAvailableBundles(availableBundles, actionMode, computePriceDifference) {
            var offers = [];

            availableBundles.forEach(function (bundle) {
                if (bundle.Actions) {
                    bundle.Actions.forEach(function (act) {
                        if (act.Action === actionMode) {
                            offers.push({
                                PriceDifference: computePriceDifference(act.FromPricingPlan, bundle.PricingPlanModel),
                                Bundle: bundle,
                                Action: act
                            });
                        }
                    });
                }

            });
            return offers;
        }

        function resolveAllAlgoLeaderContents(force) {
            if (!getBundlesWithInfoPromise || force) {
                getBundlesWithInfoPromise = getBundlesWithInfo();
            }
            if (!getAllPlanSwitchingSchemesPromise || force) {
                getAllPlanSwitchingSchemesPromise = resolvePlanSwitchingSchemes();
            }
            if (!mySubscriptionPromise || force) {
                mySubscriptionPromise = resolveMySubscription();
            }

            return tool.onceAll([
                getBundlesWithInfoPromise,
                getAllPlanSwitchingSchemesPromise,
                mySubscriptionPromise
            ]).then(function () {
                serviceObj.bundlesWithInfo.bundles.forEach(function (bundle) {
                    bundle.Actions = getAllPossibleActionsFromSwitchingScheme(bundle);
                });
            });
        }

        function verifyCouponCode(couponCode, bundleId) {
            if (!couponCode) {
                return tool.reject();
            }
            return sPaymentStripeService.CheckCouponValidation(couponCode.toUpperCase(), null, bundleId).then(function (res) {
                return res.data;
            });
        }

        function getDiscountedPrice(bundle, coupon) {
            return getDiscountedPriceFromPricingPlanModel(bundle.PricingPlanModel, coupon);
        }

        function getDiscountedPriceFromPricingPlanModel(pricingPlan, coupon) {
            var discount = 0;
            if (coupon) {
                if (coupon.AmountOff) {
                    discount = coupon.AmountOff / 100;
                } else if (coupon.PercentOff) {
                    discount = pricingPlan.PerPeriodFee * coupon.PercentOff / 100;
                }
            }

            var result = pricingPlan.PerPeriodFee - discount;
            return result > 0 ? result : 0;
        }

        function subscribeToAPricingPlan(pricingPlanModel, couponCode) {
            var request = {
                BundlePricingPlanId: pricingPlanModel.BundlePricingPlanId,
                IsAlgoLeaderWeb: coreConfigService.AlgoLeader.HideForAlgoLeader
            };
            if (couponCode) {
                request.CouponCode = couponCode.toUpperCase();
            }
            if (pricingPlanModel.TrialDays && pricingPlanModel.TrialDays > 0) {
                request.HasTrialPeriod = true;
            }
            return sSubscriptionBundleService.SubscribeBundle(request);
        }

        tool.setServiceObjectProperties({
            isStrategySubscribed: isStrategySubscribed,
            subscribeToAPricingPlan: subscribeToAPricingPlan,
            getDiscountedPrice: getDiscountedPrice,
            verifyCouponCode: verifyCouponCode,
            resolveAllAlgoLeaderContents: resolveAllAlgoLeaderContents,
            bundlesWithInfo: null,
            getDetailedStrategyPackagesById: getDetailedStrategyPackagesById
        });
    });