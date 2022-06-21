agmNgModuleWrapper('agms.chart')
    .defineService("pChartTgpsService", [
        'pChartFilterDescriptionService', 'pChartThemeService', 'pChartService', 'sChartStudyService',
        'sTgpsPositionService', 'sTgpsSwingService', 'sTgpsPlusService'],
        function (serviceObj, dep, tool) {
            var sChartStudyService = dep.sChartStudyService,
                pChartService = dep.pChartService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                sTgpsPositionService = dep.sTgpsPositionService,
                sTgpsSwingService = dep.sTgpsSwingService,
                sTgpsPlusService = dep.sTgpsPlusService;

            var filterDescription = pChartFilterDescriptionService;
            var lastTgpsState = null;

            function tradersGPSInSwingMode() {
                return serviceObj.tradersGpsMode && serviceObj.tradersgps_swing.mode === 'Swing';
            }
            function tradersGPSInPositionMode() {
                return serviceObj.tradersGpsMode && serviceObj.tradersgps_swing.mode === 'Position';
            }
            function tradersGPSInPaladinMode() {
                return serviceObj.tradersGpsMode && serviceObj.tradersgps_swing.mode === 'Plus';
            }

            function restartTradersGPS() {
                serviceObj.tradersGpsMode = true;
                tradersGPSChanged();
            }
            
            function tradersGPSChanged(settings) {
                if (!filterDescription.primaryProduct) {
                    return;
                }

                var retainVolumePanel = settings ? settings.retainVolumePanel : lastTgpsState === "Position";
                if (lastTgpsState !== null) {
                    if (lastTgpsState === "Position") {
                        sTgpsPositionService.exitTradersPosition();
                    } else if (lastTgpsState === "Swing") {
                        sTgpsSwingService.exitTradersSwing();
                    } else if (lastTgpsState === "Plus") {
                        sTgpsPlusService.exitTradersPaladin();
                    }
                }

                if (serviceObj.tradersGpsMode) {
                    if (tradersGPSInPositionMode()) {
                        lastTgpsState = "Position";
                        sTgpsPositionService.enterTradersPosition(retainVolumePanel);
                    } else if (tradersGPSInSwingMode()) {
                        lastTgpsState = "Swing";
                        sTgpsSwingService.enterTradersSwing();
                    } else if (tradersGPSInPaladinMode()) {
                        lastTgpsState = "Plus";
                        sTgpsPlusService.enterTradersPaladin();
                    }
                    pChartService.isStudyAccordionOpen = true;
                } else {                    
                    lastTgpsState = null;
                    sChartStudyService.findVChartAndSetVisibility(true);
                }
            }

            function adjustExtraViewStatesForPanel(panel) {
                if (tradersGPSInPositionMode()) {
                    sTgpsPositionService.adjustExtraViewStatesForPanel(panel);
                } else if (tradersGPSInSwingMode()) {
                    sTgpsSwingService.adjustExtraViewStatesForPanel(panel);
                } else if (tradersGPSInPaladinMode()) {
                    sTgpsPlusService.adjustExtraViewStatesForPanel(panel);
                }
            }
            
            function loadTgpsData(params, cb) {
                if (tradersGPSInPositionMode()) {
                    sTgpsPositionService.loadTgpsData(params, cb);
                } else if (tradersGPSInSwingMode()) {
                    sTgpsSwingService.loadTgpsData(params, cb);
                } else if (tradersGPSInPaladinMode()) {
                    sTgpsPlusService.loadTgpsData(params, cb);
                }
            }

            function appendDraw() {
                if (tradersGPSInPositionMode()) {
                    sTgpsPositionService.appendDraw();
                } else if (tradersGPSInSwingMode()) {
                    sTgpsSwingService.appendDraw();
                } else if (tradersGPSInPaladinMode()) {
                    sTgpsPlusService.appendDraw();
                }
            }

            function appendCreateDataSet() {
                if (tradersGPSInPositionMode()) {
                    sTgpsPositionService.appendCreateDataSet();
                } else if (tradersGPSInSwingMode()) {
                    sTgpsSwingService.appendCreateDataSet();
                } else if (tradersGPSInPaladinMode()) {
                    sTgpsPlusService.appendCreateDataSet();
                }
            }
            
            function hideHighlightedTgpsSeries(event, data) {
                if (tradersGPSInPositionMode()) {
                    sTgpsPositionService.hideHighlightedTgpsSeries(event, data);
                } else if (tradersGPSInSwingMode()) {
                    sTgpsSwingService.hideHighlightedTgpsSeries(event, data);
                }else if (tradersGPSInPaladinMode()) {
                    sTgpsPlusService.hideHighlightedTgpsSeries(event, data);
                }
            }

            function hideHighlightedTgpsOverlay(event, data) {
                if (tradersGPSInPaladinMode()) {
                    sTgpsPlusService.hideHighlightedTgpsOverlay(event, data);
                }
            }

            tool.on('onChartBarSizePickerChanged', function () {
                if (serviceObj.tradersGpsMode) {
                    tradersGPSChanged();
                }
            });
            tool.on('onStxSeriesDeleted', hideHighlightedTgpsSeries);
            tool.on('onStxDeleteOverlay', hideHighlightedTgpsOverlay);

            tool.setServiceObjectProperties({
                tradersGpsMode: false,
                tradersgps_swing: { },

                tradersGPSPositionStudies: sTgpsPositionService.tradersGPSPositionStudies,
                tradersGPSSwingStudies: sTgpsSwingService.tradersGPSSwingStudies,
                tradersGPSPlusStudies: sTgpsPlusService.tradersGPSPlusStudies,

                tradersGPSInPositionMode: tradersGPSInPositionMode,
                restartTradersGPS: restartTradersGPS,
                tradersGPSChanged: tradersGPSChanged,
                adjustExtraViewStatesForPanel: adjustExtraViewStatesForPanel,

                appendDraw: appendDraw,
                appendCreateDataSet: appendCreateDataSet,
                loadTgpsData: loadTgpsData
            });
        });