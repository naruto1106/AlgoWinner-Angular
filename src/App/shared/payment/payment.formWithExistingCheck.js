agmNgModuleWrapper('agms.payment')
    .defineController('s.payment.FormWithExistingCheckController', ['sPaymentStripeService', 'commonScreenResizerService', 'sharedPaymentFormService'], function (vm, dep, tool) {
        var sPaymentStripeService = dep.sPaymentStripeService,
            coreNotificationService = dep.coreNotificationService,
            sharedPaymentFormService = dep.sharedPaymentFormService,
            commonScreenResizerService = dep.commonScreenResizerService;

        // --- LOCAL SERVICE FUNC
        function localOpenCardModal(card, isEdit) {
            return tool.openModalByDefinition('s.payment.AddPaymentPopupController', {
                card: card,
                isEdit: isEdit
            });
        }

        function openCardModal(card, isEdit) {
            var lastState = commonScreenResizerService.forceActualSize;
            localOpenCardModal(card, isEdit).result.then(function () {
                loadCard();
                commonScreenResizerService.setForceActualSize(lastState);
            }, function () {
                commonScreenResizerService.setForceActualSize(lastState);
            });
        }

        function getAllCardsWithCleanup() {
            return sPaymentStripeService.GetAllCards().then(function (res) {
                var myCreditCards = res.data;
                if (myCreditCards && myCreditCards.length > 0) {
                    myCreditCards.forEach(function (card) {
                        card.shortName = sharedPaymentFormService.convertToCreditCardShortName(card.brand);
                    });
                }
                return myCreditCards;
            }, function (res) {
                tool.logError("Unable to get credit cards", "Error! " + (res.data && res.data.Message));
                return null;
            });
        }

        function isCardExpired(card) {
            var month = parseInt(card.exp_month);
            var year = parseInt(card.exp_year);
            var today = new Date();
            var currentMonth = today.getMonth() + 1;
            var currentYear = today.getFullYear();
            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                return true;
            } else {
                return false;
            }
        }

        function loadCard() {
            vm.isLoadingCards = true;
            getAllCardsWithCleanup()
                .then(function (creditCards) {
                    vm.myCreditCards = creditCards;
                    vm.myCreditCards.forEach(function (card) {
                        if (isCardExpired(card)) {
                            coreNotificationService.notifyErrorOkCancel("Card Expired", "Sorry, your card has already expired. Click OK to update card information",
                                function (id) {
                                    if (id === 0) {
                                        editCard(card);
                                    }
                                });
                        }
                    });
                }, function (res) {
                    $log.error("Unable to get credit cards", "Error! " + (res.data && res.data.Message));
                }).finally(function (res) {
                    vm.isLoadingCards = false;
                });
        }

        // --- SCOPE FUNC
        function canAddMoreCard() {
            return vm.myCreditCards && vm.myCreditCards.length > 1 && vm.canHaveMultipleCards;
        }

        function openAddCardModal() {
            return openCardModal(null, false);
        }

        function editCard(card) {
            return openCardModal(card, true);
        }

        function deleteCard(card) {
            coreNotificationService.notifyYesNo("Delete Credit Card", "Are you sure you want to delete your card *" + card.last4 + "?", function (id) {
                if (id === 0) {
                    sPaymentStripeService.DeleteCard({
                        CardId: card.id
                    }).then(function () {
                        loadCard();
                    }, function () {
                        coreNotificationService.notifyError("Error Deleting card", "Sorry, there was an error trying to delete your card.");
                    });
                }
            });
        }

        function getCards() {
            return vm.myCreditCards;
        }

        function saveNewCard() {
            vm.isLoadingCards = true;
            fbq('track', 'AddPaymentInfo', {
                content_name: 'click save card'
            });

            vm.getNewCardToken().then(function (f) {
                if (!f.error && f.token && f.token.id) {
                    var tokenModel = {
                        Token: f.token.id
                    };
                    sPaymentStripeService.AddCard(tokenModel).then(function () {
                        loadCard();
                        coreNotificationService.notifySuccess("Success", "Your card has been successfully saved.");
                    }, function () {
                        coreNotificationService.notifyError("Error Saving Card", "We were unable to add your card. Please check your card details and try again.");
                        vm.isLoadingCards = false;
                    });
                }
            }, function (errorMsg) {
                coreNotificationService.notifyError("Error Saving Card", errorMsg);
                vm.isLoadingCards = false;
            });
        }

        tool.initialize(function () {
            tool.setVmProperties({
                canHaveMultipleCards: false,
                showErrorMessage: false,

                getCards: getCards,
                commonScreenResizerService: commonScreenResizerService,
                saveNewCard: saveNewCard,
                openAddCardModal: openAddCardModal,
                editCard: editCard,
                deleteCard: deleteCard,
                canAddMoreCard: canAddMoreCard
            });
            loadCard();
        });
    })
    .defineDirectiveForE('agms-payment-form-with-existing-check', [],
    function (dep) {
        return {
            templateUrl: '/App/shared/payment/payment.formWithExistingCheck.html',
            controller: 's.payment.FormWithExistingCheckController'
        };
    },
    {
        getCards: '=?'
    });
