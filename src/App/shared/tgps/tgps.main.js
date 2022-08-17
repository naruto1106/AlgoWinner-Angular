agmNgModuleWrapper("agms.tgps")
    .defineController('s.tgps.MainBaseController',
    [
        'sProductDefaultColumnService',
        'sWatchlistService',
        'coreDataStorageService',
        'sTgpsScreenerService',
        'coreConfigService',
        'sProductService',
        "pChartService",
        'pDatamartStatesService',
        'sMarketEntitlementService',
        'commonTimeZoneService',
        'sDatamartItemService',
        'sMenuRightClickService',
        'sTradingHolidayService',
        'sTgpsService',
        'coreUserStateService',
        'coreUtil',
        'pProductPageService'
    ],
    function (vm, dep, tool) {

        var coreUserStateService = dep.coreUserStateService,
            sProductService = dep.sProductService,
            coreConfigService = dep.coreConfigService,
            sTgpsScreenerService = dep.sTgpsScreenerService,
            sProductDefaultColumnService = dep.sProductDefaultColumnService,
            coreDataStorageService = dep.coreDataStorageService,
            sWatchlistService = dep.sWatchlistService,
            pChartService = dep.pChartService,
            pDatamartStatesService = dep.pDatamartStatesService,
            sMarketEntitlementService = dep.sMarketEntitlementService,
            commonTimeZoneService = dep.commonTimeZoneService,
            sDatamartItemService = dep.sDatamartItemService,
            sMenuRightClickService = dep.sMenuRightClickService,
            sTradingHolidayService = dep.sTradingHolidayService,
            sTgpsService = dep.sTgpsService;
            pProductPageService = dep.pProductPageService;
            coreUtil = dep.coreUtil;

        var allStocksForPosition = [];
        var allStocksForSwing = [];

        function onFilterChanged() {
            loadStockList();
        }

        function onVolumeFilterChanged() {
            // refresh the list somehow
        }

        function getLatestEndTradingDate(tradeVenue) {
            return sTradingHolidayService.GetLatestMarketEndTime(tradeVenue).then(function (res) {
                return res.data;
            });
        }

        function calculateFundamentalFilterNumber(fundamentalParamsList) {
            var count = 0;
            fundamentalParamsList.forEach(function (f) {
                if(f.TradeVenue === vm.filter.tradeVenueLoc.label){
                    count = count +
                        (f.EgRatios.length > 0 ? 1 : 0) +
                        (f.MarketCapTypes.length > 0 ? 1 : 0) +
                        (f.PeRatios.length > 0 ? 1 : 0) +
                        (f.PriceRanges.length > 0 ? 1 : 0) +
                        (f.AnalystRatings.length > 0 ? 1 : 0) + 
                        (f.Noise.length > 0 ? 1 : 0) +
                        (f.Turnover.length > 0 ? 1 : 0) +
                        (f.Sector.length > 0 ? 1 : 0) + 
                        (f.Industry.length > 0 ? 1 : 0) + 
                        (f.VolumeRanges.length > 0 ? 1 : 0);
                }
            });
            return count;
        }

        function onFrontEndFilterChanged() {            
            if (vm.mode === 'Position') {
                vm.filteredStocksForPosition = allStocksForPosition.filter(function (s) {
                    if (vm.filter.direction === "All") {
                        return true;
                    }
                    if (vm.filter.direction === "Bearish") {
                        return s.Direction === 'Bear';
                    }
                    if (vm.filter.direction === "Bullish") {
                        return s.Direction === 'Bull';
                    }
                    if (vm.filter.direction === 'None') {
                        return s.Direction === 'Neutral';
                    }
                    return true;
                }).filter(function (s) {
                    if (vm.filter.crossover === "All") {
                        return true;
                    }
                    if (vm.filter.crossover === "DOWN") {
                        return s.COMDiff < 0;
                    }
                    if (vm.filter.crossover === "UP") {
                        return s.COMDiff > 0;
                    }
                    if (vm.filter.crossover === 'NONE') {
                        return !s.COMDiff;
                    }
                    return true;
                }).filter(function (s) {
                    if (vm.filter.tid === 0) {
                        return s.TID === vm.filter.tid;
                    }
                    if (vm.filter.tid === 1) {
                        return s.TID === vm.filter.tid;
                    }
                    if (vm.filter.tid === 2) {
                        return s.TID === vm.filter.tid;
                    }
                    if (vm.filter.tid === 3) {
                        return s.TID === vm.filter.tid;
                    }
                    if (vm.filter.tid === 4) {
                        return s.TID === vm.filter.tid;
                    }
                    if (vm.filter.tid === -1) {
                        return s.TID === vm.filter.tid;
                    }
                    if (vm.filter.tid === -2) {
                        return s.TID === vm.filter.tid;
                    }
                    if (vm.filter.tid === -3) {
                        return s.TID === vm.filter.tid;
                    }
                    if (vm.filter.tid === -4) {
                        return s.TID === vm.filter.tid;
                    }                    
                    // if (vm.filter.payoutstrategy === "All") {
                    //     return true;
                    // }
                    // if (vm.filter.payoutstrategy === "Near (below)") {
                    //     return s.Payout == "Near (below)";
                    // }
                    // if (vm.filter.payoutstrategy === "Near (above)") {
                    //     return s.Payout == "Near (above)";
                    // }
                    // if (vm.filter.payoutstrategy === "Cross above") {
                    //     return s.Payout == "Cross above";
                    // }
                    // if (vm.filter.payoutstrategy === "Cross below") {
                    //     return s.Payout == "Cross below";
                    // }
                    // if (vm.filter.payoutstrategy === "Above") {
                    //     return s.Payout == "Above";
                    // }
                    // if (vm.filter.payoutstrategy === "Below") {
                    //     return s.Payout === "Below";
                    // }                    
                    return true;
                });
            } else if (vm.mode === 'Swing') {
                vm.filteredStocksForSwing = allStocksForSwing;
                vm.uniqueFilteredProductCount = _.unique(_.map(vm.filteredStocksForSwing, function (p) { return p.ProductId; })).length;
            } else if (vm.mode === 'Plus') {
                // vm.filteredStockPaladinEntry = 
            }
        }

        function getTidyUpTgpsList(list) {
            list.forEach(function (stock) {
                stock.ProductModel = stock.Product;
                delete stock.Product;
            });
            return list.filter(function (stock) {
                return stock.ProductModel;
            });
        }

        function extractStockAndCountPromise(res) {
            return {
                list: getTidyUpTgpsList(res.data.Triggers),
                count: res.data.TotalNumberWithoutFilter,
                message: res.data.Message,
                lastAvailableDate: res.data.LastAvailableDate
            };
        }

        function getLastAvailableDate(lastAvailableDate) {
            var date = [];
            for (var prop in lastAvailableDate) {
                var propDate = moment(lastAvailableDate[prop]).startOf('day').toDate();
                date.push({
                    Market: prop,
                    Date: propDate
                });
            }
            return date;
        }

        function getSelectedMarketFundamentalFilterObject(fundamentalFilterArray){
            return fundamentalFilterArray.filter(function (itemObj, itemKey) {
                return itemObj.TradeVenue === vm.filter.tradeVenueLoc.label;
            });
        }

        var previousLoadPositionPromise = null;
        function loadPositionStockList(fundamentalParamsList) {
            if (previousLoadPositionPromise !== null && previousLoadPositionPromise.cancel) {
                previousLoadPositionPromise.cancel();
            }

            var promise = null;
            var dateFromCalendar = vm.filter.dateFromCalendar;
            if (vm.filter.tradeVenueLoc) {
                dateFromCalendar = commonTimeZoneService.getDateWithZoneChanges(vm.filter.dateFromCalendar, vm.filter.tradeVenueLoc.label, function (x) { return x.startOf('day'); });
            }
            var date = vm.filter.dateSelectionMode === 1 ? dateFromCalendar : vm.lastEndTradingDate;
            if (isWorldIndices()) {
                // MaRa: Enable after migration
                var reqParam = {
                    TriggerDate: date,
                    GetByLastTradingDate: vm.filter.dateSelectionMode === 0,
                    BarSize: vm.filter.barSize.value
                };

                var p = sTgpsService.getTradersGPSPositionIndexScreenerNew(reqParam);

                //var reqParam = {
                //    Date: date,
                //    GetByLastTradingDate: vm.filter.dateSelectionMode === 0
                //}

                //var p = sTgpsService.getTriggersOnIndicesByDate(reqParam);

                previousLoadPositionPromise = p;
                promise = p.then(extractStockAndCountPromise);
            } else {
                var request = {
                    Date: date,
                    FundamentalFilter: fundamentalParamsList,
                    WatchlistId: vm.filter.watchlist ? vm.filter.watchlist.WatchlistId : 0,
                    GetByLastTradingDate: vm.filter.dateSelectionMode === 0
                }
                if (coreUserStateService.hasTradersGPSPlus() && vm.mode === 'Plus') {
                    p = tool.onceAll([
                        sTgpsService.getTriggersByDate(request),
                        sTgpsService.getPaladinSignal(vm.paladinHorizon, vm.filterStrength, date),                        
                    ]);
                    previousLoadPositionPromise = p;
                    promise = p.then(function(res) {
                        var triggers = res[0];
                        var paladinTradePlan = res[1].data.Entry;
                        var paladinTradeProductIds = _.map(paladinTradePlan,function(plan) { return plan.Product.ProductId });

                        triggers.data.Triggers.forEach(function(t) {
                            t.PaladinConfirm = _.includes(paladinTradeProductIds, t.ProductId);
                        });                        
                        return triggers;
                    }).then(extractStockAndCountPromise);
                } else {
                    if (vm.filter.watchlist) {
                        var request1 = {
                            WatchlistId: vm.filter.watchlist.WatchlistId,
                            BarSize: vm.filter.barSize.value,
                            GetByLastTradingDate: vm.filter.dateSelectionMode === 0,
                            TriggerDate: date,
                            UseFundamentalFilter: sTgpsScreenerService.fundamentalFilterNumber > 0,
                            FundamentalFilters: fundamentalParamsList
                        };
                        p = sTgpsService.getTradersGPSWatchlistPositionScreenerNew(request1);
                    } else {
                        var request2 = {
                            TradeVenue: vm.filter.tradeVenueLoc.label,
                            BarSize: vm.filter.barSize.value,
                            GetByLastTradingDate: vm.filter.dateSelectionMode === 0,
                            TriggerDate: date,
                            UseFundamentalFilter: sTgpsScreenerService.fundamentalFilterNumber > 0,
                            FundamentalFilter: getSelectedMarketFundamentalFilterObject(fundamentalParamsList)[0]
                        };
                        p = sTgpsService.getTradersGPSPositionScreenerNew(request2);
                    }
                    previousLoadPositionPromise = p;
                    promise = p.then(extractStockAndCountPromise);
                }
            }

            vm.totalNumberOfStocksForPositionWithoutFilter = null;
            return promise.then(function (res) {
                allStocksForPosition = res.list;
                vm.totalNumberOfStocksForPositionWithoutFilter = res.count;
                vm.noResultMessage = res.message;
                vm.lastAvailableDate = getLastAvailableDate(res.lastAvailableDate);
            });
        }

        var previousLoadSwingPromise = null;
        function loadSwingStockList(fundamentalParamsList) {
            if (previousLoadSwingPromise !== null) {
                previousLoadSwingPromise.cancel();
            }

            var promise;
            var fromDate = vm.filter.fromDateFromCalendar;
            var toDate = vm.filter.toDateFromCalendar;
            if (vm.filter.dateSelectionMode === 0) {
                toDate = vm.lastEndTradingDate;
                fromDate = moment(toDate).subtract(1, 'day').toDate();
            } else if (vm.filter.tradeVenueLoc) {
                fromDate = commonTimeZoneService.getDateWithZoneChanges(fromDate, vm.filter.tradeVenueLoc.label, function (x) { return x.startOf('day'); });
                toDate = commonTimeZoneService.getDateWithZoneChanges(toDate, vm.filter.tradeVenueLoc.label, function (x) { return x.endOf('day'); });
            }

            if (isWorldIndices()) {
                var reqParam = {
                    FromDate: fromDate,
                    ToDate: toDate,
                    GetByLastTradingDate: vm.filter.dateSelectionMode === 0,
                    BarSize: vm.filter.barSize.value
                }

                // MaRa: Enable after migration
                var p = sTgpsService.getTradersGPSSwingIndexScreenerNew(reqParam);
                //var p = sTgpsService.getSwingTriggersOnIndicesByDateRange(reqParam);

                previousLoadSwingPromise = p;
                promise = p.then(extractStockAndCountPromise);
            } else {
                if (vm.filter.watchlist) {
                    var request1 = {
                        WatchlistId: vm.filter.watchlist.WatchlistId,
                        BarSize: vm.filter.barSize.value,
                        GetByLastTradingDate: vm.filter.dateSelectionMode === 0,
                        FromDate: fromDate,
                        ToDate: toDate,
                        UseFundamentalFilter: sTgpsScreenerService.fundamentalFilterNumber > 0,
                        FundamentalFilters: fundamentalParamsList
                    };
                    p = sTgpsService.getTradersGPSWatchlistSwingScreenerNew(request1);
                } else {
                    var request2 = {
                        TradeVenue: vm.filter.tradeVenueLoc.label,
                        BarSize: vm.filter.barSize.value,
                        GetByLastTradingDate: vm.filter.dateSelectionMode === 0,
                        FromDate: fromDate,
                        ToDate: toDate,
                        UseFundamentalFilter: sTgpsScreenerService.fundamentalFilterNumber > 0,
                        FundamentalFilter: getSelectedMarketFundamentalFilterObject(fundamentalParamsList)[0]
                    };
                    p = sTgpsService.getTradersGPSSwingScreenerNew(request2);
                }
                previousLoadSwingPromise = p;
                promise = p.then(extractStockAndCountPromise);
            }

            vm.totalNumberOfStocksForSwingWithoutFilter = null;
            return promise.then(function (res) {
                allStocksForSwing = res.list;
                vm.totalNumberOfStocksForSwingWithoutFilter = res.count;
                vm.noResultMessage = res.message;
                vm.lastAvailableDate = getLastAvailableDate(res.lastAvailableDate);
            });
        }

        function loadPaladinStockList() {
            var date = vm.filter.dateSelectionMode === 1 ? vm.filter.dateFromCalendar : vm.lastEndTradingDate;

            var paladinEntryPromise = sTgpsService.getPaladinSignal(vm.paladinHorizon, vm.filterStrength, date)
                .then(function (res) {
                    var list = getTidyUpTgpsList(res.data.Entry);                    
                    
                    return {
                        list: list,
                        count: res.data.Entry.length,
                        message: 'No Paladin Signal found',
                        lastAvailableDate: { Singapore: date.toString() }
                    };
                });
            var paladinExitPromise = sTgpsService.getPaladinExitSignal(vm.paladinHorizon, vm.filterStrength, vm.lastEndTradingDate);
            var promise = tool.onceAll([
                paladinEntryPromise,
                paladinExitPromise,
                sTgpsService.getPaladinLastEvalDate()
            ]);

            vm.totalNumberOfStocksForPositionWithoutFilter = null;
            return promise.then(function (res) {
                vm.filteredStockPaladinEntry = _.filter(res[0].list, { Intention: 'Enter' });

                vm.totalNumberOfStocksForPositionWithoutFilter = res[0].count;
                vm.noResultMessage = res[0].message;
                vm.lastAvailableDate = getLastAvailableDate(res[0].lastAvailableDate);
                var lastEvalDate = res[2];
                vm.lastPaladinEvaluationDate = new Date(lastEvalDate.data);
                vm.filteredStockPaladinExit = res[1];
                var randomList = ['Basic', 'Standard', 'Strict'];
                for (var i = 0; i < vm.filteredStockPaladinExit.length; i++) {
                    var item = vm.filteredStockPaladinExit[i];
                    item.EntryCriteria = randomList[Math.floor(Math.random() * 3)];
                };
            });
        }

        function loadStockList() {
            vm.isLoading = true;
            vm.filter.searchProductFilter = null;

            var fundamentalParamsList = [];
            for (var key in vm.filter.fundamentals) {
                var hasFundamental = sMarketEntitlementService.tradeVenuesDict[key];
                if (hasFundamental) {
                    var res = sDatamartItemService.evaluateFundamentalAndReturnMergedObjects(vm.filter.fundamentals[key]);
                    res.TradeVenue = sMarketEntitlementService.tradeVenuesDict[key].TradeVenue;
                    //if (vm.filter.watchlist || (vm.filter.tradeVenueLoc && vm.filter.tradeVenueLoc.label === key)) {
                        fundamentalParamsList.push(res);
                    //}
                }
            }
            sTgpsScreenerService.fundamentalFilterNumber = calculateFundamentalFilterNumber(fundamentalParamsList);

            var promise = null;
            if (vm.mode === 'Position') {
                vm.filteredStocksForPosition = [];
                promise = loadPositionStockList(fundamentalParamsList);
            } else if (vm.mode === 'Swing') {
                vm.filteredStocksForSwing = [];
                promise = loadSwingStockList(fundamentalParamsList);
            } else if (vm.mode === 'Plus') {
                promise = loadPaladinStockList(fundamentalParamsList);
            }
            if (promise) {
                return promise.then(function () {                    
                    onFrontEndFilterChanged();
                }).finally(function () {
                    vm.isLoading = false;
                });
            } else {
                vm.isLoading = false;
                return tool.reject();
            }
        }

        function addToPriceAlert(item) {
            if (!item.PriceAlerts) {
                item.PriceAlerts = [];
            }
            item.ProductModel.initialAlertPrice = item.Direction !== 0 ? item.TriggerPrice : null;
            tool.openModalByDefinition('s.watchlist.PriceAlertPopupController', {
                product: item,
                alerts: item.PriceAlerts,
                isEdit: false
            });
        }

        var externalVm = {
            isNotRealTimeIndices: function (productContainer) {
                if (!productContainer || !productContainer.ProductModel) {
                    return false;
                }
                if (productContainer.ProductModel.AssetType !== 'Indices') {
                    return false;
                }
                return sMarketEntitlementService.getLatencyStatusOfIndices(productContainer.ProductModel.Symbol) != "RealTime";
            },
            canAddToWatchlist: pChartService.canAddToWatchlist,
            addToPriceAlert: addToPriceAlert,
            addToWatchlist: sMenuRightClickService.addToWatchlist,
            gotoChart: function (productContainer) {
                return sMenuRightClickService.gotoChart(productContainer.ProductModel, vm.mode, vm.filter.barSize.label);
            },
            getIndicatorColor: function (productContainer) {
                //console.log("productContainer: ", productContainer);
                switch (productContainer.Direction) {
                    case "Bull":
                        return ['green-profit'];
                    case "Bear":
                        return ['red-loss'];
                }
            },
            indicatorDirection: function (productContainer) {
                if (productContainer.LOC > 0) {
                    return "UP";
                }
                if (productContainer.LOC < 0) {
                    return "DOWN";
                }
                return "";
            },
            showDirection: function (productContainer) {
                switch (productContainer.Direction) {
                    case "Bull":
                        return "Bullish";
                    case "Bear":
                        return "Bearish";
                }
                return "None";
            },
            showTIF: function (productContainer) {
                if (productContainer.TIF > 0) {
                    return "YES";
                } else if (productContainer.TIF <= 0) {
                    return "NO";
                }
                return "";
            },
            getComCrossover: function (productContainer) {
                if (productContainer.COMDiff > 0) {
                    return "UP";
                } else if (productContainer.COMDiff < 0) {
                    return "DOWN";
                }
                return "NONE";
            }
        };

        function setDateSelectionOpen() {
            vm.filter.dateSelectionMode = 1;
            vm.dateOpened = true;
        }

        function onDatePickerChanges() {
            if (vm.filter.dateSelectionMode === 1) {
                updateDateSelections();
            }
        }
       
        function resetAllFundamentals() {
            sMarketEntitlementService.tradeVenues.forEach(function (tv) {
                resetFundamentalFilter(tv.TradeVenue);
            });
        }

        function countFilterLevel(fundamental) {
            function isCheckedAllChecked(itemList) {
                var isAny = _.any(itemList, function (item) {
                    return !item.checked;
                });
                return isAny ? 1 : 0;
            }

            var count = isCheckedAllChecked(fundamental.earningGrowths)
                + isCheckedAllChecked(fundamental.marketCaps)
                + isCheckedAllChecked(fundamental.peRatios)
                + isCheckedAllChecked(fundamental.priceRanges)
                + isCheckedAllChecked(fundamental.volumeConditions);

            return count;
        }

        function updateSelection(param) {
            if (param.type === 'TradeVenue') {
                vm.filter.watchlist = null;
                vm.filter.tradeVenueLoc = param.value;
            } else if (param.type === 'Watchlist') {
                vm.filter.watchlist = param.value;
                vm.filter.tradeVenueLoc = null;
            }
            updateDateSelections(param.value);
        }

        function updateDateSelections() {
            if (!hasFundamentalFilterSelections()) {
                resetAllFundamentals();
            } else {
                var serializedContent = coreDataStorageService.get("fundamental-filter");
                if (serializedContent) {                    
                    var obj = angular.fromJson(serializedContent);
                    angular.merge(vm.filter.fundamentals, obj);
                } else {
                    resetAllFundamentals();
                }
            }

            //disable right click menu for Global Indices & non realtime market
            if (isWorldIndices()) {
                vm.productListOptionForPosition.menuList = {};
                vm.productListOptionForWeeklyPosition.menuList = {};
                vm.productListOptionForSwing.menuList = {};
            } else {
                if (vm.filter.tradeVenueLoc && (vm.filter.tradeVenueLoc.label === 'US' || vm.filter.tradeVenueLoc.label === 'SG')) {
                    vm.productListOptionForPosition.menuList = sMenuRightClickService.menuListProviderForTGPSPosition;
                    vm.productListOptionForWeeklyPosition.menuList = sMenuRightClickService.menuListProviderForTGPSPosition;
                    vm.productListOptionForSwing.menuList = sMenuRightClickService.menuListProviderForTGPSSwing;
                } else {
                    vm.productListOptionForPosition.menuList = {};
                    vm.productListOptionForWeeklyPosition.menuList = {};
                    vm.productListOptionForSwing.menuList = {};
                }
            }

            var promise = tool.when();
            if (vm.filter.tradeVenueLoc) {
                if (vm.filter.dateSelectionMode === 0) {
                    var tradeVenueString = null;
                    switch (vm.filter.tradeVenueLoc.label) {
                        case "SG":
                            tradeVenueString = "Singapore";
                            break;
                        case "HK":
                            tradeVenueString = "Hongkong";
                            break;
                        case "MY":
                            tradeVenueString = "Malaysia";
                            break;
                        case "CHN":
                            tradeVenueString = "China";
                            break;
                        case "US":
                        case "Global Indices":
                            tradeVenueString = "UnitedStates";
                            break;
                    }

                    promise = getLatestEndTradingDate(tradeVenueString).then(function (date) {
                        if (date) {
                            vm.lastEndTradingDate = new Date(date.substring(0, date.indexOf("T")));

                            if (vm.mode === 'Swing') {
                                vm.filter.toDateFromCalendar = vm.lastEndTradingDate;
                                var previousDate = vm.filter.toDateFromCalendar.getDate() - 1;
                                if (vm.filter.fromDateFromCalendar && vm.filter.fromDateFromCalendar.setDate) {
                                    vm.filter.fromDateFromCalendar = vm.filter.fromDateFromCalendar.setDate(previousDate);
                                }
                            } else {
                                vm.filter.dateFromCalendar = vm.lastEndTradingDate;
                            }
                        }
                    });
                }
            } else if (vm.filter.watchlist) {
                sTgpsService.getLatestMarketEndTimeForWatchlist(vm.filter.watchlist.WatchlistId).then(function (res) {
                    var laterDate = getLaterDate(res.data);
                    if (laterDate) {
                        vm.lastEndTradingDate = new Date(laterDate.substring(0, laterDate.indexOf("T")));
                        vm.filter.dateFromCalendar = vm.lastEndTradingDate;
                    }
                });
            } else {
                vm.lastEndTradingDate = new Date();
                vm.filter.dateFromCalendar = vm.lastEndTradingDate;
            }

            promise.finally(function () {
                loadStockList();
            });
        }

        function getLaterDate(dates) {
            var laterDate = null;
            for (prop in dates) {
                if (laterDate == null) {
                    laterDate = dates[prop];
                } else {
                    laterDate = Date.parse(dates[prop]) > Date.parse(laterDate) ? dates[prop] : laterDate;
                }
            }

            return laterDate;
        }

        function showProduct(item) {
        }

        function isMatchingNameOrSymbol(product, keyword) {
            var regex = new RegExp(keyword, "ig");
            return regex.test(product.ProductName) || regex.test(product.Symbol);
        }

        function searchProducts(keyword) {
            if (vm.filter.tradeVenueLoc && vm.filter.tradeVenueLoc.label !== "Global Indices") {                
                return sProductService.SearchProductByMarket(keyword, vm.filter.tradeVenueLoc.label, 10, false).then(function (res) {
                    return res.data;
                });
            } else {
                var list = [];
                if (vm.mode === 'Position') {
                    list = vm.filteredStocksForPosition;
                } else if (vm.mode === 'Swing') {
                    list = vm.filteredStocksForSwing;
                }
                return list.filter(function (productContainer) {
                    return isMatchingNameOrSymbol(productContainer.ProductModel, keyword);
                }).slice(0, 10).map(function (u) {
                    return u.ProductModel;
                });
            }
        }

        function getBullBearSortingValue(productContainer) {
            switch (productContainer.Direction) {
                case 'Bull':
                    return 1;
                case 'Bear':
                    return 0;
            }
            return -1;
        }

        function preprocessFilterListFunc(list) {
            return sTgpsScreenerService.preprocessFilterListFunc(vm.filter, list);
        }

        function disabled(param) {
            return (param.mode === 'day' && (param.date.getDay() === 0 || param.date.getDay() === 6));
        }

        function hasFundamentalFilterSelections() {
            return (vm.filter.tradeVenueLoc && vm.filter.tradeVenueLoc.label !== 'Global Indices') || vm.filter.watchlist;
        }

        function isWorldIndices() {
            return vm.filter.tradeVenueLoc && vm.filter.tradeVenueLoc.label === 'Global Indices';
        }
        
        function isUSMarket() {
            return vm.filter.tradeVenueLoc && vm.filter.tradeVenueLoc.label !== 'SG' && vm.filter.tradeVenueLoc.label !== 'HK' && vm.filter.tradeVenueLoc.label !== 'MY' && vm.filter.tradeVenueLoc.label !== 'CHN';
        }
        
        function isNotMYMarket() {
            return vm.filter.tradeVenueLoc && vm.filter.tradeVenueLoc.label === 'SG' || vm.filter.tradeVenueLoc.label === 'HK' || vm.filter.tradeVenueLoc.label === 'US' || vm.filter.tradeVenueLoc.label === 'CHN';
        }

        function isVisible(checked) {
            return false;
        }

        function isNotWorldIndices() {
            return !isWorldIndices();
        }

        function resetFundamentalFilter(market) {            
            if (_.contains(sMarketEntitlementService.tradeVenuesThatHasFundamentals, market)) {
                vm.filter.fundamentals[market] = pDatamartStatesService.getDefaultFundamentalWithVolumeSelections(market);
            } else {
                vm.filter.fundamentals[market] = pDatamartStatesService.getPriceAndVolumeFilterContent(market);
            }
        }

        function showLastPriceCol() {
            return isNotWorldIndices() && (vm.filter && vm.filter.tradeVenueLoc && vm.filter.tradeVenueLoc.label !== "HK" && vm.filter.tradeVenueLoc.label !== "MY");
        }

        function createSortingFunc(field) {
            return function(a, b) {
                if (!b[field] && a[field]) {
                    return 1;
                }
                if (b[field] && !a[field]) {
                    return -1;
                }
                if (!b[field] && !a[field]) {
                    return 0;
                }
                return a[field] - b[field];
            };
        } 

        var lastPriceColumnDef = {
            templateId: 'bigscreener/tgps.lastTradedPrice',
            classNames: ['last-traded-price', 'mid-column'],
            title: "LAST",
            sortingFunc: function (a, b) {
                if ((!b.MarketData || b.MarketData.LastTradedPrice == null) && (!a.MarketData || a.MarketData.LastTradedPrice == null)) {
                    return 0;
                }
                if (!b.MarketData || b.MarketData.LastTradedPrice == null) {
                    return 1;
                }
                if (!a.MarketData || a.MarketData.LastTradedPrice == null) {
                    return -1;
                }
                return (a.MarketData.LastTradedPrice - b.MarketData.LastTradedPrice);
            },
            visibility: showLastPriceCol
        };
        var lastPriceColumnNoCurrencyDef = {
            templateId: 'bigscreener/tgps.lastTradedPrice_NoCurr',
            classNames: ['last-traded-price', 'mid-column'],
            title: "LAST",
            sortingFunc: function (a, b) {
                if ((!b.MarketData || b.MarketData.LastTradedPrice == null) && (!a.MarketData || a.MarketData.LastTradedPrice == null)) {
                    return 0;
                }
                if (!b.MarketData || b.MarketData.LastTradedPrice == null) {
                    return 1;
                }
                if (!a.MarketData || a.MarketData.LastTradedPrice == null) {
                    return -1;
                }
                return (a.MarketData.LastTradedPrice - b.MarketData.LastTradedPrice);
            },
            visibility: isWorldIndices
        };

        var closePriceColumnDef = {
            templateId: 'bigscreener/tgps.Close',
            title: "CLOSE",
            classNames: 'mid-column',
            sortingFunc: createSortingFunc('Close'),
            visibility: isNotWorldIndices,
            sortingDirection: -1
        };
        var closePriceColumnNoCurrencyDef = {
            templateId: 'bigscreener/tgps.Close_NoCurr',
            title: "CLOSE",
            classNames: 'mid-column',
            sortingFunc: createSortingFunc('Close'),
            visibility: isWorldIndices,
            sortingDirection: -1
        };

        var volumeColumnDef = {
            templateId: 'bigscreener/tgps.Volume',
            title: "VOLUME",
            classNames: 'mid-column',
            sortingFunc: createSortingFunc('Volume'),
            visibility: isNotWorldIndices,
            sortingDirection: -1
        };
        var triggerPriceColumnDef = {
            templateId: 'bigscreener/tgps.TriggerPrice',
            title: "TRIGGER PRICE",
            classNames: 'mid-column',
            sortingFunc: function(a, b) {
                var x = a.TriggerPrice || -1;
                var y = b.TriggerPrice || -1;
                return x - y;
            },
            visibility: isNotWorldIndices,
            sortingDirection: -1
        };
        var directionColumnDef = {
            templateId: 'bigscreener/tgps.Direction',
            title: "SIGNAL",
            classNames: 'mid-column direction',
            sortingFunc: function(a, b) {
                var x = getBullBearSortingValue(a);
                var y = getBullBearSortingValue(b);
                return x - y;
            },
            sortingDirection: -1
        };

        var productListOptionForSwing = {
            visibility: {
                hasNominalPriceChanges: false,
                hasPagination: true,
                showHeader: true,
            },
            forceSorting: true,
            columns: [
                sProductDefaultColumnService.defaultColumns.productName,
                sProductDefaultColumnService.defaultColumns.productSymbol,
                {
                    templateId: 'bigscreener/tgps.LastSignal',
                    title: "LAST SIGNAL",
                    classNames: 'mid-column',
                    sortingFunc: function(a, b) {
                        if (a.Kind && b.Kind) {
                            var valA = sTgpsScreenerService.valueFromLastSignal(a.Kind);
                            var valB = sTgpsScreenerService.valueFromLastSignal(b.Kind);
                            return valA - valB;
                        }
                        return 0;
                    }
                },
                {
                    templateId: 'bigscreener/tgps.LastSignalDate',
                    title: "LAST SIGNAL DATE",
                    classNames: 'mid-column',

                    sortingFunc: function(a, b) {
                        if (a.LastSignalDate && b.LastSignalDate) {
                            var dateA = new Date(a.LastSignalDate);
                            var dateB = new Date(b.LastSignalDate);
                            return dateA.getTime() - dateB.getTime();
                        }
                        return 0;
                    },
                    defaultSorting: -1
                },
                //{
                //    templateId: 'bigscreener/tgps.NumSignals',
                //    title: "#SIGNAL",
                //    classNames: 'mid-column',
                //    sortingFunc: createSortingFunc('NumSignals')
                //},
                closePriceColumnDef,
                closePriceColumnNoCurrencyDef,
                //lastPriceColumnDef,
                //lastPriceColumnNoCurrencyDef,
                {
                    templateId: 'bigscreener/tgps.Volume',
                    title: "VOLUME",
                    classNames: 'mid-column',
                    sortingFunc: createSortingFunc('Volume'),
                    visibility: isNotWorldIndices
                },
                {
                    templateId: 'bigscreener/tgps',
                    classNames: ['screener-column'],
                    title: ""
                }
            ],
            externalVm: externalVm,
            preprocessFilterListFunc: preprocessFilterListFunc,
            menuList: sMenuRightClickService.menuListProviderForTGPSSwing
        };
        var productListOptionForPosition = {
            visibility: {
                hasNominalPriceChanges: false,
                hasPagination: true,
                showHeader: true,
            },
            forceSorting: true,
            columns: [
                sProductDefaultColumnService.defaultColumns.productName,
                sProductDefaultColumnService.defaultColumns.productSymbol,
                {
                    templateId: 'bigscreener/tgps.Week',
                    title: "WEEK",
                    classNames: 'mid-column',
                    sortingFunc: createSortingFunc('Week'),
                    defaultSorting: -1,
                    sortingDirection: -1
                },
                {
                    templateId: 'bigscreener/tgps.Month',
                    title: "MONTH",
                    classNames: 'mid-column',
                    sortingFunc: createSortingFunc('Month'),
                    sortingDirection: -1
                },
                // {
                //     templateId: 'bigscreener/tgps.payoutAlertMA150',
                //     title: "Payout Alert MA 150",
                //     classNames: 'mid-column product-payout-alert-MA150',
                //     sortingFunc: function (a, b) {
                //         if (a.Payout && b.Payout) {
                //             return coreUtil.sortName(a.Payout, b.Payout);
                //         }
                //         return 0;
                //     },
                //     sortingDirection: -1
                // },
                {
                    templateId: 'bigscreener/tgps.TID',
                    title: "TID",
                    classNames: 'mid-column product-TID',
                    sortingFunc: function (a, b) {
                        if (a.TID && b.TID) {
                            return coreUtil.sortName(a.TID, b.TID);
                        }
                        return 0;
                    },
                    sortingDirection: -1
                },
                {
                    templateId: 'bigscreener/tgps.noise',
                    title: "Noise",
                    classNames: 'mid-column',
                    sortingFunc: createSortingFunc('Noise'),
                    sortingDirection: -1
                },
                {
                    templateId: 'bigscreener/tgps.marketCap',
                    title: "Market Cap",
                    classNames: 'mid-column',
                    sortingFunc: createSortingFunc('MarketCap'),
                    visibility: isNotMYMarket,
                    sortingDirection: -1
                },
                {
                    templateId: 'bigscreener/tgps.sector',
                    title: "Sector",
                    classNames: 'mid-column product-sector',
                    sortingFunc: function (a, b) {
                        if (a.ProductModel && b.ProductModel) {
                            return coreUtil.sortName(a.ProductModel.Sector.SectorName, b.ProductModel.Sector.SectorName);
                        }
                        return 0;
                    },
                    sortingDirection: -1
                },
                {
                    templateId: 'bigscreener/tgps.industry',
                    title: "Industry",
                    classNames: 'mid-column product-industry',
                    sortingFunc: function (a, b) {
                        if (a.ProductModel && b.ProductModel) {
                            return coreUtil.sortName(a.ProductModel.Industry.IndustryName, b.ProductModel.Industry.IndustryName);
                        }
                        return 0;
                    },
                    sortingDirection: -1
                },
                {
                    templateId: 'bigscreener/tgps.turnover',
                    title: "Turnover",
                    classNames: 'mid-column product-turnover',
                    sortingFunc: createSortingFunc('Turnover'),
                    sortingDirection: -1
                },
                {
                    templateId: 'bigscreener/tgps.analystRating',
                    title: "Analyst rating",
                    classNames: 'mid-column product-analyst-rating',
                    visibility: isUSMarket,
                    sortingFunc: createSortingFunc('Rating'),
                    sortingDirection: -1
                },
                // {
                //     templateId: 'bigscreener/tgps.Quarter',
                //     title: "QUARTER",
                //     classNames: 'mid-column',
                //     sortingFunc: createSortingFunc('Quarter')
                // },
                closePriceColumnDef,
                //closePriceColumnNoCurrencyDef,
                //lastPriceColumnDef,
                //lastPriceColumnNoCurrencyDef,
                volumeColumnDef,
                {
                    templateId: 'bigscreener/tgps.Date',
                    title: "DATE",
                    classNames: 'mid-column',
                    sortingFunc: function(a, b) {
                        if (a.Timestamp && b.Timestamp) {
                            var dateA = new Date(a.Timestamp);
                            var dateB = new Date(b.Timestamp);
                            return dateA.getTime() - dateB.getTime();
                        }
                        return 0;
                    },
                    visibility: isWorldIndices,
                    sortingDirection: -1
                },
                triggerPriceColumnDef,
                {
                    templateId: 'bigscreener/tgps.TriggerValue',
                    title: "TRIGGER VALUE",
                    classNames: 'mid-column',
                    sortingFunc: function(a, b) {
                        var x = a.TriggerPrice || -1;
                        var y = b.TriggerPrice || -1;
                        return x - y;
                    },
                    visibility: isWorldIndices,
                    sortingDirection: -1
                },
                directionColumnDef,
                {
                    templateId: 'bigscreener/tgps.NumTriggers',
                    title: "# ARROWS",
                    classNames: 'mid-column',
                    sortingFunc: createSortingFunc('NumTriggers'),
                    sortingDirection: -1
                },
                {
                    templateId: 'bigscreener/tgps.TIF',
                    title: "TIF",
                    classNames: 'mid-column',
                    sortingFunc: createSortingFunc('TIF'),
                    sortingDirection: -1
                },
                {
                    templateId: 'bigscreener/tgps.ComCrossover',
                    title: "COM Crossover",
                    classNames: 'mid-column product-comCrossover',
                    sortingFunc: createSortingFunc('COMDiff'),
                    sortingDirection: -1
                },
                {
                    templateId: 'bigscreener/tgps',
                    classNames: ['screener-column'],
                    title: ""
                }
            ],
            externalVm: externalVm,
            preprocessFilterListFunc: preprocessFilterListFunc,
            menuList: sMenuRightClickService.menuListProviderForTGPSPosition
        };
        var productListOptionForWeeklyPosition = {
            visibility: {
                hasNominalPriceChanges: false,
                hasPagination: true,
                showHeader: true,
            },
            forceSorting: true,
            columns: [
                sProductDefaultColumnService.defaultColumns.productName,
                sProductDefaultColumnService.defaultColumns.productSymbol,
                {
                    templateId: 'bigscreener/tgps.Month',
                    title: "MONTH",
                    classNames: 'mid-column',
                    sortingFunc: createSortingFunc('Month')
                },
                // {
                //     templateId: 'bigscreener/tgps.Quarter',
                //     title: "QUARTER",
                //     classNames: 'mid-column',
                //     sortingFunc: createSortingFunc('Quarter')
                // },
                closePriceColumnDef,
                closePriceColumnNoCurrencyDef,
                //lastPriceColumnDef,
                //lastPriceColumnNoCurrencyDef,
                volumeColumnDef,
                {
                    templateId: 'bigscreener/tgps.Date',
                    title: "DATE",
                    classNames: 'mid-column',
                    sortingFunc: function (a, b) {
                        if (a.Timestamp && b.Timestamp) {
                            var dateA = new Date(a.Timestamp);
                            var dateB = new Date(b.Timestamp);
                            return dateA.getTime() - dateB.getTime();
                        }
                        return 0;
                    },
                    visibility: isWorldIndices
                },
                triggerPriceColumnDef,
                {
                    templateId: 'bigscreener/tgps.TriggerValue',
                    title: "TRIGGER VALUE",
                    classNames: 'mid-column',
                    sortingFunc: function (a, b) {
                        var x = a.TriggerPrice || -1;
                        var y = b.TriggerPrice || -1;
                        return x - y;
                    },
                    visibility: isWorldIndices
                },
                directionColumnDef,
                {
                    templateId: 'bigscreener/tgps.NumTriggers',
                    title: "# ARROWS",
                    classNames: 'mid-column',
                    sortingFunc: createSortingFunc('NumTriggers')
                },
                {
                    templateId: 'bigscreener/tgps.TIF',
                    title: "TIF",
                    classNames: 'mid-column',
                    sortingFunc: createSortingFunc('TIF')
                },
                {
                    templateId: 'bigscreener/tgps.ComCrossover',
                    title: "COM Crossover",
                    classNames: 'mid-column',
                    sortingFunc: createSortingFunc('COMDiff')
                },
                {
                    templateId: 'bigscreener/tgps',
                    classNames: ['screener-column'],
                    title: ""
                }
            ],
            externalVm: externalVm,
            preprocessFilterListFunc: preprocessFilterListFunc,
            menuList: sMenuRightClickService.menuListProviderForTGPSPosition
        };
        var productListOptionForPaladinEntry = {
            visibility: {
                hasNominalPriceChanges: false,
                hasPagination: true,
                showHeader: true,
            },
            forceSorting: true,
            columns: [
                sProductDefaultColumnService.defaultColumns.productName,
                sProductDefaultColumnService.defaultColumns.productSymbol,
                //lastPriceColumnDef,
                volumeColumnDef,
                {
                    templateId: 'bigscreener/tgps.StopPrice',
                    title: "TRIGGER PRICE",
                    classNames: 'mid-column target-price',
                    sortingFunc: createSortingFunc('StopPrice')
                },
                {
                    templateId: 'bigscreener/tgps.SIF',
                    title: "SIF",
                    classNames: 'mid-column',
                    sortingFunc: createSortingFunc('SIF')
                },
                {
                    templateId: 'bigscreener/tgps.Odd',
                    title: "ODDS",
                    classNames: 'mid-column',
                    sortingFunc: createSortingFunc('Odds')
                },
                directionColumnDef,
                {
                    templateId: 'bigscreener/tgps',
                    classNames: ['screener-column'],
                    title: ""
                }
            ],
            externalVm: externalVm,
            preprocessFilterListFunc: preprocessFilterListFunc,
            menuList: sMenuRightClickService.menuListProviderForTGPSPosition
        };
        var productListOptionForPaladinExit = {
            visibility: {
                hasNominalPriceChanges: false,
                hasPagination: true,
                showHeader: true,
            },
            forceSorting: true,
            columns: [
                sProductDefaultColumnService.defaultColumns.productName,
                sProductDefaultColumnService.defaultColumns.productSymbol,
                //{
                //    templateId: 'bigscreener/tgps.EntryCriteria',
                //    title: "ENTRY CRITERIA",
                //    classNames: 'mid-column',
                //    sortingFunc: createSortingFunc('EntryCriteria')
                //},
                {
                    templateId: 'bigscreener/tgps.PositionDirection',
                    title: "DIRECTION",
                    classNames: 'mid-column',
                    sortingFunc: function (x, y) {
                        return x.PositionType.localeCompare(y.PositionType);
                    }
                },
                {
                    templateId: 'bigscreener/tgps.ToExit',
                    title: "TO EXIT",
                    classNames: 'mid-column',
                    sortingFunc: function (x, y) {
                        return x.ToExit - y.ToExit;
                    }
                },
                {
                    templateId: 'bigscreener/tgps.StopPrice',
                    title: "TARGET PRICE",
                    classNames: 'mid-column target-price',
                    sortingFunc: createSortingFunc('StopPrice')
                },
                {
                    templateId: 'bigscreener/tgps.HoldingDuration',
                    title: "HOLDING DURATION",
                    classNames: 'mid-column',
                    sortingFunc: createSortingFunc('EntryTime')
                },
                {
                    templateId: 'bigscreener/tgps.Remark',
                    title: "REMARK",
                    classNames: 'remark'
                },
                {
                    templateId: 'bigscreener/tgps',
                    classNames: ['screener-column'],
                    title: ""
                }
            ],
            externalVm: externalVm,
            preprocessFilterListFunc: preprocessFilterListFunc,
            menuList: sMenuRightClickService.menuListProviderForTGPSPosition
        };

        function getAvailableTradeVenueCodeList() {
            var restrictedTradeVenues = null;
            if (vm.filter.watchlist) {
                restrictedTradeVenues = null;
            } else if (vm.filter.tradeVenueLoc) {
                restrictedTradeVenues = [vm.filter.tradeVenueLoc.label];
            }
            return restrictedTradeVenues;
        }

        async function setSectorIndustryFilterData(){            
            for (var key in vm.filter.fundamentals) {
                var TradeVenue = key;
                var sectorData = [];
                await pProductPageService.getSector(TradeVenue).then(async function () {
                    var sector = pProductPageService.sector;
                    await sector.Data.map(function (itemObj, itemKey){
                        sectorData.push({ name: itemObj.SectorName, checked: true })
                    });                    
                    coreDataStorageService.set("fundamental-filter-sector_"+[key], angular.toJson(sectorData));
                });

                var industryData = [];
                await pProductPageService.getIndustry(TradeVenue).then(async function () {
                    var industry = pProductPageService.industry;
                    await industry.Data.map(function (itemObj, itemKey){
                        industryData.push({ name: itemObj.IndustryName, checked: true })
                    });                    
                    coreDataStorageService.set("fundamental-filter-industry_"+[key], angular.toJson(industryData));
                });
            }
        }

        function showFundamentalFilter() {
            var restrictedTradeVenues = getAvailableTradeVenueCodeList();
            tool.openModalByDefinition('s.tgps.FundamentalFilterController', {
                fundamentals: vm.filter.fundamentals,
                restrictedTradeVenues: restrictedTradeVenues
            }).result.then(function (fundamentals) {
                coreDataStorageService.set("fundamental-filter", angular.toJson(fundamentals));
                angular.merge(vm.filter.fundamentals, fundamentals);
                loadStockList();
            });
        }

        function showColumnsFilter() {
            if(vm.filter.barSize.label === "Daily"){
                var productListOptionForPositionClone = Object.assign({}, productListOptionForPosition);                
                productListOptionForPositionClone.columns.forEach(function (itemPosition, indexPosition) {
                    if(productListOptionForPositionClone.columns[indexPosition].checked === undefined){
                        productListOptionForPositionClone.columns[indexPosition].checked = true;
                    }
                });
    
                tool.openModalByDefinition('s.tgps.ColumnFilterController', {
                    productListOptionForPosition: productListOptionForPositionClone
                }).result.then(function (response) {
                    response.columns.forEach(function (itemResp, indexResp) {
                        if(productListOptionForPosition.columns[indexResp].checked !== undefined && !productListOptionForPosition.columns[indexResp].checked){
                            productListOptionForPosition.columns[indexResp].visibility = isVisible;
                        } else {
                            delete productListOptionForPosition.columns[indexResp].visibility;
                        }                    
                    });
                    loadStockList();
                });
            }
            if(vm.filter.barSize.label === "Weekly"){
                var productListOptionForWeeklyPositionClone = Object.assign({}, productListOptionForWeeklyPosition);
                productListOptionForWeeklyPositionClone.columns.forEach(function (itemPosition, indexPosition) {
                    if(productListOptionForWeeklyPositionClone.columns[indexPosition].checked === undefined){
                        productListOptionForWeeklyPositionClone.columns[indexPosition].checked = true;
                    }
                });

                tool.openModalByDefinition('s.tgps.ColumnFilterController', {
                    productListOptionForPosition: productListOptionForWeeklyPositionClone
                }).result.then(function (response) {
                    response.columns.forEach(function (itemResp, indexResp) {
                        if(productListOptionForWeeklyPosition.columns[indexResp].checked !== undefined && !productListOptionForWeeklyPosition.columns[indexResp].checked){
                            productListOptionForWeeklyPosition.columns[indexResp].visibility = isVisible;
                        } else {
                            delete productListOptionForWeeklyPosition.columns[indexResp].visibility;
                        }                    
                    });
                    loadStockList();
                });
            }            
        }

        function showLastAvailableDay() {
            return vm.filter.dateSelectionMode === 0 &&
                (vm.filter.watchlist != null || vm.filter.tradeVenueLoc.label !== 'Global Indices') &&
                !vm.isLoading && (vm.filteredStocksForPosition.length > 0 || vm.filteredStocksForSwing.length > 0);
        }

        tool.initialize(async function () {            
            tool.setVmProperties({
                name: "TradersGPS",
                isLoading: false,
                lastAvailableDate: null,
                lastPaladinEvaluationDate: null,
                noResultMessage: "",
                uniqueFilteredProductCount: 0,

                directions: ['All', 'Bullish', 'Bearish', 'None'],
                comCrossover: ['All', 'UP', 'DOWN', 'NONE'],
                payoutStrategy: ['All', 'Near (below)', 'Near (above)', 'Cross above', 'Cross below', 'Above', 'Below'],
                tid: [{name: 'None', value : 0},  {name: 'Very Weak Uptrend', value : 1}, {name: 'Weak Uptrend', value : 2}, {name: 'Uptrend', value : 3}, {name: 'Uptrend Reversal', value : 4}, {name: 'Very Weak Downtrend', value : -1},{name: 'Weak Downtrend', value : -2}, {name: 'Downtrend', value : -3}, {name: 'Downtrend Reversal', value : -4}],
                modeOptions: ["Position", "Swing"],
                barSizeOptions: [{ label: "Daily", value: "1 day" }, { label: "Weekly", value: "1 week" }],    
                tradeVenueLocList: [{
                        label: 'SG',
                        value: 2
                    },
                    {
                        label: 'US',
                        value: 1
                    },
                    {
                        label: 'HK',
                        value: 6
                    },
                    {
                        label: 'MY',
                        value: 8
                    },
                    {
                        label: 'CHN',
                        value: 7
                    }//,
                    //{
                    //    label: 'Global Indices',
                    //    value: 'Global Indices'
                    //}
                ],

                dateOptions: {
                    formatYear: 'yyyy',
                    startingDay: 1,
                    showWeeks: false,
                    dateDisabled: disabled,
                    maxDate: new Date(moment().endOf('day').format())
                },
                
                filteredStocksForPosition: [],
                filteredStocksForSwing: [],
                watchlists: [],

                // Plus Mode
                paladinMode: 'Entry',
                paladinHorizon: 'ShortTerm',
                filterStrength: 0, // Watch filter strength for filtering
                horizonOptions: [{ id: 'ShortTerm', label: 'Short-term' }, { id: 'MidTerm', label: 'Mid-term' }],
                filteredStockPaladinEntry: [],
                filteredStockPaladinExit: [],                

                sTgpsScreenerService: sTgpsScreenerService,

                showLastAvailableDay: showLastAvailableDay,
                showFundamentalFilter: showFundamentalFilter,
                showColumnsFilter: showColumnsFilter,
                showProduct: showProduct,
                hasFundamentalFilterSelections: hasFundamentalFilterSelections,

                updateSelection: updateSelection,
                searchProducts: searchProducts,
                setDateSelectionOpen: setDateSelectionOpen,
                updateTradeVenue: updateDateSelections,
                onBarSizeChanges: updateDateSelections,
                coreConfigService: coreConfigService,
                onFilterChanged: onFilterChanged,
                onVolumeFilterChanged: onVolumeFilterChanged,
                onFrontEndFilterChanged: onFrontEndFilterChanged,
                onDatePickerChanges: onDatePickerChanges,
               
                productListOptionForSwing: productListOptionForSwing,
                productListOptionForPosition: productListOptionForPosition,
                productListOptionForWeeklyPosition: productListOptionForWeeklyPosition,
                preprocessFilterListFunc: preprocessFilterListFunc,

                //paladinModeChanged: paladinModeChanged,
                productListOptionForPaladinEntry: productListOptionForPaladinEntry,
                productListOptionForPaladinExit: productListOptionForPaladinExit
            });

            vm.filter = {
                tradeVenueLoc: vm.tradeVenueLocList[0],
                dateSelectionMode: 0,
                dateFromSelection: 'Last Trading Day',
                dateFromCalendar: moment().startOf('day').subtract(1, 'days').toDate(),
                fromDateFromCalendar: moment().startOf('day').subtract(1, 'days').toDate(),
                toDateFromCalendar: moment().startOf('day').toDate(),
                direction: vm.directions[0],
                fundamentals: {},
                searchProductFilter: null,
                barSize: vm.barSizeOptions[0],
                crossover: vm.comCrossover[0],
                //payoutstrategy: vm.payoutStrategy[0],
                tid: vm.tid[0].value
            };

            resetAllFundamentals();
            vm.isLoading = true;
            await setSectorIndustryFilterData();            

            tool.watch('vm.mode', function () {
                vm.isLoading = true;
                updateDateSelections();
            });

            tool.watch('vm.filterStrength', function (val) {
                if (!vm.lastEndTradingDate) return;
                vm.isLoading = true;
                loadStockList();
            });

            tool.watch('vm.paladinHorizon', function (val) {
                if (!vm.lastEndTradingDate) return;

                vm.isLoading = true;
                loadStockList();
            });

            sWatchlistService.getWatchlistsForUser().then(function (res) {
                vm.watchlists = res.data;
            }).then(function () {
                updateSelection({
                    type: "TradeVenue",
                    value: vm.filter.tradeVenueLoc
                });
            });
        });
    })
    .defineControllerAsPopup('s.tgps.MainPopupController', {
        templateUrl: '/App/shared/tgps/tgps.popup.html',
        windowClass: 'agm-component-tradersgps-popup'
    },
    ['mode'], function (vm, dep, tool) {
        tool.inheritVmController('s.tgps.MainBaseController', {
            $scope: dep.$scope
        });
        vm.mode = dep.mode;
    })
