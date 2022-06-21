agmNgModuleWrapper('agm.core')
    .ngApp
    .constant('coreConstant', {
        PopUpMessageOption: {
            Ok: 0,
            OkCancel: 1,
            YesNo: 2
        },
        PopUpMessageType: {
            Notification: 0,
            Warning: 1,
            Error: 2
        }
    });