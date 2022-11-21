agmNgModuleWrapper('agmp.tradeIdea')
    .defineController('p.tradeIdea.TradeIdeaController',[],
        function (vm, dep, tool) {
            

        
        }) 
        .defineDirectiveForE('agmp-TradeIdea-View', [],
        function () {
            return {
                controller: "p.tradeIdea.TradeIdeaController",
                templateUrl: '/App/pages/tradeIdea/tradeIdea.view.html'
            };
        },
        {

        });