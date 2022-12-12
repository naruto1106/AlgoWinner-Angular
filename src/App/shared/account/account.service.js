agmNgModuleWrapper('agms.account')
    .defineService('sAccountService', [],
    function (serviceObj, dep, tool) {

        var coreServerCommunicationService = dep.coreServerCommunicationService;

        var path = '/mantpmsapi/BrokerageAccount/';

        tool.setServiceObjectProperties({
            HasBroker: coreServerCommunicationService.genGetFunctionWithNVar(path + 'HasBroker'),
            CreateBroker: coreServerCommunicationService.genPostFunction(path + 'CreateBroker'),
            GetBrokerageAccountsForStrategyLinking: coreServerCommunicationService.genPostFunction(path + 'GetBrokerageAccountsForStrategyLinkingStep'),
            GetBrokerageAccountsSelectionUsedForTrading: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetBrokerageAccountsSelectionUsedForTrading'),
            GetBrokerageAccountsDetail: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetBrokerageAccountsDetail'),
            IsPublicKeyExists: coreServerCommunicationService.genGetFunctionWithNVar('/tigerapi/v1/IsPublicKeyExists'),
            GenerateTigerPublicKey: coreServerCommunicationService.genPostFunction('/tigerapi/v1/GeneratePublicKey'),
            UploadTigerBrokerCredentials: coreServerCommunicationService.genPostFunction('/tigerapi/v1/UploadBrokerCredentials'),
            InitTigerClient: coreServerCommunicationService.genPostFunction('/tigerapi/v1/InitClient'),
            DeleteAccount: coreServerCommunicationService.genPostFunction('/tigerapi/v1/DeleteAccount'),
            UploadMoomooBrokerCredentials: coreServerCommunicationService.genPostFunction('/futuapi/v1/Account/UploadBrokerCredentials'),
            SendMoomooConfirmationToken: coreServerCommunicationService.genPostFunction('/futuapi/v1/Account/SendConfirmationToken'),
            SendTelnetCommandOnly: coreServerCommunicationService.genPostFunction('/futuapi/v1/Account/SendTelnetCommandOnly'),
            GetConnectionStatus: coreServerCommunicationService.genGetFunctionWithNVar('/futuapi/v1/Account/GetConnectionStatus')
        });
    });