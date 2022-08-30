agmNgModuleWrapper("agms.tgps")
    .defineControllerAsPopup("s.tgps.RiskAnalyzerController", {
            templateUrl: '/App/shared/tgps/tgps.riskAnalyzer.html',
            windowClass: 'default-modal tgps-risk-analyze-popup'
        }, ['mode', 'sProductService', 'sTradingHolidayService'],
        function (vm, dep, tool) {
            var sProductService = dep.sProductService,
                sTradingHolidayService = dep.sTradingHolidayService;

            vm.mode = dep.mode;

            function closePanel() {
                vm.uibClosePanel();
            }

            function setTab(tabName) {
                vm.currentTab = tabName;
            }

            function setStockRiskAnalysisDateSelectionOpen() {
                vm.stock_risk.dateSelectionMode = 1;
                vm.stock_risk.dateOpened = true;
            }

            function setPortfolioRiskAnalysisDateSelectionOpen() {
                vm.portfolio_risk.dateSelectionMode = 1;
                vm.portfolio_risk.dateOpened = true;
            }

            function disabled(param) {
                return (param.mode === 'day' && (param.date.getDay() === 0 || param.date.getDay() === 6));
            }

            function getTradeVenueString(tradeVenueLoc) {
                var tradeVenueString = null;
                switch (tradeVenueLoc) {
                    case "SG":
                        tradeVenueString = "Singapore";
                        break;
                    case "HK":
                        tradeVenueString = "Hongkong";
                        break;
                    case "MY":
                        tradeVenueString = "Malaysia";
                        break;
                    case "CHN":
                        tradeVenueString = "China";
                        break;
                    case "US":
                    case "Global Indices":
                        tradeVenueString = "UnitedStates";
                        break;
                }
                return tradeVenueString;
            }

            function getRelativeSizeIntValues(sizeString) {
                var sizeInt = 0.05;
                switch (sizeString) {
                    case "5%":
                        sizeInt = 0.05;
                        break;
                    case "10%":
                        sizeInt = 0.1;
                        break;
                    case "15%":
                        sizeInt = 0.15;
                        break;
                    case "20%":
                        sizeInt = 0.2;
                        break;
                }
                return sizeInt;
            }

            function getLatestEndTradingDate(tradeVenue) {
                return sTradingHolidayService.GetLatestMarketEndTime(tradeVenue).then(function (res) {
                    return res.data;
                });
            }

            function submitStockRisk() {
                vm.stock_risk.isLoding = true;
                vm.stock_risk.isDataLoaded = false;
                sProductService.SriskComputePost({
                    Market: vm.stock_risk.tradeVenueLoc,
                    Symbol: vm.stock_risk.symbol,
                    Benchmark: vm.stock_risk.benchmark,
                    ObsDate: moment(vm.stock_risk.analysisDate).format("YYYY-MM-DD"),
                    Lookback: vm.stock_risk.lookback_horizon
                }).then(function (res) {
                    if (res.status === 500) {
                        alert('We are currently unable to serve this request, please try again later');
                    }
                    if (res.status === 200) {
                        vm.stock_risk.tableHeadings[1] = vm.stock_risk.symbol;
                        vm.stock_risk.tableHeadings[2] = vm.stock_risk.benchmark;
                        vm.stock_risk.table = res.data;
                        vm.stock_risk.isDataLoaded = true;
                    }
                    vm.stock_risk.isLoding = false;
                });
            }

            function loadConstructPortfolio() {
                console.log("vm.portfolio_risk.Portfolio", vm.portfolio_risk.Portfolio);
                tool.openModalByDefinition('s.tgps.riskAnalyzerConstructPortfolioController', {
                    mode: vm.mode,
                    portfolio : vm.portfolio_risk.Portfolio
                }).result.then(function (response) {
                    if(response.length === 1 && response[0].Amount === 0){
                        vm.portfolio_risk.Portfolio = [];
                    } else {
                        vm.portfolio_risk.Portfolio = response;
                    }
                });
            }

            function submitPortfolioRisk() {
                if (vm.portfolio_risk.Portfolio.length == 0) {
                    alert("Please select portfolio");
                    return;
                }
                vm.portfolio_risk.isLoding = true;
                vm.portfolio_risk.isDataLoaded = false;
                sProductService.PriskCompute({
                    Portfolio: vm.portfolio_risk.Portfolio,
                    Benchmark: vm.portfolio_risk.benchmark,
                    ObsDate: moment(vm.portfolio_risk.analysisDate).format("YYYY-MM-DD"),
                    Lookback: vm.portfolio_risk.lookback_horizon
                }).then(function (res) {
                    if (res.status === 500) {
                        alert('We are currently unable to serve this request, please try again later');
                    }
                    if (res.status === 200) {
                        vm.portfolio_risk.tableHeadings[1] = 'Portfolio';
                        vm.portfolio_risk.tableHeadings[2] = vm.portfolio_risk.benchmark;
                        vm.portfolio_risk.table = res.data;
                        vm.portfolio_risk.isDataLoaded = true;
                    }
                    vm.portfolio_risk.isLoding = false;
                });
            }

            function submitMomentumProfiler() {
                vm.momentum_profiler.isLoding = true;
                vm.momentum_profiler.isDataLoaded = false;
                sProductService.MomentumCompute({
                    Market: vm.momentum_profiler.tradeVenueLoc,
                    Symbol: vm.momentum_profiler.symbol,
                }).then(function (res) {
                    if (res.status === 500) {
                        alert('We are currently unable to serve this request, please try again later');
                    }
                    if (res.status === 200) {
                        vm.momentum_profiler.table = res.data;
                        vm.momentum_profiler.isDataLoaded = true;
                    }
                    vm.momentum_profiler.isLoding = false;
                });
            }

            function submitTradeSizing() {
                vm.trade_sizing.isLoding = true;
                vm.trade_sizing.isDataLoaded = false;
                vm.trade_sizing.trade_size = 0;
                var tradeVenueString = getTradeVenueString(vm.trade_sizing.tradeVenueLoc);
                getLatestEndTradingDate(tradeVenueString).then(function (date) {
                    if (date) {
                        vm.trade_sizing.Today = date;
                        sProductService.SizingComputePost({
                            StdSize: getRelativeSizeIntValues(vm.trade_sizing.relative_size),
                            Symbol: vm.trade_sizing.symbol,
                            Market: vm.trade_sizing.tradeVenueLoc,
                            Today: moment(vm.trade_sizing.Today).format("YYYY-MM-DD")
                        }).then(function (res) {
                            if (res.status === 500) {
                                alert('We are currently unable to serve this request, please try again later');
                            }
                            if (res.status === 200) {
                                vm.trade_sizing.trade_size = (parseFloat(res.data) * 100).toFixed(2);
                                vm.trade_sizing.isDataLoaded = true;
                            }
                            vm.trade_sizing.isLoding = false;
                        });
                    }
                });
            }

            function searchProducts(keyword) {
                return sProductService.SearchPlottableProduct(keyword).then(function (res) {
                    return res.data.Data;
                });
            }

            function showProduct(item, type) {
                vm[type].tradeVenueLoc = item.TradeVenueLoc;
                vm[type].symbol = item.Symbol;
            }

            function showProductBenchMark(item, type) {
                vm[type].benchmark = item.Symbol;
            }

            function convertToFixed(int) {
                return (parseFloat(int)).toFixed(2);
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    closePanel: closePanel,
                    currentTab: 'stock_risk',
                    setTab: setTab,
                    submitStockRisk: submitStockRisk,
                    direction: ['Long', 'Short'],
                    relative_sizes: ['5%', '10%', '15%', '20%'],
                    loadConstructPortfolio: loadConstructPortfolio,
                    submitPortfolioRisk: submitPortfolioRisk,
                    submitMomentumProfiler: submitMomentumProfiler,
                    submitTradeSizing: submitTradeSizing,
                    showProduct: showProduct,
                    showProductBenchMark: showProductBenchMark,
                    searchProducts: searchProducts,
                    convertToFixed: convertToFixed,
                    stock_risk: {
                        isDataLoaded: false,
                        isLoding: false,
                        symbol: 'AAPL',
                        tradeVenueLoc: 'US',
                        benchmark: 'SPY',
                        analysisDate: new Date(),
                        lookback_horizon: 500,
                        dateOpened: false,
                        dateSelectionMode: 0,
                        setStockRiskAnalysisDateSelectionOpen: setStockRiskAnalysisDateSelectionOpen,
                        tableHeadings: [' ', 'AAPL', 'SPY'],
                        table: {
                            BenchmarkReturn: 0,
                            BenchmarkRisk: 0,
                            BenchmarkSharpeRatio: 0,
                            Beta: 0,
                            ExpectedCorrelation: 0,
                            StockReturn: 0,
                            StockRisk: 0,
                            StockSharpeRatio: 0
                        }
                    },
                    portfolio_risk: {
                        isDataLoaded: false,
                        isLoding: false,
                        benchmark: 'SPY',
                        analysisDate: new Date(),
                        Portfolio: [],
                        lookback_horizon: 500,
                        dateOpened: false,
                        dateSelectionMode: 0,
                        setPortfolioRiskAnalysisDateSelectionOpen: setPortfolioRiskAnalysisDateSelectionOpen,
                        tableHeadings: [' ', 'Portfolio', 'SPY'],
                        table: {
                            BenchmarkReturn: 0,
                            BenchmarkRisk: 0,
                            BenchmarkSharpeRatio: 0,
                            Beta: 0,
                            ExpectedCorrelation: 0,
                            PortfolioReturn: 0,
                            PortfolioRisk: 0,
                            PortfolioSharpeRatio: 0
                        }
                    },
                    momentum_profiler: {
                        isDataLoaded: false,
                        isLoding: false,
                        symbol: 'AAPL',
                        tradeVenueLoc: 'US',
                        tableHeadings: [' ', 'LONG', 'SHORT'],
                        table: {
                            LongStats: {
                                Accuracy: 0,
                                RelativeAlpha: 0,
                                StockReturn: 0,
                                TGPSReturn: 0,
                            },
                            ShortStats: {
                                Accuracy: 0,
                                RelativeAlpha: 0,
                                StockReturn: 0,
                                TGPSReturn: 0,
                            },
                            Message: '',
                            Model: 0
                        },
                    },
                    trade_sizing: {
                        isDataLoaded: false,
                        isLoding: false,
                        symbol: 'AAPL',
                        tradeVenueLoc: 'US',
                        Today: '',
                        relative_size: '10%',
                        trade_size: 0
                    },
                    dateOptions: {
                        formatYear: 'yyyy',
                        startingDay: 1,
                        showWeeks: false,
                        dateDisabled: disabled,
                        maxDate: new Date(moment().endOf('day').format())
                    }
                });

                vm.momentum_profiler.direction = vm.direction[0];
            });
        });