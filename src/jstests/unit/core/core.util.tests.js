'use strict';

describe('coreUtil tests', function () {
    var coreUtil;

    beforeEach(module("agm.core", function () {
    }));

    beforeEach(inject(function (_coreUtil_) {
        coreUtil = _coreUtil_;
    }));

    it('test sort list contains string', function () {
        var list = ["Android", "Windows", "Black Berry", "IOS", "android", "windows", "200", "404 not found", "_test"];
        var sortedList = ["_test", "200", "404 not found", "Android", "android", "Black Berry", "IOS", "Windows", "windows"];

        list.sort(function (a, b) {
            return coreUtil.sortName(a, b);
        });

        expect(list).toEqual(sortedList);
    });

    it('test sort list contains numbers', function () {
        var list = [10.23, 5, 8.99, 20.54, 0, -3.5];
        var sortedList = [-3.5, 0, 5, 8.99, 10.23, 20.54];

        list.sort(function (a, b) {
            return coreUtil.sortValue(a, b);
        });

        expect(list).toEqual(sortedList);
    });
});