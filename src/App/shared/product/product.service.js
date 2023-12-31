﻿agmNgModuleWrapper('agms.product')
    .defineService('sProductService', [], function (serviceObj, dep, tool) {
        var marketInfoPath = '/marketinfoapi/v1/ProductDetail';
        var marketInfoTickPath = '/marketinfoapi/v1/TickSize';
        var productPath = '/productapi/v1/Product';
        var ratingPath = '/ratingapi/v1/Rating';
        var retailActivityPath = '/ratingapi/v1/RetailActivity';
        var newsPath = '/newsapi/v1/News';
        var targetPricePath = '/ratingapi/v1/TargetPrice';
        var fundamentalPath = '/fundamentalapi/v1/Fundamental';
        var riskAnalysisPath = '/riskazapi/v1';

        var $window = dep.$window,
            coreConfigService = dep.coreConfigService,
            coreServerCommunicationService = dep.coreServerCommunicationService;
        
        function createProductPageUrl(selectedProduct) {
            if (coreConfigService.General.ShowProductPage && selectedProduct.TradeVenueLoc) {
                return "/Home/Inside#/product-detail/" + selectedProduct.TradeVenueLoc + "/" + selectedProduct.Symbol;
            } else {
                if (selectedProduct.Sector.SectorName === "Warrants") {
                    return (createYahooFinanceUrl(selectedProduct));
                } else {
                    return (createGoogleFinanceUrl(selectedProduct));
                }
            }
        }
        
        function goToProduct(selectedProduct) {
            if (selectedProduct.Symbol != null) {
                //$window.open("//www.reuters.com/finance/stocks/overview?symbol=" + selectedProduct.Symbol);
                //$location.path('/product/' + selectedProduct.ProductId);
                $window.open(createProductPageUrl(selectedProduct));
            } else if (selectedProduct !== "") {
                //$location.path('/product' + selectedProduct.ProductId);
                //$window.open("//www.reuters.com/finance/stocks/overview?symbol=" + selectedProduct);
                //$window.open("/Home/Inside#/product/" + selectedProduct);
            }
        };
        
        function translateTradeVenue(tradeVenueLoc) {
            switch (tradeVenueLoc) {
                case 'SG':
                    return 'SGX:';
                case 'UK':
                    return 'LON:';
                case 'AU':
                    return 'ASX:';
                default:
                    return '';
            }
        }
        
        function translateTradeVenueToName(tradeVenueLoc) {
            switch (tradeVenueLoc) {
                case 'SG':
                    return 'Singapore';
                case 'US':
                    return 'UnitedStates';
                case 'HK':
                    return 'Hongkong';
                case 'MY':
                    return 'Malaysia';
                case 'CHN':
                    return 'China';
                default:
                    return 'Singapore';
            }
        }

        function createGoogleFinanceUrl(product) {
            return "//www.google.com/finance?q=" + translateTradeVenue(product.TradeVenueLoc) + product.Symbol;
        }

        function createYahooFinanceUrl(product) {
            return "//sg.finance.yahoo.com/q?s=" + product.Symbol + "&ql=1";
        }

        function updateProductTickSizeValueIfBelongToGroup(product) {
            var productId = product.ProductId || product.ProductModel.ProductId;
            serviceObj.GetProductTickSizeValueIfBelongToGroup(productId)
                .then(function (res) {
                    product.ProductTickSizeValueIfBelongToGroup = res.data;
                });
        }
        
        tool.setServiceObjectProperties({
            createProductPageUrl: createProductPageUrl,
            goToProduct: goToProduct,            
            updateProductTickSizeValueIfBelongToGroup: updateProductTickSizeValueIfBelongToGroup,

            SriskComputePost: coreServerCommunicationService.genPostFunction(riskAnalysisPath + '/sriskCompute'),

            PriskCompute: coreServerCommunicationService.genPostFunction(riskAnalysisPath + '/priskCompute'),

            MomentumCompute: coreServerCommunicationService.genPostFunction(riskAnalysisPath + '/momentumCompute'),
            
            SizingComputePost: coreServerCommunicationService.genPostFunction(riskAnalysisPath + '/sizingCompute'),

            GetSector: coreServerCommunicationService.genGetFunctionWithNVar(productPath + '/GetSectorSelections', function (args) {
                return {
                    venue: translateTradeVenueToName(args[0]),
                };
            }),
            
            GetIndustry: coreServerCommunicationService.genGetFunctionWithNVar(productPath + '/GetIndustrySelections', function (args) {
                return {
                    venue: translateTradeVenueToName(args[0]),
                };
            }),
            
            GetLatestAnalystRating: coreServerCommunicationService.genGetFunctionWithNVar(ratingPath + '/GetLatestAnalystRating', function (args) {
                return {
                    productId: args[0],
                    venue: translateTradeVenueToName(args[1]),
                };
            }),
            
            GetNewsSentiment: coreServerCommunicationService.genGetFunctionWithNVar(newsPath + '/GetNewsSentiment', function (args) {
                return {
                    productId: args[0],
                    market: args[1],
                };
            }),
            
            GetRetailActivity: coreServerCommunicationService.genGetFunctionWithNVar(retailActivityPath + '/GetActivity', function (args) {
                return {
                    productId: args[0],
                    venue: translateTradeVenueToName(args[1]),
                    period: args[2],
                };
            }),

            GetRetailSentiment: coreServerCommunicationService.genGetFunctionWithNVar(retailActivityPath + '/GetSentiment', function (args) {
                return {
                    productId: args[0],
                    venue: translateTradeVenueToName(args[1]),
                    period: args[2],
                };
            }),
            
            GetAnalystTargetPrice: coreServerCommunicationService.genGetFunctionWithNVar(targetPricePath + '/GetTargetPrice', function (args) {
                return {
                    productId: args[0],
                    venue: translateTradeVenueToName(args[1]),
                };
            }),
            
            GetFundamentalQuarterlyPageMetrics: coreServerCommunicationService.genGetFunctionWithNVar(fundamentalPath + '/GetQuarterlyPageMetrics', function (args) {
                return {
                    productId: args[0],
                    venue: args[1]
                };
            }),
            
            GetFundamentalAnnualPageMetrics: coreServerCommunicationService.genGetFunctionWithNVar(fundamentalPath + '/GetAnnualPageMetrics', function (args) {
                return {
                    productId: args[0],
                    venue: args[1]
                };
            }),
            
            GetAnnualIncomeStatement: coreServerCommunicationService.genGetFunctionWithNVar(fundamentalPath + '/GetAnnualIncomeStatement', function (args) {
                return {
                    productId: args[0],
                    venue: args[1]
                };
            }),
            
            GetQuarterlyIncomeStatement: coreServerCommunicationService.genGetFunctionWithNVar(fundamentalPath + '/GetQuarterlyIncomeStatement', function (args) {
                return {
                    productId: args[0],
                    venue: args[1]
                };
            }),
            
            GetAnnualBalanceSheet: coreServerCommunicationService.genGetFunctionWithNVar(fundamentalPath + '/GetAnnualBalanceSheet', function (args) {
                return {
                    productId: args[0],
                    venue: args[1]
                };
            }),
            
            GetQuarterlyBalanceSheet: coreServerCommunicationService.genGetFunctionWithNVar(fundamentalPath + '/GetQuarterlyBalanceSheet', function (args) {
                return {
                    productId: args[0],
                    venue: args[1]
                };
            }),
           
            GetAnnualCashFlow: coreServerCommunicationService.genGetFunctionWithNVar(fundamentalPath + '/GetAnnualCashFlow', function (args) {
                return {
                    productId: args[0],
                    venue: args[1]
                };
            }),
            
            GetQuarterlyCashFlow: coreServerCommunicationService.genGetFunctionWithNVar(fundamentalPath + '/GetQuarterlyCashFlow', function (args) {
                return {
                    productId: args[0],
                    venue: args[1]
                };
            }),
            
            GetAnnualStatistics: coreServerCommunicationService.genGetFunctionWithNVar(fundamentalPath + '/GetAnnualStatistics', function (args) {
                return {
                    productId: args[0],
                    venue: args[1]
                };
            }),
            
            GetQuarterlyStatistics: coreServerCommunicationService.genGetFunctionWithNVar(fundamentalPath + '/GetQuarterlyStatistics', function (args) {
                return {
                    productId: args[0],
                    venue: args[1]
                };
            }),
            
            GetProductDetail: coreServerCommunicationService.genGetFunctionWithNVar(marketInfoPath + '/GetProductDetail', function (args) {
                return {
                    productId: args[0]
                };
            }),
            GetProductTickSizeValueIfBelongToGroup: coreServerCommunicationService.genGetFunctionWithNVar(marketInfoTickPath + '/GetProductTickSizeValueIfBelongToGroup', function (args) {
                return {
                    productId: args[0]
                };
            }),

            // TODO MaRa: duplicate path in ProductMs, need to deploy that one first
            GetGlobalIndicesBySymbols: coreServerCommunicationService.genPostFunction(productPath + '/GetGlobalIndicesBySymbols'),
            GetProductsByCategory: coreServerCommunicationService.genGetFunctionWithNVar(productPath + '/GetProductsByCategory', function (args) {
                return {
                    categoryName: args[0]
                };
            }),
            IsProductTradeableForBroker: coreServerCommunicationService.genGetFunctionWithNVar(productPath + '/IsProductTradeableForBroker', function (args) {
                return {
                    productId: args[0],
                    brokerageType: args[1]
                };
            }),
            GetProductLeverageAndMultiplier: coreServerCommunicationService.genGetFunctionWithNVar(productPath + '/GetProductLeverageAndMultiplier', function (args) {
                return {
                    productId: args[0],
                    brokerageType: args[1]
                };
            }),
            GetBenchmarkProducts: coreServerCommunicationService.genGetFunctionWithNVar(productPath + '/GetBenchmarkProducts'),
            GetProductBySymbolAndVenue: coreServerCommunicationService.genGetFunctionWithNVar(productPath + '/GetProductBySymbolAndVenue', function (args) {
                return {
                    tradeVenue: args[0],
                    symbol: args[1],
                    allowIndices: args[2]
                };
            }),
            GetProduct: coreServerCommunicationService.genGetFunctionWithNVar(productPath + '/GetProduct', function (args) {
                return {
                    productId: args[0]
                };
            }),
            
            SearchProductByMarket: coreServerCommunicationService.genGetFunctionWithNVar(productPath + '/SearchProductByMarket', function (args) {
                return {
                    keyword: args[0],
                    market: args[1],
                    take: args[2],
                    activeOnly: args[3]
                };
            }),
            SearchPlottableProduct: coreServerCommunicationService.genGetFunctionWithNVar(productPath + '/SearchPlottableProduct', function (args) {
                return {
                    keyword: args[0],
                    take: args[1]
                };
            }),
            SearchProduct: coreServerCommunicationService.genGetFunctionWithNVar(productPath + '/SearchProduct', function (args) {
                return {
                    keyword: args[0],
                    take: args[1],
                    activeOnly: args[2]
                };
            }),
            SearchProductForWatchlist: coreServerCommunicationService.genGetFunctionWithNVar(productPath + '/SearchProductForWatchlist', function (args) {
                return {
                    keyword: args[0],
                    take: args[1]
                };
            }),            
            GetProductsLeverage: coreServerCommunicationService.genPostFunction(productPath + '/GetProductsLeverage')
        });
    });
