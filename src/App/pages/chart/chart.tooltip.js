agmNgModuleWrapper('agmp.chart')
    .defineController('p.chart.TooltipController',
        [
            'pChartRenderingUtilsService',
            'pChartPopupService',
            'pChartFilterDescriptionService'
        ],
        function (vm, dep, tool) {
            var $filter = dep.$filter;
            var pChartRenderingUtilsService = dep.pChartRenderingUtilsService,
                pChartPopupService = dep.pChartPopupService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService;
            var stxx = pChartRenderingUtilsService.stxx;

            var filterDescription = pChartFilterDescriptionService;

            function computeYByAxis(y, panel) {
                var res = panel.top;
                if (!panel || y == null) {
                    return res;
                }
                if (panel.chart && panel.yAxis.legend === '%') {
                    res = stxx.pixelFromPriceTransform(y, panel, panel.yAxis);
                } else {
                    res = stxx.pixelFromPrice(y, panel, panel.yAxis);
                }
                if (res < panel.top) {
                    res = panel.top;
                } else if (res > panel.bottom) {
                    res = panel.bottom;
                }
                return res;
            };

            function getDataset() {
                var tickIndex = stxx.crosshairTick;
                if (tickIndex && stxx.chart.dataSet && stxx.chart.dataSet[tickIndex]) {
                    return stxx.chart.dataSet[tickIndex];
                }
                return null;
            };

            function getPrimaryByPanelName(name) {
                switch (name) {
                    case 'chart':
                        return 'Close';
                    case 'vchart (true)':
                        return 'Volume';
                    case 'vchart (false)':
                        return 'Volume';
                    default:
                }

                return findPrimaryName(name);
            }

            function findPrimaryName(name) {
                if (stxx.layout.studies[name]) {
                    var study = stxx.layout.studies[name];
                    for (var prop2 in study.outputMap) {
                        if (vm.data[prop2] != undefined) {
                            return prop2;
                        }
                    }
                    if (vm.data[name + "_hist"] != undefined) {
                        return name + "_hist";
                    }

                }
                return null;
            }

            function getLabelValue(label) {
                switch (label) {
                    case 'Open':
                    case 'High':
                    case 'Low':
                    case 'Close':
                        var correctTickSizeDecimalPlacesWithoutCurrency = $filter('correctTickSizeDecimalPlacesWithoutCurrency');
                        return correctTickSizeDecimalPlacesWithoutCurrency(vm.data[label], vm.data.Currency, vm.data.TradeVenueLoc);
                    case 'Volume':
                        var volumeSeparatorFormat = $filter('volumeSeparatorFormat');
                        return volumeSeparatorFormat(vm.data.Volume);
                    case 'Change':
                        var percentDifferent = (vm.data.Close - vm.data.iqPrevClose) / vm.data.iqPrevClose * 100;
                        if (percentDifferent === 0) return { priceChanged: false };
                        return {
                            priceChanged: true,
                            priceUp: (percentDifferent > 0),
                            cssClass: percentDifferent > 0 ? 'price-up' : 'price-down',
                            value: $filter('valuePercentOrDash')(percentDifferent, 2)
                        };
                }
                return vm.data[label];
            }

            function getDatasetLabels(name) {
                switch (name) {
                    case 'chart':
                        return ['Open', 'High', 'Low', 'Close', 'Volume', 'Change'];
                    default:
                }
                return [];
            }

            function checkHasDataset(name) {
                return name === "chart" || name.indexOf("vchart") > -1;
            }

            function getDateByBarsize() {
                if (vm.data) {
                    var date = vm.data.DT;
                    switch (filterDescription.barSize) {
                        case '1 Min':
                        case '5 Min':
                        case '10 Min':
                        case '15 Min':
                        case '30 Min':
                        case '1 H':
                        case '2 H':
                            return moment(date).format('MMM D, h:mm A');
                        case '1 D':
                        case '1 W':
                            return moment(date).format('MMM D, YYYY');
                        case '1 M':
                            return moment(date).format('MMM YYYY');

                    }
                }
                return null;
            }

            function getY(panel, knownPrimary) {
                var y = vm.data[knownPrimary];
                switch (panel.name) {
                    case 'chart':
                        var thresholdY = panel.top + panel.height / 2;
                        if (thresholdY > computeYByAxis(y, panel)) {
                            return vm.data.Low;
                        } else {
                            return vm.data.High;
                        }
                        break;
                    default:
                }
                return y;
            }

            function getCssClass(panel, x, y) {
                var thresholdX = panel.width - 200;
                var thresholdY = panel.top + panel.height / 2;
                var arr = [];
                arr.push(x > thresholdX ? 'right' : 'left');
                arr.push(y > thresholdY ? 'bottom' : 'top');
                return arr;
            }

            function extraPanelTypeCheck(panel) {
                switch (panel.name) {
                    case 'chart':
                        return !pChartPopupService.hasAnyChartPopup();
                    default:
                }
                if (panel.name.indexOf('vchart') > -1) return false;
                return true;
            }

            function getTooltipInformation(panel) {
                var x = stxx.cx;
                if (x <= panel.left) {
                    return null;
                } else if (x >= panel.right) {
                    return null;
                }

                var primary = getPrimaryByPanelName(panel.name);

                if (primary) {

                    var hasDataset = checkHasDataset(panel.name);
                    var referenceY = getY(panel, primary);
                    var y = computeYByAxis(referenceY, panel);
                    var datasetLabels = getDatasetLabels(panel.name);
                    var defaultDecimalPlace = panel.yAxis.printDecimalPlaces;
                    return {
                        name: panel.name,
                        hasDataset: hasDataset,
                        x: x,
                        y: y,
                        cssClass: getCssClass(panel, x, y),
                        defaultDecimalPlace: defaultDecimalPlace,
                        datasetLabels: datasetLabels,
                        shown: extraPanelTypeCheck(panel) && ((hasDataset && datasetLabels.length > 0) || !hasDataset),
                        primary: primary
                    }
                }
            }

            function refreshTooltip() {
                vm.data = getDataset(stxx);
                vm.tooltips = [];


                if (vm.data) {
                    for (var prop in stxx.panels) {
                        var panel = stxx.panels[prop];
                        var tooltipInfo = getTooltipInformation(panel);
                        if (tooltipInfo) {
                            vm.tooltips.push(tooltipInfo);
                        }
                    }
                    vm.tooltips.forEach(function (tooltip, idx) {
                        var e = $(vm._getDirectiveElement()).find('#tooltip_' + idx);
                        e.css("left", vm.tooltips[idx].x + "px");
                        e.css("top", vm.tooltips[idx].y + "px");
                        e.removeClass('top left right bottom');
                        e.addClass(vm.tooltips[idx].cssClass.join(' '));

                    });
                }
            }

            function getPrimarySymbol() {
                return filterDescription.primaryProduct.Symbol;
            }

            tool.onRendered(function () {
                STXChart.prototype.prepend("mousemoveinner", function (event) {
                    refreshTooltip();
                });
                window.setInterval(function () {
                    refreshTooltip();
                }, 500);
            });

            tool.setVmProperties({
                data: {},
                tooltips: [],
                getLabelValue: getLabelValue,
                getDateByBarsize: getDateByBarsize,
                getPrimarySymbol: getPrimarySymbol
            });
        })
    .defineDirectiveForE('agmp-chart-tooltip', [], function () {
        return {
            templateUrl: '/App/pages/chart/chart.tooltip.html',
            controller: 'p.chart.TooltipController'
        }
    }, {

    });