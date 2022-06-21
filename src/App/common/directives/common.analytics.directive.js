agmNgModuleWrapper('agm.common')
    .defineDirectiveForA('agmc-analytics-timestamp', [], function(dep, tool) {
        var $window = dep.$window;
        return {
            priority: -2,
            link: function(scope, el, attr) {
                var eventType = attr.analyticsOn || 'click';
                angular.element(el[0]).bind(eventType, function() {
                    if ($window.ga) {
                        $window.ga('set', 'dimension2', moment().toISOString());
                        $window.ga('set', 'dimension4', "");
                        tool.log("Analytics: Setting Timestamp");
                    }
                });
            }
        };
    })
    .defineDirectiveForA('agmc-analytics-custom-dimension', [], function(dep, tool) {
        var $window = dep.$window;
        return {
            priority: -1,
            link: function(scope, el, attr) {
                var eventType = attr.analyticsOn || 'click';
                angular.element(el[0]).bind(eventType, function() {
                    if ($window.ga) {
                        $window.ga('set', scope.agmcAnalyticsCustomDimension, attr.dimensionValue);
                        tool.log("Analytics: Setting Custom Dimension - " + scope.agmcAnalyticsCustomDimension);
                    }
                });
            }
        };
    }, {
        agmcAnalyticsCustomDimension: "@",
        dimensionValue: "@"
    });