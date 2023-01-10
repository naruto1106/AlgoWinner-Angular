agmNgModuleWrapper('agms.orders', [])
    .defineControllerAsPopup('s.orders.PadLivePopupController',
    {
        templateUrl: '/App/shared/orderPad/orders.pad.live.html',
        windowClass: 'smaller-modal'
    },
    [
        'sProductService', "sOrdersBracketService", 
        'orderService', 'orderPadInitService', 
        'beforeOpenCallback', 'coreNotificationService', 'sOrdersPadHelperService', "sOrdersDetailService",
        'orderProcessing', 'sUserService', 'commonItemUpdateService', "pMobileWebService", 'accountId', 'brokerType'
    ],
    function (vm, dep, tool) {
        // --- DEPENDENCY RESOLVER
        var $filter = dep.$filter,
            orderProcessing = dep.orderProcessing,
            coreConfigService = dep.coreConfigService,
            sUserService = dep.sUserService,
            commonItemUpdateService = dep.commonItemUpdateService,
            beforeOpenCallback = dep.beforeOpenCallback,
            sProductService = dep.sProductService,
            orderService = dep.orderService,
            sOrdersPadHelperService = dep.sOrdersPadHelperService,
            orderPadInitService = dep.orderPadInitService,
            coreNotificationService = dep.coreNotificationService,
            sOrdersDetailService = dep.sOrdersDetailService,
            sOrdersBracketService = dep.sOrdersBracketService,
            accountId = dep.accountId;
            brokerType = dep.brokerType;
            

        // --- LOCAL VAR DECLARATION
        var enterIntentions = ["New", "Increase"];
        var previousSearchPromise = null;
        var oldProduct = null;
        var isBracketOrderEnabled;
        var defaultNotSetUp;
        var defaultSettings;

        // --- LOCAL SERVICE FUNC 
        function reevaluateBracketOrder(forceEvaluate) {
            isBracketOrderEnabled = isEntering();

            //only execute when forceEvaluate is true, because we can to adjust the bracket order price when parent price is changing
            if (forceEvaluate) {
                if (!isBracketOrderEnabled) {
                    vm.order.HasBracketOrder = false;
                } else {
                    sOrdersPadHelperService.reevaluateBracketOrder(vm.order);
                }
                vm.onHasBracketOrderChanged(vm.order);
            }
        }

        function clearPrice() {
            vm.order.StopPrice = null;
            vm.order.LimitPrice = null;
        }

        function handleOnProductStrategyChanges() {
            // evaluateCurrentActiveOrder();
            // getRealBrokerInfo();
        }

        function showPendingActiveOrderPopup(cancelledOrder) {
            var productDetail = cancelledOrder.Product.ProductName + " (" + cancelledOrder.Product.Symbol + ")";
            coreNotificationService.notifyError("Active order exists for product",
                "You have an existing order on " + productDetail + " which is pending cancellation. To place a new order on " + productDetail + ", please wait for the above order to be successfully cancelled");
        }

        function computeEntryPriceDiff() {
            var p = vm.positionAndIntention.position;
            var diff = 0;
            if (p.PositionType === "Long") {
                diff = vm.order.Product.bidPrice - p.AverageEntryPrice;
            } else if (p.PositionType === "Short") {
                diff = p.AverageEntryPrice - vm.order.Product.askPrice;
            }
            return diff;
        }

        function cancelActiveOrder() {
            var cancelledOrder = vm.currentActiveOrder;
            return sOrdersPadHelperService.cancelOrderSilently(vm.currentActiveOrder, vm.selectedAccount).then(function () {
                return evaluateCurrentActiveOrder().then(function () {
                    recalculateInfo();
                    return cancelledOrder;
                }).finally(function () {
                    return cancelledOrder;
                });
            });
        }

        function updateStrategyInitially() {

        }
        
        function updateStrategy(str) {
            vm.selectedAccount = str;
        }

        function getValidationMessage() {
            return getValidationMessageBase();
        }

        function getValidationMessageBase() {
            if (!(vm.accountId)) {
                return "Trade Portfolio is not selected";
            }
            if (!(vm.order.Product && vm.order.Product.ProductId)) {
                return "Please select a valid product";
            }
            if (!(vm.order.Quantity > 0)) {
                return "Please enter a valid quantity";
            }
            if ((!vm.order.LimitPrice || vm.order.LimitPrice <= 0) && vm.order.OrderType === "Limit" && !vm.isLoadingPrice) {
                return "Please enter a valid limit price";
            }
            if ((!vm.order.StopPrice || vm.order.StopPrice <= 0) && vm.order.OrderType === "Stop" && !vm.isLoadingPrice) {
                return "Please enter a valid stop price";
            }
            if (!vm.order.Validity) {
                return "Please select order validity";
            }
            if (!vm.order.OrderType) {
                return "Please select order type";
            }
            if (vm.positionAndIntention && vm.positionAndIntention.intention === 'Overshot') {
                return "You are liquidating more than you own";
            }

            if (vm.order.HasBracketOrder) {
                return sOrdersPadHelperService.getBracketOrderErrorMessage(vm.order, "order");
            }
            return null;
        }

        function updateQuantityTypes(product) {
            var quantityTypes = [];
            if (product && product.TradeVenueLoc === "SG") {
                quantityTypes = ['Lot', 'K Lot', 'Unit'];
            } else if (product) {
                quantityTypes = ['Lot', 'Unit'];
            } else {
                quantityTypes = ['K Lot', 'Unit'];
            }
            vm.quantityTypes = quantityTypes;
        }

        function getMarketDataForProduct(product) {
            if (!product) {
                return;
            }
            sOrdersPadHelperService.updateMarketPriceForProduct(product);
            sProductService.updateProductTickSizeValueIfBelongToGroup(product);
        }

        function evaluateCurrentActiveOrder() {
            vm.currentActiveOrder = null;
            if (vm.order.Product && vm.selectedAccount && coreConfigService.Trading.HasCancellation) {
                return orderService.GetActiveOrderByProductStrategy(vm.order.Product.ProductId, vm.selectedAccount.DisplayInfo.BasicInfo.StrategyId).then(function (res) {
                    vm.currentActiveOrder = res.data;
                    if (vm.currentActiveOrder) {
                        orderProcessing.aggregateOrderStatus(vm.currentActiveOrder);
                    }
                });
            } else {
                return tool.when(null);
            }
        }

        function recalculateInfo(reEvaluateOrderPad) {
        }

        function updateOrderPrice() {
            var product = vm.order.Product;
            if (product) {
                return sOrdersPadHelperService.updateOrderPrice(vm.order, coreConfigService.Trading.OffSetBracketOrderValue);
            }
            return tool.when();
        }


        // --- EVENT HANDLERS
        function handleStrategySelectedFromScrollingSelection(event, newValue) {
            updateStrategy(newValue);
        }

        tool.on('strategySelectedFromScrollingSelection', handleStrategySelectedFromScrollingSelection);
        tool.signalRNotification("DeveloperOrderUpdated", function (o) {
            if (vm.currentActiveOrder && vm.currentActiveOrder.OrderId === o.OrderId && o.OrderStatus === 'Cancelled') {
                vm.currentActiveOrder = null;
                recalculateInfo();
            }
        });


        // --- SCOPE FUNC
        function openNewStrategy() {
        }

        function isEntering() {
            if (vm.positionAndIntention && enterIntentions.indexOf(vm.positionAndIntention.intention) >= 0) {
                return true;
            }
            return false;
        }

        function isCapitalMightExceed() {
            if (!vm.accountId) {
                return false;
            }
            if (!isEntering()) {
                return false;
            }

            return vm.transactionInfo.CapitalUsed > vm.selectedAccount.CapitalInfo.TradingCapital && vm.selectedAccount.CapitalInfo.TradingCapital > 0;
        }

        function clearTransactionInfo() {
            vm.order.Product = null;
            vm.transactionInfo = {
                CapitalUsed: null,
                Leverage: null,
                Multiplier: null,
                TradeAmount: null
            };
        }

        function increaseLimitPrice() {
            sOrdersPadHelperService.increaseLimitPrice(vm.order);
            recalculateInfo(true);
        }

        function decreaseLimitPrice() {
            sOrdersPadHelperService.decreaseLimitPrice(vm.order);
            recalculateInfo(true);
        }

        function increaseStopPrice() {
            sOrdersPadHelperService.increaseStopPrice(vm.order);
            recalculateInfo(true);
        }

        function decreaseStopPrice() {
            sOrdersPadHelperService.decreaseStopPrice(vm.order);
            recalculateInfo(true);
        }

        function searchProducts(keyword) {
            if (previousSearchPromise) {
                previousSearchPromise.cancel();
            }
            if (!vm.accountId) {
                return tool.when(null);
            }
            previousSearchPromise = sProductService.SearchProduct(keyword, 10, true);

            return previousSearchPromise.then(function (res) {
                return res.data.filter(function (product) {
                    return product.AssetType === 'Stocks & ETFs' &&
                        (product.TradeVenueLoc === 'US' || product.TradeVenueLoc === 'SG' || product.TradeVenueLoc === 'HK' || product.TradeVenueLoc === 'CHN');
                });
            });
        }

        function onSelectedStrategy() {
            handleOnProductStrategyChanges();
        }

        function onProductSelected(product) {
            vm.order.Product = product;

            clearPrice();

            if (product) {
                getMarketDataForProduct(product);
            }
            oldProduct = product;

            updateQuantityTypes(product);
            if (vm.quantityTypes.indexOf(vm.order.quantityType) < 0) {
                vm.order.quantityType = vm.quantityTypes[0];
            }
            handleOnProductStrategyChanges();
        }

        function updateOrderQuantity() {
            sOrdersPadHelperService.updateOrderQuantity(vm.order);
            recalculateInfo();
        }

        function onPriceChanges() {
            recalculateInfo(true);
        }

        function onActionChanged() {
            clearPrice();
        }

        function onOrderTypeChanged() {
            updateOrderPrice().then(function () {
                return recalculateInfo();
            });
        }

        function disableConfirm() {
            vm.validationMessage = getValidationMessage ? getValidationMessage() : null;
            return (vm.validationMessage !== null && vm.validationMessage !== "") || vm.isLoadingPrice;
        }
        
        function showMessageForActiveOrderPopup() {
            return tool.openModalByDefinition('s.orders.CancellationPopupController', {
                currentActiveOrder: vm.currentActiveOrder,
                doCancelOrder: cancelActiveOrder
            });
        }

        function showActiveOrder() {
            return vm.currentActiveOrder && coreConfigService.Trading.HasCancellation && sOrdersBracketService.isNotBracketOrder(vm.currentActiveOrder);
        }

        function confirm() {
            if (disableConfirm()) {
                coreNotificationService.notifyError("Invalid Form Request", vm.validationMessage);
                return;
            }
            sOrdersPadHelperService.updateOrderQuantity(vm.order);
            vm.order.CreatedTime = moment.utc();

            vm.confirmedOrder = angular.copy(vm.order);
            vm.currentStepName = 'confirm';
        }

        function goToDefaultSettings(type) {
            tool.openModalByDefinition('s.orders.PadDefaultSettingPopupController', {
                type: type,
                currentSetup: defaultSettings.CurrentSetup,
                updateSetupFunc: function (setup) {
                    defaultSettings.CurrentSetup = setup;
                    if (vm.isDefaultSelected) vm.applyDefaultSettings();
                    defaultNotSetUp = false;
                }
            });
        }

        function computeUnrealizedPL() {
            var diff = computeEntryPriceDiff();
            var multiplier = vm.transactionInfo.Multiplier || 1;
            var p = vm.positionAndIntention.position;
            return multiplier * diff * p.QuantityOnHold;
        }

        function computeUnrealizedPLPercentage() {
            var diff = computeEntryPriceDiff();
            var p = vm.positionAndIntention.position;
            return diff / p.AverageEntryPrice;
        }

        function getProgressState() {
            return vm.currentStepName;
        }

        function goBack() {
            if (vm.order.TakeProfitOrder == null) {
                vm.order.TakeProfitOrder = {
                    ProductId: null,
                    LimitPrice: null,
                    OrderType: "Limit",
                    Validity: "GTC"
                }
            }
            if (vm.order.StopLossOrder == null) {
                vm.order.StopLossOrder = {
                    ProductId: null,
                    StopPrice: null,
                    OrderType: "Stop",
                    Validity: "GTC"
                }
            }
            vm.currentStepName = 'order-detail';
            if (!vm.order.HasBracketOrder) {
                reevaluateBracketOrder(true);
            }
        }

        function isActiveOrderPendingCancellation() {
            return $filter('isCancellingOrder')(vm.currentActiveOrder);
        }

        function onAttachedBracketOrderChanged() {
            vm.order.HasBracketOrder = vm.order.HasAttachedTP || vm.order.HasAttachedSL;
        }

        function isBracketOrderShown() {
            return coreConfigService.Trading.ShowBracketOrder && isBracketOrderEnabled && vm.selectedAccount.BrokerageDetail.BrokerageType === "AM";
        }

        function applyDefaultSettings() {
            var promise = tool.when(true);
            if (vm.isDefaultSelected) {
                if (defaultNotSetUp) {
                    coreNotificationService.notifyWarning("Default Not Set up", "You have not yet set up any default order settings.");
                    vm.isDefaultSelected = false;
                } else {
                    var subPromise = tool.when(true);

                    if (defaultSettings.CurrentSetup.DefaultProduct && defaultSettings.CurrentSetup.DefaultProduct.ProductId) {
                        subPromise = sProductService.GetProduct(defaultSettings.CurrentSetup.DefaultProduct.ProductId).then(function (res) {
                            vm.order.Product = res.data.Data;
                            getMarketDataForProduct(vm.order.Product);
                        });
                    }
                    promise = subPromise.then(function () {
                        vm.order.Action = defaultSettings.CurrentSetup.Action;
                        vm.order.inputNominalQuantity = parseFloat(defaultSettings.CurrentSetup.Quantity);
                        vm.order.OrderType = defaultSettings.CurrentSetup.OrderType;
                        vm.order.quantityType = defaultSettings.CurrentSetup.QuantityType;
                        updateQuantityTypes(vm.order.Product);
                        if (vm.quantityTypes.indexOf(vm.order.quantityType) < 0) {
                            vm.quantityTypes.push(vm.order.quantityType);
                        }
                        sOrdersPadHelperService.updateOrderQuantity(vm.order);
                        vm.order.Validity = defaultSettings.CurrentSetup.DefaultValidity;
                    });
                }
            } else {
                var currentProduct = vm.order.Product;
                if (currentProduct != null) {
                    vm.order = orderPadInitService.getDefaultOrder();
                    vm.order.Product = currentProduct;
                } else {
                    clear();
                }
            }

            promise.then(function () {
                updateStrategyInitially();
            });
        }

        function submit() {
            if (vm.currentStepName === 'confirm') {
                vm.Product = null;
                vm.isSubmitting = true;

                vm.order.ProductId = vm.order.Product.ProductId;
                sOrdersPadHelperService.updateOrderQuantity(vm.order);

                var orderRequest = {
                    AccountId: accountId,
                    Action: vm.order.Action,
                    OrderType: vm.order.OrderType,
                    Product: {
                        ProductId : vm.order.ProductId,
                        AssetType: vm.order.Product.AssetType,
                        Symbol: vm.order.Product.Symbol,
                        Currency: vm.order.Product.Currency,
                        TradeVenueLoc: vm.order.Product.TradeVenueLoc
                    },
                    Quantity: vm.order.Quantity,
                    Validity: vm.order.Validity,
                    LimitPrice: vm.order.LimitPrice,
                    StopPrice: vm.order.StopPrice
                };
                let service = "SendLiveOrder";
                if(vm.brokerType == 'futu') service = 'FutuSendLiveOrder'
                return orderService[service](orderRequest)
                    .then(function (res) {
                        vm.order.OrderId = res.data.id;
                        coreNotificationService.notifySuccess("Send Order", "Your order has been successfully sent");
                        vm.uibClosePanel({
                            order: vm.order,
                            accountId: accountId
                        });
                    }, function (res) {
                        if (res.status === 400) {
                            console.log(JSON.stringify(res))
                            coreNotificationService.notifyError("Send Order", res.data);
                        } else {
                            coreNotificationService.notifyError("Send Order", "There was an error trying to approve this request. Please check your connection or try again later.");
                        }
                    }).finally(function () {
                        vm.isSubmitting = false;
                    });
            }
        }

        function clear() {
            vm.order = orderPadInitService.getDefaultOrder();
            vm.order.inputNominalQuantity = null;
            tool.timeout(function () {
                if (vm.listenOnProductResolve && vm.listenOnProductResolve.resolve) {
                    vm.listenOnProductResolve.resolve(null);
                }
            });
        }

        function detectKeys(evt) {
            if (!evt.ctrlKey) {
                switch (evt.key.toUpperCase()) {
                    case 'B':
                        if (defaultSettings.CurrentSetup.EnableBuyShortcut) {
                            vm.order.Action = "Buy";
                            vm.onActionChanged();
                        }
                        break;
                    case 'S':
                        if (defaultSettings.CurrentSetup.EnableSellShortcut) {
                            vm.order.Action = "Sell";
                            vm.onActionChanged();
                        }
                        break;
                }
            }
        }

        tool.initialize(function () {
            tool.setVmProperties({
                pMobileWebService: dep.pMobileWebService,
                computeBracketOrderPercentage: sOrdersPadHelperService.computeBracketOrderPercentage,
                increaseTakeProfitPrice: sOrdersPadHelperService.increaseTakeProfitPrice,
                decreaseTakeProfitPrice: sOrdersPadHelperService.decreaseTakeProfitPrice,
                increaseCutLossPrice: sOrdersPadHelperService.increaseCutLossPrice,
                decreaseCutLossPrice: sOrdersPadHelperService.decreaseCutLossPrice,
                clear: clear,
                applyDefaultSettings: applyDefaultSettings,
                actionTypes: ["Buy", "Sell"],
                detectKeys: detectKeys,
                submit: submit,
                accountId: accountId,
                isBracketOrderShown: isBracketOrderShown,
                showMessageForActiveOrderPopup: showMessageForActiveOrderPopup,
                currentStepName: 'order-detail',
                getProgressState: getProgressState,
                confirmedOrder: {},
                quantityTypes: ['Lot', 'Unit'],
                isSubmitting: false,
                isLoadingPrice: false,
                listenOnProductResolve: {},
                currentActiveOrder: null,
                isActiveOrderPendingCancellation: isActiveOrderPendingCancellation,
                orderTypes: ["Limit", "Market", "Stop"],
                brokerType : brokerType,
                transactionInfo: {
                    CapitalUsed: null,
                    Leverage: null,
                    Multiplier: null,
                    TradeAmount: null
                },
                order: null,
                goBack: goBack,
                computeUnrealizedPL: computeUnrealizedPL,
                computeUnrealizedPLPercentage: computeUnrealizedPLPercentage,
                onPriceChanges: onPriceChanges,
                positionAndIntention: null,
                updateOrderQuantity: updateOrderQuantity,
                onSelectedStrategy: onSelectedStrategy,
                confirm: confirm,
                searchProducts: searchProducts,
                onProductSelected: onProductSelected,
                isCapitalMightExceed: isCapitalMightExceed,
                onActionChanged: onActionChanged,
                onOrderTypeChanged: onOrderTypeChanged,
                onHasBracketOrderChanged: sOrdersBracketService.onHasBracketOrderChanged,
                onAttachedBracketOrderChanged: onAttachedBracketOrderChanged,
                increaseLimitPrice: increaseLimitPrice,
                decreaseLimitPrice: decreaseLimitPrice,
                increaseStopPrice: increaseStopPrice,
                decreaseStopPrice: decreaseStopPrice,
                goToDefaultSettings: goToDefaultSettings,
                clearTransactionInfo: clearTransactionInfo,
                topUpStrategyCapital: sOrdersPadHelperService.topUpStrategyCapital,
                isEntering: isEntering,
                disableConfirm: disableConfirm,
                openNewStrategy: openNewStrategy,
                showActiveOrder: showActiveOrder,
                updateStrategy: updateStrategy
            });

            sOrdersPadHelperService.clearCache();

            sUserService.GetDefaultTradeSettings().then(function (res) {
                if (res.data == null) {
                    defaultNotSetUp = true;
                    defaultSettings = {
                        CurrentSetup: {
                            Action: "Buy",
                            Quantity: 0,
                            QuantityType: "Unit",
                            DefaultValidity: "Day",
                            OrderType: "Limit"
                        }
                    };
                } else {
                    defaultNotSetUp = false;
                    defaultSettings = res.data;
                }
            }, function () {
                defaultNotSetUp = true;
                defaultSettings = {
                    CurrentSetup: {
                        Action: "Buy",
                        Quantity: 0,
                        QuantityType: "Unit",
                        DefaultValidity: "Day",
                        OrderType: "Limit"
                    }
                };
            });

            tool.timeout(function () {
                var element = document.getElementById("orderPad");
                if (element) {
                    element.focus();
                    element.style.outline = "none";
                }
            }, 500);

            if (beforeOpenCallback) {
                beforeOpenCallback(vm.order);
            } else {
                orderPadInitService.setDefaultDeveloperOrder();
            }
            vm.order = orderPadInitService.getOrder();

            if (vm.order.Product) {
                tool.onRendered(function () {
                    if (vm.listenOnProductResolve && vm.listenOnProductResolve.resolve) {
                        vm.listenOnProductResolve.resolve(vm.order.Product);
                    }
                    getMarketDataForProduct(vm.order.Product);
                });
            }

            updateStrategyInitially();
        });
    })