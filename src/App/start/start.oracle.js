var oracleDependencies = [
    "agm.core",
    'agms.auth',
    "agm.oracleTemplates",
    "agmp.mobileWeb",
    "ui.bootstrap"
];

agmNgModuleWrapper('agmp.start.oracle', oracleDependencies)
    .defineController('OracleRootController', ["pMobileWebService", 'sAuthService'],
    function (vm, dep, tool) {
        var coreUserStateService = dep.coreUserStateService,
            sAuthService = dep.sAuthService;

        tool.initialize(function () {
            tool.setVmProperties({
                showOracle: false,
                isLoading: true
            });

            var path = dep.$location.absUrl();
            var token = path.split("?token=")[1] || "";

            if (token) {
                sAuthService.AuthenticateWithToken(token).then(function (e) {
                    if (e.status === 200) {
                        dep.coreDataStorageService.set("token", token);

                        coreUserStateService.loadUser();
                        coreUserStateService.myPremiumItemSubscriptionsLoaded.then(function () {
                            if (coreUserStateService.hasAlgoOracle()) {
                                vm.showOracle = true;
                                dep.pMobileWebService.isOpenFromApp = true;
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