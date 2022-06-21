agmNgModuleWrapper('agm.common')
    .defineDirectiveForE('agmc-country-flag', [],
        function() {
            return {
                templateUrl: '/App/common/directives/common.countryFlag.html'
            };
        }, {
            countryCode: '=',
        });