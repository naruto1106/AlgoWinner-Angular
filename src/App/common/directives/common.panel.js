agmNgModuleWrapper('agm.common')
    .defineDirectiveForE('agmc-panel', [],
        function(dep) {
            return {
                transclude: true,
                controller: "common.PanelController",
                templateUrl: '/App/common/directives/common.panel.html',
            };
        },
        {
            heading: '@',
            bodyClass:'@?'
        })
    .defineController('common.PanelController', [],
        function (vm, dep, tool) {

        });

        $('.bar_icon').click(function(){
            debugger
            $('.static-sidebar').removeClass('test')
            $(this).addClass('test');
        });