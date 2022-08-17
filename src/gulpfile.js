// ------------
// Dependencies
// ------------
var gulp = require('gulp');
var tap = require('gulp-tap');
var nunjucksRender = require('gulp-nunjucks-render');
var loadConfig = require("./load-config");
var bundles = require("./bundle-config.js").bundles;
var q = require('q');

var less = require('gulp-less');
var path = require('path');
//var uglify = require('gulp-uglify');
var gulpTerser = require('gulp-terser');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var templateCache = require('gulp-angular-templatecache');
var rename = require('gulp-rename');
var md5 = require('md5-file');
var chokidar = require('chokidar');
var glob = require("glob");

var myDefaultVersion = "2.0.0.0";

function onError(e) {
    console.error(e);
    process.exit(1);
}

function processBundles(production, cb) {
    var counter = 0;
    var loopfinished = false;
    function done() {
        counter--;
        if (counter === 0 && loopfinished) {
            if (cb) cb();
        }
    }
    for (var str in bundles) {
        var result = "";
        var type = bundles[str].type;
        var name = bundles[str].name;

        var includes = bundles[str].includes;
        switch (type) {
            case "less":
                counter++;
                var p = gulp.src(includes).pipe(sourcemaps.init()).pipe(less({
                    sourceMap: {
                        sourceMapRootpath: '../App/styles' // Optional absolute or relative path to your LESS files
                    }
                })).on('error', onError);
                if (production) {
                    p = p.pipe(minifyCss({ compatibility: 'ie8' }))
                         .on('error', onError)
                         .pipe(concatCss(name + '.css'))
                         .on('error', onError);
                }
                p.pipe(gulp.dest("dist/"))
                    .on('error', onError)
                    .on('end', done);
                break;
            case "js":
                if (production) {
                    counter++;
                    gulp.src(includes, { base: "." }).pipe(sourcemaps.init())
                                      .pipe(gulpTerser()).on('error', onError)
                                      .pipe(concat(name + ".js")).on('error', onError)
                                      .pipe(sourcemaps.write("../srcmap/" + (process.env.VERSION || "0.1.0.0"), {
                                          sourceMappingURLPrefix: "http://srcmap.algomerchant.com",
                                      }))
                                      .pipe(gulp.dest("dist/"))
                                      .on('end', done)
                                      .on('error', onError);
                }
                break;
            case "css":
                if (production) {
                    counter++;
                    gulp.src(includes)
                        .pipe(minifyCss({ compatibility: 'ie8' }))
                        .on('error', onError)
                        .pipe(concatCss(name + '.css'))
                        .on('error', onError)
                        .pipe(gulp.dest("dist/"))
                        .on('end', done)
                        .on('error', onError);
                }
                break;
            case "template":
                if (production) {
                    var htmlOpts = {
                        collapseWhitespace: true
                    };
                    var tplOpts = {
                        filename: 'dist/agmTemplates.js',
                        standalone: true,
                        module: 'agm.templates',
                        root: '/App'
                    };
                    counter++;
                    gulp.src(includes).pipe(htmlmin(htmlOpts))
                                      .on('error', onError)
                                      .pipe(templateCache(tplOpts))
                                      .on('error', onError)
                                      .pipe(gulp.dest("."))
                                      .on('error', onError)
                                      .on('end', done);
                }
                break;
            case "oracleTemplate":
                if (production) {
                    var htmlOpts = {
                        collapseWhitespace: true
                    };
                    var tplOpts = {
                        filename: 'dist/oracleTemplates.js',
                        standalone: true,
                        module: 'agm.oracleTemplates',
                        root: '/App'
                    };
                    counter++;
                    gulp.src(includes).pipe(htmlmin(htmlOpts))
                        .on('error', onError)
                        .pipe(templateCache(tplOpts))
                        .on('error', onError)
                        .pipe(gulp.dest("."))
                        .on('error', onError)
                        .on('end', done);
                }
                break;
            case "verbatim":
                if (production) {
                    counter++;
                    gulp.src(includes)
                        .pipe(gulp.dest("dist/"))
                        .on('end', done)
                        .on('error', onError);
                }
                break;
        }
    }
    loopfinished = true;
}

