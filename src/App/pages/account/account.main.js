agmNgModuleWrapper('agmp.account')
    .defineController('p.account.MainController', [
        'sAccountService', 'commonItemUpdateService', "sHeaderService"
    ],
    function (vm, dep, tool) {
        var sAccountService = dep.sAccountService,
            coreUserStateService = dep.coreUserStateService,
            coreNotificationService = dep.coreNotificationService,
            commonItemUpdateService = dep.commonItemUpdateService;

        tool.setVmProperties({
            myAccounts: null,
            myAccountObjects: null,
            isLoadingData: true,
        });

        function processStrategyCapitalUpdate(data) {
            vm.myAccounts.forEach(function (a) {
                vm.myAccountObjects[a.BasicInfo.BrokerageAccountId].strategies.forEach(function (s) {
                    if (data.StrategyId === s.DisplayInfo.BasicInfo.StrategyId
                        && commonItemUpdateService.isLaterTimestamp(data, s.CapitalInfo)) {
                        s.CapitalInfo.NAV = data.NAV;
                        s.CapitalInfo.TradingCapital = data.TradingCapital;
                        s.CapitalInfo.CashBalance = data.CashBalance;
                    }
                });
            });
        }

        function processAccountBalanceUpdate(data) {
            vm.myAccounts.forEach(function (a) {
                if (a.BasicInfo.BrokerageAccountId === data.BasicInfo.BrokerageAccountId
                    && commonItemUpdateService.isLaterTimestamp(data, a)) {
                    angular.merge(a, data);
                }
            });
        }

        function processAccountConnectionUpdate() {

        }

        function init() {
            tool.signalRNotification('BrokerageAccountUpdated', processAccountBalanceUpdate);
            tool.signalRNotification('DeveloperAccountUpdated', processStrategyCapitalUpdate);
            tool.signalRNotification('AccountConnectionUpdated', processAccountConnectionUpdate);

            sAccountService.GetBrokerageAccountsDetail().then(function (res) {
                //hide replication account
                vm.myAccounts = res.data.filter(function (a) {
                    return ((a.BasicInfo.BrokerageType !== 'AM')
                        || _.startsWith(a.BasicInfo.AccountNumber, "T"));
                });

                vm.myAccountObjects = {};

                vm.myAccounts.forEach(function (a) {
                    var brokerageAccountId = a.BasicInfo.BrokerageAccountId;
                    vm.myAccountObjects[brokerageAccountId] = {
                        strategies: [],
                        portfolios: [],
                        showTabs: 0
                    };
                });

                vm.isLoadingData = false;
            }, function (res) {
                coreNotificationService.notifyError("Error", "An error occurred trying to retrieve your brokerage accounts. Please refresh the page again.");
                tool.logError("failed to retrieve brokerage accounts");
                vm.isLoadingData = false;
            });

            dep.sHeaderService.selectMenu("account", "account");
        }

        tool.initialize(function () {
            if (coreUserStateService.isLoggedIn() && !coreUserStateService.hasPendingLogoutConfirmation) {
                init();
            }
        });
    })
    .ngApp
    .filter('strategyStatus', function () {
        return function (status) {
            if (status !== 'Linked' && status !== 'Published') {
                return 'Inactive';
            } else {
                return 'Active';
            }
        };
    });
