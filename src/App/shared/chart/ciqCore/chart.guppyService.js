agmNgModuleWrapper('agms.chart')
    .defineService("pChartGuppyService", [
        'pChartFilterDescriptionService', 'pChartService', 'pChartRenderingUtilsService',
        'sTgpsService'],
        function (serviceObj, dep, tool) {
            var pChartService = dep.pChartService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                sTgpsService = dep.sTgpsService;

            var filterDescription = pChartFilterDescriptionService;
            var lastTgpsState = null;
            var guppyMarkers = [];

            var guppyStudies = {
                showGuppyArrow: true,
                toggleShowGuppyArrow: function () {
                    guppyStudies.setShowGuppyArrow(!guppyStudies.showGuppyArrow);
                },
                setShowGuppyArrow: function (visibility) {
                    guppyStudies.showGuppyArrow = visibility;
                    if (!filterDescription.primaryProduct) {
                        return;
                    }
                }
            };

            function getGuppyTriggers(productid, tradeVenueLoc, barSize) {
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
            
            function guppyChanged() {
                if (!filterDescription.primaryProduct) {
                    return;
                }

                if (lastTgpsState !== null) {
                    if (lastTgpsState === "Position") {
                        guppyStudies.setShowGuppyArrow(false);
        
                        positionMarkers = [];
                    } 
                }

                if (serviceObj.guppyMode) {
                    lastTgpsState = "Position";
                    if (!filterDescription.primaryProduct) {
                        return;
                    }
    
                    filterDescription.ExtendedChartType = 'high_line';
                    pChartRenderingUtilsService.stxx.setChartType(null);
                    guppyStudies.setShowGuppyArrow(true);

                    // Display position markers
                    guppyMarkers = [];
                    var productId = filterDescription.primaryProduct.ProductId;
                    getGuppyTriggers(productId,
                            filterDescription.primaryProduct.TradeVenueLoc,
                            filterDescription.barSize)
                        .then(function (data) {
                            guppyMarkers = data.data;
                            for (var i = 0; i < guppyMarkers.length; i++) {
                                var utcDate = moment.utc(guppyMarkers[i].Timestamp); //should use UTC here
                                var localDate = new Date(utcDate.get('year'), utcDate.get('month'), utcDate.get('date')); // convert to local timezone
                                guppyMarkers[i].Ts = localDate;
                            }
                        });

                    pChartService.isStudyAccordionOpen = true;
                } else {                    
                    lastTgpsState = null;
                }
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
                        if (guppyStudies.showGuppyArrow) {
                            if (marker.Direction === "Bull") {
                                price = quote.Low;
                                y = stxx.pixelFromPriceTransform(price, panel, yAxis) + 20;
                                drawUpwardArrow(ctx, x, y);
                            } else {
                                price = quote.High;
                                y = stxx.pixelFromPriceTransform(price, panel, yAxis) - 30;
                                drawDownwardArrow(ctx, x, y);
                            }
                        }
                        break;
                    }
                }
            }

            function appendDraw() {
                var stxx = pChartRenderingUtilsService.stxx;

                if (stxx.chart.dataSegment.length) {
                    var panel = stxx.chart.panel;
                    var ctx = stxx.chart.context;
                    var yAxis = panel.yAxis;
                    stxx.startClip(panel.name); // save current context
                    for (var j = 0; j < guppyMarkers.length; j++) {
                        var marker = guppyMarkers[j];
                        plotPositionMarker(stxx, panel, ctx, yAxis, marker);
                    }

                    stxx.endClip(); // restore previous context so all is back how it was.
                }
            }
            
            tool.on('onChartBarSizePickerChanged', function () {
                if (serviceObj.tradersGpsMode) {
                    guppyChanged();
                }
            });

            tool.setServiceObjectProperties({
                guppyMode: false,
                guppyStudies: guppyStudies,
                guppyChanged: guppyChanged,
                appendDraw: appendDraw
            });
        });