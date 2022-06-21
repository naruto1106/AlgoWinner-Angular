var autoinvestDependencies = [
    "agm.core",
    'agms.auth',
    "agm.templates",
    "agms.gateway",
    "agmp.mobileWeb",
    "ui.bootstrap",
    "firebase"
];

agmNgModuleWrapper('agmp.start.autoinvest', autoinvestDependencies)
    .defineController('AutoInvestRootController', ['sAuthService'],
    function (vm, dep, tool) {
        var coreUserStateService = dep.coreUserStateService,
            sAuthService = dep.sAuthService;

        tool.initialize(function () {
            tool.setVmProperties({
                showAutoInvest: false,
                isLoading: true
            });

            var path = dep.$location.absUrl();
            var token = path.split("?token=")[1] || "";

            if (token) {
                sAuthService.AuthenticateWithToken(token)
                    .then(function (e) {
                    if (e.status === 200) {
                        dep.coreDataStorageService.set("token", token);

                        coreUserStateService.loadUser();
                        coreUserStateService.myPremiumItemSubscriptionsLoaded.then(function () {
                            if (coreUserStateService.hasAutoInvest()) {
                                vm.showAutoInvest = true;
                            }
                        }).finally(function () {
                            vm.isLoading = false;
                        });
                    } else {
                        vm.isLoading = false;
                    }
                }, function () {
                    vm.isLoading = false;
                });
            } else {
                vm.isLoading = false;
            }
        });
    });