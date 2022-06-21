agmNgModuleWrapper('agmp.user')
    .defineControllerAsPopup('p.user.NotificationController',
        { templateUrl: '/App/pages/user/user.notification.html' },
        ['notificationMessage', 'coreConstant'],
        function(vm, dep, tool) {
            var notificationMessage = dep.notificationMessage,
                coreConstant = dep.coreConstant;
            vm.notificationMessageModel = notificationMessage;
            vm.getHeaderClass = function() {
                return vm.notificationMessageModel.type === coreConstant.PopUpMessageType.Warning ? 'warning' :
                    vm.notificationMessageModel.type === coreConstant.PopUpMessageType.Error ? 'error' :
                    'panel';
            };
            vm.clickButtonWithId = function(id) {
                vm.notificationMessageModel.onButtonClick(id);
            };
            vm.close = function(id) {
                //TODO should do .dismiss() instead for button "Cancel" and "No"
                vm.uibClosePanel(id);
            };
        }
    )
    .defineControllerAsPopup('p.user.NotificationV2Controller',
        {},
        ['notificationMessage', 'coreConstant'],
        function(vm, dep, tool) {
            var notificationMessage = dep.notificationMessage,
                coreConstant = dep.coreConstant;

            vm.dismissPanel = function() {
                vm.uibDismissPanel(id);
            }
            vm.notificationMessageModel = notificationMessage;
            vm.getHeaderClass = function() {
                return vm.notificationMessageModel.type === coreConstant.PopUpMessageType.Warning ? 'warning' :
                    vm.notificationMessageModel.type === coreConstant.PopUpMessageType.Error ? 'error' :
                    'panel';
            };
            vm.clickButtonWithId = function(id) {
                vm.notificationMessageModel.onButtonClick(id);
            };
            vm.close = function(id) {
                //TODO should do .dismiss() instead for button "Cancel" and "No"
                vm.uibClosePanel(id);
            };
        }
    );