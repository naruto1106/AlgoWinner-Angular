agmNgModuleWrapper('agms.trading')
    .defineController('s.trading.SetupController', [],
        function(vm, dep, tool) {
            vm.executionChannels = ['AlgoMerchant Platform', 'AlgoMerchant API'];
            vm.showContactUs = showContactUs;
            vm.canSubmit = canSubmit;

            function canSubmit() {
                vm.canContinue = !(vm.strategyModel.TradingSetup.ExecutionChannel === 'AlgoMerchant API');
                return vm.canContinue;
            }

            function showContactUs() {
                tool.openModalByDefinition('s.misc.ContactUsController');
            }

            if (!vm.strategyModel.TradingSetup) {
                vm.strategyModel.TradingSetup =
                {
                    ExecutionChannel: vm.executionChannels[0]
                };
            }
        })
    .defineDirectiveForE('agms-trading-setup', [],
        function() {
            return {
                controller: "s.trading.SetupController",
                templateUrl: '/App/shared/trading/trading.setup.html'
            };
        }, {
            strategyModel: "=",
            nextFunc: "&",
            prevFunc: "&",
            nextLabel: "=",
            prevLabel: "=",
            canContinue: '=?'
        });