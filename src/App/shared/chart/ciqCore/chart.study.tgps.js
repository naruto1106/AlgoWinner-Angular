agmNgModuleWrapper('agms.chart')
    .defineService("sTgpsStudyService", ['pChartFilterDescriptionService', 'pChartRenderingUtilsService', 'pChartThemeService'],
        function (serviceObj, dep, tool) {
            var pChartRenderingUtilsService = dep.pChartRenderingUtilsService;
            var pChartThemeService = dep.pChartThemeService;
            var filterDescription = dep.pChartFilterDescriptionService;

            // PRIVATES
            function drawHorizontalBar(stx, sd, bar, panel) {
                var canvasContext = stx.chart.context;

                var barWidth = stx.pixelFromBar(1) - stx.pixelFromBar(0);
                var width = stx.pixelFromDate(bar.to.DT) - stx.pixelFromDate(bar.from.DT) + barWidth + 1;
                var x = stx.pixelFromDate(bar.from.DT) - barWidth / 2;
                var height = 20;
                var y = panel.bottom - height;
                if (panel.bottom == stx.height) {
                    y = y - 40;
                }
                canvasContext.fillStyle = bar.from['Trend'] > 0 ? "#44AA00" : "#CC2222";
                STX.rect(canvasContext, x, y, width, height, 0, true, false);                               
                
            }

            function extractBar(quotes) {
                var trendBarList = [];
                var previousQuote = null;
                var currentTrendBar = null;                
                var currentQuote = null;
                var firstQuote = true;
                for (var i = 0; i < quotes.length; i++) {
                    currentQuote = quotes[i];
                    var changeDirection = currentQuote && (firstQuote || previousQuote && (currentQuote['Trend'] !== previousQuote['Trend'])) ;
                    if (changeDirection) {
                        currentTrendBar = {
                            from: currentQuote,
                            to: currentQuote                            
                        }
                        trendBarList.push(currentTrendBar);
                    } else if (currentTrendBar) {
                        currentTrendBar.to = currentQuote;
                    }                    
                    previousQuote = currentQuote;
                    if (currentQuote) {
                        firstQuote = false;    
                    }                    
                }
                
                return trendBarList;
            }            

            function displaySif(stx, sd, quotes) {
                var panel = stx.panels[sd.panel];
                panel.min = -2; 
                panel.max = 2;  
                STX.Studies.createYAxis(stx, sd, quotes, panel);
                STX.Studies.createHistogram(stx, sd, quotes, false, 1);

                // draw some subtle lines over value == 0
                var thickness = 0.1;
                var context = stx.chart.context;
                stx.startClip(panel.name);
                var myWidth = stx.layout.candleWidth - 2;
                if (myWidth < 2) myWidth = 1;
                var field = sd.name + "_hist";
                var y = stx.pixelFromPrice(0, panel);
                for (var i = 0; i < quotes.length; i++) {
                    var quote = quotes[i];
                    if (!quote || quote[field] !== 0)
                        continue;

                    if (quote.candleWidth) myWidth = Math.floor(Math.max(1, quote.candleWidth - 2));
                    var x0 = Math.floor(stx.pixelFromBar(i, panel.chart) - myWidth / 2);
                    var x1 = Math.floor(myWidth);
                    var y0 = stx.pixelFromPrice(-thickness, panel);
                    var y1 = (stx.pixelFromPrice(thickness, panel) - y) * 2;
                    context.fillStyle = "#979b9e";
                    context.fillRect(x0, y0, x1, y1);
                }
                stx.endClip();

            }

            function displayCom(stx, sd, quotes) {
                var panel = stx.panels[sd.panel];
                if (!panel) return;
                var y = stx.pixelFromPrice(0, panel);
                
                if (!quotes.length) return;
                
                if (panel.hidden) return;
                if (panel.name != sd.chart.name) {
                    if (!panel.axisDrawn) {
                        panel.height = panel.bottom - panel.top;
                        STX.Studies.determineMinMax(stx, sd, quotes);
                        // panel.yAxis.displayGridLines=false;	// Moved to initializeFN
                        var parameters;
                        // If zones are enabled then we don't want to draw the yAxis
                        parameters = {
                            "noDraw": (sd.parameters && sd.parameters.studyOverZonesEnabled)
                        };                        
                        stx.createYAxis(panel, parameters);
                        stx.drawYAxis(panel, parameters);         

                        // make the 0-axis thicker
                        stx.plotLine(panel.left, panel.right, y, y, "#888888", "segment", stx.chart.context, false, { "lineWidth": 2 });
                        panel.axisDrawn = true;
                    }
                }

                for (var i in sd.outputMap) {
                    STX.Studies.displayIndividualSeriesAsLine(stx, sd, panel, i, quotes);
                }
                
            }

            // PUBLIC
            function getTgpsRenderer(cru) {
                var tgpsRenderer = cru.getChartLineRendererOrNew('tradersgps_line_renderer');
                var productRenderer = cru.getChartLineRendererOrNew('products');
                var targetRenderer = filterDescription.normalizeToPercentage ? productRenderer : tgpsRenderer;
                return targetRenderer;
            }

            function adjustExtraViewStatesForHighlightedLine(cru) {
                var tgpsRenderer = getTgpsRenderer(cru);

                var highlighted = cru.getHighlightedSeries(tgpsRenderer);
                if (highlighted) {
                    var highlightedField = highlighted.field.split(' ')[1];
                    switch (highlightedField) {
                    case "tradersgps_trough":
                    case "weekly_tradersgps_trough":
                        cru.tradersGPSPositionStudies.troughVisibility = false;
                        cru.tradersGPSPlusStudies.troughVisibility = false;
                        break;
                    case "tradersgps_peak":
                    case "weekly_tradersgps_peak":
                        cru.tradersGPSPositionStudies.peakVisibility = false;
                        cru.tradersGPSPlusStudies.peakVisibility = false;
                        break;
                    }
                    return;
                }
            }

            function init() {
                var studies = {
                    "com": {
                        "name": "COM",
                        "display": "COM",
                        "panelHeight": 120,
                        "yAxis": {
                            "displayGridLines": true,
                        },
                        "inputs": {},
                        "outputs": {
                            "com": "#ec008c",
                        },
                        "edit": null,
                        "calculateFN": null,
                        "seriesFN": displayCom
                    },
                    "weeklycom": {
                        "name": "Weekly COM",
                        "display": "COM",
                        "panelHeight": 120,
                        "yAxis": {
                            "displayGridLines": true,
                        },
                        "inputs": {},
                        "outputs": {
                            "com": "#ec008c",
                        },
                        "edit": null,
                        "calculateFN": null,
                        "seriesFN": displayCom
                    },
                    "tif": {
                        "name": "TIF",
                        "display": "TIF",
                        "edit": null,
                        "panelHeight": 120,
                        "inputs": {},
                        "outputs": {
                            "Positive Bar": "#32912b",
                            "Negative Bar": "#a4d6a0",
                        },                        
                        "yAxis": {
                            "displayGridLines": true,
                        },
                        "seriesFN": function(stx, sd, quotes) {
                            var panel = stx.panels[sd.panel];
                            STX.Studies.createYAxis(stx, sd, quotes, panel);
                            STX.Studies.createHistogram(stx, sd, quotes, false, 1);
                        },
                        "calculateFN": null
                    },
                    "weeklytif": {
                        "name": "Weekly TIF",
                        "display": "TIF",
                        "edit": null,
                        "panelHeight": 120,
                        "inputs": {},
                        "outputs": {
                            "Positive Bar": "#32912b",
                            "Negative Bar": "#a4d6a0",
                        },
                        "yAxis": {
                            "displayGridLines": true,
                        },
                        "seriesFN": function(stx, sd, quotes) {
                            var panel = stx.panels[sd.panel];
                            STX.Studies.createYAxis(stx, sd, quotes, panel);
                            STX.Studies.createHistogram(stx, sd, quotes, false, 1);
                        },
                        "calculateFN": null
                    },
                    "cci5": {
                        "name": "cci5",
                        "display": "CCI (5)",
                        "panelHeight": 175,
                        "yAxis": {
                            "displayGridLines": true,
                            initialMarginTop: 5,
                            initialMarginBottom: 5
                        },
                        "inputs": {},
                        "outputs": {
                            "cci5": "#bd46a8",
                        },
                        "parameters": {
                            template: "studyOverZones",
                            init: {
                                studyOverZonesEnabled: true,
                                studyOverBoughtValue: 100,
                                studyOverBoughtColor: "black",
                                studyOverSoldValue: -100,
                                studyOverSoldColor: "black",
                            }
                        },
                        "edit": null,
                        "calculateFN": function (stx, sd) {
                            sd.zoneOutput = "cci5";
                            // The assignment of value using server-side values is done in chart.tgpsService.js: sChartTgpsTechnicalAnalysisService.setSeries
                        },
                        "seriesFN": function (stx, sd, quotes) {
                            if (!quotes.length) return;
                            var panel = stx.panels[sd.panel];
                            if (!panel) return;

                            panel.min = -175;
                            panel.max = 175;

                            if (panel.hidden) return;
                            if (panel.name != sd.chart.name) {
                                STX.Studies.createYAxis(stx, sd, quotes, panel);
                            }
                            sd.parameters.studyOverBoughtColor = pChartThemeService.getCurrentTheme() === 'Dark'
                                ? "auto"
                                : "black";
                            sd.parameters.studyOverSoldColor = pChartThemeService.getCurrentTheme() === 'Dark'
                                ? "auto"
                                : "black";

                            STX.Studies.drawZones(stx, sd, quotes);

                            for (var i in sd.outputMap) {
                                STX.Studies.displayIndividualSeriesAsLine(stx, sd, panel, i, quotes);
                            }
                        },
                    },
                    "weeklycci5": {
                        "name": "weeklycci5",
                        "display": "CCI (5)",
                        "panelHeight": 175,
                        "yAxis": {
                            "displayGridLines": true,
                            initialMarginTop: 5,
                            initialMarginBottom: 5
                        },
                        "inputs": {},
                        "outputs": {
                            "cci5": "#bd46a8",
                        },
                        "parameters": {
                            template: "studyOverZones",
                            init: {
                                studyOverZonesEnabled: true,
                                studyOverBoughtValue: 100,
                                studyOverBoughtColor: "black",
                                studyOverSoldValue: -100,
                                studyOverSoldColor: "black",
                            }
                        },
                        "edit": null,
                        "calculateFN": function (stx, sd) {
                            sd.zoneOutput = "cci5";
                            // The assignment of value using server-side values is done in chart.tgpsService.js: sChartTgpsTechnicalAnalysisService.setSeries
                        },
                        "seriesFN": function (stx, sd, quotes) {
                            if (!quotes.length) return;
                            var panel = stx.panels[sd.panel];
                            if (!panel) return;

                            panel.min = -175;
                            panel.max = 175;

                            if (panel.hidden) return;
                            if (panel.name != sd.chart.name) {
                                STX.Studies.createYAxis(stx, sd, quotes, panel);
                            }
                            sd.parameters.studyOverBoughtColor = pChartThemeService.getCurrentTheme() === 'Dark'
                                ? "auto"
                                : "black";
                            sd.parameters.studyOverSoldColor = pChartThemeService.getCurrentTheme() === 'Dark'
                                ? "auto"
                                : "black";

                            STX.Studies.drawZones(stx, sd, quotes);

                            for (var i in sd.outputMap) {
                                STX.Studies.displayIndividualSeriesAsLine(stx, sd, panel, i, quotes);
                            }
                        },
                    },
                    // Plus Mode
                    "sif": {
                        "name": "SIF",
                        "display": "SIF",
                        "edit": null,
                        "panelHeight": 120,
                        "inputs": {},
                        "outputs": {
                            "Positive Bar": "#1c71b9",
                            "Negative Bar": "#6b90af",
                        },                        
                        "yAxis": {
                            "displayGridLines": true,                            
                            initialMarginTop: 5,
                            initialMarginBottom: 5                      
                        },
                        "seriesFN": displaySif,
                        "calculateFN": null
                    },
                    "weeklysif": {
                        "name": "Weekly SIF",
                        "display": "SIF",
                        "edit": null,
                        "panelHeight": 120,
                        "inputs": {},
                        "outputs": {
                            "Positive Bar": "#1c71b9",
                            "Negative Bar": "#6b90af",
                        },
                        "yAxis": {
                            "displayGridLines": true,                            
                            initialMarginTop: 5,
                            initialMarginBottom: 5
                        },
                        "seriesFN": displaySif,
                        "calculateFN": null
                    },
                    "odds": {
                        "name": "ODDS",
                        "display": "ODDS",
                        "panelHeight": 120,
                        "yAxis": {
                            "displayGridLines": true,                  
                            initialMarginTop: 5,
                            initialMarginBottom: 5
                        },
                        "inputs": {},
                        "outputs": {
                            "ODDS": "#bd46a8",
                        },                        
                        "parameters": {
                            template: "studyOverZones",
                            init: {
                                studyOverZonesEnabled: true,                                
                                studyOverBoughtValue: 76,
                                studyOverBoughtColor: "black",                                
                            }
                        },                        
                        "edit": null,
                        "calculateFN": function (stx, sd) {
                            sd.zoneOutput = "ODDS";
                            // The assignment of value using server-side values is done in chart.tgpsService.js: sChartTgpsTechnicalAnalysisService.setSeries
                        },
                        "seriesFN": function (stx, sd, quotes) {
                            if (!quotes.length) return;
                            var panel = stx.panels[sd.panel];
                            if (!panel) return;
                            
                            panel.min = 0;
                            panel.max = 100;  

                            if (panel.hidden) return;
                            if (panel.name != sd.chart.name) {
                                STX.Studies.createYAxis(stx, sd, quotes, panel);
                            }
                            sd.parameters.studyOverBoughtColor = pChartThemeService.getCurrentTheme() === 'Dark'
                                ? "auto"
                                : "black";

                            STX.Studies.drawZones(stx, sd, quotes);

                            for (var i in sd.outputMap) {
                                STX.Studies.displayIndividualSeriesAsLine(stx, sd, panel, i, quotes);
                            }
                        },
                    },
                    "trend": {
                        "name": "Trend",
                        "display": "Trend",
                        "overlay": true,
                        "edit": null,
                        "seriesFN": function (stx, sd, quotes) {  
                            var extractedBar = extractBar(quotes);

                            var panel = stx.panels.chart;

                            stxx.startClip(sd.panel);                            
                            extractedBar.forEach(function (bar) {
                                drawHorizontalBar(stx, sd, bar, panel);
                            });      
                            var height = 20;
                            var y = panel.bottom - height;
                            if (panel.bottom == stx.height) {
                                y = y - 40;
                            }
                            var canvasContext = stx.chart.context;                            
                            canvasContext.font = "10px Arial";
                            canvasContext.fillStyle = "white";                            
                            canvasContext.fillText("TREND", 10, y + height / 2);                            
                            stxx.endClip();
                        },
                        "calculateFN": null
                    },
                    "momentum": {
                        "name": "Momentum",
                        "display": "Momentum",
                        "panelHeight": 120,
                        "yAxis": {
                            "displayGridLines": true,
                            initialMarginTop: 5,
                            initialMarginBottom: 5
                        },                        
                        "edit": null,
                        "inputs": {},                        
                        "calculateFN": function (stxx, sd) {
                            var quotes = sd.chart.scrubbed;
                            if (!quotes) return;

                            STX.Studies.MA("exponential", 13, "Close", 0, "EMA13", stxx, sd);
                            STX.Studies.MA("exponential", 21, "Close", 0, "EMA21", stxx, sd);
                            STX.Studies.MA("exponential", 55, "Close", 0, "EMA55", stxx, sd);                            
                            for (var i = 55; i < quotes.length; i++) {
                                var quote = quotes[i];                                                               
                                quote["momentum_hist"] = (quote["Close"] - quote["EMA13 momentum"]) - (quote["EMA21 momentum"] - quote["EMA55 momentum"]);
                            }
                        },
                        "outputs": {
                            "Positive Bar": "#EE6600",
                            "Negative Bar": "#EE6600",                            
                        },                        
                        "seriesFN": function (stx, sd, quotes) {
                            var panel = stx.panels[sd.panel];
                            STX.Studies.createYAxis(stx, sd, quotes, panel);
                            STX.Studies.createHistogram(stx, sd, quotes, false, 1);
                        }
                    },
                    "customPsar": {        
                        "name": "Custom PSAR",
                        "display": "Adjusted PSAR",                        
                        "inputs": { "Minimum AF": 0.02, "Maximum AF": 0.2 },
                        "outputs": { Result: "#d3cf00" },
                        "overlay": true,
                        "edit": null,
                        "calculateFN": STX.Studies.calculatePSAR,      
                        "seriesFN": function (stx, sd, quotes) {
                            // adapted from STX.Studies.displayPSAR2
                            stx.startClip(sd.panel);
                            
                            for (var output in sd.outputs) {
                                var field = output + " " + sd.name;
                                stx.chart.context.beginPath();
                                var panel = stx.panels[sd.panel];
                                
                                var pointWidth = Math.max(3, Math.floor(stx.chart.tmpWidth / 2));
                                var previousQuote = null;
                                for (var x = 0; x < quotes.length; x++) {
                                    var quote = quotes[x];
                                    if (!quote || (!quote[field] && quote[field] !== 0)) {
                                        previousQuote = quote;
                                        continue;
                                    }
                                    
                                    if (panel.name == panel.chart.name && quote.transform) quote = quote.transform;
                                    var x0 = stx.pixelFromBar(x, panel.chart);                                    
                                    var y0 = stx.pixelFromPrice(quote[field], panel);
                                    if (x === 0 || !quotes[x - 1] || (!quotes[x - 1][field] && quotes[x - 1][field] !== 0)) {
                                        stx.chart.context.moveTo(x0, y0);
                                    }

                                    if (previousQuote) {
                                        var currentPsarAboveHigh = quote[field] >= quote["High"];
                                        var previousPsarAboveHigh = previousQuote[field] >= previousQuote["High"];
                                        if (previousPsarAboveHigh !== currentPsarAboveHigh) {
                                            stx.chart.context.moveTo(x0 - pointWidth / 2, y0);                                            
                                        }   
                                        stx.chart.context.lineTo(x0 + pointWidth / 2, y0);
                                    }                                    
                                    stx.chart.context.moveTo(x0 + pointWidth / 2, y0);

                                    previousQuote = quote;
                                }
                                stx.chart.context.lineWidth = 2;
                                if (sd.highlight) stx.chart.context.lineWidth = 4;
                                var color = sd.outputs[output];
                                if (color == "auto") color = stx.defaultColor;	// This is calculated and set by the kernel before draw operation.
                                stx.chart.context.strokeStyle = color;
                                stx.chart.context.stroke();
                                stx.chart.context.closePath();
                                stx.chart.context.lineWidth = 1;
                            }
                            stx.endClip();
                        }
                    }
                };

                for (var prop in studies) {
                    var study = studies[prop];
                    if (!study.yAxis) {
                        study.yAxis = {};
                    }

                    study.yAxis.initialMarginTop = pChartRenderingUtilsService.standardPanelMargin.top;
                    study.yAxis.initialMarginBottom = pChartRenderingUtilsService.standardPanelMargin.bottom;
                }
                STX.Studies.studyLibrary = STX.extend(STX.Studies.studyLibrary,studies);
            }

            tool.setServiceObjectProperties({
                getTgpsRenderer: getTgpsRenderer,
                adjustExtraViewStatesForHighlightedLine: adjustExtraViewStatesForHighlightedLine,
                init: init
            });
        }
    );
