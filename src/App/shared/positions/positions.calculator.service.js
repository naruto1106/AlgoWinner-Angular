agmNgModuleWrapper('agms.positions')
    .defineService('sPositionsCalculatorService', ["sTradingExchangeRateService"],
    function (serviceObj, dep, tool) {
        var sTradingExchangeRateService = dep.sTradingExchangeRateService;

        function getUnrealizedPl(position, marketData, multiplier) {
            if (position.PositionType === "Long") {
                // Long
                return (marketData.LastTradedPrice - position.AverageEntryPrice) * position.QuantityOnHold * multiplier;
            }
            // Short
            return (position.AverageEntryPrice - marketData.LastTradedPrice) * position.QuantityOnHold * multiplier;
        }

        function getExposurePercent(position, allPositions, strategyCurrency) {
            sTradingExchangeRateService.loadAllExchangeRates();
            return sTradingExchangeRateService.exchangeRateLoaded.then(function () {
                var sum = 0;
                allPositions.forEach(function (p) {
                    sum += p.Exposure * sTradingExchangeRateService.allExchangeRates[p.Product.Currency + "_" + strategyCurrency];
                });

                return position.Exposure / sum;
            });
        }

        function getSectorExposure(positions, strategyCurrency) {
            var exposure = 0;
            positions.forEach(function (p) {
                exposure += p.Exposure * sTradingExchangeRateService.allExchangeRates[p.Product.Currency + "_" + strategyCurrency];
            });
            return exposure;
        }

        function getSectorTurnover(positions, strategyCurrency) {
            var turnover = 0;
            positions.forEach(function (p) {
                turnover += getTurnover(p) * sTradingExchangeRateService.allExchangeRates[p.Product.Currency + "_" + strategyCurrency];
            });
            return turnover;
        }

        function getTurnover(position) {
            var exitAmount = position.AverageExitPrice ? position.QuantityLiquidated * position.AverageExitPrice : 0;
            return exitAmount + (position.QuantityOnHold * position.AverageEntryPrice);
        }


        // --- SCOPE FUNC
        function updatePosition(position, newData) {
            position.AverageEntryPrice = newData.AverageEntryPrice;
            position.AverageExitPrice = newData.AverageExitPrice;
            position.EntryTime = newData.EntryTime;
            position.LastExitTime = newData.LastExitTime;
            position.ObjectId = newData.ObjectId;
            position.PositionType = newData.PositionType;
            position.QuantityLiquidated = newData.QuantityLiquidated;
            position.QuantityOnHold = newData.QuantityOnHold;
            position.RealizedPL = newData.RealizedPL;
            position.RealizedPL_Percent = newData.RealizedPL_Percent;
            position.RetrievedAt = newData.RetrievedAt;
            position.TotalCost = newData.TotalCost;
            position.TotalInterestCost = newData.TotalInterestCost;
            position.TotalTransactionCost = newData.TotalTransactionCost;
            position.NetPnL = newData.NetPnL;
            position.NetPnL_Percent = newData.NetPnL_Percent;
        }

        function getProductMultiplier(symbol) {
            var multiplier = 1;

            if (symbol === 'HS10CF' || symbol === "HS10C") {
                multiplier = 10;
            }
            if (symbol === 'HS50CF' || symbol === "HS50C") {
                multiplier = 50;
            }

            return multiplier;
        }

        function calculateOpenPositionValues(position, requireExposurePercent, allPositions, strategyCurrency) {
            var multiplier = getProductMultiplier(position.Product.Symbol);
            var marketData = position.MarketData;

            var leverage = 1;
            if (serviceObj.leverageDict[position.Product.ProductId]) {
                leverage = serviceObj.leverageDict[position.Product.ProductId].Leverage;
            }

            var denominator = position.AverageEntryPrice * position.QuantityOnHold * multiplier;

            position.Exposure = position.QuantityOnHold * marketData.LastTradedPrice * multiplier;
            position.UnrealizedPL = getUnrealizedPl(position, marketData, multiplier);
            position.UnrealizedPL_Percent = position.UnrealizedPL / denominator;
            position.MarginValue = position.Exposure / leverage;

            //calculate exposure percent
            if (requireExposurePercent) {
                getExposurePercent(position, allPositions, strategyCurrency).then(function (res) {
                    position.Exposure_Percent = res;
                });
            }
        }

        function calculateSectorCapitals(openPositions, strategyCurrency) {
            var sectorCapitals = [];
            var groups = _.groupBy(openPositions, function (p) {
                return p.Product.Sector.SectorId;
            });

            sTradingExchangeRateService.loadAllExchangeRates();
            return sTradingExchangeRateService.exchangeRateLoaded.then(function () {

                for (var key in groups) {
                    var exposure = getSectorExposure(groups[parseInt(key)], strategyCurrency);
                    var turnover = getSectorTurnover(groups[parseInt(key)], strategyCurrency);

                    sectorCapitals.push({
                        SectorName: groups[parseInt(key)][0].Product.Sector.SectorName,
                        Exposure: exposure,
                        Turnover: turnover,
                        TurnoverPercentage: 0,
                        ExposurePercentage: 0
                    });
                }

                var totalExposure = _.sum(_.map(sectorCapitals, "Exposure"));
                var totalTurnover = _.sum(_.map(sectorCapitals, "Turnover"));
                sectorCapitals.forEach(function (c) {
                    c.ExposurePercentage = c.Exposure / totalExposure;
                    c.TurnoverPercentage = c.Turnover / totalTurnover;
                });

                return sectorCapitals;
            });
        }

        tool.setServiceObjectProperties({
            leverageDict: {},
            updatePosition: updatePosition,
            getProductMultiplier: getProductMultiplier,
            calculateOpenPositionValues: calculateOpenPositionValues,
            calculateSectorCapitals: calculateSectorCapitals
        });
    });