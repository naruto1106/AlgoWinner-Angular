agmNgModuleWrapper("agms.misc")
    .defineController("agms.misc.FooterController", [],
    function (vm, dep, tool) {

        function contactUs() {
            tool.openModalByDefinition("s.misc.ContactUsController", {
            });
        }

        function showDisclaimer() {
            tool.openModalByDefinition("s.misc.DisclaimerController", {
            });
        }

        tool.initialize(function () {
            tool.setVmProperties({
                contactUs: contactUs,
                showDisclaimer: showDisclaimer,
                coreConfigService: dep.coreConfigService
            });
        });
    })
    .defineDirectiveForE("agms-misc-footer", [],
    function () {
        return {
            controller: "agms.misc.FooterController",
            templateUrl: "/App/shared/misc/misc.footer.html"
        };
    },
    {

    });