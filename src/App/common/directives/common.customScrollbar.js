agmNgModuleWrapper('agm.common')
    .defineDirectiveForA('agmc-custom-scrollbar', [], function(dep,tool) {
            return {

                link: function(scope, element, attrs, controller, transclude) {

                    var options = {
                        theme: "dark-3",
                        mouseWheelPixels:10,
                        scrollTo: function(val, opt) {
                            $(element).mCustomScrollbar('scrollTo', val, opt);
                        },
                        scrollInertia:0,
                        scrollToPxFromBottom: function (pixelValue, opt) {
                            var height = $(contentElement).height();

                            $(element).mCustomScrollbar('scrollTo', height - pixelValue, opt);
                        },
                        setEnable: function(flag) {
                            if (flag) {
                                $(element).mCustomScrollbar("update", true);
                            } else {
                                $(element).mCustomScrollbar("disable", true);
                            }
                        },
                        callbacks: {
                            onUpdate: function () {
                                var height = $(contentElement).height();
                                var content = {};
                                content.height = height;
                                if (scope.options.onUpdate) {
                                    scope.options.onUpdate(content);
                                }
                            }
                        },
                    };
                    var fromOptions = scope.options;
                    if (!fromOptions) {
                        fromOptions = {};
                    }
                    var sampleOption = angular.copy(options);
                    var finalOptions = angular.merge(sampleOption, fromOptions);
                    var e = $(element).mCustomScrollbar(finalOptions);

                    var contentElement = $(e).find('.mCSB_container')[0];
                    scope.options = finalOptions;
                }
            };
        }
    , {
        options: "=?"
    });