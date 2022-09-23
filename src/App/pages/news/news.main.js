agmNgModuleWrapper('agmp.news.main', [
    "agms.news",
    "agms.product"
])
    .defineController('p.news.MainController', ['sNewsService', 'sPostingUrlLivePreviewService', 'sProductService', "sHeaderService"],
    function (vm, dep, tool) {

        var sNewsService = dep.sNewsService,
            sProductService = dep.sProductService,
            sPostingUrlLivePreviewService = dep.sPostingUrlLivePreviewService;

        vm.acceptedImageTypes = {
            'image/png': true,
            'image/jpeg': true,
            'image/gif': true
        };

        vm.acceptedPdfTypes = {
            'application/pdf': true
        };

        vm.uploadImageType = "image/*";
        vm.uploadPdfType = "application/pdf";

        vm.isPdfUrl = function (fileUrl) {
            if (fileUrl != null) {
                return fileUrl.indexOf("data:application/pdf") > -1;
            }
            return false;
        }

        vm.loadFile = function (fileUrl, fileName, fileWidth, fileHeight, toCrop) {
            if (vm.postFiles.indexOf(fileUrl, fileName) < 0) {
                var fileToAdd = {
                    AttachmentUrl: fileUrl,
                    AttachmentName: fileName,
                    Width: fileWidth,
                    Height: fileHeight,
                    ToCrop: toCrop
                }
                vm.postFiles.push(fileToAdd);
            }
        }

        vm.replaceWithCroppedImage = function (result) {
            if (!vm.postFiles[vm.postFiles.length - 1].Cropped) {
                vm.postFiles[vm.postFiles.length - 1].AttachmentUrl = result;
                tool.log("Image cropped successfully");
                vm.postFiles[vm.postFiles.length - 1].Cropped = true;
            }
        }

        vm.removeAttachment = function (file) {
            vm.postFiles.splice(vm.postFiles.indexOf(file), 1);
        }

        vm.handleItemChanged = function (item, contentInfo, contentControl) {
            sPostingUrlLivePreviewService.urlHelper.detectingNewlyTypedUrl(item, contentInfo, contentControl);
            var productIds = _.pluck(vm.tags, "ProductId");
            if (vm.feedPost && vm.feedPost.productIds && vm.feedPost.products) {
                vm.feedPost.products.forEach(function (p) {
                    if (!_.includes(productIds, p.ProductId)) {
                        var product = p;
                        product.name = product.Symbol;
                        product.typeClass = "product";
                        product.template = "/App/shared/templates/shared.productSearch.template.html";
                        vm.tags.push(product);
                    }
                });
            }
        };

        function previewNews() {
            vm.previewModel.Title = vm.newsModel.Title;
            vm.previewModel.Content = vm.feedPost.content;
            vm.previewModel.PreviewLink = (vm.newsModel.PreviewLink && vm.newsModel.PreviewLink !== "") ? vm.newsModel.PreviewLink : "";
            vm.previewModel.PreviewImageUrl = vm.userPost.previewThumb;

            if (vm.feedPost && vm.feedPost.productIds) {
                vm.tags.forEach(function (p) {
                    if (!_.includes(vm.feedPost.productIds, p.ProductId.toString())) {
                        vm.previewModel.Content += "<div><br></div><div><a class='stock-font product-id-" + p.ProductId +
                            "' href='/Home/Inside#/product-detail/" + p.TradeVenueLoc + "/" + p.Symbol +
                            "' target='_blank'>" + p.ProductName + " (" + p.Symbol + ")</a>&nbsp;</div>&nbsp;";
                    }
                });
            }

            if (!vm.previewLink || vm.previewLink.content === "") {
                vm.userPost = {};
            }

            vm.isPreviewed = true;
        }

        function addNews() {
            if (!vm.isPreviewed) {
                tool.winAlert("Please preview before submitting");
                return;
            }

            //process attachments
            var postFilesProcessed = [];
            vm.postFiles.forEach(function (file) {
                var postFile;
                if (file.ShareId) {
                    postFile = {
                        AttachmentUrl: file.ImageAsBytes,
                        AttachmentName: "Chart"
                    }
                } else {
                    postFile = {
                        AttachmentUrl: file.AttachmentUrl,
                        AttachmentName: file.AttachmentName
                    }
                }
                postFilesProcessed.push(postFile);
            });

            //process tags
            var productIds = _.pluck(vm.tags, "ProductId");
            if (vm.feedPost && vm.feedPost.productIds) {
                vm.feedPost.productIds.forEach(function (id) {
                    if (!_.includes(productIds, parseInt(id))) {
                        productIds.push(parseInt(id));
                    }
                });
            }

            //process preview link
            if (!vm.previewLink || vm.previewLink.content === "") {
                vm.userPost = {};
            }

            var algoNewsPostRequest = {
                Post: vm.feedPost.content,
                PreviewImageUrl: vm.userPost.previewThumb,
                Attachments: postFilesProcessed,
                UrlLink: vm.userPost.postUrl,
                Title: vm.newsModel.Title,
                Description: vm.userPost.postDescription,
                ProductIds: productIds,
                Venue: "SG"
            };

            return sNewsService.AddAlgoNews(algoNewsPostRequest).then(function () {
                tool.winAlert("Success");
                clearNews();
            }, function () {
                tool.winAlert("Fail");
            });
        }

        function disableSubmit() {
            return !vm.newsModel.Title || !vm.feedPost.content;
        }

        function searchProductsOnly(keyword) {
            var products = [];
            var getProductsPromise = sProductService.SearchProduct(keyword).then(function (res) {
                products = res.data;
            });
            return tool.onceAll([
                getProductsPromise
            ]).then(function () {
                tool.log("Getting Products from Search Field Successful");
                return products;
            }, function () {
                tool.logError("Error Getting Products from Search Field");
                return products;
            });
        }

        function populateSearchItem(key, items) {
            return searchProductsOnly(key).then(function (result) {
                result.forEach(function (r) {
                    r.name = r.Symbol;
                    r.template = '/App/shared/templates/shared.productSearch.template.html';
                    r.typeClass = 'product';
                });
                _.remove(result, function (item) {
                    var found = _.any(items, function (x) {
                        return x.Symbol && x.Symbol === item.Symbol;
                    });
                    return found;
                });
                var res = {
                    result: result,
                    requestText: key
                };
                return res;
            });
        }

        function populateSearchItemPromise(key) {
            return populateSearchItem(key, vm.tags);
        }

        function clearNews() {
            vm.newsModel = {
                Title: "",
                Content: ""
            };
            vm.tags = [];
            vm.previewLink = {
                content: "",
                productIds: []
            };
            vm.feedPost = {
                content: "",
                productIds: []
            };
            vm.previewModel = {
                Title: "",
                Content: "",
                PreviewLink: "",
                PreviewImageUrl: ""
            };
            vm.postFiles = [];
            vm.isPreviewed = false;
        }

        tool.watch("vm.previewLink", function (newValue) {
            vm.userPost.urlPreview = false;
        }, true);

        tool.initialize(function () {
            tool.setVmProperties({
                isPreviewed: false,
                addNews: addNews,
                previewNews: previewNews,
                clearNews: clearNews,
                disableSubmit: disableSubmit,
                populateSearchItemPromise: populateSearchItemPromise,

                newsModel: {
                    Title: "",
                    PreviewLink: ""
                },
                previewModel: {
                    Title: "",
                    Content: "",
                    PreviewLink: "",
                    PreviewImageUrl: ""
                },
                feedPost: {
                    content: "",
                    productIds: []
                },
                previewLink: {
                    content: "",
                    productIds: []
                },
                userPost: {},
                postFiles: [],
                tags: [],
                unrecognizedItems: []
            });

            dep.sHeaderService.selectMenu("news");
        });
    });