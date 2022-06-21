agmNgModuleWrapper('agms.strategyCommerce')
    .defineController('s.strategyCommerce.CategoryController', [], function() {})
    .defineDirectiveForE('agms-strategy-commerce-category', [], function() {
        return {
            controller: 's.strategyCommerce.CategoryController',
            templateUrl: '/App/shared/strategyCommerce/strategyCommerce.category.html'
        };
    }, {
        categories: '='
    });