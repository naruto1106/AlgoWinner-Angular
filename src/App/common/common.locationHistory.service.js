agmNgModuleWrapper('agm.common')
    .defineService('commonLocationHistoryService', [],
        function (serviceObj, dep, tool) {
            serviceObj.locationHistory = [];
            serviceObj.goBack = function (which) {
                which = which || 0;
                var idx = serviceObj.locationHistory.length - which - 1;
                if (serviceObj.locationHistory.length <= idx || !serviceObj.locationHistory[idx]) {
                    return;
                }
                var path = serviceObj.locationHistory[idx];
                var afterSharp = path.split('#')[1];
                if (afterSharp.indexOf('?') > -1) {
                    afterSharp = afterSharp.split('?')[0];
                }
                dep.$location.path(afterSharp);
            }
            serviceObj.go = function (path, search) {
                if (search) {
                    dep.$location.search(search);
                }
                dep.$location.path(path);
            }
            serviceObj.goToNewTabRelative = function (path) {
                var url = dep.$location.absUrl();
                path = url + path;
                dep.$window.open(path, '_blank');
            }
            serviceObj.goToNewTab = function (path) {
                dep.$window.open(path, '_blank');
            }
        })