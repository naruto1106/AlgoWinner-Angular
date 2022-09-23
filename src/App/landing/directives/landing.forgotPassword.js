agmNgModuleWrapper("agm.landing")
    .defineControllerAsPopup("agm.landing.ForgotPasswordController", {
        templateUrl: '/App/landing/directives/landing.forgotPassword.html',
        windowClass: 'mini-modal'
    },
    ['sUserAccountService', 'coreNotificationService'],
    function (vm, dep, tool) {
        var sUserAccountService = dep.sUserAccountService,
            coreNotificationService = dep.coreNotificationService,
            coreConfigService = dep.coreConfigService;
        
        function submit() {
            vm.message = null;
            vm.submitting = true;
            vm.forgotPasswordModel.IsAlgoLeaderWeb = coreConfigService.AlgoLeader.HideForAlgoLeader;
            sUserAccountService.ForgotPassword(vm.forgotPasswordModel)
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

        tool.initialize(function () {
            tool.setVmProperties({
                forgotPasswordModel: {
                    Email: ''
                },
                message: null,
                submitting: false,
                submit: submit
            });
        });
    });