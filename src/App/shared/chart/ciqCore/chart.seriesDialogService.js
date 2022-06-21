agmNgModuleWrapper('agms.chart')
.defineService("sChartSeriesDialogService", [],
        function (serviceObj, dep, tool) {
            var $rootScope = dep.$rootScope;

            function configureSeries(cru, highlightedSeries) {
                if (cru.stxx.openDialog !== "") return; // only allow one dialog to be open
                STX.DialogManager.displayDialog("seriesDialog");
                $$("seriesDialog").querySelectorAll(".title")[0].innerHTML =
                    highlightedSeries.display;
                if (highlightedSeries.color !== "auto") {
                    $$$(".stx-color", $$("seriesColorPicker")).style.backgroundColor = highlightedSeries.color;
                } else {
                    $$$(".stx-color", $$("seriesColorPicker")).style.backgroundColor = "#000000";
                }

                var ok = $$$(".stx-ok", $$("seriesDialog"));
                STX.safeClickTouch(ok, function () {
                    STX.DialogManager.dismissDialog();
                });

                var hide = $$$(".stx-hide", $$("seriesDialog"));
                STX.safeClickTouch(hide, function () {
                    STX.DialogManager.dismissDialog();
                    $rootScope.$broadcast('onStxSeriesDeleted', highlightedSeries.field);                    
                });
            }

            tool.setServiceObjectProperties({
                configureSeries: configureSeries
            });
        }
    );
