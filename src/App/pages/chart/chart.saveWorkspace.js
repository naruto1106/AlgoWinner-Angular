agmNgModuleWrapper('agmp.chart')
    .defineControllerAsPopup('p.chart.SaveWorkspaceController', {
        templateUrl: '/App/pages/chart/chart.saveWorkspace.html',
        windowClass: 'small-modal'
    },
        [
            'viewTemplate',
            'templateMode',
            'sTradingCorporateActionsService',
            'pChartService',
            'pChartTgpsService',
            'sProductService',
            'pChartViewTemplateService',
            'sGuideItemManagerService',
            'pChartStrategyOrderService',
            'sChartStudyService'
        ],
        function (vm, dep, tool) {
            var viewTemplate = angular.copy(dep.viewTemplate),
                templateMode = dep.templateMode,
                sGuideItemManagerService = dep.sGuideItemManagerService,
                coreConfigService = dep.coreConfigService,
                sProductService = dep.sProductService,
                pChartViewTemplateService = dep.pChartViewTemplateService,
                $filter = dep.$filter,
                pChartTgpsService = dep.pChartTgpsService,
                coreNotificationService = dep.coreNotificationService,
                pChartStrategyOrderService = dep.pChartStrategyOrderService,
                sTradingCorporateActionsService = dep.sTradingCorporateActionsService,
                pChartService = dep.pChartService,
                sChartStudyService = dep.sChartStudyService;

            var barSizesIntraday = [
                {
                    Val: "1 Min",
                    Name: "1 Minute"
                },
                {
                    Val: "5 Min",
                    Name: "5 Minutes"
                },
                {
                    Val: "10 Min",
                    Name: "10 Minutes"
                },
                {
                    Val: "15 Min",
                    Name: "15 Minutes"
                },
                {
                    Val: "30 Min",
                    Name: "30 Minutes"
                },
                {
                    Val: "1 H",
                    Name: "1 Hour"
                },
                {
                    Val: "2 H",
                    Name: "2 Hours"
                },
                {
                    Val: "1 D",
                    Name: "1 Day"
                },
                {
                    Val: "1 W",
                    Name: "1 Week"
                },
                {
                    Val: "1 M",
                    Name: "1 Month"
                }];


            function getDurationForDisplay() {
                return barSizesIntraday.filter(function (i) {
                    return i.Val === viewTemplate.filterDescription.barSize;
                })[0];
            }

            function getChartType() {
                if (viewTemplate.layout) {
                    return pChartService.chartTypes.filter(function (i) {
                        return i.StxxType === viewTemplate.layout.chartType;
                    })[0];
                }
                return "-";
            }

            function getComparisonProducts() {
                var arr = [];
                if (viewTemplate.filterDescription.myProducts && viewTemplate.filterDescription.primaryProduct) {

                    viewTemplate.filterDescription.myProducts.forEach(function (p) {
                        if (p.ProductId != viewTemplate.filterDescription.primaryProduct.ProductId) {
                            arr.push(p);
                        }
                    });
                }
                return arr;
            }

            function getSelectedDatamarts() {


                return _.uniq(viewTemplate.filterDescription.datamartEventTypes, function (e) {
                    return e.renamedAlgoFeedEventTypeName;
                }).map(function (e) {
                    return e.renamedAlgoFeedEventTypeName;
                });


            }

            function getSelectedDatamartsLabel(datamarts) {
                if (!datamarts || datamarts.length == 0) {
                    return "None Selected";
                } else if (datamarts.length == 1) {
                    return datamarts[0];
                } else {
                    return datamarts.length + " items selected";
                }
            }

            function getSelectedFundamentals() {
                return viewTemplate.filterDescription.addedFundamentals;

            }

            function getSelectedFundamentalsLabel(fundamentals) {
                if (!fundamentals || fundamentals.length == 0) {
                    return "None Selected";
                } else if (fundamentals.length == 1) {
                    return fundamentals[0].displayName;
                } else {
                    return fundamentals.length + " fundamentals selected";
                }
            }

            function getSelectedStudies() {
                return viewTemplate.filterDescription.addedStudies;

            }

            function getSelectedStudiesLabel(studies) {
                if (!studies || studies.length == 0) {
                    return "None Selected";
                } else if (studies.length == 1) {
                    return sChartStudyService.overrideStudyDisplay(studies[0].stxxStudy).toUpperCase();
                } else {
                    return studies.length + " studies selected";
                }
            }

            function getCorporateActions() {
                return sTradingCorporateActionsService.corporateActionsTypes.filter(function (ca) {
                    return viewTemplate.filterDescription.eventVisibility[ca.name];
                });
            }

            function getCorporateActionsLabel(corporateActions) {
                if (corporateActions.length == 0) {
                    return "None Selected";
                } else if (corporateActions.length == 1) {
                    return corporateActions[0].displayName;
                } else {
                    return corporateActions.length + " items selected";
                }
            }


            function getTradePortfolios() {
                return pChartStrategyOrderService.myStrategies.filter(function (tp) {
                    return pChartStrategyOrderService.strategyVisibility(tp, viewTemplate.filterDescription);
                });

            }

            function getTradePortfoliosLabel(tradePortfolios) {
                if (tradePortfolios.length == 0) {
                    return "None Selected";
                } else if (tradePortfolios.length == 1) {
                    return $filter('strategyName')(tradePortfolios[0].DisplayInfo);
                } else {
                    return tradePortfolios.length + " strategies selected";
                }
            }

            function getSubscriptions() {
                return pChartStrategyOrderService.mySubscriptions.filter(function (tp) {
                    return pChartStrategyOrderService.strategyVisibility(tp, viewTemplate.filterDescription);
                });
            }

            function getSubscriptionLabel(mySubscriptions) {
                if (mySubscriptions.length == 0) {
                    return "None Selected";
                } else if (mySubscriptions.length == 1) {
                    return $filter('strategyName')(mySubscriptions[0].DisplayInfo);
                } else {
                    return mySubscriptions.length + " subscriptions selected";
                }
            }

            function getTgpsStatus() {
                var tgpsMode = "Off";
                if (pChartTgpsService.tradersGpsMode) {
                    tgpsMode = pChartTgpsService.tradersgps_swing.mode;
                }
                return tgpsMode;
            }

            function getFilteredViewTemplates(viewValue) {
                var arr = pChartViewTemplateService.viewTemplates.filter(function (i) {
                    if (!viewValue || !viewValue.trim()) {
                        return true;
                    }
                    if (!i.name || !i.name.trim()) {
                        return false;
                    }
                    return _.includes(i.name.toUpperCase(), viewValue.toUpperCase());
                });
                return arr;
            }

            function doSaveWorkspace() {
                resolveUpdateOptionals();
                return pChartViewTemplateService.saveViewTemplate(viewTemplate).then(function (savedTemplate) {
                    pChartViewTemplateService.getOrRefreshViewTemplates();
                    if (vm.flags.setAsDefault) {
                        pChartViewTemplateService.setAsDefaultTemplate(viewTemplate);
                    } else {
                        pChartViewTemplateService.tryUnsetAsDefaultTemplate(viewTemplate);

                    }
                }).finally(function () {
                    vm.uibClosePanel();
                });

            }
            function resolveUpdateOptionals() {
                if (!vm.flags.includeProduct) {
                    pChartViewTemplateService.excludeProductFromTemplate(viewTemplate);
                }
                if (vm.flags.includeNewProduct) {
                    if (vm.selectedNewProduct && vm.selectedNewProduct.ProductId) {
                        viewTemplate.filterDescription.primaryProduct = vm.selectedNewProduct;
                        viewTemplate.filterDescription.myProducts.push(vm.selectedNewProduct);
                    }
                }
                if (!vm.flags.includeAnalysis) {
                    viewTemplate.filterDescription.datamartEventTypes = [];
                    for (var prop in viewTemplate.filterDescription.eventVisibility) {
                        viewTemplate.filterDescription.eventVisibility[prop] = false;
                    }
                    viewTemplate.filterDescription.addedStudies = [];
                    viewTemplate.filterDescription.addedFundamentals = [];
                }
            }
            function saveWorkspace() {

                var hasExistingWorkspace = hasSameExistingWorkspace();
                if (!hasExistingWorkspace) {
                    viewTemplate.id = null;
                }
                return checkForRenamingThenSave(hasExistingWorkspace, doSaveWorkspace);
            }

            function checkForRenamingThenSave(flag, promiseFunc) {
                if (flag) {
                    return coreNotificationService.notifyYesNo("Overwrite existing workspace", "Do you want to overwrite " + vm.sameExistingWorkspace.name + " ?")
                        .result.then(function (id) {
                            if (id === 0) {
                                viewTemplate.id = vm.sameExistingWorkspace.id;
                                return promiseFunc();
                            }
                            return tool.reject();
                        }, function () {
                            return tool.reject();
                        });
                } else {
                    return promiseFunc();
                }
            }

            function editWorkspace() {
                resolveUpdateOptionals();
                var hasExistingWorkspace = hasSameExistingWorkspace();
                return checkForRenamingThenSave(hasExistingWorkspace, doSaveWorkspace);
            }

            function loadWorkspace() {
                resolveUpdateOptionals();
                pChartViewTemplateService.setAsCurrentTemplate(viewTemplate);
                vm.uibClosePanel();
            }

            function hasSameExistingWorkspace() {
                if (vm.templateMode === 'EDIT' && vm.initialName.trim() == viewTemplate.name.trim()) {
                    vm.sameExistingWorkspace = null;
                    return null;
                }

                vm.sameExistingWorkspace = pChartViewTemplateService.viewTemplates.filter(function (i) {
                    if (!viewTemplate.name || !i.name) {
                        return false;
                    }
                    return i.name.trim() == viewTemplate.name.trim();
                })[0];
                return vm.sameExistingWorkspace;
            }


            function evaluateStates() {
                vm.states = {
                    selectedStudies: getSelectedStudies(),
                    corporateActions: getCorporateActions(),
                    comparisonProducts: getComparisonProducts(),
                    durationForDisplay: getDurationForDisplay(),
                    selectedDatamarts: getSelectedDatamarts(),
                    selectedFundamentals: getSelectedFundamentals(),
                    chartType: getChartType(),
                    tgpsStatus: getTgpsStatus(),
                    tradePortfolios: getTradePortfolios(),
                    subscriptions: getSubscriptions(),
                }
            }

            function hasAnyAnalysis() {
                return vm.states.selectedStudies.length
                    + vm.states.corporateActions.length
                    + vm.states.selectedDatamarts.length
                    + vm.states.tradePortfolios.length
                    + vm.states.subscriptions.length
                    + vm.states.selectedFundamentals.length > 0;
            }

            function isValidName(name) {
                return pChartViewTemplateService.isValidName(name);
            }

            function canSave() {
                return isValidName(viewTemplate.name);
            }
            function canEdit() {
                return isValidName(viewTemplate.name) && !hasSameExistingWorkspace();
            }

            function getAllSelectedFundamentalsLabel(fundamentals) {
                return fundamentals.map(function (i) {
                    return i.displayName;
                });//.join(',<br/>');
            }
            function getAllTradePortfoliosLabel(tradePortfolios) {
                return tradePortfolios.map(function (i) {
                    return $filter('strategyName')(i.DisplayInfo);
                });//.join(',<br/>');
            }

            function getAllCorporateActionsLabel(corporateActions) {
                return corporateActions.map(function (i) {
                    return i.displayName;
                });//.join(',<br/>');
            }

            function getAllSelectedDatamartsLabel(datamarts) {
                return datamarts.map(function (i) {
                    return i;
                });//.join(',<br/>');
            }

            function getAllSubscriptionLabel(mySubscriptions) {
                return mySubscriptions.map(function (i) {
                    return $filter('strategyName')(i.DisplayInfo);
                });//.join(',<br/>');
            }

            function getAllSelectedStudiesLabel(studies) {
                return studies.map(function (i) {
                    return sChartStudyService.overrideStudyDisplay(i.stxxStudy).toUpperCase();
                });//.join(',<br/>');
            }

            function searchProducts(keyword) {
                return sProductService.SearchProduct(keyword).then(function (res) {
                    return res.data;
                });
            };

            function onNewProductSelected() {

            }

            function refreshViewTemplates() {
                pChartViewTemplateService.getOrRefreshViewTemplates();
            }

            function getAllViewTemplates() {
                return pChartViewTemplateService.viewTemplates;
            }
            function assignNameToExistingTemplate(name) {
                vm.viewTemplate.name = name;
            }
            var viewTemplates = [];
            tool.setVmProperties({
                refreshViewTemplates: refreshViewTemplates,
                assignNameToExistingTemplate: assignNameToExistingTemplate,
                getAllViewTemplates: getAllViewTemplates,
                isValidName: isValidName,
                canSave: canSave,
                canEdit: canEdit,
                templateMode: templateMode,
                searchProducts: searchProducts,
                selectedNewProduct: null,
                onNewProductSelected: onNewProductSelected,
                hasSameExistingWorkspace: hasSameExistingWorkspace,
                getFilteredViewTemplates: getFilteredViewTemplates,
                saveWorkspace: saveWorkspace,
                editWorkspace: editWorkspace,
                loadWorkspace: loadWorkspace,

                viewTemplate: viewTemplate,
                viewTemplates: viewTemplates,
                flags: {
                    includeAnalysis: true,
                    includeProduct: true,
                    includeNewProduct: false
                },
                hasAnyAnalysis: hasAnyAnalysis,

                coreConfigService: coreConfigService,

                getAllSelectedFundamentalsLabel: getAllSelectedFundamentalsLabel,
                getAllSelectedStudiesLabel: getAllSelectedStudiesLabel,
                getAllCorporateActionsLabel: getAllCorporateActionsLabel,
                getAllTradePortfoliosLabel: getAllTradePortfoliosLabel,
                getAllSelectedDatamartsLabel: getAllSelectedDatamartsLabel,
                getAllSubscriptionLabel: getAllSubscriptionLabel,
                showGuideAgain: showGuideAgain,
                getSelectedFundamentalsLabel: getSelectedFundamentalsLabel,
                getSelectedStudiesLabel: getSelectedStudiesLabel,
                getCorporateActionsLabel: getCorporateActionsLabel,
                getTradePortfoliosLabel: getTradePortfoliosLabel,
                getSelectedDatamartsLabel: getSelectedDatamartsLabel,
                getSubscriptionLabel: getSubscriptionLabel,
            });


            function showGuideAgain() {
                sGuideItemManagerService.forceRun('guide.chart.savingWithProduct');
            }

            tool.onRendered(function () {
                if (vm.viewTemplate.filterDescription.primaryProduct) {
                    sGuideItemManagerService.run('guide.chart.savingWithProduct');
                }
            });


            function setStateOfFlags(template) {
                function shouldCheckSetAsDefaultCheckbox() {
                    var defaultWorkspaceId = pChartViewTemplateService.getDefaultTemplateId();
                    if (!defaultWorkspaceId) {
                        return true;
                    }
                    return template.id == defaultWorkspaceId;
                }

                function shouldSetStateOfIncludeProductRadioButton() {
                    return vm.templateMode === 'EDIT' ?
                        Boolean(template.filterDescription.primaryProduct) :
                        pChartViewTemplateService.isProductIncluded();
                }

                vm.flags.setAsDefault = shouldCheckSetAsDefaultCheckbox();
                vm.flags.includeProduct = shouldSetStateOfIncludeProductRadioButton();
            }

            tool.initialize(function () {
                vm.initialName = viewTemplate.name;
                setStateOfFlags(viewTemplate);
                pChartViewTemplateService.getOrRefreshViewTemplates();
                evaluateStates();
            });
        });