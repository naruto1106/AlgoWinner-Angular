agmNgModuleWrapper('agms.orders')
    .defineControllerAsPopup('s.orders.PadDefaultSettingPopupController', {
        templateUrl: '/App/shared/orderPad/orders.pad.defaultSetting.html',
        windowClass: 'tiny-modal'
    }, ['sProductService', 'myStrategies', 'currentSetup', 'updateSetupFunc', 'sUserService', 'type'],
        function (vm, dep, tool) {

            var sProductService = dep.sProductService,
                myStrategies = dep.myStrategies,
                currentSetup = dep.currentSetup,
                updateSetupFunc = dep.updateSetupFunc,
                sUserService = dep.sUserService,
                type = dep.type,
                coreNotificationService = dep.coreNotificationService;

            function searchProducts(keyword) {
                return sProductService.SearchProduct(keyword).then(function (res) {
                    return res.data;
                });
            }

            function dismissPopup() {
                vm.isSubmitting = false;
                vm.uibClosePanel();
            }

            function submitSettings() {
                vm.currentSetup.StrategyId = myStrategies.length > 0 ? myStrategies[0].DisplayInfo.BasicInfo.StrategyId : 1;
                vm.isSubmitting = true;
                sUserService.ModifyDefaultTradeSettings(vm.currentSetup).then(function () {
                    coreNotificationService.notifySuccess("Success", "Your settings have been successfully saved.");
                    updateSetupFunc(vm.currentSetup);
                }, function () {
                    coreNotificationService.notifyError("Error", "An error occurred trying to save your default order settings. Please check your network settings or try again later.");
                }).finally(function () {
                    dismissPopup();
                });
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    type: type,
                    actionTypes: ['Buy', 'Sell'],
                    quantityTypes: ['Unit', 'Lot', 'K Lot'],
                    validityTypes: ['Day', 'GTC'],
                    orderTypes: ['Limit', 'Stop', 'Market'],
                    searchProducts: searchProducts,
                    submitSettings: submitSettings,
                    submit: submitSettings,
                    dismissPopup: dismissPopup,
                    currentSetup: {},
                    defaultImageFallback: "//am708403.azureedge.net/images/no-image.jpg?"
                });

                angular.copy(currentSetup, vm.currentSetup);
            });
        });