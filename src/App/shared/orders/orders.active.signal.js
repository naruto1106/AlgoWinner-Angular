agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.ActiveSignalController', ["orderProcessing"],
        function(vm, dep, tool) {
            tool.inheritVmController('s.orders.ActiveBaseController');
            tool.inheritVmController('BaseSignalOrderController');

            if (vm.isPreview) {
                vm.noOrderMessage = "Your subscription level does not allow viewing active orders";
            }
            vm.category = "MySubscriptions";
            vm.event = "TrackSubscribedStrategies";

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
    .defineDirectiveForE('agms-orders-active-signal', [],
        function() {
            return {
                controller: "s.orders.ActiveSignalController",
                templateUrl: '/App/shared/orders/orders.active.html'
            };
        }, {
            showCancelButton: '=',
            isPreview: "=",
            levelOfDetail: "=",
            isLoadingOrders: "=",
            noOrderMessage: "=",
            subscriberOrders: '='
        });