agmNgModuleWrapper('agmp.faq')
    .defineController('p.faq.GuideFlowController',
    ['sMiscFaqService', "sHeaderService"],
    function (vm, dep, tool) {

        var sMiscFaqService = dep.sMiscFaqService,
            sHeaderService = dep.sHeaderService,
            $location = dep.$location,
            coreUserStateService = dep.coreUserStateService,
            coreConfigService = dep.coreConfigService;

        function setCategory(category) {
            vm.selectedCategory = category;
            $location.search({ category: category.name });
            changeFilteredQuestions(false);
        }

        function showGuideAsPopup(flow) {
            var urlParams = $location.search();
            if (urlParams &&
                urlParams.category &&
                urlParams.id &&
                urlParams.category === flow.categories[0].name &&
                parseInt(urlParams.id) === flow.id) {
                sMiscFaqService.showGuideAsPopup(flow, vm.filteredQuestions, vm.selectedCategory.name);
            } else {
                $location.search({ category: flow.categories[0].name, id: flow.id });
            }
        }

        function changeFilteredQuestions(openPopUp) {
            vm.filteredQuestions = vm.questionSet.list.filter(function (q) {
                return sMiscFaqService.checkObjectWithinCategory(q, vm.selectedCategory) && sMiscFaqService.checkObjectWithinUserRole(q, vm.selectedUserRole);
            }).sort(function (a, b) {
                a.priority = a.priority || 9999;
                b.priority = b.priority || 9999;
                return a.priority - b.priority;
            });

            var urlParams = $location.search();
            if (openPopUp && urlParams && urlParams.id) {
                vm.filteredQuestions.forEach(function (q) {
                    if (q.id === parseInt(urlParams.id)) {
                        sMiscFaqService.showGuideAsPopup(q, vm.filteredQuestions, vm.selectedCategory.name);
                    }
                });
            }

            if (vm.refreshSidebarFuncContainer && vm.refreshSidebarFuncContainer.refresh) {
                vm.refreshSidebarFuncContainer.refresh();
            }
        }

        function showContactUs() {
            tool.openModalByDefinition('s.misc.ContactUsController');
        }

        tool.setVmProperties({
            coreConfigService: coreConfigService,
            refreshSidebarFuncContainer: {},
            showContactUs: showContactUs,
            isLoading: true,
            setCategory: setCategory,
            showGuideAsPopup: showGuideAsPopup,
            selectedUserRole: "General",
            selectedCategory: "Chart"
        });

        tool.initialize(function () {
            sHeaderService.selectMenu("help", "guide");

            if (coreUserStateService.isLoggedIn() && !coreUserStateService.hasPendingLogoutConfirmation) {
                vm.isLoading = true;
                sMiscFaqService.getGuideFlows().then(function (q) {
                    vm.questionSet = q;
                    vm.questionSet.list.forEach(function (flow) {
                        flow.selectedStep = flow.flowSteps[0];
                        flow.selectedStepIndex = 0;
                    });

                    if (vm.questionSet) {
                        var urlParams = $location.search();
                        if (urlParams && urlParams.category) {
                            vm.selectedCategory = vm.questionSet.userRoles[vm.selectedUserRole].categories.filter(function (c) {
                                return c.name === urlParams.category;
                            })[0];
                        } else {
                            vm.selectedCategory = vm.questionSet.userRoles[vm.selectedUserRole].categories[0];
                        }
                    }
                    changeFilteredQuestions(true);
                }).finally(function () {
                    vm.isLoading = false;
                });
            }
        });
    });