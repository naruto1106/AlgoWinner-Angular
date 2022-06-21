agmNgModuleWrapper("agms.gateway")
    .defineService("sGatewaySessionService", [],
        function (serviceObj, dep, tool) {

            var coreDataStorageService = dep.coreDataStorageService,
                coreAuthInterceptor = dep.coreAuthInterceptor,
                coreServerCommunicationService = dep.coreServerCommunicationService;

            function keepSession(sessionId) {
                coreDataStorageService.set("session_id", sessionId);
                coreDataStorageService.set("active_session_id", sessionId);
                tool.log("This session is active and set");
            }

            function setAsActiveSessionAndKeepSession() {
                return serviceObj.SetAsActiveSession().then(function (res) {
                    keepSession(res.data.SessionId);
                });
            }

            function manageSingleSessionWithPopup() {
                return coreAuthInterceptor.manageSingleSession(null, function() {
                        return coreAuthInterceptor.tryShowKickedOutPopout("inactiveSession");
                    })
                    .then(function (status) {
                        switch (status) {
                        case "Failed":
                            coreAuthInterceptor.handleReloadOrLogout(false);
                            break;
                        case "ActiveThroughReconnect":
                            coreAuthInterceptor.handleReloadOrLogout(true);
                            break;
                        }
                    });
            }

            function removeActiveSessionAndCleanState() {
                return serviceObj.RemoveMyCurrentSession().then(function (res) {
                    coreDataStorageService.set("session_id", null);
                });
            }
            
            var sessionManagerPrefix = '/identityapi/SessionManager';
            
            tool.setServiceObjectProperties({
                keepSession: keepSession,
                manageSingleSessionWithPopup: manageSingleSessionWithPopup,
                setAsActiveSessionAndKeepSession: setAsActiveSessionAndKeepSession,
                SetAsActiveSession: coreServerCommunicationService.genPostFunction(sessionManagerPrefix + '/SetAsActiveSession'),
                RemoveMyCurrentSession: coreServerCommunicationService.genPostFunction(sessionManagerPrefix + '/RemoveMyCurrentSession'),
                TryGetActiveSession: coreServerCommunicationService.genGetFunctionWithNVarArguments(sessionManagerPrefix + '/TryGetActiveSession'),
                removeActiveSessionAndCleanState: removeActiveSessionAndCleanState
            });
        }
    );