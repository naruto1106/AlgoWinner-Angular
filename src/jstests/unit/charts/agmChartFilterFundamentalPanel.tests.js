'use strict';

describe('test chart filter fundamental panel controller', function () {

    beforeEach(module('agmp.chart'));

    var ctrl, filterDescription, $uibModalInstance, fundamentalsKind, category, fundamental;

    beforeEach(inject(function ($controller, $rootScope) {
        
        filterDescription = {
            addedFundamentals: []
        };
        $uibModalInstance = { close: jasmine.createSpy() };
        category = "Current Valuation";
        fundamentalsKind = [{
            added: false,
            category: "Current Valuation",
            displayName: "P/E Ratio",
            fundGroup: "A",
            name: "PeRatio"
        }];
        fundamental = {
            added: false,
            category: "Current Valuation",
            displayName: "P/E Ratio",
            fundGroup: "A",
            name: "PeRatio"
        };

        ctrl = $controller('p.chart.FundamentalFilterPanelController', {
            $uibModalInstance: $uibModalInstance,
            $scope: $rootScope.$new(),
            fundamentalsKind: fundamentalsKind,
            includedFundamentals: filterDescription.addedFundamentals
        });
    }));

    it('test set category', function () {
        ctrl.setCategory(category);
        expect(ctrl.selectedCategory).toBe("Current Valuation");
    });

    it('test select fundamental', function () {
        ctrl.selectFundamental(fundamental);
        expect(ctrl.selectedFundamentals).toBe(fundamental);
    });

    it('test get listed fundamentals', function () {
        ctrl.setCategory("All");
        var result = ctrl.getListedFundamentals();
        expect(result).toEqual(fundamentalsKind);
    });

    it('test add to fundamentals', function () {
        ctrl.addToFundamentals(fundamental);
        expect($uibModalInstance.close).toHaveBeenCalledWith(fundamental);
    });
});