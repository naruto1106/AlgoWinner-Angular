var fs = require('fs');
var readline = require('readline');

var find = require('gulp-find');
var q = require('q');
var path = require('path');
var tap = require('gulp-tap');
var gulp = require('gulp');
var glob = require("glob");

var agmNg = require('./Assets/lib/agm/agmNgModuleWrapper.js');
var agmNgModuleWrapperUtils = agmNg.agmNgModuleWrapperUtils;
var agmNgModuleMemory = agmNg.agmNgModuleMemory;
var agmNgModuleWrapper = agmNg.agmNgModuleWrapper;


function findingMethods(content, methodName) {


    methodName = methodName.replace('.', '\\.');
    methodName = methodName.replace('$', '\\$');
    var regex = new RegExp(methodName + "\\(", "g");
    var regexIndexes = [];
    while (match = regex.exec(content)) {
        regexIndexes.push(match.index);
    }
    var methods = [];

    regexIndexes.forEach(function (startingIndex) {
        var encounter = 0;
        var deep = 0;
        var terminatingIndex = startingIndex;
        var isWithinQuote1 = false;
        var isWithinQuote2 = false;
        for (var i = startingIndex; i < content.length; i++) {
            if (content[i] == '"') {
                isWithinQuote1 = !isWithinQuote1;
            }
            if (content[i] == '"') {
                isWithinQuote2 = !isWithinQuote2;
            }
            if (!isWithinQuote1 && !isWithinQuote2) {
                if (content[i] == '(') {
                    encounter++;
                    deep++;
                }
                if (content[i] == ')') {
                    deep--;
                }
            }
            if (deep <= 0 && encounter>0) {
                 terminatingIndex = i+1;
                break;
            }
        }

        methods.push(content.substring(startingIndex, terminatingIndex));
    });
    return methods;
}

