agmNgModuleWrapper('agmp.mobileWeb')
    .defineService("pMobileWebService", [],
    function (serviceObj, dep, tool) {
        function showMobileWeb() {
            var width = $(window).width();
            return width <= 768 || serviceObj.isOpenFromApp;
        }

        tool.setServiceObjectProperties({
            isOpenFromApp: false,
            showDownloadApp: false,
            menuTitle: "",

            showMobileWeb: showMobileWeb
        });
    });