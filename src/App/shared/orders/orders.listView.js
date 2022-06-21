agmNgModuleWrapper('agms.orders')
    .defineController('s.orders.ListViewController', ['sTradingItemService'],
        function(vm, dep, tool) {

            function hasPositionsOld() {
                return dep.sTradingItemService.positions && dep.sTradingItemService.positions.filter(function(u) {
                    return u.QuantityOnHold > 0;
                }).length > 0;
            }

            function hasPositions() {
                return dep.sTradingItemService.activePositions && dep.sTradingItemService.activePositions.length > 0;
            }

            vm.hasPositions = hasPositions;

            vm.activeTab = 1;

            vm.setActiveTab = function(tabIndex) {
                vm.activeTab = tabIndex;
            }

            tool.on("Overview", function() {
                vm.setActiveTab(0);
            });
            tool.on("Orders Log", function() {
                vm.setActiveTab(1);
            });
            tool.on("Active Orders", function() {
                vm.setActiveTab(2);
            });
            tool.on("Today's Trades", function() {
                vm.setActiveTab(3);
            });
            tool.on("Open Positions", function() {
                vm.setActiveTab(4);
            });
            tool.on("Historical", function() {
                vm.setActiveTab(5);
            });
        })
    .defineDirectiveForE('agms-orders-list-view', [],
        function() {
            return {
                controller: "s.orders.ListViewController",
                templateUrl: '/App/shared/orders/orders.listView.html'
            };
        }, {
            isByAccount: '=',
            capitalInfo: '=',
            isLoadingActivePositions: '=',
            isLoadingPositions: '=',
            isLoadingOrders: '=',
            isLoadingCapitalSummary: '=',
            viewMode: '=',
            selectedStrategy: "="
        });