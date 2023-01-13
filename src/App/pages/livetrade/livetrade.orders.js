agmNgModuleWrapper('agmp.livetrade')
    .defineController('p.livetrade.OrdersController', [
        'sOrdersClientService', 'sTradingClientPortfolioService', 'sAccountClientService', 'sStrategyCommerceService',
        'commonLocationHistoryService',
        'sTradingItemService', 'strategyId', 'coreConfigService',
        'commonItemUpdateService', 'orderPadInitService', "sHeaderService", "pMobileWebService", "sLiveConnectService",
        'coreSignalRMarketDataService', 'sProductService', 'orderService', 'portfolioService'],
        function (vm, dep, tool) {
            var sOrdersClientService = dep.sOrdersClientService,
                sTradingClientPortfolioService = dep.sTradingClientPortfolioService,
                sAccountClientService = dep.sAccountClientService,
                sStrategyCommerceService = dep.sStrategyCommerceService,
                coreNotificationService = dep.coreNotificationService,
                coreUserStateService = dep.coreUserStateService,
                sTradingItemService = dep.sTradingItemService,
                commonItemUpdateService = dep.commonItemUpdateService,
                orderPadInitService = dep.orderPadInitService,
                sLiveConnectService = dep.sLiveConnectService,
                sProductService = dep.sProductService,
                orderService = dep.orderService,
                portfolioService = dep.portfolioService,
                $scope = dep.$scope;

            var tigerDbRef = null;
            var futuDbRef = null;
            var subscribedProducts = [];
            var coreSignalRMarketDataService = dep.coreSignalRMarketDataService;

            tool.onDestroy(cleanStrategyTradeListeners);

            tool.on('strategySelectedFromScrollingSelection', handleStrategySelectedFromScrollingSelection);
            tool.on('increasePositionEvent', handleIncreasePosition);
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
                tool.openModalByDefinition('s.orders.PadLivePopupController', {
                    accountId: vm.selectedAccount.accountCode,
                    brokerType: vm.selectedAccount.type,
                    beforeOpenCallback: function () {
                        orderPadInitService.increasePosition(position);
                    }
                });
                return tool.when(true);
            }

            function decreasePosition(position) {
                tool.openModalByDefinition('s.orders.PadLiveCloseController', {
                    accountId: vm.selectedAccount.accountCode,
                    brokerType: vm.selectedAccount.type,
                    beforeOpenCallback: function () {
                        position.Product = position.algoProduct;
                        position.QuantityOnHold = position.dealSize;
                        position.PositionType = position.direction === "BUY" ? "Long" : position.direction === "SELL" ? "Short" : "";
                        orderPadInitService.decreasePosition(position);
                    }
                });
                return tool.when(true);
            }

            function handleCancelOrderInt(order) {
                var orderToCancel = angular.copy(order);
                return tool.openModalByDefinition('s.orders.PadLiveCancelPopupController', {
                    listOfCancellableOrders: [orderToCancel],
                    accountId: vm.selectedAccount.accountCode,
                    brokerType: vm.selectedAccount.type
                });
            }

            function cancelOrder(order) {
                
                return handleCancelOrderInt(order).result.then(function () {
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
                tool.openModalByDefinition('s.orders.PadLivePopupController', {
                    accountId: vm.selectedAccount.accountCode,
                    beforeOpenCallback: null,
                    brokerType: vm.selectedAccount.type
                }).result.then(function (info) {

                }).finally(function () {
                    vm.isPlacingOrder = false;
                });
            }

            function refreshTigerFunction(snap) {
                if (!snap) return;
                var obj = snap.val();

                if (obj) {
                    vm.accounts = Object.keys(obj.accounts);
                    var firstKey = vm.accounts[0];
                    vm.selectedAccount = obj.accounts[firstKey];
                    vm.selectedAccount.orders = (obj.activeOrders && obj.activeOrders.hasOwnProperty(firstKey)) ? obj.activeOrders[firstKey] : [];
                    vm.selectedAccount.positions = (obj.openPositions && obj.openPositions.hasOwnProperty(firstKey)) ? obj.openPositions[firstKey] : [];
                    sLiveConnectService.formatFirebaseObj(vm.selectedAccount)
                        .then(function (info) {
                            if (vm.isLoadingData) {
                                // The first time the page is loaded, select first account
                                vm.selectedAccount = info;

                                var positions = info.positions.reduce(function (a, b) { return a.concat(b); }, []);
                                subscribedProducts = positions.map(function (x) { return x.algoProduct });
                                coreSignalRMarketDataService.subscribeRealTimeMarketDataMultiple(subscribedProducts);
                            } else {
                                vm.selectedAccount = info;
                            }
                        });
                }
                vm.isLoadingData = false;

                // Otherwise the digest won't trigger on throttle
                $scope.$digest();
            }

            function refreshFutuFunction(snap) {
                if (!snap) return;
                var obj = snap.val();
                if (obj) {
                    var accountSets = [];
                    Object.keys(obj.accounts).forEach(function (x) {
                        var account = obj.accounts[x];
                        account.orders = (obj.activeOrders && obj.activeOrders.hasOwnProperty(x)) ? obj.activeOrders[x] : [];
                        account.positions = (obj.openPositions && obj.openPositions.hasOwnProperty(x)) ? obj.openPositions[x] : [];
                        accountSets.push(account);
                    });
                    vm.accounts = accountSets;
                    var firstKey = Object.keys(obj.accounts)[0];

                    if (!vm.selectedAccount) {
                        vm.selectedAccount = obj.accounts[firstKey];
                    }
                    if (obj.activeOrders != null) {
                        let activeOrders = obj.activeOrders[firstKey]
                        vm.selectedAccount.orders = Object.keys(activeOrders).map(function (key) {
                            activeOrders[key]['id'] = activeOrders[key]['orderId']
                            return activeOrders[key];
                        });
                    }

                    let positions = obj.openPositions[firstKey];
                    vm.selectedAccount.positions = Object.keys(positions).map(function (key) {
                        let obj = positions[key];
                        obj['product'] = obj.Code;
                        obj['tradeVenue'] = obj.SecMarket == 1 ? "HK" : "US";
                        obj['currency'] = obj.SecMarket == 1 ? "HKD" : "USD";
                        obj['broker'] = "futu"
                        return obj;
                    });

                    sLiveConnectService.formatFirebaseObj(vm.selectedAccount)
                        .then(function (info) {
                            if (vm.isLoadingData) {
                                // The first time the page is loaded, select first account
                                vm.selectedAccount = info;

                                var positions = info.positions.reduce(function (a, b) { return a.concat(b); }, []);
                                subscribedProducts = positions.map(function (x) { return x.algoProduct });
                                coreSignalRMarketDataService.subscribeRealTimeMarketDataMultiple(subscribedProducts);
                            } else {
                                vm.selectedAccount = info;
                            }
                        });
                }
                vm.isLoadingData = false;

                // Otherwise the digest won't trigger on throttle
                $scope.$digest();
            }

            function createLiveAccount() {
                return tool.openModalByDefinition('s.account.NewLiveController', {});
            }
            function loadRealizedPosition() {
                vm.realizedPositionsLoading = true;
                return portfolioService.FutuGetRealizedPositon()
                .then(function (res) {
                    console.log('Response :' + JSON.stringify(res))
                    vm.selectedAccount.realizedPositions = res.data;
                }).finally(function () {
                    vm.realizedPositionsLoading = false;
                });
            }
            function loadHistoricalOrders() {
                vm.historicalOrederLoading = true;

                return orderService.FutuHistoricalOrder()
                    .then(function (res) {
                        console.log('Response :' + JSON.stringify(res))
                        vm.selectedAccount.historicalOrders = res.data;
                    }).finally(function () {
                        vm.historicalOrederLoading = false;
                    });
            }

            function switchAccount(account) {
                vm.selectedAccount = account;
                sLiveConnectService.formatFirebaseObj(vm.selectedAccount)
                    .then(function (info) {
                        if (vm.isLoadingData) {
                            // The first time the page is loaded, select first account
                            vm.selectedAccount = info;

                            var positions = info.positions.reduce(function (a, b) { return a.concat(b); }, []);
                            subscribedProducts = positions.map(function (x) { return x.algoProduct });
                            coreSignalRMarketDataService.subscribeRealTimeMarketDataMultiple(subscribedProducts);
                        } else {
                            vm.selectedAccount = info;
                        }
                    });
            }

            function init() {
                tool.setVmProperties({
                    accounts: [],
                    selectedAccount: null,
                    showHelpPage: false,
                    currentFlow: "Trade Wizard 1",
                    isLoadingData: true,
                    tradingLayout: 0,
                    strategiesType: 0,
                    positionRealizedLoading: true,
                    historicalOrederLoading: true,

                    switchAccount: switchAccount,
                    coreUserStateService: coreUserStateService,
                    openNewStrategy: sStrategyCommerceService.openNewStrategy,
                    go: dep.commonLocationHistoryService.go,
                    placeOrder: placeOrder,
                    cancelOrder: cancelOrder,
                    decreasePosition: decreasePosition,
                    closeNotification: closeNotification,
                    closeAllocateNotification: closeAllocateNotification,
                    closeReduceNotification: closeReduceNotification,
                    pMobileWebService: dep.pMobileWebService,
                    strategySelectedFromScrolling: strategySelectedFromScrolling,
                    createLiveAccount: createLiveAccount,
                    loadRealizedPosition: loadRealizedPosition,
                    loadHistoricalOrders: loadHistoricalOrders
                });

                dep.sHeaderService.selectMenu("livetrade");

                tool.onceAll([
                    coreUserStateService.userInfoLoaded,
                    sLiveConnectService.tigerFirebaseAuthed,
                    sLiveConnectService.futuFirebaseAuthed,
                    sLiveConnectService.loadInfo()
                ]).then(function () {
                    vm.user = coreUserStateService.user;
                    var uid = dep.coreDataStorageService.get("userId");
                    tigerDbRef = firebase.database().ref().child('users/' + uid);
                    futuDbRef = sLiveConnectService.getFutuFb().database().ref().child('users/' + uid);

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
                    //vm.isLoadingData = false;
                }, function (values) {
                    vm.isLoadingData = false;
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
            };

            tool.initialize(init);
        }
    );