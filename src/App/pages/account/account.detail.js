agmNgModuleWrapper('agmp.account')
    .defineControllerAsPopup('p.account.DetailController',
    {
        templateUrl: '/App/pages/account/account.detail.html',
        windowClass: 'full-size-modal'
    },
    ['sStrategyCommerceService', 'commonItemUpdateService', 'type', 'strategyId'],
    function (vm, dep, tool) {
        var sStrategyCommerceService = dep.sStrategyCommerceService,
            commonItemUpdateService = dep.commonItemUpdateService,
            type = dep.type,
            strategyId = dep.strategyId;

        vm.strategy = null;

        function processStrategyAccountUpdate(data) {
            if (vm.strategy.DisplayInfo.BasicInfo.StrategyId == data.StrategyId
                && commonItemUpdateService.isLaterTimestamp(data, vm.strategy.CapitalInfo)) {
                vm.strategy.CapitalInfo = angular.copy(data);
            }
        }

        function init() {
            if (type === 1) {
                tool.signalRNotification('DeveloperAccountUpdated', processStrategyAccountUpdate);
                sStrategyCommerceService.GetStrategyForAccountDetail(strategyId)

                    .then(function (res) {
                        vm.strategy = res.data;
                    }, function (res) {
                        tool.logError("failed to retrieve strategy");
                    });
            }
        }

        tool.initialize(init);
    });