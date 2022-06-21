agmNgModuleWrapper('agms.guide')
    .defineController("s.guide.MainController", ['sGuideItemManagerService'],
        function (vm, dep, tool) {
            vm.sGuideItemManagerService = dep.sGuideItemManagerService;
        })
    .defineDirectiveForE('agms-guide', [], function() {
        return {
            templateUrl: '/App/shared/guide/guide.main.html',
            controller: 's.guide.MainController'
        }
    }, {

    }, function (scope, element, attrs, controller, transcludeFn) {
        function getScrollBarWidth() {
            var inner = document.createElement('p');
            inner.style.width = "100%";
            inner.style.height = "200px";

            var outer = document.createElement('div');
            outer.style.position = "absolute";
            outer.style.top = "0px";
            outer.style.left = "0px";
            outer.style.visibility = "hidden";
            outer.style.width = "200px";
            outer.style.height = "150px";
            outer.style.overflow = "hidden";
            outer.appendChild(inner);

            document.body.appendChild(outer);
            var w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            var w2 = inner.offsetWidth;
            if (w1 === w2) w2 = outer.clientWidth;

            document.body.removeChild(outer);

            return (w1 - w2);
        };

        function setElementWidthMinusScrollbar() {
            var scrolbarWidth = getScrollBarWidth();
            $(element).css("width", "100vw").css("width", "-=" + scrolbarWidth.toString() + "px");
        }

        setElementWidthMinusScrollbar();

        $(window).on('resize', function () {
            setElementWidthMinusScrollbar();
        });

        $(element)
            .find('.dark-screen')
            .bind('mousedown mouseup click',function(e) {
                e.stopPropagation();
            });
    });