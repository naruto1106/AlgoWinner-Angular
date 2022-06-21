agmNgModuleWrapper('agms.image')
    .defineDirectiveForA('agms-image-fallback',[], function() {
        return {
            link: function(scope, element, attrs) {
                if (_.isEmpty(attrs.ngSrc)) {
                    element.attr('src', attrs.agmsImageFallback);
                }
                var fallbackInvoked = false;
                element.bind('error', function() {
                    if (!fallbackInvoked) {
                        element.attr('src', attrs.agmsImageFallback);
                    }
                    fallbackInvoked = true;
                });
            }
        };
    });