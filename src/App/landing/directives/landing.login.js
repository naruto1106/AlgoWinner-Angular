agmNgModuleWrapper("agm.landing")
    .defineControllerAsPopup("agm.landing.LoginController", {
        templateUrl: '/App/landing/directives/landing.login.html',
        windowClass: 'mini-modal'
    },
    ['showRegister', 'canDismiss'],
    function (vm, dep, tool) {

        tool.inheritVmController('s.gateway.LoginPopupController', {
            $scope: dep.$scope,
            $uibModalInstance: dep.$uibModalInstance,
            showRegister: dep.showRegister,
            canDismiss: dep.canDismiss
        });

        function forgotPasswordLanding() {
            vm.uibDismissPanel();
            tool.openModalByDefinition('agm.landing.ForgotPasswordController');
        }

        tool.initialize(function () {
            tool.setVmProperties({
                forgotPasswordLanding: forgotPasswordLanding
            });
        });
    });