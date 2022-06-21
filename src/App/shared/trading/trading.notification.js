agmNgModuleWrapper('agms.trading', [
        'agms.orders',
        'agms.orders',
        'agms.subscription'
    ])
    .defineService('sTradingNotificationService', ['orderProcessing', 
     'commonGenericNotificationBoxService', 
    'sSubscriptionBundleService', 
    "sRoboStrategiesService"
],
    function (serviceObj, dep, tool) {
        var orderProcessing = dep.orderProcessing;
        var commonGenericNotificationBoxService = dep.commonGenericNotificationBoxService;
        var coreUserStateService = dep.coreUserStateService;
        var sSubscriptionBundleService = dep.sSubscriptionBundleService;

        function canShow(obj) {

            if (!user) {
                return false;
            }
            var canContinue = false;

            if (obj.InvestmentLeaderId && coreUserStateService.user.UserId === obj.InvestmentLeaderId) {
                if (coreUserStateService.notificationSettings.MarketPlayerStrategies.GlobalNotification
                    && coreUserStateService.observedOrderStatus.indexOf(obj.OrderStatus) >= 0) {
                    canContinue = true;
                }
            } else {
                if (coreUserStateService.notificationSettings.SubscribedStrategies.GlobalNotification
                    && coreUserStateService.observedOrderStatus.indexOf(obj.OrderStatus) >= 0) {
                    canContinue = true;
                }
            }
            return canContinue;
        }
        
        function notifyWithNewItem(item) {
            commonGenericNotificationBoxService.notifyWithNewItem(item, '/App/shared/templates/shared.tradeNotification.template.html', externalVm);
        }

        function alertSubscribedOrderCreation(obj) {
            if (!_.includes(_roboStrategies, obj.StrategyId)) { return; }
            // MaRa: We need a deep copy here since apparently signalR can broadcast the same object reference to both listening parties!!!
            existingFeeds["o" + obj.OrderId] = angular.copy(obj);
            var isValidStatusForDisplay = coreUserStateService.observedOrderStatus.indexOf(obj.LastOrderStatus) >= 0;
            if (isValidStatusForDisplay) {
                notifyWithNewItem(obj);
            }
        }

        function updateOrder(objUpdate) {
            if (_.includes(_roboStrategies, objUpdate.StrategyId)) { return; }
            var obj = existingFeeds["o" + objUpdate.OrderId];
            if (obj) {
                obj.OrderUpdates = obj.OrderUpdates || [];
                if (obj.LastUpdateTime < objUpdate.LastUpdatedTime) {
                    obj.OrderUpdates.push(objUpdate);
                    obj.LastOrderStatus = objUpdate.OrderStatus;
                    obj.LastUpdateTime = objUpdate.LastUpdatedTime;
                    obj.LastOrderUpdate = obj.OrderUpdates[obj.OrderUpdates.length - 1];
                    orderProcessing.aggregateOrderStatus(obj);

                    notifyWithNewItem(obj);
                    tool.timeout(function() {
                        obj.blink = true;
                        if (obj.blinkAnimation) {
                            dep.$timeout.cancel(obj.blinkAnimation);
                        }
                        obj.blinkAnimation = tool.timeout(function() {
                            obj.blink = false;
                        }, 5000);
                    });
                }
            }
            return obj;
        }

        function alertSubscribedOrderUpdate(objUpdateParam) {
            if (_.includes(_roboStrategies, objUpdateParam.StrategyId)) { return; }
            // MaRa: We need a deep copy here since apparently signalR can broadcast the same object reference to both listening parties!!!
            var objUpdate = angular.copy(objUpdateParam);
            if (!canShow(objUpdate)) {
                return;
            }
            updateOrder(objUpdate);
        }

        function getPrice(content) {
            return content.OrderType === "Limit" ? content.LimitPrice : content.OrderPrice;
        }

        function getDisplayInfo(id) {
            if (displayInfo[id]) {
                return displayInfo[id];
            }
            updateDisplayInfoDueToMissingItem();
            return null;
        }

        var existingFeeds = {};
        var displayInfo = [];
        var subscriptions = [];
        var user = null;


        tool.setServiceObjectProperties({
            start: start
        });

        var externalVm= {
            getPrice: getPrice,
            getDisplayInfo: getDisplayInfo
        }

        var isLoadingMissingItem = false;
        function updateDisplayInfoDueToMissingItem() {

            if (isLoadingMissingItem) {
                return tool.when();
            }

            isLoadingMissingItem = true;

            var p1 = sSubscriptionBundleService.GetSubscriptionsForNotification().then(function (res) {
                subscriptions = res.data;
                subscriptions.forEach(function (s) {
                    if (!_.includes(_roboStrategies, s.StrategyId)) {
                        displayInfo[s.StrategyId] = s.DisplayInfo;
                    }
                });
            });

            return tool.onceAll([p1]).finally(function() {
                isLoadingMissingItem = false;
            });
        }

        var _roboStrategies = [];
        function start() {

            dep.sRoboStrategiesService.getRoboStrategyIds().then(function(data){_roboStrategies = data})

            var promises = [];

            var p1 = updateDisplayInfoDueToMissingItem();
            promises.push(p1);
            var p4 = coreUserStateService.userInfoLoaded.then(function (res) {
                user = res;
            });
            promises.push(p4);
            tool.onceAll(promises).then(function() {
                tool.signalRNotification('SignalOrderCreated', alertSubscribedOrderCreation);
                tool.signalRNotification('SignalOrderUpdated', alertSubscribedOrderUpdate);
            });
        };
    });