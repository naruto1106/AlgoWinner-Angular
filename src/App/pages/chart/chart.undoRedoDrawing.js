agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.UndoRedoDrawingController",
        ['pChartRenderingUtilsService'],
        function (vm, dep, tool) {
            var pChartRenderingUtilsService = dep.pChartRenderingUtilsService;

            var undoStack = [];
            var redoStack = [];

            tool.on('viewTemplateSet',
                function() {
                    undoStack.splice(0, undoStack.length);
                    redoStack.splice(0, redoStack.length);
                });

            pChartRenderingUtilsService.stxx.addEventListener("undoStamp", function (data) {
                undoStack.push({ drawings: data.before });
                redoStack = [];
            });


            function undo() {
                // If a drawing tool is in action, then pressing undo will kill the current tool
                var stx = pChartRenderingUtilsService.stxx;
                if (stx.activeDrawing) {
                    stx.undo();
                    return;
                }

                // otherwise proceed to popping off the stack
                var state = undoStack.pop();
                if (state) {
                    redoStack.push({ drawings: STX.shallowClone(stx.drawingObjects) });
                    var drawings = state.drawings;
                    stx.drawingObjects = STX.shallowClone(drawings);
                    stx.changeOccurred("vector");
                    stx.draw();
                }
            }

            function redo() {
                var state = redoStack.pop();
                if (state) {
                    var stx = pChartRenderingUtilsService.stxx;
                    undoStack.push({ drawings: STX.shallowClone(stx.drawingObjects) });
                    var drawings = state.drawings;
                    stx.drawingObjects = STX.shallowClone(drawings);
                    stx.changeOccurred("vector");
                    stx.draw();
                }
            }

            function showUndoRedo() {                
                return !pChartRenderingUtilsService.stxx.currentVectorParameters.vectorType &&
                        (undoStack.length > 0 || redoStack.length > 0);
            }

            
            tool.setVmProperties({
                undo: undo,
                redo: redo,
                showUndoRedo: showUndoRedo
           });

        })
    .defineDirectiveForE('agmp-chart-undo-redo-drawing',
        [],
        function () {
            return {
                controller: "p.chart.UndoRedoDrawingController",
                templateUrl: '/App/pages/chart/chart.undoRedoDrawing.html'
            };
        },
        {});