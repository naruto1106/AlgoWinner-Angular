agmNgModuleWrapper('agms.posting')
    .setConfig(['$httpProvider'], function (dep) {
        var $httpProvider = dep.$httpProvider;
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    })
    .defineService('sPostingUrlLivePreviewService', ['sPostingService'],
        function (serviceObject, dep, tool) {

            var $http = dep.$http;
            var sPostingService = dep.sPostingService;

            var meta = [
                ['description', 'name', 'description'],
                ['description', 'property', 'og:description'],
                ['image', 'property', 'og:image'],
                ['image', 'itemprop', 'image'],
                ['author', 'property', 'author'],
                ['author', 'name', 'author'],
                ['author', 'property', 'Author'],
                ['author', 'name', 'Author'],
                ['title', 'property', 'og:title'],
                ['title', 'property', 'title'],
                ['video', 'property', 'og:video'],
                ['video_type', 'property', 'og:video:type'],
                ['video_width', 'property', 'og:video:width'],
                ['video_height', 'property', 'og:video:height'],
                ['type', 'property', 'og:type']
            ];

            function getMatchingDescription(str, pattern) {
                var match = null;
                var arr = [];
                while (match = pattern.exec(str)) {
                    arr.push({
                        content: match[0],
                        index: match.index
                    });
                }
                return arr;
            }

            function cleanTags(node) {
                if (!node) {
                    return;
                }
                var content = $(node).html();
                if (!content) {
                    return;
                }
                var newContent = sPostingService.getCleanTags(content);
                $(node).html(newContent);
            }

            //Helper methods for various URL related 
            var urlHelper =
            {
                limitHtml: function (text, limit) {
                    var domQuery = $("<div>" + text + "</div>");
                    var treeList = this.generateCharTreeList(domQuery[0]);
                    treeList.forEach(function (item) {
                        if (item.startAt > limit) {
                            item.node.parentNode.removeChild(item.node);
                        }
                        if (item.startAt <= limit && limit < item.startAt + item.length) {
                            item.node.textContent = item.node.textContent.substring(0, limit - item.startAt) + "...";
                        }
                    });
                    return domQuery[0].innerHTML;
                },
                limitCashTagHtml: function (text, limit, products) {
                    var domQuery = $("<div>" + text + "</div>");
                    var treeList = this.generateCharTreeList(domQuery[0]);
                    var minimumDisplayedStock = 2;
                    if (products.length < 2) {
                        minimumDisplayedStock = products.length;
                    }
                    var productCount = 0;

                    function containIncludedElement(node) {
                        for (var i = 0; i < node.childNodes.length; i++) {
                            if (node.childNodes[i].includedForDisplay) {
                                return true;
                            }
                        }
                        return false;
                    }
                    treeList.forEach(function (item) {
                        if (item.node.parentNode) {
                            var className = item.node.parentNode.className;
                            var productIdName = className.match(/(product-id-)\d+/igm);
                            if (productIdName && productIdName[0]) {
                                var productId = productIdName[0].replace("product-id-", "");
                                if (productId) {
                                    productCount++;
                                    if (productCount <= minimumDisplayedStock) {
                                        item.node.includedForDisplay = true;
                                    }
                                }
                            }
                        }

                        if (item.startAt > limit && productCount >= minimumDisplayedStock && !item.node.includedForDisplay) {
                            var parentNode = item.node.parentNode;
                            parentNode.removeChild(item.node);
                            while (parentNode && parentNode !== domQuery[0] && !containIncludedElement(parentNode)) {
                                var oldParentNode = parentNode;
                                parentNode = parentNode.parentNode;
                                if (parentNode) {
                                    parentNode.removeChild(oldParentNode);
                                }
                            }
                        } else {
                            item.node.includedForDisplay = true;
                        }
                        if (item.startAt <= limit && limit < item.startAt + item.length) {
                            item.node.textContent = item.node.textContent.substring(0, limit - item.startAt) + "...";
                        }
                    });

                    return domQuery[0].innerHTML;
                },
                getDiffContent: function (newContent, oldContent) {
                    if (newContent === oldContent) {
                        return null;
                    }
                    var frontIndexNew = 0, frontIndexOld = 0;
                    var backIndexNew = newContent.length - 1, backIndexOld = oldContent.length - 1;
                    while (frontIndexNew < backIndexNew && frontIndexOld < backIndexOld && newContent[frontIndexNew] === oldContent[frontIndexOld]) {
                        frontIndexNew++;
                        frontIndexOld++;
                    };
                    while (backIndexNew >= 0 && backIndexOld >= 0 && newContent[backIndexNew] === oldContent[backIndexOld]) {
                        backIndexNew--;
                        backIndexOld--;
                    };
                    return {
                        newContent: {
                            front: frontIndexNew,
                            back: backIndexNew,
                            content: newContent.substring(frontIndexNew, backIndexNew + 1)
                        },
                        oldContent: {
                            front: frontIndexOld,
                            back: backIndexOld,
                            content: oldContent.substring(frontIndexOld, backIndexOld + 1)
                        }
                    }
                },
                getMatchingDescription: getMatchingDescription,
                getnewInnerHtmlFromTextInsertion: function (node, caretPosition, caretHighlightRange, replacementText, temporaryTextIdentifier) {
                    var treeList = this.generateCharTreeList(node);
                    var selectedItem = null;
                    treeList.forEach(function (item) {
                        if (item.startAt <= caretPosition && caretPosition <= item.startAt + item.length) {
                            selectedItem = item;
                        }
                    });
                    if (selectedItem) {
                        var textContent = selectedItem.node.textContent;
                        selectedItem.node.textContent = textContent.substring(0, caretPosition - selectedItem.startAt)
                            + temporaryTextIdentifier
                            + textContent.substring(caretPosition - selectedItem.startAt + caretHighlightRange, selectedItem.length);
                    }

                    var innerHtml = node.innerHTML;
                    return innerHtml.replace(temporaryTextIdentifier, replacementText);
                },

                replaceHtmlContentAtSpecific: function (node, divElement, textProcessor) {
                    var replacementList = [];
                    var newReplacement = textProcessor(divElement.textContent);
                    if (newReplacement) {
                        divElement.textContent = newReplacement.content;
                        replacementList = replacementList.concat(newReplacement.list);
                    }
                    var innerHtml = node.innerHTML;
                    replacementList.forEach(function (replacement) {
                        innerHtml = innerHtml.replace(replacement.temporaryTextReplacement, replacement.replacementText);
                    });
                    return innerHtml;
                },

                replaceHtmlContentWithTextProcessor: function (node, nodeConditionFunc, textProcessor) {
                    var treeList = this.generateCharTreeList(node);
                    var replacementList = [];
                    treeList.forEach(function (item) {
                        if (nodeConditionFunc(item)) {
                            var newReplacement = textProcessor(item.node.textContent, item);
                            if (newReplacement) {
                                item.node.textContent = newReplacement.content;
                                replacementList = replacementList.concat(newReplacement.list);
                            }
                        }
                    });
                    var innerHtml = node.innerHTML;
                    replacementList.forEach(function (replacement) {
                        innerHtml = innerHtml.replace(replacement.temporaryTextReplacement, replacement.replacementText);
                    });
                    return innerHtml;
                },
                
                UriParser: function (uri) {
                    this._regExp = /^((\w+):\/\/\/?)?((\w+):?(\w+)?@)?([^\/\?:]+)?(:\d+)?(.*)?/;
                    this._regExpHost = /^(.+\.)?(.+\..+)$/;

                    this._getVal = function (r, i) {
                        if (!r) return null;
                        return (typeof (r[i]) == 'undefined' ? "" : r[i]);
                    };

                    this.parse = function (uri) {
                        var r = this._regExp.exec(uri);
                        this.results = r;
                        this.url = this._getVal(r, 1);
                        this.protocol = this._getVal(r, 2);
                        this.username = this._getVal(r, 4);
                        this.password = this._getVal(r, 5);
                        this.domain = this._getVal(r, 6);
                        this.port = this._getVal(r, 7);
                        this.path = this._getVal(r, 8);

                        var rH = this._regExpHost.exec(this.domain);
                        this.subdomain = this._getVal(rH, 1);
                        this.domain = this._getVal(rH, 2);
                        return r;
                    }

                    if (uri) this.parse(uri);
                },
                getPlainTextContent: function (str) {
                    if (!str) {
                        return null;
                    }
                    return $('<div>' + str + "</div>").text().trim();
                },
                detectingNewlyTypedUrl: function (item, contentInfo, contentControl) {
                    if (!contentInfo || !contentControl) {
                        return;
                    }
                    var text = contentInfo.textInfo.innerText;
                    var lastTypedText = text.substring(0, contentInfo.textInfo.caretPositionInfo.position);
                    var matchingDescriptions = getMatchingDescription(lastTypedText, this.linkExpression);

                    if (matchingDescriptions.length > 0) {
                        var lastDescription = matchingDescriptions[matchingDescriptions.length - 1];
                        if (!item.urlPreviewList) {
                            item.urlPreviewList = [];
                        }
                        if (lastDescription.index + lastDescription.content.length === contentInfo.textInfo.caretPositionInfo.position - 1) {
                            item.urlPreviewList.push(lastDescription.content);
                        }
                    }
                },
                clearEscapeSpace: function (text) {
                    var expression0 = /\&nbsp;/g;
                    return text.replace(expression0, '&nbsp;');
                },
                linkExpression: /(((https?:\/\/)?[\w-]+(\.[A-Za-z-]+)+\.?(:\d+)?(\/\S*)?)(?=\s))/igm,
                linkExpressionWithPrecedingNbsp: /(((https?:\/\/)?[\w-]+(\.[A-Za-z-]+)+\.?(:\d+)?(\/\S*)?)(?=\&nbsp;))/igm,
                pastedLinkExpression: /((https?:\/\/)?[\w-]+(\.[A-Za-z-]+)+\.?(:\d+)?(\/\S*)?)/igm,
                hrefPattern: /href=\".*?\"/i,
                getLinks: function (text) {
                    return text.match(this.linkExpression) || text.match(this.linkExpressionWithPrecedingNbsp);
                },
                getCleanPastedLinks: function (text) {

                    var getHrefs = text.match(this.hrefPattern);
                    if (getHrefs && getHrefs.length > 0) {
                        var str = getHrefs[0].match(this.pastedLinkExpression)[0];
                        return str.replace("\"", "");
                    }
                    return null;
                },

                getPastedLinks: function (text) {
                    return text.match(this.pastedLinkExpression);
                },
                isImage: function (img, allowed) {
                    //Match jpg, gif or png image  
                    if (allowed == null) allowed = 'jpg|gif|png|jpeg';
                    var expression = /([^\s]+(?=\.(jpg|gif|png|jpeg))\.\2)/gm;
                    return (img.match(expression));
                },
                isAbsolute: function (path) {
                    var expression = /^(https?:)?\/\//i;
                    var value = (path.match(expression) != null) ? true : false;
                    return value;
                },
                isPathAbsolute: function (path) {
                    if (path.substr(0, 1) === '/') return true;
                },
                hasParam: function (path) {
                    return (path.lastIndexOf('?') === -1) ? false : true;
                },
                stripFile: function (path) {
                    return path.substr(0, path.lastIndexOf('/') + 1);
                },

                hasUnclosedUrl: function (text) {
                    var urlExpression = /((\<a).*?(\<\/a\>))/igm;
                    var newText = text.replace(urlExpression, '');
                    return this.getLinks(newText);
                },

                hasUnclosedUrlFromInfo: function (textInfo) {

                    if (!textInfo.caretPositionInfo.elementInfo || !textInfo.caretPositionInfo.elementInfo.node) {
                        return false;
                    }
                    var elementInfoNode = textInfo.caretPositionInfo.elementInfo.node;
                    var isNotEnclosed = elementInfoNode.nodeType === 3 || elementInfoNode.parentNode.nodeName !== 'A';
                    var beforeCaretText = elementInfoNode.nodeValue.substring(0, 1 + textInfo.caretPositionInfo.position - textInfo.caretPositionInfo.elementInfo.startAt);
                    return isNotEnclosed && this.getLinks(beforeCaretText);

                },
                replaceUnformattedHtmlLink: function (text) {
                    var t = this;
                    var dom = $.parseHTML("<div>" + text + "</div>")[0];
                    sPostingService.sanitizeHtmlContentWithProduct(dom);
                    cleanTags(dom);
                    var temporaryTextIdx = 0;
                    var newInnerHtml = this.replaceHtmlContentWithTextProcessor(dom,
                        function (item) {
                            var isParentNodeA = !item.node.parentNode || item.node.parentNode.nodeName !== 'A';
                            var isNodeA = item.node.nodeName !== 'A';

                            return item.node.nodeType == 3 && isParentNodeA && isNodeA;
                        }, function (content) {
                            var matchingList = getMatchingDescription(content, t.pastedLinkExpression);
                            var replacementList = [];
                            matchingList.forEach(function (match) {
                                var temporaryTextReplacement = "__URL__" + temporaryTextIdx;
                                var replacementText = '<a href="' + match.content + '" target="_blank">' + match.content + '</a>';

                                var httpAdd = /(href=")(?!(\w+\:*)\/\/)/igm;
                                replacementText = replacementText.replace(httpAdd, 'href="http://');
                                content = content.replace(match.content, temporaryTextReplacement);
                                replacementList.push({
                                    replacementText: replacementText,
                                    temporaryTextReplacement: temporaryTextReplacement
                                });
                                temporaryTextIdx++;
                            });
                            return {
                                list: replacementList,
                                content: content
                            };
                        });
                    return newInnerHtml;
                },

                cleanNode: function (node) {
                    for (var n = 0; n < node.childNodes.length; n++) {
                        var child = node.childNodes[n];
                        if (child.nodeType === 8 || (child.nodeType === 3 && child.nodeValue === "")) {
                            node.removeChild(child);
                            n--;
                        } else if (child.nodeType === 1) {
                            this.cleanNode(child);
                        }
                    }
                },

                generateCharTreeList: function (editableDiv) {
                    var list = [];
                    var totalLength = 0;
                    this.cleanNode(editableDiv);
                    function iterateDivNodes(node) {
                        if (node.childNodes.length === 0 && node.nodeType !== 3) {
                            var newTextNode = document.createTextNode("");
                            if (node !== editableDiv) {
                                node.parentNode.appendChild(newTextNode);
                            } else {
                                node.appendChild(newTextNode);
                            }
                            list.push({
                                node: newTextNode,
                                length: 0,
                                startAt: totalLength
                            });
                            totalLength += 0;
                        } else {
                            var temporaryList = [];
                            for (var i = 0; i < node.childNodes.length; i++) {
                                temporaryList.push(node.childNodes[i]);
                            }
                            temporaryList.forEach(function (child) {
                                if (child.nodeType === 3) {
                                    var length = child.nodeValue.length;
                                    list.push({
                                        node: child,
                                        length: length,
                                        startAt: totalLength
                                    });
                                    totalLength += length;

                                } else if (child.nodeType === 1) {
                                    iterateDivNodes(child);
                                }

                            });
                        }
                    }
                    iterateDivNodes(editableDiv);
                    return list;
                },
                getWebStandard: function () {

                    var ie = (typeof document.selection != "undefined" && document.selection.type !== "Control") && true;
                    var w3 = (typeof window.getSelection != "undefined") && true;
                    return {
                        ie: ie,
                        w3: w3
                    }
                },
                getCaretPositionInfo: function (editableDiv, list) {
                    var position = 0;
                    var anchorNode = editableDiv.children[0];
                    var elementInfo = null;
                    var webStandard = this.getWebStandard();

                    if (webStandard.w3) {
                        var selection = window.getSelection();
                        if (selection.getRangeAt && selection.rangeCount>0) {
                            var range = selection.getRangeAt(0);
                            var preCaretRange = range.cloneRange();
                            preCaretRange.selectNodeContents(editableDiv);
                            preCaretRange.setEnd(range.endContainer, range.endOffset);
                            position = preCaretRange.toString().length;
                            anchorNode = selection.anchorNode;
                        }
                    } else if (webStandard.ie) {
                        var textRange = document.selection.createRange();
                        var preCaretTextRange = document.body.createTextRange();
                        preCaretTextRange.moveToElementText(editableDiv);
                        preCaretTextRange.setEndPoint("EndToEnd", textRange);
                        position = preCaretTextRange.text.length;
                        anchorNode = document.selection.anchorNode;
                    }

                    elementInfo = list.filter(function (info) {
                        var refNode = info.node;
                        var counter = 0;
                        while (info.node != editableDiv && counter < 5) {
                            if (refNode == anchorNode) {
                                return true;
                            }
                            refNode = refNode.parentNode;
                            counter++;
                        }
                        return false;
                    })[0];
                    if (!elementInfo) {
                        elementInfo = list[list.length - 1];
                        position = $(editableDiv).text().length;
                    }
                    return {
                        position: position,
                        elementInfo: elementInfo
                    };
                },
                extractDomain: function (url) {
                    var domain;
                    //find & remove protocol (http, ftp, etc.) and get domain
                    if (url.indexOf("://") > -1) {
                        domain = url.split('/')[2];
                    } else {
                        domain = url.split('/')[0];
                    }

                    //find & remove port number
                    domain = domain.split(':')[0];
                    return domain;
                }
            }

            function youtubeIdFromUrl(url) {
                var id = '';
                url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
                if (url[2] !== undefined) {
                    id = url[2].split(/[^0-9a-z_]/i);
                    id = id[0];
                } else {
                    id = url;
                }
                return id;
            }

            function getPropByString(obj, propString) {
                if (!propString)
                    return obj;

                var prop, props = propString.split('.');

                for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
                    prop = props[i];

                    var candidate = obj[prop];
                    if (candidate !== undefined) {
                        obj = candidate;
                    } else {
                        break;
                    }
                }
                return obj[props[i]];
            }

            //TODO: Support Video Embed
            var apiNames = ['youtub3'];
            var apis = {
                youtube: {
                    url: 'http://gdata.youtube.com/feeds/api/videos/%s%?v=2&alt=jsonc',
                    title: 'data.title',
                    description: 'data.description',
                    previewThumb: 'data.thumbnail.sqDefault',
                    parse: youtubeIdFromUrl

                },
                image: {
                    title: '',
                    description: '',
                    previewThumb: '%s%',
                    parse: function (url) { return url; }
                }
            }

            //return an array of objects according to key, value, or key and value matching
            function getObjects(obj, key, val) {
                var objects = [];
                for (var i in obj) {
                    if (!obj.hasOwnProperty(i)) continue;
                    if (typeof obj[i] == 'object') {
                        objects = objects.concat(getObjects(obj[i], key, val));
                    } else
                        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
                        if (i === key && obj[i] === val || i === key && val === '') { //
                            objects.push(obj);
                        } else if (obj[i] === val && key === '') {
                            //only add if the object is not already in the array
                            if (objects.lastIndexOf(obj) === -1) {
                                objects.push(obj);
                            }
                        }
                }
                return objects;
            }

            function getMetaOgObjects(data, query) {
                for (var i = 0; i < meta.length; i++) {
                    if (meta[i][0] === query) {
                        var key = meta[i][1];
                        var value = meta[i][2];
                        var objects = getObjects(data, key, value);
                        if (objects.length > 0) {
                            if (objects[0] != null && objects[0] !== "") {
                                return objects[0].content;
                            }
                        }
                    }
                }
                return "";
            }

            function findImages(data) {
                var images = $(data, '<body>').find('img');
                var previewImages = [];
                images.each(function () {
                    var self = $(this);

                    if (self.attr('src') && self.attr('src').search('logo', 'i') !== -1 ||
                            self.attr('id') && self.attr('id').search('logo', 'i') !== -1 ||
                            this.className && this.className.search('logo', 'i') !== -1
                    ) {
                        preview.image = $(this).attr('src');
                        return false;
                    }

                });
                if (images.length > 0) {
                    images.each(function () {
                        previewImages.push($(this).attr('src'));
                    });
                }
                return previewImages;
            }

            function executeYql(url) {
                var hash = {
                    preview_thumb: '',
                    title: '',
                    description: '',
                    author: ''
                };
                var xpath = '//head|//body';
                var query = 'select * from html where url="' + url + '" and compat="html5" and xpath="' + xpath + '"' + '| sanitize()';

                var path = 'https://query.yahooapis.com/v1/public/yql?q=';
                var encodedQuery = encodeURIComponent(query);
                var tail = '&format=json&diagnostics=true&callback=JSON_CALLBACK';
                tool.log(path + encodedQuery + tail);

                var deferred = tool.defer();
                $http.jsonp(path + encodedQuery + tail)
                    .success(function (data, status, headers, config) {
                        tool.log(data);
                        tool.log(status);
                        hash.previewThumb = getMetaOgObjects(data, 'image');
                        hash.title = getMetaOgObjects(data, 'title');
                        if (hash.title == null || hash.title === "") {
                            var titleObject = getObjects(data, 'title', '');
                            if (titleObject.length > 0) {
                                hash.title = titleObject[0].title;
                            }
                        }
                        hash.description = getMetaOgObjects(data, 'description');
                        hash.author = getMetaOgObjects(data, 'author');
                        deferred.resolve(hash);
                    }).error(function (data, status, headers, config) {
                        tool.logError(data);
                        tool.logError(status);
                        deferred.reject({ data: data, status: status });
                    });
                return deferred.promise;
            };

            function getHash(url) {
                var hash = {
                    preview_thumb: '',
                    title: '',
                    description: '',
                };
                var api = 'image';
                var id = '';

                apiNames.map(function (el, ix, arr) {
                    if (url.indexOf(el) > -1) {
                        api = el;
                    }
                });

                var deferred = tool.defer();

                if (apis[api].url) {
                    //We specify unique implementations for various domains here, e.g. youtube
                    var apiUrl = apis[api].url.replace('%s%', apis[api].parse(url));
                    $http({ method: 'GET', url: apiUrl }).
                        success(function (data, status, headers, config) {
                            hash.previewThumb = getPropByString(data, apis[api].preview_thumb);
                            hash.title = getPropByString(data, apis[api].title);
                            hash.description = getPropByString(data, apis[api].description);
                            hash.meta.data = data;
                            deferred.resolve(hash);
                        }).
                        error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                } else if (urlHelper.isImage(url)) {
                    //If link is an image
                    if (url.length && url.length > 4) {
                        hash.previewThumb = url;
                        hash.title = url;
                        hash.description = '';
                        deferred.resolve(hash);
                    } else {
                        deferred.reject({ 'error': 'invalid image url' });
                    }
                } else {
                    //If link is anything else
                    return executeYql(url);
                }
                return deferred.promise;
            }

            tool.setServiceObjectProperties({
                executeYql: executeYql,
                urlHelper: urlHelper,
                getHash: getHash
            });
        }
    )
    .defineController('s.posting.UrlLivePreviewController', ['sPostingUrlLivePreviewService'],
        function (vm, dep, tool) {
            var $window = dep.$window;
            var sPostingUrlLivePreviewService = dep.sPostingUrlLivePreviewService;
            var coreNotificationService = dep.coreNotificationService;

            var urlLoadingPromise = tool.defer();

            function generatePreview(url) {
                if (!url) {
                    return;
                }
                vm.userPost.isLoadingPreview = true;
                sPostingUrlLivePreviewService.getHash(url).then(function (res) {
                    urlLoadingPromise.resolve(res);
                }, function () {
                    urlLoadingPromise.reject();
                });
                urlLoadingPromise.promise.then(function (res) {
                    vm.userPost.postUrl = url;
                    var postDomain = sPostingUrlLivePreviewService.urlHelper.extractDomain(url).toUpperCase();
                    vm.userPost.urlPreview = true;
                    vm.userPost.postTitle = (vm.chatPreview && res.title && res.title !== "" && res.title.length >= 70) ?
                        res.title.substring(0, 69) + ".." : res.title;
                    vm.userPost.postTitleHtml = '<strong>' + vm.userPost.postTitle + '</strong>';
                    vm.userPost.previewThumb = res.previewThumb;
                    if (vm.chatPreview && res.description && res.description !== "") {
                        if (!res.previewThumb && res.description.length > 55) {
                            vm.userPost.postDescription = res.description.substring(0, 54) + "..";
                        } else if (res.previewThumb && res.description.length > 40) {
                            vm.userPost.postDescription = res.description.substring(0, 39) + "..";
                        } else {
                            vm.userPost.postDescription = res.description;
                        }
                    } else {
                        vm.userPost.postDescription = res.description;
                    }
                    if (vm.userPost.postDescription != null && vm.userPost.postDescription !== "") {
                        vm.userPost.postDescriptionHtml = '<h6>' + vm.userPost.postDescription + '</h6>';
                    } else {
                        vm.userPost.postDescriptionHtml = null;
                    }
                    vm.userPost.author = res.author;
                    if (res.author != null && res.author !== "" && !vm.chatPreview) {
                        vm.userPost.postDomainAuthorHtml = '<h6>' + postDomain + ' | ' + res.author + '</h6>';
                    } else {
                        vm.userPost.postDomainAuthorHtml = '<h6>' + postDomain + '</h6>';
                    }
                    if (res.previewThumb != null && res.previewThumb !== "") vm.userPost.showPostImage = true;
                    if ((res.title != null && res.title !== "") || (res.description != null && res.description !== "") || (res.author != null && res.author !== "")) vm.userPost.showPostSummary = true;

                }, function (res) {
                    if (res !== "User Cancelled") {
                        coreNotificationService.notifyError("Error Loading URL", "Sorry, we are unable to load the preview for your link. Please post your message without the preview.");
                    }
                }).finally(function () {
                    vm.userPost.isLoadingPreview = false;
                });
            }
            vm.userPost = {};
            tool.watch("vm.feedPost.urlPreviewList", function (newValue) {
                if (newValue && (!vm.userPost.urlPreview || (!vm.userPost.showPostImage && !vm.userPost.showPostSummary))) {
                    urlLoadingPromise = tool.defer();
                    generatePreview(newValue[newValue.length - 1]);
                }
            }, true);

            vm.goToLink = function (url) {
                if (!url.match(/^https?:\/\//i)) {
                    url = 'http://' + url;
                }
                $window.open(url);
            }

            vm.disableShowPostImage = function () {
                tool.log("Post Image Closed");
                vm.userPost.showPostImage = false;
                vm.userPost.previewThumb = null;
            }

            vm.disableShowPostSummary = function () {
                tool.log("Post Summary Closed");
                vm.userPost.showPostSummary = false;
                vm.userPost.postTitle = null;
                vm.userPost.postDescription = null;
                vm.userPost.author = null;
                if (vm.singleCloseBtn) {
                    tool.log("Post Image Closed");
                    vm.userPost.showPostImage = false;
                    vm.userPost.previewThumb = null;
                    vm.userPost.urlPreview = false;
                    vm.userPost.postUrl = "";
                }
            }

            vm.cancelUrlLoading = function () {
                urlLoadingPromise.reject("User Cancelled");
                vm.userPost.isLoadingPreview = false;
            }
        }
    )
    .defineDirectiveForE('agms-posting-url-live-preview', [],
        function () {
            return {
                restrict: 'E',
                controller: 's.posting.UrlLivePreviewController',
                templateUrl: '/App/shared/posting/posting.urlLivePreview.html'
            };
        },
        {
            feedPost: "=",
            userPost: "=",
            singleCloseBtn: "=",
            showOnlyImage: "=?",
            hideCloseBtn: "=?"
        }
    );