agmNgModuleWrapper('agms.payment')
    .defineService('sPaymentStripeService', [],
    function (serviceObj, dep, tool) {
        serviceObj.stripe = Stripe(dep.coreConfigService.Stripe.PublishableKey);

        var coreServerCommunicationService = dep.coreServerCommunicationService;

        var path = '/payapi/v1/Payment/';

        // POST FUNCTION
        function postFunction(url) {
            return coreServerCommunicationService.genPostFunction(path + url);
        }

        tool.setServiceObjectProperties({
            GetStripeAccountBalance: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetStripeAccountBalance'),
            AddCard: postFunction("AddCard"),
            GetAllCards: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetAllCards'),
            UpdateExistingCard: postFunction("UpdateExistingCard"),
            DeleteCard: postFunction("DeleteCard"),
            GetChargesForCustomer: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetChargesForCustomer', function (args) {
                return {
                    filter: {
                        From: args[0],
                        To: args[1]
                    }
                }
            }),
            CheckCouponValidation: coreServerCommunicationService.genGetFunctionWithNVar(path +
                'CheckCouponValidation', function (args) {
                    return {
                        couponCode: args[0],
                        strategyId: args[1],
                        strategyBundleId: args[2],
                        premiumBundleId: args[3]
                    };
                }),
            AddBankAccount: postFunction("AddBankAccount"),
            GetAllBankAccounts: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetAllBankAccounts'),
            UpdateExistingBankAccount: postFunction("UpdateExistingBankAccount"),
            DeleteBankAccount: postFunction("DeleteBankAccount")
        });
    });
