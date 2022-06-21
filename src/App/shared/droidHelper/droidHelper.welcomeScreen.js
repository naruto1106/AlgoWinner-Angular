agmNgModuleWrapper('agms.droidHelper')
    .defineControllerAsPopup("s.droidHelper.WelcomeScreenController", {
        
    },['sDroidHelperService'],
        function (vm, dep, tool) {
            var coreUserStateService = dep.coreUserStateService;
            tool.setVmProperties({
                user: null
            });

            tool.initialize(function() {
                coreUserStateService.userInfoLoaded.then(function() {
                    vm.user = coreUserStateService.user;
                });
            });
        })
