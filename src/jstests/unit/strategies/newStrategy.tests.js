'use strict';

describe('strategy creation tests', function () {
    describe('test new strategy', function () {
        var $rootScope, ctrl, coreUserStateService, sStrategyCommerceService, coreSignalRNotificationService, coreNotificationService;
        var $uibModalInstance, $httpBackend, sCommunityService;
        var createStrategyDeferred;

        beforeEach(module('agmp.strategy'));
        beforeEach(inject(function (_$rootScope_, _$httpBackend_, _sCommunityService_, $controller, $q, $window) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            sCommunityService = _sCommunityService_;

            createStrategyDeferred = $q.defer();
            sStrategyCommerceService = {
                CreateNewStrategy: jasmine.createSpy().and.returnValue(createStrategyDeferred.promise),
            };
            coreSignalRNotificationService = {
                invoke: jasmine.createSpy().and.returnValue($q.when('ok'))
            };
            coreUserStateService = {
                //setUserMode: jasmine.createSpy()
            };
            coreNotificationService = {
                notifySuccess: jasmine.createSpy().and.returnValue({ result: $q.when('ok pressed') }),
                notifyError: jasmine.createSpy().and.returnValue({ result: $q.when('ok pressed') })
            };

            $uibModalInstance = { close: jasmine.createSpy() };

            ctrl = $controller('p.strategy.NewController', {
                $uibModalInstance: $uibModalInstance,
                sStrategyCommerceService: sStrategyCommerceService,
                coreSignalRNotificationService: coreSignalRNotificationService,
                coreNotificationService: coreNotificationService,
                $scope: {
                    $on:function() {
                        
                    }
                }
            });

            spyOn($window.location, 'reload');
        }));

    });
});
