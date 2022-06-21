agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('ngCoordinate-lineChart', function() {
            var drawPath = function(coordinateComputer, points, displayedXRange) {
                var str = "M 0 0 ";
                var xMin = null;
                var xMax = null;
                var isFirst = true;
                var i = 0;
                var horizontalRange = coordinateComputer.getHorizontalRange();
                var displayedPointsQuery =
                    Enumerable.From(points)
                        .Where(function(curr) {
                            return curr.x >= horizontalRange.from - 1 && curr.x <= horizontalRange.to + 1;
                        });

                var displayedPoints = displayedPointsQuery.ToArray();
                if (displayedPoints.length <= 0) {
                    return "";
                }
                var curr = displayedPoints[0];
                str = "M " + coordinateComputer.toX(curr.x) + " " + coordinateComputer.toY(curr.y) + " ";
                for (i = 1; i < displayedPoints.length; i++) {
                    curr = displayedPoints[i];
                    str += "L " + coordinateComputer.toX(curr.x) + " " + coordinateComputer.toY(curr.y) + " ";
                };
                displayedXRange.from = displayedPointsQuery.Min("u => u.x");
                displayedXRange.to = displayedPointsQuery.Max("u => u.x");
                return str;
            };
            this.generateSimpleLineChart = function(points, style) {
                var lineChart = this.generateLineChart(points, style);
                lineChart.templateId = 'simpleLineChart';
                return lineChart;
            };
            this.generateLineChart = function(points, style) {
                var lineChart = this.generateGeneralLineChart(points, style);
                lineChart.templateId = 'lineChart';
                lineChart.drawPath = function(coordinateComputer) {
                    var displayedXRange = {};
                    var path = drawPath(coordinateComputer, this.points, displayedXRange);
                    return path;
                };
                return lineChart;
            };
            this.generateFilledLineChart = function(points, style) {
                var filledLineChart = this.generateGeneralLineChart(points, style);
                filledLineChart.templateId = 'filledLineChart';
                filledLineChart.drawPath = function(coordinateComputer) {
                    var displayedXRange = {};
                    var path = drawPath(coordinateComputer, this.points, displayedXRange);
                    if (displayedXRange.to != null && displayedXRange.from != null) {
                        path += "L " + displayedXRange.to + " " + coordinateComputer.toYPercentage(1) + " ";
                        path += "L " + displayedXRange.from + " " + coordinateComputer.toYPercentage(1) + " Z";
                    }
                    return path;
                };
                return filledLineChart;
            };
            this.generateGeneralLineChart = function(points, style) {
                style = style || { color: '#09C' };
                var lineChart = {
                    points: [],
                    style: style,
                    append: function(ohlc) {
                        var last = this.points[this.points.length - 1];
                        last = last || ohlc;
                        ohlc.prev = last;
                        this.points.push(ohlc);
                    },
                };
                points.forEach(function(u) {
                    lineChart.append(u);
                });
                return lineChart;
            };
        }
    )
    .run([
        "$templateCache", function($templateCache) {
            $templateCache.put('simpleLineChart',
                '<path ng-attr-d="{{item.drawPath(vm.coordinateComputer)}}" ng-attr-stroke="{{item.style.color}}" fill="none"/>');
            $templateCache.put('filledLineChart',
                '<path ng-attr-d="{{item.drawPath(vm.coordinateComputer)}}" ng-attr-fill="{{item.style.color}}"/>');
        }
    ]);