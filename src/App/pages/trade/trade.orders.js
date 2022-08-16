agmNgModuleWrapper('agmp.trade')
    .defineController('p.trade.OrdersController', [
        'sOrdersClientService', 'sTradingClientPortfolioService', 'sAccountClientService', 'sStrategyCommerceService',
        'sAccountService', 'commonLocationHistoryService', 'sDroidHelperSbsFrameworkService',
        'sTradingItemService', 'strategyId',
        'commonItemUpdateService', 'orderPadInitService', "sHeaderService", "pMobileWebService"],
    function (vm, dep, tool) {

        var $location = dep.$location,
            sDroidHelperSbsFrameworkService = dep.sDroidHelperSbsFrameworkService,
            sOrdersClientService = dep.sOrdersClientService,
            sTradingClientPortfolioService = dep.sTradingClientPortfolioService,
            sAccountClientService = dep.sAccountClientService,
            sStrategyCommerceService = dep.sStrategyCommerceService,
            coreNotificationService = dep.coreNotificationService,
            coreUserStateService = dep.coreUserStateService,
            sAccountService = dep.sAccountService,
            sTradingItemService = dep.sTradingItemService,
            commonItemUpdateService = dep.commonItemUpdateService,
            strategyId = dep.strategyId,
            orderPadInitService = dep.orderPadInitService;

        coreUserStateService.setSubmenu('ORDER_DETAILS');

        tool.onDestroy(cleanStrategyTradeListeners);

        tool.on('strategySelectedFromScrollingSelection', handleStrategySelectedFromScrollingSelection);
        tool.on('increasePositionEvent', handleIncreasePosition);
        tool.on('decreasePositionEvent', handleDecreasePosition);
        tool.on('cancelOrderEvent', handleCancelOrder);
        tool.on('viewRelatedOrderEvent', handleViewRelatedOrder);
        tool.on('viewPositionDetailEvent', handleViewPositionDetail);
        tool.on('viewHistoricalPositionDetail', handleViewHistoricalPositionDetail);

        var signalRDeveloperOrderCleanupFunc, signalRDeveloperPositionCleanupFunc;
        var signalRDeveloperActivePositionsCleanupFunc;
        var signalRAccountCleanupFunc;

        function cleanStrategyTradeListeners() {
            if (signalRDeveloperOrderCleanupFunc) {
                signalRDeveloperOrderCleanupFunc();
            }
            if (signalRDeveloperPositionCleanupFunc) {
                signalRDeveloperPositionCleanupFunc();
            }
            if (signalRAccountCleanupFunc) {
                signalRAccountCleanupFunc();
            }
            if (signalRDeveloperActivePositionsCleanupFunc) {
                signalRDeveloperActivePositionsCleanupFunc();
            }
        }

        function handleStrategySelectedFromScrollingSelection(event, newValue) {
            return strategySelectedFromScrolling(newValue);
        }

        function handleIncreasePosition(event, position) {
            tool.openModalByDefinition('s.orders.PadDeveloperPopupController', {
                selectedStrategy: null,
                dashboardFeed: null,
                myStrategies: [vm.selectedStrategy],
                reloadStrategiesPromiseFunc: null,
                myTradingAccounts: vm.selectedTradingAccountForOrderPad,
                beforeOpenCallback: function () {
                    orderPadInitService.increasePosition(position);
                }
            });
            return tool.when(true);
        }

        function handleDecreasePosition(event, position) {
            tool.openModalByDefinition('s.orders.PadCloseController', {
                selectedStrategy: null,
                dashboardFeed: null,
                myStrategies: [vm.selectedStrategy],
                reloadStrategiesPromiseFunc: null,
                myTradingAccounts: vm.selectedTradingAccountForOrderPad,
                beforeOpenCallback: function () {
                    orderPadInitService.decreasePosition(position);
                }
            });
            return tool.when(true);
        }

        function handleCancelOrderInt(order, selectedStrategy, selectedTradingAccounts) {
            var orderToCancel = angular.copy(order);
            return tool.openModalByDefinition('s.orders.PadCancelDeveloperPopupController', {
                myStrategies: [selectedStrategy],
                myTradingAccounts: selectedTradingAccounts,
                listOfCancellableOrders: [orderToCancel]
            });
        }

        function handleCancelOrder(event, order) {
            return handleCancelOrderInt(order, vm.selectedStrategy, vm.selectedTradingAccountForOrderPad).result.then(function () {
                return true;
            });
        }

        function handleViewRelatedOrder(event, order) {
            return sOrdersClientService.handleViewRelatedDeveloperOrder(order);
        }

        function handleViewPositionDetail(event, position) {
            return sTradingClientPortfolioService.handleViewDeveloperPositionDetail(position);
        }

        function handleViewHistoricalPositionDetail(event, position) {
            return sTradingClientPortfolioService.handleViewDeveloperHistoricalPositionDetail(position);
        }

        var refreshCount = 0;
        var myTradingAccounts = null;
        var myTradingAccountsForOrderPad;

        // TODO: Variable of SELECT ACCOUNT, refactor somewhere
        // -----------------------------------------------------
        vm.selectedCapitalInfo = null;
        vm.hasCapitalDeficit = hasCapitalDeficit;
        // -------
        
        function hasCapitalDeficit() {
            return vm.selectedStrategy && vm.selectedStrategy.CapitalInfo &&
                vm.selectedStrategy.CapitalInfo.TradingCapital > 0 &&
                vm.selectedStrategy.BrokerageDetail.BalanceForTrading < vm.selectedStrategy.CapitalInfo.TradingCapital &&
                (vm.selectedStrategy.showAllocateCapitalAlert || vm.selectedStrategy.showReduceCapitalAlert);
        }
        
        function compareStrategyAndAccountCapital() {
            vm.showAllocateCapitalAlert = false;
            vm.showReduceCapitalAlert = false;
            vm.accountsNeedToTopUpForAllocateCapitalAlert = [];
            vm.accountsNeedToTopUpForReduceCapitalAlert = [];

            var showAllocateCapitalAlert = false;
            var isAnyStrategyCapitalPositive = false;
            myTradingAccountsForOrderPad.forEach(function (a) {
                if (a.BasicInfo.AccountType === "CFD") {
                    vm.myStrategies.forEach(function (s) {
                        if (s.BrokerageDetail && a.BasicInfo.BrokerageAccountId === s.BrokerageDetail.BrokerageAccountId) {
                            if (s.CapitalInfo.TradingCapital > 0) {
                                isAnyStrategyCapitalPositive = true;
                            }
                        }
                    });
                    vm.myStrategies.forEach(function (s) {
                        if (s.BrokerageDetail
                            && a.BasicInfo.BrokerageAccountId === s.BrokerageDetail.BrokerageAccountId
                            && s.BrokerageDetail.BalanceForTrading < s.CapitalInfo.TradingCapital
                            && (s.BrokerageDetail.Remaining > 0 || isAnyStrategyCapitalPositive && s.BrokerageDetail.Remaining <= 0)) {
                            showAllocateCapitalAlert = true;
                        }
                    });
                }
                if (a.showAllocateCapitalAlert) {
                    vm.showAllocateCapitalAlert = vm.showAllocateCapitalAlert || showAllocateCapitalAlert;
                    vm.accountsNeedToTopUpForAllocateCapitalAlert.push({ Name: a.BasicInfo.AccountNumber });
                }
                if (a.showReduceCapitalAlert) {
                    vm.showReduceCapitalAlert = vm.showReduceCapitalAlert || showReduceCapitalAlert;
                    vm.accountsNeedToTopUpForReduceCapitalAlert.push({ Name: a.BasicInfo.AccountNumber });
                }
            });
        }

        function closeNotification() {
            vm.showAllocateCapitalAlert = false;
            vm.showReduceCapitalAlert = false;
        }

        function closeAllocateNotification() {
            vm.showAllocateCapitalAlert = false;
        }

        function closeReduceNotification() {
            vm.showReduceCapitalAlert = false;
        }

        vm.selectDefaultMyStrategy = function () {
            strategySelected(vm.myStrategies[0]);
        }

        function processAccountBalanceUpdate(data) {
            myTradingAccountsForOrderPad.forEach(function (a) {
                if (a.BasicInfo.BrokerageAccountId
                    && a.BasicInfo.BrokerageAccountId === data.BasicInfo.BrokerageAccountId
                    && commonItemUpdateService.isLaterTimestamp(data, a)) {
                    angular.merge(a, data);
                }
            });

            vm.myStrategies.forEach(function (s) {
                if (s.BrokerageDetail && s.BrokerageDetail.BrokerageAccountId === data.BasicInfo.BrokerageAccountId) {
                    s.BrokerageDetail = angular.copy(data.BasicInfo);
                }
            });
            compareStrategyAndAccountCapital();
        }

        function processStrategyAccountUpdate(data) {
            vm.myStrategies.forEach(function (s) {
                if (s.CapitalInfo && s.CapitalInfo.StrategyId === data.StrategyId
                    && commonItemUpdateService.isLaterTimestamp(data, s.CapitalInfo)) {
                    s.CapitalInfo.TradingCapital = data.TradingCapital;
                    s.CapitalInfo.NAV = data.NAV;
                    s.CapitalInfo.CashBalance = data.CashBalance;
                }
            });
            compareStrategyAndAccountCapital();
        }

        function strategySelectedFromScrolling(newValue) {
            vm.selectedStrategy = newValue;
            if (newValue) {
                var selectedTradingAccount = myTradingAccounts.filter(function (acc) {
                    return acc.BrokerageAccountId === newValue.BrokerageDetail.BrokerageAccountId;
                })[0];
                if (selectedTradingAccount) {
                    vm.selectedTradingAccountForOrderPad = myTradingAccountsForOrderPad.filter(function (a) {
                        return a.BasicInfo.BrokerageAccountId === selectedTradingAccount.BrokerageAccountId;
                    });
                }
                onStrategySelected();
            }
        }

        function strategySelected(newValue) {
            vm.selectedStrategy = newValue;
            onStrategySelected();
        }

        function onStrategySelected() {
            if (vm.selectedStrategy.DisplayInfo.BasicInfo.Status !== 'Published' ||
                (vm.selectedStrategy.DisplayInfo.OverridenDisplayValues && !vm.selectedStrategy.DisplayInfo.OverridenDisplayValues.IsApproved)) {
            }
            onSingleStrategySelected();
        }

        function onSingleStrategySelected() {
            cleanStrategyTradeListeners();

            sTradingItemService.populateSectorDirective(vm.selectedStrategy.SectorCapitals);
            vm.selectedCapitalInfo = vm.selectedStrategy.CapitalInfo;

            //$location.search({ strategyId: vm.selectedStrategy.DisplayInfo.BasicInfo.StrategyId });
            vm.isLoadingCapitalSummary = true;

            vm.isLoadingActiveOrders = true;
            vm.isLoadingHistoricalOrders = true;
            vm.isLoadingOrders = true;

            vm.isLoadingActivePositions = true;
            vm.isLoadingPositions = true;

            signalRDeveloperActivePositionsCleanupFunc = sTradingClientPortfolioService.getDeveloperActivePortfolios(
                vm.selectedStrategy,
                sTradingItemService.activePositions,
                function (evt) {
                    vm.isLoadingActivePositions = false;
                    tool.broadcast('portfolioUpdated');
                });

            signalRDeveloperPositionCleanupFunc = sTradingClientPortfolioService.getDeveloperHistoricalPortfolios(
                vm.selectedStrategy.DisplayInfo.BasicInfo.StrategyId,
                '',
                sTradingItemService.positions,
                function (evt) {
                    vm.isLoadingPositions = false;
                });

            signalRDeveloperOrderCleanupFunc = sOrdersClientService.getAllDeveloperOrdersNew(vm.selectedStrategy,
                sTradingItemService.activeOrders,
                function (evt) {
                    vm.isLoadingActiveOrders = false;
                    vm.isLoadingOrders = vm.isLoadingActiveOrders || vm.isLoadingHistoricalOrders;
                });
            
            sOrdersClientService.initializeHistoricalPagedOrders(
                vm.selectedStrategy.DisplayInfo.BasicInfo.StrategyId,
                null,
                sTradingItemService.historicalOrders,
                function () {
                    vm.isLoadingHistoricalOrders = false;
                    vm.isLoadingOrders = vm.isLoadingActiveOrders || vm.isLoadingHistoricalOrders;
                });

            signalRAccountCleanupFunc = sAccountClientService.getAccountCapitals(true,
                vm.selectedStrategy.DisplayInfo.BasicInfo.StrategyId,
                sTradingItemService.capitalSummary,
                function (evt) {
                    vm.isLoadingCapitalSummary = false;
                });

            tool.broadcast('singleStrategySelected');
        }
        
        function placeOrder() {
            vm.isPlacingOrder = true;
            tool.openModalByDefinition('s.orders.PadDeveloperPopupController', {
                selectedStrategy: vm.selectedStrategy,
                dashboardFeed: null,
                myStrategies: vm.myStrategies,
                reloadStrategiesPromiseFunc: null,
                myTradingAccounts: myTradingAccountsForOrderPad.filter(function (a) {
                    return a.BasicInfo.IsUsedForStrategy === true;
                }),
                beforeOpenCallback: null
            }).result.then(function (info) {
                if (vm.selectedStrategy.DisplayInfo.BasicInfo.StrategyId !== info.selectedStrategy.DisplayInfo.BasicInfo.StrategyId) {
                    strategySelectedFromScrolling(info.selectedStrategy);
                }
            }).finally(function () {
                vm.isPlacingOrder = false;
            });
        }

        function init() {

            tool.setVmProperties({
                showHelpPage: false,
                currentFlow: "Trade Wizard 1",
                isLoadingData: true,
                tradingLayout: 0,
                strategiesType: 0,

                coreUserStateService: coreUserStateService,
                openNewStrategy: sStrategyCommerceService.openNewStrategy,
                go: dep.commonLocationHistoryService.go,
                placeOrder: placeOrder,
                closeNotification: closeNotification,
                closeAllocateNotification: closeAllocateNotification,
                closeReduceNotification: closeReduceNotification,
                pMobileWebService: dep.pMobileWebService,
                strategySelectedFromScrolling: strategySelectedFromScrolling
            });

            dep.sHeaderService.selectMenu("trade");

            tool.onceAll([
                sAccountService.GetBrokerageAccountsSelectionUsedForTrading().then(function (res) {
                    myTradingAccounts = res.data;
                }),
                sAccountService.GetBrokerageAccountsDetail().then(function (res) {
                    myTradingAccountsForOrderPad = res.data.filter(function (a) {
                        return a.BasicInfo.IsUsedForStrategy === true;
                    });;
                }),
                sStrategyCommerceService.GetTradePortfolioSelections().then(function (res) {
                    vm.myStrategies = [];
                    vm.myStrategies = vm.myStrategies.concat(res.data.StrategyForTradingModels);
                })
            ]).then(function () {
                vm.isLoadingData = false;
                compareStrategyAndAccountCapital();

                function handleStrategyChanges(sid) {
                    if (sid) {
                        var ownStrategy = vm.myStrategies.filter(function (item) {
                            return item.DisplayInfo.BasicInfo.StrategyId === sid;
                        })[0];
                        if (ownStrategy) {
                            vm.strategiesType = 0;
                            tool.timeout(function () {
                                strategySelectedFromScrolling(ownStrategy);
                            });
                        }                        
                    }
                }

                var urlParams = $location.search();
                if (urlParams && urlParams.strategyId) {
                    handleStrategyChanges(parseInt(urlParams.strategyId));
                } else if (strategyId) {
                    handleStrategyChanges(parseInt(strategyId));
                } else {
                    strategySelectedFromScrolling(vm.myStrategies[0]);
                }

                tool.signalRNotification('StrategyCapitalChanged', processStrategyAccountUpdate);
                tool.signalRNotification('DeveloperAccountUpdated', processStrategyAccountUpdate);
                tool.signalRNotification('BrokerageAccountUpdated', processAccountBalanceUpdate);

                sDroidHelperSbsFrameworkService.defineFlow('OrdersTradesFlow')
                    .havingStep('1', function (flowControl) {
                        flowControl.highlightAndCommentItems([
                            {
                                itemId: 'sharedHeaderTrade.createTradePortfolio'
                            }
                        ]);
                        flowControl.sayAndStartStep("Click here to create a trade portfolio for placing orders", null, '2');
                    })
                    .havingStep('2', function (flowControl) {
                        flowControl.highlightAndCommentItems([
                            {
                                itemId: 'ordertrades.strategySelection'
                            }
                        ]);
                        flowControl.sayAndStartStep("Choose the trade portfolio whose orders and positions you would like to view", null, '3');
                    })
                    .havingStep('3', function (flowControl) {
                        flowControl.highlightAndCommentItems([
                            {
                                itemId: 'ordertrades.placeOrder'
                            }
                        ]);
                        //flowControl.highlightItems(['ordertrades.switchViewButton', 'ordertrades.placeOrder']);
                        flowControl.sayAndStartStep("Click here to place an order", null, '4');
                    })
                    .havingStep('4', function (flowControl) {
                        flowControl.highlightAndCommentItems([
                            {
                                itemId: 'orderListView.overviewTab'
                            }
                        ]);
                        flowControl.doClickOnThis('orderListView.overviewTab');
                        flowControl.sayAndStartStep("Overview - Summary of trade portfolio P&L and exposure of open positions", null, '5');
                    })
                    .havingStep('5', function (flowControl) {
                        flowControl.highlightAndCommentItems([
                            {
                                itemId: 'orderListView.ordersLogTab'
                            }
                        ]);
                        flowControl.doClickOnThis('orderListView.ordersLogTab');
                        flowControl.sayAndStartStep("Order Log - View all of orders here", null, '6');
                    })
                    .havingStep('6', function (flowControl) {
                        flowControl.highlightAndCommentItems([
                            {
                                itemId: 'orderListView.activeOrdersTab'
                            }
                        ]);
                        flowControl.doClickOnThis('orderListView.activeOrdersTab');
                        flowControl.sayAndStartStep("Active Orders - Track open orders here", null, '7');
                    })
                    .havingStep('7', function (flowControl) {
                        flowControl.highlightAndCommentItems([
                            {
                                itemId: 'orderListView.todaysTradesTab'
                            }
                        ]);
                        flowControl.doClickOnThis('orderListView.todaysTradesTab');
                        flowControl.sayAndStartStep("Today's Trades - Shows all of orders today which have been filled", null, '8');
                    })
                    .havingStep('8', function (flowControl) {
                        flowControl.highlightAndCommentItems([
                            {
                                itemId: 'orderListView.openPositionsTab'
                            }
                        ]);
                        flowControl.doClickOnThis('orderListView.openPositionsTab');
                        flowControl.sayAndStartStep("Open Positions - Track open positions here", null, '9');
                    })
                    .havingStep('9', function (flowControl) {
                        flowControl.highlightAndCommentItems([
                            {
                                itemId: 'orderListView.historicalTab'
                            }
                        ]);
                        flowControl.doClickOnThis('orderListView.historicalTab');
                        flowControl.sayAndStartStep("Historical - View historical orders and positions here", null, '10');
                    })
                    .havingStep('10', function (flowControl) {
                        flowControl.sayAndFinish("Finish this tour");
                    });
                if (vm.myStrategies.length >= 10) {
                    sDroidHelperSbsFrameworkService.setCurrentFlowName('OrdersTradesFlow', '2');
                } else {
                    sDroidHelperSbsFrameworkService.setCurrentFlowName('OrdersTradesFlow', '1');
                }
            }, function (values) {
                vm.isLoadingData = false;
                tool.logError("Error in Trading Order Detail initialization: ' " + values);
                if (refreshCount < 1) {
                    coreNotificationService.notifyErrorOkCancel(
                        "Error Trading Order Detail",
                        "Elements of the page might not be loaded properly. Click OK to attempt reload or Cancel to do nothing.",
                        function (id) {
                            if (id === 0) {
                                init();
                                refreshCount++;
                            }
                        });
                } else {
                    coreNotificationService.notifyError("Error Trading Order Detail", "The refresh did not work. Please check your network connection and try again.");
                }
            });
        };

        tool.initialize(init);
    }
    );