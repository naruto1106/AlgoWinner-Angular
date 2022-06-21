agmNgModuleWrapper('agmp.strategy')
    .defineControllerAsPopup('p.strategy.NewCapitalAllocationController',
        {
            templateUrl: '/App/pages/strategy/strategy.new.capitalAllocation.html',
            windowClass: 'mini-modal'
        },
        ['createStrategyModel', 'sStrategyCommerceService'],
        function(vm, dep, tool) {
            var createStrategyModel = dep.createStrategyModel,
                sStrategyCommerceService = dep.sStrategyCommerceService;
            var defaultCapitalAllocationPercentage = 0.2;

            vm.createStrategyModel = createStrategyModel;

            var request = {
                BrokerageAccountId: createStrategyModel.BrokerageDetail.BrokerageAccountId,
                Venue: createStrategyModel.Market.TradeVenueLoc
            };

            sStrategyCommerceService.GetAvailableBalanceForNewStrategyAllocation(request).then(function(res) {
                vm.tradeInfo = res.data;
                vm.allocatedCapital = Math.floor(vm.tradeInfo.AvailableBalance * defaultCapitalAllocationPercentage / 100) * 100;
            });
            vm.submit = function() {
                vm.uibClosePanel(vm.allocatedCapital);
            }
            vm.disableSubmit = function() {
                return vm.allocatedCapital < 0 || vm.errorMessage !== "";
            }
            vm.errorMessage = "";
            vm.evaluateCapitalAllocation = function() {
                var toFloat = parseFloat(vm.allocatedCapital);
                if (toFloat === 0 || toFloat) {
                    if (vm.allocatedCapital <= 0) {
                        vm.errorMessage = "Capital Allocation is invalid.";
                    } else if (vm.allocatedCapital > vm.tradeInfo.AvailableBalance) {
                        vm.errorMessage = "Capital Allocation exceeds the allowed limit.";
                    } else {
                        vm.errorMessage = "";
                    }
                } else {
                    vm.errorMessage = "Capital Allocation is invalid.";
                }
            }

            vm.roundDown = function(value) {
                var newValue = Math.floor(value * 100) / 100;
                return newValue;
            }
        }
    );
