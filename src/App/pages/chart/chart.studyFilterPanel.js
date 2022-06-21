agmNgModuleWrapper('agmp.chart')
    .defineControllerAsPopup('p.chart.StudyFilterPanelController', {
        templateUrl: '/App/pages/chart/chart.studyFilterPanel.html',
        windowClass: "mini-modal"
    },
        ['filterDescription'],
        function (vm, dep, tool) {
            vm.addStudy = function (study) {
                vm.uibClosePanel(study);
            };
            vm.selectStudy = function (study) {
                vm.selectedStudy = study;
            };
            vm.shouldShowStudy = function (study) {
                if (study.propName === "vchart") {
                    if (_.find(vm.filterDescription.addedStudies, function (e) { return e.propName === "vchart"; }))
                        return false;
                    else
                        return true;
                }
                return true;
            };

            function setCategory(category) {
                vm.selectedCategory = category;
                var study = vm.filterDescription.studies.filter(function (s) {
                    return !s.added && _.includes(s.categories, vm.selectedCategory) && vm.shouldShowStudy(s);
                })[0];
                vm.selectStudy(study);
            }

            function getListedStudies() {
                return vm.filterDescription.studies.filter(function (s) {
                    return _.includes(s.categories, vm.selectedCategory);
                });
            }

            function init() {
                vm.displayStudies = [];
                vm.filterDescription = dep.filterDescription;
                vm.setCategory = setCategory;
                vm.getListedStudies = getListedStudies;

                setCategory(vm.filterDescription.studyCategories[0]);
            }

            init();
        }
    );