agmNgModuleWrapper('agmp.product')
    .defineController('p.product.SentimentPanelController', ['pProductPageService', '$filter'],
        function (vm, dep, tool) {
            var pProductPageService = dep.pProductPageService;

            function lineCharts(container){
                Highcharts.chart(container, {
                    title: {
                        text: ''
                    },
                
                    subtitle: {
                        text: ''
                    },
                
                    // yAxis: {
                    //     title: {
                    //         text: '-'
                    //     }
                    // },
                
                    xAxis: {
                        accessibility: {
                            rangeDescription: ''
                        }
                    },
                
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
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
                        name: 'Retail Buying Activity',
                        data: [10, 8, 15, 12, 18, 19, 25]
                    }],
                
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }
                });                
            }

            function barCharts(container){
                var chart = Highcharts.chart(container, {

                    chart: {
                        type: 'column'
                    },
                
                    title: {
                        text: ''
                    },
                
                    subtitle: {
                        text: ''
                    },

                    xAxis: {
                        categories: ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'],
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
                        data: [10, 30, 50, 20, 8]
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
            
            var analystTargetPrice = [{
                title: "Past 1 Hour",
                value: 'USD 120.00'
            },{
                title: "Current Price",
                value: 'USD 90.12'
            }];

            tool.initialize(function () {
                tool.setVmProperties({
                    newsSentiment: newsSentiments,
                    analystTargetPrice: analystTargetPrice
                });

                lineCharts('retail_buying_activity');
                barCharts('analyst_rating');
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