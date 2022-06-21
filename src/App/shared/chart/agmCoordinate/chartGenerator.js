agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('chartGenerator', [
        '$window', 'ngCoordinate-lineChart', 'ngCoordinate-barChart', 'ngCoordinate-ohlcChart', 'ngCoordinate-scales',
        function($window, lineChart, barChart, ohlcChart, scales) {
            var obj = {};
            obj.addHelperVLines = function(strategy, gap) {
                var lines = [];
                var scaleX1 = scales.generateXScales(gap, { stroke: '#DDE', fill: 'none' });
                lines.push(scaleX1);
                if (strategy.performanceChartModel) {
                    strategy.performanceChartModel = lines.concat(strategy.performanceChartModel);
                } else {
                    strategy.performanceChartModel = lines;
                }
            };
            obj.addHelperHLines = function(strategy, gap) {
                var lines = [];
                var scaleY1 = scales.generateYScales(gap, { stroke: '#EEF', fill: 'none' });
                lines.push(scaleY1);
                if (strategy.performanceChartModel) {
                    strategy.performanceChartModel = lines.concat(strategy.performanceChartModel);
                } else {
                    strategy.performanceChartModel = lines;
                }
            };
            obj.addXMarkers = function(strategy, gap, minDistance, functionMapper) {
                gap = gap || 20;
                var marker = {};
                var i = 0;
                var markers = [];
                functionMapper = functionMapper || function(i) { return i };
                var box = scales.addBox(0, 0, 50, 30);
                strategy.performanceChartModel.push(box);
                return function(horizontalRange, svgSize) {
                    var distance = svgSize.width / 10;
                    if (distance < minDistance) {
                        distance = minDistance;
                    }
                    var requiredMarkers = (horizontalRange.to - horizontalRange.from) / gap + 1;
                    var minimumGapDistance = (horizontalRange.to - horizontalRange.from) * distance / svgSize.width;
                    box.w = svgSize.width;
                    box.y = svgSize.height - 30;
                    for (i = markers.length; i < requiredMarkers; i++) {
                        var marker = scales.addXMarker("", i);
                        markers.push(marker);
                        strategy.performanceChartModel.push(marker);
                    };
                    var x = gap * Math.floor(horizontalRange.from / gap);
                    for (i = 0; i < markers.length; i++) {
                        markers[i].visibility = i % Math.ceil(minimumGapDistance / gap) == 0;
                        if (x < horizontalRange.from + gap / 2 || x > horizontalRange.to - gap / 2) {
                            markers[i].visibility = false;
                        }
                        markers[i].label = functionMapper(i);
                        markers[i].x = x;
                        x += gap;
                    };
                };

            };
            obj.addYMarkers = function(strategy, gap, minDistance, functionMapper) {
                gap = gap || 20;
                var marker = {};
                var i = 0;
                var markers = [];
                functionMapper = functionMapper || function(i) { return i };
                var box = scales.addBox(0, 0, 40, 40);
                strategy.performanceChartModel.push(box);
                return function(verticalRange, svgSize) {
                    var distance = svgSize.height / 10;
                    if (distance < minDistance) {
                        distance = minDistance;
                    }
                    var requiredMarkers = (verticalRange.to - verticalRange.from) / gap + 1;
                    var minimumGapDistance = (verticalRange.to - verticalRange.from) * distance / svgSize.height;
                    box.h = svgSize.height;
                    for (i = markers.length; i < requiredMarkers; i++) {
                        var marker = scales.addYMarker("", i);
                        markers.push(marker);
                        strategy.performanceChartModel.push(marker);
                    };

                    var y = gap * Math.floor(verticalRange.from / gap);
                    for (i = 0; i < markers.length; i++) {
                        markers[i].visibility = i % Math.ceil(minimumGapDistance / gap) == 0;
                        if (y < verticalRange.from + gap / 2 || y > verticalRange.to - gap / 2) {
                            markers[i].visibility = false;
                        }
                        markers[i].label = functionMapper(i);
                        markers[i].y = y;
                        y += gap;
                    };
                };
            };
            obj.resolveChart = function(strategy) {
                var performanceChart = obj.getReturnAnalysisChart(strategy);
                strategy.performanceChartModel = performanceChart;

            };
            obj.getTradingIndicatorChart = function(s) {
                var prices = [];
                var dayDenominator = (1000 * 3600 * 24);
                s.prices.forEach(function(p, index) {
                    prices.push({
                        x: index,
                        y: p.Value
                    });
                });
                return [
                    lineChart.generateSimpleLineChart(prices, { color: '#09C' })
                ];
            };
            obj.getReturnAnalysisChart = function(s) {
                var benchmarkReturnsTimeSeries = s.Return.BenchmarkReturn.TimeSeriesInfo.TimeSeries;
                if (benchmarkReturnsTimeSeries && benchmarkReturnsTimeSeries[0]) {
                    var startDate = moment(benchmarkReturnsTimeSeries[0].Timestamp);
                    var pointPerformances = [];

                    var pointBenchmarks = [];
                    benchmarkReturnsTimeSeries.forEach(function(p) {
                        pointBenchmarks.push({
                            x: moment(p.Timestamp).diff(startDate, 'days'),
                            y: p.Value
                        });
                    });
                    var performanceTimeSeries = s.Return.TimeSeriesInfo.TimeSeries; // || obj.DailyReturns;

                    performanceTimeSeries.forEach(function(p) {
                        pointPerformances.push({
                            x: moment(p.Timestamp).diff(startDate, 'days'),
                            y: p.Value
                        });
                    });

                    return [
                        lineChart.generateSimpleLineChart(pointPerformances, { color: '#09C' }),
                        lineChart.generateSimpleLineChart(pointBenchmarks, { color: '#AAB' })
                    ];
                }
                return null;
            };
            obj.getChart = function(chartData) {

                var performanceChart = [];
                chartData.forEach(function(data) {
                    var item = null;
                    switch (data.type) {
                    case 'line':
                        item = lineChart.generateSimpleLineChart(data.points, data.style);
                        break;
                    case 'dotted-line':
                        item = lineChart.generateLineChart(data.points, data.style);
                        break;
                    case 'filled-line':
                        item = lineChart.generateFilledLineChart(data.points, data.style);
                        break;
                    case 'bar':
                        item = barChart.generateBarChart(data.points, data.style);
                        break;
                    case 'ohlc':
                        item = ohlcChart.generateCandleStickChart(data.points, data.style);
                        break;
                    case 'candlestick':
                        item = ohlcChart.generateCandleStickChart(data.points, data.style);
                        break;
                    }
                    if (item) {
                        performanceChart.push(item);
                    }
                });
                return performanceChart;
            };
            return obj;
        }
    ]);