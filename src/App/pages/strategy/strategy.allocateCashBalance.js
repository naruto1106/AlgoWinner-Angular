agmNgModuleWrapper('agmp.strategy')
    .defineControllerAsPopup('p.strategy.AllocateCashBalanceController',
    {
        templateUrl: '/App/pages/strategy/strategy.allocateCashBalance.html',
        windowClass: 'mini-modal'
    },
        ['strategy', 'sStrategyCommerceService', 'account', 'type', 'sOrdersPadHelperService'],
        function(vm, dep, tool) {

            var $location = dep.$location,
                type = dep.type,
                account = dep.account,
                strategy = dep.strategy,
                sStrategyCommerceService = dep.sStrategyCommerceService,
                coreNotificationService = dep.coreNotificationService,
                maxAllocation = 0;

            function refreshValue() {
                if (vm.newValue) {
                    vm.invalidValue = false;
                } else {
                    vm.invalidValue = true;
                }
                if (type === "topUp" && vm.newValue != null && vm.newValue <= maxAllocation) {
                    vm.capital.NAV = strategy.NAV + parseFloat(vm.newValue);
                    vm.capital.TradingCapital = strategy.TradingCapital + parseFloat(vm.newValue);
                    vm.capital.AvailableBalance = maxAllocation - parseFloat(vm.newValue);
                    vm.capital.CashBalance = strategy.CashBalance + parseFloat(vm.newValue);
                } else if (type === "reduce" && vm.newValue != null && vm.newValue <= strategy.TradingCapital) {
                    vm.capital.NAV = strategy.NAV - parseFloat(vm.newValue);
                    vm.capital.TradingCapital = strategy.TradingCapital - parseFloat(vm.newValue);
                    vm.capital.AvailableBalance = maxAllocation + parseFloat(vm.newValue);
                    vm.capital.CashBalance = strategy.CashBalance - parseFloat(vm.newValue);
                } else {
                    vm.capital = {
                        NAV: strategy.NAV,
                        TradingCapital: strategy.TradingCapital,
                        AvailableBalance: maxAllocation,
                        CashBalance: strategy.CashBalance
                    }
                }
                vm.strategy.CurrentSetup.Allocation = vm.capital.CashBalance;
            }

            vm.saveChanges = function(s) {
                return sStrategyCommerceService.ModifyTradeSettings(s.CurrentSetup).then(function() {
                    vm.uibDismissPanel();
                    return coreNotificationService.notifySuccess("Success",
                        "Trade settings for '" + s.Name + "' is updated").result.then(function() {
                        // TODO: Hard refresh solution for now
                            tool.reload();
                        $location.search({ tradePortfolioId: strategy.StrategyId });
                        $location.path('/tradeportfoliosettings');
                    });
                }, function(res) {
                    coreNotificationService.notifyError("Error updating trade settings '" + strategy.Name + "'",
                        "Error! " + (res.data && res.data.Message));
                });
            }

            function disableSubmit() {
                if (type === "topUp") {
                    return !(vm.newValue >= 0 && vm.newValue <= maxAllocation && vm.newValue != null);
                }
                if (type === "reduce") {
                    return !(vm.newValue >= 0 && vm.newValue <= strategy.TradingCapital && vm.newValue != null);
                }
                return !(vm.newValue >= 0 && vm.newValue != null);
            }

            function roundDown(value) {
                var newValue = Math.floor(value * 100) / 100;
                return newValue;
            }

            tool.initialize(function() {
                tool.setVmProperties({
                    type: dep.type,
                    strategy: dep.strategy,
                    newValue: null,
                    capital: {
                        NAV: dep.strategy.NAV,
                        TradingCapital: dep.strategy.TradingCapital,
                        AvailableBalance: maxAllocation,
                        CashBalance: dep.strategy.CashBalance
                    },
                    disableSubmit: disableSubmit,
                    refreshValue: refreshValue,
                    roundDown: roundDown,
                    invalidValue: false
                });

                vm.isLoading = true;
                var exchangeRatePromise = dep.sOrdersPadHelperService.getExchangeRates();
                exchangeRatePromise.then(function(getExchangeRate) {
                    maxAllocation = getExchangeRate(account.BrokerCurrency, strategy.Currency) * account.Remaining;
                    vm.capital.AvailableBalance = maxAllocation;
                    vm.maxAllocation = maxAllocation;
                    vm.isLoading = false;
                });
            });
        });