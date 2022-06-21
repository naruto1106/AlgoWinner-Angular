agmNgModuleWrapper('agmp.dashboard', ['agms.news'])
    .defineService('pDashboardPageService', [
        'sWatchlistService'
    ],
    function (serviceObj, dep, tool) {

        var sWatchlistService = dep.sWatchlistService,
            coreConfigService = dep.coreConfigService;
        
        //this method is shared between big screener, news and data mart
        function getFilteredIndustryList(selectedTradeVenue) {
            if (serviceObj.industrySelections && serviceObj.industrySelections.length > 0) {
                return serviceObj.industrySelections.filter(function (u) {
                    // hide warrants, US Index
                    return u.Sector.TradeVenue === selectedTradeVenue && u.Sector.SectorName !== "Warrants" && u.Sector.SectorName !== "US Index";
                });
            } else {
                return [];
            }
        }
        
        function getAssetClasses() {
            if (serviceObj.screenerSharedState && serviceObj.screenerSharedState.filter.selectedTradeVenue === "SG") {
                return coreConfigService.MarketScreener.AssetClasses.split(',');
            } else {
                return ["Stocks & ETFs"];
            }
        }

        function getTradeVenues(type) {
            if (type === "Basic") {
                return coreConfigService.MarketScreener.BasicScreenerTradeVenues.split(',');
            }
            if (type === "Custom") {
                return coreConfigService.MarketScreener.CustomScreenerTradeVenues.split(',');
            }
        }
        
        function resetAllFlagsInSectorIndustrySelection(sectorIndustries, flag) {
            sectorIndustries.Industries.forEach(function (industry) {
                industry.isSelected = flag;
            });
        }

        function getIndustriesAndSectors() {
            var allIndustryAvailabilityList = null;
            var tradeVenueList = [];

            return sWatchlistService.getAllIndustryAvailabilityList().then(function (res) {
                allIndustryAvailabilityList = res.data;
                allIndustryAvailabilityList.forEach(function (sectorIndustries) {
                    sectorIndustries.isAllSelected = true;
                    if (!sectorIndustries.Industries) {
                        sectorIndustries.Industries = [];
                    }
                    resetAllFlagsInSectorIndustrySelection(sectorIndustries, true);
                });

                allIndustryAvailabilityList.sort(function (a, b) {
                    return dep.coreUtil.sortName(a.Sector.SectorName, b.Sector.SectorName);
                });

                allIndustryAvailabilityList.forEach(function (al) {
                    al.Industries.forEach(function (industry) {
                        if (industry.IndustryName.toUpperCase() === "NOT AVAILABLE") {
                            industry.IndustryName = "Others";
                        };
                    });
                    if (tradeVenueList.indexOf(al.Sector.TradeVenue) < 0) {
                        tradeVenueList.push(al.Sector.TradeVenue);
                    }
                });
                return {
                    allIndustryAvailabilityList: allIndustryAvailabilityList,
                    tradeVenueList: tradeVenueList
                };
            });
        }
        
        function sortProductByCreatedTime(list) {
            return list.sort(function (a, b) {
                if (a.CreatedTime && b.CreatedTime) {
                    return a.CreatedTime.localeCompare(b.CreatedTime);
                }
                return 0;
            });
        }
        
        tool.setServiceObjectProperties({
            sortProductByCreatedTime: sortProductByCreatedTime,
            industrySelections: [],
            getFilteredIndustryList: getFilteredIndustryList,
            getIndustriesAndSectors: getIndustriesAndSectors,
            screenerSharedState: {
                filter: {
                    selectedSector: "",
                    mode: 'Basic',
                    toDate: new Date(moment().endOf('day').toDate()),
                    fromDate: new Date(moment().startOf('day').toDate()),
                    minDate: null, // moment(new Date(2016, 0, 1)).format(),
                    treeStructure: [],
                    selectedTradeVenue: "SG",
                    selectedAssetClass: "Stocks & ETFs",
                    basicOption: 'TopVolume',
                    assetClasses: getAssetClasses(),
                    basicScreenerTradeVenues: getTradeVenues("Basic")
                },
                topList: {}
            }            
        });
    });
