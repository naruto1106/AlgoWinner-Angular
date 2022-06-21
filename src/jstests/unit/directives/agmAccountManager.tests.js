//'use strict';

//describe('account manager directive tests', function () {
//    describe('test accountmanager', function () {
//        var $controller, scope, ctrl, coreNotificationService;
//        var deferred, sAccountService;
//        beforeEach(module('agms.account'));
//        beforeEach(inject(function ($rootScope, _$controller_, $q) {
//            deferred = $q.defer();
//            $controller = _$controller_;
//            scope = $rootScope.$new();
//            sAccountService = {
//                GetBrokerageAccountsForStrategyLinking: jasmine.createSpy().and.returnValue(deferred.promise),
//            };
//            coreNotificationService = { notifySuccess: jasmine.createSpy(), notifyError: jasmine.createSpy() };

//            $provide.value('sAccountService', sAccountService);
//            $provide.value('coreNotificationService', coreNotificationService);
//            coreNotificationService = { notifySuccess: jasmine.createSpy(), notifyError: jasmine.createSpy() };

//            $provide.value('sAccountService', sAccountService);
//            $provide.value('coreNotificationService', coreNotificationService);
//            coreNotificationService = { notifySuccess: jasmine.createSpy(), notifyError: jasmine.createSpy() };

//            $provide.value('sAccountService', sAccountService);
//            $provide.value('coreNotificationService', coreNotificationService);
//        }));
//        beforeEach(inject(function (_$compile_, _$rootScope_, $controller, $q) {
//            $compile = _$compile_;
//            $rootScope = _$rootScope_;
//            ctrl = $rootScope.$new();

//            strategyListDeferred = $q.defer();
//            subscriptionListDeferred = $q.defer();
//        }));
//        beforeEach(inject(function (_$compile_, _$rootScope_, $controller, $q) {
//            $compile = _$compile_;
//            $rootScope = _$rootScope_;
//            ctrl = $rootScope.$new();

//            strategyListDeferred = $q.defer();
//            subscriptionListDeferred = $q.defer();
//        }));
//        beforeEach(inject(function (_$compile_, _$rootScope_, $controller, $q) {
//            $compile = _$compile_;
//            $rootScope = _$rootScope_;
//            ctrl = $rootScope.$new();

//            strategyListDeferred = $q.defer();
//            subscriptionListDeferred = $q.defer();
//        }));

//        it('scope initialization strategy', function () {
//            scope.isStrategy = true;
//            ctrl = $controller('s.account.ManagerController', {
//                $scope: scope,
//                sAccountService: sAccountService,
//                coreNotificationService: coreNotificationService
//            });
//            expect(sAccountService.GetBrokerageAccountsForStrategyLinking).toHaveBeenCalled();
//            expect(sAccountService.GetBrokerageAccountsForSubscriptionLinking).not.toHaveBeenCalled();
//        });

//        it('scope initialization subscription', function () {
//            scope.isStrategy = false;
//            ctrl = $controller('s.account.ManagerController', {
//                $scope: scope,
//                sAccountService: sAccountService,
//                coreNotificationService: coreNotificationService
//            });
//            expect(sAccountService.GetBrokerageAccountsForStrategyLinking).not.toHaveBeenCalled();
//        });

//        it('init with nonexisting account', function () {
//            deferred.resolve({ data: [], status: 200 });
//            ctrl = $controller('s.account.ManagerController', {
//                $scope: scope,
//                sAccountService: sAccountService,
//                coreNotificationService: coreNotificationService
//            });
//            scope.$apply();
//            expect(scope.accountLinkingOptions.length).toBe(1);
//        });

//        it('init with existing account', function () {
//            deferred.resolve({ data: [1, 2, 3], status: 200 });
//            ctrl = $controller('s.account.ManagerController', {
//                $scope: scope,
//                sAccountService: sAccountService,
//                coreNotificationService: coreNotificationService
//            });
//            scope.$apply();
//            expect(scope.accountLinkingOptions.length).toBe(2);
//        });

//        it('init error', function () {
//            deferred.reject('error');
//            coreNotificationService = { notifyError: jasmine.createSpy() };
//            ctrl = $controller('s.account.ManagerController', {
//                $scope: scope,
//                sAccountService: sAccountService,
//                coreNotificationService: coreNotificationService
//            });
//            scope.$apply();
//            expect(coreNotificationService.notifyError).toHaveBeenCalled();
//        });
//    });
//});
