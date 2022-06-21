agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('smartchartOHLC', [
        'smartchartCoordinateTransformer', function(smartchartCoordinateTransformer) {
            return {
                generate: function(ohlcSeries, svgStyleBlack, svgStyleRed) {
                    svgStyleBlack = svgStyleBlack || { fill: 'none', stroke: '#000' };
                    svgStyleRed = svgStyleRed || { fill: 'none', stroke: '#F00' };
                    return {
                        ohlcSeries: ohlcSeries,
                        svgStyleBlack: svgStyleBlack,
                        svgStyleRed: svgStyleRed,
                        init: function(info) {
                            var t = this;
                            if (info && info.helpWatch) {
                                info.helpWatch(
                                    function() {
                                        return t.ohlcSeries;
                                    },
                                    function() {
                                        t.onViewChanged(info);
                                    },
                                    true);
                            }
                        },
                        onViewChanged: function(info) {
                            if (!this.ohlcSeries || this.ohlcSeries.length === 0) {
                                return;
                            }
                            var segmentedOhlc = [];
                            this.ohlcSeries.forEach(function(item, index) {
                                if (index >= info.horizontalRange.from - 2 && index <= info.horizontalRange.to + 1) {
                                    segmentedOhlc.push({ item: item, index: index });
                                }
                            });
                            if (segmentedOhlc.length === 0) {
                                return;
                            }
                            var pathB1 = "";
                            var pathB2 = "";
                            var pathR1 = "";
                            var pathR2 = "";
                            var pathHollow = "";
                            var previousClose = segmentedOhlc[0].Close;
                            var isRed, isHollow, x, o, h, l, c;
                            segmentedOhlc.forEach(function(obj) {
                                var item = obj.item;

                                isRed = item.Close < previousClose;
                                previousClose = item.Close;
                                isHollow = item.Close > item.Open;

                                x = smartchartCoordinateTransformer.toDeviceX(info, obj.index);
                                o = smartchartCoordinateTransformer.toDeviceY(info, item.Open);
                                h = smartchartCoordinateTransformer.toDeviceY(info, item.High);
                                l = smartchartCoordinateTransformer.toDeviceY(info, item.Low);
                                c = smartchartCoordinateTransformer.toDeviceY(info, item.Close);
                                if (Math.abs(o - c) < 1) {
                                    o--;
                                    c++;
                                }
                                var highLoWLine = "M " + x + " " + h + "L " + x + " " + l + " ";
                                var openCloseLine = "M " + x + " " + o + "L " + x + " " + c + " ";
                                if (isRed) {
                                    pathR1 += highLoWLine;
                                    pathR2 += openCloseLine;
                                } else {
                                    pathB1 += highLoWLine;
                                    pathB2 += openCloseLine;
                                }
                                if (isHollow) {
                                    if (o > c + 2) {
                                        pathHollow += "M " + x + " " + (o - 1) + "L " + x + " " + (c + 1) + " ";
                                    } else if (o < c - 2) {
                                        pathHollow += "M " + x + " " + (o + 1) + "L " + x + " " + (c - 1) + " ";
                                    }
                                }
                            });
                            var thickness = smartchartCoordinateTransformer.toDeviceW(info, 0.9);
                            this.pathB1 = pathB1;
                            this.pathB2 = pathB2;
                            this.pathR1 = pathR1;
                            this.pathR2 = pathR2;
                            this.pathHollow = pathHollow;
                            this.styleB1 = angular.copy(svgStyleBlack);
                            this.styleB2 = angular.copy(svgStyleBlack);
                            this.styleR1 = angular.copy(svgStyleRed);
                            this.styleR2 = angular.copy(svgStyleRed);
                            this.styleB1.fill = 'none';
                            this.styleB1.strokeWidth = 1;
                            this.styleB2.fill = 'none';
                            this.styleB2.strokeWidth = thickness;
                            this.styleR1.fill = 'none';
                            this.styleR1.strokeWidth = 1;
                            this.styleR2.fill = 'none';
                            this.styleR2.strokeWidth = thickness;
                            this.styleHollow = { stroke: 'white', fill: 'none' };
                            this.styleHollow.strokeWidth = thickness - 2;
                        },
                        pathB1: "",
                        pathB2: "",
                        pathR1: "",
                        pathR2: "",
                        pathHollow: "",
                        styleB1: {},
                        styleB2: {},
                        styleR1: {},
                        styleR2: {},
                        styleHollow: {},

                        template: 'smartchartOHLC'
                    };
                }
            };
        }
    ])
    .service('smartchartOHLCHighlighter', [
        'smartchartCoordinateTransformer', function(smartchartCoordinateTransformer) {
            return {
                generate: function(svgStyle, callback) {
                    svgStyle = svgStyle || { fill: 'none', stroke: '#9CF' };
                    return {
                        svgStyle: svgStyle,
                        callback: callback,
                        onViewChanged: function(info) {
                            this.rerenderMouse(info);
                        },
                        lastMousePosition: { x: -1, y: -1 },
                        lastIndexPointed: 0,
                        onMousemove: function(info, event) {
                            this.lastMousePosition.x = event.offsetX;
                            this.lastMousePosition.y = event.offsetY;
                            var x = smartchartCoordinateTransformer.toX(info, this.lastMousePosition.x);
                            this.lastIndexPointed = Math.round(x);
                            if (this.callback) {
                                this.callback(this.lastIndexPointed);
                            }
                            this.rerenderMouse(info);
                        },
                        rerenderMouse: function(info) {
                            var deviceX = smartchartCoordinateTransformer.toDeviceX(info, this.lastIndexPointed);
                            this.pathV = "M " + deviceX + " 0 L " + deviceX + " " + info.device.height;
                            svgStyle.strokeWidth = smartchartCoordinateTransformer.toDeviceW(info, 1);
                        },
                        pathV: '',
                        template: 'smartchartOHLCHighlighter'
                    };
                }
            };
        }
    ])
    .service('smartchartOLHCHelper', function() {
        return {
            computeOHLCVerticalRange: function(horizontalRange, ohlcSeries) {
                if (!ohlcSeries) {
                    return { min: 0, max: 1000 };
                }
                var min = null;
                var max = null;
                for (var i = Math.floor(horizontalRange.from); i <= horizontalRange.to; i++) {
                    if (ohlcSeries[i]) {
                        if (!min || min > ohlcSeries[i].Low) {
                            min = ohlcSeries[i].Low;
                        }
                        if (!max || max < ohlcSeries[i].High) {
                            max = ohlcSeries[i].High;
                        }
                    }
                }
                return { min: min, max: max };
            }
        };
    })
    .run([
        '$templateCache', function($templateCache) {
            $templateCache.put('smartchartOHLC',
                '<svg class="full-screen">' +
                '<path ng-style="localItem.styleB1" ng-attr-d="{{localItem.pathB1}}" />' +
                '<path ng-style="localItem.styleR1" ng-attr-d="{{localItem.pathR1}}" />' +
                '<path ng-style="localItem.styleB2" ng-attr-d="{{localItem.pathB2}}" />' +
                '<path ng-style="localItem.styleR2" ng-attr-d="{{localItem.pathR2}}" />' +
                '<path ng-style="localItem.styleHollow" ng-attr-d="{{localItem.pathHollow}}" />' +
                '</svg>');
        }
    ])
    .run([
        '$templateCache', function($templateCache) {
            $templateCache.put('smartchartOHLCHighlighter',
                '<svg class="full-screen" >' +
                '<path ng-style="localItem.svgStyle" ng-attr-d="{{localItem.pathV}}" />' +
                '</svg>');
        }
    ]);
