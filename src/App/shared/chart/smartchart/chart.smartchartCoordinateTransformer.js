agmNgModuleWrapper('agms.chart')
    .ngApp
    .service('smartchartCoordinateTransformer', function () {
    return {
        range: function (rangeObject) {
            return rangeObject.to - rangeObject.from;
        },
        toDeviceX: function (info, x) {
            return info.device.width * (x - info.horizontalRange.from) / this.range(info.horizontalRange);
        },
        toDeviceY: function (info, y) {
            return info.device.height * (1 - (y - info.verticalRange.from) / this.range(info.verticalRange));
        },
        toDeviceW: function (info, w) {
            return info.device.width * w / this.range(info.horizontalRange);
        },
        toDeviceH: function (info, h) {
            return info.device.height * h / this.range(info.verticalRange);
        },
        toX: function (info, deviceX) {
            return this.range(info.horizontalRange) * deviceX / info.device.width + info.horizontalRange.from;
        },
        toY: function (info, deviceY) {
            return this.range(info.verticalRange) * (1 - deviceY / info.device.height) + info.verticalRange.from;
        },
        toW: function (info, deviceW) {
            return this.range(info.horizontalRange) * deviceW / info.device.width;
        },
        toH: function (info, deviceH) {
            return this.range(info.verticalRange) * deviceH / info.device.height;
        }
    };
});
