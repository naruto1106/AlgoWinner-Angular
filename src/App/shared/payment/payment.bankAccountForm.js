agmNgModuleWrapper('agms.payment')
    .defineController('s.payment.BankAccountFormController',
    ['sPaymentStripeService', 'Common', '$uibModal', 'sUserService'],
    function (vm, dep, tool) {

        var sPaymentStripeService = dep.sPaymentStripeService,
            coreNotificationService = dep.coreNotificationService,
            sUserService = dep.sUserService,
            coreConfigService = dep.coreConfigService;

        var originalBankAccount = {};

        // --- LOCAL SERVICE FUNC
        function initializeBankAccount() {
            vm.bankAccount = {
                BankAccountNumber: "",
                BankAccountHolderFirstName: "",
                BankAccountHolderLastName: "",
                BankCode: "",
                BranchCode: "",
                Currency: "SGD",
                CountryId: 205,
                State: "",
                City: "",
                AddressLine1: "",
                AddressLine2: "",
                PostalCode: "",
                DateOfBirth: ""
            };
            vm.dateOfBirth = {
                Day: "",
                Month: "",
                Year: ""
            };
        }

        // --- SCOPE FUNC
        function showContactUs() {
            tool.openModalByDefinition('s.misc.ContactUsController');
        }

        function getCountryName(countryId) {
            if (vm.countries && vm.countries.length > 0) {
                var country = vm.countries.filter(function (ctry) {
                    return ctry.CountryId == countryId;
                })[0];
                if (country) return country.CountryName;
            }
            return "";
        }

        function submit() {
            vm.isSubmitting = true;
            if (vm.isEdit) {
                var bankAccountToEdit = {
                    BankAccountId: vm.bankAccount.BankAccountId,
                    BankAccountNumber: vm.bankAccount.BankAccountNumber,
                    BankAccountHolderFirstName: vm.bankAccount.BankAccountHolderFirstName,
                    BankAccountHolderLastName: vm.bankAccount.BankAccountHolderLastName,
                    RoutingNumber: vm.bankAccount.BankCode + "-" + vm.bankAccount.BranchCode,
                    CountryId: vm.bankAccount.CountryId,
                    Currency: vm.bankAccount.Currency,
                    State: vm.bankAccount.State,
                    City: vm.bankAccount.City,
                    AddressLine1: vm.bankAccount.AddressLine1,
                    AddressLine2: vm.bankAccount.AddressLine2,
                    PostalCode: vm.bankAccount.PostalCode,
                    DateOfBirth: vm.dateOfBirth.Day + "-" + vm.dateOfBirth.Month + "-" + vm.dateOfBirth.Year
                }
                sPaymentStripeService.UpdateExistingBankAccount(bankAccountToEdit).then(function () {
                    coreNotificationService.notifySuccess("Success", "Your changes have been successfully saved.");
                    vm.isSubmitting = false;
                    vm.isEdit = false;
                    vm.isNew = false;
                    if (vm.deferredCompletion) {
                        vm.deferredCompletion.resolve();
                    }
                }, function () {
                    vm.isSubmitting = false;
                    coreNotificationService.notifyError("Update Bank Account Error", "Sorry, we are unable to save your bank account at this moment. Please check your bank account details or try again later.");
                    if (vm.deferredCompletion) {
                        vm.deferredCompletion.reject();
                    }
                });
            } else {
                var bankAccountToAdd = {
                    BankAccountNumber: vm.bankAccount.BankAccountNumber,
                    BankAccountHolderFirstName: vm.bankAccount.BankAccountHolderFirstName,
                    BankAccountHolderLastName: vm.bankAccount.BankAccountHolderLastName,
                    RoutingNumber: vm.bankAccount.BankCode + "-" + vm.bankAccount.BranchCode,
                    CountryId: vm.bankAccount.CountryId,
                    Currency: vm.bankAccount.Currency,
                    State: vm.bankAccount.State,
                    City: vm.bankAccount.City,
                    AddressLine1: vm.bankAccount.AddressLine1,
                    AddressLine2: vm.bankAccount.AddressLine2,
                    PostalCode: vm.bankAccount.PostalCode,
                    DateOfBirth: vm.dateOfBirth.Day + "-" + vm.dateOfBirth.Month + "-" + vm.dateOfBirth.Year,
                    TermsOfServiceAcceptanceIp: ""
                }
                sPaymentStripeService.AddBankAccount(bankAccountToAdd).then(function (res) {
                    coreNotificationService.notifySuccess("Success", "Your bank account has been successfully added.");
                    vm.isSubmitting = false;
                    vm.isEdit = false;
                    vm.isNew = false;
                    vm.bankAccount.BankAccountId = res.data;
                    if (vm.deferredCompletion) {
                        vm.deferredCompletion.resolve();
                    }
                }, function () {
                    vm.isSubmitting = false;
                    coreNotificationService.notifyError("Add Bank Account Error", "Sorry, we are unable to save your bank account at this moment. Please check your bank account details or try again later.");
                    if (vm.deferredCompletion) {
                        vm.deferredCompletion.reject();
                    }
                });
            }
        }

        function deleteBankAccount() {
            coreNotificationService.notifyYesNo("Delete Bank Account", "Are you sure you want to delete your bank account?", function (id) {
                if (id === 0) {
                    var bankAccountToDelete = {
                        BankAccountId: vm.bankAccount.BankAccountId
                    }
                    sPaymentStripeService.DeleteBankAccount(bankAccountToDelete).then(function () {
                        coreNotificationService.notifySuccess("Delete Bank Account Success", "Your bank account has been successfully removed.");
                        vm.isNew = true;
                        vm.isEdit = false;
                        initializeBankAccount();
                    }, function () {
                        coreNotificationService.notifyError("Error Deleting Bank Account", "Sorry, an error occurred. Please try again later.");
                    });
                }
            });
        }

        function isFormInvalid() {
            return !vm.bankAccountForm.$valid || !vm.termsChecked ||
                vm.dateOfBirth.Day === "" || vm.dateOfBirth.Month === "" || vm.dateOfBirth.Year === "";
        }

        function setEdit() {
            vm.isEdit = true;
            angular.copy(vm.bankAccount, originalBankAccount);
        }

        function cancelEdit() {
            vm.isEdit = false;
            angular.copy(originalBankAccount, vm.bankAccount);
        }

        tool.initialize(function () {
            tool.setVmProperties({
                isLoadingBankAccounts: true,
                isNew: true,
                isEdit: false,
                isSubmitting: false,
                termsChecked: false,
                years: [],
                months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                days: [],
                dateOfBirth: {
                    Day: "",
                    Month: "",
                    Year: ""
                },
                countries: [],
                currencies: coreConfigService.Stripe.SupportedCurrencies.split(","),

                showContactUs: showContactUs,
                getCountryName: getCountryName,
                submit: submit,
                deleteBankAccount: deleteBankAccount,
                isFormInvalid: isFormInvalid,
                setEdit: setEdit,
                cancelEdit: cancelEdit
            });

            var paymentSupportedCountries = coreConfigService.Stripe.SupportedCountries;

            sUserService.GetCountries()
                .then(function (res) {
                    res.data.forEach(function (country) {
                        if (paymentSupportedCountries.indexOf(country.CountryName) > -1) {
                            vm.countries.push(country);
                        }
                    });
                }, function (res) {
                    tool.logError("Unable to get countries", "Error! " + (res.data && res.data.Message));
                });

            //Get existing bank account
            sPaymentStripeService.GetAllBankAccounts()
                .then(function (res) {
                    vm.isLoadingBankAccounts = false;
                    if (res.data && res.data.length > 0) {
                        var acc = res.data[0];
                        vm.bankAccount = {
                            BankAccountId: acc.BankAccountId,
                            BankAccountNumber: acc.BankAccountNumber,
                            BankAccountHolderFirstName: acc.BankAccountHolderFirstName,
                            BankAccountHolderLastName: acc.BankAccountHolderLastName,
                            BankCode: acc.RoutingNumber.split('-')[0],
                            BranchCode: acc.RoutingNumber.split('-')[1],
                            Currency: acc.Currency,
                            CountryId: acc.Country.CountryId,
                            State: acc.State,
                            City: acc.City,
                            AddressLine1: acc.AddressLine1,
                            AddressLine2: acc.AddressLine2,
                            PostalCode: acc.PostalCode
                        }
                        vm.dateOfBirth = {
                            Day: acc.DateOfBirth.split('-')[0],
                            Month: acc.DateOfBirth.split('-')[1],
                            Year: acc.DateOfBirth.split('-')[2]
                        };
                        vm.countryName = acc.Country.CountryName;
                        vm.isNew = false;
                    }
                }, function (res) {
                    tool.logError("Unable to get bank accounts", "Error! " + (res.data && res.data.Message));
                    vm.isLoadingBankAccounts = false;
                });

            var date = new Date();
            var n = date.getFullYear();
            for (var i = n; i >= 1930; i--) {
                vm.years.push(i.toString());
            }
            for (var j = 1; j <= 31; j++) {
                vm.days.push(j.toString());
            }

            initializeBankAccount();
        });
    })
    .defineDirectiveForE('agms-payment-bank-account-form', [],
    function () {
        return {
            controller: "s.payment.BankAccountFormController",
            templateUrl: '/App/shared/payment/payment.bankAccountForm.html'
        };
    }, {
        deferredCompletion: "=?",
        isSubmitting: '=?'
    });