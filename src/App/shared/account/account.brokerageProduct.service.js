agmNgModuleWrapper('agms.account')
    .defineService('sAccountBrokerageProductService', [], function (serviceObj, dep, tool) {
        var coreServerCommunicationService = dep.coreServerCommunicationService;
        var path = '/mantpmsapi/BrokerProduct/';

        tool.setServiceObjectProperties({
            IsProductShortable: coreServerCommunicationService.genPostFunction(path + 'IsTheProductShortable')
        });
    });