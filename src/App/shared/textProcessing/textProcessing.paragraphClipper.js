agmNgModuleWrapper('agms.textProcessing')
    .defineController('s.textProcessing.ParagraphClipperController',[],function(vm, dep, tool) {
        
    })
    .defineDirectiveForA('agmc-paragraph-clipper', [],
        function (dep) {
            return {
                controller:'s.textProcessing.ParagraphClipperController'
            };
        },
        {
            ellipsis: '@?',
            maxLineCount: '=',
            agmcParagraphClipper: '=',
            isClippingActive: '=?',
            isClippingRequired: '=?'
        },
        function (scope, element, attrs, controller, transcludeFn, dep, tool) {
            var $sanitize = dep.$sanitize;
            var e = $(element);
            var paragraphProperties = null;
            var lastContent = null;
            var hasNonZeroHeight = false;
            tool.onRendered(function () {
                if (!scope.vm.maxLineCount) {
                    scope.vm.maxLineCount = 999;
                }
                paragraphProperties = doSampling();
                tool.watch('vm.agmcParagraphClipper', function () {
                    lastContent = scope.vm.agmcParagraphClipper;
                    renderText(lastContent);
                }, 100);

                tool.watch('vm.isClippingActive', function () {
                    renderText(lastContent);
                });
                // for the content in the hidden tabs
                var heightCheckInterval = dep.$window.setInterval(function () {
                    e.html("TEST");
                    var currentHeight = e.height();
                    if (currentHeight === 0) {
                        return;
                    }
                    hasNonZeroHeight = true;
                    dep.$window.clearInterval(heightCheckInterval);
                    paragraphProperties = doSampling();
                    renderText(lastContent);
                }, 200);
            });

            function doSampling() {
                var samples = [];
                var contents = "";
                var count = 10;
                for (var i = 0; i <= count; i++) {
                    e.html(contents);
                    contents += "<br/>";
                    samples.push(e.height());
                }
                var lineSize = 0;
                for (var i = 1; i <= count; i++) {
                    lineSize += samples[i] - samples[i - 1];
                }
                lineSize = lineSize / count;
                var extra = 0;
                for (var i = 0; i <= count; i++) {
                    extra += samples[i] - (i * lineSize);
                }
                extra = extra / (count + 1);
                e.html("");
                return {
                    lineSize: lineSize === 0 ? 10 : lineSize, // avoid returning 0 lineSize
                    extra: extra
                }
            }
            function computeHeightWithContent(content) {
                e.html(content);
                var currentHeight = e.height();
                var totalLines = Math.ceil((currentHeight - paragraphProperties.extra) / paragraphProperties.lineSize);
                return totalLines;
            }
            function renderText(newContent) {
                if (!paragraphProperties) {
                    return;
                }

                if (!hasNonZeroHeight) {
                    return;
                }
                var ellipsis = scope.vm.ellipsis || " ...";
                var contentSplit = [];
                var childElements = $.parseHTML(newContent);
                if (!childElements) {
                    return;
                }
                childElements.forEach(function (childElement) {
                    if (childElement.nodeType === 3) {
                        contentSplit = contentSplit.concat(childElement.nodeValue.trim().split(' '));
                    } else {
                        contentSplit.push(childElement.outerHTML);
                    }
                });
                scope.vm.isClippingRequired = false;
                var text = contentSplit[0];
                for (var i = 1; i < contentSplit.length; i++) {
                    var newText = text + " " + contentSplit[i];
                    var lines = computeHeightWithContent(newText + ellipsis);
                    if (lines > scope.vm.maxLineCount) {
                        scope.vm.isClippingRequired = true;
                        if (scope.vm.isClippingActive) {
                            break;
                        }
                    }
                    text = newText;
                }
                if (scope.vm.isClippingActive && scope.vm.isClippingRequired) {
                    text += ellipsis;
                }
                e.html($sanitize(text));
            }
        });