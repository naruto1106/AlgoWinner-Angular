'use strict';

describe('account detail tests', function () {
    describe('test BrokerageAccountDetailController', function () {
        beforeEach(module('agmp.account'));

        var $scope, $rootScope, sStrategyCommerceService, coreSignalRNotificationService, ctrl, $controller, $uibModalInstance, coreNotificationService;
        var strategyDeferred, subscriptionDeferred;

        beforeEach(inject(function (_$rootScope_, $q, _$controller_) {
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            strategyDeferred = $q.defer();
            subscriptionDeferred = $q.defer();
            sStrategyCommerceService = {
                GetStrategyForAccountDetail: jasmine.createSpy().and.returnValue(strategyDeferred.promise)
            };
            coreSignalRNotificationService = {
                hubInitialized: $q.defer(),
                AlgoHub: {
                    on: function (_, callback) { callback(); },
                    off: function (_, callback) { callback(); }
                }
            };
            $uibModalInstance = { close: jasmine.createSpy(), dismiss: jasmine.createSpy() };
            coreNotificationService = { notifySuccess: jasmine.createSpy(), notifyError: jasmine.createSpy() };
        }));

        it('test scope initialization - strategy', function () {
            ctrl = $controller('p.account.DetailController', {
                $scope: $scope,
                type: 1,
                $uibModalInstance: $uibModalInstance,
                sStrategyCommerceService: sStrategyCommerceService,
                coreNotificationService: coreNotificationService,
                strategyId: 1
            });

            var res = {
                data: {}
            };
            expect(sStrategyCommerceService.GetStrategyForAccountDetail).toHaveBeenCalled();
            strategyDeferred.resolve(res);
            $rootScope.$apply();
            expect(ctrl.strategy).toBeDefined();
        });

        it('test scope initialization - subscription', function () {
            ctrl = $controller('p.account.DetailController', {
                $scope: $scope,
                type: 2,
                $uibModalInstance: $uibModalInstance,
                sStrategyCommerceService: sStrategyCommerceService,
                coreNotificationService: coreNotificationService,
                strategyId: 1
            });

            var res = {
                data: {}
            };
            subscriptionDeferred.resolve(res);
            $rootScope.$apply();
            expect(ctrl.strategy).toBeDefined();
        });
    });
});
