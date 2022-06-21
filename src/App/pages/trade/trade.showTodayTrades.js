agmNgModuleWrapper('agmp.trade')
    .defineControllerAsPopup('p.trade.ShowTodayTradesController',
    {
        templateUrl: '/App/pages/trade/trade.showTodayTrades.html'
    },
    [
        'trades'
    ],
    function (vm, dep, tool) {
        var trades = dep.trades;

        vm.product = trades[0].Product;
        vm.trades = trades;
    });