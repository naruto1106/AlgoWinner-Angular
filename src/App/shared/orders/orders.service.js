agmNgModuleWrapper('agms.orders', [])
    .defineService('orderService', [],
        function (serviceObj, dep, tool) {

            var coreServerCommunicationService = dep.coreServerCommunicationService;

            var developerTpmsPath = '/mantpmsapi/DeveloperOrder/';
            var developerOmsPath = '/omsapi/DeveloperOrder/';
            var bracketOrderOmsPath = '/omsapi/DeveloperBracketOrder/';

            // GET FUNCTION
            serviceObj.GetDeveloperAllOrdersForTradeReview = coreServerCommunicationService.genPostFunction(developerTpmsPath + "GetOrdersForTradeReview");

            serviceObj.GetTradesForChart = coreServerCommunicationService.genGetFunctionWithNVar(developerTpmsPath + "GetTradesForChart", function (args) {
                return {
                    strategyId: args[0]
                };
            });

            serviceObj.GetActiveOrders = coreServerCommunicationService.genGetFunctionWithNVar(developerTpmsPath + "GetActiveOrders", function (args) {
                return {
                    strategyId: args[0]
                };
            });

            serviceObj.GetHistoricalOrdersCount = coreServerCommunicationService.genGetFunctionWithNVar(developerTpmsPath + "GetHistoricalOrdersCount", function (args) {
                return {
                    strategyId: args[0],
                    productId: args[1]
                };
            });

            serviceObj.GetPagedHistoricalOrders = coreServerCommunicationService.genGetFunctionWithNVar(developerTpmsPath + "GetPagedHistoricalOrders", function (args) {
                return {
                    strategyId: args[0],
                    skip: args[1],
                    take: args[2],
                    productId: args[3]
                };
            });

            serviceObj.GetRelatedDeveloperOrders = coreServerCommunicationService.genGetFunctionWithNVar(developerTpmsPath + "GetRelatedOrders", function (args) {
                return { orderId: args[0] };
            });

            serviceObj.GetDeveloperOrdersOfPortfolioId = coreServerCommunicationService.genGetFunctionWithNVar(developerTpmsPath + "GetOrdersOfPortfolioId", function (args) {
                return { portfolioId: args[0] };
            });

            serviceObj.GetDeveloperOrder = coreServerCommunicationService.genGetFunctionWithNVar(developerTpmsPath + "GetOrder", function (args) {
                return { orderId: args[0] };
            });

            serviceObj.GetActiveOrderByProductStrategy = coreServerCommunicationService.genGetFunctionWithNVar(developerTpmsPath + "GetActiveOrderByProductStrategy", function (args) {
                return { productId: args[0], strategyId: args[1] };
            });

            // POST FUNCTION
            serviceObj.SendDeveloperOrder = developerPostFunction('SendOrder');
            serviceObj.CancelDeveloperOrder = developerPostFunction('CancelOrder');            

            // OMS API
            function developerPostFunction(url) {
                return coreServerCommunicationService.genPostFunction(developerOmsPath + url);
            }

            serviceObj.AddOrUpdateBracketOrderDetail = coreServerCommunicationService.genPostFunction(bracketOrderOmsPath + "AddOrUpdateBracketOrderDetail");
            serviceObj.RemoveBracketOrderDetail = coreServerCommunicationService.genPostFunction(bracketOrderOmsPath + "RemoveBracketOrderDetail");
            serviceObj.SendPositionBracketOrder = coreServerCommunicationService.genPostFunction(bracketOrderOmsPath + "SendBracketOrder");
            serviceObj.CancelBracketOrder = coreServerCommunicationService.genPostFunction(bracketOrderOmsPath + "CancelBracketOrder");
            /** oms API **/
        }
    );