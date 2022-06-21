agmNgModuleWrapper('agm.core')
    .defineServiceStrict('coreServerCommunicationService', ['coreApiServerAddress'],
        function(serviceObject, dep, tool) {
            var $http = dep.$http;
            var coreApiServerAddress = dep.coreApiServerAddress;

            function httpPost(path, args, reqConfig) {
                var func = this.genPostFunction(path);
                return func(args, reqConfig);
            };

            function httpGet(path, reqConfig) {
                return this.getDeferredGetPromise(path, reqConfig);
            };

            function genPostFunction(path) {
                path = coreApiServerAddress + path;

                return function(args, reqConfig) {
                    reqConfig = reqConfig || {};
                    reqConfig.headers = reqConfig.headers || {};

                    var canceller = tool.defer();
                    reqConfig.timeout = canceller.promise;

                    var deferred = tool.defer();
                    var isCancelled = false;

                    $http.post(path, args, reqConfig).then(function(res) {
                        deferred.resolve(res);
                    }, function(res) {
                        if (isCancelled) {
                            tool.log('HTTP POST Request cancelled');
                            return;
                        }
                        deferred.reject(res);
                    });

                    //the hack: expose a new function to cancel the HTTP request
                    deferred.promise.cancel = function() {
                        isCancelled = true;
                        canceller.resolve('Cancelled');
                    };
                    return deferred.promise;
                };
            };

            function getDeferredGetPromise(path, reqConfig) {
                reqConfig = reqConfig || {};
                path = coreApiServerAddress + path;

                var deferred = tool.defer();
                var canceller = tool.defer();
                reqConfig.timeout = canceller.promise;

                var isCancelled = false;
                $http.get(path, reqConfig).then(function(res) {
                    deferred.resolve(res);
                }, function(res) {
                    if (isCancelled) {
                        tool.log('HTTP GET Request cancelled');
                        return;
                    }
                    deferred.reject(res);
                });
                //the hack: expose a new function to cancel the HTTP request
                deferred.promise.cancel = function() {
                    isCancelled = true;
                    canceller.resolve();
                };
                return deferred.promise;
            }

            function genGetFunctionWithNVar(path, varMapper) {
                return function() {
                    var args = null;
                    if (varMapper) {
                        args = {
                            params: varMapper(arguments)
                        };
                    };
                    return serviceObject.getDeferredGetPromise(path, args);
                };
            };

            function genGetFunctionWithNVarArguments(path, orderedArgumentsNameList) {
                return function() {
                    var params = {};
                    var inputArguments = arguments;
                    if (orderedArgumentsNameList) {
                        orderedArgumentsNameList.forEach(function(name, idx) {
                            if (inputArguments[idx]!=undefined) {
                                params[name] = inputArguments[idx];
                            }
                        });
                    }
                    var args = {
                        params: params
                    };
                    return serviceObject.getDeferredGetPromise(path, args);
                };
            };

            function genGetFunctionWithParamsObject(path) {
                return function(paramsObject) {
                    return serviceObject.getDeferredGetPromise(path, { params: paramsObject });
                };
            };


            tool.setServiceObjectProperties({
                httpPost: httpPost,
                httpGet: httpGet,
                genPostFunction: genPostFunction,
                getDeferredGetPromise: getDeferredGetPromise,
                genGetFunctionWithNVar: genGetFunctionWithNVar,
                genGetFunctionWithNVarArguments: genGetFunctionWithNVarArguments,
                genGetFunctionWithParamsObject: genGetFunctionWithParamsObject
            });

        });
