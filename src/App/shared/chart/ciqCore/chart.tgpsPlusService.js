agmNgModuleWrapper('agms.chart')
    .defineService("sTgpsPlusService", [
        'sTgpsService', 'pChartFilterDescriptionService', 'pChartRenderingUtilsService', 'pChartThemeService', 'sChartStudyService',
        'sTgpsStudyService', 'sChartTgpsTechnicalAnalysisService'],
        function (serviceObj, dep, tool) {
            var pChartThemeService = dep.pChartThemeService,
                sChartStudyService = dep.sChartStudyService,
                sTgpsService = dep.sTgpsService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                sTgpsStudyService = dep.sTgpsStudyService,
                sChartTgpsTechnicalAnalysisService = dep.sChartTgpsTechnicalAnalysisService,
                $log = dep.$log,
                $rootScope = dep.$rootScope;

            var filterDescription = pChartFilterDescriptionService;
            var positionMarkers = [];
            var tradersGpsPaladin = {};
            
            var tradersGPSPlusStudies = {
                peakVisibility: false,
                setPeakVisibility: function (visibility) {
                    tradersGPSPlusStudies.peakVisibility = visibility;
                    if (!filterDescription.primaryProduct) {
                        return;
                    }

                    tool.log("peak visibility is on product " + filterDescription.primaryProduct.Symbol + " going to change to " + visibility);
                    var tgpsRenderer = sTgpsStudyService.getTgpsRenderer(pChartRenderingUtilsService);
                    var seriesName = getTradersGpsPeakSeriesName(filterDescription.primaryProduct);
                    if (visibility) {
                        pChartRenderingUtilsService.stxx.addSeries(seriesName[0], {
                            display: "Peak Line",
                            //data: { useDefaultQuoteFeed: true },
                            type: "line",
                            symbolObject: filterDescription.primaryProduct,
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
                    tradersGPSPlusStudies.setPeakVisibility(!tradersGPSPlusStudies.peakVisibility);
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
                    tradersGPSPlusStudies.troughVisibility = visibility;
                    tool.log("through visibility is going to change to " + visibility);
                    if (!filterDescription.primaryProduct) {
                        return;
                    }

                    var tgpsRenderer = pChartRenderingUtilsService.getChartLineRendererOrNew('tradersgps_line_renderer');
                    var seriesName = getTradersGpsTroughSeriesName(filterDescription.primaryProduct);
                    if (visibility) {
                        pChartRenderingUtilsService.stxx.addSeries(seriesName[0], {
                            display: "Trough Line",
                            //data: { useDefaultQuoteFeed: true },
                            type: "line",
                            symbolObject: filterDescription.primaryProduct,
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
                    tradersGPSPlusStudies.setTroughVisibility(!tradersGPSPlusStudies.troughVisibility);
                },

                psarVisibility: false,
                setPsarVisibility: function (visibility) {
                    tradersGPSPlusStudies.psarVisibility = visibility;
                    sChartStudyService.tryRemoveStudy(serviceObj.psar);
                    if (visibility) {
                        var study = {
                            propName: "customPsar"
                        };
                        serviceObj.psar = sChartStudyService.addStudy(study);
                    }
                },
                togglePsarVisibility: function () {
                    tradersGPSPlusStudies.setPsarVisibility(!tradersGPSPlusStudies.psarVisibility);
                },

                oddsVisibility: false,
                setOddsVisibility: function (visibility) {
                    tradersGPSPlusStudies.oddsVisibility = visibility;
                    if (visibility) {
                        // Study convention is "(studyname)" + "(output)"
                        pChartRenderingUtilsService.stxx.addSeries("ODDS odds", {
                            display: "ODDS",
                            data: { useDefaultQuoteFeed: true },
                            symbolObject: {
                                tgps: "ODDS",
                                product: filterDescription.primaryProduct,
                                symbol: filterDescription.primaryProduct.Symbol
                            },
                            isComparison: false
                        }, function () {
                            tool.log('odds to be attached to renderer');
                            // Call this when changing master data
                            pChartRenderingUtilsService.stxx.createDataSet();

                            sChartStudyService.addStudy({
                                propName: 'odds'
                            });
                        });
                    } else {
                        // remove the dormant series
                        pChartRenderingUtilsService.stxx.removeSeries("ODDS odds", false);
                        pChartRenderingUtilsService.stxx.panelClose(pChartRenderingUtilsService.stxx.panels['odds']);
                    }
                },
                toggleOddsVisibility: function () {
                    tradersGPSPlusStudies.setOddsVisibility(!tradersGPSPlusStudies.oddsVisibility);
                },

                sifVisibility: false,
                setSifVisibility: function (visibility) {
                    tradersGPSPlusStudies.sifVisibility = visibility;
                    if (visibility) {
                        // Study convention is "(studyname)" + "(output)"
                        pChartRenderingUtilsService.stxx.addSeries("sif_hist", {
                            display: "SIF",
                            data: { useDefaultQuoteFeed: true },
                            symbolObject: {
                                tgps: "SIF",
                                product: filterDescription.primaryProduct,
                                symbol: filterDescription.primaryProduct.Symbol
                            },
                            isComparison: false
                        }, function () {
                            tool.log('sif to be attached to renderer');
                            // Call this when changing master data
                            pChartRenderingUtilsService.stxx.createDataSet();

                            sChartStudyService.addStudy({
                                propName: 'sif'
                            });
                        });
                    } else {
                        // remove the dormant series
                        pChartRenderingUtilsService.stxx.removeSeries("sif_hist", false);
                        pChartRenderingUtilsService.stxx.panelClose(pChartRenderingUtilsService.stxx.panels['sif']);
                    }
                },
                toggleSifVisibility: function () {
                    tradersGPSPlusStudies.setSifVisibility(!tradersGPSPlusStudies.sifVisibility);
                },

                trendVisibility: false,
                setTrendVisibility: function (visibility) {
                    tradersGPSPlusStudies.trendVisibility = visibility;
                    if (visibility) {
                        tradersGpsPaladin.trendStudy = sChartStudyService.addStudy({
                            propName: 'trend'
                        });
                    } else {
                        sChartStudyService.tryRemoveStudy(tradersGpsPaladin.trendStudy);
                    }
                },
                toggleTrendVisibility: function () {
                    tradersGPSPlusStudies.setTrendVisibility(!tradersGPSPlusStudies.trendVisibility);
                },

                momentumVisibility: false,
                setMomentumVisibility: function (visibility) {
                    tradersGPSPlusStudies.momentumVisibility = visibility;
                    if (visibility) {
                        tradersGpsPaladin.momentumStudy = sChartStudyService.addStudy({
                            propName: 'momentum'
                        });
                    } else {
                        sChartStudyService.tryRemoveStudy(tradersGpsPaladin.momentumStudy);
                    }
                },
                toggleMomentumVisibility: function () {
                    tradersGPSPlusStudies.setMomentumVisibility(!tradersGPSPlusStudies.momentumVisibility);
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

                barSize = barSizeNameValueMapper[barSize];
                if (closureObj_GPS[barSize][productid]) {
                    return closureObj_GPS[barSize][productid].then(function (res) {
                        return res;
                    }, function () {
                        closureObj_GPS[barSize][productid] = sTgpsService.getTradersGPSTriggerNonCached(productid, tradeVenueLoc, barSize);
                        return closureObj_GPS[barSize][productid];
                    });
                }
                closureObj_GPS[barSize][productid] = sTgpsService.getTradersGPSTriggerNonCached(productid, tradeVenueLoc, barSize);
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
                    case "sif":
                        tradersGPSPlusStudies.sifVisibility = false;
                        break;
                    case "odds":
                        tradersGPSPlusStudies.oddsVisibility = false;
                        break;
                    case "momentum":
                        tradersGPSPlusStudies.momentumVisibility = false;
                        break;
                    }
                    return;
                }
            }

            function enterTradersPaladin() {
                if (!filterDescription.primaryProduct) {
                    return;
                }

                sChartStudyService.findVChartAndSetVisibility(false);
                tradersGPSPlusStudies.setPsarVisibility(true);
                tradersGPSPlusStudies.setTrendVisibility(true);
                tradersGPSPlusStudies.setMomentumVisibility(false);
                tradersGPSPlusStudies.setOddsVisibility(true);
                tradersGPSPlusStudies.setSifVisibility(true);
                tradersGPSPlusStudies.setPeakVisibility(false);
                tradersGPSPlusStudies.setTroughVisibility(false);

                // Display position markers
                positionMarkers = [];
                var productId = filterDescription.primaryProduct.ProductId;
                getTradersGPSTriggers(productId,
                        filterDescription.primaryProduct.TradeVenueLoc,
                        filterDescription.barSize)
                    .then(function (data) {
                        positionMarkers = data.data;
                        for (var i = 0; i < positionMarkers.length; i++) {
                            positionMarkers[i].Ts = timeStampToLocalDate(positionMarkers[i].Timestamp);
                        }
                    });
            }

            function exitTradersPaladin() {
                tradersGPSPlusStudies.setPsarVisibility(false);
                tradersGPSPlusStudies.setTrendVisibility(false);
                tradersGPSPlusStudies.setMomentumVisibility(false);
                tradersGPSPlusStudies.setOddsVisibility(false);
                tradersGPSPlusStudies.setSifVisibility(false);
                tradersGPSPlusStudies.setPeakVisibility(false);
                tradersGPSPlusStudies.setTroughVisibility(false);

                positionMarkers = [];
            }

            function isGapFilledBar(q) {
                return (q.Open === q.High && q.High === q.Low && q.Low === q.Close && q.Volume === 0);
            }

            function hideHighlightedTgpsSeries(event, data) {
                var highlightedField = data.split(' ')[1];
                switch (highlightedField) {
                case "tradersgps_peak":
                case "weekly_tradersgps_peak":
                    tradersGPSPlusStudies.togglePeakVisibility();
                    break;
                case "tradersgps_trough":
                case "weekly_tradersgps_trough":
                    tradersGPSPlusStudies.toggleTroughVisibility();
                    break;
                default:
                    break;
                }
            }

            function hideHighlightedTgpsOverlay(event, data) {
                var highlightedField = data.split(' ')[0];
                if (highlightedField === 'customPsar') {
                    tradersGPSPlusStudies.togglePsarVisibility();
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
                tuple[0] = primaryProduct.ProductId + ' ' + tuple[0];
                tuple[1] = primaryProduct.ProductId + ' ' + tuple[1];
                return tuple;
            }

            function getTradersGpsTroughSeriesName(primaryProduct) {
                var tuple;
                if (filterDescription.barSize === '1 W') {
                    tuple = ["weekly_tradersgps_trough", "tradersgps_trough"];
                } else {
                    tuple = ["tradersgps_trough", "weekly_tradersgps_trough"];
                }
                tuple[0] = primaryProduct.ProductId + ' ' + tuple[0];
                tuple[1] = primaryProduct.ProductId + ' ' + tuple[1];
                return tuple;
            }

            function getTradersGpsComOutputName() {
                if (filterDescription.barSize === '1 W') {
                    return "COM weeklycom";
                } else {
                    return "COM com";
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
                var scrubbed = pChartRenderingUtilsService.stxx.chart.scrubbed;
                if (scrubbed) {
                    var quotes = _.filter(scrubbed, function (q) {
                        return !isGapFilledBar(q);
                    });
                    var comSeriesName = getTradersGpsComOutputName();
                    sChartTgpsTechnicalAnalysisService.setTrend(quotes, comSeriesName);
                    var peakSeriesName = getTradersGpsPeakSeriesName(filterDescription.primaryProduct)[0];
                    var troughSeriesName = getTradersGpsTroughSeriesName(filterDescription.primaryProduct)[0];
                    sChartTgpsTechnicalAnalysisService.setPeakAndTrough(quotes, peakSeriesName, troughSeriesName);

                    //var productId = filterDescription.primaryProduct.ProductId;
                    //var fromDate = _.min(scrubbed, 'DT').DT;
                    //tool.onceAll([
                    //    sTgpsService.getOdds(productId, fromDate),
                    //    sTgpsService.getSIF(productId, fromDate)
                    //]).then(function (result) {
                    //    var odds = result[0].data;
                    //    var sif = result[1].data;

                    //    var oddsSeriesName = 'ODDS odds';
                    //    var sifSeriesName = 'sif_hist';

                        //sChartTgpsTechnicalAnalysisService.setSeries(scrubbed, odds, oddsSeriesName);
                        //sChartTgpsTechnicalAnalysisService.setSeries(scrubbed, sif, sifSeriesName);

                        for (var i = 1; i < scrubbed.length; i++) {
                            var quote = scrubbed[i];
                            if (isGapFilledBar(quote)) {
                                var previousQuote = scrubbed[i - 1];
                                quote['Trend'] = previousQuote['Trend'];
                                quote[peakSeriesName] = previousQuote[peakSeriesName];
                                quote[troughSeriesName] = previousQuote[troughSeriesName];
                                //quote[oddsSeriesName] = previousQuote[oddsSeriesName];
                                //quote[sifSeriesName] = previousQuote[sifSeriesName];
                            }
                        }
                        //pChartRenderingUtilsService.stxx.draw();

                    //});
                }
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

                var fromDate = params.startDate;

                $rootScope.$broadcast('beginFetchHistoricalData', null);
                if (params.symbolObject.tgps === 'ODDS') {
                    return sTgpsService.getOdds(productId, fromDate).then(function (res) {
                        if (res.data && res.data[0]) {
                            // for now, we only load single product - fundamental pair each time
                            var newData = res.data.map(function (d) {
                                var recordTimeInBrowserTimezone;
                                if (barSize === '1 week') {
                                    var oldDate = new Date(Date.parse(d.Timestamp));
                                    var shiftedDate = new Date(oldDate.setDate(oldDate.getDate() + 4));
                                    recordTimeInBrowserTimezone = shiftedDate.toISOString().slice(0, 10);
                                } else {
                                    recordTimeInBrowserTimezone = d.Timestamp.substring(0, d.Timestamp.indexOf('T'));
                                }
                                return {
                                    Date: recordTimeInBrowserTimezone,
                                    Close: d.Value
                                };
                            });
                            var cbParam = { quotes: newData, moreAvailable: newData.length > 0 };
                            cb(cbParam);
                            //tgps_cache[key] = cbParam;
                            $log.log("Loaded TGPS Plus ODDS data: " + params.symbolObject.product.Symbol +
                                " (" + params.startDate + " " + params.endDate + ") ");
                        } else {
                            cb({ quotes: [], moreAvailable: false });
                        }
                    }).finally(function () {
                        $rootScope.$broadcast('endFetchHistoricalData', null);
                    });
                }
                if (params.symbolObject.tgps === 'SIF') {
                    return sTgpsService.getSIF(productId, fromDate).then(function (res) {
                        if (res.data && res.data[0]) {
                            // for now, we only load single product - fundamental pair each time
                            var newData = res.data.map(function (d) {
                                var recordTimeInBrowserTimezone;
                                if (barSize === '1 week') {
                                    var oldDate = new Date(Date.parse(d.Timestamp));
                                    var shiftedDate = new Date(oldDate.setDate(oldDate.getDate() + 5));
                                    recordTimeInBrowserTimezone = shiftedDate.toISOString().slice(0, 10);
                                } else {
                                    recordTimeInBrowserTimezone = d.Timestamp.substring(0, d.Timestamp.indexOf('T'));
                                }
                                return {
                                    Date: recordTimeInBrowserTimezone,
                                    Close: d.Value
                                };
                            });
                            var cbParam = { quotes: newData, moreAvailable: newData.length > 0 };
                            cb(cbParam);
                            //tgps_cache[key] = cbParam;
                            $log.log("Loaded TGPS Plus SIF data: " + params.symbolObject.product.Symbol +
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
                tradersGPSPlusStudies: tradersGPSPlusStudies,
                adjustExtraViewStatesForPanel: adjustExtraViewStatesForPanel,
                enterTradersPaladin: enterTradersPaladin,
                exitTradersPaladin: exitTradersPaladin,

                appendDraw: appendDraw,
                appendCreateDataSet: appendCreateDataSet,
                hideHighlightedTgpsSeries: hideHighlightedTgpsSeries,
                hideHighlightedTgpsOverlay: hideHighlightedTgpsOverlay,
                loadTgpsData: loadTgpsData
            });
        });