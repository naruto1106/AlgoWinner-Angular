agmNgModuleWrapper("agmp.payment")
    .defineController("p.payment.BankAccountController", ["sHeaderService"],
    function (vm, dep, tool) {
        var sHeaderService = dep.sHeaderService;

        tool.initialize(function () {
            tool.setVmProperties({

            });

            sHeaderService.selectMenu("setting", "setting");
        });
    });