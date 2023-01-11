agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('sChartService', [
        'coreServerCommunicationService', function (coreServerCommunicationService) {
            var path = '/chartapi/v1/Charts/';

            this.getChannelsToPost = coreServerCommunicationService.genGetFunctionWithNVar(path + "GetChannelsToPost");
            this.getLayout = coreServerCommunicationService.genGetFunctionWithNVar(path + "getLayout");
            this.setLayout = coreServerCommunicationService.genPostFunction(path + "setLayout");
            this.setDefaultTheme = coreServerCommunicationService.genPostFunction(path + "SetDefaultTheme");
            this.GetProductsInMarket = coreServerCommunicationService.genGetFunctionWithNVar(path + "GetProductsInMarket", function (args) {
                return {
                    asset: args[0],
                    venue: args[1]
                };
            });
            this.GetProductsInStrategy = coreServerCommunicationService.genGetFunctionWithNVar(path + "GetProductsInStrategy", function (args) {
                return {
                    strategyId: args[0]
                };
            });
            this.GetSpecificAlgoCoordinates = coreServerCommunicationService.genPostFunction(path + "GetSpecificAlgoCoordinates");
            this.GetAlgoCoordinates = coreServerCommunicationService.genGetFunctionWithNVar(path + "GetAlgoCoordinates", function (args) {
                return {
                    productId: args[0]
                };
            });
            this.GetAlgoTrendEntries = coreServerCommunicationService.genGetFunctionWithNVar(path + "GetAlgoTrendEntries", function (args) {
                return {
                    productId: args[0]
                };
            });
        }
    ]);

