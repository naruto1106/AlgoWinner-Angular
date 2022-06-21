agmNgModuleWrapper("agm.landing")
    .defineControllerAsPage("agm.landing.NewForgetPasswordController",
        "/App/landing/forms/landing.forgetPassword.html",
        [],
        function (vm, dep, tool) {

        })
    .defineState('landing-password', {
        url: '/password'
    });