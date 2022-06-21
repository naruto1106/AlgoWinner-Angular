agmNgModuleWrapper('agms.orders')
    .defineControllerAsPopup('s.orders.BracketController', {
        templateUrl: '/App/shared/bracketOrders/orders.bracket.html',
            windowClass: 'full-size-modal'
        }, ['order', 'title'],
        function(vm, dep, tool) {
            vm.order = dep.order;
            vm.title = dep.title;
            vm.viewDetail = function(order) {
                alert(order.Action);
            }
        }
    );
