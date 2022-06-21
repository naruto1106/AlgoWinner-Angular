agmNgModuleWrapper('agmp.exchangeRate', [
    'agms.trading'
]).defineController('p.exchangeRate.MainController', ['sTradingExchangeRateService'],
    function (vm, dep, tool) {
        var sTradingExchangeRateService = dep.sTradingExchangeRateService,
            coreNotificationService = dep.coreNotificationService;

        vm.exchangeRates = null;

        sTradingExchangeRateService.GetExchangeRates().then(function (res) {
            vm.exchangeRates = res.data;
        }, function (res) {
            coreNotificationService.notifyError("Failed to get exchange rates", "Error! " + (res.data && res.data.Message));
        });
    });