agmNgModuleWrapper('agmp.subscription')
    .defineControllerAsPopup('p.subscription.TerminateController',
    {
        templateUrl: '/App/pages/subscription/subscription.terminate.html',
        windowClass: "mini-modal"
    },
    ['subscription', 'sSubscriptionBundleService'],
    function (vm, dep, tool) {
        var subscription = dep.subscription,
            sSubscriptionBundleService = dep.sSubscriptionBundleService;

        vm.subscription = subscription;

        vm.stopSubscription = function () {
            var request = {
                BundleSubscriptionId: subscription.BundleSubscriptionId
            }
            sSubscriptionBundleService.ExpireSubscription(request).then(function (res) {
                vm.uibClosePanel();
            }, function (res) {
                tool.log("An error occurred expiring subscription");
            });
        };
    });