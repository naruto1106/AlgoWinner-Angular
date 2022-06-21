agmNgModuleWrapper('agmp.user')
    .defineController('p.user.ProfileController',
    [
        'sUserService', 'coreNotificationService', 'coreUserStateService', 'sUserAccountService', "sHeaderService"
    ],
    function (vm, dep, tool) {

        var sUserService = dep.sUserService,
            coreNotificationService = dep.coreNotificationService,
            coreUserStateService = dep.coreUserStateService,
            coreConfigService = dep.coreConfigService,
            sUserAccountService = dep.sUserAccountService;

        vm.visibleAspects = {
            SubscribedStrategies: true,
            MarketPlayerStrategies: true,
            TradingActivities: true,
            FeedsActivities: true,
            PriceAlerts: true,
            TradersGPS: coreConfigService.TradersGPS.HasAlertConfig
        };

        vm.acceptedFileTypes = {
            'application/pdf': true
        };

        vm.myProfile = null;
        vm.myDeveloperProfile = null;
        vm.myCountries = null;
        vm.DisplayTurnover = false;
        vm.DisplaySubscriberTotalTurnover = false;
        vm.coreUserStateService = coreUserStateService;

        vm.salutationTypes = ['None', 'Mr', 'Mrs', 'Ms', 'Miss', 'Mdm', 'Dr'];
        vm.uploadImage = uploadImage;
        vm.saveChanges = saveChanges;
        vm.selectFile = selectFile;
        vm.loadFile = loadFile;
        vm.isSubmitProfileDisabled = isSubmitProfileDisabled;
        vm.isSubmitting = false;
        vm.changePassword = changePassword;
        vm.changeEmail = changeEmail;
        vm.verifyUserNameState = 0;

        function selectFile() {
            if (vm.myDeveloperProfile.TrackRecords.length < 2) {
                vm.doSelectFile();
            }
        }

        function uploadImage() {
            var modalInstance = tool.openModalByDefinition('s.image.UploadDialogController',
                {
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
                return sUserService.UpdateProfilePictureOnly(vm.myProfile);
            });
        }

        function saveChanges() {
            if (vm.myProfile.PhoneNumberDetails &&
                vm.myProfile.PhoneNumberDetails.PhoneCountryCode &&
                vm.myProfile.PhoneNumberDetails.PhoneNumber) {
                vm.myProfile.PhoneCountryCode = vm.myProfile.PhoneNumberDetails.PhoneCountryCode;
                vm.myProfile.PhoneNumber = vm.myProfile.PhoneNumberDetails.PhoneNumber;
            } else if (vm.myProfile.PhoneNumberDetails === "") {
                vm.myProfile.PhoneCountryCode = "";
                vm.myProfile.PhoneNumber = "";
            }
            vm.isSubmitting = true;
            var prof = vm.myProfile;
            prof.UserName = prof.NewUserName;

            return sUserService.UpdateProfile(prof)
                .then(function () {
                    coreUserStateService.loadUser();
                    coreNotificationService.notifySuccess("Success", "Profile has been updated");
                    vm.myProfile.UserName = vm.myProfile.NewUserName;
                },
                function (res) {
                    coreNotificationService.notifyError("Unable to update profile",
                        "Error! " + (res.data && res.data.Message));
                }).finally(function () {
                    vm.isSubmitting = false;
                });
        }

        function loadFile(fileUrl, fileName, fileWidth, fileHeight, toCrop) {
            //Only push if not already attached
            vm.myDeveloperProfile.TrackRecords.push({
                RecordName: fileName,
                toBeAdded: true,
                FileURL: fileUrl
            });
        }

        function isSubmitProfileDisabled() {
            return vm.isSubmitting ||
                (vm.myProfile &&
                    (vm.myProfile.Country.CountryId === null || vm.myProfile.Timezone.TimezoneId === null)) ||
                !(vm.userNameVerifyState === 2 || vm.userNameVerifyState === 0);
        }

        function changePassword() {
            tool.openModalByDefinition('p.user.ChangePasswordController');
        }

        function changeEmail() {
            var modal = tool.openModalByDefinition('p.user.ChangeEmailController',
                {
                    currentEmail: vm.myProfile.Email
                });
            modal.result.then(function (res) {
                vm.myProfile.Email = res;
            });
        }

        function init() {
            dep.sHeaderService.selectMenu("profile", "profile");
            sUserService.GetProfile().then(function (res) {
                res.data.NewUserName = res.data.UserName;
                vm.myProfile = res.data;
                if (vm.myProfile.PhoneCountryCode != null && vm.myProfile.PhoneNumber != null) {
                    vm.myProfile.PhoneNumberDetails =
                        vm.myProfile.PhoneCountryCode + vm.myProfile.PhoneNumber;
                } else {
                    vm.myProfile.PhoneNumberDetails = "";
                }
            }, function (res) {
                tool.logError("Unable to get profile", "Error! " + (res.data && res.data.Message));
            });

            sUserService.GetCountries().then(function (res) {
                vm.myCountries = res.data;
            }, function (res) {
                tool.logError("Unable to get countries", "Error! " + (res.data && res.data.Message));
            });

            sUserService.GetTimezones().then(function (res) {
                vm.myTimezones = res.data;
            }, function (res) {
                tool.logError("Unable to get timezones", "Error! " + (res.data && res.data.Message));
            });
        }

        tool.watch("vm.myProfile.NewUserName",
            function () {
                if (vm.myProfile) {
                    if (vm.myProfile.NewUserName.trim() === "") {
                        vm.userNameVerifyState = 3;
                    } else if (vm.myProfile.NewUserName === vm.myProfile.UserName) {
                        vm.userNameVerifyState = 0;
                    } else if (vm.myProfile.NewUserName.length < 6) {
                        vm.userNameVerifyState = 7;
                    } else if (vm.myProfile.NewUserName.length > 25) {
                        vm.userNameVerifyState = 8;
                    } else {
                        vm.userNameVerifyState = 1;
                        sUserAccountService.VerifyUserName(vm.myProfile.NewUserName).then(function (res) {
                            vm.userNameVerifyState = res.data ? 4 : 2;
                        },
                            function () {
                                vm.userNameVerifyState = -1;
                            });
                    }
                }
            }, false);

        if (coreUserStateService.isLoggedIn() && !coreUserStateService.hasPendingLogoutConfirmation) {
            init();
        }
    });