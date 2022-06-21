// Author Marek Pietrucha
// https://github.com/mareczek/international-phone-number
// manually updated by Aditya Santoso (because the author forgot to compile his coffee script)
// further 
(function () {
    "use strict";
    angular.module("internationalPhoneNumber", []).directive('internationalPhoneNumber', function () {
        return {
            restrict: 'A',
            require: '^ngModel',
            scope: {
                ngModel: '=',
                defaultCountry: '@',
                required: '=?'
            },
            link: function (scope, element, attrs, ctrl) {
                var handleWhatsSupposedToBeAnArray, options, read, watchOnce;
                var formatted = false;
                read = function () {
                    return ctrl.$setViewValue(element.val());
                };
                handleWhatsSupposedToBeAnArray = function (value) {
                    if (value instanceof Array) {
                        return value;
                    } else {
                        return value.toString().replace(/[ ]/g, '').split(',');
                    }
                };
                options = {
                    autoFormat: true,
                    autoHideDialCode: true,
                    defaultCountry: '',
                    nationalMode: false,
                    numberType: '',
                    onlyCountries: void 0,
                    preferredCountries: ['us', 'gb'],
                    responsiveDropdown: false,
                    utilsScript: ""
                };
                angular.forEach(options, function (value, key) {
                    var option;
                    if (!(attrs.hasOwnProperty(key) && angular.isDefined(attrs[key]))) {
                        return;
                    }
                    option = attrs[key];
                    if (key === 'preferredCountries') {
                        return options.preferredCountries = handleWhatsSupposedToBeAnArray(option);
                    } else if (key === 'onlyCountries') {
                        return options.onlyCountries = handleWhatsSupposedToBeAnArray(option);
                    } else if (typeof value === "boolean") {
                        return options[key] = option === "true";
                    } else {
                        return options[key] = option;
                    }
                });
                watchOnce = scope.$watch('ngModel', function (newValue) {
                    return scope.$$postDigest(function () {
                        options.defaultCountry = scope.defaultCountry;
                        if (newValue !== null && newValue !== void 0 && newValue !== '') {
                            element.val(newValue);
                        }
                        element.intlTelInput(options);
                        if (!(attrs.skipUtilScriptDownload !== void 0 || options.utilsScript)) {
                            element.intlTelInput('loadUtils', '/bower_components/intl-tel-input/lib/libphonenumber/build/utils.js');
                        }
                        return watchOnce();
                    });
                });
                ctrl.$formatters.push(function (value) {
                    if (!formatted && value) {
                        element.intlTelInput("setNumber", value);
                        var el2 = element.intlTelInput("getNumber");
                        formatted = true;
                        return el2;
                    }
                    return value;
                });
                ctrl.$parsers.push(function (value) {
                    if (!value) {
                        return value;
                    }
                    return value.replace(/[^\d]/g, '');
                });
                ctrl.$parsers.push(function (value) {
                    var validity;
                    if (!value || value == "" || value == "+") {
                        value = "";
                        if (!scope.required) {
                            ctrl.$setValidity('international-phone-number', true);
                            ctrl.$setValidity('', true);
                        }
                        delete ctrl.$error['international-phone-number'];
                        return value;
                    } else {
                        var countryCode = element.intlTelInput("getSelectedCountryData");
                        if (countryCode === null || value === countryCode.dialCode) {
                            value = "";
                            if (!scope.required) {
                                ctrl.$setValidity('international-phone-number', true);
                                ctrl.$setValidity('', true);
                            }
                            delete ctrl.$error['international-phone-number'];
                            return value;
                        } else {
                            validity = element.intlTelInput("isValidNumber");
                            ctrl.$setValidity('international-phone-number', validity);
                            ctrl.$setValidity('', validity);

                            return {
                                PhoneNumber: value.replace(countryCode.dialCode, ""),
                                PhoneCountryCode: countryCode.dialCode
                            }
                        }
                    }
                });
                element.on('blur keyup change', function (event) {
                    return scope.$apply(read);
                });
                return element.on('$destroy', function () {
                    return element.off('blur keyup change');
                });
            }
        };
    });

}).call(this);
