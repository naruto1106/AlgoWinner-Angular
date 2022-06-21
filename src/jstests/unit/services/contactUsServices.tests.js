'use strict';

describe('ContactUs service tests', function () {
    describe('test sMiscContactUsService', function () {
        beforeEach(module('agms.misc', function($provide) {
            $provide.value('coreNotificationService', { notifyLoggedOut: jasmine.createSpy() });
        }));
        beforeEach(module('agms.gateway'));

        var sMiscContactUsService, $httpBackend;
        var successCallback, errorCallback;
        beforeEach(inject(function (_$httpBackend_, _sMiscContactUsService_) {
            $httpBackend = _$httpBackend_;
            sMiscContactUsService = _sMiscContactUsService_;
        }));

        it('test interaction with HTTP call when successful', function () {
            successCallback = jasmine.createSpy();
            errorCallback = jasmine.createSpy();
            $httpBackend.expectPOST('/mkapi/v1/ContactUs/PostContactUs').respond("Success");
            sMiscContactUsService.postContactUs({}).then(successCallback, errorCallback);
            $httpBackend.flush();
            expect(successCallback).toHaveBeenCalled();
            expect(successCallback.calls.mostRecent().args[0].data).toEqual("Success");
            expect(successCallback.calls.mostRecent().args[0].status).toEqual(200);
            expect(errorCallback).not.toHaveBeenCalled();
        });

        it('test interaction with HTTP call when there is error', function () {
            successCallback = jasmine.createSpy();
            errorCallback = jasmine.createSpy();
            $httpBackend.expectPOST('/mkapi/v1/ContactUs/PostContactUs').respond(401, "Name cannot be empty");
            $httpBackend.expectGET('/App/shared/gateway/gateway.login.popup.html').respond(200, "<div></div>");
            sMiscContactUsService.postContactUs({}).then(successCallback, errorCallback);
            $httpBackend.flush();
            expect(errorCallback).toHaveBeenCalled();
            expect(errorCallback.calls.mostRecent().args[0].data).toEqual("Name cannot be empty");
            expect(errorCallback.calls.mostRecent().args[0].status).toEqual(401);
            expect(successCallback).not.toHaveBeenCalled();
        });
    });

});
