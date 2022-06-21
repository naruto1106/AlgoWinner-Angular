agmNgModuleWrapper('agms.priceAlert')
    .defineService('sPriceAlertService',
        [],
        function (serviceObj, dep, tool) {
            //Price alerts
            var coreServerCommunicationService = dep.coreServerCommunicationService;
            var priceAlertPath = '/marketalertapi/PriceAlert/';

            tool.setServiceObjectProperties({
                createPriceAlert: coreServerCommunicationService.genPostFunction(priceAlertPath + 'CreatePriceAlert'),
                modifyPriceAlert: coreServerCommunicationService.genPostFunction(priceAlertPath + 'ModifyPriceAlert'),
                deletePriceAlert: coreServerCommunicationService.genPostFunction(priceAlertPath + 'DeletePriceAlert'),
                getPriceAlerts: coreServerCommunicationService.genGetFunctionWithNVar(priceAlertPath + 'GetPriceAlertsForUser'),
                deleteAllTriggeredAlertsForUser: coreServerCommunicationService.genPostFunction(priceAlertPath + 'DeleteAllTriggeredAlertsForUser')
            });
        });