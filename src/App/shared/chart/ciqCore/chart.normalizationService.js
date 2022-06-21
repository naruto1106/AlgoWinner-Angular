agmNgModuleWrapper('agms.chart')
    .defineService("sChartNormalizationService", [
            "pChartRenderingUtilsService",
            "pChartFilterDescriptionService"
    ],
        function (serviceObj, dep, tool) {
            var pChartRenderingUtilsService = dep.pChartRenderingUtilsService;

            var filterDescription = dep.pChartFilterDescriptionService;
           
            function setNormalization(flag) {
                var primaryProduct = filterDescription.primaryProduct;
                if (!primaryProduct) {
                    return;
                }
                filterDescription.normalizeToPercentage = flag;
                pChartRenderingUtilsService.isComparisonMode = filterDescription.normalizeToPercentage;                
            }
           
            tool.setServiceObjectProperties({
                setNormalization: setNormalization
            });
        }
    );