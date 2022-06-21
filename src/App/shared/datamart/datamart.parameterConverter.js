agmNgModuleWrapper('agms.datamart')
    // this should have been a service
    .defineService('algoFeedToParameterConverter', ['coreConfigService', 'sDatamartExpressionHelperService'],
        function (serviceObj, dep, tool) {
            var coreConfigService = dep.coreConfigService,
                sDatamartExpressionHelperService = dep.sDatamartExpressionHelperService;
            
            var selectionTypeLibrary = {};
            var selectionParameterLibrary = {};
            selectionTypeLibrary[11] = "checkboxes";
            selectionTypeLibrary[16] = "checkboxes";
            selectionParameterLibrary[13] = "checkboxes";
            selectionParameterLibrary[17] = "checkboxes";

            var defaultTriggerPeriod = sDatamartExpressionHelperService.defaultTriggerPeriod;
            
            tool.setServiceObjectProperties({
                convertFromAlgoFeed: function(algoFeed) {
                    var markets = [];
                    var horizons = [];
                    var directions = [];
                    var barDurations = [];
                    var types = [];
                    var triggeredPeriods = [];
                    var parameters = [];
                    var actions = [];
                    var params = [];

                    if (algoFeed.IsRealTimeEvent) {
                        params.push(sDatamartExpressionHelperService.generateOptionValue("Triggered Period", defaultTriggerPeriod, 4));
                    }

                    // Removing all other feeds that are in markets other than SG since only SG market is supported right now.
                    algoFeed.EventTypes = algoFeed.EventTypes.filter(function(e) { return _.includes(coreConfigService.AlgoFeed.Markets, e.Market); });

                    function checkAndAdd(list, item) {
                        if (item && list.indexOf(item) < 0) {
                            list.push(item);
                        }
                    }

                    function addToSelectionIfAny(name, singleSelection, list, req) {
                        if (name === "Bar Duration" && list.length > 0) {
                            list = ["Day"];
                        }
                        var optionObject = null;
                        if (singleSelection) {
                            optionObject = sDatamartExpressionHelperService.generateOptionValue(name, list, 0, req);
                        } else {
                            optionObject = sDatamartExpressionHelperService.generateCheckboxCollectionValue(name, list, req);
                        }
                        if (list.length > 0) {
                            params.push(optionObject);
                        }
                        return optionObject;
                    }

                    var isNotCheckBoxesType = selectionTypeLibrary[algoFeed.AlgoFeedId] !== "checkboxes";
                    var isNotCheckBoxesParameter = selectionParameterLibrary[algoFeed.AlgoFeedId] !== "checkboxes";

                    algoFeed.EventTypes.forEach(function(eventType) {
                        checkAndAdd(types, eventType.Type);
                        checkAndAdd(markets, eventType.Market);
                        checkAndAdd(directions, eventType.Direction);
                        checkAndAdd(barDurations, eventType.BarDuration);
                        checkAndAdd(horizons, eventType.Horizon);
                        checkAndAdd(triggeredPeriods, eventType.TriggeredPeriod);
                        checkAndAdd(actions, eventType.Action);
                        checkAndAdd(parameters, eventType.Parameter);
                    });


                    addToSelectionIfAny("Type", isNotCheckBoxesType, types);
                    addToSelectionIfAny("Market", true, markets);
                    addToSelectionIfAny("Direction", true, directions);
                    addToSelectionIfAny("Bar Duration", true, barDurations);
                    addToSelectionIfAny("Horizon", true, horizons);
                    addToSelectionIfAny("Triggered Period", true, triggeredPeriods);
                    addToSelectionIfAny("Action", true, actions);
                    var paramReq = {
                        selectionFilter: function(val, paramsDict) {
                            return algoFeed.EventTypes.filter(function(u) {
                                var isShown = true;
                                isShown &= paramsDict["Type"] ? u.Type === paramsDict["Type"].value : true;
                                isShown &= paramsDict["Market"] ? u.Market === paramsDict["Market"].value : true;
                                isShown &= paramsDict["Direction"] ? u.Direction === paramsDict["Direction"].value : true;
                                isShown &= paramsDict["Bar Duration"] ? u.BarDuration === paramsDict["Bar Duration"].value : true;
                                isShown &= paramsDict["Horizon"] ? u.Horizon === paramsDict["Horizon"].value : true;
                                isShown &= paramsDict["Action"] ? u.Action === paramsDict["Action"].value : true;
                                isShown &= paramsDict["Parameter"] ? val === u.Parameter : true;
                                return isShown;
                            }).length > 0;
                        },
                        selectionFilterId: "algoFeed_" + algoFeed.AlgoFeedName
                    };
                    addToSelectionIfAny("Parameter", isNotCheckBoxesParameter, parameters, paramReq);
                    return params;
                }
            });
        }
    );