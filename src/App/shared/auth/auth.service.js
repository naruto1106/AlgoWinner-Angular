agmNgModuleWrapper('agms.auth')
    .defineService('sAuthService',
    ['coreApiServerAddress', 'commonFormUrlEncoderConfigFactory', 'coreDataStorageService'],
    function (serviceObj, dep, tool) {
        var $http = dep.$http,
            coreApiServerAddress = dep.coreApiServerAddress,
            commonFormUrlEncoderConfigFactory = dep.commonFormUrlEncoderConfigFactory,
            coreDataStorageService = dep.coreDataStorageService;

        function doLogin(request) {
            return $http.post(coreApiServerAddress + '/identity/connect/token', request, commonFormUrlEncoderConfigFactory);
        }
        function logout() {
            var request = {
                token: coreDataStorageService.get('token'),
                token_type_hint: "access_token",
                client_id: "am_webclient",
                client_secret: dep.coreConfigService.General.WebSecret
            };
            return $http.post(coreApiServerAddress + '/identity/connect/revocation', request, commonFormUrlEncoderConfigFactory);
        }
        function checkLoggedIn() {
            var token = coreDataStorageService.get('token');
            if (!token) {
                var deferred = tool.defer();
                deferred.reject();
                return deferred.promise;
            } else {
                return $http.get(coreApiServerAddress + '/identityapi/Authentication/IsLoggedIn', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });
            }
        }

        function refreshToken(request) {
            return $http.post(coreApiServerAddress + '/identity/connect/token', request, commonFormUrlEncoderConfigFactory);
        }
        function authenticateWithToken(token) {
            return $http.get(coreApiServerAddress + '/identityapi/Authentication/IsLoggedIn', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
        }

        tool.setServiceObjectProperties({
            Login: doLogin,
            Logout: logout,
            CheckLoggedIn: checkLoggedIn,
            RefreshToken: refreshToken,
            AuthenticateWithToken: authenticateWithToken
        });
    });
