agmNgModuleWrapper('agmp.dashboard')
    .defineController('p.dashboard.BigNewsTipsController', ['pDashboardPageService', 'sNewsService', 'sProductService',
        'coreSignalRNotificationService', 'sWatchlistUpdateManagerService', "sHeaderService", "sWatchlistService"],
    function (vm, dep, tool) {
        // --- DEPENDENCY RESOLVER
        var pDashboardPageService = dep.pDashboardPageService,
            sNewsService = dep.sNewsService,
            sProductService = dep.sProductService,
            coreSignalRNotificationService = dep.coreSignalRNotificationService,
            sWatchlistUpdateManagerService = dep.sWatchlistUpdateManagerService,
            sHeaderService = dep.sHeaderService,
            sWatchlistService = dep.sWatchlistService;

        // --- LOCAL VAR DECLARATION
        var previousRelatedNewsPromise = null;


        // --- LOCAL SERVICE FUNC 
        function getBreakingNews() {
            vm.isLoadingBreakingNews = true;
            vm.breakingNews = [];
            sNewsService.GetBreakingNews(vm.filter.Market).then(function (res) {
                vm.breakingNews = res.data;

                //subscribe to market data
                vm.breakingNews.forEach(function (n) {
                    if (n.Products && n.Products.length > 0) {
                        n.ProductsWithMarketData = [];
                        n.Products.forEach(function (p) {
                            n.ProductsWithMarketData.push({
                                ProductModel: p,
                                MarketData: {}
                            });
                        });

                        sWatchlistUpdateManagerService.setMarketDataUpdateHandlerOnListOfWatchlistProducts(function () {
                            return n.ProductsWithMarketData;
                        }, tool);
                    }
                });

                vm.isLoadingBreakingNews = false;
            });
        }

        function getRelatedNews(selectedNews) {
            if (previousRelatedNewsPromise) {
                previousRelatedNewsPromise.cancel();
            }
            vm.relatedNews = [];
            var productIds = _.pluck(selectedNews.Products, "ProductId");

            if (productIds && productIds.length > 0) {
                vm.isLoadingRelatedNews = true;
                var request = {
                    ProductIds: productIds,
                    Market: vm.filter.Market,
                    NewsId: selectedNews.NewsId
                };
                previousRelatedNewsPromise = sNewsService.GetRelatedNews(request);

                previousRelatedNewsPromise.then(function (res) {
                    vm.relatedNews = res.data;

                    //subscribe to market data
                    vm.relatedNews.forEach(function (n) {
                        if (n.Products && n.Products.length > 0) {
                            n.ProductsWithMarketData = [];
                            n.Products.forEach(function (p) {
                                n.ProductsWithMarketData.push({
                                    ProductModel: p,
                                    MarketData: {}
                                });
                            });

                            sWatchlistUpdateManagerService.setMarketDataUpdateHandlerOnListOfWatchlistProducts(function () {
                                return n.ProductsWithMarketData;
                            }, tool);
                        }
                    });
                }).finally(function () {
                    vm.isLoadingRelatedNews = false;
                });
            }
        }
        
        function populateSearchItem(key, items) {
            return sProductService.SearchProductByMarket(key, vm.filter.Market).then(function (res) {
                var result = res.data;
                result.forEach(function (r) {
                    r.name = r.Symbol;
                    r.template = '/App/shared/templates/shared.productSearch.template.html';
                    r.typeClass = 'product';
                });
                _.remove(result, function (item) {
                    var result = false;
                    result = _.any(items, function (x) {
                        return x.Symbol && x.Symbol === item.Symbol;
                    });
                    return result;
                });

                return {
                    result: result,
                    requestText: key
                };
            });
        }


        // --- SCOPE FUNC
        function populateSearchItemPromise(key) {
            return populateSearchItem(key, vm.selectedProducts);
        }

        function observeNews(list) {
            function handleAlgoNewsAdded(news) {
                list.unshift(news);
            }

            function handleAlgoNewsModified(news) {
                list.forEach(function (u) {
                    if (u.AlgoNewsId === news.AlgoNewsId) {
                        u.Title = news.Title;
                        u.PreviewImageUrl = news.PreviewImageUrl;
                        u.UrlLink = news.UrlLink;
                        u.Content = news.Content;
                        u.UpdateTime = news.UpdateTime;
                        u.Products = news.Products;
                        u.Comments = news.Comments;
                        u.Attachments = news.Attachments;
                    }
                });
            }

            function handleAlgoNewsDeleted(news) {
                var item = list.filter(function (u) {
                    return u.AlgoNewsId === news.AlgoNewsId;
                })[0];
                var indexOf = list.indexOf(item);
                list.splice(indexOf, 1);
                return item;
            }

            coreSignalRNotificationService.turnOn('AlgoNewsAdded', handleAlgoNewsAdded);
            coreSignalRNotificationService.turnOn('AlgoNewsPostModified', handleAlgoNewsModified);
            coreSignalRNotificationService.turnOn('AlgoNewsPostDeleted', handleAlgoNewsDeleted);

            return function () {
                coreSignalRNotificationService.turnOff('AlgoNewsAdded', handleAlgoNewsAdded);
                coreSignalRNotificationService.turnOff('AlgoNewsPostModified', handleAlgoNewsModified);
                coreSignalRNotificationService.turnOff('AlgoNewsPostDeleted', handleAlgoNewsDeleted);
            };
        }

        function getFilteredNewsTips(hasReachedEnd) {
            if (!hasReachedEnd && !vm.isLoadingData) {
                var watchlistPromise = dep.$q.when(0);
                vm.isLoadingData = true;

                //reset filter
                vm.filter.ProductIds = [];
                vm.filter.WatchlistIds = [];

                //set stocks filter
                if (vm.selectedProductFilter === "search") {
                    vm.filter.ProductIds = _.pluck(vm.selectedProducts, "ProductId");
                } else if (vm.selectedProductFilter === "watchlist") {
                    if (!vm.selectedWatchlist || vm.watchlists.length === 0) {
                        vm.isLoadingData = false;
                        return tool.when();
                    }
                    vm.filter.WatchlistIds = [vm.selectedWatchlist.WatchlistId];

                    watchlistPromise = sWatchlistService.getProductIdsInWatchlist(vm.selectedWatchlist.WatchlistId)
                        .then(function(res) {
                            vm.filter.ProductIds = res.data;
                        });
                }

                return tool.onceAll([
                    watchlistPromise
                ]).then(function() {
                    return sNewsService.GetAlgoNewsByFilter(vm.filter).then(function (res) {
                        var news = res.data;
                        vm.hasReachedEnd = news.length < vm.filter.Take;

                        if (news.length > 0) {
                            for (var j = 0; j < news.length; j++) {
                                news[j].isOpen = false;
                            }

                            if (vm.filter.LastPostTimeStamp === null) {
                                vm.newsTipsList = news;
                                vm.newsTipsList[0].Selected = true;
                                getRelatedNews(vm.newsTipsList[0]);
                            } else {
                                vm.newsTipsList = vm.newsTipsList.concat(news);
                            }

                            vm.filter.LastPostTimeStamp = news[news.length - 1].PublishedTime;
                            vm.filter.CurrentPage++;

                            //subscribe to market data
                            news.forEach(function (n) {
                                if (n.Products && n.Products.length > 0) {
                                    n.ProductsWithMarketData = [];
                                    n.Products.forEach(function (p) {
                                        n.ProductsWithMarketData.push({
                                            ProductModel: p,
                                            MarketData: {}
                                        });
                                    });

                                    sWatchlistUpdateManagerService.setMarketDataUpdateHandlerOnListOfWatchlistProducts(function () {
                                        return n.ProductsWithMarketData;
                                    }, tool);
                                }
                            });

                        } else {
                            return tool.when();
                        }

                        observeNews(vm.newsTipsList);
                    }).finally(function () {
                        vm.isLoadingData = false;
                    });
                });
            } else {
                return tool.when();
            }
        }
        
        function seeNewsDetail(news) {
            dep.$window.open(news.NewsUrl);
        }

        function isPdfAttachment(news) {
            if (news.AttachmentUrl !== null) {
                return news.AttachmentUrl.indexOf(".pdf") > -1;
            }
            return false;
        }

        function showPicture(title, src) {
            tool.openModalByDefinition('s.image.ShowImageController', {
                image: {
                    src: src,
                    title: title
                }
            });
        }

        function onProductFilteredChanged() {
            vm.filter.LastPostTimeStamp = null;
            vm.newsTipsList = [];

            //scroll to top
            document.body.scrollTop = document.documentElement.scrollTop = 0;

            getFilteredNewsTips(false);
        }

        function goToLink(url) {
            if (!url.match(/^https?:\/\//i)) {
                url = 'http://' + url;
            }
            dep.$window.open(url);
        }

        function expandNews(news) {
            if (news.NewsUrl && news.NewsUrl !== "") {
                seeNewsDetail(news);
            } else {
                news.isOpen = !news.isOpen;
            }
        }

        function showOrHideFilters() {
            vm.showFilters = !vm.showFilters;
        }

        function showOrHideRelatedNews() {
            vm.showRelatedNews = !vm.showRelatedNews;
        }

        function onMarketChanged() {
            vm.filter.LastPostTimeStamp = null;
            vm.newsTipsList = [];
            vm.relatedNews = [];

            //scroll to top
            document.body.scrollTop = document.documentElement.scrollTop = 0;

            getFilteredNewsTips(false);
            getBreakingNews();
        }
        
        function selectNews(news) {
            vm.newsTipsList.forEach(function (n) {
                n.Selected = false;
            });
            news.Selected = true;
            getRelatedNews(news);
        }

        function showEmptyMessage() {
            return vm.newsTipsList && vm.newsTipsList.length <= 0 && !vm.isLoadingData;
        }

        tool.initialize(function () {
            tool.setVmProperties({
                pDashboardPageService: pDashboardPageService,
                tradeVenues: ["SG", "US"],
                selectedTradeVenue: "SG",
                selectedProductFilter: "search",
                stockFilterChecked: true,
                newsTipsList: [],
                breakingNews: [],
                relatedNews: [],
                selectedProducts: [],
                filter: {
                    Market: "SG",
                    Types: ["News"],
                    ProductIds: [],
                    From: new Date(moment.utc(moment().subtract(1, 'days').startOf('day')).format()),
                    To: new Date(moment().endOf('day').format()),
                    Take: 50,
                    CurrentPage: 0,
                    LastPostTimeStamp: null,
                    WatchlistIds: [],
                    Sector: null
                },
                isLoadingData: false,
                isLoadingBreakingNews: false,
                isLoadingRelatedNews: false,
                isLoadingFilter: false,
                hasReachedEnd: false,
                showFilters: true,
                showRelatedNews: true,
                watchlists: [],

                goToLink: goToLink,
                expandNews: expandNews,
                getFilteredNewsTips: getFilteredNewsTips,
                populateSearchItemPromise: populateSearchItemPromise,
                goToProduct: sProductService.goToProduct,
                seeNewsDetail: seeNewsDetail,
                isPdfAttachment: isPdfAttachment,
                showPicture: showPicture,
                onProductFilteredChanged: onProductFilteredChanged,
                showOrHideFilters: showOrHideFilters,
                onMarketChanged: onMarketChanged,
                selectNews: selectNews,
                showEmptyMessage: showEmptyMessage,
                showOrHideRelatedNews: showOrHideRelatedNews
            });

            sHeaderService.selectMenu("dashboard");
            getBreakingNews();

            vm.isLoadingFilter = true;
            tool.onceAll([
                sWatchlistUpdateManagerService.getWatchlists(false)
            ]).then(function (ress) {
                vm.watchlists = ress[0];
                vm.selectedWatchlist = vm.watchlists[0];
            }).finally(function () {
                vm.isLoadingFilter = false;
            });
        });
    })
    .defineDirectiveForE('agmp-dashboard-big-news-tips', [],
    function () {
        return {
            controller: "p.dashboard.BigNewsTipsController",
            templateUrl: '/App/pages/dashboard/dashboard.bigNewsTips.html'
        };
    },
    {

    });