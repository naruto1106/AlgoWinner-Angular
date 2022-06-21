agmNgModuleWrapper('agms.misc')
    .defineService('sMiscContactUsService', [], function(serviceObj, dep,tool) {
        var coreServerCommunicationService = dep.coreServerCommunicationService;
        var path = '/mkapi/v1/ContactUs/';

        serviceObj.postContactUs = coreServerCommunicationService.genPostFunction(path + "PostContactUs");
        serviceObj.postJoeyContactUs = coreServerCommunicationService.genPostFunction(path + "PostJoeyContactUs");
    });