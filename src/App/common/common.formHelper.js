agmNgModuleWrapper('agm.common')
    .ngApp
    .factory('commonFormUrlEncoderFactory', function() {
        return function(obj) {
            if (!angular.isObject(obj)) {
                return (obj == null) ? "" : obj.toString();
            }
            var str = [];
            for (var p in obj) {
                if (!obj.hasOwnProperty(p)) {
                    continue;
                }
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        };
    })
    .factory('commonFormUrlEncoderConfigFactory', [
        'commonFormUrlEncoderFactory', function(commonFormUrlEncoderFactory) {
            return {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                transformRequest: commonFormUrlEncoderFactory
            };
        }
    ]);