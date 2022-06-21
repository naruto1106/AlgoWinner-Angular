agmNgModuleWrapper('agms.textProcessing')
    .defineDirectiveForE('agms-text-processing-multi-autocomplete',
        [], function(dep, tool) {
            var $window = dep.$window;
            return {
                link: function(scope, element, attrs, controller, transclude) {
                    var window = angular.element($window);
                    scope.models = {
                        textBox: ""
                    };
                    var notifyOnItemsChanged = function() {
                        if (scope.onItemsChanged) {
                            scope.onItemsChanged(scope.items);
                        }
                    }
                    scope.keyCode = 0;
                    scope.items = [];
                    scope.unrecognizedItems = [];
                    scope.focus = function() {
                        if (scope.models.textBox.length === 0 || scope.models.textBox === "") {
                            scope.populatedItems = [];
                        }
                        var e = $(element).find("input.input");
                        e.focus();
                        scope.isFocusing = true;
                    }
                    scope.defocus = function() {
                        var e = $(element).find("input.input");
                        e.blur();
                        scope.isFocusing = false;
                    }
                    var pushToItems = function(item) {
                        scope.items.push(item);
                        scope.models.textBox = "";
                        notifyOnItemsChanged();
                    }
                    var pullFromItems = function() {
                        var lastItem = null;
                        if (scope.items.length > 0) {
                            lastItem = scope.items[scope.items.length - 1];
                            scope.items.splice(scope.items.length - 1, 1);
                            if (scope.unrecognizedItems.length > 0) {
                                for (var i = 0; i < scope.unrecognizedItems.length; i++) {
                                    if (scope.unrecognizedItems[i].name === lastItem.name) {
                                        scope.unrecognizedItems.splice(i, 1);
                                    }
                                }
                            }
                        }
                        if (lastItem) {
                            scope.models.textBox = lastItem.name;
                        }
                        notifyOnItemsChanged();
                    }
                    scope.removeItem = function(index) {
                        if (scope.unrecognizedItems.length > 0) {
                            for (var i = 0; i < scope.unrecognizedItems.length; i++) {
                                if (scope.unrecognizedItems[i].name === scope.items[index].name) {
                                    scope.unrecognizedItems.splice(i, 1);
                                }
                            }
                        }
                        scope.items.splice(index, 1);
                        notifyOnItemsChanged();
                        scope.focus();
                    }
                    scope.removeAllItems = function() {
                        scope.models.textBox = "";
                        if (scope.unrecognizedItems.length > 0) {
                            scope.unrecognizedItems.splice(0, scope.unrecognizedItems.length);
                        }
                        if (scope.items.length > 0) {
                            scope.items.splice(0, scope.items.length);
                            notifyOnItemsChanged();
                        }
                        scope.populatedItems = [];
                    }
                    scope.pointerIndex = -1;
                    scope.$watch('$scope.models.textBox', function() {
                        if (scope.models.textBox.trim().length == 0) {
                            scope.populatedItems = [];
                            scope.pointerIndex = -1;
                        }
                    });
                    scope.addToList = function(item) {
                        pushToItems(item);
                        scope.pointerIndex = -1;
                        //scope.defocus();
                    }
                    scope.setPointerIndex = function(index) {
                        scope.pointerIndex = index;
                    }
                    scope.onInputKeyup = function($event) {
                        scope.models.textBox = scope.models.textBox.replace(',', '').trim();
                        if (scope.models.textBox.length === 0 || scope.models.textBox === "") {
                            scope.populatedItems = [];
                            scope.pointerIndex = -1;
                        } else if (scope.promise) {
                            scope.promise(scope.models.textBox).then(function(result) {
                                if (result.requestText === scope.models.textBox) {
                                    scope.populatedItems = result.result;
                                    scope.populatedItems.forEach(function(item) {
                                        //item.template = item.template || "defaultDropdownListItem";
                                        //item.typeClass = item.typeClass || "type2";
                                    });
                                }
                            }, function(result) {});
                        }
                    }
                    scope.setFocusingFalse = function() {
                        scope.isFocusing = false;
                    }
                    scope.onInputKeydown = function($event) {
                        var dropdown = $(element).find(".dropdown");
                        var adjustScrollPosition = function() {
                            if (scope.populatedItems.length < 1) {
                                return;
                            }
                            var h = dropdown.height();
                            var scrollHeight = dropdown[0].scrollHeight;
                            var percentage = scope.pointerIndex / scope.populatedItems.length;

                            var effectiveH = h * 0.7;
                            var top = Math.floor((percentage * scrollHeight) / effectiveH) * effectiveH;
                            dropdown.scrollTop(top);
                        }
                        var keyCode = $event.keyCode;
                        scope.models.textBox = scope.models.textBox.replace(',', '').trim();

                        if (keyCode == 8) {
                            if (scope.models.textBox.trim().length <= 0) {
                                pullFromItems();
                            }
                        } else if (keyCode == 40) {
                            scope.pointerIndex = scope.pointerIndex + 1;
                            if (scope.pointerIndex >= scope.populatedItems.length) {
                                scope.pointerIndex = -1;
                            }
                            adjustScrollPosition();
                        } else if (keyCode == 38) {
                            scope.pointerIndex = scope.pointerIndex - 1;
                            if (scope.pointerIndex < -1) {
                                scope.pointerIndex = scope.populatedItems.length - 1;
                            }
                            adjustScrollPosition();
                        } else if (keyCode == 13 || keyCode == 188 || keyCode == 9) {
                            if (scope.pointerIndex >= 0) {
                                pushToItems(scope.populatedItems[scope.pointerIndex]);
                            } else if (scope.models.textBox.length > 0) {
                                scope.unrecognizedItems.push({
                                    name: scope.models.textBox
                                });
                                pushToItems({
                                    name: scope.models.textBox,
                                    template: "defaultDropdownList",
                                    typeClass: "type1"
                                });
                            } else {
                                scope.defocus();
                            }
                        }
                        if (keyCode == 9) {
                            //   $event.preventDefault();
                        }
                    }
                },
                templateUrl: '/App/shared/textProcessing/textProcessing.multiAutocomplete.html'
            };
        }, {
            promise: '=',
            items: '=',
            unrecognizedItems: '=',
            onItemsChanged: '=',
            placeholderText: '=?'
        }
    )
    .ngApp
    .run([
        '$templateCache', function($templateCache) {
            $templateCache.put('defaultDropdownListItem',
                '{{populatedItem.name}}');
        }
    ]);

