agmNgModuleWrapper('agms.droidHelper')
    .defineService('sDroidHelperService',
    ['sUserAccountService', 'sUserService'], function (serviceObj, dep, tool) {
        var coreUserStateService = dep.coreUserStateService,
            sUserAccountService = dep.sUserAccountService,
            sUserService = dep.sUserService;
        
        var droidIsSetDeferred = tool.defer();

        function setDroid(droidInfo) {
            serviceObj.droidInfo = droidInfo;
            droidIsSetDeferred.resolve();
        }

        function afterDroidReady() {
            return droidIsSetDeferred.promise;
        }

        var currentModalInstance = null;
        var modalStack = [];

        function start() {
        }

        function killCurrentModal() {

            if (!currentModalInstance) {
                return;
            }

            modalStack = modalStack.filter(function (m) {
                return m !== currentModalInstance;
            });
            currentModalInstance.dismiss();
            currentModalInstance = null;
        }

        function showModalByDefinition(name, quickResolvedObjects, resolve, appended) {
            var config = tool.getModalConfigDefinition(name);
            if (config) {
                config.quickResolvedObjects = quickResolvedObjects;
                config.resolve = resolve;
                return showModal(config, appended);
            }
            return tool.reject();
        }

        function showModal(config, appended) {
            serviceObj.showPopup = true;
            var id = config.templateUrl + "-" + config.controller;
            if (!appended) {
                if (!(currentModalInstance && currentModalInstance.id === id)) {
                    killCurrentModal();
                }
            }
            config.appendTo = serviceObj.droidInfo.popupPlaceholderElement;
            config.backdrop = false;
            var modalInstance = tool.openModal(config);
            modalInstance.rendered.then(function (args) {
                serviceObj.isDetailShown = true;
                showModalVisualOnly();
            });

            modalInstance.id = id;

            modalInstance.result.then(function (res) {
                hideModal();
            }, function (res) {
                hideModal();
            });
            tool.broadcast('droidShowDetail');
            currentModalInstance = modalInstance;
            modalStack.push(currentModalInstance);
            return modalInstance;
        }

        function showSmallMessageBox(content, listOfAction) {
            serviceObj.currentSmallMessage = {
                content: content,
                actions: listOfAction
            }
        }

        function hideVisualDetailAndShowSmallMessageBox(content, listOfAction) {
            hideModalVisualOnly();
            serviceObj.isDetailShown = false;
            showSmallMessageBox(content, listOfAction);
        }

        function hideSmallMessageBox() {
            serviceObj.currentSmallMessage = null;
        }

        function hasActiveModal() {
            return currentModalInstance != null;
        }

        function hideModal() {
            if (currentModalInstance) {
                killCurrentModal();
                if (modalStack.length > 0) {
                    currentModalInstance = modalStack[modalStack.length - 1];
                }
            }
            if (!currentModalInstance) {
                serviceObj.isDetailShown = false;
                serviceObj.showPopup = false;
                tool.broadcast('droidHideDetail');
            }
        }

        var notShowPopupAgainRead = false;

        function getUser() {

            return coreUserStateService.userInfoLoaded.then(function () {
                if (!notShowPopupAgainRead) {
                    serviceObj.notShowPopupAgain = !coreUserStateService.user.ShowHelpOnInit;
                }
                notShowPopupAgainRead = true;
                return coreUserStateService.user;
            });
        }

        function getDetailedUserProfile() {
            return sUserService.getProfile().then(function (res) {
                return res.data;
            });
        }

        function showDefaultModalForFirstTime() {
            return showDefaultModal().then(function (modalInstance) {
                modalInstance.result.finally(function () {
                    serviceObj.showSmallMessageBox("Click here to activate AlgoBot whenever you need help!", [
                        {
                            label: 'OK',
                            run: function () {
                                serviceObj.hideSmallMessageBox();
                            },
                            cssClasses: ['filled-green']
                        }
                    ]);
                });
            });
        }

        function hideModalVisualOnly() {
            serviceObj.showPopup = false;
        }

        function showModalVisualOnly() {
            serviceObj.showPopup = true;
        }

        function setShowHelpOnInit(flag) {
            sUserAccountService.SetShowHelpOnInit({ Flag: flag });
        }

        function showDefaultModal() {
            return serviceObj.afterDroidReady().then(function () {
                var modal = serviceObj.showModalByDefinition('s.droidHelper.SearchPanelController');
                return modal;
            });
        }

        tool.setServiceObjectProperties({
            currentSmallMessage: null,
            droidInfo: null,
            start: start,
            afterDroidReady: afterDroidReady,
            showSmallMessageBox: showSmallMessageBox,
            hideSmallMessageBox: hideSmallMessageBox,
            hideVisualDetailAndShowSmallMessageBox: hideVisualDetailAndShowSmallMessageBox,
            isDetailShown: false,
            showModal: showModal,
            showModalByDefinition: showModalByDefinition,
            isGuiding: false,
            hideModal: hideModal,
            hideModalVisualOnly: hideModalVisualOnly,
            showModalVisualOnly: showModalVisualOnly,
            showPopup: false,
            setDroid: setDroid,
            hasActiveModal: hasActiveModal,
            getUser: getUser,
            notShowPopupAgain: false,
            showDefaultModal: showDefaultModal,
            showDefaultModalForFirstTime: showDefaultModalForFirstTime,
            setShowHelpOnInit: setShowHelpOnInit,
            getDetailedUserProfile: getDetailedUserProfile,
            isChartPage: false
        });
    });