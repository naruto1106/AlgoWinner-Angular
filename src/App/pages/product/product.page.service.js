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
                serviceObj.showErrorMessage = false;
            }, function () {
                deferred.reject();
                serviceObj.showErrorMessage = true;
                serviceObj.isLoading = false;
            });
            return deferred.promise;
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
                    serviceObj.showErrorMessage = true;
                    serviceObj.isLoading = false;
                }

            }, function () {
                dep.coreNotificationService.notifyError("Error loading products", "Sorry, there are no results for " + symbol);
                serviceObj.showErrorMessage = true;
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
            showErrorMessage: false,
            setHeaderVisibility: setHeaderVisibility,
            currentProduct: {},
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