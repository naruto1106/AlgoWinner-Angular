agmNgModuleWrapper('agmp.product')
    .defineController('p.product.SidebarMenuController', ['pProductPageService', '$anchorScroll', '$location'],
        function (vm, dep, tool) {
            var pProductPageService = dep.pProductPageService,
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
            });
        })
    .defineDirectiveForE('agmp-product-sidebar-menu', [],
        function () {
            return {
                controller: "p.product.SidebarMenuController",
                templateUrl: '/App/pages/product/product.sidebarMenu.html'
            };
        },
        {

        });