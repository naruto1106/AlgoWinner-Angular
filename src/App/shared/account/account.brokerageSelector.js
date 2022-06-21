agmNgModuleWrapper('agms.account')
    .defineController('s.account.BrokerageSelectorController', [], function() {

    })
    .defineDirectiveForE('agms-account-brokerage-selector', [], function() {
        return {
            controller: 's.account.BrokerageSelectorController',
            templateUrl: '/App/shared/account/account.brokerageSelector.html',
        };
    }, {
        selectedBroker: '=',
        accountType: '=',
        disableWatermark: '='
    });