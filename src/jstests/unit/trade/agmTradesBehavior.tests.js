'use strict';

describe('Test s.trading.BehaviorController', function () {

    beforeEach(module('agms.trading'));

    var ctrl;
    var coreUserStateService;
    beforeEach(inject(function ($rootScope, $controller, $q) {
        coreUserStateService = {
            user: {
                UserId: "testUserId"
            },
            userInfoLoaded: $q.when(true)
        };

        ctrl = $controller('s.trading.BehaviorController', {
            $scope: $rootScope.$new(),
            coreUserStateService: coreUserStateService
        });

    }));

    it('Should display the data only if there is more than three consecutive non-null non-zero value in the beginning of the data', function () {
        ctrl.selectedParamData = [];
        expect(ctrl.shouldDisplayData()).toBe(false);

        ctrl.selectedParamData = [{ Value: 123 }];
        expect(ctrl.shouldDisplayData()).toBe(false);

        ctrl.selectedParamData = [{ Value: 123 }, { Value: 123 }, { Value: 123 }];
        expect(ctrl.shouldDisplayData()).toBe(true);

        ctrl.selectedParamData = [{ Value: 0 }, { Value: null }, { Value: 0 }];
        expect(ctrl.shouldDisplayData()).toBe(false);

        ctrl.selectedParamData = [{ Value: 0 }, { Value: null }, { Value: 123 }, { Value: 123 }];
        expect(ctrl.shouldDisplayData()).toBe(false);

        ctrl.selectedParamData = [{ Value: 0 }, { Value: null }, { Value: 0 }, { Value: 123 }, { Value: 123 }, { Value: 123 }];
        expect(ctrl.shouldDisplayData()).toBe(true);
    });
});
