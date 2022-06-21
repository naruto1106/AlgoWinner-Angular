agmNgModuleWrapper('agms.market')
    .defineService('sMarketEntitlementService', [], function (serviceObj, dep, tool) {

        var coreUserStateService = dep.coreUserStateService,
            coreConfigService = dep.coreConfigService;

        var tradeVenuesThatHasFundamentals = ['HK', 'SG', 'US'];
        var indexWithRealTimeData = ["$SPX", "$STI-SES", "$HSI-HKG", "$HSCEI-HKG", "$XIN9-FTSE"];
        var availableTradeVenues = {
            SG: {
                TradeVenue: "SG",
                Label: "SG Market",
                ImageUrl: "//am708403.azureedge.net/images/flags/singapore_round_icon_64.png",
                Value: "Singapore"
            },
            US: {
                TradeVenue: "US",
                Label: "US Market",
                ImageUrl: "//am708403.azureedge.net/images/flags/united_states_of_america_round_icon_64.png",
                Value: "UnitedStates"
            },
            HK: {
                TradeVenue: "HK",
                Label:
                "HK Market",
                ImageUrl:
                "//am708403.azureedge.net/images/flags/hk_round_icon_64.png",
                Value:
                "Hongkong"
            },
            MY: {
                TradeVenue: "MY",
                Label:
                    "MY Market",
                ImageUrl:
                    "//am708403.azureedge.net/images/flags/malaysia_round_icon_64.png",
                Value:
                    "Malaysia"
            },
            CHN: {
                TradeVenue: "CHN",
                Label:
                "CN Market",
                ImageUrl:
                "//am708403.azureedge.net/images/flags/china_round_icon_64.png",
                Value:
                "China"
            }
        };

        function initializeMarketDataDelayStatus() {
            serviceObj.marketData = {
                IsDelayed: false,
                IsDelayedSG: false,
                IsDelayedUS: false
            };
            coreUserStateService.myPremiumItemSubscriptionsLoaded.then(function () {
                if (!coreUserStateService.hasSGRealTimeMarketData()) {
                    serviceObj.marketData.IsDelayed = true;
                    serviceObj.marketData.IsDelayedSG = true;
                }
                if (!coreUserStateService.hasUSRealTimeMarketData()) {
                    serviceObj.marketData.IsDelayed = true;
                    serviceObj.marketData.IsDelayedUS = true;
                }
            });
        }

        function getMarketDataLatencyStatus(product) {
            if (product.AssetType === 'Indices') {
                return getMarketDataLatencyStatusForIndices(product);
            } else {
                return getMarketDataLatencyStatusForStocks(product);
            }
        }

        function getMarketDataLatencyStatusForIndices(product) {
            return getLatencyStatusOfIndices(product.Symbol);
        }

        function getMarketDataLatencyStatusForStocks(product) {
            return getMarketDataLatencyStatusByTradeVenueLoc(product.TradeVenueLoc);
        }

        function getLatencyStatusOfIndices(indexSymbol) {
            return indexWithRealTimeData.indexOf(indexSymbol) > -1 ? "RealTime" : "Delayed";
        }

        function getMarketDataLatencyStatusByTradeVenueLoc(tradeVenueLoc) {
            var status = "RealTime";
            var noIntradayMarkets = coreConfigService.Chart.NoIntradayMarkets ? coreConfigService.Chart.NoIntradayMarkets.split(',') : [];
            switch (tradeVenueLoc) {
                case "SG":
                    status = serviceObj.marketData.IsDelayedSG ? "Delayed" : "RealTime";
                    break;
                case "US":
                    status = serviceObj.marketData.IsDelayedUS ? "Delayed" : "RealTime";
                    break;
                case "UK":
                case "HK":
                case "CHN":
                case "MY":
                    status = "Delayed";
                    break;
            }
            if (noIntradayMarkets.indexOf(tradeVenueLoc) > -1) {
                status = "EOD";
            }
            return status;
        }

        function getTradeVenueStrings() {
            if (!coreConfigService.TradersGPS || !coreConfigService.TradersGPS.TradeVenues) {
                return ["SG", "US"];
            }
            return coreConfigService.TradersGPS.TradeVenues.split(',');
        }

        function generatingAvailableTradeVenues() {
            var tradeVenues = [];
            var tradeVenueStrings = getTradeVenueStrings();
            tradeVenueStrings.forEach(function (tvString) {
                if (availableTradeVenues[tvString]) {
                    tradeVenues.push(availableTradeVenues[tvString]);
                }
            });
            return tradeVenues;
        }

        function generatingAvailableTradeVenuesDict() {
            var tradeVenuesDict = [];
            var tradeVenueStrings = getTradeVenueStrings();
            tradeVenueStrings.forEach(function (tvString) {
                if (availableTradeVenues[tvString]) {
                    tradeVenuesDict[tvString] = availableTradeVenues[tvString];
                }
            });
            return tradeVenuesDict;
        }

        function checkRealTimeForProducts(productList) {
            productList.forEach(function (p) {
                p.DisplayMarketDataStatus = false;

                switch (p.TradeVenueLoc) {
                    case "CHN":
                    case "HK":
                    case "MY":
                        p.MarketDataStatus = "EOD";
                        break;
                    case "US":
                        coreUserStateService.myPremiumItemSubscriptionsLoaded.then(function () {
                            if (coreUserStateService.hasUSRealTimeMarketData()) {
                                p.MarketDataStatus = "Realtime";
                            } else {
                                p.MarketDataStatus = "EOD";
                            }
                        });
                        break;
                    case "SG":
                        coreUserStateService.myPremiumItemSubscriptionsLoaded.then(function () {
                            if (coreUserStateService.hasSGRealTimeMarketData()) {
                                p.MarketDataStatus = "Realtime";
                            } else {
                                p.MarketDataStatus = "EOD";
                            }
                        });
                        break;
                    default:
                        p.MarketDataStatus = "EOD";
                        break;
                }
            });
        }

        

        tool.setServiceObjectProperties({
            tradeVenues: generatingAvailableTradeVenues(),
            tradeVenuesDict: generatingAvailableTradeVenuesDict(),
            getMarketDataLatencyStatusByTradeVenueLoc: getMarketDataLatencyStatusByTradeVenueLoc,
            getLatencyStatusOfIndices: getLatencyStatusOfIndices,
            getMarketDataLatencyStatus: getMarketDataLatencyStatus,
            checkRealTimeForProducts: checkRealTimeForProducts,
            tradeVenuesThatHasFundamentals: tradeVenuesThatHasFundamentals
        });

        initializeMarketDataDelayStatus();
    });