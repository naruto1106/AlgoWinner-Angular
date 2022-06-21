agmNgModuleWrapper('agmp.payment')
    .defineController('p.payment.TransactionHistoryController',
    ['sPaymentStripeService', 'sTradingExchangeRateService', "sHeaderService"],
    function (vm, dep, tool) {

        var sPaymentStripeService = dep.sPaymentStripeService,
            coreNotificationService = dep.coreNotificationService,
            sTradingExchangeRateService = dep.sTradingExchangeRateService,
            coreUserStateService = dep.coreUserStateService,
            sHeaderService = dep.sHeaderService;

        // --- LOCAL SERVICE FUNC
        function getMonths() {
            var date = new Date();
            var months = [],
                monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            for (var i = 0; i < 12; i++) {
                var eachMonth = {
                    name: monthNames[date.getMonth()] + ' ' + date.getFullYear(),
                    fromDate: moment([date.getFullYear(), date.getMonth()]).format(),
                    toDate: moment([date.getFullYear(), date.getMonth()]).endOf('month').format()
                }
                months.push(eachMonth);
                date.setDate(1);
                date.setMonth(date.getMonth() - 1);
            }
            return months;
        }

        // --- SCOPE 
        function loadTransactionHistoryByFilter(filter) {
            if (!filter) {
                filter = vm.transactionFilter;
            }
            vm.isLoadingTransactionHistory = true;
            var newFilter = {
                From: new Date(moment.utc(moment(filter.fromDate).startOf('day')).format()),
                To: new Date(moment.utc(moment(filter.toDate).endOf('day')).format())
            };
            vm.myCharges = [];
            sPaymentStripeService.GetChargesForCustomer(newFilter.From, newFilter.To)
                .then(function (res) {
                    vm.myCharges = res.data;
                    var transactionAmountDictionary = {};
                    if (vm.myCharges != null) {
                        vm.myCharges = vm.myCharges.filter(function (c) {
                            return c.Paid;
                        });
                        vm.myCharges.forEach(function (charge) {
                            if (charge.Currency.toUpperCase() in transactionAmountDictionary) {
                                transactionAmountDictionary[charge.Currency.toUpperCase()] += charge.Amount - charge.AmountRefunded;
                            } else {
                                transactionAmountDictionary[charge.Currency.toUpperCase()] = charge.Amount - charge.AmountRefunded;
                            }
                        });
                    }
                    vm.transactionTotalAmount = {};
                    for (var key1 in transactionAmountDictionary) {
                        if (transactionAmountDictionary.hasOwnProperty(key1)) {
                            vm.transactionTotalAmount[key1] = 0;
                            for (var key2 in transactionAmountDictionary) {
                                vm.transactionTotalAmount[key1] += transactionAmountDictionary[key2] * vm.exchangeRates[key2 + "_" + key1];
                            }
                        }
                    }

                    vm.isLoadingTransactionHistory = false;
                }, function (res) {
                    dep.$log.error("Unable to get invoice items", "Error! " + (res.data && res.data.Message));
                    vm.isLoadingTransactionHistory = false;
                });
        }

        function showPagination() {
            return vm.models.numPages > 1;
        }

        function getPagedCharges() {
            return _.take(_.drop(vm.myCharges, (vm.models.currentPage - 1) * 10), 10);
        }

        tool.initialize(function () {
            tool.setVmProperties({
                myCharges: [],
                isLoadingTransactionHistory: true,
                transactionMonths: getMonths(),
                transactionFilter: {
                    fromDate: moment().subtract(30, 'days').startOf('day').format(),
                    toDate: moment().endOf('day').format()
                },
                models: {
                    currentPage: 1,
                    numPages: 0
                },
                selectedTransactionMonth: {},
                loadTransactionHistoryByFilter: loadTransactionHistoryByFilter,
                showPagination: showPagination,
                getPagedCharges: getPagedCharges
            });

            if (coreUserStateService.isLoggedIn() && !coreUserStateService.hasPendingLogoutConfirmation) {
                sTradingExchangeRateService.GetAllExchangeRates().then(function (res) {
                    var rates = _.chain(res.data)
                        .indexBy("CurrencyPair")
                        .mapValues("Rate")
                        .value();
                    return rates;
                }).then(function (rates) {
                    vm.exchangeRates = rates;
                    loadTransactionHistoryByFilter(vm.transactionFilter);
                }, function (res) {
                    coreNotificationService.notifyError("failed to retrieve exchange rate");
                });
            }

            sHeaderService.selectMenu("setting", "setting");
        });
    })
    .defineDirectiveForE('agms-payment-transaction-history', [],
    function () {
        return {
            controller: "p.payment.TransactionHistoryController",
            templateUrl: '/App/pages/payment/payment.transactionHistory.html'
        };
    }, {

    });