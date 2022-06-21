agmNgModuleWrapper('agms.tgps')
    .defineService('sTgpsService',
        ['coreUserStateService'],
        function (serviceObj, dep, tool) {
            var coreServerCommunicationService = dep.coreServerCommunicationService,
                coreUserStateService = dep.coreUserStateService,
                coreConfigService = dep.coreConfigService;
            var path = '/tgpsapi/v1/TradersGPSData';
            var newTgpsPath = '/tgpsapi/v1/Tgps';
            var previousGetPosIndicatorPromises = {};
            var previousGetSwingIndicatorPromises = {};
            var previousGetOddsPromises = {};
            var previousGetSifPromises = {};
            tool.setServiceObjectProperties({
                getPositionIndicatorData: function (request) {
                    if (previousGetPosIndicatorPromises[[request.ProductId, request.BarSize]]) {
                        return previousGetPosIndicatorPromises[[request.ProductId, request.BarSize]];
                    }
                    previousGetPosIndicatorPromises[[request.ProductId, request.BarSize]] = coreServerCommunicationService.genPostFunction(newTgpsPath + '/GetPositionIndicatorData')(request);
                    return previousGetPosIndicatorPromises[[request.ProductId, request.BarSize]];
                },
                getSwingIndicatorData: function (request) {
                    if (previousGetSwingIndicatorPromises[[request.ProductId, request.BarSize]]) {
                        return previousGetSwingIndicatorPromises[[request.ProductId, request.BarSize]];
                    }
                    previousGetSwingIndicatorPromises[[request.ProductId, request.BarSize]] = coreServerCommunicationService.genPostFunction(newTgpsPath + '/GetSwingIndicatorData')(request);
                    return previousGetSwingIndicatorPromises[[request.ProductId, request.BarSize]];
                },
                getTradersGPSPositionTriggerNew: coreServerCommunicationService.genPostFunction(newTgpsPath + '/GetPositionTriggers'),
                getTradersGPSSwingTriggerNew: coreServerCommunicationService.genPostFunction(newTgpsPath + '/GetSwingTriggers'),               
                getTradersGPSPositionScreenerNew: coreServerCommunicationService.genPostFunction(newTgpsPath + '/GetPositionScreenerByDate'),
                getTradersGPSSwingScreenerNew: coreServerCommunicationService.genPostFunction(newTgpsPath + '/GetSwingScreenerByDate'),               
                getTradersGPSWatchlistPositionScreenerNew: coreServerCommunicationService.genPostFunction(newTgpsPath + '/GetPositionWatchlistScreenerByDate'),
                getTradersGPSWatchlistSwingScreenerNew: coreServerCommunicationService.genPostFunction(newTgpsPath + '/GetSwingWatchlistScreenerByDate'),               
                getTradersGPSPositionIndexScreenerNew: coreServerCommunicationService.genPostFunction(newTgpsPath + '/GetIndexPositionScreenerByDate'),
                getTradersGPSSwingIndexScreenerNew: coreServerCommunicationService.genPostFunction(newTgpsPath + '/GetIndexSwingScreenerByDate'),               

                getTriggersOnIndicesByDate: coreServerCommunicationService.genPostFunction(path + '/GetTriggersOnIndicesByDate'),
                getTriggersByDate: coreServerCommunicationService.genPostFunction(path + '/GetTriggersByDate'),
                getSwingTriggersOnIndicesByDateRange: coreServerCommunicationService.genPostFunction(path + '/GetSwingTriggersOnIndicesByDateRange'),

                getSwingTriggersByDateRange: coreServerCommunicationService.genPostFunction(path + '/GetSwingTriggersByDateRange'),
                getLatestMarketEndTimeForWatchlist: coreServerCommunicationService.genGetFunctionWithNVar(path + '/GetLatestMarketEndTimeForWatchlist', function (args) {
                    return { watchlistId: args[0] };
                }),
                getTradersGPSSwingTriggerNonCached: coreServerCommunicationService.genGetFunctionWithNVar(path + '/GetSwingTriggers', function (args) {
                    return {
                        request: {
                            ProductId: args[0],
                            TradeVenue: args[1],
                            BarSize: args[2]
                        }
                    }
                }),
                getTradersGPSTriggerNonCached: coreServerCommunicationService.genGetFunctionWithNVar(path + '/GetTriggers', function (args) {
                    return {
                        request: {
                            ProductId: args[0],
                            TradeVenue: args[1],
                            BarSize: args[2]
                        }
                    };
                }),                
                getPaladinStrategyId: function (horizon, filterStrength) {
                    var filterStrengthMap = {
                        0: 'Basic',
                        1: 'Moderate',
                        2: 'Strong'
                    };
                    var strategyIdMap = coreConfigService.PaladinStrategy;
                    //var strategyIdMap = {
                    //    'Basic_ShortTerm': 539,
                    //    'Basic_MidTerm': 539,
                    //    'Moderate_ShortTerm': 539,
                    //    'Moderate_MidTerm': 539,
                    //    'Strong_ShortTerm': 539,
                    //    'Strong_MidTerm': 539,
                    //};

                    var strength = filterStrengthMap[filterStrength];
                    return strategyIdMap[strength + '_' + horizon];
                },
                getPaladinLastEvalDate: function () {
                    var url = '/tgpsapi/v1/Paladin/GetPaladinTradePlanLastEvalDate';                    
                    return coreServerCommunicationService
                        .getDeferredGetPromise(url);
                },
                getPaladinSignal: function (horizon, filterStrength, date) {
                    var url = '/tgpsapi/v1/Paladin/GetTradePlan';
                    var params = {
                        date: date,
                        horizon: horizon,
                        strength: filterStrength
                    };
                    return coreServerCommunicationService
                        .getDeferredGetPromise(url, { params: params });
                },
                getPaladinExitSignal: function (horizon, filterStrength, date) {
                    if (coreUserStateService.hasTradersGPSPlus()) {
                        var strategyId = this.getPaladinStrategyId(horizon, filterStrength);
                        var func = coreServerCommunicationService.genPostFunction(
                            '/tpmsapi/SignalPortfolio/GetActivePortfolioByStrategy');

                        var promise = tool.onceAll([
                            func({ StrategyId: strategyId }),
                            this.getPaladinSignal(horizon, filterStrength, date)
                        ]).then(function (res) {
                            var portfolio = res[0].data;
                            var paladinExitTradePlan = res[1].data.Exit;
                            var nextTradingDate = res[1].data.NextTradingDate;

                            portfolio = _.chain(portfolio)
                                .filter(function (position) {
                                    return position.QuantityOnHold > 0;
                                })
                                .map(function (position) {
                                    var clone = angular.copy(position);

                                    clone.EntryTime = new Date(position.EntryTime);
                                    clone.ProductModel = position.Product;
                                    clone.NextTradingDate = nextTradingDate;
                                    delete clone.Product;

                                    var positionToExit = _.find(paladinExitTradePlan,
                                        function (plan) { return plan.Product.ProductId === position.Product.ProductId });

                                    if (positionToExit) {
                                        clone.StopPrice = positionToExit.StopPrice;
                                    }
                                    clone.ToExit = !!positionToExit;
                                    return clone;
                                }).value();
                            return portfolio;
                        });

                        return promise;
                    }

                    return tool.resolve([]);
                },
                getOdds: function (productId, from) {
                    if (previousGetOddsPromises[[productId, from]]) {
                        return previousGetOddsPromises[[productId, from]];
                    } 
                    previousGetOddsPromises[[productId, from]] = coreServerCommunicationService.genGetFunctionWithNVar('/tgpsapi/v2/Fundamental/GetOddsByProduct',
                        function(args) {
                            return { productId: productId, from: from };
                        })();
                    return previousGetOddsPromises[[productId, from]];
                },  
                getSIF: function(productId, from) {
                    if (previousGetSifPromises[[productId, from]]) {
                        return previousGetSifPromises[[productId, from]];
                    }
                    previousGetSifPromises[[productId, from]] = coreServerCommunicationService.genGetFunctionWithNVar('/tgpsapi/v2/Fundamental/GetSIFByProduct',
                            function(args) {
                                return { productId: productId, from: from };
                        })();
                    return previousGetSifPromises[[productId, from]];
                }
            });
        });