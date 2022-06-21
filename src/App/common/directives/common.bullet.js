agmNgModuleWrapper('agm.common')
    .defineDirectiveForE('agmc-bullet', [],
        function() {
            return {
                link: function(scope, element, attrs, controller, transclude) {

                    scope.getBulletStyle = function() {
                        scope.color = scope.color || 'black';
                        scope.diameter = scope.diameter || "5px";
                        if (scope.diameter == undefined) {
                            scope.diameter = '5px';
                        };
                        if (scope.color == undefined) {
                            scope.color = 'black';
                        }
                        return {
                            width: scope.diameter,
                            height: scope.diameter,
                            display: 'inline-block',
                            background: scope.color,
                            borderRadius: '100%',
                            marginRight: '5px',
                            padding: 0
                        };
                    };
                },
                template:
                    "<span class='li-bullet' ng-style='getBulletStyle()'>" +
                        "</span>"
            };
        }, {
            color: '=',
            diameter: '='
        }
    );