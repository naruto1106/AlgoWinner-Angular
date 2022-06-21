agmNgModuleWrapper('agm.common')
    .defineDirectiveByTag('agmc-right-click', [], function(dep, tool) {
            var $parse = dep.$parse;
            return function(scope, element, attrs) {
                var fn = $parse(attrs.agmcRightClick);
                element.bind('contextmenu', function(event) {
                    scope.$apply(function() {
                        //event.preventDefault();
                        fn(scope, { $event: event });
                    });
                });
            };
        }
    );