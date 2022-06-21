agmNgModuleWrapper('agms.chart')
    .defineService("sChartXaxisCustomizer",
    [],
    function (serviceObj, dep, tool) {
            serviceObj.customizeXAxis = customizeXAxis;

            // this custom class is created because XAxisLabel from ChartIQ is not rich enough
            function XAxisLabelDateTime(dt, str) {
                this.str = str;
                this.dt = dt;
            }

            XAxisLabelDateTime.prototype.toString = function () {
                return this.str;
            }
            
            // ********** START Implementation / Hack for https://jira.algomerchant.com/jira/browse/PD-997 ************
            function customizeXAxis(stxx) {
                serviceObj.stxx = stxx;
                // this is undocumented API to set the height of xAxis so that we can have enough room for two rows of information
                stxx.xaxisHeight = 40;
                stxx.xAxisAsFooter = true;
                // change the default grid width 
                stxx.chart.xAxis.axisType = "ntb";
                stxx.chart.xAxis.idealTickSizePixels = 40;
                stxx.chart.xAxis.minimumLabelWidth = 17;
                // force daily bar to contain roughly 3 bars per-grid
                overrideXAxisGranularity(stxx);
                overrideFormatting(stxx);
            }

            var drawBoundariesOnly = false;
            var axisBoundaryReps = [];
            var isDrawingSecondPassBoundary = false;

            function overrideFormatting(stxx) {
                stxx.chart.xAxis.formatter = function (dt, gridType, timeUnit, c) {
                    var barSize = serviceObj.filterDescription.barSize;
                    var dtAsMoment = moment(dt);
                    if (gridType === "boundary") {
                        if (timeUnit >= STX.YEAR) {
                            return new XAxisLabelDateTime(dt, dtAsMoment.format("YY"));
                        } else if (timeUnit >= STX.MONTH) {
                            return new XAxisLabelDateTime(dt, dtAsMoment.format("MMM YY"));
                        } else if (timeUnit >= STX.DAY) {
                            return new XAxisLabelDateTime(dt, dtAsMoment.format("DD MMM"));
                        } else {
                            return new XAxisLabelDateTime(dt, dtAsMoment.format("DD MMM HH:00"));
                        }
                    } else if (gridType === "line") {
                        if (timeUnit <= STX.MINUTE) {
                            if (_.include(['1 H', '2 H'], barSize)) {
                                return new XAxisLabelDateTime(dt, dtAsMoment.format("HH:mm[\n]DD-MMM"));
                            }
                            return new XAxisLabelDateTime(dt, dtAsMoment.format("HH:mm[\n]"));
                        } else if (timeUnit <= STX.HOUR) {
                            if (isInterdayBar(barSize)) {
                                return new XAxisLabelDateTime(dt, dtAsMoment.format("DD-MMM[\n]YYYY"));
                            }
                            return new XAxisLabelDateTime(dt, dtAsMoment.format("HH:mm[\n]"));
                        } else if (timeUnit <= STX.DAY) {
                            if (barSize === '1 M') {
                                return new XAxisLabelDateTime(dt, dtAsMoment.format("MMM[\n]YYYY"));
                            }
                            return new XAxisLabelDateTime(dt, dtAsMoment.format("DD[\n]"));
                            //return dtAsMoment.format("DD[\n]");
                        } else if (timeUnit <= STX.YEAR) {
                            return new XAxisLabelDateTime(dt, dtAsMoment.format("MMM[\n]YY"));
                        } else {
                            return new XAxisLabelDateTime(dt, dtAsMoment.format("YYYY[\n]"));
                        }
                    } else {
                        var date = STX.strToDateTime(dt);
                        var dtAsMomentJs = moment(date);
                        if (barSize.indexOf('H') !== -1 || barSize.indexOf("Min") !== -1) {
                            return new XAxisLabelDateTime(dt, dtAsMomentJs.format("hh:mm A[\n]"));
                        } else {
                            return new XAxisLabelDateTime(dt, dtAsMomentJs.format("DD[\n]"));
                        }
                    }
                };
            }

            function overrideXAxisGranularity(stxx) {
                stxx.timePossibilities = [STX.MILLISECOND, STX.SECOND, STX.MINUTE, STX.HOUR, STX.DAY, STX.MONTH, STX.YEAR];
                stxx.timeIntervalMap = {};
                stxx.timeIntervalMap[STX.MILLISECOND] = {
                    arr: [1, 2, 5, 10, 20, 50, 100, 250, 500],
                    minTimeUnit: 0,
                    maxTimeUnit: 1000
                };
                stxx.timeIntervalMap[STX.SECOND] = {
                    arr: [1, 2, 5, 10, 15, 30],
                    minTimeUnit: 0,
                    maxTimeUnit: 60
                };
                stxx.timeIntervalMap[STX.MINUTE] = {
                    arr: [1, 15, 30],
                    minTimeUnit: 0,
                    maxTimeUnit: 60
                };
                stxx.timeIntervalMap[STX.HOUR] = {
                    arr: [1],
                    minTimeUnit: 0,
                    maxTimeUnit: 24
                };
                stxx.timeIntervalMap[STX.DAY] = {
                    arr: [1],
                    minTimeUnit: 0,
                    maxTimeUnit: 32
                };
                stxx.timeIntervalMap[STX.MONTH] = {
                    arr: [1, 2],
                    minTimeUnit: 1,
                    maxTimeUnit: 13
                };
                stxx.timeIntervalMap[STX.YEAR] = {
                    arr: [1, 2, 3, 5],
                    minTimeUnit: 1,
                    maxTimeUnit: 20000000
                };
                stxx.timeIntervalMap[STX.DECADE] = {
                    arr: [1, 10],
                    minTimeUnit: 0,
                    maxTimeUnit: 2000000
                };
            }

            function removeBoundaries(axisRepresentation) {
                var i = axisRepresentation.length;
                while (i--) {
                    var axisLabel = axisRepresentation[i];
                    if (axisLabel.grid === 'boundary') {
                        axisRepresentation.splice(i, 1);
                    }
                }
            }

            function defineXaxisBoundaries(chart, axisBoundaryArr) {
                var stxx = serviceObj.stxx;
                // define our own boundaries. Boundary text always appears in second line of xAxis
                var timeUnit = chart.xAxis.activeTimeUnit;
                var barSize = serviceObj.filterDescription.barSize;
                var previousData = null;
                for (var idx = 0; idx < chart.xaxis.length; idx++) {
                    var data = chart.xaxis[idx];
                    if (previousData) {
                        var xCoord;
                        var text;
                        switch (timeUnit) {
                            case STX.MINUTE:
                                if (_.include(['1 H', '2 H'], barSize)) {
                                    break;
                                }
                                // otherwise treat the same as HOUR
                            case STX.HOUR:
                                if (isInterdayBar(barSize)) {
                                    break;
                                }

                                if (previousData.DT.getDate() !== data.DT.getDate()) {
                                    xCoord = chart.left + ((2 * idx + 1) * stxx.layout.candleWidth) / 2 - 1;
                                    text = chart.xAxis.formatter(data.DT, 'boundary', STX.DAY);
                                    axisBoundaryArr.push(new STXChart.XAxisLabel(xCoord, 'boundary', '\n' + text));
                                }
                                break;
                            case STX.DAY:
                                if (barSize === '1 M') {
                                    break;
                                }

                                if (previousData.DT.getMonth() !== data.DT.getMonth()) {
                                    xCoord = chart.left + ((2 * idx + 1) * stxx.layout.candleWidth) / 2 - 1;
                                    text = chart.xAxis.formatter(data.DT, 'boundary', STX.MONTH);
                                    axisBoundaryArr.push(new STXChart.XAxisLabel(xCoord, 'boundary', '\n' + text));
                                }
                                break;
                        }
                    }
                    previousData = data;
                }
            }

            function repositionXAxisBoundaries(axisBoundaryArr) {
                // make the "boundary" appears in the middle of two boundaries instead, e.g.
                // |     Jan 2016      |       Feb 2016       |
                var i = axisBoundaryArr.length;
                var previousLabel = undefined;
                while (i--) {
                    var curLabel = axisBoundaryArr[i];
                    if (previousLabel) {
                        axisBoundaryArr.splice(i + 1,
                            0,
                            new STXChart.XAxisLabel((curLabel.hz + previousLabel.hz) / 2, curLabel.grid, curLabel.text));
                        previousLabel.text = '\n|';
                    }
                    previousLabel = curLabel;
                }
                if (previousLabel) {
                    previousLabel.text = '\n|';
                }
            }

            function isInterdayBar(barSize) {
                return _.includes(['1 D', '1 W', '1 M'], barSize);
            }
            
            function snapMicropixel(xCoord) {
                return Math.floor(xCoord + serviceObj.stxx.micropixels) + 0.5;
            }

            function shadeColumn(chart, topRight, topLeft) {
                var stxx = serviceObj.stxx;
                var canvas = chart.context;
                canvas.fillStyle = "rgba(255, 255, 255, 0.02)";
                canvas.fillRect(topLeft,
                    0,
                    (topRight - topLeft),
                    (chart.canvasHeight - stxx.xaxisHeight));
            }

            var labelsTimeUnit = null;
            var labelsWithKnownRendering = {};
            var labelsCandleWidth = null;
            function overlayAlternateGridColorFresh(chart, axisRepresentation) {
                labelsWithKnownRendering = {};
                labelsTimeUnit = chart.xAxis.activeTimeUnit;
                labelsCandleWidth = serviceObj.stxx.layout.candleWidth;
                var previous = { hz: 0 };
                var skip = false;
                _.forEach(axisRepresentation, function (rep) {
                    if (!skip) {
                        var topLeft = snapMicropixel(previous.hz);
                        var topRight = snapMicropixel(rep.hz);
                        shadeColumn(chart, topRight, topLeft);
                        labelsWithKnownRendering[rep.text.dt.getTime()] = true;
                    }
                    previous = rep;
                    skip = !skip;
                });
            }

            function overlayAlternateGridColorFromKnownPointRightwards(chart, axisRepresentation, matchingLabelIndex) {
                var skip = false;
                var idx;

                var previous = matchingLabelIndex > 0 ?
                                axisRepresentation[matchingLabelIndex - 1] :
                                    { hz: 0 };

                var rep;
                var topLeft;
                var topRight;
                var chartRightBoundary = snapMicropixel(chart.right);
                for (idx = matchingLabelIndex; idx < axisRepresentation.length; idx++) {
                    rep = axisRepresentation[idx];
                    if (!skip) {
                        topLeft = Math.min(snapMicropixel(previous.hz), chartRightBoundary);
                        topRight = Math.min(snapMicropixel(rep.hz), chartRightBoundary);
                        shadeColumn(chart, topRight, topLeft);
                        labelsWithKnownRendering[rep.text.dt.getTime()] = true;
                        rep.rendered = true;
                    }
                    skip = !skip;
                    previous = rep;
                }

                if (!skip) {
                    // shade the last column
                    topLeft = Math.min(snapMicropixel(previous.hz), chartRightBoundary);
                    topRight = chartRightBoundary;
                    shadeColumn(chart, topRight, topLeft);
                }
            }

            function overlayAlternateGridColorFromKnownPointLeftwards(chart, axisRepresentation, matchingLabelIndex) {
                var previous = matchingLabelIndex > -1 && matchingLabelIndex < axisRepresentation.length - 1 ?
                                axisRepresentation[matchingLabelIndex + 1] :
                                    { hz: chart.width };
                var skip = true;
                var topLeft;
                var topRight;
                for (var idx = matchingLabelIndex; idx >= 0; idx--) {
                    var rep = axisRepresentation[idx];
                    if (!skip) {
                        if (!previous.rendered) {
                            topLeft = snapMicropixel(rep.hz);
                            topRight = Math.min(snapMicropixel(previous.hz), snapMicropixel(chart.right));
                            shadeColumn(chart, topRight, topLeft);
                        }
                        labelsWithKnownRendering[previous.text.dt.getTime()] = true;
                    }
                    skip = !skip;
                    previous = rep;
                }

                if (!skip && !previous.rendered) {
                    // shade the first column
                    topLeft = snapMicropixel(0);
                    topRight = Math.min(snapMicropixel(previous.hz), chart.right);
                    shadeColumn(chart, topRight, topLeft);
                }
            }

            var previousCandidateXAxisLabels = [];
            var previouslyDrawnXAxisLabels = [];
            
            // Override default canvas API implementation that does not support multi-line
            // Adapted from:http://stackoverflow.com/a/17777674/3998758 and http://stackoverflow.com/a/21574562/3998758
            CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
                var lines = text.split("\n");

                for (var i = 0; i < lines.length; i++) {

                    var words = lines[i].split(' ');
                    var line = '';

                    for (var n = 0; n < words.length; n++) {
                        var testLine = line + words[n] + ' ';
                        var metrics = this.measureText(testLine);
                        var testWidth = metrics.width;
                        if (testWidth > maxWidth && n > 0) {
                            this.fillText(line, x, y);
                            line = words[n] + ' ';
                            y += lineHeight + 5;
                        } else {
                            line = testLine;
                        }
                    }

                    this.fillText(line, x, y);
                    y += lineHeight + 5;
                }
            };
            var oldFillText = CanvasRenderingContext2D.prototype.fillText;
            CanvasRenderingContext2D.prototype.fillText = function (text, x, y, maxWidth) {
                if (typeof text === 'string' || text instanceof String || text instanceof XAxisLabelDateTime) {
                    var textAsStr = text.toString();
                    var lines = textAsStr.split("\n");
                    if (lines.length <= 1) {
                        oldFillText.call(this, textAsStr, x, y);
                    } else {
                        // TODO: tune this
                        y = y - 6;
                        var lineHeight = this.measureText("M").width * 1.2;
                        CanvasRenderingContext2D.prototype.wrapText.call(this, textAsStr, x, y, maxWidth, lineHeight);
                    }
                } else {
                oldFillText.call(this, text, x, y);                             
                }
            };

            var oldMeasureText = CanvasRenderingContext2D.prototype.measureText;
            CanvasRenderingContext2D.prototype.measureText = function (text) {
                var that = this;

                // workaround for ChartIQ overzealous padding that is used in measure label widths
                if (typeof text === 'string' || text instanceof String || text instanceof XAxisLabelDateTime) {
                    text = text.toString().replace("   ", " ");
                    var lines = text.split("\n");
                    return oldMeasureText.call(that, lines[0]);
                }
                return oldMeasureText.call(that, text);
            }

            // ********** END  Implementation / Hack for https://jira.algomerchant.com/jira/browse/PD-997 ************

            function getDrawnXaxisRepresentationsOnly(chart, axisRepresentations) {
                var repsToReturn = [];
                var padding = "   ";
                var context = chart.context;
                var stxx = serviceObj.stxx;

                context.textAlign = "center";
                context.textBaseline = "middle";
                axisRepresentations = angular.copy(axisRepresentations);

                var j, paddingWidth = context.measureText((padding)).width;
                for (var C = 0; C < axisRepresentations.length; C++) {
                    j = axisRepresentations[C];
                    var textWidth = context.measureText(j.text).width,
                        s = Math.max(textWidth + paddingWidth, chart.xAxis.minimumLabelWidth);
                    var adjHz = Math.floor(j.hz + stxx.micropixels) + 0.5;
                    j.left = adjHz - (s / 2);
                    j.right = adjHz + (s / 2);
                    j.unpaddedRight = adjHz + (textWidth / 2);
                }

                var lastRight = -1;
                for (var idx = 0; idx < axisRepresentations.length ; idx++) {
                    j = axisRepresentations[idx];
                    if (lastRight > -1) {
                        if (j.left < lastRight)
                            continue;
                    }
                    lastRight = j.right;
                    if ((Math.floor(j.unpaddedRight) <= chart.right)) {
                        repsToReturn.push(j);
                    }
                }
                return repsToReturn;
            };

            function prependCreateXAxis(chart) {
                var stxx = serviceObj.stxx;
                var barSize = serviceObj.filterDescription.barSize;
                switch (barSize) {
                case '1 Min':
                case '5 Min':
                case '10 Min':
                case '15 Min':
                case '30 Min':
                case '1 H':
                case '2 H':
                    chart.xAxis.idealTickSizePixels = 80;
                    stxx.timePossibilities = [STX.MINUTE, STX.HOUR, STX.DAY, STX.MONTH];
                    break;
                case '1 D':
                case '1 W':
                    chart.xAxis.idealTickSizePixels = 40;
                    stxx.timePossibilities = [STX.HOUR, STX.DAY, STX.MONTH, STX.YEAR];
                    break;
                case '1 M':
                    chart.xAxis.idealTickSizePixels = 60;
                    stxx.timePossibilities = [STX.DAY, STX.MONTH, STX.YEAR];
                    break;
                }
            }

        function prependDrawXAxis(chart, axisRepresentation) {
                var barSize = serviceObj.filterDescription.barSize;
                if (drawBoundariesOnly) {
                    chart.xAxis.minimumLabelWidth = 1;
                    chart.xAxis.displayBorder = false;
                    chart.xAxis.displayGridLines = false;
                    serviceObj.stxx.setStyle("stx_xaxis", "font-weight", "bold");
                    return;
                } else {
                    switch (barSize) {
                    case '1 Min':
                    case '5 Min':
                    case '10 Min':
                    case '15 Min':
                    case '30 Min':
                    case '1 H':
                    case '2 H':
                        chart.xAxis.minimumLabelWidth = 35;
                        break;
                    case '1 D':
                    case '1 W':
                        chart.xAxis.minimumLabelWidth = 17;
                        break;
                    case '1 M':
                        chart.xAxis.minimumLabelWidth = 30;
                        break;
                    }

                    // when not drawing boundary, remove it from axisReps. Boundaries are drawn in the second pass of xAxis drawing
                    removeBoundaries(axisRepresentation);
                    defineXaxisBoundaries(chart, axisBoundaryReps);
                    repositionXAxisBoundaries(axisBoundaryReps);
                    serviceObj.stxx.setStyle("stx_xaxis", "font-weight", "normal");
                }

                /**
                * Create alternating grid color
                */
                var currentCandidateLabels = _.map(axisRepresentation, function (r) { return r.text.dt.getTime(); });

                var drawnXAxisRepresentation = getDrawnXaxisRepresentationsOnly(chart, axisRepresentation);

                var currentDrawnLabels = _.map(drawnXAxisRepresentation, function (r) { return r.text.dt.getTime(); });

                // HACK: to avoid the label alternating when scrolling, we detect whether this is a gentle scroll (not range jump)
                // If it is, and the drawn label flips, we remove the first label hoping that it will maintain the sequence of drawn label
                var isGentleScroll = _.intersection(currentCandidateLabels, previousCandidateXAxisLabels).length > 0;
                if (isGentleScroll) {
                    while (isGentleScroll && _.intersection(currentDrawnLabels, previouslyDrawnXAxisLabels).length === 0) {
                        axisRepresentation.shift();
                        currentCandidateLabels = _.map(axisRepresentation, function (r) { return r.text.dt.getTime(); });
                        drawnXAxisRepresentation = getDrawnXaxisRepresentationsOnly(chart, axisRepresentation);
                        currentDrawnLabels = _.map(drawnXAxisRepresentation, function (r) { return r.text.dt.getTime(); });
                        isGentleScroll = _.intersection(currentCandidateLabels, previousCandidateXAxisLabels).length > 0;
                    }
                }

                var matchingLabelIndex = _.findIndex(drawnXAxisRepresentation, function (rep) {
                    return labelsWithKnownRendering[rep.text.dt.getTime()];
                });

                if (chart.xAxis.activeTimeUnit !== labelsTimeUnit ||
                    matchingLabelIndex < 0 ||
                    serviceObj.stxx.layout.candleWidth !== labelsCandleWidth) {
                    overlayAlternateGridColorFresh(chart, drawnXAxisRepresentation);
                } else {
                    overlayAlternateGridColorFromKnownPointRightwards(chart, drawnXAxisRepresentation, matchingLabelIndex);
                    overlayAlternateGridColorFromKnownPointLeftwards(chart, drawnXAxisRepresentation, matchingLabelIndex);
                }

                previousCandidateXAxisLabels = currentCandidateLabels;
                previouslyDrawnXAxisLabels = currentDrawnLabels;
            }

            function appendDrawXAxis(thisObj, chart, axisRepresentation) {
                if (drawBoundariesOnly) {
                    drawBoundariesOnly = false;
                    axisBoundaryReps = [];
                    chart.xAxis.displayGridLines = true;
                    chart.xAxis.displayBorder = true;
                    return;
                } else {
                    // after non-boundaries are drawn, it's time to draw the boundaries only
                    drawBoundariesOnly = true;

                    // MaRa: Quickfix -> prevent append - draw - append loop crash
                    if (!isDrawingSecondPassBoundary) {
                        isDrawingSecondPassBoundary = true;
                        thisObj.drawXAxis(chart, axisBoundaryReps);
                        isDrawingSecondPassBoundary = false;                        
                    }
                }
            }

            tool.setServiceObjectProperties({
                prependCreateXAxis: prependCreateXAxis,
                prependDrawXAxis: prependDrawXAxis,
                appendDrawXAxis: appendDrawXAxis
            });
        });