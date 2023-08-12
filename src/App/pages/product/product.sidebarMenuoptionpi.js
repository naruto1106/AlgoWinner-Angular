agmNgModuleWrapper('agmp.product')
    .defineController('p.product.SidebarMenuController123', ['pProductPageService', 'coreUserStateService', '$anchorScroll', '$location'],
        function (vm, dep, tool) {
            var pProductPageService = dep.pProductPageService,
                coreUserStateService = dep.coreUserStateService;
                $location = dep.$location,
                $anchorScroll = dep.$anchorScroll;

            function gotoSection(sectionId) {
                $location.hash(sectionId);
                $anchorScroll();
                pProductPageService.setHeaderVisibility(pProductPageService.hasHeader);
            }

            function toggleHeader() {
                return pProductPageService.toggleHeader();
            }

            function showRelatedCompanies() {
                return pProductPageService.showRelatedCompanies();
            }

            function showErrorMessage() {
                return pProductPageService.showErrorMessage;
            }

            function isWarrants() {
                return pProductPageService.isWarrants;
            }

            tool.setVmProperties({
                toggleHeader: toggleHeader,
                gotoSection: gotoSection,
                showRelatedCompanies: showRelatedCompanies,
                showErrorMessage: showErrorMessage,
                isWarrants: isWarrants
            });

            pProductPageService.waitTillProductDetailLoaded().then(function () {
                vm.TradeVenueLoc = pProductPageService.currentProduct.TradeVenueLoc;

                coreUserStateService.loadUser();
                coreUserStateService.userInfoLoaded.then(function (res) {
                    vm.ProfileImageUrl = coreUserStateService.user.ProfileImageUrl;
                });
            });
        })
    .defineDirectiveForE('agmp-product-sidebar-menuoptionpi', [],
        function () {
            return {
                controller: "p.product.SidebarMenuController123",
                templateUrl: '/App/pages/product/product.sidebarMenuoptionpi.html'
            };
        },
        {

        });