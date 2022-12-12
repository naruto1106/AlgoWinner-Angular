agmNgModuleWrapper('agmp.account')
    .defineController('p.account.MainController', [
        'sAccountService', 'commonItemUpdateService', "sHeaderService", 'sLiveConnectService'
    ],
    function (vm, dep, tool) {
        var sAccountService = dep.sAccountService,
            coreUserStateService = dep.coreUserStateService,
            coreNotificationService = dep.coreNotificationService,
            commonItemUpdateService = dep.commonItemUpdateService,
            sLiveConnectService = dep.sLiveConnectService,
            coreConfigService = dep.coreConfigService,
            $scope = dep.$scope;

        var tigerDbRef = null;
        var futuDbRef = null;

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

            function refreshTigerFunction(snap) {
                if (!snap) return;

                var obj = snap.val();

                vm.realTigerAccounts = obj;

                // Otherwise the digest won't trigger on throttle
                $scope.$digest();
            }

            function refreshFutuFunction(snap) {
                if (!snap) return;

                var obj = snap.val();

                vm.realFutuAccounts = obj;

                // Otherwise the digest won't trigger on throttle
                $scope.$digest();
            }

            var refreshCount = 0;

            tool.onceAll([
                coreUserStateService.userInfoLoaded,
                sLiveConnectService.tigerFirebaseAuthed,
                sLiveConnectService.futuFirebaseAuthed,
                sLiveConnectService.loadInfo()
            ]).then(function () {
                vm.user = coreUserStateService.user;
                var uid = dep.coreDataStorageService.get("userId");
                tigerDbRef = firebase.database().ref().child('users/' + uid + '/accounts');
                futuDbRef = sLiveConnectService.getFutuFb().database().ref().child('users/' + uid + '/accounts');

                var throttledTigerCallback = _.throttle(refreshTigerFunction, 1000);
                tigerDbRef.on('value', throttledTigerCallback);

                tool.onDestroy(function () {
                    tigerDbRef.off('value'); // Unsubscrible the event if possible
                    console.log('Unsubscribed from Tiger Firebase');
                });

                var throttledFutuCallback = _.throttle(refreshFutuFunction, 1000);
                futuDbRef.on('value', throttledFutuCallback);

                tool.onDestroy(function () {
                    futuDbRef.off('value'); // Unsubscrible the event if possible
                    console.log('Unsubscribed from Futu Firebase');
                });

                //vm.isLoadingFirebaseData = false;
            }, function (values) {
                vm.isLoadingFirebaseData = false;
                tool.logError("Error in Live Trade initialization: ' " + values);
                if (refreshCount < 1) {
                    coreNotificationService.notifyErrorOkCancel(
                        "Error Live Trade",
                        "Elements of the page might not be loaded properly. Click OK to attempt reload or Cancel to do nothing.",
                        function (id) {
                            if (id === 0) {
                                init();
                                refreshCount++;
                            }
                        });
                } else {
                    coreNotificationService.notifyError("Error Live Trade", "The refresh did not work. Please check your network connection and try again.");
                }
            });

            dep.sHeaderService.selectMenu("account", "account");
        }

        function createLiveAccount() {
            return tool.openModalByDefinition('s.account.NewLiveController', {});
        }

        function deleteLiveAccount(account) {
            var onButtonClick = function (id) {
                if (id !== 0)
                    return null;
                sAccountService.DeleteAccount().then(function (res) {
                    coreNotificationService.notifySuccess("Live account deleted succesfully!");
                }, function (res) {
                    coreNotificationService.notifyError("Error deleting live account : " + res.data);
                });
            };
            coreNotificationService.notifyYesNo("Delete Live Account " + account.accountCode, "Are you sure to delete this account " + account.accountCode + "? This action cannot be undone!", onButtonClick);
        }

        tool.setVmProperties({
            realTigerAccounts: null,
            realFutuAccounts: null,
            myAccounts: null,
            myAccountObjects: null,
            isLoadingData: true,
            isLoadingFirebaseData: false,
            coreConfigService: coreConfigService,
            createLiveAccount: createLiveAccount,
            deleteLiveAccount: deleteLiveAccount
        });

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
