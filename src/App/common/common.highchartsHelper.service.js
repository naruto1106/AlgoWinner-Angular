agmNgModuleWrapper('agm.common')
    .ngApp
    .service('commonHighchartsHelperService', [
        function() {
            this.blockRangeSelectorInputMouseEvent = blockRangeSelectorInputMouseEvent;
            this.forceRedraw = forceRedraw;

            function blockRangeSelectorInputMouseEvent(chartConfig) {
                chartConfig.options.rangeSelector.inputStyle = {
                    'pointer-events': 'none'
                };
            }

            function turnReadonlyAndNonSelectable(input) {
                input.readOnly = true;
                input.tabIndex = -1;
            }

            function forceRedraw(chartConfig) {
                if (!chartConfig || !chartConfig.getHighcharts) {
                    return;
                }
                var charts = chartConfig.getHighcharts();
                charts.yAxis[0].isDirty = true;
                turnReadonlyAndNonSelectable(charts.rangeSelector.maxInput);
                turnReadonlyAndNonSelectable(charts.rangeSelector.minInput);
                charts.redraw();
            }
        }
    ]);