agmNgModuleWrapper('agms.chart')
    .defineService("sTgpsSwingService", [
        'sTgpsService', 'pChartFilterDescriptionService', 'pChartRenderingUtilsService', 'sChartStudyService', 'sTgpsStudyService'],
        function (serviceObj, dep, tool) {
            var sChartStudyService = dep.sChartStudyService,
                sTgpsService = dep.sTgpsService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                sTgpsStudyService = dep.sTgpsStudyService,
                $log = dep.$log,
                $rootScope = dep.$rootScope;

            var filterDescription = pChartFilterDescriptionService;
            var swingMarkers = [];
            var tradersGPSSwingStudies = {
                ma10Visibility: false,
                setMA10Visibility: function (visibility) {
                    tradersGPSSwingStudies.ma10Visibility = visibility;
                    if (!filterDescription.primaryProduct) {
                        return;
                    }

                    var tgpsRenderer = sTgpsStudyService.getTgpsRenderer(pChartRenderingUtilsService);
                    var seriesName = getTradersGpsMa10SeriesName(filterDescription.primaryProduct);

                    if (visibility) {
                        pChartRenderingUtilsService.stxx.addSeries(seriesName[0], {
                            display: "MA10",
                            data: { useDefaultQuoteFeed: true },
                            type: "line",
                            symbolObject: {
                                tgps: "MA10",
                                product: filterDescription.primaryProduct,
                                symbol: filterDescription.primaryProduct.Symbol
                            },
                            width: 1,
                            shareYAxis: true,
                            isComparison: filterDescription.normalizeToPercentage,
                        }, function () {

                            tool.log(seriesName[0] + ' to be attached to renderer');
                            tgpsRenderer.ready();
                        });
                        var ma10Color = "#7a7a7a";
                        // when the data can loaded synchronously, we should call .ready() straight away to force redraw
                        tgpsRenderer.attachSeries(seriesName[0], ma10Color).ready();
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
                toggleMA10Visibility: function () {
                    tradersGPSSwingStudies.setMA10Visibility(!tradersGPSSwingStudies.ma10Visibility);
                },

                ma20Visibility: false,
                setMA20Visibility: function (visibility) {
                    tradersGPSSwingStudies.ma20Visibility = visibility;
                    if (!filterDescription.primaryProduct) {
                        return;
                    }

                    var tgpsRenderer = sTgpsStudyService.getTgpsRenderer(pChartRenderingUtilsService);
                    var seriesName = getTradersGpsMa20SeriesName(filterDescription.primaryProduct);

                    if (visibility) {
                        pChartRenderingUtilsService.stxx.addSeries(seriesName[0], {
                            display: "MA20",
                            data: { useDefaultQuoteFeed: true },
                            type: "line",
                            symbolObject: {
                                tgps: "MA20",
                                product: filterDescription.primaryProduct,
                                symbol: filterDescription.primaryProduct.Symbol
                            },
                            width: 1,
                            shareYAxis: true,
                            isComparison: filterDescription.normalizeToPercentage,
                        }, function () {

                            tool.log(seriesName[0] + ' to be attached to renderer');
                            tgpsRenderer.ready();
                        });
                        var ma20Color = "#ff3c3c";
                        // when the data can loaded synchronously, we should call .ready() straight away to force redraw
                        tgpsRenderer.attachSeries(seriesName[0], ma20Color).ready();
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
                toggleMA20Visibility: function () {
                    tradersGPSSwingStudies.setMA20Visibility(!tradersGPSSwingStudies.ma20Visibility);
                },

                ma40Visibility: false,
                setMA40Visibility: function (visibility) {
                    tradersGPSSwingStudies.ma40Visibility = visibility;
                    if (!filterDescription.primaryProduct) {
                        return;
                    }

                    var tgpsRenderer = sTgpsStudyService.getTgpsRenderer(pChartRenderingUtilsService);
                    var seriesName = getTradersGpsMa40SeriesName(filterDescription.primaryProduct);

                    if (visibility) {
                        pChartRenderingUtilsService.stxx.addSeries(seriesName[0], {
                            display: "MA40",
                            data: { useDefaultQuoteFeed: true },
                            type: "line",
                            symbolObject: {
                                tgps: "MA40",
                                product: filterDescription.primaryProduct,
                                symbol: filterDescription.primaryProduct.Symbol
                            },
                            width: 1,
                            shareYAxis: true,
                            isComparison: filterDescription.normalizeToPercentage,
                        }, function () {

                            tool.log(seriesName[0] + ' to be attached to renderer');
                            tgpsRenderer.ready();
                        });
                        var ma40Color = "#2eaeff";
                        // when the data can loaded synchronously, we should call .ready() straight away to force redraw
                        tgpsRenderer.attachSeries(seriesName[0], ma40Color).ready();
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
                toggleMA40Visibility: function () {
                    tradersGPSSwingStudies.setMA40Visibility(!tradersGPSSwingStudies.ma40Visibility);
                },

                cciVisibility: false,
                setCCIVisibility: function (visibility) {
                    tradersGPSSwingStudies.cciVisibility = visibility;
                    var studyName = getTradersGpsCci5StudiesName();
                    if (visibility) {
                        pChartRenderingUtilsService.stxx.addSeries("cci5 " + studyName[0], {
                            display: "CCI (5)",
                            data: { useDefaultQuoteFeed: true },
                            symbolObject: {
                                tgps: "CCI5",
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
                        pChartRenderingUtilsService.stxx.removeSeries("cci5 " + studyName[0], false);
                        pChartRenderingUtilsService.stxx.panelClose(pChartRenderingUtilsService.stxx.panels[studyName[0]]);
                    }
                    // remove the dormant series
                    pChartRenderingUtilsService.stxx.removeSeries("cci5 " + studyName[1], false);
                    pChartRenderingUtilsService.stxx.panelClose(pChartRenderingUtilsService.stxx.panels[studyName[1]]);
                },
                toggleCCIVisibility: function () {
                    tradersGPSSwingStudies.setCCIVisibility(!tradersGPSSwingStudies.cciVisibility);
                }
            };

            function getTradersGPSSwingTriggers(productid, tradeVenueLoc, barSize) {
                var barSizeNameValueMapper = {
                    '1 D': '1 day',
                    '1 W': '1 week'
                };
                var closureObj_Swing = {
                    '1 day': {},
                    '1 week': {}
                };
                var request = {
                    ProductId: productid,
                    BarSize: barSizeNameValueMapper[barSize],
                    TradeVenue: tradeVenueLoc
                };

                barSize = barSizeNameValueMapper[barSize];
                if (closureObj_Swing[barSize] && closureObj_Swing[barSize][productid]) {
                    return closureObj_Swing[barSize][productid].then(function (res) {
                        return res;
                    }, function () {
                        closureObj_Swing[barSize][productid] = sTgpsService.getTradersGPSSwingTriggerNew(request);
                        return closureObj_Swing[barSize][productid];
                    });
                }
                closureObj_Swing[barSize][productid] = sTgpsService.getTradersGPSSwingTriggerNew(request);
                return closureObj_Swing[barSize][productid];
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

            function plotSwingMarker(stxx, panel, ctx, yAxis, marker) {
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
                    case "cci5":
                    case "weeklycci5":
                        tradersGPSSwingStudies.cciVisibility = false;
                        break;
                    }
                    return;
                }
            }

            function enterTradersSwing() {
                if (!filterDescription.primaryProduct) {
                    return;
                }
                
                tradersGPSSwingStudies.setMA10Visibility(true);
                tradersGPSSwingStudies.setMA20Visibility(true);
                tradersGPSSwingStudies.setMA40Visibility(true);
                tradersGPSSwingStudies.setCCIVisibility(true);
                sChartStudyService.findVChartAndSetVisibility(true);

                // Display swing markers
                swingMarkers = [];
                getTradersGPSSwingTriggers(filterDescription.primaryProduct.ProductId, filterDescription.primaryProduct.TradeVenueLoc, filterDescription.barSize).then(function (data) {
                    swingMarkers = data.data;
                    for (var i = 0; i < swingMarkers.length; i++) {
                        var utcDate = moment.utc(swingMarkers[i].Timestamp); //should use UTC here
                        var localDate = new Date(utcDate.get('year'), utcDate.get('month'), utcDate.get('date')); // convert to local timezone
                        swingMarkers[i].Ts = localDate;
                    }
                });
            }

            function exitTradersSwing() {
                tradersGPSSwingStudies.setMA10Visibility(false);
                tradersGPSSwingStudies.setMA20Visibility(false);
                tradersGPSSwingStudies.setMA40Visibility(false);
                tradersGPSSwingStudies.setCCIVisibility(false);
                swingMarkers = [];
            }

            function isGapFilledBar(q) {
                return (q.Open === q.High && q.High === q.Low && q.Low === q.Close && q.Volume === 0);
            }

            function hideHighlightedTgpsSeries(event, data) {
                var highlightedField = data;
                switch (highlightedField) {
                case "tradersgps_ma10":
                case "weekly_tradersgps_ma10":
                    tradersGPSSwingStudies.toggleMA10Visibility();
                    break;
                case "tradersgps_ma20":
                case "weekly_tradersgps_ma20":
                    tradersGPSSwingStudies.toggleMA20Visibility();
                    break;
                case "tradersgps_ma40":
                case "weekly_tradersgps_ma40":
                    tradersGPSSwingStudies.toggleMA40Visibility();
                    break;
                default:
                    break;
                }
            }

            function getTradersGpsMa10SeriesName(primaryProduct) {
                var tuple;
                if (filterDescription.barSize === '1 W') {
                    tuple = ["weekly_tradersgps_ma10", "tradersgps_ma10"];
                } else {
                    tuple = ["tradersgps_ma10", "weekly_tradersgps_ma10"];
                }
                //tuple[0] = primaryProduct.ProductId + ' ' + tuple[0];
                //tuple[1] = primaryProduct.ProductId + ' ' + tuple[1];
                return tuple;
            }

            function getTradersGpsMa20SeriesName(primaryProduct) {
                var tuple;
                if (filterDescription.barSize === '1 W') {
                    tuple = ["weekly_tradersgps_ma20", "tradersgps_ma20"];
                } else {
                    tuple = ["tradersgps_ma20", "weekly_tradersgps_ma20"];
                }
                //tuple[0] = primaryProduct.ProductId + ' ' + tuple[0];
                //tuple[1] = primaryProduct.ProductId + ' ' + tuple[1];
                return tuple;
            }

            function getTradersGpsMa40SeriesName(primaryProduct) {
                var tuple;
                if (filterDescription.barSize === '1 W') {
                    tuple = ["weekly_tradersgps_ma40", "tradersgps_ma40"];
                } else {
                    tuple = ["tradersgps_ma40", "weekly_tradersgps_ma40"];
                }
                //tuple[0] = primaryProduct.ProductId + ' ' + tuple[0];
                //tuple[1] = primaryProduct.ProductId + ' ' + tuple[1];
                return tuple;
            }

            function getTradersGpsCci5StudiesName() {
                if (filterDescription.barSize === '1 W') {
                    return ["weeklycci5", "cci5"];
                } else {
                    return ["cci5", "weeklycci5"];
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
                    for (var k = 0; k < swingMarkers.length; k++) {
                        var swingMarker = swingMarkers[k];
                        plotSwingMarker(stxx, panel, ctx, yAxis, swingMarker);
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
                        //    for (var i = 0; i < ma10.length; i++) {
                        //        oldDate = new Date(Date.parse(ma10[i].Timestamp));
                        //        ma10[i].Timestamp = new Date(oldDate.setDate(oldDate.getDate() + 5));
                        //    }
                        //    for (var i = 0; i < ma20.length; i++) {
                        //        oldDate = new Date(Date.parse(ma20[i].Timestamp));
                        //        ma20[i].Timestamp = new Date(oldDate.setDate(oldDate.getDate() + 5));
                        //    }
                        //    for (var i = 0; i < ma40.length; i++) {
                        //        oldDate = new Date(Date.parse(ma40[i].Timestamp));
                        //        ma40[i].Timestamp = new Date(oldDate.setDate(oldDate.getDate() + 5));
                        //    }
                        //    for (var i = 0; i < cci5.length; i++) {
                        //        oldDate = new Date(Date.parse(cci5[i].Timestamp));
                        //        cci5[i].Timestamp = new Date(oldDate.setDate(oldDate.getDate() + 5));
                        //    }
                        //}

                        // MaRa: show full curve, except CCI
                        //for (var i = 0; i < scrubbed.length; i++) {
                        //    var bar = scrubbed[i];

                        //    var cci5Value = cci5Dic[bar.Date];
                        //    if (cci5Value || cci5Value === 0) { bar[cci5SeriesName] = cci5Value; }

                        //    if (bar[cci5SeriesName] === 1000 || bar[cci5SeriesName] === -1000) {
                        //        bar[cci5SeriesName] = 0;
                        //    }

                            //if (i > 0) {
                                //if (isGapFilledBar(quote)) {
                                //    var previousQuote = scrubbed[i - 1];
                                //    quote[cci5SeriesName] = previousQuote[cci5SeriesName];
                                //}
                            //}
                        //}
                        //pChartRenderingUtilsService.stxx.draw();
                    //}
                //}                
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
                if (params.symbolObject.tgps === 'MA10') {
                    return sTgpsService.getSwingIndicatorData(request).then(function (res) {
                        if (res.data && res.data.Ma10[0]) {
                            // for now, we only load single product - fundamental pair each time
                            var newData = res.data.Ma10.map(function (d) {
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
                            $log.log("Loaded TGPS Swing MA10 data: " + params.symbolObject.product.Symbol +
                                " (" + params.startDate + " " + params.endDate + ") ");
                        } else {
                            cb({ quotes: [], moreAvailable: false });
                        }
                    }).finally(function () {
                        $rootScope.$broadcast('endFetchHistoricalData', null);
                    });
                }
                if (params.symbolObject.tgps === 'MA20') {
                    return sTgpsService.getSwingIndicatorData(request).then(function (res) {
                        if (res.data && res.data.Ma20[0]) {
                            // for now, we only load single product - fundamental pair each time
                            var newData = res.data.Ma20.map(function (d) {
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
                            $log.log("Loaded TGPS Swing MA20 data: " + params.symbolObject.product.Symbol +
                                " (" + params.startDate + " " + params.endDate + ") ");
                        } else {
                            cb({ quotes: [], moreAvailable: false });
                        }
                    }).finally(function () {
                        $rootScope.$broadcast('endFetchHistoricalData', null);
                    });
                }
                if (params.symbolObject.tgps === 'MA40') {
                    return sTgpsService.getSwingIndicatorData(request).then(function (res) {
                        if (res.data && res.data.Ma40[0]) {
                            // for now, we only load single product - fundamental pair each time
                            var newData = res.data.Ma40.map(function (d) {
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
                            $log.log("Loaded TGPS Swing MA40 data: " + params.symbolObject.product.Symbol +
                                " (" + params.startDate + " " + params.endDate + ") ");
                        } else {
                            cb({ quotes: [], moreAvailable: false });
                        }
                    }).finally(function () {
                        $rootScope.$broadcast('endFetchHistoricalData', null);
                    });
                }
                if (params.symbolObject.tgps === 'CCI5') {
                    return sTgpsService.getSwingIndicatorData(request).then(function (res) {
                        if (res.data && res.data.Cci5[0]) {
                            // for now, we only load single product - fundamental pair each time
                            var newData = res.data.Cci5.map(function (d) {
                                var recordTimeInBrowserTimezone;
                                //if (barSize === '1 week') {
                                //    var oldDate = new Date(Date.parse(d.Timestamp));
                                //    var shiftedDate = new Date(oldDate.setDate(oldDate.getDate() + 5));
                                //    recordTimeInBrowserTimezone = shiftedDate.toISOString().slice(0, 10);
                                //} else {
                                    recordTimeInBrowserTimezone = d.Timestamp.substring(0, d.Timestamp.indexOf('T'));
                                //}

                                // MaRa: Set infinity CCI to 0
                                var close = d.Value;
                                if (close === 1000 || close === -1000) {
                                    close = 0;
                                }

                                return {
                                    Date: recordTimeInBrowserTimezone,
                                    Close: close
                                };
                            });
                            var cbParam = { quotes: newData, moreAvailable: newData.length > 0 };
                            cb(cbParam);
                            //tgps_cache[key] = cbParam;
                            $log.log("Loaded TGPS Swing CCI5 data: " + params.symbolObject.product.Symbol +
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
                tradersGPSSwingStudies: tradersGPSSwingStudies,
                adjustExtraViewStatesForPanel: adjustExtraViewStatesForPanel,
                enterTradersSwing: enterTradersSwing,
                exitTradersSwing: exitTradersSwing,

                appendDraw: appendDraw,
                appendCreateDataSet: appendCreateDataSet,
                hideHighlightedTgpsSeries: hideHighlightedTgpsSeries,
                loadTgpsData: loadTgpsData
            });
        });