'use strict';

describe('test chart filter study controller', function () {

    var ctrl, $uibModal, pChartRenderingUtilsService, filterDescription, study, modalInstance, $provide, coreConfigService, fundamentals, deferred;

    beforeEach(module("agmp.chart", function (_$provide_) {
        $provide = _$provide_;
    }));


    beforeEach(inject(function ($controller, $rootScope, $q) {
        fundamentals = $q.defer();
        // spy these chart functions, or use jasmine-dom:
        // https://github.com/jeffwatkins/jasmine-dom
        STX.Studies.studyDialog = jasmine.createSpy();
        STX.DialogManager.displayDialog = jasmine.createSpy();

        pChartRenderingUtilsService = {
            stxx: {
                changeCallback: jasmine.createSpy(),
                layout: {
                    studies: []
                }
            },
            setBarSize: jasmine.createSpy(),
            setRange: jasmine.createSpy(),
            refreshChart: jasmine.createSpy()
        };
        study = {
            added: false,
            included: true,
            label: "RSI",
            propName: "rsi"
        };
        filterDescription = {
            myProducts: [{
                Symbol: "D05"
            }],
            primaryProduct: {
                Symbol: "D05"
            },
            selectedStudy: {},
            studies: [{
                added: false,
                label: "RSI",
                propName: "rsi"
            }, {
                added: false,
                label: "Volume Profile",
                propName: "rsi"
            }, {
                added: false,
                label: "Trade Volume Index",
                propName: "rsi"
            }],
            addedStudies: [study],
            studyCategories: ["Popular Studies"]
        };
        modalInstance = {
            opened: $q.when(),
            result: $q.when()
        };
        $provide.value('coreConfigService', coreConfigService);

        var pChartFilterDescriptionService = filterDescription;
        $uibModal = { open: jasmine.createSpy().and.returnValue(modalInstance) };
        ctrl = $controller('p.chart.StudyFilterController', {
            $scope: $rootScope.$new(),
            $uibModal: $uibModal,
            coreConfigService: coreConfigService,
            pChartService: {},
            sChartStudyService: {
            },
            pChartTgpsService: {},
            pChartRenderingUtilsService: pChartRenderingUtilsService,
            pChartFilterDescriptionService: pChartFilterDescriptionService,
            pChartThemeService: {}
        });

    }));

    it('test study filtering priority order',
        function() {
            var filteredStudies = ctrl.getFilteredStudy('vol');
            expect(filteredStudies.length).toEqual(2);
            expect(filteredStudies[0].label).toEqual('Volume Profile');
            expect(filteredStudies[1].label).toEqual('Trade Volume Index');
        });

});
