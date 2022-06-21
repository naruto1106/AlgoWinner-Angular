agmNgModuleWrapper('agms.header')
    .defineDirectiveForE('agms-header-confirm-email', [],
    function (dep) {
        return {
            restrict: 'E',
            controller: "s.header.ConfirmEmailController",
            templateUrl: '/App/shared/header/header.confirmEmail.html'
        };
    },
    {
    })
    .defineController('s.header.ConfirmEmailController',
    ["coreUserStateService", "sHeaderService"],
    function (vm, dep, tool) {
        var sHeaderService = dep.sHeaderService,
            coreUserStateService = dep.coreUserStateService;

        function getTimeLeft(x) {
            coreUserStateService.userInfoLoaded.then(function (res) {
                var user = res;
                var endTime = moment(user.DateJoined).add(2, 'days');
                var startTime = moment();
                var duration = moment.duration(endTime.diff(startTime));
                var hours = duration.asHours();

                if (hours >= 0) {
                    vm.timeLeft.Hour = Math.floor(hours);
                    vm.timeLeft.Minute = Math.floor((hours - vm.timeLeft.Hour) * 60);
                } else {
                    clearInterval(x);

                    if (!user.EmailConfirmed) {
                        tool.openModalByDefinition('s.header.ConfirmEmailPopUpController', {
                            profile: res
                        });
                    }
                }
            });
        }

        tool.initialize(function () {
            tool.setVmProperties({
                timeLeft: {
                    Hour: 0,
                    Minute: 0
                },

                resendEmail: sHeaderService.resendVerificationEmail
            });

            getTimeLeft();
            var x = setInterval(function () {
                getTimeLeft(x);
            }, 60000);
        });
    })
    .defineControllerAsPopup('s.header.ConfirmEmailPopUpController',
    {
        templateUrl: '/App/shared/header/header.confirmEmailPopUp.html',
        windowClass: 'mini-modal',
        keyboard: false
    },
    ["profile", "sHeaderService", "coreAuthInterceptor"],
    function (vm, dep, tool) {
        var sHeaderService = dep.sHeaderService,
            coreAuthInterceptor = dep.coreAuthInterceptor;

        vm.profile = dep.profile;
        vm.resendEmail = sHeaderService.resendVerificationEmail;
        vm.logout = coreAuthInterceptor.logout;
    });