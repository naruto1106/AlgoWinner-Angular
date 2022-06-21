'use strict';

describe('notification settings form test', function () {
   describe('test s.activity.NotificationSettingController', function () {

       var ctrl,
           $rootScope,
           $uibModalInstance,
           coreNotificationService,
           sActivityNotificationService,
           getSettingDeferred,
           saveSettingDeferred,
           sSubscriptionBundleService,
           sHeaderService;
       
        beforeEach(module('agms.activity'), function () {
        });

        beforeEach(inject(function ($controller, $q, _$rootScope_) {
            $rootScope = _$rootScope_;
            
            getSettingDeferred = $q.defer();
            saveSettingDeferred = $q.defer();

            $uibModalInstance = { close: jasmine.createSpy() };
            coreNotificationService = { notifySuccess: jasmine.createSpy(), notifyError: jasmine.createSpy() };
            sActivityNotificationService = {                
                modifySettings: jasmine.createSpy().and.returnValue(saveSettingDeferred.promise),
                getCurrentSettings: jasmine.createSpy().and.returnValue(getSettingDeferred.promise)
            };

            sSubscriptionBundleService = {
                IsSubscribedToBundleWithName: jasmine.createSpy().and.returnValue(getSettingDeferred.promise),
                GetBundleByName: jasmine.createSpy().and.returnValue(getSettingDeferred.promise),
                GetAllBundleSubscriptionsWithoutCoupon: jasmine.createSpy().and.returnValue(getSettingDeferred.promise)
            }

            sHeaderService = {}

            var coreConfigService = {
                SmsNotification: {
                    BundleName: ""
                }
            };

            ctrl = $controller('s.activity.NotificationSettingController', {
                $scope: $rootScope.$new(),
                $uibModalInstance: $uibModalInstance,
                sActivityNotificationService: sActivityNotificationService,
                sSubscriptionBundleService: sSubscriptionBundleService,
                sHeaderService: sHeaderService,
                coreConfigService: coreConfigService
            });
        }));      

        it('test save modified settings', function () {
            ctrl.currentSettings = {
                SubscribedStrategies: 'abc',
                TradingActivities: 'def',
                CommentsAndPosts: 'ghi',
                FeedsActivities: 'jkl'
            };
            ctrl.save();
            expect(sActivityNotificationService.modifySettings).toHaveBeenCalled();
        });
    });
});
