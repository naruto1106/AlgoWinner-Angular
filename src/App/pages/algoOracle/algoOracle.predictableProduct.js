agmNgModuleWrapper('agmp.algoOracle')
    .defineControllerAsPopup("p.algoOracle.PredictableProductController",
    {
        templateUrl: '/App/pages/algoOracle/algoOracle.predictableProduct.html',
        windowClass: 'mini-modal'
    },
    ["pAlgoOracleService"],
    function (vm, dep, tool) {
        var pAlgoOracleService = dep.pAlgoOracleService;

        function getPredictableProducts() {
            vm.isLoading = true;
            pAlgoOracleService.GetPredictableProducts(vm.selectedMarket).then(function (res) {
                vm.productList = res.data;
                vm.isLoading = false;
            }, function () {
                vm.isLoading = false;
            });
        }

        function selectPredictableProduct(product) {
            pAlgoOracleService.processByOracle(product, [], true);
            vm.uibDismissPanel();
        }

        function getPagedProducts() {
            return _.take(_.drop(vm.productList, (vm.paginationModel.currentPage - 1) * 10), 10);
        }

        tool.initialize(function () {
            tool.setVmProperties({
                markets: ["Singapore", "UnitedStates"],
                selectedMarket: "Singapore",
                productList: [],
                paginationModel: {
                    currentPage: 1,
                    numPages: 0
                },

                selectPredictableProduct: selectPredictableProduct,
                getPredictableProducts: getPredictableProducts,
                getPagedProducts: getPagedProducts
            });

            getPredictableProducts();
        });
    });