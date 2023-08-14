agmNgModuleWrapper('agmp.product')
    .defineController('p.product.SidebarMenuController', ['pProductPageService', 'coreUserStateService', '$anchorScroll', '$location'],
        function (vm, dep, tool) {
            var pProductPageService = dep.pProductPageService,
                coreUserStateService = dep.coreUserStateService;
                $location = dep.$location,
                $anchorScroll = dep.$anchorScroll;
                Duplicate_location = $location.$$absUrl;
                console.log($location.$$absUrl,'$location');
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
            function Duplicate_hidden(){
                value =Duplicate_location.search('optionpi#/product/US/') ;
                if( value > 0){
                    return false;
                } else{
                    return true;
                }
            }

            tool.setVmProperties({
                toggleHeader: toggleHeader,
                gotoSection: gotoSection,
                showRelatedCompanies: showRelatedCompanies,
                showErrorMessage: showErrorMessage,
                isWarrants: isWarrants,
                Duplicate_hidden: Duplicate_hidden
            });

            pProductPageService.waitTillProductDetailLoaded().then(function () {
                vm.TradeVenueLoc = pProductPageService.currentProduct.TradeVenueLoc;

                coreUserStateService.loadUser();
                coreUserStateService.userInfoLoaded.then(function (res) {
                    vm.ProfileImageUrl = coreUserStateService.user.ProfileImageUrl;
                });
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