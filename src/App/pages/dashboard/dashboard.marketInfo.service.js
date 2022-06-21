agmNgModuleWrapper('agmp.dashboard')
    .defineService('pDashboardMarketInfoService',
    [],
    function (serviceObj, dep, tool) {
        var path = "/marketinfoapi/v1/SectorSummary/";
        var coreServerCommunicationService = dep.coreServerCommunicationService;

        tool.setServiceObjectProperties({
            getStockPerformancesByMarket: coreServerCommunicationService.genGetFunctionWithNVar('/historicalapi/v1/adj/StockSummary/GetStockPerformance',
                function (args) {
                    return {
                        tradeVenueLoc: args[0]
                    };
                }),
            getSectorPerformancesByMarket: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetSectorPerformances',
                function (args) {
                    return {
                        tradeVenueLoc: args[0]
                    };
                }),
            getTopPerformingCompanyForSector: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetTopPerformingCompany',
                function (args) {
                    return {
                        tradeVenueLoc: args[0],
                        sectorId: args[1],
                        sectorPerformancePeriodType: args[2]
                    };
                })
        });
    });