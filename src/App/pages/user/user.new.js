agmNgModuleWrapper('agmp.user')
    .defineControllerAsPopup('p.user.NewPopupController',
    {
        templateUrl: "/App/pages/user/user.new.popup.html",
        windowClass: 'mini-modal',
        keyboard: false
    },
    [
        'profile',
        'sUserService', 'sUserAccountService', 'coreAuthInterceptor', 'commonScreenResizerService'
    ],
    function (vm, dep, tool) {

        var profile = dep.profile,
            coreNotificationService = dep.coreNotificationService,
            commonScreenResizerService = dep.commonScreenResizerService,
            sUserService = dep.sUserService,
            sUserAccountService = dep.sUserAccountService,
            coreSignalRNotificationService = dep.coreSignalRNotificationService,
            coreAuthInterceptor = dep.coreAuthInterceptor,
            coreConfigService = dep.coreConfigService;

        var previousVerifyUserNamePromise = null;
        vm.uploadImage = uploadImage;
        vm.saveChanges = saveChanges;
        vm.requestingState = 0;
        vm.userNameVerified = false;
        vm.showUserInfo = false;
        vm.showTermsAndSignature = false;
        vm.coreConfigService = coreConfigService;

        vm.isSubmitDisabled = function () {
            return vm.myProfile.Signature === null || vm.myProfile.Signature === "" || !vm.myProfile.AcceptedTnC ||
                (vm.myProfile.PhoneNumberDetails === "" && vm.requirePhoneNumber) ||
                vm.myProfile.UserName === null ||
                vm.myProfile.UserName === "" ||
                vm.myProfile.UserName.length < 6 ||
                vm.myProfile.Country.CountryId === null ||
                vm.myProfile.Timezone.TimezoneId === null ||
                (!vm.userNameVerified && vm.showUserInfo) ||
                (vm.requestingState !== 3 && vm.requestingState !== 0);
        }

        init();

        tool.watch("vm.myProfile.UserName", function (newValue, oldValue) {
            if (oldValue !== newValue && newValue !== "") {
                verifyUserName();
            }
        }, false);

        tool.on('$destroy', function () {
            coreSignalRNotificationService.turnOff('ProfileUpdated', handleProfileUpdate);
        });

        vm.logout = function () {
            coreAuthInterceptor.logout();
        }

        function verifyUserName() {
            if (previousVerifyUserNamePromise) {
                previousVerifyUserNamePromise.cancel();
            }

            vm.requestingState = 1;
            vm.userNameVerified = false;
            if (vm.myProfile.UserName.length < 6) {
                vm.requestingState = 3;
                return;
            }

            previousVerifyUserNamePromise = sUserAccountService.VerifyUserName(vm.myProfile.UserName);

            previousVerifyUserNamePromise.then(function (res) {
                vm.userNameVerified = true;
                vm.requestingState = res.data ? 2 : 3;
            }, function () {
                vm.userNameVerified = false;
                vm.requestingState = -1;
            });
        }

        function uploadImage() {
            var modalInstance = tool.openModalByDefinition('s.image.UploadDialogController', {
                params: {
                    targetWidth: 120,
                    targetHeight: 120,
                    existingImage: vm.myProfile.ProfileImageUrl,
                    constrainedImageFile: null,
                    customCssMask: {
                        borderRadius: "50%",
                        overflow: "hidden"
                    }

                }
            });
            modalInstance.result.then(function (res) {
                vm.myProfile.ProfileImageUrl = res;
            });
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

            sUserService.UpdateProfile(vm.myProfile)
                .then(function (res) {
                    if (vm.myProfile.PhoneNumberDetails === "" || vm.myProfile.PhoneNumberDetails === null || vm.myProfile.PhoneNumber === "" || vm.myProfile.PhoneCountryCode === "") {
                        tool.openModalByDefinition('p.user.PhoneNumberController', {
                            myProfile: vm.myProfile
                        }).result.then(function () {
                            deferredCompletion.resolve();
                        });
                    } else {
                        coreNotificationService.notifySuccess("Success", "Profile has been updated").result.then(function () {
                            deferredCompletion.resolve();
                        });
                        vm.uibClosePanel({
                            promise: deferredCompletion.promise
                        });
                    }
                }, function (res) {
                    coreNotificationService.notifyError("Error", "Sorry, we were unable to update your profile. Please check your network settings and try again later.");
                });

        }

        function handleProfileUpdate(newProfile) {
            vm.uibClosePanel({
                promise: deferredCompletion.promise
            });
        }

        function init() {

            coreSignalRNotificationService.turnOn('ProfileUpdated', handleProfileUpdate);
            commonScreenResizerService.setForceActualSize(true);

            vm.onUibClosed = function () {
                commonScreenResizerService.setForceActualSize(false);
            }
            vm.onUibDismissed = vm.onUibClosed;

            if (profile.PhoneCountryCode != null && profile.PhoneNumber != null) {
                profile.PhoneNumberDetails = "+" + profile.PhoneCountryCode + profile.PhoneNumber;
            } else {
                profile.PhoneNumberDetails = "";
            }

            vm.myProfile = profile;

            if (vm.myProfile.UserName && vm.myProfile.UserName.length >= 6) {
                vm.requirePhoneNumber = false;
            } else {
                vm.requirePhoneNumber = true;
            }

            if (vm.myProfile.UserName === "") {
                vm.showUserInfo = true;
            }
            if (vm.myProfile.Signature === "" || !vm.myProfile.AcceptedTnC || vm.myProfile.PhoneNumberDetails === "" || vm.myProfile.PhoneNumberDetails === null || vm.myProfile.PhoneNumber === "" || vm.myProfile.PhoneCountryCode === "") {
                vm.showTermsAndSignature = true;
            }

            verifyUserName();

            //Guess timezone and country
            var countrySet = tool.defer();

            sUserService.GetCountries()
                .then(function (res) {
                    vm.myCountries = res.data;
                    if (vm.myProfile.Country.CountryId === null) {
                        vm.myProfile.Country = vm.myCountries.filter(function (c) {
                            return c.CountryName === "Singapore";
                        })[0];
                        countrySet.resolve();
                    } else {
                        countrySet.resolve();
                    }
                }, function (res) {
                    tool.logError("Unable to get countries", "Error! " + (res.data && res.data.Message));
                    countrySet.reject();
                });
            sUserService.GetTimezones()
                .then(function (res) {
                    vm.myTimezones = res.data;
                    if (vm.myProfile.Timezone.TimezoneId === null) {
                        var timezone = moment.tz.guess();
                        var timezoneOffset = moment().tz(timezone).format('Z').replace('+', ' ');
                        var myPossibleTimezones = vm.myTimezones.filter(function (t) {
                            return t.TimezoneName.indexOf(timezoneOffset) > -1;
                        });
                        countrySet.promise.then(function () {
                            var countryMatchedTz = myPossibleTimezones.filter(function (tz) {
                                return tz.TimezoneName.indexOf(vm.myProfile.Country.CountryName) > -1;
                            })[0];
                            if (countryMatchedTz) {
                                vm.myProfile.Timezone = countryMatchedTz;
                            } else {
                                vm.myProfile.Timezone = myPossibleTimezones[0];
                            }
                        }, function () {
                            vm.myProfile.Timezone = myPossibleTimezones[0];
                        });
                    }
                }, function (res) {
                    tool.logError("Unable to get timezones", "Error! " + (res.data && res.data.Message));
                });
        }
    });