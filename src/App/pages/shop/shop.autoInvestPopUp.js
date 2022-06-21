agmNgModuleWrapper("agmp.shop")
    .defineControllerAsPopup("p.shop.AutoInvestPopupController",
    {
        templateUrl: '/App/pages/shop/shop.autoInvestPopUp.html',
        windowClass: 'mini-modal'
    },
    ["bundle", "hasVM"],
    function (vm, dep, tool) {

        tool.initialize(function () {
            tool.setVmProperties({
                bundle: dep.bundle,
                hasVM: dep.hasVM
            });
        });
    });