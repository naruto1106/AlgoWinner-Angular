agmNgModuleWrapper('agms.orders')
    .defineControllerAsPopup('s.orders.BracketConfirmPopUpController', {
        templateUrl: '/App/shared/bracketOrders/orders.bracket.confirm.html',
        windowClass: 'smaller-modal'
    }, ['order', "submitFunc"],
        function (vm, dep, tool) {

            function submit() {
                dep.submitFunc();
                vm.uibDismissPanel();
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    order: dep.order,
                    submit: submit
                });
            });
        }
    );