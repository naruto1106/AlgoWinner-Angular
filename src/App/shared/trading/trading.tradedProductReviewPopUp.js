agmNgModuleWrapper('agms.trading')
    .defineControllerAsPopup('s.trading.TradedProductReviewPopUpController',
    {
        templateUrl: '/App/shared/trading/trading.tradedProductReviewPopUp.html',
        windowClass: 'mini-modal'
    },
    ["chartGenerator", "trades", 'sProductService'],
    function (vm, dep, tool) {
        var chartGenerator = dep.chartGenerator;
        var sProductService = dep.sProductService;

        //Chart Generating
        var trading = {};
        trading.prices = [];
        for (var i = 0; i < 50; i++) {
            trading.prices.push({
                Timestamp: "2014-10-10T00:00:00Z",
                Value: 1.2 + Math.random() * 0.4
            });
        }
        var tradingChartModel = chartGenerator.getTradingIndicatorChart(trading);

        function goToExitOrder(order) {
            tool.openModalByDefinition('s.orders.BracketController', {
                order: order,
                title: "View Order"
            });
        }

        function goToEntryOrder(orders) {
            tool.openModalByDefinition('RelatedOrdersController', {
                order: null,
                relatedOrders: orders,
                title: "View Orders"
            });
        }
        
        function getQuantity(trade) {
            return Math.abs(trade.Quantity);
        }

        tool.initialize(function() {
            tool.setVmProperties({
                trades: dep.trades,
                tradingChartModel: tradingChartModel,
                
                goToExitOrder: goToExitOrder,
                goToEntryOrder: goToEntryOrder,
                getQuantity: getQuantity
            });

            if (vm.trades[0]) {
                sProductService.GetProduct(vm.trades[0].Instrument.ProductId)
                    .then(function (res) {
                        vm.trades.forEach(function(x) {
                            x.Product = res.data.Data;
                        });
                    }, function (res) {
                        tool.logWarn("failed to retrieve product");
                    });                
            }
        });
    });