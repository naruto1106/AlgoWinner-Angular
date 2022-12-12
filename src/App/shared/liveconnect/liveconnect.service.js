agmNgModuleWrapper('agms.liveconnect',
[
    ]).ngApp.run(['coreConfigService', 'sLiveConnectService', '$q', function (coreConfigService, sLiveConnectService, $q) {
        var $q = $q;
        var tigerFirebaseConfig = coreConfigService.TigerFirebase;
        var futuFirebaseConfig = coreConfigService.FutuFirebase;

        if (tigerFirebaseConfig) {
            firebase.initializeApp(tigerFirebaseConfig);
            sLiveConnectService.loginTigerFirebase();
        }

        if (futuFirebaseConfig) {
            var futuFb = firebase.initializeApp(futuFirebaseConfig, "futuFb");
            sLiveConnectService.loginFutuFirebase(futuFb);
        }
}]);