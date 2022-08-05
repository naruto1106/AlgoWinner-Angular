agmNgModuleWrapper('agms.user')
    .defineService('sUserAccountService', [],
    function (serviceObj, dep, tool) {
        var coreServerCommunicationService = dep.coreServerCommunicationService;
        var userInfoPath = '/userinfoapi/v1/UserInfo/';
        var userInfoAccountPath = '/userinfoapi/v1/Account/';

        tool.setServiceObjectProperties({
            SetShowHelpOnInit: coreServerCommunicationService.genPostFunction(userInfoPath + "SetShowHelpOnInit"),
            PasswordExpiredRenewal: coreServerCommunicationService.genPostFunction(userInfoAccountPath + "PasswordExpiredRenewal"),
            ForgotPassword: coreServerCommunicationService.genPostFunction(userInfoAccountPath + "ForgotPassword"),
            ResetPassword: coreServerCommunicationService.genPostFunction(userInfoAccountPath + "ResetPassword"),
            SendConfirmEmailExpiredToken: coreServerCommunicationService.genPostFunction(userInfoAccountPath + "SendConfirmEmailExpiredToken"),
            ResetUserNameAndPassword: coreServerCommunicationService.genPostFunction(userInfoAccountPath + "ResetUserNameAndPassword"),
            VerifyEmail: coreServerCommunicationService.genGetFunctionWithNVar(userInfoAccountPath + 'VerifyEmail', function (args) {
                return {
                    email: args[0]
                };
            }),
            VerifyUserName: coreServerCommunicationService.genGetFunctionWithNVar(userInfoPath + 'VerifyUserName', function (args) {
                return {
                    userName: args[0]
                };
            }),
            ChangePassword: coreServerCommunicationService.genPostFunction(userInfoPath + "ChangePassword"),
            ChangeEmail: coreServerCommunicationService.genPostFunction(userInfoPath + "ChangeEmail"),
        });
    });
