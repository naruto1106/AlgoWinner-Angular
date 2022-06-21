
agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('smartchartMouseFollower', [
        'smartchartCoordinateTransformer', function(smartchartCoordinateTransformer) {
            return {
                generate: function(svgStyleHorizontal, svgStyleVertical) {
                    svgStyleHorizontal = svgStyleHorizontal || { fill: 'none', stroke: '#778', strokeDasharray: "3,3" };
                    svgStyleVertical = svgStyleVertical || { fill: 'none', stroke: '#778', strokeDasharray: "3,3" };
                    return {
                        svgStyleHorizontal: svgStyleHorizontal,
                        svgStyleVertical: svgStyleVertical,
                        onViewChanged: function(info) {
                            this.rerenderMouse(info);
                        },
                        lastMousePosition: { x: -1, y: -1 },
                        onMousemove: function(info, event) {
                            this.lastMousePosition.x = event.offsetX;
                            this.lastMousePosition.y = event.offsetY;
                            this.rerenderMouse(info);
                        },
                        rerenderMouse: function(info) {
                            this.pathH = "M 0 " + this.lastMousePosition.y + " L " + info.device.width + " " + this.lastMousePosition.y;
                            this.pathV = "M " + this.lastMousePosition.x + " 0 L " + this.lastMousePosition.x + " " + info.device.height;
                        },
                        pathH: '',
                        pathV: '',
                        template: 'smartchartMouseFollower'
                    };
                }
            };
        }
    ])
    .run([
        '$templateCache', function($templateCache) {
            $templateCache.put('smartchartMouseFollower',
                '<svg class="full-screen" >' +
                '<path ng-style="localItem.svgStyleHorizontal" ng-attr-d="{{localItem.pathH}}" />' +
                '<path ng-style="localItem.svgStyleVertical" ng-attr-d="{{localItem.pathV}}" />' +
                '</svg>');
        }
    ]);