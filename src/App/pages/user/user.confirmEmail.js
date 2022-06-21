agmNgModuleWrapper('agmp.user')
    .defineControllerAsPopup('p.user.ConfirmEmailController',
    {
        templateUrl: "/App/pages/user/user.confirmEmail.html",
        windowClass: 'mini-modal'
    },
    [
        'profile'
    ],
    function (vm, dep, tool) {
        vm.profile = dep.profile;
        vm.coreConfigService = dep.coreConfigService;
    });