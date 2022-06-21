agmNgModuleWrapper('agms.textProcessing')
    .defineController("s.textProcessing.TextBoxDatePickerController", [],
        function (vm, dep, tool) {

            function setHour() {
                initializeEditMode(0);
            }

            function setMinute() {
                initializeEditMode(1);
            }

            function setDay() {
                initializeEditMode(2);
            }

            function setMonth() {
                initializeEditMode(3);
            }

            function setYear() {
                initializeEditMode(4);
            }

            function reflectContentToTextBox(mode) {
                vm.editMode = mode;
                switch (mode) {
                    case 0:
                        vm.textbox = vm.dateDescriptor.hour;
                        break;
                    case 1:
                        vm.textbox = vm.dateDescriptor.minute;
                        break;
                    case 2:
                        vm.textbox = vm.dateDescriptor.day;
                        break;
                    case 3:
                        vm.textbox = vm.dateDescriptor.month;
                        break;
                    case 4:
                        vm.textbox = vm.dateDescriptor.year;
                        break;
                }
            }

            function initializeEditMode(mode) {
                if (mode === vm.editMode) {
                    vm.editMode = -1;
                    return;
                }
                reflectContentToTextBox(mode);
                tool.timeout(function () {
                    contentCaret.focus();
                }, 100);
            }

            function increaseValue() {
                var value = parseInt(vm.textbox);
                value++;
                vm.textbox = "" + value;
                reflectContentFromTextBox();
            }

            function decreaseValue() {
                var value = parseInt(vm.textbox);
                value--;
                vm.textbox = "" + value;
                reflectContentFromTextBox();
            }

            function reflectContentFromTextBox(event) {
                tool.timeout(function () {
                    cleanZero();
                    var digitValue = parseInt(vm.textbox);
                    if (isNaN(digitValue)) {
                        digitValue = 0;
                    }
                    switch (vm.editMode) {
                        case 0:
                            vm.dateDescriptor.hour = digitValue;
                            break;
                        case 1:
                            vm.dateDescriptor.minute = digitValue;
                            break;
                        case 2:
                            vm.dateDescriptor.day = digitValue;
                            break;
                        case 3:
                            vm.dateDescriptor.month = digitValue;
                            break;
                        case 4:
                            vm.dateDescriptor.year = digitValue;
                            break;
                    }
                    validateContent(event);

                    reflectContentToTextBox(vm.editMode);
                    if (vm.instantSet) {
                        setModel();
                    }
                    contentCaret.focus();
                }, 100);
            }

            function cleanZero() {
                var txt = vm.textbox;
                while (txt.length > 2 && txt[0] === "0") {
                    txt = txt.substring(1, txt.length - 1);
                }
                if (txt !== vm.textbox) {
                    vm.textbox = txt;
                }
            }

            var monthNames = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            function viewMonth(month) {
                return monthNames[month];
            }

            var dayInMonths = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

            function validateContent(event) {
                var newNumber = null;
                if (event && event.key) {
                    newNumber = parseInt(event.key);
                }

                if (vm.dateDescriptor.hour < 0) {
                    vm.dateDescriptor.hour = newNumber || 23;
                } else if (vm.dateDescriptor.hour > 23) {
                    vm.dateDescriptor.hour = newNumber || 0;
                }
                if (vm.dateDescriptor.minute < 0) {
                    vm.dateDescriptor.minute = newNumber || 59;
                } else if (vm.dateDescriptor.minute > 59) {
                    vm.dateDescriptor.minute = newNumber || 0;
                }
                if (vm.dateDescriptor.year < 0) {
                    vm.dateDescriptor.year = newNumber || new Date().getFullYear();
                } else if (vm.dateDescriptor.year > 2100) {
                    vm.dateDescriptor.year = newNumber || new Date().getFullYear();
                }

                if (vm.dateDescriptor.month < 1) {
                    vm.dateDescriptor.month = newNumber || 12;
                } else if (vm.dateDescriptor.month > 12) {
                    vm.dateDescriptor.month = newNumber || 1;
                }

                if (vm.dateDescriptor.year % 4 === 0 && (vm.dateDescriptor.year % 100 !== 0 || vm.dateDescriptor.year % 400 === 0)) {
                    dayInMonths[2] = 29;
                } else {
                    dayInMonths[2] = 28;
                }

                var dayInMonth = dayInMonths[vm.dateDescriptor.month];
                if (vm.dateDescriptor.day < 1) {
                    vm.dateDescriptor.day = newNumber || 1;
                } else if (vm.dateDescriptor.day > dayInMonth) {
                    vm.dateDescriptor.day = newNumber || dayInMonth;
                }
            }

            function evaluateMovement(event) {
                if (event.keyCode === 39) {
                    var editMode = (vm.editMode + 1) % 5;
                    if (!vm.hasTime && editMode < 2) {
                        editMode = 2;
                    }
                    initializeEditMode(editMode);
                    return;
                }
                if (event.keyCode === 37) {
                    var editMode = (vm.editMode + 4) % 5;
                    if (!vm.hasTime && editMode < 2) {
                        editMode = 2;
                    }
                    initializeEditMode(editMode);
                    return;
                }
                if (event.keyCode === 38) {
                    increaseValue();
                    return;
                }
                if (event.keyCode === 40) {
                    decreaseValue();
                    return;
                }
                if (event.keyCode === 13) {
                    setModel();
                    vm.editMode = -1;
                    return;
                }
                reflectContentFromTextBox(event);
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    textbox: "",
                    dateDescriptor: {
                        hour: 0,
                        minute: 0,
                        day: 1,
                        month: 0,
                        year: 0,
                        timezone: "SGT"
                    },
                    zeroed:zeroed,
                    viewMonth: viewMonth,
                    editMode: -1,
                    caretPosition: 0,
                    setHour: setHour,
                    setMinute: setMinute,
                    setDay: setDay,
                    setMonth: setMonth,
                    setYear: setYear,
                    evaluateMovement: evaluateMovement
                });
            });

            var contentCaret = null;
            tool.onRendered(function () {
                var obj = vm._getDirectiveElement();
                contentCaret = $(obj).find('[content-caret]');
                contentCaret.focus();
                contentCaret.keydown(function () {
                    var caret = contentCaret.caret();
                    tool.evalAsync(function () {
                        vm.caretPosition = caret;
                    });
                });
            });

            tool.watch('vm.date', function () {
                if (vm.date) {
                    //tool.log("date has changed from outside: " + vm.date);
                    getModel();
                }
            });

            function getModel() {
                var date = moment(vm.date);

                vm.dateDescriptor = {
                    hour: date.get('hour'),
                    minute: date.get('minute'),
                    day: date.get('date'),
                    month: date.get('month') + 1,
                    year: date.get('year'),
                    timezone: vm.timezone ? moment(vm.date).tz(vm.timezone).format('z') : ""
                };
            };

            function zeroed(number) {
                if (number < 10) {
                    return "0" + number;
                }
                return number;
            }

            function setModel() {
                var date = new Date();
                date.setFullYear(vm.dateDescriptor.year);
                date.setMonth(vm.dateDescriptor.month - 1);
                date.setDate(vm.dateDescriptor.day);
                date.setHours(vm.dateDescriptor.hour);
                date.setMinutes(vm.dateDescriptor.minute);
                date.setSeconds(0);
                date.setMilliseconds(0);
                vm.date = date.toISOString();
                tool.log("set model: " + vm.date);
                tool.onRendered(function () {
                    if (vm.onDateChanged) {
                        vm.onDateChanged();
                    }
                }, 100);
            };
        }
    )
    .defineDirectiveForE('agms-text-processing-tex-box-date-picker', [], function () {
        return {
            controller: "s.textProcessing.TextBoxDatePickerController",
            templateUrl: '/App/shared/textProcessing/textProcessing.textBoxDatePicker.html'
        };
    }, {
        date: '=',
        onDateChanged: '&?',
        instantSet: '=?',
        hasTime: '=?',
        timezone: '=?'
    });