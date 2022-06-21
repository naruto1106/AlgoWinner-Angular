agmNgModuleWrapper('agmp.mobileWeb')
    .defineController('p.mobileWeb.MenuController', ["pMobileWebService"],
    function (vm, dep, tool) {
        var pMobileWebService = dep.pMobileWebService;

        function showMobileMenu() {
            vm.isMobileMenuOpen = true;
        }

        function hideMobileMenu() {
            vm.isMobileMenuOpen = false;
        }

        function selectMenu(title) {
            pMobileWebService.menuTitle = title;
            vm.isMobileMenuOpen = false;
        }

        tool.initialize(function () {
            tool.setVmProperties({
                pMobileWebService: pMobileWebService,
                isMobileMenuOpen: false,

                showMobileMenu: showMobileMenu,
                hideMobileMenu: hideMobileMenu,
                selectMenu: selectMenu
            });
        });
    })
    .defineDirectiveForE('agmp-mobile-menu', [],
    function () {
        return {
            controller: 'p.mobileWeb.MenuController',
            templateUrl: '/App/pages/mobileWeb/mobileWeb.menu.html'
        };
    }, {});