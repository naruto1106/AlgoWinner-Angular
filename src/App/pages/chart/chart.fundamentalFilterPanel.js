agmNgModuleWrapper('agmp.chart')
    .defineControllerAsPopup('p.chart.FundamentalFilterPanelController', {
        templateUrl: '/App/pages/chart/chart.fundamentalFilterPanel.html',
        windowClass: 'smaller-modal'
    }, [
        'fundamentalsKind', 'includedFundamentals'
    ],
        function (vm, dep, tool) {
            var fundamentalsKind = dep.fundamentalsKind,
                includedFundamentals = dep.includedFundamentals;

            vm.selectedFundamentals = null;
            vm.fundamentalsKind = fundamentalsKind;

            fundamentalsKind.forEach(function (f) {
                if (includedFundamentals) {
                    f.added = includedFundamentals.filter(function (af) {
                        return af.name === f.name;
                    }).length > 0;
                }
            });

            vm.addToFundamentals = function (fundamental) {
                if (!vm.hasError) {
                    vm.uibClosePanel(fundamental);
                }
            };

            vm.selectFundamental = function (fundamental) {
                vm.selectedFundamentals = fundamental;
            };
        }
    );