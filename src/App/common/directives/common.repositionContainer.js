agmNgModuleWrapper('agm.common')
    .defineController('common.RepositionContainerController', [], function (vm, dep, tool) {
         
    })
    .defineDirectiveForA('agmc-reposition-container', [],
        function (dep) {
            return {
                controller: 'common.RepositionContainerController'
            };
        },
        {},
        function (scope, element, attrs, controller, transcludeFn, dep, tool) {
            var e = $(element);
            tool.onRendered(function () {
                e.sortable({
                    items: "> *[css-reposition-item]"
                });
            });
        });