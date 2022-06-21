'use strict';

/* jasmine specs for controllers go here */
describe('AlgoWebservice root module tests', function () {

    var deferred;

    beforeEach(module('agmp.start.inside', function ($provide) {        
        $provide.value('sContentfulWrapper', {
            getContentful: function () {
                return {
                    createClient: jasmine.createSpy()
                };
            }
        });

        $provide.value('coreConfigService', {
            Trading: {
                
            }
        });
    }));

    var $uibModal, vm, coreAuthInterceptor;
    
    beforeEach(inject(function ($rootScope, $controller, $q) {
        deferred = $q.defer();
        deferred.resolve('Success');

        $uibModal = { open: jasmine.createSpy().and.returnValue({opened:$q.when()}) };
        coreAuthInterceptor = {
            login:jasmine.createSpy(),
            logout:jasmine.createSpy()            
        };
        var sDroidHelperService = {};

        vm = $controller('s.header.MainController', {
            $scope: $rootScope.$new(),
            $uibModal: $uibModal,
            coreAuthInterceptor: coreAuthInterceptor,
            sDroidHelperService: sDroidHelperService
        });
    }));
});