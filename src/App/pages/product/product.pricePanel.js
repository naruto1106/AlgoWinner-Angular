agmNgModuleWrapper('agmp.product')
    .defineController('p.product.PricePanelController', ['pProductPageService', 'sTradingQuickTradeService', 'commonTimeZoneService'],
        function (vm, dep, tool) {
            var pProductPageService = dep.pProductPageService,
                sTradingQuickTradeService = dep.sTradingQuickTradeService,
                commonTimeZoneService = dep.commonTimeZoneService;

            function placeOrder(action, stock) {
                sTradingQuickTradeService.reinit().then(function () {
                    return sTradingQuickTradeService.placeOrder(action, stock);
                });
            }

            function onProductAddedToWatchlist(product) {
                vm.isAddingToWatchlist = false;
            }

            function dismissAddToWatchlist() {
                vm.isAddingToWatchlist = false;
            }

            function addToWatchlist() {
                vm.isAddingToWatchlist = true;
            }

            function getEncodedSectorUrl(sectorName) {
                return "//am708403.azureedge.net/images/sector/" +
                    dep.$window.encodeURIComponent(sectorName) + ".png?";
            }

            function getMarketTimeZone() {
                return commonTimeZoneService.getTimeZoneMapping(pProductPageService.currentProduct.TradeVenueLoc);
            }

            function isLoadingPrice() {
                return pProductPageService.isLoadingPrice;
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    addToWatchlist: addToWatchlist,
                    placeOrder: placeOrder,
                    isAddingToWatchlist: false,
                    onProductAddedToWatchlist: onProductAddedToWatchlist,
                    dismissAddToWatchlist: dismissAddToWatchlist,
                    getEncodedSectorUrl: getEncodedSectorUrl,
                    getMarketTimeZone: getMarketTimeZone,
                    isLoadingPrice: isLoadingPrice
                });

                pProductPageService.waitTillPricelLoaded().then(function () {
                    vm.priceDetail = pProductPageService.productDetail;
                });

                pProductPageService.waitTillProductDetailLoaded().then(function () {
                    vm.priceDetail = pProductPageService.productDetail;
                });

            });
        })
    .defineDirectiveForE('agmp-product-price-panel', [],
        function () {
            return {
                controller: "p.product.PricePanelController",
                templateUrl: '/App/pages/product/product.pricePanel.html'
            };
        },
        {
        });