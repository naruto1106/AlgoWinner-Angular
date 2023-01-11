agmNgModuleWrapper('agmp.chart')
    .defineController('p.chart.MainV2Controller',
        ['coreConfigService',
            'pChartRenderingUtilsService',
            'pChartQuoteFeedService',
            'pChartFilterDescriptionService',
            'commonLocationHistoryService',
            'commonScreenResizerService',
            'venue',
            'symbol',
            'pChartTgpsService',
            'pChartGuppyService',
            'presetChartMode',
            'modeParam',
            'pChartService',
            'sChartXaxisCustomizer',
            'pChartProductLoaderService',
            'sChartTextEditorService',
            'pChartThemeService',
            'sTgpsStudyService',
            'sGmmaStudyService',
            'sChartMarketDataService',
            'sChartIqHookService',
            'sExtChartDrawingService',
            'pChartFundamentalHelperService',
            'sDroidHelperService',
            'pChartViewTemplateService',
            'sChartDrawingService',
            'sGuideItemManagerService',
            'pChartPopupService',
            'sChartStudyService',
            "sHeaderService"],
        function (vm, dep, tool) {
            var coreUserStateService = dep.coreUserStateService,
                pChartTgpsService = dep.pChartTgpsService,
                pChartGuppyService = dep.pChartGuppyService,
                pChartViewTemplateService = dep.pChartViewTemplateService,
                coreConfigService = dep.coreConfigService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                commonLocationHistoryService = dep.commonLocationHistoryService,
                commonScreenResizerService = dep.commonScreenResizerService,
                pChartService = dep.pChartService,
                pChartPopupService = dep.pChartPopupService,
                pChartProductLoaderService = dep.pChartProductLoaderService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                sChartXaxisCustomizer = dep.sChartXaxisCustomizer,
                sChartTextEditorService = dep.sChartTextEditorService,
                pChartThemeService = dep.pChartThemeService,
                sTgpsStudyService = dep.sTgpsStudyService,
                sGmmaStudyService = dep.sGmmaStudyService,
                sChartMarketDataService = dep.sChartMarketDataService,
                sChartIqHookService = dep.sChartIqHookService,
                sExtChartDrawingService = dep.sExtChartDrawingService,
                pChartFundamentalHelperService = dep.pChartFundamentalHelperService,
                sChartDrawingService = dep.sChartDrawingService,
                sHeaderService = dep.sHeaderService,
                pChartQuoteFeedService = dep.pChartQuoteFeedService,
                sChartStudyService = dep.sChartStudyService,
                $location = dep.$location;

            var filterDescription = pChartFilterDescriptionService;
            var isMessageClosed;
            var sidebarMode = 'productList';

            var reactiveAngularSync = new Rx.Subject();
            var bufferedSync = reactiveAngularSync
                .bufferWithTime(200)
                .subscribe(function (evts) {
                    if (!evts || evts.length === 0) {
                        return;
                    }
                    tool.evalAsync();
                });

            // Event handlers
            tool.on('chartSelectedItemInfo', function (event, data) {
                vm.displayedChartSelectedItemInfo = data;
                reactiveAngularSync.onNext();
            });

            tool.on('beginFetchHistoricalData', function () {
                vm.isProductDataLoading = true;
            });

            tool.on('endFetchHistoricalData', function () {
                vm.isProductDataLoading = false;
            });

            function closeWarningMessage() {
                vm.fundamentalAvailabilityMessagesShown = false;
            }

            function toggleSidebar() {
                vm.sidebarOpened = !vm.sidebarOpened;
                vm.sidebarWidth = {
                    width: vm.sidebarOpened ? "330px" : "20px"
                };
            }

            function updateStudy() {
                if (vm.filterDescription.updateStudy) {
                    vm.filterDescription.updateStudy();
                }
            }

            function dismissStudy() {
                if (vm.filterDescription.dismissStudy) {
                    vm.filterDescription.dismissStudy();
                }
            }

            function closeMessage() {
                isMessageClosed = true;
                localStorage.chartMessageClosed = true;
            }

            function switchRealTimeMode() {
                pChartRenderingUtilsService.stxx.draw();
                tool.broadcast("realTimeModeChanged");
            }

            function showGreenAlertBundle() {
                return (!isMessageClosed && pChartService.hasAlgoChartBundle);
            }

            function isSidebarMode(val) {
                return sidebarMode === val;
            }

            function setSidebarMode(val) {
                sidebarMode = val;
                pChartService.isSidebarShown = true;
            }

            function toggleDrawingMode() {
                // MaRa: uncomment this to fix drawing when not on drawing mode
                // Need to also check on chart.drawingTool's stepDrawingCompleted
                if (!vm.pChartService.isDrawingShown) {
                    sChartDrawingService.stopDrawing();
                }
            }

            function isTgpsInPositionMode() {
                return pChartTgpsService.tradersGPSInPositionMode();
            }

            function getDomainFromLocation(loc) {
                var domain = loc.protocol() + "://" + loc.host();
                if (loc.port()) {
                    domain = domain + ":" + loc.port();
                }
                return domain;
            }

            function goToPartnerChart() {
                var domain = getDomainFromLocation($location);
                var subPath = $location.$$path;
                var href = domain + "/Partners/Inside" + "#" + subPath;
                commonLocationHistoryService.goToNewTab(href);
            }

            function updateHistoricalData() {
                pChartRenderingUtilsService.refreshChart(true);
            }

            tool.initialize(function () {
                filterDescription.initialize();

                tool.on('onUibModalOpened', function () {
                    if (STXChart) {
                        STXChart.insideChart = false;
                    }
                });

                commonScreenResizerService.setFooterVisibility(false);
                tool.setVmProperties({
                    sHeaderService: sHeaderService,
                    isTgpsInPositionMode: isTgpsInPositionMode,
                    setSidebarMode: setSidebarMode,
                    isSidebarMode: isSidebarMode,
                    coreConfigService: coreConfigService,
                    hasAlgoChartBundle: false,
                    pChartRenderingUtilsService: pChartRenderingUtilsService,
                    pChartThemeService: pChartThemeService,
                    showGreenAlertBundle: showGreenAlertBundle,
                    filterDescription: filterDescription,

                    toggleDrawingMode: toggleDrawingMode,
                    toggleSidebar: toggleSidebar,
                    sidebarOpened: false,
                    sidebarWidth: {},
                    displayedChartSelectedItemInfo: {},
                    closeWarningMessage: closeWarningMessage,
                    getFundamentalAvailabilityMessages: pChartFundamentalHelperService.getFundamentalAvailabilityMessages,
                    fundamentalAvailabilityMessagesShown: false,
                    go: commonLocationHistoryService.go,
                    updateStudy: updateStudy,
                    dismissStudy: dismissStudy,
                    closeMessage: closeMessage,
                    pChartService: pChartService,
                    pChartPopupService: pChartPopupService,
                    tradeBorderTopColor: pChartPopupService.tradeBorderTopColor,
                    goToPartnerChart: goToPartnerChart,
                    updateHistoricalData: updateHistoricalData
                });

                dep.sDroidHelperService.isChartPage = true;

                isMessageClosed = localStorage.chartMessageClosed || false;

                toggleSidebar();

                sChartXaxisCustomizer.filterDescription = vm.filterDescription;
                pChartService.initialProductRequest = {
                    venue: dep.venue,
                    symbol: dep.symbol,
                    hasProductSpecified: dep.venue && dep.symbol,
                    presetChartMode: dep.presetChartMode,
                    modeParam: dep.modeParam
                };
                // Chart Initialization
                sChartTextEditorService.init();
                sTgpsStudyService.init();
                sGmmaStudyService.init();
                sChartIqHookService.init();
                sChartMarketDataService.init();
                sExtChartDrawingService.init();
                var quoteFeedObj = new pChartQuoteFeedService();
                pChartRenderingUtilsService.init(quoteFeedObj);
                // https://jira.algomerchant.com/jira/browse/PD-997 
                sChartXaxisCustomizer.customizeXAxis(pChartRenderingUtilsService.stxx);
                sChartStudyService.init(pChartRenderingUtilsService);
                pChartThemeService.initTheme(pChartRenderingUtilsService.stxx);
                pChartProductLoaderService.registerChartWithCallback(pChartRenderingUtilsService);

                setSidebarMode('productList');
                var hasDefaultTemplate = false;
                tool.onceAll([
                    coreUserStateService.userInfoLoaded,
                    coreUserStateService.myPremiumItemSubscriptionsLoaded,
                    coreUserStateService.mySubscribedStrategiesLoaded,
                    pChartViewTemplateService.getOrRefreshViewTemplates().then(function () {
                        hasDefaultTemplate = pChartViewTemplateService.getDefaultTemplateId() != null;
                    })
                ]).then(function () {
                    // loading user stats
                    if (coreUserStateService.hasSGRealTimeMarketData() || coreUserStateService.hasUSRealTimeMarketData()) {
                        pChartRenderingUtilsService.realTimeMode = true;
                        switchRealTimeMode();
                    }
                    if (coreUserStateService.hasAlgoChartBundle()) {
                        pChartService.hasAlgoChartBundle = true;
                    }
                    if (coreUserStateService.hasAlgoChartDarkTheme()) {
                        pChartService.hasAlgoChartDarkTheme = true;
                    }

                    // if product (Venue,Symbol) is part of url params:

                    var hasProductSpecified = pChartService.initialProductRequest.hasProductSpecified;
                    var hasTgpsAvailable = coreUserStateService.hasTradersGPS();

                    if (hasProductSpecified) {
                        // then load the product
                        pChartProductLoaderService.loadProductWithParam(pChartService.initialProductRequest.venue, pChartService.initialProductRequest.symbol).then(function () {
                            // if has tgps access, then activate it
                            if (hasTgpsAvailable) {
                                pChartTgpsService.tradersGpsMode = true;
                                pChartTgpsService.tradersgps_swing.mode = pChartService.initialProductRequest.presetChartMode;
                                if (pChartService.initialProductRequest.modeParam === "Weekly") {
                                    dep.pChartRenderingUtilsService.setBarSize("1 W");
                                }
                                pChartTgpsService.restartTradersGPS();
                            }
                        });
                    } else {
                        // if no product specified
                        // but chart mode is tgps, then open tgps popup
                        if (pChartService.initialProductRequest.presetChartMode === "tgps") {
                            if (hasTgpsAvailable) {
                                tool.openModalByDefinition('s.tgps.MainPopupController', {
                                    mode: pChartTgpsService.tradersgps_swing.mode
                                });
                            }
                        } else {
                            if (hasDefaultTemplate) {
                                tool.onRendered(function () {
                                    pChartViewTemplateService.loadDefaultTemplate();
                                });
                            } else if (hasTgpsAvailable) {
                                pChartTgpsService.tradersGpsMode = true;
                                pChartTgpsService.tradersgps_swing.mode = "Position";
                            }
                        }
                    }
                });

                var sGuideItemManagerService = dep.sGuideItemManagerService;
                sGuideItemManagerService.defineWalkthrough('guide.chart.loading')
                    .addStep('showGotIt', function (helper) {
                        var html = '"Analyze" templates are now integrated into Chart Workspaces. To locate previously saved templates, please look for the Workspaces without the ' +
                            '<span class="product-template-icon">P</span>' +
                            ' icon.';
                        helper.freezeItem('chart.load-panel');
                        helper.highlightWithActionBox('chart.load-panel', {
                            cssClass: 'west top',
                            title: null,
                            html: html,
                            buttonLabel: 'OK, got it',
                            buttonAction: function ($event) {
                                // this is to prevent the uib-dropdown to react on the button click as "close outside"
                                $event.preventDefault();
                                $event.stopPropagation();
                                helper.endWalkthrough();
                                helper.neverCallAgain();
                            }
                        });
                    })
                    .startFrom('showGotIt');

                sGuideItemManagerService.defineWalkthrough('guide.chart.savingWithProduct')
                    .addStep('showGotIt', function (helper) {
                        var html = 'If you choose to save the products & drawings, they will be loaded when you launch the workspace, and override any products or drawings you currently have on the chart.'
                            + '<br/><br/>'
                            + 'If you choose not to save the products & drawings, you will be able to load the workspace on an existing chart without overriding any products or drawings.'
                            + '<br/><br/>';
                        helper.freezeItem('chart.save-panel');
                        helper.freezeItem('chart.save-panel.product');
                        helper.highlightWithActionBox('chart.save-panel.product', {
                            cssClass: 'wider north center',
                            title: null,
                            html: html,
                            buttonLabel: 'OK, got it',
                            buttonAction: function () {
                                helper.endWalkthrough();
                                helper.neverCallAgain();
                            }
                        });
                    })
                    .startFrom('showGotIt');
            });
        });