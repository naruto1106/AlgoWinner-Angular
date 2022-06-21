agmNgModuleWrapper('agms.datamart')
    .defineService('sDatamartApiService', [],
    function (serviceObj, dep, tool) {
        var path = '/marketalertapi/AlgoFeed/';
        var coreServerCommunicationService = dep.coreServerCommunicationService;

        tool.setServiceObjectProperties({
            getAlgoFeedPosts: coreServerCommunicationService.genGetFunctionWithNVar(path + "GetAlgoFeedPosts", function (args) {
                return {
                    filter: {
                        AlgoFeedEventTypeIds: args[0],
                        ProductIds: args[1],
                        RequestId: 123
                    }
                };
            }),
            getAllPublishedAlgoFeedsWithFollowers: coreServerCommunicationService.genGetFunctionWithNVar(path + "GetAllPublishedAlgoFeedsWithFollowers"),
            getDataMartScreenerContent: coreServerCommunicationService.genGetFunctionWithNVar(path + "GetDataMartScreenerContent", function (args) {
                return {
                    filter: args[0]
                };
            }),
            getProductScreenerContent: coreServerCommunicationService.genGetFunctionWithNVar(path + "GetProductScreenerContent", function (args) {
                return {
                    filter: args[0]
                };
            })
        });
    });