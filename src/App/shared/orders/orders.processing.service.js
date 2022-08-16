agmNgModuleWrapper('agms.orders')
    .defineService('orderProcessing', [], function (serviceObj, dep, tool) {
        // --- LOCAL VAR DECLARATION
        var activeStatuses = ["Processed by Broker", "Queued", "Partially Filled"];
        var terminalStatuses = ["Filled", "Cancelled", "Rejected by Broker", "Expired", "Rejected by OMS", "Rejected by Exchange"]
        var brokerReadyStatuses = ["Filled"];

        // --- SCOPE FUNC
        function aggregateOrderStatus(order) {
            if (order) {
                var orderUpdates = order.OrderUpdates;
                if (orderUpdates) {
                    orderUpdates.sort(function (o1, o2) {
                        if (moment(o1.LastUpdatedTime) < moment(o2.LastUpdatedTime)) {
                            return -1;
                        }
                        if (moment(o1.LastUpdatedTime) === moment(o2.LastUpdatedTime)) {
                            return 0;
                        }
                        return 1;
                    });

                    var lastOrderUpdate = orderUpdates[orderUpdates.length - 1];
                    order.LatestStatus = lastOrderUpdate.OrderStatus;
                    order.UpdateTime = lastOrderUpdate.LastUpdatedTime;
                    order.LastOrderUpdate = lastOrderUpdate;
                    if (order.LatestStatus === 'Filled') {
                        order.OrderPrice = lastOrderUpdate.FillPrice;
                        order.FillPrice = lastOrderUpdate.FillPrice;
                        order.TransactionCost = lastOrderUpdate.TransactionCost;
                    } else if (order.LatestStatus === 'Rejected by Broker' || order.LatestStatus === 'Rejected by OMS' || order.LatestStatus === 'Expired' || order.LatestStatus === 'Cancelled') {
                        order.RejectReason = lastOrderUpdate.RejectReason;
                    }
                }
            }
            return order;
        }
        
        function isActive(order) {
            return activeStatuses.indexOf(order.LatestStatus) !== -1 || activeStatuses.indexOf(order.LastOrderStatus) !== -1;
        }

        function isHistorical(order) {
            return terminalStatuses.indexOf(order.LatestStatus) !== -1 || terminalStatuses.indexOf(order.LastOrderStatus) !== -1;
        }

        function isPlaceHolder(order) {
            return typeof (order.OrderId) === 'string' && order.OrderId.includes('placeholder'); 
        }

        function isBrokerReady(order) {
            return brokerReadyStatuses.indexOf(order.LastOrderStatus) !== -1 || brokerReadyStatuses.indexOf(order.LatestStatus) !== -1;
        }

        function isTodays(order) {
            var todayDate = moment().format('YYYY-MM-DD');
            return isBrokerReady(order) && order.CreatedTime.substring(0, 10) === todayDate;
        }

        function handleOrderResponse(data, orders) {
            data.forEach(function (d) {
                aggregateOrderStatus(d);
                orders.push(d);
            });
        }

        function isCancellableOrder(order) {
            return (order.LatestStatus === 'Queued' || order.LatestStatus === 'Processed by Broker') &&
                !order.MarkedForCancellation && order.Action !== 'Cancel';
        }
        
        tool.setServiceObjectProperties({
            aggregateOrderStatus: aggregateOrderStatus,
            isActive: isActive,
            isHistorical: isHistorical,
            isPlaceHolder: isPlaceHolder,
            handleOrderResponse: handleOrderResponse,
            isCancellableOrder: isCancellableOrder,
            isTodays: isTodays
        });

    });