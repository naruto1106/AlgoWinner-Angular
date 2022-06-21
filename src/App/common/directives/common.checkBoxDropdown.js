agmNgModuleWrapper('agm.common')
    .defineController("common.CheckBoxDropdownController", [],
        function (vm, dep, tool) {
            var checkedItemsOnOpen = [];
            vm.checkBoxName = "All";

            function setLabelName(items) {
                reevaluateAllCondition();
                if (vm.allOptionsSelected) {
                    vm.checkBoxName = "All";
                } else if (items) {
                    if (items.length > 1) {
                        vm.checkBoxName = items.length + " selected";
                    } else if (items.length === 1) {
                        vm.checkBoxName = vm.displayFunc(items[0]);
                    }
                }
            }

            function reevaluateSelections() {
                vm.selectedItems = vm.dropdownItems.filter(function (i) {
                    return i.checked;
                });
                vm.isAll = vm.selectedItems.length = vm.dropdownItems.length;
            }

            function getCheckboxName() {
                setLabelName(_.filter(vm.dropdownItems, function (item) { return item.checked; }));
                return vm.checkBoxName;

            }
            function reevaluateAllCondition() {
                var isAllChecked = _.all(vm.dropdownItems, function (i) {
                    return i.checked;
                });
                if (isAllChecked) {
                    vm.allOptionsSelected = true;
                } else {
                    vm.allOptionsSelected = false;
                }
            }
            function onChange(item) {
                var isNoneChecked = _.all(vm.dropdownItems, function(i) {
                    return !i.checked;
                });
                reevaluateAllCondition();
                // impose a restriction where at least one item has to be checked. 
                // if this unchecking causes all items to be unchecked, check the item back

                if (isNoneChecked) {
                    item.checked = true;
                }
                reevaluateSelections();
            }

            function onAllOptionsToggled() {
                vm.dropdownItems.forEach(function (item) {
                    item.checked = vm.allOptionsSelected;
                });
                if (!vm.allOptionsSelected) {
                    vm.dropdownItems[0].checked = true;
                }
                reevaluateSelections();
            }

            function onToggle(open) {
                if (open) {
                    checkedItemsOnOpen = _.filter(vm.dropdownItems, function (item) { return item.checked; });
                } else {
                    var checkedItemsOnClose = _.filter(vm.dropdownItems, function (item) { return item.checked; });
                    if (!(_.difference(checkedItemsOnClose, checkedItemsOnOpen).length === 0
                        && _.difference(checkedItemsOnOpen, checkedItemsOnClose).length === 0)) {
                        vm.onItemCheckedStateChanged();
                    }
                }
            }

            tool.initialize(function () {
                if (_.all(vm.dropdownItems, function (i) {
                        return i.checked;
                })) {
                    vm.allOptionsSelected = true;
                } else {
                    vm.allOptionsSelected = false;
                }

                tool.setVmProperties({
                    onToggle: onToggle,
                    onAllOptionsToggled: onAllOptionsToggled,
                    onChange: onChange,
                    getCheckboxName: getCheckboxName
                });

            });
        }
    )
    .defineDirectiveForE('agmc-check-box-dropdown', [], function () {
        return {
            controller: "common.CheckBoxDropdownController",
            templateUrl: '/App/common/directives/common.checkBoxDropdown.html'
        };
    }, {
        onItemCheckedStateChanged: "&",
        dropdownItems: "=",
        selectedItems: '=?',
        isAll: '=?',
        displayFunc: "="
    });