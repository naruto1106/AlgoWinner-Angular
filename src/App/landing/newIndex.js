agmNgModuleWrapper("agm.landing")
    .defineController("agm.landing.RootController", ['sUserAccountService', "sAuthService"],
    function (vm, dep, tool) {
        var sUserAccountService = dep.sUserAccountService,
            coreNotificationService = dep.coreNotificationService,
            $location = dep.$location,
            sAuthService = dep.sAuthService,
            $window = dep.$window;

        function showLogin() {
            return tool.openModalByDefinition('agm.landing.LoginController', {
                showRegister: true,
                canDismiss: true
            });
        }
        
        function seePerformance(strategyId) {
            dep.$window.open("/strategy?id=" + strategyId, '_blank');
        }

        function showResetPassword(code) {
            return tool.openModalByDefinition('s.gateway.ResetPasswordController', {
                userCode: code
            });
        }

        function showConfirmEmailAndRegister(code, email) {
            return tool.openModalByDefinition('s.user.ConfirmEmailAndRegisterController', {
                userCode: code,
                email: email
            });
        }

        function showConfirmEmailTokenExpired(email) {
            return coreNotificationService.notifyErrorOkCancel("Link Expired", "Sorry, this link has already expired. Click OK for another link to be sent to " + email
                + ", or click Cancel to exit.",
                function (id) {
                    var request = {
                        Email: email
                    };
                    if (id === 0) {
                        sUserAccountService.SendConfirmEmailExpiredToken(request)
                            .then(function () {
                                coreNotificationService.notifySuccess("Success", "We have sent another confirmation email to " + email + ".");
                            }, function () {
                                coreNotificationService.notifyError("Error", "An error occurred and the confirmation email was not sent. Please contact us for assistance.");
                            });
                    }
                });
        }

        function showUserAlreadyRegistered(email) {
            return coreNotificationService.notifyErrorOkCancel("User Already Registered", "Sorry, you have already registered the following email: " + email
                + ". Click OK to login or Cancel to exit",
                function (id) {
                    if (id === 0) {
                        showLogin();
                    }
                });
        }

        function showUserAlreadyActivated(email) {
            return coreNotificationService.notifyErrorOkCancel("User Already Activated", "Sorry, you have already activated the following email: " + email
                + ". Click OK to login or Cancel to exit",
                function (id) {
                    if (id === 0) {
                        showLogin();
                    }
                });
        }

        function enter() {
            $window.location.href = "/Home/Inside#/";
        }

        tool.initialize(function () {
            tool.setVmProperties({
                seePerformance: seePerformance
            });

            var isLoggedIn = false;
            vm.isloading = true;

            sAuthService.CheckLoggedIn().then(function (e) {
                if (e.status === 200) {
                    isLoggedIn = true;
                }
            }).finally(function () {
                var params = $location.search();

                if (params.message === "ConfirmEmailFailed") {
                    vm.isloading = false;
                    coreNotificationService.notifyError("Failed to Confirm Email", "Failed to confirm email");
                } else if (params.message === "ConfirmEmailSuccess") {
                    var promise = coreNotificationService.notifySuccess("Email Confirmed",
                        "You have confirmed your email. Please proceed to login to AlgoMerchant using the Login button to access our exclusive features.");
                    promise.closed.then(function () {
                        // Do not redirect user if they go to any campaign page
                        if ($window.location.hash.indexOf('/campaign/') === -1 && isLoggedIn) {
                            enter();
                        } else {
                            vm.isloading = false;
                        }
                    });
                } else if (params.message === "ResetPassword") {
                    vm.isloading = false;
                    showResetPassword(params.code);
                } else if (params.message === "ConfirmEmailAndRegister") {
                    vm.isloading = false;
                    showConfirmEmailAndRegister(params.code, params.email);
                } else if (params.message === "ConfirmEmailTokenExpired") {
                    vm.isloading = false;
                    showConfirmEmailTokenExpired(params.email);
                } else if (params.message === "UserAlreadyRegistered") {
                    vm.isloading = false;
                    showUserAlreadyRegistered(params.email);
                } else if (params.message === "UserAlreadyActivated") {
                    vm.isloading = false;
                    showUserAlreadyActivated(params.email);
                } else {
                    // Do not redirect user if they go to any campaign page
                    if ($window.location.hash.indexOf('/campaign/') === -1 && isLoggedIn) {
                        enter();
                    } else {
                        vm.isloading = false;
                    }
                }
            });
        });
    });