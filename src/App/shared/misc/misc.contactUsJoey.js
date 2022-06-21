agmNgModuleWrapper('agms.misc')
    .defineControllerAsPopup('s.misc.ContactUsJoeyController', {
        templateUrl: '/App/shared/misc/misc.contactUsJoey.html',
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

            var promise = sMiscContactUsService.postJoeyContactUs(vm.contact);
            var message = "Thank you for contacting us. Our support team will get back to you as soon as possible within 1 - 2 working days. Thank you.";

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
                    Message: "Hi, I am a retail investor and I would like to enquire about"
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