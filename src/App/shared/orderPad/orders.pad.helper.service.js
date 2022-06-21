agmNgModuleWrapper('agms.orders')
    .defineService('sOrdersPadHelperService', [
        'tradeDataService', 'sAccountBrokerageProductService', 'sProductService', 'sStrategyCommerceService', "coreSignalRMarketDataService",
        'sOrdersPadService', 'sTradingExchangeRateService', "orderService",
        "commonEnumResolverService", 'ticksizeService'],
    function (serviceObject, dep, tool) {
        // --- DEPENDENCY RESOLVER
        var tradeDataService = dep.tradeDataService,
            sProductService = dep.sProductService,
            sAccountBrokerageProductService = dep.sAccountBrokerageProductService,
            sStrategyCommerceService = dep.sStrategyCommerceService,
            sOrdersPadService = dep.sOrdersPadService,
            sTradingExchangeRateService = dep.sTradingExchangeRateService,
            coreConfigService = dep.coreConfigService,
            orderService = dep.orderService,
            coreSignalRMarketDataService = dep.coreSignalRMarketDataService,
            commonEnumResolverService = dep.commonEnumResolverService,
            ticksizeService = dep.ticksizeService;

        // --- LOCAL VAR DECLARATION
        var exchangeRates = null;
        var cachedProductStrategyShortableResult = [];
        var cachedProductStrategyBrokerTradableResult = [];
        var cachedProductStrategyPositionResult = [];
        var cachedProductLeverageResult = [];
        var orderTicksNum = coreConfigService.Trading.OrderTicksNum;
        var orderLevelMargin = coreConfigService.Trading.OrderLevelMargin;
        var orderPriceDict = {};


        // --- LOCAL SERVICE FUNC 
        function addValueWithStep(val, step) {
            return parseFloat((parseFloat(val) + step).toFixed(4));
        }

        function getExchangeRate(c1, c2) {
            return exchangeRates[c1 + "_" + c2];
        }

        function isProductStrategyShortable(product, strategy) {

            if (!product || !strategy || !strategy.BrokerageDetail) {
                return tool.when(null);
            }

            var productId = product.ProductId;
            var brokerType = strategy.BrokerageDetail.BrokerageType;
            var accountNumber = strategy.BrokerageDetail.AccountNumber;
            var name = productId + "_" + brokerType + "_" + accountNumber;

            if (cachedProductStrategyShortableResult[name]) {
                return tool.when(cachedProductStrategyShortableResult[name]);
            } else {
                var request = {
                    ProductId: productId,
                    BrokerageType: brokerType,
                    AccountNumber: accountNumber
                };
                var deferred = tool.defer();
                sAccountBrokerageProductService.IsProductShortable(request).then(function (res) {
                    cachedProductStrategyShortableResult[name] = res.data;
                    deferred.resolve(res.data);
                }, function () {
                    deferred.resolve(false);
                });
                return deferred.promise;
            }
        }

        function ensureStrategyHasAssetClass(strategy) {
            if (strategy.AssetClass) {
                return tool.when(true);
            }
            var deferred = tool.defer();
            sStrategyCommerceService.GetAssetClass(strategy.DisplayInfo.BasicInfo.StrategyId).then(function (res) {
                strategy.AssetClass = res.data;
            }).finally(function () {
                deferred.resolve();
            });
            return deferred.promise;
        }

        function isProductStrategyAssetCompatible(product, strategy) {
            if (!product || !strategy) {
                return tool.when(true);
            }
            return ensureStrategyHasAssetClass(strategy).then(function (s) {
                return product.AssetType === strategy.AssetClass;
            });
        }

        function isProductStrategyTradeVenueCompatible(product, strategy) {
            if (!product || !strategy) {
                return tool.when(true);
            }

            return sStrategyCommerceService.GetTradeVenue(strategy.DisplayInfo.BasicInfo.StrategyId).then(function (res) {
                return product.TradeVenueLoc === res.data;
            });
        }

        function getOrderQuantity(order) {
            // do this if Lot size is indeterminant
            if (!order.quantityType) {
                order.quantityType = 'Unit';
            }

            if (order.Product && order.quantityType) {
                switch (order.quantityType) {
                    case 'Lot':
                        return order.inputNominalQuantity * order.Product.LotSize;
                    case 'Unit':
                        return order.inputNominalQuantity;
                    case 'K Lot':
                        return order.inputNominalQuantity * 1000;
                }
            }

            return order.inputNominalQuantity;
        }

        function getProductLeverage(product, strategy) {
            var returnedValue = tool.when(1);
            if (strategy.BrokerageDetail.BrokerageType === "AM") {
                var productId = product.ProductId;
                var brokerageType = strategy.BrokerageDetail.BrokerageType;
                var name = productId + "_" + brokerageType;
                if (cachedProductLeverageResult[name]) {
                    returnedValue = tool.when(cachedProductLeverageResult[name]);
                } else {
                    returnedValue = sProductService.GetProductLeverageAndMultiplier(product.ProductId, strategy.BrokerageDetail.BrokerageType).then(function (res) {
                        var result = res.data.Data;
                        cachedProductLeverageResult[name] = result;
                        return result;
                    });
                }
            }
            return returnedValue;
        }

        function getMarketPriceForPositionBracketOrder(order) {
            if (!order.Product) {
                return tool.reject();
            }

            var action = order.Action;
            if (action === 'Sell') {
                return tradeDataService.GetAsk(order.Product).then(
                    function (res) {
                        return res.data.AskPrice;
                    }, function () { return null });
            } else if (action === 'Buy') {
                return tradeDataService.GetBid(order.Product).then(
                    function (res) {
                        return res.data.BidPrice;
                    }, function () { return null });
            }
        }

        function getMarketPrice(order) {
            if (!order.Product) {
                return tool.reject();
            }

            var action = order.Action;
            if (action === 'Buy') {
                return tradeDataService.GetAsk(order.Product).then(
                    function (res) {
                        return res.data.AskPrice;
                    }, function () { return null });
            } else if (action === 'Sell') {
                return tradeDataService.GetBid(order.Product).then(
                    function (res) {
                        return res.data.BidPrice;
                    }, function () { return null });
            }
        }

        function getTransactionCost(order, strategy, currentPrice, quantity) {
            if (currentPrice > 0 && quantity > 0 && strategy.BrokerageDetail.BrokerageType !== "IG" && strategy.BrokerageDetail.BrokerageType !== "None") {
                return sOrdersPadService.GetTransactionCost(
                    strategy.BrokerageDetail.AccountType,
                    strategy.BrokerageDetail.BrokerageType,
                    order.Product.TradeVenueLoc,
                    currentPrice,
                    quantity,
                    order.Product.AssetType,
                    order.Action
                ).then(function (res) {
                    return res.data;
                });
            } else {
                return tool.when(0);
            }
        }

        function getCeilPriceBasedOnTickSize(price, product) {
            var tickSize = ticksizeService.getTickSize(price, product.Currency, product.TradeVenueLoc, product.ProductTickSizeValueIfBelongToGroup,
                true, product.AssetType);
            var tickRatio = 1 / tickSize;
            return Math.ceil(price * tickRatio) / tickRatio;
        }

        function getFloorPriceBasedOnTickSize(price, product) {
            var tickSize = ticksizeService.getTickSize(price, product.Currency, product.TradeVenueLoc, product.ProductTickSizeValueIfBelongToGroup,
                false, product.AssetType);
            var tickRatio = 1 / tickSize;
            return Math.floor(price * tickRatio) / tickRatio;
        }

        function recomputeBracketOrderBasedOnPriceEstimation(parentOrderPrice, order, percentDistance) {
            var takeProfitOrder = order.TakeProfitOrder;
            var stopLossOrder = order.StopLossOrder;
            var action = order.Action;
            var distance = parentOrderPrice * percentDistance / 100;
            if (action === 'Buy') {
                takeProfitOrder.LimitPrice = parentOrderPrice + distance;
                stopLossOrder.StopPrice = (parentOrderPrice - distance) < 0 ? 0 : (parentOrderPrice - distance);
            } else if (action === 'Sell') {
                takeProfitOrder.LimitPrice = (parentOrderPrice - distance) < 0 ? 0 : (parentOrderPrice - distance);
                stopLossOrder.StopPrice = parentOrderPrice + distance;
            }

            function roundValueFromTickSize() {
                if (action === 'Buy') {
                    takeProfitOrder.LimitPrice = getCeilPriceBasedOnTickSize(takeProfitOrder.LimitPrice, order.Product);
                    stopLossOrder.StopPrice = getFloorPriceBasedOnTickSize(stopLossOrder.StopPrice, order.Product);
                } else if (action === 'Sell') {
                    takeProfitOrder.LimitPrice = getFloorPriceBasedOnTickSize(takeProfitOrder.LimitPrice, order.Product);
                    stopLossOrder.StopPrice = getCeilPriceBasedOnTickSize(stopLossOrder.StopPrice, order.Product);
                }
            }

            roundValueFromTickSize();
        }

        function getOrderPriceKey(order) {
            var key = "";
            var orderType = order.OrderType;
            if (orderType === 'Limit' && order.LimitPrice) {
                key = orderType + order.LimitPrice.toString() + order.Product.ProductName;
            } else if (orderType === 'Stop' && order.StopPrice) {
                key = orderType + order.StopPrice.toString() + order.Product.ProductName;
            } else if (orderType === 'Market') {
                key = orderType + order.Product.ProductName;
            }
            return key;
        }

        function getBracketOrderUpperBound(price, order) {
            var step = getDecrementPriceStep(price,
                order.Product.Currency,
                order.Product.TradeVenueLoc,
                order.Product.ProductTickSizeValueIfBelongToGroup,
                order.Product.AssetType);

            return _.max([addValueWithStep(price, orderTicksNum * step), addValueWithStep(price, (price * orderLevelMargin / 100))]);
        }

        function getBracketOrderLowerBound(price, order) {
            var step = getDecrementPriceStep(price,
                order.Product.Currency,
                order.Product.TradeVenueLoc,
                order.Product.ProductTickSizeValueIfBelongToGroup,
                order.Product.AssetType);

            return _.min([addValueWithStep(price, (-1) * orderTicksNum * step), addValueWithStep(price, (-1) * price * orderLevelMargin / 100)]);
        }

        function getRoundUpPrice(price, product) {
            var tickSize = ticksizeService.getTickSize(price, product.Currency, product.TradeVenueLoc, product.ProductTickSizeValueIfBelongToGroup,
                true, product.AssetType);
            var tickRatio = 1 / tickSize;
            price = Math.ceil(price * tickRatio) / tickRatio;
            return price;
        }

        function getRoundDownPrice(price, product) {
            var tickSize = ticksizeService.getTickSize(price, product.Currency, product.TradeVenueLoc, product.ProductTickSizeValueIfBelongToGroup,
                false, product.AssetType);
            var tickRatio = 1 / tickSize;
            price = Math.floor(price * tickRatio) / tickRatio;
            return price;
        }

        function getOrderLevelBracketOrderErrorMessage(order, orderPrice) {
            var message = "";
            if (orderPrice && orderPrice !== "empty") {
                if (order.Action === 'Sell') {
                    if (order.TakeProfitOrder && order.TakeProfitOrder.LimitPrice != null) {
                        if (order.TakeProfitOrder.LimitPrice >= orderPrice) {
                            message = "Price for Take Profit must be lower than parent order price";
                        } else if (order.TakeProfitOrder.LimitPrice < getBracketOrderLowerBound(orderPrice, order)) {
                            message = "Please enter a valid price between " + getRoundUpPrice(getBracketOrderLowerBound(orderPrice, order), order.Product)
                                + " and " + getRoundDownPrice(orderPrice, order.product) + " for Take Profit";
                        }
                    }
                    if (order.StopLossOrder && order.StopLossOrder.StopPrice != null) {
                        if (order.StopLossOrder.StopPrice <= orderPrice) {
                            message = "Price for Stop Loss must be higher than parent order price";
                        } else if (order.StopLossOrder.StopPrice > getBracketOrderUpperBound(orderPrice, order)) {
                            message = "Please enter a valid price between " + getRoundUpPrice(orderPrice, order.Product)
                                + " and " + getRoundDownPrice(getBracketOrderUpperBound(orderPrice, order), order.Product) + " for Stop Loss";
                        }
                    }
                } else {
                    if (order.TakeProfitOrder && order.TakeProfitOrder.LimitPrice != null) {
                        if (order.TakeProfitOrder.LimitPrice <= orderPrice) {
                            message = "Price for Take Profit must be higher than parent order price";
                        } else if (order.TakeProfitOrder.LimitPrice > getBracketOrderUpperBound(orderPrice, order)) {
                            message = "Please enter a valid price between " + getRoundUpPrice(orderPrice, order.Product)
                                + " and " + getRoundDownPrice(getBracketOrderUpperBound(orderPrice, order), order.Product) + " for Take Profit";
                        }
                    }
                    if (order.StopLossOrder && order.StopLossOrder.StopPrice != null) {
                        if (order.StopLossOrder.StopPrice >= orderPrice) {
                            message = "Price for Stop Loss must be lower than parent order price ";
                        } else if (order.StopLossOrder.StopPrice < getBracketOrderLowerBound(orderPrice, order)) {
                            message = "Please enter a valid price between " + getRoundUpPrice(getBracketOrderLowerBound(orderPrice, order), order.Product)
                                + " and " + getRoundDownPrice(orderPrice, order.Product) + " for Stop Loss";
                        }
                    }
                }
            }
            return message;
        }

        function getPositionLevelBracketOrderErrorMessage(order, orderPrice) {
            var message = "";
            if (orderPrice && orderPrice !== "empty") {
                var aep = order.AverageEntryPrice;

                if (order.PositionType === 'Short') {
                    if (order.TakeProfitOrder && order.TakeProfitOrder.LimitPrice != null && order.StopLossOrder && order.StopLossOrder.StopPrice != null) {
                        if (order.TakeProfitOrder.LimitPrice >= order.StopLossOrder.StopPrice) {
                            message = "Price for Take Profit must be lower than Price for Stop Loss";
                        }
                    }

                    if (aep > orderPrice) {
                        if (order.TakeProfitOrder && order.TakeProfitOrder.LimitPrice != null) {
                            if (order.TakeProfitOrder.LimitPrice >= aep || order.TakeProfitOrder.LimitPrice < getBracketOrderLowerBound(orderPrice, order)) {
                                aep = getRoundDownPrice(aep, order.Product);

                                message = "Please enter a valid price between " + getRoundUpPrice(getBracketOrderLowerBound(orderPrice, order), order.Product) + " and " + aep + " for Take Profit";
                            }
                        }
                        if (order.StopLossOrder && order.StopLossOrder.StopPrice != null) {
                            if (order.StopLossOrder.StopPrice < orderPrice || order.StopLossOrder.StopPrice > getBracketOrderUpperBound(aep, order)) {
                                message = "Please enter a valid price between " + getRoundUpPrice(orderPrice, order.Product) + " and " + getRoundDownPrice(getBracketOrderUpperBound(aep, order), order.Product) + " for Stop Loss";
                            }
                        }
                    } else {
                        if (order.TakeProfitOrder && order.TakeProfitOrder.LimitPrice != null) {
                            if (order.TakeProfitOrder.LimitPrice > orderPrice || order.TakeProfitOrder.LimitPrice < getBracketOrderLowerBound(aep, order)) {
                                orderPrice = getRoundDownPrice(orderPrice, order.Product);

                                message = "Please enter a valid price between " + getRoundUpPrice(getBracketOrderLowerBound(aep, order), order.Product) + " and " + orderPrice + " for Take Profit";
                            }
                        }
                        if (order.StopLossOrder && order.StopLossOrder.StopPrice != null) {
                            if (order.StopLossOrder.StopPrice < orderPrice || order.StopLossOrder.StopPrice > getBracketOrderUpperBound(orderPrice, order)) {
                                orderPrice = getRoundUpPrice(orderPrice, order.Product);

                                message = "Please enter a valid price between " + orderPrice + " and " + getRoundDownPrice(getBracketOrderUpperBound(orderPrice, order), order.Product) + " for Stop Loss";
                            }
                        }
                    }
                } else {
                    if (order.TakeProfitOrder && order.TakeProfitOrder.LimitPrice != null && order.StopLossOrder && order.StopLossOrder.StopPrice != null) {
                        if (order.TakeProfitOrder.LimitPrice <= order.StopLossOrder.StopPrice) {
                            message = "Price for Take Profit must be greater than Price for Stop Loss";
                        }
                    }

                    if (aep > orderPrice) {
                        if (order.TakeProfitOrder && order.TakeProfitOrder.LimitPrice != null) {
                            if (order.TakeProfitOrder.LimitPrice < orderPrice || order.TakeProfitOrder.LimitPrice > getBracketOrderUpperBound(aep, order)) {
                                orderPrice = getRoundUpPrice(orderPrice, order.Product);

                                message = "Please enter a valid price between " + orderPrice + " and " + getRoundDownPrice(getBracketOrderUpperBound(aep, order), order.Product) + " for Take Profit";
                            }
                        }
                        if (order.StopLossOrder && order.StopLossOrder.StopPrice != null) {
                            if (order.StopLossOrder.StopPrice > orderPrice || order.StopLossOrder.StopPrice < getBracketOrderLowerBound(orderPrice, order)) {
                                orderPrice = getRoundDownPrice(orderPrice, order.Product);

                                message = "Please enter a valid price between " + getRoundUpPrice(getBracketOrderLowerBound(orderPrice, order), order.Product) + " and " + orderPrice + " for Stop Loss";
                            }
                        }
                    } else {
                        if (order.TakeProfitOrder && order.TakeProfitOrder.LimitPrice != null) {
                            if (order.TakeProfitOrder.LimitPrice <= aep || order.TakeProfitOrder.LimitPrice > getBracketOrderUpperBound(orderPrice, order)) {
                                aep = getRoundUpPrice(aep, order.Product);
                                message = "Please enter a valid price between " + aep + " and " + getRoundDownPrice(getBracketOrderUpperBound(orderPrice, order), order.Product) + " for Take Profit";
                            }
                        }
                        if (order.StopLossOrder && order.StopLossOrder.StopPrice != null) {
                            if (order.StopLossOrder.StopPrice > orderPrice || order.StopLossOrder.StopPrice < getBracketOrderLowerBound(aep, order)) {
                                orderPrice = getRoundDownPrice(orderPrice, order.Product);

                                message = "Please enter a valid price between " + getRoundUpPrice(getBracketOrderLowerBound(aep, order), order.Product) + " and " + orderPrice + " for Stop Loss";
                            }
                        }
                    }
                }
            }

            return message;
        }


        // --- SCOPE FUNC
        function increaseLimitPrice(order) {
            var step = getIncrementPriceStep(order.LimitPrice,
                order.Product.Currency,
                order.Product.TradeVenueLoc,
                order.Product.ProductTickSizeValueIfBelongToGroup,
                order.Product.AssetType);
            order.LimitPrice = addValueWithStep(order.LimitPrice, step);
        }

        function decreaseLimitPrice(order) {
            var step = getDecrementPriceStep(order.LimitPrice,
                order.Product.Currency,
                order.Product.TradeVenueLoc,
                order.Product.ProductTickSizeValueIfBelongToGroup,
                order.Product.AssetType);
            order.LimitPrice = addValueWithStep(order.LimitPrice, -step);
        }

        function increaseStopPrice(order) {
            var step = getIncrementPriceStep(order.StopPrice,
                order.Product.Currency,
                order.Product.TradeVenueLoc,
                order.Product.ProductTickSizeValueIfBelongToGroup,
                order.Product.AssetType);
            order.StopPrice = addValueWithStep(order.StopPrice, step);
        }

        function decreaseStopPrice(order) {
            var step = getDecrementPriceStep(order.StopPrice,
                order.Product.Currency,
                order.Product.TradeVenueLoc,
                order.Product.ProductTickSizeValueIfBelongToGroup,
                order.Product.AssetType);
            order.StopPrice = addValueWithStep(order.StopPrice, -step);
        }

        function getExchangeRates() {
            sTradingExchangeRateService.loadAllExchangeRates();
            return sTradingExchangeRateService.exchangeRateLoaded.then(function () {
                exchangeRates = sTradingExchangeRateService.allExchangeRates;
                return getExchangeRate;
            }, function () {
                coreNotificationService.notifyError("failed to retrieve exchange rate");
            });
        }

        function isProductStrategyBrokerTradable(product, strategy) {
            if (!product || !strategy) {
                return tool.when(true);
            }
            var productId = product.ProductId;
            var brokerType = strategy.BrokerageDetail.BrokerageType;
            var name = productId + "_" + brokerType;
            if (cachedProductStrategyBrokerTradableResult[name]) {
                return tool.when(cachedProductStrategyBrokerTradableResult[name]);
            } else {
                var deferred = tool.defer();
                sProductService.IsProductTradeableForBroker(productId, brokerType)
                    .then(function (res) {
                        var result = res.data.Data;
                        cachedProductStrategyBrokerTradableResult[name] = result;
                        deferred.resolve(result);
                    }, function () {
                        deferred.resolve(false);
                    });
                return deferred.promise;
            }
        }

        function getProductStrategyPosition(productId, strategyId) {

            if (!productId || !strategyId) {
                return tool.when(null);
            }

            var name = productId + "_" + strategyId;

            if (cachedProductStrategyPositionResult[name]) {
                return tool.when(cachedProductStrategyPositionResult[name]);
            } else {
                return sOrdersPadService.CheckOpenedPositionForProduct(strategyId,
                    productId).then(function (res) {
                        cachedProductStrategyPositionResult[name] = res.data;
                        return res.data;
                    });
            }
        }

        function getIntention(position, order) {
            var intention = "Unknown";
            var q = getOrderQuantity(order);

            var isLong = position.PositionType === "Long";
            if (isLong) {
                intention = order.Action === "Buy" ? "Increase" : "Exit";
            } else {
                intention = order.Action === "Buy" ? "Exit" : "Increase";
            }
            if (intention === "Exit") {
                if (q < position.QuantityOnHold) {
                    intention = "Partial Exit";
                } else if (q === position.QuantityOnHold) {
                    intention = "Full Exit";
                } else {
                    intention = "Overshot";
                }
            }

            return intention;
        }

        function deductIntention(order, strategy) {
            return getProductStrategyPosition(order.Product.ProductId, strategy.DisplayInfo.BasicInfo.StrategyId).then(function (position) {
                if (!position || position.QuantityOnHold === 0) {
                    return {
                        position: {
                            QuantityOnHold: 0,
                            PositionType: order.Action === "Buy" ? "Long" : "Short"
                        },
                        intention: "New"
                    }
                }

                return {
                    position: position,
                    intention: getIntention(position, order)
                }
            });
        }

        function isStrategyCompatible(order, strategy) {
            if (!order || !order.Product || !strategy) {
                return tool.when(0);
            }

            var p0 = isProductStrategyBrokerTradable(order.Product, strategy);
            var p1 = isProductStrategyAssetCompatible(order.Product, strategy);
            var p4 = isProductStrategyTradeVenueCompatible(order.Product, strategy);
            var p2 = order.Action === "Sell" ? isProductStrategyShortable(order.Product, strategy) : tool.when(true);
            var p3 = deductIntention(order, strategy);

            return tool.onceAll([p0, p1, p2, p3, p4]).then(function (ress) {
                var returnedValue = 0;
                var checkOk = ress[0] && ress[1] && ress[4];
                var intention = ress[3].intention;
                var isShortable = ress[2]; // && false;// hack
                var noDirectionIssue = true;
                var notOvershot = intention !== 'Overshot';
                if (!isShortable) {
                    noDirectionIssue = !(ress[3].position.PositionType === 'Short' && ress[3].intention === 'New');
                }
                if (checkOk && noDirectionIssue) {
                    returnedValue = 0;
                } else if (!ress[0]) {
                    returnedValue = -100;
                } else if (!(ress[1] && ress[4])) {
                    returnedValue = -101;
                } else if (!noDirectionIssue) {
                    returnedValue = -200;
                }
                return returnedValue;
            });
        }

        function getCurrentOrderPrice(order, type) {
            var orderType = order.OrderType;
            if (orderType === 'Limit') {
                return tool.when(order.LimitPrice);
            } else if (orderType === 'Stop') {
                return tool.when(order.StopPrice);
            } else if (orderType === 'Market' && type === "order") {
                return getMarketPrice(order);
            } else if (orderType === 'Market' && type === "position") {
                return getMarketPriceForPositionBracketOrder(order);
            }
        }

        function updateMarketPriceForProduct(product) {
            var p1 = tradeDataService.GetAsk(product).then(
                function (res) {
                    product.askSize = res.data.AskSize;
                    product.askPrice = res.data.AskPrice;
                });
            var p2 = tradeDataService.GetBid(product).then(
                function (res) {
                    product.bidPrice = res.data.BidPrice;
                    product.bidSize = res.data.BidSize;
                });

            return tool.onceAll([p1, p2]);
        }

        function getTransactionInfo(order, strategy) {
            if (!order || !strategy || !order.Product) {
                return tool.when(null);
            }

            var currentPrice = 0;
            var transactionCost = 0;
            var mainPromises = [], subPromises = [];
            var leverage = 1;
            var multiplier = 1;
            var quantity = getOrderQuantity(order);
            var transactionInfo = {};

            subPromises.push(getCurrentOrderPrice(order, "order").then(function (p) {
                currentPrice = p;
            }));
            subPromises.push(getProductLeverage(order.Product, strategy).then(function (l) {
                leverage = l.Leverage;
                multiplier = l.Multiplier;
            }));
            mainPromises.push(getExchangeRates());
            mainPromises.push(tool.onceAll(subPromises).then(function () {
                return getTransactionCost(order, strategy, currentPrice, quantity).then(function (tc) {
                    transactionCost = tc;
                });
            }));

            return tool.onceAll(mainPromises).then(function () {
                transactionInfo.Leverage = leverage;
                transactionInfo.Multiplier = multiplier;
                if (currentPrice >= 0 && quantity >= 0) {
                    transactionInfo.TradeAmount = currentPrice * quantity * multiplier * getExchangeRate(order.Product.Currency, strategy.CapitalInfo.Currency);
                } else {
                    transactionInfo.TradeAmount = null;
                }
                if (currentPrice > 0 && quantity > 0) {
                    if (transactionInfo.TradeAmount != null) {
                        transactionInfo.CapitalUsed = transactionInfo.TradeAmount / transactionInfo.Leverage + transactionCost * getExchangeRate(order.Product.Currency, strategy.CapitalInfo.Currency);
                    }
                } else if (currentPrice > 0 || quantity > 0) {
                    transactionInfo.CapitalUsed = 0;
                } else {
                    transactionInfo.CapitalUsed = null;
                }
                return transactionInfo;
            });
        }

        function updateOrderQuantity(order) {
            order.Quantity = getOrderQuantity(order);
        }

        function reevaluateBracketOrder(order) {
            var price = null;
            if (order.OrderType === 'Limit') {
                price = order.LimitPrice;
            } else if (order.OrderType === 'Stop') {
                price = order.StopPrice;
            }
            if (price && !order.OpenInOracle) {
                recomputeBracketOrderBasedOnPriceEstimation(price, order, coreConfigService.Trading.OffSetBracketOrderValue);
            }
        }

        function updateOrderPrice(order, offSetBracketOrderValue) {
            var p = getMarketPrice(order);
            var orderType = order.OrderType;

            if (p) {
                return p.then(function (price) {
                    if (orderType === 'Limit') {
                        order.LimitPrice = price;
                        order.StopPrice = null;
                    } else if (orderType === 'Stop') {
                        order.StopPrice = price;
                        order.LimitPrice = null;
                    } else {
                        order.StopPrice = null;
                        order.LimitPrice = null;
                    }
                    if (!order.OpenInOracle && order.HasBracketOrder) {
                        recomputeBracketOrderBasedOnPriceEstimation(price, order, offSetBracketOrderValue);
                    }

                    return tool.when(true);
                }, function () {
                    order.StopPrice = null;
                    order.LimitPrice = null;

                    var takeProfitOrder = order.TakeProfitOrder;
                    var stopLossOrder = order.StopLossOrder;
                    takeProfitOrder.LimitPrice = null;
                    stopLossOrder.StopPrice = null;
                });
            }
            return tool.when(false);
        }

        function clearCache() {
            cachedProductStrategyShortableResult = [];
            cachedProductStrategyBrokerTradableResult = [];
            cachedProductStrategyPositionResult = [];
            cachedProductLeverageResult = [];
        }

        function increaseTakeProfitPrice(order) {
            if (order.TakeProfitOrder && order.TakeProfitOrder.LimitPrice !== null) {
                var step = getIncrementPriceStep(order.TakeProfitOrder.LimitPrice,
                    order.Product.Currency,
                    order.Product.TradeVenueLoc,
                    order.Product.ProductTickSizeValueIfBelongToGroup,
                    order.Product.AssetType);

                order.TakeProfitOrder.LimitPrice = addValueWithStep(order.TakeProfitOrder.LimitPrice, step);
            }
        }

        function decreaseTakeProfitPrice(order) {
            if (order.TakeProfitOrder && order.TakeProfitOrder.LimitPrice !== null) {
                var step = getDecrementPriceStep(order.TakeProfitOrder.LimitPrice,
                    order.Product.Currency,
                    order.Product.TradeVenueLoc,
                    order.Product.ProductTickSizeValueIfBelongToGroup,
                    order.Product.AssetType);

                order.TakeProfitOrder.LimitPrice = addValueWithStep(order.TakeProfitOrder.LimitPrice, -step);
            }
        }

        function getBracketOrderErrorMessage(order, type) {

            if (order.HasAttachedTP) {
                if (!(order.TakeProfitOrder.LimitPrice > 0))
                    return "Please enter a valid limit price for Take Profit";
            }

            if (order.HasAttachedSL) {
                if (!(order.StopLossOrder.StopPrice > 0))
                    return "Please enter a valid stop price for Stop Loss";
            }

            var key = getOrderPriceKey(order);

            if (!orderPriceDict[key] && key !== "") {
                orderPriceDict[key] = "empty";
                getCurrentOrderPrice(order, type).then(function (p) {
                    orderPriceDict[key] = p;
                });
            }

            var orderPrice = orderPriceDict[key];
            var message = "";

            if (type === "position") {
                message = getPositionLevelBracketOrderErrorMessage(order, orderPrice);
            } else {
                message = getOrderLevelBracketOrderErrorMessage(order, orderPrice);
            }

            return message;
        }

        function increaseCutLossPrice(order) {
            if (order.StopLossOrder && order.StopLossOrder.StopPrice !== null) {
                var step = getIncrementPriceStep(order.StopLossOrder.StopPrice,
                    order.Product.Currency,
                    order.Product.TradeVenueLoc,
                    order.Product.ProductTickSizeValueIfBelongToGroup);

                order.StopLossOrder.StopPrice = addValueWithStep(order.StopLossOrder.StopPrice, step);
            }
        }

        function decreaseCutLossPrice(order) {
            if (order.StopLossOrder && order.StopLossOrder.StopPrice !== null) {
                var step = getDecrementPriceStep(order.StopLossOrder.StopPrice,
                    order.Product.Currency,
                    order.Product.TradeVenueLoc,
                    order.Product.ProductTickSizeValueIfBelongToGroup,
                    order.Product.AssetType);

                order.StopLossOrder.StopPrice = addValueWithStep(order.StopLossOrder.StopPrice, -step);
            }
        }

        function computeBracketOrderPercentage(order, price) {
            var refPrice = null;
            switch (order.OrderType) {
                case 'Limit':
                    refPrice = order.LimitPrice;
                    break;
                case 'Stop':
                    refPrice = order.StopPrice;
                    break;
                case 'Market':
                    if (order.Product && order.Action === 'Buy') {
                        // parent order is going to buy at ask price so it hits
                        refPrice = order.Product.askPrice;
                    } else if (order.Product && order.Action === 'Sell') {
                        // parent order is going to sell at bid price so it hits
                        refPrice = order.Product.bidPrice;
                    }
                    break;
            }

            if (price == null || refPrice == null) {
                return null;
            }

            var priceDifference = order.Action === 'Buy' ? (price - refPrice) : (refPrice - price);

            return priceDifference / refPrice;
        }

        function topUpStrategyCapital(strategyId) {
            dep.$window.open("/Home/Inside#/tradeportfoliosettings?tradePortfolioId=" + strategyId);
        }

        function refreshStrategyFlags(allStrategies, order, currentStrategy) {
            var promises = [];
            var currentStrategyPromise = null;
            allStrategies.forEach(function (s) {
                s.compatibleValue = 0;
                var p = isStrategyCompatible(order, s).then(function (res) {
                    s.compatibleValue = res;
                });
                // promise wait only for particular strategy
                if (currentStrategy && s === currentStrategy) {
                    currentStrategyPromise = p;
                } else {
                    // wait for all
                    promises.push(p);
                }
            });
            // promise wait only for particular strategy
            if (currentStrategyPromise) {
                return currentStrategyPromise;
            } else {
                // wait for all
                return tool.onceAll(promises);
            }
        }

        function sendOrder(order, brokerageType, onSuccess, onError, onLoginRequired) {
            if (order.Action === 'Cancel') {
                var cancelRequest = {
                    StrategyId: order.StrategyId,
                    OrderIdToCancel: order.OrderId,
                    OrderId: null,
                    BrokerOrderId: null,
                    BrokerageAccountId: null,
                    BrokerAccountNumber: null,
                    TraderRemark: order.TraderRemark
                };

                // TODO: MaRa IMPLEMENT LOGIN POPUP FORM FOR UNAUTHORIZED
                return orderService.CancelDeveloperOrder(cancelRequest)
                    .then(function (res) {
                        onSuccess(res.data);
                    }, function (res) {
                        onError(res.data);
                    });
            } else {
                // TODO: MaRa IMPLEMENT LOGIN POPUP FORM FOR UNAUTHORIZED
                return orderService.SendDeveloperOrder(order)
                    .then(function (res) {
                        onSuccess(res.data);
                    }, function (res) {
                        if (res.status === 504) {
                            onError({ Message: 'Timeout while sending order' });
                        } else {
                            onError(res.data);
                        }
                    });
            }
        }

        function cancelOrderSilently(order, selectedStrategy) {
            var cancelRequest = {
                StrategyId: order.StrategyId,
                OrderIdToCancel: order.OrderId,
                OrderId: null,
                BrokerOrderId: null,
                BrokerageAccountId: null,
                BrokerAccountNumber: null,
                TraderRemark: order.TraderRemark
            };
            var deferred = tool.defer();
            orderService.CancelDeveloperOrder(cancelRequest)
                .then(function (res) {
                    deferred.resolve(res);
                }, function (res) {
                    deferred.reject();
                });
            return deferred.promise;
        }

        function subscribeToRealTimeMarketData(product) {
            coreSignalRMarketDataService.invoke("RT", "SubscribeMarketData",
                product.ProductId,
                commonEnumResolverService.getAssetTypeId(product.AssetType),
                product.Symbol,
                commonEnumResolverService.getTradeVenueLocId(product.TradeVenueLoc)).then(function () {
                    tool.log("Subscribed to RT Market Data " + product.Symbol);
                }, function () {
                    tool.logError("Error invoking subscribe RT Market Data");
                });
        }

        function unSubscribeToRealTimeMarketData(product) {
            coreSignalRMarketDataService.invoke("RT", "UnSubscribeMarketData", product.ProductId, product.Symbol).then(
                function () {
                    tool.log("Unsubscribe to RT Market Data " + product.Symbol);
                }, function () {
                    tool.logError("Error invoking unsubscribe to RT Market Data");
                });
        }

        function getIncrementPriceStep(price, currency, venue, productTickSizeValueIfBelongToGroup, assetClass) {
            var step = ticksizeService.getTickSize(price,
                currency,
                venue,
                productTickSizeValueIfBelongToGroup,
                true,
                assetClass);
            return step;
        }

        function getDecrementPriceStep(price, currency, venue, productTickSizeValueIfBelongToGroup, assetClass) {
            var step = ticksizeService.getTickSize(price,
                currency,
                venue,
                productTickSizeValueIfBelongToGroup,
                false,
                assetClass);
            return step;
        }

        tool.setServiceObjectProperties({
            getBracketOrderErrorMessage: getBracketOrderErrorMessage,
            computeBracketOrderPercentage: computeBracketOrderPercentage,
            increaseTakeProfitPrice: increaseTakeProfitPrice,
            decreaseTakeProfitPrice: decreaseTakeProfitPrice,
            increaseCutLossPrice: increaseCutLossPrice,
            decreaseCutLossPrice: decreaseCutLossPrice,
            reevaluateBracketOrder: reevaluateBracketOrder,
            updateOrderQuantity: updateOrderQuantity,
            getTransactionInfo: getTransactionInfo,
            getExchangeRates: getExchangeRates,
            getCurrentOrderPrice: getCurrentOrderPrice,
            updateOrderPrice: updateOrderPrice,
            isStrategyCompatible: isStrategyCompatible,
            deductIntention: deductIntention,
            getIntention: getIntention,
            updateMarketPriceForProduct: updateMarketPriceForProduct,
            getProductStrategyPosition: getProductStrategyPosition,
            increaseLimitPrice: increaseLimitPrice,
            decreaseLimitPrice: decreaseLimitPrice,
            clearCache: clearCache,
            increaseStopPrice: increaseStopPrice,
            decreaseStopPrice: decreaseStopPrice,
            getCeilPriceBasedOnTickSize: getCeilPriceBasedOnTickSize,
            getFloorPriceBasedOnTickSize: getFloorPriceBasedOnTickSize,
            topUpStrategyCapital: topUpStrategyCapital,
            refreshStrategyFlags: refreshStrategyFlags,
            sendOrder: sendOrder,
            cancelOrderSilently: cancelOrderSilently,            
            subscribeToRealTimeMarketData: subscribeToRealTimeMarketData,
            unSubscribeToRealTimeMarketData: unSubscribeToRealTimeMarketData
        });
    });