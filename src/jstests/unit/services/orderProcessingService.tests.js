'use strict';

describe('order services tests', function () {
    describe('test show in todays trade', function () {
        var $uibModal, orderProcessing;

        beforeEach(module('agms.orders', function ($provide) {
            $uibModal = { open: jasmine.createSpy() };
            $provide.value('$uibModal', $uibModal);
            jasmine.clock().install();
            var baseTime = new Date(2014, 4, 2);
            jasmine.clock().mockDate(baseTime);
        }));

        beforeEach(inject(function (_orderProcessing_) {
            orderProcessing = _orderProcessing_;
        }));

        afterEach(function () {
            jasmine.clock().uninstall();
        });

        // MaRa TODO: To move to tradedtransaction test
        //it('should show trades from today', function () {            
        //    var order = {
        //        UpdateTime: '2014-05-02T15:12:42.888Z',
        //        LatestStatus: 'Filled'
        //    };
        //    expect(orderProcessing.showInTodayTransaction(order)).toBe(true);
        //});

        //it('should not show trades from yesterday', function () {
        //    var order = {
        //        UpdateTime: '2014-05-01T15:12:42.888Z',
        //        LatestStatus: 'Filled'
        //    };
        //    expect(orderProcessing.showInTodayTransaction(order)).toBe(false);
        //});
    });
});
