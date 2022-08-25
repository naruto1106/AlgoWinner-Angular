agmNgModuleWrapper("agm.landing")
    .defineControllerAsPopup("agm.landing.LoginController", {
        templateUrl: '/App/landing/directives/landing.login.html',
        windowClass: 'mini-modal'
    },
        ['sStrategyCommerceGuestService', 'sGatewayLoginService', 'sGatewayLoginState', 'sUserAccountService',
            "coreUserStateService", 'showRegister', 'canDismiss'],
    function (vm, dep, tool) {
        var $window = dep.$window,
            sStrategyCommerceGuestService = dep.sStrategyCommerceGuestService,
            sUserAccountService = dep.sUserAccountService,
            sGatewayLoginService = dep.sGatewayLoginService,
            sGatewayLoginState = dep.sGatewayLoginState,
            coreNotificationService = dep.coreNotificationService,
            showRegister = dep.showRegister,
            canDismiss = dep.canDismiss,
            coreUserStateService = dep.coreUserStateService;

        vm.loginModel = {
            UserName: '',
            Password: '',
            RememberMe: false
        };
        vm.showRegister = showRegister;
        vm.canDismiss = canDismiss;
        vm.state = sGatewayLoginState.empty;
        vm.message = null;
        vm.preventSubmit = function () {
            return vm.state === sGatewayLoginState.authenticating;
        };
        vm.coreUserStateService = coreUserStateService;

        function login() {
            sGatewayLoginService.start(vm.loginModel.UserName, vm.loginModel.Password, vm.loginModel.RememberMe).then(function () {
                vm.uibClosePanel();

                vm.state = sGatewayLoginState.success;

                if (coreUserStateService.hasPendingLogoutConfirmation) {
                    $window.location.reload();
                } else {
                    $window.location.href = '/Home/Inside#/';
                }
            }, function (res) {
                if (res) {
                    if (res === 'existing active session') {
                        vm.state = sGatewayLoginState.empty;
                        return;
                    }

                    if (res.error_description) {
                        vm.message = res.error_description;
                    } else {
                        vm.message = "Error! Either your email and/or password is invalid, or you have yet to confirm your email.";
                    }
                } else {
                    vm.message = "An error has occcurred. Please check your connection or try again later.";
                }
                vm.state = sGatewayLoginState.error;
            });
        }

        vm.submit = function () {
            vm.message = null;
            vm.state = sGatewayLoginState.authenticating;
            login();
        };

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
            })
                .then(function (res) {
                    vm.submitting = false;
                    coreNotificationService.notifySuccess("Forgot Password", "An email with a link to reset your password has been sent to you.");
                    vm.uibDismissPanel();
                }, function (res) {
                    if (res.data && res.data.Message) {
                        vm.message = "Error! " + (res.data && res.data.Message);
                    } else {
                        vm.message = "An error has occcurred. Please check your connection or try again later.";
                    }

                    vm.submitting = false;
                });
        }

        vm.forgotPassword = function () {
            tool.openModalByDefinition('s.gateway.ForgotPasswordController');
        }

        vm.register = function () {
            dep.$window.open("/" + "#!/register", '_blank');
        }

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