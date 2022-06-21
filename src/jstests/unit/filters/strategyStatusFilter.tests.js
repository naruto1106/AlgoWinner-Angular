'use strict';

describe('tests strategy status filter', function () {
    beforeEach(module('agmp.account'));

    var strategyStatus;
    beforeEach(inject(function (strategyStatusFilter) {
        strategyStatus = strategyStatusFilter;
    }));

    it('test active strategy status', function () {
        var output = strategyStatus('Linked');
        expect(output).toEqual('Active');
        output = strategyStatus('Published');
        expect(output).toEqual('Active');
    });

    it('test timeSince when it is more than one year from now without the suffix', function () {
        var output = strategyStatus('Created');
        expect(output).toEqual('Inactive');
        output = strategyStatus('Expired');
        expect(output).toEqual('Inactive');
        output = strategyStatus('Deleted');
        expect(output).toEqual('Inactive');
    });
})