agmNgModuleWrapper('agms.liveconnect')
    .defineControllerAsPopup('s.account.NewLiveController',
    {
        templateUrl: "/App/shared/liveconnect/account.newlive.html",
        windowClass: 'full-size-modal'
    },
        ['sAccountService'],
        function (vm, dep, tool) {
            var coreNotificationService = dep.coreNotificationService,
                sAccountService = dep.sAccountService;
            
            function getProgressStepState() {
                var nextStepName = vm.currentStepName;

                if (nextStepName === 'step1') {
                    nextStepName = 'step2';
                }
                else if (nextStepName === 'step2') {
                    nextStepName = 'step3';
                }
                else if (nextStepName === 'step3') {
                    nextStepName = 'step4';
                }
                else if (nextStepName === 'step4') {
                    nextStepName = 'step5';
                }
                else if (nextStepName === 'step5') {
                    nextStepName = 'step6';
                }
                else if (nextStepName === 'step6') {
                    nextStepName = 'step7';
                }
                
                return nextStepName;
            }

            function setStep(currentStepName) {
                vm.currentStepName = currentStepName;
            }
            
            function submitTiger() {
                var request = {
                    TigerId: vm.tigerId,
                    AccountId: vm.accountId
                };
                sAccountService.UploadTigerBrokerCredentials(request).then(function (res) {
                    sAccountService.InitTigerClient(request).then(function(res2) {
                        return coreNotificationService.notifySuccess("Success", "Tiger Account Linked Successfully").result
                            .then(
                                function () {
                                    vm.uibClosePanel();
                                });
                    });
                }, function () {
                    coreNotificationService.notifyError("Linking Failed", "Something went wrong linking Tiger Account").result
                        .then(
                            function () {
                                vm.uibClosePanel();
                            });
                });
            }

            function submitMoomoo() {
                var request = {
                    FutuId: vm.moomooId,
                    FutuPwd: vm.moomooPassword,
                    FutuTradingPwd: vm.moomooTradingPassword
                };
                if (vm.showMoomooConfirmation) {
                    submitMoomooVerification();
                } else {
                    sAccountService.UploadMoomooBrokerCredentials(request).then(function (res) {
                        if (res.status >= 200 && res.status < 300) {
                            // Retry until success
                            if (res.data === "RequireConfirmation") {
                                vm.showMoomooConfirmation = true;
                            } else if (res.data === "Connected") {
                                return coreNotificationService
                                    .notifySuccess("Success", "Moomoo Account Linked Successfully").result
                                    .then(
                                        function() {
                                            vm.uibClosePanel();
                                        });
                            } else {
                                return coreNotificationService.notifyError("Linking Failed",
                                        "Something went wrong linking Moomoo Account").result
                                    .then(
                                        function() {
                                            vm.uibClosePanel();
                                        });
                            }
                        } else {
                            return coreNotificationService.notifyError("Linking Failed", "Something went wrong linking Moomoo Account").result
                                .then(
                                    function () {
                                        vm.uibClosePanel();
                                    });
                        }
                    }, function() {
                        return coreNotificationService.notifyError("Linking Failed", "Something went wrong linking Moomoo Account").result
                            .then(
                                function () {
                                    vm.uibClosePanel();
                                });
                    });
                }
            }

            function generatePublicKey() {
                sAccountService.GenerateTigerPublicKey().then(function(res) {
                    vm.tigerPublicKey = res.data;
                });
            }

            function copyKey() {
                navigator.clipboard.writeText(vm.tigerPublicKey).then(function() {
                    alert("Copied to clipboard");
                });
            }

            function setViewName(viewName) {
                vm.currentViewName = viewName;
            }

            function submitMoomooVerification() {
                var request = {
                    ConfirmationToken: vm.moomooVerificationCode
                };
                sAccountService.SendMoomooConfirmationToken(request).then(function (res) {
                    if (res.status >= 200 && res.status < 300) {
                        // Retry until success
                        if (res.data === "Connected") {
                            return coreNotificationService
                                .notifySuccess("Success", "Moomoo Account Linked Successfully").result
                                .then(
                                    function() {
                                        vm.uibClosePanel();
                                    });
                        } else {
                            return coreNotificationService.notifyError("Linking Failed",
                                    "Something went wrong linking Moomoo Account").result
                                .then(
                                    function() {
                                        vm.uibClosePanel();
                                    });
                        }
                    } else {
                        return coreNotificationService.notifyError("Linking Failed", "Something went wrong linking Moomoo Account").result
                            .then(
                                function () {
                                    vm.uibClosePanel();
                                });
                    }
                }, function () {
                    return coreNotificationService.notifyError("Linking Failed", "Something went wrong linking Moomoo Account").result
                        .then(
                            function () {
                                vm.uibClosePanel();
                            });
                });
            }

            tool.setVmProperties({
                isSubmitting: false,
                showMoomooConfirmation: false,
                currentViewName: 'addBroker',
                currentStepName: 'step1',
                tigerPublicKey: "",
                tigerId: "",
                accountId: "",
                moomooId: "",
                moomooPassword: "",
                moomooTradingPassword: "",
                moomooVerificationCode: "",
                selectedBroker: "Tiger",
                generatePublicKey: generatePublicKey,
                copyKey: copyKey,
                getProgressStepState: getProgressStepState,
                setViewName: setViewName,
                setStep: setStep,
                submitTiger: submitTiger,
                submitMoomoo: submitMoomoo,
                submitMoomooVerification: submitMoomooVerification
            });

            tool.initialize(function () {
                vm.brokerageTypes = [];
                vm.brokerageTypes.push('Tiger');
                vm.brokerageTypes.push('Moomoo');

                setStep('step1');
            });
        });