function runHTMLProcessing(production, serverVersion) {
    if (production) {
        loadConfig.transformAll(function (target, file) {
            loadConfig.process(file, processedCallback(target));
        });
    }
    else {
        loadConfig.process(null, processedCallback());
    }

    var productionContents = {};
    function getProductionEnvContent(key, cb) {
        if (bundles[key] && productionContents[key]) {
            return productionContents[key];
        } else {
            throw key + " bundle not found";
        }
    }

    function generateProductionEnvContent(key, bundle) {
        var result = "";
        var type = bundle.type;
        var name = bundle.name;
        var media = bundle.media;
        var hash = null;
        if (type === "js") {
            hash = md5.sync(path.join(__dirname, "dist", name + ".js"));
            result += "<script src='/dist/" + name + ".js?" + hash + "'></script>\n";
        } else if (type === "css") {
            hash = md5.sync(path.join(__dirname, "dist", name + ".css"));
            if (media === "print") {
                result += "<link rel='stylesheet' media='print' href='/dist/" + name + ".css?" + hash + "'/>\n";
            } else {
                result += "<link rel='stylesheet' media='screen' href='/dist/" + name + ".css?" + hash + "'/>\n";
            }
        } else if (type === "less") {
            hash = md5.sync(path.join(__dirname, "dist", name + ".css"));
            result += "<link rel='stylesheet' href='/dist/" + name + ".css?" + hash + "'/>\n";
        } else if (type === "template" || type === "oracleTemplate") {
            hash = md5.sync(path.join(__dirname, "dist", name + ".js"));
            result += "<script src='/dist/" + name + ".js?" + hash + "'></script>\n";
        } else if (type === "verbatim") {
            hash = md5.sync(path.join(__dirname, "dist", name + ".js"));
            result += "<script src='/dist/" + name + ".js?" + hash + "'></script>\n";
        }
        var safeString = new nunjucksRender.nunjucks.runtime.SafeString(result);
        productionContents[key] = safeString;
        return q.when(safeString);
    }
    
    var developmentContents = {};

    function getDevelopmentEnvContent(key, cb) {
        if (bundles[key] && developmentContents[key]) {
            return developmentContents[key];
        } else {
            throw key + " bundle not found";
        }
    }

    function generateDevelopmentEnvContent(key, bundle) {
        var result = "";
        var type = bundle.type;
        var media = bundle.media;

        var includes = bundle.includes;

        function iterateSources(includeFiles) {
            var deferred = q.defer();
            var arr = [];
            // eg: copy *.js files into `./dist`
            gulp.src(includeFiles)
                .pipe(tap(function (file, t) {
                    var pathName = file.path;
                    var relativePathName = path.relative(__dirname, pathName);
                    var files = glob.sync(relativePathName, {});
                    arr.push(files[0]);
                }))
                .on('end', function () {
                    deferred.resolve(arr);
                });
            return deferred.promise;
        }
        return iterateSources(includes).then(function (files) {
            files.forEach(function (file) {
                if (type === "js" || type === "verbatim") {
                    result += "<script src='/" + file + "'></script>\n";
                } else if (type === "css") {
                    if (media === "print") {
                        result += "<link rel='stylesheet' media='print' href='/" + file + "'/>\n";
                    } else {
                        result += "<link rel='stylesheet' href='/" + file + "'/>\n";
                    }
                } else if (type === "less") {
                    file = path.basename(file).replace("less", "css");
                    result += "<link rel='stylesheet' href='/dist/" + file + "'/>\n";
                }
            });
            var safeString = new nunjucksRender.nunjucks.runtime.SafeString(result);
            developmentContents[key] = safeString;
            return safeString;
        });

    }

    function processedCallback(target) {
        console.log("Process callback");
        var generatedFileDestination = production ? "./html-env" : '.';
        function renderTemplateHtml(frontEndLayout, appSettings, njEnv) {
            console.log("Render template html in " + generatedFileDestination);

            return gulp.src([
                    'Views/*.html'
            ])
                .pipe(nunjucksRender({
                    data: {
                        DEBUG: !production,
                        "ServerVersion": serverVersion,
                        coreConfigService: JSON.stringify(frontEndLayout),
                        appSettings: appSettings
                    },
                    manageEnv: njEnv
                }))
                .on('error', onError)
                .pipe(rename(function (path) {
                    if (target)
                        path.basename += "." + target;
                }))
                .pipe(gulp.dest(generatedFileDestination))
                .on('error', onError);
        };

        if (production) {
            return function (frontEndLayout, appSettings) {
                var promises = [];
                for (var key in bundles) {
                    promises.push(generateProductionEnvContent(key, bundles[key]));
                    console.log("SETTING UP PRODUCTION ENV:" + key);
                }
                q.all(promises).then(function () {
                    console.log("PRODUCTION ENV READY");
                    var njEnv = function (env) {
                        env.addFilter("bundle", getProductionEnvContent);
                    };
                    renderTemplateHtml(frontEndLayout, appSettings, njEnv);
                });
            }
        } else {
            return function (frontEndLayout, appSettings) {
                var promises = [];
                for (var key in bundles) {
                    promises.push(generateDevelopmentEnvContent(key, bundles[key]));
                    console.log("SETTING UP DEVELOPMENT ENV:" + key);
                }
                q.all(promises).then(function () {
                    console.log("DEVELOPMENT ENV READY");
                    var njEnv = function (env) {
                        env.addFilter("bundle", getDevelopmentEnvContent);
                    };
                    renderTemplateHtml(frontEndLayout, appSettings, njEnv);
                });
            }
        }
    }
}

