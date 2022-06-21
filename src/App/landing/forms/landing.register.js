agmNgModuleWrapper("agm.landing")
    .defineControllerAsPage("agm.landing.NewRegisterController",
        "/App/landing/forms/landing.register.html",
        [],
        function (vm, dep, tool) {

        })
    .defineState('landing-register', {
        url: '/register'
    });