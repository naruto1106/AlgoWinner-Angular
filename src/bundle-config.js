var Bundle = function (name, type, media) {
    this.name = name;
    this.type = type;
    this.includes = [];
    this.dependencies = [];
    this.media = media;
    return this;
}
Bundle.prototype.Include = function (pattern) {
    this.includes.push(pattern);
    this.dependencies.push(pattern);
    return this;
}
Bundle.prototype.DependsOn = function (pattern) {
    this.dependencies.push(pattern);
    return this;
}

var bundles = {
    bundles: {},
    Add: function (bundle) {
        this.bundles[bundle.name] = bundle;
    }
}

bundles.Add(new Bundle("VendorAnimate", "js").Include("Assets/lib/angular-animate.js"));
bundles.Add(new Bundle("ChartScript", "js")
               .Include("Assets/lib/chartiq/js/stxThirdParty.js")
               .Include("Assets/lib/chartiq/js/stxTimeZoneData.js")
               .Include("Assets/lib/chartiq/js/stx.js")
               .Include("Assets/lib/chartiq/js/stxKernelOs.js")
               .Include("Assets/lib/chartiq/js/stxLibrary.js")
               .Include("Assets/lib/chartiq/js/stxAdvanced.js"));
//.Include("Assets/lib/chartiq/js/stxSymLookup_Xignite_Svc.js"));

bundles.Add(new Bundle("VendorScript", "js")
    .Include("Assets/lib/agm/agmNgModuleWrapper.js")
    .Include("Assets/lib/jquery.js")
    .Include("Assets/lib/jquery.signalR-2.4.1.js")
    .Include("Assets/lib/jquery.ui.js")
    .Include("Assets/lib/jquery.mCustomScrollbar.js")
    .Include('App/landing/lib/modernizr-2.8.3.min.js')
    .Include("Assets/lib/linq.min.js")
    .Include("Assets/lib/lodash.js")
    .Include("Assets/lib/moment.js")
    .Include("Assets/lib/moment-timezone-with-data-2010-2020.js")
    .Include("Assets/lib/angular.js")
    .Include("Assets/lib/angular-locale_en-sg.js")
    .Include("Assets/lib/angular-sanitize.js")
    .Include("Assets/lib/angular-route.js")
    .Include("Assets/lib/angular-touch.js")
    .Include("Assets/lib/angular-cookies.js")
    .Include("Assets/lib/customs/range-slider.js")
    .Include("Assets/lib/ng-infinite-scroll.js")
    .Include("Assets/lib/zInfiniteScroll.js")
    .Include("Assets/lib/complexify.min.js")
    //These are library for pretty input for phone number
    .Include("Assets/lib/intlTelInput.js")
    .Include("Assets/lib/libphonenumber-utils.js")
    .Include("Assets/lib/international-phone-number.js")
    //Angular-UI stuff     
    .Include("Assets/lib/ui-bootstrap.js")
    .Include("Assets/lib/ui-utils.js")
    .Include("Assets/lib/slider.js")
    .Include("Assets/lib/bootstrap-switch.js")
    //Google Analytics stuff
    .Include("Assets/lib/noframework.waypoints.js")
    .Include("Assets/lib/angulartics.min.js")
    .Include("Assets/lib/angulartics-ga.min.js")
    .Include("Assets/lib/angulartics-scroll.js")
    .Include("Assets/lib/highstock.js")
    .Include("Assets/lib/highcharts-ng.js")
    //Payments
    //.Include("Assets/lib/stripe.min.js")
    .Include("Assets/lib/angular-payments.js")
    .Include("Assets/lib/rxjs.all.js")
    .Include("Assets/lib/rx.angular.js")
    //Swiper
    .Include("Assets/lib/swiper.min.js")
    .Include("Assets/lib/download.js")
    .Include("Assets/lib/FileSaver.js")
    .Include("Assets/lib/caret.js")
    //slider
    .Include("Assets/lib/rzSlider/rzslider.js")
    //round progress
    .Include("Assets/lib/roundProgress.js")
    //sticky panel
    .Include("Assets/lib/sticky.js")
    //Firebase for Auto Invest
    .Include('Assets/lib/firebase.js')
    .Include('Assets/lib/angularfire.min.js')
    //Social media sharing
    .Include('Assets/lib/angular-socialshare.js')
    //updating meta
    .Include('Assets/lib/update-meta.js')
    .Include('Assets/lib/raven.min.js')
);
bundles.Add(new Bundle("contentful.min", "verbatim")
    //contentful
    .Include('Assets/lib/contentful.min.js')
);
bundles.Add(new Bundle("JavascriptBase", "js")
    .Include("App/**/*._module.js")
    );
