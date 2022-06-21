agmNgModuleWrapper('agmp.mobileWeb')
    .defineController("p.mobileWeb.OrderPadController", [],
        function (vm, dep, tool) {

            tool.initialize(function () {
                tool.setVmProperties({
                    
                });
            });
        })
    .defineDirectiveForE("agmp-mobile-order-pad", [],
        function () {
            return {
                controller: "p.mobileWeb.OrderPadController",
                templateUrl: '/App/pages/mobileWeb/mobileWeb.orderPad.html'
            };
        },
        {
            strategySelections: "=",
            selectedStrategy: "=",
            isLoadingPrice: "=",
            order: "=",
            actionTypes: "=",
            listenOnProductResolve: "=",
            quantityTypes: "=",
            orderTypes: "=",
            validationMessage: "=",
            currentActiveOrder: "=",
            isSubmitting: "=",
            
            selectStrategyFunc: "=",
            onActionChangedFunc: "=",
            searchProductsFunc: "=",
            onProductSelectedFunc: "=",
            updateOrderQuantityFunc: "=",
            onOrderTypeChangedFunc: "=",
            onPriceChangesFunc: "=",
            decreaseLimitPrice: "=",
            increaseLimitPrice: "=",
            decreaseStopPrice: "=",
            increaseStopPrice: "=",
            isCapitalMightExceed: "=",
            clear: "=",
            clearTransactionInfo: "=",
            disableConfirm: "=",
            submit: "=",
            showActiveOrder: "=",
            isActiveOrderPendingCancellation: "=",
            confirm: "="
        });