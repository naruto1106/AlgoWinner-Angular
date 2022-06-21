agmNgModuleWrapper('agm.common')
    .defineDirectiveForA('agmc-button-wait-on-promise',
    [],
    function (dep, tool) {
        return {
            link: function (scope, element) {
                $(element).click(function () {
                    $(element).attr("disabled", "");

                    tool.timeout(function () {
                        scope.waitState = 1;
                    });

                    scope.agmcButtonWaitOnPromise()
                        .then(function (args) {
                            tool.timeout(function () {
                                scope.waitState = 2;
                            });

                            $(element).attr("disabled", null);
                            if (scope.thenOk) {
                                scope.thenOk({ arguments: args });
                            }
                        },
                        function (args) {
                            tool.timeout(function () {
                                scope.waitState = 3;
                            });

                            $(element).attr("disabled", null);
                            if (scope.thenFail) {
                                scope.thenFail({ arguments: args });
                            }
                        });
                });
            }
        };
    },
    {
        agmcButtonWaitOnPromise: '&',
        thenFail: '&?',
        thenOk: '&?',
        waitState: '=?'
    });