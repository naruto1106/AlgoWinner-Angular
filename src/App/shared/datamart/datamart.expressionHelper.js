agmNgModuleWrapper('agms.datamart')
    // this should have been a service
    .defineService("sDatamartExpressionHelperService", [],
        function (serviceObj, dep, tool) {
            var visibilityFuncDict = [];
            var selectionFilterFuncDict = [];

            function addToDictionary(req) {
                if (!req) {
                    return;
                }
                if (req.selectionFilterId && req.selectionFilter) {
                    selectionFilterFuncDict[req.selectionFilterId] = req.selectionFilter;
                }
                if (req.visibilityId && req.visibility) {
                    visibilityFuncDict[req.visibilityId] = req.visibility;
                }
            }
            function getEssentialReq(req) {
                if (!req) {
                    return null;
                }
                return {
                    selectionFilterId: req.selectionFilterId,
                    visibilityId: req.visibilityId
                };
            }
            
            function generateOptionValue(title, options, defaultIndex, req) {
                defaultIndex = defaultIndex || 0;
                addToDictionary(req);
                var essentialReq = getEssentialReq(req);
                return {
                    type: "select",
                    title: title,
                    value: options[defaultIndex],
                    options: options,
                    req: essentialReq
                }
            }
            
            function generateCheckboxCollectionValue(title, selections, req) {
                var options = [];
                selections.forEach(function (u) {
                    options.push({ checked: false, propertyName: u });
                });
                addToDictionary(req);
                var essentialReq = getEssentialReq(req);
                return {
                    type: "checkboxes",
                    title: title,
                    options: options,
                    req: essentialReq
                }
            }
            
            tool.setServiceObjectProperties({
                defaultTriggerPeriod: ["1 Min Ago", "1 Hour Ago", "Today", "Last 3 days", "Last 1 Week"],
                generateOptionValue: generateOptionValue,
                generateCheckboxCollectionValue: generateCheckboxCollectionValue                              
            });
        }
    );