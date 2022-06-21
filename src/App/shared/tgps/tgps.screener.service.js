agmNgModuleWrapper("agms.tgps")
    .defineService('sTgpsScreenerService',
        [],
        function (serviceObj, dep, tool) {
            function showRange(pr) {
                var fromLabel = pr.fromLabel || pr.from;
                var toLabel = pr.toLabel || pr.to;
                if (pr.from == null) {
                    return "<" + toLabel;
                } else if (pr.to == null) {
                    return ">" + fromLabel;
                } else {
                    return fromLabel + "-" + toLabel;
                }
            }
            
            function preprocessFilterListFunc(filter, list) {
                var result = list;

                if (filter.searchProductFilter && filter.searchProductFilter.ProductId) {
                    result = result.filter(function (item) {
                        return item.ProductModel.ProductId === filter.searchProductFilter.ProductId;
                    });
                }

                return result;
            }

            function valueFromLastSignal(x) {
                switch (x) {
                    case "Swing Buy 20 MA":
                        return 4;
                    case "Swing Buy 10 MA":
                        return 3;
                    case "Swing Sell 10 MA":
                        return 2;
                    case "Swing Sell 20 MA":
                        return 1;
                }
                return 0;
            }

            tool.setServiceObjectProperties({
                showRange: showRange,
                preprocessFilterListFunc: preprocessFilterListFunc,
                valueFromLastSignal: valueFromLastSignal,
                fundamentalFilterNumber: 0
            });
        })