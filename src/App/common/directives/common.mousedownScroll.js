agmNgModuleWrapper('agm.common')
    .defineDirectiveForA('agmc-mousedown-scroll', [],
        function() {
            return {
                link: function(scope, element) {
                    $(element).scroll(function() {
                        scope.agmcMousedownScroll();
                    });
                }
            }
        }, {
            agmcMousedownScroll: '&'
        }
    );