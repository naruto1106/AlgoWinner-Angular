agmNgModuleWrapper('agms.gateway')
    .defineControllerAsPopup('s.gateway.ResetPasswordController',
    {
        templateUrl: '/App/shared/gateway/gateway.resetPassword.html',
        windowClass: 'mini-modal'
    },
    ['sUserAccountService', 'coreNotificationService', 'userCode'],
    function (vm, dep, tool) {

        var $location = dep.$location,
            sUserAccountService = dep.sUserAccountService,
            coreNotificationService = dep.coreNotificationService,
            userCode = dep.userCode,
            coreConfigService = dep.coreConfigService;

        function isValidModel() {
            return vm.resetPasswordModel.ConfirmPassword === vm.resetPasswordModel.Password;
        }

        function disableSubmit() {
            return !isValidModel() || !dep.$scope.resetPasswordForm.$valid || vm.submitting;
        }

        function resendEmail() {
            var model = {
                Email: vm.resetPasswordModel.Email,
                IsAlgoLeaderWeb: coreConfigService.AlgoLeader.HideForAlgoLeader
            }
            sUserAccountService.ForgotPassword(model)
                .then(function (res) {
                    coreNotificationService.notifySuccess("Reset Password",
                        "Another new email has been sent to you to reset your password");
                    vm.uibDismissPanel();
                },
                function (res) {
                    coreNotificationService.notifyError("Error",
                        "An error occurred sending you a new reset password email. Please try again or contact AlgoMerchant Support.");
                });
        }

        function evaluatePassword() {
            vm.showGenericErrorMessage = false;
            vm.showOldPasswordSameMessage = false;
            vm.passwordMessage = "";
            var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
            
            if (dep.$scope.resetPasswordForm.password.$dirty && vm.resetPasswordModel.Password) {
                if (vm.resetPasswordModel.Password.length < 8) {
                    vm.passwordMessage = "Your new password should have at least 8 characters.";
                }else if (!vm.resetPasswordModel.Password.match(reg)) {
                    vm.passwordMessage =
                        "Your new password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.";
                } else {
                    vm.passwordMessage = "";
                }
            }
        }

        function submit() {
            vm.showGenericErrorMessage = false;
            vm.showOldPasswordSameMessage = false;
            vm.submitting = true;
            sUserAccountService.ResetPassword(vm.resetPasswordModel)
                .then(function (res) {
                    vm.submitting = false;
                    coreNotificationService.notifySuccessWithAction(
                        "Reset Password",
                        "Your password has been successfully reset.",
                        function () {
                            vm.uibDismissPanel();
                            $location.search({});
                            tool.openModalByDefinition('agm.landing.LoginController',
                                {
                                    showRegister: true,
                                    canDismiss: true
                                });
                        });
                },
                function (res) {
                    if (res.data.Message === "New password is the same as the old one") {
                        vm.showGenericErrorMessage = false;
                        vm.showOldPasswordSameMessage = true;
                    } else {
                        vm.showGenericErrorMessage = true;
                        vm.showOldPasswordSameMessage = false;
                    }
                    vm.submitting = false;
                });
        };

        tool.setVmProperties({
            resetPasswordModel: {
                Code: userCode,
                Email: '',
                Password: '',
                ConfirmPassword: ''
            },
            showGenericErrorMessage: false,
            showOldPasswordSameMessage: false,
            submitting: false,

            resendEmail: resendEmail,
            evaluatePassword: evaluatePassword,
            disableSubmit: disableSubmit,
            submit: submit
        });
    });