agmNgModuleWrapper('agms.orders')
    .defineControllerAsPopup('RelatedOrdersController',
        {
            templateUrl: '/App/shared/orders/orders.related.html'
        },
        ['order', 'title', 'relatedOrders'],
        function(vm, dep, tool) {

            var order = dep.order,
                title = dep.title,
                relatedOrders = dep.relatedOrders;

            vm.relatedOrders = relatedOrders;
            vm.order = order;
            vm.title = title;
            vm.cssClass = function(relatedOrder) {
                var isReference = vm.order ? relatedOrder.OrderId === vm.order.OrderId : false;
                return isReference ? ['ref-order'] : [];
            };

            vm.models = {
                currentPage: 1,
                numPages: 1
            };

            vm.showPagination = showPagination;
            vm.getPagedRelatedOrders = getPagedRelatedOrders;

            var ordersPerPage = 10;

            function getPagedRelatedOrders() {
                return _.take(_.drop(_.sortBy(relatedOrders, ['UpdateTime']).reverse(), (vm.models.currentPage - 1) * ordersPerPage), ordersPerPage);
            }

            function showPagination() {
                return vm.models.numPages > 1;
            }
        }
    );