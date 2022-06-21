
agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('smartchartPositionDragger', [
        'smartchartCoordinateTransformer', function(smartchartCoordinateTransformer) {
            return {
                generate: function(adjustmentCallback) {
                    return {
                        isDragging: false,
                        onViewChanged: function(info) {
                        },
                        startingDevicePosition: { x: -1, y: -1 },
                        latestDevicePosition: { x: -1, y: -1 },
                        startingPosition: { x: -1, y: -1 },
                        latestPosition: { x: -1, y: -1 },
                        lastInfo: null,
                        diff: null,
                        adjustmentCallback: adjustmentCallback,
                        onMousewheel: function(info, event) {
                            var multiplier = event.originalEvent.wheelDelta > 0 ? 1.05 : 0.95;
                            var range = info.horizontalRange.to - info.horizontalRange.from;
                            var mid = (info.horizontalRange.to + info.horizontalRange.from) / 2;
                            range = range * multiplier;
                            var from = mid - range / 2;
                            var to = mid + range / 2;
                            if (range > 4) {
                                var t = this;
                                info.updateSafely(function() {
                                    info.horizontalRange.from = from;
                                    info.horizontalRange.to = to;
                                    if (t.adjustmentCallback) {
                                        t.adjustmentCallback(info, null, 0.2);
                                    }
                                });

                            }
                        },
                        onMouseleave: function(info, event) {
                            this.isDragging = false;
                        },
                        onMousemove: function(info, event) {
                            if (this.isDragging) {
                                this.latestDevicePosition.x = event.offsetX;
                                this.latestDevicePosition.y = event.offsetY;
                                if (this.lastInfo) {
                                    var dxDevice = this.latestDevicePosition.x - this.startingDevicePosition.x;
                                    var dyDevice = this.latestDevicePosition.y - this.startingDevicePosition.y;
                                    var dx = smartchartCoordinateTransformer.toW(this.lastInfo, dxDevice);
                                    var dy = smartchartCoordinateTransformer.toH(this.lastInfo, dyDevice);
                                    var t = this;
                                    var effectiveness = 1 - Math.atan2(Math.abs(dyDevice), Math.abs(dxDevice)) * 2 / Math.PI;
                                    info.updateSafely(function() {
                                        info.horizontalRange.from = t.lastInfo.horizontalRange.from - dx;
                                        info.horizontalRange.to = t.lastInfo.horizontalRange.to - dx;
                                        info.verticalRange.from = t.lastInfo.verticalRange.from + dy;
                                        info.verticalRange.to = t.lastInfo.verticalRange.to + dy;

                                        if (t.adjustmentCallback) {
                                            t.adjustmentCallback(info, t.lastInfo, effectiveness * 0.2);
                                        }
                                    });
                                }
                            }
                        },
                        onMouseup: function(info, event) {
                            this.isDragging = false;
                        },
                        onMousedown: function(info, event) {
                            this.isDragging = true;
                            this.startingDevicePosition.x = event.offsetX;
                            this.startingDevicePosition.y = event.offsetY;
                            this.lastInfo = angular.copy(info);
                            this.startingPosition.x = smartchartCoordinateTransformer.toX(this.lastInfo, this.startingDevicePosition.x);
                            this.startingPosition.y = smartchartCoordinateTransformer.toY(this.lastInfo, this.startingDevicePosition.y);
                        },
                        pathH: '',
                        pathV: '',
                        template: null
                    };
                }
            };
        }
    ]);
