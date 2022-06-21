agmNgModuleWrapper('agms.datamart')
    .defineService('sDatamartAlertService',
    [],
    function (serviceObj, dep, tool) {
        var path = "/marketalertapi/DataMartAlertV2/";
        var coreServerCommunicationService = dep.coreServerCommunicationService;

        tool.setServiceObjectProperties({
            createDataMartAlert: coreServerCommunicationService.genPostFunction(path + 'CreateDataMartAlert'),
            modifyDataMartAlert: coreServerCommunicationService.genPostFunction(path + 'ModifyDataMartAlert'),
            deleteDataMartAlert: coreServerCommunicationService.genPostFunction(path + 'DeleteDataMartAlert'),
            getDataMartAlertsForUser: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetDataMartAlertsForUser'),
            getDataMartsForAlerts: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetDataMartsForAlerts'),
            getProductCategories: coreServerCommunicationService.genPostFunction(path + 'GetProductCategories'),
            searchProductByMarket: coreServerCommunicationService.genPostFunction(path + 'SearchProductByMarket')
        });
    });