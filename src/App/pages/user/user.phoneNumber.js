agmNgModuleWrapper('agmp.user')
    .defineControllerAsPopup('p.user.PhoneNumberController',
        {
            templateUrl: "/App/pages/user/user.phoneNumber.html"
        },
        ['sUserService', 'myProfile', 'coreAuthInterceptor'],
        function(vm, dep, tool) {

            vm.myProfile = dep.myProfile;
            vm.saveChanges = saveChanges;
            vm.isSubmitDisabled = isSubmitDisabled;

            vm.logout = function() {
                dep.coreAuthInterceptor.logout();
            }

            function isSubmitDisabled() {
                return !vm.myProfile.PhoneNumberDetails || vm.myProfile.PhoneNumberDetails === "";
            }

            var deferredCompletion = tool.defer();

            function saveChanges() {
                if (vm.myProfile.PhoneNumberDetails && vm.myProfile.PhoneNumberDetails.PhoneCountryCode && vm.myProfile.PhoneNumberDetails.PhoneNumber) {
                    vm.myProfile.PhoneCountryCode = vm.myProfile.PhoneNumberDetails.PhoneCountryCode;
                    vm.myProfile.PhoneNumber = vm.myProfile.PhoneNumberDetails.PhoneNumber;
                } else if (vm.myProfile.PhoneNumberDetails === "") {
                    vm.myProfile.PhoneCountryCode = "";
                    vm.myProfile.PhoneNumber = "";
                }

                dep.sUserService.UpdateProfile(vm.myProfile)
                    .then(function(res) {
                        dep.coreNotificationService.notifySuccess("Success", "Profile has been updated").result.then(function() {
                            deferredCompletion.resolve();
                        });
                        vm.uibClosePanel({
                            promise: deferredCompletion.promise
                        });
                    }, function(res) {
                        dep.coreNotificationService.notifyError("Error", "Sorry, we were unable to update your profile. Please check your network settings and try again later.").result.then(function() {
                            deferredCompletion.reject();
                        });
                    });
            }
        }
    );