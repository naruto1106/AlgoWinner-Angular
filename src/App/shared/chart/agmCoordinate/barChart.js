agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('ngCoordinate-barChart', function() {
            this.generateBarChart = function(points, style) {
                style = style || { color: '#09C' };
                var barChart = {
                    templateId: 'barChart',
                    bars: [],
                    style: style,
                    append: function(bar) {
                        this.bars.push(bar);
                    },
                    drawPath: function(scope, condition) {
                        var i = 0;
                        var path = "M 0 0 ";
                        var barsQuery = Enumerable.From(this.bars)
                            .Where(function(bar) {
                                return bar.index >= scope.ngHorizontalRange.from && bar.index <= scope.ngHorizontalRange.to;
                            });
                        barsQuery.ToArray().forEach(function(bar) {
                            path += "M " + scope.toX(bar.index - 0.4) + " " + scope.toY(bar.value) + " ";
                            path += "H " + scope.toX(bar.index + 0.4) + " ";
                            path += "V " + scope.toY(0) + " ";
                            path += "H " + scope.toX(bar.index - 0.4) + " ";
                            path += "V " + scope.toY(bar.value) + " ";
                        });
                        return path;
                    }
                };
                points.forEach(function(point) {
                    barChart.append(point);
                });
                return barChart;
            };
        }
    ).run([
        "$templateCache", function($templateCache) {
            $templateCache.put('barChart',
                '<path ngc-d="{{item.drawPath($parent)}}" stroke-width="2"  style="shape-rendering: crispEdges;" ngc-fill="{{item.style.color}}" />');
        }
    ]);