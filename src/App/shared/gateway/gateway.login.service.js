agmNgModuleWrapper('agms.gateway')
    .defineService('sGatewayLoginService',
        ['commonFormUrlEncoderConfigFactory', 'sAuthService'],
        function(serviceObj, dep, tool) {

            var $rootScope = dep.$rootScope,
                coreAuthInterceptor = dep.coreAuthInterceptor,
                coreUserStateService = dep.coreUserStateService,
                coreAllSignalRService = dep.coreAllSignalRService,
                sAuthService = dep.sAuthService;

            var deferred = tool.defer();
            
            var revisedOnSuccess = function(res) {
                //$templateCache.removeAll();
                $rootScope.loggedInFromHere = true;
                coreUserStateService.saveToken(res.data.access_token, res.data.refresh_token);
                coreAllSignalRService.populateAllHubTokens(res.data.access_token);
                
                return coreAuthInterceptor.manageSingleSession(function() {
                    deferred.resolve(res.data);
                    return tool.when();
                }, function() {
                    return coreAuthInterceptor.tryShowKickedOutPopout("inactiveSession");
                }).then(function (status) {
                    var continueLogin = status === "ActiveThroughReconnect" || status === "InitiallyActive"; 
                    if (continueLogin) {
                        coreUserStateService.loadUser().then(function() {
                            deferred.resolve();
                        }, function() {
                            deferred.reject();
                        });
                    } else {
                        return deferred.reject('existing active session');
                    }
                });
            };

            var revisedOnSuccessWithoutLoading = function(res) {
                $rootScope.loggedInFromHere = true;
                coreUserStateService.saveToken(res.data.access_token, res.data.refresh_token);
                coreUserStateService.loadUser();
                coreAllSignalRService.populateAllHubTokens(res.data.access_token);
                deferred.resolve(res.data);
            };

            var revisedOnError = function(res) {
                coreUserStateService.deleteToken();
                deferred.reject(res.data);
            };

            function doLogin(userName, password, rememberMe, onSuccess, onError) {
                deferred = tool.defer();
                var request = {
                    username: userName,
                    password: password,
                    grant_type: 'password',
                    scope: "openid profile roles offline_access read write",
                    client_id: "am_webclient",
                    client_secret: dep.coreConfigService.General.WebSecret
                };

                sAuthService.Login(request).then(onSuccess, onError);
                return deferred.promise;
            };
            
            function start(userName, password, rememberMe) {
                return doLogin(userName, password, rememberMe, revisedOnSuccess, revisedOnError);
            }

            function login(userName, password, rememberMe) {
                return doLogin(userName, password, rememberMe, revisedOnSuccessWithoutLoading, revisedOnError);
            }

            tool.setServiceObjectProperties({
                start: start,
                login: login,
            });
        }
    )
    .defineConstant('sGatewayLoginState', { empty: 0, authenticating: 1, success: 2, error: 3 });