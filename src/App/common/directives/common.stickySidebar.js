agmNgModuleWrapper('agm.common')
    .defineDirectiveForE('agmc-sticky-sidebar', [],
    function (dep) {
        return {
            transclude: true,
            controller: "common.StickySidebarController",
            templateUrl: '/App/common/directives/common.stickySidebar.html',
        };
    },
    {
        hookedOnBottomAt: '=',
        isActive: '=?',
        offsetTopAt: '=?',
        onScrollBottom: '&?',
        onScrollTop: '&?',
        refreshFuncContainer: "=?"

    })
    .defineController('common.StickySidebarController', [],
    function (vm, dep, tool) {

        function getElementQuery() {
            return $(vm._getDirectiveElement());
        }

        var currentTop = 0;

        function getAbsTop() {
            return getElementQuery().offset().top - (vm.offsetTopAt || 0);
        };

        function getHeight() {
            return getElementQuery().find('[panel-container]').height();
        };

        function getWindowHeight() {
            return $(dep.$window).height();
        }

        function getWindowScrollTop() {
            return $(dep.$window).scrollTop();
        }

        function getDocumentHeight() {
            return $(dep.$document).height();
        }

        function getNewCurrentTop() {
            var top = getAbsTop() + currentTop;
            var bottom = top + getHeight();
            var windowTop = getWindowScrollTop();
            var windowBottom = windowTop + getWindowHeight();

            var nextCurrentTop = currentTop;
            var maxBottom = getDocumentHeight() - (getAbsTop() + getHeight() + vm.hookedOnBottomAt);

            var isLongSidebar = getWindowHeight() < getHeight();

            if (isLongSidebar) {
                var isHookedOnTop = top > windowTop;
                var isHookedOnBottom = bottom < windowBottom;

                if (isHookedOnTop) {
                    // top must be equal to windowTop
                    nextCurrentTop = windowTop - getAbsTop();

                } else if (isHookedOnBottom) {
                    // bottom must be equal to windowBottom
                    nextCurrentTop = windowBottom - getAbsTop() - getHeight();
                }
            } else {
                nextCurrentTop = windowTop - getAbsTop();
            }
            if (nextCurrentTop > maxBottom) {
                nextCurrentTop = maxBottom;
            }
            if (nextCurrentTop < 0) {
                nextCurrentTop = 0;
            }

            return nextCurrentTop;
        }

        tool.onRendered(function () {
            var pusher = getElementQuery().find('[sticky-sidebar-pusher]');
            var pusherContainer = getElementQuery().find('[sidebar-pusher-container]');
            var timeoutObject = null;

            if (vm.refreshFuncContainer) {
                vm.refreshFuncContainer.refresh = function () {
                    refreshScroll();
                }
            }
            tool.watch('vm.isActive', function () {
                if (!vm.isActive) {
                    pusher.height(0);
                }
            });
            
            function refreshScroll() {
                pusherContainer.css("height", 0);

                var hasReachedDocumentBottom = getWindowScrollTop() + getWindowHeight() >= getDocumentHeight();
                var nextCurrentTop = getNewCurrentTop();
                pusherContainer.css("height", "");
                if (!hasReachedDocumentBottom || nextCurrentTop < currentTop) {
                    currentTop = nextCurrentTop;
                    pusher.height(currentTop);
                    if (timeoutObject) {
                        dep.$timeout.cancel(timeoutObject);
                    }
                    timeoutObject = tool.onRendered(function () {
                        if (nextCurrentTop > vm.currentTop && vm.onScrollBottom) {
                            vm.onScrollBottom();
                        }
                        if (nextCurrentTop < vm.currentTop && vm.onScrollTop) {
                            vm.onScrollTop();
                        }
                        vm.currentTop = currentTop;
                    });
                }
            };

            $(dep.$window).scroll(function (evt) {
                if (vm.isActive == null || vm.isActive) {
                    refreshScroll();
                }
            });

        });
    });