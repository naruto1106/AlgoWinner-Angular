agmNgModuleWrapper('agms.chart')
    .defineService("pChartViewTemplateService", [
            'commonTimeZoneService',
            'sChartService',
            'pChartService',
            'sChartStudyService',
            'pChartFilterDescriptionService',
            'pChartRenderingUtilsService',
            'pChartThemeService',
            'sChartLayoutThemeSettingsService',
            'pChartTgpsService',
            'pChartFundamentalHelperService',
            'pChartDatamartService',
            'pChartColoringService',
            'pChartProductLoaderService'
    ],
        function (serviceObj, dep, tool) {

            var coreNotificationService = dep.coreNotificationService,
                sChartStudyService = dep.sChartStudyService,
                pChartThemeService = dep.pChartThemeService,
                coreDataStorageService = dep.coreDataStorageService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                sChartLayoutThemeSettingsService = dep.sChartLayoutThemeSettingsService,
                commonTimeZoneService = dep.commonTimeZoneService,
                sChartService = dep.sChartService,
                pChartService = dep.pChartService,
                pChartTgpsService = dep.pChartTgpsService,
                pChartFundamentalHelperService = dep.pChartFundamentalHelperService,
                pChartDatamartService = dep.pChartDatamartService,
                pChartColoringService = dep.pChartColoringService,
                pChartProductLoaderService = dep.pChartProductLoaderService;

            var filterDescription = pChartFilterDescriptionService;

            function saveViewTemplate(data) {
                data.updateTime = new Date();
                return serviceObj.getViewTemplates().then(function (viewTemplates) {
                    if (!data.id) {
                        var max = 0;
                        viewTemplates.forEach(function (u) {
                            max = max < u.id ? u.id : max;
                        });
                        data.id = max + 1;
                    }

                    viewTemplates = viewTemplates.filter(function (u) {
                        return u && u.id !== data.id;
                    });
                    viewTemplates.push(data);
                    return sChartService.setLayout(viewTemplates).then(function () {
                        notifyWorkspaceSaved(data);
                        serviceObj.currentViewTemplate = data;
                        return data;
                    });
                });
            }

            function getChartLayout() {
                return sChartLayoutThemeSettingsService.initializeChartSettings().then(function (res) {
                    return res.ChartLayout;
                });
            }

            function removeViewTemplate(viewTemplateToRemove) {
                return serviceObj.getViewTemplates().then(function (viewTemplates) {
                    viewTemplates = viewTemplates.filter(function (u) {
                        return u.id !== viewTemplateToRemove.id;
                    });
                    return sChartService.setLayout(viewTemplates);
                });
            }

            function getViewTemplates() {
                return getChartLayout().then(function (res) {
                    var viewTemplates = [];
                    if (res) {
                        var layout = JSON.parse(res);
                        viewTemplates = layout;
                    }
                    return viewTemplates;
                });
            }

            function copyAnalysisDescription(from, to) {
                to.addedStudies = from.addedStudies ? angular.copy(from.addedStudies) : [];
                to.addedFundamentals = from.addedFundamentals ? angular.copy(from.addedFundamentals) : [];
                for (var i = 0; i < to.addedFundamentals.length; i++) {
                    var f = to.addedFundamentals[i];
                    f.removed = false;
                }

                if (from.datamart) {
                    var eventTypes = pChartDatamartService.getAlgoFeedEventTypesFromTree(from.datamart.treeStructure);
                    from.datamartEventTypes = eventTypes;
                }
                to.datamartEventTypes = from.datamartEventTypes;
                to.eventVisibility = from.eventVisibility;
            }
            function copyFilterDescription(from, to) {
                if (from == null || to == null) {
                    return;
                }

                if (from.primaryProduct) {
                    from.primaryProduct.timeZone = commonTimeZoneService.getTimeZoneMapping(from.primaryProduct.TradeVenueLoc);
                    to.primaryProduct = from.primaryProduct;
                    if (from.myProducts) {
                        for (var c = 0; c < from.myProducts.length; c++) {
                            var product = from.myProducts[c];
                            product.timeZone = commonTimeZoneService.getTimeZoneMapping(product.TradeVenueLoc);
                        }
                        to.myProducts = from.myProducts;
                    }
                }
                to.panelProportions = from.panelProportions;
                copyAnalysisDescription(from, to);
                to.normalizeToPercentage = from.normalizeToPercentage;
                to.showLegendsOnChart = from.showLegendsOnChart;
                to.hideLegend = from.hideLegend;
                to.barSize = from.barSize || "1 D";
            }

            function getCurrentDrawings(cru) {
                var drawings = cru.stxx.drawingObjects;
                var newDrawings = [];
                var layout = cru.stxx.exportLayout();
                delete layout.studies;
                delete layout.panels;

                // avoid circular reference before serializing
                drawings.forEach(function (draw) {
                    var newDrawing = draw.serialize();
                    newDrawings.push(newDrawing);
                });
                return {
                    drawings: newDrawings,
                    layout: layout
                };
            }
            
            function loadDefaultTemplate() {
                var id = getDefaultTemplateId();
                if (id) {
                    var template = serviceObj.viewTemplates.filter(function (i) {
                        return i.id === id;
                    })[0];
                    if (template) {
                        setAsCurrentTemplate(template);
                    }
                }
            }

            function restoreLayout(cru, data) {
                if (!data.layout) {
                    return;
                }
                cru.latestLayoutData = data;
                cru.stxx.importLayout(data.layout);
            }


            function setAsCurrentTemplate(data) {
                if (!_.includes(["1 D", "1 W", "1 M"], data.filterDescription.barSize)) {
                    coreNotificationService.notifyError('Error', "Intraday bars are no longer suppported");
                    return;
                }

                pChartColoringService.resetReservedColors();

                pChartFundamentalHelperService.resetProductFundamentals();
                for (var r in pChartRenderingUtilsService.stxx.chart.seriesRenderers) {
                    pChartRenderingUtilsService.stxx.chart.seriesRenderers[r].removeAllSeries();
                }
                for (var s in pChartRenderingUtilsService.stxx.layout.studies) {
                    STX.Studies.removeStudy(pChartRenderingUtilsService.stxx, pChartRenderingUtilsService.stxx.layout.studies[s]);
                }
                // these codes are nasty!! 

                if (data.addOnSettings) {
                    pChartService.isDrawingShown = data.addOnSettings.isDrawingShown;
                    pChartRenderingUtilsService.enableVerticalMove = data.addOnSettings.enableVerticalMove;
                }

                var primaryProduct = data.filterDescription.primaryProduct;
                if (primaryProduct) {
                    primaryProduct.symbol = primaryProduct.Symbol;
                    primaryProduct.included = true;
                    primaryProduct.timeZone = commonTimeZoneService.getTimeZoneMapping(primaryProduct.TradeVenueLoc);

                    data.filterDescription.myProducts.forEach(function (p) {
                        p.symbol = p.Symbol;
                        p.included = true;
                        p.timeZone = commonTimeZoneService.getTimeZoneMapping(p.TradeVenueLoc);
                    });
                } else {
                    data.filterDescription.myProducts = [];
                }

                copyFilterDescription(data.filterDescription, filterDescription);
                var theme = pChartThemeService.getCurrentTheme();
                if (filterDescription.primaryProduct) {
                    // fix reference for filterDescription.primaryProduct to point to same object in the filterDescription.myProducts
                    filterDescription.myProducts.forEach(function (p) {
                        if (p.Symbol === filterDescription.primaryProduct.Symbol) {
                            filterDescription.primaryProduct = p;
                            filterDescription.primaryProduct.included = true;
                        } else {
                            p.color = pChartColoringService.getNextColorAndReserve(theme);
                        }                        
                    });
                }

                // fix weekly bar
                if (data.filterDescription.barSize && data.filterDescription.barSize === "1 W") {
                    pChartRenderingUtilsService.setBarSize(data.filterDescription.barSize);
                }

                restoreLayout(pChartRenderingUtilsService, data);

                pChartRenderingUtilsService.stxx.layout.studies = sChartStudyService.getCleanUpDuplicatedStudies(pChartRenderingUtilsService.stxx.layout.studies);
                pChartRenderingUtilsService.isComparisonMode = filterDescription.normalizeToPercentage;

                // Restore TraderGPS
                pChartTgpsService.tradersGpsMode = data.tradersGpsMode;
                if (pChartTgpsService.tradersGpsMode) {
                    // Backward compability
                    // MaRa: Paladin now renamed to Plus
                    if (data.gpsMode === 'Paladin') {
                        data.gpsMode = 'Plus';
                    }

                    if (data.gpsMode) {
                        pChartTgpsService.tradersgps_swing.mode = data.gpsMode;
                    } else {
                        pChartTgpsService.tradersgps_swing.mode = data.isGpsSwingEnabled ? 'Swing' : 'Position';
                    }
                }
                var algoFeedEventTypeIds = [];
                if (filterDescription.datamartEventTypes) {
                    filterDescription.datamartEventTypes.forEach(function (i) {
                        algoFeedEventTypeIds.push(i.AlgoFeedEventTypeId);
                    });
                }
                pChartDatamartService.adjustDatamartTreeFromIds(algoFeedEventTypeIds);

                // Clear NonPrimaryProducts In TgpsMode
                if (pChartTgpsService.tradersGpsMode) {
                    if (pChartTgpsService.tradersGPSInPositionMode()) {
                        pChartService.chartType = pChartService.chartTypes.filter(function (i) {
                            return i.StxxType === 'candle';
                        })[0];
                    }
                    var includedProducts = filterDescription.getIncludedProducts();
                    includedProducts.forEach(function (i) {
                        if (i.ProductId !== filterDescription.primaryProduct.ProductId) {
                            pChartProductLoaderService.removeFromProducts(i);
                        }
                    });
                    filterDescription.productFundamentals.forEach(function (i) {
                        i.included = i.product.ProductId == filterDescription.primaryProduct.ProductId;
                    });
                    pChartFundamentalHelperService.renderAllFundamentals();
                    filterDescription.productFundamentals = filterDescription.productFundamentals.filter(function (i) {
                        return i.included;
                    });
                }
                refreshChart(function () {
                    pChartRenderingUtilsService.setBarSize(filterDescription.barSize);
                    pChartDatamartService.rebindDatamartEvents();
                    pChartFundamentalHelperService.renderAllFundamentals();
                    pChartTgpsService.tradersGPSChanged({
                        retainVolumePanel: volumePanelIsShownInWorkspace(data)
                    });
                    if (filterDescription.panelProportions) {
                        for (var panelName in filterDescription.panelProportions) {
                            if (pChartRenderingUtilsService.stxx.panels[panelName]) {
                                pChartRenderingUtilsService.stxx.panels[panelName].percent = filterDescription.panelProportions[panelName] || 0.1;
                            }
                        }
                        pChartRenderingUtilsService.stxx.adjustPanelPositions();
                        pChartRenderingUtilsService.stxx.draw();
                    }

                    if (data.drawings && data.filterDescription.primaryProduct) {
                        pChartRenderingUtilsService.stxx.drawingObjects = [];
                        pChartRenderingUtilsService.stxx.reconstructDrawings(data.drawings);
                    }
                    pChartThemeService.setCurrentTheme(pChartRenderingUtilsService.stxx, theme);

                    // PD-1332 Restore timeframe from workspace
                    if (data.startTime && data.endTime) {
                        pChartRenderingUtilsService.setRange(new Date(data.startTime),
                            new Date(data.endTime),
                            data.layout.periodicity,
                            data.layout.interval);
                    }
                });
                serviceObj.currentViewTemplate = data;
                
                tool.broadcast('viewTemplateSet');

            }


            function volumePanelIsShownInWorkspace(workspace) {
                if (!workspace) {
                    return false;
                }
                if (!workspace.filterDescription) {
                    return false;
                }
                if (!workspace.filterDescription.addedStudies) {
                    return false;
                }

                var vchart = _.find(workspace.filterDescription.addedStudies, function (e) {
                    return e.propName === "vchart";
                });
                return vchart && vchart.included;
            }

            function removeTemplate(template) {
                var modalInstance = coreNotificationService.notifyYesNo('Remove View', "Are you sure you want to delete '" + template.name + "'?");
                return modalInstance.result.then(function (id) {
                    if (id === 0) {
                        return removeViewTemplate(template).then(function () {
                            serviceObj.currentViewTemplate = null;
                            return getOrRefreshViewTemplates();

                        });
                    }
                });
            }

            function refreshChart(cb) {
                //AS: this is the same as cru.refreshChart except that it does not remove / restore TGPS. Why??
                var primaryProduct = filterDescription.primaryProduct;
                if (!primaryProduct) {
                    cb();
                    return;
                }
                pChartRenderingUtilsService.createChart(primaryProduct, cb);
            }

            function editTemplate(viewTemplate) {
                var modalInstance = tool.openModalByDefinition('p.chart.SaveWorkspaceController', {
                    viewTemplate: viewTemplate,
                    templateMode: 'EDIT'
                });
            }



            function getOrRefreshViewTemplates() {
                return getViewTemplates().then(function (viewTemplates) {
                    serviceObj.viewTemplates = viewTemplates;
                });
            }

            function generateCurrentViewData() {

                // we copy the whole layout and drawing, but is it necessary
                var data = getCurrentDrawings(pChartRenderingUtilsService);
                data.filterDescription = {};

                // copy whatever in filter description
                copyFilterDescription(filterDescription, data.filterDescription);

                // Save TraderGPS
                if (pChartTgpsService.tradersGpsMode) {
                    data.tradersGpsMode = pChartTgpsService.tradersGpsMode;
                    data.tradersGPSPositionStudies = {};
                    data.tradersGPSSwingStudies = {};
                    data.tradersGPSPlusStudies = {};
                    data.isGpsSwingEnabled = pChartTgpsService.tradersgps_swing.mode === 'Swing';
                    data.gpsMode = pChartTgpsService.tradersgps_swing.mode;
                    angular.copy(pChartTgpsService.tradersGPSPositionStudies, data.tradersGPSPositionStudies);
                    angular.copy(pChartTgpsService.tradersGPSSwingStudies, data.tradersGPSSwingStudies);
                    angular.copy(pChartTgpsService.tradersGPSPlusStudies, data.tradersGPSPlusStudies);
                }

                data.filterDescription.panelProportions = {};
                for (var panelName in pChartRenderingUtilsService.stxx.panels) {
                    data.filterDescription.panelProportions[panelName] = pChartRenderingUtilsService.stxx.panels[panelName].percent;
                }

                // PD-1332 Get start-date and end-date for rendering later
                var xAxis = pChartRenderingUtilsService.stxx.chart.xaxis;
                data.startTime = xAxis[0].DT;
                data.endTime = xAxis[xAxis.length - 1].DT;
                return data;
            }
            
            function isProductIncluded() {
                if (serviceObj.currentViewTemplate) {
                    return serviceObj.currentViewTemplate.filterDescription.primaryProduct != null;
                } else {
                    return filterDescription.primaryProduct != null;
                }
            }            

            function dataURItoBlob(dataURI) {
                // convert base64 to raw binary data held in a string
                // doesn't handle URLEncoded DataURIs
                var byteString = atob(dataURI.split(',')[1]);

                // separate out the mime component
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

                // write the bytes of the string to an ArrayBuffer
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                // write the ArrayBuffer to a blob, and you're done
                var bb = new Blob([ab], { type: 'application/octet-stream' });
                return bb;
            }

            function getImageBase64() {
                var deferred = tool.defer();
                var stxx = pChartRenderingUtilsService.stxx;

                STXSocial.createImage(stxx, null, null, null, function (imgData) {
                    var shareID = STX.uniqueID();
                    var startOffset = stxx.getStartDateOffset();
                    var metaData = {
                        "Layout": stxx.exportLayout(),
                        "Drawings": stxx.serializeDrawings(),
                        "XOffset": startOffset,
                        "StartDate": stxx.chart.dataSegment[startOffset].Date,
                        "EndDate": stxx.chart.dataSegment[stxx.chart.dataSegment.length - 1].Date,
                        "ShareId": shareID,
                        "Symbol": stxx.chart.symbol
                    };
                    var payload = { ShareId: shareID, ImageAsBytes: imgData, Metadata: metaData };
                    deferred.resolve(payload);
                });
                return deferred.promise;
            }

            function setAsDefaultTemplate(template) {
                coreDataStorageService.set("defaultViewTemplatesId", template.id);
                serviceObj.defaultTemplateId = template.id;
            }

            function isValidName(name) {
                return name && name.length >= 2 && name.length <= 30;
            }

            function tryUnsetAsDefaultTemplate(template) {
                var currentDefaultTemplateId = getDefaultTemplateId();
                if (currentDefaultTemplateId == template.id) {
                    coreDataStorageService.set("defaultViewTemplatesId", null);
                    serviceObj.defaultTemplateId = null;
                }
            }

            function getDefaultTemplateId() {
                serviceObj.defaultTemplateId = coreDataStorageService.get("defaultViewTemplatesId");
                return serviceObj.defaultTemplateId;
            }

            function toggleDefaultTemplate(template) {
                var currentDefaultTemplateId = getDefaultTemplateId();
                var templateId = null;
                if (currentDefaultTemplateId == template.id) {
                    templateId = null;
                } else {
                    templateId = template.id;
                }
                coreDataStorageService.set("defaultViewTemplatesId", templateId);
                serviceObj.defaultTemplateId = templateId;
            }

            function notifyWorkspaceSaved(ws) {
                var message = "Workspace '" + ws.name + "' has been successfully updated. ";
                if (!ws.filterDescription.primaryProduct) {
                    message += "Product(s) and drawing(s) are excluded from the workspace.";
                }
                coreNotificationService.notifySuccess('Success', message);

            }

            function quickSave(template) {
                if (!isProductIncluded()) {
                    excludeProductFromTemplate(template);
                }
                return saveViewTemplate(template).then(function () {
                    getOrRefreshViewTemplates();
                });;
            }

            function saveViaWizard(viewTemplate, mode) {
                mode = mode || 'SAVE';
                var modalInstance = tool.openModalByDefinition('p.chart.SaveWorkspaceController', {
                    viewTemplate: viewTemplate,
                    templateMode: mode
                });
                return modalInstance.result;
            }

            function gatherCurrentState(viewTemplate) {
                if (!viewTemplate.addOnSettings) {
                    viewTemplate.addOnSettings = {};
                }
                viewTemplate.addOnSettings.isDrawingShown = pChartService.isDrawingShown;
                viewTemplate.addOnSettings.enableVerticalMove = pChartRenderingUtilsService.enableVerticalMove;
                viewTemplate.filterDescription.normalizeToPercentage = filterDescription.normalizeToPercentage;
                viewTemplate.filterDescription.showLegendsOnChart = filterDescription.showLegendsOnChart;
            }
            function saveCurrentView(isNewName) {
                var viewTemplate = generateCurrentViewData();

                if (serviceObj.currentViewTemplate) {
                    viewTemplate.id = serviceObj.currentViewTemplate.id;
                    viewTemplate.name = serviceObj.currentViewTemplate.name;
                }
                var p = null;
                if (!serviceObj.currentViewTemplate || isNewName) {
                    gatherCurrentState(viewTemplate);
                    p = saveViaWizard(viewTemplate);
                } else if (!isValidName(viewTemplate.name)) {
                    p = saveViaWizard(viewTemplate, 'EDIT');
                } else {
                    gatherCurrentState(viewTemplate);
                    p = quickSave(viewTemplate);

                }

                return p.then(getOrRefreshViewTemplates);
            }

            function excludeProductFromTemplate(viewTemplate) {
                viewTemplate.filterDescription.primaryProduct = null;
                viewTemplate.drawings = [];
                viewTemplate.filterDescription.myProducts = [];
            }

            tool.setServiceObjectProperties({
                excludeProductFromTemplate: excludeProductFromTemplate,
                notifyWorkspaceSaved: notifyWorkspaceSaved,
                isValidName: isValidName,
                loadDefaultTemplate: loadDefaultTemplate,
                setAsDefaultTemplate: setAsDefaultTemplate,
                tryUnsetAsDefaultTemplate: tryUnsetAsDefaultTemplate,
                toggleDefaultTemplate: toggleDefaultTemplate,
                getDefaultTemplateId: getDefaultTemplateId,
                saveViewTemplate: saveViewTemplate,
                getViewTemplates: getViewTemplates,
                getImageBase64: getImageBase64,
                dataURItoBlob: dataURItoBlob,
                currentViewTemplate: null,
                setAsCurrentTemplate: setAsCurrentTemplate,
                saveCurrentView: saveCurrentView,
                removeTemplate: removeTemplate,
                getOrRefreshViewTemplates: getOrRefreshViewTemplates,
                editTemplate: editTemplate,
                isProductIncluded: isProductIncluded
            });

        }
    );