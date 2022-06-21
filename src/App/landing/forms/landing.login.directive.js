agmNgModuleWrapper("agm.landing")
    .defineController("agm.landing.NewLoginDirectiveController",
    ["sGatewayLoginState", "sGatewayLoginService", "sUserAccountService", 'sStrategyCommerceGuestService', "sGatewayService"],
    function (vm, dep, tool) {
        var $window = dep.$window,
            sGatewayLoginState = dep.sGatewayLoginState,
            sGatewayLoginService = dep.sGatewayLoginService,
            sStrategyCommerceGuestService = dep.sStrategyCommerceGuestService,
            sUserAccountService = dep.sUserAccountService,
            sGatewayService = dep.sGatewayService,
            coreNotificationService = dep.coreNotificationService,
            coreConfigService = dep.coreConfigService;

        vm.userNameChanges = function () {
            vm.isPasswordExpired = false;
            if (dep.$scope.loginPanel && dep.$scope.loginPanel.email.$valid) {
                return sStrategyCommerceGuestService.IsPasswordExpired(vm.loginModel.UserName).then(function (res) {
                    vm.isPasswordExpired = res.data;
                });
            }
        }

        vm.sendResetPassword = function () {
            sUserAccountService.PasswordExpiredRenewal({
                Email: vm.loginModel.UserName
            }).then(function (res) {
                vm.submitting = false;
                coreNotificationService.notifySuccess("Forgot Password", "An email with a link to reset your password has been sent to you.");
            }, function (res) {
                if (res.data && res.data.Message) {
                    vm.message = "Error! " + (res.data && res.data.Message);
                } else {
                    vm.message = "An error has occcurred. Please check your connection or try again later.";
                }

                vm.submitting = false;
            });
        }

        vm.preventSubmit = function () {
            return vm.loginModel.UserName === "" || vm.state === sGatewayLoginState.authenticating || dep.$scope.loginPanel.email.$dirty && dep.$scope.loginPanel.email.$invalid;
        };

        function login() {
            vm.message = "";
            vm.state = sGatewayLoginState.authenticating;
            sGatewayLoginService.start(vm.loginModel.UserName, vm.loginModel.Password, vm.loginModel.RememberMe).then(function () {
                vm.state = sGatewayLoginState.success;
                $window.location.href = '/Home/Inside#/';
            }, function (res) {
                if (res) {
                    if (res === 'existing active session') {
                        vm.state = sGatewayLoginState.empty;
                        return;
                    }

                    if (res.error_description) {
                        vm.message = res.error_description;

                        if (res.error_description.indexOf("You are required to verify your email") > -1) {
                            vm.showResendEmail = true;
                        }
                        if (res.error_description.indexOf("account has been locked") > -1) {
                            vm.showAccountLocked = true;
                        }
                    } else {
                        vm.message = "Error! Either your email and/or password is invalid, or you have yet to confirm your email.";
                    }
                } else {
                    vm.message = "An error has occcurred. Please check your connection or try again later.";
                }
                vm.state = sGatewayLoginState.error;
            });
        }

        function resendEmail() {
            sGatewayService.resendActivationLink({
                Email: vm.loginModel.UserName,
                IsAlgoLeaderWeb: coreConfigService.AlgoLeader.HideForAlgoLeader
            }).then(function () {
                coreNotificationService.notifySuccess("Success", "An email with a link to activate your account has been sent to you.");
            }, function (res) {
                if (res.data && res.data.Message) {
                    coreNotificationService.notifyError("Error", res.data.Message);
                } else {
                    coreNotificationService.notifyError("Error", "Request failed. Please refresh or try again later.");
                }
            });
        }

        tool.initialize(function () {
            tool.setVmProperties({
                loginModel: {
                    UserName: '',
                    Password: '',
                    RememberMe: false
                },

                login: login,
                resendEmail: resendEmail
            });

        });
    })
    .defineDirectiveForE("agm-landing-login", [],
    function () {
        return {
            controller: "agm.landing.NewLoginDirectiveController",
            templateUrl: "/App/landing/forms/landing.login.directive.html"
        };
    },
    {

    });