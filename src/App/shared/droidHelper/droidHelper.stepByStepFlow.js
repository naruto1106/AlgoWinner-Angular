agmNgModuleWrapper('agms.droidHelper')
    .defineController("s.droidHelper.StepByStepFlowController",
    [],
    function (vm, dep, tool) {
        // --- LOCAL VAR DECLARATION
        var LAST_STEP_NAME = "_OMEGA_";

        // --- LOCAL SERVICE FUNC 
        function computeLastStepName() {
            if (vm.lastStepName === LAST_STEP_NAME) {
                vm.maximumStep = vm.enabledSteps.length + 1;
                return;
            }

            vm.enabledSteps.forEach(function (childVm, idx) {
                if (childVm.name === vm.lastStepName) {
                    vm.maximumStep = idx + 1;
                };
            });
        }

        function getNameByStep(step) {
            if (vm.enabledSteps[step - 1]) {
                return vm.enabledSteps[step - 1].name;
            }
            if (step === vm.enabledSteps.length + 1) {
                return LAST_STEP_NAME;
            }
            return "";
        }

        function computeEnabledSteps() {
            vm.enabledSteps = vm.steps.filter(function (s) {
                return s.isEnabled;
            });
        }

        function adjustStep() {
            computeEnabledSteps();
            vm.enabledSteps.forEach(function (childVm, idx) {
                childVm.isAccessible = vm.isAccessible(idx);
                childVm.isActive = vm.isActive(idx);
            });
        }

        function updateNavigator() {
            computeEnabledSteps();
            vm.enabledSteps.forEach(function (childVm, idx) {
                if (idx + 1 === vm.currentStep) {
                    vm.navigatorVisibility = childVm.showNavigator;
                }
            });
        }

        function computeCurrentStep() {
            vm.enabledSteps.forEach(function (childVm, idx) {
                if (childVm.name === vm.currentStepName) {
                    vm.currentStep = idx + 1;
                };
            });
        }


        // --- SCOPE FUNC
        vm.addStep = function (childVm) {
            vm.steps.push(childVm);

            //set up enabled steps, current step & last step name after adding steps
            computeEnabledSteps();
            computeCurrentStep();
            computeLastStepName();
            adjustStep();
            updateNavigator();
        }
        vm.syncStep = function (step) {
            vm.currentStepName = getNameByStep(step);
        }
        vm.updateSize = function () {
            adjustStep();
        }

        vm.isAccessible = function (idx) {
            return idx + 1 <= vm.maximumStep;
        }

        vm.isActive = function (idx) {
            return idx + 1 === vm.currentStep;
        }

        vm.goToStep = function (step) {
            vm.syncStep(step);
        }

        vm.nextStep = function () {
            var oldStep = vm.currentStep;
            var step = vm.currentStep + 1;
            vm.syncStep(step);

            if (vm.enabledSteps[oldStep - 1].onNextClicked) {
                vm.enabledSteps[oldStep - 1].onNextClicked({
                    nextStep: vm.currentStep,
                    oldStep: oldStep
                });
            }
        }

        vm.prevStep = function () {
            var oldStep = vm.currentStep;
            var step = vm.currentStep - 1;
            vm.syncStep(step);
            if (vm.enabledSteps[oldStep - 1].onPrevClicked) {
                vm.enabledSteps[oldStep - 1].onPrevClicked({
                    nextStep: vm.currentStep,
                    oldStep: oldStep
                });
            }
        }


        // --- EVENT HANDLERS
        //for steps navigation
        tool.watch('vm.currentStepName',
            function () {
                if (vm.currentStepName && vm.lastStepName) {
                    computeCurrentStep();
                    adjustStep();
                    updateNavigator();
                }
            });
        tool.watch('vm.lastStepName',
            function () {
                if (vm.currentStepName && vm.lastStepName) {
                    computeLastStepName();
                    adjustStep();
                }
            });


        tool.initialize(function () {
            tool.setVmProperties({
                currentStep: 1,
                steps: [],
                stepDicts: {},
                enabledSteps: [],
                navigatorVisibility: false
            });
        });
    })
    .defineDirectiveForE('agms-droid-helper-step-by-step-flow',
    [],
    function () {
        return {
            controller: "s.droidHelper.StepByStepFlowController",
            templateUrl: '/App/shared/droidHelper/droidHelper.stepByStepFlow.html',
            transclude: true
        };
    },
    {
        currentStepName: "=",
        lastStepName: "=",
        enableSwiping: "=?",
        isLoading: "=?"
    },
    function (scope, element, attrs, controller, transcludeFn, dep, tool) {

    })
    .defineController("agmSharedSingleStepController",
    [],
    function (vm, dep, tool) {

    }
    )
    .defineDirectiveForE('agms-droid-helper-single-step',
    [],
    function () {
        return {
            controller: "agmSharedSingleStepController",
            templateUrl: '/App/shared/droidHelper/droidHelper.singleStep.html',
            transclude: true,
            require: "^agmsDroidHelperStepByStepFlow"
        };
    },
    {
        title: "@",
        name: "@",
        isEnabled: "=?",
        showNavigator: '=?',
        nextLabel: '@?',
        prevLabel: '@?',
        onNextClicked: '&?',
        onPrevClicked: '&?'

    },
    function (scope, element, attrs, controller, transcludeFn, dep, tool) {
        var vm = scope.vm;

        if (vm.isEnabled === undefined) {
            vm.isEnabled = true;
        }

        tool.watch('vm.isEnabled',
            function () {
                controller.updateSize();
            });

        if (vm.showNavigator === undefined) {
            vm.showNavigator = true;
        }

        vm.enableSwiping = function () {
            return controller.enableSwiping;
        }

        vm.isShown = function () {
            return vm.isAccessible && vm.isEnabled && vm.isActive;
        }

        controller.addStep(vm);
    });