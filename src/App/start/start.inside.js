var startDependencies = [
    'agmp.start.route',
    'agm.templates',
    'ui.bootstrap',
    'firebase',
    'infinite-scroll',
    'zInfiniteScroll',
    'highcharts-ng',
    'internationalPhoneNumber',
    'angulartics',
    'angulartics.google.analytics',
    'angulartics.scroll',
    'agms.product',
    'agms.header',
    'agms.textProcessing',
    'agms.account',
    'agms.activity',
    'agms.trading',
    'agms.header',
    'agms.guide',
    "agmp.mobileWeb",
    'ngRaven'
];
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}

// startDependencies are defined somewhere else
agmNgModuleWrapper('agmp.start.inside', startDependencies)
    .defineController('InsideRootController',
    [
        'sActivityPriceAlertNotificationService',
        'sDroidHelperService',
        'sTradingNotificationService',
        'commonHeaderModeService',
        'commonScreenResizerService',
        'commonPixelPositioningSystemService',
        "commonScreenResizerService",
        "pMobileWebService",
        "coreUserStateService"
    ],
    function (vm, dep, tool) {
        var coreDataStorageService = dep.coreDataStorageService;
        
        tool.initialize(function() {
            tool.setVmProperties({
                rootVariable: true,
                commonScreenResizerService: dep.commonScreenResizerService,
                pMobileWebService: dep.pMobileWebService,
                coreUserStateService: dep.coreUserStateService
            });

            //set token if there is one in url
            var path = dep.$location.absUrl();
            var tokenInUrl = path.split("?token=")[1] || "";
            if (tokenInUrl) {
                coreDataStorageService.set("token", tokenInUrl);
            }

            dep.sActivityPriceAlertNotificationService.start();
            dep.sTradingNotificationService.start();
            dep.commonPixelPositioningSystemService.start();
            dep.sDroidHelperService.start();
            var token = dep.coreDataStorageService.get("token");
            dep.coreAllSignalRService.populateAllHubTokens(token);

            vm.bodyClass = function () {
                var obj = [];
                
                if (dep.commonScreenResizerService.isShowingActualMobileDevice()) {
                    obj.push('actual-size-mobile');
                } else {
                    obj.push('ignore-media');
                }
                obj.push('mode-' + dep.commonHeaderModeService.getHeaderVisibilityMode());
                return obj;
            }
        });
    })
    .defineServiceStrict('sharedFakeProgressService',
    [],
    function (serviceObj, dep, tool) {

        tool.setServiceObjectProperties({
            generateFakeProgress: generateFakeProgress
        });

        function generateFakeProgress() {
            var fakeProgress = {};
            fakeProgress.progress = 0;
            fakeProgress.progressSpeed = 1;

            fakeProgress.startProgress = startProgress;
            fakeProgress.finishProgress = finishProgress;

            var newInterval = tool.interval(function () {
                if (fakeProgress.isProgressing) {
                    fakeProgress.progress += (100 - fakeProgress.progress) * fakeProgress.progressSpeed / 10;
                }
            },
                100);

            function startProgress(speed) {
                fakeProgress.progress = 0;
                fakeProgress.isProgressing = true;
                fakeProgress.progressSpeed = speed || 1;
            }

            function finishProgress() {
                tool.timeout(function () {
                    fakeProgress.progress = 100;
                    tool.timeout(function () {
                        fakeProgress.isProgressing = false;
                        tool.cancelInterval(newInterval);
                    },
                        500);
                },
                    500);
            }

            return fakeProgress;
        };
    });
