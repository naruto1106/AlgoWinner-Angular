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




        function toggleItem(elem) {
            for (var i = 0; i < elem.length; i++) {
              elem[i].addEventListener("click", function(e) {
                var current = this;
                for (var i = 0; i < elem.length; i++) {
                  if (current != elem[i]) {
                    elem[i].classList.remove('active');
                  } else if (current.classList.contains('active') === true) {
                    current.classList.remove('active');
                  } else {
                    current.classList.add('active')
                  }
                }
                e.preventDefault();
              });
            };
          }
          toggleItem(document.querySelectorAll('.link'));
