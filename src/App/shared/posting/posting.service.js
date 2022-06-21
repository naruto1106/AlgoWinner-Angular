agmNgModuleWrapper('agms.posting')
    .defineService('sPostingService',
        [],
        function(serviceObject, dep, tool) {
            var $sanitize = dep.$sanitize,
                sProductService = dep.sProductService;

            function cleanUndesiredTag(str, tag, replaceOpening, replaceClosing) {
                replaceOpening = replaceOpening || "";
                replaceClosing = replaceClosing || "";

                var regexVal1 = new RegExp("<" + tag + "(>|\\s+.+?>)", "gmi");
                var regexVal2 = new RegExp("</" + tag + ">", "gmi");
                var newStr = str.replace(regexVal1, replaceOpening).replace(regexVal2, replaceClosing);
                return newStr;
            }

            function cleanDoubleBreak(str) {
                var regex = new RegExp("(\\<br\\/\\>)[\\*\\t\\n\\r]*(\\<br\\/\\>)", "gmi");
                return str.replace(regex, "<br/>");
            }

            function cleanEmptyTag(str, tag, trial) {
                var regexVal1 = new RegExp("<" + tag + "(>|\\s+.+?>)</" + tag + ">", "gmi");
                var newStr = str;
                if (!trial) {
                    trial = 4;
                }
                for (var j = 0; j < trial; j++) {
                    newStr = newStr.replace(regexVal1, "");
                }
                return newStr;
            }

            function getCleanTags(oldContent) {
                var content = $sanitize(oldContent);
                var tags = ["font", "div", "h1", "h2", "h3", "h4", "h5", "h6", "p", "b", "i", "script", "section", "text", "nav"];
                for (var i = 0; i < tags.length; i++) {
                    var tag = tags[i];
                    content = cleanEmptyTag(content, tag);
                    content = cleanUndesiredTag(content, tag, "<br/>", "");
                    content = cleanDoubleBreak(content);
                }
                return content;
            }

            function searchProductsWithCashTag(keyword) {
                var lastIndex = keyword.lastIndexOf('$');
                if (lastIndex !== -1) {
                    var subString = keyword.substring(lastIndex + 1, keyword.length);
                    if (subString.match(/^[0-9a-zA-Z]+$/)) {
                        return sProductService.SearchProduct(subString).then(function (res) {
                            return res.data;
                        });
                    } else if (lastIndex + 1 === keyword.length) {
                        return sProductService.SearchProduct("a").then(function (res) {
                            return res.data;
                        });
                    }
                }
                return tool.when([]);
            };

            tool.setServiceObjectProperties({
                getCleanTags: getCleanTags,
                searchProductsWithCashTag: searchProductsWithCashTag,
                sanitizeHtmlContentWithProduct: function (node) {
                    var $node = $(node);
                    $node.find("*").removeAttr("align");
                    $node.find("*").removeAttr("color");
                    $node.find("*").removeAttr("face");
                    $node.find("*").removeAttr("size");
                    $node.find("*").removeAttr("style");
                    $node.find("*").not("a.stock-font").removeAttr("class");
                    return $node;
                }
            });
        }
    );