agmNgModuleWrapper('agms.trading')
    .defineService('tradeDataService', [],
    function (serviceObject, dep, tool) {
        var coreServerCommunicationService = dep.coreServerCommunicationService;
        var path = '/marketdataapi/v1/MarketData/';

        tool.setServiceObjectProperties({
            // MaRa: new POST API with less clunky object transfer
            GetBid: coreServerCommunicationService.genPostFunction(path + 'GetBid'),
            GetAsk: coreServerCommunicationService.genPostFunction(path + 'GetAsk'),
            GetLast: coreServerCommunicationService.genPostFunction(path + 'GetLast'),
            GetMultipleData: coreServerCommunicationService.genPostFunction(path + 'GetMultipleData'),
            GetMultipleDataCfd: coreServerCommunicationService.genPostFunction(path + 'GetMultipleDataCfd')
        });
    });