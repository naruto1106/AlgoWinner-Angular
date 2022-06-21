agmNgModuleWrapper('agms.strategyCommerce')
    .defineService('sStrategyCommerceCategoriesService', [], function(serviceObject) {

        serviceObject.getCategoryName = function (cat) {
            return cat.name;
        };
        serviceObject.getCategoryValue = function (cat) {
            return cat.value;
        };
    })
    .defineController('s.strategyCommerce.CharacteristicController', ['sStrategyCommerceCategoriesService', 'sStrategyCommerceService'],
        function(vm, dep, tool) {
            var $scope = dep.$scope, sStrategyCommerceCategoriesService = dep.sStrategyCommerceCategoriesService, sStrategyCommerceService = dep.sStrategyCommerceService;
            vm.coreUserStateService = dep.coreUserStateService;
            var defaultImageFolder = "//am708403.azureedge.net/images/strategy/default/";

            vm.showHint = false;

            sStrategyCommerceService.GetOwnedStrategiesCount().then(function(res) {
                vm.showHint = res.data === 0;
            });

            vm.categories = [
                { name: 'Bottom Fishing', value: false },
                { name: 'Breakout', value: false },
                { name: 'Fundamental', value: false },
                { name: 'Trend Following', value: false },
                { name: 'News', value: false },
                { name: 'Statistical', value: false },
                { name: 'Others', value: false }
            ];

            vm.expectedTradeDurations = [
                { Operator: "<", DurationType: "Day", Length: 1 },
                { Operator: "<", DurationType: "Week", Length: 1 },
                { Operator: "<", DurationType: "Month", Length: 1 },
                { Operator: "<", DurationType: "Month", Length: 3 },
                { Operator: "<", DurationType: "Month", Length: 6 },
                { Operator: ">", DurationType: "Month", Length: 6 }
            ];

            vm.sameStrategyName = false;

            vm.isStrategyPublished = isStrategyPublished;
            vm.changeIcon = changeIcon;
            vm.isInvalidCategoryCount = isInvalidCategoryCount;
            vm.tooManyCategoriesSelected = tooManyCategoriesSelected;
            vm.noCategorySelected = noCategorySelected;
            vm.loadFile = loadFile;
            vm.changeModel = changeModel;
            vm.checkStrategyNameSimplified = checkStrategyNameSimplified;
            vm.checkStrategyName = checkStrategyName;

            function checkStrategyNameSimplified() {
                if (vm.strategyModel.Name === "" || vm.strategyModel.Name == null) {
                    vm.sameStrategyName = false;
                } else {
                    sStrategyCommerceService.PrivateStrategyWithSameName(vm.strategyModel.Name).then(function (res) {
                        vm.sameStrategyName = res.data;
                    });
                }
            }

            function checkStrategyName() {
                if (vm.strategyModel.Name === "" || vm.strategyModel.Name == null) {
                    vm.sameStrategyName = false;
                } else {
                    sStrategyCommerceService.PublicStrategyWithSameNameExceptWithId(vm.strategyModel.Name, vm.strategyModel.StrategyId).then(function(res) {
                        vm.sameStrategyName = res.data;
                    });
                }
            }

            if (!vm.isSimplifiedMode) {
                checkStrategyName();
            }

            function isStrategyPublished(status) {
                return status === 'Published' || status === 'Expired';
            }

            function changeIcon() {
                var modalInstance = tool.openModalByDefinition('s.image.UploadDialogController', {
                    params: {
                        targetWidth: 300,
                        targetHeight: 200,
                        existingImage: vm.strategyModel.ImageData || vm.strategyModel.ImageUrl,
                        constrainedImageFile: null
                    }
                });
                modalInstance.result.then(function(res) {
                    // the "res" here is the image as base64
                    vm.strategyModel.ImageData = res;
                });
            }

            vm.canSubmit = canSubmit;

            function canSubmit() {
                var published = vm.isStrategyPublished(vm.strategyModel.Status);
                var validBasicForm = $scope.strategycharacteristics.$valid && !vm.sameStrategyName;
                var hasValidCategoryCount = !vm.isInvalidCategoryCount();
                var hasValidImageToPublish = vm.hasValidImageToPublish();    

                if (published) {
                    vm.canContinue = validBasicForm && hasValidCategoryCount && hasValidImageToPublish;
                } else if (vm.isSimplifiedMode) {
                    vm.canContinue = validBasicForm;
                } else {
                    vm.canContinue = validBasicForm && hasValidCategoryCount && hasValidImageToPublish;                    
                }
                return vm.canContinue;
            }

            function getSelectedCategoryCount() {
                var selectedCategories = _.where(vm.categories, { 'value': true });
                return selectedCategories.length;
            }

            function isInvalidCategoryCount() {
                return noCategorySelected() || tooManyCategoriesSelected();
            }

            function tooManyCategoriesSelected() {
                return getSelectedCategoryCount() > 3;
            }

            function noCategorySelected() {
                return getSelectedCategoryCount() < 1;
            }

            function getImage() {
                return vm.strategyModel.ImageData ? vm.strategyModel.ImageData : vm.strategyModel.ImageUrl;
            }

            vm.getImage = getImage;

            function loadFile(result) {
                vm.imageSource = result;
            }

            function changeModel() {
                vm.strategyModel.Categories = vm.categories.filter(sStrategyCommerceCategoriesService.getCategoryValue)
                    .map(sStrategyCommerceCategoriesService.getCategoryName);
            }

            vm.hasValidImageToPublish = function() {
                return vm.strategyModel.ImageUrl != null && (!vm.strategyModel.ImageUrl.startsWith(defaultImageFolder) || vm.strategyModel.ImageData);
            }
            tool.onRendered(function() {
                vm.categories.forEach(function(c) {
                    if (vm.strategyModel.Categories && vm.strategyModel.Categories.indexOf(c.name) >= 0) {
                        c.value = true;
                    } else {
                        c.value = false;
                    }
                });
                vm.expectedTradeDurations.forEach(function(td) {
                    if (angular.equals(td, vm.strategyModel.TradeDuration)) {
                        vm.strategyModel.TradeDuration = td;
                    }
                });

                if (!vm.strategyModel.ImageUrl) {
                    return sStrategyCommerceService.GetStrategyImages().then(function(res) {
                        var existingImageUrls = res.data;
                        for (i = 0; i < 20; i++) {

                            var number = (i % 10) + 1;
                            if (i < 10) {
                                number = "0" + number;
                            };

                            var src = defaultImageFolder + number + ".jpg?";
                            if (existingImageUrls.indexOf(src) < 0) {
                                vm.strategyModel.ImageUrl = src;
                                break;
                            }
                        }
                    });
                }
            });
        })
    .defineDirectiveForE('agms-strategy-commerce-characteristics', [],
        function() {
            return {
                controller: "s.strategyCommerce.CharacteristicController",
                templateUrl: '/App/shared/strategyCommerce/strategyCommerce.characteristic.html',
            };
        },
        {
            strategyModel: "=",
            nextFunc: "&",
            canContinue: "=?",
            prevFunc: "&",
            nextLabel: "=",
            prevLabel: "=",
            isSimplifiedMode: '=?'
        });