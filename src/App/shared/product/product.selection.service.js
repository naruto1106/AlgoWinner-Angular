agmNgModuleWrapper('agms.product')
    .defineService('sProductSelectionService', [],
        function (serviceObj, dep, tool) {
            function getParamStrings(dollarValue) {
                return [
                'Cumulative Winning Rate',
                'Total Number of Trades',
                //'Avg Hold Duration (Days)',
                'Number of Positions Held',
                'Profit Factor',
                //'Daily P/L (' + dollarValue + ')',
                'Cumulative Average Profit per Exited Trade (' + dollarValue + ')',
                'Cumulative Average Loss per Exited Trade (' + dollarValue + ')',
                //'Max Profit per Exited Trade (20 days)',
                //'Max Loss per Exited Trade (20 days)'
                ];
            }
            function onParameterChange(idx, handlerList, args) {
                if (handlerList[idx]) {
                    return handlerList[idx](args);
                } else {
                    tool.logError('Unexpected input behavior');

                }
            }

            tool.setServiceObjectProperties({
                getParamStrings: getParamStrings,
                onParameterChange: onParameterChange
            });
        }
);