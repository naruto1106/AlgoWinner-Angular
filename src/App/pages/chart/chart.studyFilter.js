agmNgModuleWrapper('agmp.chart')
    .defineController('p.chart.StudyFilterController',
        [
            'pChartRenderingUtilsService',
            'pChartFilterDescriptionService',
            'sChartStudyService',
            "pChartTgpsService",
            "pChartGuppyService",
            "pChartThemeService"
        ],
        function (vm, dep, tool) {
            var pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                sChartStudyService = dep.sChartStudyService;

            vm.pChartRenderingUtilsService = dep.pChartRenderingUtilsService;
            vm.pChartTgpsService = dep.pChartTgpsService;
            vm.pChartGuppyService = dep.pChartGuppyService;

            var filterDescription = pChartFilterDescriptionService;



            function showStudySelection() {

                //if (!vm.filterDescription.primaryProduct || vm.filterDescription.myProducts.length <= 0) {
                //    coreNotificationService.notifyError("No Products Added", "Please add a product before adding studies.");
                //} else {
                var modal = tool.openModalByDefinition('p.chart.StudyFilterPanelController', {
                    filterDescription: vm.filterDescription
                });
                modal.result.then(function (study) {
                    addStudyWithForm(study);
                });
            }

            function removeFromStudy(study) {
                if (!vm.pChartRenderingUtilsService || STX.DialogManager.stack.length > 0) {
                    return;
                }
                vm.filterDescription.addedStudies = vm.filterDescription.addedStudies.filter(function (u) { return u !== study; });
                var studyObject = vm.pChartRenderingUtilsService.stxx.layout.studies[study.stxxStudy];
                if (studyObject) {
                    STX.Studies.removeStudy(vm.pChartRenderingUtilsService.stxx, studyObject);
                }
            }

            function toggleStudy(study) {
                sChartStudyService.toggleStudy(study);
            }


            function addStudyWithForm(study) {
                sChartStudyService.addStudyWithForm(study);
                vm.selectedStudy = null;
            }

            function isStudyDialogCompleted(study) {
                return study.stxxStudy;
            }



            function getFilteredStudy($viewValue) {
                if (!$viewValue) {
                    return [];
                }
                return vm.filterDescription.studies.filter(function (i) {
                    if (i.propName === 'volume') {
                        return false;
                    }
                    return _.includes(i.label.toUpperCase(), $viewValue.toUpperCase());
                }).sort(function (a, b) {
                    // PD-1401 Priority the result that start with the search string
                    var aLabel = a.label.toUpperCase();
                    var bLabel = b.label.toUpperCase();
                    var enteredValue = $viewValue.toUpperCase();
                    return aLabel.indexOf(enteredValue) - bLabel.indexOf(enteredValue);
                }); 
            }

            function overrideStudyDisplay(studyName) {
                return sChartStudyService.overrideStudyDisplay(studyName);
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    getFilteredStudy:getFilteredStudy,
                    filterDescription: filterDescription,
                    isStudiesOpen: false,
                    overrideStudyDisplay: overrideStudyDisplay,
                    showStudySelection: showStudySelection,
                    removeFromStudy: removeFromStudy,
                    toggleStudy: toggleStudy,
                    addStudyWithForm: addStudyWithForm,
                    isStudyDialogCompleted: isStudyDialogCompleted
                });

                window.filterDescription = vm.filterDescription;
                
                tool.on('studyRemoved', function(evt,args) {
                    sChartStudyService.tryRemovingStudyByName(args);
                });

            });
        }
    )
    .defineDirectiveForE('agmp-chart-study-filter', [],
        function () {
            return {
                controller: "p.chart.StudyFilterController",
                templateUrl: '/App/pages/chart/chart.studyFilter.html'
            };
        }, {

        });