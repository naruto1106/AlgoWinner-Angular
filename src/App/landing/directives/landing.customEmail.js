agmNgModuleWrapper("agm.landing")
    .defineDirectiveForA("agmc-custom-email", [], function (dep, tool) {
        var emailRegexp = /^([a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*)|(\w+\(#_#\).+)$/i;
        return {
            require: 'ngModel',
            priority: 2,
            link: function (scope, elm, attrs, ctrl) {
                // http://stackoverflow.com/a/27952712/3998758
                if (ctrl && ctrl.$validators.email) {
                    // this will overwrite the default Angular email validator
                    ctrl.$validators.email = function (modelValue) {
                        return ctrl.$isEmpty(modelValue) || emailRegexp.test(modelValue);
                    }
                }
            }
        };
    });