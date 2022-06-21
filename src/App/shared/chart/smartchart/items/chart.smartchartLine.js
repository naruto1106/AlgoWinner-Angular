agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('smartchartLine', [
        'smartchartCoordinateTransformer', function(smartchartCoordinateTransformer) {
            return {
                generate: function(points, svgStyle) {
                    svgStyle = svgStyle || { fill: 'none', stroke: '#000' };
                    return {
                        points: points,
                        svgStyle: svgStyle,
                        init: function(info) {
                            var t = this;
                            if (info && info.helpWatch) {
                                info.helpWatch(
                                    function() {
                                        return t.points;
                                    },
                                    function() {
                                        t.onViewChanged(info);
                                    },
                                    true);
                            }
                        },
                        onViewChanged: function(info) {
                            if (!this.points || this.points.length == 0) {
                                return;
                            }
                            var path = "";
                            var x, y = 0;
                            x = smartchartCoordinateTransformer.toDeviceX(info, this.points[0].x);
                            y = smartchartCoordinateTransformer.toDeviceY(info, this.points[0].y);
                            path += "M " + x + " " + y + " ";
                            for (var i = 1; i < this.points.length; i++) {
                                x = smartchartCoordinateTransformer.toDeviceX(info, this.points[i].x);
                                y = smartchartCoordinateTransformer.toDeviceY(info, this.points[i].y);
                                path += "L " + x + " " + y + " ";
                            };
                            this.path = path;
                        },
                        path: '',
                        template: 'smartchartLine'
                    };
                }
            };
        }
    ])
    .run([
        '$templateCache', function($templateCache) {
            $templateCache.put('smartchartLine',
                '<svg class="full-screen">' +
                '<path ng-style="localItem.svgStyle" ng-attr-d="{{localItem.path}}" />' +
                '</svg>');
        }
    ]);