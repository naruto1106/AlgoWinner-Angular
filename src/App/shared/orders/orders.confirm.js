agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.ConfirmController', [],
        function(vm, dep, tool) {
            tool.initialize(function() {
                tool.setVmProperties({
                    isSubmitting: false,
                    confirmOrder: confirmOrder
                });
            });
            function confirmOrder() {
                vm.isSubmitting = true;
                tool.when(vm.submit()).finally(function () {
                    vm.isSubmitting = false;
                });
            }
        })
    .defineDirectiveForE('agms-orders-confirm', [],
        function() {
            return {
                controller: "s.orders.ConfirmController",
                templateUrl: '/App/shared/orders/orders.confirm.html'
            };
        }, {
            goBack: "=",
            confirmedOrder: "=",
            quantityType: "=",
            submit: "=",
            isFollowOrder: "="
        });