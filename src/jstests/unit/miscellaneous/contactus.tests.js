'use strict';

describe('ContactUs module tests', function () {
    describe('test s.misc.ContactUsController', function () {
        beforeEach(module('agms.misc'));

        var $uibModalInstance, $controller, scope, ctrl, sMiscContactUsService, coreNotificationService, deferred,
            coreConfigService;

        beforeEach(inject(function ($rootScope, _$controller_, $q) {            
            deferred = $q.defer();
            $controller = _$controller_;
            scope = $rootScope.$new();
            sMiscContactUsService = {
                postContactUs: jasmine.createSpy().and.returnValue(deferred.promise)
            };
            coreNotificationService = {
                notifySuccess: jasmine.createSpy().and.returnValue(deferred.promise),
                notifyError: jasmine.createSpy().and.returnValue(deferred.promise)
            };
            coreConfigService = {
                AlgoLeader: {
                    HideForAlgoLeader: false
                }
            };
            $uibModalInstance = { close: jasmine.createSpy() };
            ctrl = $controller('s.misc.ContactUsController as vm', {
                $scope: scope,
                $uibModalInstance: $uibModalInstance,
                sMiscContactUsService: sMiscContactUsService,
                coreNotificationService: coreNotificationService,
                coreConfigService: coreConfigService
            });

        })); 

        it('scope initialization', function () {
            expect(scope.vm.contactingInProgress).toBe(false);
        });

        it('test submitting contact us form', function () {
            scope.vm.contact.FirstName = 'aName';
            scope.vm.contact.LastName = 'lastname';
            scope.vm.contact.Email = 'does not matter';
            scope.vm.contact.Phone = 'does not matter';
            scope.vm.contact.Message = 'Hello world!';

            scope.vm.submit({ $valid: true });
            expect(sMiscContactUsService.postContactUs).toHaveBeenCalledWith(scope.vm.contact);
            expect(scope.vm.contactingInProgress).toBe(true);
        });

        it('test successful submit', function () {
            deferred.resolve('success');
            scope.vm.submit({$valid:true});
            scope.$apply();
            expect(scope.vm.contactingInProgress).toBe(false);
            expect($uibModalInstance.close).toHaveBeenCalled();
            expect(coreNotificationService.notifySuccess).toHaveBeenCalled();
        });

        it('test unsuccessful submit', function () {
            deferred.reject('failure');
            scope.vm.submit({ $valid: true });
            scope.$apply();
            expect(scope.vm.contactingInProgress).toBe(false);
            expect($uibModalInstance.close).not.toHaveBeenCalled();
            expect(coreNotificationService.notifyError).toHaveBeenCalled();
        });
    });

});
