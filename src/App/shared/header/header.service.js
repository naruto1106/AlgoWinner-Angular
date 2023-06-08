agmNgModuleWrapper('agms.header')
    .defineService("sHeaderService", [
        "sSubscriptionBundleService", "coreNotificationService", "sGatewayService"
    ],
        function (serviceObj, dep, tool) {
            var sSubscriptionBundleService = dep.sSubscriptionBundleService,
                coreNotificationService = dep.coreNotificationService,
                coreUserStateService = dep.coreUserStateService,
                sGatewayService = dep.sGatewayService,
                coreConfigService = dep.coreConfigService,
                coreDataStorageService = dep.coreDataStorageService;

            var strategyBundleLoadedDeferred = tool.defer();
            var subscriptionsLoadedDeferred = tool.defer();

            serviceObj.showTrackSubscribedStrategies = function() {
                var bundlesWithStrategy = serviceObj.strategyBundles.filter(function(b) {
                    return b.Strategies.length > 0;
                });

                var subscribedStrategies = serviceObj.subscriptions.filter(function(b) {
                    return b.Strategies.length > 0;
                });

                //if none of the bundles has a strategy (e.g. TGPS user), hide track subscribed strategies
                if (bundlesWithStrategy.length === 0 && subscribedStrategies.length === 0) {
                    return false;
                } else {
                    return true;
                }
            };

            serviceObj.getGroupStrategiesAndBundles = function () {
                return tool.onceAll([
                    sSubscriptionBundleService.GetBundlesForStore(),
                    sSubscriptionBundleService.GetAllBundleSubscriptionsWithoutCoupon()
                ]).then(function (ress) {
                    strategyBundleLoadedDeferred.resolve(ress[0].data);
                    subscriptionsLoadedDeferred.resolve(ress[1].data);

                    serviceObj.strategyBundles = ress[0].data;
                    serviceObj.subscriptions = ress[1].data;

                    //check bundle subscriptions
                    serviceObj.strategyBundles.forEach(function (b) {
                        b.IsSubscribed = false;
                        serviceObj.subscriptions.forEach(function (s) {
                            if (s.BundlePricingPlanId === b.PricingPlanModel.BundlePricingPlanId) {
                                b.IsSubscribed = true;
                            }
                        });
                    });

                    if (serviceObj.subscriptions && serviceObj.subscriptions.length === 1 && _.includes([245, 246, 312, 423, 424], serviceObj.subscriptions[0].BundlePricingPlanId)) {
                        serviceObj.hasJoeyOnly = true;
                    } else {
                        serviceObj.hasJoeyOnly = false;
                    }
                }, function () {
                    strategyBundleLoadedDeferred.reject();
                    subscriptionsLoadedDeferred.reject();
                });
            };

            serviceObj.selectMenu = function (menu, subMenu) {
                serviceObj.selectedMenu = menu;

                if (subMenu) {
                    serviceObj.selectedSubMenu = subMenu;
                } else {
                    serviceObj.selectedSubMenu = "";
                }
            }

            function resendVerificationEmail() {
                coreUserStateService.userInfoLoaded.then(function (res) {
                    sGatewayService.resendActivationLink({
                        Email: res.Email,
                        IsAlgoLeaderWeb: coreConfigService.AlgoLeader.HideForAlgoLeader
                    }).then(function () {
                        coreNotificationService.notifySuccess("Success", "An email with a link to activate your account has been sent to you.");
                    }, function (res) {
                        if (res.data && res.data.Message) {
                            coreNotificationService.notifyError("Error", res.data.Message);
                        } else {
                            coreNotificationService.notifyError("Error", "Request failed. Please refresh or try again later.");
                        }
                    });
                });
            }

            var amAutoAddress = coreConfigService.General.AmAutoAddress;
            var counter = 0;

            function goToAmAuto() {
                counter++;
                var token = coreDataStorageService.get("token");

                var newTab = window.open('', '_blank');
                newTab.document.write('Connecting to AlgoMerchant...');

                //use iframe to pass token to algo winner
                var iframe = document.createElement('iframe');
                iframe.setAttribute('src', amAutoAddress + "/token");
                iframe.setAttribute('id', 'redirect_iframe' + counter);
                iframe.style.width = 0 + 'px';
                iframe.style.height = 0 + 'px';
                document.body.appendChild(iframe);

                var iframeEl = document.getElementById('redirect_iframe' + counter);
                dep.$window.addEventListener("message",
                    function (event) {
                        if (event.data === "token_set" && event.source === iframeEl.contentWindow && event.origin === amAutoAddress) {
                            if (newTab) {
                                newTab.location.href = amAutoAddress;
                                if (iframeEl) {
                                    iframeEl.parentNode.removeChild(iframeEl);
                                }
                            }
                        }
                    }, false);

                iframeEl.onload = function () {
                    var iframeWin = iframeEl.contentWindow;
                    iframeWin.postMessage(token, "*");
                }
            }

            tool.setServiceObjectProperties({
                chartMenuType: "Normal",
                userHasVm: false,
                hasJoeyOnly: true,
                selectedMenu: "dashboard",
                selectedSubMenu: "",
                strategyBundles: [],
                subscriptions: [],
                strategyBundleLoaded: strategyBundleLoadedDeferred.promise,
                subscriptionsLoaded: subscriptionsLoadedDeferred.promise,

                resendVerificationEmail: resendVerificationEmail,
                goToAmAuto: goToAmAuto
            });
        });
