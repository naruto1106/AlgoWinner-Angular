agmNgModuleWrapper('agms.chart')
    .defineService("sChartTextEditorService", [],
        function (serviceObj, dep, tool) {

            function init() {
                // MaRa: Text edit functionality
                STX.Drawing.annotation.prototype.reenter = function(context) {
                    var panel = this.stx.panels[this.panelName];
                    if (!panel) return;
                    // When mouse events are attached to the container then any dom objects on top
                    // of the container will intercept those events. In particular, the textarea for
                    // annotations gets in the way, so here we capture the mouseup that fires on the textarea
                    // and pass it along to the kernel if necessary
                    var originalText = this.text;

                    function handleTAMouseUp(stx) {
                        return function(e) {
                            if (stx.manageTouchAndMouse && STXChart.drawingLine) {
                                stx.mouseup(e);
                            }
                        };
                    }

                    function cancelAnnotation(self) {
                        return function() {
                            if (self.ta.value === "") return;
                            self.text = originalText;
                            self.adjust();

                            self.stx.addDrawing(self);
                            self.stx.changeOccurred("vector");
                            self.stx.undo();
                            self.stx.cancelTouchSingleClick = true;
                            self.abort();
                            self.stx.draw();
                        };
                    }

                    function saveAnnotation(self) {
                        return function() {
                            if (self.ta.value === "") return;
                            self.text = self.ta.value;
                            self.adjust();

                            self.stx.addDrawing(self);
                            self.stx.changeOccurred("vector");
                            self.stx.undo();
                            self.stx.cancelTouchSingleClick = true;
                            self.abort();
                            self.stx.draw();
                        };
                    }

                    function resizeAnnotation(self) {
                        return function(e) {
                            if (e) {
                                var key = (window.event) ? event.keyCode : e.keyCode;
                                switch (key) {
                                case 27:
                                    self.stx.undo();
                                    return;
                                }
                            }
                            var stx = self.stx;
                            var ta = self.ta;
                            var save = stx.controls.annotationSave;
                            var cancel = stx.controls.annotationCancel;
                            var arr = ta.value.split('\n');
                            var w = 0;
                            //stx.canvasFont("stx_annotation");
                            stx.chart.context.font = self.fontString;
                            for (var i = 0; i < arr.length; i++) {
                                var m = stx.chart.context.measureText(arr[i]).width;
                                if (m > w) w = m;
                            }
                            h = (arr.length + 1) * (self.fontSize + 3);
                            if (w < 50) w = 50;
                            ta.style.width = (w + 30) + "px"; // Leave room for scroll bar
                            ta.style.height = h + "px";
                            var y = parseInt(STX.stripPX(ta.style.top));
                            var x = STX.stripPX(ta.style.left);
                            w = ta.clientWidth;
                            h = ta.clientHeight;
                            if (x + w + 100 < self.stx.chart.canvasWidth) {
                                save.style.top = y + "px";
                                cancel.style.top = y + "px";
                                save.style.left = (x + w + 10) + "px";
                                cancel.style.left = (x + w + 60) + "px";
                            } else if (y + h + 30 < self.stx.chart.canvasHeight) {
                                save.style.top = (y + h + 10) + "px";
                                cancel.style.top = (y + h + 10) + "px";
                                save.style.left = x + "px";
                                cancel.style.left = (x + 50) + "px";
                            } else {
                                save.style.top = (y - 35) + "px";
                                cancel.style.top = (y - 35) + "px";
                                save.style.left = x + "px";
                                cancel.style.left = (x + 50) + "px";
                            }
                        };
                    }

                    this.stx.undisplayCrosshairs();
                    this.stx.editingAnnotation = true;
                    this.stx.openDialog = "annotation";
                    if (!this.ta) {
                        this.ta = document.createElement("TEXTAREA");
                        this.ta.value = this.text;
                        this.ta.className = "stx_annotation";
                        this.ta.onkeyup = resizeAnnotation(this);
                        this.ta.onmouseup = handleTAMouseUp(this.stx);
                        this.ta.setAttribute("wrap", "hard");
                        if (STX.isIOS7or8) this.ta.setAttribute("placeholder", "Enter Text");
                        this.stx.chart.container.appendChild(this.ta);
                        this.ta.style.position = "absolute";
                        this.ta.style.width = "100px";
                        this.ta.style.height = "20px";
                        if (STX.ipad) {
                            var ta = this.ta;
                            STX.safeClickTouch(this.ta, function(e) {
                                if (document.activeElement === ta) {
                                    window.focus();
                                    STX.focus(ta, true);
                                }
                            });
                        }
                    }
                    var self = this;
                    this.ta.oninput = function(e) {
                        self.onChange(e);
                    };
                    this.ta.style.font = this.fontString;
                    if (this.color) {
                        if (this.color == "transparent" || this.color == "auto") {
                            var styles = getComputedStyle(this.ta);
                            if (styles && STX.isTransparent(styles.backgroundColor)) {
                                this.ta.style.color = this.stx.defaultColor;
                            } else {
                                this.ta.style.color = "#000"; // text area always has white background
                            }
                        } else {
                            this.ta.style.color = this.color;
                        }
                    }
                    var x0 = this.stx.pixelFromTick(this.p0[0], panel.chart);
                    var y0 = this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);

                    this.ta.style.left = x0 + "px";
                    this.ta.style.top = y0 + "px";
                    if (this.name === "callout") {
                        this.ta.style.left = x0 - (!isNaN(this.w) ? this.w / 2 : this.defaultWidth) + "px";
                        this.ta.style.top = y0 - (!isNaN(this.h) ? this.h / 2 : this.defaultHeight) + "px";
                    }

                    this.stx.controls.annotationSave.style.display = "inline-block";
                    this.stx.controls.annotationCancel.style.display = "inline-block";
                    STX.safeClickTouch(this.stx.controls.annotationSave, saveAnnotation(self));
                    STX.safeClickTouch(this.stx.controls.annotationCancel, cancelAnnotation(self));
                    resizeAnnotation(this)();

                    var timeout = 0;
                    if (STX.ipad) timeout = 400;
                    //if(!STX.isIOS7or8){
                    STX.focus(this.ta);
                    //}
                    if (STX.isAndroid) {
                        // Android soft keyboard will cover up the lower half of the browser so if our
                        // annotation is in that area we temporarily scroll the chart container upwards
                        // The style.bottom of the chart container is reset in abort()
                        this.priorBottom = this.stx.chart.container.style.bottom;
                        var keyboardHeight = 400; // hard coded. We could get this by measuring the change in innerHeight but timing is awkward because the keyboard scrolls
                        var screenLocation = this.stx.resolveY(y0) + 100; // figure 100 pixels of height for text
                        if (screenLocation > STX.pageHeight() - keyboardHeight) {
                            var pixelsFromBottomOfScreen = STX.pageHeight() - screenLocation;
                            var scrolledBottom = keyboardHeight - pixelsFromBottomOfScreen;
                            this.stx.chart.container.style.bottom = scrolledBottom + "px";
                        }
                    }
                };
            }

            tool.setServiceObjectProperties({
                init: init
            });
        });
