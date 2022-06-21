agmNgModuleWrapper('agms.chart')
    .defineService("sChartDrawingService", ['pChartService', 'pChartRenderingUtilsService'],
    function (serviceObj, dep, tool) {
        var pChartService = dep.pChartService;
        var pChartRenderingUtilsService = dep.pChartRenderingUtilsService;

        function stopDrawing() {
            pChartService.drawings.drawingType = null;
            pChartRenderingUtilsService.stxx.changeVectorType('');
            STX.Drawing.prototype.permanent = false;
            $$$(".stx-panel-chart .stx-subholder").style.cursor = "default";
            var studySubholder = $$$(".stx-panel-study .stx-subholder");
            if (studySubholder) {
                studySubholder.style.cursor = "default";
            }
            $("body").css("cursor", "");
        }

        function configureDrawing(cru, highlightedDrawing) {
            if (cru.stxx.openDialog !== "") return; // only allow one dialog to be open
            var before = _.map(cru.stxx.drawingObjects,
                function(drawingObj) {
                    return STX.shallowClone(drawingObj);
                });
                    
            STX.DialogManager.displayDialog("drawingDialog");
            $$("drawingDialog").querySelectorAll(".title")[0].innerHTML = "Drawing Option";
            if (highlightedDrawing.lineWidth) {
                $$("drawingWidthPicker").style.display = "block";
                $$$(".stx-width", $$("drawingDialog")).value = highlightedDrawing.lineWidth;
            } else {
                $$("drawingWidthPicker").style.display = "none";
            }
            if (highlightedDrawing.color !== "auto") {
                $$$(".stx-color", $$("drawingColorPicker")).style.backgroundColor = highlightedDrawing.color;
            } else {
                $$$(".stx-color", $$("drawingColorPicker")).style.backgroundColor = "#000000";
            }
            if (highlightedDrawing.fillColor) {
                $$("drawingFillColorPicker").style.display = "block";
                $$$(".stx-color", $$("drawingFillColorPicker")).style.backgroundColor = highlightedDrawing.fillColor;
            } else {
                $$("drawingFillColorPicker").style.display = "none";
            }
            if (highlightedDrawing.text) {
                $$("chartTextEditor").style.display = "inline-block";
                $$("drawingColorPickerLabel").innerHTML = "Text Color:";
            } else {
                $$("chartTextEditor").style.display = "none";
                $$("drawingColorPickerLabel").innerHTML = "Line Color:";
            }

            var duplicate = $$$(".stx-duplicate", $$("drawingDialog"));
            var remove = $$$(".stx-delete", $$("drawingDialog"));
            var ok = $$$(".stx-ok", $$("drawingDialog"));
            var editText = $$$(".stx-edit-text", $$("drawingDialog"));

                
            STX.safeClickTouch(duplicate, function () {                    
                STX.DialogManager.dismissDialog();
                var Factory = STXChart.drawingTools[highlightedDrawing.name],
                    clonedDrawing = new Factory();
                clonedDrawing.reconstruct(cru.stxx, highlightedDrawing.serialize());
                cru.stxx.drawingObjects.push(clonedDrawing);
                clonedDrawing.repositioner = highlightedDrawing.repositioner;

                var hinterval = 10; //hard-code for now
                var vinterval = cru.stxx.chart.yAxis.priceTick / 2.0; //half of a grid
                if (clonedDrawing.p0) {
                    clonedDrawing.setPoint(0, clonedDrawing.p0[0] + hinterval, clonedDrawing.p0[1], cru.stxx.chart);
                    clonedDrawing.p0[1] -= vinterval;
                }
                if (clonedDrawing.p1) {
                    clonedDrawing.setPoint(1, clonedDrawing.p1[0] + hinterval, clonedDrawing.p1[1], cru.stxx.chart);
                    clonedDrawing.p1[1] -= vinterval;
                }
                if (clonedDrawing.v0) clonedDrawing.v0 -= vinterval;
                if (clonedDrawing.v1) clonedDrawing.v1 -= vinterval;
                if (clonedDrawing.hiX) clonedDrawing.hiX += hinterval;
                if (clonedDrawing.hiY) clonedDrawing.hiY -= vinterval;
                if (clonedDrawing.lowX) clonedDrawing.lowX += hinterval;
                if (clonedDrawing.lowY) clonedDrawing.lowY -= vinterval;
                if (clonedDrawing.startX) clonedDrawing.startX += hinterval;
                if (clonedDrawing.startY) clonedDrawing.startY -= vinterval;

                if (clonedDrawing.lineWidth) clonedDrawing.lineWidth = 1;
                cru.stxx.draw();

                cru.stxx.undoStamp(before, STX.shallowClone(cru.stxx.drawingObjects));
            });
            STX.safeClickTouch(remove, function () {
                STX.DialogManager.dismissDialog();
                cru.stxx.removeDrawing(highlightedDrawing);
                cru.stxx.undoStamp(before, STX.shallowClone(cru.stxx.drawingObjects));
            });
            STX.safeClickTouch(ok, function () {
                var width = parseInt($$$(".stx-width", $$("drawingDialog")).value);
                if (width && !isNaN(width)) {
                    highlightedDrawing.lineWidth = width;
                }
                STX.DialogManager.dismissDialog();
                cru.stxx.draw();
                cru.stxx.undoStamp(before, STX.shallowClone(cru.stxx.drawingObjects));
            });
            STX.safeClickTouch(editText, function () {                    
                STX.DialogManager.dismissDialog();
                highlightedDrawing.reenter(cru.stxx.chart.context);
                cru.stxx.removeDrawing(highlightedDrawing);                    
            });
        }

        tool.setServiceObjectProperties({
            stopDrawing: stopDrawing,
            configureDrawing: configureDrawing
        });
    }
);
