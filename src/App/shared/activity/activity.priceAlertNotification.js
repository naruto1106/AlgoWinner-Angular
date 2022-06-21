agmNgModuleWrapper('agms.activity')
    .defineService('sActivityPriceAlertNotificationService', ['commonGenericNotificationBoxService', 'commonAudioService'],
        function(serviceObj, dep, tool) {
            var commonGenericNotificationBoxService = dep.commonGenericNotificationBoxService,
                coreUserStateService = dep.coreUserStateService,
                commonAudioService = dep.commonAudioService;

            var popupUpIds = [];

            function alertPriceAlert(activityNotification) {
                if (popupUpIds.indexOf(activityNotification.ActivityNotificationId) >= 0) {
                    return;
                }
                if (activityNotification.Title.indexOf("Price Alert") !== -1) {
                    if (coreUserStateService.notificationSettings.PriceAlerts.AlertSound) {
                        commonAudioService.playTradeFeedAudio();
                    }
                    popupUpIds.push(activityNotification.ActivityNotificationId);
                    commonGenericNotificationBoxService.notifyWithNewItem(activityNotification, '/App/shared/templates/shared.priceAlertNotification.template.html', {});
                }
            }

            tool.setServiceObjectProperties({
                start: function () {
                    tool.signalRNotification('ActivityNotificationCreated', alertPriceAlert);
                }
            });

        });
