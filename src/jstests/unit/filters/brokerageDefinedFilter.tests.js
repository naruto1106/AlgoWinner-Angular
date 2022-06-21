'use strict';

describe('tests brokerage defined filter', function () {
    beforeEach(module('agms.account'));

    var isBrokerDefined;
    beforeEach(inject(function (isBrokerDefinedFilter) {
        isBrokerDefined = isBrokerDefinedFilter;
    }));

    it('test defined broker', function () {
        var output = isBrokerDefined(null);
        expect(output).toEqual(false);
        output = isBrokerDefined('None');
        expect(output).toEqual(false);
    });

    it('test undefined', function () {
        var output = isBrokerDefined('IG');
        expect(output).toEqual(true);
    });
})