agmNgModuleWrapper('agmp.account')
    .defineControllerAsPopup('p.account.LiquidateAllController',
        {
            templateUrl: '/App/pages/account/account.liquidateAll.html',
            windowClass: 'full-size-modal'
        },
        [
            'brokerAccountId', 'positionsToLiquidate', 'accountUnrealizedPl', 'currency', 'orderType', 'orderService'
        ],
        function(vm, dep, tool) {
            var brokerAccountId = dep.brokerAccountId,
                positionsToLiquidate = dep.positionsToLiquidate,
                accountUnrealizedPl = dep.accountUnrealizedPl,
                currency = dep.currency,
                orderType = dep.orderType,
                orderService = dep.orderService;

            tool.setVmProperties({
                positionsToLiquidate: positionsToLiquidate,
                brokerAccountId: brokerAccountId,
                accountUnrealizedPl: accountUnrealizedPl,
                currency: currency,
                liquidateAll: liquidateAll
            });
            var notificationMessage = [];
            var promise;

            function liquidateAll() {
                for (var i = 0; i < positionsToLiquidate.length; i++) {
                    if (orderType === "Developer") {
                        var developerOrder = {
                            BrokerageAccountId: brokerAccountId,
                            ProductId: positionsToLiquidate[i].ProductId,
                            StrategyId: positionsToLiquidate[i].StrategyId,
                            Action: positionsToLiquidate[i].PositionType === "Long" ? "Sell" : "Buy",
                            Quantity: positionsToLiquidate[i].QuantityOnHold,
                            OrderType: "Market",
                            Validity: "Day",
                            HasBracketOrder: false,
                            ChildOrderType: "Normal"
                        }
                        promise = orderService.SendDeveloperOrder(developerOrder);
                        notificationMessage.push(promise);
                    }
                }

                tool.onceAll(notificationMessage).then(function(object) {
                    vm.uibClosePanel();
                    for (var j = 0; j < positionsToLiquidate.length; j++) {
                        if (object[j].status === 200) {
                            //positionsToLiquidate[j].orderStatus = {};
                            positionsToLiquidate[j].orderStatus = "Success";
                        } else {
                            positionsToLiquidate[j].orderStatus = "Failed";
                        }
                    }
                });
                vm.uibClosePanel();

                tool.openModalByDefinition('p.account.LiquidateAllFeedbackController', {
                    positionsToLiquidate: positionsToLiquidate
                });
            }
        }
    );