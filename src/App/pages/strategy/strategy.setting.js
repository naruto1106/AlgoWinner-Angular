agmNgModuleWrapper('agmp.strategy')
    .defineController('p.strategy.SettingController',
    [
        'sAccountService', "sHeaderService", 'sStrategyCommerceService', 'coreNotificationService',
        'commonItemUpdateService', 'coreConfigService', 'sDroidHelperSbsFrameworkService'
    ],
    function (vm, dep, tool) {

        var $location = dep.$location,
            sAccountService = dep.sAccountService,
            sStrategyCommerceService = dep.sStrategyCommerceService,
            coreUserStateService = dep.coreUserStateService,
            coreNotificationService = dep.coreNotificationService,
            commonItemUpdateService = dep.commonItemUpdateService,
            coreConfigService = dep.coreConfigService,
            sDroidHelperSbsFrameworkService = dep.sDroidHelperSbsFrameworkService;

        coreUserStateService.setSubmenu('SETTINGS');

        tool.on('strategySelectedFromScrollingSelection', handleStrategySelectedFromScrollingSelection);

        vm.coreConfigService = coreConfigService;        

        vm.deleteStrategy = sStrategyCommerceService.deleteStrategy;

        vm.isLoadingData = true;
        vm.myTradeSettings = [];

        // TODO: Variable of SELECT ACCOUNT, refactor somewhere
        // -----------------------------------------------------
        vm.strategySelections = [];
        vm.selectedStrategy = 0;
        vm.selectedAccount = {};
        vm.selectedStrategySetting = {};
        vm.openNewStrategy = sStrategyCommerceService.openNewStrategy;

        var myTradingAccounts = null;
        var selectedTradingAccountId = 0;

        // -----------------------------------------------------
        
        function getSelectedStrategySetting() {
            vm.selectedAccount = vm.myTradeSettings.filter(function (account) {
                return selectedTradingAccountId === account.BrokerageAccountId;
            })[0];

            if (vm.selectedAccount && vm.selectedAccount.StrategySettings) {
                if (vm.selectedStrategy === 0) {
                    vm.selectedStrategySetting = vm.selectedAccount.StrategySettings[0];
                } else {
                    vm.selectedStrategySetting = vm.selectedAccount.StrategySettings.filter(function (s) {
                        return s.StrategyId === vm.selectedStrategy.DisplayInfo.BasicInfo.StrategyId;
                    })[0];
                }
            }
        }

        function handleStrategySelectedFromScrollingSelection(event, newValue) {
            vm.selectedStrategy = newValue;
            selectedTradingAccountId = vm.selectedStrategy.BrokerageDetail.BrokerageAccountId;

            getSelectedStrategySetting();
        }

        function openAllocateCashBalancePopup(strategy, account, type) {
            tool.openModalByDefinition('p.strategy.AllocateCashBalanceController',
                {
                    strategy: strategy,
                    account: account,
                    type: type
                });
        }

        vm.allocateCashBalance = function (strategy, account, type) {
            if (account.Remaining <= 0 && type === "topUp") {
                coreNotificationService.notifyError("Top up capital not allowed",
                    "You have insufficient balance in your account to top up the strategy's capital.");
            } else if (strategy.TradingCapital <= 0 && type === "reduce") {
                coreNotificationService.notifyError("Reduce capital not allowed",
                    "The current strategy's capital is already zero or negative and cannot be further reduced.");
            } else {
                openAllocateCashBalancePopup(strategy, account, type);
            }
        }

        vm.editStrategy = function (strategyId) {
            tool.openModalByDefinition('p.strategy.EditController',
                {
                    strategyId: strategyId
                }).result.then(function () {
                    // TODO: Currently quickfix for reloading, check if signalR update is preferred
                    $location.search({ tradePortfolioId: vm.selectedStrategy.DisplayInfo.BasicInfo.StrategyId });
                    $location.path('/tradeportfoliosettings');
                    tool.reload();
                });
        }

        function processStrategyAccountUpdate(data) {
            vm.myTradeSettings.forEach(function (t) {
                t.StrategySettings.forEach(function (s) {
                    if (s.StrategyId === data.StrategyId &&
                        commonItemUpdateService.isLaterTimestamp(data, s)) {
                        s.TradingCapital = data.TradingCapital;
                        s.NAV = data.NAV;
                        s.CashBalance = data.CashBalance;
                        s.RealizedPL = data.RealizedPL;
                        s.UnrealizedPL = data.UnrealizedPL;
                        s.LongExposure = data.LongExposure;
                        s.ShortExposure = data.ShortExposure;
                        s.MarginUsed = data.MarginUsed;
                        s.MarginAvailable = data.MarginAvailable;
                    }
                });
            });
        }

        function init() {
            sAccountService.GetBrokerageAccountsSelectionUsedForTrading()
                .then(function (res) {
                    myTradingAccounts = res.data;

                    sStrategyCommerceService.GetTradePortfolioSelections().then(function (res3) {
                        vm.strategySelections = [];

                        //add real broker portfolio
                        vm.strategySelections = vm.strategySelections.concat(res3.data.StrategyForTradingModels);

                        if (vm.strategySelections.length > 0) {
                            var urlParams = $location.search();
                            if (urlParams && urlParams.tradePortfolioId) {
                                var strategyWithMatchingId = vm.strategySelections.filter(function (s) {
                                    return s.DisplayInfo.BasicInfo.StrategyId ===
                                        parseInt(urlParams.tradePortfolioId);
                                });
                                vm.selectedStrategy = strategyWithMatchingId && strategyWithMatchingId[0];
                            }
                            if (!vm.selectedStrategy) {
                                vm.selectedStrategy = vm.strategySelections[0];
                            }
                            selectedTradingAccountId = vm.selectedStrategy.BrokerageDetail.BrokerageAccountId;
                        }

                        vm.isLoadingData = true;
                        sStrategyCommerceService.GetTradeSettings()
                            .then(function (res2) {
                                    vm.myTradeSettings = res2.data;
                                    getSelectedStrategySetting();
                                    vm.isLoadingData = false;
                                },
                                function (res2) {
                                    coreNotificationService.notifyError("Error retrieving trade settings",
                                        "Error! " + (data && data.Message));
                                    vm.isLoadingData = false;
                            });

                        tool.signalRNotification('StrategyCapitalChanged', processStrategyAccountUpdate);
                        tool.signalRNotification('DeveloperAccountUpdated', processStrategyAccountUpdate);

                        sDroidHelperSbsFrameworkService.defineFlow('TradePortfolioSettings')
                            .havingStep('1',
                                function (flowControl) {
                                    flowControl.highlightAndCommentItems([
                                        {
                                            itemId: 'tradePortfolioSettings.strategySelection'
                                        }
                                    ]);
                                    if (vm.strategySelections.length >= 10) {
                                        flowControl.sayAndStartStep("Toggle between the trade portfolios",
                                            null,
                                            '2-1');
                                    } else {
                                        flowControl.sayAndStartStep("Toggle between the trade portfolios",
                                            null,
                                            '2');
                                    }
                                })
                            .havingStep('2',
                                function (flowControl) {
                                    flowControl.highlightAndCommentItems([
                                        {
                                            itemId: 'sharedHeaderTrade.createTradePortfolio'
                                        },
                                        {
                                            itemId: 'tradePortfolioSettings.deleteTradePortfolios'
                                        },
                                        {
                                            itemId: 'tradePortfolioSettings.editTradePortfolios'
                                        }
                                    ]);
                                    flowControl.sayAndStartStep(
                                        "Add new or manage existing trade portfolios",
                                        null,
                                        '3');
                                })
                            .havingStep('2-1',
                                function (flowControl) {
                                    flowControl.highlightAndCommentItems([
                                        {
                                            itemId: 'tradePortfolioSettings.deleteTradePortfolios'
                                        },
                                        {
                                            itemId: 'tradePortfolioSettings.editTradePortfolios'
                                        }
                                    ]);
                                    flowControl.sayAndStartStep(
                                        "Add new or manage existing trade portfolios",
                                        null,
                                        '3');
                                })
                            .havingStep('3',
                                function (flowControl) {
                                    flowControl.highlightAndCommentItems([
                                        {
                                            itemId: 'tradePortfolioSettings.cashAllocation'
                                        }
                                    ]);
                                    flowControl.sayAndStartStep("Reassign funds to the portfolio",
                                        null,
                                        '4');
                                })
                            .havingStep('4',
                                function (flowControl) {

                                    flowControl.sayAndFinish("Finish this tour");
                                });
                        sDroidHelperSbsFrameworkService.setCurrentFlowName('TradePortfolioSettings', '1');
                    }, function (res4) {
                    });
                }, function (res) {
                    coreNotificationService.notifyError('Loading Trading Accounts',
                        "Error Loading Trading Accounts: Elements of the page might not be loaded properly.");
                });            

            dep.sHeaderService.selectMenu("trade", "trade-setting");
        }

        if (coreUserStateService.isLoggedIn() && !coreUserStateService.hasPendingLogoutConfirmation) {
            init();
        }
    });