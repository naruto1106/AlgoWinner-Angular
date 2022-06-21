agmNgModuleWrapper('agms.activity')
    .defineControllerAsPopup('s.activity.ManageNotificationController',
        {
            templateUrl: "/App/shared/activity/activity.manageNotification.html",
            windowClass: 'smaller-modal'
        },
        [
            'visibleAspects'
        ],
        function(vm, dep, tool) {
            vm.visibleAspects = {
                SubscribedStrategies: true,
                MarketPlayerStrategies: true,
                // SubscribedStrategies: false,
                // MarketPlayerStrategies: false,
                TradingActivities: true,
                FeedsActivities: true,
                PriceAlerts: true,
                TradersGPS: true
            };
            if (dep.visibleAspects) {
                vm.visibleAspects = dep.visibleAspects;
            }
        });