agmNgModuleWrapper('agm.core')
    .defineServiceStrict('coreAllSignalRService', ['coreSignalRMarketDataService', 'coreSignalRNotificationService'],
    function (serviceObj, dep, tool) {
        var coreSignalRMarketDataService = dep.coreSignalRMarketDataService,
            coreSignalRNotificationService = dep.coreSignalRNotificationService;

        serviceObj.populateAllHubTokens = function (token) {
            coreSignalRMarketDataService.populateHubToken();
            coreSignalRNotificationService.populateHubToken(token);
        };

        serviceObj.setInactive = function (token) {
            coreSignalRMarketDataService.setInactive();
            coreSignalRNotificationService.setInactive(token);
        };
    })
    .defineServiceStrict('coreSignalRMarketDataService',
    ['coreMarketDataServerAddress', 'coreServerCommunicationService', 'coreMarketDataServerAddressDelayed',
     'signalRHubFactory', 'coreDataStorageService'],
    function (serviceObj, dep, tool) {

        var signalRHubFactory = dep.signalRHubFactory,
            coreMarketDataServerAddress = dep.coreMarketDataServerAddress,
            coreServerCommunicationService = dep.coreServerCommunicationService,
            coreMarketDataServerAddressDelayed = dep.coreMarketDataServerAddressDelayed,
            coreDataStorageService = dep.coreDataStorageService;

        var mdHubs = {
            "US:": null,
            "SG": null,
            "RT": null
        };
        var realTimeHub;
        var delayedHub;
        var realTimeHubInitializedDeferred = tool.defer();
        var delayedHubInitializedDeferred = tool.defer();

        function isAllowedToGetMarketData() {
            return coreServerCommunicationService.genGetFunctionWithNVar('/marketdataapi/v1/MarketData/GetTokenForRealTimeData')();
        }

        var hubInitialized = tool.defer();

        function populateHubToken() {
            isAllowedToGetMarketData().then(function (res) {
                var marketDataServerToken = coreDataStorageService.get('token');
                var hasAnyDelayed = _.findKey(res.data.TradeVenueRealTimeSubscription, function (r) { return !r; });

                realTimeHub = signalRHubFactory('MarketDataHub', {}, marketDataServerToken, coreMarketDataServerAddress, true);
                realTimeHub.connectionStart.done(function () {
                    tool.log("Login to Real Time Market Data Server successfully");
                    realTimeHubInitializedDeferred.resolve();
                });

                //always give realtime hub for order pad, unrealized P/L...
                mdHubs["RT"] = realTimeHub;

                if (hasAnyDelayed) {
                    delayedHub = signalRHubFactory('MarketDataHub', {}, marketDataServerToken, coreMarketDataServerAddressDelayed, true);
                    delayedHub.connectionStart.done(function () {
                        tool.log("Login to Delayed Market Data Server successfully");
                        delayedHubInitializedDeferred.resolve();
                    });
                } else {
                    delayedHubInitializedDeferred.resolve();
                }

                for (var tv in res.data.TradeVenueRealTimeSubscription) {
                    if (res.data.TradeVenueRealTimeSubscription.hasOwnProperty(tv)) {
                        var isRealTime = res.data.TradeVenueRealTimeSubscription[tv];
                        mdHubs[tv] = isRealTime ? realTimeHub : delayedHub;
                    }
                }

                tool.onceAll([realTimeHubInitializedDeferred.promise, delayedHubInitializedDeferred.promise])
                    .then(function () {
                        hubInitialized.resolve();
                    });
            }, function () {
                tool.log("Login to Real Time Market Data Server failed");
            });
        };

        serviceObj.turnOn = function (tradeVenue, eventName, callback) {
            hubInitialized.promise.then(function () {
                if (mdHubs[tradeVenue])
                    mdHubs[tradeVenue].on(eventName, callback);
            });
        };

        serviceObj.turnOff = function (tradeVenue, eventName, callback) {
            hubInitialized.promise.then(function () {
                if (mdHubs[tradeVenue])
                    mdHubs[tradeVenue].off(eventName, callback);
            });
        };

        serviceObj.setInactive = function () {
            if (delayedHub) {
                delayedHub.setInactive();
            }
            if (realTimeHub) {
                realTimeHub.setInactive();
            }
        };

        serviceObj.invoke = function () {
            var tradeVenue = arguments[0];
            if (!mdHubs[tradeVenue])
                return dep.$q.when(null);

            var args = Array.prototype.slice.call(arguments, 1);
            return hubInitialized.promise.then(function () {
                return mdHubs[tradeVenue].invoke.apply(serviceObj, args);
            });
        };

        serviceObj.populateHubToken = populateHubToken;

        serviceObj.subscribeRealTimeMarketDataMultiple = function(products) {
            serviceObj.invoke("RT", "SubscribeMarketDataMultiple", products).then(function () {
                tool.log("Subscribed to Market Data Multiple for " + products.length + " products.");
            }, function () {
                tool.logError("Error invoking get Market Data Multiple for " + products.length + " products.");
            });
        }

        serviceObj.unSubscribeRealTimeMarketDataMultiple = function (products) {
            serviceObj.invoke("RT", "UnsubscribeMarketDataMultiple", products).then(function () {
                tool.log("Unsubscribed to Market Data Multiple for " + products.length + " products.");
            }, function () {
                tool.logError("Error invoking UnsubscribeMarketDataMultiple for " + products.length + " products.");
            });
        }
    })
    .defineServiceStrict('coreSignalRNotificationService', ['signalRHubFactory', 'coreApiServerAddress'],
    function (serviceObj, dep, tool) {
        var hubName = 'algoHub';
        var path = '/nssignalr';
        var coreApiServerAddress = dep.coreApiServerAddress,
            signalRHubFactory = dep.signalRHubFactory;
        var $rootScope = dep.$rootScope;

        serviceObj.hubInitialized = tool.defer();
        serviceObj.populateHubToken = function (token) {
            serviceObj.hubInitialized = tool.defer();
            serviceObj.HubProxy = signalRHubFactory(hubName, {}, token, coreApiServerAddress + path, false);

            serviceObj.HubProxy.connectionStart.done(function () {
                serviceObj.hubInitialized.resolve();
                serviceObj.HubProxy.invoke('ListenToAllRelevantUserEvents').then(function (res) {
                    tool.log("Invoke successful!");
                }, function (res) {
                    tool.log("Invoke failed!");
                });
            });

            serviceObj.HubProxy.connection.stateChanged(function (state) {
                $rootScope.$evalAsync(function () {
                    $rootScope.$broadcast('signalRStatusChanged', state.newState);
                });
            });
            serviceObj.HubProxy.connection.disconnected(function (state) {
                $rootScope.$evalAsync(function () {
                    //$rootScope.$broadcast('signalRStatusDisconnected');
                    if (serviceObj.HubProxy.connection.lastError) {
                        tool.logWarn("SignalR Disconnected. Reason: " + serviceObj.HubProxy.connection.lastError.message);
                    }
                    tool.logWarn("SignalR Disconnected, restarting...");
                    setTimeout(function () {
                        serviceObj.HubProxy.connection.start();
                    }, 5000); // Restart connection after 5 seconds.
                });
            });
        };

        serviceObj.events = [];

        serviceObj.turnOn = function (eventName, callback) {
            serviceObj.hubInitialized.promise.then(function () {
                serviceObj.HubProxy.on(eventName, callback);
            });
            serviceObj.events.push({ name: eventName, callback: callback });
        };

        serviceObj.setInactive = function () {
            serviceObj.HubProxy.setInactive();
        };

        serviceObj.turnOff = function (eventName, callback) {
            _.remove(serviceObj.events, function (elem) {
                return elem.name === eventName && elem.callback === callback;
            });
            serviceObj.hubInitialized.promise.then(function () {
                serviceObj.HubProxy.off(eventName, callback);
            });
        };

        serviceObj.invoke = function () {
            var args = arguments;
            return serviceObj.hubInitialized.promise.then(function () {
                return serviceObj.HubProxy.invoke.apply(serviceObj, args);
            });
        };

        $rootScope.$watch(function () { return serviceObj.HubProxy; }, function (oldAlgoHub, newAlgoHub) {
            serviceObj.events.forEach(function (elem) {
                if (oldAlgoHub) {
                    oldAlgoHub.off(elem.name, elem.callback);
                }
                if (newAlgoHub) {
                    newAlgoHub.on(elem.name, elem.callback);
                }
            });
        }, false);
    })
    .defineFactoryStrict('signalRHubFactory', [], function (dep, tool) {
        var $rootScope = dep.$rootScope;

        return function (hubName, startOptions, accessToken, coreApiServerAddress, useDefaultPath) {
            var connection = $.hubConnection(coreApiServerAddress, { qs: "Bearer=" + accessToken, useDefaultPath: useDefaultPath });
            var proxy = connection.createHubProxy(hubName);

            connection.connectionSlow(function () {
                tool.logInfo('Slow Connection on ' + hubName + ' detected!');
            });
            connection.reconnecting(function () {
                tool.logInfo("Reconnecting " + hubName);
            });
            connection.reconnected(function () {
                tool.logInfo("Reconnected " + hubName);
            });
            connection.disconnected(function () {
                tool.logInfo("Disconnected from " + hubName);
            });

            // Add hack to make sure qs bearer token invoked
            proxy.on('anything', function () { });

            proxy.on("SignalRKeepAlive", function () {
                tool.log("Algo Hub SignalRKeepAlive received!");
            });

            var connectionStart = connection.start(startOptions);

            // the events coming from signalR might have many arguments
            function rxSignalREventSelector(args) {
                return arguments;
            }

            var existingSubscriptions = {};
            var existingSource = {};
            var obj = {
                callbacksDictionary: {},
                isActive: true,
                on: function (eventName, callback) {
                    if (existingSubscriptions[eventName] === callback) {
                        return;
                    }

                    // PD - 1556 SignalR Jquery library treats callbacks with the same function body as one thing.
                    // Since our RxJS callback body is all the same, we need to make sure that the event source is created once
                    // per-eventName, and the event source should only be disposed when all subscriptions are disposed. 
                    // RxJS observable by default already behaves that way; delHandler is executed only after all subscriptions are disposed
                    if (!existingSource[eventName]) {
                        var source = Rx.Observable.fromEventPattern(
                            function addHandler(h) { proxy.on(eventName, h); },
                            function delHandler(h) { proxy.off(eventName, h); },
                            rxSignalREventSelector
                        ).bufferWithTime(200);
                        existingSource[eventName] = source;
                    }

                    var that = this;

                    var subscription = existingSource[eventName]
                        .subscribe(function (evts) {
                            if (!evts || evts.length === 0) {
                                return;
                            }

                            // PD-1526 [NotificationServer] When there are > 1 Notification Server instances, events might be received out of order in the client
                            // there is special property called __ts that is passed by Notification Server
                            evts = _.sortBy(evts, function (args) { return args[0].__ts; });
                            $rootScope.$evalAsync(function () {
                                for (var i = 0; i < evts.length; i++) {
                                    if (callback && obj.isActive) {
                                        callback.apply(that, evts[i]);
                                    }
                                }
                            });
                        });

                    this.callbacksDictionary[callback] = subscription;
                    existingSubscriptions[eventName] = callback;
                },
                off: function (eventName, callback) {
                    var subscription = this.callbacksDictionary[callback];
                    if (!subscription) {
                        return;
                    }
                    subscription.dispose();
                },
                setInactive: function () {
                    obj.isActive = false;
                },
                offAll: function () {
                    for (var eventName in existingSubscriptions) {
                        if (existingSubscriptions.hasOwnProperty(eventName)) {
                            var callback = existingSubscriptions[eventName];
                            this.off(eventName, callback);
                        }
                    }
                },
                invoke: function () {
                    var deferred = tool.defer();
                    var args = Array.prototype.slice.call(arguments);
                    var foo = proxy.invoke.apply(proxy, args);
                    foo.done(function (result) {
                        $rootScope.$evalAsync(function () {
                            deferred.resolve(result);
                        });
                    }).fail(function (result) {
                        $rootScope.$evalAsync(function () {
                            deferred.reject(result);
                        });
                    });
                    return deferred.promise;
                },
                connection: connection,
                connectionStart: connectionStart
            };
            return obj;
        };
    });