agmNgModuleWrapper('agms.orders')
    .defineController("s.orders.BracketBaseController",
        ["sOrdersPadHelperService"],
        function (vm, dep, tool) {
            var sOrdersPadHelperService = dep.sOrdersPadHelperService;

            function onAllChecked() {
                if (vm.checkAll) {
                    vm.order.HasAttachedTP = true;
                    vm.order.HasAttachedSL = true;
                } else {
                    vm.order.HasAttachedTP = false;
                    vm.order.HasAttachedSL = false;
                }

                if (vm.order.HasAttachedSL || vm.order.HasAttachedTP) {
                    vm.order.HasBracketOrder = true;
                }
            }

            function getBracketOrderErrorMessage() {
                vm.errorMessage = sOrdersPadHelperService.getBracketOrderErrorMessage(vm.order, vm.type);
                return vm.errorMessage;
            }

            function setUpLinesForCheckBoxes() {
                var c = document.getElementById("check-box-lines");
                var ctx = c.getContext("2d");

                ctx.beginPath();
                ctx.moveTo(10, 0);
                ctx.lineTo(10, 35);
                ctx.lineTo(80, 35);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(10, 35);
                ctx.lineTo(10, 100);
                ctx.lineTo(80, 100);
                ctx.stroke();
            }

            function evaluateAll() {
                if (vm.order.HasAttachedSL && vm.order.HasAttachedTP) {
                    vm.checkAll = true;
                } else {
                    vm.checkAll = false;
                }

                if (vm.order.HasAttachedSL || vm.order.HasAttachedTP) {
                    vm.order.HasBracketOrder = true;
                }
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    checkAll: false,
                    increaseTakeProfitPrice: sOrdersPadHelperService.increaseTakeProfitPrice,
                    decreaseTakeProfitPrice: sOrdersPadHelperService.decreaseTakeProfitPrice,
                    increaseCutLossPrice: sOrdersPadHelperService.increaseCutLossPrice,
                    decreaseCutLossPrice: sOrdersPadHelperService.decreaseCutLossPrice,
                    computeBracketOrderPercentage: sOrdersPadHelperService.computeBracketOrderPercentage,
                    onAllChecked: onAllChecked,
                    getBracketOrderErrorMessage: getBracketOrderErrorMessage,
                    evaluateAll: evaluateAll
                });

                tool.onRendered(function () {
                    setUpLinesForCheckBoxes();

                    if (vm.order.HasAttachedSL && vm.order.HasAttachedTP) {
                        vm.checkAll = true;
                    }

                    if (vm.order.HasAttachedSL || vm.order.HasAttachedTP) {
                        vm.order.HasBracketOrder = true;
                    }
                });
            });
        })
    .defineDirectiveForE('agms-orders-bracket-base', [], function () {
        return {
            controller: 's.orders.BracketBaseController',
            templateUrl: '/App/shared/bracketOrders/orders.bracket.base.html'
        };
    }, {
        order: '=',
        errorMessage: "=",
        type: "=",
        hideErrorMessage: "=?"
    });