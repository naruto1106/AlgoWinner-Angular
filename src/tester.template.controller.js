'use strict';

describe("__TEST_NAME", function () {
    var ctrl;
    var $rootScope, $httpBackend, $controller, $provide,$q;
    /*scopeVars*/;

    var deferred = {};

    function createDeferredQueue(name, q) {
        q = q || $q;
        deferred[name] = q.defer();
        return deferred[name];
    }

    beforeEach(module("__MODULE_NAME", function (_$provide_) {
        $provide = _$provide_;
    }));

    beforeEach(inject(function (_$rootScope_, _$controller_, _$httpBackend_, _$q_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;

        // todo: dependencies definition
        /*dependenciesDefinitions*/

        // todo: provider injections
        /*providersInjections*/

        ctrl = $controller("__CONTROLLER_NAME", {
            /*controllerInjections*/
            $scope: $rootScope.$new()
        });
    }));

    /*functionTest*/

});