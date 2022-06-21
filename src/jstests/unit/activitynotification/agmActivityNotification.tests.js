'use strict';

describe('test directive used to notify activities in FB-style notification panel', function () {
    describe('test s.activity.NotificationController', function () {
        beforeEach(module('agms.activity'));
        var $rootScope, $q, scope, controller, getNotificationsDeferred,
            getUnreadNotificationsCountDeferred, sActivityNotificationService;

        beforeEach(inject(function ($controller, _$rootScope_, _$q_) {
            scope = _$rootScope_.$new();
            $rootScope = _$rootScope_;
            $q = _$q_;
            getNotificationsDeferred = _$q_.defer();
            getUnreadNotificationsCountDeferred = _$q_.defer();
            sActivityNotificationService = {
                getNotifications: jasmine.createSpy().and.returnValue(getNotificationsDeferred.promise),
                getUnreadNotificationsCount: jasmine.createSpy().and.returnValue(getUnreadNotificationsCountDeferred.promise),
            };
            var coreSignalRNotificationService = {
                turnOn: jasmine.createSpy(),
                turnOff: jasmine.createSpy()
            };

            var sRoboStrategiesService = {
                getRoboStrategyIds: jasmine.createSpy().and.returnValue(_$q_.when([541,542,546,547]))
            } 

            controller = $controller('s.activity.NotificationController as vm', {
                $scope: scope,
                coreSignalRNotificationService: coreSignalRNotificationService,
                sActivityNotificationService: sActivityNotificationService,
                sRoboStrategiesService: sRoboStrategiesService
            });
        }));

        it('should request for last 10 notifications on load', function () {
            $rootScope.$apply();            
            expect(sActivityNotificationService.getNotifications).toHaveBeenCalledWith(10, [541,542,546,547],null);
            getNotificationsDeferred.resolve({
                data: [{ ActivityNotificationId: 1 }]
            });
            $rootScope.$apply();
            expect(scope.vm.notifications.length).toBe(1);
        });

        it('should request for number of unread notifications', function () {
            expect(sActivityNotificationService.getUnreadNotificationsCount).toHaveBeenCalled();
            getUnreadNotificationsCountDeferred.resolve({
                data: 12
            });
            $rootScope.$apply();
            expect(sActivityNotificationService.numUnread).toBe(12);
        });

        it('should request for next 10 notifications if user scrolls down', function () {
            $rootScope.$apply();
            expect(sActivityNotificationService.getNotifications).toHaveBeenCalledWith(10,  [541,542,546,547],null);
            getNotificationsDeferred.resolve({
                data: _.range(20, 10, -1).map(function (r) { return { ActivityNotificationId: r } })
            });
            $rootScope.$apply();
            expect(scope.vm.notifications.length).toBe(10);
            expect(scope.vm.hasReachedEnd).toBe(false);

            var newGetNotificationsDeferred = $q.defer();
            sActivityNotificationService.getNotifications =
                jasmine.createSpy().and.returnValue(newGetNotificationsDeferred.promise),
            scope.vm.getMoreNotifications();

            $rootScope.$apply();
            //should be called starting with index 10
            expect(sActivityNotificationService.getNotifications).toHaveBeenCalledWith(10, [541,542,546,547], 11);

            //only return 5 items from server
            newGetNotificationsDeferred.resolve({
                data: _.range(10, 5, -1).map(function (r) { return { ActivityNotificationId: r } })
            });
            $rootScope.$apply();

            expect(scope.vm.notifications.length).toBe(15);
            expect(scope.vm.hasReachedEnd).toBe(true);
        });
    });
});
