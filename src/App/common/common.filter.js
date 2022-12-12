agmNgModuleWrapper('agm.common')
    .ngApp
    .service('commonCurrencyConverterService', function () {
        this.convertCurrencyCode = function (code) {
            if (code === "USD") return "US$";
            else if (code === "CAD") return "C$";
            else if (code === "AUD") return "AU$";
            else if (code === "NZD") return "NZ$";
            else if (code === "HKD") return "HK$";
            else if (code === "SGD") return "S$";
            else if (code === "MXN") return "Mex$";
            else if (code === "EUR") return "€";
            else if (code === "GBP") return "£";
            else if (code === "GBX") return "p";
            else if (code === "JPY") return "¥";
            else if (code === "CNY") return "¥";
            else if (code === "ZAR") return "R";
            else if (code === "BRL") return "R$";
            else if (code === "TWD") return "NT$";
            else if (code === "SEK") return "kr";
            else if (code === "NOK") return "kr";
            else if (code === "DKK") return "kr";
            else if (code === "KRW") return "₩";
            else if (code === "INR") return "₹";
            else if (code === "RUB") return "руб";
            else if (code === "CZK") return "Kč";
            else if (code === "HUF") return "Ft";
            else if (code === "PLN") return "zł";
            else if (code === "SAR") return "﷼";
            else if (code === "THB") return "฿";
            else if (code === "TRY") return "₺";
            else if (code === "ILS") return "₪";
            else if (code === "CNH") return "¥";
            else if (code == null) {
                return "";
            }
            return code;
        };
    })
    .service('dateTimeSyncService', [
        'coreServerCommunicationService', function (coreServerCommunicationService) {
            var path = '/identityapi/DateTimeSync/';
            var that = this;
            this.GetServerTimestampNtp = coreServerCommunicationService.genGetFunctionWithNVar(path + "GetServerTimestampNtp", function () {
                var clientTimestamp = (new Date()).valueOf();
                return { clientTimestamp: clientTimestamp };
            });

            var ntpResult = {
                roundtripdelay: 0,
                offset: 0
            };
            this.GetServerTimestampNtp().then(function (result) {
                var data = result.data;
                var nowTimeStamp = (new Date()).valueOf();
                var serverTimestamp = data.ServerTimestamp;
                var clientTimestamp = data.ClientTimestamp;
                // assume 0ms server processing time
                ntpResult.roundtripdelay = (nowTimeStamp - clientTimestamp);
                ntpResult.offset = ((serverTimestamp - clientTimestamp) + (serverTimestamp - nowTimeStamp)) / 2;
            });

            this.getCurrentServerTime = getCurrentServerTime;
            function getCurrentServerTime() {
                return moment(new Date((new Date()).valueOf() + ntpResult.offset));
            }
        }
    ])
    .filter('fromTrueFalseToYesNo', function () {
        return function (flag) {
            return flag ? "Yes" : "No";
        };
    })
    .filter("positionQuantity", [
        'numberFilter',
        function (numberFilter) {
            return function (input, positionType) {
                if (positionType === 'Long') {
                    return '+' + numberFilter(input, 0);
                } else {
                    return '-' + numberFilter(input, 0);
                }
            };
        }
    ])
    .filter("orderQuantity", [
        'numberFilter',
        function (numberFilter) {
            return function (input, action) {
                if (action === 'Buy') {
                    return '+' + numberFilter(input, 0);
                } else if (action === 'Sell') {
                    return '-' + numberFilter(input, 0);
                } else {
                    return numberFilter(input, 0);
                }
            };
        }
    ])
    .filter('strategyName', function () {
        return function (displayModel) {
            if (!displayModel) {
                return null;
            }

            if (displayModel.OverridenDisplayValues && displayModel.OverridenDisplayValues.IsApproved) {
                return displayModel.OverridenDisplayValues.OverridenStrategyName;
            }
            return displayModel.BasicInfo.Name;
        };
    })
    .filter('strategyImage', function () {
        return function (displayModel) {
            if (!displayModel) {
                return null;
            }

            if (displayModel.OverridenDisplayValues && displayModel.OverridenDisplayValues.IsApproved && displayModel.OverridenDisplayValues.OverridenStrategyImageUrl) {
                return displayModel.OverridenDisplayValues.OverridenStrategyImageUrl;
            }
            return displayModel.BasicInfo.ImageUrl;
        };
    })
    .filter('timeSince', [
        'dateTimeSyncService', function (dateTimeSyncService) {
            function timeSince(input, withoutSuffix) {
                var inputAsMoment = moment(input);
                var currentServerTime = dateTimeSyncService.getCurrentServerTime();
                if (inputAsMoment.isAfter(currentServerTime)) {
                    return '';
                }
                withoutSuffix = withoutSuffix || false;
                return inputAsMoment.from(currentServerTime, withoutSuffix);
            };

            //timeSince.$stateful = true;
            return timeSince;
        }
    ])
    .filter('getOrderIntentionString', function () {
        return function (intention, position) {
            switch (intention) {
                case "New":
                    switch (position) {
                        case "Sell":
                            return "enter short";
                        case "Buy":
                            return "enter long";
                    }
                    break;
                case "Increase":
                    switch (position) {
                        case "Sell":
                            return "increase short";
                        case "Buy":
                            return "increase long";
                    }
                    break;
                case "Partial Exit":
                    switch (position) {
                        case "Buy":
                            return "partial exit short";
                        case "Sell":
                            return "partial exit long";
                    }
                    break;
                case "Full Exit":
                    switch (position) {
                        case "Buy":
                            return "full exit short";
                        case "Sell":
                            return "full exit long";
                    }
                    break;
            }
            return "";
        };
    })
    .filter('timeDiff', function () {
        return function (timeA, timeB) {
            return moment(timeA).from(moment(timeB), true);
        };
    })
    .filter('toAbsPercent', [
        'separatorFormatFilter',
        function (separatorFormatFilter) {
            return function (value) {
                if (value === 0) {
                    value = "NA";
                } else {
                    value = separatorFormatFilter(Math.abs((value * 100)), 2) + "%";
                }
                return value;
            };
        }
    ])
    .filter('toAbsPercentAllowingZero', [
        'separatorFormatFilter',
        function (separatorFormatFilter) {
            return function (value) {
                if (value === 0) {
                    value = "0.00%";
                } else {
                    value = separatorFormatFilter(Math.abs((value * 100)), 2) + "%";
                }
                return value;
            };
        }
    ])
    .filter('toPercentAllowingZero', [
        'separatorFormatFilter',
        function (separatorFormatFilter) {
            return function (value) {
                if (value === 0) {
                    value = "0.00%";
                } else {
                    value = separatorFormatFilter((Math.abs(value) * 100), 2) + "%";
                }
                return value;
            };
        }
    ])
    .filter('toHumaneDuration', function () {
        return function (seconds) {
            return moment.duration(seconds, "seconds").humanize();
        };
    })
    .filter('daySince', function () {
        return function (date) {
            return moment().diff(date, 'days');
        };
    })
    .filter('weekSince', function () {
        return function (date) {
            return moment().diff(date, 'weeks');
        };
    })
    .filter('monthSince', function () {
        return function (date) {
            return moment().diff(date, 'months');
        };
    })
    .filter('dateLong', function () {
        return function (date) {
            return moment(date).format('MMM D, YYYY HH:mm');
        };
    })
    .filter('dateLongTimeZone', function () {
        return function (date, timezone) {
            var time = moment(date).tz(timezone).format('MMM D, YYYY HH:mm');
            if (time === "Invalid date") {
                return moment(date, 'LLLL z').format('MMM D, YYYY HH:mm');
            }
            return time;
        };
    })
    .filter('dateLongWithTimeZone', function () {
        return function (date, timezone) {
            var time = moment(date).tz(timezone).format('lll z');
            if (time === "Invalid date") {
                return moment(date, 'LLLL z').tz(timezone).format('lll z');
            }
            return time;
        };
    })
    .filter('dateShort', function () {
        return function (date) {
            return moment(date).format('MMM D, YYYY');
        };
    })
    .filter('dateShortTimeZone', function () {
        return function (date, timezone) {
            var time = moment(date).tz(timezone).format('MMM D, YYYY');
            if (time === "Invalid date") {
                return moment(date, 'LLLL z').tz(timezone).format('MMM D, YYYY');
            }
            return time;
        };
    })
    .filter('monthYearTimeZone', function () {
        return function (date, timezone) {
            var time = moment(date).tz(timezone).format('MMM YYYY');
            if (time === "Invalid date") {
                return moment(date, 'LLLL z').tz(timezone).format('MMM YYYY');
            }
            return time;
        };
    })
    .filter('calendarTime', function () {
        return function (date) {
            var asMoment = moment(date);
            var time = asMoment.calendar();
            if (time.indexOf('Today') > -1 || time.indexOf('Yesterday') > -1) {
                return time;
            } else {
                return asMoment.format('lll');
            }
        }
    })
    .filter('timeShort', function () {
        return function (date) {
            var time = moment(date).format('HH:mm');
            return time;
        };
    })
    .filter('timeShortTimeZone', function () {
        return function (date, timezone) {
            var time = moment(date).tz(timezone).format('HH:mm z');
            if (time === "Invalid date") {
                return moment(date, 'LLLL z').tz(timezone).format('HH:mm z');
            }
            return time;
        };
    })
    .filter('dayLater', function () {
        return function (date) {
            return moment(date).diff(moment(), 'days');
        };
    })
    .filter('periodLy', function () {
        return function (p) {
            if (!p) {
                return null;
            }
            switch (p.toUpperCase().trim()) {
                case "DAILY":
                    return "Day";
                case "MONTHLY":
                    return "Month";
                case "WEEKLY":
                    return "Weekly";
                case "QUARTERLY":
                    return "Quarter";
                case "ANNUALLY":
                    return "Year";
                case "SEMIANNUALLY":
                    return "6 Months";
            }
            return "";
        };
    })
    .filter('subscriptionTierTerm', function () {
        return function (p) {
            switch (p) {
                case "Premium":
                    return "PREMIUM";
                case "Basic":
                    return "PAY AS YOU GO ";
                case "Preview":
                    return "PREVIEW";
            }
            return "";
        };
    })
    .filter('valueTransactionOrDash', [
        'numberFilter',
        function (numberFilter) {
            return function (value, decimal) {
                if (value || value === 0) {
                    return numberFilter(value / 100, decimal);
                } else {
                    return '-';
                }
            };
        }
    ])
    .filter('valueOrDash', [
        'numberFilter',
        function (numberFilter) {
            return function (value, decimal) {
                if (value || value === 0) {
                    return numberFilter(value, decimal);
                } else {
                    return '-';
                }
            };
        }
    ])
    .filter('valuePercentOrDash', [
        'numberFilter',
        function (numberFilter) {
            return function (value, decimal) {
                if (value || value === 0) {
                    return numberFilter(value, decimal) + ' %';
                } else {
                    return '-';
                }
            };
        }
    ])
    .filter('valuePercentageOrDash', [
        'numberFilter',
        function (numberFilter) {
            return function (value, decimal) {
                if (value || value === 0) {
                    return numberFilter(value * 100, decimal) + ' %';
                } else {
                    return '-';
                }
            };
        }
    ])
    .filter('valuePercentageOrDashDynamicDecimals', [
        'numberFilter',
        function (numberFilter) {
            return function (value, number) {
                if (value || value === 0) {
                    for (var i = 2; i <= number; i++) {
                        if (numberFilter(value * 100, i) * Math.pow(10, i) === 1 && value * 100 * Math.pow(10, i) < 1) {
                            return numberFilter(value * 100, i + 1) + ' %';
                        } else if (numberFilter(value * 100, i) > 0 || numberFilter(value * 100, i) < 0) {
                            return numberFilter(value * 100, i) + ' %';
                        } else if (i === number) {
                            return '0.00 %';
                        }
                    }
                } else {
                    return '-';
                }
            };
        }
    ])
    .filter('valuePercentOrDashDynamicDecimals', [
        'numberFilter',
        function (numberFilter) {
            return function (value, number) {
                if (value || value === 0) {
                    for (var i = 2; i <= number; i++) {
                        if (numberFilter(value, i) * Math.pow(10, i) === 1 && value * Math.pow(10, i) < 1) {
                            return numberFilter(value, i + 1) + ' %';
                        } else if (numberFilter(value, i) > 0 || numberFilter(value, i) < 0) {
                            return numberFilter(value, i) + ' %';
                        } else if (i === number) {
                            return '0.00 %';
                        }
                        continue;
                    }
                } else {
                    return '-';
                }
            };
        }
    ])
    .filter('largeAmountValue', [
        function (val) {
            return function (val, dec, kMode) {
                if (val == null) {
                    return null;
                }

                dec = dec || 2;
                if (val > 1000 * 1000 * 1000) {
                    return (val / (1000 * 1000 * 1000)).toFixed(2) + " B";
                } else if (val > 1000 * 1000) {
                    return (val / (1000 * 1000)).toFixed(2) + " M";
                } else {
                    if (val > 1000 && kMode) {
                        return (val / 1000).toFixed(2) + " K";
                    }

                    return val.toFixed(dec);
                }
            };
        }
    ])
    .filter('currencySymbol', [
        'commonCurrencyConverterService', function (commonCurrencyConverterService) {
            return function (currency) {
                if (!currency) {
                    return null;
                }
                return commonCurrencyConverterService.convertCurrencyCode(currency.toUpperCase());
            };
        }
    ])
    .filter('customCurrencyOrDashMinMax', [
        'commonCurrencyConverterService', 'currencyOrDashMinMaxFilter',
        function (commonCurrencyConverterService, currencyOrDashMinMaxFilter) {
            return function (value, currency, minDecimalPlaces, maxDecimalPlaces) {
                return currencyOrDashMinMaxFilter(value, commonCurrencyConverterService.convertCurrencyCode(currency), minDecimalPlaces, maxDecimalPlaces);
            };
        }
    ])
    .filter('currencyOrDashMinMax', [
        'separatorFormatMinMaxFilter',
        function (separatorFormatMinMaxFilter) {
            return function (value, currency, minDecimalPlaces, maxDecimalPlaces) {
                if (value || value === 0) {
                    var sign = value >= 0 ? "" : "-";
                    var absValue = Math.abs(value);
                    if (currency === 'p') {
                        return sign + '' + separatorFormatMinMaxFilter(absValue, minDecimalPlaces, maxDecimalPlaces) + currency;
                    }
                    return sign + '' + currency + ' ' + separatorFormatMinMaxFilter(absValue, minDecimalPlaces, maxDecimalPlaces);
                } else {
                    return '-';
                }
            };
        }
    ])
    .filter('separatorFormatMinMax', function () {
        return function (value, minDecimalPlaces, maxDecimalPlaces) {
            if (!minDecimalPlaces && !maxDecimalPlaces) {
                return value.toString().replace(/\B(?=(\d{3})+\b)/g, ",");
            } else if (minDecimalPlaces && maxDecimalPlaces) {
                var decimalPlaces = ((+value).toFixed(10)).replace(/^-?\d*\.?|0+$/g, '').length;
                return (decimalPlaces >= maxDecimalPlaces) ? value.toFixed(maxDecimalPlaces).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') :
                    ((decimalPlaces < minDecimalPlaces) ? value.toFixed(minDecimalPlaces).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') :
                        value.toFixed(decimalPlaces).toString().replace(/\B(?=(\d{3})+\b)/g, ","));
            } else if (minDecimalPlaces && !maxDecimalPlaces) {
                return value.toFixed(minDecimalPlaces).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            } else if (!minDecimalPlaces && maxDecimalPlaces) {
                return value.toFixed(maxDecimalPlaces).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            }
        };
    })
    .filter('dashboardCustomCurrencyOrDash', [
        'customCurrencyOrDashFilter',
        function (customCurrencyOrDashFilter) {
            return function (value, currency, decimal) {
                if (value > 99999.99 || value < -999.99) {
                    value = Math.round(value);
                    return customCurrencyOrDashFilter(value, currency, 0);
                } else {
                    return customCurrencyOrDashFilter(value, currency, decimal);
                }
            };
        }
    ])
    .filter('customCurrencyOrDash', [
        'commonCurrencyConverterService', 'currencyOrDashFilter',
        function (commonCurrencyConverterService, currencyOrDashFilter) {
            return function (value, currency, decimal) {
                return currencyOrDashFilter(value, commonCurrencyConverterService.convertCurrencyCode(currency), decimal);
            };
        }
    ])
    .filter('currencyOrDash', [
        'separatorFormatFilter',
        function (separatorFormatFilter) {
            return function (value, currency, decimal) {
                if (value || value === 0) {
                    var sign = value >= 0 ? "" : "-";
                    var absValue = Math.abs(value);
                    if (currency === 'p') {
                        return sign + '' + separatorFormatFilter(absValue, decimal) + currency;
                    }
                    return sign + '' + currency + ' ' + separatorFormatFilter(absValue, decimal);
                } else {
                    return '-';
                }
            };
        }
    ])
    .filter('correctTickSizeDecimalPlacesWithCurrency', [
        'separatorFormatFilter', 'commonCurrencyConverterService',
        function (separatorFormatFilter, commonCurrencyConverterService) {
            function getTickDp(value, currency, venue) {
                switch (venue) {
                    case "SG":
                        switch (currency) {
                            case "HKD":
                                if (value < 0.5) {
                                    return 3;
                                } else if (value < 100) {
                                    return 2;
                                } else {
                                    return 1;
                                }
                            case "JPY":
                                return null;
                        }
                        if (value < 1)
                            return 3;
                        else return 2;
                    case "US":
                        return value < 1 ? 4 : 2;
                    case "HK":
                        return value <= 0.5 ? 3 : 2;
                    case "MY":
                        return value < 1 ? 4 : 2;
                    default:
                        return null;
                }
            }

            return function (value, currency, venue) {
                if (value || value === 0) {
                    var sign = value >= 0 ? "" : "-";
                    var absValue = Math.abs(value);

                    //Calculate correct decimal places to display based on tick size logic
                    var decimal = getTickDp(value, currency, venue);
                    var upperCaseCurrency = currency ? currency.toUpperCase() : null;
                    return sign + '' + commonCurrencyConverterService.convertCurrencyCode(upperCaseCurrency) + " " + separatorFormatFilter(absValue, decimal);
                } else {
                    return '-';
                }
            };
        }
    ])
    .filter('correctTickSizeDecimalPlacesWithoutCurrency', [
        'separatorFormatFilter', 'commonCurrencyConverterService',
        function (separatorFormatFilter, commonCurrencyConverterService) {
            function getTickDp(value, currency, venue) {
                switch (venue) {
                    case "SG":
                        switch (currency) {
                            case "HKD":
                                if (value < 0.5) {
                                    return 3;
                                } else if (value < 100) {
                                    return 2;
                                } else {
                                    return 1;
                                }
                            case "JPY":
                                return null;
                        }
                        if (value < 1)
                            return 3;
                        else return 2;
                    case "US":
                        return value < 1 ? 4 : 2;
                    case "HK":
                        return value <= 0.5 ? 3 : 2;
                    case "MY":
                        return value < 1 ? 4 : 2;
                    default:
                        return null;
                }
            }

            return function (value, currency, venue) {
                if (value || value === 0) {
                    var sign = value >= 0 ? "" : "-";
                    var absValue = Math.abs(value);

                    //Calculate correct decimal places to display based on tick size logic
                    var decimal = getTickDp(value, currency, venue);
                    var upperCaseCurrency = currency ? currency.toUpperCase() : null;
                    return sign + separatorFormatFilter(absValue, decimal);
                } else {
                    return '-';
                }
            };
        }
    ])
    .filter('separatorFormat', function () {
        return function (value, decimal) {
            if (!decimal) {
                return value.toString().replace(/\B(?=(\d{3})+\b)/g, ",");
            } else {
                return value.toFixed(decimal).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            }
        };
    })
    .filter('volumeSeparatorFormat', function () {
        return function (value) {
            if (value === 0) return "-";
            if (!value) return "-";
            if (value >= 1000000) {
                return (value / 1000000).toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ",") + "M";
            } else {
                return value.toString().replace(/\B(?=(\d{3})+\b)/g, ",");
            }
        };
    })
    .filter('replaceStrategyName', [
        '$sce', function ($sce) {
            return function (name) {
                if (name.length > 18 && (name.match(/ /g) || []).length < 3) {
                    if (name.replace(" ", "").length > 9) {
                        var newName = name.replace(new RegExp(" ", "g"), "<br/>");
                        return newName;
                    } else {
                        return name;
                    }
                } else {
                    return name;
                }
            };
        }
    ])
    .filter('isCancellingOrder', function () {
        // TODO: Please move these order related filters to orderProcessingService.js later on..
        var terminalStatuses = ["Filled", "Cancelled", "Rejected by Broker", "Expired", "Rejected by OMS", "Rejected by Exchange"];

        return function (order) {
            if (order.MarkedForCancellation && (terminalStatuses.indexOf(order.LatestStatus) === -1)) {
                return true;
            } else {
                return false;
            }
        };
    })
    .filter('hasBeenRejectedCancelledOrExpired', function () {
        return function (order) {
            if (order.LatestStatus === 'Rejected by Broker' || order.LatestStatus === 'Rejected by OMS' || order.LatestStatus === 'Expired' || order.LatestStatus === 'Cancelled') {
                return true;
            } else {
                return false;
            }
        };
    })
    .filter('notCancelled', function () {
        return function (order) {
            if (!(order.LatestStatus === 'Rejected by Broker' || order.LatestStatus === 'Rejected by OMS') || !(order.MarkedForCancellation && order.LatestStatus !== 'Cancelled')) {
                return true;
            } else {
                return false;
            }
        };
    })
    .filter('strategyDisplayInfoBasicInfoPublic', function () {
        return function (s) {
            return s.DisplayInfo.BasicInfo.PublishState === 'Public';
        };
    })
    .filter('hideAccountNmuber', function () {
        return function (number) {
            if (number.length > 15) {
                return number.substring(0, 15) + "...";
            }
            return number;
        };
    })
    .filter('hideAccount', function () {
        return function (account) {
            var name = account.BrokerageType + "(" + account.AccountNumber + ")";
            if (name.length > 17) {
                return name.substring(0, 17) + "...";
            }
            return name;
        };
    })
    .filter('dataMartEventTypeNameFilter', function () {
        return function (direction, algoFeedName) {
            switch (algoFeedName) {
                case "Unusual Opening Gap":
                    return (direction === "Bull") ? "Gap up" : "Gap down";
                case "Overbought / Oversold":
                    return (direction === "Bull") ? "Oversold" : "Overbought";
                case "Volatility Swing":
                    return (direction === "Bull") ? "Oversold" : "Overbought";
            }
            return direction;
        };
    })
    .filter('dataMartEventTypeLongNameFilter', function () {
        return function (eventType, algoFeedName) {
            var result = "";
            switch (algoFeedName) {
                case "Hot Stocks in Twitter":
                    return (eventType.Direction === "Bull") ? "Bullish Twitter Breakout" : "Bearish Twitter Breakout";
                case "Key Analyst Revisions":
                    return (eventType.Direction === "Bull") ? "Major Analyst Rating Upgrade" : "Major Analyst Rating Downgrade";
                case "Major Price Breakout":
                    var str1 = (eventType.Direction === "Bull") ? "Price Breaks Above" : "Price Breaks Below";
                    var str2 = "";
                    if (eventType.Parameter) {
                        str2 = " ";
                        str2 += (eventType.Direction === "Bull") ? eventType.Parameter + " high" : eventType.Parameter + " low";
                    }
                    return str1 + str2;
                case "Volume Breakout":
                    return (eventType.Direction === "Bull") ? "Bullish Volume Breakout" : "Bearish Volume Breakout";
                case "Unusual Opening Gap":
                    return (eventType.Direction === "Bull") ? "Gap Up in Opening Price" : "Gap Down in Opening Price";
                case "Overbought / Oversold":
                    if (eventType.Direction === "Bull") {
                        if (eventType.Type === "Stochastic") {
                            return "Stochastic Oscillator - Oversold";
                        } else {
                            return "RSI breaks below 10";
                        }
                    }
                    if (eventType.Direction === "Bear") {
                        if (eventType.Type === "Stochastic") {
                            return "Stochastic Oscillator - Overbought";
                        } else {
                            return "RSI breaks above 90";
                        }
                    }
                case "Volatility Swing":
                    return (eventType.Direction === "Bull") ? "Price breaks Lower bollinger band - Oversold" : "Price breaks Upper bollinger band - Overbought";
                case "Crossover Momentum":
                    if (eventType.Direction === "Bull") {
                        if (eventType.Type === "Price Crossover") {
                            if (eventType.Parameter === "Price Cross MA50") {
                                return "Price crosses above Moving Average(50)";
                            } else if (eventType.Parameter === "Price Cross MA20") {
                                return "Price crosses above Moving Average(20)";
                            } else {
                                return "Price crosses above Moving Average(200)";
                            }
                        } else {
                            if (eventType.Parameter === "MA5 Cross MA20") {
                                return "Moving Average(5) crosses above Moving Average(20)";
                            } else if (eventType.Parameter === "MA50 cross MA200") {
                                return "Moving Average(50) crosses above Moving Average(200)";
                            } else {
                                return "Moving Average(20) crosses above Moving Average(50)";
                            }
                        }
                    }
                    if (eventType.Direction === "Bear" && eventType.Parameter) {
                        if (eventType.Type === "Moving Average Crossover") {
                            if (eventType.Parameter === "MA5 Cross MA20") {
                                return "Moving Average(5) crosses below Moving Average(20)";
                            } else if (eventType.Parameter === "MA50 cross MA200") {
                                return "Moving Average(50) crosses below Moving Average(200)";
                            } else {
                                return "Moving Average(20) crosses below Moving Average(50)";
                            }
                        } else {
                            if (eventType.Parameter === "Price Cross MA50") {
                                return "Price crosses below Moving Average(50)";
                            } else if (eventType.Parameter === "Price Cross MA20") {
                                return "Price crosses below Moving Average(20)";
                            } else {
                                return "Price crosses below Moving Average(200)";
                            }
                        }
                    }

            }
            return result;
        };
    })
    .filter('strategyOrTradePortfolio', function () {
        return function (strategy, userId) {
            if (strategy && strategy.DisplayInfo.BasicInfo.Status === "Published") {
                if ((!strategy.DisplayInfo.OverridenDisplayValues ||
                    strategy.DisplayInfo.OverridenDisplayValues.IsApproved)) {
                    return "Strategy";
                } else {
                    return "Trade Portfolio";
                }
            } else {
                return "Trade Portfolio";
            }
        };
    })
    .filter('isBrokerDefined', function () {
        return function (status) {
            return status != null && status != 'None';
        };
    })
    .filter('priceNumberFormatter', function () {
        return function (price) {
            if (price) {
                var costOfIt = parseFloat(price).toFixed(0);
                var visualOfIt = 0;
                visualOfIt = costOfIt.toString();

                var visualLeng = 6;
                var maxLeng = 4;
                var letterArrayIndex = 0;

                //var letterArray = [" Thousand", " Million", " Billion", " Trillion", " Quadrillion", " Quintillion", " Sextillion", " Septillion", " Octillion", " Nonillion", " Decillion", " Undecillion", " Duodecillion", " Tredecillion", " Quatuordecillion", " Quindecillion", " Sexdecillion", " Septendecillion", " Octodecillion", " Novemdecillion", " Vigintillion", " Unvigintillion", " Duovigintillion", " Tresvigintillion", " Quatuorvigintillion", " Quinquavigintillion", " Sesvigintillion", " Septemvigintillion", " Octovigintillion", " Novemvigintillion", " Trigintillion", " Untrigintillion", " Duotrigintillion", " Trestrigintillion", " Quatuortrigintillion", " Quinquatrigintillion", " Sestrigintillion", " Septentrigintillion", " Octotrigintillion", " Novemtrigintillion", " Quadragintillion", " Unquadragintillion", " Duoquadragintillion", " Tresquadragintillion", " Quatuorquadragintillion", " Quinquaquadragintillion", " Sesquadragintillion", " Septemquadragintillion", " Octoquadragintillion", " Novemquadragintillion", " Quinquagintillion", " Unquinquagintillion", " Duoquinquagintillion", " Tresquinquagintillion", " Quatuorquinquagintillion", " Quinquaquinquagintillion", " Sesquinquagintillion", " Septenquinquagintillion", " Octoquinquagintillion", " Novemquinquagintillion", " Sexagintillion", " Unsexagintillion", " Duosexagintillion", " Tressexagintillion", " Quatuorsexagintillion", " Quinquasexagintillion", " Sexasexagintillion", " Septemsexagintillion", " Octosexagintillion", " Novemsexagintillion", " Septuagintillion", " Unseptuagintillion", " Duoseptuagintillion", " Tresseptuagintillion", " Quatuorseptuagintillion", " Quinquaseptuagintillion", " Sexaseptuagintillion", " Septenseptuagintillion", " Octoseptuagintillion", " Novemseptuagintillion", " Octogintillion", " Unoctogintillion", " Duooctogintillion", " Tresoctogintillion", " Quatuoroctogintillion", " Quinquaoctogintillion", " Sesoctogintillion", " Septemoctogintillion", " Octooctogintillion", " Novemoctogintillion", " Nonagintillion", " Unnonagintillion", " Duononagintillion", " Tresnonagintillion", " Quatuornonagintillion", " Quinquanonagintillion", " Sesnonagintillion", " Septemnonagintillion", " Octononagintillion", " Novemnonagintillion", " Centillion", " Uncentillion"];
                var letterArray = ["K", "M", "B", "T", "Q", "Q", "S"];

                var leng = 4;
                var slic = 1;

                for (var g = 0; g < visualOfIt.length; g++) {
                    if (visualOfIt.length <= visualLeng) {
                        if (leng < maxLeng) {
                            leng = maxLeng;
                        }
                        if (visualOfIt.length === leng) {
                            if (slic > 2) {
                                visualOfIt = costOfIt.toString().slice(0, slic) + letterArray[letterArrayIndex];
                                break;
                            } else {
                                if(parseInt(costOfIt.toString().slice(slic, 3)) > 0){
                                    visualOfIt = costOfIt.toString().slice(0, slic) + "." + costOfIt.toString().slice(slic, 3) + letterArray[letterArrayIndex];
                                } else {
                                    visualOfIt = costOfIt.toString().slice(0, slic) + letterArray[letterArrayIndex];
                                }                                    
                                break;
                            }
                        } else {
                            leng++;
                            slic++;
                        }
                    } else {
                        maxLeng += 3;
                        visualLeng += 3;
                        letterArrayIndex++;
                    }
                }
                return visualOfIt;
            }
            return "-";
        };
    })
    .filter('orderTransactionStatus', function () {
        return function (status) {
            if (status !== 'Submitted to OMS' &&
                status !== 'Pending Submission to Broker' &&
                status !== 'Submitted to Broker' &&
                status !== 'Processed by Broker' &&
                status !== 'Rejected by Broker' &&
                status !== 'Rejected by OMS' &&
                status !== 'Cancelled' &&
                status !== 'Expired' &&
                status !== 'Rejected by Exchange' &&
                status !== 'Error') {
                return 'Sent to Exchange';
            } else {
                return status;
            }
        }
    });