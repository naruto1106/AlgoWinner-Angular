﻿agmNgModuleWrapper('agmp.product')
    .defineController('p.product.FundamentalPanelController', ['pProductPageService', '$filter'],
        function (vm, dep, tool) {
            var pProductPageService = dep.pProductPageService;
            var $filter = dep.$filter;
            var chart = {};
                                 
            function setSelectedTable(table) {
                vm.selectedTable = table;
            }

            function setChart(itemObj) {
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
                    key: 'Earnings',
                    container: 'earning',
                    selectedType: 'annualy',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'Earnings',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'Earnings',
                            data: [],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'Revenue',
                    key: 'Revenue',
                    container: 'revenue',
                    selectedType: 'annualy',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'Revenue',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'Revenue',
                            data: [],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'GrossProfit Margin',
                    key: 'GrossProfitMargin',
                    container: 'grossprofit_margin',
                    selectedType: 'annualy',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'GrossProfit Margin',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'GrossProfit Margin',
                            data: [],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'PE Ratio',
                    key: 'PeRatio',
                    container: 'pe',
                    selectedType: 'annualy',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'PE Ratio',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'PE Ratio',
                            data: [],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'PEG Ratio',
                    key: 'PegRatio',
                    container: 'peg',
                    selectedType: 'annualy',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'PEG Ratio',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'PEG Ratio',
                            data: [],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'Debt to Equity Ratio',
                    key: 'DebtToEquityRatio',
                    container: 'debt_to_equity_ratio',
                    selectedType: 'annualy',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'Debt to Equity Ratio',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'Debt to Equity Ratio',
                            data: [],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'Z Score',
                    key: 'ZScore',
                    container: 'z_score',
                    selectedType: 'annualy',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'Z Score',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'Z Score',
                            data: [],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
                {
                    name: 'Dividend Yield',
                    key: 'DividendYield',
                    container: 'dividend_yield',
                    selectedType: 'annualy',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'Dividend Yield',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'Dividend Yield',
                            data: [],
                            type: 'line',
                            color: '#006AD4',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#434348',
                        }
                    ]
                },
            ]

            function setSelectedType(index, type) {
                var selectedChartObj = barChartsArr[index];
                selectedChartObj.selectedType = type;
                setFundamentalChartValues(selectedChartObj);
            }

            function setFundamentalChartValues(chartConfigObj){
                var fundamentalPageMetrics = pProductPageService.getFundamentalAnnualPageMetrics();
                if(chartConfigObj.type == 'quarter'){
                    fundamentalPageMetrics = pProductPageService.getFundamentalQuarterlyPageMetrics();
                }
                fundamentalPageMetrics.then(function(){
                    var fundamentalPageMetricsResp = pProductPageService.fundamentalAnnualPageMetrics;
                    if(chartConfigObj.type == 'quarter'){
                        fundamentalPageMetricsResp = pProductPageService.fundamentalQuarterlyPageMetrics;
                    }
                    
                    var IndustryMetricArr = fundamentalPageMetricsResp.IndustryMetric;
                    var MetricArr = fundamentalPageMetricsResp.Metric;
                    chartConfigObj.seriesArr[0].data = [];
                    chartConfigObj.seriesArr[1].data = [];
                    chartConfigObj.seriesArr[2].data = [];
                    chartConfigObj.seriesArr[3].data = [];
                    chartConfigObj.categories = [];
                    chartConfigObj.grothTable = [
                        '1 year Growth 10% (Average 5%)', 
                        '3 years Growth 20% (Average 10%)', 
                        '5 years Growth 50% (Average 20%)'
                    ];
                    if(chartConfigObj.type == 'quarter'){
                        chartConfigObj.grothTable = [
                            '1 quarter Growth 10% (Average 5%)', 
                            '3 quarter Growth 20% (Average 10%)', 
                            '5 quarter Growth 50% (Average 20%)'
                        ];
                    }
                    IndustryMetricArr.forEach((elementObj, elementKey) => {
                        var IndustryMetricObjectKeys = Object.keys(elementObj);
                        if((IndustryMetricObjectKeys).includes(chartConfigObj.key)){                            
                            if(chartConfigObj.type == 'annualy'){
                                chartConfigObj.categories.push(moment(IndustryMetricArr[elementKey].StatementDate).format("YYYY"));
                            }
                            if(chartConfigObj.type == 'quarter'){
                                chartConfigObj.categories.push(moment(IndustryMetricArr[elementKey].StatementDate).format("YYYY-MMM"));
                            }
                            chartConfigObj.seriesArr[0].data.push(IndustryMetricArr[elementKey][chartConfigObj.key]);
                            chartConfigObj.seriesArr[1].data.push(IndustryMetricArr[elementKey][chartConfigObj.key]);
                            chartConfigObj.seriesArr[2].data.push(MetricArr[elementKey][chartConfigObj.key]);
                            chartConfigObj.seriesArr[3].data.push(MetricArr[elementKey][chartConfigObj.key]);                            
                        } 
                    });
                    setChart(chartConfigObj);
                });                
            }

            function getStatementName(objectKey) {
                switch (objectKey) {
                    case "Revenue":
                        return 'Total revenue';
                    case "Cogs":
                        return 'Cost of goods sold';
                    case "GrossProfit":
                        return 'Gross proft';
                    case "OperatingExpenses":
                        return 'Operating expenses (excl. COGS)';
                    case "OperatingIncome":
                        return 'Operating income';
                    case "NonOperatingIncome":
                        return 'Non-operating income';
                    case "PretaxIncome":
                        return 'Pretax income';
                    case "Tax":
                        return 'Taxes';
                    case "NetIncome":
                        return 'Net income';
                    case "Ebitda":
                        return 'EBITDA';
                    case "Ebit":
                        return 'EBIT';
                    default:
                        return '';
                }
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    // temp
                    selectedTable: "income",
                    setSelectedTable: setSelectedTable,
                    setSelectedType: setSelectedType,
                    barChartsArr: barChartsArr,
                    getStatementName: getStatementName,
                    annualIncomeStatementTableHeadings: [],
                    annualIncomeStatementTableName: [],
                    annualIncomeStatements: []
                });

                pProductPageService.waitTillProductDetailLoaded().then(function () {

                    var productDetail = pProductPageService.productDetail;
                    //console.log("productDetail: ", productDetail);
                    vm.productDetail = productDetail;

                    pProductPageService.getFundamentalAnnualPageMetrics().then(function(){
                        var fundamentalAnnualPageMetrics = pProductPageService.fundamentalAnnualPageMetrics;
                        //console.log("fundamentalAnnualPageMetrics", fundamentalAnnualPageMetrics);
                        
                        barChartsArr.filter(chartConfigObj => {
                            var IndustryMetricArr = fundamentalAnnualPageMetrics.IndustryMetric;
                            var MetricArr = fundamentalAnnualPageMetrics.Metric;
                            chartConfigObj.seriesArr[0].data = [];
                            chartConfigObj.seriesArr[1].data = [];
                            chartConfigObj.seriesArr[2].data = [];
                            chartConfigObj.seriesArr[3].data = [];
                            chartConfigObj.categories = [];
                            chartConfigObj.grothTable = [
                                '1 year Growth 10% (Average 5%)', 
                                '3 years Growth 20% (Average 10%)', 
                                '5 years Growth 50% (Average 20%)'
                            ];
                            IndustryMetricArr.forEach((elementObj, elementKey) => {
                                var IndustryMetricObjectKeys = Object.keys(elementObj);
                                if((IndustryMetricObjectKeys).includes(chartConfigObj.key)){
                                    chartConfigObj.categories.push(moment(IndustryMetricArr[elementKey].StatementDate).format("YYYY"));
                                    chartConfigObj.seriesArr[0].data.push(IndustryMetricArr[elementKey][chartConfigObj.key]);
                                    chartConfigObj.seriesArr[1].data.push(IndustryMetricArr[elementKey][chartConfigObj.key]);
                                    chartConfigObj.seriesArr[2].data.push(MetricArr[elementKey][chartConfigObj.key]);
                                    chartConfigObj.seriesArr[3].data.push(MetricArr[elementKey][chartConfigObj.key]);                                    
                                } 
                            });
                            //console.log("chartConfigObj: ", chartConfigObj);
                            setChart(chartConfigObj);
                        });
                    });

                    pProductPageService.getAnnualIncomeStatement().then(function(){
                        var annualIncomeStatement = pProductPageService.annualIncomeStatement;
                        console.log("annualIncomeStatement: ", annualIncomeStatement);                        
                        
                        var annualIncomeStatementTableHeadings = annualIncomeStatement.map((itemObj, itemKey) => (itemObj.StatementDate !== undefined && itemObj.StatementDate !== null && itemObj.StatementDate !== '' ? moment(itemObj.StatementDate).format("YYYY") : 'TTM'));
                        var annualIncomeStatementTableName = Object.keys(annualIncomeStatement[0]);
                        var annualIncomeStatements = annualIncomeStatement;
                        vm.annualIncomeStatementTableData = {
                            headings: annualIncomeStatementTableHeadings,
                            name : annualIncomeStatementTableName,
                            data : annualIncomeStatements,
                        };
                    });

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