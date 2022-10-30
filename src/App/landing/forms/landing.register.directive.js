agmNgModuleWrapper("agm.landing")
    .defineController("agm.landing.NewRegisterDirectiveController",
    ['sUserAccountService', 'sGatewayService', "sGatewayLoginService"],
    function (vm, dep, tool) {
        var sUserAccountService = dep.sUserAccountService,
            coreNotificationService = dep.coreNotificationService,
            sGatewayService = dep.sGatewayService,
            coreConfigService = dep.coreConfigService,
            sGatewayLoginService = dep.sGatewayLoginService,
            $window = dep.$window;

        vm.coreConfigService = coreConfigService;
        vm.emailVerified = false;
        vm.submitting = false;

        vm.newUserRegisterModel = {
            Password: null,
            FirstName: "",
            LastName: "",
            Email: ""
        }

        vm.disableSubmit = function () {
            return vm.submitting || vm.requestingState !== 2 || vm.passwordState !== 3;
        }

        vm.register = function () {
            vm.submitting = true;

            vm.newUserRegisterModel.IsAlgoLeaderWeb = coreConfigService.AlgoLeader.HideForAlgoLeader;
            if (vm.referralCode) {
                vm.newUserRegisterModel.ReferralCode = vm.referralCode;
            }

            // TODO: Should refactor to make this cleaner
            var functionToCall = "registerNewUserWithPassword";

            sGatewayService[functionToCall](vm.newUserRegisterModel).then(function (result) {
                if (coreConfigService.General.AutoApproveNewRegisteredUser) {
                    vm.submitting = false;
                    var modal = coreNotificationService.notifySuccess(
                        "Congratulations", "You have successfully registered with AlgoMerchant. We have sent you an email to activate your account, but you can browse our platform without activation for 48 hours. Click OK to login.");
                    modal.result.finally(function () {
                        vm.submitting = true;
                        sGatewayLoginService.start(vm.newUserRegisterModel.Email, vm.newUserRegisterModel.Password, true, true)
                            .then(function () {
                                fbq('track', 'CompleteRegistration', {
                                    content_name: "LandingPage"
                                });                               
                                $window.location.href = '/Home/Inside#/overview';
                            }, function () {
                                coreNotificationService.notifyError("Error Logging In", "We were unable to log you in. Please check your network settings and try logging in again.");
                            }).finally(function () {
                                vm.submitting = false;
                            });
                    });
                } else {
                    vm.submitting = false;
                    coreNotificationService.notifySuccess("Registration Successful", "We have received your registration and you should receive an email once it has been approved.");
                    dep.$location.path('/');
                }
            }, function (res) {
                coreNotificationService.notifyError("Registration Unsuccessful", res.data.Message);
                vm.submitting = false;
            });
        }

        vm.verifyEmail = function () {
            if (vm.newUserRegisterModel.Email) {
                vm.requestingState = 1;
                vm.emailVerified = false;
                sUserAccountService.VerifyEmail(vm.newUserRegisterModel.Email)
                    .then(function (res) {
                        vm.emailVerified = true;
                        vm.requestingState = res.data ? 2 : 3;
                    }, function () {
                        vm.requestingState = -1;
                        vm.emailVerified = false;
                        coreNotificationService.notifyError("Verify Email", "An error occurred verifying your email. Please try again.");
                    });
            } else {
                vm.requestingState = 0;
            }
        }

        vm.verifyPassword = function () {
            //States: 0 = Empty, 1 = Fewer than 8 characters, 2 = Fails Criteria, 3 = pass
            if (vm.newUserRegisterModel.Password) {
                if (vm.newUserRegisterModel.Password.length < 8) {
                    vm.passwordState = 1;
                } else if (!vm.newUserRegisterModel.Password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)) {
                    vm.passwordState = 2;
                } else {
                    vm.passwordState = 3;
                }
            } else {
                vm.passwordState = 0;
            }
        }

        tool.watch("vm.newUserRegisterModel.Email",
            function () {
                vm.verifyEmail();
            },
            false);

        tool.initialize(function () {
            tool.setVmProperties({
                campaignCode: "",
                referralCode: ""
            });

            //detect campaign code
            var urlParams = dep.$location.search();
            if (urlParams && urlParams.campaign) {
                vm.campaignCode = urlParams.campaign;
            }
            //detect referral code
            if (urlParams && urlParams.code) {
                vm.referralCode = urlParams.code;
            }
        });
    })
    .defineDirectiveForE("agm-landing-register",
    [],
    function () {
        return {
            controller: "agm.landing.NewRegisterDirectiveController",
            templateUrl: "/App/landing/forms/landing.register.directive.html"
        };
    },
    {
    })
    .defineDirectiveForE("agm-landing-register-small",
    [],
    function () {
        return {
            controller: "agm.landing.NewRegisterDirectiveController",
            templateUrl: "/App/landing/forms/landing.register.small.directive.html"
        };
    },
    {
    });