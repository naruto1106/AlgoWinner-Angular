agmNgModuleMemory = {
    testables: {},
    popupDefinitions: {},
    templatePairingDefinitions: {},
    promisedEvents: {},
    controllerMapper: {},
    serviceMapper: {},
    factoryMapper: {},
    uiStates: {}
};

var exportedModule = null;
try {
    module.exports = {};
    exportedModule = module.exports;
} catch (e) {
}

agmNgModuleWrapperUtils = {
    getModalConfigDefinition: function (name) {
        var def = agmNgModuleMemory.popupDefinitions[name];
        if (def) {
            return angular.copy(def.config);
        }
        return null;
    },
    defineState: function (state, config) {
        if (config.urls && (Array.isArray(state))) {
            var compiledConfigs = [];

            config.urls.forEach(function (url, i) {
                var cfg = {};
                angular.merge(cfg, config);
                cfg.url = url;
                cfg.urls = null;
                compiledConfigs.push(cfg);
            });
            compiledConfigs.forEach(function (cfg, i) {
                var newStateAlias = state[i];
                if (newStateAlias) {
                    agmNgModuleMemory.uiStates[newStateAlias] = cfg;
                }
            });

        } else {
            agmNgModuleMemory.uiStates[state] = config;
        }
    },
    openModal: function (uibModal, config) {
        var finalConfig = {
            templateUrl: config.templateUrl,
            controller: config.controller,
            controllerAs: 'vm',
            bindToController: config.bindToController == undefined ? true : config.bindToController,
            backdrop: config.backdrop || 'static',
            windowClass: config.windowClass || 'full-size-modal',
            resolve: config.resolve || {},
            keyboard: false,
            appendTo: config.appendTo || null
        };

        function resolveQuickObject(name, value) {
            finalConfig.resolve[name] = function () {
                return value;
            }
        }

        if (config.quickResolvedObjects) {
            for (var propName in config.quickResolvedObjects) {
                resolveQuickObject(propName, config.quickResolvedObjects[propName]);
            }
        }
        return uibModal.open(finalConfig);
    },
    openModalByDefinition: function (uibModal, name, quickResolvedObjects, resolve, overridenConfig) {
        var config = this.getModalConfigDefinition(name);
        if (overridenConfig) {
            angular.merge(config, overridenConfig);
        }
        if (config) {
            config.quickResolvedObjects = quickResolvedObjects;
            config.resolve = resolve;
            return this.openModal(uibModal, config);
        }
        return null;
    },
    assignScopeToTool: function (scope, dep, tool, destroyable) {
        tool.onDestroy = function (func) {
            tool.on('$destroy', func);
        }
        tool.on = function (name, listener) {
            return scope.$on(name, listener);
        }

        if (dep.$q) {
            tool.on = function (name, listener) {
                return scope.$on(name, function (event, args) {
                    var promise = listener(event, args);
                    if (!(promise && promise.then)) {
                        promise = dep.$q.when(true);
                    }
                    var promisedObject = agmNgModuleMemory.promisedEvents[name];
                    if (promisedObject) {
                        var onSuccess = function () {
                            promisedObject.responseCount++;
                            if (promisedObject.responseCount >= promisedObject.minResponse) {
                                promisedObject.deferred.resolve();
                                promisedObject.responseCount = 0;
                            }
                        };
                        var onFailure = function () {
                            promisedObject.responseCount++;
                            promisedObject.deferred.reject();
                        };
                        promise.then(onSuccess, onFailure);
                    }
                });
            }
            tool.promisedEmit = function (name, args, minResponse) {
                var deferred = dep.$q.defer();
                agmNgModuleMemory.promisedEvents[name] = {
                    name: name,
                    args: args,
                    deferred: deferred,
                    responseCount: 0,
                    minResponse: minResponse || 1
                };
                scope.$emit(name, args);
                return deferred.promise;
            }
        }
        
        if (scope.$eventToObservable && !tool.eventToObservable) {
            tool.eventToObservable = function (name, selector) {
                return scope.$eventToObservable(name, selector);
            }
        }
        
        tool.emit = function (name, args) {
            return scope.$emit(name, args);
        }
        tool.evalAsync = function (expr, locals) {
            return scope.$evalAsync(expr, locals);
        }
        tool.eval = function (expr, locals) {
            return scope.$eval(expr, locals);
        }
        tool.apply = function (expr) {
            return scope.$apply(expr);
        }
        tool.watch = function (name, func, deep) {
            var listener = scope.$watch(name, func, deep);
            destroyable.watches.push(listener);
            return listener;
        }
    },
    injectDestroyableToolFunction: function (scope, dep, tool, destroyable) {
        if (dep.coreSignalRMarketDataService) {
            tool.signalRMarketData = function (tradeVenue, name, func) {
                dep.coreSignalRMarketDataService.turnOn(tradeVenue, name, func);
                destroyable.signalRs.push(function () {
                    dep.coreSignalRMarketDataService.turnOff(tradeVenue, name, func);
                });
            }
        };
        if (dep.coreSignalRNotificationService) {
            tool.signalRNotification = function (tradeVenue, name, func) {
                dep.coreSignalRNotificationService.turnOn(tradeVenue, name, func);
                destroyable.signalRs.push(function () {
                    dep.coreSignalRNotificationService.turnOff(tradeVenue, name, func);
                });
            }
        };

        destroyable.destroyAll = function () {
            destroyable.watches.forEach(function (listener) {
                listener();
            });
            if (dep.coreSignalRNotificationService) {
                destroyable.signalRs.forEach(function (signalRDestroyFunc) {
                    signalRDestroyFunc();
                });
            }
            if (dep.$interval) {
                destroyable.intervals.forEach(function (interval) {
                    dep.$interval.cancel(interval);
                });
            }
            delete agmModule;
            delete tool;
            delete dep;
            delete destroyable;
        }
        if (scope) {
            scope.$on('$destroy', destroyable.destroyAll);
        };
        if (dep.$rootScope) {
            dep.$rootScope.$on('$destroy', destroyable.destroyAll);
        };

        if (dep.$interval) {
            tool.interval = function (func, duration) {
                var i = dep.$interval(function () {
                    func();
                }, duration);
                destroyable.intervals.push(i);
                return i;
            }
        };
    },
    injectNonDestroyableToolFunctions: function (dep, tool) {
        tool._locks = {};
        
        if (dep.$window) {
            tool.winAlert = function (msg) {
                return dep.$window.alert(msg);
            }
        }
        
        if (dep.$route) {
            tool.reload = function () {
                return dep.$route.reload();
            };
        }

        if (moment) {
            tool.moment = moment;
        }

        if (dep.$q) {
            tool.defer = function () {
                return dep.$q.defer();
            };
            tool.reject = function (arg) {
                return dep.$q.reject(arg);
            };
            tool.when = function (obj) {
                return dep.$q.when(obj);
            }
            tool.onceAll = function (promises) {
                return dep.$q.all(promises);
            }
        }

        if (dep.$log) {
            tool.log = function (message) {
                return dep.$log.log(message);
            };
            tool.logError = function (message) {
                return dep.$log.error(message);
            };
            tool.logInfo = function (message) {
                return dep.$log.info(message);
            };
            tool.logWarn = function (message) {
                return dep.$log.warn(message);
            };
        }

        if (dep.$uibModal) {
            tool.getModalConfigDefinition = agmNgModuleWrapperUtils.getModalConfigDefinition;

            tool.openModalByDefinition = function (name, quickResolvedObjects, resolve, overridenConfig) {
                var modal = agmNgModuleWrapperUtils.openModalByDefinition(dep.$uibModal, name, quickResolvedObjects, resolve, overridenConfig);
                modal.opened.then(function () {
                    dep.$rootScope.$broadcast('onUibModalOpened');
                });
                return modal;
            }

            tool.openModal = function (config) {
                return agmNgModuleWrapperUtils.openModal(dep.$uibModal, config);
            }
        }

        if (dep.$scope) {
            tool.localBroadcast = function (x, y) {
                return dep.$scope.$broadcast(x, y);
            };
        }

        if (dep.$rootScope) {
            tool.onRoot = function (x, y) {
                return dep.$rootScope.$on(x, y);
            };
            tool.broadcast = function (x, y) {
                return dep.$rootScope.$broadcast(x, y);
            };
        }
        
        if (dep.$timeout) {
            tool.timeout = function (func, duration) {
                var t = dep.$timeout(function () {
                    func();
                    dep.$timeout.cancel(t);
                }, duration);
                return t;
            }

            tool.onRendered = function (f) {
                return this.timeout(f, 0);
            }
            tool.executeWithinLock = function (lockName, func) {
                tool._locks[lockName] = true;
                func();
                tool.onRendered(function () {
                    tool._locks[lockName] = false;
                });
            }
        };

        tool.checkLock = function (lockName) {
            return tool._locks[lockName];
        }

        if (dep.$interval) {
            tool.cancelInterval = function (intervalObj) {
                dep.$interval.cancel(intervalObj);
            }
        }
    },
    agmDirectiveLinkTool: function (scope, dep) {
        var tool = {};
        var destroyable = {
            watches: [],
            intervals: [],
            signalRs: []
        };

        agmNgModuleWrapperUtils.assignScopeToTool(scope, dep, tool, destroyable);
        agmNgModuleWrapperUtils.injectDestroyableToolFunction(scope, dep, tool, destroyable);
        agmNgModuleWrapperUtils.injectNonDestroyableToolFunctions(dep, tool);

        return tool;
    },
    agmServiceTool: function (service, dep) {
        var tool = {};
        var destroyable = {
            watches: [],
            intervals: [],
            signalRs: []
        };

        tool.setServiceObjectProperties = function (props) {
            for (var propName in props) {
                service[propName] = props[propName];
            };
        }
        agmNgModuleWrapperUtils.assignScopeToTool(dep.$rootScope, dep, tool, destroyable);
        agmNgModuleWrapperUtils.injectDestroyableToolFunction(dep.$rootScope, dep, tool, destroyable);
        agmNgModuleWrapperUtils.injectNonDestroyableToolFunctions(dep, tool);

        return tool;
    },
    agmFactoryTool: function (dep) {
        var tool = {};
        var destroyable = {
            watches: [],
            intervals: [],
            signalRs: []
        };
        agmNgModuleWrapperUtils.assignScopeToTool(dep.$rootScope, dep, tool, destroyable);
        agmNgModuleWrapperUtils.injectDestroyableToolFunction(dep.$rootScope, dep, tool, destroyable);
        agmNgModuleWrapperUtils.injectNonDestroyableToolFunctions(dep, tool);
        return tool;
    },
    agmControllerTool: function (vm, dep) {
        var tool = {};
        var destroyable = {
            watches: [],
            intervals: [],
            signalRs: []
        };
        agmNgModuleWrapperUtils.assignScopeToTool(dep.$scope, dep, tool, destroyable);
        agmNgModuleWrapperUtils.injectDestroyableToolFunction(dep.$scope, dep, tool, destroyable);
        agmNgModuleWrapperUtils.injectNonDestroyableToolFunctions(dep, tool);

        tool.initialize = function (func) {
            func();
        };

        if (dep.$uibModalInstance) {
            tool.closeModal = function (obj) {
                dep.$uibModalInstance.close(obj);
                if (vm.onUibClosed) {
                    vm.onUibClosed();
                }
            }
            tool.dismissModal = function (obj) {
                dep.$uibModalInstance.dismiss(obj);
                if (vm.onUibDismissed) {
                    vm.onUibDismissed();
                }
            }
            vm.uibClosePanel = tool.closeModal;
            vm.uibDismissPanel = tool.dismissModal;
        }

        tool.setVmProperties = function (props) {
            for (var propName in props) {
                vm[propName] = props[propName];
            };
        }

        vm.stopPropagation = function (e) {
            if (e && e.stopPropagation) {
                e.stopPropagation();
            }
        }

        return tool;
    }
};

