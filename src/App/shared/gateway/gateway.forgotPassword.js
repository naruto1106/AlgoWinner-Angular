agmNgModuleWrapper('agms.gateway')
    .defineControllerAsPopup('s.gateway.ForgotPasswordController',
    {
        templateUrl: '/App/shared/gateway/gateway.forgotPassword.html',
        windowClass: 'default-modal'
    },
    ['sUserAccountService', 'coreNotificationService'],
        function (vm, dep, tool) {
            var sUserAccountService = dep.sUserAccountService,
                coreNotificationService = dep.coreNotificationService,
                coreConfigService = dep.coreConfigService;

            vm.forgotPasswordModel = {
                Email: ''
            };

            vm.message = null;
            vm.submitting = false;
            vm.submit = function () {
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
            };

        });