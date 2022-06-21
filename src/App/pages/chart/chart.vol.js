agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.VolController", ['pChartFilterDescriptionService'],
        function (vm, dep, tool) {
            var pChartFilterDescriptionService = dep.pChartFilterDescriptionService;
            var filterDescription = pChartFilterDescriptionService;

            function getDateFormat(barSize) {
                switch (barSize) {
                case '1 Min':
                case '5 Min':
                case '10 Min':
                case '15 Min':
                case '30 Min':
                case '1 H':
                case '2 H':
                    //return 'DD/MMM/YY hh:mm A';
                    return 'lll z';
                case '1 M':
                    return 'MMM YYYY';
                }
                return 'DD/MMM/YYYY';
            };

            tool.setVmProperties({
                filterDescription: filterDescription,
                displayFormatted: function (date) {
                    if (!date) {
                        return "-";
                    }

                    var format = getDateFormat(vm.filterDescription.barSize);
                    if (_.includes(['1 D', '1 W', '1 M'], vm.filterDescription.barSize)) {
                        return moment(date).format(format);
                    } else {
                        var tz = vm.filterDescription.primaryProduct.timeZone;
                        return moment(date).tz(tz).format(format);
                    }
                }
            });
        }
    )
    .defineDirectiveForE('agmp-chart-vol',
        [],
        function() {
            return {
                controller: "p.chart.VolController",
                templateUrl: '/App/pages/chart/chart.vol.html'
            };
        },
        {
            volDateData: '='
        });