agmNgModuleWrapper('agms.chart')
    .defineService('smartchartCustomViewGenerator',
        [
            'smartchartCustomLabel',
            'smartchartGroup',
            'smartchartHorizontalGuide',
            'smartchartVerticalGuide',
            'smartchartLine',
            'smartchartMouseFollower',
            'smartchartOHLC',
            'smartchartOHLCHighlighter',
            'smartchartOLHCHelper',
            'smartchartPositionDragger',
            'smartchartHorizontalRuler',
            'smartchartVerticalRuler',
            'smartchartRulerHelper',
            'smartchartOptions'
        ],
        function(serviceObj, dep, tool) {

            var smartchartCustomLabel = dep.smartchartCustomLabel,
                smartchartGroup = dep.smartchartGroup,
                smartchartHorizontalGuide = dep.smartchartHorizontalGuide,
                smartchartVerticalGuide = dep.smartchartVerticalGuide,
                smartchartMouseFollower = dep.smartchartMouseFollower,
                smartchartOHLC = dep.smartchartOHLC,
                smartchartOHLCHighlighter = dep.smartchartOHLCHighlighter,
                smartchartOLHCHelper = dep.smartchartOLHCHelper,
                smartchartPositionDragger = dep.smartchartPositionDragger,
                smartchartVerticalRuler = dep.smartchartVerticalRuler,
                smartchartRulerHelper = dep.smartchartRulerHelper,
                smartchartOptions = dep.smartchartOptions;

            tool.setServiceObjectProperties({
                adjustVerticalRangeByHorizontalRange: function(horizontalRange, verticalRange, effectiveness, ohlcSeries) {
                    var adjustedRange = smartchartOLHCHelper.computeOHLCVerticalRange(horizontalRange, ohlcSeries);
                    if (adjustedRange.min) {
                        verticalRange.from = effectiveness * adjustedRange.min + (1 - effectiveness) * verticalRange.from;
                    }
                    if (adjustedRange.max) {
                        verticalRange.to = effectiveness * adjustedRange.max + (1 - effectiveness) * verticalRange.to;
                    }
                },
                generateAlgomerchantOHLCView: function(onOhlcSelected, onViewChanged) {
                    var returnedObject = {
                        ohlcSeries: [],
                        trades: [],
                        smartChartItems: [],
                        labelGroupItem: smartchartGroup.generate(),
                        ohlcItem: smartchartOHLC.generate([], { fill: 'none', stroke: '#0A0' }),
                        setOhlcSeries: function(ohlcSeries) {
                            serviceObj.ohlcSeries = ohlcSeries;
                            serviceObj.ohlcItem = this.ohlcItem;
                            serviceObj.ohlcItem.ohlcSeries = ohlcSeries;
                            serviceObj.horizontalRule = this.horizontalRule;
                            serviceObj.horizontalRule.dailyTimeSeries = ohlcSeries;
                        },
                        setTrades: function(trades) {

                            var dateToIndex = [];
                            // what if OHLCSeries has not been loaded
                            serviceObj.ohlcSeries.forEach(function(ohlc, index) {
                                var time = new Date(ohlc.Timestamp).getTime();
                                time = Math.floor(time / (1000 * 3600 * 24));
                                dateToIndex[time] = index;
                            });
                            var sellTradeGroups = [];
                            var buyTradeGroups = [];
                            trades.forEach(function(trade) {
                                var time = new Date(trade.CreatedTime).getTime();
                                time = Math.floor(time / (1000 * 3600 * 24));
                                if (dateToIndex[time]) {
                                    var newIndex = dateToIndex[time];
                                    trade.index = newIndex;
                                    var tradeGroupsToPut = sellTradeGroups;

                                    if (trade.Action === 'Buy') {
                                        tradeGroupsToPut = buyTradeGroups;
                                    }

                                    if (!tradeGroupsToPut[newIndex]) {
                                        tradeGroupsToPut[newIndex] = {
                                            index: newIndex,
                                            Action: trade.Action,
                                            tradeList: [],
                                            selectedIndex: 0
                                        };

                                    }
                                    tradeGroupsToPut[newIndex].tradeList.push(trade);
                                }
                            });

                            var showTodayTrades = function(tradeGroup) {
                                tool.openModalByDefinition('p.trade.ShowTodayTradesController',
                                {

                                },
                                {
                                    trades: function() {
                                        var index = tradeGroup.index;
                                        var trades = [];
                                        if (sellTradeGroups[index]) {
                                            trades = trades.concat(sellTradeGroups[index].tradeList);
                                        };
                                        if (buyTradeGroups[index]) {
                                            trades = trades.concat(buyTradeGroups[index].tradeList);
                                        };
                                        return trades;
                                    }
                                });
                            };

                            var subItems = [];

                            var tradeGroups = [];
                            sellTradeGroups.forEach(function(tradeGroup) {
                                tradeGroups.push(tradeGroup);
                            });
                            buyTradeGroups.forEach(function(tradeGroup) {
                                tradeGroups.push(tradeGroup);
                            });
                            tradeGroups.forEach(function(tradeGroup) {
                                var index = tradeGroup.index;
                                var y = 0;
                                if (serviceObj.ohlcSeries[index]) {
                                    y = tradeGroup.Action === 'Buy' ? serviceObj.ohlcSeries[index].Low : serviceObj.ohlcSeries[index].High;
                                }
                                var label = smartchartCustomLabel.generate(index, y, {
                                    expand: function(positionStyle) {
                                        this.expanded = true;
                                        positionStyle.zIndex = 10;
                                    },
                                    collapse: function(positionStyle) {
                                        this.expanded = false;
                                        positionStyle.zIndex = 0;
                                    },
                                    expanded: false,
                                    tradeGroup: tradeGroup,
                                    showTodayTrades: showTodayTrades
                                }, 'tradingFlag');
                                subItems.push(label);
                            });
                            serviceObj.labelGroupItem = this.labelGroupItem;
                            serviceObj.labelGroupItem.subItems = subItems;
                            serviceObj.options = this.options;
                            if (serviceObj.options.updateFunc) {
                                serviceObj.options.updateFunc();
                            }
                        },
                        options: null,
                        showTrade: function(trade, hideOthers) {
                            var selectedTradeLabel = null;
                            serviceObj.labelGroupItem.subItems.forEach(function(tradeLabel) {
                                tradeLabel.obj.tradeGroup.tradeList.forEach(function(el, idx) {
                                    if (el === trade) {
                                        selectedTradeLabel = tradeLabel;
                                        tradeLabel.obj.tradeGroup.selectedIndex = idx;
                                    } else if (hideOthers) {
                                        tradeLabel.obj.collapse(tradeLabel.positionStyle);
                                    }
                                });

                            });
                            if (selectedTradeLabel) {
                                selectedTradeLabel.obj.expand(selectedTradeLabel.positionStyle);
                            }
                        }
                    };
                    
                    function draggingAdjustment(info, oldInfo, effectiveness) {
                        if (onViewChanged) {
                            onViewChanged();
                        }
                        serviceObj.adjustVerticalRangeByHorizontalRange(info.horizontalRange, info.verticalRange, effectiveness, returnedObject.ohlcSeries);
                    };

                    returnedObject.options = smartchartOptions.defaultOption;
                    returnedObject.horizontalRule = smartchartRulerHelper.dailyDateRuler(returnedObject.ohlcSeries);
                    returnedObject.options.rulers.south.items = [returnedObject.horizontalRule];
                    returnedObject.options.rulers.east.items = [
                        smartchartVerticalRuler.generate(50, 0.005, false, null, null, null, ['default-vertical-guide-text', 'mini-text'])
                    ];

                    returnedObject.smartChartItems = [
                        smartchartOHLCHighlighter.generate(null, onOhlcSelected),
                        smartchartHorizontalGuide.generate(50, 0.005),
                        smartchartVerticalGuide.generate(50, 10),
                        returnedObject.ohlcItem,
                        smartchartMouseFollower.generate(),
                        smartchartPositionDragger.generate(draggingAdjustment),
                        returnedObject.labelGroupItem
                    ];
                    return returnedObject;
                }
            });
        })
    .ngApp
    .run([
        '$templateCache', function($templateCache) {
            $templateCache.put('tradingFlag',
                '<div class="flag-container" ng-class="{buy:localItem.obj.tradeGroup.Action==\'Buy\'}" ng-mouseleave="localItem.obj.collapse(localItem.positionStyle)">' +
                '<div class="flag-arrow" ng-mousemove="localItem.obj.expand(localItem.positionStyle)"></div>' +
                '<div class="flag"><div class="flag-detail"   ng-show="localItem.obj.expanded">' +
                '<h5 class="p-0px m-0px"><b> {{localItem.obj.tradeGroup.tradeList[localItem.obj.tradeGroup.selectedIndex].Product.Symbol}}</b></h5>' +
                '<span class="action"> {{localItem.obj.tradeGroup.Action}}</span>' +
                ' Q: <span class="quantity"> {{localItem.obj.tradeGroup.tradeList[localItem.obj.tradeGroup.selectedIndex].Quantity}}</span>' +
                '<span class="price"> $ {{localItem.obj.tradeGroup.tradeList[localItem.obj.tradeGroup.selectedIndex].FillPrice | number:2}}</span>' +
                '<div class="lh-30px" ng-show="localItem.obj.tradeGroup.tradeList.length>1"><a ng-click="localItem.obj.showTodayTrades(localItem.obj.tradeGroup)">See Other..</a></div>' +
                '</div>' +
                '</div>' +
                '</div>');
        }
    ]);