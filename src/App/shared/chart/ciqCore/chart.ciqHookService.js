agmNgModuleWrapper('agms.chart')
    .defineService("sChartIqHookService", ['pChartRenderingUtilsService', 'pChartPeriodicityService', 'pChartFilterDescriptionService', 
        'pChartThemeService', 'sChartXaxisCustomizer', 'pChartFundamentalHelperService', 'sChartStudyService', 'sTgpsStudyService',
        'sChartDrawingService', 'sChartSeriesDialogService', 'pChartTgpsService'],
    function (serviceObj, dep, tool) {
        var $rootScope = dep.$rootScope;
        var pChartRenderingUtilsService = dep.pChartRenderingUtilsService;
        var pChartPeriodicityService = dep.pChartPeriodicityService;
        var pChartFilterDescriptionService = dep.pChartFilterDescriptionService;
        var pChartThemeService = dep.pChartThemeService;
        var sChartXaxisCustomizer = dep.sChartXaxisCustomizer;
        var pChartFundamentalHelperService = dep.pChartFundamentalHelperService;
        var sChartStudyService = dep.sChartStudyService;
        var pChartTgpsService = dep.pChartTgpsService;
        var sTgpsStudyService = dep.sTgpsStudyService;
        var sChartDrawingService = dep.sChartDrawingService;
        var sChartSeriesDialogService = dep.sChartSeriesDialogService;

        var filterDescription = pChartFilterDescriptionService;

        var enableSeriesColorPicker = true; // MaRa: Enable this for fundamental color picker

        function getAxisLegendText(yAxis, panelName, panel) {
            if (panelName === 'chart') {
                if (pChartFilterDescriptionService.normalizeToPercentage) {
                    return '%';
                }

                if (panel.yAxis === yAxis) {
                    // main Price y-axis
                    return 'Price';
                }
                for (var rendererName in panel.chart.seriesRenderers) {
                    if (panel.chart.seriesRenderers[rendererName].params.yAxis === yAxis) {
                        return pChartFundamentalHelperService.getFriendlyName(rendererName);
                    }
                }
            }
            if (panelName === 'vchart' || panelName.indexOf('vchart') > -1) {
                return 'Volume';
            }

            // For TGPS panel
            var tgpsPanel = ['com', 'tif', 'cci5', 'sif', 'odds'];
            if (tgpsPanel.indexOf(panelName) > -1) return panelName.toUpperCase();

            return '';
        }

        function init() {
            // MaRa: This class will host generic chart IQ append / prepend hook overriding
            // WARNING: Try to minimize runtime of each hook because it might slow down the rendering

            // BEFORE EVENT
            STXChart.prototype.prepend("adjustPanelPositions", function () {
                pChartRenderingUtilsService.prependAdjustPanelPositions();
            });
                
            STXChart.prototype.prepend("draw", function () {
                //var stxx = pChartRenderingUtilsService.stxx;
                if (!pChartRenderingUtilsService.enableVerticalMove) {
                    this.chart.yAxis.scroll = 0;
                }
            });

            STXChart.prototype.prepend("displayChart", function (chart) {
                if (filterDescription.ExtendedChartType === 'high_line') {
                    var parameters={
                        pattern: "solid",     // options: "solid","dashed","dotted"
                        lineWidth: 1            // select any with for the line
                    };

                    for (var i = 1; i < stxx.chart.dataSet.length; i++) {
                        var prevBar = stxx.chart.dataSet[i-1];
                        var bar = stxx.chart.dataSet[i];
                        var x0 = stxx.pixelFromDate(prevBar.Date, stxx.chart);
                        var x1 = stxx.pixelFromDate(bar.Date, stxx.chart);
                        var y0 = stxx.pixelFromPrice(prevBar.High, stxx.chart.panel);
                        var y1 = stxx.pixelFromPrice(bar.High, stxx.chart.panel);
                        stxx.plotLine(x0, x1, y0, y1, "blue", "segment", stxx.chart.context, false, parameters);                                      
                    }
                }

                //if (!filterDescription.primaryProduct.included) {
                //    return true;
                //}

                //var currentTheme = pChartThemeService.getCurrentTheme();
                //pChartTgpsService.prependDisplayChart();
            });

            STXChart.prototype.prepend("drawCurrentHR", function () {
                var chart = this.chart;
                var lastDataSet = _.last(chart.dataSet);
                if (lastDataSet) chart.yAxis.drawCurrentPriceLabel = lastDataSet.Close <= chart.panel.yAxis.high;
            });

            STXChart.prototype.prepend("mousemoveinner", function () {
                // always display crosshair regardless
                if (pChartRenderingUtilsService.stxx.currentVectorParameters.vectorType && pChartRenderingUtilsService.isDesktopDrawing) {
                    STX.Drawing[this.currentVectorParameters.vectorType].prototype.dragToDraw = false;
                }
            });

            STXChart.prototype.prepend("headsUpHR", function () {
                var tick = this.crosshairTick;
                var price = this.chart.dataSet[tick];

                if (!filterDescription.primaryProduct) {
                    return;
                }

                if (price) {
                    price.Currency = filterDescription.primaryProduct.Currency;
                    price.TradeVenueLoc = filterDescription.primaryProduct.TradeVenueLoc;
                }

                pChartRenderingUtilsService.selectedItemInfo = {
                    tick: tick,
                    price: {
                        data: price
                    }
                };
                $rootScope.$broadcast('chartSelectedItemInfo', pChartRenderingUtilsService.selectedItemInfo);
            });
                
            STXChart.prototype.prepend("panelClose", function (panel) {
                pChartTgpsService.adjustExtraViewStatesForPanel(panel);
            });               

            STXChart.prototype.prepend("createXAxis", function (chart) {
                sChartXaxisCustomizer.prependCreateXAxis(chart);
            });

            STXChart.prototype.prepend("createYAxis", function (panel, parameters) {
                if (parameters.yAxis) {
                    var stxx = pChartRenderingUtilsService.stxx;
                    var yAxis = parameters.yAxis;
                    if (yAxis === stxx.chart.yAxis) {
                        if (yAxis.high < 0.001 || yAxis.high - yAxis.low < 0.001) {
                            yAxis.pretty = false;
                            yAxis.minimumPriceTick = 0.0001;
                            yAxis.decimalPlaces = 4;
                        } else if (yAxis.high < 0.01 || yAxis.high - yAxis.low < 0.01) {
                            yAxis.pretty = false;
                            yAxis.minimumPriceTick = 0.001;
                            yAxis.decimalPlaces = 3;
                        } else {
                            yAxis.idealTickSizePixels = 25;
                            yAxis.pretty = true;
                            yAxis.minimumPriceTick = null;
                            yAxis.decimalPlaces = 3;
                        }
                    }
                }
            });
                
            STXChart.prototype.prepend("drawXAxis", function (chart, axisRepresentation) {
                sChartXaxisCustomizer.prependDrawXAxis(chart, axisRepresentation);
            });

            // clear any text that occupies top portion of xaxis to give space for the label           
            STXChart.prototype.prepend("plotYAxisText", function (panel) {
                _.forEach(panel.yaxisRHS,
                    function (yAxis) {
                        yAxis.legend = getAxisLegendText(yAxis, panel.name, panel);

                        if (!yAxis.yAxisPlotter || !yAxis.legend) {
                            return;
                        }
                        var allowance = (yAxis.legend.split(' ').length + 1) * 15;

                        var threshold = yAxis.top + allowance;
                        var textPlotter = _.find(yAxis.yAxisPlotter.seriesArray,
                            function (arr) {
                                return arr.name === 'text';
                            }) || yAxis.yAxisPlotter.seriesMap.text;

                        if (textPlotter) {
                            textPlotter.text = _.filter(textPlotter.text, function (t) { return t.y > threshold; });
                            textPlotter.color = pChartThemeService.getCurrentTheme() === 'Dark' ? '#fff' : '#333';
                        }

                        if (textPlotter && textPlotter.text) {
                            // Hack PD-1454 - This is an internal bug of chartIQ
                            // As we don't want to modify stxKernalOs, we override the yAxis text here
                            textPlotter.text.forEach(function (t) {
                                if (t.text === "1000k") t.text = '1.00m';
                                if (t.text.indexOf('m') > -1) {
                                    var number = parseFloat(t.text.replace('m', ''), 10);
                                    t.text = number.toFixed(1) + 'm';
                                }
                            });
                        }
                    });
            });
            
            STXChart.prototype.prepend("deleteHighlighted", function () {
                if (!enableSeriesColorPicker) {
                    $rootScope.$broadcast('onStxDeleteHighlighted', null);
                } else {
                    if (pChartRenderingUtilsService.stxx) {
                        var highlightedSeries = pChartRenderingUtilsService.getHighlightedSeriesRenderer(pChartRenderingUtilsService.stxx.chart.seriesRenderers);
                        if (highlightedSeries) {
                            sChartSeriesDialogService.configureSeries(pChartRenderingUtilsService, highlightedSeries);
                            return true;
                        }
                    }
                }

                sTgpsStudyService.adjustExtraViewStatesForHighlightedLine(pChartRenderingUtilsService);
                var highlightedDrawing = pChartRenderingUtilsService.getHighlightedDrawing(pChartRenderingUtilsService);
                if (highlightedDrawing) {
                    sChartDrawingService.configureDrawing(pChartRenderingUtilsService, highlightedDrawing);
                    return true;
                }
                for (var overlayName in pChartRenderingUtilsService.stxx.overlays) {
                    var overlay = pChartRenderingUtilsService.stxx.overlays[overlayName];
                    if (overlay.highlight) {
                        $rootScope.$broadcast('onStxDeleteOverlay', overlayName);
                    }
                }
            });
            
            // AFTER EVENT
            STXChart.prototype.append("draw", function () {
                $rootScope.$broadcast('onStxChartDrawn', null);
                pChartRenderingUtilsService.drawCrosshairHighlight();
                pChartTgpsService.appendDraw();
            });

            STXChart.prototype.append("mousemove", function (e) {
                pChartRenderingUtilsService.lastEvent = e;
            });

            STXChart.prototype.append("mousemoveinner", function () {
                //restore dragToDraw
                if (pChartRenderingUtilsService.stxx.currentVectorParameters.vectorType) {
                    STX.Drawing[this.currentVectorParameters.vectorType].prototype.dragToDraw = pChartRenderingUtilsService.isDesktopDrawing;
                }
            });

            STXChart.prototype.append("stackPanel", function (panelName) {
                pChartRenderingUtilsService.appendStackPanel(panelName);
            });

            STXChart.prototype.append("createDataSet", function () {
                var dataSet = pChartRenderingUtilsService.stxx.chart.dataSet;
                var barSize = filterDescription.barSize;
                if (["5 Min", "10 Min", "15 Min", "30 Min", "1 H", "2 H"].indexOf(barSize) !== -1) {
                    var gap = pChartPeriodicityService.barSizeToSeconds(barSize);
                    for (var i = 0; i < dataSet.length; i++) {
                        var bar = dataSet[i];
                        var dateTimeStamp = bar.DT.getTime();
                        if (barSize === "2 H") dateTimeStamp += 3600000;
                        dateTimeStamp -= dateTimeStamp % (gap * 1000);

                        if (barSize === "2 H") dateTimeStamp -= 3600000;

                        if (bar.DT.getTime() !== dateTimeStamp) {
                            bar.displayDate = new Date(dateTimeStamp);
                        }
                    }
                }

                pChartTgpsService.appendCreateDataSet();
            });

            STXChart.prototype.append("doDisplayCrosshairs", function () {
                //restore dragToDraw
                if (pChartRenderingUtilsService.stxx.currentVectorParameters.vectorType) {
                    STX.Drawing[this.currentVectorParameters.vectorType].prototype.dragToDraw = pChartRenderingUtilsService.desktopDrawing;
                }

                pChartRenderingUtilsService.drawCrosshairHighlight();
            });

            STXChart.prototype.append("headsUpHR", function () {
                var barSize = filterDescription.barSize;

                var bar = this.barFromPixel(this.cx);
                var prices = this.chart.xaxis[bar];
                var floatDate = this.controls.floatDate;
                if (prices && prices.DT) {
                    var date = prices.DT;
                    if (barSize.indexOf('H') !== -1 || barSize.indexOf("Min") !== -1) {
                        floatDate.innerHTML = moment(date).format("hh:mm A");
                    } else {
                        floatDate.innerHTML = moment(date).format("DD-MMM");
                    }
                }
            });

            STXChart.prototype.append("createYAxis", function (panel, parameters) {
                pChartFundamentalHelperService.appendCreateYAxis(panel, parameters);
            });

            STXChart.prototype.append("drawXAxis", function (chart, axisRepresentation) {
                sChartXaxisCustomizer.appendDrawXAxis(this, chart, axisRepresentation);
            });

            STXChart.prototype.append("panelClose", function (panel) {
                sChartStudyService.tryRemovingStudyByName(panel.name);
            });
        }

        tool.setServiceObjectProperties({
            init: init
        });
    });
