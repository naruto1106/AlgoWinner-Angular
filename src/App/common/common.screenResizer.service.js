agmNgModuleWrapper('agm.common')
    .defineService('commonScreenResizerService', ['commonBrowserDetectorService'], function(serviceObj, dep, tool) {
        var $rootScope = dep.$rootScope;
        var lastDetectedAspectRatio = 0;
        var initialZoom = 1;
        var commonBrowserDetectorService = dep.commonBrowserDetectorService;

        serviceObj.updateIsOpenedFromMobileDevice = function() {
            serviceObj.isOpenedFromMobileDevice = serviceObj.checkIfOpenedFromMobileDevice();
        };
        serviceObj.checkIfOpenedFromMobileDevice = function() {
            return commonBrowserDetectorService.isAndroid() || commonBrowserDetectorService.isiOS()
                || commonBrowserDetectorService.isWindowsPhone() || commonBrowserDetectorService.isBB10()
                || dep.$window.screen.width < 600;
        };
        serviceObj.resetScreenSize = function() {

            var doc = document.querySelector("meta[name=viewport]");
            if (doc) {
                doc.setAttribute(
                    'content',
                    'width=device-width, initial-scale=1');
                $rootScope.$broadcast("screenSizeChanged");
            }
        };

        serviceObj.setFooterVisibility = function(val) {
            serviceObj.isFooterVisible = val;
        };
        serviceObj.setForceActualSize = function(val) {
            serviceObj.forceActualSize = val;
            serviceObj.reevaluateScreenSize();
            $rootScope.$broadcast("screenSizeChanged");
        };
        serviceObj.isShowingScaledScreenInMobileDevice = function() {
            return serviceObj.isOpenedFromMobileDevice && !serviceObj.forceActualSize;
        };
        serviceObj.isShowingActualMobileDevice = function() {
            return serviceObj.isOpenedFromMobileDevice && serviceObj.forceActualSize;
        };
        serviceObj.reevaluateScreenSize = function() {
            serviceObj.updateIsOpenedFromMobileDevice();

            if (serviceObj.isShowingScaledScreenInMobileDevice()) {
                setScreenForMobile();
            } else {
                serviceObj.resetScreenSize();
            }
        };

        function setScreenForMobile() {
            var originalWidth = 1200;
            var w = dep.$window;
            var screen = w.screen;
            var aspectRatio = screen.width / screen.height;
            var zoom = screen.width / originalWidth;
            initialZoom = zoom;

            tool.log("RESIZED to " + zoom);
            var str = 'width=' + originalWidth + 'px, initial-scale=' + zoom;
            document.querySelector("meta[name=viewport]").setAttribute('content', str);
        }
    });
