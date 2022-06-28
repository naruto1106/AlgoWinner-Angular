agmNgModuleWrapper('agmp.product')
    .defineController('p.product.FundamentalPanelController', ['pProductPageService', '$filter'],
        function (vm, dep, tool) {
            var pProductPageService = dep.pProductPageService;
            var $filter = dep.$filter;
            var chart = {};

            function getDefaultYAxis() {
                return {
                    title: {
                        text: null
                    },
                    labels: {
                        enabled: false
                    },
                    gridLineColor: 'transparent',
                    plotLines: [
                        {
                            value: 0,
                            color: 'black',
                            width: 1
                        }
                    ]
                };
            }

            function generateBenchmarkBarChart(name, product, productValue, benchmarkValue, performance, asOfDate) {
                if (performance === -2) {
                    return;
                }
                var colors = ['red', '#265687', 'green'];
                var color = colors[performance + 1];
                var grayColor = '#CAD5DF';
                var yAxis = getDefaultYAxis();

                var max = Math.max(0, productValue, benchmarkValue);
                var min = Math.min(0, productValue, benchmarkValue);
                var hasTop = productValue > 0 || benchmarkValue > 0;
                var hasBottom = productValue < 0 || benchmarkValue < 0;
                var textH = 45;
                var estimatedChartHeight = 200 - (hasTop ? textH : 0) - (hasBottom ? textH : 0);
                var chartRange = max - min;
                if (hasBottom) {
                    min -= textH * chartRange / estimatedChartHeight;
                }
                if (hasTop) {
                    max += textH * chartRange / estimatedChartHeight;
                }
                yAxis.max = max;
                yAxis.min = min;
                var industryName = product.Industry ? product.Industry.IndustryName : "Not Available";
                chart[name] = {
                    series: [
                        {
                            name: product.ProductName,
                            data: [productValue],
                            color: color,
                            borderWidth: 2,
                            borderColor: color,
                            type: 'column',
                            dataLabels: {
                                enabled: true,
                                style: {
                                    color: "black",
                                    fontSize: "16px",
                                    textShadow: "none"
                                }
                            }
                        },
                        {
                            name: industryName,
                            data: [benchmarkValue],
                            color: grayColor,
                            borderWidth: 2,
                            borderColor: grayColor,
                            type: 'column',
                            dataLabels: {
                                enabled: true,
                                style: {
                                    color: "black",
                                    fontSize: "16px",
                                    textShadow: "none"
                                }
                            }
                        }
                    ],
                    yAxis: yAxis,
                    xAxis: {
                        visible: false
                    },
                    title: {
                        text: null
                    },
                    options: {
                        chart: {
                            height: 200
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true
                                },
                                enableMouseTracking: false
                            }
                        }
                    },
                    // Following is not related to highcharts
                    performance: performance,
                    asOfDate: asOfDate
                };
            }

            var blueColor = '#006AD4';
            function generateYearsHistory(name, product, series, percentage) {
                var multiplier = 1;
                if (percentage)
                    multiplier = 100;
                var values = [];
                var years = [];
                var history = series != null ? series : [];
                var yAxis = getDefaultYAxis();
                history.forEach(function (h) {
                    values.push(h.Value * multiplier);
                    years.push(h.Value !== null ? h.Key : h.Key + " N/A");
                });
                chart[name] = {
                    series: [
                        {
                            name: product.ProductName,
                            data: values,
                            color: blueColor,
                            borderColor: blueColor,
                            type: 'column',
                            borderWidth: 2,
                            showInLegend: false
                        },
                        {
                            name: product.ProductName,
                            data: values,
                            color: '#334',
                            type: 'line',
                            showInLegend: false
                        }
                    ],
                    yAxis: yAxis,
                    xAxis: {
                        categories: years
                    },
                    title: {
                        text: null
                    },
                    options: {
                        chart: {
                            height: 250
                        }
                    }
                };
            }

            function getCurrency() {
                if (pProductPageService.productDetail) {
                    return pProductPageService.productDetail.Product.Currency;
                } else {
                    return "";
                }
            }

            function getLatestOf(fundamental) {
                if (fundamental) {
                    return _.last(fundamental.series[0].data);
                } else {
                    return "";
                }
            }

            function formatLabels() {
                setFormatOfDataLabel('PERatio', "{point.y:,.1f}");
                setFormatOfDataLabel('EarningGrowth', "{point.y:.1f} %");
                setFormatOfDataLabel('DividendYield', "{point.y:.2f} %");

                var currencyPrefix = pProductPageService.productDetail.Product.Currency;

                function toLargeNumber(n) {
                    return $filter('largeAmountValue')(n * 1000000, 2);
                }

                var largeFormatter = function () {
                    if (this.y != null) {
                        return currencyPrefix + ' ' + toLargeNumber(this.y);
                    }
                    return "N/A";
                };

                chart['LongTermDebt'].options.tooltip = {
                    formatter: largeFormatter
                };
                chart['Revenue'].options.tooltip = {
                    formatter: largeFormatter
                };

                chart['OperationProfitMargin'].series.forEach(function (s) {
                    s.tooltip = { pointFormat: "{point.y:.2f} %" }
                });
            }

            function setFormatOfDataLabel(name, format) {
                if (chart[name]) {
                    chart[name].series.forEach(function (s) {
                        s.dataLabels.format = format;
                    });
                }
            }

            function getPeRatioErrorMessage() {
                var message = null;
                if (vm.productDetail) {
                    var nodata = !vm.productDetail.CompanyOverview.PERatio || vm.productDetail.CompanyOverview.PERatio < 0 || vm.chart.PERatio.performance === -2;
                    if (nodata) {
                        message = "No Data Available";
                    } else if (vm.chart.PERatio.performance === -1 && vm.productDetail.CompanyOverview.PERatio >= 0) {
                        message = "Overpriced compared to industry competitors";
                    } else if (vm.chart.PERatio.performance === -0 && vm.productDetail.CompanyOverview.PERatio >= 0) {
                        message = "Evenly priced compared to industry competitors";
                    } else if (vm.chart.PERatio.performance === 1 && vm.productDetail.CompanyOverview.PERatio >= 0) {
                        message = "Underpriced compared to industry competitors";
                    } else if (vm.productDetail.CompanyOverview.PERatio && vm.chart.PERatio.performance === -4 && vm.productDetail.CompanyOverview.PERatio >= 0) {
                        message = "Insufficient Data to Compare";
                    }

                    if (pProductPageService.invalidSectors() && !nodata) {
                        message = null;
                    }
                }
                
                return message;
            }

            function getEarningGrowthErrorMessage() {
                var message = null;
                if (vm.productDetail) {
                    var nodata = !vm.productDetail.CompanyOverview.EarningsGrowth || vm.chart.EarningGrowth.performance === -2;
                    if (nodata) {
                        message = "No Data Available";
                    } else if (vm.chart.EarningGrowth.performance === -1) {
                        message = "Growth in earnings is lower than its competitors";
                    } else if (vm.chart.EarningGrowth.performance === -0) {
                        message = "Growth in earnings is on par with its competitors";
                    } else if (vm.chart.EarningGrowth.performance === 1) {
                        message = "Growth in earnings is higher than its competitors";
                    } else if (vm.productDetail.CompanyOverview.EarningGrowth && vm.chart.EarningGrowth.performance === -4) {
                        message = "Insufficient Data to Compare";
                    }

                    if (pProductPageService.invalidSectors() && !nodata) {
                        message = null;
                    }
                }
                
                return message;
            }

            function getDividendYieldErrorMessage() {
                var message = null;
                if (vm.productDetail) {
                    var nodata = !vm.productDetail.CompanyOverview.DividendYield || vm.chart.DividendYield.performance === -2;
                    if (nodata) {
                        message = "No Data Available";
                    } else if (vm.chart.DividendYield.performance === -1) {
                        message = "Dividend yield is lower than its competitors";
                    } else if (vm.chart.DividendYield.performance === -0) {
                        message = "Dividend yield is on par with its competitors";
                    } else if (vm.chart.DividendYield.performance === 1) {
                        message = "Dividend yield is higher than its competitors";
                    } else if (vm.productDetail.CompanyOverview.DividendYield && vm.chart.DividendYield.performance === -4) {
                        message = "Insufficient Data to Compare";
                    }

                    if (pProductPageService.invalidSectors() && !nodata) {
                        message = null;
                    }
                }
                
                return message;
            }

            function showPeRatioChart() {
                return !pProductPageService.invalidSectors() && vm.productDetail && vm.productDetail.CompanyOverview.PERatio
                       && vm.chart.PERatio.performance !== -2 && vm.productDetail.CompanyOverview.PERatio >= 0;
            }

            function showEarningGrowthChart() {
                return !pProductPageService.invalidSectors() && vm.productDetail && vm.productDetail.CompanyOverview.EarningsGrowth
                    && vm.chart.EarningGrowth.performance !== -2;
            }

            function showDividendYieldChart() {
                return !pProductPageService.invalidSectors() && vm.productDetail && vm.productDetail.CompanyOverview.DividendYield
                    && vm.chart.DividendYield.performance !== -2;
            }

            function getValidYearData(data) {
                return data.filter(function(item) {
                    return item.Value != null;
                });
            }

            function getLatestYearData(data) {
                var dataWithValues = getValidYearData(data);
                return dataWithValues.length > 0 ? dataWithValues[dataWithValues.length - 1] : null;
            }

            function showFiveYearData(data) {
                return getValidYearData(data) != null && getValidYearData(data).length > 2;
            }

            function invalidSectors() {
                return pProductPageService.invalidSectors();
            }          

            function barCharts(itemObj){
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
                            text: 'PE'
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
                    name: 'Earning',
                    container: 'earning',
                    categories : ['2019', '2020', '2021', '2022'],
                    grothTable: ['1 year Growth 0.1 (Average 0.05)', '3 years Growth 0.2 (Average 0.1)', '5 years Growth 0.5 (Average 0.02)'],
                    seriesArr: [
                        {
                            name: 'Earning',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'column',
                        },{
                            name: 'PE',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'line',
                            color: '#006AD4',
                        },{
                            name: 'IndustryAverage',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'column',
                        },{
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
                    categories : ['2019', '2020', '2021', '2022'],
                    grothTable: ['1 year Growth 0.1 (Average 0.05)', '3 years Growth 0.2 (Average 0.1)', '5 years Growth 0.5 (Average 0.02)'],
                    seriesArr: [
                        {
                            name: 'Earning',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'column',
                        },{
                            name: 'PE',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'line',
                            color: '#006AD4',
                        },{
                            name: 'IndustryAverage',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'column',
                        },{
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
                    categories : ['2019', '2020', '2021', '2022'],                    
                    grothTable: ['1 year Growth 0.1 (Average 0.05)', '3 years Growth 0.2 (Average 0.1)', '5 years Growth 0.5 (Average 0.02)'],
                    seriesArr: [
                        {
                            name: 'Earning',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'column',
                        },{
                            name: 'PE',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'line',
                            color: '#006AD4',
                        },{
                            name: 'IndustryAverage',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'column',
                        },{
                            name: 'Industry Average',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'PE',
                    container: 'pe',   
                    categories : ['2019', '2020', '2021', '2022'],                 
                    grothTable: ['1 year Growth 0.1 (Average 0.05)', '3 years Growth 0.2 (Average 0.1)', '5 years Growth 0.5 (Average 0.02)'],
                    seriesArr: [
                        {
                            name: 'Earning',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'column',
                        },{
                            name: 'PE',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'line',
                            color: '#006AD4',
                        },{
                            name: 'IndustryAverage',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'column',
                        },{
                            name: 'Industry Average',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'PEG',
                    container: 'peg',   
                    categories : ['2019', '2020', '2021', '2022'],                 
                    grothTable: ['1 year Growth 0.1 (Average 0.05)', '3 years Growth 0.2 (Average 0.1)', '5 years Growth 0.5 (Average 0.02)'],
                    seriesArr: [
                        {
                            name: 'Earning',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'column',
                        },{
                            name: 'PE',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'line',
                            color: '#006AD4',
                        },{
                            name: 'IndustryAverage',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'column',
                        },{
                            name: 'Industry Average',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'Debt to Equity Ratio',
                    container: 'debt_to_equity_ratio',
                    categories : ['2019', '2020', '2021', '2022'],
                    grothTable: ['1 year Growth 0.1 (Average 0.05)', '3 years Growth 0.2 (Average 0.1)', '5 years Growth 0.5 (Average 0.02)'],
                    seriesArr: [
                        {
                            name: 'Earning',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'column',
                        },{
                            name: 'PE',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'line',
                            color: '#006AD4',
                        },{
                            name: 'IndustryAverage',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'column',
                        },{
                            name: 'Industry Average',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'Z Score',
                    container: 'z_score',
                    categories : ['2019', '2020', '2021', '2022'],
                    grothTable: ['1 year Growth 0.1 (Average 0.05)', '3 years Growth 0.2 (Average 0.1)', '5 years Growth 0.5 (Average 0.02)'],
                    seriesArr: [
                        {
                            name: 'Earning',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'column',
                        },{
                            name: 'PE',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'line',
                            color: '#006AD4',
                        },{
                            name: 'IndustryAverage',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'column',
                        },{
                            name: 'Industry Average',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'Dividend Yield',
                    container: 'dividend_yield',
                    categories : ['2019', '2020', '2021', '2022'],
                    grothTable: ['1 year Growth 0.1 (Average 0.05)', '3 years Growth 0.2 (Average 0.1)', '5 years Growth 0.5 (Average 0.02)'],
                    seriesArr: [
                        {
                            name: 'Earning',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'column',
                        },{
                            name: 'PE',
                            data: [2000000, 3000000, 4000000, 5000000],
                            type: 'line',
                            color: '#006AD4',
                        },{
                            name: 'IndustryAverage',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'column',
                        },{
                            name: 'Industry Average',
                            data: [1000000, 2000000, 3000000, 4000000],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
            ]
            
            // barCharts('earning');
            // barCharts('revenue');
            // barCharts('grossprofit_margin');
            // barCharts('pe');
            // barCharts('peg');
            // barCharts('debt_to_equity_ratio');
            // barCharts('z_score');
            // barCharts('dividend_yield');

            tool.initialize(function () {
                tool.setVmProperties({
                    chart: chart,
                    getPeRatioErrorMessage: getPeRatioErrorMessage,
                    getEarningGrowthErrorMessage: getEarningGrowthErrorMessage,
                    getDividendYieldErrorMessage: getDividendYieldErrorMessage,
                    content: null,
                    getLatestOf: getLatestOf,
                    getCurrency: getCurrency,
                    showPeRatioChart: showPeRatioChart,
                    showEarningGrowthChart: showEarningGrowthChart,
                    showDividendYieldChart: showDividendYieldChart,
                    showFiveYearData: showFiveYearData,
                    getLatestYearData: getLatestYearData,
                    getValidYearData: getValidYearData,
                    invalidSectors: invalidSectors,
                    barCharts: barChartsArr
                });                

                pProductPageService.waitTillProductDetailLoaded().then(function () {

                    barChartsArr.forEach((item) => {
                        barCharts(item);
                    });
                        
                    var productDetail = pProductPageService.productDetail;
                    var peRatio = productDetail.CompanyOverview.PERatio;

                    if (peRatio < 0) {
                        peRatio = null;
                    }
                    generateBenchmarkBarChart('PERatio', productDetail.Product, peRatio, productDetail.CompanyOverview.PERatioIndustry, productDetail.CompanyOverview.PERatioPerformance, productDetail.CompanyOverview.PeRatioDate);
                    generateBenchmarkBarChart('EarningGrowth', productDetail.Product,
                        productDetail.CompanyOverview.EarningsGrowth != null ? productDetail.CompanyOverview.EarningsGrowth * 100 : null,
                        productDetail.CompanyOverview.EarningsGrowthIndustry != null ? productDetail.CompanyOverview.EarningsGrowthIndustry * 100 : null,
                        productDetail.CompanyOverview.EarningsGrowthPerformance,
                        productDetail.CompanyOverview.EarningsGrowthDate);
                    generateBenchmarkBarChart('DividendYield', productDetail.Product,
                        productDetail.CompanyOverview.DividendYield != null ? productDetail.CompanyOverview.DividendYield * 100 : null,
                        productDetail.CompanyOverview.DividendYieldIndustry != null ? productDetail.CompanyOverview.DividendYieldIndustry * 100 : null,
                        productDetail.CompanyOverview.DividendYieldPerformance, productDetail.CompanyOverview.DividendYieldDate);

                    generateYearsHistory('Revenue', productDetail.Product, productDetail.CompanyOverview.Revenue);
                    generateYearsHistory('OperationProfitMargin', productDetail.Product, productDetail.CompanyOverview.OperatingProfitMargin, true);
                    generateYearsHistory('LongTermDebt', productDetail.Product, productDetail.CompanyOverview.LongTermDebt);
                    formatLabels();
                    vm.productDetail = productDetail;
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