agmNgModuleWrapper('agmp.account')
    .defineControllerAsPopup('p.account.LiquidateAllFeedbackController',
        {
            templateUrl: '/App/pages/account/account.liquidateAllFeedback.html',
            windowClass: 'full-size-modal'
        },
        ['positionsToLiquidate'],
        function(vm, dep, tool) {
            var positionsToLiquidate = dep.positionsToLiquidate;
            vm.positionsToLiquidate = positionsToLiquidate;
        }
    );