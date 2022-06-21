agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.DatePickerController", ['sChartMarketDataService', 'pChartFilterDescriptionService', 'pChartTgpsService',
        'pChartRenderingUtilsService', 'pChartPeriodicityService', 'pChartFundamentalHelperService'],
        function (vm, dep, tool) {
            var sChartMarketDataService = dep.sChartMarketDataService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartPeriodicityService = dep.pChartPeriodicityService,
                pChartTgpsService = dep.pChartTgpsService,
                pChartFundamentalHelperService = dep.pChartFundamentalHelperService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService;

            var barStartFullDate, barEndFullDate;

            var filterDescription = pChartFilterDescriptionService;

            function setBarRange() {
                var periodicity = pChartPeriodicityService.getPeriodicity(vm.filterDescription.barSize);
                pChartRenderingUtilsService.setRange(barStartFullDate, moment(barEndFullDate).endOf('day'), periodicity[0], periodicity[1]);
            }

            function setStartDateIfNecessary() {
                var stxx = pChartRenderingUtilsService.stxx;
                if (stxx.chart.dataSet.length > 0) {
                    var endDatePosition = -1;
                    for (var i = 0; i < stxx.chart.dataSet.length; i++) {
                        if (stxx.chart.dataSet[i].DT > vm.barEndDate) {
                            endDatePosition = i;
                            break;
                        }
                    }
                    var defaultStartDatePosition = Math.max(endDatePosition - stxx.chart.maxTicks, 0);

                    var defaultStartDate = moment(stxx.chart.dataSet[defaultStartDatePosition].DT).startOf('day');
                    if (moment(barStartFullDate) < defaultStartDate)
                        barStartFullDate = defaultStartDate.format();
                }
            }

            function convertToTimezoneDate(date) {
                return moment(date).tz(filterDescription.primaryProduct.timeZone).format('YYYY-MM-DDTHH:mm:ss');
            }

            function synchronizeBarStartDateFromFullDate() {
                vm.barStartDate = vm.isIntraday(vm.filterDescription.barSize) ? convertToTimezoneDate(barStartFullDate) : barStartFullDate;
            }

            function synchronizeBarEndDateFromFullDate() {
                vm.barEndDate = vm.isIntraday(vm.filterDescription.barSize) ? convertToTimezoneDate(barEndFullDate) : barEndFullDate;
            }

            function barSizePickerChanged() {
                //patchStartAndEndDateIfNecessary();
                var stxx = pChartRenderingUtilsService.stxx;
                setBarRange();
                if (pChartTgpsService.tradersGpsMode) {
                    stxx.setCandleWidth(5.0);
                } else {
                    stxx.setCandleWidth(5.0);
                }

                stxx.chart.scroll = Math.floor((stxx.chart.width - 200) / stxx.layout.candleWidth);
                stxx.draw();

                tool.broadcast("onBarSizeChanges");
                pChartFundamentalHelperService.onBarSizeChanges();
            }

            function setDatePickerOptions() {
                vm.dateOptionsFrom = {
                    minDate: new Date(getMinStartDate(vm.filterDescription.barSize)),
                    maxDate: new Date(vm.barEndDate)
                };
                vm.dateOptionsTo = {
                    minDate: new Date(vm.barStartDate),
                        maxDate: new Date(getMaxEndDate())
                };
            }         

            function getLeftMostQuote(cru) {
                var chart = cru.stxx.chart;
                if (!chart.dataSet) {
                    return null;
                }

                var leftTick = (chart.dataSet.length - chart.scroll) + 1;
                if (leftTick < 0) leftTick = 0;

                return chart.dataSet[leftTick];
            }

            function getRightMostQuote(cru) {
                var chart = cru.stxx.chart;
                if (!chart.dataSet) {
                    return null;
                }
                var rightTick = chart.dataSet.length - chart.scroll + chart.maxTicks;
                if (rightTick > chart.dataSet.length) rightTick = chart.dataSet.length;

                return chart.dataSet[rightTick - 1];
            }

            function syncStartAndEndDate() {
                var startQuote = getLeftMostQuote(pChartRenderingUtilsService);
                if (startQuote) {
                    barStartFullDate = moment(startQuote.DT).format();
                    synchronizeBarStartDateFromFullDate();
                }

                var endQuote = getRightMostQuote(pChartRenderingUtilsService);
                if (endQuote) {
                    barEndFullDate = moment(endQuote.DT).format();
                    synchronizeBarEndDateFromFullDate();
                }
                setDatePickerOptions();                
            }

            function barEndDateChanged() {
                vm.endDatePickerOpened = false;
                barEndFullDate = vm.barEndDate;
                setStartDateIfNecessary();
                setBarRange();
            }

            function barStartDateChanged() {
                vm.startDatePickerOpened = false;
                barStartFullDate = vm.barStartDate;
                setBarRange();
            }

            function closeStartDatePicker() {
                vm.startDatePickerOpened = false;
                setBarRange();
            }

            function closeEndDatePicker() {
                vm.endDatePickerOpened = false;
                setBarRange();
            }

            function getDatePickerMode(barSize) {
                switch (barSize) {
                case '1 Min':
                case '5 Min':
                case '10 Min':
                case '15 Min':
                case '30 Min':
                case '1 H':
                case '2 H':
                case '1 D':
                    return 'day';
                case '1 W':
                case '1 M':
                    return 'month';
                }
                return 'day';
            }

            function getMinStartDate (barSize) {
                switch (barSize) {
                case '1 Min':
                case '5 Min':
                case '10 Min':
                case '15 Min':
                    return moment().subtract(3, 'months').startOf('day').format();
                case '30 Min':
                case '1 H':
                case '2 H':
                    return moment().subtract(5, 'years').startOf('day').format();
                }

                return moment().subtract(30, 'years').startOf('day').format();
            }

            function getMaxEndDate () {
                return moment().endOf('day').format();
            }
            
            tool.initialize(function () {
                barStartFullDate = moment().subtract(1, 'years').startOf('day').format();
                barEndFullDate = moment().endOf('day').format();

                tool.setVmProperties({
                    setBarRange: setBarRange,
                    isIntraday: sChartMarketDataService.isIntraday,
                    getDatePickerMode: getDatePickerMode,
                    barEndDateChanged: barEndDateChanged,
                    closeStartDatePicker: closeStartDatePicker,
                    closeEndDatePicker: closeEndDatePicker,
                    barStartDateChanged: barStartDateChanged,
                    barStartDate: barStartFullDate,
                    barEndDate: barEndFullDate,
                    filterDescription: filterDescription,
                });

                setDatePickerOptions();

                tool.on('onStxChartDrawn', syncStartAndEndDate);
                tool.on('onChartBarSizePickerChanged', barSizePickerChanged);
            });
        }
    )
    .defineDirectiveForE('agmp-chart-date-picker',
        [],
        function () {
            return {
                controller: "p.chart.DatePickerController",
                templateUrl: '/App/pages/chart/chart.datepicker.html'
            };
        },
        {

        });