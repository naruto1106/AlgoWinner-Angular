agmNgModuleWrapper('agms.product')
    .defineService('ticksizeService', [],
    function (serviceObj, dep, tool) {
        
        // TODO: MaRa - There is an existing MarketInfoMs method GetProductTickSizeValueIfBelongToGroup, is this duplicate implementation?
        // If so please check if can be moved, the method updateProductTickSizeValueIfBelongToGroup can also be moved then
        function getTickSize(price, currency, venue, productTickSizeValueIfBelongToGroup, isIncrement, assetClass) {
            if (productTickSizeValueIfBelongToGroup) {
                return productTickSizeValueIfBelongToGroup;
            }
            var step;
            switch (venue) {
            case "US":
                if (price > 1) {
                    step = 0.01;
                }
                else if (price === 1) {
                    if (isIncrement) {
                        step = 0.01;
                    } else {
                        step = 0.0001;
                    }
                }
                else {
                    step = 0.0001;
                }
                break;
            case "SG":
                switch (currency) {
                case "HKD":
                    if (price > 500) {
                        step = 0.5;
                    } else if (price === 500) {
                        if (isIncrement) {
                            step = 0.5;
                        } else {
                            step = 0.2;
                        }
                    } else if (price > 200) {
                        step = 0.2;
                    } else if (price === 200) {
                        if (isIncrement) {
                            step = 0.2;
                        } else {
                            step = 0.1;
                        }
                    } else if (price > 100) {
                        step = 0.1;
                    } else if (price === 100) {
                        if (isIncrement) {
                            step = 0.1;
                        } else {
                            step = 0.05;
                        }
                    } else if (price > 20) {
                        step = 0.05;
                    } else if (price === 20) {
                        if (isIncrement) {
                            step = 0.05;
                        } else {
                            step = 0.02;
                        }
                    } else if (price > 10) {
                        step = 0.02;
                    } else if (price === 10) {
                        if (isIncrement) {
                            step = 0.02;
                        } else {
                            step = 0.01;
                        }
                    } else if (price > 0.5) {
                        step = 0.01;
                    } else if (price === 0.5) {
                        if (isIncrement) {
                            step = 0.01;
                        } else {
                            step = 0.005;
                        }
                    } else if (price > 0.25) {
                        step = 0.005;
                    } else if (price === 0.25) {
                        if (isIncrement) {
                            step = 0.005;
                        } else {
                            step = 0.001;
                        }
                    } else {
                        step = 0.001;
                    }
                    break;
                case "JPY":
                    if (price > 100000) {
                        step = 1000;
                    } else if (price === 100000) {
                        if (isIncrement) {
                            step = 1000;
                        } else {
                            step = 100;
                        }
                    } else if (price > 50000) {
                        step = 100;
                    } else if (price === 50000) {
                        if (isIncrement) {
                            step = 100;
                        } else {
                            step = 50;
                        }
                    } else if (price > 30000) {
                        step = 50;
                    } else if (price === 30000) {
                        if (isIncrement) {
                            step = 50;
                        } else {
                            step = 10;
                        }
                    } else if (price > 3000) {
                        step = 10;
                    } else if (price === 3000) {
                        if (isIncrement) {
                            step = 10;
                        } else {
                            step = 5;
                        }
                    } else if (price > 2000) {
                        step = 5;
                    } else if (price === 2000) {
                        if (isIncrement) {
                            step = 5;
                        } else {
                            step = 1;
                        }
                    } else {
                        step = 1;
                    }
                    break;
                default:
                    if (price > 1) {
                        step = 0.01;
                    } else if (price === 1) {
                        if (isIncrement) {
                            step = 0.01;
                        } else {
                            step = 0.005;
                        }
                    } else if (price > 0.2) {
                        step = 0.005;
                    } else if (price === 0.2) {
                        if (isIncrement) {
                            step = 0.005;
                        } else {
                            step = 0.001;
                        }
                    } else {
                        step = 0.001;
                    }
                    break;
                }
                break;
            case "HK":
                switch (assetClass) {
                    case "Index Futures":
                        step = 1;
                        break;
                    case "Index Futures CFD":
                        step = 0.1;
                        break;
                    default:
                        step = 0.001;
                        break;
                }                
                break;
            default:
                step = 0.001;
                break;
            }
            return step;
        }

        tool.setServiceObjectProperties({
            getTickSize: getTickSize
        });
    });