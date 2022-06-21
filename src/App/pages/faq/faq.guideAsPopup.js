agmNgModuleWrapper('agmp.faq')
    .defineControllerAsPopup('p.faq.GuideAsPopupController',
        {
            templateUrl: '/App/pages/faq/faq.guideAsPopup.html',
            windowClass: 'full-size-modal'
        },
        ['sMiscFaqService', 'guide', 'relatedGuides', 'title'],
        function(vm, dep, tool) {
            var sMiscFaqService = dep.sMiscFaqService;
            vm.guide = dep.guide;
            vm.title = dep.title;
            sMiscFaqService.setSelectedStepIndex(vm.guide, 0);
            vm.guide.selectedStepIndex = 0;
            vm.relatedGuides = dep.relatedGuides;
            tool.setVmProperties({
                setSelectedStep: sMiscFaqService.setSelectedStep,
                setSelectedStepIndex: sMiscFaqService.setSelectedStepIndex,
                setAsCurrentGuide: setAsCurrentGuide
            });

            function setAsCurrentGuide(guide) {
                vm.guide = guide;
                sMiscFaqService.setSelectedStepIndex(vm.guide, 0);
            }
        });