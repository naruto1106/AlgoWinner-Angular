var academyDependencies = [
    "agm.core",
    'agms.auth',
    "ui.bootstrap",
    "agmp.academy"
];

agmNgModuleWrapper('agmp.academy.index', academyDependencies)
    .defineController('AcademyIndexController',
        ["pAcademyService"],
        function (vm, dep, tool) {
            var pAcademyService = dep.pAcademyService,
                coreUserStateService = dep.coreUserStateService;

            tool.initialize(function () {
                tool.setVmProperties({
                    ssoUrl: null
                });

                vm.isLoading = true;

                coreUserStateService.loadUser();
                coreUserStateService.userInfoLoaded.then(function (res) {
                    pAcademyService.GetLearnWorldsSSO({
                        Email: coreUserStateService.user.Email,
                        UserName: coreUserStateService.user.UserName
                    }).then(function (res) {
                        if (res && res.data) {
                            window.open(res.data, "_self");
                        }

                        vm.isLoading = false;
                    });
                });
            });
        });