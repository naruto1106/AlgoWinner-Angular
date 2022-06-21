agmNgModuleWrapper('agmp.dashboard')
    .defineController('p.dashboard.SimpleAlertController', ["orderByFilter", "coreUtil", 'sPriceAlertService'],
        function (vm, dep, tool) {
            var coreSignalRNotificationService = dep.coreSignalRNotificationService,
                orderByFilter = dep.orderByFilter,
                coreUtil = dep.coreUtil,
                sPriceAlertService = dep.sPriceAlertService,
                coreNotificationService = dep.coreNotificationService;

            function handlePriceAlertTriggered(priceAlert) {
                if (priceAlert.Title.indexOf("Price Alert") !== -1) {
                    var triggeredAlert = vm.priceAlertList.filter(function (alert) {
                        return alert.PriceAlertId === priceAlert.PriceAlertId;
                    })[0];
                    if (triggeredAlert) {
                        triggeredAlert.TriggerTime = priceAlert.TimeStamp;
                        triggeredAlert.TriggeredPrice = priceAlert.TriggeredPrice;
                    }

                    getActivePriceAlert();
                }
            }

            tool.onDestroy(function () {
                if (vm.priceAlertDeleteSignalR) {
                    vm.priceAlertDeleteSignalR();
                }
            });

            //for sorting
            function showSorting(col, type, sorting) {
                return sorting[col] !== "none" && sorting[col] === type;
            }

            function sortColumn(col, sorting) {
                if (sorting[col] === "none") {
                    sorting[col] = "a";
                } else if (sorting[col] === "a") {
                    sorting[col] = "d";
                } else if (sorting[col] === "d") {
                    sorting[col] = "a";
                }

                for (var prop in sorting) {
                    if (prop !== col) {
                        sorting[prop] = "none";
                    }
                }
            }

            function getDateForSorting(alert) {
                if (alert.TriggerTime) {
                    return alert.TriggerTime;
                } else if (alert.UpdateTime) {
                    return alert.UpdateTime;
                } else {
                    return alert.CreatedTime;
                }
            }

            function getPriceForSorting(alert) {
                if (alert.TriggeredPrice) {
                    return alert.TriggeredPrice;
                } else {
                    return alert.AlertPrice;
                }
            }

            function sortList(list, sorting) {
                for (var prop in sorting) {
                    if (sorting[prop] === "none") {
                        continue;
                    }
                    switch (prop) {
                        case "ActiveProduct":
                        case "TriggeredProduct":
                            list.sort(function (a, b) {
                                var order = sorting[prop] === "d" ? -1 : 1;
                                return order * coreUtil.sortName(a.Product.ProductName, b.Product.ProductName);
                            });
                            break;
                        case "ActivePrice":
                        case "TriggeredPrice":
                            list.sort(function (a, b) {
                                var order = sorting[prop] === "d" ? -1 : 1;
                                return order * coreUtil.sortValue(getPriceForSorting(a), getPriceForSorting(b));
                            });
                            break;
                        case "ActiveDate":
                        case "TriggeredDate":
                            list.sort(function (a, b) {
                                var order = sorting[prop] === "d" ? -1 : 1;
                                return order * coreUtil.sortName(getDateForSorting(a), getDateForSorting(b));
                            });
                            break;
                    }
                }
            }

            function getUpdateTimeForProducts(alerts) {
                var latestTime = null;
                alerts.forEach(function(alert) {
                    if (alert.UpdateTime) {
                        if (!latestTime) {
                            latestTime = alert.UpdateTime;
                        } else {
                            if (alert.UpdateTime.localeCompare(latestTime) === 1) {
                                latestTime = alert.UpdateTime;
                            }
                        }
                    } else {
                        if (!latestTime) {
                            latestTime = alert.CreatedTime;
                        } else {
                            if (alert.CreatedTime.localeCompare(latestTime) === 1) {
                                latestTime = alert.CreatedTime;
                            }
                        }
                    }
                });

                return latestTime;
            }

            function getActivePriceAlert() {
                var productAlertsDict = {};
                var newModels = [];
                var activeAlerts = vm.priceAlertList.filter(function (alert) {
                    return alert.TriggerTime == null;
                });

                activeAlerts.forEach(function (alert) {
                    if (!productAlertsDict[alert.ProductId]) {
                        productAlertsDict[alert.ProductId] = [alert];
                    } else {
                        productAlertsDict[alert.ProductId].push(alert);
                    }
                });

                for (prop in productAlertsDict) {
                    if (productAlertsDict.hasOwnProperty(prop)) {
                        var alert = {
                            Product: productAlertsDict[prop][0].Product,
                            Alerts: productAlertsDict[prop],
                            UpdateTime: getUpdateTimeForProducts(productAlertsDict[prop])
                        };
                        alert.Alerts.forEach(function(a) { a.ShowProduct = false; });

                        alert.Alerts[0].ShowProduct = true;
                        newModels.push(alert);
                    }
                }

                switch (vm.selectedSortingActive) {
                    case "Date Added (Newest)":
                        newModels = orderByFilter(newModels, ['-UpdateTime']);
                        break;
                    case "Date Added (Oldest)":
                        newModels = orderByFilter(newModels, ['UpdateTime']);
                        break;
                    case "Product (A-Z)":
                        newModels = orderByFilter(newModels, ['Product.ProductName']);
                        break;
                }

                vm.activeAlerts = newModels;
            }

            function getTriggeredPriceAlert() {
                var triggeredAlerts =  vm.priceAlertList.filter(function (alert) {
                    return alert.TriggerTime != null;
                });

                sortList(triggeredAlerts, vm.sortingTrigger);

                return triggeredAlerts;
            }

            function addPriceAlert() {
                tool.openModalByDefinition('s.watchlist.PriceAlertPopupController', {
                    product: null,
                    alerts: [],
                    isEdit: false
                });
            }

            function editPriceAlert(item) {
                if (!item.PriceAlerts) {
                    item.PriceAlerts = [];
                }
                tool.openModalByDefinition('s.watchlist.PriceAlertPopupController', {
                    product: item,
                    alerts: vm.priceAlertList,
                    isEdit: true
                });
            }

            function deleteAllTriggeredPriceAlert() {
                return sPriceAlertService.deleteAllTriggeredAlertsForUser();
            }

            function deleteAllTriggeredAlertsForUser() {
                var onButtonClick = function (id) {
                    if (id !== 0)
                        return null;
                    deleteAllTriggeredPriceAlert().then(function (res) {
                        coreNotificationService.notifySuccess("Delete succesfully!");
                    }, function (res) {
                        coreNotificationService.notifyError("Error deleting all trigggered alerts . : " + res.data);
                    });
                };
                coreNotificationService.notifyYesNo("Delete All Triggered Alerts", "Are you sure to delete all trigggered alerts?", onButtonClick);
            }

            function observePriceAlert(getPriceAlertFunc) {
                function handleNewPriceAlert(priceAlert) {
                    var list = getPriceAlertFunc();
                    if (!list) {
                        return;
                    }
                    list.unshift(priceAlert);

                    getActivePriceAlert();
                }

                function handleModifiedPriceAlert(priceAlert) {
                    var list = getPriceAlertFunc();
                    if (!list) {
                        return;
                    }
                    var item = list.filter(function (i) {
                        return i.PriceAlertId === priceAlert.PriceAlertId;
                    })[0];
                    var indexOf = list.indexOf(item);
                    list.splice(indexOf, 1);
                    item.AlertPrice = priceAlert.AlertPrice;
                    item.Direction = priceAlert.Direction;
                    item.UpdateTime = priceAlert.UpdateTime;
                    list.unshift(item);

                    getActivePriceAlert();
                }

                function handleDeletedPriceAlert(priceAlert) {
                    var list = getPriceAlertFunc();
                    if (!list) {
                        return;
                    }
                    var item = list.filter(function (u) {
                        return u.PriceAlertId === priceAlert.PriceAlertId;
                    })[0];
                    var indexOf = list.indexOf(item);
                    list.splice(indexOf, 1);
                    getActivePriceAlert();

                    return item;
                }

                coreSignalRNotificationService.turnOn('AddedPriceAlert', handleNewPriceAlert);
                coreSignalRNotificationService.turnOn('ModifiedPriceAlert', handleModifiedPriceAlert);
                coreSignalRNotificationService.turnOn('DeletedPriceAlert', handleDeletedPriceAlert);

                return function () {
                    coreSignalRNotificationService.turnOff('AddedPriceAlert', handleNewPriceAlert);
                    coreSignalRNotificationService.turnOff('ModifiedPriceAlert', handleModifiedPriceAlert);
                    coreSignalRNotificationService.turnOff('DeletedPriceAlert', handleDeletedPriceAlert);
                }
            }

            //for price alerts
            function getPriceAlertList() {
                return sPriceAlertService.getPriceAlerts();
            }

            function deletePriceAlert(item) {
                coreNotificationService.notifyYesNo("Delete Price Alert", "Are you sure to delete this price alert?", function (id) {
                    if (id === 0) {
                        var deleteAlert = {
                            PriceAlertId: item.PriceAlertId
                        };
                        sPriceAlertService.deletePriceAlert(deleteAlert).then(function () {
                            coreNotificationService.notifySuccess("Success", "Deleted Alert at " + item.AlertPrice);
                        }, function () {
                            coreNotificationService.notifyError("Error", "Failed to delete alert. Please check your connection settings and try again.");
                        });
                    }
                });
            }

            tool.initialize(function () {
                tool.setVmProperties({
                    showSorting: showSorting,
                    sortColumn: sortColumn,
                    selectedSortingActive: "Date Added (Newest)",
                    sortingActive: ["Date Added (Newest)", "Date Added (Oldest)", "Product (A-Z)"],
                    sortingTrigger: {
                        "TriggeredProduct": "none",
                        "TriggeredPrice": "none",
                        "TriggeredDate": "d"
                    },
                    activeTab: "Active",
                    getTriggeredPriceAlert: getTriggeredPriceAlert,
                    getActivePriceAlert: getActivePriceAlert,
                    isLoading: false,
                    priceAlertList: [],
                    priceAlertDeleteSignalR: null,
                    deletePriceAlert: deletePriceAlert,
                    editPriceAlert: editPriceAlert,
                    addPriceAlert: addPriceAlert,
                    deleteAllTriggeredAlertsForUser: deleteAllTriggeredAlertsForUser
                });

                vm.isLoading = true;
                getPriceAlertList().then(function(res) {
                    vm.priceAlertList = res.data;
                    
                    vm.priceAlertDeleteSignalR = observePriceAlert(function () {
                        return vm.priceAlertList;
                    });

                    getActivePriceAlert();
                }).finally(function() {
                    vm.isLoading = false;
                });

                tool.signalRNotification('ActivityNotificationCreated', handlePriceAlertTriggered);
            });
        })
    .defineDirectiveForE('agmp-dashboard-simple-alert', [],
        function () {
            return {
                controller: "p.dashboard.SimpleAlertController",
                templateUrl: '/App/pages/dashboard/dashboard.simpleAlert.html'
            };
        },
        {
        });