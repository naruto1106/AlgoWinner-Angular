agmNgModuleWrapper('agms.community')
    .defineService('sCommunityService',
    [],
    function (serviceObj, dep, tool) {
        var path = '/communityapi/v1/Group/';

        var coreServerCommunicationService = dep.coreServerCommunicationService;

        //Group
        tool.setServiceObjectProperties({
            IsInTradingImpossibleGroup: coreServerCommunicationService.genGetFunctionWithNVar(path + 'IsInTradingImpossibleGroup')
        });
    });
