agmNgModuleWrapper('agm.core')
    .defineServiceStrict('coreUtil', [], function (serviceObj, dep, tool) {
        function getDuration(strategy) {
            if (!strategy) {
                return 0;
            }
            var startDate = strategy.CreatedDate || strategy.StartDate;
            var createdDate = new Date(startDate);
            var date = new Date();
            var days = (date.getTime() - createdDate.getTime()) / (1000 * 3600 * 24);
            return days;
        };

        function sortName(nameA, nameB) {
            var nA = nameA.toUpperCase();
            var nB = nameB.toUpperCase();
            return nA.localeCompare(nB);
        }

        function sortValue(valueA, valueB) {
            return valueA - valueB;
        }

        tool.setServiceObjectProperties({
            getDuration: getDuration,
            sortName: sortName,
            sortValue: sortValue
        });
    });