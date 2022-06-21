agmNgModuleWrapper('agms.image')
    .defineDirectiveForE('agms-image-cropper', [], function(dep, tool) {
        return {
            link: function(scope, element, attrs, controller) {
                function safeMultiply(value, multiplier) {
                    return Math.max(1, Math.floor(value * multiplier));
                }

                var jqueryElement = angular.element(element);
                var images = jqueryElement.find("img");
                var topLeftCropping = { top: 0, left: 0 };
                images.draggable({
                    containment: "parent",
                    start: function(evt, ui) {
                    },
                    stop: function (evt, ui) {
                        tool.timeout(function () {
                            topLeftCropping = ui.position;
                            generateCroppedImage();
                        });
                    }
                });
                var aspectRatio = function() {
                    if (this.height === 0) {
                        return 0;
                    }
                    return this.width / this.height;
                };
                var targetDimension = { width: 0, height: 0, aspectRatio: aspectRatio };
                var originalDimension = { width: 0, height: 0, aspectRatio: aspectRatio };
                var adjustedDimension = { width: 0, height: 0, aspectRatio: aspectRatio };

                scope.$watch('imageSource', function(val) {
                    delete scope.imageStyle.width;
                    delete scope.imageStyle.height;
                });
                var imageDom = images[0];

                function generateCroppedImage() {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext("2d");
                    canvas.width = targetDimension.width;
                    canvas.height = targetDimension.height;
                    var multiplier = originalDimension.width / adjustedDimension.width;
                    var dw = Math.abs(adjustedDimension.width - targetDimension.width);
                    var dh = Math.abs(adjustedDimension.height - targetDimension.height);

                    var tempCanvas = null;
                    var item = imageDom;
                    var count = 2;

                    do {
                        var originalWidth = safeMultiply(adjustedDimension.width, multiplier);
                        var originalHeight = safeMultiply(adjustedDimension.height, multiplier);
                        if (multiplier > 2.5) {
                            multiplier /= 2;
                        } else {
                            multiplier = 1;
                        }
                        var newWidth = safeMultiply(adjustedDimension.width, multiplier);
                        var newHeight = safeMultiply(adjustedDimension.height, multiplier);
                        var newTempCanvas = document.createElement('canvas');
                        var newTempCtx = newTempCanvas.getContext("2d");
                        newTempCanvas.width = newWidth;
                        newTempCanvas.height = newHeight;
                        newTempCtx.drawImage(item,
                            0, 0, originalWidth, originalHeight,
                            0, 0, newWidth, newHeight);
                        tempCanvas = newTempCanvas;
                        item = tempCanvas;
                        count--;
                    } while (multiplier > 1);
                    ctx.drawImage(tempCanvas,
                        (dw - topLeftCropping.left), (dh - topLeftCropping.top),
                        canvas.width, canvas.height,
                        0, 0,
                        canvas.width, canvas.height
                    );

                    try {
                        var source = canvas.toDataURL();
                        scope.croppedSource = source;
                        scope.onImageCropped({ result: scope.croppedSource });
                    } catch (e) {

                    };
                };

                imageDom.addEventListener("load", function(e) {
                    originalDimension.width = imageDom.width;
                    originalDimension.height = imageDom.height;

                    var originalAspectRatio = originalDimension.aspectRatio();
                    var targetAspectRatio = targetDimension.aspectRatio();

                    if (originalAspectRatio > targetAspectRatio) {
                        adjustedDimension.height = targetDimension.height;
                        adjustedDimension.width = adjustedDimension.height * originalAspectRatio;
                    } else {
                        adjustedDimension.width = targetDimension.width;
                        adjustedDimension.height = adjustedDimension.width / originalAspectRatio;
                    }
                    var dw = Math.abs(adjustedDimension.width - targetDimension.width);
                    var dh = Math.abs(adjustedDimension.height - targetDimension.height);

                    tool.timeout(function () {
                        scope.imageStyle.width = adjustedDimension.width + "px";
                        scope.imageStyle.height = adjustedDimension.height + "px";
                        scope.imageStyle.left = (dw / 2) + "px";
                        scope.imageStyle.top = (dh / 2) + "px";
                        topLeftCropping.left = (dw / 2);
                        topLeftCropping.top = (dh / 2);
                        scope.containerStyle.width = (targetDimension.width + 2 * dw) + "px";
                        scope.containerStyle.height = (targetDimension.height + 2 * dh) + "px";
                        scope.containerStyle.left = (dw * -1) + "px";
                        scope.containerStyle.top = (dh * -1) + "px";
                        generateCroppedImage();
                    });
                }, false);

                scope.frameStyle = {
                    position: "relative",
                    display: "block",
                    overflow: 'hidden'
                };
                scope.containerStyle = {
                    position: "relative",
                    display: "block"
                };
                scope.imageStyle = {
                    position: "relative",
                    display: "block"
                };

                scope.$watch('width', function(val) {
                    targetDimension.width = val;
                    scope.frameStyle.width = val + "px";
                });
                scope.$watch('height', function(val) {
                    targetDimension.height = val;
                    scope.frameStyle.height = val + "px";
                });
            },
            template:
                '<div ng-style="frameStyle">' +
                    '   <div ng-style="containerStyle">' +
                    '       <img ng-style="imageStyle" ng-src="{{imageSource}}"></img>' +
                    '   </div>' +
                    '</div>'
        };
    }, {
        imageSource: '=',
        width: '=',
        height: '=',
        onImageCropped: '&'
    });