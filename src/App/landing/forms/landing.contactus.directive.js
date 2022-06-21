agmNgModuleWrapper("agm.landing")
    .defineController("agm.landing.NewContactUsDirectiveController",
    ['sMiscContactUsService', 'coreNotificationService'],
        function (vm, dep, tool) {

            var sMiscContactUsService = dep.sMiscContactUsService,
                coreNotificationService = dep.coreNotificationService;

            vm.submit = function () {
                vm.contactingInProgress = true;
                
                sMiscContactUsService.postContactUs(vm.contact).then(function (result) {
                    coreNotificationService.notifySuccess("Contact Us Successful",
                        "Thank you for contacting Algomerchant. An email confirmation has been sent to your mailbox");
                    if (vm.uibClosePanel) {
                        vm.uibClosePanel();
                    }
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

            tool.initialize(function () {
                tool.setVmProperties({
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
                        Message: '',
                        Objective: "0"
                    }
                });
            });
        })
    .defineDirectiveForE("agm-landing-contact-us", [],
        function () {
            return {
                controller: "agm.landing.NewContactUsDirectiveController",
                templateUrl: "/App/landing/forms/landing.contactus.directive.html"
            };
        },
        {

        });