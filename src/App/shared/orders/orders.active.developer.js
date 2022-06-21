agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.ActiveDeveloperController', ["orderProcessing"],
        function(vm,dep,tool) {
            tool.inheritVmController('s.orders.ActiveBaseController');
            tool.inheritVmController('s.orders.DeveloperBaseController');
            vm.category = "Trade";
            vm.event = "Orders";

            var orderProcessing = dep.orderProcessing;

            vm.orderFilter = function (order) {
                if (vm.models.activeOrderViewFilter === 'No Filter') {
                    return orderProcessing.isActive(order);
                } else {
                    return order.LatestStatus === vm.models.activeOrderViewFilter;
                }
            };
        }
    )
    .defineDirectiveForE('agms-orders-active-developer', [],
        function() {
            return {
                controller: "s.orders.ActiveDeveloperController",
                templateUrl: '/App/shared/orders/orders.active.html'
            };
        },{
            isByAccount: '=',
            showCancelButton: '=',
            isLoadingOrders: "=",
            viewMode: '='
        });