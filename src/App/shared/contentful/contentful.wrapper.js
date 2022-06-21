agmNgModuleWrapper("agms.contentful", [])
    .defineService("sContentfulWrapper", [], function (serviceObj, dep, tool) {

        function generateList(list) {
            var newList = [];
            list.forEach(function(e) {
                newList.push(extractField(e.fields, 3));
            });

            return newList;
        }

        function extractField(fields, level) {
            var obj = {};
            for (var a in fields) {
                var subObject = fields[a];
                if (subObject.fields && level > 0) {
                    subObject = extractField(subObject.fields, level - 1);
                }
                if (subObject.length && subObject[subObject.length - 1].fields && level > 0) {
                    for (var i = 0; i < subObject.length; i++) {
                        subObject[i] = extractField(subObject[i].fields, level - 1);
                    }
                }
                obj[a] = subObject;
            }
            return obj;
        }

        tool.setServiceObjectProperties({
            extractField: extractField,
            generateList: generateList,
            getContentful: getContentful,
        });

        function getContentful() {
            return contentful;
        }
    });