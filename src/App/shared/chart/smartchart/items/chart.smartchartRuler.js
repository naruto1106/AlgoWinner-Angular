
agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('smartchartVerticalRuler', [
        'smartchartCoordinateTransformer', function(smartchartCoordinateTransformer) {
            return {
                generate: function(minDistance, minUnit, isFacingRight, labelFunction, htmlClass, rulerClass, textClass) {
                    minDistance = minDistance || 100;
                    minUnit = minUnit || 1;
                    textClass = textClass || ['default-vertical-guide-text'];
                    htmlClass = htmlClass || ['full-screen'];
                    rulerClass = rulerClass || ['default-vertical-guide-ruler'];
                    labelFunction = labelFunction || function(i) {
                        return i;
                    };
                    return {
                        minDistance: minDistance,
                        minUnit: minUnit,
                        htmlClass: htmlClass,
                        labelFunction: labelFunction,
                        labels: [],
                        textStyle: {},
                        isFacingRight: isFacingRight,
                        rulerClass: rulerClass,
                        textClass: textClass,
                        onViewChanged: function(info) {
                            var labels = [];
                            var y = 0;
                            var segmentHeight = this.minUnit;
                            var minimumSegmentHeight = smartchartCoordinateTransformer.toH(info, this.minDistance);
                            if (minimumSegmentHeight > segmentHeight) {
                                segmentHeight = Math.ceil(minimumSegmentHeight / segmentHeight) * segmentHeight;
                            }
                            var from = Math.floor(info.verticalRange.from / segmentHeight) * segmentHeight;;
                            for (var i = from; i < info.verticalRange.to; i += segmentHeight) {
                                y = smartchartCoordinateTransformer.toDeviceY(info, i);
                                var style = {
                                    position: 'absolute',
                                    top: y
                                };
                                if (this.isFacingRight) {
                                    style.right = '0';
                                }
                                labels.push({
                                    style: style,
                                    value: i
                                });
                            };

                            var facingRightIdx = this.textClass.indexOf('facing-right');
                            if (this.isFacingRight) {
                                if (facingRightIdx < 0) {
                                    this.textClass.push('facing-right');
                                }
                            } else if (facingRightIdx >= 0) {
                                this.textClass.splice(facingRightIdx, 1);
                            }

                            this.labels = labels;
                        },
                        template: 'smartchartVerticalRuler'
                    };
                }
            };
        }
    ])
    .service('smartchartHorizontalRuler', [
        'smartchartCoordinateTransformer', function(smartchartCoordinateTransformer) {
            return {
                generate: function(minDistance, minUnit, isFacingUp, labelFunction, htmlClass, rulerClass, textClass) {
                    minDistance = minDistance || 100;
                    minUnit = minUnit || 1;
                    textClass = textClass || ['default-horizontal-guide-text'];
                    htmlClass = htmlClass || ['full-screen'];
                    rulerClass = rulerClass || ['default-horizontal-guide-ruler'];
                    labelFunction = labelFunction || function(i) {
                        return i;
                    };
                    return {
                        minDistance: minDistance,
                        minUnit: minUnit,
                        htmlClass: htmlClass,
                        labels: [],
                        labelFunction: labelFunction,
                        isFacingUp: isFacingUp,
                        rulerClass: rulerClass,
                        textClass: textClass,
                        onViewChanged: function(info) {
                            var labels = [];
                            var x = 0;
                            var segmentWidth = this.minUnit;
                            var minimumSegmentWidth = smartchartCoordinateTransformer.toW(info, this.minDistance);
                            if (minimumSegmentWidth > segmentWidth) {
                                segmentWidth = Math.ceil(minimumSegmentWidth / segmentWidth) * segmentWidth;
                            }
                            var from = Math.floor(info.horizontalRange.from / segmentWidth) * segmentWidth;;
                            for (var i = from; i < info.horizontalRange.to; i += segmentWidth) {
                                x = smartchartCoordinateTransformer.toDeviceX(info, i);
                                var style = {
                                    position: 'absolute',
                                    left: x
                                };
                                if (this.isFacingUp) {
                                    style.bottom = '0';
                                }
                                labels.push({
                                    style: style,
                                    value: i
                                });
                            };
                            var facingUpIdx = this.textClass.indexOf('facing-up');
                            if (this.isFacingUp) {
                                if (facingUpIdx < 0) {
                                    this.textClass.push('facing-up');
                                }
                            } else if (facingUpIdx >= 0) {
                                this.textClass.splice(facingUpIdx, 1);
                            }

                            this.labels = labels;
                        },
                        template: 'smartchartHorizontalRuler'
                    };
                }
            };
        }
    ])
    .service('smartchartRulerHelper', [
        'smartchartHorizontalRuler', function(smartchartHorizontalRuler) {
            return {
                dailyDateRuler: function(dailyTimeSeries) {
                    if (!dailyTimeSeries) {
                        return "";
                    }

                    var customHorizontalRuler = smartchartHorizontalRuler.generate(50, 10, false, function(x) {
                        var idx = Math.round(x);
                        if (this.dailyTimeSeries[idx]) {
                            var date = moment(this.dailyTimeSeries[idx].Timestamp);
                            return date.format("MMM D");
                        }
                        return "";
                    }, null, null, ['default-horizontal-guide-text', 'mini-text']);
                    customHorizontalRuler.dailyTimeSeries = dailyTimeSeries;
                    customHorizontalRuler.template = "smartchartHorizontalRulerDate";
                    customHorizontalRuler.labelFunction2 = function(x) {
                        var idx = Math.round(x);
                        if (this.dailyTimeSeries[idx]) {
                            var date = moment(this.dailyTimeSeries[idx].Timestamp);
                            return date.format("YYYY");
                        }
                        return "";
                    };
                    return customHorizontalRuler;
                }
            };
        }
    ])
    .run([
        '$templateCache', function($templateCache) {
            $templateCache.put('smartchartHorizontalRuler',
                '<div ng-class="localItem.htmlClass">' +
                '<div ng-repeat="label in localItem.labels" ng-class="localItem.rulerClass" ng-style="label.style"><div  ng-class="localItem.textClass">{{localItem.labelFunction(label.value)}}</div></div>' +
                '</div>');
        }
    ])
    .run([
        '$templateCache', function($templateCache) {
            $templateCache.put('smartchartHorizontalRulerDate',
                '<div ng-class="localItem.htmlClass">' +
                '<div ng-repeat="label in localItem.labels" ng-class="localItem.rulerClass" ng-style="label.style">' +
                '<div  ng-class="localItem.textClass">{{localItem.labelFunction(label.value)}}</div>' +
                '<div  ng-class="localItem.textClass">{{localItem.labelFunction2(label.value)}}</div>' +
                '</div>' +
                '</div>');
        }
    ])
    .run([
        '$templateCache', function($templateCache) {
            $templateCache.put('smartchartVerticalRuler',
                '<div ng-class="localItem.htmlClass">' +
                '<div ng-repeat="label in localItem.labels" ng-class="localItem.rulerClass" ng-style="label.style"><div  ng-class="localItem.textClass">{{localItem.labelFunction(label.value) | number:2}}</div></div>' +
                '</div>');
        }
    ]);
