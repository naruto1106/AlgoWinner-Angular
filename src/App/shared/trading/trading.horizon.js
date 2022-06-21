agmNgModuleWrapper('agms.trading')
    .defineController('s.trading.HorizonController',[],function(){})
    .defineDirectiveForE('agms-trading-horizon', [],
    function () {
        return {
            controller:'s.trading.HorizonController',
            templateUrl: '/App/shared/trading/trading.horizon.html'
        };
    },{
        content: "=",
        iconOnly:"=?"
    });