agmNgModuleWrapper('agmp.strategy')
    .defineControllerAsPopup('p.strategy.EditController',
        {
            templateUrl: '/App/pages/strategy/strategy.edit.html',
            windowClass: 'full-size-modal'
        },
        [
            'sStrategyCommerceService', 'strategyId'
        ],
        function(vm, dep, tool) {
            var sStrategyCommerceService = dep.sStrategyCommerceService,
                coreNotificationService = dep.coreNotificationService,
                strategyId = dep.strategyId;

            vm.stepText = [];
            vm.isSubmitting = true;

            vm.setStep = setStep;
            vm.getStepIndex = getStepIndex;
            vm.stepStrategyClass = stepStrategyClass;
            vm.saveChanges = saveChanges;

            function setStep(step) {
                vm.step = step;
            }

            function getStepIndex(index) {
                return index + 1;
            }

            function stepStrategyClass(index) {
                index = getStepIndex(index);
                var cssClass = [];
                if (index === vm.step) {
                    cssClass.push('active');
                }
                if (index < vm.step) {
                    cssClass.push('passed');
                }
                return cssClass;
            }

            function saveChanges() {
                vm.isSubmitting = true;
                if (vm.strategyToEdit.BasicInfo.Status !== 'Published') {
                    // TODO: MaRa IMPLEMENT LOGIN POPUP FORM FOR UNAUTHORIZED
                    sStrategyCommerceService.EditCreatedStrategy(vm.strategyToEdit)
                        .then(function(res) {
                            coreNotificationService.notifySuccess("Success", "Strategy updated successfully");
                            vm.uibClosePanel();
                        }, function(res) {
                            coreNotificationService.notifyError("Save Strategy", "Error! " + (res.data && res.data.Message));
                            vm.uibClosePanel();
                        });
                } else {
                    sStrategyCommerceService.EditPublishedStrategy(vm.strategyToEdit)
                        .then(function(res) {
                            coreNotificationService.notifySuccess("Success", "Strategy updated successfully");
                            vm.uibClosePanel();
                        }, function(res) {
                            coreNotificationService.notifyError("Save Strategy", "Error! " + (res.data && res.data.Message));
                            vm.uibClosePanel();
                        });
                }
            }

            function init() {
                sStrategyCommerceService.GetStrategyForEditing(strategyId)
                    .then(function(res) {
                        vm.strategyToEdit = res.data;
                        vm.step = 1;
                        vm.stepText = ['Basic Info', 'Market', 'Broker Linkage'];
                        vm.isSubmitting = false;
                    }, function(res) {
                        tool.logError('Error while retrieving strategy to edit!' + res.data);
                        vm.isSubmitting = false;
                    });
            }

            init();
        }
    );