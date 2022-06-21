module.exports = function (config) {
    config.set({

        basePath: '../',

        reporters: ['progress', 'junit'],

        files: [
          'Assets/lib/agm/agmNgModuleWrapper.js',
          'Assets/lib/chartiq/js/stx.js',
          'Assets/lib/chartiq/js/stxKernelOs.js',
          'Assets/lib/chartiq/js/stxLibrary.js',
          'Assets/lib/chartiq/js/stxAdvanced.js',
          'Assets/lib/chartiq/js/stxSymLookup_Xignite_Svc.js',
          'Assets/lib/chartiq/js/excanvas.js',
          'Assets/lib/jquery.js',
          'Assets/lib/jquery.signalR-2.4.1.js',
          'Assets/lib/jquery.ui.js',
          'Assets/lib/angular.js',
          'Assets/lib/angular-route.js',
          'Assets/lib/angular-cookies.js',
          'Assets/lib/bootstrap-switch.js',
          'Assets/lib/ui-bootstrap.js',
          'Assets/lib/ui-utils.js',
          'Assets/lib/customs/*.js',
          'Assets/lib/angular-sanitize.js',
          'Assets/lib/lodash.js',
          'Assets/lib/moment.js',
          'Assets/lib/moment-timezone-with-data-2010-2020.js',
          'Assets/lib/angular-payments.js',
          'Assets/lib/rxjs.all.js',
          'Assets/lib/**/*.js',
          
          'App/**/*.html',
          'App/**/*._module.js',
          'App/common/*.js',
          'App/common/**/*.js',
          'App/core/*.js',
          'App/core/**/*.js',          
          'App/pages/**/*.js',
          'App/start/*.js',          
          'App/shared/**/*.js',
          'jstests/VersionConstant.js',
          'jstests/angular-mocks.js',
          'jstests/unit/**/*.js'
        ],

        exclude:[
          //'App/**/*._module.js'
        ],

        preprocessors: {
            'App/**/*.html': 'ng-html2js'
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: '.*/App/',
            prependPrefix: '/',
            moduleName: 'directive.templates'
        },

        autoWatch: true,

        port: 9876,

        frameworks: ['jasmine'],

        browsers: ['Chrome', 'PhantomJS'],

        plugins: [
                'karma-chrome-launcher',
                'karma-phantomjs-launcher',
                'karma-jasmine',
                'karma-junit-reporter',
                'karma-ng-html2js-preprocessor'
        ],
       
        junitReporter: {
            outputDir: '../../jstest',
            useBrowserName: false,
            outputFile: 'JSTestResults.xml',
            suite: 'unit'
        },

        browserDisconnectTimeout: 5000,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 10000,
        browserConsoleLogOptions: {
            terminal: true,
            level: ""
        }
    });
};
