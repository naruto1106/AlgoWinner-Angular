agmNgModuleWrapper('agms.textProcessing')
    .defineController('s.textProcessing.MultiTypeaheadController', [],
        function (vm, dep, tool) {
            var lastEditedText = "";
            vm.preIterationFunc = function (keyword) {
                var promise = vm.iterationFunc(keyword, vm.contentInfo);

                promise.then(function (res) {
                    removePositionAttribute();
                    if (res.length > 0) {
                        lastEditedText = vm.ngModel;
                    }
                    vm.hasMatchesShown = res.length > 0;
                });
                return promise;
            };
            vm.preUpdateContent = function () {
                vm.selectedItem = vm.ngModel;
                vm.ngModel = lastEditedText;
                if (vm.onItemSelected) {
                    vm.onItemSelected({
                        selectedItem: vm.selectedItem,
                        contentInfo: vm.contentInfo
                    });
                }
            };

            function onTextChanged() {
                if (vm.onChanged) {
                    tool.evalAsync(function () {
                        vm.onChanged({
                            model: vm.ngModel,
                            contentInfo: vm.contentInfo,
                            contentControl: vm.contentControl
                        });
                    });
                }
            }

            tool.watch('vm.ngModel', function() {
                if (typeof vm.ngModel == typeof "just a string") {
                    vm.hasMatchesShown = false;
                    onTextChanged();
                }
            });


            function removePositionAttribute() {
                var dropdownElementQuery = vm.getDropdownElement();
                tool.timeout(function () {
                    dropdownElementQuery.attr('ng-style', null);
                    dropdownElementQuery.attr('style', null);
                    if (vm.dropdownClasses) {
                        dropdownElementQuery.addClass(vm.dropdownClasses);
                    }
                });
            }

        })
    .defineDirectiveForE('agms-text-processing-multi-typeahead', ['$sce'],
        function (dep, tool) {
            return {
                require: ['^ngModel', '^?ngModelOptions'],
                controller: "s.textProcessing.MultiTypeaheadController",
                templateUrl: '/App/shared/textProcessing/textProcessing.multiTypeahead.html',
                compile: function (element, attrs) {
                    var e = $(element).find("[new-uib-typeahead]");
                    var compiledExpression = attrs.iterationExpression + " in vm.preIterationFunc($viewValue)";
                    e.attr('uib-typeahead', compiledExpression);
                    e.attr('new-uib-typeahead', null);
                    if (attrs.popupTemplateUrl) {
                        e.attr('typeahead-popup-template-url', attrs.popupTemplateUrl);
                    }
                    if (attrs.templateUrl) {
                        e.attr('typeahead-template-url', attrs.templateUrl);
                    }
                    if (attrs.waitMs) {
                        e.attr('typeahead-wait-ms', attrs.waitMs);
                    }
                    return function (scope, element, attrs, controllers) {
                        var dropdownScope = null;
                        scope.vm.getDropdownElement = function () {
                            return $(element).find('.dropdown-menu');
                        }
                        scope.vm.isFocus = false;
                        scope.vm.getDropdownScope = function () {
                            if (!dropdownScope) {
                                var dropdownElementQuery = scope.vm.getDropdownElement();
                                dropdownScope = angular.element(dropdownElementQuery).scope();
                            }
                            return dropdownScope;
                        }
                    }
                },

            }
        },
        {
            ngModel: '=',
            ngModelOptions: '=',
            iterationFunc: '=',
            contentControl: '=?',
            contentInfo: '=?',
            onChanged: '&?',
            onItemSelected: '&',
            iterationExpression: '@',
            popupTemplateUrl: '@?',
            templateUrl: '@?',
            dropdownClasses: '@?',
            placeholder: '@',
            hasMatchesShown: '=',
            waitMs: '@?',
            isFocus:'=?'
        });