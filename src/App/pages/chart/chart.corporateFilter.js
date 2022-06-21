agmNgModuleWrapper('agmp.chart')
    .defineController('p.chart.CorporateFilterController',
        [
            'pChartTimeBoundEventFuncLibrary',
            'pChartFilterDescriptionService',
            'sTradingCorporateActionsService',
            'pChartPopupService',
            'pChartEventVisibilityService'
        ], function (vm, dep, tool) {

            var pChartTimeBoundEventFuncLibrary = dep.pChartTimeBoundEventFuncLibrary,
                sTradingCorporateActionsService = dep.sTradingCorporateActionsService,
                pChartFilterDescriptionService = dep.pChartFilterDescriptionService,
                pChartPopupService = dep.pChartPopupService,
                pChartEventVisibilityService = dep.pChartEventVisibilityService;

            var filterDescription = pChartFilterDescriptionService;
            var cachedResults = {};

            var corporateActionsTypes = sTradingCorporateActionsService.corporateActionsTypes;

            function getCorporateActions(corporateActionType) {
                return function () {
                    if (!vm.filterDescription.primaryProduct) {
                        return tool.reject();
                    }
                    var productId = vm.filterDescription.primaryProduct.ProductId;
                    var cachedResult = cachedResults[corporateActionType + " " + productId];
                    if (cachedResult) {
                        return tool.when(cachedResult);
                    }

                    var request = {
                        ProductIds: [productId],
                        CorporateActionTypes: [corporateActionType]
                    }

                    //TODO show corporate actions on all included products, for now it's only the primary
                    return sTradingCorporateActionsService.GetCorporateActionsForProducts(request)
                        .then(function (res) {
                            for (var i = 0; i < res.data.length; i++) {
                                var d = res.data[i];
                                var product = _.find(vm.filterDescription.myProducts, function (p) { return p.ProductId === d.ProductId; });
                                if (product && d.ExDate) {
                                    var m;
                                    if (product.TradeVenueLoc === "SG") {
                                        m = moment(d.ExDate);
                                        d.ExDate = moment.tz({ year: m.year(), month: m.month(), day: m.date(), hour: 9 }, "Asia/Singapore").format();
                                    } else if (product.TradeVenueLoc === "US") {
                                        m = moment(d.ExDate);
                                        d.ExDate = moment.tz({ year: m.year(), month: m.month(), day: m.date(), hour: 9, minute: 30 }, "America/New_York").format();
                                    }
                                }
                            }
                            cachedResults[corporateActionType + " " + productId] = res.data;
                            return res.data;
                        });
                };
            }


            function initializeEconomicEvent() {
                function assignData(object, clonedElement, scope) {
                    scope.data = object;
                }
                function getDate(object) {
                    return new Date(object.ExDate);
                }
                vm.corporateActionsTypes.forEach(function (cat) {
                    pChartTimeBoundEventFuncLibrary.generateTimeBoundEventFunc({
                        pChartPopupService: pChartPopupService
                    }, cat.name, "template[" + cat.name + "]", getCorporateActions(cat.type), assignData, getDate);
                    pChartEventVisibilityService.checkAndRespondToVisibility(cat.name);
                });
            }

            tool.setVmProperties({
                corporateActionsTypes: corporateActionsTypes,
                toggleEvent: pChartEventVisibilityService.toggleEvent,
                filterDescription: filterDescription,
                checkAndRespondToVisibility: pChartEventVisibilityService.checkAndRespondToVisibility
            });

            tool.initialize(function () {
                initializeEconomicEvent();
            });
        })
    .defineDirectiveForE('agmp-chart-corporate-filter', [], function () {
        return {
            controller: "p.chart.CorporateFilterController",
            templateUrl: '/App/pages/chart/chart.corporateFilter.html'
        };
    }, {

        });
