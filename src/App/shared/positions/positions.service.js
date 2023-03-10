agmNgModuleWrapper('agms.positions')
    .ngApp
    .service('portfolioService', ['coreServerCommunicationService', function (coreServerCommunicationService) {
        var developerPath = '/mantpmsapi/DeveloperPortfolio/';
        var futuPath = '/futuapi/v1/'
        this.GetActivePortfolio = coreServerCommunicationService.genPostFunction(developerPath + 'GetActivePortfolios');
        this.GetHistoricalPortfolio = coreServerCommunicationService.genGetFunctionWithNVar(developerPath + "GetHistoricalPortfolio", function (args) {
            return {
                strategyId: args[0],
                pageNumber: args[1],
                pageSize: args[2],
                productId: args[3]
            };
        })
        this.GetHistoricalPortfoliosSize = coreServerCommunicationService.genGetFunctionWithNVar(developerPath + "GetHistoricalPortfoliosSize", function (args) {
            return {
                strategyId: args[0],
                productId: args[1]
            };
        })
        this.FutuGetRealizedPositon = coreServerCommunicationService.genGetFunctionWithNVar(futuPath + 'order/GetHistoryPositions');
    }]);
