agmNgModuleWrapper('agmp.algoOracle')
    .defineController("p.algoOracle.ConversationController", ["pAlgoOracleService", "sMenuRightClickService", "sProductService", "pMobileWebService"],
    function (vm, dep, tool) {
        // --- DEPENDENCY RESOLVER
        var pAlgoOracleService = dep.pAlgoOracleService,
            sMenuRightClickService = dep.sMenuRightClickService,
            sProductService = dep.sProductService,
            $sce = dep.$sce;

        // --- LOCAL SERVICE FUNC 
        function sendUserMessage() {
            pAlgoOracleService.insertMessage(vm.userInput, true);
            pAlgoOracleService.updateScrollbar();
            pAlgoOracleService.processByOracle(vm.userInput, pAlgoOracleService.productList, false);
            vm.userInput = "";
        }

        // --- SCOPE FUNC
        function submitUserInput(event) {
            if (vm.userInput !== "") {
                if (event) {
                    //press enter
                    if (event.keyCode === 13) {
                        sendUserMessage();
                    }
                } else {
                    sendUserMessage();
                }
            }
        }

        function goToProduct(product) {
            if (product.AssetType !== 'Indices') {
                sProductService.goToProduct(product);
            }
        }

        function seePredictableProduct() {
            tool.openModalByDefinition('p.algoOracle.PredictableProductController', {
            });
        }

        function getPagedProducts(productList) {
            return _.take(_.drop(productList, (vm.paginationModel.currentPage - 1) * 5), 5);
        }

        function confirmComfortableLevel(conversation) {
            vm.userInput = "";
            conversation.HideBubble = true;
            return vm.pAlgoOracleService.processByOracle(conversation.ComfortableLevel, [], true);
        }

        tool.on("slideEnded", function () {
            var activeConversation = pAlgoOracleService.conversations.filter(function(c) {
                return c.IsActive;
            })[0];

            if (activeConversation) {
                vm.userInput = activeConversation.ComfortableLevel.toString();
            }
        });

        function trustAsHtml(text) {
            return $sce.trustAsHtml(text);
        }

        tool.initialize(function () {
            tool.setVmProperties({
                pAlgoOracleService: pAlgoOracleService,
                pMobileWebService: dep.pMobileWebService,
                userInput: "",
                paginationModel: pAlgoOracleService.paginationModel,

                submitUserInput: submitUserInput,
                gotoChart: sMenuRightClickService.gotoChart,
                goToProduct: goToProduct,
                seePredictableProduct: seePredictableProduct,
                getPagedProducts: getPagedProducts,
                confirmComfortableLevel: confirmComfortableLevel,
                launchOrderPad: pAlgoOracleService.launchOrderPad,
                trustAsHtml: trustAsHtml
            });

            tool.onRendered(function () {
                pAlgoOracleService.processByOracle();
            });
        });
    })
    .defineDirectiveForE("agms-algo-oracle-conversation", [],
    function () {
        return {
            controller: "p.algoOracle.ConversationController",
            templateUrl: '/App/pages/algoOracle/algoOracle.conversation.html'
        };
    },
    {
    });