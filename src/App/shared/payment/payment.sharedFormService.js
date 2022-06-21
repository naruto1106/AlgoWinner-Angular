agmNgModuleWrapper('agms.payment')
    .defineService('sharedPaymentFormService', [],
        function (dependencyObj, dep, tool) {
            dependencyObj.convertToCreditCardShortName = function (name) {
                switch (name) {
                case "Visa":
                    return "visa";
                case "Master Card":
                case "MasterCard":
                    return "mastercard";
                case "American Express":
                    return "amex";
                }
            };

            dependencyObj.convertToCreditCardLongName = function (name) {
                switch (name) {
                case "visa":
                    return "Visa";
                case "mastercard":
                    return "Master Card";
                case "amex":
                    return "American Express";
                }
            };
        });