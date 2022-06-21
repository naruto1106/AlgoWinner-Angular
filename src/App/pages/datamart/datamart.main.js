agmNgModuleWrapper("agmp.datamart")
    .defineControllerAsPage("p.datamart.MainController",
    "/App/pages/datamart/datamart.main.html",
    ["sProductDefaultColumnService", "pDashboardPageService", "coreUtil", "sProductService", "$filter", "pDatamartStatesService",
        "sDatamartService", "sDatamartApiService", 'sDatamartItemService', "sHeaderService", 'commonTimeZoneService', 'sMenuRightClickService',
        'sWatchlistUpdateManagerService', 'sTradingHolidayService'],
    function (vm, dep, tool) {
        var sProductDefaultColumnService = dep.sProductDefaultColumnService,
            pDashboardPageService = dep.pDashboardPageService,
            coreUtil = dep.coreUtil,
            sProductService = dep.sProductService,
            $filter = dep.$filter,
            pDatamartStatesService = dep.pDatamartStatesService,
            sDatamartService = dep.sDatamartService,
            sDatamartApiService = dep.sDatamartApiService,
            sDatamartItemService = dep.sDatamartItemService,
            commonTimeZoneService = dep.commonTimeZoneService,
            sMenuRightClickService = dep.sMenuRightClickService,
            sTradingHolidayService = dep.sTradingHolidayService,
            sWatchlistUpdateManagerService = dep.sWatchlistUpdateManagerService,
            coreUserStateService = dep.coreUserStateService;

        vm.screenerFilter = pDatamartStatesService.dataMartFilter;

        var lastUsMinDate = moment(new Date()).subtract(1, "years").toDate();
        var checkedSectors = [];

        var externalVmForScreener = {
            addToPriceAlert: sMenuRightClickService.addToPriceAlert,
            addToWatchlist: sMenuRightClickService.addToWatchlist,
            __algoFeedInfoDictionary: [],
            getAlgoFeedInfo: function (id) {
                if (this.__algoFeedInfoDictionary[id]) {
                    return this.__algoFeedInfoDictionary[id];
                }

                var obj = findEventTypesAndDisplayName(id, vm.screenerFilter.datamartSelections);
                obj.longName = $filter('dataMartEventTypeLongNameFilter')(obj.eventType, obj.datamart.AlgoFeedName);
                this.__algoFeedInfoDictionary[id] = obj;
                return obj;
            }
        };

        externalVmForScreener.gotoChart = function (item) {
            if (item.AlgoFeed && item.AlgoFeed.AlgoFeedEventTypeId) {
                return sMenuRightClickService.gotoChart(item.ProductModel, "AlgoMart", item.AlgoFeed.AlgoFeedEventTypeId);
            }
            return sMenuRightClickService.gotoChart(item.ProductModel);
        };

        // --- LOCAL SERVICE FUNC 
        function findEventTypesAndDisplayName(id, dataMartList) {
            var eventType = null;
            var datamart = null;
            dataMartList.forEach(function (dm) {

                dm.Datamart.EventTypes.forEach(function (et) {
                    if (et.AlgoFeedEventTypeId === id) {
                        eventType = et;
                        datamart = dm.Datamart;
                    }
                });
            });
            if (!eventType) {
                return null;
            }
            return {
                eventType: eventType,
                datamart: datamart
            };
        }

        function getSpammynessSelectionFromTree(tree, twoDimensionalAndOrLogic) {
            if (!tree.algoFeedEventTypeDict) {
                return false;
            }
            var isAndCombinationSpammy = true;
            twoDimensionalAndOrLogic.forEach(function (arr) {
                var isOrCombinationSpammy = false;
                // if any of OR combination is spammy, therefore it is spammy
                arr.forEach(function (etId) {
                    if (tree.algoFeedEventTypeDict[etId]) {
                        isOrCombinationSpammy = isOrCombinationSpammy || tree.algoFeedEventTypeDict[etId].spammy;
                    }
                });

                // if any of AND combination is not spammy, therefore it is not spammy

                isAndCombinationSpammy = isAndCombinationSpammy && isOrCombinationSpammy;
            });
            return isAndCombinationSpammy;
        }

        // --- SCOPE FUNC 
        function openCustomScreenerSelector() {
            return vm.screenerFilter.mode === "Custom";
        }

        function isInvalidEventFunc(branch) {
            var events = branch.datamartRef.Dimensions.getEventTypes({
                Market: vm.screenerFilter.selectedTradeVenue
            });

            if (events.length > 0) {
                return null;
            }
            return "Not Available for " + vm.screenerFilter.selectedTradeVenue + " Markets";
        }

        function getCustomRowClass(item) {
            if (item.hideProduct) {
                return ['hide-products'];
            }
        }

        function postprocessCustomListFunc(list) {
            var lastProductId = 0;
            list.forEach(function (item, idx) {
                if (lastProductId !== item.ProductModel.ProductId) {
                    lastProductId = item.ProductModel.ProductId;
                    item.hideProduct = false;
                } else {
                    item.hideProduct = true;
                }
            });
            return list;
        }

        function getMinimumDate() {
            switch (vm.screenerFilter.selectedTradeVenue) {
                case "SG":
                    return null;
                case "US":
                case "Global Indices":
                    return lastUsMinDate;
            }
        }

        function expandDateRangeSelection() {
            vm.isDateSelectionExpanded = true;
        }

        function collapseDateRangeSelection() {
            vm.isDateSelectionExpanded = false;

            if (!vm.screenerFilter.isSelectingCustomDateRange) {
                vm.setCustomDateSelection();
            }
        }

        function getMaximumDateRange() {
            return vm.isSpammyResult ? 7 : 365;
        }

        function adjustDateToRange() {
            var distance = getMaximumDateRange();

            var maxDate = moment(vm.screenerFilter.fromDate).add(distance, 'days').toDate();
            if (maxDate.getTime() > (new Date).getTime()) {
                maxDate = new Date();
            }
            return tool.when({
                to: {
                    maxDate: maxDate
                }
            });
        }

        function adjustDateFromRange() {
            var distance = getMaximumDateRange();
            return tool.when({
                from: {
                    minDate: moment(vm.screenerFilter.toDate).subtract(distance, 'days').toDate()
                }
            });
        }

        function getDateRanges() {
            var list = [];
            if (vm.isSpammyResult) {
                list = vm.shortDateRanges;
            } else {
                list = vm.broadDateRanges;
            }

            if (vm.screenerFilter.isSelectingCustomDateRange && !vm.isDateSelectionExpanded) {
                return list.concat([vm.customDateRangeOption]);
            } else {
                return list;
            }
        }

        function setCustomDateSelection() {
            vm.screenerFilter.isSelectingCustomDateRange = true;
            vm.screenerFilter.selectedDateRange = vm.customDateRangeOption;
        }

        function setFundamentalFilterVisibility(v) {
            vm.isFundamentalFilterShown = v;
        }

        function showRange(pr) {
            if (pr.from == null) {
                return "<" + pr.to;
            } else if (pr.to == null) {
                return ">" + pr.from;
            } else {
                return pr.from + "-" + pr.to;
            }
        }

        function showMarketCap(mc) {
            return mc.name;
        }

        function searchProducts(keyword) {
            return sProductService.SearchProductByMarket(keyword, vm.screenerFilter.selectedTradeVenue, true).then(function (res) {
                return res.data;
            });
        }

        function evaluateAll(item) {
            var temp = true;
            vm.getFilteredIndustryList(vm.screenerFilter.selectedTradeVenue).forEach(function (i) {
                temp = i.checked && temp;
            });
            vm.screenerFilter.allIndustriesChecked = temp;

            // impose a restriction where at least one item has to be checked. 
            // if this unchecking causes all items to be unchecked, check the item back
            if (_.all(vm.getFilteredIndustryList(vm.screenerFilter.selectedTradeVenue), function (i) {
                return !i.checked;
            })) {
                item.checked = true;
            }
        }

        function setLabelName(items) {
            if (vm.screenerFilter.allIndustriesChecked) {
                vm.checkBoxName = "All";
            } else if (items) {
                if (items.length > 1) {
                    vm.checkBoxName = items.length + " sectors";
                } else if (items.length === 1) {
                    vm.checkBoxName = items[0].Sector.SectorName;
                }
            }
        }

        function onIndustryDropdownToggled(open) {
            if (open) {
                checkedSectors = _.filter(vm.getFilteredIndustryList(vm.screenerFilter.selectedTradeVenue), function (item) { return item.checked; });
            } else {
                var checkedItemsOnClose = _.filter(vm.getFilteredIndustryList(vm.screenerFilter.selectedTradeVenue), function (item) { return item.checked; });
                if (!(_.difference(checkedItemsOnClose, checkedSectors).length === 0
                    && _.difference(checkedSectors, checkedItemsOnClose).length === 0)) {
                    repopulateCustomScreener();
                    setLabelName(checkedItemsOnClose);
                }
            }
        }

        function generateParams() {
            var sectorIds = [];
            var algoFeedEventTypeIds = [];

            vm.getFilteredIndustryList(vm.screenerFilter.selectedTradeVenue).forEach(function (i) {
                if (i.checked) {
                    sectorIds.push(i.Sector.SectorId);
                }
            });

            algoFeedEventTypeIds = sDatamartService.getAlgoFeedEventTypeIdsFromTree(vm.screenerFilter.treeStructure, vm.screenerFilter.selectedTradeVenue, vm.eventTypeSearchCombinationType);

            var isSpammy = false;
            if (algoFeedEventTypeIds.length > 0) {
                isSpammy = getSpammynessSelectionFromTree(vm.screenerFilter.treeStructure, algoFeedEventTypeIds);
            }

            var promise = tool.when();
            var oldSpammyStatus = vm.isSpammyResult;
            vm.isSpammyResult = isSpammy;
            if (!oldSpammyStatus && isSpammy) {
                switch (vm.screenerFilter.selectedDateRange) {
                    case 'Latest Trading Day':
                    case 'Past Week':
                        break;
                    default:
                        vm.screenerFilter.selectedDateRange = 'Past Week';
                        promise = setDateRangeBasedOnSelection();
                }
            }

            return promise.then(function () {
                vm.checkCounts = algoFeedEventTypeIds.length;

                sectorIds = _.uniq(sectorIds);

                var fundamentalParams = sDatamartItemService.evaluateFundamentalAndReturnMergedObjects({
                    marketCaps: vm.screenerFilter.fundamental.marketCaps,
                    priceRanges: vm.screenerFilter.fundamental.priceRanges,
                    peRatios: vm.screenerFilter.fundamental.peRatios,
                    earningGrowths: vm.screenerFilter.fundamental.earningGrowths
                });

                if (vm.screenerFilter.selectedTradeVenue === "US") {
                    fundamentalParams.UsePriceRangeFilter = false;
                }
                var fromDate = commonTimeZoneService.getDateWithZoneChanges(vm.screenerFilter.fromDate, vm.screenerFilter.selectedTradeVenue, function (x) { return x.startOf('day'); });
                var toDate = commonTimeZoneService.getDateWithZoneChanges(vm.screenerFilter.toDate, vm.screenerFilter.selectedTradeVenue, function (x) { return x.endOf('day'); });

                var param = {
                    FromDate: fromDate,
                    ToDate: toDate,
                    AssetClass: vm.screenerFilter.selectedAssetClass,
                    TradeVenue: vm.screenerFilter.selectedTradeVenue,
                    SectorIds: sectorIds,
                    AlgoFeedEventTypeIds: algoFeedEventTypeIds,
                    UsePredefinedList: vm.screenerFilter.usePredefinedList && vm.screenerFilter.selectedTradeVenue === 'US',
                    PredefinedCategory: vm.screenerFilter.predefinedCategory
                };

                angular.merge(param, fundamentalParams);

                return param;
            });
        }

        function makeRequestBasedOnFilter() {
            return generateParams().then(function (param) {
                vm.screenerFilter.hasTooBroadFundamentalFilter = false;
                vm.screenerFilter.isCustomScreenerFundamentalOnly = param.AlgoFeedEventTypeIds.length === 0;
                if (vm.screenerFilter.isCustomScreenerFundamentalOnly) {
                    if ((vm.screenerFilter.usePredefinedList && vm.screenerFilter.predefinedCategory === "All" && param.SectorIds.length === vm.getFilteredIndustryList(vm.screenerFilter.selectedTradeVenue).length) ||
                        (!vm.screenerFilter.usePredefinedList && !param.UsePriceRangeFilter && !param.UseMarketCapFilter && !param.UsePeRatioFilter && !param.UseEgRatioFilter &&
                            param.SectorIds.length === vm.getFilteredIndustryList(vm.screenerFilter.selectedTradeVenue).length)) {
                        vm.screenerFilter.hasTooBroadFundamentalFilter = true;
                        return tool.when([]);
                    }
                }
                return getDataMartScreenerContent(param);
            });
        }

        function handleNewDataMartPost(post) {

            generateParams().then(function (param) {
                if (param.AlgoFeedEventTypeIds.length === 0) {
                    return;
                }
                if (param.SectorIds.indexOf(post.Product.SectorId) < 0) {
                    return;
                }
                if (param.SectorIds.indexOf(post.Product.SectorId) < 0) {
                    return;
                }
                var postTimestamp = new Date(post.CreatedDate).getTime();
                if (postTimestamp > new Date(param.ToDate).getTime()) {
                    return;
                }
                if (postTimestamp < new Date(param.FromDate).getTime()) {
                    return;
                }
                if (vm.screenerFilter.selectedTradeVenue !== post.AlgoFeedEventType.Market) {
                    return;
                }
                if (vm.screenerFilter.selectedAssetClass !== post.Product.Instrument.AssetClass) {
                    return;
                }
                if (!param.AlgoFeedEventTypeIds || param.AlgoFeedEventTypeIds.length === 0) {
                    return;
                }

                if (param.AlgoFeedEventTypeIds.length > 0) {
                    var hasIds = false;
                    param.AlgoFeedEventTypeIds.forEach(function (items) {
                        if (items.indexOf(post.AlgoFeedEventType.AlgoFeedEventTypeId) >= 0) {
                            hasIds = true;
                        }
                    });

                    if (!hasIds) {
                        return;
                    }
                }
                param.ProductId = post.Product.ProductId;
                getProductScreenerContent(param).then(function (item) {
                    if (item) {
                        item.ProductModel = item.Product;
                        var items = sDatamartItemService.handleSingleData(item);
                        var list = items.concat(vm.populatedCustomScreenerList);
                        return sWatchlistUpdateManagerService.updateMarketDataForPanel("CUSTOM_SCREENER", vm.populatedCustomScreenerList, list).then(function () {
                            var initializedList = initializeCustomScreenerList(list);
                            vm.populatedCustomScreenerList = initializedList;
                        });
                    }
                });
            });
        }

        function repopulateCustomScreener() {
            if (!vm.isInitialized) {
                return tool.when(true);
            }
            vm.selectedItemAsFilter = null;
            vm.isLoadingCustomList = true;

            return makeRequestBasedOnFilter().then(function (list) {
                return sWatchlistUpdateManagerService.updateMarketDataForPanel("CUSTOM_SCREENER", vm.populatedCustomScreenerList, list).then(function () {
                    var initializedList = list;
                    if (!vm.screenerFilter.isCustomScreenerFundamentalOnly) {
                        initializedList = initializeCustomScreenerList(list);
                    }
                    vm.populatedCustomScreenerList = initializedList;
                }).finally(function () {
                    vm.isLoadingCustomList = false;
                });
            }, function () {
                vm.isLoadingCustomList = false;
            });
        }

        function initializeCustomScreenerList(list) {
            if (!list) {
                return [];
            }
            var listOfGroup = _.groupBy(list, function (i) {
                return i.ProductModel.ProductId + "-" + i.AlgoFeed.AlgoFeedEventTypeId;
            });
            var arr = [];
            for (var prop in listOfGroup) {
                var items = listOfGroup[prop];
                var sortedItems = _.sortBy(items, function (i) { return -i.AlgoFeed.Timestamp.getTime(); });
                arr.push(sortedItems[0]);
            }
            var listOfGroup2 = _.groupBy(arr, function (i) {
                return i.ProductModel.ProductId;
            });

            var listOfGroupList = [];
            for (var prop2 in listOfGroup2) {
                var items2 = listOfGroup2[prop2];
                var sortedItems2 = _.sortBy(items2, function (i) { return -i.AlgoFeed.Timestamp.getTime(); });

                listOfGroupList.push({
                    list: sortedItems2,
                    timeStamp: sortedItems2[0].AlgoFeed.Timestamp
                });
            }

            var sortedListOfGroupList = _.sortBy(listOfGroupList, function (i) { return -i.timeStamp.getTime(); });
            var arr2 = [];
            sortedListOfGroupList.forEach(function (listObj) {
                arr2 = arr2.concat(listObj.list);
            });
            arr2.forEach(function (i) {

                var time = $filter('dateLongWithTimeZone')(commonTimeZoneService.getMarketTimeZoneTime(i.AlgoFeed.Timestamp, i.ProductModel.TradeVenueLoc),
                    commonTimeZoneService.getTimeZoneMapping(i.ProductModel.TradeVenueLoc));

                i.AlgoFeed.TimestampString = time;
            });
            return arr2;
        }

        function dateRangeDropdownSelectionChanged() {
            if (vm.screenerFilter.selectedDateRange) {
                vm.screenerFilter.isSelectingCustomDateRange = false;
                setDateRangeBasedOnSelection().then(function () {
                    repopulateCustomScreener();
                });
            }
        }

        function getDataMartSelections() {
            return sDatamartService.getDataMartSelections().then(function (res) {
                vm.screenerFilter.datamartSelections = res;

                // rearrange:
                var item = vm.screenerFilter.datamartSelections.filter(function (i) {
                    return i.Datamart.AlgoFeedName === "Major Price Breakout";
                })[0];
                if (item) {
                    var idx = vm.screenerFilter.datamartSelections.indexOf(item);
                    vm.screenerFilter.datamartSelections.splice(idx, 1);
                    vm.screenerFilter.datamartSelections.unshift(item);
                }

                vm.screenerFilter.treeStructure = sDatamartService.convertDataMartToTreeSelectionStructure(vm.screenerFilter.datamartSelections);

                var selectedBranch = null;
                vm.screenerFilter.treeStructure.subCombinations.forEach(function (branch) {
                    // check Crossover Momentum by default
                    branch.subCombinations.forEach(function (subBranch) {
                        if (subBranch.shortLabel === "Price Breaks Above-52 Weeks") {
                            selectedBranch = subBranch;
                        }
                    });
                });
                if (selectedBranch) {
                    checkDatamartPopulatedFilter(selectedBranch);
                    vm.isInitialized = true;
                    //repopulateCustomScreener();
                }

            }).finally(function () {
                vm.isInitialized = true;
                screenerModeChanged();
            });
        };

        function checkDatamartPopulatedFilter(branch) {
            branch.checked = true;
            if (branch.subCombinations && branch.subCombinations.length > 0) {
                branch.subCombinations.forEach(function (b) {
                    checkDatamartPopulatedFilter(b);
                });
            }
        }

        function setDateRangeBasedOnSelection() {
            var tradeVenue = null;

            switch (vm.screenerFilter.selectedTradeVenue) {
                case "SG":
                    tradeVenue = "Singapore";
                    break;
                case "US":
                case "Global Indices":
                    tradeVenue = "UnitedStates";
                    break;
            }
            return getLatestStartTradingDate(tradeVenue).then(function (date) {
                switch (vm.screenerFilter.selectedDateRange) {

                    //'Latest Trading Day', 'Past Week', 'Past Month', 'Past Year'
                    case 'Latest Trading Day':
                        vm.screenerFilter.toDate = moment(date).toDate();
                        vm.screenerFilter.fromDate = moment(date).toDate();
                        break;
                    case 'Past Week':
                        vm.screenerFilter.toDate = moment(date).toDate();
                        vm.screenerFilter.fromDate = moment(date).subtract(6, "days").toDate();
                        break;
                    case 'Past Month':
                        vm.screenerFilter.toDate = moment(date).toDate();
                        vm.screenerFilter.fromDate = moment(date).subtract(1, "months").toDate();
                        break;
                    case 'Past Year':
                        vm.screenerFilter.toDate = moment(date).toDate();
                        vm.screenerFilter.fromDate = moment(date).subtract(1, "years").toDate();
                        break;
                }
            });
        }

        function onMarketChangedForCustomScreener() {
            vm.screenerFilter.allIndustriesChecked = true;
            vm.checkBoxName = "All";
            vm.screenerFilter.usePredefinedList = false;
            onAllIndustriesCheckedChanged();

            setDateRangeBasedOnSelection().then(function () {
                repopulateCustomScreener();
            });
        }

        function screenerModeChanged() {
            vm.screenerFilter.selectedAssetClass = "Stocks & ETFs";
            if (vm.screenerFilter.customScreenerTradeVenues.length === 1) {
                vm.screenerFilter.selectedTradeVenue = vm.screenerFilter.customScreenerTradeVenues[0];
            }
            repopulateCustomScreener();
        }

        function onAllIndustriesCheckedChanged() {
            vm.getFilteredIndustryList(vm.screenerFilter.selectedTradeVenue).forEach(function (i) {
                i.checked = vm.screenerFilter.allIndustriesChecked;
            });

            if (!vm.screenerFilter.allIndustriesChecked) {
                vm.getFilteredIndustryList(vm.screenerFilter.selectedTradeVenue)[0].checked = true;
            }
        }

        function preprocessFilterListFunc(list) {
            if (vm.selectedItemAsFilter && vm.selectedItemAsFilter.ProductId) {
                return list.filter(function (item) {
                    return item.ProductModel.ProductId === vm.selectedItemAsFilter.ProductId;
                });
            }
            return list;
        }

        function getLatestStartTradingDate(tradeVenue) {
            return sTradingHolidayService.GetLatestMarketStartTime(tradeVenue).then(function (res) {
                return res.data;
            });
        }

        function getProductScreenerContent(param) {
            return sDatamartApiService.getProductScreenerContent(param).then(function (res) {
                return res.data;
            }, function () {
            });
        }

        function handlePopulatedScreenerDataListByPromise(promise) {
            return promise.then(function (data) {
                var list = [];
                data.forEach(function (item) {
                    list = list.concat(sDatamartItemService.handleSingleData(item));
                });
                return list;
            });
        }

        function handlePopulatedFundamentalScreenerDataListByPromise(promise) {
            return promise.then(function (data) {
                var list = [];
                data.forEach(function (item) {
                    list.push({
                        ProductModel: item.Product,
                        MarketData: {}
                    });
                });
                return list;
            });
        }

        var getDataMartScreenerContentDeferreds = [];
        var latestId = "";

        function getDataMartScreenerContent(param) {
            latestId = param.FromDate + param.ToDate + param.AssetClass + param.TradeVenue + param.SectorIds.toString() + " Data Mart:" + param.AlgoFeedEventTypeIds.toString();

            var getDataMartScreenerContentDeferred = {
                id: latestId,
                deferred: tool.defer()
            };
            getDataMartScreenerContentDeferreds.push(getDataMartScreenerContentDeferred);
            return sDatamartApiService.getDataMartScreenerContent(param).then(function (res) {
                getDataMartScreenerContentDeferred.deferred.resolve(res.data);
                var promise = getDataMartScreenerContentDeferred.deferred.promise;

                if (getDataMartScreenerContentDeferreds.length > 1) {
                    promise = getDataMartScreenerContentDeferreds[getDataMartScreenerContentDeferreds.length - 1].deferred.promise;
                }
                if (param.AlgoFeedEventTypeIds.length > 0) {
                    return handlePopulatedScreenerDataListByPromise(promise);
                } else {
                    return handlePopulatedFundamentalScreenerDataListByPromise(promise);
                }
            }, function () {
                getDataMartScreenerContentDeferred.deferred.reject();
            });
        }

        tool.initialize(function () {
            tool.setVmProperties({
                checkBoxName: "All",
                populatedCustomScreenerList: [],
                shortDateRanges: ['Latest Trading Day', 'Past Week'],
                broadDateRanges: ['Latest Trading Day', 'Past Week', 'Past Month', 'Past Year'],
                customDateRangeOption: "-Select Custom Range-",
                assetClassesForCustomFilter: ['Stocks & ETFs'],
                predefinedCategories: ["All", "S&P 500", "NASDAQ 100"],
                isCustomScreenerFundamentalOnly: false,
                isFundamentalFilterShown: false,
                eventTypeSearchCombinationType: 'AND',
                customScreenerProductListOption: {
                    visibility: {
                        showHeader: true,
                        hasPagination: true
                    },
                    forceSorting: true,
                    columns: [
                        sProductDefaultColumnService.defaultColumns.productInfo,
                        sProductDefaultColumnService.defaultColumns.compactPriceChanges,
                        {
                            templateId: 'bigscreener/screener-algofeed',
                            classNames: ['screener-algofeed'],
                            title: "Datamart",
                            sortingFunc: function (a, b) {
                                if (a.AlgoFeed && b.AlgoFeed) {
                                    var pA = externalVmForScreener.getAlgoFeedInfo(a.AlgoFeed.AlgoFeedEventTypeId).longName.toUpperCase();
                                    var pB = externalVmForScreener.getAlgoFeedInfo(b.AlgoFeed.AlgoFeedEventTypeId).longName.toUpperCase();
                                    return pA.localeCompare(pB);
                                }
                                return 0;
                            }
                        },
                        {
                            templateId: 'bigscreener/screener-algofeed-price',
                            classNames: ['screener-algofeed-price'],
                            title: "Price",
                            sortingFunc: function (a, b) {
                                if (a.AlgoFeed && b.AlgoFeed) {
                                    return coreUtil.sortValue(a.AlgoFeed.TriggerPrice, b.AlgoFeed.TriggerPrice);
                                }
                                return 0;
                            }
                        },
                        {
                            templateId: 'bigscreener/screener-algofeed-timestamp',
                            classNames: ['screener-algofeed-timestamp'],
                            title: "Date",
                            sortingFunc: function (a, b) {
                                if (a.AlgoFeed && b.AlgoFeed) {
                                    return coreUtil.sortValue(a.AlgoFeed.Timestamp.getTime(), b.AlgoFeed.Timestamp.getTime());
                                }
                                return 0;
                            }
                        },
                        {
                            templateId: 'bigscreener/screener',
                            classNames: ['screener-column'],
                            title: ""
                        }
                    ],
                    selectedItemAsFilter: null,
                    getRowClass: getCustomRowClass,
                    preprocessFilterListFunc: preprocessFilterListFunc,
                    postprocessListFunc: postprocessCustomListFunc,
                    externalVm: externalVmForScreener
                },

                openCustomScreenerSelector: openCustomScreenerSelector,
                isInvalidEventFunc: isInvalidEventFunc,
                getMinimumDate: getMinimumDate,
                expandDateRangeSelection: expandDateRangeSelection,
                collapseDateRangeSelection: collapseDateRangeSelection,
                adjustDateToRange: adjustDateToRange,
                adjustDateFromRange: adjustDateFromRange,
                getDateRanges: getDateRanges,
                setCustomDateSelection: setCustomDateSelection,
                setFundamentalFilterVisibility: setFundamentalFilterVisibility,
                showRange: showRange,
                showMarketCap: showMarketCap,
                searchProducts: searchProducts,
                evaluateAll: evaluateAll,
                dateRangeDropdownSelectionChanged: dateRangeDropdownSelectionChanged,
                onMarketChangedForCustomScreener: onMarketChangedForCustomScreener,
                screenerModeChanged: screenerModeChanged,
                onAllIndustriesCheckedChanged: onAllIndustriesCheckedChanged,
                repopulateCustomScreener: repopulateCustomScreener,
                preprocessFilterListFunc: preprocessFilterListFunc,
                getFilteredIndustryList: pDashboardPageService.getFilteredIndustryList
            });

            //data mart list optiopns
            vm.customScreenerProductListOption.menuList = sMenuRightClickService.getRightClickMenu(true);
            vm.customScreenerProductListOption.menuList.forEach(function (selection) {
                if (selection.label === "View Advanced Chart") {
                    selection.action = function (item) {
                        if (item.AlgoFeed && item.AlgoFeed.AlgoFeedEventTypeId) {
                            return sMenuRightClickService.gotoChart(item.ProductModel, "AlgoMart", item.AlgoFeed.AlgoFeedEventTypeId);
                        }
                        return sMenuRightClickService.gotoChart(item.ProductModel);
                    }
                }
            });

            //stocks for market list options
            vm.fundamentalScreenerProductListOption = {
                columns: [
                    sProductDefaultColumnService.defaultColumns.productInfo,
                    sProductDefaultColumnService.defaultColumns.bidPrice,
                    sProductDefaultColumnService.defaultColumns.askPrice,
                    sProductDefaultColumnService.defaultColumns.bidVolume,
                    sProductDefaultColumnService.defaultColumns.askVolume,
                    sProductDefaultColumnService.defaultColumns.lastTradedPrice,
                    sProductDefaultColumnService.defaultColumns.priceChanges,
                    sProductDefaultColumnService.defaultColumns.tradeVolume,
                    {
                        templateId: 'bigscreener/screener',
                        classNames: ['screener-column', 'fundamental'],
                        title: ""
                    }
                ],
                preprocessFilterListFunc: preprocessFilterListFunc,
                externalVm: externalVmForScreener,
                visibility: {
                    hasNominalPriceChanges: true,
                    showHeader: true,
                    hasPagination: true
                },
                forceSorting: true,
                menuList: sMenuRightClickService.menuListProvider
            };

            vm.screenerFilter.marketCap = vm.screenerFilter.fundamental.marketCaps[0];
            vm.screenerFilter.predefinedCategory = vm.predefinedCategories[0];
            vm.screenerFilter.onIndustryDropdownToggled = onIndustryDropdownToggled;

            if (coreUserStateService.isLoggedIn() && !coreUserStateService.hasPendingLogoutConfirmation) {
                setDateRangeBasedOnSelection();

                getLatestStartTradingDate("UnitedStates").then(function (date) {
                    lastUsMinDate = moment(date).subtract(1, "years").toDate();
                });

                tool.signalRNotification("NewAlgoFeedPost", handleNewDataMartPost);

                pDashboardPageService.getIndustriesAndSectors().then(function (res) {
                    pDashboardPageService.industrySelections = res.allIndustryAvailabilityList;
                    onAllIndustriesCheckedChanged();
                    getDataMartSelections();
                });

                sWatchlistUpdateManagerService.setMarketDataUpdateHandlerOnListOfWatchlistProducts(function () {
                    return vm.populatedCustomScreenerList;
                }, tool);

                dep.sHeaderService.selectMenu("datamart");                
            }
        });
    })