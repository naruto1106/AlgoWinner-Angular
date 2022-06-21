agmNgModuleWrapper('agms.droidHelper')
    .defineDirectiveForA('agms-droid-helper-item', ['sDroidHelperSbsFrameworkService'], function (dep, tool) {
        var sDroidHelperSbsFrameworkService = dep.sDroidHelperSbsFrameworkService;
        return {
            scope: {
                agmsDroidHelperItem: "@"
            },
            replace: false,
            bindToController: false,
            controllerAs: false,
            link: function (scope, el, attr) {
                sDroidHelperSbsFrameworkService.registerAndProcessItem(scope.agmsDroidHelperItem, el);
            }
        };
    })
    .defineService("sDroidHelperSbsFrameworkService", ['sDroidHelperService'],
        function (serviceObj, dep, tool) {
            var sDroidHelperService = dep.sDroidHelperService;
            var flowLibrary = {};

            var registeredItems = {};

            function makeElementAndName(el, itemId) {
                registeredItems[itemId] = {
                    element: el,
                    name: itemId
                };
            }

            $(window).ready(function () {
                makeElementAndName($('body'), 'body');
            });

            $.fn.scrollView = function () {
                return this.each(function () {
                    var topOffset = $(this).offset().top;
                    var height = $(this).innerHeight();
                    var scrollTop = $(window).scrollTop();
                    var windowHeight = $(window).height();
                    var needScroll = (topOffset < scrollTop) || (topOffset + height > scrollTop + windowHeight);
                    if (!needScroll) {
                        return;
                    }
                    var scrollTo = scrollTop;
                    if (topOffset < scrollTop) {
                        scrollTo = topOffset - 100;
                    }

                    if (topOffset + height > scrollTop + windowHeight) {
                        scrollTo = topOffset - 50;
                    }

                    $('html, body').animate({
                        scrollTop: scrollTo
                    }, 500);
                });
            }

            function registerAndProcessItem(itemId, el) {
                if (registeredItems[itemId] && registeredItems[itemId].el === el) {
                    return;
                };
                makeElementAndName(el, itemId);
                tool.broadcast('agmDroidHelperItem.new', { itemId: itemId });
            }

            function defineFlow(flowName) {
                var obj = {
                    name: flowName,
                    havingStep: havingStep,
                    steps: {}
                };

                function havingStep(stepName, setupFunc) {
                    obj.steps[stepName] = {
                        stepName: stepName,
                        setupFunc: setupFunc
                    };
                    return obj;
                }

                flowLibrary[flowName] = obj;
                return obj;
            }

            function generateFlowRunner(flowName) {
                var flow = flowLibrary[flowName];
                if (!flow) {
                    return null;
                }
                var flowTool = generateFlowControl(flow);

                return {
                    flow: flow,
                    startStep: flowTool.startStep,
                    finish: flowTool.endFlow,
                    startFirstStep: function (stepName) {
                        flowTool.dismissHighlightForAllItems();
                        flowTool.startStep(stepName);
                    },
                    completed: flowTool.completed
                };
            };

            function generateFlowControl(flow) {
                var completedDeferred = tool.defer();

                var flowControl = {

                    activeItems: [],

                    simpleHighlightThenContinue: function (highlightedItems, words, nextStep) {
                        flowControl.dismissHighlightForAllItems();
                        flowControl.highlightItems(highlightedItems);
                        flowControl.sayAndNext(words).then(function () {
                            flowControl.startStep(nextStep);
                        });
                    },

                    onBroadcastEvent: function (eventName, vmTool) {
                        var deferred = tool.defer();

                        vmTool.on(eventName, function (evt, args) {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    },
                    startStep: function (stepName) {
                        var step = flow.steps[stepName];
                        if (!step) {
                            return null;
                        }
                        sDroidHelperService.isGuiding = true;
                        sDroidHelperService.hideModalVisualOnly();
                        sDroidHelperService.isDetailShown = false;
                        tool.timeout(function () {
                            step.setupFunc(flowControl);
                        });
                    },
                    endFlow: function () {
                        flowControl.dismissHighlightForAllItems();
                        sDroidHelperService.isGuiding = false;
                        sDroidHelperService.showModalVisualOnly();
                        sDroidHelperService.isDetailShown = true;
                        sDroidHelperService.hideSmallMessageBox();
                        completedDeferred.resolve();
                    },
                    getItem: function (itemId) {
                        if (this.activeItems[itemId]) {
                            return this.activeItems[itemId];
                        }
                        var reg = new RegExp(/css:\s(.*)/g);
                        var refinedItemId = itemId.replace(reg, "").trim();
                        var subItems = itemId.match(reg);

                        // not deep copy!
                        if (!registeredItems[refinedItemId]) {
                            return null;
                        }
                        var item = {
                            element: registeredItems[refinedItemId].element,
                            name: registeredItems[refinedItemId].name,
                        }

                        if (subItems && subItems.length > 0) {
                            var subItem = subItems[0].replace(/css:\s/g, "");
                            item.get = function () {
                                return $(item.element).find(subItem);
                            }
                        } else {
                            item.get = function () {
                                return $(item.element);
                            };
                        }
                        this.activeItems[itemId] = item;
                        return item;
                    },
                    highlightItems: function (itemIds, cssClassForBox) {
                        itemIds.forEach(function (itemId) {
                            var item = flowControl.getItem(itemId);
                            if (item) {
                                highlightItem(item, cssClassForBox);

                            }
                        });
                    },
                    highlightAndCommentItems: function (pairItemAndComments) {
                        flowControl.dismissHighlightForAllItems();
                        pairItemAndComments.forEach(function (itemAndComment) {
                            var item = flowControl.getItem(itemAndComment.itemId);
                            if (item) {
                                highlightItem(item, itemAndComment.cssClassForBox);
                                putCommentBoxOnItem(item, itemAndComment.comment, itemAndComment.cssClassForComment);
                            }
                        });
                    },
                    giveCommentOutside: giveCommentOutside,
                    dismissHighlightForAllItems: function () {
                        for (var prop in this.activeItems) {
                            var item = this.activeItems[prop];
                            if (item.highlighted) {
                                dehighlightItem(item);
                            }
                        }
                    },
                    putCommentBoxOnItem: function (itemId, comment, cssClassForComment) {
                        var item = flowControl.getItem(itemId);
                        if (item) {
                            putCommentBoxOnItem(item, comment, cssClassForComment);
                        }
                    },
                    waitTillItemIsReady: function (itemId) {
                        var deferred = tool.defer();
                        tool.on('agmDroidHelperItem.new', function (event, data) {
                            if (data.itemId == itemId) {
                                tool.timeout(function () {
                                    deferred.resolve();
                                });
                            }
                        });
                        tool.timeout(function () {
                            var item = flowControl.getItem(itemId);
                            if (item) {
                                deferred.resolve();
                            }
                        });
                        return deferred.promise;
                    },
                    onHoverThenDoSomething: function (itemId, doAction) {
                        var item = flowControl.getItem(itemId);
                        if (item) {
                            var el = item.get();
                            el.hover(function () {
                                doAction(item);
                            });
                        }
                    },
                    onHoverThenGoToStep: function (itemId, stepName) {
                        flowControl.onHoverThenDoSomething(itemId, function () {
                            flowControl.startStep(stepName);
                        });
                    },
                    onClickThenDoSomething: function (itemId, doAction) {
                        var item = this.getItem(itemId);
                        if (item) {
                            var el = item.get();
                            el.click(function () {
                                doAction(item);
                            });
                        }
                    },
                    onClickThenGoToStep: function (itemId, stepName) {
                        flowControl.onClickThenDoSomething(itemId, function () {
                            flowControl.startStep(stepName);
                        });
                    },
                    onContextMenuThenGoToStep: function (itemId, stepName) {
                        flowControl.onContextMenuThenDoSomething(itemId, function () {
                            flowControl.startStep(stepName);
                        });
                    },
                    onContextMenuThenDoSomething: function (itemId, doAction) {
                        var item = this.getItem(itemId);
                        if (item) {
                            var el = item.get();
                            el.contextmenu(function () {
                                doAction(item);
                            });
                        }
                    },
                    onSomethingThenDoSomething: function (event, itemId, doAction) {
                        var item = this.getItem(itemId);
                        if (item) {
                            var el = item.get();
                            el.on(event, function () {
                                doAction(item);
                            });
                        }
                    },
                    scrollToAnItem:function(itemId) {
                        var item = this.getItem(itemId);
                        if (item) {
                            var el = item.get();
                            el.scrollView();
                        }

                    },
                    putRobotNextToItem: function (itemId, location) {
                        var item = this.getItem(itemId);
                        if (item) {
                            var boundary = getItemBoundaries(item);
                            switch (location) {
                            case 'N':
                                flowControl.putRobotAtLocation(boundary.screenOffset.left + boundary.width / 2, boundary.screenOffset.top - 100);
                                break;
                            case 'S':
                                flowControl.putRobotAtLocation(boundary.screenOffset.left + boundary.width / 2, boundary.screenOffset.top + boundary.height + 50);
                                break;
                            case 'W':
                                flowControl.putRobotAtLocation(boundary.screenOffset.left - 50, boundary.screenOffset.top + boundary - height / 2, 'right-side');
                                break;
                            case 'E':
                                flowControl.putRobotAtLocation(boundary.screenOffset.left + boundary.screenOffset.width + 50, boundary.screenOffset.top + boundary - height / 2, 'left-side');
                                break;
                            }
                        }
                    },
                    onSomethingThenGoToStep: function (event, itemId, stepName) {
                        flowControl.onSomethingThenDoSomething(event, itemId, function () {
                            flowControl.startStep(stepName);
                        });
                    },
                    waitOnPromiseThenDoSomething: function (promise, doAction) {
                        return promise.then(doAction);
                    },
                    waitOnPromiseThenGoToStep: function (promise, stepName) {
                        return promise.then(function () {
                            flowControl.startStep(stepName);
                        });
                    },
                    doClickOnThis: function (itemId) {
                        var item = this.getItem(itemId);
                        if (item) {
                            var el = item.get();
                            el.click();
                        }
                    },
                    putRobotAtLocation: putRobotAtLocation,
                    sayAndStartStep: sayAndStartStep,
                    sayAndNext: sayAndNext,
                    sayAndFinish: sayAndFinish,
                    askYesNo: askYesNo
                }

                function sayAndStartStep(message, nextWord, nextStep) {
                    sayAndNext(message, nextWord).then(function () {
                        flowControl.startStep(nextStep);
                    });
                }

                function highlightItem(item, cssClassForBox) {
                    item.highlighted = true;

                    var el = item.get();

                    cssClassForBox = cssClassForBox || 'big-bordered white-bg';

                    var position = el.css('position');
                    if (position === 'static' || position === "") {
                        el.css('position', 'relative');
                    }
                    el.attr('helper-subitem', '');
                    el.find('[highlighter]').remove();
                    el.append("<div highlighter>" +
                        "<div comments></div>" +
                        "</div>");
                    el.find('[highlighter]').addClass(cssClassForBox);
                    el.addClass('highlighted');
                }

                function dehighlightItem(item) {
                    item.highlighted = false;
                    clearText(item);
                    var el = item.get();
                    el.find('[highlighter]').remove();
                    el.removeClass('highlighted');
                }

                function clearText(item) {
                    var el = item.get();
                    var commentEl = el.find('[comments]');
                    commentEl.text("");
                }

                function putCommentBoxOnItem(item, comment, cssClass) {
                    var el = item.get();
                    var commentEl = el.find('[comments]');
                    commentEl.first().text(comment);
                    $(commentEl).removeAttr('class');
                    $(commentEl).attr('class', cssClass);
                }

                function getItemBoundaries(item) {
                    var el = item.get();
                    return getItemBoundariesElement(el);
                }

                function getItemBoundariesElement(el) {
                    var offset = el.offset();
                    return {
                        offset: offset,
                        screenOffset: {
                            top: offset.top - $(window).scrollTop(),
                            left: offset.left
                        },
                        width: el.innerWidth(),
                        height: el.innerHeight(),
                    }
                }

                function putRobotAtLocation(left, top, side) {
                    left = left || '50px';
                    top = top || '50px';
                    var iconElement = sDroidHelperService.droidInfo.iconElement;
                    iconElement.css('left', left);
                    iconElement.css('top', top);
                    iconElement.removeClass('right-side');
                    iconElement.removeClass('dragging');
                    iconElement.removeClass('left-side');
                    iconElement.addClass(side || 'left-side');
                }

                function giveCommentOutside(itemId, comment, listOfAction) {
                    var item = flowControl.getItem(itemId);
                    if (!item) {
                        return;
                    }

                    var iconElement = sDroidHelperService.droidInfo.iconElement;
                    var droidBoundaries = getItemBoundariesElement(iconElement);
                    if (!iconElement) {
                        return;
                    }
                    var itemBoundaries = getItemBoundaries(item);
                    iconElement.removeClass('right-side');
                    iconElement.removeClass('dragging');
                    iconElement.addClass('left-side');
                    sDroidHelperService.hideVisualDetailAndShowSmallMessageBox(comment, listOfAction);
                    iconElement.css('left', itemBoundaries.offset.left + itemBoundaries.width + "px");
                    iconElement.css('top', itemBoundaries.offset.top + "px");
                }

                function sayAndNext(message, nextWord) {
                    var deferred = tool.defer();
                    nextWord = nextWord || "Next";
                    sDroidHelperService.hideVisualDetailAndShowSmallMessageBox(message, [
                        {
                            label: nextWord,
                            run: function () {
                                deferred.resolve();
                            },
                            cssClasses: ['filled-green', 'm-left-5px']
                        }
                    ]);
                    return deferred.promise;
                }

                function sayAndFinish(message, nextWord) {
                    var deferred = tool.defer();
                    nextWord = nextWord || "Finish";
                    sDroidHelperService.hideVisualDetailAndShowSmallMessageBox(message, [
                        {
                            label: nextWord,
                            run: function () {
                                flowControl.endFlow();
                                deferred.resolve();
                            },
                            cssClasses: ['filled-green', 'm-left-5px']
                        }
                    ]);
                    return deferred.promise;
                }

                function askYesNo(question, yesWord, noWord) {
                    var deferred = tool.defer();
                    yesWord = yesWord || "Yes";
                    noWord = noWord || "No";
                    sDroidHelperService.hideVisualDetailAndShowSmallMessageBox(question, [
                        {
                            label: yesWord,
                            run: function () {
                                deferred.resolve();
                            },
                            cssClasses: ['filled-green', 'm-left-5px']
                        },
                        {
                            label: noWord,
                            run: function () {
                                deferred.reject();
                            },
                            cssClasses: ['filled-red', 'm-left-5px']
                        }
                    ]);
                    return deferred.promise;
                }

                flowControl.completed = completedDeferred.promise;

                return flowControl;
            };

            function loadFlow(flowName) {
                return generateFlowRunner(flowName);
            }

            var currentTour = null;
            var currentPage = null;

            function startPageTour() {
                if (currentPage) {
                    startTour(currentPage.flowName, currentPage.firstStep);
                }
            }

            function setCurrentFlowName(flowName, firstStep) {
                currentPage = {
                    flowName: flowName,
                    firstStep: firstStep
                }
            }

            function startTour(flowName, firstStep) {
                if (!currentTour) {
                    currentTour = serviceObj.loadFlow(flowName);

                    if (!currentTour) {
                        return tool.when(false);
                    }

                    if (firstStep && !currentTour.flow.steps[firstStep]) {
                        currentTour = null;
                        return tool.when(false);
                    }
                    currentTour.startFirstStep(firstStep);
                    return currentTour.completed.finally(function () {
                        currentTour = null;
                    });
                } else {
                    currentTour.finish();
                    currentTour = null;
                    tool.when(true);
                }
            };

            function endTour() {
                if (currentTour) {
                    currentTour.finish();
                    currentTour = null;
                }
            }

            function hasTour() {
                return currentPage != null && currentPage.flowName && currentPage.firstStep;
            }

            tool.setServiceObjectProperties({
                loadFlow: loadFlow,
                defineFlow: defineFlow,
                registerAndProcessItem: registerAndProcessItem,
                startTour: startTour,
                startPageTour: startPageTour,
                hasTour: hasTour,
                setCurrentFlowName: setCurrentFlowName,
                endTour: endTour
            });
        });
