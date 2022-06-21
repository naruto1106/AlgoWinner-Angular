agmNgModuleWrapper('agmp.shop')
    .defineControllerAsPopup("p.shop.SubscribeController",
    {
        templateUrl: "/App/pages/shop/shop.subscribe.html",
        windowClass: 'mini-modal'
    },
    ["strategyId", "brokerSelections", "allOffers", "mode", "showAddOn", "pAlgoleaderService", "sHeaderService", "sSubscriptionBundleService",
        "sPaymentStripeService"],
    function (vm, dep, tool) {
        // --- DEPENDENCY RESOLVER
        var strategyId = dep.strategyId,
            allOffers = dep.allOffers,
            pAlgoleaderService = dep.pAlgoleaderService,
            coreNotificationService = dep.coreNotificationService,
            sHeaderService = dep.sHeaderService,
            sSubscriptionBundleService = dep.sSubscriptionBundleService,
            sPaymentStripeService = dep.sPaymentStripeService;


        // --- LOCAL SERVICE FUNC
        function selectDefaultAutoInvest() {
            if (getPlanForAutoInvestWithVM()) {
                vm.selectionModel.isVMSelected = true;
            } else if (getPlanForAutoInvest()) {
                vm.selectionModel.isAutoInvestSelected = true;
            }
        }

        function getFinalSelectedPlan() {
            if (vm.selectionModel.isVMSelected && vm.showAutoInvest) {
                return getPlanForAutoInvestWithVM();
            } else if (vm.selectionModel.isAutoInvestSelected && vm.showAutoInvest) {
                return getPlanForAutoInvest();
            } else {
                return vm.selectionModel.selectedOffer;
            }
        }

        function handlePaymentSuccess(res) {
            var offer = getFinalSelectedPlan();

            var hasAutoInvest = false;
            if (offer.Bundle.AMPremiumItems && offer.Bundle.AMPremiumItems) {
                offer.Bundle.AMPremiumItems.forEach(function (item) {
                    if (item.Name.toLowerCase().indexOf("autoinvest") > -1) {
                        hasAutoInvest = true;
                    }
                });
            }

            if (hasAutoInvest) {
                tool.openModalByDefinition('p.shop.AutoInvestPopupController', {
                    bundle: offer.Bundle,
                    hasVM: sHeaderService.userHasVm
                });
            } else {
                coreNotificationService.notifySuccess('Payment Successful', 'You have successfully subscribed to ' + offer.Bundle.Name + ".");
            }

            vm.isLoading = false;
            vm.uibClosePanel();

            if (strategyId && strategyId > 0) {
                dep.$location.path('/tracksubscribedstrategies');
            } else {
                dep.$window.location.reload();;
            }
        }

        function handlePaymentFailed(res) {
            vm.isLoading = false;
            var message = "An error occured while trying to make the payment.";
            if (res && res.data && res.data.Message) {
                message = res.data.Message;
            }
            coreNotificationService.notifyError('Payment Failed', message);
        }

        function getCouponCodeForThisBundle(bundle) {
            if (bundle.coupon) {
                return bundle.coupon.CouponCode;
            }
            return null;
        }

        function calculatePriceForPlanSwitching() {
            if (getFinalSelectedPlan()) {
                var request = {
                    CurrentBundleSubscriptionId: getFinalSelectedPlan().Action.BundleSubscription.BundleSubscriptionId,
                    ToPricingPlanId: getFinalSelectedPlan().Bundle.PricingPlanModel.BundlePricingPlanId,
                    NewCouponCode: getCouponCodeForThisBundle(getFinalSelectedPlan().Bundle)
                };
                sSubscriptionBundleService.ComputePlanUpgradeEstimationInfo(request).then(function (res) {
                    vm.priceDifference = res.data.PriceDifference;
                    vm.isLoading = false;
                });
            }
        }

        function getAddOns() {
            vm.availableAddOns = sHeaderService.strategyBundles.filter(function (bundle) {
                return bundle.Type === "AddOn" && !bundle.IsSubscribed;
            });

            vm.availableAddOns.forEach(function (item) {
                item.selected = false;
            });
        }


        // --- SCOPE FUNC
        function goNext() {
            if (vm.step === 2) {
                fbq('track', 'InitiateCheckout', {
                    content_name: vm.subscribingItemName,
                    content_ids: [getFinalSelectedPlan().Bundle.PricingPlanModel.BundlePricingPlanId]
                });

                var message = "By clicking YES, you consent to automatically renew your subscription to " +
                    vm.subscribingItemName +
                    " at the rate and payment interval specified above. You can cancel the automatic renewal of the subscription at any time under \"Payment & Subscriptions > Manage Subscriptions\" menu.";
                coreNotificationService.notifyYesNo("Auto-renew notification",
                    message,
                    function (id) {
                        if (id === 0) {
                            vm.step++;
                        }
                    });
            } else {
                vm.step++;
            }
        }

        function goBack() {
            vm.step--;
        }

        function pay() {
            fbq('track', 'Purchase', {
                content_name: vm.subscribingItemName,
                content_ids: [getFinalSelectedPlan().Bundle.PricingPlanModel.BundlePricingPlanId],
                content_type: 'product',
                value: getTotalPrice(),
                currency: getFinalSelectedPlan().Bundle.PricingPlanModel.Currency
            });

            //check vacancy
            var offer = getFinalSelectedPlan();
            if (offer.vacancy != null && offer.vacancy === 0) {
                if (vm.hasAutoInvest && vm.showAutoInvest) {
                    coreNotificationService.notifyError('No Vacancy', "AutoInvest has reached maximum allowed capacity. Please switch off the autoinvest toggle in order to proceed with the subscription.");
                } else {
                    coreNotificationService.notifyError('No Vacancy', "Sorry, this plan has reached its maximum capacity, please select another one.");
                }
            } else {
                vm.isLoading = true;
                var promises = [];
                var p;

                if (vm.mode === 'normal') {
                    p = pAlgoleaderService.subscribeToAPricingPlan(getFinalSelectedPlan().Bundle.PricingPlanModel, getCouponCodeForThisBundle(getFinalSelectedPlan().Bundle));
                    promises.push(p);
                }

                if (vm.mode === 'autoinvest' || vm.mode === 'switch') {
                    var request = {
                        FromBundleSubscriptionId: getFinalSelectedPlan().Action.BundleSubscription.BundleSubscriptionId,
                        ToPricingPlanId: getFinalSelectedPlan().Bundle.PricingPlanModel.BundlePricingPlanId,
                        NewCouponCode: getCouponCodeForThisBundle(getFinalSelectedPlan().Bundle)
                    };
                    p = sSubscriptionBundleService.SwitchBundleSubscription(request);
                    promises.push(p);
                }

                vm.selectedAddOns.forEach(function (bundle) {
                    p = pAlgoleaderService.subscribeToAPricingPlan(bundle.PricingPlanModel, getCouponCodeForThisBundle(bundle));
                    promises.push(p);
                });
                tool.onceAll(promises).then(handlePaymentSuccess, handlePaymentFailed);
            }
        }

        function selectPlan(offer) {
            if (getPlanForAutoInvest() &&
                offer.Bundle.PricingPlanModel.PeriodType === getPlanForAutoInvest().Bundle.PricingPlanModel.PeriodType) {
                vm.hasAutoInvest = true;
                selectDefaultAutoInvest();
            } else {
                vm.hasAutoInvest = false;
                vm.selectionModel.isVMSelected = false;
                vm.selectionModel.isAutoInvestSelected = false;
            }

            vm.selectionModel.selectedOffer = offer;
        }

        function getPlanForAutoInvestWithVM() {
            var offer = null;
            if (vm.detailedStrategyPackage && vm.detailedStrategyPackage.allOffers) {
                vm.detailedStrategyPackage.allOffers.forEach(function (o) {
                    var hasAutoInvest = false;
                    var hasVM = false;

                    o.Bundle.AMPremiumItems.forEach(function (item) {
                        if (item.Name.toLowerCase().indexOf("autoinvest") > -1) {
                            hasAutoInvest = true;
                        }
                        if (item.Name.toLowerCase().indexOf("vm") > -1) {
                            hasVM = true;
                        }
                    });

                    if (hasAutoInvest && hasVM) {
                        offer = o;
                    }
                });
            }

            return offer;
        }

        function getPlanForAutoInvest() {
            var offer = null;
            if (vm.detailedStrategyPackage && vm.detailedStrategyPackage.allOffers) {
                vm.detailedStrategyPackage.allOffers.forEach(function (o) {
                    var hasAutoInvest = false;
                    var hasVM = false;

                    o.Bundle.AMPremiumItems.forEach(function (item) {
                        if (item.Name.toLowerCase().indexOf("autoinvest") > -1) {
                            hasAutoInvest = true;
                        }
                        if (item.Name.toLowerCase().indexOf("vm") > -1) {
                            hasVM = true;
                        }
                    });

                    if (hasAutoInvest && !hasVM) {
                        offer = o;
                    }
                });
            }

            return offer;
        }

        function getBasicOffers() {
            var offers = [];
            if (vm.detailedStrategyPackage && vm.detailedStrategyPackage.allOffers) {
                if (getPlanForAutoInvest() || getPlanForAutoInvestWithVM()) {
                    offers = vm.detailedStrategyPackage.allOffers.filter(function (offer) {
                        var hasAutoInvest = false;
                        offer.Bundle.AMPremiumItems.forEach(function (item) {
                            if (item.Name.toLowerCase().indexOf("autoinvest") > -1) {
                                hasAutoInvest = true;
                            }
                        });

                        return !hasAutoInvest;
                    });
                } else {
                    offers = vm.detailedStrategyPackage.allOffers;
                }

                //select a default bacis plan (no auto invest)
                if (!vm.selectionModel.selectedOffer && offers.length > 0) {
                    var selectedOffer = offers[0];
                    offers.forEach(function (offer) {
                        if (getMonthlyPrice(offer) < getMonthlyPrice(selectedOffer)) {
                            selectedOffer = offer;
                        }
                    });

                    selectPlan(selectedOffer);
                }
            }

            //sort by period
            offers.forEach(function (o) {
                o.Period = getNumberOfMonth(o.Bundle.PricingPlanModel.PeriodType);
            });
            offers = _.sortBy(offers, function (o) {
                return o.Period;
            });

            return offers;
        }

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

        function selectAutoInvestWithVM() {
            vm.selectionModel.isVMSelected = true;
            vm.selectionModel.isAutoInvestSelected = false;
            calculatePriceForPlanSwitching();
        }

        function selectAutoInvest() {
            vm.selectionModel.isVMSelected = false;
            vm.selectionModel.isAutoInvestSelected = true;
            calculatePriceForPlanSwitching();
        }

        function getTotalPriceBeforeDeduction() {
            var price = 0;

            if (getFinalSelectedPlan()) {
                if (vm.mode === 'autoinvest' || vm.mode === 'switch') {
                    price = vm.priceDifference;
                } else {
                    price = pAlgoleaderService.getDiscountedPrice(getFinalSelectedPlan().Bundle, getFinalSelectedPlan().Bundle.coupon);
                }

                vm.selectedAddOns.forEach(function (ao) {
                    price += pAlgoleaderService.getDiscountedPrice(ao, ao.coupon);
                });
            }

            return price < 0 ? 0 : price;
        }

        function getTotalPrice() {
            var price = getTotalPriceBeforeDeduction();

            //apply algo credits
            if (vm.accountBalance.Balance > 0) {
                price -= vm.accountBalance.Balance / 100;
            }

            return price < 0 ? 0 : price;
        }

        function getDeductionAmount() {
            return getTotalPriceBeforeDeduction() - getTotalPrice();
        }

        function hasCouponForThisBundle(bundle) {
            if (!bundle) {
                return false;
            }
            return bundle.coupon != null;
        }

        function getActualPrice() {
            var price = getFinalSelectedPlan().Bundle.PricingPlanModel.PerPeriodFee;

            vm.selectedAddOns.forEach(function (ao) {
                price += ao.PricingPlanModel.PerPeriodFee;
            });

            return price;
        }

        function getUnusedCredit() {
            return pAlgoleaderService.getDiscountedPrice(getFinalSelectedPlan().Bundle, getFinalSelectedPlan().Bundle.coupon) - vm.priceDifference;
        }

        function verifyCouponCode() {
            var bundleList = [];
            vm.isLoading = true;
            bundleList.push(getFinalSelectedPlan().Bundle);
            bundleList = bundleList.concat(vm.selectedAddOns);

            vm.isCouponCodeValid = false;
            vm.couponInvalidMessage = null;
            var promises = bundleList.map(function (bundle) {
                return pAlgoleaderService.verifyCouponCode(vm.couponCode, bundle.BundleId).then(function (coupon) {
                    bundle.coupon = coupon;
                    vm.isCouponCodeValid = vm.isCouponCodeValid || true;
                }, function (res) {
                    bundle.coupon = null;
                });
            });
            return tool.onceAll(promises).finally(function () {
                if (vm.mode === 'autoinvest' || vm.mode === 'switch') {
                    calculatePriceForPlanSwitching();
                } else {
                    vm.isLoading = false;
                }
                vm.confirmed = false;
                if (!vm.isCouponCodeValid) {
                    vm.couponInvalidMessage = "This coupon cannot be applied to any selections.";
                }
            });
        }

        function takeSelectedAddOns() {
            vm.selectedAddOns = vm.availableAddOns.filter(function (u) {
                return u.selected;
            });
        }

        function onAutoinvestChange() {
            if (vm.mode === 'autoinvest' || vm.mode === 'switch') {
                calculatePriceForPlanSwitching();
            }
        }

        function isNoVacancy(offer) {
            if (!offer) {
                return false;
            }
            return offer.vacancy != null && offer.vacancy === 0;
        }

        tool.onRendered(function () {
            //calculate estimated price for plan switching
            if (vm.mode === 'autoinvest' || vm.mode === 'switch') {
                calculatePriceForPlanSwitching();
            }
        });

        tool.initialize(function () {
            tool.setVmProperties({
                step: 1,
                isLoading: false,
                hasAutoInvest: false,
                showAutoInvest: false,
                availableBrokers: dep.brokerSelections,
                showAddOn: dep.showAddOn,
                mode: dep.mode,
                selectionModel: {
                    selectedOffer: null,
                    isVMSelected: false,
                    isAutoInvestSelected: false
                },
                subscribingItemName: "",
                coreConfigService: dep.coreConfigService,
                accountBalance: {
                    Currency: "SGD",
                    Balance: 0
                },

                goNext: goNext,
                goBack: goBack,
                selectPlan: selectPlan,
                getBasicOffers: getBasicOffers,
                getNumberOfMonth: getNumberOfMonth,
                getMonthlyPrice: getMonthlyPrice,
                getPlanForAutoInvestWithVM: getPlanForAutoInvestWithVM,
                getPlanForAutoInvest: getPlanForAutoInvest,
                selectAutoInvestWithVM: selectAutoInvestWithVM,
                selectAutoInvest: selectAutoInvest,
                getTotalPrice: getTotalPrice,
                hasCouponForThisBundle: hasCouponForThisBundle,
                getActualPrice: getActualPrice,
                getUnusedCredit: getUnusedCredit,
                getFinalSelectedPlan: getFinalSelectedPlan,
                onAutoinvestChange: onAutoinvestChange,
                pay: pay,
                getDeductionAmount: getDeductionAmount,

                //coupon
                couponCode: null,
                isCouponCodeValid: false,
                couponInvalidMessage: null,
                verifyCouponCode: verifyCouponCode,

                //add on
                availableAddOns: [],
                selectedAddOns: [],
                takeSelectedAddOns: takeSelectedAddOns,

                //vacancy check
                isNoVacancy: isNoVacancy
            });

            vm.isLoading = true;
            var promises = [];

            //get Add-Ons
            promises.push(sHeaderService.strategyBundleLoaded);

            if (strategyId > 0) {
                promises.push(pAlgoleaderService.getDetailedStrategyPackagesById(strategyId));

                tool.onceAll(promises).then(function (res) {
                    if (res[2] && res[2].length > 0) {
                        vm.detailedStrategyPackage = res[2][0];
                        vm.subscribingItemName = vm.detailedStrategyPackage.detail.StrategyName;

                        vm.detailedStrategyPackage.availableBundles.forEach(function (ab) {
                            ab.AMPremiumItems.forEach(function (item) {
                                if (item.Name.toLowerCase().indexOf("autoinvest") > -1) {
                                    vm.hasAutoInvest = true;
                                }
                            });
                        });

                        //reset coupon
                        if (vm.detailedStrategyPackage.allOffers) {
                            vm.detailedStrategyPackage.allOffers.forEach(function (offer) {
                                if (offer.Bundle.coupon) {
                                    offer.Bundle.coupon = null;
                                }
                            });
                        }

                        if (vm.mode === 'autoinvest') {
                            vm.showAutoInvest = true;
                            if (getPlanForAutoInvestWithVM()) {
                                vm.selectionModel.selectedOffer = getPlanForAutoInvestWithVM();
                                selectAutoInvestWithVM();
                            }
                            if (getPlanForAutoInvest()) {
                                vm.selectionModel.selectedOffer = getPlanForAutoInvest();
                                selectAutoInvest();
                            }
                        }
                    }

                    getAddOns();
                }).finally(function () {
                    vm.isLoading = false;
                });
            } else {
                tool.onceAll(promises).then(function () {
                    vm.detailedStrategyPackage = {
                        allOffers: allOffers
                    }
                    vm.subscribingItemName = allOffers[0].Name;
                    vm.isLoading = false;

                    getAddOns();
                });
            }

            //get stripe credits
            sPaymentStripeService.GetStripeAccountBalance().then(function (res) {
                if (res.data) {
                    vm.accountBalance.Balance = Math.abs(res.data.Amount);
                    vm.accountBalance.Currency = res.data.Currency ? res.data.Currency.toUpperCase() : "";
                }
            });
        });
    });