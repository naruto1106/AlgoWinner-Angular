agmNgModuleWrapper('agms.trading')
    .defineService('sTradingExchangeRateService', ['coreServerCommunicationService'],
    function (serviceObj, dep, tool) {
        var path = "/marketinfoapi/v1/ExchangeRate/";
        var coreServerCommunicationService = dep.coreServerCommunicationService;
        var exchangeRateLoadedDeferred = tool.defer();

        function loadAllExchangeRates() {
            if (!serviceObj.allExchangeRates) {
                serviceObj.GetAllExchangeRates().then(function (res) {
                    serviceObj.allExchangeRates = _.chain(res.data)
                        .indexBy("CurrencyPair")
                        .mapValues("Rate")
                        .value();
                    exchangeRateLoadedDeferred.resolve(serviceObj.allExchangeRates);
                }, function () {
                    exchangeRateLoadedDeferred.reject();
                });
            }
            
            return exchangeRateLoadedDeferred.promise;
        }

        tool.setServiceObjectProperties({
            allExchangeRates: null,
            exchangeRateLoaded: exchangeRateLoadedDeferred.promise,
            loadAllExchangeRates: loadAllExchangeRates,

            GetExchangeRates: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetExchangeRates'),
            GetAllExchangeRates: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetAllExchangeRates'),
            GetExchangeRatesForBaseCurrency: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetExchangeRatesForBaseCurrency', function (args) {
                return { baseCurrency: args[0] };
            })
        });
    })