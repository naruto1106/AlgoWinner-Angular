'use strict';

describe('login module tests', function () {
    describe('test s.gateway.LoginPopupController', function () {
        beforeEach(module('agms.gateway'));
        beforeEach(module('ui.bootstrap'));

        var $uibModalInstance, $controller, $uibModal, scope, sGatewayLoginState, sGatewayLoginService, deferred, vm, $rootScope, route, window;

        beforeEach(inject(function (_$rootScope_, _$controller_, $q, _sGatewayLoginState_, _$uibModal_) {
            deferred = $q.defer();
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            scope.hidePopUp = jasmine.createSpy();
            sGatewayLoginState = _sGatewayLoginState_;
            route = { reload: jasmine.createSpy() };
            sGatewayLoginService = {
                start: jasmine.createSpy().and.returnValue(deferred.promise)
            };
            $uibModalInstance = { close: jasmine.createSpy(), dismiss: jasmine.createSpy() };
            $uibModal = _$uibModal_;
            window = {
                location: {
                    reload: jasmine.createSpy()
                }
            }
            vm = $controller('s.gateway.LoginPopupController', { $scope: scope, $route: route, $window: window, $uibModalInstance: $uibModalInstance, sGatewayLoginService: sGatewayLoginService, $uibModal: $uibModal, showRegister: false, canDismiss: false });
        }));

        it('scope initialization', function () {
            expect(vm.state).toBe(sGatewayLoginState.empty);
        });

        it('test submitting login form', function () {
            vm.loginModel.UserName = 'theUserName';
            vm.loginModel.Password = 'thePassword';

            vm.submit();
            expect(sGatewayLoginService.start).toHaveBeenCalledWith('theUserName', 'thePassword', false);
            expect(vm.state).toBe(sGatewayLoginState.authenticating);
        });

        it('test successful login', function () {
            deferred.resolve('success');
            vm.submit();
            $rootScope.$apply();
            expect(sGatewayLoginService.start).toHaveBeenCalled();
            expect(window.location.href).toEqual('/Home/Inside#/');
            expect(vm.state).toBe(sGatewayLoginState.success);
            expect($uibModalInstance.close).toHaveBeenCalled();
        });

        it('test login error', function () {
            deferred.reject('failure');
            vm.submit();
            $rootScope.$apply();
            expect(sGatewayLoginService.start).toHaveBeenCalled();
            expect(vm.state).toBe(sGatewayLoginState.error);
            expect(vm.message).not.toBeFalsy();
            expect($uibModalInstance.close).not.toHaveBeenCalled();
        });
    });

    describe('test core login service', function () {

        var sGatewayLoginService, $window, $route, $httpBackend, coreUserStateService, coreConfigService,
            loadUserPromise, coreSignalRNotificationService, coreSignalRMarketDataService,
            signalRHubFactory, commonFormUrlEncoderConfigFactory,
            successCallback, errorCallback;

        beforeEach(module('agms.gateway', function ($provide) {
            $window = { localStorage: { token: '12345' }, alert: function () { } };
            loadUserPromise = {
                then: jasmine.createSpy()
            }
            coreConfigService = {
                General: {
                    WebSecret: "secret"
                }
            };
            coreUserStateService = {
                saveToken: jasmine.createSpy(),
                deleteToken: jasmine.createSpy(),
                loadUser: jasmine.createSpy().and.returnValue(loadUserPromise)
            };

            coreSignalRNotificationService = {
                populateHubToken: jasmine.createSpy(),
            }
            coreSignalRMarketDataService = {
                populateHubToken: jasmine.createSpy(),
            }
            signalRHubFactory = jasmine.createSpy().and.returnValue('theHub');
            commonFormUrlEncoderConfigFactory = jasmine.createSpy();
            $route = { reload: jasmine.createSpy() };
            $provide.value('$window', $window);
            $provide.value('$route', $route);
            $provide.value('coreConfigService', coreConfigService);
            $provide.value('coreUserStateService', coreUserStateService);
            $provide.value('coreSignalRNotificationService', coreSignalRNotificationService);
            $provide.value('signalRHubFactory', signalRHubFactory);
            $provide.value('commonFormUrlEncoderConfigFactory', commonFormUrlEncoderConfigFactory);
            $provide.value('coreSignalRMarketDataService', coreSignalRMarketDataService);
            $provide.value('$uibModal', {
                open: jasmine.createSpy().and.returnValue(
                    { result: loadUserPromise })
            });
            $provide.value('coreNotificationService', { notifyLoggedOut: jasmine.createSpy() });
        }));

        beforeEach(inject(function (_$httpBackend_, _sGatewayLoginService_) {
            $httpBackend = _$httpBackend_;
            sGatewayLoginService = _sGatewayLoginService_;
            successCallback = jasmine.createSpy();
            errorCallback = jasmine.createSpy();

            $httpBackend.whenGET(/\/identityapi\/SessionManager\/TryGetActiveSession/).respond(200, {});
        }));

        it('test success case', function () {
            $httpBackend.expectPOST('/identity/connect/token').respond({ access_token: 'theToken', refresh_token: 'refresh_token' });
            sGatewayLoginService.start('aUserName', 'aPassword', false).then(successCallback, errorCallback);
            $httpBackend.flush();
            expect(coreUserStateService.saveToken).toHaveBeenCalledWith('theToken', 'refresh_token');
            expect(coreSignalRMarketDataService.populateHubToken).toHaveBeenCalled();
            expect(coreSignalRNotificationService.populateHubToken).toHaveBeenCalled();
            expect(coreUserStateService.loadUser).toHaveBeenCalled();
            expect(loadUserPromise.then).toHaveBeenCalled();
            expect(successCallback).toHaveBeenCalled();
            expect(errorCallback).not.toHaveBeenCalled();
            //expect($route.reload).toHaveBeenCalled();
        });

        it('test login error', function () {
            $httpBackend.expectPOST('/identity/connect/token').respond(401, 'not authorized');
            sGatewayLoginService.start('aUserName', 'aPassword').then(successCallback, errorCallback);
            $httpBackend.flush();
            expect(coreUserStateService.deleteToken).toHaveBeenCalled();
            expect(errorCallback).toHaveBeenCalled();
            expect(successCallback).not.toHaveBeenCalled();
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});
