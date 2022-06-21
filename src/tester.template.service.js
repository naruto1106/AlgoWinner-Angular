'use strict';

describe("__TEST_NAME", function() {
    var testedService;
    var $rootScope, $httpBackend, $controller, $q, $provide;
    /*scopeVars*/;

    var deferred = {};

    function createDeferredQueue(name, q) {
        q = q || $q;
        deferred[name] = q.defer();
        return deferred[name];
    }

    beforeEach(module("__MODULE_NAME", function(_$provide_) {
        $provide = _$provide_;
        /*dependenciesDefinitionsAndInjections*/
    }));

    beforeEach(inject(function(_tobeTestedServiceName_, _$rootScope_, _$controller_, _$httpBackend_, _$q_) {

        // this is going to be tested
        testedService = _tobeTestedServiceName_;

        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;

    }));

    /*functionTest*/

});