agmNgModuleWrapper('agmp.user')
    .defineControllerAsPopup('p.user.ChangePasswordController',
        {
            templateUrl: '/App/pages/user/user.changePassword.html',
            windowClass: 'mini-modal'
        },
        ['sUserAccountService'],
        function(vm, dep, tool) {
            var sUserAccountService = dep.sUserAccountService,
                coreNotificationService = dep.coreNotificationService;

            var changePasswordForm = null;
            vm.changePasswordModel = {
                OldPassword: '',
                NewPassword: '',
                ConfirmNewPassword: ''
            };
            tool.onRendered(function() {
                changePasswordForm = dep.$scope.changePasswordForm;
            });

            vm.clearConfirmPassword = function() {
                vm.changePasswordModel.ConfirmNewPassword = '';
                changePasswordForm.confirmNewPassword.$setPristine();
            }

            vm.evaluateContent = function() {
                vm.message = null;
                vm.changePasswordModel.OldPasswordInvalidMessage = "";
                vm.changePasswordModel.NewPasswordInvalidMessage = "";
                vm.changePasswordModel.ConfirmNewPasswordInvalidMessage = "";
                var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

                if (changePasswordForm.oldPassword.$dirty && vm.changePasswordModel.OldPassword && vm.changePasswordModel.OldPassword.length < 6) {
                    vm.changePasswordModel.OldPasswordInvalidMessage = "Your old password should have at least 6 characters.";
                } else {
                    vm.changePasswordModel.OldPasswordInvalidMessage = "";
                }

                if (changePasswordForm.newPassword.$dirty && vm.changePasswordModel.NewPassword) {
                    if (vm.changePasswordModel.NewPassword.length < 8)  {
                        vm.changePasswordModel.NewPasswordInvalidMessage = "Your new password should have at least 8 characters.";
                    }
                    if (!vm.changePasswordModel.NewPassword.match(reg)) {
                        vm.changePasswordModel.NewPasswordInvalidMessage = "Your new password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.";
                    }
                    if (vm.changePasswordModel.NewPassword === vm.changePasswordModel.OldPassword && vm.changePasswordModel.NewPassword.length > 0) {
                        vm.changePasswordModel.NewPasswordInvalidMessage = "New password must differ from current password.";
                    }
                    vm.changePasswordModel.NewPasswordOk = !vm.changePasswordModel.NewPasswordInvalidMessage;
                } else {
                    vm.changePasswordModel.NewPasswordInvalidMessage = "";
                    vm.changePasswordModel.NewPasswordOk = false;
                }

                if (changePasswordForm.confirmNewPassword.$dirty && vm.changePasswordModel.ConfirmNewPassword) {
                    if (vm.changePasswordModel.NewPassword !== vm.changePasswordModel.ConfirmNewPassword) {
                        vm.changePasswordModel.ConfirmNewPasswordInvalidMessage = "Passwords do not match!";
                    }
                    vm.changePasswordModel.ConfirmNewPasswordOk = vm.changePasswordModel.NewPasswordOk && !vm.changePasswordModel.ConfirmNewPasswordInvalidMessage;
                } else {
                    vm.changePasswordModel.ConfirmNewPasswordInvalidMessage = "";
                    vm.changePasswordModel.ConfirmNewPasswordOk = false;
                }
            }

            vm.isValidModel = isValidModel;

            function isValidModel() {
                return vm.changePasswordModel.ConfirmNewPassword === vm.changePasswordModel.NewPassword;
            }

            vm.message = null;
            vm.submitting = false;
            vm.disableForm = false;
            vm.submit = function() {
                vm.submitting = true;
                vm.disableForm = true;

                vm.message = null;
                sUserAccountService.ChangePassword(vm.changePasswordModel)
                    .then(function(res) {
                        coreNotificationService.notifySuccessWithAction(
                            "Change Password",
                            "Your password has been successfully changed.",
                            function() {
                                vm.uibClosePanel();
                            });
                    }, function(res) {
                        if (res.data && res.data.Message && res.data.Message.indexOf("Incorrect password") > -1) {
                            vm.incorrectPassword = true;
                            vm.changePasswordModel = {
                                OldPassword: '',
                                NewPassword: '',
                                ConfirmNewPassword: ''
                            };
                            changePasswordForm.newPassword.$setPristine();
                            changePasswordForm.confirmNewPassword.$setPristine();
                            vm.message = "Sorry, your old password you typed in was incorrect.";
                        } else {
                            vm.incorrectPassword = false;
                            vm.message = "Sorry, an error occurred. Your password has not been changed.";
                        }
                    }).finally(function() {
                        vm.submitting = false;
                        vm.disableForm = false;
                    });
            };

            tool.watch("vm.changePasswordModel", function() {
                if (vm.submitting) {
                    vm.submitting = false;
                }
                if (vm.incorrectPassword) {
                    vm.incorrectPassword = false;
                }
            }, true);
        }
    );