agmNgModuleWrapper('agms.chart')
    .defineService("sTgpsPositionService", [
        'sTgpsService', 'pChartFilterDescriptionService', 'pChartRenderingUtilsService', 'pChartThemeService', 'sChartStudyService',
            'sTgpsStudyService'],
        function (serviceObj, dep, tool) {
            var pChartThemeService = dep.pChartThemeService,
                sChartStudyService = dep.sChartStudyService,
                sTgpsService = dep.sTgpsService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                sTgpsStudyService = dep.sTgpsStudyService,
                $log = dep.$log,
                $rootScope = dep.$rootScope;

            var filterDescription = pChartFilterDescriptionService;
            var positionMarkers = [];
            var tradersGPSPositionStudies = {
                peakVisibility: false,
                setPeakVisibility: function (visibility) {
                    tradersGPSPositionStudies.peakVisibility = visibility;
                    if (!filterDescription.primaryProduct) {
                        return;
                    }

                    tool.log("peak visibility is on product " + filterDescription.primaryProduct.Symbol + " going to change to " + visibility);
                    var tgpsRenderer = sTgpsStudyService.getTgpsRenderer(pChartRenderingUtilsService);
                    var seriesName = getTradersGpsPeakSeriesName(filterDescription.primaryProduct);
                    if (visibility) {
                        pChartRenderingUtilsService.stxx.addSeries(seriesName[0], {
                            display: "Peak Line",
                            data: { useDefaultQuoteFeed: true },
                            type: "line",
                            symbolObject: {
                                tgps: "Peak",
                                product: filterDescription.primaryProduct,
                                symbol: filterDescription.primaryProduct.Symbol
                            },
                            width: 1,
                            pattern: [3, 5],
                            shareYAxis: true,
                            isComparison: filterDescription.normalizeToPercentage,
                        }, function () {
                            tool.log(seriesName[0] + ' to be attached to renderer');
                            tgpsRenderer.ready();
                        });
                        var peakColor = (pChartThemeService.getCurrentTheme() === "Dark") ? "#2eaeff" : "#004470";
                        // when the data can loaded synchronously, we should call .ready() straight away to force redraw
                        tgpsRenderer.attachSeries(seriesName[0], peakColor).ready();
                    } else {
                        if (hasBeenRenderedIn(tgpsRenderer, seriesName[0])) {
                            tool.log(seriesName[0] + ' to be removed from renderer');
                            pChartRenderingUtilsService.stxx.removeSeries(seriesName[0], false);
                        }
                    }
                    // remove the dormant series
                    if (hasBeenRenderedIn(tgpsRenderer, seriesName[1])) {
                        tool.log(seriesName[1] + ' to be removed from renderer');
                        pChartRenderingUtilsService.stxx.removeSeries(seriesName[1], false);
                    }
                },
                togglePeakVisibility: function () {
                    tradersGPSPositionStudies.setPeakVisibility(!tradersGPSPositionStudies.peakVisibility);
                },
                togglePeakLineColor: function () {
                    var tgpsRenderer = sTgpsStudyService.getTgpsRenderer(pChartRenderingUtilsService);
                    var seriesName = getTradersGpsPeakSeriesName(filterDescription.primaryProduct)[0];
                    if (hasBeenRenderedIn(tgpsRenderer, seriesName)) {
                        var peakColor = (pChartThemeService.getCurrentTheme() === "Dark") ? "#2eaeff" : "#004470";
                        if (tgpsRenderer.colors[seriesName].color !== peakColor) {
                            tgpsRenderer.attachSeries(seriesName, peakColor);
                        }
                    }
                },

                troughVisibility: false,
                setTroughVisibility: function (visibility) {
                    tradersGPSPositionStudies.troughVisibility = visibility;
                    tool.log("through visibility is going to change to " + visibility);
                    if (!filterDescription.primaryProduct) {
                        return;
                    }

                    var tgpsRenderer = pChartRenderingUtilsService.getChartLineRendererOrNew('tradersgps_line_renderer');
                    var seriesName = getTradersGpsTroughSeriesName(filterDescription.primaryProduct);
                    if (visibility) {
                        pChartRenderingUtilsService.stxx.addSeries(seriesName[0], {
                            display: "Trough Line",
                            data: { useDefaultQuoteFeed: true },
                            type: "line",
                            symbolObject: {
                                tgps: "Trough",
                                product: filterDescription.primaryProduct,
                                symbol: filterDescription.primaryProduct.Symbol
                            },
                            width: 1,
                            pattern: [3, 5],
                            shareYAxis: true,
                            isComparison: filterDescription.normalizeToPercentage,
                        }, function () {
                            tgpsRenderer.ready();
                        });
                        // when the data can loaded synchronously, we should call .ready() straight away to force redraw
                        tgpsRenderer.attachSeries(seriesName[0], "#ff3c3c").ready();
                    } else {
                        if (hasBeenRenderedIn(tgpsRenderer, seriesName[0])) {
                            pChartRenderingUtilsService.stxx.removeSeries(seriesName[0], false);
                        }
                    }
                    // remove the dormant series
                    if (hasBeenRenderedIn(tgpsRenderer, seriesName[1])) {
                        pChartRenderingUtilsService.stxx.removeSeries(seriesName[1], false);
                    }
                },
                toggleTroughVisibility: function () {
                    tradersGPSPositionStudies.setTroughVisibility(!tradersGPSPositionStudies.troughVisibility);
                },

                comVisibility: false,
                setComVisibility: function (visibility) {
                    tradersGPSPositionStudies.comVisibility = visibility;
                    var studyName = getTradersGpsComStudiesName();
                    if (visibility) {
                        // Study convention is "(studyname)" + "(output)"
                        pChartRenderingUtilsService.stxx.addSeries("com " + studyName[0], {
                            display: "COM",
                            data: { useDefaultQuoteFeed: true },
                            symbolObject: {
                                tgps: "COM",
                                product: filterDescription.primaryProduct,
                                symbol: filterDescription.primaryProduct.Symbol
                            },
                            isComparison: false
                        }, function () {
                            tool.log(studyName[0] + ' to be attached to renderer');
                            // Call this when changing master data
                            pChartRenderingUtilsService.stxx.createDataSet();

                            sChartStudyService.addStudy({
                                propName: studyName[0]
                            });
                        });
                    } else {
                        // remove the dormant series
                        pChartRenderingUtilsService.stxx.removeSeries("com " + studyName[0], false);
                        pChartRenderingUtilsService.stxx.panelClose(pChartRenderingUtilsService.stxx.panels[studyName[0]]);
                    }
                    // remove the dormant series
                    pChartRenderingUtilsService.stxx.removeSeries("com " + studyName[1], false);
                    pChartRenderingUtilsService.stxx.panelClose(pChartRenderingUtilsService.stxx.panels[studyName[1]]);
                },
                toggleComVisibility: function () {
                    tradersGPSPositionStudies.setComVisibility(!tradersGPSPositionStudies.comVisibility);
                },

                tifVisibility: false,
                setTifVisibility: function (visibility) {
                    tradersGPSPositionStudies.tifVisibility = visibility;
                    var studyName = getTradersGpsTifStudiesName();
                    if (visibility) {
                        // Histogram convention is "(studyname)" + "_hist"
                        pChartRenderingUtilsService.stxx.addSeries(studyName[0] + "_hist", {
                            display: "TIF",
                            data: { useDefaultQuoteFeed: true },
                            symbolObject: {
                                tgps: "TIF",
                                product: filterDescription.primaryProduct,
                                symbol: filterDescription.primaryProduct.Symbol
                            },
                            isComparison: false
                        }, function () {
                            tool.log(studyName[0] + ' to be attached to renderer');
                            // Call this when changing master data
                            pChartRenderingUtilsService.stxx.createDataSet();

                            sChartStudyService.addStudy({
                                propName: studyName[0]
                            });
                        });
                    } else {
                        // remove the dormant series
                        pChartRenderingUtilsService.stxx.removeSeries(studyName[0] + "_hist", false);
                        pChartRenderingUtilsService.stxx.panelClose(pChartRenderingUtilsService.stxx.panels[studyName[0]]);
                    }
                    // remove the dormant series
                    pChartRenderingUtilsService.stxx.removeSeries(studyName[1] + "_hist", false);
                    pChartRenderingUtilsService.stxx.panelClose(pChartRenderingUtilsService.stxx.panels[studyName[1]]);
                },
                toggleTifVisibility: function () {
                    tradersGPSPositionStudies.setTifVisibility(!tradersGPSPositionStudies.tifVisibility);
                },
                tidVisibility: false,
                setTidVisibility: function (visibility) {
                    tradersGPSPositionStudies.tidVisibility = visibility;
                    var studyName = getTradersGpsTidStudiesName();
                    if (visibility) {
                        // Histogram convention is "(studyname)" + "_hist"
                        pChartRenderingUtilsService.stxx.addSeries(studyName[0] + "_hist", {
                            display: "TID",
                            data: { useDefaultQuoteFeed: true },
                            symbolObject: {
                                tgps: "TID",
                                product: filterDescription.primaryProduct,
                                symbol: filterDescription.primaryProduct.Symbol
                            },
                            isComparison: false
                        }, function () {
                            tool.log(studyName[0] + ' to be attached to renderer');
                            // Call this when changing master data
                            pChartRenderingUtilsService.stxx.createDataSet();

                            sChartStudyService.addStudy({
                                propName: studyName[0]
                            });
                        });
                    } else {
                        // remove the dormant series
                        pChartRenderingUtilsService.stxx.removeSeries(studyName[0] + "_hist", false);
                        pChartRenderingUtilsService.stxx.panelClose(pChartRenderingUtilsService.stxx.panels[studyName[0]]);
                    }
                    // remove the dormant series
                    pChartRenderingUtilsService.stxx.removeSeries(studyName[1] + "_hist", false);
                    pChartRenderingUtilsService.stxx.panelClose(pChartRenderingUtilsService.stxx.panels[studyName[1]]);
                },
                toggleTidVisibility: function () {
                    tradersGPSPositionStudies.setTidVisibility(!tradersGPSPositionStudies.tidVisibility);
                }
            };

            function getTradersGPSTriggers(productid, tradeVenueLoc, barSize) {
                var barSizeNameValueMapper = {
                    '1 D': '1 day',
                    '1 W': '1 week'
                };
                var closureObj_GPS = {
                    '1 day': {},
                    '1 week': {}
                };
                var request = {
                    ProductId: productid,
                    BarSize: barSizeNameValueMapper[barSize],
                    TradeVenue: tradeVenueLoc
                };

                barSize = barSizeNameValueMapper[barSize];
                if (closureObj_GPS[barSize][productid]) {
                    return closureObj_GPS[barSize][productid].then(function (res) {
                        return res;
                    }, function () {
                        closureObj_GPS[barSize][productid] = sTgpsService.getTradersGPSPositionTriggerNew(request);
                        return closureObj_GPS[barSize][productid];
                    });
                }
                closureObj_GPS[barSize][productid] = sTgpsService.getTradersGPSPositionTriggerNew(request);
                return closureObj_GPS[barSize][productid];
            }
            
            function timeStampToLocalDate(timestamp) {
                var utcDate = moment.utc(timestamp); //should use UTC here
                var localDate = new Date(utcDate.get('year'), utcDate.get('month'), utcDate.get('date')); // convert to local timezone
                return localDate;
            }

            // converted from tradersgps-down.svg using http://www.professorcloud.com/svg-to-canvas/ 
            function drawDownwardArrow(ctx, x, y) {
                ctx.save();
                ctx.translate(x - 4, y);
                ctx.scale(0.075, 0.075);
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(120, 0);
                ctx.lineTo(120, 320);
                ctx.lineTo(0, 320);
                ctx.closePath();
                ctx.clip();
                ctx.translate(0, 80);
                ctx.translate(60, 60);
                ctx.strokeStyle = 'rgba(0,0,0,0)';
                ctx.lineCap = 'butt';
                ctx.lineJoin = 'miter';
                ctx.miterLimit = 4;
                ctx.save();
                ctx.save();
                ctx.fillStyle = "#ff0000";
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 8;
                ctx.translate(0, 20);
                ctx.rotate(3.141592653589793);
                ctx.translate(0, -20);
                ctx.beginPath();
                ctx.moveTo(0, -50);
                ctx.lineTo(50, 50);
                ctx.lineTo(25, 50);
                ctx.lineTo(25, 130);
                ctx.lineTo(-25, 130);
                ctx.lineTo(-25, 50);
                ctx.lineTo(-50, 50);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();
                ctx.restore();
                ctx.restore();
                ctx.restore();
            }

            // converted from tradersgps-up.svg using http://www.professorcloud.com/svg-to-canvas/ 
            function drawUpwardArrow(ctx, x, y) {
                ctx.save();
                ctx.translate(x - 4, y);
                ctx.scale(0.075, 0.075);
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(120, 0);
                ctx.lineTo(120, 320);
                ctx.lineTo(0, 320);
                ctx.closePath();
                ctx.clip();
                ctx.translate(0, 80);
                ctx.scale(1, 1);
                ctx.translate(60, -20);
                ctx.strokeStyle = 'rgba(0,0,0,0)';
                ctx.lineCap = 'butt';
                ctx.lineJoin = 'miter';
                ctx.miterLimit = 4;
                ctx.save();
                ctx.save();
                ctx.fillStyle = "#00ff00";
                ctx.strokeStyle = "#000000";
                ctx.lineWidth = 8;
                ctx.translate(0, 20);
                ctx.rotate(0);
                ctx.translate(0, -20);
                ctx.beginPath();
                ctx.moveTo(0, -50);
                ctx.lineTo(50, 50);
                ctx.lineTo(25, 50);
                ctx.lineTo(25, 130);
                ctx.lineTo(-25, 130);
                ctx.lineTo(-25, 50);
                ctx.lineTo(-50, 50);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();
                ctx.restore();
                ctx.restore();
                ctx.restore();
            };

            function plotPositionMarker(stxx, panel, ctx, yAxis, marker) {
                for (var i = stxx.chart.dataSegment.length - 1; i >= 0; i--) {
                    // find the tick you want this on
                    var quote = stxx.chart.dataSegment[i];
                    if (quote && quote.DT <= marker.Ts) {
                        var price;
                        var x = stxx.pixelFromDate(quote.Date, stxx.chart);
                        var y;
                        if (marker.Direction === "Bull") {
                            price = quote.Low;
                            y = stxx.pixelFromPriceTransform(price, panel, yAxis) + 20;
                            drawUpwardArrow(ctx, x, y);
                        } else {
                            price = quote.High;
                            y = stxx.pixelFromPriceTransform(price, panel, yAxis) - 30;
                            drawDownwardArrow(ctx, x, y);
                        }
                        break;
                    }
                }
            }

            function adjustExtraViewStatesForPanel(panel) {
                //ma (Close,10,simple,false,MA10)
                if (panel) {
                    switch (panel.name) {
                    case "weeklytif":
                    case "tif":
                        tradersGPSPositionStudies.tifVisibility = false;
                        break;
                    case "weeklytid":
                    case "tid":
                        tradersGPSPositionStudies.tidVisibility = false;
                        break;
                    case "weeklycom":
                    case "com":
                        tradersGPSPositionStudies.comVisibility = false;
                        break;
                    }
                    return;
                }
            }
            
            function enterTradersPosition(retainVolumePanel) {
                setupTgpsPositionChart();
                if (!filterDescription.primaryProduct) {
                    return;
                }

                if (!retainVolumePanel) {
                    sChartStudyService.findVChartAndSetVisibility(false);
                }

                pChartRenderingUtilsService.stxx.setChartType('candle');
                tradersGPSPositionStudies.setPeakVisibility(true);
                tradersGPSPositionStudies.setTroughVisibility(true);
                tradersGPSPositionStudies.setComVisibility(true);
                //tradersGPSPositionStudies.setTifVisibility(false);
                tradersGPSPositionStudies.setTidVisibility(true);

                // Display position markers
                positionMarkers = [];
                var productId = filterDescription.primaryProduct.ProductId;
                getTradersGPSTriggers(productId,
                        filterDescription.primaryProduct.TradeVenueLoc,
                        filterDescription.barSize)
                    .then(function (data) {
                        positionMarkers = data.data;
                        for (var i = 0; i < positionMarkers.length; i++) {
                            var utcDate = moment.utc(positionMarkers[i].Timestamp); //should use UTC here
                            var localDate = new Date(utcDate.get('year'), utcDate.get('month'), utcDate.get('date')); // convert to local timezone
                            positionMarkers[i].Ts = localDate;
                        }
                    });
            }

            function exitTradersPosition() {
                tradersGPSPositionStudies.setPeakVisibility(false);
                tradersGPSPositionStudies.setTroughVisibility(false);
                tradersGPSPositionStudies.setComVisibility(false);
                tradersGPSPositionStudies.setTifVisibility(false);
                tradersGPSPositionStudies.setTidVisibility(false);

                positionMarkers = [];

                // clear custom chart
                pChartRenderingUtilsService.stxx.chart.customChart = null;
            }

            function isGapFilledBar(q) {
                return (q.Open === q.High && q.High === q.Low && q.Low === q.Close && q.Volume === 0);
            }

            function hideHighlightedTgpsSeries(event, data) {
                var highlightedField = data;
                switch (highlightedField) {
                case "tradersgps_peak":
                case "weekly_tradersgps_peak":
                    tradersGPSPositionStudies.togglePeakVisibility();
                    break;
                case "tradersgps_trough":
                case "weekly_tradersgps_trough":
                    tradersGPSPositionStudies.toggleTroughVisibility();
                    break;
                default:
                    break;
                }
            }

            // returns a tuple of (activeSeries, dormantSeries)
            function getTradersGpsPeakSeriesName(primaryProduct) {
                var tuple;
                if (filterDescription.barSize === '1 W') {
                    tuple = ["weekly_tradersgps_peak", "tradersgps_peak"];
                } else {
                    tuple = ["tradersgps_peak", "weekly_tradersgps_peak"];
                }
                //tuple[0] = primaryProduct.ProductId + ' ' + tuple[0];
                //tuple[1] = primaryProduct.ProductId + ' ' + tuple[1];
                return tuple;
            }

            function getTradersGpsTroughSeriesName(primaryProduct) {
                var tuple;
                if (filterDescription.barSize === '1 W') {
                    tuple = ["weekly_tradersgps_trough", "tradersgps_trough"];
                } else {
                    tuple = ["tradersgps_trough", "weekly_tradersgps_trough"];
                }
                //tuple[0] = primaryProduct.ProductId + ' ' + tuple[0];
                //tuple[1] = primaryProduct.ProductId + ' ' + tuple[1];
                return tuple;
            }

            function getTradersGpsComStudiesName() {
                if (filterDescription.barSize === '1 W') {
                    return ["weeklycom", "com"];
                } else {
                    return ["com", "weeklycom"];
                }
            }

            function getTradersGpsComOutputName() {
                if (filterDescription.barSize === '1 W') {
                    return "com weeklycom";
                } else {
                    return "com com";
                }
            }

            function getTradersGpsTifStudiesName() {
                if (filterDescription.barSize === '1 W') {
                    return ["weeklytif", "tif"];
                } else {
                    return ["tif", "weeklytif"];
                }
            }

            function getTradersGpsTidStudiesName() {
                if (filterDescription.barSize === '1 W') {
                    return ["weeklytid", "tid"];
                } else {
                    return ["tid", "weeklytid"];
                }
            }

            function hasBeenRenderedIn(renderer, legendString) {
                return renderer.seriesParams.filter(function (u) {
                    return u.field === legendString;
                }).length > 0;
            }

            // CHARTIQ EXTENSION
            function appendDraw() {
                var stxx = pChartRenderingUtilsService.stxx;

                if (stxx.chart.dataSegment.length) {
                    var panel = stxx.chart.panel;
                    var ctx = stxx.chart.context;
                    var yAxis = panel.yAxis;
                    stxx.startClip(panel.name); // save current context
                    for (var j = 0; j < positionMarkers.length; j++) {
                        var marker = positionMarkers[j];
                        plotPositionMarker(stxx, panel, ctx, yAxis, marker);
                    }

                    stxx.endClip(); // restore previous context so all is back how it was.
                }
            }

            function appendCreateDataSet() {
                //if (indicatorData) {
                    //var scrubbed = pChartRenderingUtilsService.stxx.chart.scrubbed;
                    //if (scrubbed) {
                        // when calculating the TA series values for TGPS, we need to ignore the gap-filled data first
                        //var oldDate;

                        // MaRa: temporary fix
                        //if (barSize === '1 week') {
                        //    for (var i = 0; i < peak.length; i++) {
                        //        oldDate = new Date(Date.parse(peak[i].Timestamp));
                        //        peak[i].Timestamp = new Date(oldDate.setDate(oldDate.getDate() + 5));
                        //    }
                        //    for (var i = 0; i < trough.length; i++) {
                        //        oldDate = new Date(Date.parse(trough[i].Timestamp));
                        //        trough[i].Timestamp = new Date(oldDate.setDate(oldDate.getDate() + 5));
                        //    }
                        //    for (var i = 0; i < com.length; i++) {
                        //        oldDate = new Date(Date.parse(com[i].Timestamp));
                        //        com[i].Timestamp = new Date(oldDate.setDate(oldDate.getDate() + 5));
                        //    }
                        //    for (var i = 0; i < tif.length; i++) {
                        //        oldDate = new Date(Date.parse(tif[i].Timestamp));
                        //        tif[i].Timestamp = new Date(oldDate.setDate(oldDate.getDate() + 5));
                        //    }
                        //}
                       
                        // MaRa: don't roll any
                        //for (var i = 1; i < scrubbed.length; i++) {
                        //    var quote = scrubbed[i];
                        //    if (isGapFilledBar(quote)) {
                        //        var previousQuote = scrubbed[i - 1];
                        //        quote[peakSeriesName] = previousQuote[peakSeriesName];
                        //        quote[troughSeriesName] = previousQuote[troughSeriesName];
                        //        quote[comSeriesName] = previousQuote[comSeriesName];
                        //        quote[tifSeriesName] = previousQuote[tifSeriesName];
                        //    }
                        //}
                        //pChartRenderingUtilsService.stxx.draw();
                    //}
                //}
            }

            function setupTgpsPositionChart() {
                var currentTheme = pChartThemeService.getCurrentTheme();
                var upCandleColor = (currentTheme === "Dark") ? "#2eaeff" : "#0072bc";
                var downCandleColor = (currentTheme === "Dark") ? "#ff3c3c" : "#db282e";
                var hollowColor = (currentTheme === "Dark") ? "#141720" : "#f6f6f6";
                pChartRenderingUtilsService.stxx.chart.customChart = {
                    chartType: "hollow_candle",
                    colorFunction: function (stx, quote, mode) {
                        var comSeriesName = getTradersGpsComOutputName();
                        if (quote[comSeriesName] === undefined) {
                            return "#000000";
                        } else {
                            var color = quote[comSeriesName] > 0 ? upCandleColor : downCandleColor;
                            if (quote.Close > quote.Open) { // hollow
                                if (mode === "solid")
                                    return hollowColor;
                            }
                            return color;
                        }
                    }
                };
            }

            function loadTgpsData(params, cb) {
                //TODO introduce caching?
                var productId = params.symbolObject.product.ProductId;
                var paramBarSize = params.period + ' ' + params.interval;
                var barSize;

                if (paramBarSize === '1 day') {
                    barSize = '1 day';
                } else if (paramBarSize === '1 week') {
                    barSize = '1 week';
                } else {
                    return;
                }

                var request = {
                    ProductId: productId,
                    BarSize: barSize
                };

                //var key = JSON.stringify([productId, fundamentalType, params.startDate, params.endDate]);
                //var tgps_cache = window.tgps_cache;
                //if (key in tgps_cache) {
                //    setTimeout(function () {
                //        cb(tgps_cache[key]);
                //    }, 0);
                //    return;
                //}

                $rootScope.$broadcast('beginFetchHistoricalData', null);
                // TODO: use startdate + enddate params
                if (params.symbolObject.tgps === 'Peak') {
                    return sTgpsService.getPositionIndicatorData(request).then(function (res) {
                        if (res.data && res.data.Peak[0]) {
                            // for now, we only load single product - fundamental pair each time
                            var newData = res.data.Peak.map(function (d) {
                                var recordTimeInBrowserTimezone;
                                //if (barSize === '1 week') {
                                //    var oldDate = new Date(Date.parse(d.Timestamp));
                                //    var shiftedDate = new Date(oldDate.setDate(oldDate.getDate() + 5));
                                //    recordTimeInBrowserTimezone = shiftedDate.toISOString().slice(0, 10);
                                //} else {
                                    recordTimeInBrowserTimezone = d.Timestamp.substring(0, d.Timestamp.indexOf('T'));
                                //}
                                return {
                                    Date: recordTimeInBrowserTimezone,
                                    Close: d.Value
                                };
                            });
                            var cbParam = { quotes: newData, moreAvailable: newData.length > 0 };
                            cb(cbParam);
                            //tgps_cache[key] = cbParam;
                            $log.log("Loaded TGPS Position peak data: " + params.symbolObject.product.Symbol +
                                " (" + params.startDate + " " + params.endDate + ") ");
                        } else {
                            cb({ quotes: [], moreAvailable: false });
                        }
                    }).finally(function () {
                        $rootScope.$broadcast('endFetchHistoricalData', null);
                    });
                }
                if (params.symbolObject.tgps === 'Trough') {
                    return sTgpsService.getPositionIndicatorData(request).then(function (res) {
                        if (res.data && res.data.Trough[0]) {
                            // for now, we only load single product - fundamental pair each time
                            var newData = res.data.Trough.map(function (d) {
                                var recordTimeInBrowserTimezone;
                                //if (barSize === '1 week') {
                                //    var oldDate = new Date(Date.parse(d.Timestamp));
                                //    var shiftedDate = new Date(oldDate.setDate(oldDate.getDate() + 5));
                                //    recordTimeInBrowserTimezone = shiftedDate.toISOString().slice(0, 10);
                                //} else {
                                    recordTimeInBrowserTimezone = d.Timestamp.substring(0, d.Timestamp.indexOf('T'));
                                //}                                
                                return {
                                    Date: recordTimeInBrowserTimezone,
                                    Close: d.Value
                                };
                            });
                            var cbParam = { quotes: newData, moreAvailable: newData.length > 0 };
                            cb(cbParam);
                            //tgps_cache[key] = cbParam;
                            $log.log("Loaded TGPS Position trough data: " + params.symbolObject.product.Symbol +
                                " (" + params.startDate + " " + params.endDate + ") ");
                        } else {
                            cb({ quotes: [], moreAvailable: false });
                        }
                    }).finally(function () {
                        $rootScope.$broadcast('endFetchHistoricalData', null);
                    });
                }
                if (params.symbolObject.tgps === 'COM') {
                    return sTgpsService.getPositionIndicatorData(request).then(function (res) {
                        if (res.data && res.data.COM[0]) {
                            // for now, we only load single product - fundamental pair each time
                            var newData = res.data.COM.map(function (d) {
                                var recordTimeInBrowserTimezone;
                                //if (barSize === '1 week') {
                                //    var oldDate = new Date(Date.parse(d.Timestamp));
                                //    var shiftedDate = new Date(oldDate.setDate(oldDate.getDate() + 5));
                                //    recordTimeInBrowserTimezone = shiftedDate.toISOString().slice(0, 10);
                                //} else {
                                    recordTimeInBrowserTimezone = d.Timestamp.substring(0, d.Timestamp.indexOf('T'));
                                //}                            
                                return {
                                    Date: recordTimeInBrowserTimezone,
                                    Close: d.Value
                                };
                            });
                            var cbParam = { quotes: newData, moreAvailable: newData.length > 0 };
                            cb(cbParam);
                            //tgps_cache[key] = cbParam;
                            $log.log("Loaded TGPS Position COM data: " + params.symbolObject.product.Symbol +
                                " (" + params.startDate + " " + params.endDate + ") ");
                        } else {
                            cb({ quotes: [], moreAvailable: false });
                        }
                    }).finally(function () {
                        $rootScope.$broadcast('endFetchHistoricalData', null);
                    });
                }
                if (params.symbolObject.tgps === 'TIF') {
                    return sTgpsService.getPositionIndicatorData(request).then(function (res) {
                        if (res.data && res.data.TIF[0]) {
                            // for now, we only load single product - fundamental pair each time
                            var newData = res.data.TIF.map(function (d) {
                                var recordTimeInBrowserTimezone;
                                //if (barSize === '1 week') {
                                //    var oldDate = new Date(Date.parse(d.Timestamp));
                                //    var shiftedDate = new Date(oldDate.setDate(oldDate.getDate() + 5));
                                //    recordTimeInBrowserTimezone = shiftedDate.toISOString().slice(0, 10);
                                //} else {
                                    recordTimeInBrowserTimezone = d.Timestamp.substring(0, d.Timestamp.indexOf('T'));
                                //}                               
                                return {
                                    Date: recordTimeInBrowserTimezone,
                                    Close: d.Value
                                };
                            });
                            var cbParam = { quotes: newData, moreAvailable: newData.length > 0 };
                            cb(cbParam);
                            //tgps_cache[key] = cbParam;
                            $log.log("Loaded TGPS Position TIF data: " + params.symbolObject.product.Symbol +
                                " (" + params.startDate + " " + params.endDate + ") ");
                        } else {
                            cb({ quotes: [], moreAvailable: false });
                        }
                    }).finally(function () {
                        $rootScope.$broadcast('endFetchHistoricalData', null);
                    });
                }
                if (params.symbolObject.tgps === 'TID') {
                    return sTgpsService.getPositionIndicatorData(request).then(function (res) {
                        if (res.data && res.data.TID[0]) {
                            // for now, we only load single product - fundamental pair each time
                            var newData = res.data.TID.map(function (d) {
                                var recordTimeInBrowserTimezone;
                                //if (barSize === '1 week') {
                                //    var oldDate = new Date(Date.parse(d.Timestamp));
                                //    var shiftedDate = new Date(oldDate.setDate(oldDate.getDate() + 5));
                                //    recordTimeInBrowserTimezone = shiftedDate.toISOString().slice(0, 10);
                                //} else {
                                recordTimeInBrowserTimezone = d.Timestamp.substring(0, d.Timestamp.indexOf('T'));
                                //}                               
                                return {
                                    Date: recordTimeInBrowserTimezone,
                                    Close: d.Value
                                };
                            });
                            var cbParam = { quotes: newData, moreAvailable: newData.length > 0 };
                            cb(cbParam);
                            //tgps_cache[key] = cbParam;
                            $log.log("Loaded TGPS Position TID data: " + params.symbolObject.product.Symbol +
                                " (" + params.startDate + " " + params.endDate + ") ");
                        } else {
                            cb({ quotes: [], moreAvailable: false });
                        }
                    }).finally(function () {
                        $rootScope.$broadcast('endFetchHistoricalData', null);
                    });
                }
            }

            tool.setServiceObjectProperties({
                tradersGPSPositionStudies: tradersGPSPositionStudies,
                adjustExtraViewStatesForPanel: adjustExtraViewStatesForPanel,
                enterTradersPosition: enterTradersPosition,
                exitTradersPosition: exitTradersPosition,

                appendDraw: appendDraw,
                appendCreateDataSet: appendCreateDataSet,
                hideHighlightedTgpsSeries: hideHighlightedTgpsSeries,
                loadTgpsData: loadTgpsData
            });
        });