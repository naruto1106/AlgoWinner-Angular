agmNgModuleWrapper('agmp.user')
    .defineControllerAsPopup('p.user.ChangeEmailController',
        { templateUrl: '/App/pages/user/user.changeEmail.html' },
        ['sUserAccountService', 'currentEmail'],
        function(vm, dep, tool) {

            var sUserAccountService = dep.sUserAccountService,
                coreNotificationService = dep.coreNotificationService,
                currentEmail = dep.currentEmail;

            vm.changeEmailModel = {
                NewEmail: '',
                ConfirmNewEmail: ''
            };

            vm.isValidModel = isValidModel;

            function isValidModel() {
                return vm.changeEmailModel.ConfirmNewEmail === vm.changeEmailModel.NewEmail;
            }

            vm.message = null;
            vm.submitting = false;
            vm.disableForm = false;
            vm.submit = function() {
                vm.submitting = true;
                vm.disableForm = true;
                vm.message = null;
                sUserAccountService.ChangeEmail(vm.changeEmailModel)
                    .then(function(res) {
                        vm.submitting = false;
                        vm.disableForm = false;
                        coreNotificationService.notifySuccessWithAction(
                            "Change Email",
                            "Your email has been successfully changed.",
                            function() {
                                vm.uibClosePanel(vm.changeEmailModel.NewEmail);
                            });
                    }, function(res) {
                        vm.incorrectEmail = false;
                        vm.message = "Sorry, an error occurred. Your email has not been changed.";
                        vm.disableForm = false;
                    });
            };

            vm.verifyEmail = function() {
                if (vm.changeEmailModel.NewEmail) {
                    vm.emailVerified = false;
                    if (vm.changeEmailModel.NewEmail === currentEmail) {
                        vm.requestingState = 4;
                    } else {
                        vm.requestingState = 1;
                        sUserAccountService.VerifyEmail(vm.changeEmailModel.NewEmail)
                            .then(function(res) {
                                vm.emailVerified = true;
                                vm.requestingState = res.data ? 2 : 3;
                            }, function(res) {
                                vm.requestingState = -1;
                                vm.emailVerified = false;
                                coreNotificationService.notifyError("Verify Email", "An error occurred verifying your email. Please try again.");
                            });
                    }
                } else {
                    vm.requestingState = 0;
                }
            }

            tool.watch("vm.changeEmailModel.ConfirmNewEmail", function() {
                if (vm.submitting) {
                    vm.submitting = false;
                }
                if (vm.incorrectEmail) {
                    vm.incorrectEmail = false;
                }
            }, false);

            tool.watch("vm.changeEmailModel.NewEmail", function() {
                vm.verifyEmail();
                if (vm.submitting) {
                    vm.submitting = false;
                }
                if (vm.incorrectEmail) {
                    vm.incorrectEmail = false;
                }
            }, false);
        });