//We won't need this once the regular registration flow is invoked
agmNgModuleWrapper('agms.user')
    .defineService('sUserPasswordEnforcementService', [], function (serviceObj, dep, tool) {
        function checkPasswordFlow(path, callback) {
            $(path).complexify({}, function (valid, complexity) {
                tool.timeout(function () {
                    callback(valid, complexity);
                });
            });
        }

        function isPasswordStrongEnough(passwordComplexityGrade) {
            return passwordComplexityGrade === "Strong" || passwordComplexityGrade === "Fair";
        }

        function wordsAnd(objs) {
            if (objs.length === 2) {
                return objs[0] + " and " + objs[1];
            } else if (objs.length === 1) {
                return objs[0];
            } else if (objs.length > 2) {
                var notLast = objs.slice(0, objs.length - 1).join(", ");
                return notLast + ", and " + objs[objs.length - 1];
            }
        }

        function getComposedPasswordComment(pass) {

            var check = passwordStructureCheck(pass);

            if (check.length === 0) {
                return null;
            }
            var str = "Your password must";
            var components = [];
            var charComponent = [];
            check.forEach(function (i) {
                if (i === 'length') {
                    components.push("be at least 8 characters");
                } else if (i === "number") {
                    charComponent.push("1 " + i);
                } else {
                    charComponent.push("1 " + i +" letter");
                }
            });
            if (charComponent.length > 0) {
                components.push("contain at least " + wordsAnd(charComponent));
            }

            str = str + " " + wordsAnd(components) + ".";
            return str;
        }
        
        function getComplexityGrade(c, pass) {
            var error = passwordStructureCheck(pass);
            if (error.length > 0) {
                return "Weak";
            }
            if (c >= 35) {
                return "Strong";
            } else if (c >= 25) {
                return "Fair";
            } else {
                return "Weak";
            }
        }

        function passwordStructureCheck(pass) {
            if (!pass) {
                return ['length', 'uppercase', 'lowercase', 'number'];
            }

            var upperCaseReg = /([A-Z])+/g;
            var lowerCaseReg = /([a-z])+/g;
            var alphaNumericReg = /([0-9])+/g;
            var errors = [];

            if (pass.length < 8) {
                errors.push('length');
            }

            if (!upperCaseReg.test(pass)) {
                errors.push('uppercase');
            }
            if (!lowerCaseReg.test(pass)) {
                errors.push('lowercase');
            }
            if (!alphaNumericReg.test(pass)) {
                errors.push('number');
            }

            return errors;
        }
        
        tool.setServiceObjectProperties({
            checkPasswordFlow: checkPasswordFlow,
            isPasswordStrongEnough: isPasswordStrongEnough,
            getComplexityGrade: getComplexityGrade,
            passwordStructureCheck: passwordStructureCheck,
            getComposedPasswordComment: getComposedPasswordComment
        });
    })
    .defineControllerAsPopup('s.user.ConfirmEmailAndRegisterController',
        {
            templateUrl: '/App/shared/user/user.confirmEmailAndRegister.html',
            windowClass: 'mini-modal',
        },
        ['sUserAccountService', 'sGatewayLoginService', 'sUserPasswordEnforcementService', 'userCode', 'email'],
        function (vm, dep, tool) {
            var $window = dep.$window,
                sUserAccountService = dep.sUserAccountService,
                sUserPasswordEnforcementService = dep.sUserPasswordEnforcementService,
                sGatewayLoginService = dep.sGatewayLoginService,
                coreNotificationService = dep.coreNotificationService,
                userCode = dep.userCode,
                email = dep.email;
            
            tool.onRendered(function () {
                sUserPasswordEnforcementService.checkPasswordFlow('#password_field', function (valid, complexity) {
                    vm.passwordComplexity = complexity;
                    vm.passwordComplexityGrade = sUserPasswordEnforcementService.getComplexityGrade(complexity, vm.confirmEmailAndRegisterModel.Password);
                });
            });

            function getComposedPasswordComment() {
                return sUserPasswordEnforcementService.getComposedPasswordComment(vm.confirmEmailAndRegisterModel.Password);
            }
            
            function isPasswordStrongEnough() {
                return sUserPasswordEnforcementService.isPasswordStrongEnough(vm.passwordComplexityGrade);
            };
            
            function isValidModel() {
                return vm.confirmEmailAndRegisterModel.ConfirmPassword === vm.confirmEmailAndRegisterModel.Password;
            }
            
            function submit() {
                var modal = {};
                vm.message = null;
                vm.submitting = true;
                sUserAccountService.ResetUserNameAndPassword(vm.confirmEmailAndRegisterModel)
                    .then(function (res) {
                        vm.submitting = false;
                        modal = coreNotificationService.notifySuccess(
                            "Congratulations",
                            "You have successfully registered with AlgoMerchant. Click OK to login.");
                        modal.result.finally(function () {
                            vm.loggingIn = true;
                            sGatewayLoginService.start(vm.confirmEmailAndRegisterModel.Email, vm.confirmEmailAndRegisterModel.Password, true, true)
                                .then(function () {
                                    $window.location.href = '/Home/Inside#/overview';
                                }, function () {
                                    vm.loggingIn = false;
                                    coreNotificationService.notifyError("Error Logging In", "We were unable to log you in. Please check your network settings and try logging in again.");
                                });
                        });
                    }, function (res) {
                        vm.message = "Sorry,registration was not successful. Please try again later or contact us for assistance.";
                        vm.submitting = false;
                    });
            };

            function passwordErrorCheck() {
                return sUserPasswordEnforcementService.passwordStructureCheck(vm.confirmEmailAndRegisterModel.Password);
            }

            tool.setVmProperties({
                confirmEmailAndRegisterModel: {
                    Code: userCode,
                    Email: email,
                    Password: '',
                    ConfirmPassword: '',
                },
                submit: submit,
                message: null,
                submitting: false,
                loggingIn: false,
                isValidModel: isValidModel,
                isPasswordStrongEnough: isPasswordStrongEnough,
                passwordErrorCheck: passwordErrorCheck,
                getComposedPasswordComment: getComposedPasswordComment,
            });
        }
    );