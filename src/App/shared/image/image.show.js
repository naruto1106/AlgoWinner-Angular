agmNgModuleWrapper('agms.image')
    .defineControllerAsPopup('s.image.ShowImageController',
        {
            templateUrl: "/App/shared/image/image.show.html",
            windowClass: 'full-size-modal',
        },
        ['image'],
        function(vm, dep, tool) {
            vm.image = dep.image;
        }
    );