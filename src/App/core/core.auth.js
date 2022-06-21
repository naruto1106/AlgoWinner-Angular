agmNgModuleWrapper('agm.core')
    .ngApp
    .service('coreAuthInterceptor', [
        '$rootScope', '$q', '$window', '$injector', '$templateCache', '$log',
        function ($rootScope, $q, $window, $injector, $templateCache) {

            var apiServerEndpoints = ["/api/", "/signalr/", "/identity/", "/marketalertapi/", "/omsapi/", "/tpmsapi/", "/mantpmsapi/",
                "/identityapi/", "/productapi/", "/chartapi/v1/", "/marketinfoapi/v1/", "/nsapi/", "/peapi/v2/", "/acadapi/v1/",
                "/tgpsapi/v1/", "/tgpsapi/v2/", "/payapi/v1/", "/historicalapi/v1/", "/mkapi/v1/", "/communityapi/v1/", "/bktestapi/v1/",
                "/marketdataapi/v1/", "/userinfoapi/", "/subapi/v1/", "/stgapi/v1/", "/oracleapi/v1/"];

            function isApiServerEndpoint(url) {
                return _.any(apiServerEndpoints, function (ep) {
                    return url.indexOf(ep) === 0;
                });
            }

            function getProvider(label) {
                return $injector.get(label);
            }

            var interceptor = {
                request: function (config) {
                    var coreApiServerAddress = getProvider("coreApiServerAddress");
                    if (coreApiServerAddress) {
                        if (config.url.indexOf(coreApiServerAddress) !== 0) {
                            return config;
                        }
                    } else {
                        if (!isApiServerEndpoint(config.url)) {
                            return config;
                        }
                    }

                    config.headers = config.headers || {};

                    var coreServerVersion = getProvider("coreServerVersion");
                    var coreDataStorageService = getProvider("coreDataStorageService");

                    config.headers.ServerVersion = coreServerVersion.getCurrentVersion();

                    if (coreDataStorageService.get("token") && config.url.indexOf("/identity/connect/") === -1) {
                        config.headers.Authorization = 'Bearer ' + coreDataStorageService.get("token");

                        // For Analytic purpose, this will be will be logged by Nginx
                        if (coreDataStorageService.get('userId')) {
                            config.headers['X-User-Id'] = coreDataStorageService.get('userId');
                        }
                    }

                    if (coreDataStorageService.get("session_id")) {
                        config.headers.SessionId = coreDataStorageService.get("session_id");
                    }

                    if (config.method === 'GET') {
                        // force the browser to not cache XHR
                        if (!config.params) {
                            config.params = {
                                '_': new Date().getTime()
                            };
                        } else {
                            config.params['_'] = new Date().getTime();
                        }
                    }
                    return config;
                },
                logout: function () {
                    var sAuthService = getProvider("sAuthService");
                    var coreUserStateService = getProvider("coreUserStateService");
                    var sGatewaySessionService = getProvider("sGatewaySessionService");
                    var coreDataStorageService = getProvider("coreDataStorageService");

                    var removeSessionPromise = $q.when();
                    if (coreDataStorageService.get("token")) {
                        removeSessionPromise = sGatewaySessionService.removeActiveSessionAndCleanState();
                    }
                    return removeSessionPromise.finally(function () {
                        return sAuthService.Logout().then(function () {
                            coreUserStateService.deleteToken();
                            interceptor.clearCache();
                            $window.location.href = '/';
                        }, function (res) {
                            var coreNotificationService = getProvider("coreNotificationService");
                            coreNotificationService.notifyError("Failed to logout", "We failed to log you out. Contact us if problem persists");
                        });
                    });

                },
                forceLogout: function () {
                    var coreUserStateService = getProvider("coreUserStateService");
                    //Launch login window
                    interceptor.login().then(function () {
                        interceptor.isAttemptingLogin = false;
                        coreUserStateService.hasPendingLogoutConfirmation = false;
                    }, function () {
                        interceptor.logout().then(function () {
                            interceptor.isAttemptingLogin = false;
                        });
                    });
                },
                isAttemptingLogin: false,
                attemptRelogin: function (callback) {
                    var coreUserStateService = getProvider("coreUserStateService");
                    if (interceptor.isAttemptingLogin) {
                        return;
                    }
                    interceptor.isAttemptingLogin = true;
                    coreUserStateService.hasPendingLogoutConfirmation = true;
                    interceptor.forceLogout();
                },
                rebootAngular: function (callback) {
                    interceptor.logout().then(function () {
                        interceptor.clearCache();
                        interceptor.clearLocalStorage();
                        interceptor.login();
                    });
                },
                clearCache: function () {
                    $templateCache.removeAll();
                },
                clearLocalStorage: function () {
                    var coreDataStorageService = getProvider("coreDataStorageService");
                    coreDataStorageService.clearAll();
                },
                login: function () {
                    var $uibModal = getProvider("$uibModal");
                    return agmNgModuleWrapperUtils.openModalByDefinition($uibModal, 's.gateway.LoginPopupController', {
                        showRegister: false,
                        canDismiss: false
                    }).result;
                },
                sessionModalInstance: null,
                checkOnKickedOut: function () {
                    var coreDataStorageService = getProvider("coreDataStorageService");
                    var sessionId = coreDataStorageService.get("session_id") ? coreDataStorageService.get("session_id") : null;
                    var activeSessionId = coreDataStorageService.get("active_session_id") ? coreDataStorageService.get("active_session_id") : null;
                    // sessionId null is a special case. 
                    var notActiveSession = sessionId !== null && (activeSessionId !== sessionId || !activeSessionId);
                    if (notActiveSession) {
                        return interceptor.tryShowKickedOutPopout('kickedOut').then(interceptor.handleReconnectOrLogout);
                    }
                },
                handleReconnectOrLogout: function (reconnect) {
                    var sGatewaySessionService = getProvider("sGatewaySessionService");
                    if (reconnect) {
                        sGatewaySessionService.setAsActiveSessionAndKeepSession().finally(function () {
                            $window.location.reload(true);
                        });
                    } else {
                        interceptor.logout();
                    }
                },
                handleReloadOrLogout: function (reload) {
                    if (reload) {
                        $window.location.reload(true);
                    } else {
                        interceptor.logout();
                    }
                },
                tryShowKickedOutPopout: function (popoutType) {
                    var $uibModal = getProvider("$uibModal");

                    var coreAllSignalRService = getProvider("coreAllSignalRService");
                    coreAllSignalRService.setInactive();
                    if (!interceptor.sessionModalInstance) {
                        interceptor.sessionModalInstance = agmNgModuleWrapperUtils.openModalByDefinition($uibModal, "s.header.KickedOutPopUpController", {
                            popUpType: popoutType
                        }).result;
                        interceptor.sessionModalInstance.finally(function () {
                            interceptor.sessionModalInstance = null;
                        });
                    }
                    return interceptor.sessionModalInstance;
                },
                onActivateSessionTriedDeferred: $q.defer(),
                handleNonOkScenario: function (res) {
                    if (res.status === 409) {
                        if (res && res.data && res.data.Message && _.includes(res.data.Message, "Session is inactive")) {
                            interceptor.onActivateSessionTriedDeferred.promise.then(function () {
                                var coreDataStorageService = getProvider("coreDataStorageService");
                                coreDataStorageService.set("active_session_id", null);
                                interceptor.tryShowKickedOutPopout("inactiveSession").then(interceptor.handleReconnectOrLogout);
                            });
                        } else {
                            var coreServerVersion = getProvider("coreServerVersion");
                            if (coreServerVersion.getCurrentVersion() === res.data.CurrentServerVersion) {
                                return;
                            }
                            coreServerVersion.setNewVersion(res.data.CurrentServerVersion);
                            var coreNotificationService = getProvider("coreNotificationService");
                            var nmh = coreNotificationService.notifyWarning("Version Changed", "You need to login again due to application version changes")
                                .result.then(function () {
                                    interceptor.rebootAngular();
                                });
                        }
                    }
                    if (res.status === 401) {
                        interceptor.attemptRelogin();
                        return res || $q.when(res);
                    }
                },
                manageSingleSession: function (onSuccessfullyTakingSession, onFailedTakingSession) {
                    var sGatewaySessionService = getProvider("sGatewaySessionService");
                    var returnWhen = function (flag) {
                        return function () {
                            return $q.when(flag);
                        }
                    };

                    onSuccessfullyTakingSession = onSuccessfullyTakingSession || returnWhen(true);
                    onFailedTakingSession = onFailedTakingSession || returnWhen(false);
                    var p = sGatewaySessionService.TryGetActiveSession().then(function (res) {
                        if (res.data) {
                            return onSuccessfullyTakingSession().then(function () {
                                sGatewaySessionService.keepSession(res.data.SessionId);
                                return "InitiallyActive";
                            });
                        } else {
                            // give second chance to reconnect
                            return onFailedTakingSession().then(function (retry) {
                                if (retry) {
                                    return sGatewaySessionService.setAsActiveSessionAndKeepSession()
                                        .then(function () {
                                            return "ActiveThroughReconnect";
                                        }, function () {
                                            return "Failed";
                                        });
                                } else {
                                    return "Failed";
                                }
                            });
                        }
                    });
                    p.finally(function () {
                        onActivateSessionTriedDeferred.resolve();
                    });
                    return p;
                },
                response: function (res) {
                    interceptor.checkSessionPromotion(res);
                    interceptor.handleNonOkScenario(res);
                    return res || $q.when(res);
                },
                checkSessionPromotion: function (res) {
                    if (res.headers && res.headers.newlyPromotedActiveSession) {
                        var sGatewaySessionService = getProvider("sGatewaySessionService");
                        sGatewaySessionService.keepSession(res.headers.newlyPromotedActiveSession);
                    }
                },
                responseError: function (res) {
                    var url = res.config.url;
                    var coreApiServerAddress = getProvider("coreApiServerAddress");
                    if (coreApiServerAddress) {
                        if (url.indexOf(coreApiServerAddress) !== 0) {
                            return res;
                        }
                    } else {
                        if (!isApiServerEndpoint(url)) {
                            return res;
                        }
                    }
                    interceptor.handleNonOkScenario(res);
                    return $q.reject(res);
                }
            };
            return interceptor;
        }
    ])
    .factory('miniProfilerInterceptor', [
        '$q', function ($q) {
            return {
                'response': function (response) {
                    if (typeof (MiniProfiler) != 'undefined') {
                        var stringIds = response.headers('X-MiniProfiler-Ids');
                        if (stringIds) {
                            var strId = stringIds.split(", ")[0];
                            MiniProfiler.fetchResultsExposed(angular.fromJson(strId));
                        }
                    }
                    return response || $q.when(response);
                }
            };
        }
    ])
    .config([
        '$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('coreAuthInterceptor');
            //$httpProvider.interceptors.push('miniProfilerInterceptor');
        }
    ]);