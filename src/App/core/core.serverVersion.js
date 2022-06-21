agmNgModuleWrapper('agm.core')
    .defineServiceStrict('coreServerVersion',
        ['coreServerVersionConstants', 'coreDataStorageService'],
        function(serviceObj, dep, tool) {

            var coreServerVersionConstants = dep.coreServerVersionConstants,
                coreDataStorageService = dep.coreDataStorageService;

            serviceObj.getCurrentVersion = function() {
                var version = coreDataStorageService.get("version");
                return version ? version : '0.0.0.0';
            };
            serviceObj.setNewVersion = function(newVersion) {
                var version = coreDataStorageService.get("version");

                if (newVersion === version) {
                    return;
                }
                coreDataStorageService.set("version", newVersion);
            };
            serviceObj.setNewVersion(coreServerVersionConstants.ServerVersion);
        }
    );