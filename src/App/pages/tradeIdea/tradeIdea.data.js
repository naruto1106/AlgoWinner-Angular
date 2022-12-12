agmNgModuleWrapper('agmp.tradeIdea')
    .defineController('p.tradeIdea.TradeDataController',['$scope'],
        function ($scope) {
            var vm = this;
            $scope.toggleTableView = toggleTableView;
            $scope.viewType = "table";
            function toggleTableView(viewType) {
                $scope.viewType = viewType;
            };
        
        }) 
        .defineDirectiveForE('agmp-tradeidea-content', [],
        function () {
            return {
                controller: "p.tradeIdea.TradeDataController",
                templateUrl: '/App/pages/tradeIdea/tradeIdea.data.html'
            };
        },
        {

        });
