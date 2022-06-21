agmNgModuleWrapper('agms.user')
    .defineController("s.user.DetailController",[],
    function (vm, dep, tool) {
        vm.coreUserStateService = dep.coreUserStateService;
        vm.getEncodedSectorUrl = getEncodedSectorUrl;
        vm.hasPersonalInfo = false;
        function getEncodedSectorUrl(sectorName) {
            return "//am708403.azureedge.net/images/sector/" +
                dep.$window.encodeURIComponent(sectorName) + ".png?";
        }

        tool.onRendered(function() {
            if (vm.myProfile) {
                vm.hasPersonalInfo = vm.myProfile.Education && vm.myProfile.Profession && vm.myProfile.TotalTurnover && vm.myProfile.SubscribersTotalTurnover;
            }
        });

    })
    .defineDirectiveForE('agms-user-detail', [], function () {
        return {
            controller: "s.user.DetailController",
            templateUrl: '/App/shared/user/user.detail.html'
        };
    },
    {
        previewProfile: '=',
        previewDeveloperProfile: '=',
        myProfile: '=',
        disableStrategyClicking: '=',
        showGroupStrategies: "="
    })