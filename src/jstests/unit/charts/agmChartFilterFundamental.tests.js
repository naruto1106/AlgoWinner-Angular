'use strict';

describe('test chart filter fundamental controller', function () {

    beforeEach(module('agmp.chart', function ($provide) {

        $provide.value('sContentfulWrapper', {
            getContentful: function () {
                return {
                    createClient: jasmine.createSpy()
                };
            }
        });
    }));


    var ctrl, filterDescription, $uibModal,
        pChartFundamentalHelperService,
        pChartRenderingUtilsService, renderer, fundamental, fundamentals, pChartCmsContentLoader;

    beforeEach(inject(function ($controller, $rootScope, $q) {
        fundamentals = $q.defer();
        pChartCmsContentLoader = {
            getFundamentals: jasmine.createSpy().and.returnValue(fundamentals.promise)
        };
        renderer = {
            seriesParams: [],
            ready: jasmine.createSpy()
        };

        pChartRenderingUtilsService = {
            getChartLineRendererOrNew: jasmine.createSpy().and.returnValue(renderer)            
        };
        filterDescription = {
            myProducts: [{
                Symbol: "D05"
            }],
            primaryProduct: {
                Symbol: "D05"
            },
            addedFundamentals: []
        };

        fundamental = {
            added: false,
            category: "Current Valuation",
            displayName: "P/E Ratio",
            fundGroup: "A",
            name: "PeRatio"
        };


        var pChartFilterDescriptionService = filterDescription;
        pChartFundamentalHelperService = {
            getIncludedFundamentals: function () {
                return [];
            },
            searchFundamentals: jasmine.createSpy().and.returnValue([]),
            addToFundamentalWithChecks: jasmine.createSpy().and.returnValue(true),
            toggleFundamentalActivation: jasmine.createSpy(),
            checkCanIncludeNewFundamental: function () {
                return true;
            },
            checkBarSize: function () {
                return true;
            }
        };

        var sDatamartFundamentalDataService = {
            IsFundamentalValid: function () {
                return $q.when(true);
            }
        };


        ctrl = $controller('p.chart.FundamentalFilterController', {
            $scope: $rootScope.$new(),
            pChartRenderingUtilsService: pChartRenderingUtilsService,
            sDatamartFundamentalDataService: sDatamartFundamentalDataService,
            pChartFilterDescriptionService: pChartFilterDescriptionService,
            pChartFundamentalHelperService: pChartFundamentalHelperService
        });
    }));

    it('test search fundamentals', function () {
        var result = ctrl.searchFundamentals("ttm");
        expect(result.length).toBe(0);
        expect(pChartFundamentalHelperService.searchFundamentals).toHaveBeenCalledWith("ttm");
    });

    it('test add to fundamentals', function () {
        var obj = {};
        ctrl.selectedFundamentals = obj;
        ctrl.addToFundamentals(fundamental);
        expect(ctrl.selectedFundamentals).toBe(null);

        pChartFundamentalHelperService.addToFundamentalWithChecks = jasmine.createSpy().and.returnValue(false);

        ctrl.selectedFundamentals = obj;
        ctrl.addToFundamentals(fundamental);
        expect(ctrl.selectedFundamentals).toBe(obj);

    });

    it('test show or hide fundamentals', function () {
        ctrl.toggleFundamentalActivation(fundamental);
        expect(pChartFundamentalHelperService.toggleFundamentalActivation).toHaveBeenCalledWith(fundamental);
    });

});