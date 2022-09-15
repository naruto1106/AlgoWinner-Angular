agmNgModuleWrapper('agmp.product')
    .defineService('pProductPageService',
    ['commonHeaderModeService', 'commonScreenResizerService',
        'sProductService', 'tradeDataService', 'sMarketDataService'],
    function (serviceObj, dep, tool) {

        var sProductService = dep.sProductService,
            commonHeaderModeService = dep.commonHeaderModeService,
            commonScreenResizerService = dep.commonScreenResizerService,
            tradeDataService = dep.tradeDataService,
            sMarketDataService = dep.sMarketDataService;

        var deferred = tool.defer();

        function getProductDetail(productId) {
            dep.sProductService.GetProductDetail(productId).then(function (res) {
                serviceObj.productDetail.Product = res.data.Product;
                serviceObj.productDetail.CompanyOverview = res.data.CompanyOverview;
                serviceObj.productDetail.RelatedCompanies = res.data.RelatedCompanies;
                deferred.resolve();
                serviceObj.isLoading = false;
            }, function () {
                deferred.reject();
                serviceObj.isLoading = false;
            });
            return deferred.promise;
        }
        
        function getSector(market) {
            return dep.sProductService.GetSector(market).then(function (res) {                                
                serviceObj.sector = res.data;
                serviceObj.isLoading = false;
            }, function () {
                serviceObj.isLoading = false;
            });
        }
        
        function getIndustry(market) {
            return dep.sProductService.GetIndustry(market).then(function (res) {                                
                serviceObj.industry = res.data;
                serviceObj.isLoading = false;
            }, function () {
                serviceObj.isLoading = false;
            });
        }
        
        function getLatestAnalystRating() {
            return dep.sProductService.GetLatestAnalystRating(serviceObj.currentProduct.ProductId, serviceObj.currentProduct.TradeVenueLoc).then(function (res) {                                
                serviceObj.latestAnalystRating = res.data;
                serviceObj.isLoading = false;
            }, function () {
                serviceObj.isLoading = false;
            });
        }
        
        function getNewsSentiment() {
            return dep.sProductService.GetNewsSentiment(serviceObj.currentProduct.ProductId, serviceObj.currentProduct.TradeVenueLoc).then(function (res) {                                
                serviceObj.newsSentiment = res.data;
                serviceObj.isLoading = false;
            }, function () {
                serviceObj.isLoading = false;
            });
        }
        
        function getRetailActivity(period) {
            return dep.sProductService.GetRetailActivity(serviceObj.currentProduct.ProductId, serviceObj.currentProduct.TradeVenueLoc, period).then(function (res) {                                
                serviceObj.retailActivity = res.data;
                serviceObj.isLoading = false;
            }, function () {
                serviceObj.isLoading = false;
            });
        }

        function getRetailSentiment(period) {
            return dep.sProductService.GetRetailSentiment(serviceObj.currentProduct.ProductId, serviceObj.currentProduct.TradeVenueLoc, period).then(function (res) {
                serviceObj.retailSentiment = res.data;
                serviceObj.isLoading = false;
            }, function () {
                serviceObj.retailSentiment = null;
                serviceObj.isLoading = false;
            });
        }

        function getAnalystTargetPrice() {
            return dep.sProductService.GetAnalystTargetPrice(serviceObj.currentProduct.ProductId, serviceObj.currentProduct.TradeVenueLoc).then(function (res) {
                serviceObj.analystTargetPrice = res.data;
                serviceObj.isLoading = false;
            }, function () {
                serviceObj.isLoading = false;
            });
        }                
        
        function getFundamentalPageMetrics(type) {
            var fundamentalPageMetricsType = '';
            if(type == 'annually'){
                fundamentalPageMetricsType = dep.sProductService.GetFundamentalAnnualPageMetrics;
            }
            if(type == 'quarter'){
                fundamentalPageMetricsType = dep.sProductService.GetFundamentalQuarterlyPageMetrics;
            }
            return fundamentalPageMetricsType(serviceObj.currentProduct.ProductId, serviceObj.currentProduct.TradeVenueLoc).then(function (res) {
                serviceObj.fundamentalPageMetrics = res.data;
                serviceObj.isLoading = false;
            }, function () {
                serviceObj.isLoading = false;
            });
        }               
        
        function getIncomeStatement(type) {
            var statementType = '';
            if(type == 'annually'){
                statementType = dep.sProductService.GetAnnualIncomeStatement;
            }
            if(type == 'quarterly'){
                statementType = dep.sProductService.GetQuarterlyIncomeStatement;
            }
            return statementType(serviceObj.currentProduct.ProductId, serviceObj.currentProduct.TradeVenueLoc).then(function (res) {
                serviceObj.incomeStatement = res.data;
                serviceObj.isLoading = false;
            }, function () {
                serviceObj.isLoading = false;
            });
        }
        
        function getBalanceSheet(type) {
            var balanceSheetType = '';
            if(type == 'annually'){
                balanceSheetType = dep.sProductService.GetAnnualBalanceSheet;
            }
            if(type == 'quarterly'){
                balanceSheetType = dep.sProductService.GetQuarterlyBalanceSheet;
            }
            return balanceSheetType(serviceObj.currentProduct.ProductId, serviceObj.currentProduct.TradeVenueLoc).then(function (res) {
                serviceObj.balanceSheet = res.data;
                serviceObj.isLoading = false;
            }, function () {
                serviceObj.isLoading = false;
            });
        }
        
        function getCashFlow(type) {
            var cashFlowType = '';
            if(type == 'annually'){
                cashFlowType = dep.sProductService.GetAnnualCashFlow;
            }
            if(type == 'quarterly'){
                cashFlowType = dep.sProductService.GetQuarterlyCashFlow;
            }
            return cashFlowType(serviceObj.currentProduct.ProductId, serviceObj.currentProduct.TradeVenueLoc).then(function (res) {
                serviceObj.cashFlow = res.data;
                serviceObj.isLoading = false;
            }, function () {
                serviceObj.isLoading = false;
            });
        }
        
        function getStatistics(type) {
            var statisticsType = '';
            if(type == 'annually'){
                statisticsType = dep.sProductService.GetAnnualStatistics;
            }
            if(type == 'quarterly'){
                statisticsType = dep.sProductService.GetQuarterlyStatistics;
            }
            return statisticsType(serviceObj.currentProduct.ProductId, serviceObj.currentProduct.TradeVenueLoc).then(function (res) {
                serviceObj.statistics = res.data;
                serviceObj.isLoading = false;
            }, function () {
                serviceObj.isLoading = false;
            });
        }
       
        function placeOrder(action, stock) {
            return tool.openModalByDefinition('s.orders.PadDeveloperPopupController', {
                selectedStrategy: null,
                dashboardFeed: null,
                myStrategies: vm.myStrategies,
                reloadStrategiesPromiseFunc: function () {
                    var p2 = sAccountService.GetBrokerageAccountsDetail()
                        .then(function (res) {
                            vm.myTradingAccounts = res.data.filter(function (a) {
                                return a.BasicInfo.IsUsedForStrategy === true;
                            });
                            return vm.myTradingAccounts;
                        });

                    var p1 = sStrategyCommerceService.GetStrategiesForTrading().then(function (res) {
                        vm.myStrategies = res.data;
                        return vm.myStrategies;
                    });

                    return tool.onceAll([p1, p2]).then(function () {
                        return {
                            accounts: vm.myTradingAccounts,
                            strategies: vm.myStrategies
                        }
                    });
                },
                myTradingAccounts: vm.myTradingAccounts,
            }, {
                    beforeOpenCallback: function () {
                        orderPadInitService.setDefaultDeveloperOrder();
                        var order = orderPadInitService.getOrder();
                        return function () {
                            order.Action = action;
                            order.Product = stock.ProductModel;
                        }
                    }
                });
        }

        function waitTillProductDetailLoaded() {
            return deferred.promise;
        }

        dep.$rootScope.$on('$routeChangeSuccess', function (obj, newVal, oldVal) {
            var newParams = newVal.params;
            var oldParams = oldVal.params;
            if ((newParams.venue && newParams.venue !== oldParams.venue) ||
                (newParams.symbol && newParams.symbol !== oldParams.symbol)) {
                deferred = tool.defer();
                commonHeaderModeService.setHeaderVisibilityMode(3);
                commonScreenResizerService.setFooterVisibility(false);
            }
        });

        function toggleHeader() {
            serviceObj.hasHeader = !serviceObj.hasHeader;
            serviceObj.setHeaderVisibility(serviceObj.hasHeader);
        }

        function setHeaderVisibility(hasHeader) {
            commonHeaderModeService.setHeaderVisibilityMode(hasHeader ? 1 : 3);
        }
        
        var getPriceDeferred = tool.defer();
        function waitTillPricelLoaded() {
            return getPriceDeferred.promise;
        }

        function loadProductWithParam(venue, symbol) {
            serviceObj.isLoading = true;
            switch (venue) {
                case "SG":
                    venue = "Singapore";
                    break;
                case "HK":
                    venue = "Hongkong";
                    break;
                case "MY":
                    venue = "Malaysia";
                    break;
                case "CHN":
                    venue = "China";
                    break;
                case "US":
                case "Global Indices":
                    venue = "UnitedStates";
                    break;
            }

            return sProductService.GetProductBySymbolAndVenue(venue, symbol).then(function (res) {
                serviceObj.currentProduct = res.data.Data;
                if (serviceObj.currentProduct && serviceObj.currentProduct.AssetType === "Warrants") {
                    serviceObj.isWarrants = true;
                } else {
                    serviceObj.isWarrants = false;
                }

                if (serviceObj.currentProduct) {
                    sProductService.GetProduct(serviceObj.currentProduct.ProductId).then(function (res) {
                        var result = res.data.Data;
                        serviceObj.productDetail.ProductModel = result;
                        serviceObj.productDetail.Product = result;
                        serviceObj.currentProduct = result;
                        serviceObj.isLoadingPrice = true;
                        
                        tool.onceAll([
                            tradeDataService.GetBid(serviceObj.productDetail.ProductModel),
                            tradeDataService.GetAsk(serviceObj.productDetail.ProductModel),
                            tradeDataService.GetLast(serviceObj.productDetail.ProductModel)
                        ]).then(function (ress) {
                            serviceObj.productDetail.MarketData.BidPrice = ress[0].data.BidPrice;
                            serviceObj.productDetail.MarketData.BidSize = ress[0].data.BidSize;
                            serviceObj.productDetail.MarketData.BidTime = ress[0].data.BidTime;
                            serviceObj.productDetail.MarketData.AskPrice = ress[1].data.AskPrice;
                            serviceObj.productDetail.MarketData.AskSize = ress[1].data.AskSize;
                            serviceObj.productDetail.MarketData.AskTime = ress[1].data.AskTime;
                            serviceObj.productDetail.MarketData.LastTradedPrice = ress[2].data.LastTradedPrice;
                            serviceObj.productDetail.MarketData.LastTradedSize = ress[2].data.LastTradedSize;
                            serviceObj.productDetail.MarketData.LastTradedTime = ress[2].data.Timestamp;    
                            serviceObj.productDetail.MarketData.Open = ress[2].data.Open;    
                            serviceObj.productDetail.MarketData.High = ress[2].data.High;    
                            serviceObj.productDetail.MarketData.Low = ress[2].data.Low;    
                            serviceObj.productDetail.MarketData.PrevClose = ress[2].data.PrevClose;    
                            serviceObj.productDetail.MarketData.CumulativeVolume = ress[2].data.CumulativeVolume;    
                            serviceObj.productDetail.MarketData = angular.extend(
                            serviceObj.productDetail.MarketData, sMarketDataService.calculateLastTradedPricePct(ress[2]));
                            serviceObj.isLoadingPrice = false;
                            getPriceDeferred.resolve();
                            return getProductDetail(serviceObj.currentProduct.ProductId);
                        }, function (ress) {
                            tool.logError("Error invoking get Market Data for Product Page");
                        });
                    });

                } else {
                    serviceObj.isLoading = false;
                }

            }, function () {
                dep.coreNotificationService.notifyError("Error loading products", "Sorry, there are no results for " + symbol);
                serviceObj.isLoading = false;
            });
        }
       
        function invalidSectors() {
            var sectorsToHide = ["Not Available", "Miscellaneous"];
            return !serviceObj.productDetail.Product.Sector ||
                (serviceObj.productDetail.Product.Sector && _.includes(sectorsToHide, serviceObj.productDetail.Product.Sector.SectorName));
        }

        function showRelatedCompanies() {
            //For Miscellaneous, Not Available, or Null sectors don't show Related Companies section at all
            return serviceObj.productDetail.RelatedCompanies.length > 0 && !invalidSectors();
        }

        tool.setServiceObjectProperties({
            isLoading: false,
            isLoadingPrice: false,
            hasHeader: false,
            isWarrants: false,
            setHeaderVisibility: setHeaderVisibility,
            currentProduct: {},
            getSector: getSector,
            sector: {},
            getIndustry: getIndustry,
            industry: {},
            getLatestAnalystRating: getLatestAnalystRating,            
            latestAnalystRating: {
                CountBuy: 0,
                CountHold: 0,
                CountSell: 0,
                CountStrongBuy: 0,
                CountStrongSell: 0,
                ObservationDate: ""
            },
            getNewsSentiment: getNewsSentiment,
            newsSentiment: {
                Past1HourScore: 0,
                Past1HourVolume: 0,
                Is1HourBreakout: false,
                Past24HourScore: 0,
                Past24HourVolume: 0,
                Is24HourBreakout: false,
                Past1WeekScore: 0,
                Past1WeekVolume: 0,
                Is1WeekBreakout: false
            },
            getRetailActivity: getRetailActivity,
            retailActivity: null,
            getRetailSentiment: getRetailSentiment,
            retailSentiment: null,
            getAnalystTargetPrice: getAnalystTargetPrice,
            analystTargetPrice: {
                AnalystTargetPrice: 0,
                CurrentPrice: 0
            },
            getFundamentalPageMetrics: getFundamentalPageMetrics,
            fundamentalPageMetrics: {},
            getIncomeStatement: getIncomeStatement,
            incomeStatement: {},
            getBalanceSheet: getBalanceSheet,
            balanceSheet: {},
            getCashFlow: getCashFlow,
            cashFlow: {},
            getStatistics: getStatistics,
            statistics: {},
            productDetail: {
                ProductModel: {},
                MarketData: {},
                Product: {},
                CompanyOverview: {},
                RelatedCompanies: []
            },
            toggleHeader: toggleHeader,
            loadProductWithParam: loadProductWithParam,
            placeOrder: placeOrder,
            waitTillProductDetailLoaded: waitTillProductDetailLoaded,
            waitTillPricelLoaded: waitTillPricelLoaded,
            showRelatedCompanies: showRelatedCompanies,
            invalidSectors: invalidSectors
        });
    });