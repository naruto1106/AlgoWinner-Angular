agmNgModuleWrapper('agms.strategyCommerce')
    .ngApp
    .service('sStrategyCommerceGuestService', [
        'coreServerCommunicationService', function (coreServerCommunicationService) {
            var path = '/userinfoapi/v1/Guest/';

            this.IsPasswordExpired = coreServerCommunicationService.genGetFunctionWithNVarArguments(path + 'IsPasswordExpired', ['email']);
        }
    ]);