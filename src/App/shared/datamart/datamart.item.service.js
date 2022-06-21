agmNgModuleWrapper('agms.datamart')
    .defineService('sDatamartItemService', [], function (serviceObj, dep, tool) {

        function handleSingleData(item) {
            var list = [];
            item.AlgoFeeds.forEach(function (af) {
                af.Timestamp = new Date(af.Timestamp);
                if (af.TransactionDate) {
                    af.Timestamp = new Date(af.TransactionDate);
                }
                list.push({
                    AlgoFeed: af,
                    ProductModel: item.Product,
                    MarketData: {}
                });
            });
            return list;
        }

        function evaluateFundamentalAndReturnMergedObjects(obj) {
            var useMarketCapFilter = false;
            var usePriceRangeFilter = false;
            var usePeRatioFilter = false;
            var useEgRatioFilter = false;

            //market cap filter
            var marketCaps = [];
            obj.marketCaps.forEach(function (mc) {
                if (mc.checked) {
                    marketCaps.push(mc.name);
                }
            });
            if (marketCaps.length > 0 && marketCaps.length < obj.marketCaps.length) {
                useMarketCapFilter = true;
            }

            //price range filter
            var priceRanges = [];
            obj.priceRanges.forEach(function (pr) {
                if (pr.checked) {
                    priceRanges.push({
                        From: pr.from,
                        To: pr.to
                    });
                }
            });
            if (priceRanges.length > 0 && priceRanges.length < obj.priceRanges.length) {
                usePriceRangeFilter = true;
            }

            //PE ratio filter
            var peRatios = [];
            obj.peRatios.forEach(function (pr) {
                if (pr.checked) {
                    peRatios.push({
                        From: pr.from,
                        To: pr.to
                    });
                }
            });
            if (peRatios.length > 0 && peRatios.length < obj.peRatios.length) {
                usePeRatioFilter = true;
            }

            //earnings growth filter
            var earningGrowths = [];
            obj.earningGrowths.forEach(function (eg) {
                if (eg.checked) {
                    earningGrowths.push({
                        From: eg.from,
                        To: eg.to
                    });
                }
            });
            if (earningGrowths.length > 0 && earningGrowths.length < obj.earningGrowths.length) {
                useEgRatioFilter = true;
            }

            var returnedObject = {
                UsePriceRangeFilter: usePriceRangeFilter,
                PriceRanges: usePriceRangeFilter ? priceRanges : [],
                UseMarketCapFilter: useMarketCapFilter,
                MarketCapTypes: useMarketCapFilter ? marketCaps : [],
                UsePeRatioFilter: usePeRatioFilter,
                PeRatios: usePeRatioFilter ? peRatios : [],
                UseEgRatioFilter: useEgRatioFilter,
                EgRatios: useEgRatioFilter ? earningGrowths : []
            };
            if (obj.volumeConditions) {
                var volumeRanges = [];
                obj.volumeConditions.forEach(function (eg) {
                    if (eg.checked) {
                        volumeRanges.push({
                            From: eg.from,
                            To: eg.to
                        });
                    }
                });

                returnedObject.VolumeRanges = [];
                returnedObject.UseVolumeRangeFilter = false;

                if (volumeRanges.length > 0 && volumeRanges.length < obj.volumeConditions.length) {
                    returnedObject.VolumeRanges = volumeRanges;
                    returnedObject.UseVolumeRangeFilter = true;
                }
            }

            return returnedObject;
        }

        tool.setServiceObjectProperties({
            handleSingleData: handleSingleData,
            evaluateFundamentalAndReturnMergedObjects: evaluateFundamentalAndReturnMergedObjects
        });
    });