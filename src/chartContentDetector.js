var fs = require('fs');
var readline = require('readline');
var inputPath = 'UserChartDump.txt';
var outputPath = 'UserChartDump.report.tsv';
var q = require('q');

function createTemplateReport(template) {
    var obsolete = [];
    var danger = [];
    var warning = [];

    // thou shalt always have filter description
    if (!template.filterDescription) {
        danger.push("no filterDescription")
    } else {
        // show legends on chart is newly introduced, therefore not available in older template
        if (!template.filterDescription.showLegendsOnChart) {
            warning.push("showLegendsOnChart");
        }
        // normalize to percentage on chart is newly introduced, therefore not available in older template
        if (!template.filterDescription.normalizeToPercentage) {
            warning.push("normalizeToPercentage");
        }
        // panel proportions on chart is newly introduced, therefore not available in older template
        if (!template.filterDescription.panelProportions) {
            warning.push("panelProportions");
        }
    }


    if (!template.layout) {
        // you may not have template layout for certain reasons, if you don't have primary product
        if (template.filterDescription && !template.filterDescription.primaryProduct) {
            warning.push("no layout and no primary product");
            // or if it is explicitly declared to be template-only
        } else if (template.type && template.type == 'template-only') {
            warning.push("no layout and template-only");
            // but if not, it's bad idea (the worst: you lose bar type)
        } else {
            danger.push("no layout");
        }

    } else {

        // these props are no longer read eventhough it's there (implementation of the old template)
        if (template.layout.panels) {
            obsolete.push("panels");
        }
        if (template.layout.studies) {
            obsolete.push("studies");
        }
    }
    // these props are no longer read eventhough it's there (implementation of the old template)
    if (template.type) {
        obsolete.push("type");
    }

    // newly introduced information
    if (!template.addOnSettings) {
        warning.push("addOnSettings");
    }
    if (!template.updateTime) {
        warning.push("updateTime");
    }
    if (!template.includeProduct) {
        warning.push("includeProduct");
    }


    return {
        warning: warning,
        obsolete: obsolete,
        danger: danger
    };
}

function createUserLevelReport(userInfo) {

    var reports = [];
    userInfo.templates.forEach(function (template) {
        var report = createTemplateReport(template);
        reports.push({
            templateId : template.id,
            templateName: template.name,
            danger: report.danger,
            obsolete: report.obsolete,
            warning: report.warning
        })
    });
    var userLevelReport = {
        userId: userInfo.userId,
        reports: reports,
        templateCount: userInfo.templates.length
    }
    return userLevelReport;
}

function generateFullReport(userInfos) {
    var reportsByUser = [];
    userInfos.forEach(function (userInfo) {
        var userLevelReport = createUserLevelReport(userInfo);
        reportsByUser.push(userLevelReport);
    });
    return reportsByUser;
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



function writeReport(outputPath, fullReport) {
    var stream = fs.createWriteStream(outputPath);
    var separator = "\t"
    var header = "UserId" +
        separator + "TemplateId" +
        separator + "TemplateName" +
        separator + "Obsolete" +
        separator + "Warning" +
        separator + "Danger";
    stream.write(header);
    stream.write('\n');
    function printUserLevelReport(userLevelReport) {
        userLevelReport.reports.forEach(function (report, idx) {
            var userId = idx == 0 ? userLevelReport.userId : "";
            var lineMessage = userId +
                separator + report.templateId +
                separator + report.templateName +
                separator + report.obsolete.join(', ') +
                separator + report.warning.join(', ') +
                separator + report.danger.join(', ');
            stream.write(lineMessage);
            stream.write('\n');
        });
    }
    
    fullReport.forEach(printUserLevelReport);
    stream.end();
}


generateData(inputPath).then(function (userInfos) {
    var fullReport = generateFullReport(userInfos);
    writeReport(outputPath, fullReport);
});
