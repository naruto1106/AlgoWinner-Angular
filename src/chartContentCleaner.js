var fs = require('fs');
var readline = require('readline');
var inputPath = 'UserChartDump.txt';
var outputPath = 'UserChartDump.sql';
var q = require('q');


var table = {
    name: "ChartUserTemplates",
    columns: {
        template: "Template",
        userId: "userId"
    }
}

function tidyUpTemplateContent(template) {

    if (!template.filterDescription) {
        template.filterDescription = {};
    } else {

        if (template.filterDescription.showLegendsOnChart == null) {
            template.filterDescription.showLegendsOnChart = false;
        }
        if (template.filterDescription.normalizeToPercentage == null) {
            template.filterDescription.normalizeToPercentage = false;
        }
        // panel proportions on chart is newly introduced, therefore not available in older template
        if (template.filterDescription.panelProportions == null) {
            template.filterDescription.panelProportions = {};
        }
    }

    var hasProduct = template.filterDescription.primaryProduct && template.type != 'template-only';
    if (!template.layout) {
        if (template.filterDescription && !template.filterDescription.primaryProduct) {
            template.layout = {};
        } else if (template.type && template.type == 'template-only') {
            template.layout = {};
        } else {
            template.layout = {};
        }

    } else {

        // these props are no longer read eventhough it's there (implementation of the old template)
        if (template.layout.panels) {
            delete template.layout.panels;
        }
        if (template.layout.studies) {
            delete template.layout.studies;
        }
    }
    // these props are no longer read eventhough it's there (implementation of the old template)
    if (template.type) {
        delete template.type;
    }

    // newly introduced information
    if (template.addOnSettings==null) {
        template.addOnSettings = {};
    }
    if (template.updateTime == null) {
    }
    if (template.includeProduct== null) {
        template.includeProduct = hasProduct;
    }
}


function tidyUp(userInfos) {
    var reportsByUser = [];
    userInfos.forEach(function (userInfo) {
        userInfo.templates.forEach(function (template) {
            tidyUpTemplateContent(template);
        });
    });
}


function tryExtractTemplates(obj) {
    if (!obj || obj.toUpperCase() == 'NULL') {
        return [];
    }
    try {
        return JSON.parse(obj.trim());
    } catch (e) {
        console.log("Failed to parse: ", obj);
        return [];
    }
}
function generateData(path) {

    var lineReader = readline.createInterface({
        input: fs.createReadStream(path)
    });
    var deferred = q.defer();
    var userInfos = [];
    lineReader.on('line', function (line) {
        var splittedObjects = line.split('\t');
        var extractedTemplates = tryExtractTemplates(splittedObjects[1]);
        userInfos.push({
            userId: splittedObjects[0],
            templates: extractedTemplates
        });

    });
    lineReader.on("close", function () {
        deferred.resolve(userInfos);
    })

    return deferred.promise;
}



function writeSql(outputPath, userInfos) {


    var stream = fs.createWriteStream(outputPath);
    stream.write("DELETE FROM " + table.name);
    stream.write('\n\n');

    function printUserLevelReport(userInfo) {
        var userId = userInfo.userId;
        userInfo.templates.forEach(function (template) {
            var serializedTemplate = JSON.stringify(template);
            serializedTemplate = serializedTemplate.replace(/\'/g, "''");

            var insertInto = "INSERT INTO " + table.name + " ( " + table.columns.userId + " , " + table.columns.template + " )\n";
            var values = "\tVALUES (\n";
            values = values +"\t\t'" + userId + "',\n";
            values = values + "\t\t'" + serializedTemplate + "'\n";
            values = values + "\t)";
            stream.write(insertInto);
            stream.write(values);
            stream.write('\n\n');
        });
    }
    
    userInfos.forEach(printUserLevelReport);
    stream.end();
}


generateData(inputPath).then(function (userInfos) {
    tidyUp(userInfos);
    writeSql(outputPath, userInfos);
});
