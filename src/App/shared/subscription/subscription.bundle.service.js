agmNgModuleWrapper('agms.subscription')
    .defineService('sSubscriptionBundleService', [],
    function (serviceObj, dep, tool) {
        var coreServerCommunicationService = dep.coreServerCommunicationService;

        var bundlePath = '/subapi/v1/Bundle/';
        var bundleSubscriptionPath = '/subapi/v1/BundleSubscription/';

        tool.setServiceObjectProperties({
            GetBundlesForStore: coreServerCommunicationService.genGetFunctionWithNVar(bundlePath + 'GetBundlesForStore'),
            GetBundleByName: coreServerCommunicationService.genGetFunctionWithNVar(bundlePath + 'GetBundleByName',
                function (args) {
                    return {
                        name: args[0]
                    };
                }),
            GetAllPlanSwitchingSchemes: coreServerCommunicationService.genGetFunctionWithNVar(bundlePath + 'GetAllPlanSwitchingSchemes'),
            GetAllBundleSubscriptions: coreServerCommunicationService.genGetFunctionWithNVar(bundleSubscriptionPath + 'GetAllBundleSubscriptions'),
            GetAllBundleSubscriptionsWithoutCoupon: coreServerCommunicationService.genGetFunctionWithNVar(bundleSubscriptionPath + 'GetAllBundleSubscriptionsWithoutCoupon'),
            IsSubscribedToBundleWithName: coreServerCommunicationService.genGetFunctionWithNVar(bundleSubscriptionPath + 'IsSubscribedToBundleWithName',
                function(args) {
                    return {
                        bundleName: args[0]
                    };
                }),
            GetSubscriptionsForNotification: coreServerCommunicationService.genGetFunctionWithNVar(bundleSubscriptionPath + 'GetSubscriptionsForNotification'),
            GetSubscriptionsForManageSubscription: coreServerCommunicationService.genGetFunctionWithNVar(bundleSubscriptionPath + 'GetSubscriptionsForManageSubscription'),
            GetSubscriptionsForChart: coreServerCommunicationService.genGetFunctionWithNVar(bundleSubscriptionPath + 'GetSubscriptionsForChart'),
            GetSubscribedStrategyIds: coreServerCommunicationService.genGetFunctionWithNVar(bundleSubscriptionPath + 'GetSubscribedStrategyIdDtos'),
            ComputePlanUpgradeEstimationInfo: coreServerCommunicationService.genPostFunction(bundleSubscriptionPath + 'ComputePlanUpgradeEstimationInfo'),
            SubscribeBundle: coreServerCommunicationService.genPostFunction(bundleSubscriptionPath + 'SubscribeBundle'),
            SwitchBundleSubscription: coreServerCommunicationService.genPostFunction(bundleSubscriptionPath + 'SwitchBundleSubscription'),
            ExpireSubscription: coreServerCommunicationService.genPostFunction(bundleSubscriptionPath + 'ExpireSubscription'),
            CancelExpireSubscription: coreServerCommunicationService.genPostFunction(bundleSubscriptionPath + 'CancelExpireSubscription')
        });
    });