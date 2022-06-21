agmNgModuleWrapper('agms.chart')
    .defineService("pChartPopupService",
        ['pChartRenderingUtilsService', 'pChartFilterDescriptionService'],
        function (serviceObj, dep, tool) {
            var visibleObjects = [];

            // WARNING: The scope of this class is injected from pChartTimeBoundEventFuncLibrary
            // Refactoring will require moving of all methods declared inside the balloon

            var pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService;

            function tradeBorderColor(color) {
                return {
                    borderColor: color
                };
            }

            function tradeBorderTopColor(color) {
                return {
                    borderTopColor: color
                };
            }

            function tradeBackgroundColor(color) {
                return {
                    backgroundColor: color
                };
            }

            function getClassNameString(getNodeFunc) {
                var node = getNodeFunc();
                var midWidth = pChartRenderingUtilsService.stxx.canvasWidth / 2;
                var midHeight = pChartRenderingUtilsService.stxx.panels['chart'].height / 2;
                var str = [];
                if (node.offsetTop < midHeight) { //U
                    str.push("pop-bottom");
                } else {
                    str.push("pop-top");
                }
                if (node.offsetLeft < midWidth) { // L
                    str.push("pop-right");
                } else {
                    str.push("pop-left");
                }
                return str;
            }

            function getProduct() {
                return pChartFilterDescriptionService.primaryProduct;
            }

            function showChartPopupDetail(item) {
                visibleObjects = [];
                visibleObjects.push(item);
            }

            function hideChartPopupDetail(item) {
                var idx = visibleObjects.indexOf(item);
                if (idx >= 0) {
                    visibleObjects.splice(idx, 1);
                }
            }

            function hasAnyChartPopup() {
                return visibleObjects.length > 0;
            }

            tool.setServiceObjectProperties({
                showChartPopupDetail: showChartPopupDetail,
                hideChartPopupDetail: hideChartPopupDetail,
                hasAnyChartPopup: hasAnyChartPopup,
                tradeBorderTopColor: tradeBorderTopColor,
                tradeBorderColor: tradeBorderColor,
                tradeBackgroundColor: tradeBackgroundColor,
                getClassNameString: getClassNameString,
                getProduct: getProduct
            });
        });

