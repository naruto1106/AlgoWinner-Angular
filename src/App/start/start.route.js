var dependencies = [
    "agms.gateway",
    "agms.droidHelper",
    "agmp.account",
    "agmp.subscription",
    "agmp.strategy",
    "agms.watchlist",
    "agmp.trade",
    "agmp.livetrade",
    "agmp.exchangeRate",
    "agmp.chart",
    "agmp.faq",
    "agmp.user",
    "agmp.product",
    "agms.header",
    "agmp.dashboard",
    "agmp.news.main",
    "agms.market",
    "agms.menu",
    "agms.priceAlert",
    "agms.misc",
    "agms.header",
    "agms.activity",
    "agms.trading",
    "agms.activity",
    "agms.user",
    "agms.strategyCommerce",
    "agmp.algoOracle",
    "agmp.datamart",
    "agmp.mobileWeb",
    "agmp.shop",
    "agmp.referral",
    "agmp.payment",
    "agmp.amAutoPanel",
    'agms.manualFollowFirebase',
    "agmp.backtester",
    "agmp.tradeIdea"

];

agmNgModuleWrapper("agmp.start.route", dependencies).ngApp.config([
    "$routeProvider",
    function($routeProvider) {
        var notificationSetting = [
            "coreUserStateService",
            function(coreUserStateService) {
                return coreUserStateService.userNotificationLoaded;
            }
        ];

        function handleInterceptingRouteLogic(address, config) {
            if (!config.resolve) {
                config.resolve = {};
            }
        }

        var venue = [
            "$route",
            "$q",
            function($route, $q) {
                return $q.when($route.current.params.venue);
            }
        ];

        var symbol = [
            "$route",
            "$q",
            function($route, $q) {
                return $q.when($route.current.params.symbol);
            }
        ];

        var presetChartMode = [
            "$route",
            "$q",
            function($route, $q) {
                return $q.when($route.current.params.mode);
            }
        ];

        var nullFunc = function() {
            return null;
        };

        var modeParam = [
            "$route",
            "$q",
            function($route, $q) {
                return $q.when($route.current.params.modeParam);
            }
        ];

        var strategyId = [
            "$route",
            "$q",
            function($route, $q) {
                return $q.when($route.current.params.strategyId);
            }
        ];
        var needsNotificationSettings = {
            notificationSettings: notificationSetting,
            strategyId: strategyId
        };

        var checkNews = [
            "coreUserStateService",
            "$location",
            function(coreUserStateService, $location) {
                coreUserStateService.userInfoLoaded.then(function() {
                    if (coreUserStateService.isNewsWriter()) {
                        $location.path("/writenews");
                    } else {
                        $location.path("/");
                    }
                });
            }
        ];

        var checkFaq = [
            "coreConfigService",
            "$location",
            function(coreConfigService, $location) {
                if (!coreConfigService.General.ShowFaq) $location.path("/");
            }
        ];

        var checkTools = [
            "coreConfigService",
            "$location",
            function(coreConfigService, $location) {
                if (!coreConfigService.General.ShowToolsPanel) {
                    $location.path("/");
                }
            }
        ];

        var checkOracle = [
            "coreUserStateService",
            "$location",
            function(coreUserStateService, $location) {
                coreUserStateService.myPremiumItemSubscriptionsLoaded.then(
                    function() {
                        if (coreUserStateService.hasAlgoOracle()) {
                            $location.path("/algooracle");
                        } else {
                            $location.path("/");
                        }
                    }
                );
            }
        ];

        var checkMobileWeb = [
            "pMobileWebService",
            "$location",
            function(pMobileWebService, $location) {
                if (pMobileWebService.showMobileWeb()) {
                    $location.path("/orderstrades");
                }
            }
        ];

        var whenWrapper = {
            when: function(address, config) {
                handleInterceptingRouteLogic(address, config);
                config.controllerAs = "vm";

                if (!config.resolve) {
                    config.resolve = {};
                }

                if (!config.headerMode) {
                    config.headerMode = 1;
                }

                config.resolve.setTourGuide = [
                    "sDroidHelperSbsFrameworkService",
                    function(sDroidHelperSbsFrameworkService) {
                        sDroidHelperSbsFrameworkService.setCurrentFlowName(
                            null,
                            null
                        );
                    }
                ];

                config.resolve.changeFooterVisibility = [
                    "commonScreenResizerService",
                    function(commonScreenResizerService) {
                        commonScreenResizerService.setFooterVisibility(
                            !config.hasNoFooter
                        );
                    }
                ];
                config.resolve.changeHeaderMode = [
                    "commonHeaderModeService",
                    function(commonHeaderModeService) {
                        commonHeaderModeService.setHeaderVisibilityMode(
                            config.headerMode
                        );
                    }
                ];
                this._config.when(address, config);
                return this;
            },
            _config: $routeProvider,
            otherwise: function(config) {
                this._config.otherwise(config);
            }
        };

        whenWrapper
            .when("/", {
                title: "Home",
                controller: "p.dashboard.MainController",
                templateUrl: "/App/pages/dashboard/dashboard.main.html",
                resolve: {
                    check: checkMobileWeb,
                    notificationSettings: notificationSetting
                }
            })
            .when("/tradeMain", {
                title: "Trade Main",
                controller: "p.tradeIdea.MainController",
                templateUrl: "/App/pages/tradeIdea/tradeIdea.main.html",
                resolve: {
                    check: checkMobileWeb,
                    notificationSettings: notificationSetting
                }
            })
            .when("/invite", {
                title: "Invite Friends",
                controller: "p.referral.InviteController",
                templateUrl: "/App/pages/referral/referral.invite.html"
            })
            .when("/analyze", {
                title: "Store",
                controller: "p.shop.AnalyzeController",
                templateUrl: "/App/pages/shop/shop.analyze.html"
            })
            .when("/bundle", {
                title: "Store",
                controller: "p.shop.BundleController",
                templateUrl: "/App/pages/shop/shop.bundles.html"
            })
            .when("/backtester", {
                title: "Backtester",
                controller: "p.backtester.MainController",
                templateUrl: "/App/pages/backtester/backtester.main.html"
            })
            .when("/product-detail/:venue/:symbol", {
                title: "Product",
                controller: "p.product.MainController",
                templateUrl: "/App/pages/product/product.main.html",
                hasNoFooter: true,
                headerMode: 3,
                reloadOnSearch: false,
                resolve: {
                    venue: venue,
                    symbol: symbol
                }
            })
            .when("/optionpi-product/:venue/:symbol", {
                title: "Product",
                controller: "p.product.OptionPiController",
                templateUrl: "/App/pages/product/product.optionpi.html",
                hasNoFooter: true,
                headerMode: 3,
                reloadOnSearch: false,
                resolve: {
                    venue: venue,
                    symbol: symbol
                }
            })
            .when("/overview", {
                title: "Home",
                controller: "p.dashboard.MainController",
                templateUrl: "/App/pages/dashboard/dashboard.main.html",
                resolve: {
                    notificationSettings: notificationSetting
                }
            })
            .when("/watchlist", {
                title: "Home",
                controller: "p.dashboard.BigWatchlistController",
                templateUrl: "/App/pages/dashboard/dashboard.bigWatchlist.html",
                resolve: {
                    notificationSettings: notificationSetting
                }
            })
            .when("/pricealert", {
                title: "Home",
                controller: "p.dashboard.BigAlertController",
                templateUrl: "/App/pages/dashboard/dashboard.bigAlert.html",
                resolve: {
                    notificationSettings: notificationSetting
                }
            })
            .when("/news", {
                title: "Home",
                controller: "p.dashboard.BigNewsTipsController",
                templateUrl: "/App/pages/dashboard/dashboard.bigNewsTips.html",
                resolve: {
                    notificationSettings: notificationSetting
                }
            })
            .when("/faq-guide", {
                title: "Guide",
                controller: "p.faq.GuideFlowController",
                templateUrl: "/App/pages/faq/faq.guideflow.html",
                resolve: {
                    check: checkFaq
                }
            })
            .when("/accounts", {
                title: "Account Management",
                controller: "p.account.MainController",
                templateUrl: "/App/pages/account/account.main.html"
            })
            .when("/livetrade", {
                title: "Live Trade",
                controller: "p.livetrade.OrdersController",
                templateUrl: "/App/pages/livetrade/livetrade.orders.html",
                reloadOnSearch: false,
                resolve: needsNotificationSettings
            })
            .when("/orderstrades", {
                title: "Trade",
                controller: "p.trade.OrdersController",
                templateUrl: "/App/pages/trade/trade.orders.html",
                reloadOnSearch: false,
                resolve: needsNotificationSettings
            })
            .when("/orderstrades/:strategyId", {
                title: "Trade",
                controller: "p.trade.OrdersController",
                templateUrl: "/App/pages/trade/trade.orders.html",
                reloadOnSearch: false,
                resolve: needsNotificationSettings
            })
            .when("/tradeportfoliosettings", {
                title: "Manage Trade Portfolio",
                controller: "p.strategy.SettingController",
                templateUrl: "/App/pages/strategy/strategy.setting.html"
            })
            .when("/profile", {
                title: "Profile",
                controller: "p.user.ProfileController",
                templateUrl: "/App/pages/user/user.profile.html"
            })
            .when("/payment", {
                title: "Payment Methods",
                controller: "p.payment.MainController",
                templateUrl: "/App/pages/payment/payment.main.html"
            })
            .when("/payout", {
                title: "Payout Methods",
                controller: "p.payment.BankAccountController",
                templateUrl: "/App/pages/payment/payment.bankAccount.html"
            })
            .when("/subscriptions", {
                title: "Manage Subscriptions",
                controller: "p.subscription.ManageController",
                templateUrl: "/App/pages/subscription/subscription.manage.html"
            })
            .when("/transaction", {
                title: "Transaction History",
                controller: "p.payment.TransactionHistoryController",
                templateUrl:
                    "/App/pages/payment/payment.transactionHistory.html"
            })
            .when("/credit", {
                title: "Algo Credits",
                controller: "p.payment.CreditController",
                templateUrl: "/App/pages/payment/payment.credit.html"
            })
            .when("/product/:productId", {
                title: "Product",
                templateUrl: "/App/pages/product/product.main.html",
                controller: "ProductController"
            })
            .when("/tradeportfolioperformance", {
                title: "Performance",
                controller: "p.strategy.PerformancesController",
                templateUrl: "/App/pages/strategy/strategy.performances.html"
            })
            .when("/charts", {
                title: "Charts",
                templateUrl: "/App/pages/chart/chart.mainV2.html",
                controller: "p.chart.MainV2Controller",
                hasNoFooter: true,
                headerMode: 3,
                resolve: {
                    venue: nullFunc,
                    symbol: nullFunc,
                    presetChartMode: nullFunc,
                    modeParam: nullFunc
                }
            })
            .when("/optionpi-charts/:venue/:symbol", {
                title: "Charts",
                templateUrl: "/App/pages/chart/chartoptionpi.mainV2.html",
                controller: "p.chart.OptionPiController",
                hasNoFooter: true,
                headerMode: 3,
                resolve: {
                    venue: venue,
                    symbol: symbol,
                    presetChartMode: nullFunc,
                    modeParam: nullFunc,                     
                }
            })
            .when("/charts/:venue/:symbol", {
                title: "Charts",
                controller: "p.chart.MainV2Controller",
                templateUrl: "/App/pages/chart/chart.mainV2.html",
                hasNoFooter: true,
                headerMode: 3,
                resolve: {
                    venue: venue,
                    symbol: symbol,
                    presetChartMode: nullFunc,
                    modeParam: nullFunc
                }
            })
            .when("/charts/:venue/:symbol/:mode", {
                title: "Charts",
                controller: "p.chart.MainV2Controller",
                templateUrl: "/App/pages/chart/chart.mainV2.html",
                hasNoFooter: true,
                headerMode: 3,
                resolve: {
                    venue: venue,
                    symbol: symbol,
                    presetChartMode: presetChartMode,
                    modeParam: nullFunc
                }
            })
            .when("/charts/:venue/:symbol/:mode/:modeParam", {
                title: "Charts",
                controller: "p.chart.MainV2Controller",
                templateUrl: "/App/pages/chart/chart.mainV2.html",
                hasNoFooter: true,
                headerMode: 3,
                resolve: {
                    venue: venue,
                    symbol: symbol,
                    presetChartMode: presetChartMode,
                    modeParam: modeParam
                }
            })
            .when("/charts/:mode", {
                title: "Charts",
                controller: "p.chart.MainV2Controller",
                templateUrl: "/App/pages/chart/chart.mainV2.html",
                hasNoFooter: true,
                headerMode: 3,
                resolve: {
                    venue: nullFunc,
                    symbol: nullFunc,
                    presetChartMode: presetChartMode,
                    modeParam: nullFunc
                }
            })
            .when("/exchangerate", {
                title: "Exchange Rate",
                controller: "p.exchangeRate.MainController",
                templateUrl: "/App/pages/exchangeRate/exchangeRate.main.html",
                resolve: {
                    check: checkTools
                }
            })
            .when("/writenews", {
                title: "News",
                controller: "p.news.MainController",
                templateUrl: "/App/pages/news/news.main.html",
                resolve: {
                    check: checkNews
                }
            })
            .when("/algooracle", {
                title: "AlgoOracle",
                controller: "p.mobileWeb.OracleController",
                templateUrl: "/App/pages/mobileWeb/mobileWeb.oracle.html",
                resolve: {
                    check: checkOracle
                }
            })
            .otherwise({
                redirectTo: "/"
            });
    }
]);
