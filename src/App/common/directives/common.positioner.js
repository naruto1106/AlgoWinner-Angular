agmNgModuleWrapper('agm.common')
    .defineService('commonPositionerMemoryService', [], function(serviceObj, dep, tool) {
        tool.setServiceObjectProperties({
            visibilityDetail: {},
            setVisibility: function(id, param) {
                this.visibilityDetail[id] = param;
            },
            hideVisibility: function(id, source, force) {
                var visibility = this.visibilityDetail[id];
                if (!visibility) {
                    return;
                }
                if (force || visibility.source === source) {
                    delete this.visibilityDetail[id];
                }
            }
        });
    })
    .defineDirectiveByTag('agmc-positioner', [],
        function(dep, tool) {
            var $window = dep.$window,
                commonPositionerMemoryService = dep.commonPositionerMemoryService;
            return {
                link: function(scope, element, attrs, controller, transclude) {
                    scope.$watch('activeFlag', function() {
                        if (!scope.activeFlag) {
                            if (scope.interval) {
                                $window.clearInterval(scope.interval);
                                tool.timeout(function() {
                                    commonPositionerMemoryService.hideVisibility(scope.referenceId, scope.identifier);
                                });
                            }
                            return;
                        }
                        var el = element;
                        scope.refreshRate = scope.refreshRate || 200;
                        scope.interval = $window.setInterval(function() {

                            var position = $(el).position();
                            var offset = $(el).offset();
                            var offsetParent = $(el).offsetParent();
                            tool.timeout(function() {
                                if (position.top !== 0) {
                                    commonPositionerMemoryService.setVisibility(scope.referenceId, {
                                        source: scope.identifier,
                                        position: position,
                                        offset: offset,
                                        offsetParent: offsetParent
                                    });
                                }
                            });
                        }, scope.refreshRate);
                    });


                }
            };
        },
        {
            identifier: '=',
            refreshRate: '=?',
            activeFlag: '=',
            referenceId: '='
        }
    );