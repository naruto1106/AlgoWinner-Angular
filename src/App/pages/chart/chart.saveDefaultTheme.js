agmNgModuleWrapper('agmp.chart')
    .defineControllerAsPopup('p.chart.SaveDefaultThemeController', {
        templateUrl: '/App/pages/chart/chart.saveDefaultTheme.html',
        windowClass: "default-modal"
    },
        ['pChartThemeService', 'defaultTheme'],
        function (vm, dep, tool) {
            function saveDefaultTheme() {
                vm.uibClosePanel({
                    theme: vm.selectedDefaultTheme,
                    applyToCurrent: vm.applyToCurrent
                });
            }

            tool.setVmProperties({
                saveDefaultTheme: saveDefaultTheme,
                selectedDefaultTheme: dep.defaultTheme,
                applyToCurrent: true
            });
        });