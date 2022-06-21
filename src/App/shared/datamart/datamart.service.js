agmNgModuleWrapper('agms.datamart')
    .defineService('sDatamartService', ["algoFeedToParameterConverter", 'sDatamartApiService'],
    function (serviceObj, dep, tool) {
        var algoFeedToParameterConverter = dep.algoFeedToParameterConverter,
            coreUserStateService = dep.coreUserStateService,
            sDatamartApiService = dep.sDatamartApiService;
       
        function createDimensionsFromAlgoFeedParams(params) {
            var dimensions = {};
            params.forEach(function (param) {
                var options = [];
                if (param.type === 'select') {
                    options = param.options;
                } else if (param.type === 'checkboxes') {
                    param.options.forEach(function (opt) {
                        options.push(opt.propertyName);
                    });
                }
                dimensions[param.title] = options;
            });
            return dimensions;
        }

        function getEventTypesByCombination(dm, paramCombinations) {
            return dm.EventTypes.filter(function (et) {
                var pass = true;
                for (var prop in paramCombinations) {
                    if (et[prop]) {
                        pass = pass && (et[prop] === paramCombinations[prop]);
                    } else {
                        pass = false;
                    }
                }
                return pass;
            });
        }

        var defaultDimensionPriority = [['Type', 'Action'], ['Direction', 'Parameter']];

        var relabellingFuncs = {
            Type: function (props, datamart) {
                return props.Type;
            },
            Parameter: function (props, datamart) {
                switch (datamart.AlgoFeedName) {
                    case "Crossover Momentum":
                        var regex = new RegExp(' cross ', 'gi');
                        if (props.Direction && props.Parameter) {
                            if (props.Direction === "Bull") {
                                return props.Parameter.replace(regex, " crosses above ");
                            }
                            if (props.Direction === "Bear") {
                                return props.Parameter.replace(regex, " crosses below ");
                            }
                        }
                        return props.Parameter;
                    default:
                        return props.Parameter;
                }
            },
            Action: function (props, datamart) {
                return props.Action;
            },
            Direction: function (props, datamart) {
                var direction = null;
                switch (datamart.AlgoFeedName) {
                    case "Hot Stocks in Twitter":
                        if (props.Direction) {
                            if (props.Direction === "Bull") {
                                direction = "Bullish Twitter Breakout";
                            }
                            if (props.Direction === "Bear") {
                                direction = "Bearish Twitter Breakout";
                            }
                        }
                        break;
                    case "Key Analyst Revisions":
                        if (props.Direction) {
                            if (props.Direction === "Bull") {
                                direction = "Major Ratings Upgrade";
                            }
                            if (props.Direction === "Bear") {
                                direction = "Major Ratings Downgrade";
                            }
                        }
                        break;
                    case "Market Kings":
                        break;
                    case "Major Price Breakout":
                        if (props.Direction) {
                            if (props.Direction === "Bull") {
                                direction = "Price Breaks Above";
                            }
                            if (props.Direction === "Bear") {
                                direction = "Price Breaks Below";
                            }
                        }
                        break;
                    case "Volume Breakout":
                        if (props.Direction) {
                            if (props.Direction === "Bull") {
                                direction = "Bullish Volume Breakout";
                            }
                            if (props.Direction === "Bear") {
                                direction = "Bearish Volume Breakout";
                            }
                        }
                        break;
                    case "Unusual Opening Gap":
                        if (props.Direction) {
                            if (props.Direction === "Bull") {
                                direction = "Gap Up in Opening Price";
                            }
                            if (props.Direction === "Bear") {
                                direction = "Gap Down in Opening Price";
                            }
                        }
                        break;
                    case "Overbought / Oversold":
                        if (props.Direction) {
                            if (props.Direction === "Bull" && props.Type === "RSI") {
                                direction = "RSI breaks below 10";
                            }
                            if (props.Direction === "Bull" && props.Type === "Stochastic") {
                                direction = "Oversold";
                            }
                            if (props.Direction === "Bear" && props.Type === "RSI") {
                                direction = "RSI breaks above 90";
                            }
                            if (props.Direction === "Bear" && props.Type === "Stochastic") {
                                direction = "Overbought";
                            }
                        }
                        break;
                    case "Volatility Swing":
                        if (props.Direction) {
                            if (props.Direction === "Bear") {
                                direction = "Price breaks Upper bollinger band";
                            }

                            if (props.Direction === "Bull") {
                                direction = "Price breaks Lower bollinger band";
                            }
                        }
                        break;
                    case "Crossover Momentum":
                        break;
                }
                return direction;
            },
            defaultCompose: function (obj, ordering) {
                var strParts = [];

                ordering.forEach(function (item) {
                    if (obj[item]) {
                        strParts.push(obj[item]);
                    }
                });
                return strParts.join(' ');
            },
            renamedLabelCompose: function (obj, ordering, datamart) {

                switch (datamart.AlgoFeedName) {
                    case "Market Kings":
                        var str = "";
                        if (obj && obj.Parameter) {
                            str += obj.Parameter + " ";
                        }
                        if (obj.Action) {
                            str += obj.Action + "s";
                        }
                        return str;
                    case "Overbought / Oversold":
                        if (obj.Direction && obj.Type) {
                            obj.Type = null;
                        }
                        return relabellingFuncs.defaultCompose(obj, ordering, datamart);
                    case "Crossover Momentum":
                        if (obj.Type) {
                            obj.Type = null;
                        }
                        return relabellingFuncs.defaultCompose(obj, ordering, datamart);
                    default:
                        return relabellingFuncs.defaultCompose(obj, ordering, datamart);
                }
            }
        }

        function getDatamartName(props, datamart, exclusion, composeFunc) {
            exclusion = exclusion || {};
            composeFunc = composeFunc || relabellingFuncs.defaultCompose;
            var obj = {};
            if (!exclusion.Direction) {
                obj.Direction = relabellingFuncs.Direction(props, datamart);
            }
            if (!exclusion.Parameter) {
                obj.Parameter = relabellingFuncs.Parameter(props, datamart);
            }
            if (!exclusion.Action) {
                obj.Action = relabellingFuncs.Action(props);
            }
            if (!exclusion.Type) {
                obj.Type = relabellingFuncs.Type(props);
            }
            return precompose();

            function precompose() {
                for (var prop in exclusion) {
                    delete obj[prop];
                }
                var flattenDefault = defaultDimensionPriority.reduce(function (acc, part) {
                    if (!acc) {
                        acc = [];
                    }
                    return acc.concat(part);
                });
                var ordering = [];
                switch (datamart.AlgoFeedName) {
                    case "Hot Stocks in Twitter":
                    case "Major Price Breakout":
                    case "Volume Breakout":
                    case "Unusual Opening Gap":
                    case "Overbought / Oversold":
                    case "Volatility Swing":
                    case "Crossover Momentum":
                    case "Key Analyst Revisions":
                        ordering = flattenDefault;
                        break;
                    case "Market Kings":
                        ordering = ['Parameter', 'Action'];
                }

                return composeFunc(obj, ordering, datamart);
            }
        }

        function getDataMartSelections() {
            return sDatamartApiService.getAllPublishedAlgoFeedsWithFollowers()
                .then(function (res) {
                    var dataMartsToReturn = [];
                    var eligibleDataMarts = [];

                    return coreUserStateService.myPremiumItemSubscriptionsLoaded.then(function () {
                        if (coreUserStateService.hasAlgoMartBundle()) {
                            eligibleDataMarts = res.data.filter(function (data) {
                                return !data.IsLocked;
                            });;
                        } else {
                            eligibleDataMarts = res.data.filter(function (data) {
                                return !data.IsPremium && !data.IsLocked;
                            });
                        }

                        eligibleDataMarts.forEach(function (dm) {
                            var params = algoFeedToParameterConverter.convertFromAlgoFeed(dm);

                            var dimensions = createDimensionsFromAlgoFeedParams(params);
                            dimensions.getEventTypes = function (paramCombination) {
                                return getEventTypesByCombination(dm, paramCombination);
                            };
                            dataMartsToReturn.push({
                                Datamart: dm,
                                Dimensions: dimensions
                            });
                        });
                        dataMartsToReturn.forEach(function (i) {
                            var algoFeedEventTypes = i.Dimensions.getEventTypes({});
                            algoFeedEventTypes.forEach(function (et) {
                                var combination = {};
                                if (et.Direction) {
                                    combination.Direction = et.Direction;
                                }
                                if (et.Parameter) {
                                    combination.Parameter = et.Parameter;
                                }
                                if (et.Market) {
                                    combination.Market = et.Market;
                                }
                                if (et.Type) {
                                    combination.Type = et.Type;
                                }
                                if (et.Action) {
                                    combination.Action = et.Action;
                                }
                                var branch = {
                                    combination: combination
                                };
                                et.renamedAlgoFeedEventTypeName = getDatamartName(branch.combination, i.Datamart, null, relabellingFuncs.renamedLabelCompose);
                            });
                        });
                        return dataMartsToReturn;
                    });
                });
        }

        function generateCombinationsFromDimensions(dataMartObject, cumulatedDimension, parentCombination) {
            var combinations = [{}];
            var mutuallyExclusiveSelections = {};
            cumulatedDimension.forEach(function (dimension) {
                var dimensionValues = dataMartObject.Dimensions[dimension];
                if (!dimensionValues) {
                    return;
                }
                if (dimensionValues.isMutuallyExclusive) {
                    var arr = [];
                    var combinationCopy = angular.copy(parentCombination);
                    dimensionValues.forEach(function (i) {
                        combinationCopy[dimension] = i;
                        if (dataMartObject.Dimensions.getEventTypes(combinationCopy).length > 0) {
                            arr.push(i);
                        }
                    });
                    if (arr.length > 0) {
                        mutuallyExclusiveSelections[dimension] = arr;
                        arr.selection = arr[0];
                    }
                    return;
                }
                var newCombinations = [];
                combinations.forEach(function (obj) {
                    dimensionValues.forEach(function (val) {
                        var newObj = angular.copy(obj);
                        newObj[dimension] = val;
                        newCombinations.push(newObj);
                    });
                });
                combinations = newCombinations;
            });

            for (var prop in parentCombination) {
                combinations.forEach(function (combination) {
                    if (combination[prop] && combination[prop] !== parentCombination[prop]) {
                        combination.deleted = true;
                    }
                });
            }

            combinations = combinations.filter(function (c) {
                return !c.deleted;
            });
            combinations.mutuallyExclusiveSelections = mutuallyExclusiveSelections;
            return combinations;
        }

        function createCombinationTree(parent, combination, datamart, mutuallyExclusiveSelections) {
            var item = {
                parent: parent,
                combination: combination,
                checked: false,
                subCombinations: [],
                datamartRef: datamart,
                mutuallyExclusiveSelections: angular.merge({}, mutuallyExclusiveSelections)
            };
            parent.subCombinations.push(item);
            return item;
        }

        function generateCombinationValues(branch, datamart, parentBranch) {
            var combination = branch.combination;
            var excludedCombination = parentBranch ? parentBranch.combination : {};
            return getDatamartName(combination, datamart, excludedCombination);
        }

        function setMutuallyExclusiveDisplayValue(branch, datamart) {
            for (var dimension in branch.mutuallyExclusiveSelections) {
                var arr = branch.mutuallyExclusiveSelections[dimension];
                var originalCombination = angular.copy(branch.combination);
                arr.getDisplayedValue = function (i) {
                    originalCombination[dimension] = i;
                    return relabellingFuncs[dimension](originalCombination, datamart);
                };
            }
        }

        function convertDataMartToTreeSelectionStructure(dataMartList, dimensionPriority) {
            /*
                SAMPLE OF TREE STRUCTURE
                    [
                        {
                            label: "SG",
                            combination: {Market:"SG"},
                            subCombinations:[
                                {
                                    label: "SG-Bull",
                                    combination: {Market:"SG", Direction:"Bull"},
                                    subCombinations:[]// can be further down
                                },
                                {
                                    label: "SG-Bear",
                                    combination: {Market:"SG", Direction:"Bear"},
                                }
                            ]
                        }
                    ]
                */

            dimensionPriority = dimensionPriority || defaultDimensionPriority;

            function recursiveTreeGeneration(branch, dataMartObject, parentCombination, levelsOfDimensions, n) {

                if (n >= levelsOfDimensions.length) {
                    return;
                }

                var dimensions = levelsOfDimensions[n].dimensions;
                var combinations = generateCombinationsFromDimensions(dataMartObject, dimensions, parentCombination);
                combinations.forEach(function (combination) {
                    var eventTypesFromThisCombinations = dataMartObject.Dimensions.getEventTypes(combination);
                    if (eventTypesFromThisCombinations.length > 0) {
                        var childBranch = createCombinationTree(branch, combination, dataMartObject, combinations.mutuallyExclusiveSelections);
                        recursiveTreeGeneration(childBranch, dataMartObject, combination, levelsOfDimensions, n + 1);
                    }
                });
            }

            var rootTree = {
                subCombinations: []
            };

            function cleanNotFoundBranch(branch) {
                if (!branch.subCombinations || branch.subCombinations.length <= 0 || !branch.combination) {
                    return;
                }
                var eventTypes = branch.datamartRef.Dimensions.getEventTypes(branch.combination);
                if (eventTypes.length <= 0) {
                    branch.isMarkedAsDeleted = true;
                    return;
                }
                branch.subCombinations.forEach(function (subCombination) {
                    cleanNotFoundBranch(subCombination);
                });
                var arr = [];
                branch.subCombinations.forEach(function (subCombination) {
                    if (!subCombination.isMarkedAsDeleted) {
                        arr.push(subCombination);
                    }
                });
                delete branch.subCombinations;

                if (arr.length > 0) {
                    branch.subCombinations = arr;
                }
            }

            function setMutualExclusivityParameters(dataMartObject) {
                if (dataMartObject.Datamart.AlgoFeedName === "Major Price Breakout") {
                    dataMartObject.Dimensions.Parameter.isMutuallyExclusive = true;
                }
                if (dataMartObject.Datamart.AlgoFeedName === "Crossover Momentum") {
                    dataMartObject.Dimensions.Parameter.isMutuallyExclusive = true;
                }
                if (dataMartObject.Datamart.AlgoFeedName === "Market Kings") {
                    dataMartObject.Dimensions.Parameter.isMutuallyExclusive = true;
                }
            }

            function setSpammyCategory(dataMartObject) {

                function setAllEventTypesInDatamart(datamart, spammyCheckFunc) {
                    datamart.EventTypes.forEach(function (et) {
                        et.spammy = spammyCheckFunc(et);
                    });
                }

                switch (dataMartObject.Datamart.AlgoFeedName) {
                    case "Major Price Breakout":
                    case "Volatility Swing":
                        setAllEventTypesInDatamart(dataMartObject.Datamart, function (et) {
                            return et.Market === "US";
                        });
                        break;
                    case "Overbought / Oversold":
                        setAllEventTypesInDatamart(dataMartObject.Datamart, function (et) {
                            return et.Market === "US" && et.Type === "Stochastic";
                        });
                        break;
                    case "Crossover Momentum":
                        setAllEventTypesInDatamart(dataMartObject.Datamart, function (et) {
                            return et.Market === "US" && et.Parameter !== "MA50 cross MA200";
                        });
                        break;

                    case "Volume Breakout":
                    case "Unusual Opening Gap":
                    case "Hot Stocks in Twitter":
                    case "Key Analyst Revisions":
                    case "Market Kings":
                        setAllEventTypesInDatamart(dataMartObject.Datamart, function (et) {
                            return false;
                        });
                }
            }

            function recursiveCleanBranchTree(branch) {

                if (branch.subCombinations) {
                    if (branch.subCombinations.length === 0) {
                        delete branch.subCombinations;
                    }
                    while (branch.subCombinations && branch.subCombinations.length === 1 && branch.subCombinations[0] && branch.subCombinations[0].subCombinations) {
                        var subCombinations = branch.subCombinations[0].subCombinations;

                        var mutuallyExclusiveSelections = branch.subCombinations[0].mutuallyExclusiveSelections;
                        for (var prop in mutuallyExclusiveSelections) {

                            branch.mutuallyExclusiveSelections[prop] = mutuallyExclusiveSelections[prop];
                        }

                        subCombinations.forEach(function (b) {
                            b.parent = branch;
                        });
                        branch.subCombinations = subCombinations;
                        if (branch.subCombinations.length === 0) {
                            delete branch.subCombinations;
                        }
                    }
                }

                if (branch.subCombinations) {
                    branch.subCombinations.forEach(function (childBranch) {
                        recursiveCleanBranchTree(childBranch);
                    });
                }
                if (branch.datamartRef && branch.combination) {
                    var datamart = branch.datamartRef.Datamart;

                    branch.label = generateCombinationValues(branch, datamart, null);
                    branch.shortLabel = branch.label;
                    if (branch.parent.combination) {
                        branch.shortLabel = generateCombinationValues(branch, datamart, branch.parent);
                        setMutuallyExclusiveDisplayValue(branch, datamart);
                    }
                }
            }

            dataMartList.forEach(function (dataMartObject) {
                var branch = createCombinationTree(rootTree, {}, dataMartObject);
                var cumulatedDimensions = [];
                var levelsOfDimensions = [];

                setMutualExclusivityParameters(dataMartObject);
                setSpammyCategory(dataMartObject);

                dimensionPriority.forEach(function (dimensionList) {
                    var selection = null;
                    dimensionList.forEach(function (dimension) {
                        // special case:
                        //if (dimension === "Parameter" && dataMartObject.Datamart.AlgoFeedName === 'Major Price Breakout') {
                        //    return;
                        //}
                        cumulatedDimensions.push(dimension);
                    });
                    //if (dataMartObject.Datamart.AlgoFeedName === 'Major Price Breakout') {
                    //    selection = "Parameter";
                    //}
                    levelsOfDimensions.push({
                        selection: selection,
                        dimensions: [].concat(cumulatedDimensions)
                    });
                });
                recursiveTreeGeneration(branch, dataMartObject, {}, levelsOfDimensions, 0);
            });
            cleanNotFoundBranch(rootTree);
            recursiveCleanBranchTree(rootTree, null);

            rootTree.algoFeedEventTypeDict = {};
            dataMartList.forEach(function (dm) {
                dm.Datamart.EventTypes.forEach(function (et) {
                    rootTree.algoFeedEventTypeDict[et.AlgoFeedEventTypeId] = et;
                });
            });

            return rootTree;
        }
        
        function getAlgoFeedEventTypeIdsFromTree(tree, tradeVenue, mode) {
            mode = mode || 'AND';
            var algoFeedEventTypesIds = [];
            var individualTreeChecked = [];

            function findCheckes(branch) {
                if (branch.subCombinations) {
                    branch.subCombinations.forEach(function (subbranch) {
                        findCheckes(subbranch);
                    });
                } else {
                    if (branch.checked) {
                        individualTreeChecked.push(branch);
                    }
                }
            }
            if (tree && tree.subCombinations) {
                tree.subCombinations.forEach(function (sel) {
                    findCheckes(sel);
                });
            }

            individualTreeChecked.forEach(function (sel) {
                var combination = angular.copy(sel.combination);
                // Filter only selected trade venue's events
                if (tradeVenue) {
                    combination.Market = tradeVenue;
                }

                for (var prop in sel.mutuallyExclusiveSelections) {
                    var obj = sel.mutuallyExclusiveSelections[prop];
                    combination[prop] = obj.selection;
                }

                var eventTypes = sel.datamartRef.Dimensions.getEventTypes(combination);
                var eventTypeCategory = [];
                eventTypes.forEach(function (e) {
                    eventTypeCategory.push(e.AlgoFeedEventTypeId);
                });
                algoFeedEventTypesIds.push(eventTypeCategory);
            });

            if (mode === "OR") {
                var arr = [];
                algoFeedEventTypesIds.forEach(function (i) {
                    arr = arr.concat(i);
                });
                algoFeedEventTypesIds = [];
                algoFeedEventTypesIds.push(arr);
            }
            algoFeedEventTypesIds = algoFeedEventTypesIds.filter(function (inner) {
                return inner && inner.length > 0;
            });

            return algoFeedEventTypesIds;
        }
        
        tool.setServiceObjectProperties({
            getDataMartSelections: getDataMartSelections,
            convertDataMartToTreeSelectionStructure: convertDataMartToTreeSelectionStructure,
            getAlgoFeedEventTypeIdsFromTree: getAlgoFeedEventTypeIdsFromTree,            
        });
    });