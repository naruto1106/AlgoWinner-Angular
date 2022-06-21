agmNgModuleWrapper('agms.misc')
    .defineControllerAsPopup('s.misc.ContactUsController', {
        templateUrl: '/App/shared/misc/misc.contactUs.html',
        windowClass: 'default-modal'
    },
    ['sMiscContactUsService', 'coreNotificationService'],
    function (vm, dep, tool) {

        var sMiscContactUsService = dep.sMiscContactUsService,
            coreNotificationService = dep.coreNotificationService,
            coreConfigService = dep.coreConfigService;

        vm.submit = function (contactUsForm) {
            vm.contactingInProgress = true;

            if (vm.phoneNumberDetails && vm.phoneNumberDetails.PhoneCountryCode && vm.phoneNumberDetails.PhoneNumber) {
                vm.contact.PhoneNumberDetails.PhoneCountryCode = vm.phoneNumberDetails.PhoneCountryCode;
                vm.contact.PhoneNumberDetails.PhoneNumber = vm.phoneNumberDetails.PhoneNumber;
            } else if (vm.phoneNumberDetails === "") {
                vm.contact.PhoneNumberDetails.PhoneCountryCode = "";
                vm.contact.PhoneNumberDetails.PhoneNumber = "";
            }

            var promise = sMiscContactUsService.postContactUs(vm.contact);
            var message = "Thank you for contacting Algomerchant. An email confirmation has been sent to your mailbox";

            promise.then(function (result) {
                coreNotificationService.notifySuccess("Contact Us Successful", message);
                vm.uibClosePanel();
                vm.contactingInProgress = false;
            }, function (result) {
                if (result.data) {
                    coreNotificationService.notifyError("Error While Sending Message", "Your message has not been sent. Reason: " + result.data);
                } else {
                    coreNotificationService.notifyError("Error While Sending Message", "An error has occcurred. Please check your connection or try again later.");
                }
                vm.contactingInProgress = false;
            });
        };

        vm.isPhoneNumberEmpty = function () {
            if (!vm.phoneNumberDetails) {
                return true;
            }
            return vm.phoneNumberDetails.PhoneCountryCode === "" || vm.phoneNumberDetails.PhoneNumber === "";
        }

        vm.objectiveChanged = function () {
            var objective = vm.contact.Objective;
            if (objective === "0") {
                vm.contact.Message = "Hi, I am a retail investor and I would like to enquire about";
            } else if (objective === "1") {
                vm.contact.Message = "Hi, I am a portfolio manager and I would like to enquire about";
            } else if (objective === "2") {
                vm.contact.Message = "Hi, I am an investing coach and I would like to enquire about";
            }
        };

        tool.initialize(function () {
            tool.setVmProperties({
                coreConfigService: coreConfigService,
                user: null,
                contactingInProgress: false,
                phoneNumberDetails: {
                    PhoneCountryCode: '',
                    PhoneNumber: ''
                },
                contact: {
                    FirstName: '',
                    LastName: '',
                    Email: '',
                    PhoneNumberDetails: {
                        PhoneCountryCode: '',
                        PhoneNumber: ''
                    },
                    Message: "Hi, I am a retail investor and I would like to enquire about",
                    Objective: "0"
                }
            });

            dep.coreUserStateService.userInfoLoaded.then(function (res) {
                vm.user = dep.coreUserStateService.user;

                if (vm.user) {
                    if (vm.user.RealName) {
                        vm.contact.FirstName = vm.user.RealName.split(" ")[0];
                        vm.contact.LastName = vm.user.RealName.split(" ")[1];
                    }

                    vm.contact.Email = vm.user.Email;
                    vm.contact.Message = "";

                    if (vm.user.PhoneCountryCode != null && vm.user.PhoneNumber != null) {
                        vm.phoneNumberDetails = "+" + vm.user.PhoneCountryCode + vm.user.PhoneNumber;
                        vm.contact.PhoneNumberDetails.PhoneCountryCode = vm.user.PhoneCountryCode;
                        vm.contact.PhoneNumberDetails.PhoneNumber = vm.user.PhoneNumber;
                    }
                }
            });
        });
    });