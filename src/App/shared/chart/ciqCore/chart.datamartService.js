agmNgModuleWrapper('agms.chart')
    .defineService("pChartDatamartService",
    ['pChartTimeBoundEventFuncLibrary',
        'pChartPopupService',
        'sDatamartService',
        'sDatamartFundamentalDataService',
        'pChartEventVisibilityService',
        'pChartFilterDescriptionService',
        'sDatamartApiService'],
    function (serviceObj, dep, tool) {
        var pChartTimeBoundEventFuncLibrary = dep.pChartTimeBoundEventFuncLibrary,
            pChartPopupService = dep.pChartPopupService,
            sDatamartService = dep.sDatamartService,
            sDatamartFundamentalDataService = dep.sDatamartFundamentalDataService,
            pChartEventVisibilityService = dep.pChartEventVisibilityService,
            filterDescription = dep.pChartFilterDescriptionService,
            sDatamartApiService = dep.sDatamartApiService;

        var availableDatamarts = [];

        function getTimestamp(object) {
            return new Date(object.Timestamp);
        }

        function rebindDatamartEvents() {
            var promise = getAlgoFeedPostPromise();
            pChartTimeBoundEventFuncLibrary.generateTimeBoundEventFunc({
                pChartPopupService: pChartPopupService
            }, "DataMart", "template[algoFeed-grouped]", promise, function (object, clonedElement, scope) {
                scope.algoFeedPostGroup = object;
            }, getTimestamp, function (obj) {
                return obj.Direction === 'Bear' ? 'above' : 'below';
            });
            pChartEventVisibilityService.toggleEvent("DataMart", true);
        }

        function getConvertedTimeBasedOnBarSize(timestamp) {
            switch (filterDescription.barSize) {
                case "1 Min":
                    return moment(timestamp).startOf('minute');
                case "5 Min":
                    return moment(timestamp).minute(Math.floor(moment(timestamp).minute() / 5) * 5).second(0).milliseconds(0);
                case "10 Min":
                    return moment(timestamp).minute(Math.floor(moment(timestamp).minute() / 10) * 10).second(0).milliseconds(0);
                case "15 Min":
                    return moment(timestamp).minute(Math.floor(moment(timestamp).minute() / 15) * 15).second(0).milliseconds(0);
                case "30 Min":
                    return moment(timestamp).minute(Math.floor(moment(timestamp).minute() / 30) * 30).second(0).milliseconds(0);
                case "1 H":
                    return moment(timestamp).startOf('hour');
                case "2 H":
                    var hour = moment(timestamp).hour();
                    if (hour % 2 === 0) {
                        return moment(timestamp).hour(hour - 1).minute(0).second(0).milliseconds(0);
                    } else {
                        return moment(timestamp).hour(hour).minute(0).second(0).milliseconds(0);
                    }
                case "1 D":
                    return moment(timestamp).tz(filterDescription.primaryProduct.timeZone).startOf('day');
                case "1 W":
                    return moment(timestamp).tz(filterDescription.primaryProduct.timeZone).startOf('week');
                case '1 M':
                    return moment(timestamp).tz(filterDescription.primaryProduct.timeZone).startOf('month');
            }
            return moment(timestamp).startOf('day');
        }

        function getAlgoFeedPostPromise() {
            return function () {
                if (!filterDescription.primaryProduct || filterDescription.myProducts.length === 0) {
                    return tool.when([]);
                }
                var events = getAlgoFeedEventTypesFromTree(filterDescription.datamart.treeStructure);
                var algoFeedEventTypeIds = [];
                events.forEach(function (item) {
                    algoFeedEventTypeIds.push(item.AlgoFeedEventTypeId);
                });

                var productId = filterDescription.primaryProduct.ProductId;
                if (algoFeedEventTypeIds.length === 0) {
                    return tool.when([]);
                }

                return sDatamartApiService.getAlgoFeedPosts(algoFeedEventTypeIds, [productId]).then(function (res) {
                    var list = res.data.Payload;
                    var dict = {};
                    if (list.length === 0) {

                    } else {
                        list.forEach(function (ev) {
                            var convertedDate = getConvertedTimeBasedOnBarSize(ev.Timestamp);
                            // skip weekend
                            if (convertedDate.isoWeekday() === 6) {
                                convertedDate = convertedDate.add(2, 'day');
                            } else if (convertedDate.isoWeekday() === 7) {
                                convertedDate = convertedDate.add(1, 'day');
                            }
                            var timestamp = convertedDate.toDate().toISOString();

                            var key = timestamp + "_" + ev.Direction;
                            if (!dict[key]) {
                                dict[key] = {
                                    list: [],
                                    Direction: ev.Direction,
                                    showDetail: function () {
                                        this.detailShown = true;
                                        pChartPopupService.showChartPopupDetail(this);

                                    },
                                    Timestamp: timestamp,
                                    detailShown: false,
                                    hideDetail: function () {
                                        this.detailShown = false;
                                        pChartPopupService.hideChartPopupDetail(this);
                                    },
                                    getUserPicture: function () {
                                        var item = this.list.filter(function (i) {
                                            return i.actualItem.ManagerImageUrl;
                                        })[0];
                                        if (!item) {
                                            return null;
                                        }
                                        return item.actualItem.ManagerImageUrl;
                                    },
                                    hasMarketKing: function () {
                                        return this.list.filter(function (i) {
                                            return i.actualItem.ManagerImageUrl;
                                        }).length > 0;
                                    }
                                };
                            }
                            events.forEach(function (item) {
                                var eventTypeIds = _.pluck(dict[key].list, "AlgoFeedEventTypeId");

                                if (item.AlgoFeedEventTypeId === ev.AlgoFeedEventTypeId && !_.includes(eventTypeIds, item.AlgoFeedEventTypeId)) {
                                    var copiedItem = angular.copy(item);
                                    copiedItem.actualItem = ev;
                                    dict[key].list.push(copiedItem);
                                    if (!dict[key].color) {
                                        dict[key].color = item.color;
                                    }
                                }
                            });
                        });
                    }
                    var returnedList = [];
                    for (var prop in dict) {
                        returnedList.push(dict[prop]);
                    }
                    return returnedList;
                });
            };
        }

        function adjustDatamartTreeFromIds(algofeedEventTypeIds) {
            if (!filterDescription.datamart.treeStructure) {
                return;
            }
            filterDescription.datamart.treeStructure.subCombinations.forEach(function (branch) {
                resetBranch(branch);
            });
            algofeedEventTypeIds.forEach(function (algoFeedEventTypeId) {
                var item = filterDescription.datamart.treeStructure.algoFeedEventTypeDict[algoFeedEventTypeId];
                filterDescription.datamart.treeStructure.subCombinations.forEach(function (branch) {
                    branch.tabExpanded = recursiveFindCombination(item, branch);
                });
            });

            function resetBranch(branch) {
                if (!branch.subCombinations) {
                    // check;
                    branch.checked = false;
                } else {
                    branch.subCombinations.forEach(function (subBranch) {
                        resetBranch(subBranch);
                    });
                }
            }

            function checkBranchContainEventTypeId(item, branch) {
                var items = branch.datamartRef.Dimensions.getEventTypes(branch.combination);
                return items.filter(function (i) {
                    return i == item;
                }).length > 0;
            }

            function recursiveFindCombination(item, branch) {
                var hasItem = checkBranchContainEventTypeId(item, branch);
                if (!hasItem) {
                    return false;
                }
                if (!branch.subCombinations) {
                    // check;
                    branch.checked = true;
                    for (var prop in branch.mutuallyExclusiveSelections) {
                        if (branch.mutuallyExclusiveSelections[prop] && item[prop]) {
                            branch.mutuallyExclusiveSelections[prop].selection = item[prop];
                        }
                    }
                    return true;
                }
                var flag = false;
                branch.subCombinations.forEach(function (subBranch) {
                    flag = flag || recursiveFindCombination(item, subBranch);
                });
                sDatamartFundamentalDataService.reevaluateSubList(branch);
                return flag;
            }
        }

        function getAlgoFeedEventTypesFromTree(treeStructure) {
            if (!treeStructure) {
                return [];
            }
            var combinedList = [];
            var groupedList = sDatamartService.getAlgoFeedEventTypeIdsFromTree(treeStructure);
            groupedList.forEach(function (i) {
                combinedList = combinedList.concat(i);
            });
            var returnedEventTypes = [];
            treeStructure.subCombinations.forEach(function (i) {
                var eventTypes = i.datamartRef.Dimensions.getEventTypes({});
                eventTypes.forEach(function (et) {
                    if (combinedList.indexOf(et.AlgoFeedEventTypeId) >= 0) {
                        returnedEventTypes.push(et);
                    }
                });
            });

            return returnedEventTypes;
        }

        function loadDataMartSelection() {
            return sDatamartService.getDataMartSelections().then(function (res) {
                var dimensionPriority = [
                    ['Type', 'Action'],
                    ['Direction', 'Parameter']
                ];
                res.forEach(function (item) {
                    availableDatamarts = availableDatamarts.concat(item.Dimensions.getEventTypes());
                });

                return sDatamartService.convertDataMartToTreeSelectionStructure(res, dimensionPriority);
            });
        }

        tool.setServiceObjectProperties({
            adjustDatamartTreeFromIds: adjustDatamartTreeFromIds,
            getAlgoFeedEventTypesFromTree: getAlgoFeedEventTypesFromTree,
            rebindDatamartEvents: rebindDatamartEvents,
            loadDataMartSelection: loadDataMartSelection
        });
    });

