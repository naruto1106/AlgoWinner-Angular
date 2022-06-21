agmNgModuleWrapper('agms.strategyCommerce',
    [])
    .defineService('sStrategyCommerceService',
    [],
    function (serviceObj, dep, tool) {

        var $location = dep.$location,
            coreServerCommunicationService = dep.coreServerCommunicationService,
            coreSignalRNotificationService = dep.coreSignalRNotificationService,
            coreNotificationService = dep.coreNotificationService;

        var path = '/stgapi/v1/Strategy/';
        var brokerPath = '/stgapi/v1/Broker/';
        var tpmsPath = "/mantpmsapi/Strategy/";

        // Parameterless single strategy retriever
        function getStrategyFunction(url) {
            return coreServerCommunicationService.genGetFunctionWithNVar(path + url,
                function (args) {
                    return { strategyId: args[0] };
                });
        }
        
        function getTpmsStrategyFunction(url) {
            return coreServerCommunicationService.genGetFunctionWithNVar(tpmsPath + url,
                function (args) {
                    return { strategyId: args[0] };
                });
        }

        function getTpmsStrategiesFunction(url) {
            return coreServerCommunicationService.genGetFunctionWithNVar(tpmsPath + url);
        }

        // Parameterless multiple strategy retriever
        function getStrategiesFunction(url) {
            return coreServerCommunicationService.genGetFunctionWithNVar(path + url);
        }

        function deleteStrategy(strategyId) {
            var onButtonClick = function (id) {
                if (id !== 0)
                    return null;

                var deleteRequest = {
                    StrategyId: strategyId
                };

                return serviceObj.DeleteStrategy(deleteRequest)
                    .then(function (res) {
                        unlistenStrategy(strategyId);
                        coreNotificationService.notifySuccess("Success",
                            "Your trade portfolio was deleted successfully!");
                        tool.reload();
                    },
                    function (res) {
                        coreNotificationService.notifyError("Unable to delete this trade portfolio", res.data.Message);
                    });
            };
            coreNotificationService.notifyYesNo("Delete Trade Portfolio",
                "Are you sure you want to delete this trade portfolio? This operation cannot be undone!",
                onButtonClick);
        }

        function unlistenStrategy(strategyId) {
            var param = {
                StrategyId: strategyId
            };
            tool.onceAll([
                coreSignalRNotificationService.invoke('UnlistenStrategy', param)
            ]).then(
                function () {
                    tool.log("Unlisten to Strategy " + strategyId);
                },
                function () {
                    tool.logError("Error invoking listen to strategy");
                });
        };
        
        function openNewStrategy() {
            var modalInstance = openNewStrategyWithoutReload();
            return modalInstance.result.then(function (strategyId) {
                // TODO: Currently quickfix for reloading, check if signalR update is preferred
                //redirect to order details page focusing on the newly created strategy                            
                $location.search({ strategyId: strategyId });
                $location.path('/orderstrades');
                tool.reload();
            });
        }


        function openNewStrategyWithoutReload() {
            return tool.openModalByDefinition('p.strategy.NewController', {});
        }

        tool.setServiceObjectProperties({
            HasBroker: coreServerCommunicationService.genGetFunctionWithNVar(brokerPath + 'HasBroker'),
            GetAssetClass: getStrategyFunction('GetAssetClass'),
            GetTradeVenue: getStrategyFunction('GetTradeVenue'),
            GetName: getStrategyFunction('GetName'),
            GetStrategyImages: getStrategyFunction('GetStrategyImages'),

            GetOwnedStrategiesCount: getStrategiesFunction('GetOwnedStrategiesCount'),
            GetManagedStrategies: getStrategiesFunction('GetManagedStrategies'),

            PrivateStrategyWithSameName: coreServerCommunicationService.genGetFunctionWithNVar(
                path + 'PrivateStrategyWithSameName',
                function (args) {
                    return { name: args[0] };
                }),
            PublicStrategyWithSameName: coreServerCommunicationService.genGetFunctionWithNVar(
                path + 'PublicStrategyWithSameName',
                function (args) {
                    return { name: args[0] };
                }),
            PublicStrategyWithSameNameExceptWithId: coreServerCommunicationService.genGetFunctionWithNVar(
                path + 'PublicStrategyWithSameNameExceptWithId',
                function (args) {
                    return { name: args[0], strategyId: args[1] };
                }),

            GetStrategyForAccountDetail: getTpmsStrategyFunction('GetStrategyForAccountDetail'),
            GetStrategyForEditing: getTpmsStrategyFunction('GetStrategyForEditing'),
            GetTradeSettings: getTpmsStrategiesFunction('GetTradeSettings'),
            GetStrategyCapital: getTpmsStrategyFunction('GetStrategyCapital'),

            GetStrategiesForAccountLinkingView: coreServerCommunicationService.genGetFunctionWithNVar(
                tpmsPath + 'GetStrategiesForAccountLinkingView',
                function (args) {
                    return { accountId: args[0] };
                }),
            GetAvailableBalanceForNewStrategyAllocation: coreServerCommunicationService.genPostFunction(tpmsPath + 'GetAvailableBalanceForNewStrategyAllocation'),
            DeleteStrategy: coreServerCommunicationService.genPostFunction(tpmsPath + 'DeleteStrategy'),
            EditPublishedStrategy: coreServerCommunicationService.genPostFunction(tpmsPath + 'EditPublishedStrategy'),
            ModifyTradeSettings: coreServerCommunicationService.genPostFunction(tpmsPath + 'ModifyTradeSettings'),

            //TPMS
            EditCreatedStrategy: coreServerCommunicationService.genPostFunction(tpmsPath + 'EditCreatedStrategy'),
            CreateNewStrategy: coreServerCommunicationService.genPostFunction(tpmsPath + 'CreateNewStrategy'),
            UnlinkStrategyFromBrokerAccount: coreServerCommunicationService.genPostFunction(tpmsPath + 'UnlinkStrategyFromBrokerAccount'),
            GetStrategiesForTrading: coreServerCommunicationService.genGetFunctionWithNVar(tpmsPath + 'GetStrategiesForTrading'),
            //new API for Manual Follow
            GetTradePortfolioSelections: coreServerCommunicationService.genGetFunctionWithNVar(tpmsPath + 'GetTradePortfolioSelections'),

            openNewStrategy: openNewStrategy,
            deleteStrategy: deleteStrategy,
            openNewStrategyWithoutReload: openNewStrategyWithoutReload
        });
    });