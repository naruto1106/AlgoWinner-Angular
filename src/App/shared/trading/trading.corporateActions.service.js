agmNgModuleWrapper('agms.trading')
    .defineService('sTradingCorporateActionsService', [],
    function (serviceObj, dep, tool) {
        var coreServerCommunicationService = dep.coreServerCommunicationService;
        var path = "/marketinfoapi/v1/CorporateAction/";

        serviceObj.GetCorporateActionsForProducts = coreServerCommunicationService.genPostFunction(path + 'GetCorporateActionsForProducts');
        serviceObj.corporateActionsTypes = [
            { name: 'corporate-actions.SD', displayName: 'Scrip Dividend', type: 'Scrip Dividend' },
            { name: 'corporate-actions.B', displayName: 'Bonus', type: 'Bonus' },
            { name: 'corporate-actions.CD', displayName: 'Cash Dividend', type: 'Cash Dividend' },
            { name: 'corporate-actions.SC', displayName: 'Symbol Change', type: 'Symbol Change' },
            { name: 'corporate-actions.S', displayName: 'Stock Split', type: 'Stock Split' }
        ];
    });