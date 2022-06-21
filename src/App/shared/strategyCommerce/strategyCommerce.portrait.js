agmNgModuleWrapper('agms.strategyCommerce')
    .defineController('s.strategyCommerce.PortraitController', ['$scope', '$location'],
        function(vm, dep, tool) {
            vm.linkToGroup = true;

            var coreUserStateService = dep.coreUserStateService;

            function detail(strategyId, gotoDetail) {
                coreUserStateService.mySubscribedStrategiesLoaded.then(function () {
                    if (_.includes(coreUserStateService.mySubscribedStrategIds, strategyId) && !gotoDetail) {
                        var subscriptionId = 0;
                        coreUserStateService.mySubscribedStrategies.forEach(function (s) {
                            if (s.StrategyId === strategyId) {
                                subscriptionId = s.SubscriptionId;
                            }
                        });
                        $location.search({ subscriptionId: subscriptionId });
                        $location.path('/tracksubscribedstrategies');
                    } else {
                        $location.path('/strategy/detail/' + strategyId);
                        $location.hash('top');
                    }
                });
            }

            vm.defaultImageFallback = "//am708403.azureedge.net/images/no-image.jpg?";
            vm.strategyDetails = function(strategyId) {
                if (!vm.disableClickStrategy) {
                    detail(strategyId);
                }
            }

            tool.onRendered(function() {
                overrideDisplayValue();
            });

            function overrideDisplayValue() {
                if (vm.strategy && vm.strategy.OverridenDisplayValues && vm.strategy.OverridenDisplayValues.IsApproved) {
                    vm.linkToGroup = vm.strategy.OverridenDisplayValues.GuruGroupModel.GuruGroupId;
                } else {
                    vm.linkToGroup = null;
                }
            }

            tool.watch('vm.strategy.OverridenDisplayValues', function() {
                overrideDisplayValue();
            }, true);
        })
    .defineDirectiveForE('agms-strategy-commerce-portrait', [],
        function() {
            return {
                controller: "s.strategyCommerce.PortraitController",
                templateUrl: '/App/shared/strategyCommerce/strategyCommerce.portrait.html'
            };
        },
        {
            levelOfDetail: '=',
            strategy: "=",
            disableClicking: "=?",
            timestamp: "=?",
            disableClickStrategy: "=?"
        });