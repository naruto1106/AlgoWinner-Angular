agmNgModuleWrapper("agms.news")
    .defineService("sNewsService", [],
    function (serviceObj, dep, tool) {
        var coreServerCommunicationService = dep.coreServerCommunicationService;
        var path = '/marketinfoapi/v1/AlgoNews/';

        tool.setServiceObjectProperties({
            AddAlgoNews: coreServerCommunicationService.genPostFunction(path + 'AddAlgoNews'),
            GetAlgoNewsByFilter: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetAlgoNewsByFilterV2',
                function (args) {
                    return {
                        filter: args[0]
                    }
                }),
            GetBreakingNews: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetBreakingNews',
                function (args) {
                    return {
                        market: args[0]
                    };
                }),
            GetRelatedNews: coreServerCommunicationService.genPostFunction(path + 'GetRelatedNews'),
            GetNewsForProductPage: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetNewsForProductPage',
                function (args) {
                    return {
                        productId: args[0],
                        market: args[1]
                    };
                })
        });
    });