agmNgModuleWrapper('agm.common')
    .defineService('commonItemUpdateService', [],
    function (serviceObj, dep) {
        serviceObj.isLaterTimestamp = isLaterTimestamp;

        function isLaterTimestamp(incoming, existing) {
            if (!existing.RetrievedAt || new Date(incoming.RetrievedAt) > new Date(existing.RetrievedAt)) {
                existing.RetrievedAt = incoming.RetrievedAt;
                return true;
            }
            return false;
        }
    });
