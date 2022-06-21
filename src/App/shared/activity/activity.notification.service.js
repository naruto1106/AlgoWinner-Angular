agmNgModuleWrapper('agms.activity')
    .defineService('sActivityNotificationService', [], function(serviceObj, dep,tool) {
        var path = '/nsapi/Notification/';
        var acivityNotificationPath = '/nsapi/ActivityNotification/';

        var coreServerCommunicationService = dep.coreServerCommunicationService;

        tool.setServiceObjectProperties({
            numUnread: 0,
            getCurrentSettings: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetNotificationSetting'),
            modifySettings: coreServerCommunicationService.genPostFunction(path + 'ModifySetting'),

            getNotifications: coreServerCommunicationService.genGetFunctionWithNVar(acivityNotificationPath + 'GetActivityNotificationsExcludingRoboStrategies', function(args) {
                return { take: args[0],ids: args[1], fromId: args[2] };
            }),
            getUnreadNotificationsCount: coreServerCommunicationService.genGetFunctionWithNVar(acivityNotificationPath + 'GetUnreadActivityNotificationsCount'),
            markAllAsRead: coreServerCommunicationService.genPostFunction(acivityNotificationPath + 'MarkAllAsRead'),
            markAsClicked: coreServerCommunicationService.genPostFunction(acivityNotificationPath + 'MarkAsClicked')
        });
    });