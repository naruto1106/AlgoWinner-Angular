agmNgModuleWrapper("agmp.subscription")
    .defineController("p.subscription.ManagedBundleSubscriptionController", ['sSubscriptionBundleService'],
    function (vm, dep, tool) {
        var $location = dep.$location;
        var coreNotificationService = dep.coreNotificationService;
        var sSubscriptionBundleService = dep.sSubscriptionBundleService;

        function goToStrategyDetail(strategyId) {
            $location.path('/strategy/detail/' + strategyId);
            $location.hash('top');
        }

        function getActualAmount() {
            var coupon = vm.managedBundleSubscription.CouponModel;
            var originalPrice = vm.managedBundleSubscription.PricingPlanModel.PerPeriodFee;
            var discountAmount = 0;
            if (coupon != null) {
                if (coupon && coupon.AmountOff) {
                    discountAmount = coupon.AmountOff / 100;
                }
                if (coupon && coupon.PercentOff) {
                    discountAmount = originalPrice * coupon.PercentOff / 100;
                }
            }

            var result = originalPrice - discountAmount;
            return result > 0 ? result : 0;
        }

        function isSubscriptionExpired() {
            var isEligible = false;
            if (vm.managedBundleSubscription.DisplayInfo) {
                isEligible = checkStatus(vm.managedBundleSubscription.DisplayInfo.BasicInfo.Status);
            } else if (vm.managedBundleSubscription.StrategyBundleModel) {
                var isOk = true;
                vm.managedBundleSubscription.StrategyBundleModel.Strategies.filter(function (s) {
                    isOk = isOk && checkStatus(s.DisplayInfo.BasicInfo.Status);
                });
                isEligible = isOk;
            }

            var hasExpired;
            if (!vm.managedBundleSubscription.ExpiryDate) {
                hasExpired = false;
            } else {
                var currentDate = new Date();
                var expiryDate = new Date(vm.managedBundleSubscription.ExpiryDate);
                hasExpired = expiryDate.getTime() < currentDate.getTime();                
            }

            return isEligible && hasExpired;
        }

        function checkStatus(status) {
            if (status === "Published") {
                return true;
            } else if (status === "Expired" || status === "Deleted") {
                return true;
            }
            return false;
        }
        
        function stopSubscription() {
            return tool.openModalByDefinition('p.subscription.TerminateController', {
                subscription: vm.managedBundleSubscription
            }).result.then(function () {
                tool.broadcast("getManageSubscriptions");
            });
        }

        function cancelExpiration() {
            var date = moment(vm.managedBundleSubscription.NextAutoRenewDate).format('LL');
            coreNotificationService.notifyYesNo("Cancelling Expiration",
                "Do you want to continue the subscription for the next period? Your card will be charged on " + date + ".", function (id) {
                    if (id === 0) {
                        var request = {
                            BundleSubscriptionId: vm.managedBundleSubscription.BundleSubscriptionId
                        }
                        sSubscriptionBundleService.CancelExpireSubscription(request).then(function (res) {
                            tool.broadcast("getManageSubscriptions");
                        }, function (res) {
                            tool.log("An error occurred cancelling subscription");
                        });
                    }
                });
        }

        function hasSingleItem(subscription) {
            var strategyCount = subscription.Strategies.length;
            var itemCount = subscription.AMPremiumItems ? subscription.AMPremiumItems.length : 0;
            return strategyCount + itemCount === 1;
        }

        function showSlash() {
            var subscription = vm.managedBundleSubscription;
            return getActualAmount(subscription.CouponModel, subscription.PricingPlanModel.PerPeriodFee) !== subscription.PricingPlanModel.PerPeriodFee;
        }

        function hasStripeSubscription() {
            return vm.managedBundleSubscription.StripeSubscriptionId != null;
        }

        function showNextAutoRenewDate() {
            return (vm.managedBundleSubscription.NextAutoRenewDate || vm.managedBundleSubscription.NextAutoRenewDateWithTrial)
                && vm.managedBundleSubscription.ExpiryDate === null && vm.managedBundleSubscription.BundleSubscriptionId !== 0;
        }

        function showStartDate() {
            return vm.managedBundleSubscription.StartDate != null && vm.managedBundleSubscription.BundleSubscriptionId === 0;
        }

        function isJoeyBundle() {
            return _.includes([245, 246, 312, 423, 424], vm.managedBundleSubscription.BundlePricingPlanId);
        }

        tool.initialize(function () {
            tool.setVmProperties({
                hasStripeSubscription: hasStripeSubscription,
                hasSingleItem: hasSingleItem,
                goToStrategyDetail: goToStrategyDetail,
                isSubscriptionExpired: isSubscriptionExpired,
                stopSubscription: stopSubscription,
                cancelExpiration: cancelExpiration,
                getActualAmount: getActualAmount,
                showSlash: showSlash,
                showNextAutoRenewDate: showNextAutoRenewDate,
                showStartDate: showStartDate,
                isJoeyBundle: isJoeyBundle
            });
        });
    })
    .defineDirectiveForE('agmp-subscription-managed-bundle', [],
    function () {
        return {
            controller: "p.subscription.ManagedBundleSubscriptionController",
            templateUrl: '/App/pages/subscription/subscription.managedBundleSubscription.html'
        };
    },
    {
        managedBundleSubscription: "="
    });