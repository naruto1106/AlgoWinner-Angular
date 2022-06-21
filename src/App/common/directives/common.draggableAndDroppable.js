agmNgModuleWrapper('agm.common')
    .defineFactory("commonDraggableItemMemoryFactory", [], function(dep, tool) {
            var commonDroppableContainerManagerService = dep.commonDroppableContainerManagerService;
            var obj = {
                counter: 0,
                getNewId: function() {
                    this.counter++;
                    return this.counter;
                },
                onDraggingEndDeferred: null,
                onDraggingCallback: function() {},
                startDrag: function(item, draggingHandler) {
                    this.isDragging = true;
                    this.draggingHandler = draggingHandler;
                    this.onDraggingEndDeferred = tool.defer();
                    this.memorizedItem = item;
                    return this.onDraggingEndDeferred.promise;
                },
                cancelDrag: function() {
                    if (!this.isDragging) {
                        return null;
                    }
                    this.isDragging = false;
                    this.onDraggingEndDeferred.reject(this.memorizedItem);
                    return this.memorizedItem;
                },
                stopSuccessfulDrag: function(x, y, droppableContainer) {
                    if (!this.isDragging) {
                        return null;
                    }
                    this.isDragging = false;
                    x = x || 0;
                    y = y || 0;
                    if (this.memorizedItem) {
                        this.memorizedItem.stopDragPosition = { x: x, y: y };
                    }
                    this.handleContainerMoving(droppableContainer);

                    return this.memorizedItem;
                },
                getModelIndex: function(container, item) {
                    var itemIndex = -1;
                    for (var i = 0; i < container.length; i++) {
                        var u = container[i];
                        if (u.draggableId == item.draggableId) {
                            itemIndex = i;
                            break;
                        }
                    }
                    return itemIndex;
                },
                cloneItem: function(item) {
                    return {
                        model: angular.copy(item.model),
                        draggableId: this.getNewId()
                    };
                },
                adjustPosition: function(newItem, oldItem) {
                    var stopDragPosition = angular.copy(oldItem.stopDragPosition);
                    stopDragPosition.x -= oldItem.localOffsetX;
                    stopDragPosition.y -= oldItem.localOffsetY;
                    newItem.stopDragPosition = stopDragPosition;
                },
                handleContainerMoving: function(stopDroppableContainer) {
                    var oldItem = this.memorizedItem;
                    var newItem = null;
                    var isItemCloned = false;
                    var isDeletingOldItem = false;
                    var startDroppableContainer = null;
                    if (oldItem.startDroppableContainerName) {
                        startDroppableContainer = commonDroppableContainerManagerService.getContainerByName(oldItem.startDroppableContainerName);
                    }

                    var moveWithinTheSameContainer = startDroppableContainer && startDroppableContainer.name == stopDroppableContainer.name;
                    if (moveWithinTheSameContainer) {
                        if (oldItem.isReplaced) {
                            isItemCloned = false;
                            isDeletingOldItem = false;
                            newItem = oldItem;
                        } else {
                            isItemCloned = true;
                            isDeletingOldItem = false;
                        }
                    } else {
                        if (oldItem.isReplaced) {
                            isItemCloned = true;
                            isDeletingOldItem = true;
                        } else {
                            isItemCloned = true;
                            isDeletingOldItem = false;
                        }
                    }
                    if (isItemCloned) {
                        newItem = this.cloneItem(oldItem);
                        stopDroppableContainer.list.push(newItem);
                        newItem.startDroppableContainerName = stopDroppableContainer.name;
                    }
                    if (newItem) {
                        this.adjustPosition(newItem, oldItem);
                    }
                    if (isDeletingOldItem && startDroppableContainer) {
                        var oldItemIndex = this.getModelIndex(startDroppableContainer.list, oldItem);
                        startDroppableContainer.list.splice(oldItemIndex, 1);
                    }
                    this.onDraggingEndDeferred.resolve({
                        oldItem: this.memorizedItem,
                        newItem: newItem,
                        isItemCloned: isItemCloned
                    });
                },
                memorizedItem: null,
                isDragging: false
            };

            $('body').mousemove(function(evt) {
                if (obj.draggingHandler && obj.isDragging) {
                    obj.draggingHandler(evt);
                }
            });
            $('body').mouseup(function(evt) {
                tool.timeout(function() {
                    evt.stopPropagation();
                    obj.cancelDrag(evt.offsetX, evt.offsetY);
                });
            });
            return obj;
        }
    )
    .defineService('commonDroppableContainerManagerService', [],
        function(serviceObj, dep, tool) {
            tool.setServiceObjectProperties({
                generateNewDroppableContainer: function(name, list) {
                    var existingContainer = this.getContainerByName(name);
                    if (list != undefined) {

                    }
                    if (existingContainer) {
                        if (list) {
                            existingContainer.list = list;
                        }
                        return existingContainer;
                    }
                    var newContainer = {
                        name: name,
                        list: list || []
                    };
                    this.containerLibraries.push(newContainer);
                    return newContainer;
                },
                getContainerByName: function(name) {
                    var existingContainer = null;
                    this.containerLibraries.forEach(function(item) {
                        if (item.name == name) {
                            existingContainer = item;
                        }
                    });
                    return existingContainer;
                },
                containerLibraries: []
            });
        }
    )
    .defineDirectiveForA('agmc-draggable', [], function(dep, tool) {
            var commonDraggableItemMemoryFactory = dep.commonDraggableItemMemoryFactory;
            return {
                restrict: 'A',
                scope: {
                    draggableModel: '=',
                    draggableModelContainer: '=?',
                    draggableItem: '=?',
                    draggableReplace: '=',
                    draggableId: '=',
                    draggableDisabled: '=',
                    draggableEvents: '&',
                    draggableOnStartDrag: '=?',
                    draggableOnDrop: '=?',
                    draggableCopyModel: '='
                },
                link: function(scope, element, attr) {
                    scope.duplicatedElements = [];
                    scope.currentDuplicatedElement = null;
                    scope.parentElement = element.parent();
                    scope.draggableItem = scope.draggableItem || null;
                    if (!scope.draggableItem) {
                        scope.draggableItem = {
                            stopDragPosition: null,
                            model: scope.draggableModel,
                            draggableId: scope.draggableId || 0
                        };
                        scope.draggableItem.startDroppableContainerName = null;
                        if (scope.draggableModelContainer) {
                            scope.draggableItem.startDroppableContainerName = scope.draggableModelContainer.name;
                        }
                    }
                    scope.draggableItem.isReplaced = scope.draggableReplace || false;
                    scope.draggableItem.getElement = function() {
                        return element;
                    }

                    scope.differencePoint = function(vsElement) {
                        var originalCoordinate = $(element).offset();
                        var targetCoordinate = $(vsElement).offset();

                        var x = targetCoordinate.left - originalCoordinate.left;
                        var y = targetCoordinate.top - originalCoordinate.top;
                        return {
                            x: x,
                            y: y
                        };
                    }
                    scope.draggingHandler = function(evt) {
                        scope.currentDuplicatedElement.css("visibility", scope.currentDuplicatedElement ? "visible" : "hidden");
                        if (scope.currentDuplicatedElement) {
                            scope.currentDuplicatedElement.css("top", evt.clientY - scope.draggableItem.localOffsetY);
                            scope.currentDuplicatedElement.css("left", evt.clientX - scope.draggableItem.localOffsetX);
                            scope.currentDuplicatedElement.css("position", "fixed");
                        }
                    };
                    scope.cleanupElement = function() {
                        scope.duplicatedElements.forEach(function(e) {
                            e.remove();
                        });
                    };
                    element.mousedown(function(evt) {
                        scope.handleMouseDown(evt);
                    });
                    element.mouseup(function(evt) {
                        scope.handleMouseUp(evt);
                    });
                    scope.draggableEvents({ isDragging: false });

                    scope.beforeDragging = function() {
                        scope.draggableEvents({ isDragging: true });
                        if (scope.draggableDisabled) {
                            return;
                        };
                        scope.cleanupElement();
                        scope.currentDuplicatedElement = element.clone();
                        scope.duplicatedElements.push(scope.currentDuplicatedElement);
                        scope.parentElement.append(scope.currentDuplicatedElement);
                        scope.currentDuplicatedElement.addClass("dragged-item");
                        scope.currentDuplicatedElement.mouseup(function() {

                        });

                    };

                    scope.handleMouseDown = function(evt) {
                        tool.timeout(function() {
                            if (!commonDraggableItemMemoryFactory.isDragging) {
                                evt.stopPropagation();
                                var p = scope.differencePoint(evt.target);
                                scope.draggableItem.localOffsetX = p.x + evt.offsetX;
                                scope.draggableItem.localOffsetY = p.y + +evt.offsetY;
                                scope.beforeDragging();
                                if (scope.draggableOnStartDrag) {
                                    scope.draggableOnStartDrag(scope.draggableItem, element);
                                }
                                var promise = commonDraggableItemMemoryFactory.startDrag(scope.draggableItem, scope.draggingHandler, scope.draggableOnDrop);
                                promise
                                    .then(function(res) {
                                        var oldItem = res.oldItem;
                                        var newItem = res.newItem;
                                        var isItemCloned = res.isItemCloned;
                                        scope.draggableEvents({ isDragging: false });
                                        scope.cleanupElement();
                                        if (scope.draggableOnDrop) {
                                            scope.draggableOnDrop(oldItem, newItem, element, true);
                                        }
                                    }, function() {
                                        scope.draggableEvents({ isDragging: false });
                                        scope.cleanupElement();
                                        if (scope.draggableOnDrop) {
                                            scope.draggableOnDrop(scope.draggableItem, scope.draggableItem, element, false);
                                        }
                                    });
                            }
                        });
                    };
                    scope.handleMouseUp = function(evt) {
                        if (scope.draggableDisabled) {
                            return;
                        }
                        evt.stopPropagation();
                        tool.timeout(function() {
                            commonDraggableItemMemoryFactory.cancelDrag();
                        });
                    };

                }
            };
        }
    )
    .defineDirectiveForA('agmc-droppable', [], function(dep, tool) {
            var commonDraggableItemMemoryFactory = dep.commonDraggableItemMemoryFactory;
            return {
                link: function(scope, element, attr) {
                    element.mousedown(function(evt) {

                    });
                    element.mouseup(function(evt) {

                        tool.timeout(function() {
                            evt.stopPropagation();
                            scope.droppableModelContainer = scope.droppableModelContainer || [];
                            var offset = element.offset();
                            var x = evt.pageX - offset.left;
                            var y = evt.pageY - offset.top;
                            if (commonDraggableItemMemoryFactory.isDragging) {
                                var newModel = commonDraggableItemMemoryFactory.stopSuccessfulDrag(x, y, scope.droppableModelContainer);
                            }
                        });
                    });
                }
            };
        }, {
            droppableModelContainer: '=',
            capacity: '='
        }
    );