'use strict';

describe('tests timeSince filter', function() {
    beforeEach(module('agm.common'));

    var timeSince;
    var valueOrDash;
    var valuePercentOrDash;
    var currencyOrDash;
    var customCurrencyOrDash;
    var customCurrencyOrDashMinMax;
    beforeEach(inject(function (timeSinceFilter, valueOrDashFilter,
        valuePercentOrDashFilter, currencyOrDashFilter, customCurrencyOrDashFilter, customCurrencyOrDashMinMaxFilter) {
        timeSince = timeSinceFilter;
        valueOrDash = valueOrDashFilter;
        valuePercentOrDash = valuePercentOrDashFilter;
        currencyOrDash = currencyOrDashFilter;
        customCurrencyOrDash = customCurrencyOrDashFilter;
        customCurrencyOrDashMinMax = customCurrencyOrDashMinMaxFilter;
        jasmine.clock().install();
    }));
    
    it('test timeSince when it is more than one year from now', function () {
        var baseTime = new Date(2014, 1, 1);
        jasmine.clock().mockDate(baseTime);
        var output = timeSince(new Date(2010, 1, 1));
        expect(output).toEqual('4 years ago');
    });

    it('test timeSince when it is more than one year from now without the suffix', function () {
        var baseTime = new Date(2014, 1, 1);
        jasmine.clock().mockDate(baseTime);
        var output = timeSince(new Date(2010, 1, 1), true);
        expect(output).toEqual('4 years');
    });
    
    it('timeSince should work using string input', function () {
        var baseTime = new Date(2014, 0, 1);
        jasmine.clock().mockDate(baseTime);        
        var output = timeSince("2013-12-24T12:02:03Z");
        expect(output).toEqual('7 days ago');
    });

    it('timeSince should return empty string if it is in the future', function () {
        var baseTime = new Date(2014, 0, 1);
        jasmine.clock().mockDate(baseTime);
        var output = timeSince("2014-01-24T12:02:03Z");
        expect(output).toEqual('');
    });

    it('valueOrDash should return non-zero round up 2 decimal when value is non-zero', function () {
        var output = valueOrDash(343.678, 2);
        expect(output).toEqual('343.68');
    });

    it('valueOrDash should return non-zero round down when value is non-zero', function () {
        var output = valueOrDash(343.111, 2);
        expect(output).toEqual('343.11');
    });

    it('valueOrDash should return 0 when value is 0', function () {
        var output = valueOrDash(0, 2);
        expect(output).toEqual('0.00');
    });

    it('valueOrDash should return - when value is undefined', function () {
        var output = valueOrDash(undefined, 2);
        expect(output).toEqual('-');
    });

    it('valueOrDash should return - when value is null', function () {
        var output = valueOrDash(null, 2);
        expect(output).toEqual('-');
    });

    it('valuePercentOrDash should return non-zero round up 2 decimal when value is non-zero', function () {
        var output = valuePercentOrDash(343.678, 2);
        expect(output).toEqual('343.68 %');
    });

    it('valuePercentOrDash should return non-zero round down when value is non-zero', function () {
        var output = valuePercentOrDash(343.111, 2);
        expect(output).toEqual('343.11 %');
    });

    it('valuePercentOrDash should return 0 when value is 0', function () {
        var output = valuePercentOrDash(0, 2);
        expect(output).toEqual('0.00 %');
    });

    it('valuePercentOrDash should return - when value is undefined', function () {
        var output = valuePercentOrDash(undefined, 2);
        expect(output).toEqual('-');
    });

    it('valuePercentOrDash should return - when value is null', function () {
        var output = valuePercentOrDash(null, 2);
        expect(output).toEqual('-');
    });

    it('currencyOrDash should return non-zero round up 2 decimal when value is non-zero', function () {
        var output = currencyOrDash(343.678, '$', 2);
        expect(output).toEqual('$ 343.68');
    });

    it('currencyOrDash should return non-zero round down when value is non-zero', function () {
        var output = currencyOrDash(343.111, '$', 2);
        expect(output).toEqual('$ 343.11');
    });

    it('currencyOrDash should return 0 when value is 0', function () {
        var output = currencyOrDash(0, '$', 2);
        expect(output).toEqual('$ 0.00');
    });

    it('currencyOrDash should return - when value is undefined', function () {
        var output = currencyOrDash(undefined, '$', 2);
        expect(output).toEqual('-');
    });

    it('currencyOrDash should return - when value is null', function () {
        var output = currencyOrDash(null, '$', 2);
        expect(output).toEqual('-');
    });

    it('customCurrencyOrDash should return correct currency symbol', function () {
        var output = customCurrencyOrDash(343.678, 'USD', 2);
        expect(output).toEqual('US$ 343.68');
        output = customCurrencyOrDash(343.678, 'SGD', 2);
        expect(output).toEqual('S$ 343.68');
        output = customCurrencyOrDash(343.678, 'AUD', 2);
        expect(output).toEqual('AU$ 343.68');
        output = customCurrencyOrDash(343.678, 'GBX', 2);
        expect(output).toEqual('343.68p');
    });

    it('customCurrencyOrDashMinMax should return correct number of dp and correct currency symbol', function() {
        var output = customCurrencyOrDashMinMax(343, 'USD', 2, 4);
        expect(output).toEqual('US$ 343.00');
        output = customCurrencyOrDashMinMax(343.6, 'SGD', 2, 4);
        expect(output).toEqual('S$ 343.60');
        output = customCurrencyOrDashMinMax(343.67, 'AUD', 2, 4);
        expect(output).toEqual('AU$ 343.67');
        output = customCurrencyOrDashMinMax(343.678, 'GBX', 2, 4);
        expect(output).toEqual('343.678p');
        output = customCurrencyOrDashMinMax(12.6789, 'AUD', 2, 4);
        expect(output).toEqual('AU$ 12.6789');
        output = customCurrencyOrDashMinMax(343.612333, 'SGD', 2, 4);
        expect(output).toEqual('S$ 343.6123');
        output = customCurrencyOrDashMinMax(null, 'SGD', 2, 4);
        expect(output).toEqual('-');
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });
})
