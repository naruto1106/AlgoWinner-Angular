agmNgModuleWrapper('agms.textProcessing')
    .defineController('s.textProcessing.SmartTextAreaEditorController', [], function (vm, dep, tool) {
        
        tool.onRendered(function () {
            tool.watch('vm.model', function () {
                vm.reevaluatePlaceholder(false);
            });
        });
    })
    .defineDirectiveForE('agms-text-processing-smart-text-area-editor', ['sPostingUrlLivePreviewService'],
        function (dep) {
            return {
                require: ['^ngModel', '^?ngModelOptions'],
                controller: 's.textProcessing.SmartTextAreaEditorController',
                templateUrl: '/App/shared/textProcessing/textProcessing.smartTextAreaEditor.html',
            }
        }, {
            contentInfo: '=',
            contentControl: '=?',
            placeholder: '@',
            model: '=ngModel',
            isFocus: '=?',
            modelOptions: '=ngModelOptions'
        },
        function (scope, element, attrs, controllers, ngTransclude, dep, tool) {
            var sPostingUrlLivePreviewService = dep.sPostingUrlLivePreviewService;
            var webStandard = sPostingUrlLivePreviewService.urlHelper.getWebStandard();
            function prependContentIfFirst(editableDiv, list, charAt) {
                var txt = '&nbsp;';
                if (list[0].node.parentNode !== editableDiv && charAt === 0) {
                    editableDiv.innerHTML = txt + editableDiv.innerHTML;
                }
            }

            function appendContentIfLast(editableDiv, list, charAt) {
                var txt = '&nbsp;';
                var editableText = $(editableDiv).text();
                var maxLength = editableText.length;
                var nonType3Dom = list[list.length - 1].node.parentNode !== editableDiv;
                var atTheEndOfText = charAt >= maxLength;
                if (nonType3Dom && atTheEndOfText) {
                    editableDiv.innerHTML = editableDiv.innerHTML + txt;
                }
            }

            function setSelection(node, characterAt) {

                if (webStandard.w3) {
                    var range = document.createRange();
                    var sel = window.getSelection();
                    range.setStart(node, characterAt);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                } else if (node.selectionStart) {
                    node.selectionStart = characterAt;
                    node.selectionEnd = characterAt;
                }
            }

            function gotoCharacter(editableDiv, list, charAt) {

                prependContentIfFirst(editableDiv, list, charAt);
                appendContentIfLast(editableDiv, list, charAt);

                var elementInfo = list.filter(function (info) {
                    return info.startAt <= charAt && charAt <= (info.startAt + info.length);
                })[0];

                var lastElement = list[list.length - 1];
                if (lastElement.length + lastElement.startAt <= charAt) {
                    charAt = lastElement.length + lastElement.startAt;
                    elementInfo = lastElement;
                    tool.log('last element');
                }
                if (elementInfo) {
                    setSelection(elementInfo.node, charAt - elementInfo.startAt);
                } else {
                    elementInfo = list[list.length - 1];
                    setSelection(elementInfo.node, elementInfo.length);
                }

            }
            
            var contentElement = $(element);

            var textInfo = {
                innerText: "",
                innerHtml: "",
                treeList: null,
                caretPositionInfo: null
            }

            function generateRecentTextInfo() {
                var innerText = $(contentElement).text();
                var innerHtml = contentElement[0].innerHTML;
                scope.vm.hasEmptyContent = innerText.trim().length <= 0;
                textInfo.treeList = sPostingUrlLivePreviewService.urlHelper.generateCharTreeList(contentElement[0]);
                textInfo.innerText = innerText;
                textInfo.innerHtml = innerHtml;
                textInfo.caretPositionInfo = sPostingUrlLivePreviewService.urlHelper.getCaretPositionInfo(contentElement[0], textInfo.treeList);
                textInfo.node = contentElement[0];
                return textInfo;
            }

            if (!scope.vm.contentControl) {
                scope.vm.contentControl = {};
            }

            scope.vm.contentControl.updateContent = function (revisedContentInfo) {
                if (revisedContentInfo.innerHtml) {
                    contentElement[0].innerHTML = revisedContentInfo.innerHtml;
                }
                var newTreeList = generateRecentTextInfo().treeList;
                gotoCharacter(contentElement[0], newTreeList, revisedContentInfo.newCaretPosition);
                updateVmModel();
            };

            function setTextContent(node, text) {
                if (node.nodeType === 3) {
                    node.textContent = text;
                } else {
                    node.innerHTML = text; 
                }
            }

            scope.vm.contentControl.type = function (text) {
                generateRecentTextInfo();
                $(contentElement[0]).focus();
                scope.vm.isFocus = true;
                var elementInfo = textInfo.caretPositionInfo.elementInfo;
                var oldText = $(elementInfo.node).text();
                var oldCaretPosition = textInfo.caretPositionInfo.position;
                var relativeCaretPosition = oldCaretPosition - elementInfo.startAt;
                if (relativeCaretPosition < elementInfo.length) {
                    var newText = oldText.substring(0, relativeCaretPosition) + text + oldText.substring(relativeCaretPosition, elementInfo.length);
                    setTextContent(elementInfo.node, newText);
                } else if (relativeCaretPosition == elementInfo.length && elementInfo.node.nodeType==3 && elementInfo.node.parentNode) {
                    var newtext = document.createTextNode(text);
                    if (elementInfo.node.parentNode == contentElement[0]) {
                        contentElement[0].appendChild(newtext);
                    } else {
                        $(newtext).insertAfter(elementInfo.node.parentNode);
                    };
                }
                
                var newCaretPosition = textInfo.caretPositionInfo.position + text.length;

                var innerHtml = contentElement[0].innerHTML;

                scope.vm.contentControl.updateContent({
                    innerHtml: innerHtml,
                    newCaretPosition: newCaretPosition
                });
                reevaluatePlaceholder(true);
            };

            scope.vm.contentControl.forceUpdateContentInfo = function () {
                updateVmModel();
            };

            function reevaluatePlaceholder(isEditing) {
                var existingTooltip = $(element).siblings('[agm-smart-text-area-editor-placeholder-text]');
                var needTooltip = !$(element).text().trim() && !isEditing;
                if (needTooltip && existingTooltip.length <= 0) {
                    $("<i agm-smart-text-area-editor-placeholder-text>" + scope.vm.placeholder + "</i>").insertAfter(element[0]);
                } else if (!needTooltip && existingTooltip.length > 0) {
                    existingTooltip.remove();
                }
            }

            scope.vm.reevaluatePlaceholder = reevaluatePlaceholder;

            function updateVmModel() {
                var lastTextInfo = angular.copy(textInfo);
                generateRecentTextInfo();
                scope.vm.contentInfo = {
                    lastTextInfo: lastTextInfo,
                    textInfo: textInfo,
                    isFocus: scope.vm.isFocus,
                    node: contentElement[0],
                };
                reevaluatePlaceholder(true);
            }

            tool.watch('vm.model', updateVmModel, false);

            contentElement.on('keydown', function (event) {
                var caretPosition = textInfo.caretPositionInfo.position;
                if (event.keyCode === 37) {
                    prependContentIfFirst(contentElement[0], textInfo.treeList, caretPosition);
                }
                if (event.keyCode === 39) {
                    appendContentIfLast(contentElement[0], textInfo.treeList, caretPosition);
                }
            });
            contentElement.on('mousedown keydown', function (event) {
                scope.vm.isFocus = true;
                updateVmModel();

            });
            contentElement.on('focusout blur', function (event) {
                scope.vm.isFocus = false;
                reevaluatePlaceholder(true);
            });
        }
    );