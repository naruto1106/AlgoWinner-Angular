agmNgModuleWrapper('agm.common')
    .defineDirectiveForE('agmc-range-slider', [], function() {
        return {
            link: function(scope, element, attrs, controller) {
                var jqueryElement = angular.element(element);

                scope.$watch('sliderDefinition.values', function(newVal, oldVal) {
                    scope.dragSlider = jqueryElement.dragslider(scope.sliderDefinition);
                });
                scope.$watch('sliderDefinition.min', function(newVal, oldVal) {
                    scope.dragSlider = jqueryElement.dragslider(scope.sliderDefinition);
                });
                scope.$watch('sliderDefinition.max', function(newVal, oldVal) {
                    scope.dragSlider = jqueryElement.dragslider(scope.sliderDefinition);
                });
                scope.$watch('enable', function(newVal, oldVal) {
                    if (scope.enable == true) {
                        jqueryElement.dragSlider('enable');
                    } else if (scope.enable == false) {
                        jqueryElement.dragSlider('disable');
                    }
                });
            },
            template: '<div></div>'
        };
    }, {
        sliderDefinition: '=',
        enable: '=?'
    })
    .defineDirectiveForE('agmc-slider', [], function(dep, tool) {
        return {
            link: function(scope, element, attrs, controller) {
                var jqueryElement = angular.element(element);
                scope.$watch('sliderDefinition.value', function(newVal, oldVal) {
                    jqueryElement.slider(scope.sliderDefinition);
                });
                scope.$watch('enable', function(newVal, oldVal) {
                    if (scope.enable == true) {
                        jqueryElement.slider('enable');
                    } else if (scope.enable == false) {
                        jqueryElement.slider('disable');
                    }
                });
            },
            template: '<div></div>'
        };
    }, {
        sliderDefinition: '=',
        enable: '=?'
    });