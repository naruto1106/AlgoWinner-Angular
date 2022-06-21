agmNgModuleWrapper('agms.guide')
    .defineService('sGuideItemManagerService', [],
    function (serviceObj, dep, tool) {
        var path = '/userinfoapi/v1/UserGuide/';
        var items = {};
        var walkthroughs = {};

        var coreServerCommunicationService = dep.coreServerCommunicationService;

        tool.setServiceObjectProperties({
            registerItem: registerItem,
            items: items,
            defineWalkthrough: defineWalkthrough,
            isGuiding: false,
            run: run,
            forceRun: forceRun,
            popups: [],
            GetUserGuideSetting: coreServerCommunicationService.genGetFunctionWithNVar(path + 'GetUserGuideSetting', function(args) {
                return { guideName: args[0] };
            }),
            SetUserGuide: coreServerCommunicationService.genPostFunction(path + "SetUserGuide")
        });

        function forceRun(name) {
            if (walkthroughs[name]) {
                var walkthrough = walkthroughs[name];
                walkthrough.helper.gotoStep(walkthrough.startingStep);
            }
        }

        function run(name) {
            if (walkthroughs[name]) {
                serviceObj.GetUserGuideSetting(name).then(function (res) {
                    //res.data == false means show the walkthrough
                    if (res && !res.data) {
                        var walkthrough = walkthroughs[name];
                        walkthrough.helper.gotoStep(walkthrough.startingStep);
                    }
                });
            }
        }

        function defineWalkthrough(name) {

            var walkthrough = {
                name: name,
                steps: {},
                currentStep: null,
                startingStep: null,
                _revertAction: [],
                helper: {
                    highlightItem: function (itemName) {
                        forEachItem(itemName, function (element, scope) {
                            element.addClass('agms-guide-highlight');
                        });

                        walkthrough._revertAction.push(function () {
                            forEachItem(itemName, function (element, scope) {
                                element.removeClass('agms-guide-highlight');
                            });
                        });
                    },
                    freezeItem: function (itemName) {
                        forEachItem(itemName, function (element, scope) {
                            element.addClass('agms-guide-freeze');
                        });

                        walkthrough._revertAction.push(function () {
                            forEachItem(itemName, function (element, scope) {
                                element.removeClass('agms-guide-freeze');
                            });
                        });
                    },
                    highlightWithActionBox: function (itemName, obj) {
                        var objs = [];
                        forEachItem(itemName, function (element, scope) {
                            var newObj = angular.copy(obj);
                            walkthrough.helper.highlightItem(itemName);
                            newObj.itemName = itemName;
                            newObj.refElement = element;
                            serviceObj.popups.push(newObj);
                            objs.push(newObj);
                        });

                        function updatePopupPosition() {
                            objs.forEach(function (newObj) {
                                if (newObj.element && newObj.refElement) {
                                    var item = newObj.refElement;
                                    var offset = item.offset();
                                    //var height = item.height();
                                    newObj.element.css('top', offset.top);
                                    newObj.element.css('left', offset.left);
                                    newObj.element.css('width', item.outerWidth());
                                    newObj.element.css('height', item.outerHeight());

                                    newObj.element.css('visible', item.is(':visible') ? 'visible' : 'hidden');
                                }
                            });
                        }

                        window.setInterval(updatePopupPosition, 100);
                        $(window).on('resize scroll', function () {
                            updatePopupPosition();
                        });
                        updatePopupPosition();
                        walkthrough._revertAction.push(function () {
                            objs.forEach(function (newObj) {
                                var idx = serviceObj.popups.indexOf(newObj);
                                serviceObj.popups.splice(idx, 1);
                            });
                        });
                    },
                    clearAll: function () {
                        walkthrough._revertAction.forEach(function (f) {
                            f();
                        });
                        walkthrough._revertAction = [];
                    },
                    gotoStep: function (stepName) {
                        serviceObj.isGuiding = true;
                        walkthrough.currentStep = stepName;
                        if (walkthrough.steps[stepName]) {
                            walkthrough.steps[stepName](this);
                        }
                    },
                    neverCallAgain: function () {
                        var request = {
                            GuideName: walkthrough.name,
                            IsHidden: true
                        };
                        serviceObj.SetUserGuide(request);
                    },
                    endWalkthrough: function () {
                        this.clearAll();
                        serviceObj.isGuiding = false;
                    }
                }
            }

            walkthrough.addStep = function (stepName, func) {
                walkthrough.steps[stepName] = func;
                return walkthrough;
            }
            walkthrough.startFrom = function (stepName) {
                walkthrough.startingStep = stepName;
                return walkthrough;
            }
            walkthroughs[name] = walkthrough;
            return walkthrough;
        }

        function registerItem(id, func) {
            if (!items[id]) {
                items[id] = [];
            }
            items[id].push(func);
        }

        function forEachItem(id, func) {
            if (items[id]) {
                items[id].forEach(function (obj) {
                    func(obj.element, obj.scope);
                });
            }
        }
    })
    .defineDirectiveForA('agms-guide-item', ['sGuideItemManagerService'], function (dep, tool) {
        return {
            link: function (scope, el, attr) {
                var sGuideItemManagerService = dep.sGuideItemManagerService;
                
                sGuideItemManagerService.registerItem(scope.agmsGuideItem, {
                    element: $(el),
                    scope: scope
                });
            }
        };
    }, {
        agmsGuideItem: "@"
    });