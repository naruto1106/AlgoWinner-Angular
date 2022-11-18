agmNgModuleWrapper('agmp.tradeview')
    .defineController('p.tradeView.TradeViewController',
        function (vm, dep, tool) {
            
            
        
        }) 
        .defineDirectiveForE('agmp-TradeComponent-simple-screener', [],
        function () {
            return {
                controller: "p.tradeView.TradeViewController",
                templateUrl: '/App/pages/tradeView/trade.view.html'
            };
        },
        {

        });
