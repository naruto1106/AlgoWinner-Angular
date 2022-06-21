agmNgModuleWrapper('agms.posting')
    .defineController('s.posting.CashTagTextAreaController', ['sProductService', 'sPostingUrlLivePreviewService', 'sPostingService'],
        function(vm, dep, tool) {

            var sProductService = dep.sProductService;
            var sPostingService = dep.sPostingService;
            vm.isFocus = false;
            var listener = null;
            var sPostingUrlLivePreviewService = dep.sPostingUrlLivePreviewService;

            vm.onItemPasted = function(event) {
                if (listener) {
                    listener();
                }
                if (!event.originalEvent.clipboardData) {
                    listener = tool.watch('vm.item.content', function(a, b) {
                        if (a !== b) {
                            listener();
                            vm.contentControl.type(' ');
                        }
                    });

                    return;
                }
                event.preventDefault();
                var plainText = event.originalEvent.clipboardData.getData("text/plain").trim();
                document.execCommand("insertHTML", false, plainText + "&nbsp;");
                if ($(event.target).attr('contenteditable')) {
                    tool.timeout(function() {
                        vm.onContentChanged();
                    }, 200);
                }
            };

            function sanitizeContent() {
                if (!vm.contentInfo || !vm.contentInfo.node) {
                    return;
                }
                sPostingService.sanitizeHtmlContentWithProduct(vm.contentInfo.node);
            };

            function extractProduct(str) {
                var arr = [];
                var links = $('<div>' + str + '</div>').find('[class*="product-id"]');
                for (var i = 0; i < links.length; i++) {
                    if (links[i]) {
                        var classes = $(links[i]).attr("class");
                        var productIdName = classes.match(/(product-id-)\d+/igm)[0];
                        var productId = productIdName.replace("product-id-", "");
                        if (arr.indexOf(productId) < 0) {
                            arr.push(productId);
                        }
                    }
                }
                return arr;
            }

            vm.onContentChanged = function() {
                sanitizeContent();
                if (vm.contentInfo) {
                    vm.item.productIds = extractProduct(vm.contentInfo.textInfo.innerHtml);
                }
                if (vm.onChanged) {
                    vm.onChanged({
                        item: vm.item,
                        contentInfo: vm.contentInfo,
                        contentControl: vm.contentControl
                    });
                }
            }

            function getCurrentChosenDollarMatch(caretPositionInfo) {
                var patt = /(\$\w*)/ig;
                var str = caretPositionInfo.elementInfo.node.textContent;
                var caret = caretPositionInfo.position;
                if (caret > 0 && str[caret - 1] === ' ') {
                    return null;
                }
                var strSelection = str.substring(0, caret - caretPositionInfo.elementInfo.startAt).split(" ");
                return patt.exec(strSelection[strSelection.length - 1]);
            }

            vm.searchProducts = function(str, contentInfo) {
                var match = getCurrentChosenDollarMatch(contentInfo.textInfo.caretPositionInfo);
                if (match) {
                    var matchedKeyword = match[0].substring(1, match[0].length);
                    if (matchedKeyword === "") {
                        matchedKeyword = "a";
                    }
                    return sProductService.SearchProduct(matchedKeyword).then(function(res) {
                        return res.data;
                    });
                }
                return tool.when([]);
            }

            vm.getDropdownClass = function() {
                if (vm.direction === 0) {
                    return 'dropdown-up';
                } else {
                    return 'dropdown-down';
                }
            }
            vm.updateContent = function(selectedItem, contentInfo) {
                var temporaryTextIdx = 0;
                var caretChange = 0;
                var caretPosition = contentInfo.textInfo.caretPositionInfo.position;
                var newInnerHtml = sPostingUrlLivePreviewService.urlHelper.replaceHtmlContentWithTextProcessor(contentInfo.node,
                    function(item) {
                        var isParentNodeA = !item.node.parentNode || item.node.parentNode.nodeName !== 'A';
                        var isNodeA = item.node.nodeName !== 'A';
                        var isWithinCaret = item.startAt <= caretPosition && caretPosition <= (item.startAt + item.length);
                        return item.node.nodeType === 3 && isParentNodeA && isNodeA && isWithinCaret;
                    },
                    function(content, item) {
                        var startAt = item.startAt;
                        var matchingList = sPostingUrlLivePreviewService.urlHelper.getMatchingDescription(content, /(\$(\w|\d)*)/igm);
                        var replacementList = [];
                        matchingList.forEach(function(match) {
                            if (match.index + match.content.length !== caretPosition - startAt) {
                                return;
                            }

                            if (!vm.item.products) {
                                vm.item.products = [];
                                vm.item.products.push(selectedItem);
                            } else {
                                vm.item.products.push(selectedItem);
                            }

                            var temporaryTextReplacement = "__CASHTAG__" + temporaryTextIdx;
                            var cashTagContent = selectedItem.ProductName + " (" + selectedItem.Symbol + ")";
                            caretChange = cashTagContent.length - match.content.length + 1;

                            var replacementText = "<a class=\"stock-font product-id-" + selectedItem.ProductId + "\" href=\"" + sProductService.createProductPageUrl(selectedItem) + "\" target=\"_blank\">" + cashTagContent + "</a>&nbsp;";
                            content = content.substring(0, match.index) + temporaryTextReplacement + content.substring(match.index + match.content.length, content.length);
                            replacementList.push({
                                replacementText: replacementText,
                                temporaryTextReplacement: temporaryTextReplacement
                            });
                            temporaryTextIdx++;
                        });

                        if (vm.onChanged) {
                            vm.onChanged({
                                item: vm.item,
                                contentInfo: vm.contentInfo,
                                contentControl: vm.contentControl
                            });
                        }

                        return {
                            list: replacementList,
                            content: content
                        };
                    }
                );

                vm.item.content = newInnerHtml;
                if (vm.contentControl.updateContent && temporaryTextIdx > 0) {

                    tool.timeout(function() {
                        vm.contentControl.updateContent({
                            innerHtml: newInnerHtml,
                            newCaretPosition: caretPosition + caretChange
                        });
                    });
                }
            }
        })
    .defineDirectiveForE('agms-posting-cash-tag-text-area', [],
        function() {
            return {
                controller: "s.posting.CashTagTextAreaController",
                templateUrl: '/App/shared/posting/posting.cashTagTextArea.html',
            };
        }, {
            item: "=",
            disabledFunc: "=",
            placeholder: "@",
            direction: "=?",
            submitFunc: "=",
            contentInfo: "=?",
            contentControl: "=?",
            onChanged: "&?"
        },
        function(scope, element, attrs, controller, transclude) {
            scope.onInputKeydown = function($event) {
                var keyCode = $event.keyCode;
                var canSubmit = scope.vm.disabledFunc ? !scope.vm.disabledFunc() : true;
                if (!$event.shiftKey && keyCode === 13 && scope.vm.submitFunc && !scope.vm.hasMatchesShown && canSubmit) {
                    scope.vm.submitFunc();
                }
            }
        })
    .ngApp.run([
        "$templateCache", function($templateCache) {
            $templateCache.put("agms.posting",
                "<ul class=\"dropdown-menu dropdown-menu-up\" ng-show=\"isOpen() && !moveInProgress\" ng-style=\"{bottom: position().top+'px', left: position().left+'px'}\" style=\"display: block;\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\">\n" +
                "    <li ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index)\" role=\"option\" id=\"{{::match.id}}\">\n" +
                "        <div uib-typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>\n" +
                "    </li>\n" +
                "</ul>\n" +
                "");
        }
    ]);