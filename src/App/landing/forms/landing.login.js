agmNgModuleWrapper("agm.landing")
    .defineControllerAsPage("agm.landing.NewLoginController",
    "/App/landing/forms/landing.login.html",
    [],
    function (vm, dep, tool) {

        tool.initialize(function () {
            tool.setVmProperties({
            });

        });
    })
    .defineState('landing-login', {
        url: '/login'
    });