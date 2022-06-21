agmNgModuleWrapper("agm.landing")
    .defineControllerAsPopup("agm.landing.ForgotPasswordController", {
        templateUrl: '/App/landing/directives/landing.forgotPassword.html',
        windowClass: 'mini-modal'
    },
    [],
    function (vm, dep, tool) {
        tool.inheritVmController('s.gateway.ForgotPasswordController');

        tool.initialize(function () {
            tool.setVmProperties({

            });

        });
    });