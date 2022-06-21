agmNgModuleWrapper('agms.orders')
    .defineService('sOrdersDetailService', ["orderProcessing"],
        function(serviceObj, dep, tool) {
            var orderProcessing = dep.orderProcessing;

            function viewRelatedOrders(order, relatedOrders) {
                tool.openModalByDefinition('RelatedOrdersController', {
                    order: order,
                    relatedOrders: relatedOrders,
                    title: "Related Orders"
                });
            }
            
            function viewBracketOrder(bracketOrderTemplateUrl, order) {
                tool.openModal({
                    templateUrl: bracketOrderTemplateUrl,
                    controller: 's.orders.BracketController',
                    quickResolvedObjects: {
                        order: order,
                        title: "Bracket Order"
                    }
                });
            }

            function editBracketOrder(order, type, level) {
                tool.openModalByDefinition("s.orders.BracketEditController", {
                    order: order,
                    level: level,
                    title: type === "edit" ? "Edit Bracket Order" : "Add Bracket Order"
                });
            }

            function launchCancelBracketOrderPopUp(order, level, bracketOrders, position) {
                return tool.openModalByDefinition("s.orders.BracketCancelPopUpController", {
                    order: order,
                    level: level,
                    bracketOrders: bracketOrders,
                    position: position
                });
            }

            function getTakeProfitOrder(order) {
                return order.OrderType === "Limit" ? order : order.BracketOrder;
            }

            function getStopLossOrder(order) {
                return order.OrderType === "Stop" ? order : order.BracketOrder;
            }

            function findAnotherBracketOrder(order, list) {
                var bracketOrder = list.filter(function (o) {
                    return o.OrderId !== order.OrderId
                           && ((o.ParentOrderId != null && o.ParentOrderId === order.ParentOrderId) ||
                               (o.ParentPortfolioId != null && o.ParentPortfolioId === order.ParentPortfolioId && orderProcessing.isActive(o) && orderProcessing.isActive(order))
                              );
                })[0];

                return bracketOrder;
            }

            function reorganizeOrderListForBracketOrders(list) {
                list.forEach(function (order) {
                    if (order.ParentOrderId != null || order.ParentPortfolioId != null) {
                        var anotherBracketOrder = findAnotherBracketOrder(order, list);
                        if (anotherBracketOrder != null) {
                            order.BracketOrder = anotherBracketOrder;
                            var idx = list.indexOf(anotherBracketOrder);
                            list.splice(idx, 1);
                        } else {
                            order.BracketOrder = null;
                        }
                    }
                });

                return list;
            }

            tool.setServiceObjectProperties({
                viewRelatedOrders: viewRelatedOrders,
                viewBracketOrder: viewBracketOrder,
                editBracketOrder: editBracketOrder,
                launchCancelBracketOrderPopUp: launchCancelBracketOrderPopUp,
                getTakeProfitOrder: getTakeProfitOrder,
                getStopLossOrder: getStopLossOrder,
                reorganizeOrderListForBracketOrders: reorganizeOrderListForBracketOrders
            });
        });