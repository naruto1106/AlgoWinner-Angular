agmNgModuleWrapper('agms.gateway')
    .defineService('sGatewayTokenRefreshService', [
        'coreUserStateService', 'coreDataStorageService', 'sAuthService'
        ],
        function(serviceObj, dep, tool) {
            var coreUserStateService = dep.coreUserStateService,
                coreDataStorageService = dep.coreDataStorageService,
                sAuthService = dep.sAuthService;

            function tokenIsInActive() {
                sAuthService.CheckLoggedIn().then(function (e) {
                    // Inactive / invalid token would've returned as HTTP 401
                    return false;
                }, function (e) {
                    tool.logWarn("Invalid token, status: " + e);
                    return true;
                });
            }

            function start() {
                tool.interval(function () {
                    if (tokenIsInActive()) {
                        return;
                    }

                    if (coreDataStorageService.get("refresh_token")) {
                        var request = {
                            refresh_token: coreDataStorageService.get("refresh_token"),
                            grant_type: 'refresh_token',
                            client_id: "am_webclient",
                            client_secret: dep.coreConfigService.General.WebSecret
                        };
                        sAuthService.RefreshToken(request).then(function (res) {
                            coreUserStateService.saveToken(res.data.access_token, res.data.refresh_token);
                        }, function (res) {
                            // Do nothing for now. Just because you fail to refresh now doesn't mean you cannot refresh later.                            
                        });
                    }
                    },
                    // do it every 10 min                
                    10 * 60 * 1000
                );
            };

            serviceObj.start = start;
        }
    )