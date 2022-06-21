agmNgModuleWrapper('agmp.chart')
    .defineController("p.chart.DrawingToolController",
        ['pChartService', 'pChartRenderingUtilsService', "sChartDrawingService"],
        function (vm, dep, tool) {
            var pChartService = dep.pChartService,
                sChartDrawingService = dep.sChartDrawingService,
                pChartRenderingUtilsService = dep.pChartRenderingUtilsService;

            var drawingTypes = [
                {
                    Name: "annotation",
                    Src: "/App/assets/icons/charttool/annotation.svg",
                    Icon: 'algoicons-letter',
                    DisplayName: "Text"
                }, {
                    Name: "fibonacci",
                    Src: "/App/assets/icons/charttool/fibonacci.svg",
                    Icon: 'algoicons-fibonacci',
                    DisplayName: "Fibonacci"
                }, {
                    Name: "horizontal",
                    Src: "/App/assets/icons/charttool/horizontal1.svg",
                    Icon: 'algoicons-line-h',
                    DisplayName: "Horizontal"
                }, {
                    Name: "vertical",
                    Src: "/App/assets/icons/charttool/vertical1.svg",
                    Icon: 'algoicons-line-v',
                    DisplayName: "Vertical"
                }, {
                    Name: "segment",
                    Src: "/App/assets/icons/charttool/segment.svg",
                    Icon: 'algoicons-freeline',
                    DisplayName: "Line"
                }, {
                    Name: "ray",
                    Src: "/App/assets/icons/charttool/ray.svg",
                    Icon: 'algoicons-ray',
                    DisplayName: "Ray"
                }, {
                    Name: "line",
                    Src: "/App/assets/icons/charttool/line1.svg",
                    Icon: 'algoicons-extended-line',
                    DisplayName: "Extended Line"
                }, {
                    Name: "rectangle",
                    Src: "/App/assets/icons/charttool/rectangle.svg",
                    Icon: 'algoicons-square',
                    DisplayName: "Rectangle"
                }, {
                    Name: "ellipse",
                    Src: "/App/assets/icons/charttool/ellipse.svg",
                    Icon: 'algoicons-ellipse',
                    DisplayName: "Ellipse"
                }, {
                    Name: "freeform",
                    Src: "/App/assets/icons/charttool/freeform.svg",
                    Icon: 'algoicons-free',
                    DisplayName: "Free Form"
                }, {
                    Name: "arrow",
                    Src: "/App/assets/icons/charttool/arrow.svg",
                    Icon: 'algoicons-arrow',
                    DisplayName: "Arrow"
                }, {
                    Name: "channel",
                    Src: "/App/assets/icons/charttool/channel.svg",
                    Icon: 'algoicons-para',
                    DisplayName: "Channel"
                }, {
                    Name: "callout",
                    Src: "/App/assets/icons/charttool/callout.svg",
                    Icon: 'algoicons-callout',
                    DisplayName: "Callout"
                },
                {
                    Name: "regression",
                    Src: "/App/assets/icons/charttool/regression.svg",
                    Icon: 'algoicons-regression',
                    DisplayName: "Linear Regression"
                }
            ];
            
            function stepDrawingCompleted() {
                sChartDrawingService.stopDrawing();
            }

            function setChartDrawingType(drawingType) {
                vm.drawings.drawingType = drawingType;
                if (pChartRenderingUtilsService && pChartRenderingUtilsService.stxx) {
                    pChartRenderingUtilsService.stxx.changeVectorType(vm.drawings.drawingType.Name);
                    STX.Drawing.prototype.permanent = true;
                    $$$(".stx-panel-chart .stx-subholder").style.cursor = "crosshair";
                    var studySubholder = $$$(".stx-panel-study .stx-subholder");
                    if (studySubholder) {
                        studySubholder.style.cursor = "crosshair";
                    }
                    $("body").css("cursor", "");
                }
            }

            function toggleDesktopDrawing() {
                vm.drawings.desktopDrawing = !vm.drawings.desktopDrawing;
                pChartRenderingUtilsService.isDesktopDrawing = !pChartRenderingUtilsService.isDesktopDrawing,
                STX.Drawing.prototype.dragToDraw = vm.drawings.desktopDrawing;
            }

            function clearDrawings() {
                if (pChartRenderingUtilsService && pChartRenderingUtilsService.stxx) {                    
                    pChartRenderingUtilsService.stxx.clearDrawings();
                }
            }
            function isCurrentDrawing(obj) {
                return obj === vm.drawings.drawingType;
            }

            tool.setVmProperties({
                isCurrentDrawing: isCurrentDrawing,
                drawings: pChartService.drawings,
                drawingTypes: drawingTypes,
                setChartDrawingType: setChartDrawingType,
                toggleDesktopDrawing: toggleDesktopDrawing,
                clearDrawings: clearDrawings,
                stepDrawingCompleted: stepDrawingCompleted
            });

            tool.initialize(function () {
                vm.drawings.drawingType = null;
                vm.drawings.desktopDrawing = STX.Drawing.prototype.dragToDraw;
                pChartRenderingUtilsService.isDesktopDrawing = STX.Drawing.prototype.dragToDraw;

                tool.on('onStepDrawingCompleted', stepDrawingCompleted);

                var fibonacciLevels = pChartRenderingUtilsService.stxx.currentVectorParameters.fibonacci.fibs;
                fibonacciLevels.push({
                    level: 0.786,
                    color: "auto",
                    parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 }
                });
                fibonacciLevels.push({
                    level: 1.272,
                    color: "auto",
                    parameters: { pattern: "solid", opacity: 0.25, lineWidth: 1 }
                });                

                /*pChartRenderingUtilsService.stxx.changeCallback = function (stxx, eventType) {
                    if (eventType === "drawing") {
                        $("body").css("cursor", "");
                    }
                }*/
            });
        }
    )
    .defineDirectiveForE('agmp-chart-drawing-tool',
        [],
        function () {
            return {
                controller: "p.chart.DrawingToolController",
                templateUrl: '/App/pages/chart/chart.drawingTool.html'
            };
        },
        {});