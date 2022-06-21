agmNgModuleWrapper('agms.trading')
    .defineController('s.trading.PerformancePanelController', [],
        function(vm) {

            vm.colorQualityStyle = colorQualityStyle;
            vm.goodOkBadColor = goodOkBadColor;

            function goodOkBadColor(val, okLowerBound, okUpperBound) {
                var colorSets = ["#F00", "#F80", "#690"];
                if (val < okLowerBound) {
                    return {
                        color: colorSets[0]
                    }
                } else if (val > okUpperBound) {
                    return {
                        color: colorSets[2]
                    }
                } else {
                    return {
                        color: colorSets[1]
                    }
                }
            };

            function colorQualityStyle(val, min, max) {
                var score = (val - min) / (max - min);
                var colorSets = ["#F00", "#F80", "#690", "#390", "#093"];
                if (score > 0.99) {
                    score = 0.99;
                }
                if (score < 0) {
                    score = 0;
                }
                return {
                    color: colorSets[Math.floor(score * 5)]
                };
            }
        })
    .defineDirectiveForE('agms-trading-performance-panel', [],
        function() {
            return {
                controller: "s.trading.PerformancePanelController",
                templateUrl: '/App/shared/trading/trading.performancePanel.html'
            };
        }, {
            content: "="
        });