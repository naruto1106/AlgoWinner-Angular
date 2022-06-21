agmNgModuleWrapper('agmp.product')
    .defineController('p.product.CompanyOverviewPanelController', ['pProductPageService'],
        function(vm, dep, tool) {
            var pProductPageService = dep.pProductPageService;

            function breakBySlash(str) {
                //rename all (Miscellaneous, Not Available, or Null) sectors to "Miscellaneous"
                if (!pProductPageService.productDetail.Product.Sector || _.includes(["Not Available", "Miscellaneous"], pProductPageService.productDetail.Product.Sector.SectorName)) {
                    str = "Miscellaneous";
                }
                return str.replace(/\//g, ", ");
            }
            
            tool.initialize(function () {
                tool.setVmProperties({
                    breakBySlash:breakBySlash,
                    companyOverview: null
                });

                pProductPageService.waitTillProductDetailLoaded().then(function () {
                    vm.productDetail = pProductPageService.productDetail;
                });
            });
        })
    .defineDirectiveForE('agmp-product-company-overview-panel', [],
        function() {
            return {
                controller: "p.product.CompanyOverviewPanelController",
                templateUrl: '/App/pages/product/product.companyOverviewPanel.html'
            };
        },
        {
        });