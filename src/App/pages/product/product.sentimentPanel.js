agmNgModuleWrapper('agmp.product')
    .defineController('p.product.SentimentPanelController', ['pProductPageService', '$filter'],
        function (vm, dep, tool) {
            var pProductPageService = dep.pProductPageService;

            function lineCharts(container, chartData) {
                Highcharts.chart(container, {
                    title: {
                        text: ''
                    },

                    credits: {
                        enabled: false
                    },

                    subtitle: {
                        text: ''
                    },

                    yAxis: {
                        title: {
                            text: null
                        },
                        labels: {
                            formatter: function () {
                                return this.value + "%"
                            }
                        }
                    },

                    xAxis: {
                        categories: chartData.categories
                    },

                    legend: {
                        layout: 'horizontal',
                        align: 'center'
                    },

                    series: [{
                        name: 'Retail Interest',
                        data: chartData.data
                    }],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'vertical',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }
                });
            }

            function barCharts(container, chartData) {
                var chart = Highcharts.chart(container, {

                    chart: {
                        type: 'column'
                    },

                    credits: {
                        enabled: false
                    },

                    title: {
                        text: ''
                    },

                    subtitle: {
                        text: ''
                    },

                    xAxis: {
                        categories: chartData.categories,
                        labels: {
                            x: -10
                        }
                    },

                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: null
                        }
                    },

                    series: [{
                        name: 'Analyst Rating',
                        data: chartData.analyst_rating
                    }],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    align: 'center',
                                    verticalAlign: 'bottom',
                                    layout: 'horizontal'
                                },
                                yAxis: {
                                    labels: {
                                        align: 'left',
                                        x: 0,
                                        y: -5
                                    },
                                    title: {
                                        text: null
                                    }
                                },
                                subtitle: {
                                    text: null
                                },
                                credits: {
                                    enabled: false
                                }
                            }
                        }]
                    }
                });
                chart.setSize(null);
            }

            function changeRetailActivityChartPeriod() {
                retailActivityChart(vm.selectedPeriod);
            }

            function retailActivityChart(period) {
                pProductPageService.getRetailActivity(period).then(function () {
                    var retailActivity = pProductPageService.retailActivity;
                    vm.retailSentimentScore = retailActivity.Score;
                    var categories = [];
                    var data = [];
                    retailActivity.Sentiments.map(function (itemObj, itemKey) {
                        if (itemObj.RecordDate !== undefined && itemObj.RecordDate !== null && itemObj.RecordDate !== '') {
                            categories.push(moment(itemObj.RecordDate).format("YYYY-MM-DD"));
                        }
                        if (itemObj.Value !== undefined && itemObj.Value !== null && itemObj.Value !== '') {
                            data.push(itemObj.Value);
                        }
                    });
                    var chartData = {
                        categories: categories,
                        data: data,
                    };
                    lineCharts('retail_buying_activity', chartData);
                });
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    selectedPeriod: "1 Week",
                    periods: ["1 Week", "1 Month", "3 Month", "6 Months", "1 Year"],
                    changeRetailActivityChartPeriod: changeRetailActivityChartPeriod,
                });

                var productDetail = pProductPageService.productDetail;
                vm.productDetail = productDetail;
                vm.isLoading = pProductPageService.isLoading;

                pProductPageService.waitTillProductDetailLoaded().then(function () {

                    pProductPageService.getNewsSentiment().then(function () {
                        var newsSentiment = pProductPageService.newsSentiment;
                        vm.newsSentiment = [{
                            NewsSentimentType: "Past 1 Hour",
                            SentimentScore: newsSentiment.Past1HourScore,
                            Volume: newsSentiment.Past1HourVolume,
                            IsVolumeBreakout: newsSentiment.Is1HourBreakout
                        },
                        {
                            NewsSentimentType: "Past 24 Hours",
                            SentimentScore: newsSentiment.Past24HourScore,
                            Volume: newsSentiment.Past24HourVolume,
                            IsVolumeBreakout: newsSentiment.Is24HourBreakout
                        },
                        {
                            NewsSentimentType: "Past 1 Week",
                            SentimentScore: newsSentiment.Past1WeekScore,
                            Volume: newsSentiment.Past1WeekVolume,
                            IsVolumeBreakout: newsSentiment.Is1WeekBreakout
                        }]
                    });

                    //Set Analyst Rating chat values for US market only
                    if (productDetail.Product.TradeVenueLoc == 'US') {
                        retailActivityChart(vm.selectedPeriod);

                        pProductPageService.getLatestAnalystRating().then(function () {
                            var latestAnalystRating = pProductPageService.latestAnalystRating;
                            var chartData = {
                                categories: ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'],
                                analyst_rating: [
                                    latestAnalystRating.CountStrongBuy,
                                    latestAnalystRating.CountBuy,
                                    latestAnalystRating.CountHold,
                                    latestAnalystRating.CountSell,
                                    latestAnalystRating.CountStrongSell
                                ]
                            };
                            barCharts('analyst_rating', chartData);
                        });

                        pProductPageService.getAnalystTargetPrice().then(function () {
                            vm.analystTargetPrice = pProductPageService.analystTargetPrice;
                            if (vm.analystTargetPrice && vm.analystTargetPrice.AnalystTargetPrice) {
                                vm.analystTargetPrice.AnalystTargetPrice = vm.analystTargetPrice.AnalystTargetPrice.toFixed(2);
                            }
                        });
                    }
                });
            });
        })
    .defineDirectiveForE('agmp-product-sentiment-panel', [],
        function () {
            return {
                controller: "p.product.SentimentPanelController",
                templateUrl: '/App/pages/product/product.sentimentPanel.html'
            };
        },
        {
        });