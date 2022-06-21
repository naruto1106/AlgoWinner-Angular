agmNgModuleWrapper('agm.common')
    .ngApp
    .factory('commonRecursionHelperFactory', [
        '$compile', function ($compile) {
            return {
                /**
         * Manually compiles the element, fixing the recursion loop.
         * @param element
         * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
         * @returns An object containing the linking functions.
         */
                compile: function (element, link) {
                    // Normalize the link parameter
                    if (angular.isFunction(link)) {
                        link = { post: link };
                    }

                    // Break the recursion loop by removing the contents
                    var contents = element.contents().remove();
                    var compiledContents;
                    return {
                        pre: (link && link.pre) ? link.pre : null,
                        /**
                 * Compiles and re-adds the contents
                 */
                        post: function (scope, element) {
                            // Compile the contents
                            if (!compiledContents) {
                                compiledContents = $compile(contents);
                            }
                            // Re-add the compiled contents to the element
                            compiledContents(scope, function (clone) {
                                element.append(clone);
                            });

                            // Call the post-linking function, if any
                            if (link && link.post) {
                                link.post.apply(null, arguments);
                            }
                        }
                    };
                }
            };
        }
    ]);

agmNgModuleWrapper('agm.common')
    .defineService('commonGenericTreeSelectionService', [], function (serviceObj, dep, tool) {
        function recursiveSetChecked(branch, flag) {
            branch.checked = flag;
            if (branch.subCombinations) {
                branch.subCombinations.forEach(function (childBranch) {
                    recursiveSetChecked(childBranch, flag);
                });
            }
        }

        function evaluateChildBranch(branch, expanded) {
            var isAnyTrue = false;
            var isAllTrue = true;
            var isAnyIndeterminate = false;
            if (branch.subCombinations) {
                branch.subCombinations.forEach(function (childBranch) {
                    isAnyTrue = isAnyTrue || childBranch.checked;
                    isAnyIndeterminate = isAnyIndeterminate || childBranch.indeterminate;
                    isAllTrue = isAllTrue && childBranch.checked;
                });
                if (isAllTrue) {
                    branch.indeterminate = false;
                    branch.checked = true;
                } else if (!isAnyTrue) {
                    branch.indeterminate = false;
                    branch.checked = false;
                } else {
                    branch.indeterminate = true;
                }
                if (isAnyIndeterminate) {
                    branch.indeterminate = true;
                }
            }

        }

        tool.setServiceObjectProperties({
            recursiveSetChecked: recursiveSetChecked,
            evaluateChildBranch: evaluateChildBranch
        });
    })
    .defineDirectiveForE("agmc-generic-tree-selection", ["commonRecursionHelperFactory"], function (dep) {
        return {
            controller: "common.GenericTreeSelectionController",
            templateUrl: '/App/common/directives/common.genericTreeSelection.html',
            compile: function (element) {
                // Use the compile function from the commonRecursionHelperFactory,
                // And return the linking function(s) which it returns
                return dep.commonRecursionHelperFactory.compile(element);
            }
        };
    },
    {
        branch: '=',
        canExpand: '=?',
        onSelectionChanged: '&?'
    })
    .defineController('common.GenericTreeSelectionController', ['commonGenericTreeSelectionService'], function (vm, dep, tool) {

        var commonGenericTreeSelectionService = dep.commonGenericTreeSelectionService;
        
        function showInfoBtn(branch) {
            return Object.keys(branch.combination).length === 0;
        }

        function canBeExpanded() {
            return (vm.branch.checked || vm.branch.indeterminate) && vm.branch.subCombinations && vm.canExpand;
        }

        function isExpanded() {
            return vm.isSetToExpand && canBeExpanded();
        }
        
        function toggleExpanded() {
            vm.isSetToExpand = !vm.isSetToExpand;
        }

        tool.on('agmSharedGenericTreeSelectionChecked', function (event, args) {
            if (args.source === vm.branch) {
                return;
            }
            commonGenericTreeSelectionService.evaluateChildBranch(vm.branch);
            if (vm.onSelectionChanged) {
                vm.onSelectionChanged();
            }
        });

        function onCheckboxChanged() {
            tool.emit('agmSharedGenericTreeSelectionChecked', { source: vm.branch });
            vm.branch.indeterminate = false;
            if (vm.branch.checked) {
                vm.isSetToExpand = true;
            } else {
                vm.isSetToExpand = false;
            }
            if (vm.branch.subCombinations) {
                vm.branch.subCombinations.forEach(function (branch) {
                    commonGenericTreeSelectionService.recursiveSetChecked(branch, vm.branch.checked);
                });
            }
            if (vm.onSelectionChanged) {
                vm.onSelectionChanged();
            }
        }

        function showDescription(dataMart) {
            if (dataMart.IsLocked) return;
            tool.openModalByDefinition('s.datamart.EventDetailsPopupController', {
                feed: dataMart
            });
        }

        tool.setVmProperties({
            toggleExpanded: toggleExpanded,
            isSetToExpand: false,
            isExpanded: isExpanded,
            canBeExpanded: canBeExpanded,
            showInfoBtn: showInfoBtn,
            onCheckboxChanged: onCheckboxChanged,
            showDescription: showDescription
        });
    });