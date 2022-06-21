agmNgModuleWrapper('agmp.chart')
    .defineService("pChartCmsContentLoader", ['sContentfulWrapper'],
        function (serviceObj, dep, tool) {

            var coreConfigService = dep.coreConfigService,
                sContentfulWrapper = dep.sContentfulWrapper;


            var client = sContentfulWrapper.getContentful().createClient({
                // This is the space ID. A space is like a project folder in Contentful terms
                space: coreConfigService.ContentfulCms.ChartSpaceId,
                // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
                accessToken: coreConfigService.ContentfulCms.ChartToken
            });

            function getFundamentals() {
                var deferred = tool.defer();
                client.getEntries({
                    'content_type': 'chartFundamentalsDescription'
                }).then(function (entry) {
                    var list = sContentfulWrapper.generateList(entry.items);
                    list.forEach(function (fundamental) {
                        if (fundamental.category_new) {
                            fundamental.category = fundamental.category_new.name;
                        }
                    });
                    deferred.resolve(list);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            }

            function getStudies() {
                var deferred = tool.defer();
                client.getEntries({
                    'content_type': 'chartStudiesDescription'
                }).then(function (entry) {
                    var list = sContentfulWrapper.generateList(entry.items);
                    deferred.resolve(list);
                }, function () {
                    deferred.reject();
                });
                return deferred.promise;
            }

            serviceObj.getFundamentals = getFundamentals;
            serviceObj.getStudies = getStudies;
        }
    )