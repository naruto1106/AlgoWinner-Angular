agmNgModuleWrapper('agms.datamart')
    .defineController("s.datamart.FilterSelectorController", ['sDatamartFundamentalDataService'],
        function (vm, dep, tool) {

            var sDatamartFundamentalDataService = dep.sDatamartFundamentalDataService;

            function canBeExpanded(item) {
                return item.subCombinations;
            }

            function isExpanded(item) {
                return item.isSetToExpand && canBeExpanded(item);
            }            

            function toggleExpanded(item) {
                item.isSetToExpand = !item.isSetToExpand;
            }                

            function reevaluateList() {

                sDatamartFundamentalDataService.reevaluateSubList(vm.branch);
            }

            function recursivelyClearItem(item) {
                if (item.subCombinations) {
                    item.subCombinations.forEach(function (subItem) {
                        recursivelyClearItem(subItem);
                    });
                }
                item.checked = false;
            }
            function evaluateAfterCheck(item) {
                if (item.subCombinations) {
                    if (!vm.checkSubcombinations) {
                        var hasChecked = false;
                        item.subCombinations.forEach(function(subItem) {
                            hasChecked = hasChecked || subItem.checked;
                        });
                        if (!hasChecked) {
                            item.subCombinations[0].checked = true;
                        }
                    } else {
                        item.subCombinations.forEach(function (subItem) {
                            subItem.checked = true;
                        });
                    }
                }
            }

            function showDescription(dataMart) {
                if (dataMart.IsLocked) return;
                tool.openModalByDefinition('s.datamart.EventDetailsPopupController', {
                    feed: dataMart
                });
            }

            function onCheckboxChanged(item) {
                item.indeterminate = false;
                if (item.checked) {
                    item.isSetToExpand = true;
                    evaluateAfterCheck(item);
                } else {
                    item.isSetToExpand = false;
                    recursivelyClearItem(item);
                }
                reevaluateList();
                if (vm.onSelectionChanged) {
                    vm.onSelectionChanged();
                }
            }
            tool.setVmProperties({
                canBeExpanded: canBeExpanded,
                onCheckboxChanged: onCheckboxChanged,
                isExpanded: isExpanded,
                showDescription:showDescription,
                toggleExpanded: toggleExpanded,
                opened:true
            });

            tool.onRendered(function() {
                vm.branch.checked = true;
                if (vm.isSelectorOpen) {
                    vm.opened = vm.isSelectorOpen;
                }
            });

            tool.watch("vm.isSelectorOpen", function () {
                vm.opened = vm.isSelectorOpen;
            });
            tool.watch('vm.branch', function () {
                reevaluateList();
            }, false);
        })
    .defineDirectiveForE('agms-datamart-filter-selector', [], function () {
        return {
            controller: "s.datamart.FilterSelectorController",
            templateUrl: '/App/shared/datamart/datamart.filterSelector.html'
        };
    }, {
        branch: '=',
        isSelectorOpen: "=?",
        isInvalidEventFunc: '=',
        onSelectionChanged: '&?',
        checkSubcombinations: "=?"
    });