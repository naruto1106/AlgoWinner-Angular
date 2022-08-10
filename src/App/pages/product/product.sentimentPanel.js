agmNgModuleWrapper('agmp.product')
    .defineController('p.product.SentimentPanelController', ['pProductPageService', '$filter'],
        function (vm, dep, tool) {
            var pProductPageService = dep.pProductPageService;

            function lineCharts(container){
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
                        accessibility: {
                            rangeDescription: ''
                        }                        
                    },
                
                    legend: {
                        layout: 'horizontal',
                        align: 'center'
                    },
                
                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: true
                            },
                            pointStart: 2016
                        }
                    },
                
                    series: [{
                        name: 'Retail Interest',
                        data: [0.1, 0.5, 0.10, 0.12, 0.3, 0.4, 0.10]
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

            function barCharts(container, chartData){
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

            var newsSentiments = [{
                NewsSentimentType: "Past 1 Hour",
                SentimentScore: -0.33,
                Volume: 5,
                IsVolumeBreakout: false
            },
            {
                NewsSentimentType: "Past 24 Hours",
                SentimentScore: 0.55,
                Volume: 30,
                IsVolumeBreakout: true
            },
            {
                NewsSentimentType: "Past 1 Week",
                SentimentScore: 0.88,
                Volume: 50,
                IsVolumeBreakout: false
            }];                        

            tool.initialize(function () {
                tool.setVmProperties({
                    newsSentiment: newsSentiments,
                    selectedPeriod: "1 Week",
                    periods: ["1 Week", "1 Month", "3 Month", "6 Months", "1 Year"],
                });

                pProductPageService.waitTillProductDetailLoaded().then(function () {

                    lineCharts('retail_buying_activity');                    

                    var productDetail = pProductPageService.productDetail;
                    //console.log("productDetail: ", productDetail);
                    vm.productDetail = productDetail;
                    vm.isLoading = pProductPageService.isLoading;

                    //Set Analyst Rating chat values for US market only
                    if(productDetail.Product.TradeVenueLoc == 'US'){
                        pProductPageService.getLatestAnalystRating().then(function(){
                                var latestAnalystRating = pProductPageService.latestAnalystRating;
                                var chartData = {
                                    categories : ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'],
                                    analyst_rating : [
                                        latestAnalystRating.CountStrongBuy, 
                                        latestAnalystRating.CountBuy, 
                                        latestAnalystRating.CountHold, 
                                        latestAnalystRating.CountSell, 
                                        latestAnalystRating.CountStrongSell
                                    ]
                                };
                                barCharts('analyst_rating', chartData);                        
                        });
                    }

                    pProductPageService.getAnalystTargetPrice().then(function(){
                        var analystTargetPrices = pProductPageService.analystTargetPrice;
                        vm.analystTargetPrice = [{
                            title: "Target Price",
                            value: "USD "+analystTargetPrices.AnalystTargetPrice
                        },{
                            title: "Current Price",
                            value: "USD "+analystTargetPrices.CurrentPrice
                        }];
                    });                    
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