agmNgModuleWrapper('agmp.account')
    .defineController('p.account.ListingController',
        ['sStrategyCommerceService', 'commonColorGeneratorService'],
        function(vm, dep, tool) {
            var sStrategyCommerceService = dep.sStrategyCommerceService,
                commonColorGeneratorService = dep.commonColorGeneratorService,
                coreConfigService = dep.coreConfigService;

            tool.setVmProperties({
                getFilteredAccounts: getFilteredAccounts,
                generateDonutValues: generateDonutValues,
                viewAccountDetail: viewAccountDetail,
                viewAccountLink: viewAccountLink,
                viewDetails: viewDetails,
                liquidateAll: liquidateAll,
                coreConfigService: coreConfigService,
                getAccountObject: getAccountObject,
                hasDeficitStrategy: hasDeficitStrategy,
                openNewStrategy: sStrategyCommerceService.openNewStrategy
            });

            function getAccountObject(account) {
                return vm.myAccountObjects[account.BasicInfo.BrokerageAccountId];
            }

            function hasDeficitStrategy(strategies, account) {
                if (account.BasicInfo.AccountType === "CFD") {
                    var result = false;
                    strategies.forEach(function(s) {
                        if (s.CapitalInfo.TradingCapital > account.BasicInfo.BalanceForTrading) {
                            result = true;
                        }
                    });
                    return result;
                } else {
                    return false;
                }
            }

            function getFilteredAccounts() {
                return vm.myAccounts? vm.myAccounts.filter(function (x) {
                    return x.BasicInfo.BrokerageType === 'AM';
                }):[];
            }
            
            function viewDetails(type, id) {
                tool.openModalByDefinition('p.account.DetailController', {
                    type: type,
                    strategyId: id
                });
            }

            function liquidateAll(brokerAccountId, positionsToLiquidate, accountUnrealizedPl, currency, orderType) {
                tool.openModalByDefinition('p.account.LiquidateAllController', {
                    brokerAccountId: brokerAccountId,
                    positionsToLiquidate: positionsToLiquidate,
                    accountUnrealizedPl: accountUnrealizedPl,
                    currency: currency,
                    orderType: orderType
                });
            }
            
            function viewAccountDetail(account) {
                loadAccountDetail(account);
                selectAccountTab(account.BasicInfo.BrokerageAccountId, 1);
            }

            function viewAccountLink(account) {
                loadAccountDetail(account);
                selectAccountTab(account.BasicInfo.BrokerageAccountId, 2);
            }

            function loadAccountDetail(account) {
                var brokerAccountId = account.BasicInfo.BrokerageAccountId;
                var isUsedForStrategy = account.BasicInfo.IsUsedForStrategy;

                if (isUsedForStrategy) {
                    account.isLoadingAccountDetail = true;
                    sStrategyCommerceService.GetStrategiesForAccountLinkingView(brokerAccountId)
                        .then(function(res) {
                            vm.myAccountObjects[brokerAccountId].strategies = res.data;
                            generateAllocationData(brokerAccountId, res.data,
                                account.BasicInfo.BalanceForTrading, account.BasicInfo.Allocated);
                            account.isLoadingAccountDetail = false;
                        }, function(res) {
                            tool.logError("failed to retrieve linked strategies");
                            account.isLoadingAccountDetail = false;
                        });
                }
            }

            function generateAllocationData(brokerAccountId, data, balance, allocated) {
                var colors = commonColorGeneratorService.generateColors(data.length + 1);
                var strategyAllocationData = [];
                var strategyAllocationColors = [];
                data.forEach(function(x) {
                    strategyAllocationData.push(x.CapitalInfo.TradingCapital);
                });
                strategyAllocationColors = colors.slice(0, strategyAllocationData.length);
                strategyAllocationColors.push(colors[colors.length - 1]);
                strategyAllocationData.push(balance - allocated);
                vm.myAccountObjects[brokerAccountId].strategyAllocationData = strategyAllocationData;
                vm.myAccountObjects[brokerAccountId].strategyAlocationColors = strategyAllocationColors;
                vm.myAccountObjects[brokerAccountId].remainingAccount = balance - allocated;
            }

            function selectAccountTab(brokerAccountId, tabId) {
                if (vm.myAccountObjects[brokerAccountId].showTabs === tabId) {
                    vm.myAccountObjects[brokerAccountId].showTabs = 0;
                } else {
                    vm.myAccountObjects[brokerAccountId].showTabs = tabId;
                }
            }

            function generateDonutValues(acc) {
                var alloc = acc.BasicInfo.Allocated > 0 ? acc.BasicInfo.Allocated : 0;
                var remaining = acc.BasicInfo.Remaining > 0 ? acc.BasicInfo.Remaining : 0;
                return [alloc, remaining];
            }
        })
    .defineDirectiveForE('agmp-account-listing', [], function () {
        return {
            controller: 'p.account.ListingController',
            templateUrl: '/App/pages/account/account.listing.html'
        };
    }, {
        myAccounts: '=',
        myAccountObjects: '=',
        viewReal: '='
    });
