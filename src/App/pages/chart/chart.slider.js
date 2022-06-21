agmNgModuleWrapper('agmp.chart')
    .defineController('p.chart.SliderController', ['pChartRenderingUtilsService', 'pChartFilterDescriptionService',
    'pChartPeriodicityService'],
        function (vm, dep, tool) {
            vm.isGrabbing = false;

            var pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartPeriodicityService = dep.pChartPeriodicityService;

            var filterDescription = pChartFilterDescriptionService;

            tool.setVmProperties({
                filterDescription: filterDescription,
            });

            tool.onRendered(function () {
                var element = vm._getDirectiveElement();
                var node = element.find(".node");
                var left = node.find(".left");
                var right = node.find(".right");
                var marginLeft = element.find(".margin.left");
                var marginRight = element.find(".margin.right");

                var svg = element.find("svg");

                var minDate = new Date(2001, 0, 1);
                var stxx = pChartRenderingUtilsService.stxx;

                var mouse_status = {};
                node.on("touchstart", nodemousedown).on("mousedown", nodemousedown);
                left.on("touchstart", leftmousedown).on("mousedown", leftmousedown);
                right.on("touchstart", rightmousedown).on("mousedown", rightmousedown);

                function mousedown(e) {
                    vm.isGrabbing = true;
                    $(window).on("touchmove", mousemove).on("mousemove", mousemove);
                    $(window).on("touchend", mouseup).on("mouseup", mouseup);
                    mouse_status.scroll = stxx.chart.scroll;
                    mouse_status.x = e.pageX;
                    mouse_status.left = (stxx.chart.dataSet.length - stxx.chart.scroll) + 1;
                    if (mouse_status.left < 0) mouse_status.left = 0;
                    mouse_status.right = stxx.chart.dataSet.length - stxx.chart.scroll + stxx.chart.maxTicks - 1;
                    if (mouse_status
                        .right >
                        stxx.chart.dataSet.length) mouse_status.right = stxx.chart.dataSet.length - 1;
                    e.preventDefault();
                    e.stopPropagation();
                    dep.$scope.$evalAsync();
                }

                function nodemousedown(e) {
                    mousedown(e);
                    mouse_status.context = "node";
                }

                function leftmousedown(e) {
                    mousedown(e);
                    mouse_status.context = "left";
                    left.addClass("grabbing");
                }

                function rightmousedown(e) {
                    mousedown(e);
                    mouse_status.context = "right";
                    right.addClass("grabbing");
                }

                dep.$scope.$on("onStxChartDrawn",
                    function () {
                        var totalWidth = element[0].clientWidth;
                        var newMinDate = stxx.chart.dataSet[0].DT;
                        if (minDate !== newMinDate) {
                            minDate = newMinDate;
                            createRulerMarks(element);
                            mouseup();
                        }
                        if (mouse_status.width !== element[0].clientWidth) createRulerMarks(element);
                        var leftIndex = Math.max((stxx.chart.dataSet.length - stxx.chart.scroll + 1), 0);
                        var rightIndex = Math.min((stxx.chart.dataSet.length - stxx.chart.scroll + stxx.chart.maxTicks - 1), stxx.chart.dataSet.length - 1);
                        setLeftRight(leftIndex / stxx.chart.dataSet.length * totalWidth,
                                     rightIndex / stxx.chart.dataSet.length * totalWidth);

                    });

                function setLeftRight(left, right) {
                    node[0].style.left = left + "px";
                    marginLeft[0].style.width = left + "px";

                    node[0].style.width = (right - left) + "px";
                    marginRight[0].style.left = (right) + "px";
                }


                function mousemove(e) {
                    if (e.buttons === 0) {
                        mouseup();
                    }
                    var totalWidth = element[0].clientWidth;
                    var chartWidth = stxx.chart.width;
                    var maxTicks = Math.floor(chartWidth / stxx.minimumCandleWidth);
                    var minTicks = 10;
                    var diff = e.pageX - mouse_status.x;
                    var result = diff / totalWidth * stxx.chart.dataSet.length;
                    var step = Math.floor(result);

                    if (mouse_status.context === "node") {                        
                        stxx.chart.scroll = mouse_status.scroll - step;
                        stxx.draw();
                    } else if (mouse_status.context === "left") {                        
                        var newLeft = mouse_status.left + step;
                        if (mouse_status.right - newLeft > maxTicks) {
                            stxx.chart.scroll = mouse_status.scroll - step;
                            stxx.draw();                            
                        } else {
                            if (mouse_status.right - newLeft < minTicks) {
                                return;
                            }
                            if (newLeft < stxx.chart.dataSet.length && newLeft >= 0) {
                                var periodicity = pChartPeriodicityService.getPeriodicity(vm.filterDescription.barSize);
                                pChartRenderingUtilsService.setRange(stxx.chart.dataSet[newLeft].DT,
                                    stxx.chart.dataSet[mouse_status.right].DT,
                                    periodicity[0],
                                    periodicity[1]);
                            }
                        }
                        
                    } else if (mouse_status.context === "right") {
                        var newRight = mouse_status.right + step;
                        if (newRight - mouse_status.left > maxTicks) {
                            stxx.chart.scroll = mouse_status.scroll - step;
                            stxx.draw();
                        } else {
                            if (newRight - mouse_status.left < minTicks) {
                                return;
                            }
                            if (newRight < stxx.chart.dataSet.length && newRight >= 0) {
                                var periodicity = pChartPeriodicityService.getPeriodicity(vm.filterDescription.barSize);
                                pChartRenderingUtilsService.setRange(stxx.chart.dataSet[mouse_status.left].DT,
                                    stxx.chart.dataSet[newRight].DT,
                                    periodicity[0],
                                    periodicity[1]);
                            }
                        }
                        
                    }
                    e.preventDefault();
                    e.stopPropagation();
                }

                function mouseup() {
                    vm.isGrabbing = false;
                    mouse_status.context = null;
                    $(window).off("touchmove", mousedown).off("mousemove", mousemove);
                    $(window).off("touchend", mouseup).off("mouseup", mouseup);
                    dep.$scope.$evalAsync();
                    left.removeClass("grabbing");
                    right.removeClass("grabbing");
                }


                function createRulerMarks(element) {
                    var sparklineHeight = 20;

                    mouse_status.width = element[0].clientWidth;
                    var markers = element.find(".markers");
                    var width = element[0].clientWidth;
                    var total = stxx.chart.dataSet.length;
                    markers.empty();
                    var timeSpanInSeconds = (stxx.chart.dataSet[total - 1].DT.getTime() -
                            stxx.chart.dataSet[0].DT.getTime()) /
                        1000;
                    var scaleMode = timeSpanInSeconds > 3600 * 24 * 365 ? "year" : "month";
                    var monthInterval = 1;
                    if (scaleMode === "year") {
                        var lengthPerYear = mouse_status.width / (timeSpanInSeconds / (3600 * 24 * 365));
                        if (lengthPerYear < 120) monthInterval = 6;
                        else if (lengthPerYear < 240) monthInterval = 4;
                        else if (lengthPerYear < 400) monthInterval = 3;
                        else if (lengthPerYear < 600) monthInterval = 2;
                    }
                    var max = stxx.chart.dataSet[0].Close, min = stxx.chart.dataSet[0].Close;
                    for (var i = 1; i < total; i++) {
                        var bar = stxx.chart.dataSet[i];
                        if (bar.Close) {
                            max = Math.max(max, bar.Close);
                            min = Math.min(min, bar.Close);
                        }
                    }
                    var range = max - min;
                    var polygon = svg.find("polygon");
                    var initialPoint = "0," + sparklineHeight + " ";
                    var points = initialPoint;

                    var step = Math.floor(mouse_status.width / total);
                    step = Math.max(step, 1);
                    for (var i = 0; i < total; i += step) {
                        var height = stxx.chart.dataSet[i].Close;
                        height = (height - min) / range * sparklineHeight;
                        points += parseInt(width * i / total) + "," + (sparklineHeight - height).toFixed(0) + " ";
                    }
                    points += width + ',' + sparklineHeight;
                    polygon.attr("points", points);
                    svg.append(polygon);
                    var preDT = stxx.chart.dataSet[0].DT;
                    for (var i = 1; i < total; i++) {
                        var bar = stxx.chart.dataSet[i];
                        var marker = null;
                        if (scaleMode === 'year') {
                            if (bar.DT.getFullYear() !== preDT.getFullYear()) {
                                marker = $("<div class='marker'><span class='text'>" + bar.DT.getFullYear() + "</span></div>");
                            } else if (parseInt(bar.DT.getMonth() / monthInterval) !== parseInt(preDT.getMonth() / monthInterval)) {
                                var m = moment(bar.DT);
                                marker = $("<div class='marker minor'><span class='text'>" + m.format("MMM") + "</span></div>");
                            }
                        } else if (scaleMode === 'month') {
                            if (bar.DT.getMonth() !== preDT.getMonth()) {
                                var m = moment(bar.DT);
                                marker = $("<div class='marker'><span class='text'>" + m.format("MMM YYYY") + "</span></div>");
                            }
                        }

                        if (marker) {
                            marker.css("left", width * i / total);
                            markers.append(marker);
                        }
                        preDT = bar.DT;
                    }
                }
            });
        }
)
.defineDirectiveForE('agmp-chart-slider', [],
    function () {
        return {
            controller: "p.chart.SliderController",
            templateUrl: '/App/pages/chart/chart.slider.html'
        };
    }, {
    
});



