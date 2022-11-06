agmNgModuleWrapper('agms.user')
    .defineService('sUserAccountService', [],
    function (serviceObj, dep, tool) {
        var coreServerCommunicationService = dep.coreServerCommunicationService;
        var userInfoPath = '/userinfoapi/v1/UserInfo/';
        var userInfoAccountPath = '/userinfoapi/v1/Account/';

        tool.setServiceObjectProperties({
            SetShowHelpOnInit: coreServerCommunicationService.genPostFunction(userInfoPath + "SetShowHelpOnInit"),
            PasswordExpiredRenewal: coreServerCommunicationService.genPostFunction("/mkapi/v1/Web/PasswordExpiredRenewal"),
            ForgotPassword: coreServerCommunicationService.genPostFunction("/mkapi/v1/Web/ForgotPassword"),
            ResetPassword: coreServerCommunicationService.genPostFunction(userInfoAccountPath + "ResetPassword"),
            SendConfirmEmailExpiredToken: coreServerCommunicationService.genPostFunction("/mkapi/v1/Web/SendConfirmEmailExpiredToken"),
            ResetUserNameAndPassword: coreServerCommunicationService.genPostFunction("/mkapi/v1/Web/ResetUserNameAndPassword"),
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
