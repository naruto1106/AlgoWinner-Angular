agmNgModuleWrapper('agms.misc')
    .defineControllerAsPopup('s.misc.DisclaimerController', {
        templateUrl: '/App/shared/misc/misc.disclaimer.html',
        windowClass: 'default-modal'
    },
    [],
    function (vm, dep, tool) {

        tool.initialize(function () {
            tool.setVmProperties({

            });
        });
    });