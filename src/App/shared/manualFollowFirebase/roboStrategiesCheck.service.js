agmNgModuleWrapper("agms.manualFollowFirebase")
    .defineService("sRoboStrategiesService", [],
    function (serviceObj, dep, tool) {
        tool.setServiceObjectProperties({
            getRoboStrategyIds: getRoboStrategyIds
        });

        var roboStrategyIds = null;
        var coreServerCommunicationService = dep.coreServerCommunicationService;

        function getRoboStrategyIds() {
            return dep.$q(function (resolve, reject) {
                if (!roboStrategyIds) {
                    coreServerCommunicationService.genGetFunctionWithNVar('/stgapi/v1/Strategy/GetRobotStrategyIds')().then(
                        function (res) {
                            roboStrategyIds = res.data;
                            resolve(roboStrategyIds);
                        },
                        function () {
                            reject();
                        });
                } else {
                    resolve(roboStrategyIds);
                }
            });
        }
    });
