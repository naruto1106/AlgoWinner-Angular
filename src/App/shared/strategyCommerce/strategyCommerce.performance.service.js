agmNgModuleWrapper('agms.strategyCommerce')
    .ngApp
    .service('sStrategyCommercePerformanceService', [
        'coreServerCommunicationService', function (coreServerCommunicationService) {
            var path = '/peapi/v2/StrategyPerformance/';
            
            function getTimeSeriesFromStrategy(url) {
                return coreServerCommunicationService.genGetFunctionWithNVar(path + url, function (args) {
                    return {
                        strategyId: args[0]
                    };
                });
            }

            function getStrategiesFunction(url) {
                return coreServerCommunicationService.genGetFunctionWithNVar(path + url);
            }

            this.GetBenchmarkReturnData = coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetBenchmarkReturnData', function (args) {
                return {
                    productId: args[0],
                    startDate: args[1]
                };
            });
            this.GetWinningPercentageBehavior = getTimeSeriesFromStrategy('GetWinningPercentageBehavior');
            this.GetTotalNumberOfTrades = getTimeSeriesFromStrategy('GetTotalNumberOfTrades');
            this.GetNumberOfPositionsHeld = getTimeSeriesFromStrategy('GetNumberOfPositionsHeld');
            this.GetProfitFactor = getTimeSeriesFromStrategy('GetProfitFactor');
            this.GetAverageProfitPerTrade = getTimeSeriesFromStrategy('GetAverageProfitPerTrade');
            this.GetAverageLossPerTrade = getTimeSeriesFromStrategy('GetAverageLossPerTrade');
            this.GetProductReview = getTimeSeriesFromStrategy('GetProductReview');

            this.GetStrategiesForReturnAnalysis = getStrategiesFunction('GetStrategiesForReturnAnalysis');
            this.GetLegacyStrategyPerformance = coreServerCommunicationService.genGetFunctionWithNVar(
                    path + 'GetLegacyStrategyPerformance',
                    function (args) {
                        return { strategyId: args[0] };
                    });
        }
    ]);
