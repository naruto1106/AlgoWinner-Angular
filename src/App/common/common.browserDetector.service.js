agmNgModuleWrapper('agm.common')
    .defineService('commonBrowserDetectorService', [], function(serviceObj, dep, tool) {
        tool.setServiceObjectProperties({
            getUserAgent: function() {
                return navigator.userAgent;
            },
            isiOS: function() {
                return /(iPad|iPhone|iPod)/gi.test(serviceObj.getUserAgent());
            },
            isAndroid: function() {
                return /(Android)/gi.test(serviceObj.getUserAgent());
            },
            isWindowsPhone: function() {
                return /(IEMobile)/gi.test(serviceObj.getUserAgent());
            },
            isBB10: function() {
                return /(BB10)/gi.test(serviceObj.getUserAgent());
            },
            isMobile :function() {
                return serviceObj.isiOS() || serviceObj.isAndroid() || serviceObj.isWindowsPhone() || serviceObj.isBB10();
            }
        });
    });
