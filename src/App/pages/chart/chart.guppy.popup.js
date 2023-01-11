agmNgModuleWrapper('agmp.chart')
    .defineControllerAsPopup('p.chart.GuppyPopupController',
        {
            templateUrl: '/App/pages/chart/chart.guppy.popup.html',
            windowClass: 'tiny-modal'
        },
        ['pChartRenderingUtilsService', 'sChartService', 'product'
        ],
        function (vm, dep, tool) {
            var pChartRenderingUtilsService = dep.pChartRenderingUtilsService;
            var sChartService = dep.sChartService;

            function renderTrendLine() {
                console.log(vm.selectedDate);
                var request = {
                    ProductId: dep.product.ProductId,
                    ObservationDate: vm.selectedDate
                }
                sChartService.GetSpecificAlgoCoordinates(request).then(function (res) {
                    pChartRenderingUtilsService.drawAlgoTrendline(res.data);
                });
                vm.uibClosePanel();
            }

            function openDatePicker() {
                vm.selectedDateOpened = true;
            }

            function disabled(param) {
                return (param.mode === 'day' && (param.date.getDay() === 0 || param.date.getDay() === 6));
            }
            
            tool.setVmProperties({
                renderTrendLine: renderTrendLine,
                openDatePicker: openDatePicker,
                selectedDate: new Date(),
                dateOptions: {
                    formatYear: 'yyyy',
                    startingDay: 1,
                    showWeeks: false,
                    dateDisabled: disabled,
                    maxDate: new Date(moment().endOf('day').format())
                }
            });
        });