
agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('smartchartCustomLabel', [
        'smartchartCoordinateTransformer', function(smartchartCoordinateTransformer) {
            return {
                generate: function(x, y, obj, innerTemplate) {
                    return {
                        x: x,
                        y: y,
                        obj: obj,
                        innerTemplate: innerTemplate,
                        onViewChanged: function(info) {
                            var deviceX = smartchartCoordinateTransformer.toDeviceX(info, this.x);
                            var deviceY = smartchartCoordinateTransformer.toDeviceY(info, this.y);
                            this.positionStyle = {
                                left: deviceX,
                                top: deviceY,
                                position: 'absolute'
                            };
                        },
                        positionStyle: {},
                        template: 'smartchartCustomLabel'
                    };
                }
            };
        }
    ])
    .run([
        '$templateCache', function($templateCache) {
            $templateCache.put('smartchartCustomLabel',
                '<div ng-style="localItem.positionStyle">' +
                '<div ng-include src="localItem.innerTemplate" include-replace></div>' +
                '</div>');
        }
    ]);
