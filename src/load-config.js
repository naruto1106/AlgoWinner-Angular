module.exports = function(){
    var xmlreader = require("xmlreader");
    var path = require('path');
    var fs = require('fs');
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function transformAll(cb) {
        var T = require('xdt-transform');
        var transformer = new T();

        var releaseFile = path.join(__dirname, "Release.config");
        transformer.transform( path.join(__dirname, 'Web.config'), path.join(__dirname , 'Web.Release.config'), releaseFile, {quiet:true}, function(){
            var targets = ['Production', 'Pilot', 'Staging', 'Staging2', 'LocalStaging', 'LocalProduction', 'StagingAWS', 'ProdAWS'];
            for (var i =0 ; i<targets.length; i++) {
                var T = targets[i];
                var outputFile = path.join(__dirname , T+'.config');
                (function(outputFile, T){
                    transformer.transform( releaseFile,
                            path.join(__dirname , 'Web.'+ T +'.config'), 
                            outputFile, {quiet:true}, function() {
                        cb(T, outputFile);
                    });
                })(outputFile,T);
            }
        });
    }
    function process(filename, callback) {
        filename = filename || path.join(__dirname,"Web.config");
        f = fs.readFileSync(filename, { "encoding": "utf-8" });
        if (f.indexOf("\ufeff") == 0 ) { 
            f = f.substring(1);
        };
        xmlreader.read(f, function(err, res) {
            if (err) {
                console.log(err);
            } else {
                var felJson = {};
                var appSettingsJson = {};
                if ("frontEndLayout" in res.configuration) {
                    var frontEndLayout = res.configuration.frontEndLayout;

                    for (var k in frontEndLayout) {
                        var val = frontEndLayout[k];
                        if (typeof val == "object") {
                            var obj = {}
                            var attributes = val.attributes();
                            for (var kk in attributes) {
                                var vval = attributes[kk];
                                if (vval == "true") vval = true;
                                if (vval == "false") vval = false;
                                if (isNumber(vval)) vval = parseInt(vval);
                                obj[kk] = vval;
                            }
                            felJson[k] = obj;
                        }
                    }
                }

                if ("appSettings" in res.configuration) {
                    var appSettings = res.configuration.appSettings;

                    for (var i = 0; i < appSettings.add.count(); i ++) {
                        var kv = appSettings.add.at(i);
                        var key = kv.attributes().key;
                        var val = kv.attributes().value;
                        if (val == "true") val = true;
                        if (val == "false") val = false;
                        if (isNumber(val)) val = parseInt(val);
                        appSettingsJson[key] = val;
                    }
                }
                callback(felJson, appSettingsJson);
            }
        });
    }
    return {
        process:  process,
        transformAll:  transformAll
    }
}();