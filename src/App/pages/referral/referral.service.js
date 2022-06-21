agmNgModuleWrapper('agmp.referral')
    .defineService("pReferralService", [],
    function (serviceObj, dep, tool) {
        var coreServerCommunicationService = dep.coreServerCommunicationService;
        var marketingPath = '/mkapi/v1/';

        serviceObj.GetPendingInvitationsForUser = coreServerCommunicationService.genGetFunctionWithNVar(marketingPath + 'Referral/GetPendingInvitationsForUser');
        serviceObj.GetCreditTransactionsForUser = coreServerCommunicationService.genGetFunctionWithNVar(marketingPath + 'Referral/GetCreditTransactionsForUser');
        serviceObj.GetReferralCodeForUser = coreServerCommunicationService.genGetFunctionWithNVar(marketingPath + 'Referral/GetReferralCodeForUser');
        serviceObj.SendInvitationEmail = coreServerCommunicationService.genPostFunction(marketingPath + "Referral/SendInvitationEmail");

        serviceObj.GetUserByReferralCode = coreServerCommunicationService.genGetFunctionWithNVar(marketingPath + 'Marketing/GetUserByReferralCode',
            function (args) {
                return { code: args[0] };
            });
    });