gulp.task('bundle', function () {
    return processBundles(process.env.NODE_ENV === "production", function () {
        console.log("Done");
    });
});

gulp.task('default', function () {
    var production = process.env.NODE_ENV === "production";
    console.log("Build Mode: " + (production ? "Production" : "Debug"));
    return processBundles(production, function () {
        var version = process.env.VERSION || myDefaultVersion;
        if (version.indexOf('-') !== -1) {
            version = version.substring(0, version.indexOf('-'));
        }
        return runHTMLProcessing(production, version);
    });
});

gulp.task('sitemap', function() {
    return gulp.src('./sitemap.xml')
        .pipe(gulp.dest("."));
});

function watch_files(watch_option) {
    for (var str in bundles) {
        var bundle = bundles[str];
        if (bundle.type === "less") {
            (function (b) {
                console.log('watching', b.dependencies);
                chokidar
                    .watch(b.dependencies, watch_option)
                    .on('change', function (event, path) {
                        console.log(event, "changed");

                        console.log("generating " +b.name+"...");
                        gulp.src(b.includes)
                            .pipe(less())
                            .on('error', console.error)
                            .pipe(gulp.dest("dist/"))
                            .on('error', console.error)
                            .on('end', function () {
                                console.log("\t" + b.name + "css generated");
                            })
                            .on('error', console.error);
                    });
            })(bundle);
        }
    }
    console.log('watching htmls');
    chokidar.watch([
            'Views/*.html',
            'Web.config'
    ], watch_option).on('change', function (event) {
        console.log(event, "template changed");
        var version = process.env.VERSION || myDefaultVersion;
        runHTMLProcessing(false, version);
    });
}

gulp.task('dev', function () {
    var testwatcher = chokidar.watch(".");
    testwatcher.on('error', function () {
        console.log("Use Polling");
        testwatcher.close();
        watch_files({ usePolling: true });
    });
    testwatcher.on('ready', function () {
        testwatcher.close();
        console.log("Use watchio");
        watch_files({});
    });
});
