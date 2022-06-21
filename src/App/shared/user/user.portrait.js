agmNgModuleWrapper('agms.user')
    .defineController('s.user.PortraitController', [],
    function (vm, dep,tool) {
    })
    .defineDirectiveForE('agms-user-portrait', [],
    function () {
        return {
            controller: "s.user.PortraitController",
            templateUrl: '/App/shared/user/user.portrait.html'
        };
    },{
        user: "=",
        levelOfDetail: "=",
        developer: "=",
        disableClicking: "=?",
        hideClicking: '=?',
        linkToGroup: '=?'
    });