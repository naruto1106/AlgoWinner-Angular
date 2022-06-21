agmNgModuleWrapper('agms.payment')
    .defineControllerAsPopup('s.payment.AddBankAccountPopupController',
    {
        templateUrl: '/App/shared/payment/payment.addBankAccountPopup.html',
        windowClass: 'smaller-modal'
    },
    ['commonScreenResizerService'],
        function (vm, dep, tool) {

            dep.commonScreenResizerService.setForceActualSize(true);

            vm.deferredCompletion = tool.defer();
            vm.deferredCompletion.promise.then(function() {
                vm.uibClosePanel();
            }, function () {

            });

            vm.dismissPanel = function() {
                dep.commonScreenResizerService.setForceActualSize(false);
                vm.uibDismissPanel();
            }
        }
    );
