'use strict';

describe('strategy characteristics directive tests', function () {
    describe('test strategycharacteristics', function () {
        var $provide, $compile, $rootScope, $httpBackend;
        var ctrl, sStrategyCommerceCategoriesService, vm;
        var element;

        beforeEach(module('directive.templates'));

        beforeEach(module('agms.strategyCommerce', function (_$provide_) {
            $provide = _$provide_;
        }));

        beforeEach(inject(function (_$httpBackend_, _$compile_, _$rootScope_, _sStrategyCommerceCategoriesService_) {
            $httpBackend = _$httpBackend_;
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            var $uibModal = { open: jasmine.createSpy() };

            ctrl = $rootScope.$new();
            sStrategyCommerceCategoriesService = _sStrategyCommerceCategoriesService_;

            //$provide.value('$scope', ctrl);
            //$provide.value('$uibModal', $uibModal);
            //$provide.value('sStrategyCommerceCategoriesService', sStrategyCommerceCategoriesService);

            $httpBackend.when('GET', '/App/assets/icons/category/trend.svg').respond();
            $httpBackend.when('GET', '/App/assets/icons/category/news.svg').respond();
            $httpBackend.when('GET', '/App/assets/icons/category/fundamental.svg').respond();
            $httpBackend.when('GET', '/App/assets/icons/category/fish.svg').respond();
            $httpBackend.when('GET', '/App/assets/icons/category/stat.svg').respond();
            $httpBackend.when('GET', '/App/assets/icons/category/break.svg').respond();
            $httpBackend.when('GET', '/App/assets/icons/category/misc.svg').respond();
            $httpBackend.when('GET', /\/stgapi\/v1\/Strategy\/GetOwnedStrategiesCount(.+)/).respond();
        }));

        it('category modification', function () {            
            ctrl.strategyModel = {
                 Categories: ['Bottom Fishing', 'News']
            };
            element = angular.element('<agms-strategy-commerce-characteristics strategy-model="strategyModel" next-label="\'NEXT\'"/ prev-label="\'PREV\'">');
            $compile(element)(ctrl);
            $rootScope.$digest();
            vm = element.isolateScope().vm;
            
            expect(vm.categories.map(sStrategyCommerceCategoriesService.getCategoryValue))
                .toEqual([false, false, false, false, false, false, false]);
        });

        it('modifying category from user interaction', function () {            
            ctrl.strategyModel = {
                 Categories: ['Bottom Fishing', 'News']
            };
            element = angular.element('<agms-strategy-commerce-characteristics strategy-model="strategyModel" next-label="\'NEXT\'"/ prev-label="\'PREV\'">');
            $compile(element)(ctrl);
            $rootScope.$digest();
            vm = element.isolateScope().vm;

            vm.categories[1].value = true;
            vm.changeModel();
            
            expect(vm.strategyModel.Categories)
                .toEqual(['Breakout']);
        });
    });
});
