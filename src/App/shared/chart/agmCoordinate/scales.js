agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('ngCoordinate-scales', [
        '$sce', function($sce) {
            var getScaleFunction = function(range) {
                var scaledFrom = Math.floor(range.from / this.distance) * this.distance;
                var scaledTo = Math.ceil(range.to / this.distance) * this.distance;
                var arr = [];
                var i = 0;
                for (i = scaledFrom; i <= scaledTo; i += this.distance) {
                    arr.push(i);
                }
                return arr;
            };
            this.generateXScales = function(distance, style) {
                var scales = {
                    templateId: 'genericPath',
                    style: style || { stroke: '#EEE', fill: 'none' },
                    distance: distance,
                    scales: getScaleFunction,
                    drawPath: function(coordinateComputer) {
                        var scales = this.scales(coordinateComputer.getHorizontalRange());
                        var i = 0;
                        var path = "M 0 0 ";
                        for (i = 0; i < scales.length; i++) {
                            path += "M " + coordinateComputer.toX(scales[i]) + " 0 V " + coordinateComputer.toYPercentage(1) + " ";
                        }
                        return path;
                    }
                };
                return scales;
            };
            this.generateYScales = function(distance, style) {
                var scales = {
                    templateId: 'genericPath',
                    style: style || { stroke: '#EEE', fill: 'none' },
                    distance: distance,
                    scales: getScaleFunction,
                    drawPath: function(coordinateComputer) {
                        var scales = this.scales(coordinateComputer.getVerticalRange());
                        var i = 0;
                        var path = "M 0 0 ";
                        for (i = 0; i < scales.length; i++) {
                            path += "M 0 " + coordinateComputer.toY(scales[i]) + " H " + coordinateComputer.toXPercentage(1) + " ";
                        }
                        return path;
                    }
                };
                return scales;
            };
            this.addXMarkers = function(converter, distance) {
                return {
                    converter: converter,
                    distance: distance,
                    templateId: 'xMarkers',
                    scales: getScaleFunction,
                    cssClass: {},
                    cssStyle: {},
                    markers: [],
                    coordinateComputer: null,
                    init: function(coordinateComputer) {
                        this.coordinateComputer = coordinateComputer;
                        this.horizontalRange = this.coordinateComputer.getHorizontalRange();
                    },
                    adjustMarker: function() {
                        var scales = this.scales(this.coordinateComputer.getHorizontalRange());
                        var i = 0;
                        var markers = [];
                        for (i = 0; i < scales.length; i++) {
                            markers.push({
                                x: coordinateComputer.toX(scales[i]),
                                label: this.converter(i)
                            });
                        }
                        this.markers = markers;
                    }
                }
            }

            this.addXMarker = function(label, x) {
                return {
                    getLabel: function() {
                        return $sce.trustAsHtml(this.label);
                    },
                    label: label,
                    templateId: 'xMarker',
                    x: x,
                    cssClass: {},
                    cssStyle: {}
                };
            };
            this.addYMarker = function(label, y) {
                return {
                    getLabel: function() {
                        return $sce.trustAsHtml(this.label);
                    },
                    label: label,
                    templateId: 'yMarker',
                    y: y,
                    cssClass: {},
                    cssStyle: {}
                };
            };
            this.addAnyMarker = function(templateId, x, y, obj) {
                return {
                    templateId: templateId,
                    y: y,
                    x: x,
                    obj: obj
                };
            };
        }
    ])
    .run([
        "$templateCache", function($templateCache) {
            $templateCache.put('xMarker',
                '<foreignObject ng-attr-x="{{toX(item.x)-50}}" ng-attr-y="{{toYPercentage(1)-20}}" width="100" height="100">' +
                '   <div ng-class="item.cssClass" ng-style="item.cssStyle" ng-bind-html="item.getLabel()"></div>' +
                '   </div>' +
                '</foreignObject>');
            $templateCache.put('xMarkers',
                '<group ng-init="item.init(vm.coordinateComputer)">' +
                '<foreignObject ng-repeat="marker in item.markers" ng-attr-x="{{toX(label.x)-50}}" width="100" height="100">' +
                '   <div ng-class="marker.cssClass" ng-style="marker.cssStyle" ng-bind-html="marker.label"></div>' +
                '   </div>' +
                '</foreignObject>' +
                '</group>');
            $templateCache.put('yMarker',
                '<foreignObject ng-attr-y="{{toY(item.y)-10}}" ng-attr-x="10" width="100" height="100">' +
                '   <div ng-class="item.cssClass" ng-style="item.cssStyle" ng-bind-html="item.getLabel()"></div>' +
                '</foreignObject>');
            $templateCache.put('buyMarker',
                '<foreignObject ng-attr-y="{{toY(item.y)-30}}" ng-attr-x="{{toX(item.x)-15}}" width="200" height="20">' +
                '   <div class="signal-buy">BUY   {{item.obj.price | currency:"$":2}}   Q:{{item.obj.quantity}}</div>' +
                '</foreignObject>');
            $templateCache.put('sellMarker',
                '<foreignObject ng-attr-y="{{toY(item.y)+10}}" ng-attr-x="{{toX(item.x)-15}}" width="200" height="20">' +
                '   <div class="signal-sell">SELL   {{item.obj.price | currency:"$":2}}   Q:{{item.obj.quantity}}</div>' +
                '</foreignObject>');
        }
    ]);