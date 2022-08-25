agmNgModuleWrapper('agms.header')
    .defineDirectiveForE('agms-header-trade', [],
    function (dep) {
        return {
            controller: "s.header.TradeSubmenuController",
            templateUrl: '/App/shared/header/header.trade.html'
        };
    }, {
        currentPage: '@'
    })
    .defineDirectiveForE('agms-header-payment', [],
        function (dep) {
            return {
                controller: "s.header.SubmenuController",
                templateUrl: '/App/shared/header/header.payment.html'
            };
        }, {
            currentPage: '@'
        })
    .defineDirectiveForE('agms-header-shop', [],
    function (dep) {
        return {
            controller: "s.header.SubmenuController",
            templateUrl: '/App/shared/header/header.shop.html'
        };
    }, {
        currentPage: '@'
    })
    .defineDirectiveForE('agms-header-dashboard', [],
    function (dep) {
        return {
            controller: "s.header.SubmenuController",
            templateUrl: '/App/shared/header/header.dashboard.html'
        };
    }, {
        currentPage: '@'
    })
    .defineController('s.header.SubmenuController', [
        'commonLocationHistoryService', 'sStrategyCommerceService', "sHeaderService", "pShopService"
    ],
    function (vm, dep, tool) {

        var sHeaderService = dep.sHeaderService,
            sStrategyCommerceService = dep.sStrategyCommerceService,
            pShopService = dep.pShopService;

        function isCurrentPage(comparer) {
            if (typeof comparer === "string") {
                return comparer === vm.currentPage;
            }
            return comparer.indexOf(vm.currentPage) >= 0;
        }

        function showFollowPage() {
            return !vm.coreUserStateService.isInvestmentLeader() && sHeaderService.showTrackSubscribedStrategies();
        }

        tool.initialize(function () {
            tool.setVmProperties({
                pShopService: pShopService,
                sHeaderService: sHeaderService,
                openNewStrategy: sStrategyCommerceService.openNewStrategy,
                canHaveMoreStrategy: false,
                go: dep.commonLocationHistoryService.go,
                coreUserStateService: dep.coreUserStateService,
                isCurrentPage: isCurrentPage,
                showFollowPage: showFollowPage,
                coreConfigService: dep.coreConfigService
            });
        });
    })
    .defineController('s.header.TradeSubmenuController', [
        'commonLocationHistoryService', 'sStrategyCommerceService', "sHeaderService", "pShopService"],
    function (vm, dep, tool) {
        var sStrategyCommerceService = dep.sStrategyCommerceService,
            sHeaderService = dep.sHeaderService,
            pShopService = dep.pShopService;

        function isCurrentPage(comparer) {
            if (typeof comparer === "string") {
                return comparer === vm.currentPage;
            }
            return comparer.indexOf(vm.currentPage) >= 0;
        }

        function showFollowPage() {
            return !vm.coreUserStateService.isInvestmentLeader() && sHeaderService.showTrackSubscribedStrategies();
        }

        tool.initialize(function () {
            tool.setVmProperties({
                pShopService: pShopService,
                sHeaderService: sHeaderService,
                openNewStrategy: sStrategyCommerceService.openNewStrategy,
                canHaveMoreStrategy: false,
                go: dep.commonLocationHistoryService.go,
                coreUserStateService: dep.coreUserStateService,
                isCurrentPage: isCurrentPage,
                showFollowPage: showFollowPage,
                coreConfigService: dep.coreConfigService
            });

            sStrategyCommerceService.GetOwnedStrategiesCount().then(function (res) {
                vm.canHaveMoreStrategy = res.data < 50;
            }, function () {
                tool.log("Get Managed Strategies Count Failed");
            });
        });
    });