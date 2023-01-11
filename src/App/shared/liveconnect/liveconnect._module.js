agmNgModuleWrapper('agms.liveconnect')
    .defineService("sLiveConnectService",
        [
            "sTradingExchangeRateService",
            "sAuthService",
            "$firebaseAuth"
        ],
        function (serviceObj, dep, tool) {
            var coreServerCommunicationService = dep.coreServerCommunicationService;
            var tradingExchangeRateService = dep.sTradingExchangeRateService;
            var tigerFirebaseAuthedDeferred = tool.defer();
            var futuFirebaseAuthedDeferred = tool.defer();
            var futuFb = null;
            var sAuthService = dep.sAuthService;
            var $q = dep.$q;

            var cache = {};

            function loginToSaxo() {
                return coreServerCommunicationService.genPostFunction(
                    "/saxoapi/v1/Account/Connect")().then(function (result) {                    
                    return result;
                }).catch(function () {
                    return null;
                });
            }

            function getProductBySymbolAndVenue(symbol, tradeVenue) {
                var key = symbol + '_' + tradeVenue;
                if (cache[key]) {
                    return $q.resolve(cache[key]);
                }

                return coreServerCommunicationService.genGetFunctionWithParamsObject(
                    "/productapi/v1/Product/GetProductBySymbolAndVenue")({
                    symbol: symbol, tradeVenue: tradeVenue
                }).then(function (result) {
                    var product = result.data.Data;
                    product = product ||
                    {
                        ProductName: symbol
                    };
                    cache[key] = product;
                    return product;
                }).catch(function () {
                    return null;
                });
            }

            function formatFirbaseObj(firebaseObj) {
                var clone = angular.copy(firebaseObj);
                clone.orders = clone.orders || {};
                clone.positions = clone.positions || {};
                
                var acc = angular.copy(clone) || {};
                acc.orders = clone.orders || [];
                acc.positions = clone.positions || [];

                return acc;
            }

            function formatFirebaseObjSync(firebaseObj) {
                var formatted = formatFirbaseObj(firebaseObj);
                var orderPromises = [];
                var positionPromises = [];
                var orderPromiseId = 0;
                var positionPromiseId = 0;

                for (var orderKey in formatted.orders) {
                    var order = formatted.orders[orderKey];
                    var orderPromise = null;
                    if (order.broker === 'tiger' || order.broker === 'futu') {
                        orderPromise = getProductBySymbolAndVenue(order.product, order.tradeVenue);
                    }

                    order.promiseId = orderPromiseId++;
                    orderPromises.push(orderPromise);
                }

                var exchangeRates = tradingExchangeRateService.allExchangeRates;
                var accountCurrency = formatted.info.currency;

                var unrealizedPL = 0;
                for (var positionKey in formatted.positions) {
                    var position = formatted.positions[positionKey];
                    var exchangeRate = exchangeRates[position.currency + '_' + accountCurrency];
                    var positionPromise = null;
                    if (position.broker === 'tiger' || position.broker === 'futu') {
                        positionPromise = getProductBySymbolAndVenue(position.product, position.tradeVenue);
                    }

                    unrealizedPL += position.unrealizedPNL * exchangeRate;
                    position.promiseId = positionPromiseId++;
                    positionPromises.push(positionPromise);
                }
                formatted.info.unrealizedPL = unrealizedPL;

                var orderPromisesAll = $q.all(orderPromises);
                var positionPromisesAll = $q.all(positionPromises);

                return $q.all([orderPromisesAll, positionPromisesAll]).then(function (result) {
                    // The result contains all the products
                    for (var orderKey in formatted.orders) {
                        var order = formatted.orders[orderKey];
                        order.algoProduct = result[0][order.promiseId];
                        delete order.promiseId;
                    }
                    for (var positionKey in formatted.positions) {
                        var position = formatted.positions[positionKey];
                        position.algoProduct = result[1][position.promiseId];
                        delete position.promiseId;
                    }
                    return formatted;
                });
            }

            function loginTigerFirebase() {
                return sAuthService.GetTigerFirebaseToken()
                    .then(function (result) {
                        var token = result.data.Token;
                        return dep.$firebaseAuth().$signInWithCustomToken(token);
                    }).then(function (result) {
                        tigerFirebaseAuthedDeferred.resolve(true);
                    });
            }

            function loginFutuFirebase(futuFbApp) {
                futuFb = futuFbApp;
                return sAuthService.CreateManualFollowToken()
                    .then(function (result) {
                        var token = result.data.Token;
                        return futuFb.auth().signInWithCustomToken(token);
                    }).then(function (result) {
                        futuFirebaseAuthedDeferred.resolve(true);
                    });
            }

            function loadInfo() {
                return tool.onceAll([
                    tradingExchangeRateService.loadAllExchangeRates()
                ]).then(function (result) {
                });
            }

            function getTigerAccountCode() {
                return tigerFirebaseAuthedDeferred.promise.then(function(res) {
                    var uid = dep.coreDataStorageService.get("userId");
                    return firebase.database().ref().child('users/' + uid + '/accounts');
                });
            }

            function getFutuAccountCode() {
                return futuFirebaseAuthedDeferred.promise.then(function (res) {
                    var uid = dep.coreDataStorageService.get("userId");
                    return futuFb.database().ref().child('users/' + uid + '/accounts');
                });
            }

            function getFutuFb() {
                return futuFb;
            }

            tool.setServiceObjectProperties({
                loginToSaxo: loginToSaxo,
                getFutuFb: getFutuFb,
                loadInfo: loadInfo,
                formatFirebaseObj: formatFirebaseObjSync,
                loginTigerFirebase: loginTigerFirebase,
                loginFutuFirebase: loginFutuFirebase,
                // Need to wait for this promise to be resolve before calling any firebase API
                tigerFirebaseAuthed: tigerFirebaseAuthedDeferred.promise,
                futuFirebaseAuthed: futuFirebaseAuthedDeferred.promise,
                getTigerAccountCode: getTigerAccountCode,
                getFutuAccountCode: getFutuAccountCode
            });
        });