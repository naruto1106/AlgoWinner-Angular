agmNgModuleWrapper('agms.orders')
    .defineController("s.orders.OpenBaseController", ['orderProcessing'],
        function(vm, dep, tool) {

            var orderProcessing = dep.orderProcessing;
            vm.orderFilter = orderFilter;

            function orderFilter(order) {
                if (vm.models.activeOrderViewFilter === 'No Filter') {
                    return orderProcessing.isActive(order);
                } else {
                    return order.LatestStatus === vm.models.activeOrderViewFilter;
                }
            };
        });
