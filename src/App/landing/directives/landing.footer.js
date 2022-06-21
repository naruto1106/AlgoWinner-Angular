agmNgModuleWrapper("agm.landing")
    .defineController("agm.landing.FooterController", [],
        function (vm, dep, tool) {

            tool.initialize(function () {
                tool.setVmProperties({

                });

            });
        })
.defineDirectiveForE("agm-landing-footer", [],
        function () {
            return {
                controller: "agm.landing.FooterController",
                templateUrl: "/App/landing/directives/landing.footer.html"
            };
        },
        {

        });