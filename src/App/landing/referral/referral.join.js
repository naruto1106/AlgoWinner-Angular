agmNgModuleWrapper("agm.landing")
    .defineController("agm.landing.ReferralJoinController",
    ["pReferralService"],
    function (vm, dep, tool) {
        var pReferralService = dep.pReferralService;

        function signUp() {
            dep.$window.open("/" + "#!/register?code=" + vm.invitationCode, '_blank');
        }

        function learnMore() {
            var height = dep.$window.innerHeight;
            dep.$window.scrollBy(0, Math.round(height * 0.5));
        }

        tool.initialize(function () {
            tool.setVmProperties({
                invitationCode: "",
                userName: "",
                profitType: "",

                signUp: signUp,
                learnMore: learnMore
            });

            //detect invitation code
            var urlParams = dep.$location.search();
            if (urlParams && urlParams.code) {
                vm.invitationCode = urlParams.code;
                pReferralService.GetUserByReferralCode(vm.invitationCode).then(function (res) {
                    if (res && res.data) {
                        vm.userName = res.data.RealName;
                        vm.profitType = res.data.ProfitType;
                    }
                });
            }
        });
    })
    .defineDirectiveForE("agm-landing-referral-join",
    [],
    function () {
        return {
            controller: "agm.landing.ReferralJoinController",
            templateUrl: "/App/landing/referral/referral.join.html"
        };
    },
    {
    });