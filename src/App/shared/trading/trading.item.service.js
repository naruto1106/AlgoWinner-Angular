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
            resolveHoldingSummary: resolveHoldingSummary,
            populateSectorDirective: populateSectorDirective,
            populatePositionDirective: populatePositionDirective
        });

        function resolveHoldingSummary(positions, isPreview) {
            if (positions) {
                var totalLong = 0;
                var totalShort = 0;

                if (isPreview) {
                    positions.forEach(function (position) {
                        var idx = position.Orders.length - 1;
                        if (position.Orders[idx].Intention !== "Full Exit") {
                            if (position.PositionType === 'Long') {
                                totalLong++;
                            }
                            if (position.PositionType === 'Short') {
                                totalShort++;
                            }
                        }
                        position.PreviewExposure = position.Exposure_Percent;
                    });
                } else {
                    positions.forEach(function (position) {
                        if (position.QuantityOnHold > 0) {
                            if (position.PositionType === 'Long') {
                                totalLong++;
                            }
                            if (position.PositionType === 'Short') {
                                totalShort++;
                            }
                        }
                    });
                }
                return {
                    totalLong: totalLong,
                    totalShort: totalShort
                }

            }
        };

        function isActive(position) {
            if (position.QuantityOnHold != null) {
                return position.QuantityOnHold !== 0;
            } else {
                var lastOrder = position.Orders[position.Orders.length - 1];
                return (lastOrder && lastOrder.Intention !== 'Full Exit');
            }
        }

        function isHistorical(position) {
            if (position.QuantityLiquidated != null) {
                return position.QuantityLiquidated !== 0;
            } else {
                var lastOrder = position.Orders[position.Orders.length - 1];
                return (lastOrder && lastOrder.Intention === 'Full Exit');
            }
        }

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