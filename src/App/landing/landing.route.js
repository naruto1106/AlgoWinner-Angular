agmNgModuleWrapper('agm.landing')
    .ngApp.config([
        '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

            for (var prop in agmNgModuleMemory.uiStates) {
                if (agmNgModuleMemory.uiStates.hasOwnProperty(prop)) {
                    var config = {
                        controller: agmNgModuleMemory.uiStates[prop].controller,
                        templateUrl: agmNgModuleMemory.uiStates[prop].templateUrl,
                        resolve: {
                            moveUp:function() {
                                $('html, body').animate({
                                    scrollTop: $('html').offset().top
                                }, 500, 'easeInOutExpo');
                            }
                        }
                    };

                    $routeProvider.when(agmNgModuleMemory.uiStates[prop].url, config);
                }
            }

            $locationProvider.html5Mode(false);
            $locationProvider.hashPrefix('!');

            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }
    ]);