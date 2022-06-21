agmNgModuleWrapper("agmp.payment")
    .defineController("p.payment.CreditController",
    ["sHeaderService", "pReferralService", 'sPaymentStripeService', 'coreNotificationService'],
    function (vm, dep, tool) {
        var sHeaderService = dep.sHeaderService,
            pReferralService = dep.pReferralService,
            sPaymentStripeService = dep.sPaymentStripeService,
            coreNotificationService = dep.coreNotificationService,
            coreUserStateService = dep.coreUserStateService;

        function getCreditTransactions() {
            return pReferralService.GetCreditTransactionsForUser().then(function (res) {
                vm.accountBalance.Balance = 0; 
                vm.creditTransactions = res.data;
                vm.creditTransactions.forEach(function(ct) {
                    vm.accountBalance.Total += ct.Amount * 100;
                });
                return vm.creditTransactions;
            });
        }

        tool.initialize(function () {
            tool.setVmProperties({
                isLoading: false,
                creditTransactions: [],
                accountBalance: {
                    Currency: "SGD",
                    Total: 0,
                    Balance: 0
                }
            });

            sHeaderService.selectMenu("setting", "setting");

            vm.isLoading = true;
            if (coreUserStateService.isLoggedIn() && !coreUserStateService.hasPendingLogoutConfirmation) {
                tool.onceAll([
                    sPaymentStripeService.GetStripeAccountBalance(),
                    getCreditTransactions()
                ]).then(function (ress) {
                    if (ress[0].data) {
                        vm.accountBalance.Balance = Math.abs(ress[0].data.Amount);
                        vm.accountBalance.Currency = ress[0].data.Currency;
                    }
                }, function () {
                    coreNotificationService.notifyError("Get Account Balance Error", "Sorry, we are unable to load this page. Please try again later.");
                }).finally(function() {
                    vm.isLoading = false;
                });
            }
        });
    });