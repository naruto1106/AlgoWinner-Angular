agmNgModuleWrapper('agms.account')
    .defineController('s.account.ManagerController', ['sAccountService'],
        function(vm, dep, tool) {

            var sAccountService = dep.sAccountService,
                coreNotificationService = dep.coreNotificationService;


            tool.setVmProperties({
                addBrokerModel: {},

                selectedAccount: null,
                isExistingAccount: true,
                isAddNewBrokerageAccount: false,

                onModelCreated: onModelCreated,
                onSelectedAccountChanged: onSelectedAccountChanged,
                generateDonutValues: generateDonutValues,
                disableSubmit: disableSubmit,
                onSelectedTabChanged: onSelectedTabChanged,
            });

            function disableSubmit() {
                vm.canContinue = !(!vm.selectedAccount && !vm.linkStatus);

                return !vm.canContinue;
            }

            function generateDonutValues(acc) {
                var alloc = acc.Allocated > 0 ? acc.Allocated : 0;
                var remaining = acc.Remaining > 0 ? acc.Remaining : 0;
                return [remaining, alloc];
            }

            function onModelCreated() {
                init();
                vm.isExistingAccount = true;
                evaluateTabIndex();
            }

            function resetDefaultSelection() {
                if (vm.accounts) {
                    vm.selectedAccount = vm.accounts[0];
                }
            }

            function evaluateTabIndex() {
                vm.tabIndex = vm.isExistingAccount ? 0 : 1;
            }

            function selectExisting() {
                vm.isExistingAccount = true;
                vm.isAddNewBrokerageAccount = false;
                evaluateTabIndex();


                resetDefaultSelection();
                onSelectedAccountChanged();
            }

            function selectNew() {
                vm.isExistingAccount = false;
                vm.isAddNewBrokerageAccount = true;
                evaluateTabIndex();

            }

            function onSelectedAccountChanged() {
                if (vm.selectedAccount) {
                    vm.editModel.BrokerageAccountId = vm.selectedAccount.SelectionInfo.BrokerageAccountId;
                    vm.editModel.AccountNumber = vm.selectedAccount.SelectionInfo.AccountNumber;
                    vm.editModel.AccountType = vm.selectedAccount.AccountType;
                    vm.editModel.BrokerageType = vm.selectedAccount.SelectionInfo.BrokerageType;
                    vm.editModel.BalanceForTrading = vm.selectedAccount.BalanceForTrading;
                }
            }

            function onSelectedTabChanged(selection) {
                if (selection === 0) {
                    resetDefaultSelection();
                    onSelectedAccountChanged();
                } else {
                    // Reset content when add account tab is selected
                    vm.selectedAccount = null;
                }
            }

            function onGetAccountSuccessful(res) {
                var resModel = res.data;
                vm.accounts = resModel.AvailableBrokerList.filter(function (x) {
                    return x.SelectionInfo.BrokerageType === 'AM';
                });

                vm.compatibleAccounts = resModel.CompatibleBrokerList;

                if (vm.accounts.length > 0) {
                    vm.accountLinkingOptions = [
                        { value: 0, name: "-- Use existing brokerage account --" },
                        { value: 1, name: "-- Add new brokerage account --" }
                    ];
                    selectExisting();
                } else {
                    vm.accountLinkingOptions = [
                        { value: 1, name: "-- Add new brokerage account --" }
                    ];
                    selectNew();
                }
            }

            function onGetAccountFailed(res) {
                coreNotificationService.notifyError("Get Account Error! " + (res.data && res.data.Message));
            }

            function init() {
                if (!vm.linkStatus) {
                    sAccountService.GetBrokerageAccountsForStrategyLinking(vm.marketInfo)
                        .then(onGetAccountSuccessful, onGetAccountFailed);
                }
            }

            init();
        }
    )
    .defineDirectiveForE('agms-account-manager', [],
        function() {
            return {
                controller: "s.account.ManagerController",
                templateUrl: '/App/shared/account/account.manager.html',
            };
        }, {
            editModel: "=",
            canContinue: '=?',
            linkStatus: "=",
            marketInfo: "=",
            nextFunc: "&",
            prevFunc: "&",
            nextLabel: "=",
            prevLabel: "="
        });