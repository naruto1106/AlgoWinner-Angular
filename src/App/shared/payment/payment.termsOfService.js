agmNgModuleWrapper('agms.payment')
    .defineControllerAsPopup('s.payment.TermsOfServiceController', {
            templateUrl: '/App/shared/payment/payment.termsOfService.html',
            windowClass: 'full-size-modal',
        },
        [],
        function(vm, dep, tool) {

        });