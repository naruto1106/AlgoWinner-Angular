agmNgModuleWrapper('agms.account')
    .defineService('sAccountService', [],
    function (serviceObj, dep, tool) {

        var coreServerCommunicationService = dep.coreServerCommunicationService;

        var path = '/mantpmsapi/BrokerageAccount/';

        tool.setServiceObjectProperties({
            HasBroker: coreServerCommunicationService.genGetFunctionWithNVar(path + 'HasBroker'),
            CreateBroker: coreServerCommunicationService.genPostFunction(path + 'CreateBroker'),
            GetBrokerageAccountsForStrategyLinking: coreServerCommunicationService.genGetFunctionWithNVar(path +
                'GetBrokerageAccountsForStrategyLinking', function (args) {
                    return { marketInfo: args[0] };
                }),
            GetBrokerageAccountsSelectionUsedForTrading: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetBrokerageAccountsSelectionUsedForTrading'),
            GetBrokerageAccountsDetail: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetBrokerageAccountsDetail'),
        });
    });