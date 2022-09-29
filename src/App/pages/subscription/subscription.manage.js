agmNgModuleWrapper('agmp.subscription')
    .defineController('p.subscription.ManageController', [
        'sSubscriptionBundleService', 'commonLocationHistoryService',
        'ngCoordinate-lineChart', 'ngCoordinate-scales', 
        'sStrategyCommerceService', "sHeaderService"
    ],
    function (vm, dep, tool) {

        var coreUserStateService = dep.coreUserStateService,
            sSubscriptionBundleService = dep.sSubscriptionBundleService,
            commonLocationHistoryService = dep.commonLocationHistoryService,
            sStrategyCommerceService = dep.sStrategyCommerceService,
            sHeaderService = dep.sHeaderService;

        vm.go = commonLocationHistoryService.go;
        
        function getSubscriptions() {
            vm.isLoadingData = true;

            return tool.onceAll([
                sSubscriptionBundleService.GetAllBundleSubscriptions(),
                sSubscriptionBundleService.GetSubscriptionsForManageSubscription(),
                sStrategyCommerceService.GetManagedStrategies()
            ]).then(function (ress) {
                var subscribedStrategyDictionary = {};
                var subscribedStrategies = ress[1].data;
                subscribedStrategies.forEach(function (s) {
                    subscribedStrategyDictionary[s.StrategyId] = s;
                });

                vm.bundledSubscriptions = ress[0].data;
                vm.bundledSubscriptions.forEach(function (b) {

                    if (b.IsTrialingNow) {
                        if (b.PricingPlanModel) {
                            switch (b.PricingPlanModel.PeriodType) {
                                case "Monthly":
                                    b.NextAutoRenewDateWithTrial = moment(b.NextAutoRenewDate).add(1, 'months').format();
                                    break;
                                case "Quarterly":
                                    b.NextAutoRenewDateWithTrial = moment(b.NextAutoRenewDate).add(3, 'months').format();
                                    break;
                            }
                        }
                    }
                    b.Strategies.forEach(function (s) {
                        if (subscribedStrategyDictionary[s.StrategyId]) {
                            s.DisplayInfo = subscribedStrategyDictionary[s.StrategyId] != null ? subscribedStrategyDictionary[s.StrategyId].DisplayInfo : null;
                        } else {
                            var info = ress[2].data.filter(function (strat) {
                                return strat.DisplayInfo.BasicInfo.StrategyId === s.StrategyId;
                            })[0];
                            s.DisplayInfo = info ? info.DisplayInfo : null;
                        }
                    });
                });

                //order by next auto renew date
                vm.bundledSubscriptions = _.sortBy(vm.bundledSubscriptions, function (b) {
                    return b.NextAutoRenewDate;
                });
            }).finally(function (res) {
                vm.isLoadingData = false;
            });
        }

        function isInBundle(strategyId) {
            if (vm.bundledSubscriptions) {
                return vm.bundledSubscriptions.filter(function (b) {
                    return b.StrategyBundleModel.Strategies.filter(function (s) {
                        return s.StrategyId === strategyId;
                    })[0];
                })[0];
            }
            return false;
        }
        
        function hasSubscriptions() {
            return !vm.isLoadingData && vm.bundledSubscriptions && vm.bundledSubscriptions.length > 0;
        }

        function hasSinglePremiumItem(subscription) {
            var strategyCount = subscription.Strategies.length;
            var itemCount = subscription.AMPremiumItems ? subscription.AMPremiumItems.length : 0;
            return strategyCount === 0 && itemCount === 1;
        }

        function hasSingleStrategy(subscription) {
            var strategyCount = subscription.Strategies.length;
            var itemCount = subscription.AMPremiumItems ? subscription.AMPremiumItems.length : 0;
            return strategyCount === 1 && itemCount === 0;
        }

        function hasSingleItem(subscription) {
            var strategyCount = subscription.Strategies.length;
            var itemCount = subscription.AMPremiumItems ? subscription.AMPremiumItems.length : 0;
            return strategyCount + itemCount === 1;
        }

        function initializeSubscriptions() {
            getSubscriptions().then(function () {
                vm.multipleBundledSubscriptions = vm.bundledSubscriptions.filter(function (s) {
                    return !hasSingleItem(s);
                });
                vm.singlePremiumItemSubscriptions = vm.bundledSubscriptions.filter(hasSinglePremiumItem);
                vm.singleStrategySubscriptions = vm.bundledSubscriptions.filter(hasSingleStrategy);
            });
        }

        tool.on("getManageSubscriptions", function () {
            initializeSubscriptions();
        });

        tool.initialize(function () {
            tool.setVmProperties({
                isInBundle: isInBundle,
                coreUserStateService: coreUserStateService,
                hasSubscriptions: hasSubscriptions
            });

            coreUserStateService.setSubmenu('MANAGE_SUBSCRIPTIONS');

            initializeSubscriptions();

            sHeaderService.selectMenu("setting", "setting");
        });
    })
    .defineDirectiveForE('agmp-subscription-manage', [],
    function () {
        return {
            controller: "p.subscription.ManageController",
            templateUrl: '/App/pages/subscription/subscription.manage.html'
        };
    }, {

    });;