'use strict';

describe('account account liquidate all tests', function() {
    beforeEach(module('agmp.account'));

    var ctrl, scope, orderService, $uibModal, $uibModalInstance, $controller;

    var developerPositions = [{
        Currency: "SGD",
        Exposure: 691,
        PortfolioId: 1401,
        PositionType: "Long",
        ProductId: 7080,
        ProductName: "KEPPEL CORP",
        ProductSymbol: "BN4",
        QuantityOnHold: 100,
        StrategyId: 25,
        StrategyName: "Speedy Stallion",
        UnrealizedPL: -1
    }];
    
    beforeEach(function () {
        module('agmp.account', function ($provide, $controllerProvider) {
        });
    });

    beforeEach(inject(function ($q, $rootScope, _$controller_) {
        scope = $rootScope.$new();

        orderService = {
            SendDeveloperOrder: jasmine.createSpy()
        };

        $controller = _$controller_;
        $uibModal = { open: jasmine.createSpy().and.returnValue({opened:$q.when()}) };
        $uibModalInstance = { close: jasmine.createSpy() };
    }));

    it('liquidating all developer positions', function () {

        ctrl = $controller('p.account.LiquidateAllController', {
            $scope: scope,
            $uibModal: $uibModal,
            $uibModalInstance: $uibModalInstance,
            orderService: orderService,
            brokerAccountId: 1,
            positionsToLiquidate: developerPositions,
            accountUnrealizedPl: 1,
            currency: "USD",
            orderType: "Developer"
        });

        ctrl.liquidateAll(developerPositions);

        expect(orderService.SendDeveloperOrder).toHaveBeenCalledWith({
            BrokerageAccountId: 1,
            ProductId: 7080,
            StrategyId: 25,
            Action: "Sell",
            Quantity: 100,
            OrderType: "Market",
            Validity: "Day",
            HasBracketOrder: false,
            ChildOrderType: "Normal"
        });
    });
});