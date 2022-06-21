agmNgModuleWrapper('agms.positions')
    .defineController("s.positions.ActiveTableController", ['sProductService'],
        function (vm, dep, tool) {

            var sProductService = dep.sProductService;
            var coreConfigService = dep.coreConfigService;

            function viewPositionDetailFunc(position) {
                return tool.promisedEmit('viewPositionDetailEvent', position);
            }

            function increasePosition(position) {
                return tool.promisedEmit('increasePositionEvent', position);
            }

            function decreasePosition(position) {
                return tool.promisedEmit('decreasePositionEvent', position);
            }

            function showPositionDetail() {
                return vm.isPreview ? false : true;
            }

            function showViewDetail() {
                return vm.isPreview ? false : vm.viewPositionDetailFunc;
            }

            function editBracketOrder(position, type, level) {
                tool.openModalByDefinition("s.positions.BracketOrderController", {
                    position: position,
                    level: level,
                    title: type === "edit" ? "Edit Bracket Order" : "Add Bracket Order"
                });
            }

            function showBracketOrder() {
                //vm.selectedStrategy.BrokerageDetail.BrokerageType === "None" is for my subscriptions page
                return coreConfigService.Trading.ShowBracketOrder && vm.selectedStrategy && vm.selectedStrategy.BrokerageDetail
                       && (vm.selectedStrategy.BrokerageDetail.BrokerageType === "AM" || vm.selectedStrategy.BrokerageDetail.BrokerageType === "None");
            }

            function showAddBracket(position) {
                return coreConfigService.Trading.ShowBracketOrder && (position.BracketOrders == null || position.BracketOrders.length === 0);
            }

            function showEditBracket(position) {
                return coreConfigService.Trading.ShowBracketOrder && (position.BracketOrders !== null && position.BracketOrders.length > 0);
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    showBracketOrder: showBracketOrder,
                    editBracketOrder: editBracketOrder,
                    showViewDetail: showViewDetail,
                    showPositionDetail: showPositionDetail,
                    increasePosition: increasePosition,
                    decreasePosition: decreasePosition,
                    viewPositionDetailFunc: viewPositionDetailFunc,
                    goToProduct: sProductService.goToProduct,
                    showEditBracket: showEditBracket,
                    showAddBracket: showAddBracket
                });
            });
        })
    .defineDirectiveForE('agms-positions-active-table', [],
        function () {
            return {
                controller: "s.positions.ActiveTableController",
                templateUrl: '/App/shared/positions/positions.active.table.html'
            };
        }, {
            isByAccount: '=',
            getPagedItems: '=',
            canIncreaseDecrease: '=',
            isPreview: '=',
            isMagnifierShown: '=',
            viewMode: '=',
            selectedStrategy: "="
        });

