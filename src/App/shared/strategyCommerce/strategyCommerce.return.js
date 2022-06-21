agmNgModuleWrapper('agms.strategyCommerce')
    .defineController('s.strategyCommerce.ReturnController', [],
        function(vm) {

            function setReturnValue() {
                vm.returnValue = [];

                if (vm.content.LatestAnnualReturnPct != null) {
                    vm.returnValue = [
                        {
                            Name: "1 Mo.",
                            Value: vm.content.LatestMonthlyReturnPct
                        }, {
                            Name: "3 Mo.",
                            Value: vm.content.LatestQuarterlyReturnPct
                        }, {
                            Name: "6 Mo.",
                            Value: vm.content.LatestSemiAnnualReturnPct
                        }, {
                            Name: "1 Yr.",
                            Value: vm.content.LatestAnnualReturnPct
                        }
                    ];
                } else if (vm.content.LatestSemiAnnualReturnPct != null) {
                    vm.returnValue = [
                        {
                            Name: "2 Wk.",
                            Value: vm.content.LatestTwoWeekReturnPct
                        }, {
                            Name: "1 Mo.",
                            Value: vm.content.LatestMonthlyReturnPct
                        }, {
                            Name: "3 Mo.",
                            Value: vm.content.LatestQuarterlyReturnPct
                        }, {
                            Name: "6 Mo.",
                            Value: vm.content.LatestSemiAnnualReturnPct
                        }
                    ];
                } else {
                    vm.returnValue = [
                        {
                            Name: "1 Wk.",
                            Value: vm.content.LatestWeeklyReturnPct
                        }, {
                            Name: "2 Wk.",
                            Value: vm.content.LatestTwoWeekReturnPct
                        }, {
                            Name: "1 Mo.",
                            Value: vm.content.LatestMonthlyReturnPct
                        }, {
                            Name: "3 Mo.",
                            Value: vm.content.LatestQuarterlyReturnPct
                        }
                    ];
                }
            }

            setReturnValue();
        })
    .defineDirectiveForE('agms-strategy-commerce-return', [],
        function() {
            return {
                restrict: 'E',
                controller: "s.strategyCommerce.ReturnController",
                templateUrl: '/App/shared/strategyCommerce/strategyCommerce.return.html'
            };
        }, {
            content: "=",
            strategyCreatedDate: "="
        });