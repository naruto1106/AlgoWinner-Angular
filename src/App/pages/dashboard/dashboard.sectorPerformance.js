agmNgModuleWrapper('agmp.dashboard')
    .defineController('p.dashboard.SectorPerformanceController', ["pDashboardMarketInfoService", "orderByFilter"],
    function (vm, dep, tool) {
        var pDashboardMarketInfoService = dep.pDashboardMarketInfoService,
            orderByFilter = dep.orderByFilter;
        var chart = null;
        var lossColor = "#D63131";
        var profitColor = "#009A7F";

        function showSectorInformation(sectorName) {
            if (!vm.showSectorInformation) {
                vm.showSectorInformation = true;
                chart.setSize(500, 440);
            }
            vm.selectedSector = vm.sectorPerformances.filter(function (sp) {
                return sp.SectorInfoModel.SectorName === sectorName;
            })[0];

            vm.isLoading = true;
            pDashboardMarketInfoService.getTopPerformingCompanyForSector(
                getSelectedMarket(),
                vm.selectedSector.SectorInfoModel.SectorId,
                getPerformancePeriodType()
            ).then(function (res) {
                vm.selectedSector.Companies = res.data.Data;
                vm.isLoading = false;
            });
        }

        function onPeriodChange() {
            if (vm.showSectorInformation && vm.selectedSector) {
                showSectorInformation(vm.selectedSector.SectorInfoModel.SectorName);
            }
            vm.generateChart(vm.sectorPerformances);
        }

        function getPerformancePeriodType() {
            switch (vm.selectedPeriod) {
                case "1 Week":
                    return "OneWeek";
                case "1 Month":
                    return "OneMonth";
                case "3 Month":
                    return "ThreeMonths";
                case "1 Year":
                    return "OneYear";
                default:
                    return "OneWeek";
            }
        }

        function getPerformanceByPeriod(sectorPerformance) {
            switch (vm.selectedPeriod) {
                case "1 Week":
                    return sectorPerformance.Performance.OneWeek;
                case "1 Month":
                    return sectorPerformance.Performance.OneMonth;
                case "3 Month":
                    return sectorPerformance.Performance.ThreeMonths;
                case "1 Year":
                    return sectorPerformance.Performance.Oneyear;
                default:
                    return sectorPerformance.Performance.OneWeek;
            }
        }

        function sortPerformance(sectorPerformances) {
            //remove the sector which all performances is 0
            sectorPerformances = sectorPerformances.filter(function (sp) {
                return !(sp.Performance.OneWeek === 0 && sp.Performance.OneMonth === 0 && sp.Performance.ThreeMonths === 0 && sp.Performance.Oneyear === 0);
            });

            //sort the list
            switch (vm.selectedSorting) {
                case "Best Performing":
                    switch (vm.selectedPeriod) {
                        case "1 Week":
                            return orderByFilter(sectorPerformances, "-Performance.OneWeek");
                        case "1 Month":
                            return orderByFilter(sectorPerformances, "-Performance.OneMonth");
                        case "3 Month":
                            return orderByFilter(sectorPerformances, "-Performance.ThreeMonths");
                        case "1 Year":
                            return orderByFilter(sectorPerformances, "-Performance.Oneyear");
                        default:
                            return orderByFilter(sectorPerformances, "-Performance.OneWeek");
                    }
                case "Worst Performing":
                    switch (vm.selectedPeriod) {
                        case "1 Week":
                            return orderByFilter(sectorPerformances, "Performance.OneWeek");
                        case "1 Month":
                            return orderByFilter(sectorPerformances, "Performance.OneMonth");
                        case "3 Month":
                            return orderByFilter(sectorPerformances, "Performance.ThreeMonths");
                        case "1 Year":
                            return orderByFilter(sectorPerformances, "Performance.Oneyear");
                        default:
                            return orderByFilter(sectorPerformances, "Performance.OneWeek");
                    }
                case "A - Z":
                    return orderByFilter(sectorPerformances, "SectorInfoModel.SectorName");
                case "Z - A":
                    return orderByFilter(sectorPerformances, "-SectorInfoModel.SectorName");
                default:
                    return orderByFilter(sectorPerformances, "SectorInfoModel.SectorName");
            }
        }

        function generateChart(sectorPerformances) {
            var sortedPerformances = sortPerformance(sectorPerformances);

            var categories = [];
            var data = [];
            sortedPerformances.forEach(function (sp) {
                categories.push(sp.SectorInfoModel.SectorName);
                var performance = getPerformanceByPeriod(sp);

                data.push({
                    y: parseFloat((performance * 100).toFixed(2)),
                    color: performance >= 0 ? profitColor : lossColor
                });
            });

            var chartConfig = {
                chart: {
                    type: 'bar',
                    style: {
                        fontFamily: 'Open Sans'
                    }
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: categories,
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    title: {
                        enabled: false
                    },
                    labels: {
                        enabled: false
                    }
                },
                tooltip: {
                    valueSuffix: '%'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {},
                credits: {
                    enabled: false
                },
                series: [{
                    showInLegend: false,
                    name: 'Performance',
                    data: data,
                    dataLabels: {
                        formatter: function () {
                            return this.y + '%';
                        }
                    }
                }]
            };

            chart = Highcharts.chart('sector-chart-container', chartConfig);

            $('.highcharts-xaxis-labels text').on('click', function () {
                showSectorInformation($(this).text());
            });
        }

        function getSectorPerformancesByMarket() {
            vm.isLoading = true;
            vm.showSectorInformation = false;
            pDashboardMarketInfoService.getSectorPerformancesByMarket(getSelectedMarket()).then(function (res) {
                vm.sectorPerformances = res.data.Data;
                vm.sectorPerformances = vm.sectorPerformances.filter(function(sp) {
                    return sp.SectorInfoModel.SectorName !== "Miscellaneous";
                });
                generateChart(vm.sectorPerformances);
            }).finally(function () {
                vm.isLoading = false;
            });
        }

        function getSelectedMarket() {
            var market = "Singapore";
            if (vm.selectedMarket === "US") {
                market = "UnitedStates";
            }

            return market;
        }

        tool.initialize(function () {
            tool.setVmProperties({
                isLoading: false,
                showSectorInformation: false,
                selectedSector: null,
                selectedMarket: "SG",
                markets: ["SG", "US"],
                sortingTypes: ["Best Performing", "Worst Performing", "A - Z", "Z - A"],
                selectedSorting: "Best Performing",
                selectedPeriod: "1 Week",
                periods: ["1 Week", "1 Month", "3 Month", "1 Year"],
                sectorPerformances: [],

                generateChart: generateChart,
                getSectorPerformancesByMarket: getSectorPerformancesByMarket,
                onPeriodChange: onPeriodChange
            });

            var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (timeZone) {
                vm.timeZone = moment().tz(timeZone).format("z");
            }

            getSectorPerformancesByMarket();
        });
    })
    .defineDirectiveForE('agmp-dashboard-sector-performance', [],
    function () {
        return {
            controller: "p.dashboard.SectorPerformanceController",
            templateUrl: '/App/pages/dashboard/dashboard.sectorPerformance.html'
        };
    },
    {
    });