agmNgModuleWrapper('agm.common')
    .defineDirectiveForE('agmc-pixel-positioning-popup', [],
        function (dep) {
            return {
                transclude: true,
                controller: "common.PixelPositioningController",
                templateUrl: '/App/common/directives/common.pixelPositioningSystem.html',
            };
        },
        {
        })
    .defineController('common.PixelPositioningController', ['commonPixelPositioningSystemService'],
        function (vm, dep, tool) {

            var commonPixelPositioningSystemService = dep.commonPixelPositioningSystemService;
            tool.setVmProperties({
                commonPixelPositioningSystemService: commonPixelPositioningSystemService,
                getPositionStyle: getPositionStyle,
                item: item
            });
            function item() {
                return commonPixelPositioningSystemService.currentActivePopup.item;
            }
            function getPositionStyle() {
                var ap = commonPixelPositioningSystemService.currentActivePopup;
                if (!ap || !ap.boundingBox) {
                    return {};
                } else {
                    switch (ap.ref) {
                        case 'pointer':
                            return {
                                left: ap.point.x,
                                top: ap.point.y,
                            }
                        case 'element':
                            var boundingBox = ap.boundingBox;
                            return {
                                top: boundingBox.top,
                                left: boundingBox.left,
                            }
                    }
                    return {};
                }
            }
        })
    .defineService("commonPixelPositioningSystemService", [], function (serviceObj, dep, tool) {
        tool.setServiceObjectProperties({
            showPopup: showPopup,
            closePopup:closePopup,
            currentActivePopup: null,
            start: start,
            evaluateActivePosition: evaluateActivePosition
        });

        function closePopup() {
            serviceObj.currentActivePopup = null;
        }

        function showPopup(obj) {

            serviceObj.currentActivePopup = obj;
            if (obj.event) {
                obj.element = obj.event.currentTarget;
                obj.point = {
                    x: obj.event.clientX,
                    y: obj.event.clientY + $(dep.$window).scrollTop()
                }
            }
            if (!obj.closeOn) {
                obj.closeOn = ['scroll', 'resize'];
            }
            evaluateActivePosition();
        }
        function evaluateActivePosition() {
            var currentActivePopup = serviceObj.currentActivePopup;
            if (!currentActivePopup) {
                return;
            }
            var element = $(currentActivePopup.element);
            if (!element) {
                return null;
            }
            if (!currentActivePopup.boundingBox) {
                currentActivePopup.boundingBox = {
                    getRelativeX: function (percentage) {
                        return this.offset.left + percentage / 100 * this.width;
                    },
                    getRelativeY: function (percentage) {
                        return this.offset.top + percentage / 100 * this.height;
                    }
                };

            }
            var offset = element.offset();
            currentActivePopup.boundingBox.top = offset.top; // - $(dep.$window).scrollTop();
            currentActivePopup.boundingBox.left = offset.left;
            currentActivePopup.boundingBox.width = element.outerWidth();
            currentActivePopup.boundingBox.height = element.outerHeight();
            currentActivePopup.boundingBox.right = currentActivePopup.boundingBox.width + currentActivePopup.boundingBox.left;
            currentActivePopup.boundingBox.bottom = currentActivePopup.boundingBox.height + currentActivePopup.boundingBox.top;
        }

        function start() {
            $(dep.$window).scroll(function () {
                if (serviceObj.currentActivePopup) {
                    if (serviceObj.currentActivePopup.closeOn.indexOf('scroll') >= 0) {
                        serviceObj.currentActivePopup = null;
                    }
                    evaluateActivePosition();
                }
            });
            $(dep.$window).resize(function () {
                if (serviceObj.currentActivePopup) {
                    if (serviceObj.currentActivePopup.closeOn.indexOf('resize') >= 0) {
                        serviceObj.currentActivePopup = null;
                    }
                    evaluateActivePosition();
                }
            });
        }
    });