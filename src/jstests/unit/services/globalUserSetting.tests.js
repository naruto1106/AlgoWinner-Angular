'use strict';

describe('test global user setting', function () {
    var $window,
        $rootScope,
        $httpBackend,
        subscriptionForTrading,
        coreSignalRNotificationService,
        userInfoDeferred,
        currentNotificationSettingsDeferred,
        coreNotificationService,
        premiumSubscriptionsDeferred,
        coreServerCommunicationService;
    var coreUserStateService;
    beforeEach(module('agm.core', function ($provide) {

        $window = { localStorage: { token: null }, ga: function(param1, param2, param3) {
            
        } };
        coreSignalRNotificationService = { turnOn: jasmine.createSpy() };
        coreServerCommunicationService = { 
            genGetFunctionWithNVar: function() {
                return jasmine.createSpy().and.returnValue(userInfoDeferred.promise);
            } 
        };
        coreNotificationService = { notifyErrorOkCancel: jasmine.createSpy() };
        $provide.value('$window', $window);
        var service = {
            AMPremiumBundle: {
                GetMySubscribedPremiumItems: function() {
                    return premiumSubscriptionsDeferred.promise;
                }
            }
        };        
        $provide.value('$uibModal', {});
        $provide.value('coreSignalRNotificationService', coreSignalRNotificationService);
        $provide.value('coreNotificationService', coreNotificationService);
        $provide.value('coreServerCommunicationService', coreServerCommunicationService);
    }));

    beforeEach(inject(function ($q, _$rootScope_, _coreUserStateService_, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        userInfoDeferred = $q.defer();
        currentNotificationSettingsDeferred = $q.defer();
        premiumSubscriptionsDeferred = $q.defer();
        subscriptionForTrading = $q.defer();
        $rootScope = _$rootScope_;
        coreUserStateService = _coreUserStateService_;
    }));

    it('should attempt to assign user profile after loadUser', function () {       
        $httpBackend.expect('GET',/\/api\/Guest\/GetAllApiServiceDescriptors(.+)/).respond({});
        $window.localStorage.token = '1234';
        coreUserStateService.loadUser();
        //userInfoDeferred.resolve({ data: 'UserProfile as Json' });
        //premiumSubscriptionsDeferred.resolve({ data: 'Premium Subscriptions' });

        $rootScope.$apply();
        //expect(coreUserStateService.user).toBe('UserProfile as Json');
        //expect(coreUserStateService.myPremiumItemSubscriptions).toBe('Premium Subscriptions');
    });

    it('should subscribe to profile changed', function () {
        expect(coreSignalRNotificationService.turnOn).toHaveBeenCalledWith('ProfileUpdated', jasmine.any(Function));
    });

    it('should subscribe to notification settings changed', function () {
        expect(coreSignalRNotificationService.turnOn).toHaveBeenCalledWith('NotificationSettingsUpdated', jasmine.any(Function));
    });

    it('hasTradersGPS should be based off myPremiumItemSubscriptions from server', function () {
        coreUserStateService.myPremiumItemSubscriptions = [];
        expect(coreUserStateService.hasTradersGPS()).toBeFalsy();
        coreUserStateService.myPremiumItemSubscriptions = [
        {
            Name: 'TradersGPS'
        }];
        expect(coreUserStateService.hasTradersGPS()).toBeTruthy();
    });

    it('hasAlgoMartBundle should be based off myPremiumItemSubscriptions from server', function () {
        coreUserStateService.myPremiumItemSubscriptions = [];
        expect(coreUserStateService.hasAlgoMartBundle()).toBeFalsy();
        coreUserStateService.myPremiumItemSubscriptions = [
        {
            Name: 'AlgoMart'
        }];
        expect(coreUserStateService.hasAlgoMartBundle()).toBeTruthy();
    });

    it('hasAlgoChartBundle should be based off myPremiumItemSubscriptions from server', function () {
        coreUserStateService.myPremiumItemSubscriptions = [];
        expect(coreUserStateService.hasAlgoChartBundle()).toBeFalsy();
        coreUserStateService.myPremiumItemSubscriptions = [
        {
            Name: 'AlgoChart'
        }];
        expect(coreUserStateService.hasAlgoChartBundle()).toBeTruthy();
    });

    it('hasRealTimeMarketData should be based off myPremiumItemSubscriptions from server', function () {
        coreUserStateService.myPremiumItemSubscriptions = [];
        expect(coreUserStateService.hasSGRealTimeMarketData()).toBeFalsy();
        expect(coreUserStateService.hasUSRealTimeMarketData()).toBeFalsy();

        coreUserStateService.myPremiumItemSubscriptions = [
        {
            Name: 'Real Time Market Data (SG)'
        }, {
            Name: 'Real Time Market Data (US)'
        }];
        expect(coreUserStateService.hasSGRealTimeMarketData()).toBeTruthy();
        expect(coreUserStateService.hasUSRealTimeMarketData()).toBeTruthy();
    });
});
