agmNgModuleWrapper('agm.common')
    .defineController("common.DatePickerController", [],
    function (vm, dep, tool) {
        // --- LOCAL SERVICE FUNC 
        function isStep1Pairing() {
            //isSetInPair means select a date in one picker will open the other picker
            return vm.isSetInPair && vm.isPairCompletingStep === 1;
        }

        function recomputeFromDateOptions(newRanges) {
            if (vm.toDate && !vm.toDate.getTime) {
                vm.toDate = new Date(vm.toDate);
            }
            if (vm.minDate && !vm.minDate.getTime) {
                vm.minDate = new Date(vm.minDate);
            }

            vm.dateOptionsFrom.maxDate = vm.toDate;
            vm.dateOptionsFrom.minDate = vm.minDate;
            if (newRanges && newRanges.from) {
                vm.dateOptionsFrom.maxDate = newRanges.from.maxDate;
                vm.dateOptionsFrom.minDate = newRanges.from.minDate;
            }
        }

        function recomputeToDateOptions(newRanges) {

            if (vm.fromDate && !vm.fromDate.getTime) {
                vm.fromDate = new Date(vm.fromDate);
            }
            if (vm.maxDate && !vm.maxDate.getTime) {
                vm.maxDate = new Date(vm.maxDate);
            }

            vm.dateOptionsTo.maxDate = vm.maxDate;
            vm.dateOptionsTo.minDate = vm.fromDate;

            if (newRanges && newRanges.to) {
                vm.dateOptionsTo.maxDate = newRanges.to.maxDate;
                vm.dateOptionsTo.minDate = newRanges.to.minDate;
            }
        }

        function handleCommonSelectionChanges() {
            if (vm.isSetInPair && vm.isPairCompletingStep >= 0) {
                vm.isPairCompletingStep++;
            }

            if (vm.dateSelectionChanges) {
                if (!vm.isSetInPair || vm.isPairCompletingStep === 2) {
                    vm.dateSelectionChanges();
                    vm.toOpenedMyChannels = false;
                    vm.fromOpenedMyChannels = false;
                }
            }
            if (vm.isPairCompletingStep >= 2) {
                vm.isPairCompletingStep = -1;
            }
        }

        function disabled(param) {
            if (vm.showMondayOnly) {
                //enable Monday only
                return param.date.getDay() !== 1;
            } else if (vm.showTradingDayOnly) {
                // Disable weekend selection
                return (param.mode === 'day' && (param.date.getDay() === 0 || param.date.getDay() === 6));
            } else {
                return false;
            }
        }

        function stopEvent($event) {
            if (!$event) {
                return;
            }
            $event.preventDefault();
            $event.stopPropagation();
        }

        function onToDateSet() {
            var p = null;
            if (vm.onDateToChanged) {
                p = vm.onDateToChanged();
            }
            if (!p || !p.then) {
                p = tool.when();
            }
            handleCommonSelectionChanges();

            p.then(function (newRanges) {
                if (isStep1Pairing()) {
                    vm.fromOpenedMyChannels = true;
                    vm.toOpenedMyChannels = false;
                    vm.pairStarter = "To";
                }
                if (!vm.isSetInPair || isStep1Pairing()) {
                    tool.onRendered(function () {
                        tool.executeWithinLock('unwatchFromDate', function () {
                            recomputeFromDateOptions(newRanges);
                            if (vm.toDate && vm.dateOptionsFrom) {
                                vm.dateOptionsFrom.maxDate = vm.toDate;
                            }

                            if (vm.dateOptionsFrom.minDate && vm.fromDate && vm.fromDate.getTime() < vm.dateOptionsFrom.minDate.getTime()) {
                                vm.fromDate = vm.dateOptionsFrom.minDate;                            }
                            if (vm.dateOptionsFrom.maxDate && vm.fromDate && vm.fromDate.getTime() > vm.dateOptionsFrom.maxDate.getTime()) {
                                vm.fromDate = vm.dateOptionsFrom.maxDate;
                            }
                        });
                    });
                }
            });
        }

        function onFromDateSet() {
            var p = null;
            if (vm.onDateFromChanged) {
                p = vm.onDateFromChanged();
            }

            if (!p || !p.then) {
                p = tool.when();
            }
            handleCommonSelectionChanges();


            p.then(function (newRanges) {
                if (isStep1Pairing()) {
                    vm.fromOpenedMyChannels = false;
                    vm.toOpenedMyChannels = true;
                    vm.pairStarter = "From";
                }
                if (!vm.isSetInPair || isStep1Pairing()) {
                    tool.onRendered(function () {
                        tool.executeWithinLock('unwatchToDate', function () {
                            recomputeToDateOptions(newRanges);
                            if (vm.fromDate && vm.dateOptionsTo) {
                                vm.dateOptionsTo.minDate = vm.fromDate;
                            }

                            if (vm.dateOptionsTo.minDate && vm.toDate.getTime() < vm.dateOptionsTo.minDate.getTime()) {
                                vm.toDate = vm.dateOptionsTo.minDate;
                            }
                            if (vm.dateOptionsTo.maxDate && vm.toDate.getTime() > vm.dateOptionsTo.maxDate.getTime()) {
                                vm.toDate = vm.dateOptionsTo.maxDate;
                            }
                        });
                    });
                }
            });
        }


        // --- SCOPE FUNC
        function openFromMyChannels($event) {
            stopEvent($event);
            vm.fromOpenedMyChannels = true;
            vm.toOpenedMyChannels = false;
            vm.isPairCompletingStep = 0;
            recomputeFromDateOptions();
            if (vm.isSetInPair) {
                vm.dateOptionsFrom.maxDate = vm.maxDate;
                vm.dateOptionsFrom.minDate = vm.minDate;
            }
        }

        function openToMyChannels($event) {
            stopEvent($event);
            vm.isPairCompletingStep = 0;
            vm.toOpenedMyChannels = true;
            vm.fromOpenedMyChannels = false;
            recomputeToDateOptions();
            if (vm.isSetInPair) {
                vm.dateOptionsTo.maxDate = vm.maxDate;
                vm.dateOptionsTo.minDate = vm.minDate;
            }
        }

        function clear() {
            vm.fromDate = null;
            vm.toDate = null;
        }

        function resetPairStep() {
            vm.isPairCompletingStep = -1;
        }
        
        tool.onRendered(function () {
            if (vm.showFutureDate) {
                vm.maxDate = "";
            } else if (vm.maxDate == undefined) {
                vm.maxDate = new Date(moment().endOf('day').format());
            }
            if (vm.showFromLabel == undefined) {
                vm.showFromLabel = true;
            }
            if (vm.showToLabel == undefined) {
                vm.showToLabel = true;
            }
            if (vm.showFromLabel) {
                vm.fromLabel = "FROM";
            }
            if (vm.showToLabel) {
                vm.toLabel = "TO";
            }

            vm.format = 'mediumDate';
            vm.dateOptionsFrom = {
                formatYear: 'yyyy',
                startingDay: 1,
                showWeeks: false,
                dateDisabled: disabled
            };

            vm.dateOptionsTo = {
                formatYear: 'yyyy',
                startingDay: 1,
                showWeeks: false,
                dateDisabled: disabled
            };
            recomputeFromDateOptions();
            recomputeToDateOptions();

            tool.watch('vm.fromDate', function () {
                if (tool.checkLock('unwatchFromDate')) {
                    return;
                }
                onFromDateSet();
            });

            tool.watch('vm.toDate', function () {
                if (tool.checkLock('unwatchToDate')) {
                    return;
                }
                onToDateSet();
            });
        });

        tool.watch('vm.fromOpenedMyChannels', function () {
            if (isStep1Pairing() && !vm.fromOpenedMyChannels && vm.pairStarter === "To") {
                handleCommonSelectionChanges();
            }
        });
        tool.watch('vm.toOpenedMyChannels', function () {
            if (isStep1Pairing() && !vm.toOpenedMyChannels && vm.pairStarter === "From") {
                handleCommonSelectionChanges();
            }
        });

        tool.setVmProperties({
            openFromMyChannels: openFromMyChannels,
            openToMyChannels: openToMyChannels,
            clear: clear,
            isPairCompletingStep: 0, //1: one of the pickers is open
            resetPairStep: resetPairStep
        });
    })
    .defineDirectiveForE('agmc-date-picker', [], function () {
        return {

            controller: "common.DatePickerController",
            templateUrl: '/App/common/directives/common.datePicker.html'
        };
    }, {
        fromDate: '=',
        toDate: '=',
        dateSelectionChanges: '&?',
        minDate: "=?",
        maxDate: "=?",
        showFromLabel: "=?",
        showToLabel: "=?",
        showFutureDate: "=?",
        hideToDate: "=?",
        allowManualEntry: "=?",
        showMondayOnly: "=?",
        showTradingDayOnly: "=?",
        isSetInPair: '=?',
        onDateFromChanged: '&?',
        onDateToChanged: '&?'
    });