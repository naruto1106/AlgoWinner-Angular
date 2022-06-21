agmNgModuleWrapper('agm.common')
    .defineController("common.LoadingController", [],
        function (vm, dep, tool) {

        }
    )
    .defineDirectiveForE('agmc-loading', [], function () {
        return {
            controller: "common.LoadingController",
            templateUrl: '/App/common/directives/common.loading.html'
        };
    }, {
        isLoading: "=",
        word:'=?'
    });