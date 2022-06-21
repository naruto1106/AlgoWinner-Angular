agmNgModuleWrapper('agm.common')
    .defineDirectiveForA('agmc-scroll-detection', [], function(dep, tool) {
            return {
                link: function(scope, el, attr) {

                    $(el).on("scroll", function(evt) {
                        var firstChild = $(el).children().eq(0);
                        var scrollTop = $(el).scrollTop();
                        var height = (firstChild.height() - $(el).height());
                        var percentage = 0;
                        if (height) {
                            percentage = scrollTop / height;
                        }
                        if (scope.onScroll) {
                            scope.onScroll(scrollTop, height, percentage);
                        }
                    });
                }
            };
        }, {
            agmcScrollDetection: "&"
        }
    );