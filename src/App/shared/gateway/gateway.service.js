agmNgModuleWrapper('agms.gateway')
    .defineService('sGatewayService', [], function (serviceObj, dep, tool) {
        var coreServerCommunicationService = dep.coreServerCommunicationService;
        var marketingPath = '/mkapi/v1/Web/';

        serviceObj.registerNewUserWithPassword = coreServerCommunicationService.genPostFunction(marketingPath + "RegisterNewUser");
        serviceObj.resendActivationLink = coreServerCommunicationService.genPostFunction(marketingPath + "ResendActivationLink");
    });