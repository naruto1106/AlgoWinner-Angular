agmNgModuleWrapper('agmp.tradeIdea')
    .defineController('p.tradeIdea.TradeHeaderController',[],
        function (vm, dep, tool) {
            

        
        }) 
        .defineDirectiveForE('agmp-tradeidea-header', [],
        function () {
            return {
                controller: "p.tradeIdea.TradeHeaderController",
                templateUrl: '/App/pages/tradeIdea/tradeIdea.header.html'
            };
        },
        {

        });