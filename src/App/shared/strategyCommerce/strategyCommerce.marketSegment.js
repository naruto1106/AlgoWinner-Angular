agmNgModuleWrapper('agms.strategyCommerce')
    .defineController('s.strategyCommerce.MarketSegmentController', [],
        function(vm, dep) {
            var coreConfigService = dep.coreConfigService;

            vm.assetClasses = coreConfigService.StrategyCreation.AssetClasses.split(',');
            vm.tradeVenues = coreConfigService.StrategyCreation.TradeVenues.split(',');
            vm.tradingDirections = ['Long Only', 'Long and Short'];

            if (!vm.strategyModel.Market) {
                vm.strategyModel.Market = {
                    AssetClass: vm.assetClasses[0],
                    TradeVenueLoc: vm.tradeVenues[0],
                    TradingDirection: vm.tradingDirections[1]
                };
            } else {
               
            }

            vm.checkAssetClasses = function() {
                if (vm.strategyModel.Market && vm.strategyModel.Market.TradeVenueLoc) {
                    if (vm.strategyModel.Market.TradeVenueLoc === "SG") {
                        vm.assetClasses = ['Stocks & ETFs'];
                    } else if (vm.strategyModel.Market.TradeVenueLoc === "HK") {
                        vm.assetClasses = ['Index Futures', 'Index Futures CFD'];
                    } else {
                        vm.assetClasses = ["Stocks & ETFs"];                        
                    }
                    vm.strategyModel.Market.AssetClass = vm.assetClasses[0];
                }
            }
            vm.checkAssetClasses();
        })
    .defineDirectiveForE('agms-strategy-commerce-market-segment', [],
        function() {
            return {
                controller: "s.strategyCommerce.MarketSegmentController",
                templateUrl: '/App/shared/strategyCommerce/strategyCommerce.marketSegment.html',
            };
        }, {
            strategyModel: "=",
            nextFunc: "&",
            prevFunc: "&",
            nextLabel: "=",
            prevLabel: "="
        });