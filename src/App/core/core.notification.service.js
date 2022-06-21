agmNgModuleWrapper('agm.core')
    .defineServiceStrict('coreNotificationService', ['coreConstant', 'coreCoveredDialogBoxService'],
        function (serviceObj, dep, tool) {

            var coreConstant = dep.coreConstant,
                coreCoveredDialogBoxService = dep.coreCoveredDialogBoxService;

            serviceObj.showNotification = function (title, message, type, option, onButtonClick, cannotDismiss, cssParentClass, targettedCoverage) {
                tool.log("NOTIFICATION IS CALLED " + message);

                onButtonClick = onButtonClick || function (id) { };
                type = type || coreConstant.PopUpMessageType.Notification;
                option = option || coreConstant.PopUpMessageOption.Ok;

                var optionButtons = [];

                switch (option) {
                    case coreConstant.PopUpMessageOption.Ok:
                        optionButtons = [{ id: 0, label: "OK" }];
                        break;
                    case coreConstant.PopUpMessageOption.OkCancel:
                        optionButtons = [
                            { id: 0, label: "OK" },
                            { id: 1, label: "Cancel" }
                        ];
                        break;
                    case coreConstant.PopUpMessageOption.YesNo:
                        optionButtons = [
                            { id: 0, label: "Yes" },
                            { id: 1, label: "No" }
                        ];
                        break;
                };

                if (!cssParentClass) {
                    cssParentClass = "default-modal";
                }

                if (targettedCoverage) {
                    return coreCoveredDialogBoxService.openDialog(targettedCoverage, {
                        templateUrl: '/App/pages/user/user.notification.html',
                        controller: 'p.user.NotificationV2Controller',
                        controllerAs: 'vm',
                        bindToController: true,
                        quickResolvedObjects: {
                            notificationMessage: {
                                title: title,
                                message: message,
                                type: type,
                                option: option,
                                optionButtons: optionButtons,
                                onButtonClick: onButtonClick,
                                cannotDismiss: cannotDismiss
                            }
                        }
                    });
                } else {
                    
                    if (title === "Logged out") {
                        cssParentClass = cssParentClass + " very-important";
                    }
                    return tool.openModalByDefinition('p.user.NotificationController', {
                        notificationMessage: {
                            title: title,
                            message: message,
                            type: type,
                            option: option,
                            optionButtons: optionButtons,
                            onButtonClick: onButtonClick,
                            cannotDismiss: cannotDismiss
                        }
                    },
                    {},
                    {
                        windowClass: cssParentClass
                    });
                }
            };

            serviceObj.notifySuccess = function (title, content, cssParentClass, targettedCoverage) {
                return serviceObj.showNotification(title, content,
                    coreConstant.PopUpMessageType.Notification,
                    coreConstant.PopUpMessageOption.Ok,
                    null, false, cssParentClass, targettedCoverage);
            };

            serviceObj.notifySuccessWithAction = function (title, content, onButtonClick, cssParentClass, targettedCoverage) {
                return serviceObj.showNotification(title, content,
                    coreConstant.PopUpMessageType.Notification,
                    coreConstant.PopUpMessageOption.Ok,
                    onButtonClick, false, cssParentClass, targettedCoverage);
            };

            serviceObj.notifyWarning = function (title, content, cssParentClass, targettedCoverage) {
                return serviceObj.showNotification(title, content,
                    coreConstant.PopUpMessageType.Warning,
                    coreConstant.PopUpMessageOption.Ok,
                    null, false, cssParentClass, targettedCoverage);
            };

            serviceObj.notifyError = function (title, content, cssParentClass, targettedCoverage) {
                return serviceObj.showNotification(title, content,
                    coreConstant.PopUpMessageType.Error,
                    coreConstant.PopUpMessageOption.Ok,
                    null, false, cssParentClass, targettedCoverage);
            };

            serviceObj.notifyErrorOkCancel = function (title, content, onButtonClick, cssParentClass, targettedCoverage) {
                return serviceObj.showNotification(title, content,
                    coreConstant.PopUpMessageType.Error,
                    coreConstant.PopUpMessageOption.OkCancel,
                    onButtonClick, false, cssParentClass, targettedCoverage);
            };

            serviceObj.notifyYesNo = function (title, content, onButtonClick, cssParentClass, targettedCoverage) {
                return serviceObj.showNotification(title, content,
                    coreConstant.PopUpMessageType.Notification,
                    coreConstant.PopUpMessageOption.YesNo,
                    onButtonClick, false, cssParentClass, targettedCoverage);
            };

            serviceObj.notifyLoggedOut = function (title, content, onButtonClick, cssParentClass, targettedCoverage) {
                return serviceObj.showNotification(title, content,
                    coreConstant.PopUpMessageType.Error,
                    coreConstant.PopUpMessageOption.OkCancel,
                    onButtonClick, true, cssParentClass, targettedCoverage);
            };
        }
    );