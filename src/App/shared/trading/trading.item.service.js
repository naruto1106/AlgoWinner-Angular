agmNgModuleWrapper('agms.trading')
    .defineService('sTradingItemService', ['commonColorGeneratorService'],
    function (serviceObj, dep, tool) {
        var commonColorGeneratorService = dep.commonColorGeneratorService;
        tool.setServiceObjectProperties({
            activeOrders: [],
            historicalOrders: [],
            historicalOrdersAmount: [],

            positions: [],
            activePositions: [],
            realizedPositions: [],

            holdingSummary: [],
            sectorCapitals: [],
            sectorCapitalDonutColors: [],
            exposureDonutValues: [],
            turnoverDonutValues: [],
            activePositionChartColors: [],
            historicalPositionChartColors: [],
            quantityOnHoldChartValues: [],
            exposureChartValues: [],
            quantityLiquidatedChartValues: [],
            groupedPositions: [],
            capitalSummary: {},
            populateSectorDirective: populateSectorDirective,
            populatePositionDirective: populatePositionDirective
        });
        
        function populateSectorDirective(sectorCapitalsSource) {
            commonColorGeneratorService.generateColorsByReference(serviceObj.sectorCapitalDonutColors, sectorCapitalsSource.length);
            serviceObj.sectorCapitals.splice(0, serviceObj.sectorCapitals.length);
            serviceObj.exposureDonutValues.splice(0, serviceObj.exposureDonutValues.length);
            serviceObj.turnoverDonutValues.splice(0, serviceObj.turnoverDonutValues.length);
            sectorCapitalsSource.forEach(function (x) {
                serviceObj.sectorCapitals.push(x);
                serviceObj.exposureDonutValues.push(x.Exposure);
                serviceObj.turnoverDonutValues.push(x.Turnover);
            });
        }

        function populatePositionDirective() {
            var activePositions = serviceObj.activePositions;
            //var groupedHistoricalPositions = _.groupBy(_.select(serviceObj.positions, isHistorical), function (n) {
            //    return n.Product.ProductId;
            //});

            serviceObj.quantityOnHoldChartValues.splice(0, serviceObj.quantityOnHoldChartValues.length);
            serviceObj.exposureChartValues.splice(0, serviceObj.exposureChartValues.length);
            serviceObj.quantityLiquidatedChartValues.splice(0, serviceObj.quantityLiquidatedChartValues.length);
            serviceObj.groupedPositions.splice(0, serviceObj.groupedPositions.length);

            activePositions.forEach(function (x) {
                serviceObj.quantityOnHoldChartValues.push(Math.abs(x.QuantityOnHold));
                serviceObj.exposureChartValues.push(x.Exposure_Percent);
            });

            //for (var key in groupedHistoricalPositions) {
            //    var group = groupedHistoricalPositions[key];
            //    group.TotalQuantityLiquidated = 0;
            //    group.forEach(function (p) {
            //        group.TotalQuantityLiquidated += p.QuantityLiquidated;
            //    });
            //    serviceObj.quantityLiquidatedChartValues.push(group.TotalQuantityLiquidated);
            //    serviceObj.groupedPositions.push(group);
            //};

            commonColorGeneratorService.generateColorsByReference(serviceObj.activePositionChartColors, activePositions.length);
            //commonColorGeneratorService.generateColorsByReference(serviceObj.historicalPositionChartColors, serviceObj.groupedPositions.length);
        }
    });