function agmNgModuleWrapper(appName, appModules, excludeDefaultModule) {
    var agmModule = {};

    // checkModuleExistence
    var moduleExist = false;
    try {
        moduleExist = angular.module(appName) != null;
    } catch (err) {
    }

    if (!moduleExist) {
        appModules = appModules || [];
        var finalModule = [
            'ngSanitize',
            'ui.bootstrap',
            'agm.common',
            'agm.core'
        ].concat(appModules).filter(function (u) {
            return u !== appName;
        });
        if (excludeDefaultModule) {
            finalModule = appModules;
        }
        angular.module(appName, finalModule);
    }
    agmModule.ngApp = angular.module(appName);

    var angularDependencies = ['$rootScope', '$timeout', '$cookies', '$interpolate', '$route', '$window', '$interval', '$parse', '$injector',
        '$q', '$sce', '$http', '$templateCache', '$cookieStore', '$controller', '$sanitize', '$document',
        '$location', '$log', '$uibModal', '$filter', '$compile', '$templateCache'];

    var commonDependencies = angularDependencies.concat([
        'coreNotificationService', 'coreServerCommunicationService', 'coreUserStateService',
        'coreConstant', 'coreUtil', 'coreAuthInterceptor', 'coreServerVersion', 'coreDataStorageService', 'coreCoveredDialogBoxService',
        'coreAllSignalRService',
        'coreApiServerAddress', 'coreServerVersionConstants', 'coreMarketDataServerAddress', 'coreConfigService', 'coreMarketDataServerAddressDelayed',
        'coreSignalRNotificationService', 'coreSignalRMarketDataService',
    ]);

    var basicControllerDependencies = [
        '$scope', '$routeParams'
    ].concat(commonDependencies);
    var basicServiceDependencies = [].concat(commonDependencies);

    var basicDirectiveDependencies = [].concat(commonDependencies);

    function resolveDependencies(dep, finalDependencies, inputArguments) {
        finalDependencies.forEach(function (name, idx) {
            dep[name] = inputArguments[idx];
        });
    }
    agmModule.defineConstant = function (name, obj) {
        agmModule.ngApp.constant(name, obj);
        return agmModule;
    }
    agmModule.defineControllerAsPopup = function (controllerName, popupConfig, dependencies, func, excludeDefaultDependencies) {
        dependencies = dependencies || [];
        var finalDependencies = dependencies.concat(['$uibModalInstance']);
        agmModule.defineController(controllerName, finalDependencies, func, excludeDefaultDependencies);
        popupConfig.controller = controllerName;
        agmNgModuleMemory.popupDefinitions[controllerName] = {
            name: controllerName,
            config: popupConfig
        }
        return agmModule;
    }
    agmModule.defineControllerAsPage = function (controllerName, templateUrl, dependencies, func, excludeDefaultDependencies) {
        dependencies = dependencies || [];
        agmModule.defineController(controllerName, dependencies, func, excludeDefaultDependencies);
        agmNgModuleMemory.templatePairingDefinitions[controllerName] = {
            name: controllerName,
            config: {
                controller: controllerName,
                templateUrl: templateUrl
            }
        }
        agmModule.defineState = function (state, config) {
            config.templateUrl = templateUrl;
            config.controller = controllerName;
            config.controllerAs = "vm";
            agmNgModuleWrapperUtils.defineState(state, config);

            return agmModule;
        }
        return agmModule;
    }
    agmModule.defineController = function (controllerName, dependencies, func, excludeDefaultDependencies) {
        var finalDependencies = basicControllerDependencies.concat(dependencies).filter(function (u) {
            return u !== controllerName;
        });
        if (excludeDefaultDependencies) {
            finalDependencies = dependencies;
        }

        var finalArgs = finalDependencies.concat([]);

        agmNgModuleMemory.controllerMapper[controllerName] = {
            name: controllerName,
            moduleName: appName,
            depArray: [].concat(finalArgs),
            func: func
        };

        finalArgs.push(function () {
            var dep = {};
            var inputArguments = arguments;
            resolveDependencies(dep, finalDependencies, inputArguments);

            var vm = this;
            vm.__controllerName = controllerName;

            if (dep.$scope && dep.$scope.__getInheritedController) {
                vm = dep.$scope.__getInheritedController();
                vm.__parentControllerNames.push(controllerName);
            }

            var tool = agmNgModuleWrapperUtils.agmControllerTool(vm, dep);

            func(vm, dep, tool);
        });
        agmModule.ngApp.controller(controllerName, finalArgs);

        return agmModule;
    };
    agmModule.defineServiceStrict = function (serviceName, dependencies, func) {
        return agmModule.defineService(serviceName, angularDependencies.concat(dependencies), func, true);
    };
    agmModule.defineService = function (serviceName, dependencies, func, excludeDefaultDependencies) {
        var finalDependencies = basicServiceDependencies.concat(dependencies).filter(function (u) {
            return u !== serviceName;
        });
        if (excludeDefaultDependencies) {
            finalDependencies = dependencies;
        }
        var finalArgs = finalDependencies.concat([]);
        
        agmNgModuleMemory.serviceMapper[serviceName] = {
            name: serviceName,
            moduleName: appName,
            depArray: [].concat(finalArgs),
            func: func
        };

        finalArgs.push(function () {
            var dep = {};
            var inputArguments = arguments;
            resolveDependencies(dep, finalDependencies, inputArguments);
            var serviceObj = {};
            var tool = agmNgModuleWrapperUtils.agmServiceTool(serviceObj, dep);
            func(serviceObj, dep, tool);
            return serviceObj;
        });
        agmModule.ngApp.service(serviceName, finalArgs);
        return agmModule;
    };
    agmModule.setConfig = function (dependencies, func) {
        var finalDependencies = basicServiceDependencies.concat(dependencies);
        finalDependencies.push(function () {
            var dep = {};
            var inputArguments = arguments;
            resolveDependencies(dep, finalDependencies, inputArguments);
            return func(dep);
        });
        return agmModule;
    }
    agmModule.defineFactoryStrict = function (factoryName, dependencies, func) {
        return agmModule.defineFactory(factoryName, angularDependencies.concat(dependencies), func, true);
    }
    agmModule.defineFactory = function (factoryName, dependencies, func, excludeDefaultDependencies) {
        var finalDependencies = basicServiceDependencies.concat(dependencies).filter(function (u) {
            return u != factoryName;
        });
        if (excludeDefaultDependencies) {
            finalDependencies = dependencies;
        }
        var finalArgs = finalDependencies.concat([]);

        agmNgModuleMemory.factoryMapper[factoryName] = {
            name: factoryName,
            moduleName: appName,
            depArray: [].concat(finalArgs),
            func: func
        };

        finalArgs.push(function () {
            var dep = {};
            var inputArguments = arguments;
            resolveDependencies(dep, finalDependencies, inputArguments);
            var tool = agmNgModuleWrapperUtils.agmFactoryTool(dep);
            return func(dep, tool);
        });
        agmModule.ngApp.factory(factoryName, finalArgs);
        return agmModule;
    };
    function convertTagNameToDirective(tagName) {
        return tagName.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    }
    agmModule.defineDirectiveStrictByTag = function (tagName, dependencies, func, scopeBinding, linkFunc) {
        var directiveName = convertTagNameToDirective(tagName);
        return agmModule.defineDirective(directiveName, angularDependencies.concat(dependencies), func, scopeBinding, linkFunc, true);
    }
    agmModule.defineDirectiveByTag = function (tagName, dependencies, func, scopeBinding, linkFunc, excludeDefaultDependencies) {
        var directiveName = convertTagNameToDirective(tagName);
        return agmModule.defineDirective(directiveName, dependencies, func, scopeBinding, linkFunc, excludeDefaultDependencies);
    }
    agmModule.defineDirectiveForA = function (tagName, dependencies, func, scopeBinding, linkFunc, excludeDefaultDependencies) {
        var directiveName = convertTagNameToDirective(tagName);
        return agmModule.defineDirective(directiveName, dependencies, function (dep, tool) {
            var config = func(dep, tool);
            config.restrict = 'A';
            return config;
        }, scopeBinding, linkFunc, excludeDefaultDependencies);
    }
    agmModule.defineDirectiveForE = function (tagName, dependencies, func, scopeBinding, linkFunc, excludeDefaultDependencies) {
        var directiveName = convertTagNameToDirective(tagName);
        return agmModule.defineDirective(directiveName, dependencies, function (dep, tool) {
            var config = func(dep, tool);
            config.restrict = 'E';
            return config;
        }, scopeBinding, linkFunc, excludeDefaultDependencies);
    }
    agmModule.defineDirective = function (directiveName, dependencies, func, scopeBinding, linkFunc, excludeDefaultDependencies) {
        var finalDependencies = basicDirectiveDependencies.concat(dependencies).filter(function (u) {
            return u != directiveName;
        });
        if (excludeDefaultDependencies) {
            finalDependencies = dependencies;
        }
        var finalArgs = finalDependencies.concat([]);
        finalArgs.push(function () {
            var dep = {};
            var inputArguments = arguments;
            resolveDependencies(dep, finalDependencies, inputArguments);
            var config = func(dep, agmNgModuleWrapperUtils.agmFactoryTool(dep));
            if (scopeBinding) {
                config.scope = scopeBinding;
            }
            config.link = config.link || function (scope, element, attrs, controller, transcludeFn) {
                if (!scope.vm) {
                    scope.vm = {};
                }
                scope.vm._getDirectiveElement = function () {
                    return element;
                }
                var tool = agmNgModuleWrapperUtils.agmDirectiveLinkTool(scope, dep);
                if (linkFunc) {
                    linkFunc(scope, element, attrs, controller, transcludeFn, dep, tool);
                }
            }

            if (config.replace == undefined) {
                config.replace = true;
            }
            if (config.controller) {
                config.controllerAs = config.controllerAs || 'vm';
                if (config.bindToController === undefined) {
                    config.bindToController = true;
                }
            } else {
                config.bindToController = false;
            }

            return config;
        });
        agmModule.ngApp.directive(directiveName, finalArgs);
        return agmModule;
    };

    return agmModule;
};

if (exportedModule) {
    exportedModule.agmNgModuleWrapper = agmNgModuleWrapper;
    exportedModule.agmNgModuleWrapperUtils = agmNgModuleWrapperUtils;
    exportedModule.agmNgModuleMemory = agmNgModuleMemory;
}