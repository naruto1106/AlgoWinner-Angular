agmNgModuleWrapper("agm.landing")
    .defineControllerAsPage("agm.landing.MainController",
    "/App/landing/landing.main.html",
    [],
    function (vm, dep, tool) {
        tool.initialize(function () {
            tool.onRendered(function () {
                $(window).scroll(function () {
                    if ($(this).scrollTop() > 1000) {
                        $('.back-to-top').fadeIn();
                    } else {
                        $('.back-to-top').fadeOut();
                    }
                });
                $('.back-to-top').on("click", function () {
                    $('html, body').animate({ scrollTop: 0 }, 800);
                    return false;
                });
            });
        });
    })
    .defineState('landing-root', {
        url: '/'
    });