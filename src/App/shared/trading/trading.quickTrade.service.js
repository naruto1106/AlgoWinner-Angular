agmNgModuleWrapper("agms.trading")
    .defineService('sTradingQuickTradeService',
        ['sAccountService', 'orderPadInitService', 'sStrategyCommerceService'],
        function(serviceObj, dep, tool) {

            var myStrategies = [];
            var myTradingAccounts = [];

            var sStrategyCommerceService = dep.sStrategyCommerceService,
                sAccountService = dep.sAccountService,
                orderPadInitService = dep.orderPadInitService;

            function reinit() {
                var deferred = tool.defer();
                var p1 = sAccountService.GetBrokerageAccountsDetail()
                    .then(function(res) {
                        myTradingAccounts = res.data.filter(function(a) {
                            return a.BasicInfo.IsUsedForStrategy === true;
                        });
                        deferred.resolve();
                    }, function() {
                        deferred.reject(-1);
                    });
                var p2 = sStrategyCommerceService.GetStrategiesForTrading()
                    .then(function(res) {
                        myStrategies = res.data;
                        deferred.resolve();
                    }, function() {
                        deferred.reject(-2);
                    });

                return tool.onceAll([p1, p2]).then(function() {
                    return deferred.promise;
                });
            }

            function placeOrder(action, product) {
                return tool.openModalByDefinition('s.orders.PadDeveloperPopupController', {
                    selectedStrategy: null,
                    dashboardFeed: null,
                    myStrategies: myStrategies,
                    reloadStrategiesPromiseFunc: function() {
                        var p2 = sAccountService.GetBrokerageAccountsDetail()
                            .then(function(res) {
                                myTradingAccounts = res.data.filter(function(a) {
                                    return a.BasicInfo.IsUsedForStrategy === true;
                                });
                                return myTradingAccounts;
                            });

                        var p1 = sStrategyCommerceService.GetStrategiesForTrading().then(function(res) {
                            myStrategies = res.data;
                            return myStrategies;
                        });

                        return tool.onceAll([p1, p2]).then(function() {
                            return {
                                accounts: myTradingAccounts,
                                strategies: myStrategies
                            }
                        });
                    },
                    myTradingAccounts: myTradingAccounts
                }, {
                    beforeOpenCallback: function() {
                        orderPadInitService.setDefaultDeveloperOrder();
                        var order = orderPadInitService.getOrder();
                        return function() {
                            order.Action = action;
                            order.Product = product;
                        }
                    }
                });
            }

            function placeOrderForOracle(action, product, bracketOrder) {
                return tool.openModalByDefinition('s.orders.PadDeveloperPopupController', {
                    selectedStrategy: null,
                    dashboardFeed: null,
                    myStrategies: myStrategies,
                    reloadStrategiesPromiseFunc: function () {
                        var p2 = sAccountService.GetBrokerageAccountsDetail()
                            .then(function (res) {
                                myTradingAccounts = res.data.filter(function (a) {
                                    return a.BasicInfo.IsUsedForStrategy === true;
                                });
                                return myTradingAccounts;
                            });

                        var p1 = sStrategyCommerceService.GetStrategiesForTrading().then(function (res) {
                            myStrategies = res.data;
                            return myStrategies;
                        });

                        return tool.onceAll([p1, p2]).then(function () {
                            return {
                                accounts: myTradingAccounts,
                                strategies: myStrategies
                            }
                        });
                    },
                    myTradingAccounts: myTradingAccounts
                }, {
                    beforeOpenCallback: function () {
                        orderPadInitService.setDefaultDeveloperOrder();
                        var order = orderPadInitService.getOrder();
                        return function () {
                            order.Action = action;
                            order.Product = product;

                            if (bracketOrder) {
                                order.HasAttachedSL = true;
                                order.HasAttachedTP = true;
                                order.HasBracketOrder = true;
                                order.OpenInOracle = true;
                                order.TakeProfitOrder = bracketOrder.TakeProfitOrder;
                                order.StopLossOrder = bracketOrder.StopLossOrder;
                            }
                        }
                    }
                });
            }

            tool.setServiceObjectProperties({
                reinit: reinit,
                placeOrder: placeOrder,
                placeOrderForOracle: placeOrderForOracle
            });
        });