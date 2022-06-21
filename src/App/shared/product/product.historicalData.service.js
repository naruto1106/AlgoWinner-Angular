agmNgModuleWrapper('agms.product')
    .ngApp
    .service('sProductHistoricalDataService', ['coreServerCommunicationService', function (coreServerCommunicationService) {
        var path = "/marketinfoapi/v1/HolidayInformation/";
        var historicalAdjustedPath = "/historicalapi/v1/adj/HistoricalData/";
        var historicalUnadjustedPath = "/historicalapi/v1/unadj/HistoricalData/";

        this.GetAdjustedWeeklyHistoricalData = coreServerCommunicationService.genGetFunctionWithNVar(historicalAdjustedPath + 'GetWeeklyHistoricalData', function (args) {
            return { request: args[0] };
        });
        this.GetUnadjustedWeeklyHistoricalData = coreServerCommunicationService.genGetFunctionWithNVar(historicalUnadjustedPath + 'GetWeeklyHistoricalData', function (args) {
            return { request: args[0] };
        });
        this.GetAdjustedHistoricalData = coreServerCommunicationService.genGetFunctionWithNVar(historicalAdjustedPath + 'GetHistoricalData', function (args) {
            return { request: args[0] };
        });
        this.GetUnadjustedHistoricalData = coreServerCommunicationService.genGetFunctionWithNVar(historicalUnadjustedPath + 'GetHistoricalData', function (args) {
            return { request: args[0] };
        });
        this.GetHistoricalDataFromDuration = coreServerCommunicationService.genGetFunctionWithNVar(historicalAdjustedPath + 'GetHistoricalDataFromDuration', function (args) {
            return { request: args[0] };
        });
        this.IsMarketOpen = coreServerCommunicationService.genGetFunctionWithNVar(path + 'IsMarketOpen', function (args) {
            return args[0];
        });
    }]);
