agmNgModuleWrapper('agmp.academy')
    .defineService("pAcademyService", [],
        function (serviceObj, dep, tool) {
            var coreServerCommunicationService = dep.coreServerCommunicationService;

            tool.setServiceObjectProperties({
                GetLearnWorldsSSO: coreServerCommunicationService.genPostFunction('/acadapi/v1/Academy/GetLearnWorldsSSO')
            });
        });