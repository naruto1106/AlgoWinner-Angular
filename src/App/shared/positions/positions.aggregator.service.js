agmNgModuleWrapper('agms.positions')
    .defineService('sPositionsAggregatorService', [], function(serviceObj) {
        serviceObj.aggregatePositions = function (positions) {
            var positionGroupList = _.groupBy(positions, function(position) {
                return position.Product.ProductId;
            });
            var aggregatedPositions = [];
            _.map(positionGroupList, function(value, key) {
                if (value.length === 1) {
                    aggregatedPositions.push(value[0]);
                    return;
                }
                var totalLong = 0;
                var totalShort = 0;
                var totalLongCost = 0;
                var totalShortCost = 0;
                var totalLongQtyPrice = 0;
                var totalShortQtyPrice = 0;
                var totalLongExposure = 0;
                var totalShortExposure = 0;
                value.filter(function(o) {
                    if (o.PositionType === "Long") {
                        totalLong += o.QuantityOnHold;
                        totalLongCost += o.TotalTransactionCost;
                        totalLongQtyPrice += o.QuantityOnHold * o.AverageEntryPrice;
                        totalLongExposure += o.Exposure;
                        return true;
                    }
                    return false;
                });
                value.filter(function(o) {
                    if (o.PositionType === "Short") {
                        totalShort += o.QuantityOnHold;
                        totalShortCost += o.TotalTransactionCost;
                        totalShortQtyPrice += o.QuantityOnHold * o.AverageEntryPrice;
                        totalShortExposure += o.Exposure;
                        return true;
                    }
                    return false;
                });

                var longOrShort = totalLong - totalShort;

                //if (longOrShort === 0) return;

                var aggregatedPosition = {};

                aggregatedPosition.Product = positions.filter(function(p) {
                    return String(p.Product.ProductId) === String(key);
                })[0].Product;
                aggregatedPosition.QuantityOnHold = Math.abs(longOrShort);
                if (longOrShort >= 0) {
                    aggregatedPosition.PositionType = "Long";
                    aggregatedPosition.TotalTransactionCost = (longOrShort / totalLong * totalLongCost).toFixed(4);
                    aggregatedPosition.AverageEntryPrice = (totalLongQtyPrice / totalLong).toFixed(5);
                    aggregatedPosition.Exposure = (longOrShort / totalLong * totalLongExposure).toFixed(4);
                    aggregatedPosition.UnrealizedPL = (aggregatedPosition.Exposure - aggregatedPosition.QuantityOnHold * aggregatedPosition.AverageEntryPrice).toFixed(4);
                } else if (longOrShort < 0) {
                    aggregatedPosition.PositionType = "Short";
                    aggregatedPosition.TotalTransactionCost = (-longOrShort / totalShort * totalShortCost).toFixed(4);
                    aggregatedPosition.AverageEntryPrice = (totalShortQtyPrice / totalShort).toFixed(5);
                    aggregatedPosition.Exposure = (-longOrShort / totalShort * totalShortExposure).toFixed(4);
                    aggregatedPosition.UnrealizedPL = (aggregatedPosition.QuantityOnHold * aggregatedPosition.AverageEntryPrice - aggregatedPosition.Exposure).toFixed(4);
                }
                aggregatedPosition.UnrealizedPL_Percent = (aggregatedPosition.UnrealizedPL / (aggregatedPosition.QuantityOnHold * aggregatedPosition.AverageEntryPrice)).toFixed(4);
                aggregatedPositions.push(aggregatedPosition);
            });

            return aggregatedPositions;
        };
    });