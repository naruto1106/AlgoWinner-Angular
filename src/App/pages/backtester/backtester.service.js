agmNgModuleWrapper("agmp.backtester")
    .defineService("pBacktesterService", [],
        function (serviceObj, dep, tool) {
            var path = '/bktestapi/v1/Backtester/';


            tool.setServiceObjectProperties({
                selectedStock: null,
                result: null,
                isLoading: false,

                simulate: dep.coreServerCommunicationService.genPostFunction(path + 'Simulate')
            });
        });