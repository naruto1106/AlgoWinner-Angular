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
            var useAnalystRatingFilter = false;
            var useNoiseFilter = false;
            var useSectorFilter = false;
            var useIndustryFilter = false;
            var useTurnoverFilter = false;
            
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
            
            //analyst rating filter
            var analystRatings = [];
            obj.analystRating.forEach(function (ar) {
                if (ar.checked) {
                    var fromVal = (ar.name).split("to")[0];
                    var toVal = (ar.name).split("to")[1];
                    if(fromVal !== undefined && fromVal !== null && fromVal !== ''){
                        fromVal = (fromVal).replace(/[&\/\\#,+()$~%'":*?<>{}=]/g, '');
                    } else {
                        fromVal = null;
                    }
                    if(toVal !== undefined && toVal !== null && toVal !== ''){
                        toVal = (toVal).replace(/[&\/\\#,+()$~%'":*?<>{}=]/g, '');
                    } else {
                        toVal = null;
                    }
                    var analystRatingJSON = {
                        From: parseFloat(fromVal),
                        To: parseFloat(toVal)
                    }
                    analystRatings.push(analystRatingJSON);
                }
            });
            if (analystRatings.length > 0 && analystRatings.length < obj.analystRating.length) {
                useAnalystRatingFilter = true;
            }
            
            //noise filter
            var noise = [];
            obj.noise.forEach(function (n) {
                if (n.checked) {
                    var fromVal = (n.name).split("to")[0];
                    var toVal = (n.name).split("to")[1];
                    if(fromVal !== undefined && fromVal !== null && fromVal !== ''){
                        fromVal = (fromVal).replace(/[&\/\\#,+()$~%'":*?<>{}=]/g, '');
                    } else {
                        fromVal = null;
                    }
                    if(toVal !== undefined && toVal !== null && toVal !== ''){
                        toVal = (toVal).replace(/[&\/\\#,+()$~%'":*?<>{}=]/g, '');
                    } else {
                        toVal = null;
                    }
                    var noiseJSON = {
                        From: parseFloat(fromVal),
                        To: parseFloat(toVal)
                    }
                    noise.push(noiseJSON);
                }
            });
            if (noise.length > 0 && noise.length < obj.noise.length) {
                useNoiseFilter = true;
            }
            
            //turnover filter
            var turnover = [];
            obj.turnover.forEach(function (t) {
                if (t.checked) {
                    var fromVal = (t.name).split("to")[0];
                    var toVal = (t.name).split("to")[1];
                    if(fromVal !== undefined && fromVal !== null && fromVal !== ''){
                        fromVal = (fromVal).replace(/[&\/\\#,+()$~%'":*?<>{}=]/g, '');
                    } else {
                        fromVal = null;
                    }
                    if(toVal !== undefined && toVal !== null && toVal !== ''){
                        toVal = (toVal).replace(/[&\/\\#,+()$~%'":*?<>{}=]/g, '');
                    } else {
                        toVal = null;
                    }
                    var turnoverJSON = {
                        From: parseFloat(fromVal),
                        To: parseFloat(toVal)
                    }
                    turnover.push(turnoverJSON);
                }
            });
            if (turnover.length > 0 && turnover.length < obj.turnover.length) {
                useTurnoverFilter = true;
            }
            
            //sector industry filter
            var sector = [];
            var sectorAllData = [];
            var industry = [];
            var industryAllData = [];
            obj.sectorIndustry.forEach(function (object) {
                if(object.name === 'Sector'){
                    object.data.forEach(function (sObj) {
                        sectorAllData.push(sObj);
                        if (sObj.checked) {
                            sector.push(sObj.name);
                        }
                    });
                }
                if(object.name === 'Industry'){                    
                    object.data.forEach(function (iObj) {
                        industryAllData.push(iObj);
                        if (iObj.checked) {
                            industry.push(iObj.name);
                        }
                    });
                }
            });
            if (sector.length > 0 && sector.length < sectorAllData.length) {
                useSectorFilter = true;
            }
            if (industry.length > 0 && industry.length < industryAllData.length) {
                useIndustryFilter = true;
            }

            var returnedObject = {
                UsePriceRangeFilter: usePriceRangeFilter,
                PriceRanges: usePriceRangeFilter ? priceRanges : [],
                UseMarketCapFilter: useMarketCapFilter,
                MarketCapTypes: useMarketCapFilter ? marketCaps : [],
                UsePeRatioFilter: usePeRatioFilter,
                PeRatios: usePeRatioFilter ? peRatios : [],
                UseEgRatioFilter: useEgRatioFilter,
                EgRatios: useEgRatioFilter ? earningGrowths : [],
                AnalystRatings: useAnalystRatingFilter ? analystRatings : [],
                UseAnalystRatingFilter: useAnalystRatingFilter,
                Noise: useNoiseFilter ? noise : [],
                UseNoiseFilter: useNoiseFilter,
                Turnover: useTurnoverFilter ? turnover : [],
                UseTurnoverFilter: useTurnoverFilter,
                Sector: useSectorFilter ? sector : [],
                Industry: useIndustryFilter ? industry : [],
                UseSectorFilter: useSectorFilter,
                UseIndustryFilter: useIndustryFilter
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