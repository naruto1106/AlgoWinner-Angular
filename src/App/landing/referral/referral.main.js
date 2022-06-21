agmNgModuleWrapper("agm.landing")
    .defineControllerAsPage("agm.landing.ReferralMainController",
        "/App/landing/referral/referral.main.html",
        [],
        function (vm, dep, tool) {

            tool.initialize(function () {
                tool.setVmProperties({
                });

            });
        })
    .defineState('landing-referral', {
        url: '/invite'
    });