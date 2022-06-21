agmNgModuleWrapper("agm.landing")
    .defineController("agm.landing.NewForgetPasswordDirectiveController",
    ['sUserAccountService', 'coreNotificationService'],
        function (vm, dep, tool) {

            vm.submit = function () {
                var message = "";
                vm.submitting = true;
                dep.sUserAccountService.ForgotPassword(vm.forgotPasswordModel)
                    .then(function (res) {
                        vm.submitting = false;
                        dep.coreNotificationService.notifySuccess("Forgot Password", "An email with a link to reset your password has been sent to you.");
                    }, function (res) {
                        if (res.data && res.data.Message) {
                            message = "Error! " + (res.data && res.data.Message);
                        } else {
                            message = "An error has occcurred. Please check your connection or try again later.";
                        }
                        dep.coreNotificationService.notifyError("Forgot Password", message);
                        
                        vm.submitting = false;
                    });
            };

            tool.initialize(function () {
                tool.setVmProperties({
                    submitting: false,
                    forgotPasswordModel: {
                        Email: ''
                    }

                });

            });
        })
    .defineDirectiveForE("agm-landing-forget-password", [],
        function () {
            return {
                controller: "agm.landing.NewForgetPasswordDirectiveController",
                templateUrl: "/App/landing/forms/landing.forgetPassword.directive.html"
            };
        },
        {

        });