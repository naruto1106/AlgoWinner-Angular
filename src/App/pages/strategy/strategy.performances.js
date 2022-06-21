agmNgModuleWrapper('agmp.strategy')
    .defineController('p.strategy.PerformancesController',
    ["sHeaderService",
        'sStrategyCommerceService', 'coreNotificationService', 'sTradingExchangeRateService', 'sTradingExitAggregatorService', 'commonLocationHistoryService',
        'sStrategyCommercePerformanceService'],
    function (vm, dep, tool) {

        var $scope = dep.$scope,
            $window = dep.$window,
            sTradingExchangeRateService = dep.sTradingExchangeRateService,
            sStrategyCommerceService = dep.sStrategyCommerceService,
            sTradingExitAggregatorService = dep.sTradingExitAggregatorService,
            commonLocationHistoryService = dep.commonLocationHistoryService,
            coreUserStateService = dep.coreUserStateService,
            coreNotificationService = dep.coreNotificationService,
            sStrategyCommercePerformanceService = dep.sStrategyCommercePerformanceService;

        var getStrategyPerformancePromise = null;

        coreUserStateService.setSubmenu('PERFORMANCES');

        vm.resizeWindowAndChart = function () {
            forceRedraw();
            $($window).resize();
            tool.timeout(function () {
                $($window).resize();
            });
        }

        vm.selectDefaultMyStrategy = function () {
            selectStrategy(vm.strategySelections[0]);
        }

        function forceRedraw() {
            $scope.$broadcast('forceChartRedraw');
        }

        function selectStrategy(strategy) {
            vm.selectedStrategy = strategy;
            vm.isLoadingPerformance = true;
            vm.selectedStrategyPerformance = null;
            if (getStrategyPerformancePromise) {
                getStrategyPerformancePromise.cancel();
            }
            getStrategyPerformancePromise = sStrategyCommercePerformanceService.GetLegacyStrategyPerformance(strategy.DisplayInfo.BasicInfo.StrategyId);
            getStrategyPerformancePromise.then(function (res) {
                vm.selectedStrategyPerformance = res.data;
                sTradingExitAggregatorService.getTradeExitDataForStrategy(vm.selectedStrategy.DisplayInfo.BasicInfo.StrategyId,
                    vm.selectedStrategy.Currency).then(function (res2) {
                    vm.selectedStrategyPerformance.ExitedTrades = res2.totalTrades;
                    vm.selectedStrategyPerformance.WinningNumber = res2.totalWinningTrades;
                    vm.selectedStrategyPerformance.LosingNumber = res2.totalLosingTrades;
                    vm.isLoadingPerformance = false;
                }, function () {
                    vm.isLoadingPerformance = false;
                });
            }, function () {
                vm.isLoadingPerformance = false;
            });
        }

        function getStrategyPerformances() {
            vm.isLoadingData = true;
            sStrategyCommercePerformanceService.GetStrategiesForReturnAnalysis()
                .then(function (res) {
                    vm.strategies = res.data;
                    vm.strategySelections = vm.strategies;
                    vm.selectedStrategy = vm.strategySelections[0];
                    if (vm.selectedStrategy) {
                        sStrategyCommercePerformanceService.GetLegacyStrategyPerformance(vm.selectedStrategy.DisplayInfo.BasicInfo.StrategyId).then(function (res2) {
                            vm.selectedStrategyPerformance = res2.data;
                            sTradingExitAggregatorService.getTradeExitDataForStrategy(vm.selectedStrategy.DisplayInfo.BasicInfo.StrategyId,
                                vm.selectedStrategy.Currency).then(function (res3) {

                                vm.selectedStrategyPerformance.ExitedTrades = res3.totalTrades;
                                vm.selectedStrategyPerformance.WinningNumber = res3.totalWinningTrades;
                                vm.selectedStrategyPerformance.LosingNumber = res3.totalLosingTrades;
                            });
                        });
                    }
                }, function (res) {
                    coreNotificationService.notifyError("Unable to get strategies", "Error! " + (res.data && res.data.Message));
                }).finally(function () {
                    vm.isLoadingData = false;
                });

            sTradingExchangeRateService.GetAllExchangeRates().then(function (res) {
                var rates = _.chain(res.data)
                    .indexBy("CurrencyPair")
                    .mapValues("Rate")
                    .value();
                return rates;
            }).then(function (rates) {
                vm.exchangeRates = rates;
            }, function () {
                coreNotificationService.notifyError("failed to retrieve exchange rate");
            });
        }

        tool.initialize(function () {
            tool.setVmProperties({
                strategies: [],
                strategiesType: 0,
                selectedStrategy: null,
                isLoadingData: false,
                isLoadingPerformance: false,
                selectedStrategyPerformance: null,
                coreUserStateService: coreUserStateService,
                openNewStrategy: sStrategyCommerceService.openNewStrategy,
                go: commonLocationHistoryService.go,
                selectStrategy: selectStrategy,
                forceRedraw: forceRedraw
            });

            dep.sHeaderService.selectMenu("trade", "performance");

            if (coreUserStateService.isLoggedIn() && !coreUserStateService.hasPendingLogoutConfirmation) {
                tool.onceAll([
                    getStrategyPerformances()                    
                ]).then(function () {
                });
            }
        });
    });