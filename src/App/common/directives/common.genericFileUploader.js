agmNgModuleWrapper('agm.common')
    .defineDirectiveForE('agmc-generic-file-uploader', [],
        function(dep, tool) {
            var coreConfigService = dep.coreConfigService,
                coreNotificationService = dep.coreNotificationService;
            return {
                transclude: true,
                link: function(scope, element, attrs, controller) {
                    var dropboxDom = angular.element(element)[0];
                    var inputDom = $(dropboxDom).children()[0];
                    scope.selectFileFunction = function() {
                        inputDom.click();
                    };

                    scope.setCroppedDimensions = function(file) {
                        var getDimensionsPromise = tool.defer();
                        //Only put image through cropping algorithm if file size exceeds 2MB
                        if (file.type.indexOf("image") > -1) {
                            if (file.size > coreConfigService.General.ImageUploadCropLimitMB * 1048576) {
                                var img = new Image();
                                img.src = window.URL.createObjectURL(file);
                                img.onload = function() {
                                    var width = img.naturalWidth;
                                    var height = img.naturalHeight;
                                    if (width > height) {
                                        if (width > 1000) {
                                            height = height * (1000 / width);
                                            width = 1000;
                                        }
                                    } else {
                                        if (height > 1000) {
                                            width = width * (1000 / height);
                                            height = 1000;
                                        }
                                    }
                                    var dimensions = {
                                        ToCrop: true,
                                        Width: width,
                                        Height: height
                                    }
                                    getDimensionsPromise.resolve(dimensions);
                                };
                            } else {
                                var dimensions2 = {
                                    ToCrop: false
                                }
                                getDimensionsPromise.resolve(dimensions2);
                            }
                        } else {
                            getDimensionsPromise.resolve(null);
                        }
                        return getDimensionsPromise.promise;
                    }

                    scope.loadFile = function(file) {
                        scope.isDisabled = true;
                        var reader = new FileReader();
                        reader.onload = function(event) {
                            if (!(scope.acceptedFileTypes[file.type] === true)) {
                                tool.log("File Type Not Supported:" + file.type);
                                var acceptedTypeStr = "";
                                for (var name in scope.acceptedFileTypes) {
                                    if (scope.acceptedFileTypes.hasOwnProperty(name)) {
                                        var parsedFileType = name.substr(name.indexOf('/') + 1, name.length - 1);
                                        acceptedTypeStr += parsedFileType + "/";
                                    }
                                }
                                coreNotificationService.notifyError("Upload File", "Only the following formats are supported: " + acceptedTypeStr);
                                scope.isDisabled = false;
                            } else if (file.size > coreConfigService.General.FileUploadSizeLimitMB * 1048576) {
                                coreNotificationService.notifyError("Upload File", "Please upload a file smaller than " + coreConfigService.General.FileUploadSizeLimitMB + "MB.");
                                scope.isDisabled = false;
                            } else {
                                scope.$evalAsync(function() {
                                    tool.log("File is Loaded");
                                    scope.setCroppedDimensions(file).then(function(res) {
                                        tool.log(res);
                                        var width = (res != null) ? res.Width : null;
                                        var height = (res != null) ? res.Height : null;
                                        var toCrop = (res != null) ? res.ToCrop : false;
                                        scope.onFileLoaded({ fileUrl: event.target.result, fileName: file.name, fileWidth: width, fileHeight: height, toCrop: toCrop });
                                        scope.isDisabled = false;
                                    });
                                });
                            }

                        };
                        reader.onprogress = function(event) {
                            scope.$evalAsync(function() {
                                scope.progress = event;
                            });

                        };
                        reader.onerror = function(evt) {
                            switch (evt.target.error.code) {
                            case evt.target.error.NOT_FOUND_ERR:
                                tool.logError('File Not Found!');
                                break;
                            case evt.target.error.NOT_READABLE_ERR: // we always arrive here, no matter what type of file.  img, pdf, etc.  files are not locked.
                                tool.logError('File is not readable');
                                break;
                            case evt.target.error.ABORT_ERR:
                                break; // noop
                            default:
                                tool.logError('An error occurred reading this file.');
                            };
                        };
                        reader.readAsDataURL(file);
                    };
                    scope.selectFile = function(input) {
                        if (!(input.files && input.files.length === 1)) {
                            return;
                        }
                        var file = input.files[0];
                        scope.loadFile(file);
                    };
                    scope.onClick = function(input) {
                        input.value = '';
                    }

                },
                replace: true,
                template: '<div style="width:100%;height:100%;display:block;">' +
                    '<input type="file" accept="' + '{{vm.uploadFileType}}' + '" style="display:none" onchange="angular.element(this).scope().selectFile(this)" onclick="angular.element(this).scope().onClick(this)"></input>' +
                    '<ng-transclude/>' +
                    '</div>'
            };
        }, {
            onFileLoaded: '&',
            selectFileFunction: '=',
            acceptedFileTypes: "=",
            uploadFileType: "=",
            isDisabled: "="
        }
    );