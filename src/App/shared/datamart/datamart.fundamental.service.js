agmNgModuleWrapper('agms.datamart')
    .defineService('sDatamartFundamentalDataService', [],
    function (serviceObj, dep, tool) {

        function reevaluateSubList(item) {
            if (item.subCombinations) {
                item.subCombinations.forEach(function (subItem) {
                    reevaluateSubList(subItem);
                });
                var hasChecked = false;
                item.subCombinations.forEach(function (subItem) {
                    hasChecked = hasChecked || subItem.checked;
                });
                item.isSetToExpand = hasChecked;
                item.checked = hasChecked;
            }
        }

        var coreServerCommunicationService = dep.coreServerCommunicationService;
        var path = "/fundamentalapi/v1/Fundamental/";

        tool.setServiceObjectProperties({
            reevaluateSubList: reevaluateSubList,
            GetFundamentalsForPeriod: coreServerCommunicationService.genPostFunction(path + 'GetFundamentalsForPeriod'),
            IsFundamentalValid: coreServerCommunicationService.genPostFunction(path + 'IsFundamentalValid')
        });
    });