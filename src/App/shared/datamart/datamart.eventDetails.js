agmNgModuleWrapper('agms.datamart')
    .defineControllerAsPopup('s.datamart.EventDetailsPopupController',
    {
        templateUrl: '/App/shared/datamart/datamart.eventDetails.html',
        windowClass: 'full-size-modal'
    },
    ['feed'],
    function (vm, dep, tool) {
        vm.feed = dep.feed;

        vm.showPicture = function (title, src) {
            tool.openModalByDefinition('s.image.ShowImageController', {
                image: {
                    src: src,
                    title: title
                }
            });
        };
    });