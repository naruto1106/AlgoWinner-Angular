agmNgModuleWrapper('agms.payment')
    .defineController('s.payment.FormController', ['sPaymentStripeService', 'sharedPaymentFormService'],
    function (vm, dep, tool) {
        var sharedPaymentFormService = dep.sharedPaymentFormService;

        var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var cardTypes = ["visa", "mastercard", "amex"];

        var currentDate = new Date();

        // --- LOCAL SERVICE FUNC
        function formattedMonthData(month) {
            return month < 10 ? '0' + month : month;
        }

        function generateYearSelection(year) {
            vm.expiryYearSelection = [];
            for (var i = 0; i < 10; i++) {
                vm.expiryYearSelection.push(i + year);
            }
        }

        // --- SCOPE FUNC
        function isFormInvalid() {
            if (vm.isEdit) {
                return !vm.creditCard.expiryYear || !vm.creditCard.expiryMonth;
            } else {
                return !dep.$scope.isCardValid || vm.creditCardForm.name.$invalid;
            }
        }

        // Send data directly to stripe server to create a token (uses stripe.js)
        function generateStripeToken() {
            var deferred = tool.defer();
            dep.sPaymentStripeService.stripe.createToken(dep.$scope.card).then(function (result) {
                if (result.error) {
                    // Inform the user if there was an error
                    dep.$scope.displayError.textContent = result.error.message;
                    deferred.reject(result.error.message);
                } else {
                    // Send the token to your server
                    deferred.resolve(result);
                }
            }, function (result) {
                deferred.reject("There was an error saving your card. Please try again later.");
            });
            return deferred.promise;
        }

        function showMonth(month) {
            return formattedMonthData(month) + ' - ' + monthArray[month - 1];
        }

        function updateExpiryDate() {
            vm.creditCard.Expiry = formattedMonthData(vm.creditCard.expiryMonth) + "/" + vm.creditCard.expiryYear;
        }
        
        function expiryMonthSelection(year) {
            var arr = [];
            var startMonth = 1;
            if (currentDate.getFullYear() === year) {
                if (currentDate.getMonth() === 11) {
                    //if now is Dec of current year, show Jan next year
                    generateYearSelection(currentDate.getFullYear() + 1);
                    vm.creditCard.expiryYear = currentDate.getFullYear() + 1;
                    startMonth = 1;
                    vm.creditCard.expiryMonth = 1;
                } else {
                    startMonth = currentDate.getMonth() + 2;
                }
            };
            for (var i = startMonth; i <= 12; i++) {
                arr.push(i);
            }
            return arr;
        }

        function getCardValue() {
            return vm.creditCard;
        }

        tool.initialize(function () {
            tool.setVmProperties({
                intendedCardType: cardTypes[0],
                creditCard: {
                    Name: "",
                    Number: "",
                    CVV: "",
                    Expiry: "",
                    AddToSavedCards: false,
                    expiryMonth: null,
                    expiryYear: currentDate.getFullYear()
                },

                showMonth: showMonth,
                updateExpiryDate: updateExpiryDate,
                expiryMonthSelection: expiryMonthSelection,
                getCardValue: getCardValue,
                isFormInvalid: isFormInvalid,
                generateStripeToken: generateStripeToken
            });

            generateYearSelection(currentDate.getFullYear());

            if (vm.presetCardValue) {
                vm.intendedCardTypeLabel = vm.presetCardValue.brand;
                vm.intendedCardType = sharedPaymentFormService.convertToCreditCardShortName(vm.intendedCardTypeLabel);
                vm.creditCard.Number = "*-" + vm.presetCardValue.last4;
                vm.creditCard.expiryMonth = vm.presetCardValue.exp_month;
                vm.creditCard.expiryYear = vm.presetCardValue.exp_year;
                updateExpiryDate();
            };
        });
    })
    .defineDirectiveForE('agms-payment-form', ['sPaymentStripeService'],
    function (dep, tool) {

        // Link Function - The DOM Updating logic should reside in the link function rather than the controller method
        function link(scope, element, attrs) {
            scope.isCardValid = false;
            var elements = dep.sPaymentStripeService.stripe.elements();

            //Define Style
            var style = {
                iconStyle: 'solid',
                style: {
                    base: {
                        iconColor: '#8898AA',
                        color: '#000',
                        '::placeholder': {
                            color: '#8898AA'
                        },
                    },
                    invalid: {
                        iconColor: '#e85746',
                        color: '#e85746'
                    }
                }
            };

            //We don't enforce postal code entry (not conventional)
            scope.card = elements.create('card', { style: style, hidePostalCode: true });
            scope.displayError = element[0].querySelector('#card-errors');
            var ele = element[0].querySelector('#card-element');
            scope.card.mount(ele);

            // Handle real-time validation errors from the card Element.
            scope.card.on('change', function (event) {
                if (event.error) {
                    scope.displayError.textContent = event.error.message;
                    scope.isCardValid = false;
                } else {
                    scope.displayError.textContent = '';
                    scope.isCardValid = event.complete;
                }
                tool.evalAsync();
            });
        };
        return {
            controller: "s.payment.FormController",
            templateUrl: '/App/shared/payment/payment.form.html',
            link: link
        };
    }, {
        showAddCardButton: '=?', //If true, then client is given the option on whether he would like to persist this card permanently to Stripe
        isFormInvalid: "=",
        generateStripeToken: "=",
        presetCardValue: '=?',
        getCardValue: '=?',
        isEdit: '=?'
    });