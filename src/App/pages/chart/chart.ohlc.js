agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.OhlcController",
        [],
        function (vm, dep, tool) {
            tool.watch('vm.ohlcData', function(newValue)
            {
                if (!newValue) {
                    vm.percentDifferent = null;
                    return;
                }

                var priceDifference = newValue.Close - newValue.iqPrevClose;
                vm.priceUp = priceDifference > 0;
                vm.percentDifferent = (priceDifference / newValue.iqPrevClose) * 100;
            }, false);
            
        }
    )
    .defineDirectiveForE('agmp-chart-ohlc',
        [],
        function () {
            return {
                controller: "p.chart.OhlcController",
                templateUrl: '/App/pages/chart/chart.ohlc.html'
            };
        },
        {
            ohlcData: '='
        });
