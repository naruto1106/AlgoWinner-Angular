agmNgModuleWrapper('agms.trading')
    .defineService('sTradingHolidayService', [],
    function (serviceObj, dep, tool) {
        var coreServerCommunicationService = dep.coreServerCommunicationService;
        var path = "/marketinfoapi/v1/HolidayInformation/";

        tool.setServiceObjectProperties({
            GetLatestMarketStartTime: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetLatestMarketStartTime', function (args) {
                return { tradeVenue: args[0] };
            }),
            GetLatestMarketEndTime: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetLatestMarketEndTime', function (args) {
                return { tradeVenue: args[0] };
            })
        });
    });