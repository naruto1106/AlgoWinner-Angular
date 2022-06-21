agmNgModuleWrapper('agms.product')
    .defineController('s.product.AssetClassIconController', [], function() {})
    .defineDirectiveForE('agms-product-asset-class-icon', [], function () {
        return {
            controller: 's.product.AssetClassIconController',
            templateUrl: '/App/shared/product/product.assetClassIcon.html'
        };
    }, {
        assetClass: '='
    });