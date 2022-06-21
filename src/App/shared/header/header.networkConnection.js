agmNgModuleWrapper('agms.header')
    .defineController('s.header.NetworkConnectionController', [],
        function(vm, dep, tool) {
            var $window = dep.$window,
                $templateCache = dep.$templateCache;

            vm.refreshPage = refreshPage;
            vm.closeNotification = closeNotification;

            function refreshPage() {
                $templateCache.removeAll();
                $window.location.reload(true);
                tool.log("Reload pressed");
            }

            function closeNotification() {
                vm.hideDisconnectedNotification = true;
            }

            tool.on('signalRStatusChanged', function(event, newStatus) {
                vm.connectionStatus = newStatus;
            });

            tool.on('signalRStatusDisconnected', function() {
                vm.hideDisconnectedNotification = false;
            });
        })
    .defineDirectiveForE('agms-header-network-connection', [],
        function() {
            return {
                controller: 's.header.NetworkConnectionController',
                templateUrl: '/App/shared/header/header.networkConnection.html'
            };
        }, {});