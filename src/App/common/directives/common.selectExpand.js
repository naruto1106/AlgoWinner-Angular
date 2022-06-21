agmNgModuleWrapper('agm.common')
    .defineDirectiveForA('agmc-select-expand', [],
        function() {
            return {
                link: function(scope, element, attrs, controller, transclude) {

                    $(element).click();

                }
            };
        }, {
        	agmcSelectExpand: '=',
        }
    ); 