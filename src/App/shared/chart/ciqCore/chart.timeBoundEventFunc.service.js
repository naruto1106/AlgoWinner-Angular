agmNgModuleWrapper('agms.chart')
    .defineService("pChartTimeBoundEventFuncLibrary", ['$compile', '$templateCache'],
        function (serviceObj, dep, tool) {
            var $compile = dep.$compile,
                $templateCache = dep.$templateCache;

            var eventGeneratorLibrary = [];

            var scopeStorageGroup = {};

            function placeMarker(object, externalScopeProps, labelKind, templateId, assignLocalScopeFunc, xFunc, getMarkerTypeFunc, stxx) {
                var template = $templateCache.get(templateId);
                var someDate = xFunc(object);
                var newScope = dep.$rootScope.$new(false, dep.$rootScope);

                scopeStorageGroup[labelKind].push(newScope);
                angular.extend(newScope, externalScopeProps);
                var compiledNewNode = $compile(template)(newScope, function (clonedElement, elementScope) {
                    assignLocalScopeFunc(object, clonedElement, elementScope);
                    elementScope.getNode = function () {
                        return compiledNewNode;
                    };
                })[0];

                var markerPosition = 'above';
                if (getMarkerTypeFunc) {
                    markerPosition = getMarkerTypeFunc(object);
                }

                if (markerPosition === 'above') {
                    var markerAbove = new STX.Marker({
                        stx: stxx,
                        xPositioner: "date",
                        yPositioner: "above_candle",
                        x: someDate,
                        label: labelKind,
                        node: compiledNewNode,
                    });
                } else {
                    var markerBelow = new STX.Marker({
                        stx: stxx,
                        xPositioner: "date",
                        yPositioner: "under_candle",
                        x: someDate,
                        label: labelKind,
                        node: compiledNewNode,
                    });
                }
            }

            function generateTimeBoundEventFunc(externalScopeProps, labelKind, templateId, getObjectListPromise, assignLocalScopeFunc, xFunc, getMarkerTypeFunc) {
                if (!labelKind || !templateId || !getObjectListPromise || !assignLocalScopeFunc || !xFunc) {
                    return;
                }
                eventGeneratorLibrary[labelKind] = {};
                eventGeneratorLibrary[labelKind].show = function (stxx) {
                    if (!stxx) {
                        return;
                    }

                    STX.Marker.removeByLabel(stxx, labelKind);
                    if (!scopeStorageGroup[labelKind]) {
                        scopeStorageGroup[labelKind] = [];
                    }

                    getObjectListPromise().then(function (objectList) {
                        // in the event that the same label kind is redrawn asynchronously, to avoid double drawing we need to remove it again
                        scopeStorageGroup[labelKind].forEach(function (scope) {
                            scope.$destroy();
                        });
                        STX.Marker.removeByLabel(stxx, labelKind);
                        objectList.forEach(function (object) {
                            placeMarker(object, externalScopeProps, labelKind, templateId, assignLocalScopeFunc, xFunc, getMarkerTypeFunc, stxx);
                        });
                        stxx.draw();
                    });
                };
                eventGeneratorLibrary[labelKind].hide = function () {
                };
            }

            function hideEvent(labelKind, stxx) {
                if (!stxx) {
                    return;
                }
                if (eventGeneratorLibrary[labelKind] && eventGeneratorLibrary[labelKind].hide) {
                    eventGeneratorLibrary[labelKind].hide();
                }
                STX.Marker.removeByLabel(stxx, labelKind);
            }

            function showEvent(labelKind, stxx) {
                if (!stxx) {
                    return;
                }
                if (eventGeneratorLibrary[labelKind] && eventGeneratorLibrary[labelKind].show) {
                    eventGeneratorLibrary[labelKind].show(stxx);
                }
            }

            tool.setServiceObjectProperties({
                generateTimeBoundEventFunc: generateTimeBoundEventFunc,
                hideEvent: hideEvent,
                showEvent: showEvent
            });
        }
    );