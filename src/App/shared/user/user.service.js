agmNgModuleWrapper('agms.user')
    .defineService('sUserService',
    ['coreServerCommunicationService'],
    function (serviceObj, dep, tool) {
        var userInfoPath = '/userinfoapi/v1/UserProfile/';
        var coreServerCommunicationService = dep.coreServerCommunicationService;

        tool.setServiceObjectProperties({
            GetProfile: coreServerCommunicationService.genGetFunctionWithNVar(userInfoPath + 'GetProfile'),
            GetDefaultTradeSettings: coreServerCommunicationService.genGetFunctionWithNVar(userInfoPath + 'GetDefaultTradeSettings'),
            UpdateProfile: coreServerCommunicationService.genPostFunction('/mkapi/v1/Profile/UpdateProfile'),
            UpdateProfilePictureOnly: coreServerCommunicationService.genPostFunction(userInfoPath + "UpdateProfilePictureOnly"),
            ModifyDefaultTradeSettings: coreServerCommunicationService.genPostFunction(userInfoPath + "ModifyDefaultTradeSettings"),
            GetCountries: coreServerCommunicationService.genGetFunctionWithNVar(userInfoPath + 'GetCountries'),
            GetTimezones: coreServerCommunicationService.genGetFunctionWithNVar(userInfoPath + 'GetTimezones')
        });
    });
