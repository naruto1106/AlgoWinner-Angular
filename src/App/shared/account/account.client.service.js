agmNgModuleWrapper('agms.account')
    .defineService("sAccountClientService",
    ['coreSignalRNotificationService', 'sStrategyCommerceService', 'commonItemUpdateService'],
        function (serviceObj, dep, tool) {

            var coreSignalRNotificationService = dep.coreSignalRNotificationService,
                sStrategyCommerceService = dep.sStrategyCommerceService,
                commonItemUpdateService = dep.commonItemUpdateService;

            serviceObj.getAccountCapitals = getAccountCapitals;

            var previousGetAccountCapitalPromise = null;

            function getAccountCapitals(isStrategy, selectedId, capital, callback) {
                if (previousGetAccountCapitalPromise != null) {
                    previousGetAccountCapitalPromise.cancel();
                }

                if (isStrategy) {
                    var getStrategyCapitalPromise = sStrategyCommerceService.GetStrategyCapital(selectedId);
                    previousGetAccountCapitalPromise = getStrategyCapitalPromise;
                    getStrategyCapitalPromise.then(function (res) {
                        angular.copy(res.data, capital);
                        coreSignalRNotificationService.turnOn('DeveloperAccountUpdated', processStrategyAccountUpdate);
                        coreSignalRNotificationService.turnOn('StrategyCapitalChanged', processStrategyCapitalChanged);
                        callback();
                    }, function (res) {
                        tool.logError('Failed to get Strategy Capital');
                    });
                } 

                function copyField(capitalToUpdate, data) {
                    capitalToUpdate.TradingCapital = data.TradingCapital;
                    capitalToUpdate.NAV = data.NAV;
                    capitalToUpdate.CashBalance = data.CashBalance;
                    capitalToUpdate.RealizedPL = data.RealizedPL;
                    capitalToUpdate.UnrealizedPL = data.UnrealizedPL;
                    capitalToUpdate.LongExposure = data.LongExposure;
                    capitalToUpdate.ShortExposure = data.ShortExposure;
                    capitalToUpdate.MarginUsed = data.MarginUsed;
                    capitalToUpdate.MarginAvailable = data.MarginAvailable;
                }

                function processStrategyAccountUpdate(data) {
                    if (data.StrategyId === capital.StrategyId && commonItemUpdateService.isLaterTimestamp(data, capital)) {
                        copyField(capital, data);
                    }
                }

                function processStrategyCapitalChanged(data) {
                    if (data.StrategyId === capital.StrategyId
                        && commonItemUpdateService.isLaterTimestamp(data, capital)) {
                        capital.TradingCapital = data.TradingCapital;
                        capital.NAV = data.NAV;
                        capital.CashBalance = data.CashBalance;
                    }
                }

                return function () {
                    coreSignalRNotificationService.turnOff('DeveloperAccountUpdated', processStrategyAccountUpdate);
                    coreSignalRNotificationService.turnOff('StrategyCapitalChanged', processStrategyCapitalChanged);
                };
            }
        }
    );