agmNgModuleWrapper('agms.chart')
    .defineService("sChartStudyService", ['pChartCmsContentLoader', 'pChartFilterDescriptionService'],
    function (serviceObj, dep, tool) {
        var $rootScope = dep.$rootScope,
            coreNotificationService = dep.coreNotificationService,
            pChartCmsContentLoader = dep.pChartCmsContentLoader,
            filterDescription = dep.pChartFilterDescriptionService;

        var chartRenderingUtilsService = null;
        

        function addStudyWithForm(study) {
            if (chartRenderingUtilsService && chartRenderingUtilsService.stxx) {
                var stxx = chartRenderingUtilsService.stxx;
                STX.DialogManager.dismissDialog();
                if (study.propName === "vchart" && _.any(filterDescription.addedStudies, function (e) { return e.propName === "vchart"; })) {
                    coreNotificationService.notifyError("Could not add Volume Chart", "You have already added the Volume Chart.");
                    return;
                }
                STX.Studies.studyDialog(stxx, study.propName, $$('studyDialog'), null);
                if ($$("studyDialog")) {
                    $$("studyDialog").querySelectorAll(".title")[0].innerHTML = study.label;
                }
                STX.DialogManager.displayDialog('studyDialog');
                var instance = study;
                if (!instance.stxxStudy) {
                    instance = {
                        propName: study.propName
                    };
                    filterDescription.addedStudies.push(instance);
                }
                filterDescription.selectedStudy = instance;
            }
        }

        function toggleStudy(study) {
            if (!chartRenderingUtilsService || STX.DialogManager.stack.length > 0) {
                return;
            }
            if (study.included) {
                removeStudy(study);
            } else {
                addStudy(study);
            }
        }

        function getStudyMappings(studies) {
            var studiesDict = {};
            for (var prop in studies) {
                var study = studies[prop];
                var key = generateKeyFromStudy(study);
                if (!studiesDict[key]) {
                    studiesDict[key] = study;
                }
            }
            return studiesDict;
        }

        function generateKeyFromStudy(sd) {
            var type = sd.type;
            var str = type;
            if (sd.inputs) {
                for (var prop in sd.inputs) {
                    if (prop != "id" && prop != "display") {
                        str += "(" + prop + ":" + sd.inputs[prop] + ")";
                    }
                }

            }
            if (sd.outputs) {
                for (var prop in sd.outputs) {
                    str += "(" + prop + ":" + sd.outputs[prop] + ")";
                }
            }
            return str;
        }

        function getCleanUpDuplicatedStudies(studies) {

            var studiesDict = getStudyMappings(studies);
            var newStudies = {};
            for (var item in studiesDict) {
                var study = studiesDict[item];
                newStudies[study.inputs.id] = study;
            }
            return newStudies;
        }

        function addStudy(study) {
            var stxx = chartRenderingUtilsService.stxx;
            study.included = true;
            if (study.sd && study.sd.parameters) {
                delete study.sd.parameters.replaceID;
            }

            if (!study.sd) {
                study.sd = {
                    type: study.propName
                }
            }
            var studiesDict = getStudyMappings(stxx.layout.studies);
            var currentKey = generateKeyFromStudy(study.sd);
            if (!studiesDict[currentKey]) {
                var generatedStudy = STX.Studies.addStudy(stxx, study.propName, study.sd.inputs, study.sd.outputs, study.sd.parameters);
                study.stxxStudy = generatedStudy.name;
                return generatedStudy;
            } else {
                return studiesDict[currentKey];
            }
        }

        function removeStudy(study) {
            var stxx = chartRenderingUtilsService.stxx;
            study.included = false;
            var name = study.stxxStudy || study.name;
            var studyObject = stxx.layout.studies[name];
            if (stxx.panels[name]) {
                stxx.panelClose(stxx.panels[name]);
            }
            if (studyObject) {
                STX.Studies.removeStudy(stxx, studyObject);
            }
        }

        function studyPanelEdit(params) {
            var stx = params.stx;
            var sd = params.sd;
            if (STX.Studies.studyLibrary[sd.type] && STX.Studies.studyLibrary[sd.type].name) $$("studyDialog").querySelectorAll(".title")[0].innerHTML = STX.Studies.studyLibrary[sd.type].name;
            else $$("studyDialog").querySelectorAll(".title")[0].innerHTML = sd.type.capitalize();

            STX.DialogManager.dismissDialog();
            STX.Studies.studyDialog(stx, sd.type, $$("studyDialog"), params);
            STX.DialogManager.displayDialog("studyDialog");
        }

        function studyOverlayEdit(params) {
            var stx = params.stx;
            var sd = params.sd;
            if (stx.openDialog !== "") return; // only allow one dialog to be open
            STX.DialogManager.displayDialog("contextMenu");
            if (STX.Studies.studyLibrary[sd.type] && STX.Studies.studyLibrary[sd.type].name) $$("contextMenu").querySelectorAll(".title")[0].innerHTML = STX.Studies.studyLibrary[sd.type].name;
            else $$("contextMenu").querySelectorAll(".title")[0].innerHTML = sd.type.capitalize();
            if (STX.Studies.studyLibrary[sd.type] && STX.Studies.studyLibrary[sd.type].name) $$("studyDialog").querySelectorAll(".title")[0].innerHTML = STX.Studies.studyLibrary[sd.type].name;
            else $$("studyDialog").querySelectorAll(".title")[0].innerHTML = sd.type.capitalize();

            var edit = $$$(".stx-edit", $$("contextMenu"));
            var remove = $$$(".stx-delete", $$("contextMenu"));
            STX.safeClickTouch(edit, function () {
                STX.DialogManager.dismissDialog();
                STX.Studies.studyDialog(stx, sd.type, $$("studyDialog"), params);
                STX.DialogManager.displayDialog("studyDialog");
            });
            STX.safeClickTouch(remove, function () {
                STX.DialogManager.dismissDialog();
                var removeFN = sd.libraryEntry.removeFN ? sd.libraryEntry.removeFN : STX.Studies.removeStudy;
                removeFN(stx, sd);
                $rootScope.$broadcast("studyRemoved", sd.name);
                adjustExtraViewStatesForStudy(cru, sd);
                var closeIcon = $$$("#menuWrapperStudies #" + sd.type.replace(" ", "-"));
                if (closeIcon) {
                    STX.clearSafeClickTouches(closeIcon);
                    closeIcon.style.display = "";
                }
            });
        }

        function adjustExtraViewStatesForStudy(cru, study) {
            if (study && cru && cru.tradersGPSSwingStudies) {
                switch (study.inputs.display) {
                    case 'MA10':
                        cru.tradersGPSSwingStudies.ma10Visibility = false;
                        break;
                    case 'MA20':
                        cru.tradersGPSSwingStudies.ma20Visibility = false;
                        break;
                    case 'MA40':
                        cru.tradersGPSSwingStudies.ma40Visibility = false;
                        break;
                }
            }
        }
        
        function init(cru) {
            chartRenderingUtilsService = cru;
            chartRenderingUtilsService.stxx.callbacks.studyPanelEdit = studyPanelEdit;
            chartRenderingUtilsService.stxx.callbacks.studyOverlayEdit = studyOverlayEdit;
            if (!filterDescription) {
                return;
            }
            if (!filterDescription.studies) {
                var studyLibrary = STX.Studies.studyLibrary;
                var studies = [];
                var studiesFromCms = [];
                for (var prop in studyLibrary) {
                    var label = studyLibrary[prop].name || prop;
                    studies.push({
                        propName: prop,
                        label: label
                    });
                }
                studies = _.sortBy(studies, function (s) {
                    return s.label;
                });

                //map study categories, "Popular Studies" should be the first
                filterDescription.studyCategories = ["Popular Studies"];
                pChartCmsContentLoader.getStudies().then(function (res) {
                    studiesFromCms = res;

                    studiesFromCms.forEach(function (study) {
                        study.categories.forEach(function (cat) {
                            if (!_.includes(filterDescription.studyCategories, cat.name)) {
                                filterDescription.studyCategories.push(cat.name);
                            }
                        });
                    });

                    studies.forEach(function (s) {
                        studiesFromCms.forEach(function (sfc) {
                            if (sfc.name === s.propName) {
                                s.categories = sfc.categories.map(function (x) { return x.name; });
                                if (sfc.displayName) {
                                    s.label = sfc.displayName;
                                }
                                s.description = sfc.description;
                            }
                        });
                    });
                });

                filterDescription.selectedStudy = null;
                filterDescription.studies = studies;
                filterDescription.dismissStudy = function () {
                    STX.DialogManager.dismissDialog();
                    filterDescription.selectedStudy = null;
                };
                filterDescription.updateStudy = function () {
                    var stxx = chartRenderingUtilsService.stxx;
                    var selectedStudy = filterDescription.selectedStudy;
                    var div = $$("studyDialog");
                    var studyName = div.study;
                    var sd = STX.Studies.parseDialog(div, stxx);

                    var duplicates = _.find(filterDescription.addedStudies, function (study) {
                        if (study.sd) {
                            return _.isEqual(study.propName, studyName)
                                && _.isEqual(study.sd.inputs, sd.inputs);
                        } else return false;
                    });
                    if (selectedStudy) {
                        if (duplicates) {
                            coreNotificationService.notifyError("Duplicate Studies", "The study you are trying to add already exists");
                        } else {
                            STX.DialogManager.dismissDialog();
                            filterDescription.selectedStudy = null;
                            selectedStudy.included = true;
                            selectedStudy.sd = sd;
                            var studyDescriptor = STX.Studies.go(div, stxx);
                            selectedStudy.stxxStudy = studyDescriptor.name; // Note, please add stxx as second parameter in order to translate studies
                            selectedStudy.display = studyDescriptor.display;
                        }
                    } else {
                        selectedStudy = _.find(filterDescription.addedStudies, function (study) {
                            return study.stxxStudy === div.replaceID;
                        });
                        if (duplicates && duplicates !== selectedStudy) {
                            coreNotificationService.notifyError("Duplicate Studies", "The study you are trying to add already exists");
                        } else {
                            if (!_.isEqual(selectedStudy.sd, sd)) {
                                selectedStudy.sd = sd;
                                selectedStudy.stxxStudy = STX.Studies.go(div, stxx).name; // Note, please add stxx as second parameter in order to translate studies
                            }
                            STX.DialogManager.dismissDialog();
                        }
                    }
                };
                synchronizeStudyToggle();
            }
            if (!filterDescription.addedStudies) {
                filterDescription.addedStudies = [];
            }
        }

        function synchronizeStudyToggle(stxx) {
            if (filterDescription.addedStudies && filterDescription.addedStudies.length > 0) {
                filterDescription.addedStudies.forEach(function (study) {
                    //dep.$window.setTimeout(function () {
                    var studyObject = stxx.layout.studies[study.stxxStudy];
                    study.included = studyObject ? true : false;
                    //});
                });
            }
        }

        function findVChartAndSetVisibility(visibility) {
            var vchart = _.find(filterDescription.addedStudies, function (e) {
                return e.propName === "vchart";
            });
            if (vchart) {
                if (visibility != vchart.included) {
                    toggleStudy(vchart);
                }
            }
        }

        function tryRemovingStudyByName(studyName) {
            var r = _.find(filterDescription.addedStudies, function (e) {
                return e.stxxStudy === studyName;
            });
            if (r) {
                r.included = false;
            }
        }

        function tryRemoveStudy(study) {
            if (!study) {
                return;
            }
            try {
                removeStudy(study);
            } catch (e) {

            }
        }

        function overrideStudyDisplay(studyName) {
            // HACK: the display 'vchart' is ugly. We want to display it as 'volume' instead
            // PD-1396: HACK vchart (true) & vchart (false) => volume
            return (studyName.indexOf('vchart') > -1) ? 'volume' : studyName;
        }

        tool.setServiceObjectProperties({
            findVChartAndSetVisibility: findVChartAndSetVisibility,
            tryRemovingStudyByName: tryRemovingStudyByName,
            getCleanUpDuplicatedStudies: getCleanUpDuplicatedStudies,
            tryRemoveStudy: tryRemoveStudy,
            removeStudy: removeStudy,
            addStudy: addStudy,
            toggleStudy: toggleStudy,
            studyPanelEdit: studyPanelEdit,
            addStudyWithForm: addStudyWithForm,
            studyOverlayEdit: studyOverlayEdit,
            overrideStudyDisplay: overrideStudyDisplay,
            init: init
        });
    });