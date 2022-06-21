agmNgModuleWrapper('agms.chart')
    .defineService("pChartFilterDescriptionService",
        [],
        function (serviceObj, dep, tool) {
            tool.setServiceObjectProperties({
                getIncludedProducts: function () {
                    return this.myProducts.filter(function (p) {
                        return p.included;
                    });
                },
                isComparisonMode: function () {
                    return this.myProducts && this.myProducts.length > 1;
                },
                initialize: function () {
                    tool.setServiceObjectProperties({
                        myProducts: [],
                        datamart: [],
                        addedStudies: [],
                        primaryProduct: null,
                        normalizeToPercentage: false,
                        eventVisibility: {},
                        showUnadjusted: false
                    });
                }
            });
        });