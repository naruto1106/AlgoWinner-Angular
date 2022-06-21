agmNgModuleWrapper('agms.gateway')
    .defineService('sGatewayService', [], function (serviceObj, dep, tool) {
        var coreServerCommunicationService = dep.coreServerCommunicationService;
        var userInfoPath = '/userinfoapi/v1/Account/';

        serviceObj.registerNewUserWithPassword = coreServerCommunicationService.genPostFunction(userInfoPath + "RegisterNewUser");
        serviceObj.registerNewUserWithoutSendingEmail = coreServerCommunicationService.genPostFunction(userInfoPath + "RegisterNewUserWithoutSendingEmail");
        serviceObj.resendActivationLink = coreServerCommunicationService.genPostFunction(userInfoPath + "ResendActivationLink");
    });