agmNgModuleWrapper("agms.activity")
    .defineController("s.activity.NotificationSettingController",
    ["sActivityNotificationService", "sSubscriptionBundleService", "sHeaderService"],
    function (vm, dep, tool) {
        var sActivityNotificationService = dep.sActivityNotificationService,
            sSubscriptionBundleService = dep.sSubscriptionBundleService,
            coreNotificationService = dep.coreNotificationService,
            coreUserStateService = dep.coreUserStateService,
            coreConfigService = dep.coreConfigService,
            sHeaderService = dep.sHeaderService;

        tool.on("isSubscribedTotradingSignalSMSNotificationPlan", function (src, value) {
            vm.isSubscribedTotradingSignalSMSNotificationPlan = value;
            sSubscriptionBundleService.GetAllBundleSubscriptionsWithoutCoupon().then(function (res) {
                vm.premiumBundleSubscriptions = res.data;
                vm.premiumBundleSubscriptions.forEach(function (s) {
                    if (vm.tradingSignalSMSNotificationPlan && s.BundlePricingPlanId === vm.tradingSignalSMSNotificationPlan.BundlePricingPlanId) {
                        vm.currentSubscription = s;
                    }
                });
            });
            if (!value) {
                vm.currentSettings.SubscribedStrategies.Sms = false;
                vm.currentSubscription = null;
            } else {
                vm.currentSettings.SubscribedStrategies.Sms = true;
            }
        });

        function save() {
            vm.submitting = true;
            var settingsToSubmit = {
                SubscribedStrategies: vm.currentSettings.SubscribedStrategies,
                TradingActivities: vm.currentSettings.TradingActivities,
                CommentsAndPosts: vm.currentSettings.CommentsAndPosts,
                FeedsActivities: vm.currentSettings.FeedsActivities,
                PriceAlerts: vm.currentSettings.PriceAlerts,
                MarketPlayerStrategies: vm.currentSettings.MarketPlayerStrategies
            };
            if (vm.currentSettings.TradersGPS) {
                settingsToSubmit["TradersGPS"] = vm.currentSettings.TradersGPS;
            }

            return sActivityNotificationService.modifySettings(settingsToSubmit).then(function () {
                vm.closePanel();
                coreNotificationService.notifySuccess('Saving Notification Setting', 'Setting saved successfully');
            }, function () {
                coreNotificationService.notifyError('Saving Notification Setting', 'Failed to save notification settings');
            }).finally(function () {
                vm.submitting = false;
            });
        }

        function subscribetradingSignalSMSNotification() {
            if (vm.tradingSignalSMSNotificationPlan) {
                tool.openModalByDefinition('s.payment.SubscribeSmsNotificationController', {
                    tradingSignalSMSNotificationPlan: vm.tradingSignalSMSNotificationPlan,
                    isSubscribedTotradingSignalSMSNotificationPlan: vm.isSubscribedTotradingSignalSMSNotificationPlan
                });
            } else {
                coreNotificationService.notifySuccess('Error', 'Sorry, there is no plan for this service');
            }
        }

        function stoptradingSignalSMSNotification() {
            var date = moment(vm.currentSubscription.NextAutoRenewDate).format('MMMM Do YYYY, h:mm:ss a');
            coreNotificationService.notifyYesNo("Stop SMS Notification", "You will cease to receive SMS notifications after " + date + ". Click Yes to confirm.", function (id) {
                if (id === 0) {
                    var request = {
                        BundleSubscriptionId: vm.currentSubscription.BundleSubscriptionId,
                    };

                    //ExpirePremiumBundleSubscription
                    sSubscriptionBundleService.ExpireSubscription(request).then(function () {
                        coreNotificationService.notifyError("Success", "Subscription has been stopped.");
                        tool.broadcast("isSubscribedTotradingSignalSMSNotificationPlan", true);
                    }, function () {
                        coreNotificationService.notifyError("Error", "There was an error stopping the subscription. Please refresh or try again later.");
                    });
                }
            });
        }

        function reActivateTradingSignalSmsNotification() {
            sSubscriptionBundleService.CancelExpireSubscription({
                BundleSubscriptionId: vm.currentSubscription.BundleSubscriptionId
            }).then(function () {
                coreNotificationService.notifyError("Success", "Subscription has been re-activated.");
                tool.broadcast("isSubscribedTotradingSignalSMSNotificationPlan", true);
            }, function () {
                coreNotificationService.notifyError("Error", "There was an error processing the subscription. Please refresh or try again later.");
            });
        }

        function isInvestmentLeaderOrSuperUser() {
            return coreUserStateService.isInvestmentLeader() || coreUserStateService.isSuperUser();
        }

        tool.initialize(function () {
            tool.setVmProperties({
                submitting: true,
                currentSettings: [],
                currentSubscription: null,
                tradingSignalSMSNotificationPlan: {},
                isSubscribedTotradingSignalSMSNotificationPlan: false,
                coreConfigService: coreConfigService,
                isInvestmentLeaderOrSuperUser: isInvestmentLeaderOrSuperUser,
                save: save,
                subscribetradingSignalSMSNotification: subscribetradingSignalSMSNotification,
                stoptradingSignalSMSNotification: stoptradingSignalSMSNotification,
                reActivateTradingSignalSmsNotification: reActivateTradingSignalSmsNotification
            });

            if (coreUserStateService.isLoggedIn() && !coreUserStateService.hasPendingLogoutConfirmation) {
                tool.onceAll([
                    sActivityNotificationService.getCurrentSettings(),
                    sSubscriptionBundleService.GetBundleByName(vm.coreConfigService.SmsNotification.BundleName),
                    sSubscriptionBundleService.IsSubscribedToBundleWithName(vm.coreConfigService.SmsNotification.BundleName),
                    sHeaderService.subscriptionsLoaded
                ]).then(function (resArr) {
                    vm.currentSettings = resArr[0].data;
                    vm.tradingSignalSMSNotificationPlan = resArr[1].data;
                    vm.isSubscribedTotradingSignalSMSNotificationPlan = resArr[2].data;
                    vm.premiumBundleSubscriptions = sHeaderService.subscriptions;
                    vm.premiumBundleSubscriptions.forEach(function (s) {
                        if (vm.tradingSignalSMSNotificationPlan && s.BundlePricingPlanId === vm.tradingSignalSMSNotificationPlan.BundlePricingPlanId) {
                            vm.currentSubscription = s;
                        }
                    });
                    vm.submitting = false;
                }, function () {
                    coreNotificationService.notifyError("Error Loading Page", "There was an error loading this page. Please refresh or try again later.");
                    vm.submitting = false;
                });
            }
        });
    })
    .defineDirectiveForE('agms-activity-notification-settings', [],
    function () {
        return {
            controller: "s.activity.NotificationSettingController",
            templateUrl: '/App/shared/activity/activity.notificationSetting.html'
        };
    }, {
        closePanel: "=",
        showCancel: "=",
        visibleAspects: '=?'
    });