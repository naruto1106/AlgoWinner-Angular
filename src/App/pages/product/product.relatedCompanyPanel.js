agmNgModuleWrapper('agmp.product')
    .defineController('p.product.RelatedCompanyPanelController', ['pProductPageService', 
        'sMarketDataService', 'tradeDataService'],
        function (vm, dep, tool) {
            var pProductPageService = dep.pProductPageService,
                sMarketDataService = dep.sMarketDataService,
                tradeDataService = dep.tradeDataService;

            function handleMarketDataUpdate(marketData) {
                vm.relatedCompanies.forEach(function (company) {
                    if (company.Product.ProductId === marketData.ProductId) {
                        company.CurrentPrice = marketData.LastTradedPrice;
                        company.PercentPriceChange = (marketData.LastTradedPrice - marketData.PrevClose) / marketData.PrevClose * 100;
                    }
                });
            }

            tool.onDestroy(function () {
                sMarketDataService.removeResourceOwner("PRODUCT_RELATEDCOMPANYPANEL");
            });

            tool.initialize(function () {
                tool.setVmProperties({
                    relatedCompanies : []
            });

                pProductPageService.waitTillProductDetailLoaded().then(function () {
                    vm.relatedCompanies = pProductPageService.productDetail.RelatedCompanies;
                    vm.relatedCompanies.forEach(function (company) {
                        tradeDataService.GetLast(company.Product).then(
                            function (res) {
                                var marketData = res.data;
                                company.CurrentPrice = marketData.LastTradedPrice;
                                company.PercentPriceChange = (marketData.LastTradedPrice - marketData.PrevClose) / marketData.PrevClose * 100;
                            }, function () {
                                tool.logError("Error invoking get Market Data");
                            });
                        sMarketDataService.subscribeMarketData(company.Product, "PRODUCT_RELATEDCOMPANYPANEL");
                    });
                });

                tool.signalRMarketData(pProductPageService.productDetail.Product.TradeVenueLoc, 'LastMarketDataUpdated', handleMarketDataUpdate);
            });
        })
    .defineDirectiveForE('agmp-product-related-company-panel', [],
        function () {
            return {
                controller: "p.product.RelatedCompanyPanelController",
                templateUrl: '/App/pages/product/product.relatedCompanyPanel.html'
            };
        },
        {
        });