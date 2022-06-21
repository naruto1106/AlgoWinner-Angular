'use strict';

describe('manage notifications form test', function () {
    beforeEach(module('agms.activity'));

    describe('test notification service', function () {

        var $httpBackend, sActivityNotificationService;
        beforeEach(inject(function (_$httpBackend_, _sActivityNotificationService_) {
            $httpBackend = _$httpBackend_;            
            sActivityNotificationService = _sActivityNotificationService_;
        }));

        it('should fire HTTP GET to get current settings', function () {
            $httpBackend.expect('GET', /\/nsapi\/Notification\/GetNotificationSetting(.*)/).respond({});
            sActivityNotificationService.getCurrentSettings();
            $httpBackend.flush();
        });

        it('should fire HTTP POST to save settings', function () {
            $httpBackend.expectPOST('/nsapi/Notification/ModifySetting', {}).respond(200, {});

            sActivityNotificationService.modifySettings({});
            $httpBackend.flush();
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});