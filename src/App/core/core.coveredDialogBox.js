agmNgModuleWrapper('agm.core')
    .defineDirectiveStrictByTag('agmc-covered-dialog-box',
    ["coreCoveredDialogBoxService"],
        function (dep) {
            var coreCoveredDialogBoxService = dep.coreCoveredDialogBoxService;
            return {
                restrict: 'A',

                link: function(scope, element) {
                    coreCoveredDialogBoxService.register(scope.agmSharedCoveredDialogBoxId, scope, $(element));
                }
            };
        },
        {
            agmSharedCoveredDialogBoxId: "="
        }
    )
    .defineServiceStrict('coreCoveredDialogBoxService', [],
        function(serviceObj,dep,tool) {
            var $compile = dep.$compile,
                $controller = dep.$controller,
                $http = dep.$http;

            tool.setServiceObjectProperties({
                dictionary: {},
                register: function(id, parentScope, parentElement) {
                    var coveredElement = $('<div class="covered-dialog-box" id="' + id + '"></div>');
                    parentElement.append(coveredElement);
                    coveredElement.css("display", "none");
                    serviceObj.dictionary[id] = {
                        parentScope: parentScope,
                        parentElement: parentElement,
                        coveredElement: coveredElement
                    };
                },
                openDialog: function(id, options) {
                    if (!serviceObj.dictionary[id]) {
                        return null;
                    }
                    var content = serviceObj.dictionary[id];
                    if (!options.templateUrl) {
                        return null;
                    }

                    var modalInstanceComponent = serviceObj.generateModalInstanceComponent(content);
                    $http.get(options.templateUrl).then(function(res) {
                        serviceObj.showBasic(content, options, res.data, modalInstanceComponent.modalInstance);
                    });
                    return {
                        result: modalInstanceComponent.promise,
                        dismiss: modalInstanceComponent.modalInstance.dismiss
                    }
                },
                closeDialog: function(id) {
                    if (!serviceObj.dictionary[id]) {
                        return null;
                    }
                    var content = serviceObj.dictionary[id];
                    serviceObj.hideBasic(content);
                },
                showBasic: function(content, options, template, modalInstance) {
                    content.coveredElement.css("display", "block");
                    var coveredElement = content.coveredElement.get()[0];
                    coveredElement.innerHTML = '' +
                        '<div class="modal-dialog">' +
                        '  <div class="modal-content">' + template + '</div>' +
                        '</div>';
                    var modalScope = content.parentScope.$new();

                    var localsInjection = {};
                    localsInjection.$scope = modalScope;
                    localsInjection.modalInstance = modalInstance;
                    if (options.resolve) {
                        angular.forEach(options.resolve, function(value, key) {
                            localsInjection[key] = value();
                        });
                    }

                    var controller = $controller(options.controller, localsInjection);
                    if (options.controllerAs) {
                        if (options.bindToController) {
                            angular.extend(controller, localsInjection);
                        }
                        modalScope[options.controllerAs] = controller;
                    }
                    content.modalScope = modalScope;
                    $compile(coveredElement)(modalScope);
                    return true;
                },
                generateModalInstanceComponent: function(content) {
                    var deferred = tool.defer();
                    return {
                        modalInstance: {
                            close: function(item) {
                                serviceObj.hideBasic(content);
                                deferred.resolve(item);
                            },
                            dismiss: function(item) {
                                serviceObj.hideBasic(content);
                                deferred.reject(item);
                            }
                        },
                        promise: deferred.promise
                    };
                },
                hideBasic: function(content) {
                    content.coveredElement.css("display", "none");
                    var coveredElement = content.coveredElement.get()[0];
                    coveredElement.innerHTML = "";
                    content.modalScope.$destroy();
                }
            });
        }
    );