agmNgModuleWrapper('agms.payment')
    .defineControllerAsPopup('s.payment.AddPaymentPopupController',
        {
            templateUrl: '/App/shared/payment/payment.addPaymentPopup.html',
            windowClass: 'mini-modal'
        },
        ['commonScreenResizerService', 'sPaymentStripeService', 'card', 'isEdit'],
        function(vm, dep, tool) {
            var sPaymentStripeService = dep.sPaymentStripeService,
                commonScreenResizerService = dep.commonScreenResizerService,
                coreNotificationService = dep.coreNotificationService;

            // --- LOCAL SERVICE FUNC
            function saveExistingCard(cardId, cardValue) {
                var request = {
                    CardId: cardId,
                    Options: {
                        exp_month: cardValue.expiryMonth,
                        exp_year: cardValue.expiryYear
                    }
                }
                return sPaymentStripeService.UpdateExistingCard(request);
            }

            function localSaveExistingCard() {
                return saveExistingCard(vm.card.id, vm.getCardValue()).then(function () {
                    coreNotificationService.notifySuccess("Success", "Your card has been successfully saved.");
                }, function (res) {
                    if (res.data.Message && res.data.Message !== "") {
                        coreNotificationService.notifyError("Add Card Error", res.data.Message + " Please check your card details or try again later.");
                    } else {
                        coreNotificationService.notifyError("Add Card Error", "Sorry, we are unable to save your card at this moment. Please check your card details or try again later.");
                    }
                });
            }

            // --- SCOPE FUNC
            function dismissPanel() {
                commonScreenResizerService.setForceActualSize(false);
                vm.uibDismissPanel();
            }

            function closePanel() {
                commonScreenResizerService.setForceActualSize(false);
                vm.uibClosePanel();
            }
            
            function saveCard() {
                vm.isSubmitting = true;
                var promise = null;
                if (vm.isEdit) {
                    promise = localSaveExistingCard();
                } else {
                    promise = saveNewCard().then(deleteCard);
                }
                return promise.then(function () {
                    vm.isSubmitting = false;
                    closePanel();
                }, function (res) {
                    vm.isSubmitting = false;
                });
            }
            
            function deleteCard() {
                if (vm.card) {
                    return sPaymentStripeService.DeleteCard({
                        CardId: vm.card.id
                    });
                }
                return tool.when(true);
            }

            function saveNewCard() {
                var deferred = tool.defer();
                vm.getNewCardToken().then(function (f) {
                    if (!f.error && f.token && f.token.id) {
                        var tokenModel = {
                            Token: f.token.id
                        };
                        sPaymentStripeService.AddCard(tokenModel).then(function () {
                            coreNotificationService.notifySuccess("Success", "Your card has been successfully saved.");
                            deferred.resolve();
                        }, function () {
                            coreNotificationService.notifyError("Error Adding Card", "We were unable to add your card. Please check your card details and try again.");
                            deferred.reject();
                        });
                    }
                }, function (errorMsg) {
                    coreNotificationService.notifyError("Error Adding Card", errorMsg);
                    deferred.reject();
                });
                return deferred.promise;
            }

            function getTitle() {
                return vm.isEdit ? "Update Existing Credit Card" : "Add Credit Card";
            }

            tool.initialize(function() {
                commonScreenResizerService.setForceActualSize(true);

                tool.setVmProperties({
                    isSubmitting: false,
                    isEdit: dep.isEdit,
                    card: dep.card,

                    closePanel: closePanel,
                    dismissPanel: dismissPanel,

                    getTitle: getTitle,
                    saveCard: saveCard,
                    saveNewCard: saveNewCard,
                    deleteCard: deleteCard
                });
            });
        }
    );
