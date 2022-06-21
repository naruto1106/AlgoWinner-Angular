agmNgModuleWrapper('agms.chart')
    .defineService("pChartRenderingUtilsService",
        [
            'sProductHistoricalDataService',
            'pChartFilterDescriptionService',
            'commonEnumResolverService',
            'pChartPeriodicityService',
            'sChartStudyService'
        ],
        function (serviceObj, dep, tool) {
            var $rootScope = dep.$rootScope,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                coreSignalRMarketDataService = dep.coreSignalRMarketDataService,
                sProductHistoricalDataService = dep.sProductHistoricalDataService,
                commonEnumResolverService = dep.commonEnumResolverService,
                pChartPeriodicityService = dep.pChartPeriodicityService,
                sChartStudyService = dep.sChartStudyService;

            var filterDescription = pChartFilterDescriptionService;
            var timeoutTimer = null;

            var yAxisStorage = [];
            var chartCreatedCallbackFuncs = {};

            function getHighlightedSeries(renderer) {
                if (renderer.seriesParams) {
                    var highlightedSeries = renderer.seriesParams.filter(function (f) { return f.highlight; });
                    if (highlightedSeries.length > 0) {
                        return highlightedSeries[0];
                    }
                }
                return null;
            }

            // ---------------------------------- Private functions
            // Y Axis
            function getYAxis(cru, rendererName) {
                axis = yAxisStorage[rendererName];
                if (!axis) {
                    var axis = new STXChart.YAxis();
                    axis.position = "right";
                    axis.textStyle = '#fff';
                    axis.initialMarginTop = serviceObj.standardPanelMargin.top;
                    axis.scroll = 50;
                    axis.initialMarginBottom = serviceObj.standardPanelMargin.bottom;
                    cru.stxx.calculateYAxisMargins(axis);
                    yAxisStorage[rendererName] = axis;
                }
                return axis;
            }

            // Chart timeout handling 
            function startTimeout(cru) {
                if (!cru.realTimeMode)
                    return;

                var stxx = cru.stxx;
                if (stxx.chart.dataSet.length) {
                    var barSize = filterDescription.barSize;
                    if (timeoutTimer) {
                        clearTimeout(timeoutTimer);
                    }
                    var gap = pChartPeriodicityService.barSizeToSeconds(barSize) * 1000;
                    var now = (new Date()).getTime();
                    var nextTick = now - now % gap;
                    while (nextTick < now) nextTick += gap;
                    if (nextTick - now > 1000) {
                        timeoutTimer = setTimeout(timeoutFunction, nextTick - now - 1000);
                    }
                }
            }

            function timeoutFunction() {
                if (!filterDescription.primaryProduct || filterDescription.primaryProduct.AssetType === "Indices") {
                    return;
                }

                var stxx = serviceObj.stxx;
                var lastDataSet = stxx.chart.dataSet[stxx.chart.dataSet.length - 1];
                var nextInterval = stxx.getNextInterval(lastDataSet.DT, stxx.layout.periodicity);
                var now = new Date();
                if (now > nextInterval) {
                    sProductHistoricalDataService.IsMarketOpen({ productId: stxx.chart.symbolObject.ProductId }).then(function (e) {
                        if (e.data) {
                            stxx.streamTrade({ last: lastDataSet.Close, volume: 0 });
                            // TODO: MaRa: We can enable this for gap in secondary product, but problem is the timeout only based on primary products
                            var secondaryProducts = stxx.chart.seriesRenderers.products.seriesParams.filter(function (f) {
                                return f.field.indexOf(" ") < 0;
                            });

                            for (var i = 0; i < secondaryProducts.length; i++) {
                                var s = secondaryProducts[i];
                                if (!lastDataSet[s.field]) {
                                    stxx.streamTrade({ last: lastDataSet[s.field], volume: 0 }, now, s.field);
                                }
                            }
                            setTimeout(function () {
                                stxx.mousemove(serviceObj.lastEvent);
                            }, 1000);
                        }
                    });
                }
                var gap = pChartPeriodicityService.barSizeToSeconds(filterDescription.barSize) * 1000;
                now = (new Date()).getTime();
                var nextTick = now - now % gap;
                while (nextTick < now) nextTick += gap;
                if (nextTick - now > 1000) {
                    timeoutTimer = setTimeout(timeoutFunction, nextTick - now - 1000);
                }
            }

            function onChartCreatedCallback(cru) {
                for (var prop in chartCreatedCallbackFuncs) {
                    var func = chartCreatedCallbackFuncs[prop];
                    func(cru.stxx);
                }
            }
            
            // Object handling
            function getHighlightedDrawing(cru) {
                return cru.stxx.drawingObjects.filter(function (u) {
                    return u.highlighted;
                })[0];
            }

            function getHighlightedSeriesRenderer(renderer) {
                for (var key in renderer) {
                    if (renderer.hasOwnProperty(key)) {
                        var highlightedSeries = renderer[key].seriesParams.filter(function (f) {
                            return f.highlight;
                        });
                        if (highlightedSeries.length > 0) {
                            return highlightedSeries[0];
                        }
                    }
                }
                return null;
            }
            
            function subscribeRealTimeData(ProductModel) {
                if (!serviceObj.realTimeMode)
                    return;

                coreSignalRMarketDataService.invoke(ProductModel.TradeVenueLoc, "SubscribeMarketData",
                    ProductModel.ProductId,
                    commonEnumResolverService.getAssetTypeId(ProductModel.AssetType),
                    ProductModel.Symbol,
                    commonEnumResolverService.getTradeVenueLocId(ProductModel.TradeVenueLoc)
                ).then(
                    function () {
                        tool.log("Subscribe to Market Data");
                    }, function () {
                        tool.logError("Error invoking subscribe to Market Data");
                    });
            }

            function registerOnChartCreatedCallback (id, func) {
                chartCreatedCallbackFuncs[id] = func;
            }

            function getChartLineRendererOrNew(rendererName, separateYAxis) {
                var renderer = serviceObj.stxx.getSeriesRenderer(rendererName);
                if (!renderer) {
                    var defaultParam = {
                        type: "line",
                        gaps: { pattern: [5, 5] },
                        name: rendererName,
                        width: 2
                    };
                    renderer = serviceObj.stxx.setSeriesRenderer(new STX.Renderer.Lines({
                        params: defaultParam
                    }));
                };
                if (separateYAxis) {
                    var axis = getYAxis(serviceObj, rendererName);
                    renderer.params.yAxis = axis;
                } else {
                    renderer.params.yAxis = false;
                }
                return renderer;
            }
            
            function setBarSize(sizeVal) {
                filterDescription.barSize = sizeVal;
                if (sizeVal === "1 M") {
                    serviceObj.stxx.dontRoll = false;
                } else {
                    serviceObj.stxx.dontRoll = true;
                }

                var periodicity = pChartPeriodicityService.getPeriodicity(filterDescription.barSize);

                serviceObj.stxx.setPeriodicityV2(periodicity[0], periodicity[1], null, function () {
                    onChartCreatedCallback(serviceObj);
                    tool.broadcast('onChartBarSizePickerChanged');                    
                });
            }

            function setRange(fromDate, toDate, period, interval, cb) {
                serviceObj.stxx.setRange({
                    dtLeft: new Date(fromDate),
                    dtRight: new Date(toDate),
                    padding: 0,
                    periodicity: {
                        period: period,
                        interval: interval
                    }
                }, function () {
                    if (filterDescription.primaryProduct) {
                        startTimeout(serviceObj);
                    }
                    if (cb) cb();
                });
            }

            function refreshChart(forcerefresh) {
                var primaryProduct = filterDescription.primaryProduct;
                if (!primaryProduct) {
                    return tool.when();
                }
                var deferred = tool.defer();

                serviceObj.createChart(primaryProduct, function () {
                    deferred.resolve();
                }, forcerefresh);
                return deferred.promise;
            }

            function createChart(primaryProduct, cb, forcerefresh) {
                serviceObj.subscribeRealTimeData(primaryProduct);
                if (!window.stxx) window.stxx = serviceObj.stxx; // for debugging
                if (!window.cru) window.cru = serviceObj;

                function serviceObjCallback() {
                    onChartCreatedCallback(serviceObj);
                    startTimeout(serviceObj);
                    if (cb) cb();
                }

                serviceObj.stxx.setComparison(serviceObj.isComparisonMode);
                if (serviceObj.stxx.chart.symbolObject === primaryProduct && !forcerefresh) {
                    tool.log('Primary product does not change');
                    serviceObjCallback();
                } else {
                    tool.log('Primary product does change. Rerender the chart now');
                    serviceObj.stxx.newChart(primaryProduct, null, null, serviceObjCallback);
                }
                if (serviceObj.stxx.layout.studies) {
                    filterDescription.addedStudies.forEach(function (study) {
                        if (study.sd && study.included && !serviceObj.stxx.layout.studies[study.stxxStudy]) {
                            if (study.sd.parameters) {
                                delete study.sd.parameters.replaceID;
                            }
                            study.stxxStudy = sChartStudyService.addStudy(study).name;
                        } else {
                            tool.logWarn('sd is undefined!');
                        }
                    });
                    for (var panelName in filterDescription.panelProportions) {
                        if (serviceObj.stxx.panels[panelName]) {
                            serviceObj.stxx.panels[panelName].percent = filterDescription.panelProportions[panelName] || 0.1;
                        }
                    }
                }
                $rootScope.$broadcast('onPrimaryProductChanged', primaryProduct);
            }

            function drawCrosshairHighlight() {
                var boxWidth = serviceObj.stxx.layout.candleWidth;
                var crossHairHighlight = document.getElementById('crosshair-highlighter');
                if (crossHairHighlight) {
                    crossHairHighlight.style.left = "" + -Math.floor(boxWidth / 2) + "px";
                    crossHairHighlight.style.width = "" + boxWidth + "px";
                }
            }
            
            function prependAdjustPanelPositions() {
                var stxx = serviceObj.stxx;
                for (var i in stxx.panels) {
                    var panel = stxx.panels[i];
                    if (i !== "chart") {
                        var zoom = serviceObj.standardPanelMargin.top + serviceObj.standardPanelMargin.bottom;
                        var shift = (serviceObj.standardPanelMargin.top - serviceObj.standardPanelMargin.bottom) / 2;
                        panel.yAxis.scroll = shift;
                        panel.yAxis.zoom = zoom;
                    }
                }
                setTimeout(function () { stxx.draw(); }, 0);
            }

            function appendStackPanel(panelName) {
                var stxx = serviceObj.stxx;
                if (stxx) {
                    var panel = stxx.panels[panelName];
                    if (panel) {
                        var zoom = serviceObj.standardPanelMargin.top + serviceObj.standardPanelMargin.bottom;
                        var shift = (serviceObj.standardPanelMargin.top - serviceObj.standardPanelMargin.bottom) / 2;
                        panel.yAxis.scroll = shift;
                        panel.yAxis.zoom = zoom;
                        setTimeout(function () { stxx.draw(); }, 0);
                    }
                }
            }
            
            function init(quoteFeedObj) {
                // MaRa: Warning - as soon as new STXChart is invoked, all hook in ciqHookService becomes active
                serviceObj.stxx = new STXChart({
                    container: $$$(".chartContainer"),
                    layout: { "candleWidth": 16, "crosshair": true }
                });
                serviceObj.stxx.dontRoll = true;
                serviceObj.stxx.setMarket({
                    hour_aligned: true
                });
                serviceObj.stxx.markerDelay = null;
                serviceObj.stxx.swipeRelease = function () { };
                serviceObj.stxx.calendarAxis = true;
                serviceObj.stxx.reverseMouseWheel = true;
                serviceObj.stxx.chart.cleanupGaps = true;
                //serviceObj.stxx.minimumCandleWidth = 4;
                serviceObj.stxx.chart.yAxis.initialMarginTop = serviceObj.standardPanelMargin.top;
                serviceObj.stxx.chart.yAxis.initialMarginBottom = serviceObj.standardPanelMargin.bottom;

                serviceObj.stxx.chart.yAxis.goldenRatioYAxis = false;
                serviceObj.stxx.streamParameters.fillGaps = false;

                serviceObj.stxx.attachQuoteFeed(quoteFeedObj, {
                    refreshInterval: null
                });
                serviceObj.stxx.maxDataSetSize = 60000;
                serviceObj.stxx.setAdjusted(false);
                serviceObj.stxx.setPeriodicityV2(1, "day");
                serviceObj.stxx.preferences.labels = false;
                serviceObj.stxx.yTolerance = 1;

                //STX.Drawing.prototype.permanent = true;
                STX.Drawing.prototype.dragToDraw = true;

                STXChart.prototype.changeOccurred = function (originalFn, stxx) {
                    return function (change) {
                        // MaRa: Kept for user with preference of continuous drawing
                        //var exceptions = ["continuous", "freeform"];
                        //if (change === "vector" && exceptions.indexOf(stxx.currentVectorParameters.vectorType) === -1) {
                        //    stxx.changeVectorType("");
                        //}
                        if (change === "vector") {
                            $rootScope.$broadcast('onStepDrawingCompleted', null);
                        }
                        originalFn.call(this, change);
                    };
                }(STXChart.prototype.changeOccurred, serviceObj.stxx);

                function setLineColor() {
                    return function (color) {
                        var highlightedDrawing = getHighlightedDrawing(serviceObj);
                        if (color === "000000" || color === "ffffff") highlightedDrawing.color = "auto";
                        else highlightedDrawing.color = "#" + color;
                    };
                }

                function setFillColor() {
                    return function (color) {
                        var highlightedDrawing = getHighlightedDrawing(serviceObj);
                        highlightedDrawing.fillColor = "#" + color;
                    };
                }

                function setSeriesColor() {
                    return function (color) {
                        var highlightedDrawing = getHighlightedSeriesRenderer(serviceObj.stxx.chart.seriesRenderers);
                        highlightedDrawing.color = "#" + color;
                    };
                }

                var swatchLine = $$$("#drawingColorPicker .stx-color");
                STX.MenuManager.attachColorPicker(swatchLine, $$$("#drawingDialog"), setLineColor(), true);
                var swatchFill = $$$("#drawingFillColorPicker .stx-color");
                STX.MenuManager.attachColorPicker(swatchFill, $$$("#drawingDialog"), setFillColor(), true);
                var swatchSeries = $$$("#seriesColorPicker .stx-color");
                STX.MenuManager.attachColorPicker(swatchSeries, $$$("#seriesDialog"), setSeriesColor(), true);

                serviceObj.stxx.controls.annotationCancel.style.marginLeft = "";

                var mouseDeleteInstr = $$$("#mouseDeleteInstructions");
                mouseDeleteInstr.innerHTML = "right-click to edit/delete";

                var crosshairHighlighter = document.createElement("DIV");
                crosshairHighlighter.id = 'crosshair-highlighter';
                serviceObj.stxx.controls.crossX.appendChild(crosshairHighlighter);

                STX.fixScreen = function () { }; //noop for fixScreen to prevent scrolltotop
            }

            STXChart.prototype.determineMinMax = (function (fn) {
                var filter_fn = function (securities, legends) {
                    return function (elm) {
                        if (elm.indexOf(" ") !== -1) {
                            return legends.indexOf(elm) !== -1;
                        }
                        if (securities.indexOf(elm) !== -1) return true;
                        if (['High', 'Close', 'Low'].indexOf(elm) !== -1) return true;
                    };
                };
                return function (quotes, fields, sum, bypassTransform) {
                    if (serviceObj.stxx.chart.seriesRenderers.products) {
                        var seriesParams = serviceObj.stxx.chart.seriesRenderers.products.seriesParams;
                        var renderingFields = _.map(seriesParams,
                            function (e) {
                                return e.field;
                            });
                        var visible = _.filter(filterDescription.productFundamentals, function (pf) {
                            return pf.included;
                        });
                        var legends = _.map(visible, function (e) { return e.legend; });
                        fields = _.filter(fields, filter_fn(renderingFields, legends));
                    }
                    var minMax = fn(quotes, fields, sum, bypassTransform);
                    if (minMax[0] === minMax[1]) {
                        minMax[0] *= 0.9;
                        minMax[1] *= 1.1;
                    }
                    return minMax;
                };
            })(STXChart.prototype.determineMinMax);

            STXChart.prototype.displaySticky = (function (fn) {
                return function (message, backgroundColor, forceShow, noDelete, type) {
                    var oldValueOfTouchDetected = STX.touchDevice;
                    // assume that if you have keyboard, you have mouse, so the right-click to edit/delete message can be legitly displayed
                    STX.touchDevice = STX.noKeyboard;
                    fn.call(this, message, backgroundColor, forceShow, noDelete, type);
                    STX.touchDevice = oldValueOfTouchDetected;
                };
            })(STXChart.prototype.displaySticky);

            STX.Market.prototype.newIterator = (function (fn) {
                return function (obj) {
                    if (obj.interval === 1) {
                        var units = 60 * 1000 * obj.interval * obj.periodicity;
                        obj.begin = new Date(obj.begin.getTime() - obj.begin.getTime() % units);
                    } else if (obj.interval === 30) {
                        var units = 60 * 1000 * obj.interval * obj.periodicity;
                        var dt = obj.begin.getTime();
                        dt += 3600000;
                        dt -= dt % units;
                        dt -= 3600000;
                        obj.begin = new Date(dt);
                    }
                    return fn.call(this, obj);
                };
            })(STX.Market.prototype.newIterator);

            tool.setServiceObjectProperties({
                isDesktopDrawing: false,
                appendStackPanel: appendStackPanel,
                prependAdjustPanelPositions: prependAdjustPanelPositions,
                drawCrosshairHighlight: drawCrosshairHighlight,
                standardPanelMargin: {
                    top: 5,
                    bottom: 5
                },
                stxx: null,
                enableVerticalMove: false,
                isComparisonMode: false,

                // Getter
                getChartLineRendererOrNew: getChartLineRendererOrNew,
                getHighlightedSeries: getHighlightedSeries,
                getHighlightedSeriesRenderer: getHighlightedSeriesRenderer,
                getHighlightedDrawing: getHighlightedDrawing,

                // Setter
                setBarSize: setBarSize,
                setRange: setRange,

                // Chart function
                refreshChart: refreshChart,
                createChart: createChart,
                registerOnChartCreatedCallback: registerOnChartCreatedCallback,

                // Market data handling
                subscribeRealTimeData: subscribeRealTimeData,
                init: init
            });
        }
    );