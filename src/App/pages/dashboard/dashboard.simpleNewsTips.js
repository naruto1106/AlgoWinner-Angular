agmNgModuleWrapper('agmp.dashboard')
    .defineController('p.dashboard.SimpleNewsTipsController', ['sProductService', "sNewsService"],
        function (vm, dep, tool) {
            var sNewsService = dep.sNewsService;

            function getBreakingNews() {
                vm.isLoadingData = true;
                sNewsService.GetBreakingNews(vm.selectedTradeVenue).then(function (res) {
                    vm.listOfNewsTips = res.data;

                    vm.isLoadingData = false;
                }, function () {
                    vm.isLoadingData = false;
                });
            }

            function seeNewsDetail(news) {
                dep.$window.open(news.NewsUrl);
            }

            function onMarketChanged() {
                vm.listOfNewsTips = [];
                getBreakingNews();
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    goToProduct: dep.sProductService.goToProduct,
                    seeNewsDetail: seeNewsDetail,
                    onMarketChanged: onMarketChanged,

                    listOfNewsTips: [],
                    isLoadingData: false,
                    tradeVenues: ["SG", "US"],
                    selectedTradeVenue: "SG"
                });

                getBreakingNews();
            });
        })
    .defineDirectiveForE('agmp-dashboard-simple-news-tips', [],
        function () {
            return {
                controller: "p.dashboard.SimpleNewsTipsController",
                templateUrl: '/App/pages/dashboard/dashboard.simpleNewsTips.html'
            };
        },
        {

        });