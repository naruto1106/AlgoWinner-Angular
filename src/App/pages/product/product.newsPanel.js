agmNgModuleWrapper('agmp.product')
    .defineController('p.product.NewsPanelController', ["pProductPageService", "sNewsService"],
    function (vm, dep, tool) {
        var pProductPageService = dep.pProductPageService,
            sNewsService = dep.sNewsService;

        function getTotalItems() {
            return vm.news.length;
        }

        function showPagination() {
            return vm.models.numPages > 1;
        }

        function getPagedNews() {
            return _.take(_.drop(vm.news, (vm.models.currentPage - 1) * 5), 5);
        }

        function gotoNews(news) {
            dep.$window.open(news.NewsUrl);
        }

        function setSelectedTab(tab) {
            vm.selectedTab = tab;
        }

        tool.initialize(function () {
            tool.setVmProperties({
                models: {
                    currentPage: 1,
                    numPages: 1
                },
                news: [],
                selectedTab: "news",
                setSelectedTab: setSelectedTab,
                getTotalItems: getTotalItems,
                showPagination: showPagination,
                getPagedNews: getPagedNews,
                gotoNews: gotoNews
            });

            vm.isLoadingNews = true;
            pProductPageService.waitTillProductDetailLoaded().then(function () {
                vm.product = pProductPageService.currentProduct;
                sNewsService.GetNewsForProductPage(vm.product.ProductId, vm.product.TradeVenueLoc).then(function (res) {
                    vm.news = res.data;
                }).finally(function () {
                    vm.isLoadingNews = false;
                });
            });
        });
    })
    .defineDirectiveForE('agmp-product-news-panel', [],
    function () {
        return {
            controller: "p.product.NewsPanelController",
            templateUrl: '/App/pages/product/product.newsPanel.html'
        };
    },
    {
    });