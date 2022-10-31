agmNgModuleWrapper('agmp.chart')
    .defineControllerAsPopup('p.chart.LoadWorkspaceController', {
        templateUrl: '/App/pages/chart/chart.loadWorkspace.html',
        windowClass: 'default-modal dark'
    }, ["pChartViewTemplateService", "coreUtil"],
        function (vm, dep, tool) {
            var pChartViewTemplateService = dep.pChartViewTemplateService,
                coreUtil = dep.coreUtil;

            function isIncludedInFilter(template) {
                if (!vm.searchKeyword) {
                    return true;
                }
                var toUpperKeyword = vm.searchKeyword.toUpperCase().trim();
                var toUpperName = template.name.toUpperCase().trim();
                return _.includes(toUpperName, toUpperKeyword);
            }

            function showProductList(template) {
                if (template.filterDescription && template.filterDescription.primaryProduct) {
                    var arr = [template.filterDescription.primaryProduct.Symbol];
                    template.filterDescription.myProducts.forEach(function (product) {
                        if (arr.indexOf(product.Symbol) < 0) {
                            arr.push(product.Symbol);
                        }
                    });
                    return arr.join(',');
                }
                return "-";
            }

            function sortingName(a, b) {
                if (a.name != null && b.name != null) {
                    return coreUtil.sortName(a.name, b.name);
                }
                return 0;
            }

            function sortingProduct(a, b) {
                if (a && b) {
                    return coreUtil.sortName(showProductList(a), showProductList(b));
                }
                return 0;
            }

            function sortingDate(a, b) {
                var dateA = a.updateTime || "";
                var dateB = b.updateTime || "";
                return dateA.localeCompare(dateB);
            }

            function getViewTemplates() {
                if (!pChartViewTemplateService.viewTemplates) {
                    return [];
                }
                var list = pChartViewTemplateService.viewTemplates.filter(function (i) {
                    return isIncludedInFilter(i);
                });

                for (var prop in vm.sorting) {
                    if (vm.sorting[prop] === "none") {
                        continue;
                    }
                    switch (prop) {
                        case "Name":
                            list.sort(function (a, b) {
                                var order = vm.sorting[prop] === "d" ? -1 : 1;
                                return order * sortingName(a, b);
                            });
                            break;
                        case "Products":
                            list.sort(function (a, b) {
                                var order = vm.sorting[prop] === "d" ? -1 : 1;
                                return order * sortingProduct(a, b);
                            });
                            break;
                        case "Date":
                            list.sort(function (a, b) {
                                var order = vm.sorting[prop] === "d" ? -1 : 1;
                                return order * sortingDate(a, b);
                            });
                            break;
                    }
                }

                return list;
            }

            function selectTemplate(template) {
                vm.selectedTemplate = template;
            }

            function selectAndLoadTemplate(template) {
                selectTemplate(template);
                applySelection();
            }

            function isSelectedTemplate(template) {
                return template === vm.selectedTemplate;
            }

            function applySelectionViaWizard() {
                return tool.openModalByDefinition('p.chart.SaveWorkspaceController', {
                    viewTemplate: vm.selectedTemplate,
                    templateMode: 'LOAD'
                }).result.then(function () {
                    vm.onSelectionApplied();
                });
            }

            function applySelection() {
                pChartViewTemplateService.setAsCurrentTemplate(vm.selectedTemplate);
                vm.onSelectionApplied();
            }

            vm.onSelectionApplied = function () {

            }

            function showSorting(col, type) {
                return vm.sorting[col] !== "none" && vm.sorting[col] === type;
            }

            function sortColumn(col) {
                if (vm.sorting[col] === "none") {
                    vm.sorting[col] = "a";
                } else if (vm.sorting[col] === "a") {
                    vm.sorting[col] = "d";
                } else if (vm.sorting[col] === "d") {
                    vm.sorting[col] = "a";
                }

                for (var prop in vm.sorting) {
                    if (prop !== col) {
                        vm.sorting[prop] = "none";
                    }
                }
            }

            function toggleDefaultTemplate(template) {
                pChartViewTemplateService.toggleDefaultTemplate(template);
            }

            function isDefaultWorkspace(template) {
                return pChartViewTemplateService.getDefaultTemplateId() == template.id;
            }

            tool.setVmProperties({
                isDefaultWorkspace: isDefaultWorkspace,
                toggleDefaultTemplate: toggleDefaultTemplate,
                sortColumn: sortColumn,
                showSorting: showSorting,
                applySelectionViaWizard: applySelectionViaWizard,
                selectTemplate: selectTemplate,
                selectAndLoadTemplate: selectAndLoadTemplate,
                isSelectedTemplate: isSelectedTemplate,
                selectedTemplate: null,
                applySelection: applySelection,
                showProductList: showProductList,
                removeTemplate: pChartViewTemplateService.removeTemplate,
                editTemplate: pChartViewTemplateService.editTemplate,
                getOrRefreshViewTemplates: pChartViewTemplateService.getOrRefreshViewTemplates,
                getViewTemplates: getViewTemplates
            });

            tool.initialize(function () {
                pChartViewTemplateService.getOrRefreshViewTemplates();
            });
            vm.onSelectionApplied = function () {
                vm.uibClosePanel();
            }

        })
    .defineController("p.chart.WorkSpaceTableController", ["pChartViewTemplateService", "coreUtil"],
        function (vm, dep, tool) {
            var pChartViewTemplateService = dep.pChartViewTemplateService,
                coreUtil = dep.coreUtil;

            function isIncludedInFilter(template) {
                if (!vm.searchKeyword) {
                    return true;
                }
                var toUpperKeyword = vm.searchKeyword.toUpperCase().trim();
                var toUpperName = template.name.toUpperCase().trim();
                return _.includes(toUpperName, toUpperKeyword);
            }

            function showProductList(template) {
                if (template.filterDescription && template.filterDescription.primaryProduct) {
                    var arr = [template.filterDescription.primaryProduct.Symbol];
                    template.filterDescription.myProducts.forEach(function (product) {
                        if (arr.indexOf(product.Symbol) < 0) {
                            arr.push(product.Symbol);
                        }
                    });
                    return arr.join(',');
                }
                return "-";
            }

            function sortingName(a, b) {
                if (a.name != null && b.name != null) {
                    return coreUtil.sortName(a.name, b.name);
                }
                return 0;
            }

            function sortingProduct(a, b) {
                if (a && b) {
                    return coreUtil.sortName(showProductList(a), showProductList(b));
                }
                return 0;
            }

            function sortingDate(a, b) {
                var dateA = a.updateTime || "";
                var dateB = b.updateTime || "";
                return dateA.localeCompare(dateB);
            }

            function getViewTemplates() {
                if (!pChartViewTemplateService.viewTemplates) {
                    return [];
                }
                var list = pChartViewTemplateService.viewTemplates.filter(function (i) {
                    return isIncludedInFilter(i);
                });

                for (var prop in vm.sorting) {
                    if (vm.sorting[prop] === "none") {
                        continue;
                    }
                    switch (prop) {
                        case "Name":
                            list.sort(function (a, b) {
                                var order = vm.sorting[prop] === "d" ? -1 : 1;
                                return order * sortingName(a, b);
                            });
                            break;
                        case "Products":
                            list.sort(function (a, b) {
                                var order = vm.sorting[prop] === "d" ? -1 : 1;
                                return order * sortingProduct(a, b);
                            });
                            break;
                        case "Date":
                            list.sort(function (a, b) {
                                var order = vm.sorting[prop] === "d" ? -1 : 1;
                                return order * sortingDate(a, b);
                            });
                            break;
                    }
                }

                return list;
            }

            function selectTemplate(template) {
                vm.selectedTemplate = template;
            }

            function selectAndLoadTemplate(template) {
                selectTemplate(template);
                applySelection();
            }

            function isSelectedTemplate(template) {
                return template === vm.selectedTemplate;
            }

            function applySelectionViaWizard() {
                return tool.openModalByDefinition('p.chart.SaveWorkspaceController', {
                    viewTemplate: vm.selectedTemplate,
                    templateMode: 'LOAD'
                }).result.then(function () {
                    vm.onSelectionApplied();
                });
            }

            function applySelection() {
                pChartViewTemplateService.setAsCurrentTemplate(vm.selectedTemplate);
                vm.onSelectionApplied();
            }

            vm.onSelectionApplied = function () {

            }

            function showSorting(col, type) {
                return vm.sorting[col] !== "none" && vm.sorting[col] === type;
            }

            function sortColumn(col) {
                if (vm.sorting[col] === "none") {
                    vm.sorting[col] = "a";
                } else if (vm.sorting[col] === "a") {
                    vm.sorting[col] = "d";
                } else if (vm.sorting[col] === "d") {
                    vm.sorting[col] = "a";
                }

                for (var prop in vm.sorting) {
                    if (prop !== col) {
                        vm.sorting[prop] = "none";
                    }
                }
            }

            function toggleDefaultTemplate(template) {
                pChartViewTemplateService.toggleDefaultTemplate(template);
            }

            function isDefaultWorkspace(template) {
                return pChartViewTemplateService.getDefaultTemplateId() == template.id;
            }

            tool.setVmProperties({
                isDefaultWorkspace: isDefaultWorkspace,
                toggleDefaultTemplate: toggleDefaultTemplate,
                sortColumn: sortColumn,
                showSorting: showSorting,
                applySelectionViaWizard: applySelectionViaWizard,
                selectTemplate: selectTemplate,
                selectAndLoadTemplate: selectAndLoadTemplate,
                isSelectedTemplate: isSelectedTemplate,
                selectedTemplate: null,
                applySelection: applySelection,
                showProductList: showProductList,
                removeTemplate: pChartViewTemplateService.removeTemplate,
                editTemplate: pChartViewTemplateService.editTemplate,
                getOrRefreshViewTemplates: pChartViewTemplateService.getOrRefreshViewTemplates,
                getViewTemplates: getViewTemplates
            });

            tool.initialize(function () {
                pChartViewTemplateService.getOrRefreshViewTemplates();
            });

            vm.onSelectionApplied = function () {
                if (vm.onTemplateLoaded) {
                    vm.onTemplateLoaded();
                }
            }
        })
    .defineDirectiveForE('agmp-chart-workspace-table',
        [],
        function () {
            return {
                controller: "p.chart.WorkSpaceTableController",
                templateUrl: '/App/pages/chart/chart.workspaceTable.html'
            };
        },
        {
            onTemplateLoaded: '&?',
            sorting:'='
        });