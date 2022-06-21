'use strict';

describe('account controller module tests', function () {
    beforeEach(function () {
        jasmine.addMatchers({
            toEqualData: function (util, customEqualityTesters) {
                return {
                    compare: function (actual, expected) {
                        var passed = angular.equals(actual, expected);
                        return {
                            pass: passed,
                            message: 'Expected ' + actual + (passed ? '' : ' not') + ' to equal ' + expected
                        };
                    }
                };                
            }
        });
    });

    describe('test BrokerageAccountMainController', function () {
        beforeEach(module('agmp.account'));

        var scope, ctrl, coreUserStateService, coreSignalRNotificationService;
        var sAccountService, sStrategyCommerceService, portfolioService, dummyResponse, $location,
            sHeaderService;

        beforeEach(inject(function ($rootScope, $controller, $q) {
            var deferred = $q.defer();
            coreUserStateService = {
                 isLoggedIn: jasmine.createSpy()
            };
            sAccountService = {};
            scope = $rootScope.$new();
            $location = { path: jasmine.createSpy() };
            var $uibModal = { open: jasmine.createSpy() };
            var $route = { reload: jasmine.createSpy() };

            dummyResponse = [
                {
                    BasicInfo: {
                        BrokerageAccountId: 1,
                        AccountNumber: 12345,
                        AccountType: 'Margin',
                        BrokerageType: 'Interactive Brokers',
                        BalanceForTrading: 100000
                    }
                }
            ];

            deferred.resolve({ data: dummyResponse, status: 200 });

            coreSignalRNotificationService = {
                turnOn: jasmine.createSpy(),
                turnOff: jasmine.createSpy()
            };
            sAccountService = {
                GetBrokerageAccountsDetail: jasmine.createSpy().and.returnValue(deferred.promise)
            };
            sStrategyCommerceService = {
                GetStrategiesForAccountLinkingView: jasmine.createSpy().and.returnValue(deferred.promise)
            };
            portfolioService = {
            };
            sHeaderService = {
                selectMenu: jasmine.createSpy()
            };

            ctrl = $controller('p.account.MainController', {
                $scope: scope,
                $route: $route,
                $uibModal: $uibModal,
                $location: $location,
                coreUserStateService: coreUserStateService,
                sAccountService: sAccountService,
                coreSignalRNotificationService: coreSignalRNotificationService,
                sHeaderService: sHeaderService
            });
        }));

        it('scope initialization', function () {
            expect(ctrl.isLoadingData).toBe(true);
        });

        //it('generate donut value', function () {
        //    var acc = {
        //        BasicInfo: {
        //            Allocated:0,
        //            Remaining:0
        //        }
        //    };
        //    var donutValues = ctrl.generateDonutValues(acc);
        //    expect(donutValues).not.toBe(null);
        //});

        it('test merge by', function () {
            var sourceList = [
                { id: 1, value: 8 },
                { id: 3, value: 0 },
                { id: 4, value: 0 },
                { id: 5, value: 17 },
                { id: 7, value: 21 },
                { id: 8, value: 24 },
                { id: 9, value: 27 }
            ];
            var destinationList = [
                { id: 1, value: 1 },
                { id: 2, value: 2 },
                { id: 3, value: 3 },
                { id: 4, value: 4 },
                { id: 5, value: 5 },
                { id: 6, value: 6 },
                { id: 7, value: 7 }
            ];
            var expectedList = [
                { id: 1, value: 8 },
                { id: 2, value: 2 },
                { id: 5, value: 17 },
                { id: 6, value: 6 },
                { id: 7, value: 21 },
                { id: 8, value: 24 },
                { id: 9, value: 27 }
            ];

            mergeAndRemoveIf(sourceList, destinationList, function (a, b) {
                return a.id === b.id;
            }, function(x) {
                return x.value === 0;
            });

            function mergeAndRemoveIf(srcList, dstList, matcher, removeCondition) {
                srcList.forEach(function (pf) {
                    var found = false;
                    for (var i = 0; i < dstList.length; ++i) {
                        if (matcher(dstList[i], pf)) {
                            angular.copy(pf, dstList[i]);
                            found = true;
                            if (removeCondition(dstList[i])) {
                                dstList.splice(i--, 1);
                            }
                        }
                    }
                    if (!found) {
                        dstList.push(pf);
                    }
                }); 
            }

            expect(angular.equals(destinationList, expectedList)).toBe(true);
        });
    });
});
