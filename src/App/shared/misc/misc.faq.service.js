agmNgModuleWrapper('agms.misc')
    .defineService("sMiscFaqService", ["sContentfulWrapper"], function (serviceObj, dep, tool) {
        var coreConfigService = dep.coreConfigService,
            sContentfulWrapper = dep.sContentfulWrapper,
            $q = dep.$q;

        var client = sContentfulWrapper.getContentful().createClient({
            // This is the space ID. A space is like a project folder in Contentful terms
            space: coreConfigService.ContentfulCms.FaqSpaceId,
            // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
            accessToken: coreConfigService.ContentfulCms.FaqToken
        });

        function putIntoUserRolesWithCategories(obj, source) {
            var selectedObj = [];

            source.userRoles.forEach(function (c) {
                if (!c) {
                    return;
                }
                var name = c.name;
                if (!obj[name]) {
                    obj[name] = {
                        userRole: name,
                        categories: []
                    };
                }
                selectedObj.push(obj[name].categories);
            });

            source.categories.forEach(function (c) {
                if (!c) {
                    return;
                }
                var name = c.name;
                selectedObj.forEach(function (categoryList) {
                    var foundExistingObject = _.find(categoryList, function (catInObject) { return catInObject.name == name; });
                    if (!foundExistingObject) {
                        categoryList.push(c);
                    }
                });
            });
        }

        var idDictionary = [];
        var idCounter = 1;
        function generateIdMapper(item) {
            var storedId = idCounter;
            idDictionary[storedId] = item;
            idCounter++;
            return storedId;
        }

        function getItem(id) {
            return idDictionary[id];
        }

        function generateList(list) {
            var userRoles = {};
            list = sContentfulWrapper.generateList(list);
            list.forEach(function (e) {
                putIntoUserRolesWithCategories(userRoles, e);
                var id = generateIdMapper(e);
                e.id = id;
            });

            for (var role in userRoles) {
                userRoles[role].categories = userRoles[role].categories.sort(function (a, b) {
                    a.priority = a.priority || 9999;
                    b.priority = b.priority || 9999;
                    return a.priority - b.priority;
                });
            }

            var obj = {
                list: list,
                userRoles: userRoles
            }
            return obj;
        }
        var loadedGuideFlows = null;

        function getGuideFlows() {
            if (loadedGuideFlows) {
                return tool.when(loadedGuideFlows);
            }
            var deferred = tool.defer();

            if (coreConfigService.AlgoLeader.HideForAlgoLeader) {
                client.getEntries({
                    'content_type': 'algoLeaderGuideFlow'
                }).then(function (entry) {
                    loadedGuideFlows = generateList(entry.items);
                    deferred.resolve(loadedGuideFlows);
                }, function () {
                    deferred.reject();
                });
            } else {
                client.getEntries({
                    'content_type': 'guideFlow'
                }).then(function (entry) {
                    loadedGuideFlows = generateList(entry.items);
                    deferred.resolve(loadedGuideFlows);
                }, function () {
                    deferred.reject();
                });
            }
            
            return deferred.promise;
        }

        var loadedQuestions = null;

        function getQuestions() {

            if (loadedQuestions) {
                return $q.when(loadedQuestions);
            }

            var deferred = $q.defer();
            client.getEntries({
                'content_type': 'qna'
            }).then(function (entry) {
                loadedQuestions = generateList(entry.items);
                deferred.resolve(loadedQuestions);
            }, function () {
                deferred.reject();
            });
            return deferred.promise;
        }

        function checkObjectWithinCategory(obj, category) {
            return obj.categories.filter(function (c) {
                if (!c) {
                    return false;
                }
                return c.name === category.name;
            }).length > 0;
        }

        function checkObjectWithinUserRole(obj, userRole) {
            return obj.userRoles.filter(function (c) {
                if (!c) {
                    return false;
                }
                return c.name === userRole;
            }).length > 0;
        }

        function processSearchResult(content, keyword, n) {
            var prependText = "...";
            var appendText = "...";
            var tokenizedContent = content.split(" ");
            var i = 0;

            var found = false;

            for (i; i < tokenizedContent.length; i++) {
                var word = tokenizedContent[i];
                if (word.search(keyword) >= 0) {
                    found = true;
                    break;
                }
            }

            // return n words before and n words after the keyword
            var from = i - n;
            var to = i + n;

            if (from < 0) {
                from = 0;
                prependText = "";
            }

            if (to >= tokenizedContent.length) {
                to = tokenizedContent.length - 1;
                appendText = "";
            }

            if (!found) {

                appendText = n < tokenizedContent.length ? "..." : "";

                return tokenizedContent.slice(0, n + 1).join(" ") + appendText;
            }

            return prependText + tokenizedContent.slice(from, to + 1).join(" ") + appendText;
        }

        function searchFaq(keyword, list, n) {
            if (!n) {
                n = 10;
            }
            var faqSearchResults = [];

            var caseInsensitiveKeyword = new RegExp(keyword, 'i');

            list.forEach(function (item) {
                var question = $("<div>" + item.question + "</div>").text();
                var answer = $("<div>" + item.answer + "</div>").text();
                if (answer.search(caseInsensitiveKeyword) !== -1 || question.search(caseInsensitiveKeyword) !== -1) {
                    var result = {
                        answer: processSearchResult(answer, caseInsensitiveKeyword, n),
                        question: processSearchResult(question, caseInsensitiveKeyword, n),
                        ref: item
                    }

                    faqSearchResults.push(result);
                }
            });
            return faqSearchResults;
        }

        function showGuideAsPopup(guide, relatedGuides, title) {
            tool.openModalByDefinition('p.faq.GuideAsPopupController', {
                guide: guide,
                relatedGuides: relatedGuides,
                title: title
            });
        }

        function searchGuide(keyword, list, n) {
            if (!n) {
                n = 10;
            }
            var guideSearchResults = [];
            var caseInsensetiveKeyword = new RegExp(keyword, 'i');

            list.forEach(function (item) {
                var title = $("<div>" + item.flowTitle + "</div>").text();

                var foundItem = false;
                var firstQuestion = $("<div>" + item.flowSteps[0].description + "</div>").text();
                var flowStep = processSearchResult(firstQuestion, caseInsensetiveKeyword, n);


                for (var i = 1; i < item.flowSteps.length; i++) {
                    var question = $("<div>" + item.flowSteps[i].description + "</div>").text();
                    if (question.search(caseInsensetiveKeyword) !== -1) {
                        flowStep = processSearchResult(question, caseInsensetiveKeyword, n);
                        foundItem = true;
                        break;
                    }
                }


                if (!foundItem && title.search(caseInsensetiveKeyword) < 0) {
                    return;
                }
                var result = {
                    flowTitle: processSearchResult(title, caseInsensetiveKeyword, n),
                    flowStep: flowStep,
                    ref: item
                }
                guideSearchResults.push(result);

            });

            return guideSearchResults;
        }


        function setSelectedStepIndex(flow, index) {
            flow.selectedStepIndex = index;
            flow.selectedStep = flow.flowSteps[index];
        }

        function setSelectedStep(flow, step) {
            flow.selectedStepIndex = flow.flowSteps.indexOf(step);
            flow.selectedStep = step;
        }

        tool.setServiceObjectProperties({
            searchGuide: searchGuide,
            setSelectedStepIndex: setSelectedStepIndex,
            setSelectedStep: setSelectedStep,
            searchFaq: searchFaq,
            showGuideAsPopup: showGuideAsPopup,
            getItem: getItem,
            getQuestions: getQuestions,
            getGuideFlows: getGuideFlows,
            checkObjectWithinCategory: checkObjectWithinCategory,
            checkObjectWithinUserRole: checkObjectWithinUserRole
        });
    });