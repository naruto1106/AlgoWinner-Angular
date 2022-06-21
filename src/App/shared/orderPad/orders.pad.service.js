agmNgModuleWrapper('agms.orders')
    .defineService('sOrdersPadService', [],
    function (serviceObj, dep, tool) {
        var coreServerCommunicationService = dep.coreServerCommunicationService;

        var orderpadControllerPath = '/mantpmsapi/OrderPad/';

        serviceObj.GetTransactionCost = coreServerCommunicationService.genGetFunctionWithNVar(orderpadControllerPath + "GetTransactionCost", function (args) {
            return { accountType: args[0], brokerageType: args[1], venue: args[2], price: args[3], quantity: args[4], assetClass: args[5], action: args[6] };
        });
        serviceObj.CheckOpenedPositionForProduct = coreServerCommunicationService.genGetFunctionWithNVar(orderpadControllerPath + "CheckOpenedPositionForProduct", function (args) {
            return { strategyId: args[0], productId: args[1] };
        });
    });
