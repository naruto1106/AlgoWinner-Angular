'use strict';

describe('notification service tests', function () {
    describe('test coreNotificationService', function () {
        var $uibModal, coreNotificationService;

        beforeEach(module('agm.core', function ($provide) {
            $uibModal = { open: jasmine.createSpy() };
            $provide.value('$uibModal', $uibModal);
        }));
        
        beforeEach(inject(function (_coreNotificationService_) {
            coreNotificationService = _coreNotificationService_;
        }));
    });
});
