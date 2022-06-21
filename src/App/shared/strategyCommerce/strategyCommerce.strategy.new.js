agmNgModuleWrapper('agms.strategyCommerce')
    .defineControllerAsPopup('p.strategy.NewController',
    {
        templateUrl: "/App/shared/strategyCommerce/strategyCommerce.strategy.new.html",
        windowClass: 'full-size-modal'
    },
    ['sStrategyCommerceService', 'sAccountService'],
    function (vm, dep, tool) {
        var sStrategyCommerceService = dep.sStrategyCommerceService,
            coreSignalRNotificationService = dep.coreSignalRNotificationService,
            coreNotificationService = dep.coreNotificationService,
            coreConfigService = dep.coreConfigService,
            sAccountService = dep.sAccountService;

        tool.setVmProperties({
            hasBroker: false,
            getProgressStepState: getProgressStepState,
            isSubmitting: false,
            setStep: setStep,
            submit: submit,
            submitNew: submitNew,
            canContinue: [],
            currentStepName: 'basic-info',
            createStrategyModel: {
                BasicInfo: {
                    Name: "",
                    Description: "",
                    TradeDuration: { Operator: "<", DurationType: "Month", Length: 3 },
                    Categories: []
                },
                BrokerageDetail: {
                    BrokerageAccountId: null,
                    AccountNumber: null,
                    AccountType: null,
                    BrokerageType: null
                },
                TradingSetup: {
                    ExecutionChannel: "AlgoMerchant Platform"
                }
            },
            brokerSelections: [{
                Name: "IG",
                ImageUrl: "//am708403.azureedge.net/images/broker/ig.png",
                ForgetPasswordLink: "https://www.ig.com/sg/lost-details"
            }],
            selectedBroker: {
                Name: "IG",
                ImageUrl: "//am708403.azureedge.net/images/broker/ig.png"
            },
            brokerModel: {
                BrokerageType: "IG",
                UserName: "",
                Password: "",
                ApiKey: ""
            }
        });

        function getProgressStepState() {
            var nextStepName = vm.currentStepName;

            if (nextStepName === 'basic-info') {
                if (vm.canContinue['basic-info']) {
                    nextStepName = 'market';
                }
            }
            if (vm.hasBroker) {
                if (nextStepName === 'market') {
                    nextStepName = 'broker-linkage';
                }
                if (nextStepName === 'broker-linkage') {
                    if (vm.canContinue['broker-linkage']) {
                        nextStepName = 'trading-setup';
                    }
                }
            } else {
                if (nextStepName === 'market') {
                    if (vm.canContinue['market']) {
                        nextStepName = 'trading-setup';
                    }
                }
            }

            return nextStepName;
        }

        function setStep(currentStepName) {
            vm.currentStepName = currentStepName;
        }

        function createStrategy() {
            vm.isSubmitting = true;
          
            return sStrategyCommerceService.CreateNewStrategy(vm.createStrategyModel).then(function (res) {
                var strategyId = res.data;
                var param = { StrategyId: strategyId };
                tool.onceAll([
                    coreSignalRNotificationService.invoke('ListenToStrategy', param)
                ]).then(
                    function () {
                        tool.log("Listening to Strategy " + strategyId);
                    },
                    function () {
                        tool.logError("Error invoking listen to strategy");
                    });
                return coreNotificationService.notifySuccess("Success", "Trade Portfolio Created").result
                    .then(
                    function () {
                        closePopup(strategyId);
                    });
            }, function (res) {
                return coreNotificationService.notifyError("Create Trade Portfolio", "Error! " + (res.data && res.data.Message));
            }).finally(function () {
                vm.isSubmitting = false;
            });
        }

        function closePopup(strategyId) {
            vm.isSubmitting = false;
            vm.uibClosePanel(strategyId);
        }

        function setCapitalAllocation() {
            return tool.openModalByDefinition('p.strategy.NewCapitalAllocationController',
                {
                    createStrategyModel: vm.createStrategyModel
                }).result;
        };

        function submitNew() {
            return sAccountService.CreateBroker().then(function (res) {
                sAccountService.GetBrokerageAccountsForStrategyLinking(vm.createStrategyModel.Market)
                    .then(function (res2) {
                        var account = res2.data.AvailableBrokerList.filter(function (x) {
                            return x.SelectionInfo.BrokerageType === 'AM';
                        })[0];

                        vm.createStrategyModel.BrokerageDetail.BrokerageAccountId = account.SelectionInfo.BrokerageAccountId;
                        vm.createStrategyModel.BrokerageDetail.AccountNumber = account.SelectionInfo.AccountNumber;
                        vm.createStrategyModel.BrokerageDetail.AccountType = account.AccountType;
                        vm.createStrategyModel.BrokerageDetail.BrokerageType = account.SelectionInfo.BrokerageType;
                        vm.createStrategyModel.BrokerageDetail.BalanceForTrading = account.BalanceForTrading;

                        return setCapitalAllocation().then(function (alloc) {
                            vm.createStrategyModel.CapitalAllocation = alloc;
                            return createStrategy();
                        }); 
                    }, function (res) {
                        coreNotificationService.notifyError("Failed to get account: " + (res.data && res.data.Message));
                        setStep('unknown');
                    });
            }, function (res) {
                coreNotificationService.notifyError("Account creation failed: " + (res.data && res.data.Message));
                setStep('unknown');
            });
        }

        function submit() {
            return setCapitalAllocation().then(function (alloc) {
                vm.createStrategyModel.CapitalAllocation = alloc;
                return createStrategy();
            });
        }

        tool.initialize(function() {
            if (coreConfigService.AlgoLeader.HideForAlgoLeader) {
                setStep('basic-info');
            }
            sStrategyCommerceService.HasBroker().then(function (res) {
                vm.hasBroker = res.data;
            }, function (res) {
                coreNotificationService.notifyError("Something went wrong: " + (res.data && res.data.Message) + " please try again");
                setStep('unknown');
            });
        });
    });