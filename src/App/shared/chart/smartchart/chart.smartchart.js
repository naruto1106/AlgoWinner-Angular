agmNgModuleWrapper('agms.chart')
    .defineDirectiveForA('include-replace', [], function () {
        return {
            require: 'ngInclude',
            link: function (scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    })
    .defineDirectiveForE('agms-chart-smartchart-boundary', [], function () {
        return {
            templateUrl: 'smartchartBoundary',
            replace: true
        };
    }, {
        localItem: '='
    })
    .defineDirectiveByTag('smartchart', [], function (dep, tool) {
        return {
            templateUrl: '/App/shared/chart/smartchart/template/chart.smartchart.main.html',
            restrict: 'E',
            replace: true,
            link: function (scope, element, attrs) {
                var qElement = $(element);
                var qContent = qElement.find('.center').eq(0);
                qElement.on('mousewheel', function (event) {
                    event.preventDefault();
                    scope.$apply(function () {
                        scope.onMousewheel(event);
                    });
                });
                scope.$watch(function () { return scope.options; }, function () {
                    if (scope.options) {
                        scope.options.updateFunc = function () {
                            scope.notifyAllItems();
                        };
                    }
                });
                scope.info = {
                    helpWatch: function (method, response, isDeepSearch) {
                        scope.$watch(method, response, isDeepSearch);
                    },
                    updateSafely: function (func) {
                        scope.info.notificationSuppressed = true;
                        func();
                        scope.info.notificationSuppressed = false;
                        scope.notifyAllItems();
                    },
                    isIncompleteProperty: function () {
                        return this.device === undefined || this.horizontalRange === undefined || this.verticalRange === undefined;
                    }
                };

                dep.$window.setInterval(function () {
                    // check div id='center' div
                    var height = qContent.height();
                    var width = qContent.width();

                    if (!scope.info.device || scope.info.device.width !== width || scope.info.device.height !== height) {
                        scope.info.device = {
                            width: width,
                            height: height
                        };
                        if (scope.info.notificationSuppressed) {
                            return;
                        }
                        scope.$apply(function () {
                            scope.notifyAllItems();
                        });
                    }
                }, 100);
                scope.$watch('horizontalRange', function () {
                    if (scope.info.notificationSuppressed) {
                        return;
                    }
                    scope.info.horizontalRange = scope.horizontalRange;
                    scope.notifyAllItems();
                }, true);
                scope.$watch('verticalRange', function () {
                    if (scope.info.notificationSuppressed) {
                        return;
                    }
                    scope.info.verticalRange = scope.verticalRange;
                    scope.notifyAllItems();
                }, true);
                scope.callItemsInsideContainer = function (func, containers) {
                    if (scope.info.isIncompleteProperty()) {
                        return;
                    }
                    if (containers) {
                        containers.forEach(function (item) {
                            func(item);
                        });
                    }
                };
                scope.notifyItemsInsideContainer = function (containers) {
                    scope.callItemsInsideContainer(function (item) {
                        if (item.onViewChanged) {
                            item.onViewChanged(scope.info);
                        }
                    }, containers);
                };
                scope.initItemsInsideContainer = function (containers) {
                    scope.callItemsInsideContainer(function (item) {
                        if (item.init) {
                            item.init(scope.info);
                        }
                    }, containers);
                };
                //////////////////////////////////////////////////////////////////////
                // mouse events
                scope.onMouseleave = function (event) {
                    scope.callItemsInsideContainer(function (item) {
                        if (item.onMouseleave) {
                            item.onMouseleave(scope.info, event);
                        }
                    }, scope.items);
                };
                scope.onMousemove = function (event) {
                    scope.callItemsInsideContainer(function (item) {
                        if (item.onMousemove) {
                            item.onMousemove(scope.info, event);
                        }
                    }, scope.items);
                };
                scope.onMousedown = function (event) {
                    scope.callItemsInsideContainer(function (item) {
                        if (item.onMousedown) {
                            item.onMousedown(scope.info, event);
                        }
                    }, scope.items);
                };
                scope.onMouseup = function (event) {
                    scope.callItemsInsideContainer(function (item) {
                        if (item.onMouseup) {
                            item.onMouseup(scope.info, event);
                        }
                    }, scope.items);
                };
                scope.onMousewheel = function (event) {
                    scope.callItemsInsideContainer(function (item) {
                        if (item.onMousewheel) {
                            item.onMousewheel(scope.info, event);
                        }
                    }, scope.items);
                };
                //////////////////////////////////////////////////////////////////////
                scope.initAllItems = function () {
                    scope.initItemsInsideContainer(scope.items);
                    if (scope.options && scope.options.rulers) {
                        var rulers = scope.options.rulers;
                        scope.initItemsInsideContainer(rulers.north.items);
                        scope.initItemsInsideContainer(rulers.south.items);
                        scope.initItemsInsideContainer(rulers.east.items);
                        scope.initItemsInsideContainer(rulers.west.items);
                    }
                };
                scope.notifyAllItems = function () {
                    scope.notifyItemsInsideContainer(scope.items);
                    if (scope.options && scope.options.rulers) {
                        var rulers = scope.options.rulers;
                        scope.notifyItemsInsideContainer(rulers.north.items);
                        scope.notifyItemsInsideContainer(rulers.south.items);
                        scope.notifyItemsInsideContainer(rulers.east.items);
                        scope.notifyItemsInsideContainer(rulers.west.items);
                    }
                };
                scope.initAllItems();
            }
        };
    }, {
        items: '=',
        horizontalRange: '=',
        verticalRange: '=',
        options: '=?'
    })
    .ngApp
    .run([
        '$templateCache', function ($templateCache) {
            $templateCache.put('singlePathSVG',
                '<svg class="full-screen">' +
                '<path ng-style="localItem.svgStyle" ng-attr-d="{{localItem.path}}" />' +
                '</svg>');
        }
    ])
    .run([
        '$templateCache', function ($templateCache) {
            $templateCache.put('smartchartBoundary',
                '<div ng-include include-replace src="localItem.template">' +
                '</div>');
        }
    ]);