agmNgModuleWrapper('agm.common')
    .defineController("common.CheckBoxDropdownTabsController", [],
        function (vm, dep, tool) {
            var checkedItemsOnOpen = [];
            vm.checkBoxName = "All";
            var selectedRadio = 'Sector';
            var selectedRadioIndex = 0;

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
                vm.selectedItems = vm.dropdownItems[selectedRadioIndex].data.filter(function (i) {
                    return i.checked;
                });                
                vm.isAll = vm.selectedItems.length = vm.dropdownItems[selectedRadioIndex].data.length;
            }

            function getCheckboxName() {                
                setLabelName(_.filter(vm.dropdownItems[selectedRadioIndex].data, function (item) { return item.checked; }));
                return vm.checkBoxName;

            }
            function reevaluateAllCondition() {
                var isAllChecked = _.all(vm.dropdownItems[selectedRadioIndex].data, function (i) {
                    return i.checked;
                });
                if (isAllChecked) {
                    vm.allOptionsSelected = true;
                } else {
                    vm.allOptionsSelected = false;
                }
            }
            
            function onClickRadio(item, index) {
                vm.selectedRadio = item.name;
                selectedRadioIndex = index;                
            }
            
            function onChange(item) {
                var isNoneChecked = _.all(vm.dropdownItems[selectedRadioIndex].data, function(i) {
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
                vm.dropdownItems[selectedRadioIndex].data.forEach(function (item) {
                    item.checked = vm.allOptionsSelected;
                });
                if (!vm.allOptionsSelected) {
                    vm.dropdownItems[selectedRadioIndex].data[0].checked = true;
                }
                reevaluateSelections();
            }

            function onToggle(open) {
                if (open) {
                    checkedItemsOnOpen = _.filter(vm.dropdownItems[selectedRadioIndex].data, function (item) { return item.checked; });
                } else {
                    var checkedItemsOnClose = _.filter(vm.dropdownItems[selectedRadioIndex].data, function (item) { return item.checked; });
                    if (!(_.difference(checkedItemsOnClose, checkedItemsOnOpen).length === 0
                        && _.difference(checkedItemsOnOpen, checkedItemsOnClose).length === 0)) {
                        vm.onItemCheckedStateChanged();
                    }
                }
            }

            tool.initialize(function () {
                if (_.all(vm.dropdownItems[selectedRadioIndex].data, function (i) {
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
                    onClickRadio: onClickRadio,
                    getCheckboxName: getCheckboxName,
                    selectedRadio: selectedRadio,
                    fundamentalObj: vm.fundamental
                });

            });
        }
    )
    .defineDirectiveForE('agmc-check-box-dropdown-tabs', [], function () {
        return {
            controller: "common.CheckBoxDropdownTabsController",
            templateUrl: '/App/common/directives/common.checkBoxDropdownTabs.html'
        };
    }, {
        onItemCheckedStateChanged: "&",
        dropdownItems: "=",
        fundamental: "=",
        selectedItems: '=?',
        isAll: '=?',
        displayFunc: "="
    });