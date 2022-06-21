agmNgModuleWrapper('agms.header')
    .defineDirectiveForE('agms-header-main', [],
    function (dep) {
        return {
            restrict: 'E',
            controller: "s.header.MainController",
            templateUrl: '/App/shared/header/header.main.html'
        };
    }, {

    })
    .defineController('s.header.MainController', [
        'sharedFakeProgressService', 'sGatewaySessionService', 'sDroidHelperService', 'sProductService', 'sUserAccountService',
        'commonHeaderModeService', 'commonLocationHistoryService', 'coreDataStorageService', 'sGatewayTokenRefreshService',
        'sStrategyCommerceService', 'commonScreenResizerService', 'sAccountService', 'sActivityNotificationService', 'sUserService',
        'sHeaderService', "pAlgoOracleService", "pMobileWebService"],
    function (vm, dep, tool) {
        // as service
        // as part of header
        var temporaryUserId = null;
        var locationHistory = dep.commonLocationHistoryService.locationHistory;
        var sHeaderService = dep.sHeaderService,
            commonLocationHistoryService = dep.commonLocationHistoryService,
            commonScreenResizerService = dep.commonScreenResizerService,
            commonHeaderModeService = dep.commonHeaderModeService,
            coreDataStorageService = dep.coreDataStorageService,
            sharedFakeProgressService = dep.sharedFakeProgressService,
            sProductService = dep.sProductService,
            sUserService = dep.sUserService,
            sDroidHelperService = dep.sDroidHelperService,
            coreConfigService = dep.coreConfigService,
            sGatewayTokenRefreshService = dep.sGatewayTokenRefreshService,
            sStrategyCommerceService = dep.sStrategyCommerceService,
            sGatewaySessionService = dep.sGatewaySessionService,
            $rootScope = dep.$rootScope,
            coreAuthInterceptor = dep.coreAuthInterceptor,
            coreUserStateService = dep.coreUserStateService,
            $window = dep.$window,
            coreNotificationService = dep.coreNotificationService,
            $route = dep.$route,
            pAlgoOracleService = dep.pAlgoOracleService;

        function openHelpWizard() {
            $rootScope.$broadcast("onHelpWizardClicked");
        }

        function logout() {
            coreAuthInterceptor.logout();
            coreUserStateService.hasPendingLogoutConfirmation = false;
        }

        function progressBarStyle() {
            return {
                width: vm.fakeProgress.progress + "%"
            };
        }

        function searchProducts(keyword) {
            return sProductService.SearchProduct(keyword).then(function (res) {
                return res.data.filter(function (product) {
                    return product.AssetType !== "Index Futures" && product.AssetType !== "Index Futures CFD"
                        && product.TradeVenueLoc !== 'HK' && product.TradeVenueLoc !== 'CHN';
                });
            });
        }

        function showContactUs() {
            tool.openModalByDefinition('s.misc.ContactUsController');
        }

        function showContactUsJoey() {
            tool.openModalByDefinition('s.misc.ContactUsJoeyController');
        }

        function setMenuVisibility() {
            vm.menuVisibility = {};
            var isLoggedIn = coreUserStateService.isLoggedIn();
            if (isLoggedIn) {
                vm.menuVisibility.showAutoInvest = coreUserStateService.hasAutoInvest();

                if (vm.isNewsWriter) {
                    vm.menuVisibility.news = true;
                }
            }
        }

        function showOrHideOracleBox() {
            pAlgoOracleService.isOracleOpen = !pAlgoOracleService.isOracleOpen;

            if (pAlgoOracleService.isOracleOpen) {
                tool.timeout(function () {
                    pAlgoOracleService.updateScrollbar();
                }, 500);

                document.body.scrollTop = document.documentElement.scrollTop = 0;
                document.body.className += ' ' + 'modal-open';
            } else {
                document.body.className = document.body.className.replace("modal-open", "");
            }
        }

        function showConfirmEmailBox() {
            if (dep.$location.path().indexOf("charts") > -1 || coreConfigService.AlgoLeader.HideForAlgoLeader) {
                return false;
            }
            return coreUserStateService.user && !coreUserStateService.user.EmailConfirmed;
        }

        function openAcademy() {
            commonLocationHistoryService.goToNewTab('/learn');
        }

        //#1
        tool.initialize(function () {
            tool.setVmProperties({
                pMobileWebService: dep.pMobileWebService,
                sActivityNotificationService: dep.sActivityNotificationService,
                sHeaderService: sHeaderService,
                go: commonLocationHistoryService.go,
                coreConfigService: coreConfigService,
                coreUserStateService: coreUserStateService,
                fakeProgress: sharedFakeProgressService.generateFakeProgress(),
                showContactUs: showContactUs,
                showContactUsJoey: showContactUsJoey,
                showOrHideOracleBox: showOrHideOracleBox,
                progressBarStyle: progressBarStyle,
                logout: logout,
                openNewStrategy: sStrategyCommerceService.openNewStrategy,
                searchProducts: searchProducts,
                goToProduct: sProductService.goToProduct,
                headerMode: commonHeaderModeService,
                commonScreenResizerService: commonScreenResizerService,
                openHelpWizard: openHelpWizard,
                isNotificationOpen: false,
                isNewsWriter: false,
                isTradersGPSShown: false,
                showAlgoOracle: false,
                showAutoInvest: false,
                selectedMenu: sHeaderService.selectedMenu,
                selectMenu: sHeaderService.selectMenu,
                showConfirmEmailBox: showConfirmEmailBox,
                goToAmAuto: sHeaderService.goToAmAuto,
                goToNewTab: commonLocationHistoryService.goToNewTab,
                openAcademy: openAcademy
            });

            sGatewayTokenRefreshService.start();
            coreUserStateService.loadUser();
            coreUserStateService.userInfoLoaded.then(function (res) {
                if (res.Roles) {
                    vm.isNewsWriter = coreUserStateService.isNewsWriter();
                }

                Raven.setUserContext(res);

                tool.onceAll([
                    sHeaderService.getGroupStrategiesAndBundles()
                ]).finally(function () {
                    setMenuVisibility();
                });
            });
        });

        //#2
        tool.initialize(function () {
            //make header scroll to the right
            tool.onRendered(function () {
                $(window).on('scroll', function () {
                    var element = vm._getDirectiveElement();
                    $(element).find('header.main-header').css('left', -$(window).scrollLeft());
                });
            });

            sUserService.GetProfile().then(function (res) {
                var profile = res.data;

                var modalBoxInstance = null;
                var deferred = tool.defer();
                if (profile.Country.CountryId === null || profile.Timezone.TimezoneId === null || !profile.AcceptedTnC || profile.Signature === null) {
                    if (profile.Country.CountryId === null || profile.Timezone.TimezoneId === null) {
                        profile.UserName = "";
                    }
                    modalBoxInstance = tool.openModalByDefinition('p.user.NewPopupController', {
                        profile: profile
                    }).result.then(function (obj) {
                        obj.promise.then(function () {
                            deferred.resolve();
                        });
                    });
                } else if (profile.PhoneNumber === "" || profile.PhoneCountryCode === "") {
                    /*modalBoxInstance = tool.openModalByDefinition('p.user.PhoneNumberController', {
                        myProfile: profile
                    }).result.then(function (obj) {
                        obj.promise.then(function () {
                            deferred.resolve();
                        });
                    });*/
                }
                if (modalBoxInstance && deferred) {
                    deferred.promise.then(function () {
                        //sDroidHelperService.showDefaultModalForFirstTime();
                        if (!profile.EmailConfirmed) {
                            tool.openModalByDefinition('p.user.ConfirmEmailController', {
                                profile: profile
                            });
                        }
                    });
                } else {
                    sDroidHelperService.getUser().then(function (u) {
                        if (u.ShowHelpOnInit) {
                            sDroidHelperService.showDefaultModalForFirstTime();
                        }
                    });
                }
            });

            coreUserStateService.myPremiumItemSubscriptionsLoaded.then(function () {
                if (coreUserStateService.hasTradersGPS()) {
                    vm.isTradersGPSShown = true;
                }
                if (!coreConfigService.TradersGPS) {
                    coreConfigService.TradersGPS = {};
                }
                if (coreUserStateService.hasAlgoOracle()) {
                    vm.showAlgoOracle = true;
                }

                sHeaderService.partnerChartName = "Chart";
                if (coreUserStateService.hasJIC()) {
                    sHeaderService.partnerChartName += " JIC";
                }
                if (coreUserStateService.hasPTI()) {
                    sHeaderService.partnerChartName = "1GT/1ET System";
                }
                if (coreUserStateService.has1GT()) {
                    sHeaderService.partnerChartName = "1GT System";
                }

                //set chart menu
                if (coreUserStateService.hasTradersGPS() &&
                    (coreUserStateService.hasJIC() || coreUserStateService.hasPTI() || coreUserStateService.has1GT())) {
                    sHeaderService.chartMenuType = "DropDown";
                } else {
                    if (coreUserStateService.hasTradersGPS()) {
                        sHeaderService.chartMenuType = "TGPS";
                    } else if (coreUserStateService.hasJIC() || coreUserStateService.hasPTI() || coreUserStateService.has1GT()) {
                        sHeaderService.chartMenuType = "Partner";
                    } else {
                        sHeaderService.chartMenuType = "Normal";
                    }
                }

                coreConfigService.TradersGPS.Enabled = vm.isTradersGPSShown;
            });
            tool.onRoot('$locationChangeSuccess', function (obj, next, current) {
                locationHistory.push(current);
            });
            tool.onRoot("$routeChangeStart", function (event, next, current) {
                vm.fakeProgress.startProgress();
            });
            tool.onRoot("$routeChangeSuccess", function (event, next, current) {
                if ($route.current.title) {
                    if (coreConfigService.AlgoLeader.HideForAlgoLeader) {
                        document.title = $route.current.title + " - AlgoLeader";
                    } else {
                        document.title = $route.current.title + " - Algomerchant";
                    }
                }
                vm.fakeProgress.finishProgress();
            });
            tool.onRoot("routeChangeError", function (event, next, current) {
                vm.fakeProgress.finishProgress();
            });
            tool.on('logout', function (event, data) {
                logout();
            });

            // do not trigger digest cycle unnecessarily. use vanilla setInterval instead of tool.interval
            $window.setInterval(function () {
                //set token if there is one in url
                var path = dep.$location.absUrl();
                var tokenInUrl = path.split("?token=")[1] || "";
                if (tokenInUrl) {
                    coreDataStorageService.set("token", tokenInUrl);
                }

                var newUserId = coreDataStorageService.get("userId");
                var token = coreDataStorageService.get("token");
                if (!temporaryUserId) {
                    temporaryUserId = newUserId;
                }
                if (!token) {
                    coreAuthInterceptor.attemptRelogin();
                    if (!coreUserStateService.hasPendingLogoutConfirmation) {
                        coreAuthInterceptor.logout();
                    }
                    return;
                }
                if (temporaryUserId && newUserId && newUserId !== temporaryUserId) {
                    temporaryUserId = newUserId;
                    var modalInstance = coreNotificationService.notifyWarning("Different User Detected", "You have been logged in as different user. The browser will now refresh");
                    modalInstance.result.then(function () { $window.location.reload(); });
                }

            }, 1000);

            //for single session
            sGatewaySessionService.manageSingleSessionWithPopup();
            tool.signalRNotification("UserSessionStatusChanged", function (activeSessionId) {
                coreDataStorageService.set("active_session_id", activeSessionId);
                coreAuthInterceptor.checkOnKickedOut();
            });
        });
    });