function extractOnlyPath(str) {
    return str.replace(/(templateUrl(\s*)\:(\s*))/g, "")
        .replace(/(\"|\')/g, "")
        .trim();
}

function iterateJsFiles() {
    var deferred = q.defer();
    var dict = [];
    gulp.src(['App/**/*.js', '!App/legacy/**/*.*'])
        .pipe(tap(function (file, t) {
            var pathName = file.path;

            var relativePathName = path.relative(__dirname, pathName);
            var files = glob.sync(relativePathName, {});
            dict["./" + files[0]] = true;
        }))
        .on('end', function () {
            deferred.resolve(dict);
        });
    return deferred.promise;
}
function runEvalJs(path) {
    var filedata = fs.readFileSync(path, 'utf8');
    try {
       
        eval(filedata);        
    }catch(e) {
        console.log("\terror: " + e.message);
        console.log(e.stack);

    }
};


function onJsLoaded() {
    return iterateJsFiles().then(function (filesDict) {
        for (var prop in filesDict) {
            runEvalJs(prop);
        }
        return;
    });
}

var regexSyntaxSet = {
    prefix: "(\\s|dep.|\\()",
    dotAfter: "(\\.(\\$|\\w)(\\w|\\d)+)*"
};

function generateRegexForPropUsage(prop) {
    return new RegExp(regexSyntaxSet.prefix + prop + regexSyntaxSet.dotAfter+"(?=\\.|\\;|\\s|\\,)", "g");
}
function generateRegexForFuncUsage(prop) {
    return new RegExp(regexSyntaxSet.prefix + prop + regexSyntaxSet.dotAfter + "(?=\\()", "g");
}

function extractContentFromPropCall(content, prop) {

    var sanitizedProp = prop.replace('$', '\\$');
    var regexExtract = new RegExp(regexSyntaxSet.prefix + sanitizedProp + regexSyntaxSet.dotAfter + "(?=(\\.|\\(|\\,|\\s|\\;|\\n|\\r))", "g");
    var regexExtractPropName = new RegExp(regexSyntaxSet.prefix + sanitizedProp + "\\.*", "g");
    function extractProp(text) {
        var newText = text + " ";
        newText = newText.match(regexExtract)[0];
        newText = newText.replace(regexExtractPropName, "");
        var arr = newText.split('.');
        if (arr.length && arr.length > 0) {
            return arr[0].trim();
        }
        return newText.trim();
    }

    var findings = {};
    var pattern1 = generateRegexForPropUsage(sanitizedProp);
    var searchResult1 = content.match(pattern1);
    if (searchResult1) {

        searchResult1.forEach(function (i) {
            var subPropName = extractProp(i);
            if (subPropName.length == 0) {
                subPropName = "__self";
            }
            if (!findings[subPropName]) {
                findings[subPropName] = {
                    type: "object",
                    list:[]
                };
            }
            findings[subPropName].list.push(i);
        });
    }

    var pattern2 = generateRegexForFuncUsage(sanitizedProp);
    var searchResult2 = content.match(pattern2);
    if (searchResult2) {

        searchResult2.forEach(function (i) {
            var subPropName = extractProp(i);
            if (!findings[subPropName]) {
                findings[subPropName] = {
                    type: "function",
                    list: []
                };
            }
            findings[subPropName].list.push(i);
        });
    }
    var count = 0;
    for (var p in findings) {
        count++;
    }
    if (count == 0) {
        return null;
    }

    if (findings["__self"]) {
       delete findings["__self"];
    }
    return findings;
}

function analyzeController(controllerDef) {


    var vm = {};
    var deps = {};
    controllerDef.depArray.forEach(function (i) {
        deps[i] = {};
    });
    deps.$scope = {
        $eventToObservable: function () {

        },
        $on: function () {

        },
    };
    deps.$rootScope = {
        $eventToObservable: function () {

        },
        $on: function () {

        },
    };
    var tool = agmNgModuleWrapperUtils.agmControllerTool(vm, deps);


    var contentDescriptor = {
        dependencyInjections: {},
        controllerDef: controllerDef
    };
    var funcAsString = controllerDef.func.toString();

    contentDescriptor.vm = extractContentFromPropCall(funcAsString, "vm");
    contentDescriptor.dep = extractContentFromPropCall(funcAsString, "dep");
    contentDescriptor.tool = extractContentFromPropCall(funcAsString, "tool");

    var extendedFuncAsString = funcAsString + "\r\n";
    for (var prop in contentDescriptor.tool) {
        extendedFuncAsString+="\r\n"+tool[prop].toString()+"\r\n";
    }
    for (var prop in contentDescriptor.vm) {
        if (contentDescriptor.vm[prop].type == 'function' && vm[prop] && vm[prop].toString) {
            extendedFuncAsString += "\r\n" + vm[prop].toString() + "\r\n";
        }
    }
    controllerDef.depArray.forEach(function (dep) {
        var findings = extractContentFromPropCall(extendedFuncAsString, dep);
        if (findings) {
            contentDescriptor.dependencyInjections[dep] = findings;
        }
    });


    var methods = findingMethods(funcAsString,'tool.setVmProperties');
    if (methods) {
        contentDescriptor.setVmProperties = [];
        methods.forEach(function (method) {
            contentDescriptor.setVmProperties.push({
                properties: executeMethodWithSafeAssignment(method),
                method: method
            });

        });
    }

    return contentDescriptor;
};

function analyzeService(serviceDef) {
    var serviceObj = {};
    var deps = {};
    serviceDef.depArray.forEach(function (i) {
        deps[i] = {};
    });
    deps.$rootScope = {
        $eventToObservable: function () {

        },
        $on: function () {

        },
    };
    var tool = agmNgModuleWrapperUtils.agmServiceTool(serviceObj, deps);
    var contentDescriptor = {
        dependencyInjections: {},
        serviceDef: serviceDef
    };
    var funcAsString = serviceDef.func.toString();
    contentDescriptor.serviceObj = extractContentFromPropCall(funcAsString, "serviceObj");
    contentDescriptor.dep = extractContentFromPropCall(funcAsString, "dep");
    contentDescriptor.tool = extractContentFromPropCall(funcAsString, "tool");

    var extendedFuncAsString = funcAsString + "\r\n";
    for (var prop in contentDescriptor.tool) {
        extendedFuncAsString += "\r\n" + tool[prop].toString() + "\r\n";
    }
    for (var prop in contentDescriptor.serviceObj) {
        if (contentDescriptor.serviceObj[prop].type == 'function' && serviceObj[prop] && serviceObj[prop].toString) {
            extendedFuncAsString += "\r\n" + serviceObj[prop].toString() + "\r\n";
        }
    }
    serviceDef.depArray.forEach(function (dep) {
        var findings = extractContentFromPropCall(extendedFuncAsString, dep);
        if (findings) {
            contentDescriptor.dependencyInjections[dep] = findings;
        }
    });
    var methods = findingMethods(funcAsString, 'tool.setServiceObjectProperties');
    if (methods) {
        contentDescriptor.setServiceObjectProperties = [];
        methods.forEach(function (method) {
            contentDescriptor.setServiceObjectProperties.push({
                properties: executeMethodWithSafeAssignment(method),
                method: method
            });

        });
    }
    return contentDescriptor;
}

function executeMethodWithSafeAssignment(str) {
    var returnedProps = [];
    var iterateFunc = function(myObject) {
        returnedProps = [];
        for (var prop in myObject) {
            returnedProps.push(prop);
        }

    };
    var tool = {
        setVmProperties: iterateFunc,
        setServiceObjectProperties: iterateFunc
    };

    function replaceBetween(string, start, end, what) {
        return string.substring(0, start) + what + string.substring(end);
    };

    var compiledStr = str;

    var innerBracketStartingIndex = 0;
    var innerBracketEndingIndex = 0;
    var hasInner = false;
    var count = 0;
    
    do {
        var openBracketCount = 0;
        hasInner = false;
        for (var i = 0; i < compiledStr.length; i++) {
            if (compiledStr[i] == "{") {
                openBracketCount++;
                if (openBracketCount == 2) {
                    innerBracketStartingIndex = i;
                }

            } else if (compiledStr[i] == "}") {
                if (openBracketCount == 2) {
                    innerBracketEndingIndex = i;
                    compiledStr = replaceBetween(compiledStr, innerBracketStartingIndex, innerBracketEndingIndex+1, "");
                    hasInner = true;
                    break;
                }
                openBracketCount--;
            }
        }
    } while (hasInner);
    
    compiledStr = compiledStr.replace(/\:\s*.+/g, ": null,");
    console.log(compiledStr);
    eval(compiledStr);
    return returnedProps;
}
function generateMockObjects(obj) {
    
};

function createMockControllerDependenciesDefinition(depList) {

    var providerDefinitionLists = "";
    for (var prop in depList) {
        var dependency = depList[prop];


        var hasConstructor = false;
        for (var prop2 in dependency) {
            if (prop2 == "") {
                hasConstructor = true;
            }
        }
        if (hasConstructor) {
            providerDefinitionLists += "\r\n" + prop + " = jasmine.createSpy();";
            for (var prop2 in dependency) {
                if (prop2 != "") {
                    providerDefinitionLists += "\r\n" + prop + "." + prop2 + " = jasmine.createSpy();";
                }
            }
        } else {
            providerDefinitionLists += "\r\n" + prop + " = {";
            for (var prop2 in dependency) {
                if (prop2 != "") {
                    providerDefinitionLists += "\r\n\t" + prop2 + " : ";
                    providerDefinitionLists += "jasmine.createSpy(),";
                }
            }
            providerDefinitionLists += "\r\n};";
        }



    }
    generateMockObjects();
    return providerDefinitionLists;
}

function createMockServiceDependenciesDefinitionsAndInjections(depList) {

    var providerDefinitionLists = "";
    for (var prop in depList) {
        var dependency = depList[prop];


        var hasConstructor = false;
        var hasFunction = false;
        for (var prop2 in dependency) {
            if (prop2 == "") {
                hasConstructor = true;
            }
            if (prop2 != "" && dependency[prop2].type == 'function') {
                hasFunction = true;
            }
        }
        if (hasConstructor) {            
            providerDefinitionLists += "\r\n" + prop + " = jasmine.createSpy();";
            for (var prop2 in dependency) {
                if (prop2 != "") {
                    providerDefinitionLists += "\r\n" + prop + "." + prop2 + " = jasmine.createSpy();";
                }
            }
            providerDefinitionLists += "\r\n" + prop + " = $provide.value('" + prop + "'," + prop + ");";
        } else if (hasFunction) {
            providerDefinitionLists += "\r\n" + prop + " = $provide.service('" + prop + "',[\r\n\t'$q',\r\n\tfunction ($q) {";
            for (var prop2 in dependency) {
                if (prop2 != "") {
                    providerDefinitionLists += "\r\n\t\tthis."+prop2+" = jasmine.createSpy();";
                }
            }
            providerDefinitionLists += "\r\n}]);";
        }
    }
    generateMockObjects();
    return providerDefinitionLists;
}

function createInjectedDependencies(depList) {
    var providerListStr = "";
    for (var prop in depList) {
        providerListStr += "\r\n$provide.value('" + prop + "', " + prop + ");";
    }
    return providerListStr;
}

function generateEmptyTestMethodBasedOnVmMethods(vmMethodArr) {
    var str = "";
    var nonDuplicateCheck = {};
    vmMethodArr.forEach(function (methodName) {
        if (nonDuplicateCheck[methodName]) {
            return;
        }
        nonDuplicateCheck[methodName] = true;

        str += "\r\nit('should do something on " + methodName + "', function () {";
        str += "\r\n\t//todo: preset value\r\n";
        str += "\r\n\t//test";
        str += "\r\n\tctrl." + methodName+"();\r\n";
        str += "\r\n\t//todo: expectation\r\n";
        str += "\r\n});\r\n";
    });
    return str;
}
function generateEmptyTestMethodBasedOnServiceMethods(serviceMethodArr) {
    var str = "";
    var nonDuplicateCheck = {};
    serviceMethodArr.forEach(function (methodName) {
        if (nonDuplicateCheck[methodName]) {
            return;
        }
        nonDuplicateCheck[methodName] = true;

        str += "\r\nit('should do something on " + methodName + "', function () {";
        str += "\r\n\t//todo: preset value\r\n";
        str += "\r\n\t//test";
        str += "\r\n\ttestedService." + methodName + "();\r\n";
        str += "\r\n\t//todo: expectation\r\n";
        str += "\r\n});\r\n";
    });
    return str;
}

function generateInitialControllerProperties(vmProps) {
    var str = "";
    var nonDuplicateCheck = {};

    str += "\r\nit('initial check', function () {";
    vmProps.forEach(function (prop) {
        if (nonDuplicateCheck[prop]) {
            return;
        }
        nonDuplicateCheck[prop] = true;
        str += "\r\n\texpect(ctrl." + prop + ").toBeDefined();";
    });
    str += "\r\n});\r\n";
    return str;
}

function generateInitialServiceProperties(serviceProps) {
    var str = "";
    var nonDuplicateCheck = {};

    str += "\r\nit('initial check', function () {";
    serviceProps.forEach(function (prop) {
        if (nonDuplicateCheck[prop]) {
            return;
        }
        nonDuplicateCheck[prop] = true;
        str += "\r\n\texpect(testedService." + prop + ").toBeDefined();";
    });
    str += "\r\n});\r\n";
    return str;
}

function generateDependencyString(descriptor) {
    var str = "";
    for (var prop in descriptor.dep) {
        var value = "{}";
        if (descriptor.dependencyInjections[prop]) {
            value = prop;
        }
        str += "\r\n\t" + prop + ":" + value + ",";
    }
    return str;
}



function loadControllerTemplate() {
    var deferred =  q.defer();
    fs.readFile(__dirname + '/tester.template.controller.js', function (err, data) {
        if (err) {
            throw err;
        }
        deferred.resolve(data);
    });
    return deferred.promise;
}

function loadServiceTemplate() {
    var deferred = q.defer();
    fs.readFile(__dirname + '/tester.template.service.js', function (err, data) {
        if (err) {
            throw err;
        }
        deferred.resolve(data);
    });
    return deferred.promise;
}

moment = {};

function generateTesterForController(descriptor) {
    var dependenciesDefinitions = createMockControllerDependenciesDefinition(descriptor.dependencyInjections);
    var providersInjections = createInjectedDependencies(descriptor.dependencyInjections);
    var methods = [];
    var props = [];
    for (var prop in descriptor.vm) {
        if (descriptor.vm[prop].type == 'function') {
            methods.push(prop);
        } else {
            props.push(prop);
        }
    }

    descriptor.setVmProperties.forEach(function(vmProp) {
        methods = methods.concat(vmProp.properties);
        props = props.concat(vmProp.properties);
    });
    var initialControllerProperties = generateInitialControllerProperties(props);
    var functionTest = generateEmptyTestMethodBasedOnVmMethods(methods);
    var controllerInjections = generateDependencyString(descriptor);

    var stream = fs.createWriteStream('jstests/'+descriptor.controllerDef.name+'.tests.js');

    var scopeVars = [];
    for (var prop in descriptor.dependencyInjections) {
        scopeVars.push(prop);
    }

    loadControllerTemplate().then(function(data) {
        try {


            var template = data.toString();


            template = template.replace("__TEST_NAME", "Testing Controller '" + descriptor.controllerDef.name + "' under '" + descriptor.controllerDef.moduleName + "'");
            template = template.replace("__MODULE_NAME", descriptor.controllerDef.moduleName);
            template = template.replace("__CONTROLLER_NAME", descriptor.controllerDef.name + " as vm");
            template = template.replace("/*scopeVars*/", "\r\nvar " + scopeVars.join(',') + ";");
            template = template.replace("/*dependenciesDefinitions*/", dependenciesDefinitions);
            template = template.replace("/*providersInjections*/", providersInjections);
            template = template.replace("/*controllerInjections*/", controllerInjections);
            template = template.replace("/*functionTest*/", initialControllerProperties + "\r\n" + functionTest);
            stream.write(template);
        } catch (e) {
            console.log(e.message);
            console.log(e.stack);
        }


    });

}

function generateTesterForService(descriptor) {
    var dependenciesDefinitionsAndInjections = createMockServiceDependenciesDefinitionsAndInjections(descriptor.dependencyInjections);
    var methods = [];
    var props = [];
    for (var prop in descriptor.serviceObj) {
        if (descriptor.serviceObj[prop].type == 'function') {
            methods.push(prop);
        } else {
            props.push(prop);
        }
    }

    descriptor.setServiceObjectProperties.forEach(function (serviceProp) {
        methods = methods.concat(serviceProp.properties);
        props = props.concat(serviceProp.properties);
    });
    var initialServiceProperties = generateInitialServiceProperties(props);
    var functionTest = generateEmptyTestMethodBasedOnServiceMethods(methods);
    var serviceInjections = generateDependencyString(descriptor);

    var stream = fs.createWriteStream('jstests/' + descriptor.serviceDef.name + '.tests.js');

    var scopeVars = [];
    for (var prop in descriptor.dependencyInjections) {
        scopeVars.push(prop);
    }
    loadServiceTemplate().then(function (data) {
        try {
            var template = data.toString();
            template = template.replace("__TEST_NAME", "Testing Service '" + descriptor.serviceDef.name + "' under '" + descriptor.serviceDef.moduleName + "'");
            template = template.replace("__MODULE_NAME", descriptor.serviceDef.moduleName);
            template = template.replace("_tobeTestedServiceName_", "_" + descriptor.serviceDef.name + "_");
            template = template.replace("_tobeTestedServiceName_", "_" + descriptor.serviceDef.name + "_");
            template = template.replace("/*scopeVars*/", "\r\nvar " + scopeVars.join(',') + ";");
            template = template.replace("/*dependenciesDefinitionsAndInjections*/", dependenciesDefinitionsAndInjections);
            template = template.replace("/*serviceInjections*/", serviceInjections);
            template = template.replace("/*functionTest*/", initialServiceProperties + "\r\n" + functionTest);
            stream.write(template);
        } catch (e) {
            console.log(e.message);
            console.log(e.stack);

        }


    });
}

angular = {
    module: function () {
        var obj = {
            service: function () {
                return obj;
            },
            factory: function () {
                return obj;
            },
            controller: function (name, arr) {
                return obj;
            },
            directive: function () {
                return obj;
            },
            run: function () {
                return obj;
            },
            filter: function () {
                return obj;
            },
            config: function () {
                return obj;
            },
            constant: function () {
                return obj;
            }
        }

        return obj;
    },
    
};



//'p.community.SearchController'
var moduleName = "";
moduleName = process.argv[2].trim();

onJsLoaded().then(function() {
    var data, descriptor;
    try {
        if (agmNgModuleMemory.controllerMapper[moduleName]) {
            console.log("loading controller: '" + moduleName + "'");
            data = agmNgModuleMemory.controllerMapper[moduleName];
            descriptor = analyzeController(data);
            console.log("\tdescriptor loaded");
            console.log(JSON.stringify(descriptor));
            generateTesterForController(descriptor);
            console.log("\tfile generated");
        } else if (agmNgModuleMemory.serviceMapper[moduleName]) {
            console.log("loading service: '" + moduleName + "'");
            data = agmNgModuleMemory.serviceMapper[moduleName];
            console.log("\tdescriptor loaded");
            descriptor = analyzeService(data);
            console.log(JSON.stringify(descriptor));
            generateTesterForService(descriptor);
            console.log("\tfile generated");        
        }else{
            console.log("unable to load provider: '" + moduleName + "' is not available");
        }
    } catch (e) {
        console.log(e.message);
        console.log(e.stack);

    }
});

