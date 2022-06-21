agmNgModuleWrapper('agmp.amAutoPanel').defineController('p.amAutoPanel.PanelController',
    ["sHeaderService", "commonLocationHistoryService", "sCommunityService"],
    function (vm, dep, tool) {
        var commonLocationHistoryService = dep.commonLocationHistoryService,
            sCommunityService = dep.sCommunityService;

        tool.initialize(function () {
            tool.setVmProperties({
                goToAmAuto: dep.sHeaderService.goToAmAuto,
                goToNewTab: commonLocationHistoryService.goToNewTab,

                showAuto: false
            });

            sCommunityService.IsInTradingImpossibleGroup().then(function (res) {
                // [J&J] Hide AutoInvest banner for Joey's group members
                var isInPtiGroup = res.data;
                vm.showAuto = !isInPtiGroup;
            });
        });
    })
    .defineDirectiveForE('agmp-am-auto-panel', [],
        function () {
            return {
                controller: "p.amAutoPanel.PanelController",
                templateUrl: '/App/pages/amAutoPanel/amAutoPanel.link.html'
            };
        },
        {
            width: '@'
        });