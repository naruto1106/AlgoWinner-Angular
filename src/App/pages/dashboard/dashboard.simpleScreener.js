agmNgModuleWrapper('agmp.dashboard')
    .defineController('p.dashboard.SimpleScreenerController', ["coreUtil", "pDashboardMarketInfoService", 'sMenuRightClickService'],
        function (vm, dep, tool) {
            var pDashboardMarketInfoService = dep.pDashboardMarketInfoService,
                coreUtil = dep.coreUtil,
                sMenuRightClickService = dep.sMenuRightClickService;

            var stockPerformances = {};

            var externalVmForScreener = {
                addToPriceAlert: sMenuRightClickService.addToPriceAlert,
                addToWatchlist: sMenuRightClickService.addToWatchlist,
                gotoChart: function (item) {
                    return sMenuRightClickService.gotoChart(item.ProductModel);
                }
            };

            var columns = [
                {
                    templateId: 'simpleScreener/product-info',
                    classNames: ['product-info', "simple-screener"],
                    title: "Product",
                    sortingFunc: function (a, b) {
                        if (a.ProductModel && b.ProductModel) {
                            return coreUtil.sortName(a.ProductModel.ProductName, b.ProductModel.ProductName);
                        }
                        return 0;
                    }
                },
                {
                    templateId: 'simpleScreener/product-symbol',
                    classNames: ["symbol", "simple-screener"],
                    title: "Symbol",
                    sortingFunc: function (a, b) {
                        if (a.ProductModel && b.ProductModel) {
                            return coreUtil.sortName(a.ProductModel.Symbol, b.ProductModel.Symbol);
                        }
                        return 0;
                    }
                },
                {
                    templateId: 'simpleScreener/last-traded-price',
                    classNames: ['last-traded-price'],
                    title: "Last",
                    sortingFunc: function (a, b) {
                        if (a.Last !== null && b.Last !== null) {
                            return coreUtil.sortValue(a.Last, b.Last);
                        }
                        return 0;
                    }
                },
                {
                    templateId: 'simpleScreener/price-changes',
                    classNames: ['simple-price-changes'],
                    title: "Change",
                    sortingFunc: function (a, b) {
                        if (a.PriceDiffPct !== null && b.PriceDiffPct !== null) {
                            return coreUtil.sortValue(a.PriceDiffPct, b.PriceDiffPct);
                        }
                        return 0;
                    }
                },
                {
                    templateId: 'simpleScreener/trade-volume',
                    classNames: ['trade-volume', "volume"],
                    title: "Volume",
                    sortingFunc: function (a, b) {
                        if (a.Volume !== null && b.Volume !== null) {
                            return coreUtil.sortValue(a.Volume, b.Volume);
                        }
                        return 0;
                    }
                },
                {
                    templateId: 'simpleScreener/screener',
                    classNames: ['buttons'],
                    title: ""
                }
            ];

            function getTopList() {
                vm.topList = [];
                vm.asOfDate = null;

                if (!stockPerformances[vm.selectedTradeVenue]) {
                    vm.isLoading = true;

                    var country = "Singapore";
                    if (vm.selectedTradeVenue === "US") {
                        country = "UnitedStates";
                    }

                    pDashboardMarketInfoService.getStockPerformancesByMarket(country).then(function(res) {
                        stockPerformances[vm.selectedTradeVenue] = res.data;
                        vm.topList = getDataByType(stockPerformances[vm.selectedTradeVenue]);
                    }).finally(function() {
                        vm.isLoading = false;
                    });
                } else {
                    vm.topList = getDataByType(stockPerformances[vm.selectedTradeVenue]);
                }
            }

            function getDataByType(performance) {
                var data = performance.filter(function(x) {
                    return x.PeriodType === vm.selectedPeriod;
                })[0];

                if (!data) {
                    return [];
                }

                vm.asOfDate = data.UpdatedTime;

                if (vm.selectedType === "TopVolume") {
                    return data.TopActive;
                } else if (vm.selectedType === "TopGainers") {
                    return data.TopGainer;
                } else if (vm.selectedType === "TopLosers") {
                    return data.TopLoser;
                }

                return [];
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    topList: [],
                    asOfDate: null,
                    tradeVenueSelections: ["SG", "US"],
                    periodSelections: ["PreviousDay", "PastWeek", "PastMonth"],
                    selectedTradeVenue: "SG",
                    selectedType: "TopVolume",
                    selectedPeriod: "PreviousDay",
                    getTopList: getTopList,
                    gainerLosersListOptions: {
                        visibility: {
                            hasNominalPriceChanges: true,
                            showHeader: true,
                            squeezedHeight: true,
                            hideCurrency: true
                        },
                        forceSorting: true,
                        externalVm: externalVmForScreener,
                        columns: columns,
                        menuList: sMenuRightClickService.menuListProvider
                    },
                    isLoading: false
                });

                getTopList();

                var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                if (timeZone) {
                    vm.timeZone = moment().tz(timeZone).format("z");
                }
            });
        })
    .defineDirectiveForE('agmp-dashboard-simple-screener', [],
        function () {
            return {
                controller: "p.dashboard.SimpleScreenerController",
                templateUrl: '/App/pages/dashboard/dashboard.simpleScreener.html'
            };
        },
        {

        });