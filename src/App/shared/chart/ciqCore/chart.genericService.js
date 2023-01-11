agmNgModuleWrapper('agms.chart')
    .defineService('pChartService', [],
    function (serviceObj, dep, tool) {
        var showTrendDrawing = dep.coreConfigService.General.ShowTrendDrawing;

        var chartTypes = [
            {
                Name: "Bar Chart",
                Src: '/App/assets/icons/chart/barchart.svg',
                StxxType: 'colored_bar'
            },
            {
                Name: "Simple Bar Chart",
                Src: '/App/assets/icons/chart/barchart_simple.svg',
                StxxType: 'bar'
            },
            {
                Name: "Line Chart",
                Src: '/App/assets/icons/chart/linechart.svg',
                StxxType: 'line'
            },
            {
                Name: "Candlestick",
                Src: '/App/assets/icons/chart/candlestick.svg',
                StxxType: 'hollow_candle'
            },
            {
                Name: "Simple Candlestick",
                Src: '/App/assets/icons/chart/candlestick_simple.svg',
                StxxType: 'candle'
            }
        ];

        function canAddToWatchlist(product) {
            return product.AssetType !== 'Indices' && product.TradeVenueLoc !== 'HK' && product.TradeVenueLoc !== 'CHN';
        }

        function canAddToPriceAlert(product) {
            var noIntradayMarkets = dep.coreConfigService.Chart.NoIntradayMarkets;
            return noIntradayMarkets.indexOf(product.TradeVenueLoc) === -1;
        }
        
        function getChartType(cruType) {
            var chartType = serviceObj.chartTypes.filter(function (i) {
                return i.StxxType === cruType;
            })[0];
            return chartType;
        }

        if (showTrendDrawing) {
            chartTypes.push({
                Name: "Line Chart - High",
                Src: '/App/assets/icons/chart/linechart.svg',
                StxxType: 'line',
                ExtendedChartType: 'high_line'
            })
        }

        tool.setServiceObjectProperties({
            getChartType: getChartType,
            canAddToWatchlist: canAddToWatchlist,
            canAddToPriceAlert: canAddToPriceAlert,
            drawings: {
                drawingType: null,
                desktopDrawing: false
            },
            initialProductRequest: null,
            chartTypes: chartTypes
        });
    });
