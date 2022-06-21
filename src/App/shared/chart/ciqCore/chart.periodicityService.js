agmNgModuleWrapper('agms.chart')
.defineService("pChartPeriodicityService", [],
        function (serviceObj, dep, tool) {
            function barSizeToSeconds(barSize) {
                return {
                    "1 Min": 60,
                    "5 Min": 5 * 60,
                    "10 Min": 10 * 60,
                    "15 Min": 15 * 60,
                    "30 Min": 30 * 60,
                    "1 H": 3600,
                    "2 H": 2 * 3600,
                    "1 D": 24 * 3600,
                    "1 W": 7 * 24 * 3600,
                    "1 M": 30 * 24 * 3600,
                }[barSize];
            }

            function getPeriodicity(barSize) {
                switch (barSize) {
                    case '1 Min':
                        return [1, 1];
                    case '5 Min':
                        // return [1, 5];
                        // while we still don't have native 5 min bar, we roll 5 1-minutes bar into one
                        return [5, 1];
                    case '10 Min':
                        // return [1, 10];
                        // while we still don't have native 10 min bar, we roll 10 1-minutes bar into one                        
                        return [10, 1];
                    case '15 Min':
                        // return [1, 15];
                        // while we still don't have native 15 min bar, we roll 15 1-minutes bar into one                        
                        return [15, 1];
                    case '30 Min':
                        return [1, 30];
                    case '1 H':
                        // return [1, 60];
                        // while we still don't have native hour bar, we roll 2 30-minutes bar into one                        
                        return [2, 30];
                    case '2 H':
                        // return [1, 120];
                        // while we still don't have native hour bar, we roll 4 30-minutes bar into one                        
                        return [4, 30];
                    case '1 D':
                        return [1, 'day'];
                    case '1 W':
                        return [1, 'week'];
                    case '1 M':
                        return [1, 'month'];
                }
                return '';
            }

            tool.setServiceObjectProperties({
                barSizeToSeconds: barSizeToSeconds,
                getPeriodicity: getPeriodicity
            });
        }
    );
