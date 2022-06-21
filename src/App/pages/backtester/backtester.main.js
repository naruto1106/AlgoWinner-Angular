agmNgModuleWrapper("agmp.backtester")
    .defineControllerAsPage("p.backtester.MainController",
        "/App/pages/backtester/backtester.main.html",
        ["sHeaderService", "sProductService", "pBacktesterService", "pShopService"],
        function (vm, dep, tool) {
            var sProductService = dep.sProductService,
                pBacktesterService = dep.pBacktesterService,
                coreNotificationService = dep.coreNotificationService,
                coreUserStateService = dep.coreUserStateService,
                pShopService = dep.pShopService;

            var initialState = {
                step1: {
                    isOpen: true,
                    direction: 'long',
                    barSize: 'Day',
                    tradeSize: 100,
                    startDate: new Date(moment().subtract(12, 'months').startOf('day').format()),
                    endDate: new Date(moment().subtract(1, 'days').startOf('day').format())
                },
                step2: {
                    isOpen: false,
                    entryIndicator: {
                        name: "Price Crossover Strategy"
                    }
                },
                step3: {
                    isOpen: false,
                    exitConditions: {
                        tp: 20,
                        sl: 20,
                        reverse: false,
                        maxHolding: 20
                    }
                }
            };

            function setEntryIndicator(indicator) {
                vm.indicators.forEach(function (i) {
                    if (i.name === indicator) {
                        vm.steps.step2.entryIndicator = angular.copy(i);
                    }
                });
            }

            function disableStep2() {
                return !pBacktesterService.selectedStock || !vm.steps.step1.tradeSize || !pBacktesterService.selectedStock.Symbol || isPremiumSelected();
            }

            function disableStep3() {
                var disabled = true;

                if (vm.steps.step1.direction === 'long') {
                    var emptyFieldsLong = vm.steps.step2.entryIndicator.longTrigger.params.filter(function (p) {
                        return !p.value && p.name !== 'Smooth';
                    });

                    disabled = emptyFieldsLong.length > 0 ? true : false;
                } else {
                    var emptyFieldsShort = vm.steps.step2.entryIndicator.shortTrigger.params.filter(function (p) {
                        return !p.value && p.name !== 'Smooth';
                    });

                    disabled = emptyFieldsShort.length > 0 ? true : false;
                }

                return disableStep2() || disabled || !vm.steps.step2.isOpen;
            }

            function disableSimulate() {
                return disableStep2() || disableStep3();
            }

            function renderSlider() {
                tool.timeout(function () {
                    tool.broadcast('rzSliderForceRender');
                });
            }

            function goStep3() {
                vm.steps.step3.isOpen = true;
                renderSlider();
            }

            function clickStep3() {
                if (!disableStep3()) {
                    renderSlider();
                }
            }

            function searchProducts(keyword) {
                return sProductService.SearchProduct(keyword).then(function (res) {
                    return res.data;
                });
            }

            function selectBacktest() {
                renderSlider();
            }

            function reset() {
                vm.selectedTab = 'backtest';
                vm.pBacktesterService.selectedStock = null;
                vm.steps = angular.copy(initialState);
                vm.steps.step2.entryIndicator = angular.copy(vm.indicators[0]);
            }

            function getTrigger(trigger) {
                switch (trigger) {
                    case "Greater Than":
                        return "GREATER";
                    case "Less Than":
                        return "LESS";
                    case "Cross Above":
                        return "CROSS_ABOVE";
                    case "Cross Below":
                        return "CROSS_BELOW";
                }
                return "GREATER";
            }

            function getParamSuffix(name) {
                if (_.includes(name, 'Period')) {
                    return vm.steps.step1.barSize === 'Week' ? ' (Weeks)' : ' (Days)';
                } else {
                    return '';
                }
            }

            function isPremiumSelected() {
                return !vm.hasPremiumSubscription && vm.steps.step2.entryIndicator.id !== "PriceCrossover";
            }

            function simulate() {
                pBacktesterService.result = null;
                pBacktesterService.isLoading = true;

                var request = {
                    Symbol: pBacktesterService.selectedStock.Symbol,
                    Market: pBacktesterService.selectedStock.TradeVenueLoc,
                    StartDate: moment(vm.steps.step1.startDate).startOf('day').format("YYYY-MM-DD"),
                    EndDate: moment(vm.steps.step1.endDate).startOf('day').format("YYYY-MM-DD"),
                    IsWeekly: vm.steps.step1.barSize === 'Week',
                    MaxDuration: vm.steps.step3.exitConditions.maxHolding,
                    Direction: vm.steps.step1.direction.toUpperCase(),
                    StopLoss: vm.steps.step3.exitConditions.sl,
                    TakeProfit: vm.steps.step3.exitConditions.tp,
                    TradeSize: vm.steps.step1.tradeSize,
                    StrategyName: vm.steps.step2.entryIndicator.id,
                    When: "CLOSE",
                    IsReverse: vm.steps.step3.exitConditions.reverse,
                };

                var params = [];
                if (vm.steps.step1.direction === "long") {
                    params = vm.steps.step2.entryIndicator.longTrigger.params;
                    request.Trigger = getTrigger(vm.steps.step2.entryIndicator.longTrigger.selectedTrigger.trigger);
                } else {
                    params = vm.steps.step2.entryIndicator.shortTrigger.params;
                    request.Trigger = getTrigger(vm.steps.step2.entryIndicator.shortTrigger.selectedTrigger.trigger);
                }
                params.forEach(function (p) {
                    if (p.name === "Period") {
                        request.Period = Math.floor(p.value);
                    } else if (p.name === "Fast Period") {
                        request.FastPeriod = Math.floor(p.value);
                    } else if (p.name === "Slow Period") {
                        request.SlowPeriod = Math.floor(p.value);
                    } else if (p.name === "Signal Line") {
                        request.SignalPeriod = Math.floor(p.value);
                    } else if (p.name === "SMA1 Period") {
                        request.Period1 = Math.floor(p.value);
                    } else if (p.name === "SMA2 Period") {
                        request.Period2 = Math.floor(p.value);
                    } else if (p.name === "Percentage Value") {
                        request.PctValue = p.value;
                    } else if (p.name === "Smooth") {
                        request.IsSmooth = p.value;
                    }
                });

                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

                pBacktesterService.simulate(request).then(function (res) {
                    pBacktesterService.result = res.data;
                    vm.selectedTab = 'result'
                }, function (res) {
                    if (res.data && res.data.Message) {
                        coreNotificationService.notifyError("Failed", res.data.Message);
                    }
                }).finally(function () {
                    pBacktesterService.isLoading = false;
                });
            }

            function subscribePremium() {
                tool.openModalByDefinition("p.shop.SubscribeController", {
                    strategyId: 0,
                    brokerSelections: [],
                    allOffers: pShopService.backtesterOffers,
                    mode: "normal",
                    showAddOn: false
                });
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    pBacktesterService: pBacktesterService,
                    selectedTab: 'backtest',
                    steps: angular.copy(initialState),
                    barSizes: ['Day', 'Week'],
                    indicators: [{
                        id: "PriceCrossover",
                        name: "Price Crossover Strategy",
                        description: "",
                        longTrigger: {
                            params: [{
                                name: 'Period',
                                value: 14
                            }],
                            triggers: ["Greater Than", "Less Than", "Cross Above", "Cross Below"],
                            selectedTrigger: {
                                before: "Close Price",
                                after: "Moving Average",
                                trigger: "Cross Above"
                            }
                        },
                        shortTrigger: {
                            params: [{
                                name: 'Period',
                                value: 14
                            }],
                            triggers: ["Greater Than", "Less Than", "Cross Above", "Cross Below"],
                            selectedTrigger: {
                                before: "Close Price",
                                after: "Moving Average",
                                trigger: "Cross Below"
                            }
                        }
                    }, {
                        id: "Turtle",
                        name: "Turtle Strategy",
                        description: "",
                        longTrigger: {
                            params: [{
                                name: 'Fast Period',
                                value: 20
                            }, {
                                name: 'Slow Period',
                                value: 55
                            }],
                            triggers: ["Greater Than", "Less Than", "Cross Above", "Cross Below"],
                            selectedTrigger: {
                                before: "Close Price",
                                after: "Indicator",
                                trigger: "Cross Above"
                            }
                        },
                        shortTrigger: {
                            params: [{
                                name: 'Fast Period',
                                value: 20
                            }, {
                                name: 'Slow Period',
                                value: 55
                            }],
                            triggers: ["Greater Than", "Less Than", "Cross Above", "Cross Below"],
                            selectedTrigger: {
                                before: "Close Price",
                                after: "Indicator",
                                trigger: "Cross Below"
                            }
                        }
                    }, {
                        id: "MACD",
                        name: "MACD Histogram",
                        description: "",
                        longTrigger: {
                            params: [{
                                name: 'Fast Period',
                                value: 12
                            }, {
                                name: 'Slow Period',
                                value: 26
                            }, {
                                name: 'Signal Line',
                                value: 9
                            }],
                            triggers: ["Greater Than", "Less Than", "Cross Above", "Cross Below"],
                            selectedTrigger: {
                                before: "Indicator",
                                after: "Signal Line",
                                trigger: "Cross Above"
                            }
                        },
                        shortTrigger: {
                            params: [{
                                name: 'Fast Period',
                                value: 12
                            }, {
                                name: 'Slow Period',
                                value: 26
                            }, {
                                name: 'Signal Line',
                                value: 9
                            }],
                            triggers: ["Greater Than", "Less Than", "Cross Above", "Cross Below"],
                            selectedTrigger: {
                                before: "Indicator",
                                after: "Signal Line",
                                trigger: "Cross Below"
                            }
                        }
                    }, {
                        id: "SMACrossover",
                        name: "SMA Crossover Strategy",
                        description: "",
                        longTrigger: {
                            params: [{
                                name: 'SMA1 Period',
                                value: 12
                            }, {
                                name: 'SMA2 Period',
                                value: 26
                            }],
                            triggers: ["Greater Than", "Less Than", "Cross Above", "Cross Below"],
                            selectedTrigger: {
                                before: "SMA1",
                                after: "SMA2",
                                trigger: "Cross Above"
                            }
                        },
                        shortTrigger: {
                            params: [{
                                name: 'SMA1 Period',
                                value: 12
                            }, {
                                name: 'SMA2 Period',
                                value: 26
                            }],
                            triggers: ["Greater Than", "Less Than", "Cross Above", "Cross Below"],
                            selectedTrigger: {
                                before: "SMA1",
                                after: "SMA2",
                                trigger: "Cross Below"
                            }
                        }
                    }, {
                        id: "RSI",
                        name: "RSI Strategy",
                        description: "",
                        longTrigger: {
                            params: [{
                                name: 'Period',
                                value: 14
                            }, {
                                name: 'Percentage Value',
                                value: 50.0
                            }],
                            triggers: ["Greater Than", "Less Than", "Cross Above", "Cross Below"],
                            selectedTrigger: {
                                before: "RSI",
                                after: "Percentage Value",
                                trigger: "Cross Above"
                            }
                        },
                        shortTrigger: {
                            params: [{
                                name: 'Period',
                                value: 14
                            }, {
                                name: 'Percentage Value',
                                value: 50.0
                            }],
                            triggers: ["Greater Than", "Less Than", "Cross Above", "Cross Below"],
                            selectedTrigger: {
                                before: "RSI",
                                after: "Percentage Value",
                                trigger: "Cross Below"
                            }
                        }
                    }, {
                        id: "STOCH",
                        name: "STOCH Strategy",
                        description: "",
                        longTrigger: {
                            params: [{
                                name: 'Period',
                                value: 5
                            }, {
                                name: 'Percentage Value',
                                value: 50.0
                            }, {
                                name: 'Smooth',
                                value: false
                            }],
                            triggers: ["Greater Than", "Less Than", "Cross Above", "Cross Below"],
                            selectedTrigger: {
                                before: "Indicator",
                                after: "Percentage Value",
                                trigger: "Cross Above"
                            }
                        },
                        shortTrigger: {
                            params: [{
                                name: 'Period',
                                value: 5
                            }, {
                                name: 'Percentage Value',
                                value: 50.0
                            }, {
                                name: 'Smooth',
                                value: false
                            }],
                            triggers: ["Greater Than", "Less Than", "Cross Above", "Cross Below"],
                            selectedTrigger: {
                                before: "Indicator",
                                after: "Percentage Value",
                                trigger: "Cross Below"
                            }
                        }
                    }],
                    hasPremiumSubscription: false,

                    setEntryIndicator: setEntryIndicator,
                    goStep3: goStep3,
                    clickStep3: clickStep3,
                    disableStep2: disableStep2,
                    disableStep3: disableStep3,
                    disableSimulate: disableSimulate,
                    simulate: simulate,
                    searchProducts: searchProducts,
                    selectBacktest: selectBacktest,
                    reset: reset,
                    getParamSuffix: getParamSuffix,
                    isPremiumSelected: isPremiumSelected,
                    subscribePremium: subscribePremium
                });

                pBacktesterService.isLoading = true;
                vm.steps.step2.entryIndicator = angular.copy(vm.indicators[0]);
                dep.sHeaderService.selectMenu("backtester");

                pShopService.loadBacktesterOffers();

                tool.onceAll([
                    coreUserStateService.myPremiumItemSubscriptionsLoaded,
                    pShopService.backtesterOffersLoaded
                ]).then(function () {
                    if (coreUserStateService.hasBacktester()) {
                        vm.hasPremiumSubscription = true;
                    }
                }).finally(function () {
                    pBacktesterService.isLoading = false;
                });
            });
        });