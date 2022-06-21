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
        var path = "/marketinfoapi/v1/Fundamental/";

        tool.setServiceObjectProperties({
            reevaluateSubList: reevaluateSubList,
            GetFundamentalsForPeriod: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetFundamentalsForPeriod', function (args) {
                return { filter: { ProductId: args[0], FundamentalType: args[1], StartDate: args[2], EndDate: args[3] } };
            }),
            IsFundamentalValid: coreServerCommunicationService.genGetFunctionWithNVar(path + 'IsFundamentalValid', function (args) {
                return { request: { ProductId: args[0], FundamentalType: args[1] } };
            })
        });
    });