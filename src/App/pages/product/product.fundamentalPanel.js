agmNgModuleWrapper('agmp.product')
    .defineController('p.product.FundamentalPanelController', ['pProductPageService', '$filter'],
        function (vm, dep, tool) {
            var pProductPageService = dep.pProductPageService;
            var $filter = dep.$filter;
            var chart = {};
            Highcharts.setOptions({ lang: { numericSymbols: ['k', 'M', 'B'] } });

            function setSelectedTable(table) {
                vm.isLoading = true;
                vm.selectedTable = table;
                setTableValue(vm.selectedTable);
            }
            function setSelectedChart(tableview) {
                vm.selectedTableChart = tableview;
                setTableValue(vm.selectedTable);
            }
            function setSelectedChartOne(tableviewEv) {
                vm.selectedTableChartOne = tableviewEv;
                setTableValue(vm.selectedTable);
            }

            function setSelectedTableType(type) {
                vm.selectedTableType = type;
                setTableValue(vm.selectedTable);
            }

            function setTableValue(table) {
                if (table === 'income') {
                    pProductPageService.getIncomeStatement(vm.selectedTableType).then(function () {
                        var incomeStatement = pProductPageService.incomeStatement;
                        var incomeStatementTableHeadings = incomeStatement.map(function (itemObj, itemKey) {
                            return itemObj.StatementDate !== undefined && itemObj.StatementDate !== null && itemObj.StatementDate !== '' ? moment(itemObj.StatementDate).format("YYYY") + (vm.selectedTableType == 'quarterly' ? ' Q' + (moment(itemObj.StatementDate).format("MM") / 3) : '') : 'TTM';
                        });
                        var incomeStatementTableName = Object.keys(incomeStatement[0]);
                        var incomeStatements = incomeStatement;
                        vm.incomeStatementTableData = {
                            headings: incomeStatementTableHeadings,
                            name: incomeStatementTableName,
                            data: incomeStatements,
                        };
                    }).finally(function () {
                        vm.isLoading = false;
                    });
                }
                if (table === 'balance') {
                    pProductPageService.getBalanceSheet(vm.selectedTableType).then(function () {
                        var balanceSheet = pProductPageService.balanceSheet;
                        var balanceSheetTableHeadings = balanceSheet.map(function (itemObj, itemKey) {
                            return itemObj.StatementDate !== undefined && itemObj.StatementDate !== null && itemObj.StatementDate !== '' ? moment(itemObj.StatementDate).format("YYYY") + (vm.selectedTableType == 'quarterly' ? ' Q' + (moment(itemObj.StatementDate).format("MM") / 3) : '') : '';
                        });
                        var balanceSheetTableName = Object.keys(balanceSheet[0]);
                        var balanceSheets = balanceSheet;
                        vm.balanceSheetTableData = {
                            headings: balanceSheetTableHeadings,
                            name: balanceSheetTableName,
                            data: balanceSheets,
                        };
                    }).finally(function () {
                        vm.isLoading = false;
                    });;
                }
                if (table === 'cash') {
                    pProductPageService.getCashFlow(vm.selectedTableType).then(function () {
                        var cashFlow = pProductPageService.cashFlow;
                        var cashFlowTableHeadings = cashFlow.map(function (itemObj, itemKey) {
                            return itemObj.StatementDate !== undefined && itemObj.StatementDate !== null && itemObj.StatementDate !== '' ? moment(itemObj.StatementDate).format("YYYY") + (vm.selectedTableType == 'quarterly' ? ' Q' + (moment(itemObj.StatementDate).format("MM") / 3) : '') : 'TTM';
                        });
                        var cashFlowTableName = Object.keys(cashFlow[0]);
                        var cashFlows = cashFlow;
                        vm.cashFlowTableData = {
                            headings: cashFlowTableHeadings,
                            name: cashFlowTableName,
                            data: cashFlows,
                        };
                    }).finally(function () {
                        vm.isLoading = false;
                    });;
                }
                if (table === 'stats') {
                    pProductPageService.getStatistics(vm.selectedTableType).then(function () {
                        var statistics = pProductPageService.statistics;
                        var keySatesDataJSON = {
                            SharesOutstanding: [],
                            // SharesFloating : [],
                            // Employees : [],
                            // Shareholders : [],
                        }
                        var ratiosDataJSON = {
                            PeRatio: [],
                            PbRatio: [],
                            Roa: [],
                            Roe: [],
                            GrossMargin: [],
                            // QuickRatio : [],
                            CurrentRatio: [],
                            DaRatio: [],
                            DeRatio: [],
                        }
                        var statisticsTableHeadings = statistics.map(function (itemObj, itemKey) {
                            // keySates data
                            if (itemObj.SharesOutstanding !== undefined && itemObj.SharesOutstanding !== null) {
                                keySatesDataJSON.SharesOutstanding.push(itemObj.SharesOutstanding);
                            }
                            // if(itemObj.SharesFloating !== undefined && itemObj.SharesFloating !== null){
                            //     keySatesDataJSON.SharesFloating.push(itemObj.SharesFloating);
                            // }
                            // if(itemObj.Employees !== undefined && itemObj.Employees !== null){
                            //     keySatesDataJSON.Employees.push(itemObj.Employees);
                            // }
                            // if(itemObj.Shareholders !== undefined && itemObj.Shareholders !== null){
                            //     keySatesDataJSON.Shareholders.push(itemObj.Shareholders);
                            // }
                            // ratios data
                            if (itemObj.PeRatio !== undefined && itemObj.PeRatio !== null) {
                                ratiosDataJSON.PeRatio.push(itemObj.PeRatio);
                            }
                            if (itemObj.PbRatio !== undefined && itemObj.PbRatio !== null) {
                                ratiosDataJSON.PbRatio.push(itemObj.PbRatio);
                            }
                            if (itemObj.Roa !== undefined && itemObj.Roa !== null) {
                                ratiosDataJSON.Roa.push(itemObj.Roa);
                            }
                            if (itemObj.Roe !== undefined && itemObj.Roe !== null) {
                                ratiosDataJSON.Roe.push(itemObj.Roe);
                            }
                            if (itemObj.GrossMargin !== undefined && itemObj.GrossMargin !== null) {
                                ratiosDataJSON.GrossMargin.push(itemObj.GrossMargin);
                            }
                            // if(itemObj.QuickRatio !== undefined && itemObj.QuickRatio !== null){
                            //     ratiosDataJSON.QuickRatio.push(itemObj.QuickRatio);
                            // }
                            if (itemObj.CurrentRatio !== undefined && itemObj.CurrentRatio !== null) {
                                ratiosDataJSON.CurrentRatio.push(itemObj.CurrentRatio);
                            }
                            if (itemObj.DaRatio !== undefined && itemObj.DaRatio !== null) {
                                ratiosDataJSON.DaRatio.push(itemObj.DaRatio);
                            }
                            if (itemObj.DeRatio !== undefined && itemObj.DeRatio !== null) {
                                ratiosDataJSON.DeRatio.push(itemObj.DeRatio);
                            }
                            return itemObj.StatementDate !== undefined && itemObj.StatementDate !== null && itemObj.StatementDate !== '' ? moment(itemObj.StatementDate).format("YYYY") + (vm.selectedTableType == 'quarterly' ? ' Q' + (moment(itemObj.StatementDate).format("MM") / 3) : '') : 'Current';
                        });
                        var statisticsTableName = Object.keys(statistics[0]);
                        var allStatisticsData = {
                            keySates: {
                                title: 'Key Stats',
                                data: keySatesDataJSON,
                                headings: Object.keys(keySatesDataJSON)
                            },
                            ratios: {
                                title: 'Ratios',
                                data: ratiosDataJSON,
                                headings: Object.keys(ratiosDataJSON)
                            }
                        }
                        vm.statisticsTableData = {
                            headings: statisticsTableHeadings,
                            name: statisticsTableName,
                            data: allStatisticsData,
                        }
                    }).finally(function () {
                        vm.isLoading = false;
                    });;
                }
                if (table === 'chartview') {
                    //debugger
                }
                if (table === 'tableveiw') {
                    //debugger
                }
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

                    legend: {
                        align: 'right',
                        verticalAlign: 'top',
                        symbolRadius: 15,
                        symbolHeight: 8,
                        symbolWidth: 0,
                        itemStyle: { "color": "#667085", "fontSize": "13px", "fontWeight": "500" }
                    },

                    yAxis: {
                        allowDecimals: true,
                        title: {
                            enabled:false
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
                chart.setSize(null, 400);
            }

            var barChartsArr = [
                {
                    name: 'Earnings',
                    key: 'Earnings',
                    container: 'earning',
                    selectedType: 'annually',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'Earnings',
                            data: [],
                            type: 'column',
                            color: '#86D3CD',
                            showInLegend: false
                        }, {
                            name: 'Earnings',
                            data: [],
                            type: 'line',
                            color: '#86D3CD',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                            color: '#184376',
                            showInLegend: false
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#184376',
                        }
                    ]
                },
                {
                    name: 'Revenue',
                    key: 'Revenue',
                    container: 'revenue',
                    selectedType: 'annually',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'Revenue',
                            data: [],
                            type: 'column',
                            color: '#86D3CD',
                            showInLegend: false
                        }, {
                            name: 'Revenue',
                            data: [],
                            type: 'line',
                            color: '#86D3CD',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                            color: '#184376',
                            showInLegend: false
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#184376',
                        }
                    ]
                },
                {
                    name: 'GrossProfit Margin',
                    key: 'GrossProfitMargin',
                    container: 'grossprofit_margin',
                    selectedType: 'annually',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'GrossProfit Margin',
                            data: [],
                            type: 'column',
                            color: '#86D3CD',
                            showInLegend: false
                        }, {
                            name: 'GrossProfit Margin',
                            data: [],
                            type: 'line',
                            color: '#86D3CD',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                            color: '#184376',
                            showInLegend: false
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#184376',
                        }
                    ]
                },
                {
                    name: 'PE Ratio',
                    key: 'PeRatio',
                    container: 'pe',
                    selectedType: 'annually',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'PE Ratio',
                            data: [],
                            type: 'column',
                            showInLegend: false
                        }, {
                            name: 'PE Ratio',
                            data: [],
                            type: 'line',
                            color: '#006AD4',
                            color: '#86D3CD',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                            color: '#184376',
                            showInLegend: false
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#184376',
                        }
                    ]
                },
                {
                    name: 'PEG Ratio ',
                    key: 'PegRatio',
                    container: 'peg',
                    selectedType: 'annually',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'Earnings',
                            data: [],
                            type: 'column',
                            color: '#86D3CD',
                            showInLegend: false
                        }, {
                            name: 'Earnings',
                            data: [],
                            type: 'line',
                            color: '#86D3CD',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                            color: '#184376',
                            showInLegend: false
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#184376',
                        }
                    ]
                },
                {
                    name: 'Debt to Equity Ratio',
                    key: 'DebtToEquityRatio',
                    container: 'debt_to_equity_ratio',
                    selectedType: 'annually',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'Debt to Equity Ratio',
                            data: [],
                            type: 'column',
                            color: '#B2E9E4',
                            showInLegend: false
                        }, {
                            name: 'Debt to Equity Ratio',
                            data: [],
                            type: 'line',
                            color: '#86D3CD',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                            color: '#184376',
                            showInLegend: false
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#184376'
                        }
                    ]
                },
                {
                    name: 'Z Score',
                    key: 'ZScore',
                    container: 'z_score',
                    selectedType: 'annually',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'Z Score',
                            data: [],
                            type: 'column',
                            color: '#86D3CD',
                            showInLegend: false
                        }, {
                            name: 'Z Score',
                            data: [],
                            type: 'line',
                            color: '#86D3CD',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                            color: '#184376',
                            showInLegend: false
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#184376',
                        }
                    ]
                },
                {
                    name: 'Dividend Yield',
                    key: 'DividendYield',
                    container: 'dividend_yield',
                    selectedType: 'annually',
                    categories: [],
                    grothTable: [],
                    seriesArr: [
                        {
                            name: 'Dividend Yield',
                            data: [],
                            type: 'column',
                            color: '#86D3CD',
                            showInLegend: false
                        }, {
                            name: 'Dividend Yield',
                            data: [],
                            type: 'line',
                            color: '#86D3CD',
                        }, {
                            name: 'IndustryAverage',
                            data: [],
                            type: 'column',
                            color: '#184376',
                            showInLegend: false
                        }, {
                            name: 'Industry Average',
                            data: [],
                            type: 'line',
                            color: '#184376',
                        }
                    ]
                },
            ]

            function setSelectedType(index, type) {
                var selectedChartObj = barChartsArr[index];
                selectedChartObj.selectedType = type;
                setFundamentalChartValues(selectedChartObj);
            }

            function setFundamentalChartValues(chartConfigObj) {
                pProductPageService.getFundamentalPageMetrics(chartConfigObj.selectedType).then(function () {
                    var fundamentalPageMetricsResp = pProductPageService.fundamentalPageMetrics;
                    var IndustryMetricArr = fundamentalPageMetricsResp.IndustryMetric;
                    var MetricArr = fundamentalPageMetricsResp.Metric;
                    chartConfigObj.seriesArr[0].data = [];
                    chartConfigObj.seriesArr[1].data = [];
                    chartConfigObj.seriesArr[2].data = [];
                    chartConfigObj.seriesArr[3].data = [];
                    chartConfigObj.categories = [];

                    var firstYearGrowth = 0;
                    var thirdYearGrowth = 0;
                    var fifthYearGrowth = 0;

                    var firstYearAvg = 0;
                    var thirdYearAvg = 0;
                    var fifthYearAvg = 0;

                    var is1Year = false;
                    var is3Year = false;
                    var is5Year = false;

                    //Growth calculation
                    if (MetricArr[MetricArr.length - 2] !== undefined && MetricArr[MetricArr.length - 2] !== null && MetricArr[MetricArr.length - 2] !== '') {
                        firstYearGrowth = (parseFloat(MetricArr[MetricArr.length - 1][chartConfigObj.key]) - parseFloat(MetricArr[MetricArr.length - 2][chartConfigObj.key])) / parseFloat(MetricArr[MetricArr.length - 2][chartConfigObj.key]);
                        is1Year = true;
                    }
                    if (MetricArr[MetricArr.length - 4] !== undefined && MetricArr[MetricArr.length - 4] !== null && MetricArr[MetricArr.length - 4] !== '') {
                        thirdYearGrowth = (parseFloat(MetricArr[MetricArr.length - 1][chartConfigObj.key]) - parseFloat(MetricArr[MetricArr.length - 4][chartConfigObj.key])) / parseFloat(MetricArr[MetricArr.length - 4][chartConfigObj.key]);
                        is3Year = true;
                    }
                    if (MetricArr[MetricArr.length - 6] !== undefined && MetricArr[MetricArr.length - 6] !== null && MetricArr[MetricArr.length - 6] !== '') {
                        fifthYearGrowth = (parseFloat(MetricArr[MetricArr.length - 1][chartConfigObj.key]) - parseFloat(MetricArr[MetricArr.length - 6][chartConfigObj.key])) / parseFloat(MetricArr[MetricArr.length - 6][chartConfigObj.key]);
                        is5Year = true;
                    }

                    //Average calculation
                    if (IndustryMetricArr[IndustryMetricArr.length - 2] !== undefined && IndustryMetricArr[IndustryMetricArr.length - 2] !== null && IndustryMetricArr[IndustryMetricArr.length - 2] !== '') {
                        firstYearAvg = (parseFloat(IndustryMetricArr[IndustryMetricArr.length - 1][chartConfigObj.key]) - parseFloat(IndustryMetricArr[IndustryMetricArr.length - 2][chartConfigObj.key])) / parseFloat(IndustryMetricArr[IndustryMetricArr.length - 2][chartConfigObj.key]);
                        is1Year = true;
                    }
                    if (IndustryMetricArr[IndustryMetricArr.length - 4] !== undefined && IndustryMetricArr[IndustryMetricArr.length - 4] !== null && IndustryMetricArr[IndustryMetricArr.length - 4] !== '') {
                        thirdYearAvg = (parseFloat(IndustryMetricArr[IndustryMetricArr.length - 1][chartConfigObj.key]) - parseFloat(IndustryMetricArr[IndustryMetricArr.length - 4][chartConfigObj.key])) / parseFloat(IndustryMetricArr[IndustryMetricArr.length - 4][chartConfigObj.key]);
                        is3Year = true;
                    }
                    if (IndustryMetricArr[IndustryMetricArr.length - 6] !== undefined && IndustryMetricArr[IndustryMetricArr.length - 6] !== null && IndustryMetricArr[IndustryMetricArr.length - 6] !== '') {
                        fifthYearAvg = (parseFloat(IndustryMetricArr[IndustryMetricArr.length - 1][chartConfigObj.key]) - parseFloat(IndustryMetricArr[IndustryMetricArr.length - 6][chartConfigObj.key])) / parseFloat(IndustryMetricArr[IndustryMetricArr.length - 6][chartConfigObj.key]);
                        is5Year = true;
                    }

                    var oneYearGrowth = (firstYearGrowth) * 100;
                    var threeYearGrowth = (thirdYearGrowth) * 100;
                    var fiveYearGrowth = (fifthYearGrowth) * 100;

                    var oneYearAvg = (firstYearAvg) * 100;
                    var threeYearAvg = (thirdYearAvg) * 100;
                    var fiveYearAvg = (fifthYearAvg) * 100;

                    var display1Year = '1 year Growth ' + (oneYearGrowth).toFixed(0) + '% (Average ' + (oneYearAvg).toFixed(0) + '%)';
                    var display3Year = '3 years Growth ' + (threeYearGrowth).toFixed(0) + '% (Average ' + (threeYearAvg).toFixed(0) + '%)';
                    var display5Year = '5 years Growth ' + (fiveYearGrowth).toFixed(0) + '% (Average ' + (fiveYearAvg).toFixed(0) + '%)';

                    if (chartConfigObj.selectedType == 'quarter') {
                        display1Year = '1 quarter Growth ' + (oneYearGrowth).toFixed(0) + '% (Average ' + (oneYearAvg).toFixed(0) + '%)';
                        display3Year = '3 quarters Growth ' + (threeYearGrowth).toFixed(0) + '% (Average ' + (threeYearAvg).toFixed(0) + '%)';
                        display5Year = '5 quarters Growth ' + (fiveYearGrowth).toFixed(0) + '% (Average ' + (fiveYearAvg).toFixed(0) + '%)';
                    }

                    chartConfigObj.grothTable = [];
                    if (is1Year) {
                        chartConfigObj.grothTable.push(display1Year);
                    }
                    if (is3Year) {
                        chartConfigObj.grothTable.push(display3Year);
                    }
                    if (is5Year) {
                        chartConfigObj.grothTable.push(display5Year);
                    }

                    IndustryMetricArr.forEach(function (elementObj, elementKey) {
                        var IndustryMetricObjectKeys = Object.keys(elementObj);
                        if ((IndustryMetricObjectKeys).includes(chartConfigObj.key)) {
                            if (chartConfigObj.selectedType == 'annually') {
                                chartConfigObj.categories.push(moment(IndustryMetricArr[elementKey].StatementDate).format("YYYY"));
                            }
                            if (chartConfigObj.selectedType == 'quarter') {
                                chartConfigObj.categories.push(moment(IndustryMetricArr[elementKey].StatementDate).format("YYYY-MMM"));
                            }
                            chartConfigObj.seriesArr[0].data.push(MetricArr[elementKey][chartConfigObj.key]);
                            chartConfigObj.seriesArr[1].data.push(MetricArr[elementKey][chartConfigObj.key]);
                            chartConfigObj.seriesArr[2].data.push(IndustryMetricArr[elementKey][chartConfigObj.key]);
                            chartConfigObj.seriesArr[3].data.push(IndustryMetricArr[elementKey][chartConfigObj.key]);
                        }
                    });
                    setChart(chartConfigObj);
                    priceBookRadio = { ...barChartsArr[6], container: 'priceBookRadio' };
                    setChart(priceBookRadio);
                    netProfitMargin = { ...barChartsArr[6], container: 'netProfitMargin' };
                    setChart(netProfitMargin);

                });
            }



            function getFullNameFromKey(objectKey) {
                switch (objectKey) {
                    //Income statement
                    case "Revenue":
                        return 'Total revenue';
                    case "Cogs":
                        return 'Cost of goods sold';
                    case "GrossProfit":
                        return 'Gross profit';
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

                    //Balance sheet
                    case "BookValuePerShare":
                        return 'Book value per share';
                    case "NetDebt":
                        return 'Net debt';
                    case "TotalAssets":
                        return 'Total assets';
                    case "TotalDebt":
                        return 'Total debt';
                    case "TotalEquity":
                        return 'Total equity';
                    case "TotalLiabilities":
                        return 'Total liabilities';

                    //Cash flow
                    case "CashFinancing":
                        return 'Cash from financing activities';
                    case "CashInvesting":
                        return 'Cash from investing activities';
                    case "CashOperating":
                        return 'Cash from operating activities';
                    case "FreeCashFlow":
                        return 'Free cash flow';

                    //Statistics
                    case "SharesOutstanding":
                        return 'Total common shares outstanding';
                    case "SharesFloating":
                        return 'Float shares outstanding';
                    case "Employees":
                        return 'Number of employees';
                    case "Shareholders":
                        return 'Number of shareholders';
                    case "PeRatio":
                        return 'Price to earnings ratio';
                    case "PbRatio":
                        return 'Price to book ratio';
                    case "Roa":
                        return 'Return on assets %';
                    case "Roe":
                        return 'Return on equity %';
                    case "GrossMargin":
                        return 'Gross margin %';
                    case "QuickRatio":
                        return 'Quick ratio';
                    case "CurrentRatio":
                        return 'Current ratio';
                    case "DaRatio":
                        return 'Debt to assets ratio';
                    case "DeRatio":
                        return 'Debt to equity ratio';
                    default:
                        return '';
                }
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    // temp
                    selectedTableType: "annually",
                    selectedTable: "income",
                    selectedTableChart: "chartview",
                    selectedTableChartOne: "chartview1",
                    setSelectedTableType: setSelectedTableType,
                    setSelectedTable: setSelectedTable,
                    setSelectedChart: setSelectedChart,
                    setSelectedChartOne: setSelectedChartOne,
                    setSelectedType: setSelectedType,
                    barChartsArr: barChartsArr,
                    priceBookRadio: { ...barChartsArr[6], container: 'priceBookRadio' },
                    netProfitMargin: { ...barChartsArr[6], container: 'netProfitMargin' },
                    getFullNameFromKey: getFullNameFromKey,
                    annualIncomeStatementTableHeadings: [],
                    annualIncomeStatementTableName: [],
                    annualIncomeStatements: []
                });

                pProductPageService.waitTillProductDetailLoaded().then(function () {

                    var productDetail = pProductPageService.productDetail;
                    vm.productDetail = productDetail;
                    pProductPageService.getFundamentalPageMetrics('annually').then(function () {
                        var fundamentalPageMetrics = pProductPageService.fundamentalPageMetrics;
                        barChartsArr.filter(function (chartConfigObj) {
                            var IndustryMetricArr = fundamentalPageMetrics.IndustryMetric;
                            var MetricArr = fundamentalPageMetrics.Metric;
                            chartConfigObj.seriesArr[0].data = [];
                            chartConfigObj.seriesArr[1].data = [];
                            chartConfigObj.seriesArr[2].data = [];
                            chartConfigObj.seriesArr[3].data = [];
                            chartConfigObj.categories = [];

                            var firstYearGrowth = 0;
                            var thirdYearGrowth = 0;
                            var fifthYearGrowth = 0;

                            var firstYearAvg = 0;
                            var thirdYearAvg = 0;
                            var fifthYearAvg = 0;

                            var is1Year = false;
                            var is3Year = false;
                            var is5Year = false;

                            //Growth calculation
                            if (MetricArr[MetricArr.length - 2] !== undefined && MetricArr[MetricArr.length - 2] !== null && MetricArr[MetricArr.length - 2] !== '') {
                                firstYearGrowth = (parseFloat(MetricArr[MetricArr.length - 1][chartConfigObj.key]) - parseFloat(MetricArr[MetricArr.length - 2][chartConfigObj.key])) / parseFloat(MetricArr[MetricArr.length - 2][chartConfigObj.key]);
                                is1Year = true;
                            }
                            if (MetricArr[MetricArr.length - 4] !== undefined && MetricArr[MetricArr.length - 4] !== null && MetricArr[MetricArr.length - 4] !== '') {
                                thirdYearGrowth = (parseFloat(MetricArr[MetricArr.length - 1][chartConfigObj.key]) - parseFloat(MetricArr[MetricArr.length - 4][chartConfigObj.key])) / parseFloat(MetricArr[MetricArr.length - 4][chartConfigObj.key]);
                                is3Year = true;
                            }
                            if (MetricArr[MetricArr.length - 6] !== undefined && MetricArr[MetricArr.length - 6] !== null && MetricArr[MetricArr.length - 6] !== '') {
                                fifthYearGrowth = (parseFloat(MetricArr[MetricArr.length - 1][chartConfigObj.key]) - parseFloat(MetricArr[MetricArr.length - 6][chartConfigObj.key])) / parseFloat(MetricArr[MetricArr.length - 6][chartConfigObj.key]);
                                is5Year = true;
                            }

                            //Average calculation
                            if (IndustryMetricArr[IndustryMetricArr.length - 2] !== undefined && IndustryMetricArr[IndustryMetricArr.length - 2] !== null && IndustryMetricArr[IndustryMetricArr.length - 2] !== '') {
                                firstYearAvg = (parseFloat(IndustryMetricArr[IndustryMetricArr.length - 1][chartConfigObj.key]) - parseFloat(IndustryMetricArr[IndustryMetricArr.length - 2][chartConfigObj.key])) / parseFloat(IndustryMetricArr[IndustryMetricArr.length - 2][chartConfigObj.key]);
                                is1Year = true;
                            }
                            if (IndustryMetricArr[IndustryMetricArr.length - 4] !== undefined && IndustryMetricArr[IndustryMetricArr.length - 4] !== null && IndustryMetricArr[IndustryMetricArr.length - 4] !== '') {
                                thirdYearAvg = (parseFloat(IndustryMetricArr[IndustryMetricArr.length - 1][chartConfigObj.key]) - parseFloat(IndustryMetricArr[IndustryMetricArr.length - 4][chartConfigObj.key])) / parseFloat(IndustryMetricArr[IndustryMetricArr.length - 4][chartConfigObj.key]);
                                is3Year = true;
                            }
                            if (IndustryMetricArr[IndustryMetricArr.length - 6] !== undefined && IndustryMetricArr[IndustryMetricArr.length - 6] !== null && IndustryMetricArr[IndustryMetricArr.length - 6] !== '') {
                                fifthYearAvg = (parseFloat(IndustryMetricArr[IndustryMetricArr.length - 1][chartConfigObj.key]) - parseFloat(IndustryMetricArr[IndustryMetricArr.length - 6][chartConfigObj.key])) / parseFloat(IndustryMetricArr[IndustryMetricArr.length - 6][chartConfigObj.key]);
                                is5Year = true;
                            }

                            var oneYearGrowth = (firstYearGrowth) * 100;
                            var threeYearGrowth = (thirdYearGrowth) * 100;
                            var fiveYearGrowth = (fifthYearGrowth) * 100;

                            var oneYearAvg = (firstYearAvg) * 100;
                            var threeYearAvg = (thirdYearAvg) * 100;
                            var fiveYearAvg = (fifthYearAvg) * 100;

                            var display1Year = '1 year Growth ' + (oneYearGrowth).toFixed(0) + '% (Average ' + (oneYearAvg).toFixed(0) + '%)';
                            var display3Year = '3 years Growth ' + (threeYearGrowth).toFixed(0) + '% (Average ' + (threeYearAvg).toFixed(0) + '%)';
                            var display5Year = '5 years Growth ' + (fiveYearGrowth).toFixed(0) + '% (Average ' + (fiveYearAvg).toFixed(0) + '%)';
                            let onYear = (oneYearAvg).toFixed(0)
                            let on3Year = (threeYearAvg).toFixed(0)
                            let on5Year = (fiveYearAvg).toFixed(0)
                            let objdata = {
                                disYr: display1Year,
                                avg: onYear
                            }
                            let objdata1 = {
                                disYr: display3Year,
                                avg: on3Year
                            }
                            let objdata2 = {
                                disYr: display5Year,
                                avg: on5Year
                            }

                            chartConfigObj.grothTable = [];
                            if (is1Year) {
                                chartConfigObj.grothTable.push(objdata);
                            }
                            if (is3Year) {
                                chartConfigObj.grothTable.push(objdata1);
                            }
                            if (is5Year) {
                                chartConfigObj.grothTable.push(objdata2);
                            }

                            IndustryMetricArr.forEach(function (elementObj, elementKey) {
                                var IndustryMetricObjectKeys = Object.keys(elementObj);
                                if ((IndustryMetricObjectKeys).includes(chartConfigObj.key)) {
                                    chartConfigObj.categories.push(moment(IndustryMetricArr[elementKey].StatementDate).format("YYYY"));
                                    chartConfigObj.seriesArr[0].data.push(MetricArr[elementKey][chartConfigObj.key]);
                                    if (chartConfigObj.key == 'GrossProfitMargin') {
                                        chartConfigObj.seriesArr[1].data.push(MetricArr[elementKey][chartConfigObj.key] + "%");
                                    } else {
                                        chartConfigObj.seriesArr[1].data.push(MetricArr[elementKey][chartConfigObj.key]);
                                    }
                                    chartConfigObj.seriesArr[2].data.push(IndustryMetricArr[elementKey][chartConfigObj.key]);
                                    chartConfigObj.seriesArr[3].data.push(IndustryMetricArr[elementKey][chartConfigObj.key]);
                                }
                            });
                            setChart(chartConfigObj);
                        });
                        priceBookRadio = { ...barChartsArr[6], container: 'priceBookRadio' };
                        setChart(priceBookRadio);
                        netProfitMargin = { ...barChartsArr[6], container: 'netProfitMargin' };
                        setChart(netProfitMargin);
                        console.log('barChartsArr => ', barChartsArr);
                    });
                    setTableValue('income');
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