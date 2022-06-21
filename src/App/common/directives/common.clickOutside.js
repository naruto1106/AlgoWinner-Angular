agmNgModuleWrapper('agm.common')
    .defineDirectiveByTag('agmc-click-outside', [], function(dep, tool) {
        var $document = dep.$document;
        var directiveDefinitionObject = {
            link: {
                pre: function(scope, element, attrs, controller) {},
                post: function(scope, element, attrs, controller) {
                    var onClick = function(event) {
                        var isChild = element.has(event.target).length > 0;
                        var isSelf = element[0] === event.target;
                        var isInside = isChild || isSelf;
                        if (!isInside) {
                            tool.timeout(function() {
                                scope.$event = event;
                                event.target = element[0];
                                scope.$eval(attrs.agmcClickOutside);
                            });
                        }
                    }
                    $document.click(onClick);
                }
            }
        }
        return directiveDefinitionObject;
    })
    .defineDirectiveByTag('agmc-click-outside-light', [], function(dep) {
        var $document = dep.$document;
        var directiveDefinitionObject = {
            link: {
                pre: function(scope, element, attrs, controller) {},
                post: function(scope, element, attrs, controller) {
                    // Same logic as above, but it does NOT kick off digest cycle, and does NOT override event.target
                    var onClick = function(event) {
                        var isChild = element.has(event.target).length > 0;
                        var isSelf = element[0] === event.target;
                        var isInside = isChild || isSelf;
                        if (!isInside) {
                            scope.$event = event;
                            scope.$evalAsync(attrs.agmcClickOutsideLight);
                        }
                    }
                    $document.click(onClick);
                }
            }
        }
        return directiveDefinitionObject;
    });