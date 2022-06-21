agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('ngCoordinate-ohlcChart', function() {
        this.generateCandleStickChart = function(ohlcList, style) {
            var candleStickChart = this.generateGeneralOhlcChart(ohlcList);
            candleStickChart.style = style || {
                red: "#F00",
                empty: "#FFF",
                black: "#000"
            };
            candleStickChart.templateId = 'candleStickChart';
            candleStickChart.generateSingleCandleStickPath = function(ohlc, scope) {
                if (ohlc.index < scope.ngHorizontalRange.from || ohlc.index > scope.ngHorizontalRange.to) {
                    return "";
                }
                var path = "M 0 0 ";
                var ocMax = this.getOCMax(ohlc);
                var ocMin = this.getOCMin(ohlc);
                path += "M " + scope.toX(ohlc.index) + " " + scope.toY(ohlc.h) + " ";
                path += "V " + scope.toY(ocMax) + " ";
                path += "M " + scope.toX(ohlc.index - 0.45) + " " + scope.toY(ocMax) + " ";
                path += "H " + scope.toX(ohlc.index + 0.45) + " ";
                path += "V " + scope.toY(ocMin) + " ";
                path += "H " + scope.toX(ohlc.index - 0.45) + " ";
                path += "V " + scope.toY(ocMax) + " ";
                path += "M " + scope.toX(ohlc.index) + " " + scope.toY(ocMin) + " ";
                path += "V " + scope.toY(ohlc.l) + " ";
                return path;
            };
            candleStickChart.drawPath = function(scope, condition) {
                var i = 0;
                var path = "M 0 0 ";
                for (i = 0; i < this.ohlcList.length; i++) {
                    var ohlc = this.ohlcList[i];
                    if (condition(ohlc) == false) {
                        continue;
                    }
                    path += this.generateSingleCandleStickPath(ohlc, scope);
                }
                return path;
            };
            candleStickChart.drawPathBF = function(scope) {
                var _t = this;
                var condition = function(ohlc) {
                    return _t.isBlack(ohlc) && _t.isFilled(ohlc);
                };
                return this.drawPath(scope, condition);
            };
            candleStickChart.drawPathBE = function(scope) {
                var _t = this;
                var condition = function(ohlc) {
                    return _t.isBlack(ohlc) && !_t.isFilled(ohlc);
                };
                return this.drawPath(scope, condition);
            };
            candleStickChart.drawPathRF = function(scope) {
                var _t = this;
                var condition = function(ohlc) {
                    return !_t.isBlack(ohlc) && _t.isFilled(ohlc);
                };
                return this.drawPath(scope, condition);
            };
            candleStickChart.drawPathRE = function(scope) {
                var _t = this;
                var condition = function(ohlc) {
                    return !_t.isBlack(ohlc) && !_t.isFilled(ohlc);
                };
                return this.drawPath(scope, condition);
            };
            return candleStickChart;
        };
        this.generateOhlcChart = function(ohlcList, style) {
            var ohlcChart = this.generateGeneralOhlcChart(ohlcList);
            ohlcChart.style = style || { stroke: '#000' };
            ohlcChart.templateId = 'ohlcChart';
            ohlcChart.drawPath = function(scope) {
                var i = 0;
                var path = "M 0 0 ";
                for (i = 0; i < this.ohlcList.length; i++) {
                    var ohlc = this.ohlcList[i];
                    if (ohlc.index < scope.ngHorizontalRange.from || ohlc.index > scope.ngHorizontalRange.to) {
                        continue;
                    }
                    path += "M " + scope.toX(ohlc.index) + " " + scope.toY(ohlc.h) + " ";
                    path += "V " + scope.toY(ohlc.l) + " ";
                    path += "M " + scope.toX(ohlc.index - 0.45) + " " + scope.toY(ohlc.o) + " ";
                    path += "H " + scope.toX(ohlc.index) + " ";
                    path += "M " + scope.toX(ohlc.index + 0.45) + " " + scope.toY(ohlc.c) + " ";
                    path += "H " + scope.toX(ohlc.index) + " ";
                }
                return path;
            };
            return ohlcChart;
        };
        this.generateGeneralOhlcChart = function(ohlcList) {
            var ohlcChartModel = {
                ohlcList: [],
                getOCMin: function(ohlc) {
                    return Math.min(ohlc.o, ohlc.c);;
                },
                getOCMax: function(ohlc) {
                    return Math.max(ohlc.o, ohlc.c);;
                },
                isBlack: function(ohlc) {
                    var prevOhlc = ohlc.prev || ohlc;
                    return (ohlc.c > prevOhlc.c);
                },
                isFilled: function(ohlc) {
                    return ohlc.c < ohlc.o;
                },
                append: function(ohlc) {
                    var last = this.ohlcList[this.ohlcList.length - 1];
                    last = last || ohlc;
                    ohlc.prev = last;
                    this.ohlcList.push(ohlc);
                }
            };
            for (var i = 0; i < ohlcList.length; i++) {
                ohlcChartModel.append(ohlcList[i]);
            };

            return ohlcChartModel;
        };
    })
    .run([
        "$templateCache", function($templateCache) {
            $templateCache.put('ohlcChart',
                '<path ngc-d="{{item.drawPath($parent)}}" style="shape-rendering: crispEdges;" ngc-stroke="{{item.style.stroke}}" />');
            $templateCache.put('candleStickChart',
                '<path ngc-d="{{item.drawPathBF($parent)}}"  style="shape-rendering: crispEdges;" ngc-fill="{{item.style.black}}" ngc-stroke="{{item.style.black}}" />' +
                '<path ngc-d="{{item.drawPathBE($parent)}}"  style="shape-rendering: crispEdges;" ngc-fill="{{item.style.empty}}" ngc-stroke="{{item.style.black}}" />' +
                '<path ngc-d="{{item.drawPathRF($parent)}}"  style="shape-rendering: crispEdges;" ngc-fill="{{item.style.red}}" ngc-stroke="{{item.style.red}}" />' +
                '<path ngc-d="{{item.drawPathRE($parent)}}"  style="shape-rendering: crispEdges;" ngc-fill="{{item.style.empty}}" ngc-stroke="{{item.style.red}}" />'
            );
        }
    ]);
