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
                        name: 'Retail Buying Activity',
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

            var chartData = {
                categories : ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'],
                analyst_rating : [10, 30, 50, 20, 8]
            };

            function barCharts(container){
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