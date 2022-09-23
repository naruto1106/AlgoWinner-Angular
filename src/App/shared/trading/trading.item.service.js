agmNgModuleWrapper('agms.trading')
    .defineService('sTradingItemService', ['commonColorGeneratorService'],
    function (serviceObj, dep, tool) {
        var commonColorGeneratorService = dep.commonColorGeneratorService;
        tool.setServiceObjectProperties({
            activeOrders: [],
            historicalOrders: [],

            positions: [],
            activePositions: [],

            holdingSummary: [],
            sectorCapitals: [],
            sectorCapitalDonutColors: [],
            exposureDonutValues: [],
            turnoverDonutValues: [],
            activePositionChartColors: [],
            quantityOnHoldChartValues: [],
            exposureChartValues: [],
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

            serviceObj.quantityOnHoldChartValues.splice(0, serviceObj.quantityOnHoldChartValues.length);
            serviceObj.exposureChartValues.splice(0, serviceObj.exposureChartValues.length);

            activePositions.forEach(function (x) {
                serviceObj.quantityOnHoldChartValues.push(Math.abs(x.QuantityOnHold));
                serviceObj.exposureChartValues.push(x.Exposure_Percent);
            });
            
            commonColorGeneratorService.generateColorsByReference(serviceObj.activePositionChartColors, activePositions.length);
        }
    });