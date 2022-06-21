agmNgModuleWrapper("agm.core")
    .defineServiceStrict("coreDataStorageService", [], function (serviceObj, dep, tool) {

        var $cookies = dep.$cookies,
            $window = dep.$window;

        function test() {
            try {
                this.set("_test", { text: "123" });
                var obj = this.get("_test");
                this.clear("_test");
                var existAfterClear = this.get("_test");
                return obj && obj.text === "123" && !existAfterClear;
            } catch (e) {
                return false;
            }
        }

        var cookiesStorage = {
            identifier: "COOKIES",
            test: test,
            get: function (key) {
                return $cookies.getObject(key);
            },
            set: function (key, value) {
                $cookies.putObject(key, value);
            },
            clear: function (key) {

                $cookies.remove(key);
            },
            clearAll: function () {

                var all = $cookies.getAll();
                for (var property in all) {
                    $cookies.remove(property);
                }
            }
        }

        var sessionStorage = {
            identifier: "SESSION_STORAGE",
            test: test,
            get: function (key) {
                if ($window.sessionStorage[key]) {
                    try {
                        return angular.fromJson($window.sessionStorage[key]);
                    } catch (e) {
                        return $window.sessionStorage[key];
                    }
                }
                return undefined;
            },
            set: function (key, value) {
                $window.sessionStorage[key] = angular.toJson(value);
            },
            clear: function (key) {
                delete $window.sessionStorage[key];
            },
            clearAll: function () {

                for (var property in $window.sessionStorage) {
                    delete $window.sessionStorage[property];
                }
            }
        }

        var localStorage = {
            identifier: "LOCAL_STORAGE",
            test: test,
            get: function (key) {
                if ($window.localStorage[key]) {
                    try {
                        return angular.fromJson($window.localStorage[key]);
                    } catch (e) {
                        return $window.localStorage[key];
                    }
                }
                return undefined;
            },
            set: function (key, value) {
                $window.localStorage[key] = angular.toJson(value);
            },
            clear: function (key) {
                delete $window.localStorage[key];
            },
            clearAll: function () {

                for (var property in $window.localStorage) {
                    // keep fundamental filter setting
                    if (property !== "fundamental-filter") {
                        delete $window.localStorage[property];
                    }
                }
            }
        }

        var inMemoryStorage = {
            identifier: "IN_MEMORY_STORAGE",
            test: test,
            get: function (key) {
                return serviceObj._memoryObj[key];
            },
            set: function (key, value) {
                serviceObj._memoryObj[key] = value;
            },
            clear: function (key) {
                delete serviceObj._memoryObj[key];
            },
            clearAll: function () {
                serviceObj._memoryObj = {};
            }
        }

        function getAvailableStorage() {
            if (!serviceObj.testingResult) {
                serviceObj.testingResult = {};
            }
            if (serviceObj.testingResult.hasCookies == undefined) {
                serviceObj.testingResult.hasCookies = cookiesStorage.test();
            }
            if (serviceObj.testingResult.hasLocalStorage == undefined) {
                serviceObj.testingResult.hasLocalStorage = localStorage.test();
            }
            if (serviceObj.testingResult.hasInMemoryStorage == undefined) {
                serviceObj.testingResult.hasInMemoryStorage = inMemoryStorage.test();
            }

            if (serviceObj.testingResult.hasLocalStorage) {
                return localStorage;
            } else if (serviceObj.testingResult.hasCookies) {
                return cookiesStorage;
            } else {
                return inMemoryStorage;
            }
        };

        function getAvailableSessionStorage() {
            if (!serviceObj.testingResult) {
                serviceObj.testingResult = {};
            }
            if (serviceObj.testingResult.hasCookies == undefined) {
                serviceObj.testingResult.hasCookies = cookiesStorage.test();
            }
            if (serviceObj.testingResult.hasSessionStorage == undefined) {
                serviceObj.testingResult.hasSessionStorage = sessionStorage.test();
            }
            if (serviceObj.testingResult.hasInMemoryStorage == undefined) {
                serviceObj.testingResult.hasInMemoryStorage = inMemoryStorage.test();
            }
            if (serviceObj.testingResult.hasSessionStorage) {
                return sessionStorage;
            } else if (serviceObj.testingResult.hasCookies) {
                return cookiesStorage;
            } else {
                return inMemoryStorage;
            }
        };

        function setSession(key, value) {
            var storageObj = getAvailableSessionStorage();
            var oldValue = storageObj.get(key);
            storageObj.set(key, value);
            var obj = {
                key: key,
                newValue: value,
                oldValue: oldValue
            };
            tool.broadcast("dataStorageSessionSet", obj);
        }

        function getSession(key) {
            var storageObj = getAvailableSessionStorage();
            return storageObj.get(key);
        }

        function getListInSession(key) {
            return angular.fromJson(getSession(key));
        }

        function setListInSession(key, value) {
            setSession(key, angular.toJson(value));
        }

        function addIntoListInSession(key, item) {
            var list = getListInSession(key);

            if (!list || !list.length) {
                list = [];
            }
            list.push(item);
            setListInSession(key, list);
        }

        function filterOutFromListInSession(key, func) {
            var list = getListInSession(key);

            if (list || list.length) {
                list = list.filter(func);
                setListInSession(key, list);
            }

        }

        function clearSession(key) {
            var storageObj = getAvailableSessionStorage();
            storageObj.clear(key);
            tool.broadcast("dataStorageSessionCleared", {
                key: key
            });
        }

        function set(key, value) {
            var storageObj = getAvailableStorage();
            var oldValue = storageObj.get(key);
            storageObj.set(key, value);
            var obj = {
                key: key,
                newValue: value,
                oldValue: oldValue
            };
            tool.broadcast("dataStorageSet", obj);
        }

        function get(key) {
            var storageObj = getAvailableStorage();
            return storageObj.get(key);
        }

        function clear(key) {
            var storageObj = getAvailableStorage();
            storageObj.clear(key);
            tool.broadcast("dataStorageCleared", {
                key: key
            });
        }

        function clearAll() {
            var storageObj = getAvailableStorage();
            storageObj.clearAll();
            tool.broadcast("dataStorageReset");
        }

        tool.setServiceObjectProperties({
            getAvailableStorage: getAvailableStorage,
            getAvailableSessionStorage: getAvailableSessionStorage,
            clearAll: clearAll,
            set: set,
            get: get,
            clear: clear,
            setSession: setSession,
            getSession: getSession,
            clearSession: clearSession,
            getListInSession: getListInSession,
            setListInSession: setListInSession,
            addIntoListInSession: addIntoListInSession,
            filterOutFromListInSession: filterOutFromListInSession,
            _memoryObj: {}
        });

    });