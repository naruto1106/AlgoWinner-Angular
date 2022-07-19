agmNgModuleWrapper("agms.tgps")
    .defineControllerAsPopup("s.tgps.ColumnFilterController",
        {
            templateUrl: '/App/shared/tgps/tgps.columnFilter.html',
            windowClass: 'default-modal tgps-fundamental-filter-popup'
        },
        ['productListOptionForPosition'],
        function (vm, dep, tool) {
            
            function closePanel() {
                vm.uibClosePanel(dep.productListOptionForPosition);
            }

            function onChange(item) {                                
                var isNoneChecked = _.all(dep.productListOptionForPosition.columns, function(i) {
                    return !i.checked;
                });

                if (isNoneChecked) {
                    item.checked = true;
                }
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    closePanel:closePanel,
                    onChange: onChange,
                    productListOptionForPosition: dep.productListOptionForPosition                    
                });
            });
        });