agmNgModuleWrapper('agms.image')
    .defineControllerAsPopup('s.image.UploadDialogController',
        {
            templateUrl: '/App/shared/image/image.uploadDialog.html',
            windowClass: 'full-size-modal'
        },
        ['params'],
        function(vm, dep, tool) {
            var loadedImage;

            var params = dep.params;

            vm.customCssMask = params.customCssMask || {};
            vm.targetWidth = params.targetWidth;
            vm.targetHeight = params.targetHeight;
            vm.constrainedImageFile = params.constrainedImageFile || {
                message: "Image must be PNG, JPG, or GIF." //"with size not more than 1mb (1024kb).",
            };
            vm.loadFile = function(result) {
                vm.errorMessage = null;
                vm.imageSource = result;
            };
            vm.isImageBeingLoaded = false;
            vm.loadImage = function(result) {
                vm.errorMessage = null;
                loadedImage = result;
            };

            vm.cancel = function() {
                vm.errorMessage = null;
                vm.uibDismissPanel();
            };
            vm.done = function() {
                vm.uibClosePanel(loadedImage);
            };
            vm.onFileUploadFailed = function(result) {
                tool.timeout(function() {
                        vm.errorMessage = {
                            message: result.message
                        }
                    }
                );
            }
            if (params.existingImage) {
                vm.loadFile(params.existingImage);
            }
        }
    );