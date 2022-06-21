agmNgModuleWrapper('agm.core')
    .defineDirectiveStrictByTag('agmc-static-include', [], function (dep) {
        var $http = dep.$http,
            $templateCache = dep.$templateCache,
            $compile = dep.$compile;

        return function(scope, element, attrs) {
            var templatePath = attrs.agmcStaticInclude;
            var replace = attrs.replace || false;
            $http.get(templatePath, { cache: $templateCache }).success(function(response) {
                var content = null;
                var responseElement = $(response);
                if (replace) {
                    element.replaceWith(responseElement);
                    content = responseElement.contents();
                } else {
                    element.html(responseElement);
                    content = element.contents();
                }
                $compile(content)(scope);
            });
        };
    });