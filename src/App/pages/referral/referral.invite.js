agmNgModuleWrapper('agmp.referral')
    .defineController('p.referral.InviteController',
    ["sHeaderService", "pReferralService"],
    function (vm, dep, tool) {
        var sHeaderService = dep.sHeaderService,
            pReferralService = dep.pReferralService,
            coreNotificationService = dep.coreNotificationService;

        function getCreditTransactions() {
            return pReferralService.GetCreditTransactionsForUser().then(function (res) {
                vm.creditTransactions = res.data;
                return vm.creditTransactions;
            });
        }

        function getPendingInvitations() {
            return pReferralService.GetPendingInvitationsForUser().then(function (res) {
                vm.pendingInvitations = res.data;
                return vm.pendingInvitations;
            });
        }

        function copyToClipboard() {
            var copyTextarea = document.getElementById('link-text');
            copyTextarea.select();

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'Successfully' : 'Unsuccessfully';
                coreNotificationService.notifySuccess(msg, msg + " copied to clipboard.");
            } catch (err) {
                coreNotificationService.notifyError("Oops", "unable to copy");
            }
        }

        function sendInvitationEmail() {
            vm.isLoading = true;
            pReferralService.SendInvitationEmail({
                Emails: vm.invitationEmails
            }).then(function () {
                coreNotificationService.notifySuccess("Success", "We have sent invitation emails to your friend.");
            }, function (res) {
                var message = "An error occurred.";
                if (res && res.data && res.data.Message) {
                    message = res.data.Message;
                }
                coreNotificationService.notifyError("Failed", message);
            }).finally(function () {
                getPendingInvitations().finally(function () {
                    vm.isLoading = false;
                });
            });
        }

        function validateEmail() {
            var emailPattern =
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (vm.invitationEmails !== "") {
                vm.isEamilValid = true;
                vm.invalidEmail = "";
                var emailArr = vm.invitationEmails.split(",");
                emailArr.forEach(function (e) {
                    if (!emailPattern.test(e.trim()) && e !== "") {
                        vm.isEamilValid = false;
                        vm.invalidEmail = e;
                    }
                });
            } else {
                vm.isEamilValid = false;
                vm.invalidEmail = "";
            }
        }

        function disableSubmit() {
            return !vm.isEamilValid;
        }

        function autoExpand(e) {
            var element = typeof e === 'object' ? e.target : document.getElementById(e);
            var scrollHeight = element.scrollHeight;
            element.style.height = scrollHeight + "px";
            if (!vm.invitationEmails || scrollHeight < 42) {
                element.style.height = "42px";
            }
        }

        tool.initialize(function () {
            tool.setVmProperties({
                invitationEmails: "",
                referralLink: "",
                isLoading: false,
                pendingInvitations: [],
                creditTransactions: [],
                isEamilValid: false,
                invalidEmail: "",
                referralModel: null,
                isReferralPartner: false,

                sendInvitationEmail: sendInvitationEmail,
                copyToClipboard: copyToClipboard,
                disableSubmit: disableSubmit,
                validateEmail: validateEmail,
                autoExpand: autoExpand
            });

            //get referral code
            vm.isLoading = true;
            tool.onceAll([
                pReferralService.GetReferralCodeForUser(),
                getPendingInvitations(),
                getCreditTransactions()
            ]).then(function (ress) {
                var baseUrl = dep.$location.absUrl();
                vm.referralModel = ress[0].data;
                if (vm.referralModel && vm.referralModel.ProfitType && _.includes(vm.referralModel.ProfitType, "ReferralPartner")) {
                    vm.isReferralPartner = true;
                }
                vm.referralLink = baseUrl.replace("Home/Inside#/invite", "#!/invite?code=") + vm.referralModel.ReferralCode;
            }).finally(function () {
                vm.isLoading = false;
            });

            sHeaderService.selectMenu("invite", "invite");
        });
    });