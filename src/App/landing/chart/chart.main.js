agmNgModuleWrapper("agm.landing")
    .defineControllerAsPage("agm.landing.ChartController",
    "/App/landing/chart/chart.main.html",
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
    .defineState('landing-chart', {
        url: '/chart'
    });