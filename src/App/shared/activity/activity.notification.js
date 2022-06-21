agmNgModuleWrapper("agms.activity")
    .defineController(
        "s.activity.NotificationController",
        ["commonAudioService", "sActivityNotificationService","sRoboStrategiesService"],
        function(vm, dep, tool) {
            var commonAudioService = dep.commonAudioService,
                coreUserStateService = dep.coreUserStateService,
                sActivityNotificationService = dep.sActivityNotificationService;
            var lastId = null;
            var numToFetch = 10;

            // --- LOCAL SERVICE FUNC
            function handleNotificationCreated(data) {
                /**
                 * Ignore Signal Order notification
                 */
                // if (data.ActivityNotificationType === "Signal Order") {
                //     return;
                // }

                if (
                    data.ActivityNotificationType === "Developer Order" &&
                    data.ImageUrl == null
                ) {
                    data.ImageUrl =
                        "//am708403.azureedge.net/images/profilePicture/defaultavatar.jpg?";
                }
                if (hasOrder(data)) {
                    cleanUpNotificationWithOrderId(data.DeveloperOrderId);
                }
                vm.notifications.push(data);

                sActivityNotificationService.numUnread++;
            }

            function handleNotificationClicked(notificationId) {
                vm.notifications.filter(function(item) {
                    return item.ActivityNotificationId === notificationId;
                })[0].Clicked = true;
            }

            function cleanUpNotificationWithOrderId(developerOrderId) {
                function hasSameDeveloperOrder(item) {
                    return (item.DeveloperOrderId && item.DeveloperOrderId == developerOrderId);
                }
                
                var deletedActivityNotificationIds = [];

                vm.notifications.forEach(function(item) {
                    var hasSame = hasSameDeveloperOrder(item);
                    if (hasSame) {
                        deletedActivityNotificationIds.push(
                            item.ActivityNotificationId
                        );
                    }
                    if (!item.isDeleted && hasSame && item.Unread) {
                        item.isDeleted = true;
                        sActivityNotificationService.numUnread--;
                    }
                });
            }

            function alertSelfOrder() {
                if (
                    coreUserStateService.notificationSettings.TradingActivities
                        .AlertSound
                ) {
                    commonAudioService.playTradeFeedAudio();
                }
            }

            function alertSubscribedOrder(obj) {

                if (_.includes(_roboStrategyIds, obj.StrategyId)) { return; }
                if (
                    obj.InvestmentLeaderId &&
                    vm.user.UserId === obj.InvestmentLeaderId
                ) {
                    if (
                        coreUserStateService.notificationSettings
                            .MarketPlayerStrategies.AlertSound &&
                        coreUserStateService.observedOrderStatus.indexOf(
                            obj.OrderStatus
                        ) >= 0
                    ) {
                        commonAudioService.playTradeFeedAudio();
                    }
                } else {
                    if (
                        coreUserStateService.notificationSettings
                            .SubscribedStrategies.AlertSound &&
                        coreUserStateService.observedOrderStatus.indexOf(
                            obj.OrderStatus
                        ) >= 0
                    ) {
                        commonAudioService.playTradeFeedAudio();
                    }
                }
            }

            // --- SCOPE FUNC
            function getEncodedSectorUrl(sectorName) {
                return (
                    "//am708403.azureedge.net/images/sector/" +
                    dep.$window.encodeURIComponent(sectorName) +
                    ".png?"
                );
            }

            function getPrice(content) {
                return content.OrderType === "Limit"
                    ? content.LimitPrice
                    : content.OrderType === "Stop"
                        ? content.StopPrice
                        : content.OrderPrice;
            }

            function setNotification() {
                tool.openModalByDefinition(
                    "s.activity.ManageNotificationController",
                    {
                        visibleAspects: null
                    }
                );
            }

            var _roboStrategyIds = []
          
            function getMoreNotifications() {
                vm.isLoading = true;
                dep.sRoboStrategiesService.getRoboStrategyIds().then(function(ids) {
                    _roboStrategyIds = ids;
                    sActivityNotificationService
                        .getNotifications(numToFetch, ids, lastId)
                        .then(
                            function(res) {
                                res.data.forEach(function(d) {
                                    if (
                                        d.ActivityNotificationType ===
                                            "Developer Order" &&
                                        d.ImageUrl == null
                                    ) {
                                        d.ImageUrl =
                                            "//am708403.azureedge.net/images/profilePicture/defaultavatar.jpg?";
                                    }
                                    vm.notifications.push(d);
                                    if (
                                        lastId === null ||
                                        d.ActivityNotificationId < lastId
                                    ) {
                                        lastId = d.ActivityNotificationId;
                                    }
                                });
                                vm.hasReachedEnd = res.data.length < numToFetch;
                                vm.isLoading = false;
                            },
                            function() {
                                tool.logError(
                                    "Failed to fetch notification activities"
                                );
                                vm.isLoading = false;
                                vm.hasReachedEnd = true;
                            }
                        );
                });

                sActivityNotificationService.getUnreadNotificationsCount().then(
                    function(res) {
                        sActivityNotificationService.numUnread = res.data;
                    },
                    function() {
                        tool.logError("Failed to unread notification count");
                    }
                );
            }

            function clickNotification(notification) {
                if (!notification.Clicked) {
                    sActivityNotificationService.markAsClicked({
                        ActivityNotificationId:
                            notification.ActivityNotificationId
                    });
                }
            }

            function markAllAsReadFunc() {
                sActivityNotificationService.markAllAsRead().then(function() {
                    sActivityNotificationService.numUnread = 0;
                });
            }

            function hasOrder(notification) {
                return notification.DeveloperOrderId;
            }

            tool.initialize(function() {
                tool.setVmProperties({
                    notifications: [],
                    getPrice: getPrice,
                    hasOrder: hasOrder,
                    clickNotification: clickNotification,
                    markAllAsReadFunc: markAllAsReadFunc,
                    getMoreNotifications: getMoreNotifications,
                    setNotification: setNotification,
                    getEncodedSectorUrl: getEncodedSectorUrl,
                    encodeImageUrl: dep.$window.encodeURI,
                    isLoading: false,
                    hasReachedEnd: false
                });

                getMoreNotifications();
                tool.signalRNotification(
                    "DeveloperOrderUpdated",
                    alertSelfOrder
                );
                tool.signalRNotification('SignalOrderCreated', alertSubscribedOrder);
                tool.signalRNotification('SignalOrderUpdated', alertSubscribedOrder);
                tool.signalRNotification(
                    "ActivityNotificationCreated",
                    handleNotificationCreated
                );
                tool.signalRNotification(
                    "ActivityNotificationClicked",
                    handleNotificationClicked
                );

                coreUserStateService.userInfoLoaded.then(function(res) {
                    vm.user = res;
                });
            });
        }
    )
    .defineDirectiveForE(
        "agms-activity-notification",
        [],
        function() {
            return {
                controller: "s.activity.NotificationController",
                templateUrl: "/App/shared/activity/activity.notification.html"
            };
        },
        {
            isNotificationOpen: "=",
            markAllAsReadFunc: "="
        }
    );
