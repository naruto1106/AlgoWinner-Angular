agmNgModuleWrapper('agmp.chart')
    .defineControllerAsPopup('p.chart.FundamentalFilterPanelController', {
            templateUrl: '/App/pages/chart/chart.fundamentalFilterPanel.html',
            windowClass: 'smaller-modal'
        }, [
            'fundamentalsKind', 'includedFundamentals'
        ],
        function(vm, dep, tool) {
            var fundamentalsKind = dep.fundamentalsKind,
                includedFundamentals = dep.includedFundamentals;

            vm.categories = ['All'];
            vm.selectedFundamentals = null;
            vm.fundamentalsKind = fundamentalsKind;
            vm.setCategory = setCategory;
            vm.getListedFundamentals = getListedFundamentals;

            fundamentalsKind.forEach(function(f) {
                if (includedFundamentals) {
                    f.added = includedFundamentals.filter(function (af) {
                        return af.name === f.name;
                    }).length > 0;
                }

                if (!_.includes(vm.categories, f.category)) {
                    vm.categories.push(f.category);
                }
            });

            vm.addToFundamentals = function(fundamental) {
                if (!vm.hasError) {
                    vm.uibClosePanel(fundamental);
                }
            };

            vm.selectFundamental = function(fundamental) {
                vm.selectedFundamentals = fundamental;
            };

            function setCategory(category) {
                vm.selectedCategory = category;
                var list = getListedFundamentals();

                var fundamental1 = list.filter(function(f) {
                    return !f.added;
                })[0];
                vm.selectFundamental(fundamental1);
            }

            setCategory(vm.categories[0]);

            function getListedFundamentals() {
                vm.fundamentalsKind = _.sortBy(vm.fundamentalsKind, function(s) {
                    return s.displayName;
                });
                if (vm.selectedCategory === 'All') {
                    return vm.fundamentalsKind;
                } else {
                    return vm.fundamentalsKind.filter(function(f) {
                        return f.category === vm.selectedCategory;
                    });
                }
            }
        }
    );