agmNgModuleWrapper('agmp.product')
    .defineController('p.product.ChartPanelController', ['pProductPageService', 'commonLocationHistoryService', '$filter', "sHeaderService",
        'sProductHistoricalDataService', 'commonTimeZoneService'],
        function (vm, dep, tool) {
            var sProductHistoricalDataService = dep.sProductHistoricalDataService,
                pProductPageService = dep.pProductPageService,
                $filter = dep.$filter,
                commonLocationHistoryService = dep.commonLocationHistoryService,
                commonTimeZoneService = dep.commonTimeZoneService,
                sHeaderService = dep.sHeaderService;

            function getCurrencySymbol() {
                return $filter('currencySymbol')(pProductPageService.currentProduct.Currency);
            }

            function getConsolidatedHistoricalMarketDataPeriod(productId, durationType) {
                var historicalData = [];
                var param = {
                    DurationType: durationType,
                    ProductId: productId
                };
                return sProductHistoricalDataService.GetHistoricalDataFromDuration(param).then(function (res) {

                    res.data.forEach(function (d) {
                        historicalData.push({
                            Volume: d.Volume,
                            Price: d.Close,
                            Date: new Date(d.Timestamp)
                        });
                    });

                    return {
                        Currency: "SGD",
                        HistoricalData: historicalData
                    };
                });
            }

            function getTradingHourRange() {
                switch (pProductPageService.currentProduct.TradeVenueLoc) {
                    case 'SG':
                        return {
                            min: 9,
                            max: 17
                        };
                    case 'US':
                        return {
                            min: 9.5,
                            max: 16
                        };
                }
            }

            function getMarketTimeZone(date, forLabels) {
                switch (vm.selectedPeriodSize.display) {
                    case "5Y":
                    case "1Y":
                        return $filter('monthYearTimeZone')(date, getTimeZone());
                    case "1M":
                        return $filter('dateShort')(date);
                    case "1D":
                        return forLabels ? $filter('timeShortTimeZone')(date, getTimeZone()) : $filter('dateLongWithTimeZone')(date, getTimeZone());
                }
                return date;
            }

            function getTimeZone() {
                return commonTimeZoneService.getTimeZoneMapping(pProductPageService.currentProduct.TradeVenueLoc);
            }

            function getMarketTimeZoneMoment(time) {
                return commonTimeZoneService.getMarketTimeZoneMoment(time, pProductPageService.currentProduct.TradeVenueLoc);
            }

            function getMaxMinValue(list) {
                var range = {
                    min: null,
                    max: null
                };
                list.forEach(function (item) {
                    if (!item) {
                        return;
                    }
                    if (!range.min || range.min > item) {
                        range.min = item;
                    }
                    if (!range.max || range.max < item) {
                        range.max = item;
                    }
                });
                return range;
            }
            var prices = [];
            var volumes = [];
            var dates = [];

            function generateChart(history, periodSize) {
                prices = [];
                volumes = [];
                dates = [];
                if (history.length <= 0) {
                    return;
                }
                if (periodSize === '1D') {
                    var dateFrom = getMarketTimeZoneMoment(history[0].Date);
                    var dateTo = getMarketTimeZoneMoment(history[0].Date);

                    var range = getTradingHourRange();
                    if (range) {

                        dateFrom.hours(range.min);
                        dateFrom.minutes((range.min % 1) * 60);

                        dateTo.hours(range.max);
                        dateTo.minutes((range.max % 1) * 60);
                        var time = history[history.length - 1].Date;
                        while (time.getTime() < dateTo.toDate().getTime()) {
                            time = moment(time).add(10, 'minute').toDate();
                            history.push({
                                Price: null,
                                Volume: null,
                                Date: time
                            });

                        }
                        time = history[0].Date;
                        while (time.getTime() > dateFrom.toDate().getTime()) {
                            time = moment(time).subtract(10, 'minute').toDate();
                            history.unshift({
                                Price: null,
                                Volume: null,
                                Date: time
                            });
                        }
                    }
                }

                history.forEach(function (h) {
                    prices.push(h.Price);
                    volumes.push(h.Volume);
                    dates.push(h.Date);
                });

                var priceRange = getMaxMinValue(prices);
                var volumeRange = getMaxMinValue(volumes);


                function getPrice(idx) {
                    return prices[idx];
                }
                function getVolume(idx) {
                    return volumes[idx];
                }
                function getDate(idx) {
                    return dates[idx];
                }

                function getInterval() {
                    switch (periodSize) {
                        case '1D':
                            return 6;
                        case '1M':
                            return 1;
                        case '1Y':
                            return Math.ceil(history.length / 10) - 1;
                        case '5Y':
                            return Math.ceil(history.length / 10) - 1;
                    }
                }

                vm.chart = {
                    series: [
                        {
                            name: "Volume",
                            data: volumes,
                            color: '#86D3CD',
                            type: 'column',
                            yAxis: 1,
                            borderRadius: 6,
                        },
                        {
                            name: "Price",
                            data: prices,
                            color: '#184376',
                            type: 'line',
                            yAxis: 0
                        }
                    ],
                    yAxis: [
                        {
                            labels: {
                                format: getCurrencySymbol() + ' {value}',
                                style: {
                                    fontSize: '15px'
                                }
                            },
                            gridLineColor: "#EEE",
                            title: {
                                text: null
                            },
                            min: priceRange.min,
                            max: priceRange.max,
                            opposite: true
                        },
                        {
                            title: {
                                text: null
                            },
                            labels: {
                                style: {
                                    fontSize: '15px'
                                }
                            },
                            gridLineColor: "#EEE",
                            min: 0,
                            max: volumeRange.max,
                            opposite: false
                        }
                    ],
                    xAxis: {
                        visible: true,
                        categories: dates,
                        labels: {
                            step: getInterval(periodSize),
                            formatter: function () {
                                if (!this.value || !this.value.getDate) {
                                    return null;
                                }
                                return getMarketTimeZone(this.value, true);
                            }
                        }
                    },

                    title: {
                        text: null
                    },
                    options: {
                        chart: {
                            height: 400
                        },
                        tooltip: {
                            formatter: function () {
                                var idx = this.point.index;
                                return '<div>' +
                                    '<b>Price: ' + getCurrencySymbol() + ' ' + getPrice(idx) + '</b><br/>' +
                                    '<b>Volume: ' + $filter('largeAmountValue')(getVolume(idx)) + '</b><br/>' +
                                    '<b>Date: ' + getMarketTimeZone(getDate(idx), false) + "</b>" +
                                    "</div>";
                            }
                        },
                    },
                };
            }

            var periodSizes = [
                {
                    size: "Month",
                    display: "1M"
                },
                {
                    size: "Year",
                    display: "1Y"
                },
                {
                    size: "FiveYears",
                    display: "5Y"
                }
            ];

            function setPeriodSize(g) {
                vm.selectedPeriodSize = g;
                loadWithSelectedPeriodSize();
            }

            function loadWithSelectedPeriodSize() {
                return getConsolidatedHistoricalMarketDataPeriod(pProductPageService.currentProduct.ProductId, vm.selectedPeriodSize.size)
                    .then(function (res) {
                        vm.data = res.HistoricalData;
                        generateChart(res.HistoricalData, vm.selectedPeriodSize.display);
                    });
            }

            function viewDetailedChart() {
                if (sHeaderService.chartMenuType === "Partner") {
                    commonLocationHistoryService.goToNewTab('/Partners/Inside#/charts/' + pProductPageService.currentProduct.TradeVenueLoc + "/" + pProductPageService.currentProduct.Symbol);
                } else {
                    commonLocationHistoryService.goToNewTab('/Home/Inside#/charts/' + pProductPageService.currentProduct.TradeVenueLoc + "/" + pProductPageService.currentProduct.Symbol);
                }
            }
            

            tool.initialize(function () {
                tool.setVmProperties({
                    chart: null,
                    viewDetailedChart: viewDetailedChart,
                    setPeriodSize: setPeriodSize,
                    selectedPeriodSize: periodSizes[0],
                    periodSizes: periodSizes
                });

                pProductPageService.waitTillProductDetailLoaded().then(function () {
                    loadWithSelectedPeriodSize();
                });
            });
        })
    .defineDirectiveForE('agmp-product-chart-panel', [],
        function () {
            return {
                controller: "p.product.ChartPanelController",
                templateUrl: '/App/pages/product/product.chartPanel.html'
            };
        },
        {

        });