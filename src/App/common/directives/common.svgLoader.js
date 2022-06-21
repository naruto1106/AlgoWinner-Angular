agmNgModuleWrapper('agm.common')
    .defineDirectiveForA('agmc-svg-loader', ["commonSvgLoaderImageCacheService"],
        function(dep) {
            var commonSvgLoaderImageCacheService = dep.commonSvgLoaderImageCacheService;
            return {
                link: function(scope, element, attrs) {
                    scope.$watch('svgSrc', function() {
                        if (scope.svgSrc) {
                            commonSvgLoaderImageCacheService.get(scope.svgSrc).then(function(template) {
                                element.html(template);
                            });
                        }
                    }, false);
                }
            };
        }, {
            svgSrc: '='
        })
    .defineService('commonSvgLoaderImageCacheService', [], function(serviceObj, dep, tool) {
            var $http = dep.$http;
            tool.setServiceObjectProperties({
                cache: [],
                get: function(svgSrc) {
                    var t = this;
                    if (t.cache[svgSrc]) {
                        return tool.when(t.cache[svgSrc]);
                    }
                    return $http.get(svgSrc).then(function(res) {
                        t.cache[svgSrc] = res.data;
                        return t.cache[svgSrc];
                    });
                }
            });
        }
    );