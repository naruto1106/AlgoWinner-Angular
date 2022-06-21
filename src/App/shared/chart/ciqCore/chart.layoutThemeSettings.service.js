agmNgModuleWrapper('agms.chart')
    .defineService("sChartLayoutThemeSettingsService",
        [
            'sChartService'
        ],
        function (serviceObj, dep, tool) {

            var sChartService = dep.sChartService;
            var chartSettings = {};

            function initializeChartSettings() {

                return sChartService.getLayout().then(function (res) {
                    chartSettings = (res.data == null) ? {} : res.data;
                    return chartSettings;
                });

            }

            tool.setServiceObjectProperties({
                initializeChartSettings: initializeChartSettings
            });
        }
    );