'use strict';

describe('test chart filter study panel controller', function () {
    beforeEach(module('agmp.chart'));

    var ctrl, filterDescription, $uibModalInstance;

    beforeEach(inject(function ($controller, $rootScope) {
        filterDescription = {
            studies: [{
                added: false,
                label: "Moving Average",
                propName: "ma"
            }],
            addedStudies: [],
            studyCategories: ["Popular Studies"]
        };
        $uibModalInstance = { close: jasmine.createSpy() };

        ctrl = $controller('p.chart.StudyFilterPanelController', {
            $uibModalInstance: $uibModalInstance,
            $scope: $rootScope.$new(),
            filterDescription: filterDescription
        });
    }));

    var study = {
        added: false,
        label: "Moving Average",
        propName: "ma"
    };

    it('test add study', function () {
        ctrl.addStudy(study);
        expect($uibModalInstance.close).toHaveBeenCalledWith({
            added: false,
            label: "Moving Average",
            propName: "ma"
        });
    });
});