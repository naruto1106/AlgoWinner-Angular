agmNgModuleWrapper("agms.payment")
    .defineControllerAsPopup("s.payment.SubscribeSmsNotificationController",
        {
            templateUrl: "/App/shared/payment/payment.subscribeSmsNotification.html"
        },
        ["sPaymentStripeService", "sSubscriptionBundleService", "tradingSignalSMSNotificationPlan", "isSubscribedTotradingSignalSMSNotificationPlan"],
        function (vm, dep, tool) {
            var sSubscriptionBundleService = dep.sSubscriptionBundleService,
                coreNotificationService = dep.coreNotificationService,
                sPaymentStripeService = dep.sPaymentStripeService;

            function setStep(step) {
                if (step === 2) {
                    fbq('track', 'InitiateCheckout', {
                        content_name: "SMS",
                        content_ids: [vm.tradingSignalSMSNotificationPlan.BundlePricingPlanId]
                    });
                }
                vm.step = step;
            }

            function submit() {
                fbq('track', 'Purchase', {
                    content_name: "SMS",
                    content_ids: [vm.tradingSignalSMSNotificationPlan.BundlePricingPlanId],
                    content_type: 'product',
                    value: getTotalPrice(),
                    currency: vm.tradingSignalSMSNotificationPlan.Currency
                });

                vm.isSubmitting = true;

                var request = {
                    BundlePricingPlanId: vm.tradingSignalSMSNotificationPlan.BundlePricingPlanId,
                    StripePlanId: vm.tradingSignalSMSNotificationPlan.StripePlanId,
                    PerPeriodFee: vm.tradingSignalSMSNotificationPlan.PerPeriodFee
                };
                if (vm.coupon && vm.isCouponCodeValid) {
                    request.CouponCode = vm.coupon.CouponCode.toUpperCase();
                }

                sSubscriptionBundleService.SubscribeBundle(request).then(function () {
                    coreNotificationService.notifySuccess('Success', "Subscription has been added");
                    tool.broadcast("isSubscribedTotradingSignalSMSNotificationPlan", true);
                    vm.isSubmitting = false;
                    vm.uibDismissPanel();
                }, function(res) {
                    if (res.data && res.data.Message) {
                        coreNotificationService.notifyError('SMS Subscription', 'Error: ' + res.data.Message);
                    } else {
                        coreNotificationService.notifyError('SMS Subscription', 'Error during subscription.');
                    }
                    vm.isSubmitting = false;
                });
            }

            function verifyCouponCode() {
                // params: Coupon Code, StrategyId, StrategyBundleId, AMPremiumBundleId
                var couponCode = vm.couponCode.toUpperCase();
                sPaymentStripeService.CheckCouponValidation(couponCode, null, null, vm.tradingSignalSMSNotificationPlan.BundlePricingPlanId).then(function(res) {
                    if (res.data) {
                        vm.coupon = res.data;
                        vm.isCouponCodeValid = true;
                    }
                }, function(res) {
                    vm.isCouponCodeValid = false;
                    vm.couponInvalidMessage = res.data.Message;
                });
            }

            function getOriginalPrice() {
                if (!vm.tradingSignalSMSNotificationPlan) {
                    return null;
                }
                return vm.tradingSignalSMSNotificationPlan.PerPeriodFee;
            }

            function getDiscountPrice() {
                if (vm.getOriginalPrice()) {
                    if (vm.coupon && vm.coupon.AmountOff) {
                        return vm.coupon.AmountOff / 100;
                    }
                    if (vm.coupon && vm.coupon.PercentOff) {
                        return vm.getOriginalPrice() * vm.coupon.PercentOff / 100;
                    }
                }
            }

            function getTotalPrice() {
                if (vm.coupon && vm.isCouponCodeValid) {
                    var result = vm.getOriginalPrice() - vm.getDiscountPrice();
                    return result > 0 ? result : 0;
                } else {
                    return vm.getOriginalPrice();
                }
            }

            tool.initialize(function() {
                tool.setVmProperties({
                    isSubmitting: false,
                    coupon: null,
                    couponCode: "",
                    couponInvalidMessage: "",
                    isCouponCodeValid: true,
                    steps: ['Payment', 'Confirm'],
                    step: 1,
                    tradingSignalSMSNotificationPlan: dep.tradingSignalSMSNotificationPlan,
                    isSubscribedTotradingSignalSMSNotificationPlan: dep.isSubscribedTotradingSignalSMSNotificationPlan,

                    verifyCouponCode: verifyCouponCode,
                    getOriginalPrice: getOriginalPrice,
                    getDiscountPrice: getDiscountPrice,
                    getTotalPrice: getTotalPrice,
                    setStep: setStep,
                    submit: submit
                });
            });
        });