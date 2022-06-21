agmNgModuleWrapper('agms.product')
    .defineController('s.product.PictureController', ['sProductService', "tradeDataService"],
    function (vm, dep, tool) {
        var $window = dep.$window,
            sProductService = dep.sProductService,
            tradeDataService = dep.tradeDataService;

        function goToProduct(product) {
            if (!vm.disableClick && product.AssetType !== 'Indices') {
                sProductService.goToProduct(product);
            }
        }

        function getEncodedSectorUrl(sectorName) {
            return "//am708403.azureedge.net/images/sector/" +
                $window.encodeURIComponent(sectorName) + ".png?";
        }

        function hoverMarketData() {
            if (!vm.hideMarketData) {
                vm.productWithMarketData = {
                    ProductModel: angular.copy(vm.product)
                };

                tradeDataService.GetLast(vm.productWithMarketData.ProductModel).then(
                    function (res) {
                        var marketData = res.data;
                        vm.productWithMarketData.MarketData = {
                            LastTradedPrice: marketData.LastTradedPrice,
                            LastTradedPriceDiff: marketData.LastTradedPrice - marketData.PrevClose,
                            LastTradedPriceDiffPct: (marketData.LastTradedPrice - marketData.PrevClose) / marketData.PrevClose * 100
                        }
                    });
            }
        }

        tool.initialize(function () {
            tool.setVmProperties({
                productWithMarketData: {},
                getEncodedSectorUrl: getEncodedSectorUrl,
                goToProduct: goToProduct,
                hoverMarketData: hoverMarketData
            });
        });
    })
    .defineDirectiveForE('agms-product-picture', [], function () {
        return {
            controller: 's.product.PictureController',
            templateUrl: '/App/shared/product/product.picture.html'
        };
    }, {
        hideSymbol: "=?",
        disableClick: "=?",
        product: '=',
        hideMarketData: "=?",
        showCurrency: "=?"
    }, function (scope, element, attrs, controller, transcludeFn, dep, tool) {
        if (_.isEmpty(attrs.ngSrc)) {
            element.attr('src', attrs.agmSharedImageFallback);
        }
        element.bind('error', function () {
            element.attr('src', attrs.agmSharedImageFallback);
        });
    });