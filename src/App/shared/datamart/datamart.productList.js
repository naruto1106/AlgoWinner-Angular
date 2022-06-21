agmNgModuleWrapper('agms.datamart')
    .defineControllerAsPopup('s.datamart.ProductListController',
    {
        templateUrl: '/App/shared/datamart/datamart.productList.html',
        windowClass: 'tiny-modal'
    },
    ["list"],
    function (vm, dep, tool) {
        vm.list = dep.list;
    });