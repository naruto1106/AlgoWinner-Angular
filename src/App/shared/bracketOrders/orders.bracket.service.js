agmNgModuleWrapper('agms.orders')
    .defineService('sOrdersBracketService', [],
    function (serviceObj, dep, tool) {
        // --- LOCAL SERVICE FUNC 
        function copyOrderAttributes(fromOrder, toOrder, action) {
            toOrder.CreatedTime = fromOrder.CreatedTime;
            toOrder.ProductId = fromOrder.ProductId;
            toOrder.StrategyId = fromOrder.StrategyId;
            toOrder.Action = action;
            toOrder.Quantity = fromOrder.Quantity;
            toOrder.TraderRemark = fromOrder.TraderRemark;
        }

        // --- SCOPE FUNC
        function onHasBracketOrderChanged(order) {
            order.HasAttachedTP = order.HasAttachedSL = order.HasBracketOrder;
        }

        function isNotBracketOrder(order) {
            return order.ParentOrderId == null && order.ParentPortfolioId == null;
        }

        function resolveBracketOrder(order) {
            var oppositeAction = order.Action === "Buy" ? "Sell" : "Buy";

            if (!order.HasAttachedTP)
                order.TakeProfitOrder = null;
            else {
                copyOrderAttributes(order, order.TakeProfitOrder, oppositeAction);
                order.TakeProfitOrder.OrderType = "Limit";
                order.TakeProfitOrder.ChildOrderType = "TakeProfit";
            }
            if (!order.HasAttachedSL)
                order.StopLossOrder = null;
            else {
                copyOrderAttributes(order, order.StopLossOrder, oppositeAction);
                order.StopLossOrder.OrderType = "Stop";
                order.StopLossOrder.ChildOrderType = "StopLoss";
            }
        }

        tool.setServiceObjectProperties({
            onHasBracketOrderChanged: onHasBracketOrderChanged,
            isNotBracketOrder: isNotBracketOrder,
            resolveBracketOrder: resolveBracketOrder
        });
    });