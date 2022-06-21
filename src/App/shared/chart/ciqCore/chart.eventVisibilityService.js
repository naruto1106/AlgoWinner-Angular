agmNgModuleWrapper('agms.chart')
    .defineService("pChartEventVisibilityService",
    ['pChartFilterDescriptionService',
    'pChartTimeBoundEventFuncLibrary',
    'pChartRenderingUtilsService'],
        function (serviceObj, dep, tool) {

            var filterDescription = dep.pChartFilterDescriptionService,
                pChartTimeBoundEventFuncLibrary = dep.pChartTimeBoundEventFuncLibrary,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService;

            pChartRenderingUtilsService.registerOnChartCreatedCallback("renderEvents", function (stxx) {
                for (var prop in filterDescription.eventVisibility) {
                    var isVisible = filterDescription.eventVisibility[prop];
                    if (isVisible) {
                        // hide previous events (because primary might have changed)
                        toggleEvent(prop);
                        // and show it again (using the new primary product)
                        toggleEvent(prop);
                    } else {
                        onEventVisibilityChanged(prop);
                    }
                }
            });

            function checkAndRespondToVisibility(labelKind) {
                if (filterDescription.eventVisibility[labelKind] === undefined) {
                    filterDescription.eventVisibility[labelKind] = false;
                }
                onEventVisibilityChanged(labelKind);
                return filterDescription.eventVisibility[labelKind];
            }

            function onEventVisibilityChanged(labelKind) {
                if (filterDescription.eventVisibility[labelKind]) {
                    pChartTimeBoundEventFuncLibrary.showEvent(labelKind, pChartRenderingUtilsService.stxx);
                } else {
                    pChartTimeBoundEventFuncLibrary.hideEvent(labelKind, pChartRenderingUtilsService.stxx);
                }
            }

            function toggleEvent(labelKind, forcedState) {
                if (!filterDescription.eventVisibility[labelKind]) {
                    filterDescription.eventVisibility[labelKind] = false;
                }
                if (forcedState == undefined) {
                    filterDescription.eventVisibility[labelKind] = !filterDescription.eventVisibility[labelKind];
                } else {
                    filterDescription.eventVisibility[labelKind] = forcedState;
                }
                onEventVisibilityChanged(labelKind);
            }

            tool.setServiceObjectProperties({
                toggleEvent: toggleEvent,
                checkAndRespondToVisibility: checkAndRespondToVisibility
            });
        });