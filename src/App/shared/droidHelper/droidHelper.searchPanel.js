agmNgModuleWrapper('agms.droidHelper')
    .defineControllerAsPopup("s.droidHelper.SearchPanelController", {
            templateUrl: "/App/shared/droidHelper/droidHelper.searchPanel.html",
            windowClass: 'tiny-modal'
        },
        ['sDroidHelperService', 'sMiscFaqService', 'commonLocationHistoryService', 'sDroidHelperSbsFrameworkService'],
        function(vm, dep, tool) {
            var sDroidHelperService = dep.sDroidHelperService,
                $uibModalInstance = dep.$uibModalInstance,
                sDroidHelperSbsFrameworkService = dep.sDroidHelperSbsFrameworkService,
                commonLocationHistoryService = dep.commonLocationHistoryService,
                sMiscFaqService = dep.sMiscFaqService;

            function contactUs() {
                sDroidHelperService.showModal({
                    templateUrl: '/App/shared/misc/misc.contactUs.html',
                    controller: 's.misc.ContactUsController',
                    windowClass: 'chat-size-modal'
                }, true);
            }

            function goToFaq(faq) {
                var params = {
                    category: faq.ref.categories[0].name,
                    userRole: faq.ref.userRoles[0].name,
                    id: faq.ref.id
                }
                commonLocationHistoryService.go('faq', params);
                sDroidHelperService.hideModalVisualOnly();
            }

            function goToGuide(guide) {
                var allGuideList = [];
                vm.guideList.forEach(function(g) {
                    allGuideList.push(g.ref);
                });
                sMiscFaqService.showGuideAsPopup(guide.ref, allGuideList, 'Result for "' + vm.searchHelpKeyword + '"');
                sDroidHelperService.hideModalVisualOnly();
            }

            function noResultFound() {
                return !vm.hasResult() && vm.searchHelpKeyword && vm.searchHelpKeyword.length >= 2;
            }

            function needMoreSpecificKeyword() {
                return vm.searchHelpKeyword && vm.searchHelpKeyword.length > 0 && vm.searchHelpKeyword.length < 2;
            }

            function search() {
                if (!vm.searchHelpKeyword || vm.searchHelpKeyword.length < 2) {
                    vm.faqList = [];
                    vm.guideList = [];
                    return null;
                }

                var p1 = sMiscFaqService.getQuestions().then(function(questions) {
                    vm.faqList = sMiscFaqService.searchFaq(vm.searchHelpKeyword, questions.list, 15);
                });
                var p2 = sMiscFaqService.getGuideFlows().then(function(guide) {
                    vm.guideList = sMiscFaqService.searchGuide(vm.searchHelpKeyword, guide.list, 15);
                });

                tool.onceAll([p1, p2]).then(function() {

                });
            }

            function goToGuidePage() {
                clearSelection();
                sDroidHelperService.hideModalVisualOnly();
                commonLocationHistoryService.go('faq-guide', {});
                dep.$location.hash('top');
            }

            function hideDriodHelper() {
                vm.sDroidHelperService.notShowPopupAgain = true;
                vm.uibClosePanel();
            }

            function startPageTour() {
                sDroidHelperSbsFrameworkService.startPageTour();
            }

            function hasTour() {
                return sDroidHelperSbsFrameworkService.hasTour();
            }

            function hasResult() {
                return vm.faqList.length + vm.guideList.length > 0;
            }

            function clearSelection() {
                vm.faqList = [];
                vm.guideList = [];
                vm.searchHelpKeyword = "";
            }

            tool.initialize(function() {
                tool.setVmProperties({
                    user: null,
                    needMoreSpecificKeyword: needMoreSpecificKeyword,
                    noResultFound: noResultFound,
                    clearSelection: clearSelection,
                    sDroidHelperService: sDroidHelperService,
                    startPageTour: startPageTour,
                    hideDriodHelper: hideDriodHelper,
                    search: search,
                    hasTour: hasTour,
                    faqList: [],
                    guideList: [],
                    searchHelpKeyword: null,
                    goToGuide: goToGuide,
                    contactUs: contactUs,
                    hasResult: hasResult,
                    goToFaq: goToFaq,
                    goToGuidePage: goToGuidePage
                });

                sDroidHelperService.getUser().then(function(u) {
                    vm.user = u;
                });

                $uibModalInstance.result.finally(function() {
                    sDroidHelperService.setShowHelpOnInit(!vm.sDroidHelperService.notShowPopupAgain);
                });
            });
        });