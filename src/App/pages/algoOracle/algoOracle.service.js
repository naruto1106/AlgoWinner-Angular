agmNgModuleWrapper('agmp.algoOracle')
    .defineService("pAlgoOracleService", ["tradeDataService", "correctTickSizeDecimalPlacesWithCurrencyFilter", "sOrdersPadHelperService",
        "sTradingQuickTradeService", "coreConfigService", "pMobileWebService"],
    function (serviceObj, dep, tool) {
        var path = '/oracleapi/v1/AlgoOracle/';
        var coreServerCommunicationService = dep.coreServerCommunicationService;

        // --- DEPENDENCY RESOLVER
        var tradeDataService = dep.tradeDataService,
            correctTickSizeDecimalPlacesWithCurrencyFilter = dep.correctTickSizeDecimalPlacesWithCurrencyFilter,
            sOrdersPadHelperService = dep.sOrdersPadHelperService,
            sTradingQuickTradeService = dep.sTradingQuickTradeService,
            coreConfigService = dep.coreConfigService,
            pMobileWebService = dep.pMobileWebService;

        // --- LOCAL VAR DECLARATION
        var targetPrice = null;
        var firstLaunch = true;
        var comfortableLevel = 20;
        var previousProductSearchPromise = null;
        var welcomeStr = "Hi, I'm Algo Oracle. Please enter the stock you wish to predict.";
        var stepAStr1 = "Sorry, I don't know of any such stock. Please enter a valid stock name or symbol, e.g. DBS or D05.";
        var cancelStr = "Please enter the stock you'd like to predict.";
        var invalidStr = "Sorry, I did not understand that. Please enter the stock you wish to predict.";
        var stepEStr = "That's not a valid price - please enter a valid decimal.";
        var stepGStr = "That's not a valid value - please enter a number.";
        var errorStr = "Sorry, it looks like I had some issues processing your request. Please enter the stock you wish to predict and try again";


        // --- LOCAL SERVICE FUNC 
        function predictDirection(request, canceler, successCallback, errorCallback) {
            var url = "/oracleapi/v1/AlgoOracle/PredictDirection";

            dep.$http.post(url, request, { timeout: canceler.promise }).then(successCallback, errorCallback);
        }

        function searchProduct(keyword) {
            if (previousProductSearchPromise) {
                previousProductSearchPromise.cancel();
            }
            previousProductSearchPromise = serviceObj.SearchProductsForOracle(keyword, 25);
            return previousProductSearchPromise;
        }

        function matchingConfirm(input) {
            var words = ["yes", "y", "confirm"];
            return _.includes(words, input.toString().toLowerCase());
        }

        function matchingCancel(input) {
            var words = ["no", "n", "cancel"];
            return _.includes(words, input.toString().toLowerCase());
        }

        function matchingProduct(input) {
            if (!serviceObj.selectedProduct) {
                return false;
            }
            return serviceObj.selectedProduct.ProductName.toLowerCase() === input.toLowerCase() ||
                serviceObj.selectedProduct.Symbol.toLowerCase() === input.toLowerCase();
        }

        function processComfortableLoss(leve) {
            var number = Number(leve.replace(/[^0-9\.]+/g, ""));

            if (parseInt(number) > 0) {
                return {
                    isValid: true,
                    comfortableLevel: parseInt(number)
                }
            } else if (parseFloat(number) > 0) {
                return {
                    isValid: true,
                    comfortableLevel: Math.round(parseFloat(number))
                }
            }

            return { isValid: false };
        }

        function processTargetPrice(price) {
            var number = Number(price.replace(/[^0-9\.]+/g, ""));

            if (parseFloat(number) > 0) {
                return {
                    isValid: true,
                    price: parseFloat(number)
                }
            }

            return { isValid: false };
        }


        function launchOrderPad() {
            var bracketOrder;
            if (coreConfigService.Trading.ShowBracketOrder) {
                tradeDataService.GetAsk(serviceObj.selectedProduct).then(function (res) {
                    var stopLossPrice = parseFloat(res.data.LastTradedPrice) *
                        (1 - parseFloat(comfortableLevel) / 100);
                    bracketOrder = {
                        TakeProfitOrder: {
                            LimitPrice: parseFloat(targetPrice),
                            OrderType: "Limit"
                        },
                        StopLossOrder: {
                            StopPrice: sOrdersPadHelperService.getCeilPriceBasedOnTickSize(stopLossPrice,
                                serviceObj.selectedProduct),
                            OrderType: "Stop"
                        }
                    };
                });
            } else {
                bracketOrder = false;
            }

            return sTradingQuickTradeService.reinit().then(function () {
                sTradingQuickTradeService.placeOrderForOracle('Buy', serviceObj.selectedProduct, bracketOrder);
            });
        }

        function closeOracleBox() {
            serviceObj.isOracleOpen = false;
            document.body.className = document.body.className.replace("modal-open", "");
        }

        function insertMessage(message, isUser, productList, state, result, unpredictable, showTradeAndProduct) {
            var dateString = moment().format('LT').toString();

            //For google analytics
            var gAnalytics = dep.$window.ga;
            if (gAnalytics) {
                gAnalytics('set', 'dimension2', moment().toISOString());
                gAnalytics('send',
                    {
                        hitType: 'event',
                        eventCategory: 'AlgoOracle',
                        eventAction: isUser ? 'Conversation' : 'Conversation (Oracle)',
                        eventLabel: message
                    });
            }

            //set previous messages inactive
            if (!isUser) {
                serviceObj.conversations.forEach(function (c) {
                    c.IsActive = false;
                });
            }

            var data = {
                IsLoading: true,
                Message: message,
                Timestamp: dateString,
                PosterProfile: {
                    IsUser: isUser,
                    ProfileImageUrl: isUser ? "" : serviceObj.algoOracleImageUrl
                },
                State: state ? state : serviceObj.currentState,
                ProductList: productList ? productList : [],
                ComfortableLevel: 1,
                Result: result ? result : null,
                Unpredictable: unpredictable ? unpredictable : false,
                IsActive: true,
                ShowTradeAndProduct: showTradeAndProduct ? showTradeAndProduct : false
            };
            serviceObj.conversations.push(data);
            updateScrollbar();
            return data;
        }

        function finishLoadingMessage(message) {
            tool.timeout(function () {
                message.IsLoading = false;
                updateScrollbar();
            }, 500);
        }

        function updateScrollbar() {
            serviceObj.scrollbarOptions.scrollTo('100%');
        }

        function tryAgain() {
            serviceObj.currentState = "A";
            serviceObj.conversations = [];

            serviceObj.selectedProduct = null;
            serviceObj.predictionTimeOut = false;
            targetPrice = null;
            comfortableLevel = 20;
            firstLaunch = true;
            processByOracle();
        }

        //Todo: move to backend
        function processByOracle(inputValue, productList, fromButton) {
            var text = "";
            var promise = tool.when();

            //welcome message
            if (firstLaunch) {
                finishLoadingMessage(insertMessage(welcomeStr, false));
                firstLaunch = false;
            }

            switch (serviceObj.currentState) {
                case "A":
                case "B":
                    serviceObj.selectedProduct = null;

                    if (inputValue && inputValue.toString() !== "") {
                        serviceObj.currentState = "B";
                        serviceObj.paginationModel.currentPage = 1;

                        //interpret inputValue
                        return searchProduct(inputValue.toString()).then(function (res) {
                            if (res.data && res.data.length === 0) {
                                finishLoadingMessage(insertMessage(stepAStr1, false));
                                serviceObj.currentState = "A";
                            } else if (res.data && res.data.length === 1) {
                                serviceObj.currentState = "C1";
                                var product = res.data[0];
                                serviceObj.selectedProduct = product;
                                text = "Confirm " + product.ProductName + " (" + product.Symbol + ")?";
                                finishLoadingMessage(insertMessage(text, false));
                            } else if (res.data && res.data.length > 1) {
                                //check if there is an exact match
                                var matchedProductList = res.data.filter(function (p) {
                                    return p.ProductName.toLowerCase() === inputValue.toString().toLowerCase() ||
                                        p.Symbol.toLowerCase() === inputValue.toString().toLowerCase();
                                });

                                if (matchedProductList.length === 1) {
                                    var matchedProduct = matchedProductList[0];
                                    serviceObj.currentState = "C1";
                                    serviceObj.selectedProduct = matchedProduct;
                                    text = "Confirm " + matchedProduct.ProductName + " (" + matchedProduct.Symbol + ")?";
                                    finishLoadingMessage(insertMessage(text, false));
                                } else {
                                    //no exact matches
                                    serviceObj.currentState = "C2";
                                    serviceObj.productList = res.data;
                                    var stepAStr2 = "I found more than one stock matching '" + inputValue.toString() + "'. Please choose from the following:";

                                    finishLoadingMessage(insertMessage(stepAStr2, false, res.data));
                                }
                            }

                            return promise;
                        }, function () {
                            //notify error
                            serviceObj.currentState = "A";
                            finishLoadingMessage(insertMessage(errorStr, false));
                            return promise;
                        });
                    } else {
                        return promise;
                    }
                case "C1":
                    if (matchingConfirm(inputValue.toString()) || matchingProduct(inputValue.toString())) {
                        //user select product -> serviceObj.currentState = "D";
                        if (fromButton) {
                            insertMessage(inputValue.toString(), true);
                        }
                        serviceObj.currentState = "D";
                        processByOracle();
                    } else if (matchingCancel(inputValue.toString())) {
                        //user doesn't select product -> serviceObj.currentState = "A";
                        if (fromButton) {
                            insertMessage(inputValue.toString(), true);
                        }

                        serviceObj.currentState = "A";
                        serviceObj.selectedProduct = null;
                        finishLoadingMessage(insertMessage(cancelStr, false));
                    } else {
                        //invalid input
                        serviceObj.currentState = "A";
                        serviceObj.selectedProduct = null;
                        finishLoadingMessage(insertMessage(invalidStr, false));
                    }
                    return promise;
                case "C2":
                    //user select product -> serviceObj.currentState = "D";
                    if (matchingCancel(inputValue.toString()) || inputValue.toString().toLowerCase() === "search again") {

                        if (fromButton) {
                            insertMessage(inputValue.toString(), true);
                        }

                        //user doesn't select product -> serviceObj.currentState = "A";
                        serviceObj.currentState = "A";
                        serviceObj.selectedProduct = null;
                        finishLoadingMessage(insertMessage(cancelStr, false));
                    } else if (parseInt(inputValue.toString()) > 0) {
                        //user select product -> serviceObj.currentState = "D";
                        var matchedProduct1 = productList.filter(function (p) {
                            return p.ProductId === parseInt(inputValue.toString());
                        })[0];
                        serviceObj.selectedProduct = matchedProduct1;
                        serviceObj.currentState = "D";

                        if (fromButton) {
                            insertMessage(matchedProduct1.ProductName, true);
                        }

                        processByOracle();
                    } else if (inputValue.ProductId && inputValue.ProductId > 0) {
                        serviceObj.selectedProduct = inputValue;
                        serviceObj.currentState = "D";

                        if (fromButton) {
                            insertMessage(inputValue.ProductName, true);
                        }

                        processByOracle();
                    } else {
                        var matchedProduct2 = productList.filter(function (p) {
                            return p.ProductName.toLowerCase() === inputValue.toString().toLowerCase() ||
                                p.Symbol.toLowerCase() === inputValue.toString().toLowerCase();
                        })[0];

                        if (matchedProduct2) {
                            serviceObj.selectedProduct = matchedProduct2;
                            serviceObj.currentState = "D";

                            if (fromButton) {
                                insertMessage(matchedProduct2.ProductName, true);
                            }

                            processByOracle();
                        } else {
                            //invalid input
                            serviceObj.currentState = "A";
                            serviceObj.selectedProduct = null;
                            finishLoadingMessage(insertMessage(invalidStr, false));
                        }
                    }

                    return promise;
                case "D":
                    return serviceObj.CheckProductPredictability(serviceObj.selectedProduct.ProductId).then(function (res) {
                        if (res.data && res.data.IsPredictable) {
                            //product can be predicted now -> serviceObj.currentState = "E";
                            tool.onceAll([
                                tradeDataService.GetLast(serviceObj.selectedProduct),
                                serviceObj.CheckTargetPrice(serviceObj.selectedProduct.ProductId, 0)
                            ]).then(function (ress) {
                                serviceObj.selectedProduct.MarketPrice = ress[0].data;
                                serviceObj.currentState = "E";
                                var text1 = 'Great, You have Selected  <div class="chat-product"><h4><a href="#/product-detail/' +
                                    serviceObj.selectedProduct.TradeVenueLoc + '/' + serviceObj.selectedProduct.Symbol + '" target="_blank"><strong>' +
                                    serviceObj.selectedProduct.ProductName + ' (' + serviceObj.selectedProduct.Symbol + ')</strong></a></h4></div>'
                                    + "Last traded price is <span class='highlighted'>"
                                    + correctTickSizeDecimalPlacesWithCurrencyFilter(serviceObj.selectedProduct.MarketPrice.LastTradedPrice, serviceObj.selectedProduct.Currency, serviceObj.selectedProduct.TradeVenueLoc)
                                    + "</span>.";
                                finishLoadingMessage(insertMessage(text1, false));

                                var text2 = "What is your target take profit price? (input a price between <span class='highlighted'>"
                                    + ress[1].data.MinRange + "</span> and <span class='highlighted'>"
                                    + ress[1].data.MaxRange + "</span>)";

                                finishLoadingMessage(insertMessage(text2, false));
                            }, function () {
                                serviceObj.currentState = "A";
                                finishLoadingMessage(insertMessage(errorStr, false));
                                return promise;
                            });
                        } else {
                            //product cannot be predicted now
                            //provide top 3 alternatives for prediction in the same market as the user.
                            text = "I\'m sorry, " + serviceObj.selectedProduct.ProductName + " is too unpredictable right now. Here's a full list of stocks which can be predicted now.";
                            serviceObj.currentState = "C2";
                            serviceObj.productList = res.data.TopProducts;
                            finishLoadingMessage(insertMessage(text, false, res.data.TopProducts, null, null, true));
                        }

                        return promise;
                    }, function () {
                        serviceObj.currentState = "A";
                        finishLoadingMessage(insertMessage(errorStr, false));
                        return promise;
                    });
                case "E":
                    serviceObj.currentState = "F";

                    //interpret inputValue
                    var priceObject = processTargetPrice(inputValue.toString());

                    if (priceObject.isValid) {
                        return serviceObj.CheckTargetPrice(serviceObj.selectedProduct.ProductId, priceObject.price).then(function (res) {
                            if (res.data && res.data.IsValid) {
                                //target price Accepted -> serviceObj.currentState = "G";
                                serviceObj.currentState = "G";
                                targetPrice = priceObject.price;

                                //get comfortable loss range first
                                return serviceObj.CheckComfortableLoss(serviceObj.selectedProduct.ProductId, 1).then(function (res) {
                                    serviceObj.slider.options.floor = res.data.MinRange;
                                    serviceObj.slider.options.ceil = res.data.MaxRange;

                                    text = "Great, <span class='highlighted'>" + correctTickSizeDecimalPlacesWithCurrencyFilter(targetPrice, serviceObj.selectedProduct.Currency, serviceObj.selectedProduct.TradeVenueLoc) +
                                        "</span> it is! Now, what is your comfortable investment loss ";
                                    if (pMobileWebService.isOpenFromApp) {
                                        text += "(in % from <span class='highlighted'>1</span> to <span class='highlighted'>10</span>)?";
                                    } else {
                                        text += "(in %)?";
                                    }
                                    finishLoadingMessage(insertMessage(text, false));
                                    return promise;
                                }, function () {
                                    serviceObj.currentState = "E";
                                    finishLoadingMessage(insertMessage("Sorry, it looks like I had some issues processing your request. Please enter target price and try again", false));
                                    return promise;
                                });
                            } else {
                                //Price recognized, but out of range -> serviceObj.currentState = "E";
                                serviceObj.currentState = "E";
                                text = "<span class='highlighted'>" + priceObject.price.toString()
                                    + "</span> is out of range. Please enter a value between <span class='highlighted'>"
                                    + res.data.MinRange + "</span> and <span class='highlighted'>"
                                    + res.data.MaxRange + "</span>";
                                finishLoadingMessage(insertMessage(text, false));

                                return promise;
                            }
                        }, function () {
                            serviceObj.currentState = "E";
                            finishLoadingMessage(insertMessage("Sorry, it looks like I had some issues processing your request. Please enter target price and try again", false));
                            return promise;
                        });
                    } else {
                        //Price not recognized -> serviceObj.currentState = "E";
                        serviceObj.currentState = "E";
                        finishLoadingMessage(insertMessage(stepEStr, false));
                        return promise;
                    }
                case "G":
                    serviceObj.currentState = "H";

                    if (fromButton) {
                        insertMessage(inputValue.toString(), true);
                    }

                    //hide pop up for OK button
                    if (serviceObj.conversations && serviceObj.conversations.length > 0) {
                        serviceObj.conversations[serviceObj.conversations.length - 2].HideBubble = true;
                    }
                    
                    //interpret inputValue
                    var comfortableLossObject = processComfortableLoss(inputValue.toString());

                    if (comfortableLossObject.isValid) {
                        return serviceObj.CheckComfortableLoss(serviceObj.selectedProduct.ProductId, comfortableLossObject.comfortableLevel).then(
                            function (res) {
                                if (res.data && res.data.IsValid) {
                                    //Loss Value accepted -> serviceObj.currentState = "I";
                                    serviceObj.currentState = "I";
                                    serviceObj.predictionTimeOut = false;
                                    comfortableLevel = comfortableLossObject.comfortableLevel;
                                    processByOracle("confirm", null, false);
                                } else {
                                    //Loss value recognized, but out of range -> serviceObj.currentState = "G";
                                    serviceObj.currentState = "G";
                                    text = "<span class='highlighted'>" + inputValue.toString()
                                        + "</span> is out of range. Please enter a number between <span class='highlighted'>"
                                        + res.data.MinRange + "</span> and <span class='highlighted'>"
                                        + res.data.MaxRange + "</span>";
                                    finishLoadingMessage(insertMessage(text, false));
                                }
                                return promise;
                            },
                            function () {
                                serviceObj.currentState = "G";
                                finishLoadingMessage(insertMessage("Sorry, it looks like I had some issues processing your request. Please enter comfortable investment loss(in %) and try again", false));
                                return promise;
                            });
                    } else {
                        //Loss value not recognized -> serviceObj.currentState = "G";
                        serviceObj.currentState = "G";
                        finishLoadingMessage(insertMessage(stepGStr, false));
                        return promise;
                    }
                case "I":
                    if (matchingConfirm(inputValue.toString())) {
                        //user confirm -> serviceObj.currentState = "J";
                        serviceObj.currentState = "J";

                        if (fromButton) {
                            insertMessage(inputValue.toString(), true);
                        }

                        text = '<div class=""><img src="//am708403.azureedge.net/images/algooracle/predict-s.gif?"  class="loading-img" alt=""/></div>';
                        finishLoadingMessage(insertMessage(text, false));

                        var request = {
                            ComfortableLoss: parseFloat(comfortableLevel),
                            TargetPrice: parseFloat(targetPrice),
                            ProductId: serviceObj.selectedProduct.ProductId
                        }

                        var canceler1 = dep.$q.defer();
                        serviceObj.predictionTimeOut = false;

                        //If response takes > 15s, then cancel the request
                        var maxTimeoutPromise = dep.$timeout(function () {
                            //aborts the request when timed out
                            canceler1.resolve();
                            serviceObj.predictionTimeOut = true;
                            console.log("Prediction Timed Out");
                        }, 15000);

                        //if response takes < 5s, keep the "evaluating..." status til 5s, then show result.
                        var minTimeoutPromise = dep.$timeout(function () {
                        }, 5000);

                        predictDirection(request, canceler1, function (res) {
                            minTimeoutPromise.then(function () {
                                serviceObj.predictResult = res.data;
                                serviceObj.isOracleOpen = true;
                                serviceObj.processByOracle();

                                //cancel the timer when we get a response within 15s
                                dep.$timeout.cancel(maxTimeoutPromise);
                            });
                        }, function () {
                            if (serviceObj.predictionTimeOut) {
                                serviceObj.currentState = "I";
                                text = "Sorry, it looks like I had some issues processing your request. Would you like to try again?";
                                finishLoadingMessage(insertMessage(text, false));
                            } else {
                                serviceObj.currentState = "A";
                                serviceObj.selectedProduct = null;
                                finishLoadingMessage(insertMessage(errorStr, false));
                            }
                        });
                    } else if (matchingCancel(inputValue.toString())) {
                        //user doesn't select product -> serviceObj.currentState = "A";

                        if (fromButton) {
                            insertMessage(inputValue.toString(), true);
                        }

                        serviceObj.currentState = "A";
                        serviceObj.selectedProduct = null;
                        finishLoadingMessage(insertMessage(cancelStr, false));
                    } else {
                        //invalid input
                        serviceObj.currentState = "I";
                        text = "Please make a valid choice. Confirm prediction for " + serviceObj.selectedProduct.ProductName + ", with take profit at " +
                            correctTickSizeDecimalPlacesWithCurrencyFilter(targetPrice, serviceObj.selectedProduct.Currency, serviceObj.selectedProduct.TradeVenueLoc) +
                            " and comfortable investment loss at " + comfortableLevel + "%?";
                        finishLoadingMessage(insertMessage(text, false));
                    }
                    return promise;
                case "J":
                    if (serviceObj.predictResult && serviceObj.predictResult.Prediction && serviceObj.predictResult.Prediction.CanPredict) {
                        //prediction success
                        serviceObj.currentState = "K";

                        var result = {
                            WinningChance: Math.round(serviceObj.predictResult.Prediction.WinningChance * 100),
                            TargetPrice: correctTickSizeDecimalPlacesWithCurrencyFilter(targetPrice, serviceObj.selectedProduct.Currency, serviceObj.selectedProduct.TradeVenueLoc),
                            NumDays: serviceObj.predictResult.Prediction.NumDays
                        }

                        if (serviceObj.predictResult.Prediction.WinningChance > 0.65) {
                            text = 'You have a good winning edge!';
                        } else if (serviceObj.predictResult.Prediction.WinningChance >= 0.58) {
                            text = 'You have a slight winning edge.';
                        } else {
                            text = 'You do not have a good winning edge.';
                        }

                        finishLoadingMessage(insertMessage(text, false, [], "K", result));

                        serviceObj.currentState = "A";
                    } else {
                        //prediction in progress
                        serviceObj.currentState = "J";

                        if (!pMobileWebService.showMobileWeb()) {
                            text = 'Please be patient as I am still evaluating your request. Would you like to look at the chart or product page for '
                                + serviceObj.selectedProduct.ProductName + ' while waiting?';
                            finishLoadingMessage(insertMessage(text, false, [], "J", null, false, true));
                        } else {
                            text = 'Please be patient as I am still evaluating your request.';
                            finishLoadingMessage(insertMessage(text, false, [], "J", null, false, false));
                        }
                    }
                    return promise;
                case "K":

                    return promise;
                default: return promise;
            }
        }

        tool.setServiceObjectProperties({
            //shared states
            currentState: "A", //keep this in service object for investigating state
            isOracleOpen: false,
            selectedProduct: null,
            predictionTimeOut: false,
            conversations: [],
            productList: [],
            predictResult: null,
            algoOracleImageUrl: "//am708403.azureedge.net/images/algooracle/icon-oracle.gif?",
            slider: {
                options: {
                    floor: 1,
                    ceil: 10,
                    translate: function (value) {
                        return value + "%";
                    }
                }
            },
            paginationModel: {
                currentPage: 1,
                numPages: 0
            },
            scrollbarOptions: {},

            closeOracleBox: closeOracleBox,
            tryAgain: tryAgain,
            insertMessage: insertMessage,
            updateScrollbar: updateScrollbar,
            processByOracle: processByOracle,
            launchOrderPad: launchOrderPad,
            SearchProductsForOracle: coreServerCommunicationService.genGetFunctionWithNVar(path + '/SearchProductsForOracle', function (args) {
                return { keyword: args[0], take: args[1] };
            }),
            GetPrediction: coreServerCommunicationService.genGetFunctionWithNVar(path + '/GetPrediction', function (args) {
                return { requestId: args[0] };
            }),
            GetPredictableProducts: coreServerCommunicationService.genGetFunctionWithNVar(path + '/GetPredictableProducts', function (args) {
                return { market: args[0] };
            }),
            CheckProductPredictability: coreServerCommunicationService.genGetFunctionWithNVar(path + '/CheckProductPredictability', function (args) {
                return { productId: args[0] };
            }),
            CheckTargetPrice: coreServerCommunicationService.genGetFunctionWithNVar(path + '/CheckTargetPrice', function (args) {
                return { productId: args[0], price: args[1] };
            }),
            CheckComfortableLoss: coreServerCommunicationService.genGetFunctionWithNVar(path + '/CheckComfortableLoss', function (args) {
                return { productId: args[0], lossPct: args[1]  };
            })
        });
    });