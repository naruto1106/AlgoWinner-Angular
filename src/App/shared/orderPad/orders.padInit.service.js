agmNgModuleWrapper('agms.orders')
    .defineService('orderPadInitService', [], function (serviceObj, dep, tool) {
        var thisOrder = {};

        function getDefaultOrder() {
            return {
                CreatedTime: 0,
                StrategyId: null,
                ProductId: null,
                Action: "Buy",
                OrderType: "Limit",
                Quantity: null,
                MaximumQuantity: 100,
                Validity: "GTC",
                TraderRemark: "",
                LimitPrice: null,
                StopPrice: null,
                inputNominalQuantity: null,
                quantityType: 'Unit',
                HasBracketOrder: false,
                HasAttachedTP: false,
                HasAttachedSL: false,
                PreviousOrderId: 0,
                TakeProfitOrder: {
                    ProductId: null,
                    LimitPrice: null,
                    OrderType: "Limit",
                    Validity: "GTC"
                },
                StopLossOrder: {
                    ProductId: null,
                    StopPrice: null,
                    OrderType: "Stop",
                    Validity: "GTC"
                },
                ChildOrderType: "Normal"
            };
        }

        function setDefaultFollowOrder(order) {
            angular.copy(order, thisOrder);
            thisOrder.OrderId = null;
            thisOrder.FollowedOrderId = order.OrderId;
            thisOrder.ChildOrderType = "Normal";
        }

        function setDefaultDeveloperOrder() {
            thisOrder = getDefaultOrder();
        }

        function increasePosition(position) {
            thisOrder = {
                Product: position.Product,
                ProductId: position.Product.ProductId,
                Quantity: position.QuantityOnHold,
                inputNominalQuantity: position.QuantityOnHold,
                quantityType: 'Unit',
                Action: position.PositionType === 'Long' && 'Buy' || 'Sell',
                OrderType: "Limit",
                Validity: "GTC",
                HasBracketOrder: false,
                ChildOrderType: "Normal",
                TakeProfitOrder: {
                    ProductId: null,
                    LimitPrice: null,
                    OrderType: "Limit",
                    Validity: "GTC"
                },
                StopLossOrder: {
                    ProductId: null,
                    StopPrice: null,
                    OrderType: "Stop",
                    Validity: "GTC"
                }
            };
        }

        function decreasePosition(position) {
            thisOrder = {
                Product: position.Product,
                ProductId: position.Product.ProductId,
                Quantity: position.QuantityOnHold,
                inputNominalQuantity: position.QuantityOnHold,
                quantityType: 'Unit',
                Action: position.PositionType === 'Long' && 'Sell' || 'Buy',
                OrderType: "Limit",
                Validity: "GTC",
                HasBracketOrder: false,
                ChildOrderType: "Normal",
                TakeProfitOrder: {
                    ProductId: null,
                    LimitPrice: null,
                    OrderType: "Limit",
                    Validity: "GTC"
                },
                StopLossOrder: {
                    ProductId: null,
                    StopPrice: null,
                    OrderType: "Stop",
                    Validity: "GTC"
                }
            };
        }

        function createOrderBasedOnDashboardPost(post) {
            if (post.Trade) {
                thisOrder.Product = post.Trade.Product;
                thisOrder.ProductId = post.Trade.Product.ProductId;
                thisOrder.Action = post.Trade.Action;
                thisOrder.Quantity = post.Trade.Quantity;
            } else {
                if (post.Product) {
                    thisOrder.Product = post.Product;
                    thisOrder.ProductId = post.Product.ProductId;
                }
                if (post.Direction) {
                    thisOrder.Action = post.Direction === 'Bear' && 'Sell' || 'Buy';
                } else {
                    thisOrder.Action = 'Buy';
                }
            }
            thisOrder.OrderType = 'Limit';
            thisOrder.Validity = 'GTC';
            thisOrder.HasBracketOrder = false;
            thisOrder.ChildOrderType = "Normal";
        };

        function createOrderBasedOnWatchlistProduct(productModel, action) {
            if (productModel) {
                thisOrder.Product = productModel;
                thisOrder.ProductId = productModel.ProductId;
            }

            thisOrder.Action = action;
            thisOrder.OrderType = 'Limit';
            thisOrder.Validity = 'GTC';
            thisOrder.HasBracketOrder = false;
            thisOrder.ChildOrderType = "Normal";
        };

        function getOrder() {
            return thisOrder;
        }

        function setLiveOrder(action, product) {
            thisOrder = {
                CreatedTime: 0,
                StrategyId: null,
                Product: product,
                ProductId: product.ProductId,
                Action: action,
                OrderType: "Limit",
                Quantity: null,
                MaximumQuantity: 100,
                Validity: "GTC",
                TraderRemark: "",
                LimitPrice: null,
                StopPrice: null,
                inputNominalQuantity: null,
                quantityType: 'Lot',
                HasBracketOrder: false,
                HasAttachedTP: false,
                HasAttachedSL: false,
                PreviousOrderId: 0,
                TakeProfitOrder: {
                    ProductId: null,
                    LimitPrice: null,
                    OrderType: "Limit",
                    Validity: "GTC"
                },
                StopLossOrder: {
                    ProductId: null,
                    StopPrice: null,
                    OrderType: "Stop",
                    Validity: "GTC"
                },
                ChildOrderType: "Normal"
            };
        }

        tool.setServiceObjectProperties({
            getDefaultOrder: getDefaultOrder,
            setDefaultFollowOrder: setDefaultFollowOrder,
            setDefaultDeveloperOrder: setDefaultDeveloperOrder,
            increasePosition: increasePosition,
            decreasePosition: decreasePosition,
            createOrderBasedOnDashboardPost: createOrderBasedOnDashboardPost,
            createOrderBasedOnWatchlistProduct: createOrderBasedOnWatchlistProduct,
            getOrder: getOrder,
            setLiveOrder: setLiveOrder
        });
    });