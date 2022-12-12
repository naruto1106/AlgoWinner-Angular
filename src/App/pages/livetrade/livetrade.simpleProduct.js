agmNgModuleWrapper('agmp.livetrade')
    .defineController("p.livetrade.productController", [], function (vm, dep, tool) { })
    .defineDirectiveForE("agmp-simple-product", [], function () {
            return {
                controller: "p.livetrade.productController",
                templateUrl: "/App/pages/livetrade/livetrade.simpleProduct.html"
            };
        },
        {
            product: '='
        });