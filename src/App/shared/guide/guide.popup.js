agmNgModuleWrapper('agms.guide')
    .defineController("s.guide.PopupController", ['sGuideItemManagerService'],
        function(vm, dep, tool) {
            var sGuideItemManagerService = dep.sGuideItemManagerService;
            tool.onRendered(function() {
                vm.config.element = $(vm._getDirectiveElement());
            });
            tool.setVmProperties({
                sGuideItemManagerService: sGuideItemManagerService,
            });
        })
    .defineDirectiveForE('agms-guide-popup', [], function() {
        return {
            templateUrl: '/App/shared/guide/guide.popup.html',
            controller: 's.guide.PopupController'
        }
    }, {
        config:'='
    });