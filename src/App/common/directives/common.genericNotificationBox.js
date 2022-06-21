agmNgModuleWrapper('agm.common')
    .defineService('commonGenericNotificationBoxService',[],function(serviceObj, dep, tool) {
        
        function notifyWithNewItem(item, templateUrl, externalVm, timestamp) {
            var existingContent = serviceObj.contents.filter(function(content) {
                return content.item === item && content.displayState < 3;
            })[0];
            if (existingContent) {
                existingContent.displayState = 1;
                reevaluateList();
                return;
            }
            serviceObj.contents.push({
                item: item,
                TimeStamp: timestamp || new Date().toISOString(),
                templateUrl: templateUrl,
                externalVm: externalVm,
                displayState:1
            });
            reevaluateList();
        }

        function close(content) {
            content.displayState = 2;
            tool.timeout(function() {
                content.displayState = 3;
            }, 1000);
        }

        function reevaluateList() {
            serviceObj.contents = serviceObj.contents.filter(function (c, idx) {
                return c.displayState < 3;
            });

            serviceObj.contents.sort(function (a, b) {
                return a.TimeStamp < b.TimeStamp;
            });
            for (var i = 3; i < serviceObj.contents.length; i++) {
                var content = serviceObj.contents[i];
                close(content);
            }
        }

        tool.setServiceObjectProperties({
            notifyWithNewItem: notifyWithNewItem,
            contents: [],
            close:close,
            reevaluateList: reevaluateList
        });
    })
    .defineController('sharedGenericNotificationBoxController', ['commonAudioService', 'commonGenericNotificationBoxService'],
    function (vm, dep, tool) {
        var commonGenericNotificationBoxService = dep.commonGenericNotificationBoxService;

        function getEncodedSectorUrl(sectorName) {
            return "//am708403.azureedge.net/images/sector/" +
                dep.$window.encodeURIComponent(sectorName) + ".png?";
        }

        tool.initialize(function () {

            tool.setVmProperties({
                commonGenericNotificationBoxService:commonGenericNotificationBoxService,
                close: commonGenericNotificationBoxService.close,
                getEncodedSectorUrl: getEncodedSectorUrl
            });

        });
    })
    .defineDirectiveForE('agmc-generic-notification-box', [], function () {
        return {
            restrict: 'E',
            replace: false,
            controller: "sharedGenericNotificationBoxController",
            templateUrl: '/App/common/directives/common.genericNotificationBox.html'
        };
    }, {});