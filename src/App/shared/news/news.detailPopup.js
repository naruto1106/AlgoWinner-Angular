agmNgModuleWrapper('agms.news')
    .defineControllerAsPopup('s.news.DetailPopupController',
        {
            templateUrl: '/App/shared/news/news.detailPopup.html',
            windowClass: 'full-size-modal'
        },
        ["news"],
        function (vm, dep, tool) {

            function showPicture(title, src) {
                tool.openModalByDefinition('s.image.ShowImageController', {
                    image: {
                        src: src,
                        title: title
                    }
                });
            };

            function isPdfAttachment(news) {
                if (news.AttachmentUrl != null) {
                    return news.AttachmentUrl.indexOf(".pdf") > -1;
                }
                return false;
            }

            function goToLink(url) {
                if (!url.match(/^https?:\/\//i)) {
                    url = 'http://' + url;
                }
                dep.$window.open(url);
            }
            
            tool.initialize(function () {
                tool.setVmProperties({
                    news: dep.news,
                    showPicture: showPicture,
                    isPdfAttachment: isPdfAttachment,
                    goToLink: goToLink
                });
            });
        });