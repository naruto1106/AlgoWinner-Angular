agmNgModuleWrapper("agms.tgps")
    .defineControllerAsPopup("s.tgps.FundamentalFilterController",
        {
            templateUrl: '/App/shared/tgps/tgps.fundamentalFilter.html',
            windowClass: 'default-modal tgps-fundamental-filter-popup'
        },
        ['fundamentals', 'sMarketEntitlementService', 'sTgpsScreenerService'],
        function (vm, dep, tool) {
            var sTgpsScreenerService = dep.sTgpsScreenerService,
                sMarketEntitlementService = dep.sMarketEntitlementService;

            function closePanel() {
                var returnedFundamentals = {};
                vm.fundamentalList.forEach(function(f) {
                    returnedFundamentals[f.TradeVenue] = f;
                    f.tradeVenueDetail = null;
                });
                vm.uibClosePanel(returnedFundamentals);
            }

            function showMarketCap(mc) {
                return mc.name;
            }

            function generateFundamentalList(fundamentals) {
                var fundamentalList = [];
                for (var key in fundamentals) {
                    var fundamental = angular.copy(fundamentals[key]);
                    var hasTradeVenue = sMarketEntitlementService.tradeVenuesDict[key];
                    if (hasTradeVenue) {
                        fundamental.tradeVenueDetail = sMarketEntitlementService.tradeVenuesDict[key];
                        fundamental.TradeVenue = sMarketEntitlementService.tradeVenuesDict[key].TradeVenue;
                        //fundamentalList.push(fundamental);

                        fundamental.analystRating = [
                            {
                                "name": "1 >= to <= 1.5",
                                "checked": true
                            },
                            {
                                "name": ">1.5 to <= 2.5",
                                "checked": true
                            },
                            {
                                "name": "> 2.5 to < 3.5",
                                "checked": true
                            },
                            {
                                "name": ">= 3.5 to < 4.5",
                                "checked": true
                            },
                            {
                                "name": ">= 4.5 to <= 5",
                                "checked": true
                            }
                        ]
                        
                        fundamental.turnover = [
                            {
                                "name": "< 1 M",
                                "checked": true
                            },
                            {
                                "name": "1 M - 10 M",
                                "checked": true
                            },
                            {
                                "name": "> 10 M",
                                "checked": true
                            }
                        ]
                        
                        fundamental.noise = [
                            {
                                "name": "<5",
                                "checked": true
                            },
                            {
                                "name": "5 to 10",
                                "checked": true
                            },
                            {
                                "name": "10 to 15",
                                "checked": true
                            },
                            {
                                "name": ">95",
                                "checked": true
                            }
                        ]

                        fundamental.sectorIndustry = [
                            {
                                "name": "Sector",
                                "checked": true,
                                "data" : [
                                    {
                                        "name": "Energy",
                                        "checked": true
                                    },
                                    {
                                        "name": "Financials",
                                        "checked": true
                                    },
                                    {
                                        "name": "Consumer Staples",
                                        "checked": false
                                    }
                                ]
                            },
                            {
                                "name": "Industry",
                                "checked": false,
                                "data" : [
                                    {
                                        "name": "Energy I",
                                        "checked": true
                                    },
                                    {
                                        "name": "Financials I",
                                        "checked": false
                                    },
                                    {
                                        "name": "Consumer Staples I",
                                        "checked": true
                                    }
                                ]
                            }
                        ]

                        fundamentalList.push(fundamental);
                    }                    
                }
                return fundamentalList;
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    closePanel:closePanel,
                    fundamentalList: generateFundamentalList(dep.fundamentals),
                    showRange: sTgpsScreenerService.showRange,
                    showMarketCap: showMarketCap
                });
            });
        });