agmNgModuleWrapper("agms.tgps")
    .defineControllerAsPopup("s.tgps.riskAnalyzerConstructPortfolioController", {
            templateUrl: '/App/shared/tgps/tgps.riskAnalyzerConstructPortfolio.html',
            windowClass: 'default-modal tgps-risk-analyze-popup tgps-risk-analyze-construct-portfolio-popup'
        }, ['mode', 'portfolio', 'sProductService'],
        function (vm, dep, tool) {

            var sProductService = dep.sProductService;
            vm.mode = dep.mode;

            function closePanel() {
                vm.uibClosePanel();
            }

            function addRow() {
                var portfolioJSON = {
                    Symbol: 'AAPL',
                    Market: 'US',
                    Direction: 'Long',
                    Amount: 0,
                };
                vm.constructPortfolios.push(portfolioJSON);
            }

            function clearPortfolio() {
                vm.constructPortfolios = [];
                addRow();
            }

            function removeRow(index) {
                vm.constructPortfolios.splice(index, 1);
            }

            function submitPortfolio() {
                vm.uibClosePanel(vm.constructPortfolios);
            }

            function searchProducts(keyword) {
                return sProductService.SearchPlottableProduct(keyword).then(function (res) {
                    return res.data.Data;
                });
            }

            function showProduct(item, index) {
                vm.constructPortfolios[index].Symbol = item.Symbol;
                vm.constructPortfolios[index].Market = item.TradeVenueLoc;
            }

            function setDefaultValues() {
                if (dep.portfolio.length > 0) {
                    return dep.portfolio;
                } else {
                    return [{
                        Symbol: 'AAPL',
                        Market: 'US',
                        Direction: 'Long',
                        Amount: 0,
                    }]
                }
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    closePanel: closePanel,
                    clearPortfolio: clearPortfolio,
                    addRow: addRow,
                    removeRow: removeRow,
                    searchProducts: searchProducts,
                    showProduct: showProduct,
                    direction: ['Long', 'Short'],
                    submitPortfolio: submitPortfolio,
                    constructPortfolios: setDefaultValues()
                });
            });
        });