bundles.Add(new Bundle("JavascriptMain", "js")
    .Include("App/start/**/*.js")
    .Include("App/core/**/*.js")
    .Include("App/common/**/*.js")
    .Include("App/pages/**/*.js")
    .Include("!App/**/*._module.js")
    .Include("App/shared/**/*.js")
    );

bundles.Add(new Bundle("VendorStyle", "css")
    .Include("App/styles/vendors/bootstrap.css")
    .Include("App/styles/vendors/bootstrap-switch.css")
    .Include("App/styles/vendors/jquery.mCustomScrollbar.css")
    .Include("App/styles/vendors/jquery-ui.css")
    .Include("App/styles/vendors/intlTelInput.css")
    .Include("App/styles/vendors/swiper.min.css")
    .Include("Assets/lib/rzSlider/rzslider.css")
    );

bundles.Add(new Bundle("ChartIqStyle", "css")
    .Include("App/styles/vendors/chartiq/css/stx-demo.css")
    .Include("App/styles/vendors/chartiq/css/stx-chart.css")
    .Include("App/styles/vendors/chartiq/css/stx-advanced.css")
    .Include("App/styles/vendors/chartiq/css/font-awesome.css")
    );

bundles.Add(new Bundle("ChartIqStylePrint", "css", "print")
    .Include("App/styles/vendors/chartiq/css/stx-print.css"));

var mainLessBundle = new Bundle("CssCore", "less")
    .Include("App/styles/main.less")
    .DependsOn('App/**/*.less');
bundles.Add(mainLessBundle);

var cssMainReformed = new Bundle('CssMainReformed', 'less')
    .Include('App/styles/main.reformed.less')
    .DependsOn('App/**/*.less');
bundles.Add(cssMainReformed);

var landingLessBundle = new Bundle("agmLandingCss", "less")
    .Include("App/landing/landing.less")
    .DependsOn('App/landing/**/*.less');
bundles.Add(landingLessBundle);

bundles.Add(new Bundle("agmTemplates", "template").Include("App/**/*.html").Include("App/*.html"));
bundles.Add(new Bundle("oracleTemplates", "oracleTemplate")
    .Include("App/pages/algoOracle/*.html")
    .Include("App/pages/mobileWeb/*.html"));

bundles.Add(new Bundle("agmLandingJs", "js")
    .Include('App/landing/lib/modernizr-2.8.3.min.js')

    //bootstrap
    .Include('App/landing/lib/bootstrap.min.js')

    //jquery plugins
    //.Include('App/landing/lib/jquery-1.11.3.min.js')
    .Include('App/landing/lib/jquery.appear.js')
    .Include('App/landing/lib/jquery.nav.js')
    .Include('App/landing/lib/owl.carousel.min.js')
    .Include('App/landing/lib/jquery.bxslider.min.js')
    .Include('App/landing/lib/jquery.mixitup.min.js')
    .Include('App/landing/lib/flipclock.js')
    .Include('App/landing/lib/jflickrfeed.js')
    .Include('App/landing/lib/smoothscroll.js')
    
    //Inside dependency
    .Include('App/core/*.js')
    .Include('App/common/*.js')
    .Include('App/common/directives/*.js')
    .Include('App/shared/gateway/*.js')
    .Include('App/shared/misc/*.js')
    .Include('App/shared/user/*.js')
    .Include('App/pages/user/*.js')
    .Include('App/shared/strategyCommerce/*.js')
    .Include('App/shared/auth/*.js')
    .Include('App/pages/referral/*.js')

    .Include('App/landing/landing._module.js')
    .Include('App/landing/forms/*.js')
    .Include('App/landing/robot/*.js')
    .Include('App/landing/trading/*.js')
    .Include('App/landing/chart/*.js')
    .Include('App/landing/datamart/*.js')
    .Include('App/landing/oracle/*.js')
    .Include('App/landing/lite/*.js')
    .Include('App/landing/campaign/*.js')
    .Include('App/landing/referral/*.js')
    .Include('App/landing/*.js')
    .Include('App/landing/directives/*.js')
);

