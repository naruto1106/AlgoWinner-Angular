agmNgModuleWrapper("agm.core").defineServiceStrict(
    "coreUserStateService",
    [
        "coreDataStorageService",
        "coreSignalRNotificationService",
        "coreServerCommunicationService"
    ],
    function (serviceObj, dep, tool) {
        var notificationPath = "/nsapi/Notification/";
        var subscriptionPath = "/subapi/v1/BundleSubscription/";
        var userInfoPath = "/userinfoapi/v1/UserInfo/";

        var $window = dep.$window,
            coreDataStorageService = dep.coreDataStorageService,
            coreSignalRNotificationService = dep.coreSignalRNotificationService,
            coreServerCommunicationService = dep.coreServerCommunicationService;

        var userInfoLoadedDeferred = tool.defer();
        var userNotificationLoadedDeferred = tool.defer();
        var myPremiumItemSubscriptionsLoadedDeferred = tool.defer();
        var mySubscribedStrategiesLoadedDeferred = tool.defer();

        function isSubmenu(title) {
            return serviceObj.currentSubmenu === title;
        }

        function setSubmenu(title) {
            serviceObj.currentSubmenu = title;
        }

        function isLoggedIn() {
            var token = coreDataStorageService.get("token");
            var tokenFound = token != null;
            return tokenFound || serviceObj.hasPendingLogoutConfirmation;
        }

        function saveToken(token, refreshToken) {
            coreDataStorageService.set("token", token);
            coreDataStorageService.set("refresh_token", refreshToken);
        }

        function deleteToken() {
            coreDataStorageService.clear("token");
            coreDataStorageService.clear("refresh_token");
            serviceObj.user = null;
        }

        function setGoogleAnalyticUser(userId) {
            //For google analytics
            var gAnalytics = $window.ga;
            if (gAnalytics) {
                // dimension 1 == User ID, but set as hit-scoped dimension
                gAnalytics("set", "dimension1", userId);
                // Client ID, supposed to supersede dimension 1 (User ID), it is session-scoped
                gAnalytics("set", "dimension3", userId);
                //for User IDs tracking
                gAnalytics('set', 'userId', userId);
            }
        }

        function loadUser() {
            var token = coreDataStorageService.get("token");
            if (token == null) {
                serviceObj.setLoggedIn(true);
                return tool.when(null);
            }

            coreServerCommunicationService.genGetFunctionWithNVar(notificationPath + "GetNotificationSetting")().then(
                function (res) {
                    serviceObj.notificationSettings = res.data;
                    userNotificationLoadedDeferred.resolve(
                        serviceObj.notificationSettings
                    );
                },
                function () {
                    tool.logError(
                        "Fetching Notification Setting",
                        "Error retrieving current notification settings"
                    );
                    userNotificationLoadedDeferred.reject();
                }
            );

            coreServerCommunicationService.genGetFunctionWithNVar(userInfoPath + "UserInfo")().then(
                function (res) {
                    serviceObj.user = res.data;
                    coreDataStorageService.set(
                        "userId",
                        serviceObj.user.UserId
                    );
                    setGoogleAnalyticUser(serviceObj.user.UserId);
                    userInfoLoadedDeferred.resolve(res.data);
                },
                function () {
                    userInfoLoadedDeferred.reject();
                }
            );

            coreServerCommunicationService.genGetFunctionWithNVar(subscriptionPath + 'GetSubscribedStrategyIdDtos')().then(
                function (res) {
                    serviceObj.mySubscribedStrategies = res.data;
                    serviceObj.mySubscribedStrategIds = serviceObj.mySubscribedStrategies.map(function (s) {
                        return s.StrategyId;
                    });
                    mySubscribedStrategiesLoadedDeferred.resolve(
                        serviceObj.mySubscribedStrategies
                    );
                },
                function () {
                    tool.logError(
                        "Fetching Subscribed Premium Bundles",
                        "Error retrieving premium bundle subscriptions"
                    );
                    mySubscribedStrategiesLoadedDeferred.reject();
                }
            );

            coreServerCommunicationService.genGetFunctionWithNVar(subscriptionPath + 'GetMySubscribedPremiumItems')().then(
                function (res) {
                    serviceObj.myPremiumItemSubscriptions = res.data;
                    myPremiumItemSubscriptionsLoadedDeferred.resolve(
                        serviceObj.myPremiumItemSubscriptions
                    );
                },
                function () {
                    tool.logError(
                        "Fetching Subscribed Premium Bundles",
                        "Error retrieving premium bundle subscriptions"
                    );
                    myPremiumItemSubscriptionsLoadedDeferred.reject();
                }
            );

            return userInfoLoadedDeferred.promise;
        }

        coreSignalRNotificationService.turnOn(
            "ProfileUpdated",
            handleProfileUpdate
        );
        coreSignalRNotificationService.turnOn(
            "NotificationSettingsUpdated",
            handleNotificationSettingsUpdated
        );

        function handleProfileUpdate(newProfile) {
            newProfile.Roles = serviceObj.user.Roles;
            serviceObj.user = newProfile;
        }

        function handleNotificationSettingsUpdated(newSettings) {
            serviceObj.notificationSettings = newSettings;
            serviceObj.userNotificationLoaded = newSettings;
        }

        function setLoggedIn(loggedInFlag) {
            serviceObj.loginPromptShown = loggedInFlag;
        }

        function isTrader() {
            if (serviceObj.user && serviceObj.user.Roles) {
                return _.includes(serviceObj.user.Roles, "Trader");
            }
            return false;
        }

        function isSuperUser() {
            if (serviceObj.user && serviceObj.user.Roles) {
                return _.includes(serviceObj.user.Roles, "SuperUser");
            }
            return false;
        }

        function isInvestmentLeader() {
            if (serviceObj.user && serviceObj.user.Roles) {
                return _.includes(serviceObj.user.Roles, "InvestmentLeaders");
            }
            return false;
        }

        function isFollower() {
            if (serviceObj.user && serviceObj.user.Roles) {
                return _.includes(serviceObj.user.Roles, "Followers");
            }
            return false;
        }

        function isMarketPlayer() {
            if (serviceObj.user && serviceObj.user.Roles) {
                return _.includes(serviceObj.user.Roles, "MarketPlayer");
            }
            return false;
        }

        function isNewsWriter() {
            if (serviceObj.user && serviceObj.user.Roles) {
                return _.includes(serviceObj.user.Roles, "NewsWriter");
            }
            return false;
        }

        function hasTools() {
            return (
                serviceObj.myPremiumItemSubscriptions.length > 0 &&
                serviceObj.mySubscribedStrategIds.length > 0
            );
        }

        function hasPremiumItem(itemName) {
            if (serviceObj.myPremiumItemSubscriptions) {
                return serviceObj.myPremiumItemSubscriptions.filter(function (
                    s
                ) {
                    return s.Name.indexOf(itemName) > -1;
                })[0];
            }
            return false;
        }

        function hasAlgoChartDarkTheme() {
            return hasPremiumItem("Chart_DarkTheme");
        }

        function hasAlgoChartBundle() {
            return hasPremiumItem("AlgoChart");
        }

        function hasAlgoMartBundle() {
            return hasPremiumItem("AlgoMart");
        }

        function hasSGRealTimeMarketData() {
            return hasPremiumItem("Real Time Market Data (SG)");
        }

        function hasUSRealTimeMarketData() {
            return hasPremiumItem("Real Time Market Data (US)");
        }

        function hasTradersGPS() {
            return hasPremiumItem("TradersGPS");
        }

        function hasTradersGPSPlus() {
            return hasPremiumItem("TradersGPS Plus");
        }

        function getSubscribedStrategyIds() {
            return serviceObj.mySubscribedStrategIds;
        }

        function hasBacktester() {
            return hasPremiumItem("Momentum Analyzer");
        }

        function hasAlgoOracle() {
            return hasPremiumItem("AlgoOracle");
        }

        function hasAutoInvest() {
            return hasPremiumItem("AutoInvest");
        }

        function hasJIC() {
            return hasPremiumItem("MrFinanceSavvy");
        }


        function hasPTI() {
            return hasPremiumItem("1GT") && hasPremiumItem("1ET");
        }

        function has1GT() {
            return hasPremiumItem("1GT") && !hasPremiumItem("1ET");
        }

        function hasAutoInvestVM() {
            if (serviceObj.myPremiumItemSubscriptions) {
                return serviceObj.myPremiumItemSubscriptions.filter(function (
                    s
                ) {
                    return s.Name.indexOf("VM") > -1;
                })[0];
            }
            return false;
        }

        tool.setServiceObjectProperties({
            user: null,
            observedOrderStatus: [
                "Queued",
                "Partially Filled",
                "Filled",
                "Cancelled"
            ],
            currentSubmenu: "",
            loginPromptShown: false,

            deleteToken: deleteToken,
            saveToken: saveToken,
            isLoggedIn: isLoggedIn,
            hasPendingLogoutConfirmation: false,
            hasTools: hasTools,
            hasAlgoOracle: hasAlgoOracle,
            hasBacktester: hasBacktester,
            hasAutoInvest: hasAutoInvest,
            hasAutoInvestVM: hasAutoInvestVM,
            hasTradersGPS: hasTradersGPS,
            hasTradersGPSPlus: hasTradersGPSPlus,
            hasJIC: hasJIC,
            hasPTI: hasPTI,
            has1GT: has1GT,
            hasUSRealTimeMarketData: hasUSRealTimeMarketData,
            hasAlgoChartDarkTheme: hasAlgoChartDarkTheme,
            isNewsWriter: isNewsWriter,
            hasAlgoMartBundle: hasAlgoMartBundle,
            hasAlgoChartBundle: hasAlgoChartBundle,
            hasSGRealTimeMarketData: hasSGRealTimeMarketData,
            setLoggedIn: setLoggedIn,
            isTrader: isTrader,
            isInvestmentLeader: isInvestmentLeader,
            isMarketPlayer: isMarketPlayer,
            isFollower: isFollower,
            isSuperUser: isSuperUser,
            setSubmenu: setSubmenu,
            isSubmenu: isSubmenu,
            loadUser: loadUser,
            getSubscribedStrategyIds: getSubscribedStrategyIds,

            userNotificationLoaded: userNotificationLoadedDeferred.promise,
            userInfoLoaded: userInfoLoadedDeferred.promise,
            myPremiumItemSubscriptionsLoaded: myPremiumItemSubscriptionsLoadedDeferred.promise,
            mySubscribedStrategiesLoaded: mySubscribedStrategiesLoadedDeferred.promise
        });
    }
);
