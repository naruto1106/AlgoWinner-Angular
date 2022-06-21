agmNgModuleWrapper('agms.image')
    .defineDirectiveForA('agms-image', ['$http'],
        function() {
            return {
                bindToController: false,
            }
        },
        {
            imgSrc: '=',
            imgFallbackSrc: '=?',
            offsetX: '=?',
            offsetY: '=?'
        },
        function(scope, element, attrs, controller, transcludeFn, dep, tool) {

            function loadImage(imgSrc, onImageLoaded) {
                var image = document.createElement('img');
                image.src = imgSrc;
                image.onload = function() {
                    onImageLoaded();
                };
            }

            function setImage(imgSrc) {
                element.css({
                    'background-image': 'url(' + imgSrc + ')',
                });
            }
            // noone  use offsets for now
            /*
            tool.watch('offsetX', function() {
                if (scope.offsetX) {
                    element.css({
                        'background-position-x': scope.offsetX
                    });
                }
            }, false);
            tool.watch('offsetY', function() {
                if (scope.offsetY) {
                    element.css({
                        'background-position-y': scope.offsetY
                    });
                }
            }, false);
            */
            tool.watch('imgSrc', function() {
                if (scope.imgFallbackSrc) {
                    setImage(scope.imgFallbackSrc);
                    loadImage(scope.imgSrc, function() {
                        setImage(scope.imgSrc);
                    });
                } else {
                    setImage(scope.imgSrc);
                }
            }, false);
        });