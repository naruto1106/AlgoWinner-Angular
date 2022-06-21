agmNgModuleWrapper("agm.landing")
    .defineControllerAsPage("agm.landing.LiteController",
        "/App/landing/lite/lite.main.html",
        [],
        function (vm, dep, tool) {

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

            tool.initialize(function () {
                tool.setVmProperties({
                });
            });
        })
    .defineState('landing-lite', {
        url: '/lite'
    });