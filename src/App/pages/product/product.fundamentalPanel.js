agmNgModuleWrapper('agmp.product')
    .defineController('p.product.FundamentalPanelController', ['pProductPageService', '$filter'],
        function (vm, dep, tool) {
            var pProductPageService = dep.pProductPageService;
            var $filter = dep.$filter;
            var chart = {};
                                 
            function setSelectedTable(table) {
                vm.selectedTable = table;
            }

            function barCharts(itemObj) {
                var chart = Highcharts.chart(itemObj.container, {

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
                        categories: itemObj.categories,
                        labels: {
                            x: -10
                        }
                    },

                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: itemObj.name
                        }
                    },

                    series: itemObj.seriesArr,

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
                //chart.setSize(null);                  
            }

            var barChartsArr = [
                {
                    name: 'Earnings',
                    container: 'earning',
                    categories: ['2019', '2020', '2021', '2022'],
                    grothTable: ['1 year Growth 10% (Average 5%)', '3 years Growth 20% (Average 10%)', '5 years Growth 50% (Average 20%)'],
                    seriesArr: [
                        {
                            name: 'Earnings',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'column',
                        }, {
                            name: 'Earnings',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'Revenue',
                    container: 'revenue',
                    categories: ['2019', '2020', '2021', '2022'],
                    grothTable: ['1 year Growth 10% (Average 5%)', '3 years Growth 20% (Average 10%)', '5 years Growth 50% (Average 20%)'],
                    seriesArr: [
                        {
                            name: 'Revenue',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'column',
                        }, {
                            name: 'Revenue',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'GrossProfit Margin',
                    container: 'grossprofit_margin',
                    categories: ['2019', '2020', '2021', '2022'],
                    grothTable: ['1 year Growth 10% (Average 5%)', '3 years Growth 20% (Average 10%)', '5 years Growth 50% (Average 20%)'],
                    seriesArr: [
                        {
                            name: 'GrossProfit Margin',
                            data: [30, 40, 50, 45],
                            type: 'column',
                        }, {
                            name: 'GrossProfit Margin',
                            data: [30, 40, 50, 45],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [20, 25, 30, 35],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [20, 25, 30, 35],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'PE Ratio',
                    container: 'pe',
                    categories: ['2019', '2020', '2021', '2022'],
                    grothTable: ['1 year Growth 10% (Average 5%)', '3 years Growth 20% (Average 10%)', '5 years Growth 50% (Average 20%)'],
                    seriesArr: [
                        {
                            name: 'PE Ratio',
                            data: [50, 40, 30, 20],
                            type: 'column',
                        }, {
                            name: 'PE Ratio',
                            data: [50, 40, 30, 20],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [60, 50, 30, 40],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [60, 50, 30, 40],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'PEG Ratio',
                    container: 'peg',
                    categories: ['2019', '2020', '2021', '2022'],
                    grothTable: ['1 year Growth 10% (Average 5%)', '3 years Growth 20% (Average 10%)', '5 years Growth 50% (Average 20%)'],
                    seriesArr: [
                        {
                            name: 'PEG Ratio',
                            data: [3, 2.5, 2, 1, 5],
                            type: 'column',
                        }, {
                            name: 'PEG Ratio',
                            data: [3, 2.5, 2, 1, 5],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [4, 3, 2, 2.5],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [4, 3, 2, 2.5],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'Debt to Equity Ratio',
                    container: 'debt_to_equity_ratio',
                    categories: ['2019', '2020', '2021', '2022'],
                    grothTable: ['1 year Growth 10% (Average 5%)', '3 years Growth 20% (Average 10%)', '5 years Growth 50% (Average 20%)'],
                    seriesArr: [
                        {
                            name: 'Debt to Equity Ratio',
                            data: [1, 0.9, 0.8, 0.7],
                            type: 'column',
                        }, {
                            name: 'Debt to Equity Ratio',
                            data: [1, 0.9, 0.8, 0.7],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [1.9, 1.5, 0.9, 1.1],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [1.9, 1.5, 0.9, 1.1],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'Z Score',
                    container: 'z_score',
                    categories: ['2019', '2020', '2021', '2022'],
                    grothTable: ['1 year Growth 10% (Average 5%)', '3 years Growth 20% (Average 10%)', '5 years Growth 50% (Average 20%)'],
                    seriesArr: [
                        {
                            name: 'Z Score',
                            data: [2, 3, 4, 5],
                            type: 'column',
                        }, {
                            name: 'Z Score',
                            data: [2, 3, 4, 5],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [1, 2, 3, 4],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [1, 2, 3, 4],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'Dividend Yield',
                    container: 'dividend_yield',
                    categories: ['2019', '2020', '2021', '2022'],
                    grothTable: ['1 year Growth 10% (Average 5%)', '3 years Growth 20% (Average 10%)', '5 years Growth 50% (Average 20%)'],
                    seriesArr: [
                        {
                            name: 'Dividend Yield',
                            data: [0.1, 0.5, 1.1, 2.2],
                            type: 'column',
                        }, {
                            name: 'Dividend Yield',
                            data: [0.1, 0.5, 1.1, 2.2],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [0.05, 0.5, 0.8, 1.5],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [0.05, 0.5, 0.8, 1.5],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
            ]

            tool.initialize(function () {
                tool.setVmProperties({
                    // temp
                    selectedTable: "income",
                    setSelectedTable: setSelectedTable,
                    barChartsArr: barChartsArr
                });

                pProductPageService.waitTillProductDetailLoaded().then(function () {

                    barChartsArr.forEach(function (item) {
                        barCharts(item);
                    });

                    var productDetail = pProductPageService.productDetail;
                    console.log("productDetail: ", productDetail);
                    vm.productDetail = productDetail;
                    
                    var latestAnalystRating = pProductPageService.getLatestAnalystRating;
                    vm.latestAnalystRating = latestAnalystRating;
                    
                    var fundamentalQuarterlyPageMetrics = pProductPageService.getFundamentalQuarterlyPageMetrics;
                    vm.fundamentalQuarterlyPageMetrics = fundamentalQuarterlyPageMetrics;
                    
                    var fundamentalAnnualPageMetrics = pProductPageService.getFundamentalAnnualPageMetrics;
                    vm.fundamentalAnnualPageMetrics = fundamentalAnnualPageMetrics;
                });
            });
        })
    .defineDirectiveForE('agmp-product-fundamental-panel', [],
        function () {
            return {
                controller: "p.product.FundamentalPanelController",
                templateUrl: '/App/pages/product/product.fundamentalPanel.html'
            };
        },
        {
        });