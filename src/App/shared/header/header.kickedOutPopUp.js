agmNgModuleWrapper("agms.header")
    .defineControllerAsPopup("s.header.KickedOutPopUpController", {
            templateUrl: '/App/shared/header/header.kickedOutPopUp.html',
            windowClass: 'mini-modal inactive-session-modal'
        },
        ["popUpType"],
        function(vm, dep, tool) {

            var popUpType = dep.popUpType;

            function reconnect() {
                vm.uibClosePanel(true);
            }

            function ignore() {
                vm.uibClosePanel(false);
            }

            tool.initialize(function() {
                tool.setVmProperties({
                    popUpType: popUpType,
                    reconnect: reconnect,
                    ignore: ignore
                });
            });
        });