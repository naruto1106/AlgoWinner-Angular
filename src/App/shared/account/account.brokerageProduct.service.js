agmNgModuleWrapper('agms.account')
    .defineService('sAccountBrokerageProductService', [], function (serviceObj, dep, tool) {
        var coreServerCommunicationService = dep.coreServerCommunicationService;
        var path = '/mantpmsapi/BrokerProduct/';

        tool.setServiceObjectProperties({
            IsProductShortable: coreServerCommunicationService.genGetFunctionWithNVar(path + 'IsProductShortable', function (args) {
                return { request: args[0] };
            })
        });
    });