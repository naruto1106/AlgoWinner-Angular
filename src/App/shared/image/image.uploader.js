agmNgModuleWrapper('agms.image')
    .defineDirectiveForE('agms-image-uploader', [],
        function(dep, tool) {
            return {
                link: function(scope, element, attrs, controller) {
                    var dropboxDom = angular.element(element)[0];
                    var inputDom = $(dropboxDom).children()[0];
                    scope.selectFileFunction = function() {
                        inputDom.click();
                    };

                    function dragEnterLeave(evt) {
                        evt.stopPropagation();
                        evt.preventDefault();
                    }

                    var acceptedImageTypes = {
                        'image/png': true,
                        'image/jpeg': true,
                        'image/gif': true
                    };
                    dropboxDom.addEventListener("dragenter", dragEnterLeave, false);
                    dropboxDom.addEventListener("dragleave", dragEnterLeave, false);
                    dropboxDom.addEventListener("dragover", dragEnterLeave, false);
                    dropboxDom.addEventListener("drop", function(evt) {
                        evt.stopPropagation();
                        evt.preventDefault();
                        if (!(evt.dataTransfer && evt.dataTransfer.items && evt.dataTransfer.items.length === 1)) {
                            return;
                        }
                        var imageFile = evt.dataTransfer.files[0];
                        scope.loadFile(imageFile);
                    });
                    scope.loadFile = function(file) {
                        if (!scope.validationFunc) {
                            scope.validationFunc = function(file) {
                                var maxFileSize = 2 * 1024 * 1024;
                                var fileSizeOk = file.size < maxFileSize;
                                var fileFormatOk = (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/gif");
                                var message = "";
                                if (!fileSizeOk) {
                                    message = "Invalid file! File exceeds 2MB."; //Current size: " + parseInt(100 * file.size / maxFileSize) / 100 + "mb.";
                                }
                                if (!fileFormatOk) {
                                    message = "Invalid file format!";
                                }
                                return {
                                    result: fileFormatOk && fileSizeOk,
                                    message: message

                                };
                            }
                        }
                        var validationResult = scope.validationFunc(file);
                        if (!validationResult.result) {
                            scope.onFileUploadFailed({
                                result: {
                                    file: file,
                                    message: validationResult.message
                                }
                            });
                            return;
                        }
                        var reader = new FileReader();
                        tool.timeout(function() {
                            scope.isLoading = true;
                        });
                        reader.onload = function(event) {
                            if (scope.onFileLoaded) {
                                tool.timeout(function() {
                                    scope.isLoading = false;
                                    scope.onFileLoaded({ result: event.target.result });
                                });
                            };
                        };
                        reader.onprogress = function(event) {
                            tool.timeout(function() {
                                scope.progress = event;
                            });

                        };
                        reader.onerror = function(evt) {
                            var message = "";
                            switch (evt.target.error.code) {
                            case evt.target.error.NOT_FOUND_ERR:
                                message = 'File Not Found!';
                                break;
                            case evt.target.error.NOT_READABLE_ERR: // we always arrive here, no matter what type of file.  img, pdf, etc.  files are not locked.
                                message = 'File is not readable';
                                break;
                            case evt.target.error.ABORT_ERR:
                                break; // noop
                            default:
                                message = 'An error occurred reading this file.';
                            };
                            tool.log(message);
                            scope.onFileUploadFailed({
                                result: {
                                    file: file,
                                    message: message
                                }
                            });
                        };
                        reader.readAsDataURL(file);
                    };
                    scope.selectFile = function(input) {
                        if (!(input.files && input.files.length === 1)) {
                            return;
                        }
                        var imageFile = input.files[0];
                        scope.loadFile(imageFile);
                    };

                },
                replace: true,
                transclude: true,
                template: '<div style="width:100%;height:100%;display:block;">' +
                    '<input type="file"  style="position:absolute;top:-100px;" onchange="angular.element(this).scope().selectFile(this)"></input>' +
                    '<ng-transclude/>' +
                    '</div>'
            };
        },
        {
            onFileLoaded: '&',
            isLoading: '=',
            selectFileFunction: '=',
            validationFunc: '=?',
            onFileUploadFailed: '&'
        }
    );