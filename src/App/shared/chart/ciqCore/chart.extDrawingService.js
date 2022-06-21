agmNgModuleWrapper('agms.chart')
    .defineService("sExtChartDrawingService", [],
        function (serviceObj, dep, tool) {

            var enableEdgeIntersection = true;

            function getAdjustedValue(stx, value) {
                return stx.chart.isComparison
                    ? stx.adjustIfNecessary(stx.chart.panel, stx.crosshairTick,
                                            stx.valueFromPixelUntransform(stx.backOutY(STXChart.crosshairY), stx.chart.panel))
                    : value;
            }

            function init() {
                if (enableEdgeIntersection) {
                    /**
                     * CIQ Hack MaRa: Rectangle, ellipse, channel edge intersection
                     */
                    STX.Drawing.rectangle.prototype.edgeIntersection = function (tick, value, box) {
                        if (!this.p0 || !this.p1) return false;
                        if (tick === Math.min(this.p0[0], this.p1[0]) || tick === Math.max(this.p0[0], this.p1[0])) {
                            if (value >= Math.min(this.p0[1], this.p1[1]) && value <= Math.max(this.p0[1], this.p1[1])) return true;
                        }
                        if (this.stx.layout.semiLog || this.stx.layout.chartScale == "log") {
                            return STX.boxIntersects(box.x0, STX.log10(box.y0), box.x1, STX.log10(box.y1), this.p0[0], STX.log10(this.p0[1]), this.p[0], STX.log10(this.p0[1]), "segment") ||
                                STX.boxIntersects(box.x0, STX.log10(box.y0), box.x1, STX.log10(box.y1), this.p0[0], STX.log10(this.p1[1]), this.p1[0], STX.log10(this.p1[1]), "segment");
                        } else {
                            return STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, this.p0[0], this.p0[1], this.p1[0], this.p0[1], "segment") ||
                                STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, this.p0[0], this.p1[1], this.p1[0], this.p1[1], "segment");
                        }
                    };
                    STX.Drawing.rectangle.prototype.intersected = function (tick, value, box) {
                        value = getAdjustedValue(this.stx, value);
                        this.whichPoint = null;
                        if (!this.p0 || !this.p1) return null; // in case invalid drawing (such as from panel that no longer exists)
                        if (this.pointIntersection(this.p0[0], this.p0[1], box)) {
                            this.highlighted = "p0";
                            this.whichPoint = "p0";
                            return {
                                action: "drag",
                                point: "p0"
                            };
                        } else if (this.pointIntersection(this.p1[0], this.p1[1], box)) {
                            this.highlighted = "p1";
                            this.whichPoint = "p1";
                            return {
                                action: "drag",
                                point: "p1"
                            };
                        }
                        if (this.edgeIntersection(tick, value, box)) {
                            this.highlighted = true;
                            return {
                                action: "move",
                                p0: STX.clone(this.p0),
                                p1: STX.clone(this.p1),
                                tick: tick,
                                value: value
                            };
                        }
                        return null;
                    };

                    STX.Drawing.ellipse.prototype.intersected = function (tick, value, box) {
                        value = getAdjustedValue(this.stx, value);
                        this.whichPoint = null;
                        if (!this.p0 || !this.p1) return null; // in case invalid drawing (such as from panel that no longer exists)
                        if (this.pointIntersection(this.p1[0], this.p1[1], box)) {
                            this.highlighted = "p1";
                            this.whichPoint = "p1";
                            return {
                                action: "drag",
                                point: "p1"
                            };
                        }
                        var left = this.p0[0] - (this.p1[0] - this.p0[0]);
                        var right = this.p1[0];
                        var bottom = this.p1[1];
                        var top = this.p0[1] - (this.p1[1] - this.p0[1]);

                        var centerx = (left + right) / 2;
                        var centery = (bottom + top) / 2;
                        var radx = (Math.max(left, right) - Math.min(left, right)) / 2;
                        var rady = (Math.max(top, bottom) - Math.min(top, bottom)) / 2;
                        var radxmin = (Math.max(left, right) - Math.min(left, right) - Math.abs(box.x1 - box.x0)) / 2;
                        var radymin = (Math.max(top, bottom) - Math.min(top, bottom) - Math.abs(box.y1 - box.y0)) / 2;
                        var radxmax = (Math.max(left, right) - Math.min(left, right) + Math.abs(box.x1 - box.x0)) / 2;
                        var radymax = (Math.max(top, bottom) - Math.min(top, bottom) + Math.abs(box.y1 - box.y0)) / 2;

                        var pointres = Math.pow(Math.abs(tick - centerx), 2) * Math.pow(rady, 2) + Math.pow(Math.abs(value - centery), 2) * Math.pow(radx, 2);

                        var moveIt = false;
                        var scaleToleranceMin = Math.pow((radxmin) * (radymin), 2);
                        var scaleToleranceMax = Math.pow((radxmax) * (radymax), 2);
                        if (pointres >= scaleToleranceMin && pointres <= scaleToleranceMax) {
                            moveIt = true;
                        } else {
                            if (tick === Math.min(left, right) || tick === Math.max(left, right)) {
                                if (value >= Math.min(top, bottom) && value <= Math.max(top, bottom)) {
                                    moveIt = true;
                                }
                            } else {
                                if (this.stx.layout.semiLog || this.stx.layout.chartScale == "log") {
                                    moveIt = STX.boxIntersects(box.x0, STX.log10(box.y0), box.x1, STX.log10(box.y1), left, STX.log10(top), right, STX.log10(top), "segment") ||
                                        STX.boxIntersects(box.x0, STX.log10(box.y0), box.x1, STX.log10(box.y1), left, STX.log10(bottom), right, STX.log10(bottom), "segment");
                                } else {
                                    moveIt = STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, left, top, right, top, "segment") ||
                                        STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, left, bottom, right, bottom, "segment");
                                }
                            }
                        }


                        if (moveIt) {
                            this.highlighted = true;
                            return {
                                action: "move",
                                p0: STX.clone(this.p0),
                                p1: STX.clone(this.p1),
                                tick: tick,
                                value: value
                            };
                        } else {
                            return false;
                        }
                    };
                    STX.Drawing.channel.prototype.edgeIntersection = function (tick, value, box) {
                        if (!this.p0 || !this.p1) return false;

                        var verticalDiff = this.p1[1] - this.p2[1];

                        if (this.stx.layout.semiLog || this.stx.layout.chartScale == "log") {
                            return STX.boxIntersects(box.x0, STX.log10(box.y0), box.x1, STX.log10(box.y1), this.p0[0], STX.log10(this.p0[1]), this.p1[0], STX.log10(this.p1[1]), "segment") ||
                                STX.boxIntersects(box.x0, STX.log10(box.y0), box.x1, STX.log10(box.y1), this.p0[0], STX.log10(this.p0[1] - verticalDiff), this.p2[0], STX.log10(this.p2[1]), "segment");
                        } else {
                            return STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, this.p0[0], this.p0[1], this.p1[0], this.p1[1], "segment") ||
                                STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, this.p0[0], this.p0[1] - verticalDiff, this.p2[0], this.p2[1], "segment");
                        }
                    };
                    STX.Drawing.channel.prototype.intersected = function (tick, value, box) {
                        value = getAdjustedValue(this.stx, value);
                        this.whichPoint = null;
                        if (!this.p0 || !this.p1 || !this.p2) return null; // in case invalid drawing (such as from panel that no longer exists)
                        if (this.pointIntersection(this.p0[0], this.p0[1], box)) {
                            this.whichPoint = "p0";
                            this.highlighted = "p0";
                            return {
                                action: "drag",
                                point: "p0"
                            };
                        } else if (this.pointIntersection(this.p1[0], this.p1[1], box)) {
                            this.highlighted = "p1";
                            this.whichPoint = "p1";
                            return {
                                action: "drag",
                                point: "p1"
                            };
                        } else if (this.pointIntersection(this.p2[0], this.p2[1], box)) {
                            this.highlighted = "p2";
                            this.whichPoint = "p2";
                            return {
                                action: "drag",
                                point: "p2"
                            };
                        }
                        if (this.edgeIntersection(tick, value, box)) {
                            this.highlighted = true;
                            // This object will be used for repositioning
                            return {
                                action: "move",
                                p0: STX.clone(this.p0),
                                p1: STX.clone(this.p1),
                                p2: STX.clone(this.p2),
                                tick: tick, // save original tick
                                value: value // save original value
                            };
                        } else {
                            return null;
                        }
                    };
                }

                // MaRa: Use this service to override ChartIQ original drawing object behavior
                STX.Drawing.callout.prototype.onChange = function (e) {
                    var panel = this.stx.panels[this.panelName];
                    if (!panel) return;
                    var textarea = e.target;
                    this.w = textarea.clientWidth;
                    this.h = textarea.clientHeight;
                    textarea.style.left = (this.stx.pixelFromTick(this.p0[0]) - this.w / 2) + "px";
                    textarea.style.top = (this.stx.pixelFromPrice(this.p0[1], panel) - this.h / 2) + "px";
                    //STX.clearCanvas(this.context.canvas);
                    //this.render(this.context);
                };

                STX.Drawing.regression = function () {
                    this.name = "regression";
                };
                STX.Drawing.regression.stxInheritsFrom(STX.Drawing.segment);
                STX.extend(STX.Drawing.regression.prototype, {
                    click: function (context, tick, value) {
                        if (tick < 0) return;
                        this.copyConfig();
                        var panel = this.stx.panels[this.panelName];
                        if (!this.penDown) {
                            this.setPoint(0, tick, value, panel.chart);
                            this.penDown = true;
                            return false;
                        }
                        if (this.accidentalClick(tick, value)) return this.dragToDraw;

                        this.setPoint(1, tick, value, panel.chart);
                        this.penDown = false;
                        return true; // kernel will call render after this
                    },
                    lineIntersection: function (tick, value, box, type) {
                        if (!this.p0 || !this.p1) return false;
                        if (this.stx.layout.semiLog || this.stx.layout.chartScale == "log") {
                            return STX.boxIntersects(box.x0, STX.log10(box.y0), box.x1, STX.log10(box.y1), this.p0[0], STX.log10(this.p0[1]), this.p1[0], STX.log10(this.p1[1]), "segment");
                        } else {
                            return STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, this.p0[0], this.p0[1], this.p1[0], this.p1[1], "segment");
                        }
                    },
                    render: function (context) {
                        var panel = this.stx.panels[this.panelName];
                        if (!panel) return;
                        if (!this.p1) return;
                        if (this.p0[0] < 0) this.p0[0] = 0;
                        if (this.p1[0] < 0) this.p1[0] = 0;
                        var x0 = this.stx.pixelFromTick(this.p0[0], panel.chart);
                        var x1 = this.stx.pixelFromTick(this.p1[0], panel.chart);

                        var prices = [];
                        var sumCloses = 0;
                        var sumWeightedCloses = 0;
                        var sumClosesSquared = 0;
                        var rawTicks = 0;
                        for (var i = Math.min(this.p1[0], this.p0[0]) ; i <= Math.max(this.p1[0], this.p0[0]) ; i++) {
                            if (this.stx.chart.dataSet[i]) {
                                var price = this.stx.chart.dataSet[i].Close;
                                if (price || price === 0) {
                                    prices.push(price);
                                }
                            }
                            rawTicks++;
                        }
                        for (i = 0; i < prices.length; i++) {
                            sumWeightedCloses += prices.length * prices[i] - sumCloses;
                            sumCloses += prices[i];
                            sumClosesSquared += Math.pow(prices[i], 2);
                        }
                        var ticks = prices.length;
                        var sumWeights = ticks * (ticks + 1) / 2;
                        var squaredSumWeights = Math.pow(sumWeights, 2);
                        var sumWeightsSquared = sumWeights * (2 * ticks + 1) / 3;
                        var slope = (ticks * sumWeightedCloses - sumWeights * sumCloses) / (ticks * sumWeightsSquared - squaredSumWeights);
                        var intercept = (sumCloses - slope * sumWeights) / ticks;
                        var y0, y1;
                        if (this.p0[0] < this.p1[0]) {
                            y0 = this.stx.pixelFromValueAdjusted(panel, this.p0[0], intercept);
                            y1 = this.stx.pixelFromValueAdjusted(panel, this.p1[0], slope * rawTicks + intercept);
                        } else {
                            y0 = this.stx.pixelFromValueAdjusted(panel, this.p0[0], slope * rawTicks + intercept);
                            y1 = this.stx.pixelFromValueAdjusted(panel, this.p1[0], intercept);
                        }
                        var trendLineColor = this.color;
                        if (trendLineColor == "auto" || STX.isTransparent(trendLineColor)) trendLineColor = this.stx.defaultColor;
                        if (this.highlighted) {
                            trendLineColor = this.stx.getCanvasColor("stx_highlight_vector");
                        }
                        var parameters = {
                            pattern: this.pattern,
                            lineWidth: this.lineWidth
                        };
                        this.stx.plotLine(x0, x1, y0, y1, trendLineColor, "segment", context, panel, parameters);
                        this.stx.plotLine(x0, x0, y0 - 20, y0 + 20, trendLineColor, "segment", context, panel, parameters);
                        this.stx.plotLine(x1, x1, y1 - 20, y1 + 20, trendLineColor, "segment", context, panel, parameters);


                        if (!this.highlighted) {
                            //move points
                            if (this.p0[0] < this.p1[0]) {
                                this.setPoint(0, this.p0[0], intercept, panel.chart);
                                this.setPoint(1, this.p1[0], slope * rawTicks + intercept, panel.chart);
                            } else {
                                this.setPoint(0, this.p0[0], slope * rawTicks + intercept, panel.chart);
                                this.setPoint(1, this.p1[0], intercept, panel.chart);
                            }
                        } else {
                            var p0Fill = this.whichPoint == "p0" ? true : false;
                            var p1Fill = this.whichPoint == "p1" ? true : false;
                            this.littleCircle(context, x0, y0, p0Fill);
                            this.littleCircle(context, x1, y1, p1Fill);
                        }
                    }
                });

                //// AdSa: The ChartIQ implementation of reposition is totally broken when chart is normalized because the y-value is not transformed
                //// All instances of values when action == 'move' should be adjusted if necessary
                //// Everything else is a copy-paste from original function                            
                STX.Drawing.pitchfork.prototype.intersected = function (tick, value, box) {
                    value = getAdjustedValue(this.stx, value);
                    this.whichPoint = null;
                    if (!this.p0 || !this.p1 || !this.p2) return null; // in case invalid drawing (such as from panel that no longer exists)
                    if (this.pointIntersection(this.p0[0], this.p0[1], box)) {
                        this.whichPoint = "p0";
                        this.highlighted = "p0";
                        return {
                            action: "drag",
                            point: "p0"
                        };
                    } else if (this.pointIntersection(this.p1[0], this.p1[1], box)) {
                        this.highlighted = "p1";
                        this.whichPoint = "p1";
                        return {
                            action: "drag",
                            point: "p1"
                        };
                    } else if (this.pointIntersection(this.p2[0], this.p2[1], box)) {
                        this.highlighted = "p2";
                        this.whichPoint = "p2";
                        return {
                            action: "drag",
                            point: "p2"
                        };
                    }
                    var isIntersected = this.lineIntersection(tick, value, box, "ray");
                    if (isIntersected) {
                        this.highlighted = true;
                        // This object will be used for repositioning
                        return {
                            action: "move",
                            p0: STX.clone(this.p0),
                            p1: STX.clone(this.p1),
                            p2: STX.clone(this.p2),
                            tick: tick, // save original tick
                            value: value // save original value
                        };
                    } else {
                        return null;
                    }
                };

                STX.Drawing.callout.prototype.intersected = function (tick, value, box) {
                    value = getAdjustedValue(this.stx, value);
                    var panel = this.stx.panels[this.panelName];
                    if (!this.p0) return null; // in case invalid drawing (such as from panel that no longer exists)
                    if (this.pointIntersection(this.stem.t, this.stem.v, box)) {
                        this.whichPoint = "p0";
                        this.highlighted = "p0";
                        return {
                            action: "drag",
                            stem: true
                        };
                    }
                    var x0 = this.stx.pixelFromTick(this.p0[0], panel.chart) - this.w / 2;
                    var y0 = this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]) - this.h / 2;
                    var x1 = x0 + this.w;
                    var y1 = y0 + this.h;
                    if (this.stem && this.stem.x) {
                        x0 += this.stem.x;
                        x1 += this.stem.x;
                        y0 += this.stem.y;
                        y1 += this.stem.y;
                    }
                    var x = this.stx.pixelFromTick(tick, panel.chart);
                    var y = this.stx.pixelFromValueAdjusted(panel, tick, value);
                    if (x >= x0 && x <= x1 && y >= y0 && y <= y1) return {
                        p0: STX.clone(this.p0),
                        tick: tick,
                        value: value
                    };
                    var isIntersected = this.lineIntersection(tick, value, box, "segment");
                    if (isIntersected) {
                        this.highlighted = true;
                        // This object will be used for repositioning
                        return {
                            action: "move",
                            stem: STX.clone(this.stem),
                            p0: STX.clone(this.p0),
                            tick: tick, // save original tick
                            value: value // save original value
                        };
                    } else {
                        return null;
                    }
                };

                STX.Drawing.shape.prototype.intersected = function (tick, value, box) {
                    value = getAdjustedValue(this.stx, value);
                    if (!this.p0) return null; // in case invalid drawing (such as from panel that no longer exists)
                    if (this.stx.repositioningDrawing == this && this.stx.repositioningDrawing.repositioner) return this.stx.repositioningDrawing.repositioner;
                    this.whichPoint = null;

                    var panel = this.stx.panels[this.panelName];
                    var x0 = this.stx.pixelFromTick(this.p0[0], panel.chart);
                    var y0 = this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
                    var x1 = this.stx.pixelFromTick(tick, panel.chart);
                    var y1 = this.stx.pixelFromValueAdjusted(panel, tick, value);

                    x1 -= x0;
                    y1 -= y0;
                    var y1t = y1, x1t = x1;
                    x1 = Math.cos(this.radians) * x1t + Math.sin(this.radians) * y1t;
                    y1 = Math.cos(this.radians) * y1t - Math.sin(this.radians) * x1t;
                    x1 /= this.sx;
                    y1 /= this.sy;
                    var circleR2 = Math.pow(5 + this.littleCircleRadius(), 2);
                    var scaledCircleR2 = Math.abs(circleR2 / (this.sx * this.sy));
                    var overShape = Math.pow(this.dimension[0] / 2, 2) + Math.pow(this.dimension[1] / 2, 2) > (Math.pow(x1, 2) + Math.pow(y1, 2));
                    var moveProximity = (circleR2 - (Math.pow(x1 * this.sx, 2) + Math.pow(y1 * this.sy, 2))) / Math.abs(this.sx * this.sy);
                    var scaleProximity = scaledCircleR2 - (Math.pow(x1 - this.dimension[0] / 2, 2) + Math.pow(y1 - this.dimension[1] / 2, 2));
                    var rotateProximity = scaledCircleR2 - (Math.pow(x1 - this.dimension[0] / 2, 2) + Math.pow(y1, 2));
                    //console.log("s:"+scaleProximity+" r:"+rotateProximity+" m:"+moveProximity);
                    if (scaleProximity > 0 && scaleProximity >= rotateProximity && scaleProximity >= moveProximity) {
                        this.highlighted = "p1";
                        this.whichPoint = "p1";
                        return {
                            action: "scale"
                        };
                    } else if (rotateProximity > 0 && rotateProximity >= scaleProximity && rotateProximity >= moveProximity) {
                        this.highlighted = "p2";
                        this.whichPoint = "p2";
                        return {
                            action: "rotate"
                        };
                    } else if (moveProximity > 0 && moveProximity >= scaleProximity && moveProximity >= rotateProximity) {
                        this.highlighted = "p0";
                        this.whichPoint = "p0";
                        return {
                            action: "move",
                            p0: STX.clone(this.p0),
                            tick: tick,
                            value: value
                        };
                    } else if (overShape) {
                        this.highlighted = "p0";
                        return {};
                    }
                    return null;
                };

                STX.Drawing.annotation.prototype.intersected = function (tick, value, box) {
                    var panel = this.stx.panels[this.panelName];
                    if (!this.p0) return null; // in case invalid drawing (such as from panel that no longer exists)
                    var x0 = this.stx.pixelFromTick(this.p0[0], panel.chart);
                    var y0 = this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
                    var x1 = x0 + this.w;
                    var y1 = y0 + this.h;
                    if (this.stem && this.stem.x) {
                        x0 += this.stem.x;
                        x1 += this.stem.x;
                        y0 += this.stem.y;
                        y1 += this.stem.y;
                    }
                    var x = this.stx.pixelFromTick(tick, panel.chart);
                    var y = this.stx.pixelFromPrice(value, panel);

                    if (x >= x0 && x <= x1 && y >= y0 && y <= y1) return {
                        p0: STX.clone(this.p0),
                        tick: tick,
                        value: getAdjustedValue(this.stx, value)
                    };
                    return false;
                    //return this.boxIntersection(tick, value);
                };

                STX.Drawing.fibonacci.prototype.intersected = function (tick, value, box) {
                    value = getAdjustedValue(this.stx, value);
                    //TODO, find some efficient way to allow an intersection across the entire trend line, not just between the two clicked points
                    if (!this.p0 || !this.p1) return null; // in case invalid drawing (such as from panel that no longer exists)
                    if (STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, this.outer.p0[0], this.outer.p0[1], this.outer.p1[0], this.outer.p1[1], "segment")) {
                        if (this.pointIntersection(this.p0[0], this.p0[1], box)) {
                            this.highlighted = "p0";
                            this.whichPoint = "p0";
                            return {
                                action: "drag",
                                point: "p0"
                            };
                        } else if (this.pointIntersection(this.p1[0], this.p1[1], box)) {
                            this.highlighted = "p1";
                            this.whichPoint = "p1";
                            return {
                                action: "drag",
                                point: "p1"
                            };
                        }
                        // This object will be used for repositioning
                        this.highlighted = true;
                        return {
                            action: "move",
                            p0: STX.clone(this.p0),
                            p1: STX.clone(this.p1),
                            tick: tick, // save original tick
                            value: value // save original value
                        };
                    }
                    return null;
                };
            }

            tool.setServiceObjectProperties({
                init: init
            });
        });