bundles.Add(new Bundle("agmLandingCssLib", "css")
    .Include("App/landing/css/vendor.css")
    .Include("App/landing/css/base.css")
    .Include("App/landing/css/layout.css")
    .Include("App/landing/css/components.css")
    .Include("App/landing/css/pages.css")
    .Include("App/landing/css/stylesheet.css")
    .Include("App/landing/css/canvasJ.css"));

bundles.Add(new Bundle("agm404CssLib", "css")
    .Include("App/pages/404/404.css"));
bundles.Add(new Bundle("agm404Js", "js")
    .Include("App/pages/404/three.min.js"));

bundles.Add(new Bundle("OracleJs", "js")
    .Include("Assets/lib/agm/agmNgModuleWrapper.js")
    .Include("Assets/lib/jquery.js")
    .Include("Assets/lib/jquery.signalR-2.4.1.js")
    .Include("Assets/lib/jquery.ui.js")
    .Include("Assets/lib/jquery.mCustomScrollbar.js")
    .Include('App/landing/lib/modernizr-2.8.3.min.js')
    .Include("Assets/lib/linq.min.js")
    .Include("Assets/lib/lodash.js")
    .Include("Assets/lib/moment.js")
    .Include("Assets/lib/moment-timezone-with-data-2010-2020.js")
    .Include("Assets/lib/angular.js")
    .Include("Assets/lib/angular-locale_en-sg.js")
    .Include("Assets/lib/angular-sanitize.js")
    .Include("Assets/lib/angular-route.js")
    .Include("Assets/lib/angular-touch.js")
    .Include("Assets/lib/angular-cookies.js")
    .Include("Assets/lib/customs/range-slider.js")
    .Include("Assets/lib/ng-infinite-scroll.js")
    .Include("Assets/lib/zInfiniteScroll.js")
    .Include("Assets/lib/complexify.min.js")
    //Angular-UI stuff     
    .Include("Assets/lib/ui-bootstrap.js")
    .Include("Assets/lib/ui-utils.js")
    .Include("Assets/lib/slider.js")
    .Include("Assets/lib/bootstrap-switch.js")
    //Google Analytics stuff
    .Include("Assets/lib/noframework.waypoints.js")
    .Include("Assets/lib/angulartics.min.js")
    .Include("Assets/lib/angulartics-ga.min.js")
    .Include("Assets/lib/angulartics-scroll.js")
    .Include("Assets/lib/highstock.js")
    .Include("Assets/lib/highcharts-ng.js")
    //Payments
    .Include("Assets/lib/angular-payments.js")
    .Include("Assets/lib/rxjs.all.js")
    .Include("Assets/lib/rx.angular.js")
    //Swiper
    .Include("Assets/lib/swiper.min.js")
    .Include("Assets/lib/download.js")
    .Include("Assets/lib/FileSaver.js")
    .Include("Assets/lib/caret.js")
    //slider
    .Include("Assets/lib/rzSlider/rzslider.js")
    //round progress
    .Include("Assets/lib/roundProgress.js")
    //sticky panel
    .Include("Assets/lib/sticky.js")
    //Firebase for Auto Invest
    .Include('Assets/lib/firebase.js')
    .Include('Assets/lib/angularfire.min.js')
    //updating meta
    .Include('Assets/lib/update-meta.js')
    .Include('Assets/lib/raven.min.js')

    .Include('App/core/core._module.js')
    .Include('App/common/common._module.js')
    .Include('App/shared/account/account._module.js')
    .Include('App/shared/activity/activity._module.js')
    .Include('App/shared/auth/auth._module.js')
    .Include('App/shared/chart/chart._module.js')
    .Include('App/shared/community/community._module.js')
    .Include('App/shared/datamart/datamart._module.js')
    .Include('App/shared/droidHelper/droidHelper._module.js')
    .Include('App/shared/gateway/gateway._module.js')
    .Include('App/shared/header/header._module.js')
    .Include('App/shared/image/image._module.js')
    .Include('App/shared/manualFollowFirebase/manualFollowFirebase._module.js')
    .Include('App/shared/market/market._module.js')
    .Include('App/shared/menu/menu._module.js')
    .Include('App/shared/misc/misc._module.js')
    .Include('App/shared/orders/orders._module.js')
    .Include('App/shared/payment/payment._module.js')
    .Include('App/shared/positions/positions._module.js')
    .Include('App/shared/posting/posting._module.js')
    .Include('App/shared/priceAlert/priceAlert._module.js')
    .Include('App/shared/product/product._module.js')
    .Include('App/shared/strategyCommerce/strategyCommerce._module.js')
    .Include('App/shared/subscription/subscription._module.js')
    .Include('App/shared/textProcessing/textProcessing._module.js')
    .Include('App/shared/tgps/tgps._module.js')
    .Include('App/shared/trading/trading._module.js')
    .Include('App/shared/user/user._module.js')
    .Include('App/shared/watchlist/watchlist._module.js')
    .Include('App/pages/account/account._module.js')
    .Include('App/pages/dashboard/dashboard._module.js')
    .Include('App/pages/datamart/datamart._module.js')
    .Include('App/pages/subscription/subscription._module.js')
    .Include('App/pages/strategy/strategy._module.js')
    .Include('App/pages/shop/shop._module.js')
    .Include('App/pages/mobileWeb/mobileWeb._module.js')
    .Include('App/pages/algoOracle/algoOracle._module.js')
    .Include('App/pages/user/user._module.js')
    
    .Include("App/core/*.js")
    .Include('App/common/common.formHelper.js')
    .Include('App/common/common.filter.js')
    .Include('App/common/common.enumResolver.service.js')
    .Include('App/common/common.screenResizer.service.js')
    .Include('App/common/common.browserDetector.service.js')
    .Include('App/common/common.locationHistory.service.js')
    .Include('App/common/directives/common.customScrollbar.js')
    .Include('App/common/directives/common.bindHtmlUnsafe.js')
    .Include('App/common/directives/common.buttonWaitOnPromise.js')

    .Include('App/shared/account/account.brokerageProduct.service.js')
    .Include('App/shared/account/account.brokerageConnection.service.js')
    .Include('App/shared/account/account.brokerageVisibility.service.js')
    .Include('App/shared/account/account.service.js')
    .Include('App/shared/auth/auth.service.js')
    .Include('App/shared/gateway/gateway.service.js')
    .Include('App/shared/header/header.service.js')
    .Include('App/shared/image/image.main.js')
    .Include('App/shared/menu/menu.rightClickService.js')
    .Include('App/shared/news/news.service.js')
    .Include('App/shared/orderPad/orders.pad.helper.service.js')
    .Include('App/shared/orderPad/orders.pad.service.js')
    .Include('App/shared/orderPad/orders.padInit.service.js')
    .Include('App/shared/orders/orders.service.js')
    .Include('App/shared/product/product.service.js')
    .Include('App/shared/product/product.ticksize.service.js')
    .Include('App/shared/subscription/subscription.bundle.service.js')
    .Include('App/shared/strategyCommerce/strategyCommerce.bundle.service.js')
    .Include('App/shared/strategyCommerce/strategyCommerce.service.js')
    .Include('App/shared/trading/trading.quickTrade.service.js')
    .Include('App/shared/trading/trading.data.service.js')
    .Include('App/shared/trading/trading.exchangeRate.service.js')
    
    .Include('App/pages/mobileWeb/mobileWeb.oracle.js')
    .Include('App/pages/mobileWeb/mobileWeb.service.js')
    .Include('App/pages/algoOracle/algoOracle.service.js')
    .Include('App/pages/algoOracle/algoOracle.box.js')
    .Include('App/pages/algoOracle/algoOracle.conversation.js')

    .Include('App/start/start.oracle.js')
);

module.exports = bundles;
