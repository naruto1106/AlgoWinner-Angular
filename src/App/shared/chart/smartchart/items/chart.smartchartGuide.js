
agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('smartchartVerticalGuide', [
        'smartchartCoordinateTransformer', function(smartchartCoordinateTransformer) {
            return {
                generate: function(minDistance, minUnit, svgStyle) {
                    minDistance = minDistance || 100;
                    minUnit = minUnit || 1;
                    svgStyle = svgStyle || { stroke: '#EEF', fill: 'none' };
                    return {
                        minDistance: minDistance,
                        minUnit: minUnit,
                        svgStyle: svgStyle,
                        onViewChanged: function(info) {
                            var x = 0;
                            var segmentWidth = this.minUnit;
                            var minimumSegmentWidth = smartchartCoordinateTransformer.toW(info, this.minDistance);
                            if (minimumSegmentWidth > segmentWidth) {
                                segmentWidth = Math.ceil(minimumSegmentWidth / segmentWidth) * segmentWidth;
                            }
                            var path = "";
                            var from = Math.floor(info.horizontalRange.from / segmentWidth) * segmentWidth;
                            var h = info.device.height;
                            for (var i = from; i < info.horizontalRange.to; i += segmentWidth) {
                                x = smartchartCoordinateTransformer.toDeviceX(info, i);
                                path += "M " + x + " 0 L " + x + " " + h + " ";
                            };
                            this.path = path;
                        },
                        path: '',
                        template: 'singlePathSVG'
                    };
                }
            };
        }
    ])
    .service('smartchartHorizontalGuide', [
        'smartchartCoordinateTransformer', function(smartchartCoordinateTransformer) {
            return {
                generate: function(minDistance, minUnit, svgStyle) {
                    minDistance = minDistance || 100;
                    minUnit = minUnit || 1;
                    svgStyle = svgStyle || { stroke: '#EEF', fill: 'none' };
                    return {
                        minDistance: minDistance,
                        minUnit: minUnit,
                        svgStyle: svgStyle,
                        onViewChanged: function(info) {
                            var y = 0;
                            var segmentHeight = this.minUnit;
                            var minimumSegmentHeight = smartchartCoordinateTransformer.toH(info, this.minDistance);
                            if (minimumSegmentHeight > segmentHeight) {
                                segmentHeight = Math.ceil(minimumSegmentHeight / segmentHeight) * segmentHeight;
                            }
                            var path = "";
                            var from = Math.floor(info.verticalRange.from / segmentHeight) * segmentHeight;
                            var w = info.device.width;
                            for (var i = from; i < info.verticalRange.to; i += segmentHeight) {
                                y = smartchartCoordinateTransformer.toDeviceY(info, i);
                                path += "M 0 " + y + " L " + w + " " + y + " ";
                            };
                            this.path = path;
                        },
                        path: '',
                        template: 'singlePathSVG'
                    };
                }
            };
        }
    ])
    .run([
        '$templateCache', function($templateCache) {
            $templateCache.put('smartchartMouseFollower',
                '<svg class="full-screen" >' +
                '<path ng-style="localItem.svgStyleHorizontal" ng-attr-d="{{item.pathH}}" />' +
                '<path ng-style="localItem.svgStyleVertical" ng-attr-d="{{item.pathV}}" />' +
                '</svg>');
        }
    ]);
